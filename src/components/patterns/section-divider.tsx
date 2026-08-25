import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const sectionDividerVariants = cva("mx-auto h-px w-full", {
  variants: {
    variant: {
      /** The signature three-colour spectrum hairline used between page sections. */
      spectrum: "spectrum-rule",
      /** Bottle-green to accent fade, aligned left. */
      brand: "rule-gradient",
      /** Quiet structural hairline. */
      hairline: "bg-border",
    },
    inset: {
      none: "max-w-none",
      page: "max-w-[85%]",
      narrow: "max-w-[42rem]",
    },
  },
  defaultVariants: { variant: "spectrum", inset: "page" },
});

export interface SectionDividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionDividerVariants> {}

/** Editorial rule that separates page sections. Decorative by default. */
export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className, variant, inset, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-hidden="true"
      className={cn(sectionDividerVariants({ variant, inset }), className)}
      {...props}
    />
  ),
);
SectionDivider.displayName = "SectionDivider";
