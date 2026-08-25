import * as React from "react";

import { cn } from "../../lib/utils";

export interface CountdownWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Target moment; accepts a Date or an ISO string. */
  deadline: Date | string;
  label: React.ReactNode;
  /** Copy shown once the deadline has passed. */
  expiredLabel?: React.ReactNode;
  tone?: "paper" | "ink";
}

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
}

/** Admissions-style deadline countdown. Ticks client-side once mounted. */
export const CountdownWidget = React.forwardRef<HTMLDivElement, CountdownWidgetProps>(
  (
    { className, deadline, label, expiredLabel = "Applications closed", tone = "paper", ...props },
    ref,
  ) => {
    const target = React.useMemo(
      () => (deadline instanceof Date ? deadline : new Date(deadline)).getTime(),
      [deadline],
    );
    const [now, setNow] = React.useState<number | null>(null);

    React.useEffect(() => {
      setNow(Date.now());
      const id = window.setInterval(() => setNow(Date.now()), 1000);
      return () => window.clearInterval(id);
    }, []);

    const remaining = now === null ? null : target - now;
    const values = parts(remaining ?? 0);
    const expired = remaining !== null && remaining <= 0;
    const ink = tone === "ink";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-5 rounded-[4px] p-6",
          ink ? "bg-foreground text-background" : "card-elevated border border-border bg-card",
          className,
        )}
        {...props}
      >
        <p className="eyebrow opacity-70">{label}</p>
        {expired ? (
          <p className="font-serif-italic text-[24px] text-teal">{expiredLabel}</p>
        ) : (
          <div className="grid grid-cols-4 gap-px overflow-hidden bg-border/60">
            {units.map((unit, i) => (
              <div
                key={unit}
                className={cn(
                  "flex flex-col items-center gap-1 py-3",
                  ink ? "bg-foreground" : "bg-card",
                )}
              >
                <span
                  className="font-display text-[26px] font-medium leading-none tracking-[-0.03em] tabular-nums"
                  aria-hidden={now === null}
                >
                  {now === null ? "--" : String(values[i]).padStart(2, "0")}
                </span>
                <span className="eyebrow opacity-60">{unit}</span>
              </div>
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {expired
            ? expiredLabel
            : now === null
              ? "Loading countdown"
              : `${values[0]} days, ${values[1]} hours remaining`}
        </p>
      </div>
    );
  },
);
CountdownWidget.displayName = "CountdownWidget";
