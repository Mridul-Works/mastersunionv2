import { useEffect } from "react";

/**
 * Global smooth-scroll layer (Lenis).
 * - wheelMultiplier stays at 1 (no input amplification, deltaY untouched)
 * - gentle lerp so the page glides toward the native scroll position
 * - disabled for reduced-motion users and touch devices (native momentum)
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
        lerp: 0.085, // heavy, controlled glide toward native position
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
