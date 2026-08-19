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

/* Desktop: 12 asymmetric editorial blocks, center group first. */
const DESKTOP: Block[] = [
  // center group
  { x: 34, y: 0, w: 16, h: 62, dir: "up", delay: 240, duration: 980, push: 1.1 },
  { x: 50, y: 38, w: 18, h: 62, dir: "down", delay: 260, duration: 1000 },
  { x: 34, y: 62, w: 16, h: 38, dir: "down", delay: 320, duration: 940 },
  { x: 50, y: 0, w: 18, h: 38, dir: "up", delay: 300, duration: 960, push: 1.15 },
  // middle group
  { x: 18, y: 0, w: 16, h: 48, dir: "left", delay: 400, duration: 1040 },
  { x: 18, y: 48, w: 16, h: 52, dir: "left", delay: 470, duration: 1000, push: 1.2 },
  { x: 68, y: 0, w: 15, h: 56, dir: "right", delay: 420, duration: 1040 },
  { x: 68, y: 56, w: 15, h: 44, dir: "right", delay: 500, duration: 1010, push: 1.2 },
  // outer group
  { x: 0, y: 0, w: 18, h: 58, dir: "left", delay: 580, duration: 1080, push: 1.3 },
  { x: 0, y: 58, w: 18, h: 42, dir: "down", delay: 660, duration: 1040 },
  { x: 83, y: 0, w: 17, h: 40, dir: "up", delay: 620, duration: 1060 },
  { x: 83, y: 40, w: 17, h: 60, dir: "right", delay: 700, duration: 1080, push: 1.3 },
];

/* Tablet: 9 blocks. */
const TABLET: Block[] = [
  { x: 32, y: 0, w: 20, h: 55, dir: "up", delay: 240, duration: 980 },
  { x: 52, y: 34, w: 22, h: 66, dir: "down", delay: 280, duration: 1000 },
  { x: 32, y: 55, w: 20, h: 45, dir: "down", delay: 340, duration: 960 },
  { x: 52, y: 0, w: 22, h: 34, dir: "up", delay: 300, duration: 980, push: 1.15 },
  { x: 12, y: 0, w: 20, h: 50, dir: "left", delay: 420, duration: 1040 },
  { x: 12, y: 50, w: 20, h: 50, dir: "left", delay: 490, duration: 1020, push: 1.2 },
  { x: 74, y: 0, w: 26, h: 46, dir: "right", delay: 440, duration: 1040 },
  { x: 74, y: 46, w: 26, h: 54, dir: "right", delay: 520, duration: 1060, push: 1.25 },
  { x: 0, y: 0, w: 12, h: 100, dir: "left", delay: 600, duration: 1080, push: 1.35 },
];

/* Mobile: 7 larger blocks. */
const MOBILE: Block[] = [
  { x: 30, y: 0, w: 40, h: 46, dir: "up", delay: 240, duration: 960 },
  { x: 30, y: 46, w: 40, h: 54, dir: "down", delay: 300, duration: 980 },
  { x: 0, y: 0, w: 30, h: 40, dir: "left", delay: 400, duration: 1020 },
  { x: 0, y: 40, w: 30, h: 60, dir: "left", delay: 470, duration: 1040, push: 1.2 },
  { x: 70, y: 0, w: 30, h: 58, dir: "right", delay: 430, duration: 1020 },
  { x: 70, y: 58, w: 30, h: 42, dir: "right", delay: 510, duration: 1040, push: 1.2 },
  { x: 22, y: 82, w: 56, h: 18, dir: "down", delay: 600, duration: 1060 },
];

function pickSet(w: number) {
  if (w < 700) return MOBILE;
  if (w < 1100) return TABLET;
  return DESKTOP;
}

function offset(b: Block) {
  const push = b.push ?? 1;
  switch (b.dir) {
    case "left":
      return `translate3d(-${(110 * push).toFixed(0)}%, 0, 0)`;
    case "right":
      return `translate3d(${(110 * push).toFixed(0)}%, 0, 0)`;
    case "up":
      return `translate3d(0, -${(115 * push).toFixed(0)}%, 0)`;
    default:
      return `translate3d(0, ${(115 * push).toFixed(0)}%, 0)`;
  }
}

export function HeroMaskReveal() {
  const reduced = useReducedMotion();
  const [blocks, setBlocks] = React.useState<Block[] | null>(null);
  const [go, setGo] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // choose the arrangement once, before first paint of the overlay
  React.useEffect(() => {
    setBlocks(pickSet(window.innerWidth));
  }, []);

  React.useEffect(() => {
    if (!blocks) return;
    if (reduced) {
      setGo(true);
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }
    const raf = requestAnimationFrame(() => setGo(true));
    const t = setTimeout(() => setDone(true), 2000);
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
