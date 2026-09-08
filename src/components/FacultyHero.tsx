import { useEffect, useRef } from "react";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF_IT = "var(--faculty-font-display, 'Instrument Serif', Georgia, serif)";

const HEADLINE = (
  <>
    At most B-schools, faculty{" "}
    <span className="faculty-hero-word font-light italic" style={{ fontFamily: SERIF_IT }}>
      study
    </span>{" "}
    companies. Here, they{" "}
    <span className="faculty-hero-word font-light italic" style={{ fontFamily: SERIF_IT }}>
      ran
    </span>{" "}
    them and most still do.
  </>
);

export default function FacultyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = sectionRef.current;
        if (!el) return;
        const h = el.offsetHeight || 1;
        const raw = window.scrollY / h;
        const p = Math.min(1, Math.max(0, raw));
        const current = parseFloat(el.style.getPropertyValue("--recede") || "0");
        if (Math.abs(p - current) > 0.001) {
          el.style.setProperty("--recede", String(p));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="faculty-redesign-hero relative w-full overflow-hidden bg-black"
      style={{ ["--recede" as string]: "0" }}
    >
      <div className="faculty-hero-grid page-gutter relative z-10 mx-auto grid w-full grid-cols-1 items-stretch gap-0 lg:grid-cols-12">
        <div className="faculty-hero-copy relative flex flex-col justify-center lg:col-span-12">
          <div
            className="relative z-10"
            style={{ opacity: "clamp(0.6, calc(1 - var(--recede) * 0.4), 1)" }}
          >
            <div className="faculty-hero-kicker flex items-center gap-3 sm:gap-4">
              <span className="h-px w-6 shrink-0 sm:w-8" aria-hidden />
              <div
                className="min-w-0 text-[clamp(9px,2vw,10px)] uppercase tracking-[0.28em] sm:tracking-[0.3em]"
                style={{ fontFamily: MONO }}
              >
                Faculty / Masters&apos; Union
              </div>
            </div>

            <div className="relative mt-[clamp(0.85rem,2.2vh,1.5rem)] w-full max-w-[850px]">
              <div className="faculty-hero-watermark mu-watermark pointer-events-none absolute z-0 select-none" aria-hidden>
                01
              </div>

              <div
                className="relative z-10 w-full"
                style={{ fontSize: "clamp(1.95rem, 3.5vw, 3.4rem)" }}
              >
                <h1
                  className="faculty-hero-title text-[1em] font-normal leading-[0.94] [text-wrap:balance]"
                  style={{ fontFamily: SERIF_IT }}
                >
                  {HEADLINE}
                </h1>
              </div>

              <div className="faculty-hero-summary relative z-10 mt-[clamp(1.25rem,3vh,2rem)]">
                <p className="max-w-[62ch] text-[0.98rem] leading-[1.6]">
                  500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
                  by{" "}
                  <span className="font-medium" style={{ fontFamily: SERIF_IT }}>
                    Ivy League academics and global business leaders
                  </span>{" "}
                  — from Harvard to McKinsey, from Wharton to Google. They don&apos;t just teach the
                  playbook. They wrote it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll to next section"
        onClick={() => {
          const lenis = (window as any).__lenis;
          const target = window.innerHeight * 0.85;
          if (lenis?.scrollTo) {
            lenis.scrollTo(target, { duration: 1.2 });
          } else {
            window.scrollTo({ top: target, behavior: "smooth" });
          }
        }}
        className="faculty-hero-scroll group absolute inset-x-0 z-20 flex cursor-pointer justify-center rounded-sm border border-transparent p-3 transition-colors focus-visible:outline-none focus-visible:ring-1"
        style={{ opacity: "clamp(0, calc(1 - var(--recede) * 2), 1)" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[9px] uppercase tracking-[0.28em]"
            style={{ fontFamily: MONO }}
          >
            Scroll
          </span>
          <div className="relative h-10 w-3" aria-hidden>
            <div className="faculty-hero-scroll-line absolute left-1/2 top-0 h-full w-px -translate-x-1/2" />
            <div
              data-scroll-dot
              className="faculty-hero-scroll-dot absolute inset-x-0 top-0 mx-auto h-[5px] w-[5px] rounded-full transition-none"
              style={{ marginTop: "calc(var(--recede) * 32px)" }}
            />
          </div>
        </div>
      </button>
    </section>
  );
}
