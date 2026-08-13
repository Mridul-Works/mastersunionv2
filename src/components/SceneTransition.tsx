import { useEffect, useRef, useState, type ReactNode } from "react";

/** Shared rAF-throttled scroll subscription. */
function useScrollProgress(
  ref: React.RefObject<HTMLDivElement | null>,
  compute: (rect: DOMRect, vh: number) => number,
  onProgress: (el: HTMLDivElement, p: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onProgress(el, 1);
      return;
    }
    let frame = 0;
    let last = -1;
    const run = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const p = Math.min(1, Math.max(0, compute(node.getBoundingClientRect(), window.innerHeight || 1)));
      if (Math.abs(p - last) > 0.002) {
        last = p;
        onProgress(node, p);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Scroll-linked dissolve for the hero: as the hero leaves the viewport the whole
 * block fades out and dims slightly. Opacity only — no transforms, no layout shift.
 */
export function HeroDissolve({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(
    ref,
    (rect, vh) => {
      const h = rect.height || 1;
      // Progress begins once the hero has scrolled ~35% out and completes as its
      // bottom nears the top of the viewport.
      const scrolled = Math.max(0, -rect.top);
      const start = h * 0.3;
      const end = Math.max(start + 1, h - vh * 0.12);
      return (scrolled - start) / (end - start);
    },
    (el, p) => el.style.setProperty("--exit", String(p)),
  );

  return (
    <div ref={ref} className="scene-hero" style={{ ["--exit" as string]: "0" }}>
      {children}
      <div className="scene-hero-dim" aria-hidden />
    </div>
  );
}

/**
 * Scroll-linked rise + reveal for the section that follows the hero. Content
 * children stagger upward subtly. Styles are dropped once fully revealed so
 * portals/fixed children inside are never trapped in a composited layer.
 */
export function RiseReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  useScrollProgress(
    ref,
    (rect, vh) => {
      // Starts revealing while the hero is still fading (overlap), finishes as
      // the section settles into the middle of the viewport.
      const start = vh * 0.96;
      const end = vh * 0.42;
      return (start - rect.top) / (start - end);
    },
    (el, p) => {
      el.style.setProperty("--p", String(p));
      if (p > 0.999) setSettled(true);
      else setSettled(false);
    },
  );

  return (
    <div
      ref={ref}
      className={settled ? "scene-next scene-next-settled" : "scene-next"}
      style={{ ["--p" as string]: "0" }}
    >
      {children}
    </div>
  );
}
