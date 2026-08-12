import { useRef } from "react";
import type { FacultyStat } from "@/lib/faculty-stats";



const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const SERIF_IT = "'Fraunces', Georgia, serif";

const LINES = [
  <>At most B-schools,</>,
  <>
    faculty{" "}
    <span className="font-light italic" style={{ fontFamily: SERIF_IT }}>
      study
    </span>{" "}
    companies.
  </>,
  <>
    Here, they{" "}
    <span className="font-light italic" style={{ fontFamily: SERIF_IT }}>
      ran
    </span>{" "}
    them
  </>,
  <>— and most still do.</>,
];

const FALLBACK_STATS: FacultyStat[] = [
  { v: "500+", l: "Masters on the roster" },
  { v: "50%", l: "Active industry practitioners" },
  { v: "9", l: "Universities represented" },
  { v: "25", l: "Full-time PhD faculty" },
];

/**
 * One-screen editorial opening for /faculty: eyebrow → headline → paragraph →
 * "By the numbers" stats.
 * Respects prefers-reduced-motion.
 * `stats` are derived from the live faculty rosters by the route.
 */
export default function FacultyHero({
  stats,
  refreshed,
}: {
  stats?: FacultyStat[];
  refreshed?: string;
}) {
  const STATS = stats?.length ? stats : FALLBACK_STATS;

  const sectionRef = useRef<HTMLElement | null>(null);


  return (
    <section
      ref={sectionRef}
      id="top"
      className="w-full bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-6xl px-5 pb-5 pt-[clamp(2.75rem,6.5vh,4.5rem)] md:px-10 md:pb-7">
        <div className="grid items-start gap-x-10 gap-y-5 lg:grid-cols-12">
          {/* Typography column */}
          <div className="lg:col-span-8">
            <div
              className="hero-fade-up flex items-center gap-4"
              style={{ animationDelay: "60ms" }}
            >
              <span className="h-px w-8 bg-white/30" aria-hidden />
              <div
                className="text-[10px] uppercase tracking-[0.3em] text-white/55"
                style={{ fontFamily: MONO }}
              >
                Faculty at Masters&apos; Union
              </div>
            </div>

            <h1
              className="mt-[clamp(1.35rem,3.2vh,2.1rem)] max-w-[24ch] text-[clamp(2.25rem,4.1vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-white"
              style={{ fontFamily: SANS }}
            >
              {LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.14em]">
                  <span
                    className="hero-line-soft block"
                    style={{ animationDelay: `${180 + i * 90}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="hero-fade-up mt-[clamp(1.5rem,3.2vh,2.35rem)] max-w-[58ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.58] text-white/70"
              style={{ animationDelay: "620ms" }}
            >
              500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
              by Ivy League academics and global business leaders — from Harvard to McKinsey, from
              Wharton to Google. They don&apos;t just teach the playbook. They wrote it.
            </p>
          </div>
        </div>

        {/* BY THE NUMBERS — same opening composition */}
        <div className="mt-[clamp(0.85rem,1.9vh,1.3rem)] border-t border-white/15 pt-4">
          <div
            className="hero-fade-up flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-white/50"
            style={{ fontFamily: MONO, animationDelay: "780ms" }}
          >
            <span>By the numbers</span>
            {refreshed ? <span className="text-white/35">{refreshed}</span> : null}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4 md:gap-x-10">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="hero-fade-up group flex items-start gap-3"
                style={{ animationDelay: `${860 + i * 70}ms` }}
              >
                <span className="mt-[0.9em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a8b6f]" aria-hidden />
                <div className="min-w-0">
                  <div
                    className="text-[clamp(1.75rem,2.8vw,2.6rem)] font-medium leading-[0.9] tracking-[-0.035em] text-white"
                    style={{ fontFamily: SERIF_IT }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-2.5 max-w-[20ch] text-[10px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-white/60"
                    style={{ fontFamily: MONO }}
                  >
                    {s.l}
                  </div>
                  <div
                    className="mt-3 h-px w-8 bg-white/25 transition-all duration-500 group-hover:w-16 group-hover:bg-[#7a8b6f]"
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
