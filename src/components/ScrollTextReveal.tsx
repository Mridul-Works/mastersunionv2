import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-linked fade in / fade out + a gradient text-reveal sweep.
 *
 * The reveal is done entirely with a background-clip:text gradient driven by a
 * CSS custom property — no character splitting, no cloned/duplicated text.
 */
export default function ScrollTextReveal({
  children,
  as: Tag = "div",
  className = "",
  sweep = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Apply the gradient sweep on top of the fade. */
  sweep?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.setProperty("--vis", "1");
      el.style.setProperty("--sweep", "1");
      return;
    }

    let frame = 0;
    let lastVis = -1;
    let lastSweep = -1;

    const run = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Enter: from 88% of the viewport up to 58%.
      const enter = (vh * 0.9 - rect.top) / (vh * 0.32);
      // Exit: starts fading once the block passes ~22% from the top.
      const exit = (vh * 0.2 - rect.bottom) / (vh * 0.28);

      const vis = Math.min(
        Math.max(enter, 0),
        Math.max(0, 1 - Math.max(exit, 0)),
        1,
      );
      const sw = Math.min(1, Math.max(0, enter));

      if (Math.abs(vis - lastVis) > 0.003) {
        lastVis = vis;
        node.style.setProperty("--vis", String(vis));
      }
      if (Math.abs(sw - lastSweep) > 0.003) {
        lastSweep = sw;
        node.style.setProperty("--sweep", String(sw));
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
  }, []);

  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref as never}
      className={`scroll-fade${sweep ? " text-sweep" : ""}${className ? ` ${className}` : ""}`}
      style={{ ["--vis" as string]: "0", ["--sweep" as string]: "0" }}
    >
      {children}
    </Comp>
  );
}
