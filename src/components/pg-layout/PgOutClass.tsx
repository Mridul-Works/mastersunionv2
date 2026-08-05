import { Reveal } from "@/components/pg-layout/Reveal";
import { pgpOutClass as data } from "@/lib/pgp-tbm-content";

const chip =
  "inline-block bg-foreground px-2.5 py-1 font-tech text-[9px] font-semibold uppercase tracking-[0.22em] text-background";
const micro = "font-tech text-[9px] uppercase tracking-[0.24em] text-muted-foreground";

/** Editorial poster rail per OutClass track — one card per term milestone. */
function TrackStrip({ track, index }: { track: (typeof data.tracks)[number]; index: number }) {
  return (
    <Reveal className="mt-12 border-t border-border pt-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className={chip}>Track {String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[0.98] tracking-tight">
            {track.title}
          </h3>
        </div>
        <div className="lg:col-span-6 lg:pt-2">
          <div aria-hidden className="h-px w-full bg-border" />
          <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
            {track.body}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-border border border-border bg-card sm:grid-cols-3 sm:divide-y-0">
        {track.stats.map((s) => (
          <div key={s.k} className="px-5 py-5 sm:px-7 sm:py-6">
            <p className="font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-semibold leading-none text-primary">
              {s.k}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="rail-scroll mt-5 flex gap-4 pb-2">
        {track.arc.map((step, i) => (
          <article
            key={`${step.t}-${step.h}`}
            className="group relative flex aspect-[3/4] w-[240px] shrink-0 flex-col justify-between overflow-hidden border border-border bg-card p-5 sm:w-[270px] lg:w-[290px]"
          >
            <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative z-10 flex items-start justify-between">
              <span className="bg-foreground px-2 py-1 font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-background">
                {step.t}
              </span>
              <span className="font-display text-4xl font-semibold leading-none text-foreground/10">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative z-10">
              <h4 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[0.98]">
                {step.h}
              </h4>
              <div aria-hidden className="rule-gradient my-4 w-full" />
              <p className="font-tech text-[10.5px] uppercase leading-relaxed tracking-wider text-muted-foreground">
                {step.d}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className={micro}>{track.tag}</p>
        <p className={micro}>Scroll for the full arc</p>
      </div>
    </Reveal>
  );
}

export function PgOutClass() {
  return (
    <section
      id="outclass"
      className="relative scroll-mt-24 section-edge section-band py-12 sm:py-16 lg:py-20"
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

        {data.tracks.map((t, i) => (
          <TrackStrip key={t.title} track={t} index={i} />
        ))}
      </div>
    </section>
  );
}
