import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import lexis from "@/assets/startup-logos/Lexis.png.asset.json";
import eatAtlas from "@/assets/startup-logos/EatAtlas.png.asset.json";
import woodys from "@/assets/startup-logos/WoodysPizzeria.png.asset.json";
import flourish from "@/assets/startup-logos/FlourishFoods.png.asset.json";
import beyondVeda from "@/assets/startup-logos/BeyondVeda.png.asset.json";
import blueBrew from "@/assets/startup-logos/BlueBrew.png.asset.json";

type SlideLogo = { src: string; alt: string };

type Slide = {
  id: string;
  number: string;
  kicker: string;
  category: string;
  tags: string[];
  title: string;
  description: string;
  image: string;
  accent: string;
  href: string;
  logos?: SlideLogo[];
};


const SLIDES: Slide[] = [
  {
    id: "immersions",
    number: "01",
    kicker: "Immersions",
    category: "Bharat & Global",
    tags: ["5 Formats", "20+ Cities"],
    title: "Immersions",
    description:
      "From factory floors to startup offices — Dabbawalas to Disneyland, RBI to Rakuten. 5 formats, 20+ cities, real companies. Classrooms wherever the business actually happens.",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=80",
    accent: "#B58900",
    href: "/immersions",
  },
  {
    id: "entrepreneurship",
    number: "02",
    kicker: "Entrepreneurship",
    category: "Portfolio",
    tags: ["30+ Startups", "₹593 Cr"],
    title: "Founders",
    description:
      "30+ student startups. ₹593 Cr in total valuation. Six appearances on Shark Tank India — including a first-year undergrad. The portfolio starts on day one.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    accent: "#1E3AE2",
    href: "/startups",
  },
  {
    id: "d2c",
    number: "03",
    kicker: "D2C Challenge",
    category: "Term 1",
    tags: ["₹3.38 Cr Revenue", "50 Teams"],
    title: "D2C",
    description:
      "₹3.38 Cr revenue. 50 teams. One semester. Real suppliers, real customers, real money. Term 1 is a live dropshipping business, not a case study.",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1600&q=80",
    accent: "#E2431E",
    href: "/d2c-challenge",
    logos: [
      { src: lexis.url, alt: "Lexi's Gourmet Sandwiches" },
      { src: eatAtlas.url, alt: "Eat Atlas" },
      { src: woodys.url, alt: "Woody's Pizzeria" },
      { src: flourish.url, alt: "Flourish Foods" },
      { src: beyondVeda.url, alt: "Beyond Veda" },
      { src: blueBrew.url, alt: "Blue Brew" },
    ],
  },

  {
    id: "creator",
    number: "04",
    kicker: "Creator Challenge",
    category: "On-Campus",
    tags: ["46M+ Reach", "5M+ Followers"],
    title: "Creators",
    description:
      "46M+ reach. 5M+ followers. 120+ creators. ₹10L+ prize pool. Real brand deals, real revenue — all while enrolled.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    accent: "#0F7A4A",
    href: "/creator-challenge",
  },
];

const AUTOPLAY_MS = 6000;

export default function WidgetCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const total = SLIDES.length;
  const current = SLIDES[index];
  const next = SLIDES[(index + 1) % total];

  const go = (delta: 1 | -1) => {
    setDir(delta);
    setIndex((i) => (i + delta + total) % total);
  };

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  return (
    <section
      className="relative w-full bg-[#EDEDED] py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Section eyebrow */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">
              — A closer look
            </p>
            <h2
              className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Inside{" "}
              <span
                className="italic font-light"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Masters' Union
              </span>
            </h2>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-white"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Carousel frame */}
        <div className="relative overflow-hidden bg-[#D9D9D9]">
          {/* Image row */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_320px]">
            {/* Main image + title */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black md:aspect-auto md:h-[520px]">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={current.id}
                  custom={dir}
                  initial={{ x: dir === 1 ? "100%" : "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: dir === 1 ? "-100%" : "100%" }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
                  {/* Big title */}
                  <div className="absolute inset-0 flex items-center px-6 md:px-14">
                    <motion.h3
                      key={current.id + "-t"}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-[64px] font-semibold leading-[0.9] tracking-[-0.03em] text-white md:text-[120px] lg:text-[150px]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {current.title}
                    </motion.h3>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next preview strip (image only) */}
            <div className="relative hidden overflow-hidden bg-black md:block md:h-[520px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={next.id + "-preview"}
                  src={next.image}
                  alt={next.title}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_320px]">
            <div className="relative flex flex-col gap-6 bg-black px-6 py-8 text-white md:flex-row md:items-start md:gap-10 md:px-10 md:py-10">
              {/* Left: number + category */}
              <div className="relative h-16 min-w-[160px] overflow-hidden md:h-20">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={current.id + "-num"}
                    custom={dir}
                    initial={{ y: dir === 1 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: dir === 1 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="font-mono text-3xl font-semibold tabular-nums md:text-4xl">
                      {current.number}
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-tight">
                      {current.kicker}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
                      {current.tags.join(" · ")}
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description */}
              <div className="relative min-h-[80px] flex-1 overflow-hidden">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.p
                    key={current.id + "-d"}
                    custom={dir}
                    initial={{ y: dir === 1 ? 24 : -24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: dir === 1 ? -24 : 24, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="max-w-md text-sm leading-relaxed text-white/70"
                  >
                    {current.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-between gap-6 md:items-end">
                <Link
                  to={current.href}
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Learn more
                  <span className="flex size-6 items-center justify-center rounded-full bg-white text-black">
                    <ArrowRight className="size-3" />
                  </span>
                </Link>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
                  >
                    Share <Share2 className="size-3" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous"
                      className="flex size-8 items-center justify-center rounded-sm border border-white/20 text-white/70 hover:bg-white hover:text-black"
                    >
                      <ArrowLeft className="size-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next"
                      className="flex size-8 items-center justify-center rounded-sm border border-white/20 text-white/70 hover:bg-white hover:text-black"
                    >
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next up panel */}
            <button
              type="button"
              onClick={() => go(1)}
              className="group relative flex items-start justify-between overflow-hidden px-6 py-8 text-left text-white md:px-8 md:py-10"
              style={{ backgroundColor: next.accent }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={next.id + "-nu"}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="flex flex-1 flex-col"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                    Next up
                  </span>
                  <div className="mt-3 font-mono text-3xl font-semibold tabular-nums md:text-4xl">
                    {next.number}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                    {next.category}
                  </div>
                  <div
                    className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {next.title}
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                    {next.tags.join(" · ")}
                  </div>

                </motion.div>
              </AnimatePresence>
              <span className="ml-4 mt-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
            <motion.div
              key={index + (paused ? "-p" : "-r")}
              initial={{ width: "0%" }}
              animate={{ width: paused ? "0%" : "100%" }}
              transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
              className="h-full bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
