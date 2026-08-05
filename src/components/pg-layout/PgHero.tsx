import { ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { Cta } from "@/components/pg-layout/Cta";

/**
 * Hero content sourced from the PGP-TBM page's hero section
 * (src/routes/programmes.pg.pgp-tbm.tsx, function PgpTbm, first <section>).
 */
const BADGES = [
  { label: "Round 4 admissions open", dot: true },
  { label: "Accredited by EFMD & AACSB", icon: true },
];

const PROGRAMME_LABEL = "PGP · Technology & Business Management";

const SNAPSHOT = [
  { k: "Duration", v: "16 months" },
  { k: "Format", v: "Full-time · DLF Cyber Park, Gurugram" },
  { k: "Intake", v: "Round 4 admissions open" },
  { k: "Accreditation", v: "EFMD & AACSB" },
];

const STATS = [
  { k: "16", v: "Months" },
  { k: "₹34.6L", v: "Median CTC" },
  { k: "200+", v: "Startups founded" },
  { k: "145+", v: "Recruiters" },
];

export function PgHero() {
  return (
    <section className="section-edge relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="page-grid absolute inset-0 -z-10 opacity-40" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Top eyebrow row */}
        <Reveal>
          <div className="mb-9 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1"
                >
                  {b.dot && <span className="size-1.5 rounded-full bg-teal animate-pulse" />}
                  {b.icon && <Star className="size-3 fill-current" />}
                  {b.label}
                </span>
              ))}
            </div>
            <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
              {PROGRAMME_LABEL}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* Left: headline + copy */}
          <div className="flex flex-col justify-between gap-10">
            <Reveal delay={80}>
              <div>
                <h1 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
                  Learn business
                  <br />
                  <span className="font-normal text-muted-foreground">by running one.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                  16 months at Masters&rsquo; Union structured around three engines —{" "}
                  <strong className="font-semibold text-foreground">InClass</strong> fundamentals,{" "}
                  <strong className="font-semibold text-foreground">OutClass</strong> live ventures and{" "}
                  <strong className="font-semibold text-foreground">Immersions</strong> on the ground. Graded on
                  outcomes measured in the open market.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Cta href="#apply" label="Start application" />
                  <a
                    href="#model"
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground"
                  >
                    See the model
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Inline stat strip */}
            <Reveal delay={160}>
              <div className="grid grid-cols-2 gap-0 border-t border-border pt-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.v} className="border-l border-border px-4 first:border-l-0 first:pl-0">
                    <div className="text-2xl font-medium leading-none tracking-[-0.01em] text-foreground sm:text-3xl">
                      {s.k}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: snapshot card */}
          <Reveal delay={120}>
            <div className="card-elevated relative overflow-hidden border border-border bg-card p-6">
              <div className="rule-gradient absolute inset-x-0 top-0" />
              <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Snapshot
              </span>
              <dl className="mt-5 space-y-4">
                {SNAPSHOT.map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-3 border-b border-border/70 pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">{row.k}</dt>
                    <dd className="text-right text-sm font-medium text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PgHero;
