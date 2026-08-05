import { LogoTile } from "@/components/pg-layout/LogoTile";
import { Reveal } from "@/components/pg-layout/Reveal";
import { pgpImmersions as data } from "@/lib/pgp-tbm-content";

export function PgImmersions() {
  return (
    <section
      id="immersions"
      className="relative scroll-mt-24 section-edge py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-bottle">{data.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[1.04]">
            {data.title[0]}
            <span className="text-gradient-brand"> {data.title[1]}</span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground sm:text-base">
            {data.body}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {data.tracks.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <article className="card-elevated flex h-full flex-col rounded-2xl! border border-border bg-card p-5 sm:p-7 lg:p-9">
                <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-teal">{t.tag}</p>
                <h3 className="mt-3 font-display text-[clamp(1.15rem,2.1vw,1.5rem)] font-semibold leading-tight">
                  {t.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t.body}</p>

                <div className="mt-6 grid grid-cols-3 divide-x divide-border border-y border-border py-4">
                  {t.stats.map((s) => (
                    <div key={s.k} className="px-3 first:pl-0 last:pr-0">
                      <p className="font-display text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-none text-primary">
                        {s.k}
                      </p>
                      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary">
                    Where you go
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {t.partners.map((p) => (
                      <LogoTile key={p.name} name={p.name} src={p.src} size="sm" />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
