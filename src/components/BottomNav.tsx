import { useEffect, useState, type ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";

export type BottomNavItem = {
  /** Section id on the current page (without the `#`). */
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.history.replaceState) window.history.replaceState(null, "", window.location.pathname);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top: y, behavior: "smooth" });
  if (window.history.replaceState) window.history.replaceState(null, "", `#${id}`);
}

export function BottomNav({
  items,
  applyHref = "#apply",
  variant = "floating",
}: {
  items: BottomNavItem[];
  applyHref?: string;
  variant?: "floating" | "inline";
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [compact, setCompact] = useState(false);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = items.map((i) => i.id);
    const targets = ids
      .filter((id) => id !== "top")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const onScroll = () => {
      setCompact(window.scrollY > 140);
      if (window.scrollY < 120) {
        setActive(ids.includes("top") ? "top" : ids[0]);
        return;
      }

      const mid = window.scrollY + window.innerHeight * 0.35;
      let current = ids.includes("top") ? "top" : ids[0];
      for (const el of targets) {
        if (el.offsetTop <= mid) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div
      data-desktop-bottom-nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] hidden justify-center px-3 pb-3 sm:pb-5 lg:flex"
    >
      <nav
        aria-label="Section navigation"
        className="pointer-events-auto flex w-full max-w-[560px] items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:max-w-[620px]"
      >
        <ul className="flex flex-1 items-center justify-around gap-0.5">
          {items.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => scrollToId(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "group flex w-full flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors " +
                    (isActive
                      ? "bg-black/5 text-black"
                      : "text-black/55 hover:bg-black/5 hover:text-black")
                  }
                >
                  <Icon className="size-[15px]" strokeWidth={1.75} />
                  <span className="hidden text-[9.5px] sm:inline">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <a
          href={applyHref}
          onClick={(e) => {
            if (applyHref.startsWith("#")) {
              e.preventDefault();
              scrollToId(applyHref.slice(1));
            }
          }}
          className="inline-flex items-center gap-1 rounded-full bg-black px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-4"
        >
          Apply
          <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
        </a>
      </nav>
    </div>
  );
}

export default BottomNav;
