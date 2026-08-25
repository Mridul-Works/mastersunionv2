import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const headingVariants = cva("flex flex-col gap-3", {
  variants: {
    align: {
      left: "items-start text-left",
      center: "items-center text-center",
    },
    size: {
      md: "[&_h2]:text-[28px] [&_h2]:leading-[1.1] sm:[&_h2]:text-[36px]",
      lg: "[&_h2]:text-[34px] [&_h2]:leading-[1.05] sm:[&_h2]:text-[52px]",
    },
  },
  defaultVariants: { align: "left", size: "lg" },
});

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof headingVariants> {
  /** Mono uppercase kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Plain part of the headline. */
  title: React.ReactNode;
  /** Serif-italic phrase appended to the headline for editorial emphasis. */
  emphasis?: React.ReactNode;
  /** Supporting paragraph below the headline. */
  description?: React.ReactNode;
  /** Trailing slot for actions or metadata. */
  action?: React.ReactNode;
}

/** Eyebrow + editorial headline block used to open every page section. */
export const SectionHeading = React.forwardRef<HTMLElement, SectionHeadingProps>(
  ({ className, align, size, eyebrow, title, emphasis, description, action, ...props }, ref) => (
    <header ref={ref} className={cn(headingVariants({ align, size }), className)} {...props}>
      {eyebrow ? <p className="eyebrow text-muted-foreground">{eyebrow}</p> : null}
      <h2 className="font-display font-medium tracking-[-0.02em] text-foreground">
        {title}
        {emphasis ? <> <span className="text-gradient-brand">{emphasis}</span></> : null}
      </h2>
      {description ? (
        <p className="max-w-[46rem] text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </header>
  ),
);
SectionHeading.displayName = "SectionHeading";
