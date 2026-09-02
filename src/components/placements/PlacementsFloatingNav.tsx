import { ArrowUpRight, CalendarClock, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { onScrollFrame, onViewportResize } from "@/lib/scroll-driver";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-2.png.asset.json";

const brand = {
  logoUrl: logoAsset.url,
  logoAlt: "Masters' Union",
  homeAriaLabel: "Masters' Union home",
};

const cta = {
  nav: { label: "Apply", href: "#contact" },
  sage: { label: "S.A.G.E", href: "#sage" },
};

const applicationWindow = {
  isLive: true,
  round: "Round 2",
  cohort: "Cohort 2026",
  deadline: "30 September 2026",
};

const navLinks = [
  { label: "Outcomes", id: "outcomes", index: "01" },
  { label: "Cohorts", id: "cohorts", index: "02" },
  { label: "Recruiters", id: "recruiters", index: "03" },
  { label: "Stories", id: "stories", index: "04" },
  { label: "Pathway", id: "pathway", index: "05" },
  { label: "Contact", id: "contact", index: "06" },
];

const sageSuggestions = [
  { label: "What are the placement outcomes?", id: "outcomes" },
  { label: "Which companies recruit here?", id: "recruiters" },
  { label: "How do students describe the process?", id: "stories" },
  { label: "What does the career pathway look like?", id: "pathway" },
];

/**
 * Scroll state without per-frame React renders.
 *
 * The old version read document.scrollHeight and called setState on every scroll
 * event, which forced a layout + full nav re-render each frame. Now the progress
 * bar is written straight to the DOM as a transform, the max scroll distance is
 * cached on resize, and React state only flips the boolean `scrolled` flag.
 */
function useScrollState(barRef: React.RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let max = 1;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    let wasScrolled = false;
    const write = ({ y }: { y: number }) => {
      const progress = Math.min(1, Math.max(0, y / max));
      const bar = barRef.current;
      if (bar) bar.style.transform = `scaleX(${progress})`;
      const next = y > 24;
      if (next !== wasScrolled) {
        wasScrolled = next;
        setScrolled(next);
      }
    };

    const offResize = onViewportResize(measure);
    const offScroll = onScrollFrame(write);
    return () => {
      offResize();
      offScroll();
    };
  }, [barRef]);

  return { scrolled };
}


function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
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
  }, [ids.join("|")]);

  return active;
}

export function PlacementsFloatingNav() {
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const { scrolled } = useScrollState(progressRef);
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [panel, setPanel] = useState<null | "menu" | "sage">(null);
  const open = panel !== null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeLabel = navLinks.find((l) => l.id === active)?.label ?? "Overview";

  return (
    <header className="fixed inset-x-0 bottom-0 z-50 hidden px-3 pt-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-[max(1rem,env(safe-area-inset-bottom))] lg:block">
      {panel === "menu" && (
        <div className="mx-auto mb-2 max-h-[calc(100dvh-8rem)] max-w-[1320px] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background/95 p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <nav aria-label="Sections" className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setPanel(null)}
                className={cn(
                  "flex items-center gap-3 rounded-[4px] px-4 py-3.5 text-[14px] font-medium transition-colors",
                  active === l.id
                    ? "bg-foreground/[0.07] text-foreground"
                    : "text-foreground/85 hover:bg-foreground/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "font-tech text-[10px] tracking-[0.2em]",
                    active === l.id ? "text-primary" : "text-muted-foreground/60",
                  )}
                >
                  {l.index}
                </span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {panel === "sage" && (
        <div
          id="sage"
          className="mx-auto mb-2 max-h-[calc(100dvh-8rem)] max-w-[1320px] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background/95 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                S.A.G.E · AI help
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.1rem,2.2vw,1.5rem)] font-normal leading-snug">
                Ask anything about placements
              </h2>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                Pick a starting point and S.A.G.E takes you straight to the answer on this page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPanel(null)}
              aria-label="Close S.A.G.E"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/[0.06]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {sageSuggestions.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setPanel(null)}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-[13px] font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.05]"
              >
                {s.label}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative mx-auto grid h-11 max-w-[1320px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 overflow-hidden rounded-full border px-2.5 transition-all duration-300 sm:gap-3 sm:px-4 lg:h-11",
          scrolled
            ? "border-border bg-background/85 shadow-[0_-14px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-border/60 bg-background/80 shadow-[0_-10px_32px_-24px_rgba(0,0,0,0.4)] backdrop-blur-md",
        )}
      >
        <span
          ref={progressRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left will-change-transform"
          style={{
            transform: "scaleX(0)",
            background:
              "linear-gradient(90deg, transparent, var(--teal), #F7D544, #E38330, transparent)",
          }}
        />


        <div className="flex min-w-0 items-center gap-2 overflow-hidden sm:gap-3">
          <a href="#top" className="placements-floating-logo flex w-auto shrink-0 items-center gap-2.5" aria-label={brand.homeAriaLabel}>
            <img
              src={brand.logoUrl}
              alt={brand.logoAlt}
              width={600}
              height={168}
              decoding="async"
              loading="eager"
              className="block h-4 w-auto max-w-[5.5rem] brightness-0 invert sm:h-5 sm:max-w-[7rem] lg:h-6 lg:max-w-[8rem]"
            />
          </a>
          {applicationWindow.isLive && (
            <p className="hidden min-w-0 items-center gap-1.5 text-[11px] text-foreground/70 xl:flex">
              <CalendarClock className="h-3 w-3 shrink-0 text-foreground/50" strokeWidth={1.5} />
              <span className="truncate">
                <span className="font-semibold text-foreground">
                  {applicationWindow.round} · {applicationWindow.cohort}
                </span>{" "}
                closes {applicationWindow.deadline}
              </span>
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPanel((p) => (p === "menu" ? null : "menu"))}
            aria-expanded={panel === "menu"}
            aria-label={panel === "menu" ? "Close menu" : "Open menu"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-foreground/[0.06] sm:px-3.5"
          >
            {panel === "menu" ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Menu</span>
            <span className="hidden font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground lg:inline">
              {activeLabel}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPanel((p) => (p === "sage" ? null : "sage"))}
            aria-expanded={panel === "sage"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-foreground/[0.06] sm:px-3.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal" strokeWidth={1.75} />
            <span className="hidden sm:inline">{cta.sage.label}</span>
          </button>

          <a
            href={cta.nav.href}
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-background transition hover:bg-foreground/85"
          >
            {cta.nav.label}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default PlacementsFloatingNav;
