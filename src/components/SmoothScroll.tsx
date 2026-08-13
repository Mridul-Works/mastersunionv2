import { useEffect, type ReactNode } from "react";
import { useMotionMode } from "@/lib/motion-mode";

/**
 * Lenis-based smooth scroll on the native window scroller.
 * Keeps native scroll semantics so GSAP ScrollTrigger and CSS `position: sticky`
 * work without proxies. Exposes the instance on window.__lenis for other modules.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { isLite, ready } = useMotionMode();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Lite mode keeps native scrolling: no rAF loop, no wheel interception.
    if (!ready || isLite) return;
    let lenis: any = null;
    let raf = 0;
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.6,
        touchMultiplier: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      (window as any).__lenis = lenis;
      window.dispatchEvent(new CustomEvent("lenis:ready", { detail: lenis }));

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try {
        lenis?.destroy?.();
      } catch {}
      (window as any).__lenis = null;
    };
  }, [isLite, ready]);

  return <>{children}</>;
}
