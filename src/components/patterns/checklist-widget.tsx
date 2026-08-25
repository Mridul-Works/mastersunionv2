import * as React from "react";
import { Check, Circle, Loader } from "lucide-react";

import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

export type ChecklistItem = {
  id: string;
  label: React.ReactNode;
  status: "done" | "active" | "todo";
  hint?: React.ReactNode;
};

export interface ChecklistWidgetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  items: ChecklistItem[];
  /** Show the completion bar and count above the list. */
  showProgress?: boolean;
}

const iconMap = { done: Check, active: Loader, todo: Circle } as const;

/** Sequential checklist with completion state — onboarding, application steps, stage gates. */
export const ChecklistWidget = React.forwardRef<HTMLDivElement, ChecklistWidgetProps>(
  ({ className, title, items, showProgress = true, ...props }, ref) => {
    const done = items.filter((i) => i.status === "done").length;
    const pct = items.length ? (done / items.length) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "card-elevated flex flex-col gap-5 rounded-[4px] border border-border bg-card p-6",
          className,
        )}
        {...props}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] text-foreground">
            {title}
          </h3>
          {showProgress ? (
            <span className="font-tech text-[11px] tracking-[0.16em] text-muted-foreground">
              {done}/{items.length}
            </span>
          ) : null}
        </div>

        {showProgress ? <Progress value={pct} className="h-1" /> : null}

        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const Icon = iconMap[item.status];
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border",
                    item.status === "done" && "border-teal bg-teal text-background",
                    item.status === "active" && "border-teal text-teal",
                    item.status === "todo" && "border-border text-muted-foreground",
                  )}
                >
                  <Icon className="size-3" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span
                    className={cn(
                      "text-[14px] leading-snug",
                      item.status === "todo" ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.hint ? (
                    <span className="text-[12px] text-muted-foreground">{item.hint}</span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
ChecklistWidget.displayName = "ChecklistWidget";
