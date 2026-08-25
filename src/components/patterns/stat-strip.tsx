import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export type Stat = {
  value: React.ReactNode;
  label: React.ReactNode;
  hint?: React.ReactNode;
};

const stripVariants = cva("grid w-full gap-px overflow-hidden bg-border", {
  variants: {
    variant: {
      /** Bordered card grid on paper. */
      panel: "card-elevated border border-border",
      /** Bare rule-separated cells, sits directly on the page canvas. */
      bare: "bg-transparent gap-8",
    },
    columns: {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: { variant: "panel", columns: 4 },
});

export interface StatStripProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof stripVariants> {
  stats: Stat[];
}

/** Row of headline metrics — the proof strip under a hero or section heading. */
export const StatStrip = React.forwardRef<HTMLDListElement, StatStripProps>(
  ({ className, variant, columns, stats, ...props }, ref) => (
    <dl ref={ref} className={cn(stripVariants({ variant, columns }), className)} {...props}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col gap-1.5 p-6",
            variant === "bare" ? "border-l border-border pl-5" : "bg-card",
          )}
        >
          <dt className="eyebrow text-muted-foreground">{stat.label}</dt>
          <dd className="font-display text-[30px] font-medium leading-none tracking-[-0.03em] text-foreground">
            {stat.value}
          </dd>
          {stat.hint ? (
            <p className="text-[13px] leading-snug text-muted-foreground">{stat.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  ),
);
StatStrip.displayName = "StatStrip";
