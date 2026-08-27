import { useEffect } from "react";
import Lenis from "lenis";

const MAX_WHEEL_DELTA = 44; // px — per wheel event cap
const MAX_PER_FRAME = 22; // px — hard speed limit per frame (~1320px/s @ 60fps)

/**
 * Heavy, buttery smooth-scroll layer with a hard scroll-speed limit.
 *
 * - Pure lerp interpolation toward the native target — a trackpad flick
 *   produces a controlled glide that gradually settles, never a fast jump.
 * - Wheel deltas are capped per event, and a per-frame cap prevents a single
 *   trackpad flick from carrying through multiple sections at once.
 * - Single instance on window.__lenis so existing consumers (scrollTo for
 *   nav/anchor jumps) keep working. All scroll-driven animations keep reading
 *   the native scroll position because Lenis scrolls the real window.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.055, // heavier interpolation for a slower, gradual settle
      wheelMultiplier: 0, // we feed wheel deltas manually so we can cap speed
      touchMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let pendingWheelY = 0;
    let lastFrameTime = performance.now();

    const isOverScrollable = (target: EventTarget | null): boolean => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight + 2
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const capDelta = (delta: number) =>
      Math.sign(delta) * Math.min(Math.abs(delta), MAX_WHEEL_DELTA);

    const onWheel = (e: WheelEvent) => {
      // Let nested scrollable containers (carousels, program finder, etc.)
      // handle their own wheel events natively.
      if (isOverScrollable(e.target)) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      pendingWheelY += capDelta(e.deltaY) * 0.62;
    };

    let raf = 0;
    const loop = (time: number) => {
      const dt = Math.min(time - lastFrameTime, 64); // clamp tab-switch spikes
      lastFrameTime = time;

      if (pendingWheelY !== 0) {
        const frameCap = MAX_PER_FRAME * Math.max(dt / 16.67, 0.5);
        const applied =
          Math.sign(pendingWheelY) *
          Math.min(Math.abs(pendingWheelY), frameCap);
        pendingWheelY -= applied;
        lenis.scrollBy(applied);
      }

      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("wheel", onWheel, { passive: false });

    const clearPendingOnHide = () => {
      if (document.hidden) pendingWheelY = 0;
    };
    document.addEventListener("visibilitychange", clearPendingOnHide);

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", clearPendingOnHide);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
