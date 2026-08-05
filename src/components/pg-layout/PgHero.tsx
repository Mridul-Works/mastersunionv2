import { ArrowUpRight, Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { pgpHero as hero } from "@/lib/pgp-tbm-content";

/**
 * Cinematic full-bleed hero: one dark image canvas with the headline, body and
 * CTAs anchored to the bottom-left and the programme snapshot band beneath.
 */
export function PgHero() {
  return (
    <section id="top" className="relative bg-background pt-4 sm:pt-6">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-[#0b0d0c]">
          {/* Image canvas */}
          <div className="absolute inset-0">
            <ImagePlaceholder label="Hero visual · campus" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0d0c] via-[#0b0d0c]/85 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0b0d0c] to-transparent" />
          </div>

          {/* Content */}
          <div className="relative flex min-h-[520px] flex-col justify-end p-6 sm:min-h-[620px] sm:p-10 lg:min-h-[680px] lg:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 font-tech text-[10px] uppercase tracking-[0.2em] text-background/75 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--bottle)]" />
                  {hero.badge}
                </span>

                <h1 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-tight text-background">
                  {hero.title[0]}
                  <br />
                  <span className="italic font-normal text-background/85">{hero.title[1]}</span>
                </h1>

                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-background/60">
                  {hero.body}
                </p>

                <div className="mt-7 flex items-center gap-2">
                  <a
                    href={hero.primary.href}
                    className="group inline-flex items-center rounded-full bg-[color:var(--bottle)] px-5 py-3 font-tech text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition hover:opacity-90"
                  >
                    {hero.primary.label}
                  </a>
                  <a
                    href={hero.secondary.href}
                    aria-label={hero.secondary.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--bottle)] text-background transition hover:opacity-90"
                  >
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Accreditation cluster */}
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.18em] text-background/85 backdrop-blur">
                  <Star className="size-3.5 fill-current" strokeWidth={2} />
                  {hero.accreditation}
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-background/45">
                  {hero.kicker}
                </span>
              </div>
            </div>

            {/* Programme snapshot band */}
            <div className="mt-10 border-t border-background/15 pt-6">
              <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-background/45">
                {hero.panel.title}
              </p>
              <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {hero.panel.rows.map((r) => (
                  <div key={r.label} className="flex flex-col gap-1.5">
                    <dt className="font-tech text-[9px] uppercase tracking-[0.2em] text-background/45">
                      {r.label}
                    </dt>
                    <dd className="font-display text-[15px] leading-snug text-background">
                      {r.value}
                    </dd>
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <dt className="font-tech text-[9px] uppercase tracking-[0.2em] text-background/45">
                    Median CTC
                  </dt>
                  <dd className="font-display text-[15px] leading-snug text-background">
                    ₹34.6 LPA · Class of 2025
                  </dd>
                </div>
              </dl>

              <div className="mt-6 grid grid-cols-2 gap-0 border-t border-background/15 pt-6 sm:grid-cols-4">
                {hero.stats.map((s) => (
                  <div
                    key={s.label}
                    className="border-l border-background/15 px-4 first:border-l-0 first:pl-0"
                  >
                    <div className="font-display text-2xl font-semibold leading-none tracking-tight text-background sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-2 font-tech text-[9px] uppercase tracking-[0.2em] text-background/45">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
