import { useEffect, useRef, useState, type ReactNode } from "react";

/** Content elements that get their own rise-reveal. */
const REVEAL_SELECTOR = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "img", "video", "figure", "blockquote", "li",
  "button", "a[href]", "table", "hr",
  "[data-reveal]",
].join(",");

/**
 * Reveals every piece of content (text, images, cards, links) inside a subtree
 * as it scrolls into view, with a small stagger between items on the same row.
 * Skips elements nested inside an already-revealing element so opacity never
 * compounds.
 */
function useElementReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (el) =>
        !el.closest("[data-no-reveal]") &&
        !(el.parentElement && el.parentElement.closest(".mu-el-reveal")),
    );
    if (!nodes.length) return;

    // Stagger by visual row so grid items cascade left → right.
    const rows = new Map<number, number>();
    for (const el of nodes) {
      const top = Math.round((el.getBoundingClientRect().top + window.scrollY) / 40);
      const idx = rows.get(top) ?? 0;
      rows.set(top, idx + 1);
      el.style.setProperty("--el-delay", `${Math.min(idx, 6) * 0.07}s`);
      el.classList.add("mu-el-reveal");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          io.unobserve(el);
          window.setTimeout(() => el.classList.add("is-done"), 1400);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    for (const el of nodes) io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


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
export function RiseReveal({
  children,
  depth = 3,
}: {
  children: ReactNode;
  /** DOM depth of the staggered content blocks inside the wrapped <section>. */
  depth?: 1 | 2 | 3;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  useElementReveal(ref);

  useScrollProgress(
    ref,
    (rect, vh) => {
      // Starts revealing while the hero is still fading (overlap), finishes as
      // the section settles into the middle of the viewport.
      const start = vh * 0.96;
      const end = vh * 0.42;
      const base = (start - rect.top) / (start - end);
      // Sections that can never reach the middle of the viewport (page end)
      // settle once their bottom edge is in view.
      const tail = rect.bottom <= vh ? 1 : 0;
      return Math.max(base, tail);
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
      className={`scene-next scene-d${depth}${settled ? " scene-next-settled" : ""}`}
      style={{ ["--p" as string]: "0" }}
    >
      {children}
    </div>
  );
}
