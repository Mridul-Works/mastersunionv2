import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Heavy, buttery smooth-scroll layer.
 *
 * - Pure lerp interpolation toward the native target — a trackpad flick
 *   produces a controlled glide that gradually settles, never a fast jump.
 * - wheelMultiplier: 1 and no deltaY manipulation: input is never amplified.
 * - Single instance on window.__lenis so existing consumers (scrollTo for
 *   nav/anchor jumps) keep working. All scroll-driven animations keep reading
 *   the native scroll position because Lenis scrolls the real window.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // low lerp = heavy, slow settle
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
