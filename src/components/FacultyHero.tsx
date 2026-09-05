import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF_IT = "var(--faculty-font-display, 'Instrument Serif', Georgia, serif)";
const SANS = "var(--faculty-font-body, 'Work Sans', system-ui, sans-serif)";

const HERO_IMAGE = "https://images.mastersunion.link/uploads/03032026/v1/Frame2043683361.webp";

// Shared geometry for both photo layers so colour + monochrome stay pixel-aligned.
// One single composition across every breakpoint: same object-position, same scale.
const PHOTO_CLASS =
  "h-full w-full origin-center object-cover object-[50%_54%] contrast-[1.05] will-change-transform";

const HEADLINE = (
  <>
    At most B-schools, faculty{" "}
    <span className="font-light italic text-white/[0.14]" style={{ fontFamily: SERIF_IT }}>
      study
    </span>{" "}
    companies. Here, they{" "}
    <span className="font-light italic text-white/[0.14]" style={{ fontFamily: SERIF_IT }}>
      ran
    </span>{" "}
    them and most still do.
  </>
);



/** Demo's staggered entrance system: parent fades, children sequence at 0.15s. */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemTransition = { duration: 0.5, ease: "easeOut" as const };

/** Existing Faculty direction preserved: eyebrow slides in from the LEFT. */
const itemFromLeft: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: itemTransition },
};

/** Existing Faculty direction preserved: headline + paragraph rise from BELOW. */
const itemFromBelow: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: itemTransition },
};

/**
 * Full-bleed obsidian editorial opening for /faculty.
 * The existing academic photograph emerges from the darkness via a soft
 * radial/linear mask instead of sitting inside a rectangular frame.
 * Respects prefers-reduced-motion.
 */
export default function FacultyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [muClass, setMuClass] = useState("mu-watermark mu-watermark-dark");
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced === true || reducedMotion;

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

  // MU watermark: start dark, then hand opacity over to the scroll-linked CSS class.
  useEffect(() => {
    if (reducedMotion) {
      setMuClass("mu-watermark");
      return;
    }
    if (animateIn) {
      setMuClass("mu-watermark");
    }
  }, [animateIn, reducedMotion]);

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

  // The photograph entrance is now handled by the clip-path reveal on its wrapper,
  // so the image layers themselves stay in their final composition (no transform).
  const imageEntranceStyle = { opacity: 1, transform: "none" } as const;

const CLIP_HIDDEN = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
const CLIP_REVEAL = "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)";

  return (
    <section
      ref={sectionRef}
      id="top"
      className="faculty-redesign-hero relative w-full overflow-hidden bg-background text-foreground"
      style={{ ["--recede" as string]: "0" }}
    >
      <div
        className="page-gutter relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-0 lg:grid-cols-12"
        style={{ minHeight: "clamp(560px, calc(100svh - 150px), 1000px)", paddingBottom: "clamp(2rem,6vh,4.5rem)" }}
      >
        {/* Left content column: architectural black space */}
        <div className="relative flex flex-col justify-center pt-[max(0.75rem,env(safe-area-inset-top))] pb-[clamp(1.25rem,3.2vh,2.25rem)] lg:col-span-7 lg:py-[clamp(1.25rem,3.2vh,2.25rem)] lg:pr-10">
          {/* Typography — demo's staggered Framer Motion entrance system */}
          <motion.div
            className="relative z-10"
            style={{ opacity: "clamp(0.6, calc(1 - var(--recede) * 0.4), 1)" }}
            variants={containerVariants}
            initial={noMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <motion.div variants={itemFromLeft} className="mt-0 lg:-mt-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-px w-6 shrink-0 bg-white/30 sm:w-8" aria-hidden />
                <div
                  className="min-w-0 text-[clamp(9px,2vw,10px)] uppercase tracking-[0.28em] text-white/55 sm:tracking-[0.3em]"
                  style={{ fontFamily: MONO }}
                >
                  Faculty at Masters&apos; Union
                </div>
              </div>
            </motion.div>

            {/* Headline + paragraph: shared background watermark */}
            <div className="relative mt-[clamp(0.85rem,2.2vh,1.5rem)] w-full max-w-[850px]">
              {/* MU watermark — spans the combined height of headline + paragraph */}
              <div
                className={`pointer-events-none absolute -left-[4%] -top-[12%] z-0 flex h-[140%] items-center select-none font-black uppercase leading-none text-white/[0.09] ${muClass}`}
                style={{ fontFamily: SANS, fontSize: "clamp(15rem, 28vw, 34rem)" }}
                aria-hidden
              >
                MU
              </div>

              {/* Headline: fills the left column, never the photo zone */}
              <motion.div
                variants={itemFromBelow}
                className="relative z-10 w-full"
                style={{ fontSize: "clamp(1.95rem, 3.5vw, 3.4rem)" }}
              >
                <h1
                  className="faculty-hero-title text-[1em] font-normal leading-[0.94] text-foreground [text-wrap:balance]"
                  style={{ fontFamily: SERIF_IT }}
                >
                  {HEADLINE}
                </h1>
              </motion.div>

              {/* Paragraph with visiting-faculty overlay treatment */}
              <motion.div
                variants={itemFromBelow}
                className="relative z-10 mt-[clamp(0.9rem,2.4vh,1.7rem)] faculty-editorial-text border-l-2 border-white/80 bg-white/[0.04]"
              >
                <p className="max-w-[70ch] text-[0.98rem] leading-[1.5] text-white/75">
                  500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered
                  by{" "}
                  <span className="font-medium text-white" style={{ fontFamily: SERIF_IT }}>
                    Ivy League academics and global business leaders
                  </span>{" "}
                  — from Harvard to McKinsey, from Wharton to Google. They don&apos;t just teach the
                  playbook. They wrote it.
                </p>
              </motion.div>
            </div>
          </motion.div>


        </div>

        {/* Right portrait column */}
        <div className="relative h-[min(420px,55vh)] bg-[#0a0a0a] lg:col-span-5 lg:h-auto">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 bg-[#0a0a0a]"
            style={{
              right: "calc(-1 * (clamp(20px, 4vw, 64px) + max(0px, (100vw - 1440px) / 2)))",
              opacity: "clamp(0.45, calc(1 - var(--recede) * 0.55), 1)",
              transform: "translate3d(0, calc(var(--recede) * -18px), 0)",
            }}
            aria-hidden
          >
            <motion.div
              ref={photoRef}
              className="absolute inset-0 z-0"
              initial={noMotion ? false : { clipPath: CLIP_HIDDEN }}
              animate={noMotion ? { clipPath: CLIP_REVEAL } : { clipPath: [CLIP_HIDDEN, CLIP_REVEAL] }}
              transition={
                noMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: "circOut", times: [0, 1] }
              }
              style={{
                clipPath: CLIP_REVEAL,
                willChange: "clip-path",
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Faculty at Masters' Union"
                loading="eager"
                decoding="async"
                className={`${PHOTO_CLASS} absolute inset-0`}
                style={imageEntranceStyle}
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
                        ...imageEntranceStyle,
                        WebkitMaskImage: `radial-gradient(circle ${380 * reveal.s}px at ${reveal.x}px ${reveal.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.9) 88%, #000 100%)`,
                        maskImage: `radial-gradient(circle ${380 * reveal.s}px at ${reveal.x}px ${reveal.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.9) 88%, #000 100%)`,
                      }
                    : imageEntranceStyle
                }
              />
            </motion.div>

            {/* Very narrow, subtle left-edge falloff so the text column and image panel read as one scene */}
            <div
              className="absolute inset-0 z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.55) 4%, rgba(10,10,10,0.15) 10%, rgba(10,10,10,0) 16%)",
              }}
            />
          </div>
        </div>

        {/* Scroll cue — vertical line with a dot that travels down as the hero scrolls away */}
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
          className="group absolute inset-x-0 bottom-[clamp(4.5rem,7vh,6rem)] z-20 flex cursor-pointer justify-center rounded-sm border border-transparent p-3 text-white/45 transition-colors hover:text-white/70 focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
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
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/40 to-white/10" />
              <div
                data-scroll-dot
                className="absolute inset-x-0 top-0 mx-auto h-[5px] w-[5px] rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-none group-hover:bg-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                style={{ marginTop: "calc(var(--recede) * 32px)" }}
              />
            </div>
          </div>
        </button>
      </div>

    </section>
  );
}
