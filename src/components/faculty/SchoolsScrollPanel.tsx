import * as React from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const STAGES = [
  { n: "01", label: "Kellogg" },
  { n: "02", label: "Harvard" },
  { n: "03", label: "Signal" },
];

/**
 * Seeded PRNG. The seed is drawn ONCE per page load, so every refresh yields a
 * genuinely different topology while the whole scroll animation stays a pure
 * deterministic function of scroll progress (perfectly reversible).
 */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED = Math.floor(Math.random() * 0xffffffff);
const rng = makeRng(SEED);
const rand = () => rng();
const between = (lo: number, hi: number) => lo + rand() * (hi - lo);

type Node = {
  bx: number;
  by: number;
  /** orbit radii (fraction of panel) */
  rx: number;
  ry: number;
  /** orbit speed + phase */
  sp: number;
  ph: number;
  r: number;
  s: number;
  /** index of the node this one branches from (-1 for cluster centres / lone stars) */
  parent: number;
  /** 0 = anchor institution, 1 = smaller institution hub, 2 = person/knowledge, 3 = lone star */
  kind: 0 | 1 | 2 | 3;
};

const NODES: Node[] = [];
const HUBS: number[] = [];

const clampF = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * A constellation of institutions that emerges from beneath the meter (the
 * right edge of the pattern box) and branches outward to the left, toward the
 * story column. Geometry is hard-constrained to x <= 0.985 of the pattern box,
 * which ends before the protected meter column — nothing can ever cross it.
 */
const MAX_X = 0.985;

const anchorCount = 3 + Math.round(rand()); // 3–4 anchors
const minorCount = 8 + Math.round(rand() * 4); // 8–12 hubs

type Seed = { x: number; y: number; anchor: boolean };
const seeds: Seed[] = [];

for (let i = 0; i < anchorCount; i++) {
  // anchors sit closer to the meter spine — the origin of the network
  const band = (i + 0.5) / anchorCount;
  seeds.push({
    x: clampF(between(0.5, 0.94) - rand() * 0.08, 0.1, MAX_X),
    y: clampF(band + between(-0.13, 0.13), 0.06, 0.94),
    anchor: true,
  });
}
for (let i = 0; i < minorCount; i++) {
  // hubs spread leftward, density decaying away from the spine
  const bias = Math.pow(rand(), 0.65); // more mass toward the right/spine
  seeds.push({
    x: clampF(0.06 + bias * 0.9, 0.03, MAX_X),
    y: clampF(rand(), 0.04, 0.96),
    anchor: false,
  });
}

seeds.forEach((seed) => {
  const hubIndex = NODES.length;
  HUBS.push(hubIndex);
  NODES.push({
    bx: seed.x,
    by: seed.y,
    rx: between(0.01, 0.036),
    ry: between(0.012, 0.042),
    sp: between(0.2, 0.62),
    ph: rand() * Math.PI * 2,
    r: seed.anchor ? between(1.9, 2.9) : between(1.1, 1.75),
    s: seed.anchor ? between(0.78, 0.92) : between(0.5, 0.7),
    parent: -1,
    kind: seed.anchor ? 0 : 1,
  });

  // satellites: people and knowledge branching off the institution, biased to
  // fan out leftward (away from the meter spine)
  const count = seed.anchor ? 5 + Math.round(rand() * 4) : 2 + Math.round(rand() * 3);
  for (let k = 0; k < count; k++) {
    const ang = Math.PI * 0.45 + rand() * Math.PI * 1.1; // leftward fan
    const len = (seed.anchor ? 0.06 : 0.042) * between(0.35, 1.6);
    NODES.push({
      bx: clampF(seed.x + Math.cos(ang) * len * 1.7, 0.015, MAX_X),
      by: clampF(seed.y + Math.sin(ang) * len * 1.9, 0.015, 0.985),
      rx: between(0.008, 0.036),
      ry: between(0.01, 0.042),
      sp: between(0.22, 0.95),
      ph: rand() * Math.PI * 2,
      r: between(0.35, 1.15),
      s: between(0.28, 0.72),
      parent: hubIndex,
      kind: 2,
    });
  }
});

// a handful of isolated stars — negative space with a little life in it
const loneCount = 8 + Math.round(rand() * 6);
for (let i = 0; i < loneCount; i++) {
  NODES.push({
    bx: clampF(between(0.03, MAX_X), 0.02, MAX_X),
    by: clampF(rand(), 0.03, 0.97),
    rx: between(0.006, 0.024),
    ry: between(0.008, 0.028),
    sp: between(0.18, 0.7),
    ph: rand() * Math.PI * 2,
    r: between(0.3, 0.8),
    s: between(0.2, 0.5),
    parent: -1,
    kind: 3,
  });
}

/** Inter-cluster relationships, each revealed at its own point in the scroll. */
const BRIDGES: { a: number; b: number; at: number }[] = [];
for (let i = 0; i < HUBS.length; i++) {
  for (let j = i + 1; j < HUBS.length; j++) {
    const a = NODES[HUBS[i]];
    const b = NODES[HUBS[j]];
    const d = Math.hypot(a.bx - b.bx, a.by - b.by);
    if (d > 0.44) continue; // only plausible neighbours connect
    if (rand() > 0.72) continue; // irregular, never a spider web
    BRIDGES.push({ a: HUBS[i], b: HUBS[j], at: between(0.08, 0.84) });
  }
}


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
    // tier 0 = full (branches + bridges + nodes), 1 = branches only, 2 = nodes only.
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

    const smooth = (x: number) => {
      const v = Math.min(1, Math.max(0, x));
      return v * v * (3 - 2 * v);
    };

    const draw = (t: number) => {
      const t0 = performance.now();
      ctx.clearRect(0, 0, w, h);
      // density/brightness ramp saturates gently but geometry keeps moving
      const glow = Math.min(1, Math.max(0, t * 2.2));
      // primarily leftward drift toward the content column (≈15% of panel width — 2x)
      const drift = -driftEase(t) * 0.15;

      const pts = NODES.map((n) => {
        // slow, bounded orbit — a drift through the panel, not a sweep
        const a = n.ph + t * n.sp * 0.55 * TAU;
        // hard geometric exclusion: nothing may pass MAX_X (the meter spine)
        const nx = Math.min(MAX_X, n.bx + drift + Math.cos(a) * n.rx);
        return {
          x: nx * w,
          // vertical motion is a very subtle secondary component
          y: (n.by + Math.sin(a * 0.85 + 0.6) * n.ry * 0.2) * h,
          r: n.r,
          s: n.s,
          kind: n.kind,
          parent: n.parent,
        };
      });


      if (tier < 2) {
        // 1. branches inside each institutional cluster — always present
        ctx.lineWidth = 0.55;
        for (const pt of pts) {
          if (pt.parent < 0) continue;
          const p = pts[pt.parent];
          const a = 0.035 + 0.075 * glow;
          ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
        }

        // 2. bridges between clusters — revealed progressively, so separate
        //    ecosystems gradually become one network as the section advances.
        if (tier === 0) {
          ctx.lineWidth = 0.7;
          for (const br of BRIDGES) {
            const reveal = smooth((t - br.at) / 0.3);
            if (reveal <= 0.001) continue;
            const a = pts[br.a];
            const b = pts[br.b];
            const alpha = reveal * (0.05 + 0.07 * glow);
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            // slight curve so nothing reads as rigid geometry
            ctx.quadraticCurveTo(
              (a.x + b.x) / 2 + (b.y - a.y) * 0.08,
              (a.y + b.y) / 2 - (b.x - a.x) * 0.08,
              b.x,
              b.y,
            );
            ctx.stroke();
          }
        }
      }

      for (const pt of pts) {
        const base = pt.kind === 0 ? 0.16 : pt.kind === 1 ? 0.12 : pt.kind === 2 ? 0.08 : 0.06;
        const a = base + pt.s * (0.1 + 0.26 * glow);

        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.85 + 0.3 * glow), 0, TAU);
        ctx.fill();
        // anchors carry a faint halo — major institutions, still understated
        if (pt.kind === 0) {
          ctx.strokeStyle = `rgba(255,255,255,${(0.05 + 0.07 * glow).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r * 2.6 + 2, 0, TAU);
          ctx.stroke();
        }
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

