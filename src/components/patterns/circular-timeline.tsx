import * as React from "react";

import { cn } from "../../lib/utils";

export type TimelineEntry = {
  /** Short axis label, typically a year. */
  year: string;
  title: string;
  points?: string[];
  stats?: { value: string; label: string }[];
};

export interface CircularTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: TimelineEntry[];
  /** Accessible name for the timeline. */
  label?: string;
}

const STEP = 24; // degrees between entries
const RADIUS = 360;

/**
 * Milestone timeline whose years ride a large spectrum ring anchored off-canvas.
 * Drag, wheel or arrow keys rotate the ring; the active entry expands into a panel.
 */
export const CircularTimeline = React.forwardRef<HTMLDivElement, CircularTimelineProps>(
  ({ className, entries, label = "Milestones timeline", ...props }, ref) => {
    const [active, setActive] = React.useState(0);
    const [offset, setOffset] = React.useState(0);
    const [dragging, setDragging] = React.useState(false);
    const drag = React.useRef({ y: 0, base: 0, on: false });
    const stageRef = React.useRef<HTMLDivElement | null>(null);

    const count = entries.length;
    const clamp = React.useCallback(
      (v: number) => Math.max(0, Math.min(count - 1, v)),
      [count],
    );

    React.useEffect(() => {
      const el = stageRef.current;
      if (!el) return;
      let lock = 0;
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 8) return;
        const now = Date.now();
        if (now < lock) return;
        const dir = e.deltaY > 0 ? 1 : -1;
        setActive((a) => {
          const n = clamp(a + dir);
          if (n !== a) {
            e.preventDefault();
            lock = now + 320;
          }
          return n;
        });
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [clamp]);

    const endDrag = () => {
      if (!drag.current.on) return;
      const next = clamp(Math.round(drag.current.base + offset));
      drag.current.on = false;
      setDragging(false);
      setOffset(0);
      setActive(next);
    };

    const pos = active + offset;
    const entry = entries[active];
    if (!entry) return null;

    return (
      <div
        ref={ref}
        className={cn("relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]", className)}
        {...props}
      >
        <div
          ref={stageRef}
          tabIndex={0}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`timeline-entry-${active}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") setActive((a) => clamp(a + 1));
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") setActive((a) => clamp(a - 1));
          }}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            drag.current = { y: e.clientY, base: active, on: true };
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (!drag.current.on) return;
            const delta = (e.clientY - drag.current.y) / 90;
            setOffset(clamp(drag.current.base - delta) - drag.current.base);
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={cn(
            "relative h-[460px] touch-none select-none overflow-hidden rounded-[4px] border border-border bg-paper outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-[520px]",
            dragging ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          <div
            aria-hidden
            className="spectrum-ring pointer-events-none absolute rounded-full"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              left: -RADIUS - 20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          {entries.map((item, i) => {
            const angle = (i - pos) * STEP;
            const isActive = i === active;
            return (
              <button
                key={item.year}
                id={`timeline-entry-${i}`}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                style={{
                  transform: `translateY(-50%) rotate(${angle}deg) translateX(${RADIUS - 20}px) rotate(${-angle}deg)`,
                  opacity: Math.max(0, 1 - Math.abs(angle) / 70),
                }}
                className={cn(
                  "absolute left-[-20px] top-1/2 origin-left whitespace-nowrap rounded-full px-4 py-1.5 font-tech text-[13px] tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        <article className="card-elevated flex flex-col gap-5 border border-border bg-card p-6 sm:p-8">
          <p className="eyebrow text-muted-foreground">{entry.year}</p>
          <h3 className="font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-foreground">
            {entry.title}
          </h3>
          {entry.points?.length ? (
            <ul className="flex flex-col gap-2.5">
              {entry.points.map((p) => (
                <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
          {entry.stats?.length ? (
            <dl className="grid grid-cols-2 gap-4 border-t border-border pt-5">
              {entry.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dd className="font-display text-[24px] font-medium leading-none tracking-[-0.02em] text-foreground">
                    {s.value}
                  </dd>
                  <dt className="eyebrow text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </article>
      </div>
    );
  },
);
CircularTimeline.displayName = "CircularTimeline";
