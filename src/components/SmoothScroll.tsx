import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import Lenis from "lenis";
import { invalidateScroll, setLenisSource } from "@/lib/scroll-driver";

/**
 * Smooth-scroll layer.
 *
 * Lenis handles wheel input natively (no manual delta injection, no per-frame
 * scrollTo calls — those fought Lenis's own animation and made the page feel
 * stuck). A moderate lerp gives a weighted glide that still tracks the
 * trackpad without allowing one gesture to skip several sections. Single
 * instance on window.__lenis for nav/anchor scrollTo.
 *
 * The /placements page uses a lower-sensitivity Lenis config so the page
 * scrolls more gently, while the scroll driver reads Lenis's smoothed value
 * directly to keep scroll-linked transforms in sync and avoid the stutter
 * that comes from two independent animation loops.
 */
export default function SmoothScroll() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const lenisRef = useRef<Lenis | undefined>(undefined);

  useEffect(() => {
    const isPlacements = pathname === "/placements";

    // Lower input sensitivity on the placements page so one gesture doesn't
    // cover too much ground. A slightly stronger lerp keeps the glide smooth.
    const lenis = new Lenis({
      lerp: isPlacements ? 0.06 : 0.085,
      wheelMultiplier: isPlacements ? 0.18 : 0.24,
      touchMultiplier: isPlacements ? 0.25 : 0.35,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    setLenisSource(lenis);

    // Feed Lenis's smoothed scroll value into the shared driver so every
    // scroll-linked transform stays locked to the same source of truth, and
    // flush the driver synchronously inside Lenis's own tick so transforms and
    // native sticky layout commit together (no cross-loop pixel oscillation).
    const offScroll = lenis.on("scroll", () => runScrollFrameNow());


    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      offScroll();
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenisSource(undefined);
      if (lenisRef.current === lenis) {
        lenisRef.current = undefined;
      }
      const w = window as unknown as { __lenis?: Lenis };
      if (w.__lenis === lenis) {
        delete w.__lenis;
      }
    };
  }, [pathname]);

  return null;
}
