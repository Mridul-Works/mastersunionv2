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

/**
 * Denser field built as small clusters rather than one scaled-up grid: ~2x the
 * node count of before, with smaller radii so the geometry reads as many little
 * networks filling the lower/outer areas instead of a few oversized points.
 */
const CLUSTER_COUNT = 14;
const PER_CLUSTER = 5;
const NODES: Node[] = Array.from({ length: CLUSTER_COUNT }, (_, c) => {
  // cluster anchors spread over the full panel, including bottom + outer edges
  const cx = 0.04 + rand(c + 3) * 0.92;
  const cy = 0.04 + rand(c + 37) * 0.92;
  const spread = 0.05 + rand(c + 71) * 0.1;
  return Array.from({ length: PER_CLUSTER }, (_, k) => {
    const i = c * PER_CLUSTER + k;
    return {
      bx: Math.min(0.97, Math.max(0.02, cx + (rand(i + 1) - 0.5) * spread * 2)),
      by: Math.min(0.98, Math.max(0.02, cy + (rand(i + 21) - 0.5) * spread * 2.2)),
      rx: 0.015 + rand(i + 41) * 0.055,
      ry: 0.02 + rand(i + 61) * 0.07,
      sp: 0.25 + rand(i + 121) * 0.75,
      ph: rand(i + 141) * Math.PI * 2,
      // varied but smaller dots so a denser field stays atmospheric
      r: 0.45 + rand(i + 81) * 1.15,
      s: 0.28 + rand(i + 101) * 0.6,
    } as Node;
  });
}).flat();
const NODE_COUNT = NODES.length;


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

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NaN;
    let alive = true;
    let onScreen = true;
    let lastDrawAt = 0;

    // ---- adaptive quality ("throttling safeguard") -------------------------
    // tier 0 = full (links + nodes), 1 = fewer links, 2 = nodes only.
    let tier = reduced ? 2 : 0;
    let avgCost = 0; // EWMA of draw cost in ms
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const BUDGET_MS = 5.5; // keep the main thread well inside a 60fps frame
    const MIN_FRAME_MS = 1000 / 60; // never draw more than once per display frame

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, tier === 0 ? 2 : 1.5);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /**
     * Horizontal easing for the drift. C1-continuous over the whole 0–100%
     * range: a quintic ease-in-out (zero velocity AND zero acceleration at both
     * ends) blended with a small linear term so the middle never plateaus and
     * the slope never changes abruptly.
     */
    const driftEase = (t: number) => {
      const x = Math.min(1, Math.max(0, t));
      const quint = x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
      return quint * 0.82 + x * 0.18;
    };

    const draw = (t: number) => {
      const t0 = performance.now();
      ctx.clearRect(0, 0, w, h);
      // density/brightness ramp saturates gently but geometry keeps moving
      const glow = Math.min(1, Math.max(0, t * 2.2));
      // primarily leftward drift toward the content column (≈7.5% of panel width)
      const drift = -driftEase(t) * 0.075;


      const pts = NODES.map((n) => {
        // slow, bounded orbit — a drift through the panel, not a sweep
        const a = n.ph + t * n.sp * 0.55 * TAU;
        return {
          x: (n.bx + drift + Math.cos(a) * n.rx) * w,
          // vertical motion is a very subtle secondary component (≈20% of original)
          y: (n.by + Math.sin(a * 0.85 + 0.6) * n.ry * 0.2) * h,
          r: n.r,
          s: n.s,
        };
      });

      if (tier < 2) {
        const step = tier === 0 ? 1 : 2; // tier 1 halves the link pass
        const maxD = Math.min(w, h) * (0.3 + 0.12 * glow) * (tier === 0 ? 1 : 0.85);
        ctx.lineWidth = 0.6;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + step; j < pts.length; j += step) {
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
      }

      for (const pt of pts) {
        const a = 0.1 + pt.s * (0.14 + 0.32 * glow);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.85 + 0.35 * glow), 0, TAU);
        ctx.fill();
      }

      // profile + degrade/recover without ever stopping the scroll mapping
      const cost = performance.now() - t0;
      avgCost = avgCost ? avgCost * 0.8 + cost * 0.2 : cost;
      if (!reduced) {
        if (avgCost > BUDGET_MS && tier < 2) {
          tier += 1;
          avgCost = 0;
          resize();
        } else if (avgCost < BUDGET_MS * 0.45 && tier > 0) {
          tier -= 1;
          avgCost = 0;
          resize();
        }
      }
    };

    // Exponentially smoothed progress: fast scroll jumps get eased out over a
    // ~120ms time constant, so the drift slope stays continuous instead of
    // snapping between distant scroll samples.
    let shown = progressRef.current;
    let lastTickAt = 0;
    const TAU_MS = 120;

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const target = progressRef.current;

      const dt = lastTickAt ? Math.min(64, now - lastTickAt) : MIN_FRAME_MS;
      lastTickAt = now;
      const k = 1 - Math.exp(-dt / TAU_MS);
      const delta = target - shown;
      shown = Math.abs(delta) < 0.00015 ? target : shown + delta * k;
      const settled = shown === target;

      // while covered / far off-screen, keep tracking progress but skip painting
      if (!onScreen) {
        shown = target;
        last = target;
        return;
      }

      // coalesce fast-scroll bursts into at most one draw per display frame
      if (now - lastDrawAt >= MIN_FRAME_MS && shown !== last) {
        last = shown;
        lastDrawAt = now;
        draw(shown);
      }

      // keep animating until the eased value has caught up with the scroll value
      if (!settled) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    resize();
    draw(shown);

    const ro = new ResizeObserver(() => {
      resize();
      draw(shown);
    });

    ro.observe(canvas);

    // Painting pauses only when the canvas is genuinely out of view; progress
    // stays scroll-driven so re-entry never snaps or resets.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) {
          last = Number.NaN;
          kick();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(canvas);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
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
  /** internal progress 0..1, only advances while the section is pinned */
  const progressRef = React.useRef(0);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const stageRef = React.useRef<Array<HTMLElement | null>>([]);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    let lastP = Number.NaN;

    /** layout offset of the section in the document — unaffected by sticky/pinning */
    const layoutTop = (node: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = node;
      while (n) {
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return y;
    };

    // Cached so the per-frame path never walks the offsetParent chain (each walk
    // forces layout and is the main cost during fast scroll).
    let cachedTop = layoutTop(el);
    let cachedHeight = el.offsetHeight;
    const measure = () => {
      cachedTop = layoutTop(el);
      cachedHeight = el.offsetHeight;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // Internal timeline starts EXACTLY when the section top hits the
      // viewport top and ends when its bottom does.
      const span = Math.max(1, cachedHeight - vh);
      const scrolled = (window.scrollY || window.pageYOffset || 0) - cachedTop;
      const p = Math.min(1, Math.max(0, scrolled / span));

      // The network runs on a pure, layout-derived scroll value so it keeps
      // advancing (and exactly retraces on the way back) even once this
      // section is pinned and covered by the next stacked panel.
      progressRef.current = Math.max(0, scrolled / span);

      // skip all DOM writes when the mapped progress hasn't changed
      if (p === lastP) return;
      lastP = p;

      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;


      const ease = (t: number) => t * t * (3 - 2 * t);
      // HOLD 0-22 | FADE 22-40 | HOLD 40-60 | FADE 60-78 | HOLD 78-100
      const seg = (from: number, to: number) => ease(Math.min(1, Math.max(0, (p - from) / (to - from))));
      const t1 = seg(0.22, 0.4);
      const t2 = seg(0.6, 0.78);
      const weights = [1 - t1, t1 * (1 - t2), t2];
      const drifts = [-t1, 1 - t1 - t2, 1 - t2];

      const active = weights.indexOf(Math.max(...weights));
      meterRef.current.forEach((node, i) => {
        if (!node) return;
        const val = String(i === active);
        if (node.dataset["active"] !== val) node.dataset["active"] = val;
      });

      stageRef.current.forEach((node, i) => {
        if (!node) return;
        const o = Math.min(1, Math.max(0, weights[i]));
        node.style.opacity = o.toFixed(3);
        node.style.visibility = o < 0.01 ? "hidden" : "visible";
        node.style.transform = `translate3d(0, ${(drifts[i] * 14).toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // Section height changes (stacked reveals, image loads, font swap) refresh
    // the cached geometry instead of re-measuring every frame.
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);


  return (
    <div
      ref={sectionRef}
      className="relative mt-[clamp(0.75rem,1.8vh,1.25rem)]"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full grid-cols-1 border border-white/10 bg-white/[0.04] md:grid-cols-[minmax(0,68%)_minmax(0,32%)]">
          {/* LEFT — editorial story, stays readable while pinned */}
          <div className="flex flex-col justify-center border-b border-white/10 p-6 md:border-b-0 md:border-r md:border-white/10 md:p-8 lg:p-10">
            <div className="max-w-[min(100%,62ch)]">
              <div
                className="text-[10px] uppercase tracking-[0.28em] text-white/45"
                style={{ fontFamily: MONO }}
              >
                Who visits, and why
              </div>

              <p className="mt-6 text-[clamp(1.35rem,2.1vw,1.8rem)] leading-[1.4] text-white/[0.96]">
                <span className="font-medium text-white">Kellogg School of Management</span> — led by
                Professor Mohanbir Sawhney, one of the world&apos;s foremost authorities on technology
                strategy and marketing innovation — has brought students to Masters&apos; Union for two
                consecutive years.
              </p>

              <p className="mt-[clamp(1.25rem,3.5vh,2.25rem)] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.55] text-white/70">
                <span className="font-medium text-white/95">Harvard Business School India</span>{" "}
                immersion students have visited campus.
              </p>

              <div className="mt-[clamp(1.25rem,3.5vh,2.25rem)] border-l border-white/15 pl-5 md:pl-7">
                <p className="text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-[1.34] tracking-[-0.01em] text-white">
                  When schools like these come here to learn, something is working.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — scroll-revealed data panel: NETWORK | GAP | METER */}
          <div className="relative flex h-full overflow-hidden">
            {/* network area — 82% of the panel, network can never cross this box */}
            <div className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden p-6 md:p-8 lg:p-10">
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
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
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
                  data-active={i === 0 ? "true" : "false"}
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
    </div>
  );
}

