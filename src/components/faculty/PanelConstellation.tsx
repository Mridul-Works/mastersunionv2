import * as React from "react";

/**
 * ONE continuous, full-panel constellation layer.
 *
 * The canvas spans BOTH columns of a split panel and is inset on the right by
 * the meter column width, so nothing (node, line or glow) can ever render over
 * the protected meter. Geometry originates near the right (meter) edge and
 * spreads horizontally leftward across the centre and into the left column.
 *
 * Everything — node reveal, line drawing and horizontal drift — is a pure
 * deterministic function of a scroll-derived progress value. The same progress
 * always yields the same frame, so scrolling back up un-draws the lines along
 * the exact same path and nothing is ever regenerated or timer-animated.
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
  /** 0 = large anchor, 1 = medium, 2 = tiny star */
  kind: 0 | 1 | 2;
  /** scroll progress at which this point starts to appear */
  at: number;
};

/** A straight connection, drawn progressively from `a` toward `b`. */
type Link = { a: number; b: number; at: number; span: number };

type Field = { nodes: Node[]; links: Link[] };

/**
 * Selective straight connections: each node may link to one or two of its
 * nearest neighbours, and only if the pair passes a random gate — so plenty of
 * points stay completely isolated and nothing becomes a dense web.
 *
 * Reveal order flows right → left (from beneath the meter outward), which is
 * what makes the constellation appear to draw itself as the user scrolls.
 */
function connect(
  nodes: Node[],
  rand: () => number,
  opts: { maxDist: number; gate: number; maxPerNode: number },
): Link[] {
  const links: Link[] = [];
  const degree = new Array(nodes.length).fill(0);
  const seen = new Set<string>();

  const order = nodes
    .map((n, i) => ({ i, x: n.bx }))
    .sort((p, q) => q.x - p.x)
    .map((p) => p.i);

  for (const i of order) {
    const a = nodes[i];
    // candidate neighbours, nearest first
    const cands = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.bx - a.bx, (n.by - a.by) * 0.6) }))
      .filter((c) => c.j !== i && c.d < opts.maxDist)
      .sort((p, q) => p.d - q.d)
      .slice(0, 4);

    for (const c of cands) {
      if (degree[i] >= opts.maxPerNode) break;
      if (degree[c.j] >= opts.maxPerNode) continue;
      const key = i < c.j ? `${i}:${c.j}` : `${c.j}:${i}`;
      if (seen.has(key)) continue;
      // bias: bigger nodes and nearer pairs connect more readily
      const bias = (a.kind === 0 ? 0.22 : a.kind === 1 ? 0.1 : 0) + (1 - c.d / opts.maxDist) * 0.2;
      if (rand() > opts.gate + bias) continue;
      seen.add(key);

      const b = nodes[c.j];
      // draw from whichever end is further right — lines grow leftward
      const [from, to] = a.bx >= b.bx ? [i, c.j] : [c.j, i];
      const rightX = Math.max(a.bx, b.bx);
      // rightmost pairs draw first; the far left completes last
      const at = clampF(0.1 + (1 - rightX) * 0.62 + (rand() - 0.5) * 0.08, 0.04, 0.9);
      links.push({ a: from, b: to, at, span: 0.1 + rand() * 0.14 });
      degree[i] += 1;
      degree[c.j] += 1;
    }
  }

  return links;
}

/** Node reveal: right → left, tiny stars slightly behind their bigger siblings. */
const nodeAt = (bx: number, kind: number, rand: () => number) =>
  clampF((1 - bx) * 0.34 + (kind === 2 ? 0.03 : 0) + rand() * 0.06, 0, 0.6);

/**
 * Topology A — a broad star field with loose concentrations, denser toward the
 * meter edge and generously spaced on the left.
 */
function buildOrbits(rand: () => number): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);
  const nodes: Node[] = [];

  const push = (bx: number, by: number, kind: 0 | 1 | 2) => {
    const r =
      kind === 0 ? between(1.7, 2.3) : kind === 1 ? between(1.0, 1.45) : between(0.5, 0.95);
    nodes.push({
      bx: clampF(bx, 0.015, MAX_X),
      by: clampF(by, 0.025, 0.975),
      rx: between(0.006, 0.02),
      ry: between(0.004, 0.014),
      sp: between(0.12, 0.42),
      ph: rand() * TAU,
      r,
      s: kind === 0 ? between(0.55, 0.75) : kind === 1 ? between(0.3, 0.5) : between(0.12, 0.3),
      kind,
      at: nodeAt(bx, kind, rand),
    });
  };

  // a handful of large anchors, weighted to the right
  for (let i = 0; i < 5; i++) {
    push(clampF(Math.pow(rand(), 0.45), 0.06, 0.96), between(0.1, 0.9), 0);
  }
  // medium nodes
  for (let i = 0; i < 16; i++) {
    push(clampF(Math.pow(rand(), 0.6), 0.04, 0.97), between(0.06, 0.94), 1);
  }
  // the bulk: many tiny stars, irregular, denser near the meter
  const tiny = 170 + Math.round(rand() * 40);
  for (let i = 0; i < tiny; i++) {
    // loose concentrations without hard clusters
    const clumped = rand() > 0.55;
    const bx = clumped
      ? clampF(Math.pow(rand(), 0.65) + (rand() - 0.5) * 0.05, 0.02, MAX_X)
      : clampF(Math.pow(rand(), 0.85), 0.02, MAX_X);
    push(bx, rand(), 2);
  }

  return { nodes, links: connect(nodes, rand, { maxDist: 0.1, gate: 0.62, maxPerNode: 2 }) };
}

/**
 * Topology B — filament-leaning field: stars arranged along long, sweeping
 * paths from behind the meter into the left column, plus scattered dust. Same
 * visual language, distinctly different structure from topology A.
 */
function buildArcs(rand: () => number): Field {
  const between = (lo: number, hi: number) => lo + rand() * (hi - lo);
  const nodes: Node[] = [];

  const push = (bx: number, by: number, kind: 0 | 1 | 2) => {
    const r =
      kind === 0 ? between(1.6, 2.1) : kind === 1 ? between(0.95, 1.4) : between(0.45, 0.9);
    nodes.push({
      bx: clampF(bx, 0.015, MAX_X),
      by: clampF(by, 0.025, 0.975),
      rx: between(0.005, 0.018),
      ry: between(0.004, 0.013),
      sp: between(0.12, 0.44),
      ph: rand() * TAU,
      r,
      s: kind === 0 ? between(0.55, 0.72) : kind === 1 ? between(0.28, 0.48) : between(0.12, 0.28),
      kind,
      at: nodeAt(bx, kind, rand),
    });
  };

  const armCount = 4 + Math.round(rand() * 2);
  for (let ai = 0; ai < armCount; ai++) {
    const ay = clampF(0.08 + ((ai + rand() * 0.7) / armCount) * 0.86, 0.06, 0.94);
    const ax = clampF(between(0.9, 0.995), 0.5, MAX_X);
    push(ax, ay, 0);

    const steps = 20 + Math.round(rand() * 12);
    const dir = rand() > 0.5 ? 1 : -1;
    const bend = between(0.35, 1.0) * dir;
    const reach = between(0.78, 0.96);
    for (let k = 1; k <= steps; k++) {
      const u = k / steps;
      const wobble = (rand() - 0.5) * 0.035;
      const bx = ax - u * reach + wobble;
      const by = ay + Math.sin(u * Math.PI * 0.8) * bend * 0.2 + wobble * 1.6;
      push(bx, by, rand() > 0.86 ? 1 : 2);
      // occasional companion beside a filament star
      if (rand() > 0.72) {
        const ang = rand() * TAU;
        const len = between(0.012, 0.045);
        push(bx + Math.cos(ang) * len, by + Math.sin(ang) * len * 0.8, 2);
      }
    }
  }

  // scattered isolated dust, generous negative space on the left
  const dust = 110 + Math.round(rand() * 40);
  for (let i = 0; i < dust; i++) {
    push(clampF(Math.pow(rand(), 0.8), 0.02, MAX_X), rand(), 2);
  }

  return { nodes, links: connect(nodes, rand, { maxDist: 0.095, gate: 0.55, maxPerNode: 2 }) };
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

    // tier 0 = stars + all lines, 1 = stars + shorter lines, 2 = stars only
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

      const glow = smooth(t / 0.18);
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
          // per-node scroll-driven appearance
          on: smooth((t - n.at) / 0.14),
          // left side is quieter — the typography must stay dominant
          dim: 0.58 + Math.min(1, Math.max(0, nx)) * 0.42,
        };
      });

      // ---- straight connections, each extending with scroll progress --------
      if (tier < 2) {
        ctx.lineWidth = 0.45;
        ctx.lineCap = "butt";
        for (const link of LINKS) {
          const grow = Math.min(1, Math.max(0, (t - link.at) / link.span));
          if (grow <= 0.001) continue;
          const a = pts[link.a];
          const b = pts[link.b];
          if (tier === 1 && Math.abs(b.x - a.x) > w * 0.06) continue;
          const e = smooth(grow);
          const alpha = (0.05 + 0.075 * glow) * ((a.dim + b.dim) / 2) * Math.min(1, grow * 1.6);
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          // simple straight segment, extending from a toward b
          ctx.lineTo(a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e);
          ctx.stroke();
        }
      }

      // ---- stars ------------------------------------------------------------
      for (const pt of pts) {
        if (pt.on <= 0.005) continue;
        const base = pt.kind === 0 ? 0.6 : pt.kind === 1 ? 0.44 : 0.28;
        const a = (base + pt.s * (0.08 + 0.14 * glow)) * pt.dim * pt.on;
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.9 + 0.2 * pt.on), 0, TAU);
        ctx.fill();
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
