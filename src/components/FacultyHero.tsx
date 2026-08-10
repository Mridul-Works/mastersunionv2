import { useEffect, useRef } from "react";

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

/**
 * One-screen editorial hero for /faculty.
 * CSS-driven sequential typographic reveal + restrained differential parallax
 * and fade-out as the hero leaves the viewport. Respects prefers-reduced-motion.
 */
export default function FacultyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      const fade = 1 - Math.min(p / 0.85, 1);
      if (eyebrowRef.current) {
        eyebrowRef.current.style.transform = `translate3d(0,${-25 * p}px,0)`;
        eyebrowRef.current.style.opacity = String(fade);
      }
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(0,${-40 * p}px,0)`;
        headlineRef.current.style.opacity = String(fade);
      }
      if (paraRef.current) {
        paraRef.current.style.transform = `translate3d(0,${-20 * p}px,0)`;
        paraRef.current.style.opacity = String(fade);
      }
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
      className="mx-auto flex max-w-6xl flex-col justify-center px-5 md:px-10"
      style={{ minHeight: "min(calc(100svh - 200px), 760px)" }}
    >
      <div
        ref={eyebrowRef}
        className="hero-fade-up flex items-center gap-4 will-change-transform"
        style={{ animationDelay: "80ms" }}
      >
        <span className="h-px w-10 bg-black/30" aria-hidden />
        <div
          className="text-[11px] uppercase tracking-[0.3em] text-black/55"
          style={{ fontFamily: MONO }}
        >
          Faculty at Masters&apos; Union
        </div>
      </div>

      <h1
        ref={headlineRef}
        className="mt-[clamp(1.4rem,4vh,2.6rem)] max-w-[22ch] text-[clamp(2rem,min(5.4vw,6.6vh),4.4rem)] font-semibold leading-[1.08] tracking-tight text-black will-change-transform"
        style={{ fontFamily: SANS }}
      >
        {LINES.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em]">
            <span
              className="hero-line-in block"
              style={{ animationDelay: `${220 + i * 110}ms` }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p
        ref={paraRef}
        className="hero-fade-up mt-[clamp(1.2rem,3.4vh,1.9rem)] max-w-[62ch] text-[clamp(0.96rem,1.45vw,1.2rem)] leading-[1.55] text-black/70 will-change-transform"
        style={{ animationDelay: "820ms" }}
      >
        500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered by
        Ivy League academics and global business leaders — from Harvard to McKinsey, from Wharton to
        Google. They don&apos;t just teach the playbook. They wrote it.
      </p>
    </section>
  );
}
