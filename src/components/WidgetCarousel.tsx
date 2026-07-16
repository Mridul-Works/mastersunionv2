import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import lexis from "@/assets/startup-logos/Lexis.png.asset.json";
import eatAtlas from "@/assets/startup-logos/EatAtlas.png.asset.json";
import flourish from "@/assets/startup-logos/FlourishFoods.png.asset.json";
import beyondVeda from "@/assets/startup-logos/BeyondVeda.png.asset.json";
import blueBrew from "@/assets/startup-logos/BlueBrew.png.asset.json";
import bambaii from "@/assets/startup-logos/Bambaii.png.asset.json";
import fnor from "@/assets/startup-logos/FNOR.png.asset.json";
import kaze from "@/assets/startup-logos/Kaze.png.asset.json";
import moms from "@/assets/startup-logos/Moms.png.asset.json";
import monarque from "@/assets/startup-logos/Monarque.png.asset.json";
import nivara from "@/assets/startup-logos/Nivara.png.asset.json";
import yango from "@/assets/startup-logos/Yango.png.asset.json";
import woodys from "@/assets/startup-logos/WoodysPizzeria.png.asset.json";
import imperial from "@/assets/immersions/campuses/imperial.png.asset.json";
import bocconi from "@/assets/immersions/campuses/sda-bocconi.png.asset.json";
import babson from "@/assets/immersions/campuses/babson.png.asset.json";
import ivey from "@/assets/immersions/campuses/ivey.png.asset.json";
import rbi from "@/assets/immersions/bharat/rbi.png.asset.json";
import zepto from "@/assets/immersions/bharat/zepto.png.asset.json";
import cred from "@/assets/immersions/bharat/cred.png.asset.json";
import zerodha from "@/assets/immersions/bharat/zerodha.png.asset.json";
import porsche from "@/assets/immersions/global/porsche.png.asset.json";
import rakuten from "@/assets/immersions/global/rakuten.png.asset.json";
import disneyland from "@/assets/immersions/global/disneyland.png.asset.json";
import heineken from "@/assets/immersions/global/heineken.png.asset.json";
import widgetImmersions from "@/assets/widget/widget-immersions.jpg";
import widgetFounders from "@/assets/widget/widget-founders.jpg";
import widgetD2C from "@/assets/widget/widget-d2c.jpg";
import widgetCreators from "@/assets/widget/widget-creators.jpg";

type SlideLogo = { src: string; alt: string };
type SlideStat = { value: string; label: string };

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
  stats?: SlideStat[];
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
    image: widgetImmersions,
    accent: "#F5E9C8",
    href: "/immersions",
    logos: [
      { src: imperial.url, alt: "Imperial College" },
      { src: bocconi.url, alt: "SDA Bocconi" },
      { src: babson.url, alt: "Babson" },
      { src: ivey.url, alt: "Ivey" },
      { src: porsche.url, alt: "Porsche" },
      { src: rakuten.url, alt: "Rakuten" },
      { src: disneyland.url, alt: "Disneyland" },
      { src: rbi.url, alt: "RBI" },
    ],
  },
  {
    id: "entrepreneurship",
    number: "02",
    kicker: "Entrepreneurship",
    category: "Portfolio",
    tags: ["30+ Startups", "₹593 Cr"],
    title: "Founders",
    description:
      "Student-led ventures backed from day one — from dorm-room prototypes to Shark Tank India pitches. The portfolio grows while the coursework runs.",
    image: widgetFounders,
    accent: "#D6DEFB",
    href: "/startups",
    stats: [
      { value: "30+", label: "Student startups" },
      { value: "₹593 Cr", label: "Total valuation" },
      { value: "6", label: "Shark Tank pitches" },
      { value: "Day 1", label: "Portfolio begins" },
    ],
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
    image: widgetD2C,
    accent: "#F7D6C9",
    href: "/d2c-challenge",
    logos: [
      { src: lexis.url, alt: "Lexi's Gourmet Sandwiches" },
      { src: eatAtlas.url, alt: "Eat Atlas" },
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
      "A live on-campus creator bootcamp where students build audiences, land brand deals, and monetise while enrolled — culminating in a ₹10L+ prize showdown.",
    image: widgetCreators,
    accent: "#CDE7DA",
    href: "/creator-challenge",
    stats: [
      { value: "46M+", label: "Total reach" },
      { value: "5M+", label: "Followers built" },
      { value: "120+", label: "Student creators" },
      { value: "₹10L+", label: "Prize pool" },
    ],
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
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
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
                  <div
                    className="h-full w-full"
                    style={{ backgroundColor: current.accent }}
                    aria-label={current.title}
                  >
                    <img
                      src={current.image}
                      alt={current.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />

                </motion.div>

              </AnimatePresence>
            </div>


            {/* Next preview strip (image only) */}
            <div className="relative hidden overflow-hidden bg-black md:block md:h-[520px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={next.id + "-preview"}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 h-full w-full"
                  style={{ backgroundColor: next.accent }}
                  aria-label={next.title}
                >
                  <img
                    src={next.image}
                    alt={next.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_320px]">
            <div className="relative flex flex-col gap-6 bg-black px-6 py-8 text-white md:flex-row md:items-stretch md:gap-6 md:px-8 md:py-10 md:min-h-[320px] min-w-0">
              {/* Left: number + category */}
              <div className="relative h-16 min-w-[140px] shrink-0 overflow-hidden md:h-20">
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
              <div className="relative min-h-[80px] min-w-0 flex-1 overflow-hidden md:max-w-[360px]">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={current.id + "-d"}
                    custom={dir}
                    initial={{ y: dir === 1 ? 24 : -24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: dir === 1 ? -24 : 24, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="w-full"
                  >
                    <p className="text-sm leading-relaxed text-white/70">
                      {current.description}
                    </p>
                    {current.logos && current.logos.length > 0 && (
                      <div className="mt-5">
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                          {current.id === "immersions" ? "Campuses & hosts" : "Brands born here"}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                          {current.logos.map((logo) => (
                            <div
                              key={logo.alt}
                              className="flex h-7 w-16 shrink-0 items-center justify-center"
                            >
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                className="max-h-full max-w-full object-contain opacity-80 brightness-0 invert"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {(!current.logos || current.logos.length === 0) && current.stats && current.stats.length > 0 && (
                      <div className="mt-5">
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                          By the numbers
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                          {current.stats.map((s) => (
                            <div key={s.label} className="flex flex-col">
                              <div className="text-lg font-semibold tracking-tight text-white md:text-xl">
                                {s.value}
                              </div>
                              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>


              {/* Actions */}
              <div className="flex shrink-0 flex-col justify-between gap-6 md:ml-auto md:items-end md:w-[160px] md:self-stretch">
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
              className="group relative flex items-start justify-between overflow-hidden px-6 py-8 text-left text-black md:px-8 md:py-10"
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/60">
                    Next up
                  </span>
                  <div className="mt-3 font-mono text-3xl font-semibold tabular-nums md:text-4xl">
                    {next.number}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-black/60">
                    {next.category}
                  </div>
                  <div
                    className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {next.title}
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-black/60">
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
