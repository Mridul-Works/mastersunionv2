import { useEffect, useRef, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";
import { BookOpen, ChevronLeft, ChevronRight, FlaskConical, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { pgpFaculty as faculty } from "@/lib/pgp-tbm-content";

const iconMap: Record<string, LucideIcon> = {
  Courses: BookOpen,
  Operators: Users,
  "Rote exams": FlaskConical,
};

export function PgFaculty() {
  return (
    <section
      id="faculty"
      className="relative scroll-mt-24 section-edge section-band py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-4xl">
          <p className="eyebrow text-bottle">{faculty.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-black uppercase leading-[1.02]">
            {faculty.title[0]}
            <span className="text-gradient-brand"> {faculty.title[1]}</span>
          </h2>
        </Reveal>

        {/* InClass tracks panel */}
        <Reveal className="mt-7 lg:mt-9">
          <div className="card-elevated relative overflow-hidden rounded-none border border-primary/20 bg-card p-5 sm:p-8">
            <div
              aria-hidden
              className="blueprint-grid pointer-events-none absolute inset-0 opacity-60"
            />
            <div className="relative grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  InClass · Seven tracks
                </span>
                <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.85rem)] font-semibold leading-tight">
                  Fundamentals taught by people still running the play
                </h3>
                <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                  150+ courses across seven modules, taught in rotation with the OutClass ventures
                  they feed — and graded on deliverables, never rote exams.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {faculty.tracks.map((t) => (
                  <li key={t.name} className="border border-border bg-background/60 p-3.5">
                    <p className="font-display text-[13.5px] font-semibold leading-tight">{t.name}</p>
                    <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">{t.eg}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:mt-9">
          {faculty.pillars.map((p, i) => {
            const Icon = iconMap[p.title] ?? BookOpen;
            return (
              <Reveal key={p.title} delay={i * 80}>
                <article className="card-elevated group h-full rounded-none border border-border bg-card p-5 sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/5">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                  </span>
                  <div className="mt-4 font-display text-3xl font-semibold text-gradient-brand sm:mt-6">
                    {p.stat}
                  </div>
                  <div className="font-tech mt-2 text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                    {p.title}
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-foreground/80">{p.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-7 lg:mt-9">
          <PeopleCarousel />
        </Reveal>
      </div>
    </section>
  );
}

function PeopleCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 560), behavior: "smooth" });
  };

  return (
    <div className="card-elevated overflow-hidden rounded-none border border-border bg-card">
      <div className="flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
        <div className="max-w-xl">
          <h3 className="font-display text-lg font-semibold sm:text-xl">
            Faculty framed by what they've built
          </h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            Founders, CEOs and operators teaching from live playbooks — 40% of faculty are still
            running the businesses they teach.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Operator faculty
          </span>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-border transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-border transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        data-touch-gallery
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scroll-pl-5 px-5 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:scroll-pl-8 sm:px-8 sm:pb-6 [&::-webkit-scrollbar]:hidden"
      >
        {faculty.people.map((p, i) => (
          <figure
            key={p.name}
            className="group relative w-[168px] shrink-0 snap-start overflow-hidden rounded-none border border-border bg-secondary/30 transition-colors hover:border-primary/40 sm:w-[198px] lg:w-[220px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <TouchColorImg
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:grayscale-0 data-[touch-color-active]:grayscale-0"
              />
            </div>
            <span
              aria-hidden
              className="absolute left-2 top-2 rounded-none border border-border bg-card/85 px-1.5 py-0.5 font-tech text-[9px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <figcaption className="border-t border-border bg-card/90 p-3 backdrop-blur">
              <div className="text-[12.5px] font-medium leading-tight">{p.name}</div>
              <div className="font-tech mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {p.role}
              </div>
              <div className="mt-1.5 border-l-2 border-teal pl-2 text-[11px] leading-snug text-foreground/70">
                {p.note}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
