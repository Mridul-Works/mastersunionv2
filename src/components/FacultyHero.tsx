import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const el = sectionRef.current;
      const fig = figureRef.current;
      if (!el || !fig) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      // deliberately tiny: a photograph resting on a page, not an animation
      fig.style.transform = `translate3d(0,${-10 * p}px,0) rotate(${-1.4 + 1.4 * p}deg)`;
      fig.style.boxShadow = `0 ${10 + 14 * (1 - p)}px ${26 + 18 * (1 - p)}px -18px rgba(0,0,0,${0.18 + 0.1 * (1 - p)})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

          {/* Small editorial photograph in the right-hand whitespace */}
          <div className="lg:col-span-4 lg:pt-[clamp(4rem,9.5vh,6.75rem)]">
            <figure className="ml-auto w-[150px] sm:w-[176px] lg:w-[190px]">
              <div
                className="hero-caption-line mb-2 h-8 w-px bg-white/25"
                style={{ animationDelay: "700ms" }}
                aria-hidden
              />
              <div className="hero-plate-reveal" style={{ animationDelay: "760ms" }}>
                <div
                  ref={figureRef}
                  className="overflow-hidden rounded-[3px] border border-white/12 bg-neutral-900 will-change-transform"
                  style={{ transform: "rotate(-1.4deg)" }}
                >
                  <img
                    src={academicAsset.url}
                    alt="A professor in discussion with graduate students beside a chalkboard"
                    width={912}
                    height={1120}
                    loading="lazy"
                    className="block aspect-[4/5] w-full object-cover grayscale"
                  />
                </div>
              </div>
              <figcaption
                className="hero-fade-up mt-2.5 text-[9.5px] uppercase leading-[1.5] tracking-[0.16em] text-white/45"
                style={{ fontFamily: MONO, animationDelay: "1000ms" }}
              >
                Fig. 01 — Seminar room, faculty in discussion
              </figcaption>
            </figure>
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
