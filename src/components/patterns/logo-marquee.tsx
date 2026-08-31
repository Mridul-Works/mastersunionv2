import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export type MarqueeItem = {
  /** Import the image as an ES module and pass it here. Omit for a text lockup. */
  src?: string;
  /** Accessible name / text lockup label. */
  name: string;
};

const marqueeVariants = cva("group relative w-full overflow-hidden", {
  variants: {
    variant: {
      /** Fades at both edges over the page canvas. */
      fade: "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
      /** Hard-edged band with rules top and bottom. */
      banded: "section-band border-y border-border",
    },
    speed: {
      slow: "[--marquee-duration:56s]",
      normal: "[--marquee-duration:32s]",
      fast: "[--marquee-duration:18s]",
    },
  },
  defaultVariants: { variant: "fade", speed: "normal" },
});

export interface LogoMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  items: MarqueeItem[];
  /** Screen-reader description of the strip. */
  label: string;
  /** Pause the animation on hover. Defaults to true. */
  pauseOnHover?: boolean;
}

/** Continuously scrolling strip of partner / recruiter logos or text lockups. */
export const LogoMarquee = React.forwardRef<HTMLDivElement, LogoMarqueeProps>(
  ({ className, variant, speed, items, label, pauseOnHover = true, ...props }, ref) => {
    const doubled = [...items, ...items];
    return (
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={cn(marqueeVariants({ variant, speed }), className)}
        {...props}
      >
        <ul
          className={cn(
            "flex w-max items-center gap-14 py-6 animate-marquee motion-reduce:animate-none",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {doubled.map((item, i) => (
            <li key={`${item.name}-${i}`} className="shrink-0" aria-hidden={i >= items.length}>
              {item.src ? (
                <img
                  src={item.src}
                  alt={i >= items.length ? "" : item.name}
                  loading="lazy"
                  className="h-7 w-auto opacity-70 transition-opacity hover:opacity-100"
                />
              ) : (
                <span className="font-tech text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
LogoMarquee.displayName = "LogoMarquee";
