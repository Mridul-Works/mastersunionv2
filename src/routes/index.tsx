import { createFileRoute } from "@tanstack/react-router";
import heroBuilding from "@/assets/hero-building.jpg";

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
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[1400px] overflow-hidden rounded-[28px] max-h-[90vh]">
          {/* Hero image */}
          <img
            src={heroBuilding}
            alt="Masters' Union campus at dusk"
            className="h-full w-full object-contain"
          />

          {/* Soft top gradient for header legibility */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Header */}
          <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
            <div className="flex items-center gap-2 rounded-full bg-background/85 px-5 py-2.5 backdrop-blur-md">
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                MASTERS&rsquo; UNION
              </span>
            </div>

            <nav className="hidden items-center gap-1 rounded-full bg-background/70 px-2 py-1.5 backdrop-blur-md md:flex">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rounded-full px-4 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="rounded-full bg-background px-5 py-2.5 text-[13px] font-semibold text-foreground shadow-sm transition-transform hover:scale-[1.02]"
            >
              APPLY NOW
            </button>
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

          {/* Right info strip */}
          <div className="absolute bottom-24 right-6 z-10 hidden max-w-[280px] text-right text-background sm:right-10 md:block">
            <p className="text-[13px] leading-relaxed text-background/90">
              Learn from CEOs, founders and operators at companies you read about
              every morning — not from textbooks written decades ago.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-foreground shadow-sm"
            >
              Explore programs
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Bottom status bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-background/20 bg-background/10 px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-background backdrop-blur-sm sm:px-10">
            <span>Gurugram Campus</span>
            <span className="hidden sm:inline">Cohort 2026 · Applications Open</span>
            <span>Ranked among India&rsquo;s top new-age B-schools</span>
          </div>
        </div>
      </section>
    </main>
  );
}
