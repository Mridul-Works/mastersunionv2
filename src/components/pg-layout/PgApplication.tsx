import { CalendarClock } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { Cta } from "@/components/pg-layout/Cta";
import { pgpApplication as application, pgpApplicationWindow as applicationWindow } from "@/lib/pgp-tbm-content";

export function PgApplication() {
  return (
    <section
      id="admissions"
      className="relative scroll-mt-24 section-edge bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-bottle">{application.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[1.04]">
            {application.title[0]}
            <span className="text-gradient-brand"> {application.title[1]}</span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground sm:text-base">
            {application.body}
          </p>
          {applicationWindow.isLive && (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-primary/25 bg-primary/5 px-5 py-4">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
                <CalendarClock className="h-4 w-4 text-primary" strokeWidth={1.75} />
                Applications live · {applicationWindow.round}, {applicationWindow.cohort}
              </span>
              <span className="text-[13px] text-foreground/80">
                Deadline: <strong className="font-semibold">{applicationWindow.deadline}</strong>
              </span>
              <span className="text-[12px] text-muted-foreground">{applicationWindow.note}</span>
            </div>
          )}
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {application.steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 70}>
              <article className="card-elevated flex h-full flex-col rounded-2xl! border border-border bg-card p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/5 font-tech text-[11px] tracking-[0.14em] text-primary">
                    {s.step}
                  </span>
                  <h3 className="font-display text-[clamp(1rem,1.8vw,1.25rem)] font-semibold leading-snug">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{s.summary}</p>
                <ul className="mt-4 space-y-2.5 border-t border-border/70 pt-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/85">
                      <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-5">
          <div className="card-elevated relative overflow-hidden rounded-2xl! border border-primary/25 bg-card p-6 sm:p-10">
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <h3 className="max-w-2xl font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold leading-[1.08]">
                Applications are reviewed in rolling rounds
                <span className="text-gradient-brand"> until the cohort fills.</span>
              </h3>
              <Cta href={application.ctaHref} label={application.ctaLabel} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
