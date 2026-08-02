import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo-2.png.asset.json";

export type SectionNavItem = {
  /** Section id on the current page (without the `#`). Use "top" to scroll to top. */
  id: string;
  label: string;
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

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
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

  return { scrolled, progress };
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
  const { scrolled, progress } = useScrollState();
  const active = useActiveSection(items.map((i) => i.id));
  const clock = useClock();

  const activeLabel = items.find((l) => l.id === active)?.label ?? "Overview";


  const handleApply = (e: React.MouseEvent) => {
    if (applyHref.startsWith("#")) {
      e.preventDefault();
      scrollToId(applyHref.slice(1));
    }
  };

  return (
    <header className="fixed inset-x-0 bottom-0 z-[100] hidden px-3 pb-3 sm:px-5 sm:pb-4 md:block">




      <div
        className={
          "relative mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-2 overflow-hidden rounded-full border px-3 transition-all duration-300 sm:gap-4 sm:px-5 lg:h-11 " +
          (scrolled
            ? "border-border bg-background/85 shadow-[0_-18px_50px_-28px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-border/60 bg-background/80 shadow-[0_-12px_40px_-30px_rgba(0,0,0,0.25)] backdrop-blur-md")
        }
      >
        {/* scroll progress rail */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left transition-transform duration-150"
          style={{
            transform: `scaleX(${progress})`,
            backgroundImage:
              "linear-gradient(91deg, #39B5D7 -6.14%, #F7D544 47.02%, #E38330 99.71%)",
          }}
        />

        <a href="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="Masters' Union home">
          <img src={logoAsset.url} alt="Masters' Union" className="h-4 w-auto sm:h-5 lg:h-6" />
          <span className="hidden h-6 w-px bg-border md:block" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:block">
            {clock}
          </span>

        </a>

        <nav aria-label="Sections" className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
              className={
                "rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors " +
                (active === item.id
                  ? "bg-foreground/[0.07] text-foreground"
                  : "text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground")
              }
            >
              {item.label}
            </a>
          ))}
          {extraLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              {l.label}
            </a>
          ))}

        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground xl:inline">
            {activeLabel}
          </span>



          <a
            href={applyHref}
            onClick={handleApply}
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary py-0.5 pl-3 pr-0.5 text-[12px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px sm:pl-3.5"
          >
            Apply
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default SectionNav;
