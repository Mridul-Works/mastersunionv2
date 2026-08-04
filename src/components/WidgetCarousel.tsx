import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import widgetCampusLifeAsset from "@/assets/widget/widget-campus-life.jpg.asset.json";
import widgetAccommodation from "@/assets/widget/widget-accommodation.jpg";
import widgetClubsFestsAsset from "@/assets/widget/widget-clubs-fests.jpg.asset.json";
const widgetCampusLife = widgetCampusLifeAsset.url;
const widgetClubsFests = widgetClubsFestsAsset.url;


type Slide = {
  id: string;
  number: string;
  chapter: string;
  time: string;
  title: string;
  titleItalic?: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
};

const SLIDES: Slide[] = [
  {
    id: "campus",
    number: "01",
    chapter: "Campus Life",
    time: "Gurugram · On-campus",
    title: "A campus built like",
    titleItalic: "a working city.",
    role: "Classrooms · Auditorium · Food court · Studios · Labs",
    description:
      "Set in the heart of Gurugram's business district, the MU campus is a compact, working city. Classrooms wired with real-time tech, an auditorium that hosts founders and CEOs every week, a food court that runs into late-night jam sessions, and Starbucks, KFC, Cafe Delhi Heights and Bikanervala on campus itself. The airport is 7.8 km away and Cyber City is a 750m walk.",
    tags: ["Cyber City · 750m", "Airport · 7.8 km", "On-campus F&B", "Gym & clinic on site"],
    image: widgetCampusLife,
  },
  {
    id: "accommodation",
    number: "02",
    chapter: "Student Accommodation",
    time: "On-campus · 24/7",
    title: "Live where the",
    titleItalic: "campus never sleeps.",
    role: "On-campus residences · Centralised AC · Fully managed",
    description:
      "MU hostels sit steps from the classrooms — so a 2AM whiteboard session or a pre-dawn founder call is just a walk down the corridor. Rooms come with a personal study nook, centralised AC, ample storage and a tech-savvy setup. Community hubs, social areas, multi-purpose rooms, spacious parking, modern infrastructure, and round-the-clock staff and security keep the day moving without friction.",
    tags: ["Centralised AC rooms", "Community hubs", "24/7 staff & security", "Managed housekeeping"],
    image: widgetAccommodation,
  },
  {
    id: "activities",
    number: "03",
    chapter: "Clubs & Activities",
    time: "20+ Clubs · Year-round fests",
    title: "Clubs, fests,",
    titleItalic: "and studio nights.",
    role: "20+ student-run clubs · Annual fests · Sports leagues · Content studio",
    description:
      "The second campus runs on 20+ student-led clubs — Investment, Consulting, Product & Design, Marketing, Debate, Model UN, Sports, Music and more — each backed by a faculty mentor and shipping something every week. The calendar is stacked with the annual cultural fest, sports leagues, hackathons, pitch nights, and open-mic sessions in the content studio.",
    tags: ["20+ Clubs", "Annual fest", "Sports leagues", "Hackathons & open mics"],
    image: widgetClubsFests,
  },
];


const EASE = [0.7, 0, 0.2, 1] as const;
const SLIDE_DURATION = 0.9;
const COOLDOWN = 900;

export default function WidgetCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      if (lockRef.current) return;
      const clamped = (next + SLIDES.length) % SLIDES.length;
      if (clamped === index) return;
      lockRef.current = true;
      setDirection(dir);
      setIndex(clamped);
      window.setTimeout(() => {
        lockRef.current = false;
      }, COOLDOWN);
    },
    [index],
  );

  // Arrow keys when section is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowRight") go(index + 1, 1);
      else if (e.key === "ArrowLeft") go(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  // Touch drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let active = false;
    const onStart = (e: TouchEvent) => {
      active = true;
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (!active) return;
      active = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) go(index + 1, 1);
      else go(index - 1, -1);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [index, go]);

  const slide = SLIDES[index];

  return (
    <section
      id="student-life"
      className="relative w-full bg-[#0A0A0A] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ============ Pre-slider intro ============ */}
      <div className="mx-auto max-w-[1280px] px-5 pt-10 md:px-10 md:pt-14">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
              — Student Life
            </p>
            <h2
              className="mt-5 text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              A day at Masters' Union{" "}
              <span
                className="italic font-light text-white/90"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                can rather be unusual.
              </span>
            </h2>
          </div>
          <div className="md:pl-10">
            <p className="text-[15px] leading-[1.75] text-white/65">
              CEOs before coffee. A content studio between classes. A kitchen, a
              fund and a whiteboard war on the same floor. The timetable is a
              suggestion — the real curriculum is what happens between it.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/life-at-mu"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-white/90"
              >
                Explore life at MU
                <span className="flex size-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============ Slider ============ */}
      <div
        ref={containerRef}
        className="relative mt-8 h-[640px] w-full overflow-hidden md:h-[720px]"
      >
        {/* Counter */}
        <div className="pointer-events-none absolute left-5 top-6 z-30 font-mono text-[12px] tracking-[0.18em] text-white/55 md:left-10">
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
          <span className="mx-1 text-white/25">/</span>
          <span className="text-white/25">
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Eyebrow top-center */}
        <div className="pointer-events-none absolute inset-x-0 top-6 z-30 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            {slide.chapter} · {slide.time}
          </p>
        </div>

        <AnimatePresence mode="popLayout" custom={direction}>
          <Slide key={slide.id} slide={slide} direction={direction} index={index} />
        </AnimatePresence>

        {/* Bottom hint + progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-2">

            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to ${s.chapter}`}
                className="pointer-events-auto group h-[2px] w-10 cursor-pointer overflow-hidden bg-white/15"
              >
                <span
                  className="block h-full origin-left bg-white transition-transform duration-[700ms] ease-out"
                  style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={() => go(index - 1, -1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur transition hover:bg-white hover:text-black md:flex"
        >
          <span className="text-xl leading-none">←</span>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1, 1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur transition hover:bg-white hover:text-black md:flex"
        >
          <span className="text-xl leading-none">→</span>
        </button>
      </div>
    </section>
  );
}

function Slide({
  slide,
  direction,
  index,
}: {
  slide: Slide;
  direction: 1 | -1;
  index: number;
}) {
  return (
    <motion.section
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_600px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image side */}
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          key={slide.image}
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
            src={slide.image}
            alt={slide.title}
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
                "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 60%, rgba(10,10,10,0.9) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 25%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.95) 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* Text rail */}
      <div className="relative z-10 flex items-end px-6 pb-14 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[560px]">
          <StaggeredText delay={0.15} k={`meta-${index}`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
              {slide.number}
              <span className="mx-2 text-white/25">·</span>
              {slide.chapter}
              <span className="mx-2 text-white/25">·</span>
              {slide.time}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.25} k={`title-${index}`}>
            <h3
              className="mt-5 font-normal text-white"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "clamp(32px, 4.2vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
              }}
            >
              {slide.title}{" "}
              {slide.titleItalic && (
                <span
                  className="italic font-light text-white/85"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {slide.titleItalic}
                </span>
              )}
            </h3>
          </StaggeredText>

          <StaggeredText delay={0.38} k={`role-${index}`}>
            <p
              className="mt-4 italic text-[15px] text-white/60"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {slide.role}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.46} k={`desc-${index}`}>
            <p
              className="mt-6 text-[13.5px] text-white/75"
              style={{ lineHeight: 1.75 }}
            >
              {slide.description}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.56} k={`tags-${index}`}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {slide.tags.map((t) => (
                <li
                  key={t}
                  className="border border-white/15 px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/70"
                >
                  {t}
                </li>
              ))}
            </ul>
          </StaggeredText>

          <StaggeredText delay={0.66} k={`cta-${index}`}>
            <Link
              to="/life-at-mu"
              className="group mt-8 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-white"
            >
              <span className="relative">
                See life at Masters' Union
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-white transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </StaggeredText>
        </div>
      </div>
    </motion.section>
  );
}

function StaggeredText({
  children,
  delay = 0,
  k,
}: {
  children: React.ReactNode;
  delay?: number;
  k: string;
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
