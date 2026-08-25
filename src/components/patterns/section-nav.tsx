import * as React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type SectionNavLink = { id: string; label: string; index?: string };

function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  const key = ids.join("|");
  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

export interface SectionNavProps extends React.HTMLAttributes<HTMLElement> {
  links: SectionNavLink[];
  /** Optional brand mark rendered at the leading edge. */
  brand?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  /** Dock to the bottom (default) or the top of the viewport. */
  placement?: "bottom" | "top";
  /** Render in flow rather than fixed — useful inside a showcase or a page section. */
  inline?: boolean;
}

/**
 * Floating page navigator: tracks the section in view, shows read progress and
 * collapses into a sheet of section links on small screens.
 */
export const SectionNav = React.forwardRef<HTMLElement, SectionNavProps>(
  (
    { className, links, brand, ctaLabel = "Apply", ctaHref = "#apply", placement = "bottom", inline = false, ...props },
    ref,
  ) => {
    const progress = useScrollProgress();
    const active = useActiveSection(links.map((l) => l.id));
    const [open, setOpen] = React.useState(false);

    return (
      <header
        ref={ref}
        className={cn(
          "z-50 w-full px-3 sm:px-5",
          !inline && "fixed inset-x-0",
          !inline && (placement === "bottom" ? "bottom-0 pb-4" : "top-0 pt-4"),
          className,
        )}
        {...props}
      >
        {open ? (
          <nav
            aria-label="Sections"
            className="mx-auto mb-2 grid max-w-[1320px] gap-1 rounded-2xl border border-border bg-background/95 p-2 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[4px] px-4 py-3 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active === l.id
                    ? "bg-muted text-foreground"
                    : "text-foreground/85 hover:bg-muted/60",
                )}
              >
                <span className="font-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                  {l.index ?? String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-hidden rounded-2xl border border-border bg-background/90 px-2 py-2 backdrop-blur-xl">
          {brand ? <div className="hidden shrink-0 pl-2 sm:block">{brand}</div> : null}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={open ? "Close section menu" : "Open section menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>

          <nav aria-label="Sections" className="hidden min-w-0 flex-1 items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "rounded-[4px] px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active === l.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 pr-1">
            <div
              aria-hidden
              className="hidden h-1 w-24 overflow-hidden rounded-full bg-muted sm:block"
            >
              <div
                className="h-full bg-teal"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <Button asChild size="sm">
              <a href={ctaHref}>
                {ctaLabel}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>
    );
  },
);
SectionNav.displayName = "SectionNav";
