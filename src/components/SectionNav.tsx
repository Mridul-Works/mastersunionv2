import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo-2.png.asset.json";

export type SectionNavItem = {
  /** Section id on the current page (without the `#`). Use "top" to scroll to top. */
  id: string;
  label: string;
  /** When set, the item navigates to this route instead of scrolling to a section. */
  href?: string;
};

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const lenis = (window as any).__lenis;
  if (id === "top") {
    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - 12;
  if (lenis?.scrollTo) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const directionStartY = useRef(0);

  useEffect(() => {
    const THRESHOLD = 10;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(current > 24);
      setProgress(max > 0 ? Math.min(1, current / max) : 0);

      if (current < 24) {
        setVisible(true);
        directionStartY.current = current;
      } else if (delta < 0) {
        setVisible(true);
        directionStartY.current = current;
      } else if (delta > 0 && current > directionStartY.current + THRESHOLD) {
        setVisible(false);
      }

      lastScrollY.current = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { scrolled, progress, visible };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return "";
  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date} · ${time}`;
}

export function SectionNav({
  items,
  applyHref = "#apply",
  extraLinks = [],
}: {
  items: SectionNavItem[];
  applyHref?: string;
  extraLinks?: { href: string; label: string }[];
}) {
  const { scrolled, progress, visible } = useScrollState();
  const active = useActiveSection(items.map((i) => i.id));
  const clock = useClock();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleApply = (e: React.MouseEvent) => {
    if (applyHref.startsWith("#")) {
      e.preventDefault();
      scrollToId(applyHref.slice(1));
    }
  };

  /** Lock body scroll while the mobile/tablet overlay is open. */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /** Menu belongs to small screens + tablets only. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const close = () => mql.matches && setMenuOpen(false);
    close();
    mql.addEventListener("change", close);
    return () => mql.removeEventListener("change", close);
  }, []);

  const allLinks: { key: string; label: string; href: string; onClick?: (e: React.MouseEvent) => void; active: boolean }[] = [
    ...items.map((item) => ({
      key: item.id,
      label: item.label,
      href: item.href ?? `#${item.id}`,
      onClick: item.href
        ? undefined
        : (e: React.MouseEvent) => {
            e.preventDefault();
            setMenuOpen(false);
            scrollToId(item.id);
          },
      active: !item.href && active === item.id,
    })),
    ...extraLinks.map((l) => ({ key: l.href, label: l.label, href: l.href, active: false })),
  ];

  return (
    <header
      className="fixed left-3 right-3 top-3 z-[100] sm:left-4 sm:right-4 sm:top-4"
      style={{
        transform: visible || menuOpen ? "translateY(0)" : "translateY(calc(-100% - 24px))",
        transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      {/* ── SMALL SCREENS + TABLETS: compact logo / menu header ── */}
      <div className="lg:hidden">
        <div
          className={
            "relative flex h-20 items-center justify-between gap-3 overflow-hidden rounded-full border px-4 transition-all duration-300 " +
            (scrolled
              ? "border-border bg-background/90 shadow-[0_0_50px_-20px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              : "border-border/60 bg-background/80 shadow-[0_0_40px_-25px_rgba(0,0,0,0.25)] backdrop-blur-md")
          }
        >
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-150"
            style={{
              transform: `scaleX(${progress})`,
              backgroundImage:
                "linear-gradient(90deg, #39B5D7 -6.14%, #F7D544 47.02%, #E38330 99.71%)",
            }}
          />

          <a href="/" className="flex min-w-0 items-center" aria-label="Masters' Union home">
            <img src={logoAsset.url} alt="Masters' Union" className="h-6 w-auto" />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="-mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>

        {/* overlay menu — fixed, so document flow never shifts */}
        <div
          className="fixed inset-0 z-[-1] lg:hidden"
          style={{
            pointerEvents: menuOpen ? "auto" : "none",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-hidden={!menuOpen}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute inset-x-3 overflow-y-auto rounded-[26px] border border-white/10 bg-[#0b0b0b]/95 p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-4"
            style={{
              top: `calc(env(safe-area-inset-top, 0px) + 92px)`,
              maxHeight: "calc(100dvh - env(safe-area-inset-top, 0px) - 110px)",
              transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.99)",
              transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p
              className="mb-3 px-1 text-[10px] uppercase tracking-[0.28em] text-white/40"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {clock ? `Menu · ${clock}` : "Menu"}
            </p>
            <nav aria-label="Sections" className="flex flex-col">
              {allLinks.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={l.onClick ?? (() => setMenuOpen(false))}
                  className={
                    "flex items-center justify-between border-b border-white/[0.07] py-3 text-[15px] tracking-[-0.01em] transition-colors last:border-b-0 " +
                    (l.active ? "text-white" : "text-white/70 hover:text-white")
                  }
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-40" strokeWidth={1.75} />
                </a>
              ))}
            </nav>
            <a
              href={applyHref}
              onClick={(e) => {
                setMenuOpen(false);
                handleApply(e);
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: existing floating horizontal pill (unchanged) ── */}
      <div
        className={
          "relative hidden items-center justify-between gap-3 overflow-hidden rounded-full border px-3 py-2 transition-all duration-300 sm:px-4 sm:py-2.5 lg:flex " +
          (scrolled
            ? "border-border bg-background/85 shadow-[0_0_50px_-20px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-border/60 bg-background/80 shadow-[0_0_40px_-25px_rgba(0,0,0,0.25)] backdrop-blur-md")
        }
      >

        {/* scroll progress rail */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-150"
          style={{
            transform: `scaleX(${progress})`,
            backgroundImage:
              "linear-gradient(90deg, #39B5D7 -6.14%, #F7D544 47.02%, #E38330 99.71%)",
          }}
        />

        <a
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Masters' Union home"
        >
          <img src={logoAsset.url} alt="Masters' Union" className="h-5 w-auto sm:h-6" />
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
            {clock}
          </span>
        </a>

        <nav
          aria-label="Sections"
          className="flex flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-1"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href ?? `#${item.id}`}
              onClick={(e) => {
                if (item.href) return;
                e.preventDefault();
                scrollToId(item.id);
              }}
              className={
                "flex h-7 items-center justify-center rounded-full px-2 text-[10px] font-medium transition-colors sm:h-8 sm:px-3 sm:text-[11px] " +
                (!item.href && active === item.id
                  ? "bg-foreground/[0.07] text-foreground"
                  : "text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground")
              }
              title={item.label}
            >
              {item.label}
            </a>
          ))}

          {extraLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex h-7 items-center justify-center rounded-full px-2 text-[10px] font-medium text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground sm:h-8 sm:px-3 sm:text-[11px]"
              title={l.label}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={applyHref}
          onClick={handleApply}
          className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4 sm:text-[11px]"
          title="Apply"
        >
          Apply
          <ArrowUpRight
            className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45"
            strokeWidth={2.25}
          />
        </a>
      </div>
    </header>
  );
}

export default SectionNav;
