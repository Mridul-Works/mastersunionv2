import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { pgpCurriculum as curriculum } from "@/lib/pgp-tbm-content";

const years = curriculum.years;
const VISIBLE_TERMS = 4;

export function PgCurriculum() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const year = years[activeIndex] ?? years[0];

  const handleToggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      if (!next && activeIndex >= VISIBLE_TERMS) {
        setActiveIndex(VISIBLE_TERMS - 1);
      }
      return next;
    });
  };

  return (
    <section id="curriculum" className="relative scroll-mt-24 section-edge py-9 sm:py-11 lg:py-14">
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-4xl">
          <span className="eyebrow text-teal">{curriculum.eyebrow}</span>
          <div aria-hidden className="rule-gradient mt-3 w-32" />
          <h2 className="mt-3 font-display text-[clamp(1.45rem,3vw,2.2rem)] font-semibold leading-[1.04]">
            {curriculum.title[0]}
            <span className="text-gradient-brand"> {curriculum.title[1]}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            {curriculum.body}
          </p>
        </Reveal>

        <Reveal className="mt-7 sm:mt-9">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,230px)_minmax(0,1fr)] lg:gap-6">
            {/* Left vertical term menu */}
            <nav className="flex flex-col gap-1.5" aria-label="Curriculum terms">
              {years.map((y, i) => {
                if (!expanded && i >= VISIBLE_TERMS) return null;
                const active = i === activeIndex;
                return (
                  <button
                    key={y.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "group relative flex items-start gap-2.5 rounded-lg border p-2.5 text-left transition-all sm:p-3",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card/60 hover:border-primary/30 hover:bg-card",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[1.35rem] font-semibold leading-none transition-colors sm:text-[1.5rem]",
                        active
                          ? "text-primary-foreground/90"
                          : "text-foreground/20 group-hover:text-foreground/40",
                      )}
                    >
                      {y.label}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={cn(
                          "font-display text-[13px] font-semibold leading-tight sm:text-[13.5px]",
                          active ? "text-primary-foreground" : "text-foreground",
                        )}
                      >
                        {y.theme}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 font-tech text-[9px] uppercase tracking-[0.14em]",
                          active ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {y.subjects.length} modules
                      </p>
                    </div>
                    {active && (
                      <span className="absolute right-3 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent lg:block" />
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleToggle}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-card/40 py-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <span>
                  {expanded ? "Show fewer terms" : `Show terms ${VISIBLE_TERMS + 1}–${years.length}`}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            </nav>

            {/* Right content panel */}
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm sm:p-5 lg:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3.5">
                <div>
                  <span className="font-tech text-[11px] uppercase tracking-[0.24em] text-bottle">
                    {year.id} · {year.window}
                  </span>
                  <h3 className="mt-1.5 font-display text-[clamp(1.1rem,1.9vw,1.4rem)] font-semibold leading-tight">
                    {year.theme}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="font-display text-[2.25rem] font-semibold leading-none text-foreground/[0.06] sm:text-[2.75rem]"
                >
                  {year.label}
                </span>
              </div>

              <Accordion type="multiple" className="mt-1 flex flex-col">
                {year.subjects.map((subject) => (
                  <AccordionItem
                    key={subject.title}
                    value={`${year.id}-${subject.title}`}
                    className="border-b border-border/60"
                  >
                    <AccordionTrigger className="py-2.5 text-left hover:no-underline">
                      <span className="flex min-w-0 flex-col gap-1 pr-3">
                        <span className="text-[13px] font-medium leading-snug text-foreground">
                          {subject.title}
                        </span>
                        <span className="text-[12.5px] leading-relaxed text-muted-foreground">
                          {subject.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid gap-x-8 gap-y-1.5 pb-3 pl-0 sm:grid-cols-2">
                        {subject.lessons.map((lesson, i) => (
                          <li
                            key={lesson}
                            className="flex items-baseline gap-3 text-[12.5px] leading-relaxed text-muted-foreground"
                          >
                            <span className="font-tech text-[10px] tracking-[0.2em] text-bottle">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
