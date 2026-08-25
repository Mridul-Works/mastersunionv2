import * as React from "react";

import { cn } from "../../lib/utils";

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Completion between 0 and 100. */
  value: number;
  label: React.ReactNode;
  /** Centre caption; defaults to the rounded percentage. */
  caption?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { box: "size-20", stroke: 6, text: "text-[15px]" },
  md: { box: "size-28", stroke: 7, text: "text-[20px]" },
  lg: { box: "size-36", stroke: 8, text: "text-[26px]" },
} as const;

/** Circular completion dial — cohort progress, application funnel stages, capacity. */
export const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ className, value, label, caption, size = "md", ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    const cfg = sizeMap[size];
    const r = 50 - cfg.stroke / 2;
    const circumference = 2 * Math.PI * r;

    return (
      <div ref={ref} className={cn("flex flex-col items-center gap-3", className)} {...props}>
        <div
          role="meter"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={typeof label === "string" ? label : undefined}
          className={cn("relative", cfg.box)}
        >
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              className="text-border"
              stroke="currentColor"
              strokeWidth={cfg.stroke}
            />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              className="text-teal transition-[stroke-dashoffset] duration-700 ease-out"
              stroke="currentColor"
              strokeWidth={cfg.stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
            />
          </svg>
          <span
            className={cn(
              "absolute inset-0 grid place-items-center font-display font-medium tracking-[-0.02em] text-foreground",
              cfg.text,
            )}
          >
            {caption ?? `${Math.round(pct)}%`}
          </span>
        </div>
        <p className="eyebrow text-center text-muted-foreground">{label}</p>
      </div>
    );
  },
);
ProgressRing.displayName = "ProgressRing";
