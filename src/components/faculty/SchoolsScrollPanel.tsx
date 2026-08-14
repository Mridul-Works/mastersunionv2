import * as React from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const STAGES = [
  { n: "01", label: "Kellogg" },
  { n: "02", label: "Harvard" },
  { n: "03", label: "Signal" },
];

/** Deterministic pseudo-random so the network pattern is stable across renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Node = {
  bx: number;
  by: number;
  /** orbit radii (fraction of panel) */
  rx: number;
  ry: number;
  /** orbit speed + phase — deterministic per node */
  sp: number;
  ph: number;
  r: number;
  s: number;
};

const NODE_COUNT = 34;
const NODES: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  bx: 0.06 + rand(i + 1) * 0.88,
  by: 0.05 + rand(i + 21) * 0.9,
  rx: 0.03 + rand(i + 41) * 0.07,
  ry: 0.03 + rand(i + 61) * 0.09,
  sp: 0.25 + rand(i + 121) * 0.75,
  ph: rand(i + 141) * Math.PI * 2,
  r: 0.7 + rand(i + 81) * 1.5,
  s: 0.35 + rand(i + 101) * 0.65,
}));

const TAU = Math.PI * 2;

/**
 * Network whose geometry is a pure deterministic function of scroll progress `t`
 * (an unbounded, continuously advancing value). Same t => same frame, so the
 * path retraces exactly in reverse and never freezes or resets.
 */
function NetworkField({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NaN;
    let alive = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // density/brightness ramp saturates gently but geometry keeps moving
      const glow = Math.min(1, Math.max(0, t));

      const pts = NODES.map((n) => {
        const a = n.ph + t * n.sp * TAU;
        return {
          x: (n.bx + Math.cos(a) * n.rx) * w,
          y: (n.by + Math.sin(a * 0.85 + 0.6) * n.ry) * h,
          r: n.r,
          s: n.s,
        };
      });

      const maxD = Math.min(w, h) * (0.3 + 0.12 * glow);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          const a = (1 - d / maxD) * (0.06 + 0.11 * glow);
          ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }

      for (const pt of pts) {
        const a = 0.1 + pt.s * (0.14 + 0.32 * glow);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.85 + 0.35 * glow), 0, TAU);
        ctx.fill();
      }
    };

    const tick = () => {
      raf = 0;
      if (!alive) return;
      const t = progressRef.current;
      if (t !== last) {
        last = t;
        draw(t);
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    resize();
    draw(progressRef.current);

    const ro = new ResizeObserver(() => {
      resize();
      draw(progressRef.current);
    });
    ro.observe(canvas);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 h-full"
      style={{ width: "82%" }}
    />
  );
}

export default function SchoolsScrollPanel() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  /** unbounded, continuous scroll timeline value */
  const progressRef = React.useRef(0);
  const blocksRef = React.useRef<Array<HTMLElement | null>>([]);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const stageRef = React.useRef<Array<HTMLElement | null>>([]);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    /** scroll position at which this section's own timeline starts */
    let startY: number | null = null;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Section-local timeline: anchored to the scroll position at which the
      // block has properly entered the viewport, so 0% = "just appeared" no
      // matter how far the page was scrolled before, and it keeps advancing
      // while the section is pinned inside the sticky stack.
      const entered = rect.top <= vh * 0.55;
      if (!entered) startY = null;
      else if (startY === null) startY = scrollY;

      const span = vh * 1.9;
      const raw = startY === null ? 0 : (scrollY - startY) / span;
      progressRef.current = raw;




      const p = Math.min(1, Math.max(0, raw));
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;

      const ease = (t: number) => t * t * (3 - 2 * t);
      // HOLD 0-20 | FADE 20-40 | HOLD 40-65 | FADE 65-85 | HOLD 85-100
      const seg = (from: number, to: number) => ease(Math.min(1, Math.max(0, (p - from) / (to - from))));
      const t1 = seg(0.2, 0.4);
      const t2 = seg(0.65, 0.85);
      const weights = [1 - t1, t1 * (1 - t2), t2];
      const drifts = [-t1, 1 - t1 - t2, 1 - t2];

      const active = weights.indexOf(Math.max(...weights));
      meterRef.current.forEach((node, i) => {
        if (!node) return;
        node.dataset["active"] = String(i === active);
      });

      // one shared stage viewport: long slow crossfades, only one dominant state
      stageRef.current.forEach((node, i) => {
        if (!node) return;
        const o = Math.min(1, Math.max(0, weights[i]));
        node.style.opacity = o.toFixed(3);
        node.style.visibility = o < 0.01 ? "hidden" : "visible";
        node.style.transform = `translate3d(0, ${(drifts[i] * 14).toFixed(2)}px, 0)`;
      });


      // restrained reveal for left editorial blocks
      blocksRef.current.forEach((node) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (vh * 0.92 - r.top) / (vh * 0.32)));
        const e = t * t * (3 - 2 * t);
        node.style.opacity = (0.25 + 0.75 * e).toFixed(3);
        node.style.transform = `translate3d(0, ${((1 - e) * 16).toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const setBlock = (i: number) => (n: HTMLParagraphElement | HTMLDivElement | null) => {
    blocksRef.current[i] = n;
  };

  return (
    <div
      ref={sectionRef}
      className="relative mt-[clamp(0.75rem,1.8vh,1.25rem)] grid grid-cols-1 border border-white/10 bg-white/[0.04] md:grid-cols-[minmax(0,68%)_minmax(0,32%)]"
    >
      {/* LEFT — editorial story */}
      <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:border-white/10 md:p-8 lg:p-10">
        <div className="max-w-[min(100%,62ch)]">
          <div
            ref={setBlock(0)}
            className="text-[10px] uppercase tracking-[0.28em] text-white/45 will-change-transform"
            style={{ fontFamily: MONO }}
          >
            Who visits, and why
          </div>

          <p
            ref={setBlock(1)}
            className="mt-6 text-[clamp(1.35rem,2.1vw,1.8rem)] leading-[1.4] text-white/[0.96] will-change-transform"
          >
            <span className="font-medium text-white">Kellogg School of Management</span> — led by
            Professor Mohanbir Sawhney, one of the world&apos;s foremost authorities on technology
            strategy and marketing innovation — has brought students to Masters&apos; Union for two
            consecutive years.
          </p>

          <p
            ref={setBlock(2)}
            className="mt-[clamp(1.75rem,5vh,3rem)] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.55] text-white/70 will-change-transform"
          >
            <span className="font-medium text-white/95">Harvard Business School India</span>{" "}
            immersion students have visited campus.
          </p>

          <div
            ref={setBlock(3)}
            className="mt-[clamp(1.75rem,5vh,3rem)] border-l border-white/15 pl-5 will-change-transform md:pl-7"
          >
            <p className="text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.34] tracking-[-0.01em] text-white">
              When schools like these come here to learn, something is working.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — sticky data panel: NETWORK | GAP | METER */}
      <div className="relative">
        <div className="sticky top-0 flex min-h-[min(100vh,760px)] overflow-hidden">
          {/* network area — 82% of the panel, network can never cross this box */}
          <div className="relative flex min-w-0 flex-1 flex-col justify-center p-6 md:p-8 lg:p-10">
            <NetworkField progressRef={progressRef} />

            {/* single shared stage viewport — one active state at a time */}
            <div className="relative z-10 min-h-[190px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  ref={(n) => {
                    stageRef.current[i] = n;
                  }}
                  className="absolute inset-x-0 top-0 will-change-transform"
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  {i === 0 && (
                    <>
                      <div
                        className="mb-6 text-[10px] uppercase tracking-[0.26em] text-white/50"
                        style={{ fontFamily: MONO }}
                      >
                        Schools That Come Here
                      </div>
                      <div className="border-y border-white/10 py-5">
                        <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                          Kellogg
                        </div>
                        <div
                          className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                          style={{ fontFamily: MONO }}
                        >
                          School of Management
                        </div>
                      </div>
                    </>
                  )}

                  {i === 1 && (
                    <div className="border-y border-white/10 py-5">
                      <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                        Harvard
                      </div>
                      <div
                        className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                        style={{ fontFamily: MONO }}
                      >
                        Business School India
                      </div>
                    </div>
                  )}

                  {i === 2 && (
                    <div className="border-y border-white/10 py-5">
                      <div className="text-[clamp(2.6rem,4.4vw,3.6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                        02
                      </div>
                      <div
                        className="mt-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60"
                        style={{ fontFamily: MONO }}
                      >
                        consecutive years
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* meter — dedicated protected column, never overlapped by the network */}
          <div className="relative z-20 flex w-[54px] shrink-0 flex-col justify-between py-8 pl-2 pr-4 md:w-[60px] md:pr-5">
            <div className="pointer-events-none absolute bottom-8 left-[8px] top-8 w-px bg-white/10">
              <div
                ref={barRef}
                className="h-full w-full origin-top bg-white/45"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                ref={(n) => {
                  meterRef.current[i] = n;
                }}
                data-active="false"
                className="relative flex items-center gap-1.5 transition-opacity duration-500 data-[active=false]:opacity-35 data-[active=true]:opacity-100"
              >
                <span className="h-px w-2 shrink-0 bg-white/60" aria-hidden />
                <span
                  className="whitespace-nowrap text-[9px] tracking-[0.1em] text-white/80"
                  style={{ fontFamily: MONO }}
                >
                  {s.n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
