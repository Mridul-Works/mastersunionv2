import { useEffect, useRef, useState } from "react";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const SERIF_IT = "'Fraunces', Georgia, serif";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * One-screen editorial hero: sequential typographic reveal on load,
 * restrained differential parallax + fade-out as it leaves the viewport.
 */
export default function FacultyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 0 at rest, 1 when the hero has fully scrolled past the top
      const p = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      const fade = 1 - Math.min(p / 0.85, 1);
      if (eyebrowRef.current)
        eyebrowRef.current.style.transform = `translate3d(0,${(-25 * p).toFixed(2)}px,0)`;
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(0,${(-40 * p).toFixed(2)}px,0)`;
        headlineRef.current.style.opacity = String(fade);
      }
      if (paraRef.current) {
        paraRef.current.style.transform = `translate3d(0,${(-20 * p).toFixed(2)}px,0)`;
        paraRef.current.style.opacity = String(0.7 * fade);
      }
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = String(fade);
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
  }, [reduced]);

  const lineBase = "block overflow-hidden";
  const inner = (delay: number) =>
    ({
      transitionDelay: `${delay}ms`,
      transform: entered ? "translateY(0)" : reduced ? "none" : "translateY(105%)",
      opacity: entered ? 1 : reduced ? 0 : 1,
    }) as const;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="mx-auto flex max-w-6xl flex-col justify-center px-5 md:px-10"
      style={{ minHeight: "min(calc(100svh - 190px), 780px)" }}
    >
      <div
        ref={eyebrowRef}
        className="flex items-center gap-4 transition-[opacity,transform] duration-500 ease-out will-change-transform"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered || reduced ? "none" : "translateY(10px)",
        }}
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
        className="mt-[clamp(1.5rem,4vh,2.75rem)] max-w-[22ch] text-[clamp(2.1rem,min(5.6vw,7.2vh),4.6rem)] font-semibold leading-[1.05] tracking-tight text-black will-change-transform"
        style={{ fontFamily: SANS }}
      >
        {[
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
        ].map((line, i) => (
          <span key={i} className={lineBase}>
            <span
              className="block transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={inner(180 + i * 110)}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p
        ref={paraRef}
        className="mt-[clamp(1.25rem,3.5vh,2rem)] max-w-[62ch] text-[clamp(0.98rem,1.5vw,1.25rem)] leading-[1.55] text-black/70 transition-[opacity,transform] duration-[600ms] ease-out will-change-transform"
        style={{
          transitionDelay: "760ms",
          opacity: entered ? 1 : 0,
          transform: entered || reduced ? "none" : "translateY(14px)",
        }}
      >
        500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered by
        Ivy League academics and global business leaders — from Harvard to McKinsey, from Wharton to
        Google. They don&apos;t just teach the playbook. They wrote it.
      </p>
    </section>
  );
}
