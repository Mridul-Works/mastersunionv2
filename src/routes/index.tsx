import { createFileRoute } from "@tanstack/react-router";
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
          <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
            <div className="flex items-center gap-2 rounded-full bg-background/85 px-4 py-2 backdrop-blur-md">
              <img
                src={logoAsset.url}
                alt="Masters' Union"
                className="h-7 w-auto"
              />
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


        </div>
      </section>
    </main>
  );
}
