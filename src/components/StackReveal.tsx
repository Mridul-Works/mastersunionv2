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
}: {
  children: React.ReactNode;
  index: number;
  bg: string;
  isLast: boolean;
}) {
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

  return (
    <div
      style={{
        zIndex: index + 1,
        position: "relative",
        // content scroll range + one viewport of pinned "cover-up" range
        // one viewport of overlap so the NEXT panel (pulled up by -vh)
        // slides over this one while it stays pinned
        height: measured ? (isLast ? contentH : contentH + vh) : undefined,
        // pull this panel up so it enters over the previous pinned panel
        marginTop: index > 0 && measured ? -vh : undefined,
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
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  const panels = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={`relative ${className}`}>
      {panels.map((child, i) => (
        <Panel key={i} index={i} bg={bg} isLast={i === panels.length - 1}>
          {child}
        </Panel>
      ))}
    </div>
  );
}
