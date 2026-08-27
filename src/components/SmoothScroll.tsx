import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth-scroll layer.
 *
 * Lenis handles wheel input natively (no manual delta injection, no per-frame
 * scrollTo calls — those fought Lenis's own animation and made the page feel
 * stuck). A moderate lerp gives a weighted glide that still tracks the
 * trackpad 1:1. Single instance on window.__lenis for nav/anchor scrollTo.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
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

