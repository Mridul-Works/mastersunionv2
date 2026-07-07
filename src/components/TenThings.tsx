import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "./chapters";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.7, 0, 0.2, 1] as const;
const SLIDE_DURATION = 0.85;


export default function TenThings() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const pinRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinRef.current || !widgetRef.current || !introRef.current) return;

    // Skip the pinned scroll-choreography on mobile — it causes overlap and clipping.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.set(widgetRef.current, { xPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(widgetRef.current, { xPercent: 0, ease: "none" }, 0).to(
        introRef.current,
        { yPercent: -30, opacity: 0, ease: "none" },
        0,
      );
    }, pinRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);







  const go = (delta: number) => {
    setDirection(delta > 0 ? 1 : -1);
    setIndex((i) => (i + delta + CHAPTERS.length) % CHAPTERS.length);
  };

  const jump = (i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const project = CHAPTERS[index];

  return (
    <section className="relative bg-[#F1EFE7] text-[#1A211A]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div ref={pinRef} className="relative w-full overflow-hidden md:h-screen">
      {/* Intro headline — stacked on mobile, absolute hero on desktop */}
      <div ref={introRef} className="relative z-0 flex flex-col justify-center overflow-hidden bg-[#F1EFE7] px-6 py-16 text-[#1A211A] md:absolute md:inset-0 md:px-12 md:py-20 md:will-change-transform">


        <div className="pointer-events-none absolute -left-40 top-1/4 h-[30vh] w-[30vh] -translate-y-1/2 rounded-full bg-[#1A211A]/[0.04] blur-[80px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[30vh] w-[30vh] translate-y-1/2 rounded-full bg-[#1A211A]/[0.04] blur-[80px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1180px]">
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="h-px w-12 bg-[#1A211A]/40" />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1A211A]/55"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Field Notes — Vol. 01
            </span>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2
              className="max-w-[920px] leading-[1.02] tracking-tight text-[#1A211A]"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 7.5vw, 92px)",
              }}
            >
              Cut the{" "}
              <em
                className="font-light italic text-[#1A211A]/60"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                marketing.
              </em>
              <br />
              <span className="font-light italic" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                10 things about Masters' Union
              </span>
            </h2>

            <div className="flex flex-col gap-5 md:items-end md:pb-2">
              <p
                className="max-w-[420px] text-[15px] leading-[1.55] text-[#1A211A]/70"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
              >
                No ads. No fluff. Just the dossier — ten chapters that actually explain how the school works, who teaches, and what gets built.
              </p>

              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#1A211A]/55"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span>{String(CHAPTERS.length).padStart(2, "0")} Chapters</span>
                <span className="h-1 w-1 rounded-full bg-[#1A211A]/60" />
                <span>≈ 8 min read</span>
                <span className="h-1 w-1 rounded-full bg-[#1A211A]/60" />
                <span>Updated 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — desktop only */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:bottom-10 md:flex">
          <span
            className="text-[9px] uppercase tracking-[0.3em] text-[#1A211A]/40"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 }}
          >
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-[#1A211A]/15">
            <div className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-[#1A211A]/50" />
          </div>
        </div>
      </div>



      {/* Card widget — stacked on mobile, slides in from right on desktop */}
      <div ref={widgetRef} className="relative z-20 bg-[#F1EFE7] md:absolute md:inset-0 md:will-change-transform">
        <div className="relative min-h-[720px] w-full overflow-hidden bg-[#F1EFE7] md:h-full md:min-h-[640px]">




          {/* Counter top-left */}
          <div
            className="pointer-events-none absolute left-6 top-6 z-30 font-mono text-[12px] tracking-[0.15em] text-[#1A211A]/55 md:left-10 md:top-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-[#1A211A]"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1 text-[#1A211A]/40">/</span>
            <span className="text-[#1A211A]/40">{String(CHAPTERS.length).padStart(2, "0")}</span>
          </div>


          {/* Giant ghost numeral — desktop only (overlaps text on mobile) */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center md:flex">

            <AnimatePresence mode="popLayout">
              <motion.span
                key={`ghost-${index}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="select-none bg-gradient-to-b from-[#1A211A]/15 via-[#1A211A]/5 to-transparent bg-clip-text font-black tracking-tighter text-transparent"
                style={{ fontSize: "clamp(140px, 30vw, 420px)", lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>


          {/* Slide */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <Slide key={project.n} project={project} direction={direction} index={index} />
          </AnimatePresence>

          {/* Bottom nav: tag / progress / arrows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col gap-3 px-6 pb-6 md:flex-row md:items-end md:justify-between md:px-12 md:pb-10">
            {/* Tag — hidden on mobile (already shown in slide meta) */}
            <div className="pointer-events-auto hidden items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#1A211A]/70 md:flex">
              <span className="inline-block h-1.5 w-1.5 bg-[#1A211A]" />
              <span className="min-w-[80px]">{project.tag}</span>
            </div>


            {/* Progress */}
            <div className="flex items-center gap-2">
              {CHAPTERS.map((p, i) => (
                <button
                  key={p.n}
                  onClick={() => jump(i)}
                  aria-label={`Go to chapter ${i + 1}`}
                  className="pointer-events-auto group h-[3px] w-8 cursor-pointer overflow-hidden bg-[#1A211A]/15"
                >
                  <span
                    className="block h-full origin-left bg-[#1A211A] transition-transform duration-[500ms] ease-out"
                    style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                  />
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="pointer-events-auto flex items-center gap-1 rounded-none border border-[#1A211A]/15 bg-[#F1EFE7]/80 px-1.5 py-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous chapter"
                className="group flex size-8 items-center justify-center rounded-none text-[#1A211A]/70 transition-all hover:bg-[#1A211A]/10 hover:text-[#1A211A]"
              >
                <GradientArrow direction="left" className="size-3.5" />
              </button>
              <span className="h-4 w-px bg-[#1A211A]/15" />
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next chapter"
                className="group flex size-8 items-center justify-center rounded-none text-[#1A211A]/70 transition-all hover:bg-[#1A211A]/10 hover:text-[#1A211A]"
              >
                <GradientArrow direction="right" className="size-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}



function Slide({
  project,
  direction,
  index,
}: {
  project: (typeof CHAPTERS)[number];
  direction: 1 | -1;
  index: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >

      <div className="relative h-full w-full overflow-hidden bg-[#F1EFE7]">
        <motion.div
          key={project.image}
          custom={direction}
          initial={{ clipPath: direction === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath: direction === 1 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            transition: { duration: SLIDE_DURATION * 0.85, ease: EASE },
          }}
          transition={{ duration: SLIDE_DURATION, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.15, x: direction * 40 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 1.05, x: -direction * 40 }}
            transition={{ duration: SLIDE_DURATION * 1.2, ease: EASE }}
          >
            <ImagePlaceholder aspect="3/2" className="h-full w-full" />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute left-6 bottom-6 z-10 md:left-10 md:bottom-10">
          <StaggeredText delay={0.05} k={`bignum-${index}`}>
            <span
              className="block font-black leading-none tracking-tighter text-[#1A211A]"
              style={{ fontSize: "clamp(64px, 8vw, 120px)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </StaggeredText>
        </div>

      </div>

      <div className="relative z-10 flex items-end px-6 pb-44 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[460px]">
          <StaggeredText delay={0.15} k={`meta-${index}`}>
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#1A211A]/60"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[#1A211A]/80">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-[#1A211A]/25">·</span>
              {project.tag}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.25} k={`title-${index}`}>
            <h2
              className="mt-3 font-semibold uppercase text-[#1A211A]"
              style={{
                fontSize: "clamp(24px, 3.5vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {project.headline}
            </h2>
          </StaggeredText>

          <StaggeredText delay={0.46} k={`desc-${index}`}>
            <p className="mt-4 text-[14px] text-[#1A211A]/70" style={{ lineHeight: 1.55 }}>
              {project.body}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.56} k={`stats-${index}`}>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#1A211A]/10 pt-4">
              {project.stats.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <div className="text-2xl font-black tracking-tighter text-[#1A211A]">{s.value}</div>
                  <div
                    className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#1A211A]/50"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </StaggeredText>
        </div>
      </div>

    </motion.div>
  );
}

function StaggeredText({
  children,
  delay = 0,
  k,
}: {
  children: React.ReactNode;
  delay?: number;
  k?: string;
}) {
  return (
    <motion.div
      key={k}
      initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: -14, opacity: 0, filter: "blur(6px)", transition: { duration: 0.45 } }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function GradientArrow({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right";
}) {
  const id = useId();
  const gradientId = `arrow-grad-${id}`;
  const d =
    direction === "right"
      ? "M4 12h16M13 6l6 6-6 6"
      : "M20 12H4M11 6l-6 6 6 6";

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A211A" />
          <stop offset="50%" stopColor="#555555" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

