import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../../lib/utils";

const quoteVariants = cva("flex flex-col gap-6", {
  variants: {
    variant: {
      /** Paper card with the editorial 4px radius. */
      card: "card-elevated border border-border bg-card p-6 sm:p-8",
      /** Bare pull-quote with a bottle-green rule at the leading edge. */
      pull: "border-l-2 border-teal pl-6",
    },
    size: {
      md: "[&_blockquote]:text-[18px] [&_blockquote]:leading-relaxed",
      lg: "[&_blockquote]:text-[24px] [&_blockquote]:leading-[1.35] sm:[&_blockquote]:text-[28px]",
    },
  },
  defaultVariants: { variant: "card", size: "md" },
});

export interface QuoteBlockProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof quoteVariants> {
  quote: React.ReactNode;
  author: string;
  role?: string;
  /** Imported image module URL for the author portrait. */
  avatarSrc?: string;
}

/** Testimonial / pull-quote block in the system's editorial voice. */
export const QuoteBlock = React.forwardRef<HTMLElement, QuoteBlockProps>(
  ({ className, variant, size, quote, author, role, avatarSrc, ...props }, ref) => (
    <figure ref={ref} className={cn(quoteVariants({ variant, size }), className)} {...props}>
      <blockquote className="font-serif-italic text-foreground">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar className="size-9">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>
            {author
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <span className="text-[14px] font-medium text-foreground">{author}</span>
          {role ? <span className="eyebrow text-muted-foreground">{role}</span> : null}
        </span>
      </figcaption>
    </figure>
  ),
);
QuoteBlock.displayName = "QuoteBlock";
