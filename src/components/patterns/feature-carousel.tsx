import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type FeatureSlide = {
  id: string;
  /** Mono index label, e.g. "N°01". Generated from position when omitted. */
  number?: string;
  category: string;
  title: string;
  description: string;
  /** Imported image module URL. */
  image?: string;
  tags?: string[];
};

export interface FeatureCarouselProps extends React.HTMLAttributes<HTMLElement> {
  slides: FeatureSlide[];
  /** Mono kicker rendered above the slide stack. */
  eyebrow?: string;
  /** Accessible name for the carousel region. */
  label: string;
  /** Ink-dark editorial treatment (default) or paper. */
  tone?: "ink" | "paper";
}

/**
 * Signature editorial carousel: one large slide at a time with an index counter,
 * keyboard/arrow navigation and a rail of dots. Content is fully data-driven.
 */
export const FeatureCarousel = React.forwardRef<HTMLElement, FeatureCarouselProps>(
  ({ className, slides, eyebrow, label, tone = "ink", ...props }, ref) => {
    const [index, setIndex] = React.useState(0);
    const count = slides.length;
    const slide = slides[index];

    const go = React.useCallback(
      (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
      [count],
    );

    if (!slide) return null;

    const ink = tone === "ink";

    return (
      <section
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        className={cn(
          "relative overflow-hidden rounded-[4px] border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring",
          ink ? "bg-foreground text-background" : "card-elevated bg-card text-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border/40 px-6 py-4">
          <p className="eyebrow opacity-70">{eyebrow ?? label}</p>
          <p className="font-tech text-[11px] tracking-[0.2em] opacity-70">
            {String(index + 1).padStart(2, "0")}
            <span className="opacity-50"> / {String(count).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_minmax(0,420px)]">
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
            <div className="flex flex-col gap-4">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] opacity-60">
                {slide.number ?? `N°${String(index + 1).padStart(2, "0")}`} · {slide.category}
              </p>
              <h3 className="max-w-[22ch] font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[40px]">
                {slide.title}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed opacity-75">
                {slide.description}
              </p>
              {slide.tags?.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {slide.tags.map((tag) => (
                    <Badge key={tag} variant={ink ? "secondary" : "outline"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                size="icon"
                variant={ink ? "secondary" : "outline"}
                aria-label="Previous slide"
                onClick={() => go(-1)}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant={ink ? "secondary" : "outline"}
                aria-label="Next slide"
                onClick={() => go(1)}
              >
                <ArrowRight className="size-4" />
              </Button>
              <div className="ml-2 flex items-center gap-2" role="tablist" aria-label="Slides">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={s.title}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === index ? "w-8 bg-current opacity-90" : "w-3 bg-current opacity-30",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[220px] border-t border-border/40 md:border-l md:border-t-0">
            {slide.image ? (
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden />
            )}
          </div>
        </div>
      </section>
    );
  },
);
FeatureCarousel.displayName = "FeatureCarousel";
