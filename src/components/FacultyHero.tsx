import { useEffect, useRef } from "react";
import academicAsset from "@/assets/faculty/faculty-academic.jpg.asset.json";

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

const STATS = [
  { v: "500+", l: "Masters on the roster" },
  { v: "50%", l: "Active industry practitioners" },
  { v: "9", l: "Ivy & top global schools" },
  { v: "25", l: "Full-time PhD faculty" },
];

/**
 * One-screen editorial opening for /faculty: eyebrow → headline → paragraph →
 * a small art-directed academic photograph → "By the numbers" stats.
 * No parallax; the only scroll interaction is a few pixels of physical drift
 * and ~1deg of rotation on the photograph. Respects prefers-reduced-motion.
 */
export default function FacultyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);

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
      className="mx-auto max-w-6xl px-5 pb-4 md:px-10"
    >
      <div className="grid items-start gap-x-10 gap-y-6 lg:grid-cols-12">
        {/* Typography column */}
        <div className="lg:col-span-8">
          <div
            className="hero-fade-up flex items-center gap-4"
            style={{ animationDelay: "60ms" }}
          >
            <span className="h-px w-8 bg-black/30" aria-hidden />
            <div
              className="text-[10px] uppercase tracking-[0.3em] text-black/55"
              style={{ fontFamily: MONO }}
            >
              Faculty at Masters&apos; Union
            </div>
          </div>

          <h1
            className="mt-[clamp(0.9rem,2.4vh,1.5rem)] max-w-[24ch] text-[clamp(2.25rem,4.1vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-black"
            style={{ fontFamily: SANS }}
          >
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
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
            className="hero-fade-up mt-[clamp(0.8rem,1.8vh,1.2rem)] max-w-[58ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.6] text-black/70"
            style={{ animationDelay: "620ms" }}
          >
            500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
            by Ivy League academics and global business leaders — from Harvard to McKinsey, from
            Wharton to Google. They don&apos;t just teach the playbook. They wrote it.
          </p>
        </div>

        {/* Small editorial photograph in the right-hand whitespace */}
        <div className="lg:col-span-4 lg:pt-10">
          <figure className="ml-auto w-[150px] sm:w-[176px] lg:w-[190px]">
            <div
              className="hero-caption-line mb-2 h-8 w-px bg-black/25"
              style={{ animationDelay: "700ms" }}
              aria-hidden
            />
            <div className="hero-plate-reveal" style={{ animationDelay: "760ms" }}>
              <div
                ref={figureRef}
                className="overflow-hidden rounded-[3px] border border-black/12 bg-neutral-100 will-change-transform"
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
              className="hero-fade-up mt-2.5 text-[9.5px] uppercase leading-[1.5] tracking-[0.16em] text-black/45"
              style={{ fontFamily: MONO, animationDelay: "1000ms" }}
            >
              Fig. 01 — Seminar room, faculty in discussion
            </figcaption>
          </figure>
        </div>
      </div>

      {/* BY THE NUMBERS — same opening composition */}
      <div className="mt-[clamp(1.1rem,2.6vh,1.8rem)] border-t border-black/15 pt-5">
        <div
          className="hero-fade-up text-[10px] uppercase tracking-[0.24em] text-black/50"
          style={{ fontFamily: MONO, animationDelay: "780ms" }}
        >
          By the numbers
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-10">
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className="hero-fade-up group flex items-start gap-3"
              style={{ animationDelay: `${860 + i * 70}ms` }}
            >
              <span className="mt-[0.9em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a8b6f]" aria-hidden />
              <div className="min-w-0">
                <div
                  className="text-[clamp(1.75rem,2.8vw,2.6rem)] font-medium leading-[0.9] tracking-[-0.035em] text-black"
                  style={{ fontFamily: SERIF_IT }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-2.5 max-w-[20ch] text-[10px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-black/60"
                  style={{ fontFamily: MONO }}
                >
                  {s.l}
                </div>
                <div
                  className="mt-3 h-px w-8 bg-black/25 transition-all duration-500 group-hover:w-16 group-hover:bg-[#7a8b6f]"
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
