import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared CTA language for the editorial programme layout:
 * primary = solid pill with uppercase mono label, secondary = underlined link.
 */
type Props = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "inverse";
  size?: "sm" | "md";
  className?: string;
};

export function Cta({ href, label, variant = "primary", size = "md", className }: Props) {
  const pad = size === "sm" ? "px-4 py-2.5 text-[10px]" : "px-5 py-3 text-[11px]";
  const base =
    "group inline-flex shrink-0 items-center gap-2 font-semibold uppercase tracking-[0.18em] transition";

  if (variant === "secondary") {
    return (
      <a
        href={href}
        className={cn(
          base,
          "border-b border-foreground/25 pb-0.5 text-[11px] text-foreground hover:border-foreground",
          className,
        )}
      >
        {label}
        <ArrowUpRight
          className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        base,
        "rounded-full",
        pad,
        variant === "inverse"
          ? "bg-background text-foreground hover:bg-background/85"
          : "bg-foreground text-background hover:bg-foreground/85",
        className,
      )}
    >
      {label}
      <ArrowUpRight
        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  );
}
