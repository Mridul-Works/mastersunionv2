import { LogoTile } from "@/components/pg-layout/LogoTile";
import { Reveal } from "@/components/pg-layout/Reveal";
import { pgpEntrepreneurship as entrepreneurship } from "@/lib/pgp-tbm-content";

export function PgVentures() {
  return (
    <section
      id="entrepreneurship"
      className="relative scroll-mt-24 section-edge py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-bottle">{entrepreneurship.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[1.04]">
            {entrepreneurship.title[0]}
            <span className="text-gradient-brand"> {entrepreneurship.title[1]}</span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground sm:text-base">
            {entrepreneurship.body}
          </p>
        </Reveal>

        <Reveal delay={60} className="mt-8">
          <div className="card-elevated grid grid-cols-2 divide-x divide-y divide-border rounded-2xl! border border-border bg-card lg:grid-cols-4 lg:divide-y-0">
            {entrepreneurship.stats.map((s) => (
              <div key={s.k} className="px-4 py-4 sm:px-6 sm:py-5">
                <p className="font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-none text-primary">
                  {s.k}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {entrepreneurship.support.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="card-elevated h-full rounded-2xl! border border-border bg-card p-5 sm:p-7">
                <h3 className="font-display text-[clamp(1rem,1.8vw,1.25rem)] font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-5">
          <div className="card-elevated rounded-2xl! border border-border bg-card p-5 sm:p-7">
            <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary">
              Ventures built on campus
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {entrepreneurship.ventures.map((v) => (
                <LogoTile key={v.name} name={v.name} src={v.src} size="sm" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
