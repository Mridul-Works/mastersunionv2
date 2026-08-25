import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface CardCarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Accessible name for the carousel region. */
  label: string;
  /** Mono kicker rendered above the rail. */
  eyebrow?: React.ReactNode;
  /** Optional heading rendered beside the controls. */
  title?: React.ReactNode;
  /** Card width per item. */
  itemSize?: "sm" | "md" | "lg";
  /** Each child is rendered as one snap item. */
  children: React.ReactNode;
}

const sizeMap = {
  sm: "basis-[240px]",
  md: "basis-[320px]",
  lg: "basis-[420px]",
} as const;

/**
 * Horizontal snap rail of arbitrary cards with arrow controls — the workhorse
 * carousel for programme cards, faculty, or news. Scrolls natively on touch.
 */
export const CardCarousel = React.forwardRef<HTMLElement, CardCarouselProps>(
  ({ className, label, eyebrow, title, itemSize = "md", children, ...props }, ref) => {
    const railRef = React.useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = React.useState(true);
    const [atEnd, setAtEnd] = React.useState(false);

    const sync = React.useCallback(() => {
      const el = railRef.current;
      if (!el) return;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    React.useEffect(() => {
      sync();
    }, [sync, children]);

    const scrollBy = (dir: 1 | -1) => {
      const el = railRef.current;
      if (!el) return;
      el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: "smooth" });
    };

    const items = React.Children.toArray(children);

    return (
      <section
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={cn("flex w-full flex-col gap-5", className)}
        {...props}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {eyebrow ? <p className="eyebrow text-muted-foreground">{eyebrow}</p> : null}
            {title ? (
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground">
                {title}
              </h3>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous cards"
              disabled={atStart}
              onClick={() => scrollBy(-1)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next cards"
              disabled={atEnd}
              onClick={() => scrollBy(1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={sync}
          className="rail-scroll no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
        >
          {items.map((child, i) => (
            <div key={i} className={cn("shrink-0 grow-0 snap-start", sizeMap[itemSize])}>
              {child}
            </div>
          ))}
        </div>
      </section>
    );
  },
);
CardCarousel.displayName = "CardCarousel";
