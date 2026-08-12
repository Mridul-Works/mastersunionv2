import { useEffect, useRef, useState } from "react";
import type { FacultyStat } from "@/lib/faculty-stats";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const SERIF_IT = "'Fraunces', Georgia, serif";

const HERO_IMAGE = "https://images.mastersunion.link/uploads/03032026/v1/Frame2043683361.webp";

// Shared geometry for both photo layers so colour + monochrome stay pixel-aligned.
const PHOTO_CLASS =
  "h-full w-full origin-center object-cover object-[50%_18%] contrast-[1.05] md:object-[42%_40%] md:scale-[1.14] lg:object-[36%_50%] lg:scale-[1.10] scale-[1.16] will-change-transform";

const HEADLINE = (
  <>
    At most B-schools, faculty{" "}
    <span className="font-light italic" style={{ fontFamily: SERIF_IT, color: "#CBE4DE" }}>
      study
    </span>{" "}
    companies. Here, they{" "}
    <span className="font-light italic" style={{ fontFamily: SERIF_IT, color: "#CBE4DE" }}>
      ran
    </span>{" "}
    them and most still do.
  </>
);


const FALLBACK_STATS: FacultyStat[] = [
  { v: "500+", l: "Masters on the roster" },
  { v: "33%", l: "Active industry practitioners" },
  { v: "18", l: "Universities represented" },
  { v: "37", l: "Full-time PhD faculty" },
];

/**
 * Full-bleed obsidian editorial opening for /faculty.
 * The existing academic photograph emerges from the darkness via a soft
 * radial/linear mask instead of sitting inside a rectangular frame.
 * Respects prefers-reduced-motion.
 */
export default function FacultyHero({
  stats,
  refreshed,
  universities,
}: {
  stats?: FacultyStat[];
  refreshed?: string;
  universities?: string[];
}) {
  const STATS = stats?.length ? stats : FALLBACK_STATS;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const entrance = (
    from: number,
    axis: "x" | "y",
    duration: number,
    delay: number
  ) => {
    if (reducedMotion) return { opacity: 1, transform: "none", transition: "none" };
    const transform =
      axis === "x"
        ? `translateX(${animateIn ? 0 : from}px)`
        : `translateY(${animateIn ? 0 : from}px)`;
    return {
      opacity: animateIn ? 1 : 0,
      transform,
      transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      transitionDelay: `${delay}ms`,
    };
  };

  // ---- Cursor "develop the photograph" colour reveal (desktop / fine pointer) ----
  const photoRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0, s: 0 });
  const current = useRef({ x: 0, y: 0, s: 0 });
  const [reveal, setReveal] = useState({ x: 0, y: 0, s: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let running = false;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.16;
      c.y += (t.y - c.y) * 0.16;
      c.s += (t.s - c.s) * 0.07;
      setReveal({ x: c.x, y: c.y, s: c.s });
      const settled =
        Math.abs(t.x - c.x) < 0.4 && Math.abs(t.y - c.y) < 0.4 && Math.abs(t.s - c.s) < 0.002;
      if (settled && t.s === 0) {
        c.s = 0;
        setReveal({ x: c.x, y: c.y, s: 0 });
        running = false;
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const el = photoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (inside && target.current.s === 0) {
        current.current.x = x;
        current.current.y = y;
      }
      if (inside) {
        target.current.x = x;
        target.current.y = y;
      }
      target.current.s = inside ? 1 : 0;
      start();
    };
    const onLeave = () => {
      target.current.s = 0;
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Directional entrance animations for the text elements.
  // Trigger once on mount; disabled when reduced motion is preferred.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) {
      setAnimateIn(true);
      return;
    }
    const id = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Very subtle recede as the hero scrolls away (no sticky trap, no big parallax).
  // Driven by a CSS custom property to avoid React re-renders and boundary flicker.
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
        // Clamp scroll progress to [0, 1] and ignore overscroll / rubber-band values.
        const p = Math.min(1, Math.max(0, raw));
        const current = parseFloat(el.style.getPropertyValue("--recede") || "0");
        // Only update the custom property when the value actually changes.
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
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
      style={{ ["--recede" as string]: "0" }}
    >
      <div
        className="page-gutter relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-0 lg:grid-cols-12"
        style={{ minHeight: "clamp(560px, calc(100svh - 150px), 1000px)" }}
      >
        {/* Left content column: architectural black space */}
        <div className="relative flex flex-col justify-center py-[clamp(1.25rem,3.2vh,2.25rem)] lg:col-span-7 lg:pr-10">
          {/* Typography */}
          <div
            className="relative z-10"
            style={{ opacity: "clamp(0.6, calc(1 - var(--recede) * 0.4), 1)" }}
          >
            <div style={entrance(-50, "x", 650, 0)}>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-px w-6 shrink-0 bg-white/30 sm:w-8" aria-hidden />
                <div
                  className="min-w-0 text-[clamp(9px,2vw,10px)] uppercase tracking-[0.28em] text-white/55 sm:tracking-[0.3em]"
                  style={{ fontFamily: MONO }}
                >
                  Faculty at Masters&apos; Union
                </div>
              </div>
            </div>

            {/* Headline: fills the left column, never the photo zone */}
            {/* Headline + paragraph: shared background watermark */}
            <div className="relative mt-[clamp(0.85rem,2.2vh,1.5rem)] w-full max-w-[850px]">
              {/* MU watermark — spans the combined height of headline + paragraph */}
              <div
                className="pointer-events-none absolute left-0 top-0 z-0 flex h-full items-center select-none font-black uppercase leading-none text-white/[0.035]"
                style={{ fontFamily: SANS, fontSize: "clamp(12rem, 22vw, 28rem)" }}
                aria-hidden
              >
                MU
              </div>

              {/* Headline: fills the left column, never the photo zone */}
              <div
                className="relative z-10 w-full"
                style={{ fontSize: "clamp(1.95rem, 3.5vw, 3.4rem)" }}
              >
                <h1
                  className="text-[1em] font-semibold leading-[1.02] tracking-[-0.025em] text-white [text-wrap:balance]"
                  style={{
                    fontFamily: SANS,
                    opacity: animateIn ? 1 : 0,
                    transform: animateIn ? "translateY(0)" : "translateY(60px)",
                    transition:
                      "opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: "150ms",
                  }}
                >
                  {HEADLINE}
                </h1>
              </div>

              {/* Paragraph with architectural left border */}
              <div
                className="relative z-10 mt-[clamp(0.9rem,2.4vh,1.7rem)] max-w-[44rem] border-l border-white/15 pl-5 lg:max-w-[40rem]"
                style={entrance(50, "y", 750, 340)}
              >
                <p className="max-w-[48ch] text-[clamp(0.9rem,2.2vw,1.15rem)] leading-[1.55] text-white/70">
                  500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
                  by{" "}
                  <span
                    className="font-light italic"
                    style={{ fontFamily: SERIF_IT, color: "#CBE4DE" }}
                  >
                    Ivy League academics and global business leaders
                  </span>{" "}
                  — from Harvard to McKinsey, from Wharton to Google. They don&apos;t just teach the
                  playbook. They wrote it.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll cue — centered under the text column */}
          <div
            className="hero-fade-up mt-4 flex justify-center"
            style={{ animationDelay: "1250ms", opacity: "clamp(0, calc(1 - var(--recede) * 2), 1)" }}
          >
            <div className="flex flex-col items-center gap-2 text-white/45">
              <span className="hero-scroll-arrow text-[13px] leading-none" aria-hidden>
                ↓
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.28em]"
                style={{ fontFamily: MONO }}
              >
                Scroll
              </span>
            </div>
          </div>
        </div>

        {/* Right portrait column */}
        <div className="relative h-[min(420px,55vh)] lg:col-span-5 lg:h-auto">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              opacity: "clamp(0.45, calc(1 - var(--recede) * 0.55), 1)",
              transform: "translate3d(0, calc(var(--recede) * -18px), 0)",
            }}
            aria-hidden
          >
            <div
              ref={photoRef}
              className="hero-photo-emerge absolute inset-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(82% 82% at 56% 50%, #000 0%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.72) 68%, rgba(0,0,0,0.34) 84%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "radial-gradient(82% 82% at 56% 50%, #000 0%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.72) 68%, rgba(0,0,0,0.34) 84%, rgba(0,0,0,0) 100%)",
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Faculty at Masters' Union"
                loading="eager"
                decoding="async"
                className={`${PHOTO_CLASS} absolute inset-0`}
              />
              <img
                src={HERO_IMAGE}
                alt=""
                aria-hidden
                loading="eager"
                decoding="async"
                className={`${PHOTO_CLASS} relative saturate-0`}
                style={
                  reveal.s > 0.002
                    ? {
                        WebkitMaskImage: `radial-gradient(circle ${380 * reveal.s}px at ${reveal.x}px ${reveal.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.9) 88%, #000 100%)`,
                        maskImage: `radial-gradient(circle ${380 * reveal.s}px at ${reveal.x}px ${reveal.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.9) 88%, #000 100%)`,
                      }
                    : undefined
                }
              />
            </div>

            {/* Left-edge falloff so the split stays clean */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.85) 12%, rgba(10,10,10,0.5) 26%, rgba(10,10,10,0.18) 40%, rgba(10,10,10,0) 56%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#0a0a0a] to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-[26%]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* BY THE NUMBERS — unified glassmorphic panel (full width below the split) */}
      <div className="page-gutter relative z-10 mx-auto w-full max-w-[1440px] pb-[clamp(3.5rem,8vh,6.25rem)]">
        <div className="mt-[clamp(0.85rem,1.9vh,1.3rem)]">
          <div
            className="hero-fade-up pointer-events-none w-full rounded-[clamp(16px,2.2vw,24px)] border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.20)] backdrop-blur-[18px]"
            style={{
              animationDelay: "780ms",
              ["--card-pad" as string]: "clamp(1rem, 2.4vw, 2.25rem)",
              paddingInline: "var(--card-pad)",
              paddingBlock: "clamp(1rem, 2.2vh, 1.85rem)",
            }}
          >
            <div
              className="flex flex-wrap items-center justify-start gap-2 text-[clamp(9px,1.9vw,10px)] uppercase tracking-[0.22em] text-white/50 sm:gap-3 sm:tracking-[0.24em]"
              style={{ fontFamily: MONO }}
            >
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[999px] border border-[#CBE4DE]/[0.25] bg-[#CBE4DE]/[0.18] px-[7px] py-1 text-center text-white backdrop-blur-[8px]">
                By the numbers
              </span>
              {refreshed ? (
                <>
                  <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
                  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[999px] border border-[#CBE4DE]/[0.25] bg-[#CBE4DE]/[0.18] px-[7px] py-1 text-center uppercase tracking-[inherit] text-white backdrop-blur-[8px]">
                    {refreshed}
                  </span>
                </>
              ) : null}
            </div>

            <div className="mt-[clamp(0.9rem,2vh,1.25rem)] grid w-full grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8">
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  className="hero-fade-up group pointer-events-auto flex min-w-0 flex-col items-center text-center"
                  style={{ animationDelay: `${860 + i * 70}ms` }}
                >
                  <div
                    className="text-[clamp(1.5rem,4.6vw,2.6rem)] font-medium leading-[0.9] tracking-[-0.035em]"
                    style={{ fontFamily: SERIF_IT, color: "#CBE4DE" }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-2 max-w-full text-[clamp(9px,1.9vw,10px)] font-medium uppercase leading-[1.5] tracking-[0.14em] text-white/60 sm:mt-2.5 sm:tracking-[0.16em] lg:whitespace-nowrap"
                    style={{ fontFamily: MONO }}
                  >
                    {s.l}
                  </div>
                  <div
                    className="mx-auto mt-3 h-px w-8 origin-center animate-pulse bg-white/25 transition-all duration-500 group-hover:w-24 group-hover:bg-[#CBE4DE]"
                    style={{ animationDelay: `${1 + i * 0.12}s` }}
                    aria-hidden
                  />
                </div>
              ))}
            </div>

            {/* University names — quiet editorial footer inside the glass panel */}
            {universities?.length ? (
              <div
                className="hero-fade-up mt-[clamp(1rem,2.2vh,1.85rem)] border-t border-white/[0.08] pt-[clamp(1rem,2.2vh,1.85rem)]"
                style={{ animationDelay: "1100ms" }}
              >
                <div
                  className="pointer-events-auto overflow-x-auto [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden"
                  style={{
                    marginInline: "calc(var(--card-pad) * -1)",
                    paddingInline: "var(--card-pad)",
                  }}
                >
                  <div
                    className="flex min-w-max items-center md:grid md:min-w-0"
                    style={{
                      gridTemplateColumns: `repeat(${universities.length}, minmax(min-content, 1fr))`,
                    }}
                  >
                    {universities.map((name) => (
                      <div key={name} className="flex items-center justify-center">
                        <span
                          className="whitespace-nowrap text-center text-[clamp(0.78rem,2.1vw,0.95rem)] italic tracking-[0.01em] text-white/75 transition-colors hover:text-white"
                          style={{ fontFamily: SERIF_IT }}
                          title={name}
                        >
                          {name}
                        </span>
                        <span className="mx-2 text-white/20 md:ml-3 md:mr-0" aria-hidden>
                          |
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
