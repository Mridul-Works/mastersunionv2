/* -------------------------------------------------------------------------- */
/*  Single scroll driver.                                                     */
/*                                                                            */
/*  One passive scroll listener + one requestAnimationFrame per frame for the  */
/*  whole page. Every scroll-linked animation subscribes here instead of       */
/*  attaching its own listener, which removes duplicate rAF loops and — more   */
/*  importantly — the read/write/read/write layout thrash you get when several  */
/*  independent listeners interleave getBoundingClientRect() calls with style  */
/*  writes.                                                                    */
/*                                                                            */
/*  Frame order is strict: all measure() callbacks run first (reads), then all */
/*  write callbacks run (writes). Viewport metrics are cached and refreshed on  */
/*  resize only, never per frame.                                              */
/* -------------------------------------------------------------------------- */

export type ScrollState = {
  /** window.scrollY at the start of the frame */
  y: number;
  /** cached viewport height (updated on resize) */
  vh: number;
  /** cached viewport width (updated on resize) */
  vw: number;
};

type Writer = (s: ScrollState) => void;
type Measurer = () => void;

const writers = new Set<Writer>();
const measurers = new Set<Measurer>();

const state: ScrollState = { y: 0, vh: 0, vw: 0 };

let raf = 0;
let started = false;
let lastY = -1;
let dirty = true;

function runFrame() {
  state.y = window.scrollY;
  if (!dirty && state.y === lastY) return;
  lastY = state.y;
  dirty = false;
  // read phase
  for (const m of measurers) m();
  // write phase
  for (const w of writers) w(state);
}

function frame() {
  raf = 0;
  runFrame();
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

/**
 * Scroll handler. The writes run synchronously here so the new transforms land
 * in the SAME frame the browser is already committing for this scroll offset.
 * Deferring them to requestAnimationFrame costs one frame of lag, which shows up
 * on desktop as animated/sticky layers drifting a few pixels against the rest of
 * the page — the up/down jitter. A trailing rAF pass still covers inertial or
 * compositor-only scrolls that do not dispatch an event every frame.
 */
function onScroll() {
  runFrame();
  schedule();
}

function syncViewport() {
  state.vh = window.innerHeight || 1;
  state.vw = window.innerWidth || 1;
  dirty = true;
  schedule();
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  syncViewport();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", syncViewport, { passive: true });
  window.addEventListener("orientationchange", syncViewport, { passive: true });
}


/** Forces the next frame to run even if the scroll position has not changed. */
export function invalidateScroll() {
  dirty = true;
  schedule();
}

/** Cached viewport metrics — safe to read inside a write callback. */
export function viewport(): ScrollState {
  if (!state.vh && typeof window !== "undefined") syncViewport();
  return state;
}

/**
 * Subscribe a scroll-linked writer.
 * `measure` (optional) runs in the frame's read phase — use it only for geometry
 * that genuinely changes while scrolling (sticky/pinned elements).
 */
export function onScrollFrame(write: Writer, measure?: Measurer) {
  start();
  writers.add(write);
  if (measure) measurers.add(measure);
  dirty = true;
  schedule();
  return () => {
    writers.delete(write);
    if (measure) measurers.delete(measure);
  };
}

/** Resize-only subscription (also fires on orientation change). Runs immediately. */
export function onViewportResize(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  cb();
  const handler = () => {
    cb();
    invalidateScroll();
  };
  window.addEventListener("resize", handler, { passive: true });
  window.addEventListener("orientationchange", handler, { passive: true });
  return () => {
    window.removeEventListener("resize", handler);
    window.removeEventListener("orientationchange", handler);
  };
}
