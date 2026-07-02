import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img01 from "@/assets/mu-01.webp";
import img02 from "@/assets/mu-02.webp";
import img04 from "@/assets/mu-04.webp";
import img05 from "@/assets/mu-05.webp";
import img06 from "@/assets/mu-06.webp";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.7, 0, 0.2, 1] as const;
const SLIDE_DURATION = 0.95;

type Item = {
  id: string;
  number: string;
  category: string;
  term: string;
  title: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
};

const ITEMS: Item[] = [
  {
    id: "d2c",
    number: "N°01",
    category: "D2C · Term 1",
    term: "12 weeks",
    title: "Launch a live e-commerce brand from day one.",
    role: "Sourcing · Ads · Funnel · Fulfilment",
    description:
      "Every student ships a real D2C store — sourced, marketed and fulfilled end-to-end. You're graded on revenue booked, not slides pitched.",
    image: img01,
    tags: ["₹2 Cr+ revenue", "Day 15 first sale", "Zero inventory"],
  },
  {
    id: "creator",
    number: "N°02",
    category: "Creator · Term 2",
    term: "12 weeks",
    title: "Build a real audience. Land real brand deals.",
    role: "YouTube · Instagram · LinkedIn",
    description:
      "Grow a channel from zero. Winners cash monetised partnerships on stage — every metric is public, every deal is real money.",
    image: img02,
    tags: ["50M+ reach", "₹1.2 Cr deals", "3 tracks"],
  },
  {
    id: "vip",
    number: "N°03",
    category: "Ventures · Term 4",
    term: "12 weeks",
    title: "Ship the capstone venture. Pitch to investors.",
    role: "Zero-to-one build",
    description:
      "Founders, cheque-writers and operators sit on your kill-committee. Nothing is theatre — Demo Day is a live investor pitch, not a class review.",
    image: img04,
    tags: ["200+ startups", "₹60 Cr+ funding", "Demo Day"],
  },
  {
    id: "bharat",
    number: "N°04",
    category: "Bharat Immersions · Off-Campus",
    term: "Year-round",
    title: "Study business at real factories, HQs and India's biggest showrooms.",
    role: "PhysicsWallah · Cars24 · boAt · Uber · Fashion HQs",
    description:
      "Spend weeks off-campus inside India's most celebrated establishments — unicorn HQs, factory floors, D2C fashion showrooms and wholesale markets. Live consulting projects with Microsoft, Cars24, boAt and Uber replace the case-study binder.",
    image: img05,
    tags: ["Unicorn HQs", "Factory floors", "Live consulting"],
  },
  {
    id: "global",
    number: "N°05",
    category: "Global Immersions · Term 4",
    term: "2 weeks",
    title: "Learn from Stanford, Wharton and Harvard faculty — in-market.",
    role: "Ivy League faculty · Fortune 500 boardrooms",
    description:
      "An international module co-taught by Stanford, Wharton and Harvard professors alongside CXOs from Bain, BCG and McKinsey. Sessions inside Fortune 500 boardrooms and campus visits to the world's top B-schools — not sight-seeing.",
    image: img06,
    tags: ["Stanford · Wharton · Harvard", "Fortune 500 hosts", "Ivy faculty"],
  },

];

export default function SignatureCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lastIndexRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (ITEMS.length - 1) * 1.1}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(
            ITEMS.length - 1,
            Math.round(self.progress * (ITEMS.length - 1)),
          );
          if (i !== lastIndexRef.current) {
            setDirection(i > lastIndexRef.current ? 1 : -1);
            lastIndexRef.current = i;
            setIndex(i);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jump = (i: number) => {
    const st = ScrollTrigger.getAll().find((s) => s.trigger === sectionRef.current);
    if (!st) return;
    const p = i / (ITEMS.length - 1);
    const y = st.start + (st.end - st.start) * p;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const project = ITEMS[index];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Counter top-left */}
      <div className="pointer-events-none absolute left-6 top-6 z-30 font-mono text-[12px] tracking-[0.15em] text-white/60 md:left-10">
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
        <span className="text-white/30">
          {String(ITEMS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Eyebrow top-center */}
      <div className="pointer-events-none absolute left-0 right-0 top-6 z-30 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
          Signature learning experiences
        </p>
      </div>

      <h2 className="sr-only">Signature learning experiences</h2>

      {/* Slide stack */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <Slide
          key={project.id}
          project={project}
          direction={direction}
          index={index}
        />
      </AnimatePresence>

      {/* Hint + progress bars bottom-center */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-5 px-6">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/60">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
          <span>Scroll</span>
          <span className="text-white/25">·</span>
          <span>Drag</span>
          <span className="text-white/25">·</span>
          <span>Arrows ← →</span>
        </div>
        <div className="flex items-center gap-2">
          {ITEMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => jump(i)}
              aria-label={`Go to experience ${i + 1}`}
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
    </section>
  );
}

function Slide({
  project,
  direction,
  index,
}: {
  project: Item;
  direction: 1 | -1;
  index: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_460px]"
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
          initial={{
            clipPath:
              direction === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
          }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath:
              direction === 1 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            transition: { duration: SLIDE_DURATION * 0.85, ease: EASE },
          }}
          transition={{ duration: SLIDE_DURATION, ease: EASE }}
          className="absolute inset-0"
        >
          <motion.img
            src={project.image}
            alt={project.title}
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
      </div>

      {/* Text rail */}
      <div className="relative z-10 flex items-end px-6 pb-32 md:items-center md:px-12 md:pb-0">
        <div className="max-w-[420px]">
          <StaggeredText delay={0.15} key={`meta-${index}`}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
              {project.number}
              <span className="mx-2 text-white/25">·</span>
              {project.category}
              <span className="mx-2 text-white/25">·</span>
              {project.term}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.25} key={`title-${index}`}>
            <h3
              className="mt-5 font-display font-normal text-white"
              style={{
                fontSize: "clamp(32px, 4.2vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>
          </StaggeredText>

          <StaggeredText delay={0.38} key={`role-${index}`}>
            <p className="mt-4 font-display italic text-[15px] text-white/70">
              {project.role}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.46} key={`desc-${index}`}>
            <p
              className="mt-6 text-[13.5px] text-white/75"
              style={{ lineHeight: 1.7 }}
            >
              {project.description}
            </p>
          </StaggeredText>

          <StaggeredText delay={0.56} key={`tags-${index}`}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="border border-white/20 px-3 py-1 text-[10.5px] uppercase tracking-[0.15em] text-white/70"
                >
                  {t}
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
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{
        y: -14,
        opacity: 0,
        filter: "blur(6px)",
        transition: { duration: 0.45 },
      }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
