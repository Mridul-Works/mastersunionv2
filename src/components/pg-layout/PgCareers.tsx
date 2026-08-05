import { LogoTile } from "@/components/pg-layout/LogoTile";
import { Reveal } from "@/components/pg-layout/Reveal";
import { pgpCareer as career } from "@/lib/pgp-tbm-content";

export function PgCareers() {
  return (
    <section
      id="career"
      className="relative scroll-mt-24 section-edge bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-bottle">{career.eyebrow}</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
            <h2 className="max-w-[16ch] font-display text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {career.title[0]} {career.title[1]}
            </h2>
            <p className="text-[14px] leading-relaxed text-muted-foreground lg:pb-2">{career.body}</p>
          </div>
        </Reveal>

        <Reveal delay={60} className="mt-12">
          <div className="grid divide-y divide-border border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {career.headline.map((h) => (
              <div key={h.k} className="px-5 py-5 sm:px-7 sm:py-6">
                <p className="font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-none text-primary">
                  {h.k}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{h.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="h-full border border-border bg-card p-5 sm:p-7">
              <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary">Role mix</p>
              <ul className="mt-5 space-y-4">
                {career.roles.map((r) => (
                  <li key={r.role}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13px] font-medium text-foreground">{r.role}</span>
                      <span className="font-display text-[13px] font-semibold text-primary">
                        {r.pct}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden bg-secondary">
                      <div className="h-full bg-teal" style={{ width: r.pct }} aria-hidden />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col border border-border bg-card p-5 sm:p-7">
              <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary">
                Who recruits on campus
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {career.recruiters.map((r) => (
                  <LogoTile
                    key={r.name}
                    name={r.name}
                    src={r.src}
                    className={r.name === "Microsoft" ? "[&_img]:scale-[1.8]" : undefined}
                  />
                ))}
              </div>

              <p className="mt-auto pt-5 text-[12px] leading-relaxed text-muted-foreground">
                {career.footnote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
