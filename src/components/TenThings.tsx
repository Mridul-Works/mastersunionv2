import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CHAPTERS } from "./chapters";

const EASE = [0.7, 0, 0.2, 1] as const;
const SLIDE_DURATION = 0.95;

export default function TenThings() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lastIdx = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map progress -> slide index. We use (n) slides over a (n)-step track.
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const raw = Math.floor(p * CHAPTERS.length);
      const next = Math.max(0, Math.min(CHAPTERS.length - 1, raw));
      if (next !== lastIdx.current) {
        setDirection(next > lastIdx.current ? 1 : -1);
        lastIdx.current = next;
        setIndex(next);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = el.offsetHeight - window.innerHeight;
    const targetWithin = (i / CHAPTERS.length) * totalScroll + totalScroll / CHAPTERS.length / 2;
    const targetY = window.scrollY + rect.top + targetWithin;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const project = CHAPTERS[index];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] text-white"
      style={{ height: `${CHAPTERS.length * 100}vh`, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section headline */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 z-30 flex flex-col items-center text-center">
          <span
            className="text-[11px] uppercase tracking-[0.35em] text-white/50"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Cut the marketing
          </span>
          <h3
            className="mt-2 max-w-[90vw] text-[clamp(22px,3.2vw,42px)] font-black uppercase leading-[1.05] tracking-tight text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Here are 10 things about Masters' Union
          </h3>
        </div>

        {/* Counter top-left */}
        <div
          className="pointer-events-none absolute left-6 top-6 z-30 font-mono text-[12px] tracking-[0.15em] text-white/70 md:left-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
          <span className="mx-1 text-white/30">/</span>
          <span className="text-white/30">{String(CHAPTERS.length).padStart(2, "0")}</span>
        </div>

        {/* Giant ghost numeral */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`ghost-${index}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.06, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="select-none font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(280px, 48vw, 720px)", lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Slide stack */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <Slide key={project.n} project={project} direction={direction} index={index} />
        </AnimatePresence>

        {/* Hint + progress bars bottom-center */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-5 px-6">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            <span>Scroll</span>
            <span className="text-white/20">·</span>
            <span>Drag</span>
            <span className="text-white/20">·</span>
            <span>Jump</span>
          </div>
          <div className="flex items-center gap-2">
            {CHAPTERS.map((p, i) => (
              <button
                key={p.n}
                onClick={() => goTo(i)}
                aria-label={`Go to chapter ${i + 1}`}
                className="pointer-events-auto group h-[2px] w-9 cursor-pointer overflow-hidden bg-white/15"
              >
                <span
                  className="block h-full origin-left bg-white transition-transform duration-[700ms] ease-out"
                  style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Top-edge scroll progress bar */}
        <motion.div
          className="absolute left-0 top-0 z-30 h-px bg-white/70"
          style={{ width: progressWidth }}
        />
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
      className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-[1fr_460px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image side */}
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

        {/* In-image big number */}
        <div className="pointer-events-none absolute left-6 bottom-6 md:left-10 md:bottom-10 z-10">
          <StaggeredText delay={0.05} k={`bignum-${index}`}>
            <span
              className="block font-black leading-none tracking-tighter text-white"
              style={{ fontSize: "clamp(72px, 9vw, 140px)", color: project.bg }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </StaggeredText>
        </div>
      </div>

      {/* Text rail */}
      <div className="relative z-10 flex items-end px-6 pb-32 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[420px]">
          <StaggeredText delay={0.15} k={`meta-${index}`}>
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-white/60"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span style={{ color: project.bg }}>{String(index + 1).padStart(2, "0")}</span>
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
