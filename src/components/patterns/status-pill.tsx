import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-tech text-[10px] uppercase tracking-[0.18em]",
  {
    variants: {
      status: {
        live: "border-teal/40 bg-teal/10 text-teal",
        pending: "border-border bg-muted text-muted-foreground",
        blocked: "border-destructive/40 bg-destructive/10 text-destructive",
        closed: "border-border bg-foreground/5 text-foreground/70",
      },
    },
    defaultVariants: { status: "pending" },
  },
);

const dotVariants = cva("size-1.5 rounded-full", {
  variants: {
    status: {
      live: "bg-teal",
      pending: "bg-muted-foreground",
      blocked: "bg-destructive",
      closed: "bg-foreground/50",
    },
  },
  defaultVariants: { status: "pending" },
});

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  /** Hide the leading state dot. */
  hideDot?: boolean;
}

/** Compact state indicator with consistent, readable status colours. */
export const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  ({ className, status, hideDot, children, ...props }, ref) => (
    <span ref={ref} className={cn(pillVariants({ status }), className)} {...props}>
      {hideDot ? null : <span className={dotVariants({ status })} aria-hidden="true" />}
      {children}
    </span>
  ),
);
StatusPill.displayName = "StatusPill";
