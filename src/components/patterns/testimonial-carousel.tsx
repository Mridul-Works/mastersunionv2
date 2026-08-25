import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { QuoteBlock } from "./quote-block";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLElement> {
  testimonials: Testimonial[];
  /** Accessible name for the carousel region. */
  label: string;
  eyebrow?: React.ReactNode;
  /** Rendering of the active quote. */
  variant?: "card" | "pull";
}

/** One quote at a time with arrow + dot navigation, built on QuoteBlock. */
export const TestimonialCarousel = React.forwardRef<HTMLElement, TestimonialCarouselProps>(
  ({ className, testimonials, label, eyebrow, variant = "pull", ...props }, ref) => {
    const [index, setIndex] = React.useState(0);
    const count = testimonials.length;
    const active = testimonials[index];
    const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

    if (!active) return null;

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
          "flex w-full flex-col gap-6 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        {eyebrow ? <p className="eyebrow text-muted-foreground">{eyebrow}</p> : null}

        <QuoteBlock
          key={active.id}
          variant={variant}
          quote={active.quote}
          author={active.author}
          role={active.role}
          className="mu-anim-up"
        />

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${t.author}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  i === index ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Previous quote" onClick={() => go(-1)}>
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next quote" onClick={() => go(1)}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    );
  },
);
TestimonialCarousel.displayName = "TestimonialCarousel";
