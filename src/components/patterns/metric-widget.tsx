import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { cn } from "../../lib/utils";

const metricVariants = cva("flex flex-col gap-4 rounded-[4px] p-6", {
  variants: {
    tone: {
      /** Paper card on the page canvas. */
      paper: "card-elevated border border-border bg-card text-foreground",
      /** Ink panel for hero dashboards. */
      ink: "bg-foreground text-background",
    },
  },
  defaultVariants: { tone: "paper" },
});

export interface MetricWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricVariants> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Period-over-period change, e.g. "+12.4%". */
  delta?: string;
  direction?: "up" | "down" | "flat";
  hint?: React.ReactNode;
  /** Normalised 0–1 series rendered as a sparkline. */
  series?: number[];
}

function Sparkline({ series, className }: { series: number[]; className?: string }) {
  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const span = max - min || 1;
  const points = series
    .map((v, i) => `${(i / (series.length - 1 || 1)) * 100},${28 - ((v - min) / span) * 26}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-8 w-full", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const directionIcon = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus } as const;

/** Single KPI tile: label, headline number, movement and an optional sparkline. */
export const MetricWidget = React.forwardRef<HTMLDivElement, MetricWidgetProps>(
  ({ className, tone, label, value, delta, direction = "up", hint, series, ...props }, ref) => {
    const Icon = directionIcon[direction];
    return (
      <div ref={ref} className={cn(metricVariants({ tone }), className)} {...props}>
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow opacity-70">{label}</p>
          {delta ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-tech text-[11px] tracking-[0.12em]",
                direction === "down" ? "text-destructive" : "text-teal",
                direction === "flat" && "opacity-60",
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {delta}
            </span>
          ) : null}
        </div>
        <p className="font-display text-[34px] font-medium leading-none tracking-[-0.03em]">
          {value}
        </p>
        {series && series.length > 1 ? <Sparkline series={series} className="text-teal" /> : null}
        {hint ? <p className="text-[13px] leading-snug opacity-70">{hint}</p> : null}
      </div>
    );
  },
);
MetricWidget.displayName = "MetricWidget";
