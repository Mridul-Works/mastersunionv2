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

type Node = { bx: number; by: number; ax: number; ay: number; r: number; s: number };

const NODE_COUNT = 34;
const NODES: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  bx: rand(i + 1),
  by: rand(i + 21),
  ax: (rand(i + 41) - 0.5) * 0.16,
  ay: (rand(i + 61) - 0.5) * 0.2,
  r: 0.7 + rand(i + 81) * 1.5,
  s: 0.35 + rand(i + 101) * 0.65,
}));

/** Subtle scroll-reactive node/edge network behind the data panel. */
function NetworkField({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let eased = progressRef.current;
    let raf = 0;
    let alive = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const p = eased;

      const pts = NODES.map((n) => ({
        x: (n.bx + n.ax * p) * w,
        y: (n.by + n.ay * p) * h,
        r: n.r,
        s: n.s,
      }));

      // edges: proximity graph, link distance grows with progress
      const maxD = Math.min(w, h) * (0.28 + 0.14 * p);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          const a = (1 - d / maxD) * (0.06 + 0.13 * p);
          ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }

      for (const pt of pts) {
        const a = 0.1 + pt.s * (0.14 + 0.4 * p);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.85 + 0.4 * p), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      raf = 0;
      if (!alive) return;
      const target = progressRef.current;
      const delta = target - eased;
      if (Math.abs(delta) > 0.0015) {
        eased += delta * 0.12;
        draw();
        raf = requestAnimationFrame(tick);
      } else if (eased !== target) {
        eased = target;
        draw();
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    window.addEventListener("scroll", kick, { passive: true });

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", kick);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export default function SchoolsScrollPanel() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);
  const blocksRef = React.useRef<Array<HTMLElement | null>>([]);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = Math.max(1, rect.height - vh * 0.6);
      const p = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / span));
      progressRef.current = p;

      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;

      const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      meterRef.current.forEach((node, i) => {
        if (!node) return;
        node.dataset["active"] = String(i === active);
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

      {/* RIGHT — sticky data panel */}
      <div className="relative">
        <div className="sticky top-0 flex min-h-[min(100vh,760px)] flex-col justify-center overflow-hidden p-6 md:p-8 lg:p-10">
          <NetworkField progressRef={progressRef} />

          <div className="relative z-10 pr-8">
            <div
              className="mb-6 text-[10px] uppercase tracking-[0.26em] text-white/50"
              style={{ fontFamily: MONO }}
            >
              Schools That Come Here
            </div>

            <div className="border-t border-white/10 py-4">
              <div className="text-[1.05rem] font-medium leading-[1.3] text-white">Kellogg</div>
              <div
                className="mt-1 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                style={{ fontFamily: MONO }}
              >
                School of Management
              </div>
            </div>

            <div className="border-t border-white/10 py-4">
              <div className="text-[1.05rem] font-medium leading-[1.3] text-white">Harvard</div>
              <div
                className="mt-1 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                style={{ fontFamily: MONO }}
              >
                Business School India
              </div>
            </div>

            <div className="border-y border-white/10 py-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <div className="text-[2.4rem] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                  02
                </div>
                <div
                  className="text-[10.5px] uppercase tracking-[0.18em] text-white/60"
                  style={{ fontFamily: MONO }}
                >
                  consecutive years
                </div>
              </div>
            </div>
          </div>

          {/* progress meter — far right edge */}
          <div className="absolute bottom-8 right-3 top-8 z-10 flex w-5 flex-col justify-between md:right-4">
            <div className="pointer-events-none absolute bottom-0 left-[9px] top-0 w-px bg-white/10">
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
                className="group relative flex items-center gap-1.5 transition-opacity duration-500 data-[active=false]:opacity-35 data-[active=true]:opacity-100"
              >
                <span
                  className="text-[8.5px] tracking-[0.1em] text-white/80"
                  style={{ fontFamily: MONO }}
                >
                  {s.n}
                </span>
                <span className="h-px w-2 bg-white/60" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
