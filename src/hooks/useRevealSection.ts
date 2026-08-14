import { useEffect, useRef, useState } from "react";

/**
 * Attaches an IntersectionObserver to a section element and returns a
 * `reveal-section` className plus an `is-revealed` state once it begins
 * entering the viewport. Content marked with `reveal-up` inside the section
 * will fade up and in once.
 *
 * Respects `prefers-reduced-motion` by immediately revealing the content.
 */
export function useRevealSection<T extends HTMLElement = HTMLElement>(
  className = "",
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
) {
  const { threshold = 0.05, rootMargin = "0px 0px -5% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          if (once) io.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return {
    ref,
    className: `reveal-section ${className} ${revealed ? "is-revealed" : ""}`.trim(),
    revealed,
  };
}

export default useRevealSection;
