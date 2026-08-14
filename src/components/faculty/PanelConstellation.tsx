import * as React from "react";

/**
 * ONE continuous, full-panel constellation layer.
 *
 * The canvas spans BOTH columns of a split panel and is inset on the right by
 * the meter column width, so nothing (node, line or glow) can ever render over
 * the protected meter. Geometry originates near the right (meter) edge and
 * spreads horizontally leftward across the centre and into the left column,
 * thinning out as it travels.
 *
 * Everything is a pure deterministic function of a scroll-derived progress
 * value: the same progress always yields the same frame, so scrolling back up
 * retraces the exact same path in reverse and nothing is ever regenerated.
 */

const TAU = Math.PI * 2;
const MAX_X = 1; // canvas already stops before the meter column

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

export type Variant = "orbits" | "arcs";

type Node = {
  bx: number;
  by: number;
  rx: number;
  ry: number;
  sp: number;
  ph: number;
  r: number;
  s: number;
  parent: number;
  /** 0 = anchor, 1 = secondary hub, 2 = small star, 3 = lone dust */
  kind: 0 | 1 | 2 | 3;
};

type Link = { a: number; b: number; at: number };

type Field = { nodes: Node[]; links: Link[] };

/**
 * Density profile: right side (near the meter) is a little more concentrated,
 * the left column is deliberately sparse with large gaps.
 */
function buildOrbits(rand: () => number): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);
  const nodes: Node[] = [];
  const links: Link[] = [];

  // clusters distributed across the FULL width, denser toward the meter
  const clusterCount = 7 + Math.round(rand() * 2);
  const seeds: { x: number; y: number; anchor: boolean; density: number }[] = [];
  for (let i = 0; i < clusterCount; i++) {
    let x = 0;
    let y = 0;
    let attempts = 0;
    do {
      // pow > 1 biases toward 1 (the meter edge) but still reaches x ~ 0.05
      x = clampF(Math.pow(rand(), 0.62), 0.04, 0.97);
      y = clampF(between(0.08, 0.92), 0.06, 0.94);
      attempts++;
    } while (attempts < 40 && seeds.some((s) => Math.hypot(s.x - x, (s.y - y) * 0.55) < 0.19));
    seeds.push({ x, y, anchor: x > 0.6 && rand() > 0.35, density: 0.35 + x * 0.65 });
  }

  seeds.forEach((seed) => {
    const hub = nodes.length;
    nodes.push({
      bx: seed.x,
      by: seed.y,
      rx: between(0.01, 0.026),
      ry: between(0.006, 0.016),
      sp: between(0.12, 0.32),
      ph: rand() * TAU,
      r: seed.anchor ? between(1.5, 2.0) : between(1.1, 1.5),
      s: seed.anchor ? between(0.55, 0.75) : between(0.4, 0.58),
      parent: -1,
      kind: seed.anchor ? 0 : 1,
    });

    const count = Math.max(2, Math.round((seed.anchor ? 6 : 4) * seed.density + rand() * 2));
    for (let k = 0; k < count; k++) {
      const ang = rand() * TAU;
      const len = between(0.03, 0.1) * (0.6 + seed.density * 0.8);
      const idx = nodes.length;
      nodes.push({
        bx: clampF(seed.x + Math.cos(ang) * len * 1.4, 0.02, MAX_X),
        by: clampF(seed.y + Math.sin(ang) * len * 0.85, 0.03, 0.97),
        rx: between(0.008, 0.022),
        ry: between(0.005, 0.014),
        sp: between(0.16, 0.42),
        ph: rand() * TAU,
        r: between(0.5, 1.0),
        s: between(0.2, 0.4),
        parent: rand() > 0.42 ? hub : -1,
        kind: 2,
      });
      if (rand() > 0.88) links.push({ a: hub, b: idx, at: between(0.05, 0.7) });
    }
  });

  // a few long, elegant connections spanning the panel horizontally
  const hubs = nodes.map((n, i) => (n.kind <= 1 ? i : -1)).filter((i) => i >= 0);
  for (let i = 0; i < hubs.length - 1; i++) {
    for (let j = i + 1; j < hubs.length; j++) {
      const a = nodes[hubs[i]];
      const b = nodes[hubs[j]];
      const dx = Math.abs(a.bx - b.bx);
      const dy = Math.abs(a.by - b.by);
      if (dx > 0.16 && dx < 0.55 && dy < 0.3 && rand() > 0.66) {
        links.push({ a: hubs[i], b: hubs[j], at: (0.05 + dx) % 0.7 });
      }
    }
  }

  // lone dust across the whole field, sparser on the left
  const loneCount = 40 + Math.round(rand() * 14);
  for (let i = 0; i < loneCount; i++) {
    nodes.push({
      bx: clampF(Math.pow(rand(), 0.7), 0.02, MAX_X),
      by: clampF(rand(), 0.03, 0.97),
      rx: between(0.006, 0.02),
      ry: between(0.005, 0.016),
      sp: between(0.14, 0.44),
      ph: rand() * TAU,
      r: between(0.35, 0.8),
      s: between(0.14, 0.3),
      parent: -1,
      kind: 3,
    });
  }

  return { nodes, links };
}

/**
 * Second topology: sweeping arc filaments emerging from behind the meter and
 * fanning across the whole panel into the left column. Structurally distinct
 * from the orbiting clusters above, same visual language.
 */
function buildArcs(rand: () => number): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);
  const nodes: Node[] = [];
  const links: Link[] = [];

  const armCount = 4 + Math.round(rand() * 2);
  for (let ai = 0; ai < armCount; ai++) {
    const ay = clampF(0.1 + (ai + rand() * 0.6) / armCount * 0.85, 0.07, 0.93);
    const ax = clampF(between(0.9, 0.995), 0.5, MAX_X);
    const anchor = nodes.length;
    nodes.push({
      bx: ax,
      by: ay,
      rx: between(0.005, 0.014),
      ry: between(0.004, 0.01),
      sp: between(0.1, 0.26),
      ph: rand() * TAU,
      r: between(1.6, 2.2),
      s: between(0.6, 0.8),
      parent: -1,
      kind: 0,
    });

    // long arc reaching deep into the left column
    const steps = 12 + Math.round(rand() * 8);
    const dir = rand() > 0.5 ? 1 : -1;
    const curve = between(0.4, 1.1) * dir;
    const reach = between(0.72, 0.95);
    let prev = anchor;
    for (let k = 1; k <= steps; k++) {
      const u = k / steps;
      const wobble = (rand() - 0.5) * 0.03;
      const bx = clampF(ax - u * reach + wobble, 0.02, MAX_X);
      const by = clampF(ay + Math.sin(u * Math.PI * 0.8) * curve * 0.2 + wobble * 1.5, 0.04, 0.96);
      const idx = nodes.length;
      nodes.push({
        bx,
        by,
        rx: between(0.006, 0.02),
        ry: between(0.004, 0.014),
        sp: between(0.14, 0.42),
        ph: rand() * TAU,
        // stars thin out along the arc as it travels left
        r: between(0.4, 1.3) * (1 - u * 0.35),
        s: between(0.18, 0.45),
        parent: -1,
        kind: u < 0.35 ? 2 : 3,
      });
      // deliberate gaps — more toward the left so the field breathes
      if (rand() > 0.2 + u * 0.4) links.push({ a: prev, b: idx, at: (ai * 0.06 + u * 0.6) % 0.72 });
      prev = idx;

      if (rand() > 0.8) {
        const ang = rand() * TAU;
        const len = between(0.015, 0.05);
        const cidx = nodes.length;
        nodes.push({
          bx: clampF(bx + Math.cos(ang) * len, 0.02, MAX_X),
          by: clampF(by + Math.sin(ang) * len * 0.8, 0.03, 0.97),
          rx: between(0.005, 0.016),
          ry: between(0.004, 0.012),
          sp: between(0.16, 0.48),
          ph: rand() * TAU,
          r: between(0.35, 0.9),
          s: between(0.16, 0.35),
          parent: rand() > 0.5 ? idx : -1,
          kind: 3,
        });
      }
    }
  }

  // isolated dust, generous negative space on the left
  const dustCount = 38 + Math.round(rand() * 14);
  for (let i = 0; i < dustCount; i++) {
    nodes.push({
      bx: clampF(Math.pow(rand(), 0.75), 0.02, MAX_X),
      by: clampF(rand(), 0.03, 0.97),
      rx: between(0.005, 0.018),
      ry: between(0.004, 0.015),
      sp: between(0.12, 0.46),
      ph: rand() * TAU,
      r: between(0.3, 0.75),
      s: between(0.12, 0.28),
      parent: -1,
      kind: 3,
    });
  }

  return { nodes, links };
}

/** Fresh seed per page load, distinct stream per variant. */
const SEEDS: Record<Variant, number> = {
  orbits: Math.floor(Math.random() * 0xffffffff) >>> 0,
  arcs: (Math.floor(Math.random() * 0xffffffff) ^ 0x5bf03635) >>> 0,
};

const FIELDS: Record<Variant, Field> = {
  orbits: buildOrbits(makeRng(SEEDS.orbits)),
  arcs: buildArcs(makeRng(SEEDS.arcs)),
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

    const { nodes: NODES, links: LINKS } = FIELDS[variant];
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NaN;
    let alive = true;
    let onScreen = true;
    let lastDrawAt = 0;

    // tier 0 = branches + links + stars, 1 = branches only, 2 = stars only
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

      // gradual reveal as the section pins, natural fade as it gets covered
      const glow = smooth(t / 0.22);
      // continuous right → left drift across the entire panel
      const drift = -driftEase(t) * 0.3;

      const pts = NODES.map((n) => {
        const a = n.ph + t * n.sp * 0.5 * TAU;
        const nx = Math.min(MAX_X, n.bx + drift + Math.cos(a) * n.rx);
        return {
          x: nx * w,
          y: (n.by + Math.sin(a * 0.85 + 0.6) * n.ry * 0.18) * h,
          r: n.r,
          s: n.s,
          kind: n.kind,
          parent: n.parent,
          // left side is quieter — the typography must stay dominant
          dim: 0.58 + Math.min(1, Math.max(0, nx)) * 0.42,
        };
      });

      if (tier < 2) {
        ctx.lineWidth = 0.45;
        for (const pt of pts) {
          if (pt.parent < 0) continue;
          const p = pts[pt.parent];
          const a = (0.03 + 0.05 * glow) * pt.dim;
          ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
        }

        if (tier === 0) {
          ctx.lineWidth = 0.5;
          for (const br of LINKS) {
            const reveal = smooth((t - br.at) / 0.3);
            if (reveal <= 0.001) continue;
            const a = pts[br.a];
            const b = pts[br.b];
            const alpha = reveal * (0.035 + 0.055 * glow) * ((a.dim + b.dim) / 2);
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(
              (a.x + b.x) / 2 + (b.y - a.y) * 0.07,
              (a.y + b.y) / 2 - (b.x - a.x) * 0.07,
              b.x,
              b.y,
            );
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(255,255,255,0.1)";
      for (const pt of pts) {
        const base = pt.kind === 0 ? 0.26 : pt.kind === 1 ? 0.2 : pt.kind === 2 ? 0.14 : 0.1;
        const a = (base + pt.s * (0.05 + 0.1 * glow)) * pt.dim;
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.95 + 0.2 * glow), 0, TAU);
        ctx.fill();
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
