import * as React from "react";

/**
 * Scroll-driven deep-space travel field for the split panels.
 *
 * The canvas spans BOTH columns of a split panel and is inset on the right by
 * the meter column width, so no star can ever render over the protected meter.
 * The field's vanishing point sits toward the centre/right of the panel — stars
 * appear to originate from behind the meter and travel outward to the viewer.
 *
 * MODEL
 * Every star is an INDEPENDENT point in a 3D world (x, y, z). There are no
 * node-to-node connections, constellations or trails of any kind. Scroll
 * progress moves a virtual camera forward; depth wraps modulo Z_RANGE so tiny
 * distant stars are continuously created as foreground ones pass the viewer.
 *
 * DETERMINISM
 * Every position and flare is a pure function of the scroll-derived progress and
 * a per-load seed. No timers, no autoplay, no regeneration: scrolling back
 * retraces the identical path. The active range spans the whole lifespan of the
 * section (progress 0..LIFESPAN), so the journey keeps running underneath the
 * incoming stacked panel and settles only once it has fully covered the section.
 */

const TAU = Math.PI * 2;

/** Progress at which the journey settles (1 = section unpinned, >1 = being covered). */
const LIFESPAN = 1.55;
/** Depth units travelled across the whole lifespan. */
const TRAVEL = 26;
/** Wrap distance: stars exist between z≈0 (viewer) and Z_RANGE (deep space). */
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

/**
 * Cached glow sprite. Canvas `shadowBlur` re-runs a gaussian blur per draw call
 * (hundreds per frame here) and was the single most expensive part of the field.
 * A pre-rendered radial-gradient sprite blitted with drawImage produces the same
 * soft halo at a fraction of the raster cost.
 */
const GLOW_SIZE = 128;
let glowSprite: HTMLCanvasElement | null = null;
function getGlowSprite() {
  if (glowSprite) return glowSprite;
  const c = document.createElement("canvas");
  c.width = GLOW_SIZE;
  c.height = GLOW_SIZE;
  const g = c.getContext("2d");
  if (g) {
    const r = GLOW_SIZE / 2;
    const grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.18, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.42, "rgba(255,255,255,0.16)");
    grad.addColorStop(0.72, "rgba(255,255,255,0.03)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);
  }
  glowSprite = c;
  return c;
}

/**
 * Cached trail sprite: a horizontal transparent→white ramp. Previously each
 * star built a fresh `createLinearGradient` every frame (≈900 gradient objects
 * per frame), which was the dominant scroll cost in these panels. Blitting a
 * rotated sprite produces the identical tapered trail for a fraction of it.
 */
const TRAIL_W = 64;
const TRAIL_H = 8;
let trailSprite: HTMLCanvasElement | null = null;
function getTrailSprite() {
  if (trailSprite) return trailSprite;
  const c = document.createElement("canvas");
  c.width = TRAIL_W;
  c.height = TRAIL_H;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createLinearGradient(0, 0, TRAIL_W, 0);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(1, "rgba(255,255,255,1)");
    g.fillStyle = grad;
    g.fillRect(0, 0, TRAIL_W, TRAIL_H);
  }
  trailSprite = c;
  return c;
}


export type Variant = "orbits" | "arcs";

type Star = {
  /** world position; z is the base depth (wrapped against the camera) */
  x: number;
  y: number;
  z: number;
  /** 0 = anchor, 1 = medium, 2 = small, 3 = tiny dust */
  kind: 0 | 1 | 2 | 3;
  r: number;
  s: number;
  /** rare foreground star that flares as it passes the viewer */
  hit: boolean;
};

type Field = {
  stars: Star[];
  /** vanishing point in panel units */
  vp: { x: number; y: number };
};

function build(rand: () => number, variant: Variant): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);
  const arcs = variant === "arcs";

  const vp = arcs
    ? { x: 0.6 + rand() * 0.06, y: 0.46 + rand() * 0.06 }
    : { x: 0.66 + rand() * 0.06, y: 0.5 + rand() * 0.05 };

  const stars: Star[] = [];

  const push = (kind: 0 | 1 | 2 | 3, i: number, total: number) => {
    // even depth distribution → constant density as the camera travels
    const z = ((i + rand() * 0.95) / total) * Z_RANGE;
    // wide angular spread so stars fill the whole panel, including the far edges
    const ang = rand() * TAU;
    const rad = Math.pow(rand(), arcs ? 0.5 : 0.58) * (arcs ? 2.6 : 2.35);
    stars.push({
      x: Math.cos(ang) * rad * (arcs ? 1.5 : 1.35),
      y: Math.sin(ang) * rad * 0.82,
      z,
      kind,
      r:
        kind === 0
          ? between(1.7, 2.4)
          : kind === 1
            ? between(1.05, 1.5)
            : kind === 2
              ? between(0.62, 1.0)
              : between(0.32, 0.6),
      s:
        kind === 0
          ? between(0.6, 0.85)
          : kind === 1
            ? between(0.34, 0.55)
            : kind === 2
              ? between(0.2, 0.36)
              : between(0.1, 0.24),
      hit: kind <= 1 && rand() > 0.78,
    });
  };

  // dense field: hundreds of tiny distant stars, progressively fewer big ones
  const counts: Array<[0 | 1 | 2 | 3, number]> = [
    [3, arcs ? 620 : 660],
    [2, arcs ? 240 : 260],
    [1, 60],
    [0, 16],
  ];
  for (const [kind, n] of counts) {
    for (let i = 0; i < n; i++) push(kind, i, n);
  }

  return { stars, vp };
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

    const { stars: STARS, vp: VP } = FIELDS[variant];
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NaN;
    let alive = true;
    let onScreen = true;
    let lastDrawAt = 0;

    /**
     * Quality tier is decided ONCE at mount and never changes again.
     * The previous adaptive tier could flip mid-scroll, and each flip resized
     * the canvas (which wipes it) and dropped half the dust field — that was the
     * blink / vanish-and-return the field showed while scrolling. Rendering is
     * now a single stable configuration for the lifetime of the panel.
     * tier 0 = full field + flares, 1 = full field, 2 = reduced field
     */
    const cores = navigator.hardwareConcurrency || 4;
    const tier: 0 | 1 | 2 = reduced ? 2 : cores <= 4 ? 1 : 0;
    let dpr = Math.min(window.devicePixelRatio || 1, tier === 0 ? 2 : 1.5);
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

    // near-linear camera travel: steady forward motion for the entire lifespan
    const travelAt = (t: number) => {
      const x = clampF(t / LIFESPAN, 0, 1);
      const quint = x * x * x * (x * (x * 6 - 15) + 10);
      return (quint * 0.18 + x * 0.82) * TRAVEL;
    };

    const glow = getGlowSprite();
    const trail = getTrailSprite();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      const enter = smooth(t / 0.08);
      const cam = travelAt(t);
      const ox = VP.x * w;
      const oy = VP.y * h;
      const unit = Math.max(w, h) * 0.55;
      // every third dust star is skipped on the cheapest tier
      const step = tier === 2 ? 2 : 1;

      for (let i = 0; i < STARS.length; i += 1) {
        const s = STARS[i];
        if (step === 2 && s.kind === 3 && (i & 1) === 1) continue;

        let z = (s.z - cam) % Z_RANGE;
        if (z < 0) z += Z_RANGE;
        if (z <= 0.06) continue;

        const scale = FOCAL / z;
        const x = ox + s.x * scale * unit;
        const y = oy + s.y * scale * unit;
        if (x < -40 || x > w + 40 || y < -40 || y > h + 40) continue;

        // depth fades: emerge from deep space, brighten on approach, vanish past
        const far = smooth((Z_RANGE - z) / (Z_RANGE * 0.45));
        const near = smooth((z - 0.1) / 0.4);
        const flare = s.hit && tier === 0 ? smooth((0.95 - z) / 0.7) : 0;
        const base = s.kind === 0 ? 0.6 : s.kind === 1 ? 0.45 : s.kind === 2 ? 0.3 : 0.2;
        const grow = clampF(scale * 0.62, 0.3, 3.2);
        const a = (base + s.s * 0.22) * far * near * enter * (1 + flare * 0.5);
        if (a <= 0.006) continue;

        // ---- this star's OWN tapered trail --------------------------------
        // The trail is simply where this same star sat slightly deeper in space,
        // so it always points straight back along its own line of travel. It
        // belongs to one star only and can never connect two stars.
        if (tier < 2) {
          const zBack = z + 0.1 + 1.35 / (z + 0.55);
          const sb = FOCAL / zBack;
          const bx = ox + s.x * sb * unit;
          const by = oy + s.y * sb * unit;
          const dx = x - bx;
          const dy = y - by;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 1.4) {
            const tAlpha = a * (0.22 + 0.4 * clampF(scale * 0.45, 0, 1)) * (s.kind === 3 ? 0.5 : 1);
            if (tAlpha > 0.008) {
              const lw = clampF(0.3 + scale * 0.2, 0.3, Math.max(0.4, s.r * grow * 0.9));
              ctx.save();
              ctx.globalAlpha = Math.min(1, tAlpha);
              ctx.translate(bx, by);
              ctx.rotate(Math.atan2(dy, dx));
              ctx.drawImage(trail, 0, -lw / 2, len, lw);
              ctx.restore();
            }
          }
        }




        // subtle, restrained glow around every visible node — blitted sprite
        const glowAlpha = a * 0.32 * (s.kind === 0 ? 1.5 : s.kind === 1 ? 1.2 : 0.85);
        const glowBlur = Math.min(s.r * grow * 3.5 + (s.kind <= 1 ? 6.0 : 3.5), 26);
        const halo =
          flare > 0.01
            ? { alpha: Math.max(0.08, 0.32 * flare), blur: Math.max(glowBlur, 10 + 24 * flare) }
            : glowAlpha > 0.01
              ? { alpha: glowAlpha, blur: glowBlur }
              : null;
        if (halo) {
          const rad = s.r * grow + halo.blur * 0.95;
          ctx.globalAlpha = Math.min(1, halo.alpha * 2.4);
          ctx.drawImage(glow, x - rad, y - rad, rad * 2, rad * 2);
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9, a).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r * grow, 0, TAU);
        ctx.fill();
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
