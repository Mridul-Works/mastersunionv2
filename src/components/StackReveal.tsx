import * as React from "react";

/**
 * Stacked sticky section reveal.
 *
 * Each direct child becomes a panel that pins to the top of the viewport while
 * the next panel scrolls up over it. Incoming panels are opaque and carry a
 * higher z-index, so the previous panel is progressively concealed instead of
 * moving away. Pure CSS sticky — smooth native scrolling, no snapping, no
 * parallax transforms, identical behaviour on desktop and mobile.
 */
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
        <div
          key={i}
          className={`sticky top-0 min-h-[100svh] ${bg}`}
          style={{ zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
