import * as React from "react";
import { useReducedMotion } from "./motion";

/* -------------------------------------------------------------------------- */
/*  Editorial block reveal: large off-white panels slide outward off the hero  */
/*  on first load, uncovering the photograph beneath. Runs once per mount.     */
/* -------------------------------------------------------------------------- */

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const PAPER = "#f7f5f1";

type Block = {
  /** percentages of the hero box */
  x: number;
  y: number;
  w: number;
  h: number;
  /** exit direction */
  dir: "left" | "right" | "up" | "down";
  /** ms */
  delay: number;
  duration: number;
  /** extra travel multiplier for organic distances */
  push?: number;
};

/* Fixed timeline: every mask satisfies delay + duration <= 1250ms.
   Groups start at 150 / 230 / 300 / 380 / 450ms and all land together. */
const DESKTOP: Block[] = [
  // center group
  { x: 34, y: 0, w: 16, h: 62, dir: "up", delay: 150, duration: 900, push: 1.1 },
  { x: 50, y: 38, w: 18, h: 62, dir: "down", delay: 150, duration: 900 },
  { x: 34, y: 62, w: 16, h: 38, dir: "down", delay: 230, duration: 860 },
  { x: 50, y: 0, w: 18, h: 38, dir: "up", delay: 230, duration: 860, push: 1.15 },
  // middle group — exit through their nearest (vertical) edge, never across the photo
  { x: 18, y: 0, w: 16, h: 48, dir: "up", delay: 300, duration: 820 },
  { x: 18, y: 48, w: 16, h: 52, dir: "down", delay: 300, duration: 820 },
  { x: 68, y: 0, w: 15, h: 56, dir: "up", delay: 380, duration: 780 },
  { x: 68, y: 56, w: 15, h: 44, dir: "down", delay: 380, duration: 780 },
  // outer group — flush with the edges, so they exit sideways
  { x: 0, y: 0, w: 18, h: 58, dir: "left", delay: 450, duration: 760 },
  { x: 0, y: 58, w: 18, h: 42, dir: "left", delay: 450, duration: 760 },
  { x: 83, y: 0, w: 17, h: 40, dir: "right", delay: 450, duration: 760 },
  { x: 83, y: 40, w: 17, h: 60, dir: "right", delay: 450, duration: 760 },

];

/* Tablet: 9 blocks. */
const TABLET: Block[] = [
  { x: 32, y: 0, w: 20, h: 55, dir: "up", delay: 150, duration: 900 },
  { x: 52, y: 34, w: 22, h: 66, dir: "down", delay: 150, duration: 900 },
  { x: 32, y: 55, w: 20, h: 45, dir: "down", delay: 230, duration: 860 },
  { x: 52, y: 0, w: 22, h: 34, dir: "up", delay: 230, duration: 860, push: 1.15 },
  { x: 12, y: 0, w: 20, h: 50, dir: "up", delay: 310, duration: 810 },
  { x: 12, y: 50, w: 20, h: 50, dir: "down", delay: 310, duration: 810 },
  { x: 74, y: 0, w: 26, h: 46, dir: "right", delay: 390, duration: 780 },
  { x: 74, y: 46, w: 26, h: 54, dir: "right", delay: 390, duration: 780 },
  { x: 0, y: 0, w: 12, h: 100, dir: "left", delay: 460, duration: 750 },
];


/* Mobile: 7 larger blocks. */
const MOBILE: Block[] = [
  { x: 30, y: 0, w: 40, h: 46, dir: "up", delay: 150, duration: 900 },
  { x: 30, y: 46, w: 40, h: 54, dir: "down", delay: 150, duration: 900 },
  { x: 0, y: 0, w: 30, h: 40, dir: "left", delay: 240, duration: 850 },
  { x: 0, y: 40, w: 30, h: 60, dir: "left", delay: 240, duration: 850 },
  { x: 70, y: 0, w: 30, h: 58, dir: "right", delay: 320, duration: 810 },
  { x: 70, y: 58, w: 30, h: 42, dir: "right", delay: 320, duration: 810 },
  { x: 22, y: 82, w: 56, h: 18, dir: "down", delay: 400, duration: 780 },
];


function pickSet(w: number) {
  if (w < 700) return MOBILE;
  if (w < 1100) return TABLET;
  return DESKTOP;
}

/* Travel distance is derived from the block's own geometry, expressed as a
   percentage of its own size, so every block ends fully outside the hero. */
function offset(b: Block) {
  const pad = 14 * (b.push ?? 1);
  switch (b.dir) {
    case "left":
      return `translate3d(-${(((b.x + b.w) / b.w) * 100 + pad).toFixed(1)}%, 0, 0)`;
    case "right":
      return `translate3d(${(((100 - b.x) / b.w) * 100 + pad).toFixed(1)}%, 0, 0)`;
    case "up":
      return `translate3d(0, -${(((b.y + b.h) / b.h) * 100 + pad).toFixed(1)}%, 0)`;
    default:
      return `translate3d(0, ${(((100 - b.y) / b.h) * 100 + pad).toFixed(1)}%, 0)`;
  }
}


export function HeroMaskReveal() {
  const reduced = useReducedMotion();
  const [blocks, setBlocks] = React.useState<Block[] | null>(null);
  const [go, setGo] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // Keep the mask geometry aligned if the viewport changes during its short reveal.
  React.useEffect(() => {
    const updateBlocks = () => setBlocks(pickSet(window.innerWidth));
    updateBlocks();
    window.addEventListener("resize", updateBlocks);
    return () => window.removeEventListener("resize", updateBlocks);
  }, []);

  React.useEffect(() => {
    if (!blocks) return;
    if (reduced) {
      setGo(true);
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }
    // deterministic start on the next frame, hard stop at 1300ms
    const raf = requestAnimationFrame(() => setGo(true));
    const t = setTimeout(() => setDone(true), 1300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [blocks, reduced]);


  if (done || !blocks) return null;

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background: PAPER,
          opacity: go ? 0 : 1,
          transition: "opacity 240ms linear",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `calc(${b.w}% + 1px)`,
            height: `calc(${b.h}% + 1px)`,
            background: PAPER,
            transform: go ? offset(b) : "translate3d(0,0,0)",
            transition: `transform ${b.duration}ms ${EASE} ${b.delay}ms`,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
}
