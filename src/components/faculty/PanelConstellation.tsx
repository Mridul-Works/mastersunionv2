import * as React from "react";

/**
 * Scroll-driven deep-space travel field for the split panels.
 *
 * The canvas spans BOTH columns of a split panel and is inset on the right by
 * the meter column width, so nothing (node, trail or glow) can ever render over
 * the protected meter. Geometry originates from a vanishing point set toward the
 * centre/right of the panel — i.e. from behind the meter — and travels outward
 * toward the viewer.
 *
 * MODEL
 * Nodes live in a 3D world (x, y, z). Groups of nodes share a base depth so
 * their connections stay coherent. Scroll progress moves a virtual camera
 * forward: depth is wrapped modulo Z_RANGE, so distant nodes are continuously
 * created as foreground ones pass the viewer — the field never runs out.
 *
 * DETERMINISM
 * Every position, trail and glow is a pure function of the scroll-derived
 * progress and a per-load seed. No timers, no autoplay, no regeneration:
 * scrolling back retraces the identical path. The active range spans the whole
 * lifespan of the section (progress 0..LIFESPAN), so the journey keeps running
 * underneath the incoming stacked panel and only settles once that panel has
 * completely covered the section.
 */

const TAU = Math.PI * 2;

/** Progress at which the journey settles (1 = section unpinned, >1 = being covered). */
const LIFESPAN = 1.55;
/** Depth units travelled across the whole lifespan. */
const TRAVEL = 26;
/** Wrap distance: nodes exist between z≈0 (viewer) and Z_RANGE (deep space). */
const Z_RANGE = 9;
/** Focal length for the perspective projection. */
const FOCAL = 1.15;

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

const clampF = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (x: number) => {
  const v = clampF(x, 0, 1);
  return v * v * (3 - 2 * v);
};

export type Variant = "orbits" | "arcs";

type Star = {
  /** group index — shares a wrapped base depth */
  g: number;
  /** offsets in world space relative to the group */
  x: number;
  y: number;
  dz: number;
  /** 0 = anchor, 1 = medium, 2 = tiny */
  kind: 0 | 1 | 2;
  r: number;
  s: number;
  /** rare foreground star that flares as it passes the viewer */
  hit: boolean;
};

/** Straight connection between two stars of the same group. */
type Edge = { a: number; b: number; w: number };

type Field = {
  /** base depth per group */
  gz: number[];
  stars: Star[];
  edges: Edge[];
  /** vanishing point in panel units */
  vp: { x: number; y: number };
  /** how strongly trails stretch toward the viewer */
  trail: number;
};

function build(rand: () => number, variant: Variant): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);

  // Two distinct spatial characters. Same visual language, different topology.
  const arcs = variant === "arcs";
  const groupCount = arcs ? 96 : 110;
  const vp = arcs
    ? { x: 0.6 + rand() * 0.06, y: 0.46 + rand() * 0.06 }
    : { x: 0.66 + rand() * 0.06, y: 0.5 + rand() * 0.05 };

  const gz: number[] = [];
  const stars: Star[] = [];
  const edges: Edge[] = [];

  for (let g = 0; g < groupCount; g++) {
    // even depth distribution → constant density as the camera moves
    gz.push(((g + rand() * 0.9) / groupCount) * Z_RANGE);

    // group centre, spread wide around the vanishing point
    const ang = rand() * TAU;
    const rad = Math.pow(rand(), arcs ? 0.55 : 0.7) * (arcs ? 2.0 : 1.75);
    const cx = Math.cos(ang) * rad * (arcs ? 1.25 : 1.1);
    const cy = Math.sin(ang) * rad * 0.72;

    // most groups are a single tiny star; a few are small constellations
    const roll = rand();
    const size = roll > 0.9 ? 4 + Math.round(rand() * 2) : roll > 0.7 ? 2 + Math.round(rand() * 1) : 1;
    const first = stars.length;

    for (let k = 0; k < size; k++) {
      const solo = size === 1;
      const kindRoll = rand();
      const kind: 0 | 1 | 2 =
        k === 0 && !solo && kindRoll > 0.72 ? 0 : kindRoll > (solo ? 0.93 : 0.6) ? 1 : 2;
      const spread = arcs ? 0.5 : 0.38;
      stars.push({
        g,
        x: cx + (k === 0 ? 0 : between(-spread, spread)),
        y: cy + (k === 0 ? 0 : between(-spread, spread) * 0.7),
        dz: k === 0 ? 0 : between(-0.5, 0.5),
        kind,
        r: kind === 0 ? between(1.7, 2.4) : kind === 1 ? between(1.0, 1.5) : between(0.5, 0.95),
        s: kind === 0 ? between(0.6, 0.85) : kind === 1 ? between(0.34, 0.55) : between(0.14, 0.32),
        // a small number of stars flare as they pass the camera
        hit: kind !== 2 && rand() > 0.82,
      });
    }

    // selective straight links inside the group only — nearest pairs, some
    // stars deliberately left isolated
    if (size > 1) {
      for (let i = first; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > (arcs ? 0.75 : 0.6)) continue;
          if (rand() > (arcs ? 0.5 : 0.42)) continue;
          edges.push({ a: i, b: j, w: between(0.6, 1) });
        }
      }
    }
  }

  return { gz, stars, edges, vp, trail: arcs ? 1.15 : 0.95 };
}

/** Fresh seed per page load, distinct stream (and therefore field) per variant. */
const SEEDS: Record<Variant, number> = {
  orbits: Math.floor(Math.random() * 0xffffffff) >>> 0,
  arcs: (Math.floor(Math.random() * 0xffffffff) ^ 0x5bf03635) >>> 0,
};

const FIELDS: Record<Variant, Field> = {
  orbits: build(makeRng(SEEDS.orbits), "orbits"),
  arcs: build(makeRng(SEEDS.arcs), "arcs"),
};

export default function PanelConstellation({
  progressRef,
  variant,
}: {
  progressRef: React.MutableRefObject<number>;
  variant: Variant;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FIELD = FIELDS[variant];
    const { gz: GZ, stars: STARS, edges: EDGES, vp: VP, trail: TRAIL } = FIELD;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NaN;
    let alive = true;
    let onScreen = true;
    let lastDrawAt = 0;

    // tier 0 = stars + trails + links, 1 = stars + trails, 2 = stars only
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

    // near-linear camera travel: steady approach for the entire lifespan, with a
    // gentle ease-in so the first frames don't jump
    const travelAt = (t: number) => {
      const x = clampF(t / LIFESPAN, 0, 1);
      const quint = x * x * x * (x * (x * 6 - 15) + 10);
      return (quint * 0.18 + x * 0.82) * TRAVEL;
    };

    type P = {
      x: number;
      y: number;
      z: number;
      r: number;
      a: number;
      kind: number;
      hit: boolean;
      flare: number;
      scale: number;
    };

    const draw = (t: number) => {
      const t0 = performance.now();
      ctx.clearRect(0, 0, w, h);

      const enter = smooth(t / 0.08);
      const cam = travelAt(t);
      const ox = VP.x * w;
      const oy = VP.y * h;
      const unit = Math.max(w, h) * 0.55;

      // wrapped depth per group — foreground groups recycle into deep space
      const zg = new Array<number>(GZ.length);
      for (let g = 0; g < GZ.length; g++) {
        let z = (GZ[g] - cam) % Z_RANGE;
        if (z < 0) z += Z_RANGE;
        zg[g] = z;
      }

      const pts = new Array<P | null>(STARS.length);
      for (let i = 0; i < STARS.length; i++) {
        const s = STARS[i];
        const z = zg[s.g] + s.dz;
        if (z <= 0.06 || z > Z_RANGE) {
          pts[i] = null;
          continue;
        }
        const scale = FOCAL / z;
        const x = ox + s.x * scale * unit;
        const y = oy + s.y * scale * unit;
        if (x < -160 || x > w + 160 || y < -160 || y > h + 160) {
          pts[i] = null;
          continue;
        }
        // depth fades: emerge from deep space, flare and vanish past the viewer
        const far = smooth((Z_RANGE - z) / (Z_RANGE * 0.42));
        const near = smooth((z - 0.1) / 0.45);
        const flare = s.hit ? smooth((0.95 - z) / 0.7) : 0;
        const base = s.kind === 0 ? 0.62 : s.kind === 1 ? 0.46 : 0.3;
        const grow = clampF(scale * 0.62, 0.32, 3.1);
        pts[i] = {
          x,
          y,
          z,
          r: s.r * grow,
          a: (base + s.s * 0.22) * far * near * enter * (1 + flare * 0.5),
          kind: s.kind,
          hit: s.hit,
          flare,
          scale,
        };
      }

      // ---- perspective trails: straight streaks toward the viewer -----------
      if (tier < 2) {
        ctx.lineCap = "butt";
        for (let i = 0; i < STARS.length; i++) {
          const p = pts[i];
          if (!p || p.a < 0.02) continue;
          const s = STARS[i];
          if (s.kind === 2 && p.z > Z_RANGE * 0.4) continue; // far dust stays clean
          // the trail is where the star was slightly deeper in space, so it
          // stretches longer as the star accelerates past the camera
          const zBack = p.z + TRAIL * (0.16 + 1.5 / (p.z + 0.5));
          const sb = FOCAL / zBack;
          const bx = ox + s.x * sb * unit;
          const by = oy + s.y * sb * unit;
          const len = Math.hypot(p.x - bx, p.y - by);
          if (len < 1.2) continue;
          const alpha =
            p.a * (0.28 + 0.34 * clampF(p.scale * 0.4, 0, 1)) * (s.kind === 2 ? 0.5 : 1);
          if (alpha < 0.008) continue;
          const grad = ctx.createLinearGradient(bx, by, p.x, p.y);
          grad.addColorStop(0, "rgba(255,255,255,0)");
          grad.addColorStop(1, `rgba(255,255,255,${alpha.toFixed(3)})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = clampF(0.35 + p.scale * 0.22, 0.35, 1.1);
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      // ---- selective straight links inside constellations -------------------
      if (tier === 0) {
        ctx.lineWidth = 0.45;
        for (const e of EDGES) {
          const a = pts[e.a];
          const b = pts[e.b];
          if (!a || !b) continue;
          const alpha = 0.1 * e.w * Math.min(a.a, b.a) * 2.2;
          if (alpha < 0.006) continue;
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ---- stars ------------------------------------------------------------
      for (const p of pts) {
        if (!p || p.a <= 0.006) continue;
        if (p.flare > 0.01) {
          ctx.shadowColor = `rgba(255,255,255,${(0.16 * p.flare).toFixed(3)})`;
          ctx.shadowBlur = 6 + 12 * p.flare;
        }
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9, p.a).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.fill();
        if (p.flare > 0.01) {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }

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
  }, [progressRef, variant]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 top-0 right-[54px] z-0 overflow-hidden md:right-[60px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
