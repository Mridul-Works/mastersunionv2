import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHAPTERS } from "./chapters";


const EASE = [0.7, 0, 0.2, 1] as const;
const SLIDE_DURATION = 0.85;

export default function TenThings() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

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
      {/* Intro headline — editorial */}
      <div className="relative overflow-hidden bg-[#F1EFE7] px-6 py-12 text-[#1A211A] md:py-16">
        <div className="pointer-events-none absolute -left-40 top-4 h-[20vh] w-[20vh] rounded-full bg-[#1A211A]/[0.04] blur-[60px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[20vh] w-[20vh] rounded-full bg-[#1A211A]/[0.04] blur-[60px]" />

        <div className="relative z-10 mx-auto max-w-[1180px]">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#1A211A]/40" />
            <span
              className="text-[9px] uppercase tracking-[0.3em] text-[#1A211A]/55"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 }}
            >
              Field Notes — Vol. 01
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              className="leading-[1.02] tracking-[-0.02em] text-[#1A211A]"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(26px, 4.5vw, 52px)",
              }}
            >
              Cut the{" "}
              <em
                className="text-[#1A211A]/60"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontStyle: "italic", fontWeight: 300 }}
              >
                marketing.
              </em>
              <br className="hidden md:block" />
              <span className="relative inline-block">
                <span
                  className="relative z-10 italic"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                >
                  10 things about Masters' Union
                </span>
                <span className="absolute inset-x-0 bottom-2 z-0 h-[3px] bg-[#1A211A]/15" />
              </span>
            </h2>

            <div className="flex flex-col gap-3 md:items-end">
              <p
                className="max-w-[360px] text-[13px] leading-[1.5] text-[#1A211A]/70"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
              >
                No ads. No fluff. Just the dossier — ten chapters that actually explain how the school works, who teaches, and what gets built.
              </p>

              <div
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.26em] text-[#1A211A]/55"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 }}
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
      </div>



      {/* Card widget — manual prev/next */}
      <div className="relative bg-[#F1EFE7]">
        <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#2A312A]">

          {/* Counter top-left */}
          <div
            className="pointer-events-none absolute left-6 top-6 z-30 font-mono text-[12px] tracking-[0.15em] text-neutral-400 md:left-10 md:top-10"
            style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: "0 0 24px rgba(255,255,255,0.10)" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1 text-neutral-600">/</span>
            <span className="text-neutral-600">{String(CHAPTERS.length).padStart(2, "0")}</span>
          </div>


          {/* Giant ghost numeral */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`ghost-${index}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="select-none bg-gradient-to-b from-neutral-300/20 via-neutral-400/8 to-transparent bg-clip-text font-black tracking-tighter text-transparent"
                style={{ fontSize: "clamp(140px, 30vw, 420px)", lineHeight: 1, filter: "drop-shadow(0 0 80px rgba(255,255,255,0.08))" }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>


          {/* Slide */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <Slide key={project.n} project={project} direction={direction} index={index} />
          </AnimatePresence>

          {/* Bottom nav: tag + arrows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex flex-col items-center gap-2 px-5 md:bottom-7">
            <div className="pointer-events-auto flex w-full max-w-[440px] items-center justify-between">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/70">
                <span className="inline-block h-1 w-1 rounded-full bg-white" />
                <span className="min-w-[70px] text-center">{project.tag}</span>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous chapter"
                  className="group flex items-center gap-1.5 rounded-full px-2 py-1 text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  <GradientArrow direction="left" className="size-4" />
                  <span className="hidden text-[10px] font-medium uppercase tracking-wider sm:inline">Prev</span>
                </button>
                <span className="h-3 w-px bg-white/15" />
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next chapter"
                  className="group flex items-center gap-1.5 rounded-full px-2 py-1 text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  <span className="hidden text-[10px] font-medium uppercase tracking-wider sm:inline">Next</span>
                  <GradientArrow direction="right" className="size-4" />
                </button>
              </div>

            </div>

            <div className="flex items-center gap-2">
              {CHAPTERS.map((p, i) => (
                <button
                  key={p.n}
                  onClick={() => jump(i)}
                  aria-label={`Go to chapter ${i + 1}`}
                  className="pointer-events-auto group h-[2px] w-6 cursor-pointer overflow-hidden bg-white/15"
                >
                  <span
                    className="block h-full origin-left bg-white transition-transform duration-[500ms] ease-out"
                    style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                  />
                </button>
              ))}
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

      <div className="relative h-full w-full overflow-hidden">
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
          className="absolute inset-0"
        >
          <motion.img
            src={project.image}
            alt={project.headline}
            className="h-full w-full object-cover"
            initial={{ scale: 1.15, x: direction * 40 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 1.05, x: -direction * 40 }}
            transition={{ duration: SLIDE_DURATION * 1.2, ease: EASE }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(42,49,42,0.55) 0%, rgba(42,49,42,0) 35%, rgba(42,49,42,0) 60%, rgba(26,33,26,0.85) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(42,49,42,0.7) 0%, rgba(42,49,42,0) 28%, rgba(42,49,42,0) 70%, rgba(26,33,26,0.9) 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-[#2A312A]/10 mix-blend-multiply"
          />
        </motion.div>

        <div className="pointer-events-none absolute left-6 bottom-6 z-10 md:left-10 md:bottom-10">
          <StaggeredText delay={0.05} k={`bignum-${index}`}>
            <span
              className="block bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-700 bg-clip-text font-black leading-none tracking-tighter text-transparent"
              style={{ fontSize: "clamp(64px, 8vw, 120px)", filter: "drop-shadow(0 0 40px rgba(255,255,255,0.10))" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </StaggeredText>
        </div>

      </div>

      <div className="relative z-10 flex items-end px-6 pb-24 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[460px]">
          <StaggeredText delay={0.15} k={`meta-${index}`}>
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-white/60"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-white/25">·</span>
              {project.tag}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.25} k={`title-${index}`}>
            <h2
              className="mt-3 font-black uppercase text-white"
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
            <p className="mt-4 text-[14px] text-white/70" style={{ lineHeight: 1.55 }}>
              {project.body}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.56} k={`stats-${index}`}>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-4">
              {project.stats.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <div className="text-2xl font-black tracking-tighter text-white">{s.value}</div>
                  <div
                    className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/50"
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
  const glowId = `arrow-glow-${id}`;
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
      style={{ filter: `drop-shadow(0 0 4px rgba(255,255,255,0.35))` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#737373" />
        </linearGradient>

        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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

