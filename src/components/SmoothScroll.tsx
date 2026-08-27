import { useEffect } from "react";

/**
 * Global inertial (momentum) scrolling layer (Lenis).
 * - duration + exponential ease-out => the page keeps gliding and decelerates
 * - wheelMultiplier stays at 1 (no input amplification, deltaY untouched)
 * - disabled for reduced-motion users; touch keeps native momentum
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: any;
    let raf = 0;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        // inertial mode: each impulse carries momentum, then decelerates
        duration: 1.35,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1, // never amplify wheel input
        touchMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });


      (window as any).__lenis = lenis;

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if ((window as any).__lenis === lenis) delete (window as any).__lenis;
      lenis?.destroy?.();
    };
  }, []);

  return null;
}
