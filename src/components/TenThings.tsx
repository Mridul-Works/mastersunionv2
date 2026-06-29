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
    <section className="relative bg-[#0A0A0A] text-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {/* Intro — Masters' Union brand: mono-first, 40/40/20, single yellow accent */}
      <div className="relative overflow-hidden bg-white px-6 py-28 md:py-40 text-[#101010]">
        {/* subtle brand gradient wash, very low opacity (clean first, colorful second) */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[60vh] w-[60vh] rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: "var(--gradient-brand)" }}
        />

        <div className="relative z-10 mx-auto max-w-[1180px]">
          {/* Eyebrow — Manrope (Galano Grotesque substitute), uppercase, brand-clean */}
          <div className="mb-14 flex items-center gap-4">
            <span className="h-px w-10 bg-[#101010]" />
            <span
              className="text-[11px] uppercase tracking-[0.28em] text-[#101010]"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
            >
              Masters' Union University · Field Notes 01
            </span>
          </div>

          {/* Headline — PP Editorial New (Instrument Serif fallback), ultralight + ultrabold mix */}
          <h2
            className="leading-[0.96] tracking-[-0.025em] text-[#101010]"
            style={{
              fontFamily: "'Instrument Serif', 'PP Editorial New', serif",
              fontWeight: 400,
              fontSize: "clamp(56px, 9.5vw, 132px)",
            }}
          >
            Cut the{" "}
            <em
              className="italic"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              marketing.
            </em>
            <br />
            <span className="block">
              10 things about{" "}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}
                >
                  Masters' Union
                </span>
                {/* single brand accent — yellow #F4C641, per brand color usage rules */}
                <span className="absolute inset-x-0 bottom-2 z-0 h-[10px] bg-[#F4C641]" />
              </span>
            </span>
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <p
              className="max-w-[540px] text-[17px] leading-[1.65] text-[#3C3C3C]"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
            >
              No ads. No fluff. Just the dossier — ten chapters that actually
              explain how the school works, who teaches, and what gets built.
            </p>

            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#101010]/15 pt-5 text-[11px] uppercase tracking-[0.24em] text-[#737373]"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
            >
              <span>{String(CHAPTERS.length).padStart(2, "0")} Chapters</span>
              <span className="h-[3px] w-[3px] rounded-full bg-[#F4C641]" />
              <span>≈ 8 min read</span>
              <span className="h-[3px] w-[3px] rounded-full bg-[#F4C641]" />
              <span>Learn by doing</span>
            </div>
          </div>
        </div>
      </div>


      {/* Card widget — manual prev/next */}
      <div className="relative bg-[#0A0A0A]">
        <div className="relative h-[70svh] min-h-[450px] w-full overflow-hidden">
          {/* Counter top-left */}
          <div
            className="pointer-events-none absolute left-6 top-6 z-30 font-mono text-[12px] tracking-[0.15em] text-neutral-400 md:left-10"
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
                style={{ fontSize: "clamp(280px, 48vw, 720px)", lineHeight: 1, filter: "drop-shadow(0 0 60px rgba(255,255,255,0.06))" }}
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
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-5 px-6">
            <div className="pointer-events-auto flex w-full max-w-[620px] items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
                <span className="min-w-[80px] text-center">{project.tag}</span>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1.5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous chapter"
                  className="group flex items-center gap-1.5 rounded-full px-2 py-1 text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  <GradientArrow direction="left" className="size-5" />
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
                  <GradientArrow direction="right" className="size-5" />
                </button>
              </div>

            </div>

            <div className="flex items-center gap-2">
              {CHAPTERS.map((p, i) => (
                <button
                  key={p.n}
                  onClick={() => jump(i)}
                  aria-label={`Go to chapter ${i + 1}`}
                  className="pointer-events-auto group h-[2px] w-9 cursor-pointer overflow-hidden bg-white/15"
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
      className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-[1fr_min(620px,42vw)]"
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
                "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 60%, rgba(10,10,10,0.85) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0) 28%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.9) 100%)",
            }}
          />
        </motion.div>

        <div className="pointer-events-none absolute left-6 bottom-6 md:left-10 md:bottom-10 z-10">
          <StaggeredText delay={0.05} k={`bignum-${index}`}>
            <span
              className="block bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-700 bg-clip-text font-black leading-none tracking-tighter text-transparent"
              style={{ fontSize: "clamp(72px, 9vw, 140px)", filter: "drop-shadow(0 0 30px rgba(255,255,255,0.08))" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </StaggeredText>
        </div>
      </div>

      <div className="relative z-10 flex items-end px-6 pb-32 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[560px]">
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
              className="mt-5 font-black uppercase text-white"
              style={{
                fontSize: "clamp(34px, 4.4vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              {project.headline}
            </h2>
          </StaggeredText>

          <StaggeredText delay={0.46} k={`desc-${index}`}>
            <p className="mt-6 text-[13.5px] text-white/70" style={{ lineHeight: 1.7 }}>
              {project.body}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.56} k={`stats-${index}`}>
            <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-5">
              {project.stats.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <div className="text-2xl font-black tracking-tighter text-white">{s.value}</div>
                  <div
                    className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50"
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
      style={{ filter: `drop-shadow(0 0 4px rgba(249, 115, 22, 0.45))` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fb923c" />
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

