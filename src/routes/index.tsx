import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";
import logoAsset from "@/assets/logo-2.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masters' Union — Business education, reimagined" },
      {
        name: "description",
        content:
          "Masters' Union is a new-age business school where industry leaders teach the next generation of CEOs, founders and operators.",
      },
      { property: "og:title", content: "Masters' Union — Business education, reimagined" },
      {
        property: "og:description",
        content: "A new-age business school built and taught by industry leaders.",
      },
    ],
  }),
  component: Index,
});

const NAV = ["Programs", "Faculty", "Admissions", "Campus", "About"];

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="relative mx-auto h-[91vh] w-full max-w-[1400px] overflow-hidden rounded-[28px]">
          {/* Hero image */}
          <img
            src={heroBuilding}
            alt="Masters' Union campus at dusk"
            className="h-full w-full object-cover"
          />

          {/* Soft top gradient for header legibility */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Header */}
          <header className="absolute inset-x-0 top-0 z-10 px-5 pt-5 sm:px-8 sm:pt-6">
            <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-background/20 bg-background/75 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-3">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-foreground/5">
                <img
                  src={logoAsset.url}
                  alt="Masters' Union"
                  className="h-7 w-auto"
                />
              </a>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-0.5 md:flex">
                {NAV.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group relative rounded-full px-4 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {item}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                ))}
              </nav>

              {/* CTA + mobile toggle */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-full bg-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Apply Now
                </button>

                <button
                  type="button"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
                >
                  {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <div className="mt-3 rounded-3xl border border-background/20 bg-background/90 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl md:hidden">
                <nav className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </header>



          {/* Left info strip */}
          <div className="absolute bottom-24 left-6 z-10 max-w-[260px] text-background sm:left-10">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-background/80">
              <span className="size-1.5 rounded-full bg-background/80" />
              India&rsquo;s new-age B-school
            </div>
            <p className="font-display text-2xl leading-tight sm:text-3xl">
              Business education,
              <br />
              taught by the people
              <br />
              who built business.
            </p>
          </div>


        </div>
      </section>
    </main>
  );
}
