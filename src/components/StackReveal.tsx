import * as React from "react";

/**
 * Stacked sticky section reveal.
 *
 * Each direct child becomes a panel. The panel scrolls normally until its FULL
 * content (including tall galleries/carousels) has been revealed, then it pins
 * while the next panel scrolls up over it on an opaque, higher z-index layer.
 *
 * The scroll range of every panel is derived from its measured content height:
 *   wrapper height = contentHeight + viewportHeight
 *   sticky top     = min(0, viewportHeight - contentHeight)
 * so tall sections keep scrolling until their bottom edge meets the viewport
 * bottom, and short sections behave exactly as before — no arbitrary heights,
 * no dead space.
 */
function Panel({
  children,
  index,
  bg,
  isLast,
  coverVhMultiplier,
  prevCoverVhMultiplier,
}: {
  children: React.ReactNode;
  index: number;
  bg: string;
  isLast: boolean;
  coverVhMultiplier: number;
  prevCoverVhMultiplier: number;
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = React.useState(0);
  const [vh, setVh] = React.useState(0);

  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      setContentH(el.scrollHeight);
      setVh(window.innerHeight);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const measured = contentH > 0 && vh > 0;
  const overflow = measured ? Math.max(0, contentH - vh) : 0;
  const coverVh = measured ? coverVhMultiplier * vh : 0;
  const prevCoverVh = measured ? prevCoverVhMultiplier * vh : 0;

  // Scroll-progress-driven blur/dim while the next panel covers this one.
  React.useEffect(() => {
    if (isLast || !measured) return;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const scrolled = -wrap.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (scrolled - overflow) / Math.max(1, coverVh)));
      if (Math.abs(p - last) < 0.004) return;
      last = p;
      if (p <= 0) {
        inner.style.filter = "";
        inner.style.opacity = "";
        return;
      }
      const blur = reduced ? 0 : (10 * p).toFixed(2);
      inner.style.filter = reduced
        ? `brightness(${(1 - 0.12 * p).toFixed(3)})`
        : `blur(${blur}px) brightness(${(1 - 0.12 * p).toFixed(3)})`;
      inner.style.opacity = (1 - 0.15 * p).toFixed(3);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      inner.style.filter = "";
      inner.style.opacity = "";
    };
  }, [isLast, measured, overflow, coverVh]);

  return (
    <div
      ref={wrapRef}
      style={{
        zIndex: index + 1,
        position: "relative",
        // content scroll range + cover-up range; the cover-up range is
        // multiplied per panel so certain sections stay pinned longer and the
        // next sheet rises more slowly over them.
        height: measured ? (isLast ? contentH : contentH + coverVh) : undefined,
        // pull this panel up so it enters over the previous pinned panel by
        // exactly the previous panel's cover-up range
        marginTop: index > 0 && measured ? -prevCoverVh : undefined,
      }}
    >
      <div
        ref={innerRef}
        className={`sticky ${bg}`}
        style={{ top: measured ? -overflow : 0 }}
      >
        {children}
      </div>
    </div>
  );

}

export default function StackReveal({
  children,
  className = "",
  bg = "bg-[#0a0a0a]",
  coverMultipliers,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  /** Per-panel cover-up duration multipliers, relative to 1 viewport. */
  coverMultipliers?: number[];
}) {
  const panels = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={`relative ${className}`}>
      {panels.map((child, i) => (
        <Panel
          key={i}
          index={i}
          bg={bg}
          isLast={i === panels.length - 1}
          coverVhMultiplier={coverMultipliers?.[i] ?? 1}
          prevCoverVhMultiplier={coverMultipliers?.[i - 1] ?? 1}
        >
          {child}
        </Panel>
      ))}
    </div>
  );
}
