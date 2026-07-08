import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-2.png.asset.json";

export type SectionNavItem = {
  /** Section id on the current page (without the `#`). Use "top" to scroll to top. */
  id: string;
  label: string;
};

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  if (id === "top") {
    const lenis = (window as any).__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - 12;
  const lenis = (window as any).__lenis;
  if (lenis?.scrollTo) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

export function SectionNav({
  items,
  applyHref = "#apply",
}: {
  items: SectionNavItem[];
  applyHref?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleApply = (e: React.MouseEvent) => {
    if (applyHref.startsWith("#")) {
      e.preventDefault();
      scrollToId(applyHref.slice(1));
    }
  };

  return (
    <header className="fixed inset-x-0 bottom-0 z-[100] hidden px-4 pb-3 sm:px-6 sm:pb-4 md:block">
      {menuOpen && (
        <div className="mb-3 rounded-none border border-black/10 bg-white/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  scrollToId(item.id);
                }}
                className="rounded-none px-4 py-3 text-[14px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-none border border-black/10 bg-white/80 px-2 py-1.5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <a href="/" className="flex items-center gap-2 rounded-none px-2.5 py-1">
          <img src={logoAsset.url} alt="Masters' Union" className="h-5 w-auto" />
        </a>
        <nav className="hidden items-center gap-0.5 md:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
              className="rounded-none px-3 py-1.5 text-[12px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={applyHref}
            onClick={handleApply}
            className="rounded-none bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] pastel-fill"
          >
            Apply
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
            className="flex size-8 items-center justify-center rounded-none text-black/60 transition-colors hover:bg-black/5 hover:text-black md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SectionNav;
