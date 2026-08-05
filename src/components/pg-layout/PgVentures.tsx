import { Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { LogoTile } from "@/components/pg-layout/LogoTile";

// -------- Content sourced from the PGP-TBM programme page --------
const OUTCOME_STARTUP = [
  { k: "200+", v: "Startups founded on campus" },
  { k: "₹60 Cr+", v: "Funding raised by student ventures" },
  { k: "35+", v: "Ventures with paying customers" },
];

const VENTURE_ROWS = [
  { label: "D2C brands built in Term 2", value: "Live" },
  { label: "Creator Challenge ventures", value: "Live" },
  { label: "Graded on open-market outcomes", value: "Yes" },
  { label: "Founder / Own venture track", value: "18%" },
];

const STARTUP_LOGOS: { name: string; url: string }[] = [
  { name: "JustMyRoots", url: "" },
  { name: "Hiveschool", url: "" },
  { name: "Playsuper", url: "" },
  { name: "SeedsAI", url: "" },
  { name: "Startt", url: "" },
  { name: "Pixel", url: "" },
  { name: "Yango", url: "" },
  { name: "EIGHT", url: "" },
  { name: "Guardex", url: "" },
  { name: "TrueBrands India", url: "" },
  { name: "Vinyasa", url: "" },
  { name: "Shrnm", url: "" },
];

export function PgVentures() {
  return (
    <section id="entrepreneurship" className="section-edge relative overflow-hidden py-20 sm:py-28">
      <div className="page-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow text-bottle">Entrepreneurship</span>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            200+ startups founded. <span className="text-gradient-brand">On campus, not after.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Graded on the open market — funding raised, paying customers, ventures that survive past the classroom.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <article className="card-elevated mt-14 border border-border bg-card p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Startups · Founded on campus
                </span>
                <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground">
                  What ventures produce
                </h3>
              </div>
              <span className="glow-ring flex size-10 items-center justify-center rounded-full bg-secondary/60 text-bottle">
                <Rocket className="size-4" />
              </span>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Startups founded on campus
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-medium leading-none tracking-[-0.01em] text-foreground sm:text-5xl">
                  200+
                </span>
              </div>
              <div className="rule-gradient mt-3 h-px w-16" />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {OUTCOME_STARTUP.slice(1).map((s, i) => (
                <div key={s.v} className="relative overflow-hidden rounded-[4px] border border-border bg-secondary/30 p-5">
                  <div className="rule-gradient absolute inset-x-0 top-0" />
                  <div className="flex items-start justify-between">
                    <span className="flex size-8 items-center justify-center rounded-full bg-bottle/10 text-bottle">
                      {i === 0 ? <TrendingUp className="size-4" /> : <CheckCircle2 className="size-4" />}
                    </span>
                  </div>
                  <div className="mt-3 text-3xl font-medium leading-none tracking-[-0.01em] text-foreground">{s.k}</div>
                  <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                What ventures produce
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {VENTURE_ROWS.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between rounded-[4px] border border-border bg-secondary/30 px-4 py-2.5"
                  >
                    <span className="text-foreground/80">{row.label}</span>
                    <span className="rounded-full bg-bottle px-2.5 py-0.5 text-xs font-semibold tabular-nums text-background">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Ventures built on campus
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {STARTUP_LOGOS.map((logo) => (
                  <LogoTile key={logo.name} name={logo.name} src={logo.url || undefined} size="sm" />
                ))}
              </div>
              <div className="mt-3 text-right text-xs font-medium italic text-muted-foreground">and many more…</div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default PgVentures;
