import { useEffect, useRef, useState } from "react";
import type { FacultyStat } from "@/lib/faculty-stats";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const SERIF_IT = "'Fraunces', Georgia, serif";

const HERO_IMAGE = "https://images.mastersunion.link/uploads/03032026/v1/Frame2043683361.webp";

// Shared geometry for both photo layers so colour + monochrome stay pixel-aligned.
const PHOTO_CLASS =
  "h-full w-full origin-center object-cover object-[46%_15%] contrast-[1.05] md:object-[52%_22%] md:scale-[1.22] lg:object-[56%_28%] lg:scale-[1.28] scale-[1.18] will-change-transform";


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
 * Full-bleed obsidian editorial opening for /faculty.
 * The existing academic photograph emerges from the darkness via a soft
 * radial/linear mask instead of sitting inside a rectangular frame.
 * Respects prefers-reduced-motion.
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
  const [recede, setRecede] = useState(0);

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


  // Very subtle recede as the hero scrolls away (no sticky trap, no big parallax).
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
        const p = Math.min(1, Math.max(0, window.scrollY / h));
        setRecede(p);
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
    >
      {/* Photograph emerging from the darkness — masked, frameless */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full md:w-[62%] lg:w-[56%]"
        style={{
          opacity: 1 - recede * 0.55,
          transform: `translate3d(0, ${recede * -18}px, 0)`,
          transition: "opacity 120ms linear",
        }}
        aria-hidden
      >
        <div
          ref={photoRef}
          className="hero-photo-emerge absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(62% 68% at 66% 46%, #000 0%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.5) 66%, rgba(0,0,0,0) 88%)",
            maskImage:
              "radial-gradient(62% 68% at 66% 46%, #000 0%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.5) 66%, rgba(0,0,0,0) 88%)",
          }}
        >
          {/* Colour layer (bottom) */}
          <img
            src={HERO_IMAGE}
            alt="Faculty at Masters' Union"
            loading="eager"
            decoding="async"
            className={`${PHOTO_CLASS} absolute inset-0`}
          />
          {/* Monochrome layer (top) — cursor punches a soft hole to develop colour */}
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

        {/* Left-edge falloff so typography stays clean */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent md:via-[#0a0a0a]/35"
          style={{ backgroundSize: "100% 100%" }}
        />
        <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <div
        className="relative z-10 flex min-h-[calc(100dvh-190px)] w-full max-w-none flex-col px-5 pb-[clamp(5.5rem,9vh,6.25rem)] pt-[clamp(1.5rem,3.2vh,2.25rem)] md:px-[clamp(3.25rem,4vw,4.5rem)]"
        style={{ opacity: 1 - recede * 0.4 }}
      >
        {/* Typography */}
        <div className="flex-1">
          <div className="max-w-[46rem] md:max-w-[34rem] lg:max-w-[40rem]">
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
              className="mt-[clamp(1rem,2.2vh,1.5rem)] max-w-[24ch] text-[clamp(2.25rem,4.1vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-white"
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
              className="hero-fade-up mt-[clamp(1.1rem,2.4vh,1.7rem)] max-w-[52ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.58] text-white/70"
              style={{ animationDelay: "620ms" }}
            >
              500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
              by Ivy League academics and global business leaders — from Harvard to McKinsey, from
              Wharton to Google. They don&apos;t just teach the playbook. They wrote it.
            </p>
          </div>
        </div>

        {/* Scroll cue — bottom right, minimal */}
        <div
          className="hero-fade-up mt-3 flex justify-end"
          style={{ animationDelay: "1250ms", opacity: 1 - recede * 2 }}
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

        {/* BY THE NUMBERS — same opening section */}
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
