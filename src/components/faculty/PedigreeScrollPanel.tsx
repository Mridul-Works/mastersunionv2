import * as React from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const STAGES = [
  { n: "01", label: "IIM" },
  { n: "02", label: "IIT" },
  { n: "03", label: "Universities" },
  { n: "04", label: "Global" },
];

/**
 * Seeded PRNG — a fresh seed per page load, so every refresh yields a new
 * constellation, while the animation stays a pure deterministic function of
 * scroll progress (perfectly reversible in both directions).
 *
 * NOTE: this section deliberately uses its OWN seed stream and its OWN
 * topology generator, independent of SchoolsScrollPanel — the two
 * constellations must never look alike.
 */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x9e3779b9) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
    t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
    return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

// distinct seed space from the visiting-faculty constellation
const SEED = (Math.floor(Math.random() * 0xffffffff) ^ 0x5bf03635) >>> 0;
const rng = makeRng(SEED);
const rand = () => rng();
const between = (lo: number, hi: number) => lo + rand() * (hi - lo);

type Node = {
  bx: number;
  by: number;
  rx: number;
  ry: number;
  sp: number;
  ph: number;
  r: number;
  s: number;
  /** 0 = anchor star, 1 = arc star, 2 = dust */
  kind: 0 | 1 | 2;
};

/** Thin links, generated as arcs along filaments rather than hub spokes. */
type Link = { a: number; b: number; at: number };

const MAX_X = 0.985;
const clampF = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const NODES: Node[] = [];
const LINKS: Link[] = [];

/**
 * Topology: 3–5 "arc filaments". Each anchor star emits a gently curving arc of
 * progressively smaller stars sweeping leftward out from behind the meter edge,
 * plus a loose halo. This reads as sweeping astronomical arcs, structurally
 * different from the orbiting-hub clusters of the neighbouring section.
 */
const armCount = 3 + Math.round(rand() * 2);
const anchors: { x: number; y: number }[] = [];

for (let i = 0; i < armCount; i++) {
  let x = 0;
  let y = 0;
  let attempts = 0;
  do {
    // anchors hug the meter edge — the arcs appear to emerge from behind it
    x = clampF(between(0.72, 0.96), 0.5, MAX_X);
    y = clampF(between(0.1, 0.9), 0.08, 0.92);
    attempts++;
  } while (attempts < 30 && anchors.some((a) => Math.abs(a.y - y) < 0.16));
  anchors.push({ x, y });
}

anchors.forEach((a, ai) => {
  const anchorIndex = NODES.length;
  NODES.push({
    bx: a.x,
    by: a.y,
    rx: between(0.006, 0.016),
    ry: between(0.004, 0.012),
    sp: between(0.1, 0.28),
    ph: rand() * Math.PI * 2,
    r: between(2.6, 3.8),
    s: between(0.8, 0.98),
    kind: 0,
  });

  // sweeping arc of stars
  const steps = 6 + Math.round(rand() * 7);
  const dir = rand() > 0.5 ? 1 : -1;
  const curve = between(0.35, 1.15) * dir;
  const reach = between(0.42, 0.78);
  let prev = anchorIndex;
  for (let k = 1; k <= steps; k++) {
    const u = k / steps;
    const wobble = (rand() - 0.5) * 0.035;
    const bx = clampF(a.x - u * reach + wobble, 0.03, MAX_X);
    const by = clampF(a.y + Math.sin(u * Math.PI * 0.85) * curve * 0.22 + wobble * 1.6, 0.04, 0.96);
    const idx = NODES.length;
    NODES.push({
      bx,
      by,
      rx: between(0.008, 0.026),
      ry: between(0.005, 0.018),
      sp: between(0.14, 0.46),
      ph: rand() * Math.PI * 2,
      r: between(0.9, 1.9),
      s: between(0.3, 0.6),
      kind: 1,
    });
    // gaps in the filament keep it from reading as a continuous polyline
    if (rand() > 0.24) LINKS.push({ a: prev, b: idx, at: (ai * 0.07 + u * 0.55) % 0.75 });
    prev = idx;

    // occasional small companion pair beside an arc star
    if (rand() > 0.72) {
      const ang = rand() * Math.PI * 2;
      const len = between(0.02, 0.055);
      const cidx = NODES.length;
      NODES.push({
        bx: clampF(bx + Math.cos(ang) * len, 0.02, MAX_X),
        by: clampF(by + Math.sin(ang) * len * 0.8, 0.03, 0.97),
        rx: between(0.006, 0.02),
        ry: between(0.004, 0.014),
        sp: between(0.16, 0.5),
        ph: rand() * Math.PI * 2,
        r: between(0.8, 1.5),
        s: between(0.28, 0.55),
        kind: 1,
      });
      if (rand() > 0.4) LINKS.push({ a: idx, b: cidx, at: between(0.05, 0.7) });
    }
  }
});

// sparse isolated dust — understated, keeps typography dominant
const dustCount = 26 + Math.round(rand() * 12);
for (let i = 0; i < dustCount; i++) {
  NODES.push({
    bx: clampF(between(0.04, MAX_X), 0.02, MAX_X),
    by: clampF(rand(), 0.03, 0.97),
    rx: between(0.006, 0.024),
    ry: between(0.005, 0.02),
    sp: between(0.12, 0.5),
    ph: rand() * Math.PI * 2,
    r: between(0.6, 1.3),
    s: between(0.24, 0.48),
    kind: 2,
  });
}

const TAU = Math.PI * 2;

function ConstellationField({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
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

    let tier = reduced ? 2 : 0;
    let avgCost = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const BUDGET_MS = 5.5;
    const MIN_FRAME_MS = 1000 / 60;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, tier === 0 ? 2 : 1.5);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const driftEase = (t: number) => {
      const x = Math.min(1, Math.max(0, t));
      const quint = x * x * x * (x * (x * 6 - 15) + 10);
      return quint * 0.82 + x * 0.18;
    };

    const smooth = (x: number) => {
      const v = Math.min(1, Math.max(0, x));
      return v * v * (3 - 2 * v);
    };

    const draw = (t: number) => {
      const t0 = performance.now();
      ctx.clearRect(0, 0, w, h);
      const glow = Math.min(1, Math.max(0, t * 2.2));
      const drift = -driftEase(t) * 0.2;

      const pts = NODES.map((n) => {
        const a = n.ph + t * n.sp * 0.5 * TAU;
        const nx = Math.min(MAX_X, n.bx + drift + Math.cos(a) * n.rx);
        return {
          x: nx * w,
          y: (n.by + Math.sin(a * 0.8 + 0.4) * n.ry * 0.22) * h,
          r: n.r,
          s: n.s,
          kind: n.kind,
        };
      });

      if (tier < 2) {
        ctx.lineWidth = 0.9;
        for (const l of LINKS) {
          const reveal = smooth((t - l.at) / 0.32);
          if (reveal <= 0.001) continue;
          const a = pts[l.a];
          const b = pts[l.b];
          const alpha = reveal * (0.1 + 0.13 * glow);
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(
            (a.x + b.x) / 2 + (b.y - a.y) * 0.1,
            (a.y + b.y) / 2 - (b.x - a.x) * 0.1,
            b.x,
            b.y,
          );
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(255,255,255,0.16)";
      for (const pt of pts) {
        const base = pt.kind === 0 ? 0.46 : pt.kind === 1 ? 0.22 : 0.15;
        const a = base + pt.s * (0.1 + 0.2 * glow);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (1.0 + 0.3 * glow), 0, TAU);
        ctx.fill();
        if (pt.kind === 0) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255,255,255,${(0.14 + 0.14 * glow).toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r * 3.4 + 2, 0, TAU);
          ctx.stroke();
          ctx.shadowBlur = 5;
        }
      }
      ctx.shadowBlur = 0;

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

      if (!onScreen) {
        shown = target;
        last = target;
        return;
      }

      if (now - lastDrawAt >= MIN_FRAME_MS && shown !== last) {
        last = shown;
        lastDrawAt = now;
        draw(shown);
      }

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

const GROUPS = [
  { title: "IIM", items: "Ahmedabad · Bangalore · Calcutta" },
  { title: "IIT", items: "Bombay · Kanpur" },
  { title: "Universities", items: "Delhi University · Shiv Nadar · Christ University" },
  { title: "Global", items: "TERI · University of Bath" },
];

export default function PedigreeScrollPanel() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const stageRef = React.useRef<Array<HTMLElement | null>>([]);
  const headRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    let lastP = Number.NaN;

    const layoutTop = (node: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = node;
      while (n) {
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return y;
    };

    let cachedTop = layoutTop(el);
    let cachedHeight = el.offsetHeight;
    const measure = () => {
      cachedTop = layoutTop(el);
      cachedHeight = el.offsetHeight;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const span = Math.max(1, cachedHeight - vh);
      const scrolled = (window.scrollY || window.pageYOffset || 0) - cachedTop;
      const p = Math.min(1, Math.max(0, scrolled / span));

      progressRef.current = Math.max(0, scrolled / span);

      if (p === lastP) return;
      lastP = p;

      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;

      const ease = (t: number) => t * t * (3 - 2 * t);
      const seg = (from: number, to: number) =>
        ease(Math.min(1, Math.max(0, (p - from) / (to - from))));

      // heading eases in only once the section is properly pinned
      if (headRef.current) {
        const hp = seg(0.02, 0.16);
        headRef.current.style.opacity = hp.toFixed(3);
        headRef.current.style.transform = `translate3d(0, ${((1 - hp) * 12).toFixed(2)}px, 0)`;
      }

      // four stages: HOLD / FADE crossfades, no premature reveal
      const t1 = seg(0.2, 0.32);
      const t2 = seg(0.42, 0.54);
      const t3 = seg(0.64, 0.76);
      const weights = [
        (1 - t1) * seg(0.06, 0.18),
        t1 * (1 - t2),
        t2 * (1 - t3),
        t3,
      ];
      const drifts = [-t1, 1 - t1 - t2, 1 - t2 - t3, 1 - t3];

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
          {/* LEFT — editorial copy */}
          <div className="flex flex-col justify-center border-b border-white/10 p-6 md:border-b-0 md:border-r md:border-white/10 md:p-8 lg:p-10">
            <div className="max-w-[min(100%,62ch)]">
              <div
                className="text-[10px] uppercase tracking-[0.28em] text-white/45"
                style={{ fontFamily: MONO }}
              >
                Where they trained
              </div>
              <p className="mt-6 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.42] text-white/[0.96]">
                Doctorates from IIM Ahmedabad, Bangalore, Calcutta, Kozhikode and Tiruchirappalli,
                IIT Bombay and Kanpur, Delhi University, Shiv Nadar, Christ University, TERI and the
                University of Bath — across finance, marketing, operations, organisational behaviour,
                economics, decision sciences and strategy.
              </p>
            </div>
          </div>

          {/* RIGHT — constellation | stages | meter */}
          <div className="relative flex h-full overflow-hidden">
            <div className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden p-6 md:p-8 lg:p-10">
              <ConstellationField progressRef={progressRef} />

              <div className="relative z-10">
                <div
                  ref={headRef}
                  className="mb-6 text-[10px] uppercase tracking-[0.26em] text-white/50 will-change-transform"
                  style={{ fontFamily: MONO, opacity: 0 }}
                >
                  Faculty Pedigree
                </div>

                <div className="relative min-h-[190px]">
                  {GROUPS.map((g, i) => (
                    <div
                      key={g.title}
                      ref={(n) => {
                        stageRef.current[i] = n;
                      }}
                      className="absolute inset-x-0 top-0 will-change-transform"
                      style={{ opacity: 0, visibility: "hidden" }}
                    >
                      <div className="border-y border-white/10 py-5">
                        <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                          {g.title}
                        </div>
                        <div
                          className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                          style={{ fontFamily: MONO }}
                        >
                          {g.items}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* meter — protected column */}
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
