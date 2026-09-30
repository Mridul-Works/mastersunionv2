import { Fragment, useEffect, useLayoutEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Compass,
  Download,
  Flag,
  Flame,
  GraduationCap,
  Home,
  Image as ImageIcon,
  Instagram,
  LayoutGrid,
  Lightbulb,
  Linkedin,
  Play,
  Rocket,
  ShoppingBag,
  Trophy,
  Tv,
  Users,
  X,
  type LucideIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import eightVentureImg from "@/assets/founders/ventures/eight.jpg.asset.json";
import bullspreeVentureImg from "@/assets/founders/ventures/bullspree.jpg.asset.json";
import hiveschoolVentureImg from "@/assets/founders/ventures/hiveschool.jpg.asset.json";
import lexisVentureImg from "@/assets/founders/ventures/lexis.jpg.asset.json";
import playsuperVentureImg from "@/assets/founders/ventures/playsuper.jpg.asset.json";
import seedsaiVentureImg from "@/assets/founders/ventures/seedsai.jpg.asset.json";
import woodysVentureImg from "@/assets/founders/ventures/woodys.jpg.asset.json";
import sharkTankStageImg from "@/assets/founders/sharktank-stage.jpg.asset.json";
import sharkPhoto_bullspree from "@/assets/sharktank/bullspree.webp.asset.json";
import sharkPhoto_hiveschool from "@/assets/sharktank/hiveschool.webp.asset.json";
import sharkPhoto_memotag from "@/assets/sharktank/memotag.webp.asset.json";
import sharkPhoto_nexera from "@/assets/sharktank/nexera.webp.asset.json";
import sharkPhoto_hookd from "@/assets/sharktank/hookd.webp.asset.json";
import sharkPhoto_metafashion from "@/assets/sharktank/metafashion.webp.asset.json";
import muLogoAsset from "@/assets/mu-logo-dark.png.asset.json";
import foundersVideo from "@/assets/hero-3.mp4.asset.json";
import foundersVideoWebm from "@/assets/hero-3.webm.asset.json";
import entrepreneurshipReport2021 from "@/assets/entrepreneurship-report-2021-25.pdf.asset.json";
import entrepreneurshipReportUg from "@/assets/entrepreneurship-report-ug-programmes.pdf.asset.json";
import studentEntrepreneurshipVideo from "@/assets/MU_Student_Entreprenuership_Video-2.mp4.asset.json";
import bsHighlightVideo from "@/assets/bs-highlight.mp4";
import bsHighlightVideoWebm from "@/assets/bs-highlight.webm";
import instaVideo1 from "@/assets/insta-video-1.mp4.asset.json";
import instaVideo1Poster from "@/assets/insta-video-1-frame.jpg.asset.json";
import instaVideo2 from "@/assets/insta-video-2.mp4.asset.json";
import instaVideo2Poster from "@/assets/insta-video-2-frame.jpg.asset.json";
import instaVideo3 from "@/assets/insta-video-3.mp4.asset.json";
import instaVideo3Poster from "@/assets/insta-video-3-frame.jpg.asset.json";
import instaVideo4 from "@/assets/insta-video-4.mp4.asset.json";
import instaVideo4Poster from "@/assets/insta-video-4-frame.jpg.asset.json";
import instaVideo5 from "@/assets/insta-video-5.mp4.asset.json";
import dsThumb1 from "@/assets/ds-thumb-1.webp.asset.json";
import dsThumb2 from "@/assets/ds-thumb-2.webp.asset.json";
import dsThumb3 from "@/assets/ds-thumb-3.webp.asset.json";
import dsThumb4 from "@/assets/ds-thumb-4.webp.asset.json";
import dsThumb5 from "@/assets/ds-thumb-5.webp.asset.json";
import instaVideo5Poster from "@/assets/insta-video-5-frame.jpg.asset.json";
import hsslReel1 from "@/assets/hssl-reel-1.mp4.asset.json";
import hsslReel1Poster from "@/assets/hssl-thumbnail-1.webp.asset.json";
import hsslReel2 from "@/assets/hssl-reel-2.mp4.asset.json";
import hsslReel2Poster from "@/assets/hssl-thumbnail-2.webp.asset.json";
import hsslReel3 from "@/assets/hssl-reel-3.mp4.asset.json";
import hsslReel3Poster from "@/assets/hssl-thumbnail-3.webp.asset.json";
import sparkVideoThumb from "@/assets/spark-video-thumb.jpg";

import muifBanner from "@/assets/muif/banner.webp.asset.json";
import muifBannerMob from "@/assets/muif/banner-mob.webp.asset.json";
import muifPerf from "@/assets/muif/perf.webp.asset.json";
import muifArchit from "@/assets/muif/t-Archit.webp.asset.json";
import muifMehul from "@/assets/muif/t-mehulJain.webp.asset.json";
import muifAnkit from "@/assets/muif/t-AnkitSharma.webp.asset.json";
import muifVedant from "@/assets/muif/t-vedant.webp.asset.json";
import muifKautak from "@/assets/muif/t-kautak.webp.asset.json";
import muifDevansh from "@/assets/muif/t-Devansh.webp.asset.json";
import muifNankie from "@/assets/muif/t-nankie.webp.asset.json";
import muifPradyuman from "@/assets/muif/t-pradyuman.webp.asset.json";
import muifIshaan from "@/assets/muif/t-Ishaan.webp.asset.json";
import muifHarsh from "@/assets/muif/t-HarshYadav.webp.asset.json";



import sparkSeedsAiFounders from "@/assets/spark/seedsai-founders.jpg.asset.json";
import sparkEightFounders from "@/assets/spark/eight-founders.jpg.asset.json";
import ventureBlueBrew from "@/assets/venture-logos/BlueBrew.png.asset.json";
import ventureEatAtlas from "@/assets/venture-logos/EatAtlas.png.asset.json";
import ventureFlourish from "@/assets/venture-logos/FlourishFoods.png.asset.json";
import ventureMoms from "@/assets/venture-logos/Moms.png.asset.json";
import ventureWoodys from "@/assets/venture-logos/WoodysPizzeria.png.asset.json";
import ventureBeyondVeda from "@/assets/venture-logos/BeyondVeda.png.asset.json";
import ventureSaaha from "@/assets/venture-logos/Saaha.png.asset.json";
import ventureJustMyRoots from "@/assets/venture-logos/JustMyRoots.png.asset.json";
import ventureBanaroma from "@/assets/venture-logos/Banaroma.png.asset.json";
import ventureVinyasa from "@/assets/venture-logos/Vinyasa.png.asset.json";
import ventureBambaii from "@/assets/venture-logos/Bambaii.png.asset.json";
import ventureKaze from "@/assets/venture-logos/Kaze.png.asset.json";
import ventureLexis from "@/assets/venture-logos/Lexis.png.asset.json";
import ventureMonarque from "@/assets/venture-logos/Monarque.png.asset.json";
import ventureNivara from "@/assets/venture-logos/Nivara.png.asset.json";
import ventureFnor from "@/assets/venture-logos/FNOR.png.asset.json";
import ventureEightLogo from "@/assets/venture-logos/EIGHT.png.asset.json";
import ventureBullspreeLogo from "@/assets/venture-logos/Bullspree.png.asset.json";
import ventureHiveschoolLogo from "@/assets/venture-logos/Hiveschool.png.asset.json";
import venturePlaysuperLogo from "@/assets/venture-logos/Playsuper.png.asset.json";
import ventureSeedsAILogo from "@/assets/venture-logos/SeedsAI.png.asset.json";
import ventureGuardexLogo from "@/assets/venture-logos/Guardex.png.asset.json";
import sharkNexeraLogo from "@/assets/sharktank/NexeraHealth.png.asset.json";
import sharkHookDLogo from "@/assets/sharktank/HookD.png.asset.json";
import sharkMemoTagLogo from "@/assets/sharktank/MemoTag.png.asset.json";
import sharkMetaFashionLogo from "@/assets/sharktank/MetaFashion.png.asset.json";
import sharkBullspreeLogo from "@/assets/sharktank/Bullspree.png.asset.json";
import sharkHiveSchoolLogo from "@/assets/sharktank/HiveSchool.png.asset.json";
import brandPhotoEight from "@/assets/founders/brand/eight.jpg";
import brandPhotoBullspree from "@/assets/founders/brand/bullspree.jpg";
import brandPhotoHiveschool from "@/assets/founders/brand/hiveschool.jpg";
import brandPhotoMemotag from "@/assets/founders/brand/memotag.jpg";
import brandPhotoMetafashion from "@/assets/founders/brand/metafashion.jpg";
import brandPhotoPlaysuper from "@/assets/founders/brand/playsuper.jpg";
import zenmoFounders from "@/assets/founders/zenmo-founders.webp.asset.json";
import liveBullspree from "@/assets/live-venture-founders/bullspree.webp.asset.json";
import livePlaySuper from "@/assets/live-venture-founders/playsuper.webp.asset.json";
import liveLexis from "@/assets/live-venture-founders/lexis.webp.asset.json";
import liveWoodys from "@/assets/live-venture-founders/woodys.webp.asset.json";
import liveSeedsAi from "@/assets/live-venture-founders/seedsai.webp.asset.json";
import liveHiveSchool from "@/assets/live-venture-founders/hiveschool.webp.asset.json";
import liveMemoTag from "@/assets/live-venture-founders/memotag.webp.asset.json";
import liveNexeraHealth from "@/assets/live-venture-founders/nexera-health.webp.asset.json";
import liveHookd from "@/assets/live-venture-founders/hookd.webp.asset.json";
import liveMetaFashion from "@/assets/live-venture-founders/meta-fashion.webp.asset.json";
import liveBlueBrew from "@/assets/live-venture-founders/blue-brew.webp.asset.json";
import liveVinyasa from "@/assets/live-venture-founders/vinyasa.webp.asset.json";
import liveBeyondVeda from "@/assets/live-venture-founders/beyond-veda.webp.asset.json";
import { onScrollFrame } from "@/lib/scroll-driver";
import { Button } from "@/components/ui/button";

const NAV: { id: string; label: string }[] = [
  { id: "top", label: "Hero" },
  { id: "journey", label: "Journey" },
  { id: "eight", label: "Stories" },
  { id: "sharktank", label: "Shark Tank" },
  { id: "portfolio", label: "Portfolio" },
];

const VENTURE_IMAGES: Record<string, string> = {
  Eight: eightVentureImg.url,
  Bullspree: bullspreeVentureImg.url,
  HiveSchool: hiveschoolVentureImg.url,
  "Lexi's": lexisVentureImg.url,
  PlaySuper: playsuperVentureImg.url,
  SeedsAI: seedsaiVentureImg.url,
  "Woody's Pizzeria": woodysVentureImg.url,
};

const SPARK_EXAMPLES: {
  name: string;
  founder: string;
  cohort: string;
  product: string;
  body: string;
  founderImage?: string;
  videoId: string;
  videoTitle: string;
}[] = [
  {
    name: "Eight",
    founder: "Mohit Paliwal & co.",
    cohort: "PGP TBM 2021",
    product: "The Stage for Stories",
    body: "Mohit Paliwal, Mohit Goswami, and Yugal Tamang realized at a Masters' Union cafeteria table that not everyone wants to be seen, but everyone has a story worth telling — Eight became the stage for it.",
    founderImage: sparkEightFounders.url,
    videoId: "5pl8XK-KbSA",
    videoTitle: "A Case that a Billion People Couldn't Solve — an Eight original",
  },
  {
    name: "PlaySuper",
    founder: "Shouradeep Chakraborty & co.",
    cohort: "PGP TBM 2024",
    product: "Rewards for Casual Gamers",
    body: "Shouradeep Chakraborty and his co-founders saw India's 438M casual gamers churning out of games that gave nothing back — PlaySuper is the rewards platform that turns loyalty into real-world incentives.",
    founderImage: brandPhotoPlaysuper,
    videoId: "ykiJMKL172c",
    videoTitle: "Building India's First Gaming Commerce Platform — Masters' Union podcast",
  },
  {
    name: "Bullspree",
    founder: "Dharmil Bavishi & co.",
    cohort: "PGP TBM 2021",
    product: "The Stock Market Playground",
    body: "Dharmil Bavishi went from supply-chain analyst to the CEO's office, then asked why learning to invest felt so intimidating — Bullspree turns India's curiosity about markets into financial confidence.",
    founderImage: brandPhotoBullspree,
    videoId: "6CRzYqi5rTQ",
    videoTitle: "Bullspree's full pitch — Shark Tank India Season 2",
  },
  {
    name: "MemoTag",
    founder: "Reyansh Juneja",
    cohort: "UG TBM 2028",
    product: "AI Wearable for Dementia Care",
    body: "Reyansh Juneja started MemoTag while still an undergraduate — an AI-driven wearable purpose-built for dementia care, designed to catch the moments caregivers can't.",
    founderImage: brandPhotoMemotag,
    videoId: "4oJT3mkjJ-U",
    videoTitle: "MemoTag on Shark Tank India Season 4",
  },
  {
    name: "Hive School",
    founder: "Nikhil Gaur",
    cohort: "PGP TBM 2024",
    product: "India's First Sales School",
    body: "Nikhil Gaur built a ₹2 Cr run rate while still a student — Hive School is India's first Sales School, training the next generation of GTM operators companies are desperate to hire.",
    founderImage: brandPhotoHiveschool,
    videoId: "x-aSw4UlJZs",
    videoTitle: "Pitching our vision on Shark Tank — HiveSchool",
  },
  {
    name: "Meta Fashion",
    founder: "Arjun Goel",
    cohort: "UG TBM 2028",
    product: "Phygital Fashion Commerce",
    body: "Arjun Goel is connecting in-game discovery with real-world fashion — Meta Fashion's phygital commerce lets players find a look inside the game and wear it outside it.",
    founderImage: brandPhotoMetafashion,
    videoId: "Yw1xPaAhPM8",
    videoTitle: "Meta Fashion: Roblox meets real-world couture — Shark Tank India Season 5",
  },
  {
    name: "SeedsAI",
    founder: "Shubham Khatri & Vansh Miglani",
    cohort: "PGP TBM 2024",
    product: "AI for NBFC Review",
    body: "Shubham Khatri and Vansh Miglani didn't start with a business plan. They started by shadowing NBFC call-center agents and noticing how much time was wasted on manual review.",
    founderImage: sparkSeedsAiFounders.url,
    videoId: "gHFnxkAvLhs",
    videoTitle: "How to actually raise funds from a VC — Behind Closed Doors, Masters' Union",
  },
];

const SPARK_VENTURE_LOGOS = [
  ventureBlueBrew,
  ventureEatAtlas,
  ventureFlourish,
  ventureMoms,
  ventureWoodys,
  ventureBeyondVeda,
  ventureSaaha,
  ventureJustMyRoots,
  ventureBanaroma,
  ventureVinyasa,
  ventureBambaii,
  ventureKaze,
  ventureLexis,
  ventureMonarque,
  ventureNivara,
  ventureFnor,
];

const DROPSHIPPING_VIDEOS: {
  id: string;
  src?: string;
  yt?: string;
  poster: string;
  aria: string;
}[] = [
  { id: "highlight", src: instaVideo1.url, poster: dsThumb1.url, aria: "Student entrepreneurship film" },
  { id: "ventures", src: instaVideo2.url, poster: dsThumb2.url, aria: "Student ventures film" },
  { id: "campus", src: instaVideo3.url, poster: dsThumb3.url, aria: "Campus film" },
  { id: "hero-info", src: instaVideo4.url, poster: dsThumb4.url, aria: "Student programme film" },
  { id: "hero", src: instaVideo5.url, poster: dsThumb5.url, aria: "Student venture film" },
];

const DROPSHIPPING_STATS = [
  { value: "₹10Cr+", label: "Revenue generated", sub: "By student-run ventures" },
  { value: "500+", label: "Students participated", sub: "Across the challenge" },
  { value: "150+", label: "Businesses built", sub: "From first sale to scale" },
];

const VIP_METRICS = [
  { value: "1.5 Cr+", label: "Grants given by MU" },
  { value: "100+", label: "Startups Incubated" },
  { value: "70+", label: "Students pitched at Demo Days" },
];

/* ============ Founders in the making — mosaic (from the homepage funding board) ============ */

type VentureTile = {
  company: string;
  founder: string;
  photo?: string;
  logo?: { url: string };
  sector: string;
  stage: string;
  raised: string;
  description: string;
  note?: string;
};

const FOUNDER_VENTURES: VentureTile[] = [
  {
    company: "Eight",
    founder: "Yugal Tamang, Mohit Paliwal, Mohit Goswami",
    photo: brandPhotoEight,
    logo: ventureEightLogo,
    sector: "Tech & Media",
    stage: "Venture-backed",
    raised: "₹13Cr+ ARR · 5M+ downloads",
    description: "Audio-to-microdrama storytelling platform.",
  },
  {
    company: "HiveSchool",
    founder: "Nikhil Gaur",
    photo: liveHiveSchool.url,
    sector: "Education / Sales",
    stage: "Shark Tank · Season 4",
    raised: "PGP TBM Co '24",
    description: "Building India's first sales school.",
  },
  {
    company: "Bullspree",
    founder: "Dharmil Bavishi",
    photo: liveBullspree.url,
    logo: ventureBullspreeLogo,
    sector: "Fintech",
    stage: "Seed-funded",
    raised: "₹10Cr revenue · 10L+ users",
    description: "Experiential investing platform for India's retail traders.",
  },
  {
    company: "PlaySuper",
    founder: "Upamanyu Chatterjee, Shouradeep Chakraborty",
    photo: livePlaySuper.url,
    logo: venturePlaysuperLogo,
    sector: "Gaming",
    stage: "Seed-funded",
    raised: "₹83.5Cr valuation · ₹13.4Cr raised",
    description: "Rewards platform helping gaming studios fix retention.",
  },
  {
    company: "Lexi's",
    founder: "Naveen Balaji, Rhea Melwani, Alex Puthusserry, Ayush Melwani",
    photo: liveLexis.url,
    logo: ventureLexis,
    sector: "F&B",
    stage: "Student-founded",
    raised: "₹1.5Cr+ ARR",
    description: "Gurgaon's top-rated gourmet sandwich brand.",
  },
  {
    company: "MemoTag",
    founder: "Reyansh Juneja",
    photo: liveMemoTag.url,
    sector: "AI / Healthtech",
    stage: "Shark Tank · Season 4",
    raised: "UG TBM Co '28",
    description: "An AI-driven wearable for dementia care.",
  },
  {
    company: "Nexera Health",
    founder: "Himanshu Rajpurohit",
    photo: liveNexeraHealth.url,
    sector: "Healthtech",
    stage: "Shark Tank · Season 4",
    raised: "CEO Challenge",
    description: "Redefining workplace wellness for employees.",
  },
  {
    company: "Zenmo",
    founder: "Hritvik Arora",
    photo: zenmoFounders.url,
    sector: "D2C / Fashion",
    stage: "Growth-stage",
    raised: "₹3.5Cr+ revenue",
    description: "An automotive lifestyle brand blending motorsport culture with streetwear.",
  },
  {
    company: "HookD",
    founder: "Dia Goel",
    photo: liveHookd.url,
    sector: "D2C / Food",
    stage: "Shark Tank · Season 5",
    raised: "PGP TBM Co '23",
    description: "Ready-to-eat non-vegetarian snacks built for India's non-veg consumers.",
  },
  {
    company: "Woody's Pizzeria",
    founder: "Kanav Rishi Kumar",
    photo: liveWoodys.url,
    logo: ventureWoodys,
    sector: "F&B",
    stage: "Bootstrapped",
    raised: "₹40L revenue · 3,000+ customers",
    description: "South Delhi's highest-rated vegetarian pizzeria.",
  },
  {
    company: "SeedsAI",
    founder: "Vansh Miglani, Shubham Khatri",
    photo: liveSeedsAi.url,
    logo: ventureSeedsAILogo,
    sector: "AI / Fintech",
    stage: "Revenue-stage",
    raised: "₹60L revenue (FY25)",
    description: "AI voice intelligence for NBFC collections and compliance.",
  },
  {
    company: "Meta Fashion",
    founder: "Arjun Goel",
    photo: liveMetaFashion.url,
    sector: "Fashion / Gaming",
    stage: "Shark Tank · Season 5",
    raised: "UG TBM Co '28",
    description: "Phygital commerce connecting in-game discovery with real-world fashion.",
  },
  {
    company: "Blue Brew",
    founder: "Aditya Rathi",
    photo: liveBlueBrew.url,
    sector: "D2C / Fashion",
    stage: "Founder Fellowship",
    raised: "Founder & CEO",
    description: "Trend-driven, high-quality apparel tailored for Indian consumers.",
  },
  {
    company: "Vinyasa",
    founder: "Divya Shah",
    photo: liveVinyasa.url,
    sector: "Healthtech",
    stage: "Founder Fellowship",
    raised: "Founder & CEO",
    description: "Mental-health practice software that lets therapists focus on clients.",
  },
  {
    company: "Beyond Veda",
    founder: "Manan Sahai",
    photo: liveBeyondVeda.url,
    sector: "D2C / Wellness",
    stage: "Founder Fellowship",
    raised: "Founder & CEO",
    description: "Plant-based, expert-formulated hair and skincare solutions.",
  },
];

type StatTile = {
  kind: "stat";
  value: string;
  delta?: string;
  label: string;
  note: string;
  bg: string;
  fg: string;
  sub: string;
};

type CtaTile = {
  kind: "cta";
  headline: string;
  body: string;
  cta: string;
  to: string;
  bg: string;
  fg: string;
  sub: string;
  border?: string;
};

const BOTTLE_GREEN = "#006A4E";
const MUSTARD = "#F5E7C8";
const INK = "#111111";

const FOUNDER_STATS: StatTile[] = [
  {
    kind: "stat",
    value: "120+",
    delta: "▲ 24 YoY",
    label: "Student startups launched during the programme",
    note: "MU Ventures",
    bg: BOTTLE_GREEN,
    fg: "#FFFFFF",
    sub: "rgba(255,255,255,0.66)",
  },
  {
    kind: "stat",
    value: "₹85 Cr+",
    label: "Raised by alumni in seed & pre-seed rounds",
    note: "Capital raised",
    bg: MUSTARD,
    fg: INK,
    sub: "rgba(17,17,17,0.62)",
  },
  {
    kind: "stat",
    value: "$10M",
    label: "In-house fund deployed via MU Ventures",
    note: "Campus fund",
    bg: INK,
    fg: "#FFFFFF",
    sub: "rgba(255,255,255,0.7)",
  },
  {
    kind: "stat",
    value: "40+",
    label: "Founder mentors — unicorn & YC operators",
    note: "Mentor bench",
    bg: BOTTLE_GREEN,
    fg: "#FFFFFF",
    sub: "rgba(255,255,255,0.66)",
  },
];

const FOUNDER_CTA: CtaTile = {
  kind: "cta",
  headline: "Build here",
  body: "Launch your own venture with campus funding, mentors and founder support.",
  cta: "Apply to Masters' Union",
  to: "#cta",
  bg: "#FFFFFF",
  fg: BOTTLE_GREEN,
  sub: "rgba(0,106,78,0.62)",
  border: "rgba(0,106,78,0.28)",
};

/** Irregular mosaic rhythm — alternating tile heights. */
const MOSAIC_RATIOS = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
];

/** Ventures interleaved with stat tiles (stat after every two ventures), plus a CTA tile. */
const FOUNDER_TILES: Array<VentureTile | StatTile | CtaTile> = (() => {
  const out: Array<VentureTile | StatTile | CtaTile> = [];
  let s = 0;
  FOUNDER_VENTURES.forEach((v, i) => {
    out.push(v);
    if (i % 2 === 1 && s < FOUNDER_STATS.length) out.push(FOUNDER_STATS[s++]);
  });
  while (s < FOUNDER_STATS.length) out.push(FOUNDER_STATS[s++]);
  out.push(FOUNDER_CTA);
  return out;
})();

/** Round-robin the tiles into 5 balanced columns so the grid fills the row exactly. */
const FOUNDER_COLUMNS: Array<Array<{ tile: VentureTile | StatTile | CtaTile; index: number }>> = (() => {
  const cols: Array<Array<{ tile: VentureTile | StatTile | CtaTile; index: number }>> = [[], [], [], [], []];
  FOUNDER_TILES.forEach((tile, index) => {
    cols[index % cols.length].push({ tile, index });
  });
  return cols;
})();

import outclasscreator1 from "@/assets/startups-outclass/creator1.asset.json";
import outclasscreator2 from "@/assets/startups-outclass/creator2.asset.json";
import outclasscreator7 from "@/assets/startups-outclass/creator7.asset.json";
import outclassd2cBrandFair from "@/assets/startups-outclass/d2cBrandFair.asset.json";
import outclassfairCeramics from "@/assets/startups-outclass/fairCeramics.asset.json";
import outclassfairJewels from "@/assets/startups-outclass/fairJewels.asset.json";
import outclassfairNight from "@/assets/startups-outclass/fairNight.asset.json";
import outclassfairCrafts from "@/assets/startups-outclass/fairCrafts.asset.json";
import outclassmelaFounders from "@/assets/startups-outclass/melaFounders.asset.json";
import outclassmelaVideo from "@/assets/startups-outclass/melaVideo.asset.json";
import outclassB_Uh5V4xD4k from "@/assets/startups-outclass/B_Uh5V4xD4k.asset.json";
import outclass0sMWviewwqs from "@/assets/startups-outclass/0sMWviewwqs.asset.json";
import outclassYMfW0nRii3s from "@/assets/startups-outclass/YMfW0nRii3s.asset.json";
import outclassdng2KDh5_LA from "@/assets/startups-outclass/dng2KDh5_LA.asset.json";
import vipPreseedImg from "@/assets/vip/vip-preseed.jpg.asset.json";
import vipMvpImg from "@/assets/vip/vip-mvp.jpg.asset.json";
import vipGtmImg from "@/assets/vip/vip-gtm.jpg.asset.json";
import vipPmfImg from "@/assets/vip/vip-pmf.jpg.asset.json";
import vipDemodayImg from "@/assets/vip/vip-demoday.jpg.asset.json";
import vipProgramVideo from "@/assets/vip-program.mp4.asset.json";
import vipTopStartupDark1 from "@/assets/vip/top-startups/top-startup-dark-1.png.asset.json";
import vipTopStartupDark2 from "@/assets/vip/top-startups/top-startup-dark-2.png.asset.json";
import vipTopStartupDark3 from "@/assets/vip/top-startups/top-startup-dark-3.png.asset.json";
import vipTopStartupDark4 from "@/assets/vip/top-startups/top-startup-dark-4.png.asset.json";
import vipTopStartupDark5 from "@/assets/vip/top-startups/top-startup-dark-5.png.asset.json";
import vipTopStartupDark6 from "@/assets/vip/top-startups/top-startup-dark-6.png.asset.json";
import vipTopStartupDark7 from "@/assets/vip/top-startups/top-startup-dark-7.png.asset.json";
import vipTopStartupDark8 from "@/assets/vip/top-startups/top-startup-dark-8.png.asset.json";
import vipTopStartupDark9 from "@/assets/vip/top-startups/top-startup-dark-9.png.asset.json";
import vipTopStartupDark10 from "@/assets/vip/top-startups/top-startup-dark-10.png.asset.json";
import vipTopStartupDark11 from "@/assets/vip/top-startups/top-startup-dark-11.png.asset.json";
import vipTopStartupDark12 from "@/assets/vip/top-startups/top-startup-dark-12.png.asset.json";
import vipTopStartupDark13 from "@/assets/vip/top-startups/top-startup-dark-13.png.asset.json";
import vipTopStartupDark14 from "@/assets/vip/top-startups/top-startup-dark-14.png.asset.json";
import vipTopStartupDark15 from "@/assets/vip/top-startups/top-startup-dark-15.png.asset.json";
import quoteDivyaGupta from "@/assets/quotes/divya-gupta.jpg.asset.json";
import quoteSarthakKhanna from "@/assets/quotes/sarthak-khanna.jpg.asset.json";
import quoteSakshiTuteja from "@/assets/quotes/sakshi-tuteja.jpg.asset.json";
import quoteSahilDhingra from "@/assets/quotes/sahil-dhingra.jpg.asset.json";
import ffPhotoRhea from "@/assets/fellowship/p-rhea.webp.asset.json";
import ffPhotoDivya from "@/assets/fellowship/p-divya.webp.asset.json";
import ffPhotoManan from "@/assets/fellowship/p-manan.webp.asset.json";
import ffPhotoUpamanyu from "@/assets/fellowship/p-upamanyu.webp.asset.json";
import ffPhotoKanav from "@/assets/fellowship/p-kanav.webp.asset.json";
import ffPhotoSumeet from "@/assets/fellowship/p-sumeet.webp.asset.json";
import ffPhotoBhavya from "@/assets/fellowship/p-bhavya.webp.asset.json";
import ffPhotoAditya from "@/assets/fellowship/p-aditya.webp.asset.json";
import ffPhotoMadhav from "@/assets/fellowship/p-madhav.webp.asset.json";
import ffPhotoMayuresh from "@/assets/fellowship/p-mayuresh.webp.asset.json";
import ffPhotoSavrang from "@/assets/fellowship/p-savrang.webp.asset.json";
import ffPhotoAyush from "@/assets/fellowship/p-ayush.webp.asset.json";
import ffPhotoShouradeep from "@/assets/fellowship/p-shouradeep.webp.asset.json";
import ffPhotoNaveen from "@/assets/fellowship/p-naveen.webp.asset.json";
import ffLogoLexi from "@/assets/fellowship/l-lexi.webp.asset.json";
import ffLogoVinayasa from "@/assets/fellowship/l-vinayasa.webp.asset.json";
import ffLogoBeyond from "@/assets/fellowship/l-beyond.webp.asset.json";
import ffLogoPlaysuper from "@/assets/fellowship/l-playsuper.webp.asset.json";
import ffLogoWoody from "@/assets/fellowship/l-woody.webp.asset.json";
import ffLogoSampleset from "@/assets/fellowship/l-sampleset.webp.asset.json";
import ffLogoBlue from "@/assets/fellowship/l-blue.webp.asset.json";
import ffLogoSauced from "@/assets/fellowship/l-sauced.webp.asset.json";
import ffLogoAtlas from "@/assets/fellowship/l-atlas.webp.asset.json";
import ffLogoEcoveda from "@/assets/fellowship/l-ecoveda.webp.asset.json";
import newsEntrepreneur from "@/assets/news/enterpreneurNews.webp.asset.json";
import newsPrint from "@/assets/news/printNews.webp.asset.json";
import newsInc from "@/assets/news/IncNews.webp.asset.json";
import newsYourStory from "@/assets/news/yourStoryNews.webp.asset.json";
import newsSme from "@/assets/news/smeNews.webp.asset.json";
import newsIndianWeb2 from "@/assets/news/indianNews.webp.asset.json";

type Stage = { n: string; name: string; grant: string | null; body: string[]; image: string; culmination?: boolean };

const VIP_STAGES: Stage[] = [
  {
    n: "01",
    name: "Pre-Seed",
    grant: "₹15–20L",
    body: [
      "Bust the myths first. Most first ideas are solutions hunting for a problem, so Pre-Seed happens outside the building — talking to people who have it, and letting evidence kill the ideas that don't survive.",
      "Teams also learn what usually gets skipped: co-founders who cover each other's gaps, a problem narrow enough to own, and customer conversations without pitching. The stage ends with every idea tested in front of founders, VCs and alumni.",
    ],
    image: vipPreseedImg.url,
  },
  {
    n: "02",
    name: "MVP",
    grant: "₹15–20L",
    body: [
      "Build the smallest thing that is still real. Rather than spend the semester on architecture, students ship a working version — often on no-to-low-code tools — and watch what people do instead of what they say.",
      "Customer centricity is the real lesson. Every team has to explain why it built what it built, what it chose to cut, and what surprised it — and defend that story at MVP Demo Day in front of founders, investors and alumni.",
    ],
    image: vipMvpImg.url,
  },
  {
    n: "03",
    name: "Go-to-Market",
    grant: "₹20L",
    body: [
      "A working product is not yet a business. This stage teaches the marketing playbook: where customers actually come from, what a channel really costs, and how a funnel is read — acquisition, activation, retention, revenue — until growth stops being an accident.",
      "Students run live campaigns with real budgets, then report the numbers that matter rather than the flattering ones. That is what turns a product that ran once into one that repeats.",
    ],
    image: vipGtmImg.url,
  },
  {
    n: "04",
    name: "Product-Market Fit",
    grant: "₹25L",
    body: [
      "The hardest question in a startup is whether anyone truly needs what you've built. Teams answer with their own retention, usage and referral behaviour — and when the answer isn't there yet, they change the plan.",
      "Then comes one final dry run: the full pitch rehearsed under pressure, with mentors and investors poking at every assumption, so the real room is not their first.",
    ],
    image: vipPmfImg.url,
  },
  {
    n: "05",
    name: "Demo Day",
    grant: null,
    body: [
      "The programme ends in a single room. 150+ venture capitalists and angel investors sit across from student founders, hear the pitch, and assess the startup the way a fund would outside campus — for real funding, not a grade.",
      "It is also where the work begins. Conversations that start at Demo Day carry into the following months, and teams that raise usually begin with someone who was in that room.",
    ],
    image: vipDemodayImg.url,
    culmination: true,
  },
];

const VIP_TOP_STARTUPS = [
  { name: "Blue Brew", logo: vipTopStartupDark1.url },
  { name: "SeedsAI", logo: vipTopStartupDark2.url },
  { name: "Wetee", logo: vipTopStartupDark3.url },
  { name: "Amzaar", logo: vipTopStartupDark4.url },
  { name: "Aikyam Voices", logo: vipTopStartupDark5.url },
  { name: "Beyond Foods", logo: vipTopStartupDark6.url },
  { name: "EcoVeda", logo: vipTopStartupDark7.url },
  { name: "Eat Atlas", logo: vipTopStartupDark8.url },
  { name: "Habiito", logo: vipTopStartupDark9.url },
  { name: "PlaySuper", logo: vipTopStartupDark10.url },
  { name: "Maarg", logo: vipTopStartupDark11.url },
  { name: "Student startup", logo: vipTopStartupDark12.url },
  { name: "Student startup", logo: vipTopStartupDark13.url },
  { name: "Beyond Veda", logo: vipTopStartupDark14.url },
  { name: "HiveSchool", logo: vipTopStartupDark15.url },
];


type Beat = { stage: string; body: string };

const EIGHT_BEATS: Beat[] = [
  {
    stage: "Idea",
    body: "At a Masters' Union cafeteria table, Mohit Paliwal, Mohit Goswami, and Yugal Tamang realized something the internet was missing: not everyone wants to be seen, but everyone has a story worth telling.",
  },
  {
    stage: "Early Build",
    body: "While their cohort chased summer placements, the trio used the Startup VIP program and their own engineering favors to get a live-audio prototype off the ground — whiteboards, wireframes, and cafeteria debates.",
  },
  {
    stage: "Testing",
    body: "They launched inside their own 60-member batch first. No frills. Users tuned in, shows got made, feedback was instant.",
  },
  {
    stage: "Traction",
    body: "Venture Highway came in with a $400K seed round. EIGHT scaled to 5M+ downloads, 750K+ monthly active users, and 80,000+ paying subscribers.",
  },
  {
    stage: "Pivot",
    body: "In early 2025, they read the shift in Gen Z attention toward short-form video — and pivoted from live audio to microdrama. In 14 weeks: 20 original series, 500K+ users, $1M+ ARR.",
  },
  {
    stage: "Outcome",
    body: "₹13Cr+ ARR today, ₹27Cr raised to date, ₹43.7Cr+ projected for FY26, 20 employees — India's storytelling powerhouse, still writing its next act.",
  },
];

const BAMBAII_BEATS: Beat[] = [
  {
    stage: "First Experiment",
    body: "During the Dropshipping Challenge, Gaurav Dasgupta and his group combined nuts, seeds, and condiments into a homemade snack mix — priced at ₹60. It flopped.",
  },
  {
    stage: "Early Sales",
    body: "They dropped the price to ₹50. The first 100-pack batch sold out in an hour, generating over ₹60,000 in sales during the challenge alone.",
  },
  {
    stage: "Failure / Realisation",
    body: "Despite the sales, Gaurav's own verdict was blunt: “The product was still... for the lack of a better word... shit.” The team disbanded amicably.",
  },
  {
    stage: "Iteration",
    body: "Months later, stuck for a new idea in Jaisalmer, a call from his mother reminded him of her business advice — sell with one hand, take the money with the other. He found leftover bottles from the old challenge and, in eight days (Jan 7–15), fixed the taste, texture, and size, and rebranded it — naming it Bambaii Foods last-minute, as the label printer was about to close.",
  },
  {
    stage: "Product-Market Traction",
    body: "The relaunched Piri Piri Chiwda became a hit — winning the MVP grant and earning Gaurav a spot on Demo Day. Today: ₹50L ARR, ₹1.2Cr projected revenue, 5,000+ customers, retail presence in Kolkata and Kathmandu.",
  },
];

const EATATLAS_BEATS: Beat[] = [
  {
    stage: "Problem",
    body: "In a Deloitte canteen, Ishita Gupta grew frustrated with how little the snacking industry had evolved. The question stuck with her even after she moved on to Sleepy Owl.",
  },
  {
    stage: "Research",
    body: "At Masters' Union, she teamed up with her brother Anshul Gupta (food systems, supply chain expertise from EY and the Ministry of Agriculture) and hostel neighbor Mayuresh Jadhav (branding). Together they had product thinking, operational depth, and brand instinct.",
  },
  {
    stage: "Testing",
    body: "Over 45 days, they tested across campuses, events, and food courts, narrowing down to three flavors based on adaptability, virality, and supply-chain feasibility.",
  },
  {
    stage: "Product",
    body: "Global-cuisine-inspired dips, packaged like boarding passes — snacks designed to “travel through taste.”",
  },
  {
    stage: "Launch",
    body: "Official marketplace launch in January 2025, backed by 50+ pop-ups across Delhi NCR to test pin-code-specific trends — including a viral, unplanned moment at a Coldplay concert.",
  },
  {
    stage: "Traction",
    body: "The only consumer brand to make the Top 3 at Demo Day, backed by Masters' Union grants and the Founder Fellowship. Now incubated at IIM Bangalore, IIT Kozhikode, BITS Pilani, and NIFTEM. Current: ₹80L ARR, ₹15L raised, ₹2Cr projected FY26.",
  },
];


type SharkTankEntry = { company: string; founder: string; cohort: string; season: string; description: string; photo?: string };
const SHARK_TANK: SharkTankEntry[] = [
  {
    company: "Bullspree",
    photo: sharkPhoto_bullspree.url,
    founder: "Dharmil Bavishi",
    cohort: "PGP TBM Co'21",
    season: "Season 2",
    description: "Bullspree is building India's favourite stock market playground for learning & investing.",
  },
  {
    company: "HiveSchool",
    photo: sharkPhoto_hiveschool.url,
    founder: "Nikhil Gaur",
    cohort: "PGP TBM Co'24",
    season: "Season 4",
    description: "HiveSchool is building India's first Sales School.",
  },
  {
    company: "MemoTag",
    photo: sharkPhoto_memotag.url,
    founder: "Reyansh Juneja",
    cohort: "UG TBM Co'28",
    season: "Season 4",
    description: "MemoTag is building an AI-driven wearable for dementia care.",
  },
  {
    company: "Nexera Health",
    photo: sharkPhoto_nexera.url,
    founder: "Himanshu Rajpurohit",
    cohort: "CEO Challenge",
    season: "Season 4",
    description: "Nexera Health is redefining workplace wellness for employees.",
  },
  {
    company: "HookD",
    photo: sharkPhoto_hookd.url,
    founder: "Dia Goel",
    cohort: "PGP TBM Co '23",
    season: "Season 5",
    description: "HookD is building India’s first ready-to-eat non-vegetarian snacking brand for the country’s 70% non-veg consumers.",
  },
  {
    company: "Meta Fashion",
    photo: sharkPhoto_metafashion.url,
    founder: "Arjun Goel",
    cohort: "UG TBM Co '28",
    season: "Season 5",
    description: "Meta Fashion is building the infrastructure for phygital commerce, connecting in-game discovery with real-world fashion.",
  },
];

const HSSL_STATS = [
  { value: "10,000+", label: "Applications" },
  { value: "500+", label: "Schools participated" },
  { value: "15+", label: "States represented" },
  { value: "₹20L+", label: "Cash prize / funding pool" },
];
const HSSL_STAGES = ["Ideation", "MVP Showdown", "Investor Pitch"];

/** Founder Fellowship — live figures from mastersunion.org (Founder Fellowship section). */
const FELLOW_STATS = [
  { value: "30+", label: "Students supported" },
  { value: "25+", label: "Startups supported" },
  { value: "20Cr+", label: "Funds raised" },
  { value: "1.2Cr+", label: "Grants given by Masters' Union" },
];

type FellowFounder = {
  name: string;
  role: string;
  company: string;
  blurb: string;
  photo: string;
  logo: string;
  social: { kind: "instagram" | "linkedin"; href: string };
};

/** Founder Fellowship founders — copy, roles and links exactly as on the live Founder Fellowship section. */
const FELLOW_FOUNDERS: FellowFounder[] = [
  {
    name: "Rhea Melwani",
    role: "Co founder",
    company: "Lexi's Gourmet Sandwiches",
    blurb: "Gurgaon's highest-rated gourmet sandwich brand, serving premium, chef-crafted sandwiches loved by food enthusiasts.",
    photo: ffPhotoRhea.url,
    logo: ffLogoLexi.url,
    social: { kind: "instagram", href: "https://www.instagram.com/lexis_sandos/" },
  },
  {
    name: "Divya Shah",
    role: "CEO",
    company: "Vinayasa",
    blurb: "India's first mental health practice management software, helping therapists focus on clients, not admin work.",
    photo: ffPhotoDivya.url,
    logo: ffLogoVinayasa.url,
    social: { kind: "instagram", href: "https://www.instagram.com/vinyasa_health/" },
  },
  {
    name: "Manan Sahai",
    role: "CEO",
    company: "Beyond Veda",
    blurb: "A high-performance, plant-based personal wellness brand delivering expert-formulated hair and skincare solutions.",
    photo: ffPhotoManan.url,
    logo: ffLogoBeyond.url,
    social: { kind: "instagram", href: "https://www.instagram.com/beyond.veda/" },
  },
  {
    name: "Upamanyu Chatterjee",
    role: "CEO",
    company: "PlaySuper",
    blurb: "India's first Gaming Commerce company, turning in-game currency into real-world rewards, boosting engagement for gaming studios.",
    photo: ffPhotoUpamanyu.url,
    logo: ffLogoPlaysuper.url,
    social: { kind: "instagram", href: "https://www.instagram.com/club_playsuper/" },
  },
  {
    name: "Kanav Rishi Kumar",
    role: "Proprietor",
    company: "Woody's Pizzeria",
    blurb: "South Delhi's top-rated pizzeria, serving high-quality vegetarian pizzas with a global twist and an Indian soul.",
    photo: ffPhotoKanav.url,
    logo: ffLogoWoody.url,
    social: { kind: "instagram", href: "https://www.instagram.com/woodyspizzeria/" },
  },
  {
    name: "Sumeet Hanagal",
    role: "CEO",
    company: "Sample Set LLC",
    blurb: "Using AI and data to build cutting-edge enterprise solutions, NLP tools, and custom software for seamless business operations.",
    photo: ffPhotoSumeet.url,
    logo: ffLogoSampleset.url,
    social: { kind: "linkedin", href: "https://www.linkedin.com/company/sampleset/" },
  },
  {
    name: "Bhavya Kothary",
    role: "CFO",
    company: "Beyond Veda",
    blurb: "A high-performance, plant-based personal wellness brand delivering expert-formulated hair and skincare solutions.",
    photo: ffPhotoBhavya.url,
    logo: ffLogoBeyond.url,
    social: { kind: "instagram", href: "https://www.instagram.com/beyond.veda/" },
  },
  {
    name: "Aditya Rathi",
    role: "CEO",
    company: "Blue Brew",
    blurb: "Breaking away from mass fashion with trend-driven, high-quality, and affordable apparel tailored for Indian consumers.",
    photo: ffPhotoAditya.url,
    logo: ffLogoBlue.url,
    social: { kind: "instagram", href: "https://www.instagram.com/bluebrew.in/" },
  },
  {
    name: "Madhav Aggarwal",
    role: "CEO",
    company: "Sauced",
    blurb: "A bold sneaker brand blending culture, creativity, and affordability, redefining Gen Z and millennial fashion.",
    photo: ffPhotoMadhav.url,
    logo: ffLogoSauced.url,
    social: { kind: "instagram", href: "https://www.instagram.com/saucedglobal" },
  },
  {
    name: "Mayuresh Jadhav",
    role: "CEO",
    company: "Eat Atlas",
    blurb: "Reinventing snacking with gourmet dips and artisanal lavash chips, bringing global flavors in a stylish, affordable way.",
    photo: ffPhotoMayuresh.url,
    logo: ffLogoAtlas.url,
    social: { kind: "instagram", href: "https://www.instagram.com/eatatlas.in/" },
  },
  {
    name: "Savrang Jain R",
    role: "Founder and CEO",
    company: "Ecoveda Ventures",
    blurb: "Providing 100% biodegradable, compostable packaging solutions for the HoReCa sector, aiming to lead sustainable packaging across industries.",
    photo: ffPhotoSavrang.url,
    logo: ffLogoEcoveda.url,
    social: { kind: "instagram", href: "https://www.instagram.com/ecoveda___/" },
  },
  {
    name: "Ayush Melwani",
    role: "Co founder",
    company: "Lexi's",
    blurb: "Gurgaon's highest-rated gourmet sandwich brand, serving premium, chef-crafted sandwiches loved by food enthusiasts.",
    photo: ffPhotoAyush.url,
    logo: ffLogoLexi.url,
    social: { kind: "instagram", href: "https://www.instagram.com/lexis_sandos/" },
  },
  {
    name: "Shouradeep C.",
    role: "COO",
    company: "PlaySuper",
    blurb: "India's first Gaming Commerce company, turning in-game currency into real-world rewards, boosting engagement for gaming studios.",
    photo: ffPhotoShouradeep.url,
    logo: ffLogoPlaysuper.url,
    social: { kind: "instagram", href: "https://www.instagram.com/club_playsuper/" },
  },
  {
    name: "Naveen Balaji",
    role: "Co founder, CEO",
    company: "Lexi's",
    blurb: "Gurgaon's highest-rated gourmet sandwich brand, serving premium, chef-crafted sandwiches loved by food enthusiasts.",
    photo: ffPhotoNaveen.url,
    logo: ffLogoLexi.url,
    social: { kind: "instagram", href: "https://www.instagram.com/lexis_sandos/" },
  },
];

/**
 * Founder Fellowship founders as a horizontal filmstrip, improvised from the
 * Shark Tank showcase: a linear track (no deck rotation) where the active
 * portrait sits centre, neighbours peek in from the edges, and the strip
 * advances on click, arrow keys, touch swipe, trackpad or the controls below.
 */
function FellowshipShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const lastGestureAt = useRef(0);
  const total = FELLOW_FOUNDERS.length;
  const activeFounder = FELLOW_FOUNDERS[active];

  const move = (direction: number) =>
    setActive((current) => (current + direction + total) % total);

  const moveFromGesture = (direction: -1 | 1) => {
    const now = Date.now();
    if (now - lastGestureAt.current < (reduceMotion ? 120 : 650)) return;
    lastGestureAt.current = now;
    move(direction);
  };

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const rect = element.getBoundingClientRect();
      if (rect.top >= window.innerHeight * 0.85 || rect.bottom <= window.innerHeight * 0.15) return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 28 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastGestureAt.current < (reduceMotion ? 120 : 650)) return;
      lastGestureAt.current = now;
      move(event.deltaX > 0 ? 1 : -1);
    };

    window.addEventListener("keyup", onKey);
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keyup", onKey);
      element.removeEventListener("wheel", onWheel);
    };
  }, [active, reduceMotion]);

  if (!activeFounder) return null;
  const SocialIcon = activeFounder.social.kind === "linkedin" ? Linkedin : Instagram;

  return (
    <div className="mt-6">
      <div
        ref={showcaseRef}
        className="outline-none focus-visible:ring-1 focus-visible:ring-background/50"
        role="region"
        aria-label="Founder Fellowship founders"
        tabIndex={0}
        onTouchStartCapture={(event) => {
          touchStart.current = {
            x: event.touches[0]?.clientX ?? 0,
            y: event.touches[0]?.clientY ?? 0,
          };
        }}
        onTouchEndCapture={(event) => {
          const touch = event.changedTouches[0];
          if (!touch) return;
          const deltaX = touch.clientX - touchStart.current.x;
          const deltaY = touch.clientY - touchStart.current.y;
          if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return;
          moveFromGesture(deltaX < 0 ? 1 : -1);
        }}
      >
        <div className="relative h-[430px] overflow-hidden sm:h-[500px] lg:h-[560px]" aria-live="polite">
          {FELLOW_FOUNDERS.map((founder, index) => {
            let offset = index - active;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            const isActive = offset === 0;
            const distance = Math.abs(offset);
            const translate = offset * 62;

            return (
              <Button
                key={founder.name}
                type="button"
                variant="ghost"
                onClick={() => setActive(index)}
                aria-label={
                  isActive
                    ? `${founder.name}, ${founder.company}, selected`
                    : `Show ${founder.name} of ${founder.company}`
                }
                aria-current={isActive ? "true" : undefined}
                className={`group absolute left-1/2 top-1/2 block aspect-[3/4] h-auto w-[64vw] max-w-[280px] overflow-hidden rounded-none border border-background/10 bg-foreground p-0 text-left shadow-[0_32px_70px_-34px_var(--foreground)] transition-[transform,opacity,filter] duration-700 ease-out hover:bg-foreground sm:w-[280px] lg:w-[320px] lg:max-w-[320px] ${
                  distance > 2 ? "pointer-events-none" : ""
                }`}
                style={{
                  zIndex: 20 - distance,
                  opacity: distance > 2 ? 0 : isActive ? 1 : 0.45,
                  filter: isActive ? "none" : "saturate(.65) brightness(.6)",
                  transform: `translate(calc(-50% + ${translate}%), -50%) scale(${isActive ? 1 : 0.86})`,
                  transitionDuration: reduceMotion ? "0ms" : undefined,
                }}
              >
                <img
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of ${founder.company}`}
                  loading={isActive ? "eager" : "lazy"}
                  data-asset-reload
                  className="absolute inset-0 size-full object-cover object-top"
                />
                <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-foreground/70 to-transparent" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground via-foreground/55 to-transparent" aria-hidden />
                <span className="absolute left-4 top-4 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
                  {founder.role}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <img
                    src={founder.logo}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    data-asset-reload
                    className="mb-3 h-5 w-auto max-w-[110px] object-contain object-left"
                  />
                  <span className="block font-display text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold leading-none text-background">
                    {founder.name}
                  </span>
                  <span className="mt-2 block font-tech text-[9px] font-semibold uppercase tracking-[0.16em] text-background/70">
                    {founder.company}
                  </span>
                </span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] bg-bottle transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden
                />
              </Button>
            );
          })}
        </div>

        <div className="mx-auto mt-2 grid max-w-[860px] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-t border-background/15 pt-5 sm:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-display text-[1.15rem] font-semibold text-background sm:text-[1.35rem]">
                {activeFounder.name}
              </h3>
              <span className="font-tech text-[9px] font-bold uppercase tracking-[0.18em] text-background/45">
                {activeFounder.role}
              </span>
            </div>
            <p className="mt-1 font-tech text-[9px] uppercase tracking-[0.14em] text-background/55">
              {activeFounder.company}
            </p>
            <p className="mt-3 max-w-[54ch] text-[13px] leading-[1.65] text-background/75 sm:text-[14px]">
              {activeFounder.blurb}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-4">
            <div className="flex items-center gap-1 sm:gap-3">
              <Button type="button" variant="ghost" size="icon" onClick={() => move(-1)} aria-label="Previous founder" className="min-h-11 min-w-11 rounded-none border border-background/20 text-background hover:bg-background hover:text-foreground">
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </Button>
              <p className="hidden min-w-14 text-center font-mono text-[10px] text-background/45 sm:block">
                <strong className="text-base font-medium text-background">{String(active + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
              </p>
              <Button type="button" variant="ghost" size="icon" onClick={() => move(1)} aria-label="Next founder" className="min-h-11 min-w-11 rounded-none border border-background/20 text-background hover:bg-background hover:text-foreground">
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={activeFounder.logo}
                alt=""
                aria-hidden
                data-asset-reload
                className="h-6 w-auto max-w-[120px] object-contain"
              />
              <a
                href={activeFounder.social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${activeFounder.name} on ${activeFounder.social.kind === "linkedin" ? "LinkedIn" : "Instagram"}`}
                className="inline-flex size-8 items-center justify-center rounded-full border border-background/20 text-background/70 transition hover:border-background/50 hover:text-background"
              >
                <SocialIcon className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-[860px] items-center gap-1" role="tablist" aria-label="Choose a founder">
          {FELLOW_FOUNDERS.map((founder, index) => (
            <button
              key={founder.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${founder.name}, ${founder.company}`}
              onClick={() => setActive(index)}
              className="group flex h-6 min-w-0 flex-1 items-center"
            >
              <span
                className={`block h-px w-full transition-colors duration-300 ${
                  index === active ? "bg-bottle" : "bg-background/25 group-hover:bg-background/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Highlight reels for the High School Startup League. Vertical cards, one per
 * clip: poster frame first, muted preview on hover, full clip in a portal modal.
 */
const HSSL_REELS = [
  {
    id: "hssl-reel-1",
    src: hsslReel1.url,
    poster: hsslReel1Poster.url,
    title: "Reel 01",
    meta: "High School Startup League",
  },
  {
    id: "hssl-reel-2",
    src: hsslReel2.url,
    poster: hsslReel2Poster.url,
    title: "Reel 02",
    meta: "High School Startup League",
  },
  {
    id: "hssl-reel-3",
    src: hsslReel3.url,
    poster: hsslReel3Poster.url,
    title: "Reel 03",
    meta: "High School Startup League",
  },
];

const ECOSYSTEM_STATS = [
  { value: "30+", label: "Startups launched" },
  { value: "₹593.10 Cr", label: "Total valuation" },
  { value: "₹480 Cr", label: "Projected revenue, FY26" },
  { value: "₹319.8 Cr", label: "Annualised revenue" },
  { value: "₹5.7 Cr", label: "Grants given by Masters' Union" },
  { value: "10,000+", label: "1:1 mentorship hours" },
  { value: "14.7x", label: "Capital efficiency" },
  { value: "180+", label: "Number of employees" },
];

const TESTIMONIALS = [
  {
    quote:
      "I came in expecting good ideas, but what I saw were real businesses. Students with traction, customers, and actual revenues. The ambition in that room was electric. This is what business education should be.",
    name: "Divya Gupta",
    role: "Director, Aavishkar Capital",
    photo: quoteDivyaGupta.url,
  },
  {
    quote:
      "This journey was more than just building a brand — it was about finding purpose and passion in every step... It wasn't just business; it became a home for our grit and growth.",
    name: "Sarthak Khanna",
    role: "Founder, Monarque",
    photo: quoteSarthakKhanna.url,
  },
  {
    quote:
      "Masters' Union provided the environment and mentorship to transform a simple question into a meaningful product.",
    name: "Sakshi Tuteja",
    role: "Founder, Yango",
    photo: quoteSakshiTuteja.url,
  },
  {
    quote:
      "I found some of the problem statements genuinely compelling, especially those being tackled by Cryptique, Guardex, and Spawnright.",
    name: "Sahil Dhingra",
    role: "VP, Info Edge Ventures",
    photo: quoteSahilDhingra.url,
  },
];

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? "none" : "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function EyebrowRule() {
  return (
    <span
      aria-hidden
      className="mt-[8px] h-px w-12 shrink-0 bg-gradient-to-r from-sky-400 via-yellow-300 to-orange-400"
    />
  );
}

function Eyebrow({
  children,
  dark = false,
  rule = true,
  icon: Icon,
}: {
  children: ReactNode;
  dark?: boolean;
  rule?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-start gap-4">
      {rule ? <EyebrowRule /> : null}
      <div className="flex min-w-0 items-start gap-2">
        {Icon ? <Icon className="size-4 shrink-0 text-background/55" strokeWidth={1.75} aria-hidden /> : null}
        <div className="min-w-0 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-background/50">
          {children}
        </div>
      </div>
    </div>
  );
}

const FILM_SECTION_RULE =
  "linear-gradient(to right, transparent, oklch(0.75 0.15 215) 12%, oklch(0.88 0.18 95) 50%, oklch(0.65 0.22 45) 88%, transparent)";

/**
 * Homepage section rule — thin inset hairline floating above a section.
 * A 0.5px band at a fractional device position can rasterise to nothing, so
 * sections that must read as a visible rule pass heightClass="h-px".
 */
function SectionRule({ heightClass = "h-[0.5px]" }: { heightClass?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-[6%] right-[6%] top-0 z-[1] ${heightClass}`}
      style={{ background: FILM_SECTION_RULE }}
    />
  );
}

function Section({
  id,
  tone = "light",
  container = "max-w-7xl",
  tightTop = false,
  tightBottom = false,
  ruleHeightClass,
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "paper";
  container?: string;
  tightTop?: boolean;
  tightBottom?: boolean;
  /** Pass "h-px" when a section's rule must read as a visible hairline. */
  ruleHeightClass?: string;
  children: ReactNode;
}) {
  const surfaceClass =
    tone === "paper"
      ? "bg-foreground"
      : tone === "dark"
        ? "bg-foreground"
        : "bg-foreground";
  const padClass = tightTop && tightBottom
    ? "px-4 pt-10 pb-12 sm:px-7 sm:pt-12 sm:pb-16 md:px-8 md:pt-14 md:pb-20 lg:px-12 lg:pt-16 lg:pb-24"
    : tightTop
      ? "px-4 pt-10 pb-16 sm:px-7 sm:pt-12 sm:pb-20 md:px-8 md:pt-14 md:pb-24 lg:px-12 lg:pt-16 lg:pb-32"
      : tightBottom
        ? "px-4 pt-16 pb-12 sm:px-7 sm:pt-20 sm:pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-12 lg:pt-32 lg:pb-24"
        : "px-4 py-16 sm:px-7 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32";
  return (
    <section id={id} className={`relative ${id === "spark" || id === "doing" || id === "dropshipping" || id === "people" ? "overflow-x-clip overflow-y-visible" : "overflow-hidden"} text-background ${surfaceClass}`}>
      {/* Homepage section rule — thin inset hairline floating above each section */}
      {id !== "journey" && id !== "ventures" ? <SectionRule heightClass={ruleHeightClass} /> : null}
      {id ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 top-6 select-none font-display text-[clamp(4.5rem,14vw,12rem)] font-light uppercase leading-none text-background/[0.025] md:right-6 md:top-8"
        >
          {id.replace("-", " ")}
        </span>
      ) : null}
      <div className={`relative z-[1] mx-auto w-full ${container} ${padClass}`}>{children}</div>
    </section>
  );
}

function LogoBadge({ src, alt, dark = false, size = "size-9" }: { src?: string; alt?: string; dark?: boolean; size?: string }) {
  if (src) {
    return <img src={src} alt={alt ?? ""} loading="lazy" className={`${size} shrink-0 rounded-full border border-background/20 bg-background object-cover`} />;
  }
  return (
    <span
      aria-label="Logo placeholder"
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-background/20 text-background/35`}
    >
      <ImageIcon className="size-3.5" strokeWidth={1.5} />
    </span>
  );
}

function PortraitBadge({ src, alt, dark = false, size = "size-14" }: { src?: string; alt?: string; dark?: boolean; size?: string }) {
  if (src) {
    return <img src={src} alt={alt ?? ""} loading="lazy" className={`${size} shrink-0 rounded-full border border-background/20 bg-background object-cover`} />;
  }
  return (
    <span
      aria-label="Founder image placeholder"
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-background/20 text-background/35`}
    >
      <Users className="size-4" strokeWidth={1.5} />
    </span>
  );
}

function FounderLine({ names, cohort, dark = false }: { names: string; cohort: string; dark?: boolean }) {
  return (
    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background/60">
      {names} · {cohort}
    </span>
  );
}

function ChapterChips({ labels, dark = false }: { labels: string[]; dark?: boolean }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2.5 sm:mt-7 sm:gap-y-3">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span
            className="eyebrow rounded-full border border-background/15 bg-background/[0.06] px-3 py-1.5 text-background/80"
          >
            {l}
          </span>
          {i < labels.length - 1 && <ArrowRight className="size-3 text-background/25" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

type Metric = { value: string; label: string };

function KeyMetrics({ dominant, supporting, dark = false }: { dominant: Metric; supporting: Metric[]; dark?: boolean }) {
  return (
    <div className="grid grid-cols-2 items-end gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8 md:gap-x-10">
      <div>
        <div className="text-[clamp(2.1rem,4.2vw,3.2rem)] font-medium leading-none tracking-[-0.02em]">{dominant.value}</div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-background/55">{dominant.label}</div>
      </div>
      {supporting.map((s) => (
        <div key={s.label}>
          <div className="text-[1.25rem] font-medium leading-none tracking-[-0.01em]">{s.value}</div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.16em] text-background/50">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

const STORY_MEDIA: Record<string, { image?: string; logo?: string }> = {
  Eight: { image: sparkEightFounders.url, logo: ventureEightLogo.url },
  Bullspree: { image: bullspreeVentureImg.url, logo: ventureBullspreeLogo.url },
  PlaySuper: { image: playsuperVentureImg.url, logo: venturePlaysuperLogo.url },
  "Hive School": { image: hiveschoolVentureImg.url, logo: ventureHiveschoolLogo.url },
  SeedsAI: { image: sparkSeedsAiFounders.url, logo: ventureSeedsAILogo.url },
  MemoTag: { image: brandPhotoMemotag, logo: sharkMemoTagLogo.url },
  "Meta Fashion": { image: brandPhotoMetafashion, logo: sharkMetaFashionLogo.url },
};

const FOUNDER_EDITORIAL: Record<
  string,
  { dek: string; paragraphs: string[]; facts: { label: string; value: string }[] }
> = {
  Eight: {
    dek: "A cafeteria-table observation became an audio storytelling company built for people who would rather listen than be seen.",
    paragraphs: [
      "Mohit Paliwal, Mohit Goswami and Yugal Tamang began with a simple tension: not everyone wants to be on camera, but everyone has a story worth telling. That insight gave Eight its first shape — a stage made for voices.",
      "The company did not stay attached to its first format. When live audio began losing momentum, the founders moved toward microdrama, choosing the audience's changing behaviour over the comfort of the original idea.",
      "That willingness to rebuild turned a campus conversation into a venture-backed audio platform with more than five million downloads.",
      "The important move was not simply finding a new format. It was recognising that the underlying appetite for intimate, voice-led entertainment was still there, even as the way listeners wanted to consume it was changing.",
      "Eight's story is therefore as much about adaptation as invention: observe closely, release early, and let real listening behaviour shape what the company becomes next.",
      "Each version brought the team closer to the same goal — making stories easy to enter, personal to hear and compelling enough to return to.",
      "What began around a cafeteria table now carries the discipline of a company that has learned how to change its product without losing its original reason for existing.",
    ],
    facts: [
      { label: "Category", value: "Audio storytelling" },
      { label: "Signal", value: "5M+ downloads" },
      { label: "Stage", value: "Venture-backed" },
    ],
  },
  PlaySuper: {
    dek: "A second-time founding team turned a difficult reset into a new thesis for India's casual gaming economy.",
    paragraphs: [
      "Before PlaySuper, the founders had already built and exited CollegeShala. The 2023 edtech downturn then forced a hard reset — one that made them look for a larger, more durable consumer problem.",
      "They found it among India's hundreds of millions of casual gamers. Studios could acquire players, but struggled to keep them engaged when their time inside a game created no value beyond the screen.",
      "PlaySuper became the rewards layer between play and real-world incentives. The venture has since raised across four rounds, transforming an industry observation into a gaming-commerce company.",
      "The proposition joins two familiar behaviours — playing and shopping — without asking users to learn an entirely new routine. Progress inside a game can carry value beyond the game itself.",
      "For the founders, the second company also carried the lessons of the first: move quickly, test the commercial engine early, and treat a difficult market reset as useful evidence rather than an ending.",
      "Building the rewards layer required the team to serve players and studios at once, keeping the experience useful without interrupting the play that brought people there.",
      "That balancing act continues to shape PlaySuper: a consumer product on the surface, supported by a business model designed around stronger engagement underneath.",
    ],
    facts: [
      { label: "Category", value: "Gaming commerce" },
      { label: "Funding", value: "$1.69M" },
      { label: "Stage", value: "Seed · 4 rounds" },
    ],
  },
  Bullspree: {
    dek: "An intimidating investing experience was redesigned as a market playground where curiosity could become confidence.",
    paragraphs: [
      "Dharmil Bavishi moved from supply-chain work into the CEO's office, carrying with him a persistent question: why did learning to invest still feel inaccessible to so many first-time participants?",
      "Bullspree answered by replacing passive instruction with experiential learning. Users could understand markets by participating, practising and building confidence before the stakes felt overwhelming.",
      "The idea grew into a retail-investing platform with more than ten lakh registered users and took Dharmil to the Shark Tank India stage.",
      "Its product language makes the market feel less like a wall of jargon and more like a place that can be explored. The learning happens through decisions, feedback and repetition rather than theory alone.",
      "That shift from explanation to participation became Bullspree's clearest advantage: financial curiosity could turn into a habit, and a first-time learner could begin without pretending to be an expert.",
      "As the community expanded, the original question remained the useful test: does this make the next market decision easier to understand than the last one?",
      "The scale of the platform suggests that accessibility was not a niche concern. It was a broad invitation to people who had been interested in investing but unsure where to begin.",
    ],
    facts: [
      { label: "Category", value: "Fintech" },
      { label: "Community", value: "10L+ users" },
      { label: "Milestone", value: "Shark Tank · S2" },
    ],
  },
  MemoTag: {
    dek: "A student founder looked at the gaps between medical visits and built for the moments dementia caregivers cannot always see.",
    paragraphs: [
      "Reyansh Juneja began MemoTag while still an undergraduate, focusing on a care problem that often unfolds quietly: important behavioural changes can happen long before a clinician sees the patient again.",
      "The venture is developing an AI-driven wearable for dementia care, designed to create a more continuous picture for families and care teams instead of relying only on isolated appointments.",
      "MemoTag's early progress carried the idea from campus to Shark Tank India, where a deeply personal care challenge became a national-stage pitch.",
      "The product sits between everyday life and clinical care. Its role is to help make subtle patterns more visible, giving caregivers a clearer record of what happens in the long intervals between consultations.",
      "For Reyansh, building meant staying close to the people around the patient. The technology matters, but so does the trust required for a family to make it part of an already demanding routine.",
      "That makes every product decision unusually human. Comfort, clarity and ease of use matter alongside the intelligence working behind the device.",
      "MemoTag's journey shows how a focused observation can travel: from a problem noticed closely, to a working care proposition, and then to a public conversation at national scale.",
    ],
    facts: [
      { label: "Category", value: "Dementia care" },
      { label: "Product", value: "AI wearable" },
      { label: "Milestone", value: "Shark Tank · S4" },
    ],
  },
  "Hive School": {
    dek: "A missing pathway into sales became a school built around the craft companies need but conventional classrooms rarely teach.",
    paragraphs: [
      "Nikhil Gaur saw a mismatch in the talent market: companies were searching for capable sales and go-to-market operators, while aspiring professionals had few places to learn the work by doing it.",
      "Hive School was built as India's first dedicated sales school, placing practice, industry exposure and operator thinking at the centre of the learning experience.",
      "Built while Nikhil was still a student, the venture reached a ₹2 crore run rate and later took its education thesis to Shark Tank India.",
      "The classroom is organised around the reality of the role: understanding a customer, opening a conversation, handling resistance and learning how revenue is actually created inside a business.",
      "That practical focus gives the school its identity. Sales is treated not as a fallback career or a personality trait, but as a discipline that can be studied, rehearsed and improved.",
      "Industry exposure closes the distance between a lesson and the moment it must be used. Learners encounter the language, pace and accountability of the work before entering the role full-time.",
      "Hive School's growth made the initial mismatch visible in another way: both companies and young operators were ready for a more deliberate route into the profession.",
    ],
    facts: [
      { label: "Category", value: "Sales education" },
      { label: "Run rate", value: "₹2 Cr" },
      { label: "Milestone", value: "Shark Tank · S4" },
    ],
  },
  "Meta Fashion": {
    dek: "A fashion discovery inside a game became a bridge between digital identity and the clothes people wear outside it.",
    paragraphs: [
      "Arjun Goel began with a behaviour native to a new generation: players were using virtual worlds not only to compete, but to discover and express a personal style.",
      "Meta Fashion connects that digital discovery to physical commerce. A look encountered in-game can move beyond the avatar and become something the player can wear in real life.",
      "The result is a phygital fashion venture that treats games as a new storefront — one where culture, identity and commerce meet.",
      "The opportunity lives in the handoff between those worlds. Digital taste can become a signal for physical demand, while a physical garment can carry the memory and community of where it was first discovered.",
      "For Arjun, the game is not merely a promotional channel. It is a cultural space with its own creators, references and forms of self-expression — and therefore a credible place for fashion to begin.",
      "That perspective changes the sequence of fashion discovery. A collection can meet its audience inside an experience first, then continue as an object beyond the screen.",
      "Meta Fashion is building around that continuity, treating the avatar and the person not as separate customers but as two expressions of the same taste.",
    ],
    facts: [
      { label: "Category", value: "Fashion tech" },
      { label: "Model", value: "Phygital commerce" },
      { label: "Stage", value: "Pre-seed" },
    ],
  },
  SeedsAI: {
    dek: "Hours spent beside NBFC call-centre teams revealed a manual review problem hiding in plain sight.",
    paragraphs: [
      "Shubham Khatri and Vansh Miglani did not begin with a polished business plan. They began by shadowing collection agents and listening to how much operational time disappeared into manual call review.",
      "SeedsAI turned that observation into voice intelligence for NBFC collections and compliance — helping teams examine conversations systematically rather than sampling them by hand.",
      "The venture grew from field research into an applied-AI business, reaching ₹60 lakh in annual recurring revenue in FY25.",
      "The value is in turning an unstructured call into something a team can review and act on. Patterns that once depended on hours of manual listening can be surfaced across a much larger body of conversations.",
      "Its origin remains visible in the product: begin beside the operator, understand the repetitive work in detail, then apply technology only where it can make that work more consistent and useful.",
      "The result gives managers a wider view of quality and compliance while allowing frontline teams to spend less time reconstructing what happened call by call.",
      "SeedsAI's early revenue reflects a practical approach to applied intelligence — start with a costly workflow, prove value in the field and deepen the system around real operating needs.",
    ],
    facts: [
      { label: "Category", value: "AI · Fintech" },
      { label: "Product", value: "Voice intelligence" },
      { label: "FY25 ARR", value: "₹60L" },
    ],
  },
};

// Per-chapter accent colors sampled from the Entrepreneurship Report palette
// (teal, blue, deep green, red, gold, amber, moss) — one per chapter, in order.
const STORY_ACCENTS = ["#DCE8D4", "#EEE9C2", "#F3C544", "#CFE6EC", "#EEE9C2", "#F3C544", "#DCE8D4"];

const STORY_PAPER = "#FFFFFF";

function FounderStoriesGallery() {
  const [activeStory, setActiveStory] = useState(0);
  const total = SPARK_EXAMPLES.length;
  const story = SPARK_EXAMPLES[activeStory];
  const media = STORY_MEDIA[story.name] ?? {};
  const image = media.image ?? story.founderImage;
  const editorial = FOUNDER_EDITORIAL[story.name];
  const [imageOrientation, setImageOrientation] = useState<"portrait" | "landscape">("landscape");
  useEffect(() => {
    if (!image) return;
    const probe = new Image();
    probe.onload = () => setImageOrientation(probe.naturalHeight > probe.naturalWidth ? "portrait" : "landscape");
    probe.src = image;
  }, [image]);

  const turnPage = (direction: 1 | -1) => {
    const scrollY = window.scrollY;
    const lenis = (window as unknown as {
      __lenis?: {
        stop?: () => void;
        start?: () => void;
        scrollTo?: (target: number, options?: { immediate?: boolean; force?: boolean }) => void;
      };
    }).__lenis;
    lenis?.stop?.();
    setActiveStory((current) => (current + direction + total) % total);
    const restoreScroll = () => {
      lenis?.scrollTo?.(scrollY, { immediate: true, force: true });
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    };
    restoreScroll();
    requestAnimationFrame(() => {
      restoreScroll();
      requestAnimationFrame(() => {
        restoreScroll();
        window.setTimeout(() => {
          restoreScroll();
          lenis?.start?.();
        }, 80);
      });
    });
  };

  const magazineRef = useRef<HTMLDivElement>(null);
  const turnPageRef = useRef(turnPage);
  turnPageRef.current = turnPage;
  useEffect(() => {
    const el = magazineRef.current;
    if (!el) return;
    let lastTurn = 0;
    let wheelAccum = 0;
    const turn = (dir: 1 | -1) => {
      const now = Date.now();
      if (now - lastTurn < 600) return;
      lastTurn = now;
      turnPageRef.current(dir);
    };
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName))) return;
      if (!el.contains(document.activeElement) && !inView()) return;
      e.preventDefault();
      turn(e.key === "ArrowRight" ? 1 : -1);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelAccum += e.deltaX;
      if (Math.abs(wheelAccum) > 60) {
        turn(wheelAccum > 0 ? 1 : -1);
        wheelAccum = 0;
      }
    };
    let sx = 0, sy = 0;
    const onTouchStart = (e: TouchEvent) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);


  return (
    <section id="founder-stories" className="relative overflow-x-clip bg-foreground py-20 text-background sm:py-24 md:py-28">
      <SectionRule heightClass="h-px" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <Eyebrow icon={BookOpen}>Founder Stories</Eyebrow>
              <h2 className="mt-5 max-w-[24ch] text-[clamp(1.8rem,4.2vw,3.6rem)] font-light leading-[1.08]">
                The founders&apos; issue.
              </h2>
            </div>
          </Reveal>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-background/45 sm:block">
            {String(activeStory + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div
          role="separator"
          aria-hidden="true"
          className="mt-10 h-px w-full bg-background/15"
        />
        <div ref={magazineRef} role="region" aria-roledescription="carousel" aria-label="Founder stories magazine — use left and right arrow keys or swipe to turn pages" className="relative mt-10 touch-pan-y [overflow-anchor:none] [perspective:2200px] sm:mt-12 md:mt-14">
          <article style={{ ["--accent" as string]: STORY_ACCENTS[activeStory % STORY_ACCENTS.length], ["--paper" as string]: STORY_PAPER, backgroundColor: "var(--paper)" }} className="no-img-zoom relative grid h-[110rem] grid-rows-[minmax(0,1.3fr)_minmax(0,1fr)] overflow-hidden rounded-[2px] text-foreground shadow-2xl sm:h-[82rem] md:h-[63rem] lg:h-[52rem] md:grid-cols-2 md:grid-rows-1 md:overflow-visible md:[transform-style:preserve-3d]">
              <div style={{ backgroundColor: "var(--paper)" }} className="relative flex min-h-0 flex-col overflow-hidden border-b border-foreground/15 px-6 pb-5 pt-6 sm:px-9 sm:pb-6 sm:pt-7 md:origin-right md:rotate-y-[1.35deg] md:rounded-l-[5px] md:border-b-0 md:px-10 md:pb-6 md:shadow-[-16px_18px_30px_color-mix(in_oklab,var(--foreground)_20%,transparent)] lg:px-14 lg:pt-8">
                <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent via-foreground/[0.035] to-foreground/15" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-foreground/[0.035] to-transparent" />
                <div className="mb-3 flex items-center justify-between border-y border-foreground/70 py-2 font-mono text-[8px] uppercase tracking-[0.24em] text-foreground/60">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="inline-block size-1.5 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                    Masters&apos; Union
                  </span>
                  <span>The founders&apos; issue · 2026</span>
                </div>
                <div className="flex items-start justify-between gap-5 border-b border-foreground/70 pb-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/55">Meet the founder</p>
                    <h3 className="mt-2 break-words pb-1 text-[clamp(2.1rem,4.6vw,4.7rem)] font-light leading-[1]">{story.name}</h3>
                  </div>
                  {media.logo && (
                    <span className="flex h-12 w-20 shrink-0 items-center justify-center p-1 sm:h-14 sm:w-24">
                      <img src={media.logo} alt={`${story.name} logo`} className="max-h-full max-w-full object-contain" />
                    </span>
                  )}
                </div>


                <p className="mt-3 bg-(--accent) px-4 py-3 text-[14px] font-semibold leading-[1.5] text-foreground">
                  {editorial.dek}
                </p>
                <div className="py-3">
                  <div className="grid grid-cols-3 items-center gap-x-5 gap-y-3 border-b border-foreground/20 pb-2 text-center">
                    {editorial.facts.map((fact) => (
                      <div key={fact.label} className="flex min-h-10 flex-col items-center justify-center">
                        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/45">{fact.label}</p>
                        <p className="mt-1 text-[12px] font-medium leading-[1.35]">{fact.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 columns-1 gap-7 space-y-2 text-[13px] leading-[1.62] text-foreground/80 sm:text-[14px] lg:columns-2 xl:text-[15px]">
                    {editorial.paragraphs.slice(0, 4).map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={`break-inside-avoid `}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex shrink-0 items-center justify-between border-t border-foreground/15 pt-3">
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => turnPage(-1)}
                    aria-label="Flip to previous founder story"
                    className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45 transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" strokeWidth={1.5} /> Previous
                  </button>
                </div>
                <span aria-hidden className="absolute bottom-0 right-0 size-10 bg-gradient-to-br from-background via-background to-foreground/10 shadow-[-5px_-5px_12px_var(--background)]" />
              </div>

              <div style={{ backgroundColor: "var(--paper)" }} className="relative flex min-h-0 flex-col overflow-hidden px-6 pb-5 pt-8 sm:px-9 sm:pb-6 sm:pt-10 md:origin-left md:-rotate-y-[1.35deg] md:rounded-r-[5px] md:pl-16 md:pr-10 md:shadow-[16px_18px_30px_color-mix(in_oklab,var(--foreground)_20%,transparent)] lg:pr-14">
                {(() => {
                  const rest = editorial.paragraphs.slice(4);
                  const header = (
                    <div className="mb-4 flex shrink-0 items-center justify-between gap-4 border-b border-foreground/20 pb-2">
                      <div aria-hidden className="h-px flex-grow bg-foreground/20" />
                      <span className="shrink-0 bg-(--accent) px-3 py-1 text-[11px] font-medium text-foreground">
                        {story.name} · continued
                      </span>
                    </div>
                  );
                  const quote = (big = false) => (
                    <div className={`px-5 py-5 ${activeStory % 3 === 2 ? "bg-foreground text-background" : "bg-(--accent) text-foreground"}`}>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-60">What they built</p>
                      <p className={`font-medium leading-[1.3] ${big ? "text-[1.35rem]" : "text-[1.1rem]"}`}>{story.product}</p>
                    </div>
                  );
                  const paras = (list: string[]) => list.map((p) => <p key={p}>{p}</p>);
                  const body = "text-[13px] leading-[1.62] text-foreground/80 xl:text-[14px]";
                  const imageBox = (extra = "") => (
                    <div className={`flex min-h-0 min-w-0 flex-col ${extra}`}>
                      <div className="relative min-h-0 flex-1 overflow-hidden bg-muted">
                        {image ? (
                          <img
                            src={image}
                            onLoad={(e) => setImageOrientation(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth ? "portrait" : "landscape")}
                            alt={`${story.founder}, founder of ${story.name}`}
                            className={`no-img-zoom h-full w-full ${story.name === "Bullspree" ? "object-cover object-[48%_50%]" : imageOrientation === "portrait" ? "object-contain" : "object-cover"}`}
                          />
                        ) : (
                          <Placeholder kind="image" aspect="h-full" note={story.name} className="!border-0" />
                        )}
                      </div>
                      <div className="mt-3 flex min-h-8 shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono uppercase leading-none tracking-[0.2em] text-foreground/45">
                        <span className="text-[8px]">Founder portrait</span>
                        <span aria-hidden className="text-[8px]">·</span>
                        <span className="truncate text-[11px]">{story.founder}</span>
                        <span aria-hidden className="text-[8px]">·</span>
                        <span className="shrink-0 text-[8px]">{story.cohort}</span>
                      </div>
                    </div>
                  );
                  const layout = activeStory % 7;
                  let content: ReactNode;
                  if (story.name === "SeedsAI") {
                    // Landscape-led field report: copy frames a wide founder photograph.
                    content = (
                      <>
                        {header}
                        <div className={`grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(0, 1))}</div>
                          <div>{quote()}</div>
                        </div>
                        {imageBox("my-4 min-h-[18rem] flex-1")}
                        <div className={`grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(1, 2))}</div>
                          <div className="space-y-3">{paras(rest.slice(2))}</div>
                        </div>
                      </>
                    );
                  } else if (layout === 0) {
                    // Text top, image bottom
                    content = (
                      <>
                        {header}
                        <div className={`grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(0, 2))}</div>
                          <div className="space-y-3">{paras(rest.slice(2))}{quote()}</div>
                        </div>
                        {imageBox("mt-5 flex-1")}
                      </>
                    );
                  } else if (layout === 1) {
                    // Image top, text bottom
                    content = (
                      <>
                        {imageBox("flex-1")}
                        <div className="mt-4">{header}</div>
                        <div className={`grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(0, 2))}</div>
                          <div className="space-y-3">{paras(rest.slice(2))}{quote()}</div>
                        </div>
                      </>
                    );
                  } else if (layout === 2 || layout === 3) {
                    // Tall image column beside a single text column
                    const text = (
                      <div className={`flex min-h-0 min-w-0 flex-col justify-center space-y-3 overflow-hidden ${body}`}>
                        {header}
                        {paras(rest)}
                        {quote()}
                      </div>
                    );
                    content = (
                      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
                        {layout === 2 ? <>{imageBox("min-h-[18rem] lg:min-h-0")}{text}</> : <>{text}{imageBox("min-h-[18rem] lg:min-h-0")}</>}
                      </div>
                    );
                  } else if (layout === 4) {
                    // Pull-quote lead, image, text below
                    content = (
                      <>
                        {header}
                        <div className="shrink-0">{quote(true)}</div>
                        {imageBox("mt-5 flex-1")}
                        <div className={`mt-4 grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(0, 2))}</div>
                          <div className="space-y-3">{paras(rest.slice(2))}</div>
                        </div>
                      </>
                    );
                  } else if (layout === 5) {
                    // Text sandwich — image framed between two text bands
                    content = (
                      <>
                        {header}
                        <div className={`shrink-0 space-y-3 ${body}`}>{paras(rest.slice(0, 1))}</div>
                        {imageBox("my-5 flex-1")}
                        <div className={`grid shrink-0 grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-7 ${body}`}>
                          <div className="space-y-3">{paras(rest.slice(1))}</div>
                          <div>{quote()}</div>
                        </div>
                      </>
                    );
                  } else {
                    // Wide column text beside an inset image stacked with the quote
                    content = (
                      <>
                        {header}
                        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-7">
                          <div className={`min-w-0 space-y-3 overflow-hidden ${body}`}>{paras(rest)}</div>
                          <div className="flex min-h-0 min-w-0 flex-col gap-5">
                            {imageBox("min-h-[16rem] flex-1 lg:min-h-0")}
                            {quote()}
                          </div>
                        </div>
                      </>
                    );
                  }
                  return <div className="flex min-h-0 flex-1 flex-col">{content}</div>;
                })()}
                <div className="mt-3 flex shrink-0 items-center justify-end border-t border-foreground/15 pt-3">
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => turnPage(1)}
                    aria-label="Go to next founder story"
                    className="group flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-foreground/45 transition-colors hover:text-foreground"
                  >
                    Next
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                </div>

                <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 bg-gradient-to-r from-foreground/25 via-foreground/8 to-transparent mix-blend-multiply md:block" />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-[4.5rem] -translate-x-1/2 md:block">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-foreground/[0.055] to-foreground/30 mix-blend-multiply" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-foreground/35 via-foreground/10 to-transparent mix-blend-multiply" />
                <div className="absolute inset-y-[1%] left-1/2 w-px -translate-x-1/2 bg-background/70 shadow-[0_0_12px_color-mix(in_oklab,var(--background)_80%,transparent)]" />
              </div>
              <div aria-hidden className="pointer-events-none absolute -top-2 left-1/2 z-30 hidden h-5 w-24 -translate-x-1/2 rounded-[50%] bg-foreground/35 blur-md md:block" />
              <div aria-hidden className="pointer-events-none absolute -bottom-3 left-1/2 z-30 hidden h-7 w-28 -translate-x-1/2 rounded-[50%] bg-foreground/50 blur-lg md:block" />
              <div aria-hidden className="pointer-events-none absolute inset-x-[2%] bottom-[-10px] -z-10 hidden h-8 rounded-[50%] bg-foreground/60 blur-lg md:block" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-3 hidden justify-between px-5 font-mono text-[8px] tracking-[0.2em] text-foreground/35 md:flex">
                <span>{String(activeStory * 2 + 12).padStart(2, "0")}</span>
                <span>{String(activeStory * 2 + 13).padStart(2, "0")}</span>
              </div>
          </article>

        </div>
      </div>
    </section>
  );
}

function Placeholder({
  kind,
  aspect,
  dark = false,
  note,
  className = "",
  src,
  alt,
}: {
  kind: "image" | "video" | "logo";
  aspect: string;
  dark?: boolean;
  note?: string;
  className?: string;
  src?: string;
  alt?: string;
}) {
  if (src) {
    return (
      <div
        className={`group relative w-full overflow-hidden ${aspect} ${className} ${
          "border border-background/15"
        }`}
      >
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  const Icon = kind === "video" ? Play : ImageIcon;
  return (
    <div
      className={`group relative w-full overflow-hidden ${aspect} ${className} ${
          "border border-background/15 bg-background/[0.035]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-background/[0.025] transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className={`flex size-12 items-center justify-center rounded-full border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${
            "border-background/30 bg-background/10 text-background"
          }`}
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </span>
        <span className="eyebrow text-background/50">
          {kind === "video" ? "Video Placeholder" : kind === "logo" ? "Logo Placeholder" : "Image Placeholder"}
        </span>
        {note && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-background/30">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}


function SparkCarousel({
  companies,
  active,
  onActiveChange,
}: {
  companies: typeof SPARK_EXAMPLES;
  active: number;
  onActiveChange: (index: number) => void;
}) {
  const storyRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const companyRailRef = useRef<HTMLDivElement>(null);
  const nameTrackRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLButtonElement>(null);
  const bsVideoScaleRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);
  const lastActiveRef = useRef(active);
  const lastTrackOffsetRef = useRef<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoOrigin, setVideoOrigin] = useState<DOMRect | null>(null);
  const [ytVideoId, setYtVideoId] = useState<string | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const count = companies.length;
  const company = companies[Math.min(active, count - 1)];

  const openVideo = () => {
    const card = videoCardRef.current;
    if (card) setVideoOrigin(card.getBoundingClientRect());
    setVideoModalOpen(true);
  };

  // "Building Starts Here" muted highlight loop: mirror the hero video's
  // play-readiness handling so autoplay survives browser policy quirks.
  const bsHighlightRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = bsHighlightRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    document.addEventListener("pointerdown", tryPlay, { once: true });
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("pointerdown", tryPlay);
    };
  }, []);

  useEffect(() => {
    lastActiveRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!ytVideoId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setYtVideoId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ytVideoId]);

  useEffect(() => {
    if (!videoModalOpen) return;
    const el = modalVideoRef.current;
    if (!el) return;
    const tryPlay = () => {
      void el.play().catch(() => {
        /* browser blocked playback — user can press play manually */
      });
    };
    if (el.readyState >= 3) {
      tryPlay();
      return;
    }
    el.addEventListener("canplay", tryPlay, { once: true });
    return () => el.removeEventListener("canplay", tryPlay);
  }, [videoModalOpen]);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const update = () => {
      scrollFrameRef.current = 0;
      const rect = story.getBoundingClientRect();
      const stickyHeight = stickyRef.current?.offsetHeight || window.innerHeight || 1;
      const scrollRange = Math.max(1, rect.height - stickyHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
      const rawIndex = progress * Math.max(1, count - 1);
      const nextActive = Math.min(count - 1, Math.max(0, Math.round(rawIndex)));
      const companyIndex = Math.min(rawIndex, count - 1);

      const rail = companyRailRef.current;
      const track = nameTrackRef.current;
      const firstItem = track?.children[0] as HTMLElement | undefined;
      if (rail && track && firstItem) {
        const offset = rail.clientHeight / 2 - firstItem.offsetHeight * (companyIndex + 0.5);
        if (lastTrackOffsetRef.current === null || Math.abs(offset - lastTrackOffsetRef.current) > 0.5) {
          lastTrackOffsetRef.current = offset;
          track.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      }

      if (nextActive !== lastActiveRef.current) {
        lastActiveRef.current = nextActive;
        onActiveChange(nextActive);
      }
    };

    const schedule = () => {
      if (!scrollFrameRef.current) scrollFrameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("orientationchange", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrameRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [count, onActiveChange]);

  // "The Building Starts Here" card: starts small, grows to full size as it
  // scrolls into view. Driven by the shared scroll driver, fully reversible.
  useEffect(() => {
    if (reduceMotion) return;
    const el = bsVideoScaleRef.current;
    if (!el) return;
    let scale = 0.45;
    const apply = () => {
      el.style.transform = `scale(${scale.toFixed(4)})`;
    };
    apply();
    return onScrollFrame(
      apply,
      () => {
        const vh = window.innerHeight || 1;
        const rect = el.getBoundingClientRect();
        // 0 when the card's top sits at the viewport bottom edge, 1 once the
        // card's vertical center reaches the viewport center.
        const start = vh;
        const end = vh / 2 - rect.height / 2;
        const p = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, start - end)));
        scale = 0.45 + 0.55 * (1 - (1 - p) * (1 - p));
      },
    );
  }, [reduceMotion]);

  const scrollToCompany = (index: number) => {
    const story = storyRef.current;
    if (!story || count <= 1) return;

    lastActiveRef.current = index;
    onActiveChange(index);

    const stickyHeight = stickyRef.current?.offsetHeight || window.innerHeight || 1;
    const scrollRange = Math.max(1, story.offsetHeight - stickyHeight);
    const storyTop = story.getBoundingClientRect().top + window.scrollY;
    const target = storyTop + scrollRange * (index / Math.max(1, count - 1));
    const lenis = (window as unknown as {
      __lenis?: { scrollTo?: (target: number, options?: { duration?: number; force?: boolean }) => void };
    }).__lenis;

    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { duration: reduceMotion ? 0 : 0.85, force: true });
      return;
    }

    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      {/* Warm the thumbnail cache ahead of the scroll so each card never
          flashes an empty frame while it slides in. */}
      <span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 size-px overflow-hidden opacity-0"
      >
        {companies.map((item) => (
          <img
            key={`preload-${item.videoId}`}
            src={`https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`}
            alt=""
          />
        ))}
      </span>
      <div
        ref={storyRef}
        className="relative mt-5 sm:mt-7 md:mt-8"
        style={{ height: `${count * 55}svh` }}
      >
        <div ref={stickyRef} className="sticky top-0 flex min-h-[100svh] items-end overflow-hidden pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+88px)] md:pt-4 md:pb-[84px] lg:pt-4 lg:pb-[84px]">
        <div className="w-full pt-0 sm:pt-1 md:pt-2 lg:pt-0">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(72px,0.28fr)_minmax(0,1fr)] items-stretch gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(120px,0.3fr)_minmax(0,1fr)] sm:gap-4 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.36fr)_minmax(0,1fr)] md:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.4fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-2 grid min-h-[2.75rem] text-center text-background/45 sm:mb-3 sm:min-h-[3rem]">
                {companies.map((item, index) => (
                  <span key={item.name} aria-hidden={index !== active} className={`col-start-1 row-start-1 self-end ${index === active ? "visible" : "invisible"}`}>
                    {item.cohort}
                  </span>
                ))}
              </div>
              <div className="relative overflow-hidden">
                <motion.div
                  key={`left-${active}`}
                  initial={reduceMotion ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Placeholder
                    kind="image"
                    aspect="aspect-[1200/896]"
                    src={company.founderImage}
                    alt={company.founderImage ? `${company.founder} — founders of ${company.name}` : undefined}
                    note={`${company.name} — founder at work`}
                  />
                </motion.div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/60 via-transparent to-foreground/90"
                />
                <span className="absolute -left-px -top-px z-20 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
                  Spark · {String(active + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="absolute right-3 top-3 z-20 hidden font-tech text-[9px] uppercase tracking-[0.18em] text-background/60 [writing-mode:vertical-rl] min-[700px]:inline-block"
                >
                  Spark // Founders
                </span>
                <span className="absolute inset-x-4 bottom-3 z-20 sm:bottom-4">
                  <span className="block font-display text-[clamp(0.8rem,1.6vw,1.3rem)] font-black italic leading-[1.05] text-background">
                    {company.name}
                  </span>
                  <span className="mt-2 hidden font-tech text-[9px] font-bold uppercase tracking-[0.18em] text-background/70 min-[700px]:block sm:text-[10px]">
                    {company.founder}
                  </span>
                </span>
              </div>
            </div>

            <div
              ref={companyRailRef}
              aria-label="Student venture story progression"
              className="relative h-[46svh] overflow-hidden text-center sm:h-[50svh] md:h-[56svh] lg:h-[60svh]"
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-3 top-1/2 z-[1] h-px -translate-y-1/2 bg-background/15" />
              <div
                ref={nameTrackRef}
                role="list"
                className="relative z-[2] w-full will-change-transform"
              >
                {companies.map((item, index) => (
                  <div key={item.name} role="listitem" className="flex min-h-[18svh] w-full shrink-0 items-center justify-center px-4 sm:min-h-[19svh] sm:px-6 md:min-h-[21svh] md:px-8 lg:min-h-[22svh]">
                    <button
                      type="button"
                      aria-current={index === active ? "step" : undefined}
                      onClick={() => scrollToCompany(index)}
                      className={`cursor-pointer pr-[0.08em] font-serif-italic text-[clamp(1.5rem,3.4vw,3rem)] leading-[1.04] text-background transition-[opacity,transform] duration-500 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 ${
                        index === active ? "scale-100 opacity-100" : "scale-[0.82] opacity-20"
                      }`}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-2 grid min-h-[2.75rem] text-center text-background/45 sm:mb-3 sm:min-h-[3rem]">
                {companies.map((item, index) => (
                  <span key={item.name} aria-hidden={index !== active} className={`col-start-1 row-start-1 self-end ${index === active ? "visible" : "invisible"}`}>
                    {item.product}
                  </span>
                ))}
              </div>
              <div className="relative overflow-hidden">
                <motion.div
                  key={`right-${active}`}
                  initial={reduceMotion ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setYtVideoId(company.videoId)}
                    aria-label={`Play video: ${company.videoTitle}`}
                    className="group relative block aspect-[1200/896] w-full cursor-pointer overflow-hidden border border-background/15 bg-black/40 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60"
                  >
                    <span aria-hidden className="absolute inset-0 overflow-hidden">
                      <img
                        src={`https://i.ytimg.com/vi/${company.videoId}/maxresdefault.jpg`}
                        onError={(event) => {
                          const img = event.currentTarget;
                          if (!img.dataset.fallback) {
                            img.dataset.fallback = "1";
                            img.src = `https://i.ytimg.com/vi/${company.videoId}/hqdefault.jpg`;
                          }
                        }}
                        alt=""
                        className="h-full w-full scale-[1.35] object-cover blur-[26px] brightness-[0.8]"
                      />
                    </span>
                    <img
                      src={`https://i.ytimg.com/vi/${company.videoId}/maxresdefault.jpg`}
                      onError={(event) => {
                        const img = event.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = "1";
                          img.src = `https://i.ytimg.com/vi/${company.videoId}/hqdefault.jpg`;
                        }
                      }}
                      alt={`${company.name} — ${company.videoTitle}`}
                      className="absolute inset-0 h-full w-full object-contain transition-[filter] duration-500 group-hover:brightness-[1.06]"
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    <span aria-hidden className="absolute inset-0 grid place-items-center">
                      <span className="grid size-9 place-items-center bg-accent text-accent-foreground sm:size-10 lg:size-14">
                        <Play className="fill-current" />
                      </span>
                    </span>
                    <span className="absolute -left-px -top-px z-20 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
                      Spark · {String(active + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="absolute right-3 top-3 z-20 hidden font-tech text-[9px] uppercase tracking-[0.18em] text-background/60 [writing-mode:vertical-rl] min-[700px]:inline-block"
                    >
                      Spark // Film
                    </span>
                    <span className="absolute inset-x-4 bottom-3 z-20 flex flex-col gap-2 sm:bottom-4">
                      <span className="hidden font-display text-[clamp(0.7rem,1.2vw,1.3rem)] font-light italic leading-[1.15] text-background min-[700px]:block min-[700px]:max-h-[2.4em] min-[700px]:overflow-hidden">
                        {company.videoTitle}
                      </span>
                      <span className="font-tech text-[9px] font-bold uppercase tracking-[0.18em] text-background/70 sm:text-[10px]">
                        Watch the film
                      </span>
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-2.5 max-w-5xl border-t border-background/15 pt-8 text-center sm:mt-4 sm:pt-10">
            <div className="mx-auto grid max-w-4xl rounded-[6px] border border-background/15 bg-background/[0.03] px-5 py-4 sm:px-8 sm:py-5">
              {companies.map((item, index) => (
                <div
                  key={item.name}
                  aria-hidden={index !== active}
                  className={`col-start-1 row-start-1 flex flex-col justify-center ${index === active ? "visible" : "invisible"}`}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/50">
                    {item.founder}
                  </div>
                  <p className="mx-auto mt-2.5 max-w-[60ch] text-[0.98rem] leading-[1.6] text-background/70 sm:mt-3 md:text-[1.05rem] md:leading-[1.65]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full text-center"
      >
            <div
              role="separator"
              aria-hidden="true"
              className="mx-auto mt-10 h-px w-full max-w-4xl bg-background/15 sm:mt-12"
            />
            <div className="eyebrow mx-auto mt-10 text-background/50 sm:mt-12">The Building Starts Here</div>
            <p className="mx-auto mt-3 max-w-3xl font-serif-italic !font-serif !font-light !text-white text-[clamp(1.15rem,2.2vw,1.6rem)] leading-[1.35] sm:mt-4">
              Fueling the next generation of founders, where
              <br />
              ideas turn into ventures &amp;
              <br />
              students become entrepreneurs.
            </p>
            <div ref={bsVideoScaleRef} className="will-change-transform" style={{ transformOrigin: "center center" }}>
            <button
              ref={videoCardRef}
              type="button"
              onClick={openVideo}
              aria-label="Watch the Masters' Union student entrepreneurship video"
              className="group mx-auto mt-10 block w-full overflow-hidden border border-background/15 text-left transition-transform duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 sm:mt-12 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl"
            >
              <span className="relative block aspect-video w-full overflow-hidden">
                {/* muted highlight loop autoplays on the card; the play
                    button still opens the full video with sound */}
                {reduceMotion ? (
                  <img
                    src={sparkVideoThumb}
                    alt="Students presenting on stage at Masters' Union"
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                ) : (
                  <video
                    poster={sparkVideoThumb}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    tabIndex={-1}
                    aria-hidden="true"
                    ref={bsHighlightRef}
                    className="pointer-events-none absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  >
                    <source src={bsHighlightVideo} type="video/mp4" />
                    <source src={bsHighlightVideoWebm} type="video/webm" />
                  </video>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-9 place-items-center bg-accent text-accent-foreground sm:size-10 lg:size-14">
                    <Play className="fill-current" />
                  </span>
                </span>
                <span className="absolute -left-px -top-px z-20 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
                  Masters&apos; Union
                </span>
                <span
                  aria-hidden
                  className="absolute right-3 top-3 z-20 hidden font-tech text-[9px] uppercase tracking-[0.18em] text-background/60 [writing-mode:vertical-rl] min-[700px]:inline-block"
                >
                  Spark // Film
                </span>
                <span className="absolute inset-x-4 bottom-3 z-20 flex flex-col gap-2 sm:bottom-4">
                  <span className="font-display text-[clamp(0.8rem,1.6vw,1.5rem)] font-light italic leading-[1.15] text-background min-[700px]:max-h-[2.4em] min-[700px]:overflow-hidden">
                    The Building Starts Here
                  </span>
                  <span className="font-tech text-[9px] font-bold uppercase tracking-[0.18em] text-background/70 sm:text-[10px]">
                    Full film
                  </span>
                </span>
              </span>
            </button>
            </div>
            <div
              aria-label="Student venture journey"
              className="mx-auto mt-8 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:mt-10 sm:gap-x-4"
            >
              {["Pre-Seed", "MVP", "Go-to-Market", "PMF", "Demo Day"].map((stage, i, arr) => (
                <div key={stage} className="flex items-center gap-3 sm:gap-4">
                  <span className="eyebrow text-background/60">{stage}</span>
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" className="h-px w-6 bg-background/25 sm:w-8" />
                  )}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-4 gap-px overflow-hidden rounded-2xl border border-background/10 bg-background/10 sm:mt-12 md:grid-cols-8">
                {SPARK_VENTURE_LOGOS.map((logo) => {
                  const name = logo.original_filename.replace(/\.png$/i, "");
                  return (
                    <div
                      key={logo.url}
                      className="group flex h-16 items-center justify-center bg-foreground px-2 transition-colors duration-300 hover:bg-background/10 sm:h-[92px] sm:px-4"
                    >
                      <img
                        decoding="async"
                        src={logo.url}
                        alt={name}
                        title={name}
                        loading="lazy"
                        className="no-img-zoom max-h-11 w-auto max-w-[92%] object-contain opacity-90 brightness-0 invert transition duration-300 group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                  );
                })}
            </div>
      </motion.div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
          {videoModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Masters' Union student entrepreneurship video"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={
                reduceMotion || !videoOrigin
                  ? false
                  : {
                      left: videoOrigin.left,
                      top: videoOrigin.top,
                      width: videoOrigin.width,
                      height: videoOrigin.height,
                      borderRadius: 6,
                    }
              }
              animate={{
                left: "50%",
                top: "50%",
                width: "min(calc(100vw - 2rem), 64rem)",
                height: "auto",
                x: "-50%",
                y: "-50%",
                borderRadius: 6,
              }}
              exit={
                reduceMotion || !videoOrigin
                  ? { opacity: 0 }
                  : {
                      left: videoOrigin.left,
                      top: videoOrigin.top,
                      width: videoOrigin.width,
                      height: videoOrigin.height,
                      x: 0,
                      y: 0,
                      borderRadius: 6,
                    }
              }
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed aspect-video overflow-hidden border border-background/15 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                aria-label="Masters' Union student entrepreneurship video"
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="block aspect-video h-auto w-full max-w-full bg-black object-contain"
              >
                <source src={studentEntrepreneurshipVideo.url} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </motion.div>
            <motion.button
              type="button"
              aria-label="Close video"
              onClick={() => setVideoModalOpen(false)}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.2 }}
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
            >
              <X className="size-5" strokeWidth={2} />
            </motion.button>
          </motion.div>
          )}
          </AnimatePresence>,
          document.body
        )}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {ytVideoId && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${company.name} video`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
                onClick={() => setYtVideoId(null)}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-video w-full max-w-5xl overflow-hidden rounded-[6px] border border-white/15 bg-black shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
                    title={`${company.name} — video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </motion.div>
                <motion.button
                  type="button"
                  aria-label="Close video"
                  onClick={() => setYtVideoId(null)}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.2 }}
                  className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
                >
                  <X className="size-5" strokeWidth={2} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function QuoteWall({ people }: { people: typeof TESTIMONIALS }) {
  const [lead, ...rest] = people;

  return (
    <div className="mt-8 sm:mt-10 md:mt-12">
      <div className="flex items-center justify-between gap-6 border-t border-background/15 pt-4">
        <span className="eyebrow text-background/45">In the room</span>
        <span className="eyebrow shrink-0 text-background/45">
          {String(people.length).padStart(2, "0")} voices
        </span>
      </div>

      <Reveal className="mt-9 sm:mt-11 md:mt-14">
        <figure className="grid grid-cols-1 items-end gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.9fr)] lg:gap-14">
          <figcaption className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
            <PortraitBadge
              src={lead.photo}
              alt={lead.photo ? `${lead.name} — ${lead.role}` : undefined}
              size="size-12 sm:size-14"
            />
            <span className="min-w-0">
              <span className="block font-display text-[clamp(1.15rem,1.9vw,1.6rem)] font-semibold leading-[1.1] tracking-tight">
                {lead.name}
              </span>
              <span className="eyebrow mt-2 block text-background/50">{lead.role}</span>
            </span>
          </figcaption>
          <blockquote className="min-w-0 text-balance font-serif-italic !font-serif !font-light !text-background/95 text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32]">
            <span aria-hidden className="mr-1 align-top font-serif text-[1.4em] leading-[0] !text-background/95">
              &ldquo;
            </span>
            {lead.quote}
          </blockquote>
        </figure>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-9 sm:mt-12 sm:grid-cols-2 sm:gap-y-10 md:mt-16 md:gap-x-9 lg:grid-cols-3 lg:gap-x-12">
        {rest.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.06}
            className={i === rest.length - 1 ? "h-full sm:col-span-2 lg:col-span-1" : "h-full"}
          >
            <figure className="group flex h-full flex-col transition-transform duration-500 ease-out hover:-translate-y-1">
              <div className="relative border-t border-background/15 pt-4">
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-0 bg-bottle transition-[width] duration-500 ease-out group-hover:w-full"
                />
                <span className="eyebrow text-background/40">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <blockquote className="mt-4 max-w-[80ch] grow font-serif-italic !font-serif !font-light !text-background/85 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.6]">
                {p.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-background/10 pt-4">
                <PortraitBadge
                  src={p.photo}
                  alt={p.photo ? `${p.name} — ${p.role}` : undefined}
                  size="size-9 sm:size-10"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-background/90">
                    {p.name}
                  </span>
                  <span className="eyebrow mt-1 block truncate text-background/45">{p.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoryBeats({ beats, dark = false }: { beats: Beat[]; dark?: boolean }) {
  return (
    <ol className="mt-2 space-y-6 sm:space-y-7 md:space-y-8">
      {beats.map((b, i) => (
        <Reveal key={b.stage} delay={i * 0.05} className="break-inside-avoid">
          <li
            className={`flex gap-4 border-t pt-5 first:border-t-0 first:pt-0 sm:gap-5 sm:pt-6 ${
              "border-background/10"
            }`}
          >
            <span className="eyebrow shrink-0 text-background/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="eyebrow text-background/70">{b.stage}</div>
              <p className="mt-2 max-w-[58ch] text-[0.96rem] leading-[1.6] text-background/75 sm:text-[1rem] md:text-[1.02rem] md:leading-[1.65]">
                {b.body}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

const OUTCLASS_D2C_STATS = [
  { value: "₹3.38 Cr", label: "Total revenue generated, Cohort '25" },
  { value: "50", label: "Teams competing simultaneously" },
  { value: "₹4L+", label: "Average revenue per team, Term 1" },
];

const OUTCLASS_TRACKS = [
  {
    title: "Build a D2C Brand",
    body: "Every student ships a live consumer brand — sourced, launched and scaled on Amazon, Blinkit, Instagram and their own store. Graded on real customers and real revenue, not slides.",
  },
  {
    title: "Creator Challenge",
    body: "From Term 2, every student builds a personal brand on YouTube, Instagram or LinkedIn — scripting, filming, editing and distributing weekly. Graded on real audience growth in the wild.",
  },
];

const OUTCLASS_SESSIONS = [
  { id: "B_Uh5V4xD4k", image: outclassB_Uh5V4xD4k.url, title: "Tanmay Bhat on campus", type: "Masterclass", body: "A masterclass on virality. Tanmay breaks down what makes content spread — hook structures, format design, and the repeatable systems behind hit videos." },
  { id: "0sMWviewwqs", image: outclass0sMWviewwqs.url, title: "Nas Daily fireside chat", type: "Fireside chat", body: "Nuseir Yassin on how AI is transforming business, content creation, and the future of work — and what creators should build next." },
  { id: "YMfW0nRii3s", image: outclassYMfW0nRii3s.url, title: "Sahiba Bali on the creator economy", type: "Fireside chat", body: "Marketing, personal branding, consumer psychology, entrepreneurship, and career growth in the AI era — a sharp take on building in public." },
  { id: "dng2KDh5_LA", image: outclassdng2KDh5_LA.url, title: "Sharan Hegde masterclass", type: "Masterclass", body: "How money truly works and why most financial decisions fail in the long run — a practical framework for thinking about wealth." },
];

function OutclassTrackHead({ index }: { index: number }) {
  const track = OUTCLASS_TRACKS[index];
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <span className="inline-block bg-background px-2.5 py-1 font-tech text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground">Track {String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[0.98]">{track.title}</h3>
      </div>
      <div className="lg:col-span-6 lg:pt-2">
        <div aria-hidden className="h-px bg-background/20" />
        <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-background/55">{track.body}</p>
      </div>
    </div>
  );
}

function OutclassRail({ children, label, paged = false }: { children: ReactNode; label: string; paged?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const items = Array.from(el.children) as HTMLElement[];
      setCount(items.length);
      let nearest = 0;
      items.forEach((item, i) => {
        if (Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft) < Math.abs(items[nearest].offsetLeft - el.offsetLeft - el.scrollLeft)) nearest = i;
      });
      setActive(nearest);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const goTo = (i: number) => {
    const el = rail.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: reduceMotion ? "instant" : "smooth" });
  };
  return (
    <div className="relative mt-8 min-w-0">
      <div ref={rail} aria-label={label} className="relative flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] [&>*]:snap-start">{children}</div>
      <div className="mt-4 flex items-center justify-between gap-4">
        {paged ? <div className="flex items-center gap-2">{Array.from({ length: count }, (_, i) => <Button key={i} type="button" variant="ghost" size="icon" aria-label={`Go to slide ${i + 1}`} aria-current={active === i ? "true" : undefined} onClick={() => goTo(i)} className="h-8 w-8 rounded-none p-0 hover:bg-background/10"><span className={`h-[3px] ${active === i ? "w-7 bg-background" : "w-4 bg-background/30"}`} /></Button>)}</div> : <p className="font-tech text-[9px] uppercase tracking-[0.24em] text-background/55">{label}</p>}
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" aria-label={`Previous ${label}`} disabled={active === 0} onClick={() => goTo(active - 1)} className="rounded-none text-background hover:bg-background/10 hover:text-background"><ArrowLeft /></Button>
          <Button type="button" variant="ghost" size="icon" aria-label={`Next ${label}`} disabled={active === count - 1} onClick={() => goTo(active + 1)} className="rounded-none text-background hover:bg-background/10 hover:text-background"><ArrowRight /></Button>
        </div>
      </div>
    </div>
  );
}

function OutclassSection() {
  const [videoId, setVideoId] = useState<string | null>(null);
  useEffect(() => {
    if (!videoId) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setVideoId(null); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [videoId]);
  const poster = "relative flex aspect-[3/4] w-[min(78vw,300px)] shrink-0 flex-col justify-between overflow-hidden p-6 sm:w-[330px] lg:w-[380px]";
  return (
    <section id="doing" className="relative overflow-hidden bg-foreground py-16 text-background sm:py-20">
      <div aria-hidden className="spectrum-rule pointer-events-none absolute left-[6%] right-[6%] top-0 h-px" />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-12">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-start gap-4">
              <EyebrowRule />
              <span className="flex min-w-0 items-start gap-2"><Compass className="size-4 shrink-0 text-background/55" strokeWidth={1.75} aria-hidden /><p className="font-tech text-[11px] uppercase tracking-[0.32em] text-background/60">OutClass</p></span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[0.98]">Learning outside<br />the classroom</h2>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <div aria-hidden className="h-px bg-background/20" />
            <p className="mt-4 text-[13.5px] leading-relaxed text-background/55">OutClass is where classroom theory meets the real world. Every term, you build live ventures, create under pressure and ship to real customers — graded on outcomes in the market, not marks on a sheet.</p>
          </div>
        </Reveal>

        <Reveal className="mt-12 border-t border-background/15 pt-8">
          <OutclassTrackHead index={0} />
          <OutclassRail label="D2C brand posters" paged>
            <article className={`${poster} bg-bottle`}>
              <img src={outclassd2cBrandFair.url} alt="Student D2C brand fair" loading="lazy" className="absolute inset-0 size-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-bottle/50 via-bottle/80 to-bottle" />
              <div className="relative flex justify-between"><div><div className="font-display text-[3.2rem] font-black leading-none">01</div><div className="font-tech text-[10px] uppercase tracking-[0.2em]">Overview</div></div><span className="font-tech text-[10px] uppercase [writing-mode:vertical-rl]">OutClass // D2C</span></div>
              <div className="relative"><h4 className="font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold leading-[0.98]">Graded on real customers<br /><em className="font-light">and revenue.</em></h4><div className="my-4 h-px bg-background/25" /><p className="text-[12.5px] leading-relaxed text-background/75">Every student ships a live consumer brand — sourced, launched and scaled on Amazon, Blinkit, Instagram and their own store.</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-background/20 pt-4">{OUTCLASS_D2C_STATS.map(stat => <div key={stat.value}><p className="font-display text-[1.2rem] font-semibold">{stat.value}</p><p className="font-tech text-[9px] uppercase leading-snug text-background/70">{stat.label}</p></div>)}</div></div>
            </article>
            <article className={`${poster} bg-destructive`}>
              <img src={outclassmelaFounders.url} alt="Founders at the D2C Mela" loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-destructive/50" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="relative"><span className="bg-accent px-2 py-1 font-tech text-[9px] font-bold uppercase text-accent-foreground">Past D2C Mela</span><h4 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-black uppercase leading-[0.85]">Brands<br />Sold.</h4></div><div className="relative flex items-end justify-between gap-4"><p className="max-w-[220px] font-tech text-[10px] font-bold uppercase leading-snug">Founders behind the counter, products on the shelf, cash at the till — every stall is a student-run brand selling to paying customers.</p><span className="font-display text-6xl font-black italic opacity-25">02</span></div>
            </article>
            <article className="relative aspect-[9/16] w-[min(56vw,214px)] shrink-0 overflow-hidden bg-accent sm:w-[236px] lg:w-[272px]"><video src={outclassmelaVideo.url} autoPlay muted loop playsInline preload="metadata" aria-label="D2C Mela film" className="absolute inset-0 size-full object-cover" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-foreground/40" /><span className="absolute left-0 top-0 bg-accent px-3 py-1 font-tech text-[9px] font-bold uppercase text-accent-foreground">D2C Mela Film</span><div className="absolute inset-x-5 bottom-5"><h4 className="font-display text-2xl font-semibold italic">Mela, in motion</h4><p className="mt-2 font-tech text-[9px] uppercase">Series 01-C · 03</p></div></article>
            <article className={`${poster} bg-foreground`}><div className="flex items-center justify-between"><span className="h-0.5 w-12 bg-accent" /><span className="font-tech text-[10px] uppercase text-background/60">Gallery · 4 Frames</span></div><div className="mt-4 grid min-h-0 flex-1 grid-cols-6 grid-rows-6 gap-2">{[[outclassfairCeramics.url,"col-span-3 row-span-3"],[outclassfairJewels.url,"col-span-3 row-span-2"],[outclassfairCrafts.url,"col-span-3 row-span-4"],[outclassfairNight.url,"col-span-3 row-span-3"]].map(([src, cls]) => <img key={src} src={src} alt="Student products at the D2C Mela" loading="lazy" className={`size-full min-h-0 object-cover ${cls}`} />)}</div><h4 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-black uppercase leading-[0.9]">Shelves, <em className="font-light normal-case">stalls & sell-outs.</em></h4></article>
          </OutclassRail>
        </Reveal>

        <Reveal className="mt-12 border-t border-background/15 pt-8">
          <OutclassTrackHead index={1} />
          <OutclassRail label="Creator Challenge posters" paged>
            <article className={`${poster} bg-bottle`}><img src={outclasscreator1.url} alt="Student creator at work" loading="lazy" className="absolute inset-0 size-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" /><span className="relative self-start bg-destructive px-2 py-1 font-tech text-[9px] font-bold uppercase">00 // Intro</span><div className="relative"><h4 className="font-display text-[2.6rem] font-black italic leading-none">The Brief.</h4><p className="mt-5 font-tech text-[10px] uppercase leading-relaxed">Build an audience. Not just a deck. Graded on reach, retention and revenue.</p></div></article>
            <article className={`${poster} bg-foreground`}><img src={outclasscreator2.url} alt="Creator Challenge onboarding" loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-transparent to-foreground/90" /><div className="relative flex justify-between"><span className="font-display text-[3.2rem] font-black">01</span><span className="font-tech text-[10px] uppercase [writing-mode:vertical-rl]">OutClass // Onboarding</span></div><div className="relative"><h4 className="font-display text-[2rem] font-semibold">Onboarding <em className="font-light">& Setup.</em></h4><div className="my-4 h-px bg-background/30" /><p className="font-tech text-[10px] uppercase leading-relaxed">Creative vision on the table, mentor matched, workflow defined.</p></div></article>
            <article className={`${poster} bg-primary`}><img src={outclasscreator7.url} alt="Student creating content" loading="lazy" className="absolute inset-0 size-full object-cover opacity-55" /><div className="absolute inset-0 bg-primary/35" /><div className="relative"><span className="bg-accent px-2 py-1 font-tech text-[9px] font-bold uppercase text-accent-foreground">Phase Two</span><h4 className="mt-4 font-display text-[2.3rem] font-black uppercase leading-none">Content Dev.</h4></div><div className="relative flex items-end justify-between"><p className="max-w-[220px] font-tech text-[10px] font-bold uppercase leading-snug">Crafting bold narratives for the modern algorithm.</p><span className="font-display text-5xl font-black italic opacity-25">02</span></div></article>
            <article className={`${poster} bg-foreground`}><div className="flex items-center justify-between"><span className="h-0.5 w-12 bg-destructive" /><span className="font-tech text-[10px] uppercase text-background/70">Finale</span></div><h4 className="text-center font-serif text-[1.8rem] italic leading-[1.1]">Evaluation & <strong className="block font-display not-italic text-destructive">Recognition</strong></h4><div className="bg-background p-4 font-tech text-[9px] font-bold uppercase leading-snug text-foreground">Showcase before expert judges. Standout teams win ₹1L+ in recognition.</div></article>
          </OutclassRail>
        </Reveal>

        <Reveal className="mt-10 border-t border-background/15 pt-8">
          <div className="grid gap-6 lg:grid-cols-12"><div className="lg:col-span-6"><span className="bg-background px-2.5 py-1 font-tech text-[9px] font-semibold uppercase text-foreground">Series 02</span><h3 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-none">Creator Sessions</h3></div><div className="lg:col-span-6 lg:pt-2"><div className="h-px bg-background/20" /><p className="mt-4 text-[13.5px] leading-relaxed text-background/55">India’s biggest creators — across finance, comedy, tech and business — come on campus to teach how audiences are actually built.</p></div></div>
          <OutclassRail label="Creator sessions">{OUTCLASS_SESSIONS.map((session, i) => <article key={session.id} className="w-[min(84vw,320px)] shrink-0 sm:w-[420px] lg:w-[480px]"><Button type="button" variant="ghost" aria-label={`Play ${session.title}`} onClick={() => setVideoId(session.id)} className="group relative block aspect-video h-auto w-full overflow-hidden rounded-none p-0"><img src={session.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-opacity group-hover:opacity-75" /><span className="absolute inset-0 grid place-items-center"><span className="grid size-14 place-items-center bg-accent text-accent-foreground"><Play className="fill-current" /></span></span><span className="absolute left-0 top-0 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">{session.type}</span></Button><h4 className="mt-5 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-semibold leading-[1.05]">{session.title}</h4><div className="mt-3 flex items-center gap-3"><span className="font-tech text-[10px] font-bold uppercase">Session {String(i + 1).padStart(2, "0")}</span><span className="h-px flex-1 bg-background/20" /></div><p className="mt-3 text-[13px] leading-relaxed text-background/55">{session.body}</p></article>)}</OutclassRail>
        </Reveal>
      </div>
      {videoId && typeof document !== "undefined" && createPortal(<div role="dialog" aria-modal="true" aria-label="Creator session video" className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4" onClick={() => setVideoId(null)}><Button type="button" variant="ghost" size="icon" aria-label="Close video" onClick={() => setVideoId(null)} className="absolute right-4 top-4 text-background hover:bg-background/10 hover:text-background"><X /></Button><div className="aspect-video w-full max-w-5xl overflow-hidden" onClick={event => event.stopPropagation()}><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title="Creator session" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="size-full" /></div></div>, document.body)}
    </section>
  );
}

function FounderPoster({ v, ratio }: { v: VentureTile; ratio: string }) {
  return (
    <article className={`group relative ${ratio} overflow-hidden break-inside-avoid border border-background/10 bg-foreground transition-all duration-500 hover:-translate-y-1 hover:border-accent/50`}>
      <span aria-hidden className="absolute inset-x-0 top-0 z-30 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      {v.photo ? (
        <img
          src={v.photo}
          alt={`${v.company} founders`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover object-[50%_30%]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-foreground px-5">
          {v.logo ? (
            <img
              src={v.logo.url}
              alt={`${v.company} logo`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-auto max-h-[28%] w-[72%] object-contain brightness-0 invert"
            />
          ) : (
            <span className="max-w-full text-center font-display text-[clamp(1.1rem,2.5vw,2rem)] font-semibold text-background">
              {v.company}
            </span>
          )}
        </div>
      )}

      {/* top gradient wash for logo + stage */}
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-black/70 via-black/25 to-transparent sm:h-[28%]" />

      {/* top meta */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-1 px-2 pt-1.5 sm:gap-3 sm:px-4 sm:pt-3">
        {v.logo ? (
          <img
            src={v.logo.url}
            alt={v.company}
            loading="lazy"
            draggable={false}
            className="h-2.5 w-auto max-w-[46px] object-contain object-left brightness-0 invert opacity-90 sm:h-3.5 sm:max-w-[92px]"
          />
        ) : (
          <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/90 sm:text-[10px]">
            {v.company}
          </span>
        )}
        <span className="hidden text-[10px] uppercase tracking-[0.16em] text-white/80 sm:inline-block">
          {v.stage}
        </span>
      </div>

      {/* bottom gradient wash for caption */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/95 via-black/65 to-transparent" />

      {/* caption block overlaid on the photo */}
      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex min-w-0 items-end justify-between gap-2">
          <p className="min-w-0 font-display text-[clamp(0.95rem,2vw,1.35rem)] font-medium leading-none text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {v.company}
          </p>
          <p className="shrink-0 font-tech text-[8px] font-bold leading-none text-white sm:text-[10px]">
            {v.raised}
          </p>
        </div>
        <p className="mt-1.5 font-tech text-[8px] uppercase leading-tight text-white/75 sm:text-[9px]">
          {v.sector}
        </p>
        <p className="mt-2 line-clamp-2 text-[9px] leading-[1.3] text-white/85 sm:text-[11px]">
          {v.description}
        </p>
        <p className="mt-1.5 line-clamp-2 font-tech text-[7px] uppercase leading-[1.25] text-white/60 sm:text-[8px]">
          {v.founder}
        </p>
      </div>
    </article>
  );
}

function StatPoster({ s, ratio }: { s: StatTile; ratio: string }) {
  return (
    <article
      className={`relative flex ${ratio} flex-col justify-between break-inside-avoid border border-background/10 p-3 sm:p-5`}
      style={{ background: s.bg, color: s.fg }}
    >
      <div className="hidden items-start justify-between gap-3 sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: s.sub }}>
          {s.note}
        </span>
        {s.delta ? (
          <span
            className="rounded-full border px-2 py-[3px] text-[9px] font-medium tracking-[0.06em]"
            style={{ borderColor: s.sub, color: s.sub }}
          >
            {s.delta}
          </span>
        ) : null}
      </div>

      <div>
        <p className="whitespace-nowrap text-base font-medium leading-none sm:text-[clamp(2.2rem,5.5vw,3.6rem)] sm:tracking-[-0.05em]">
          {s.value}
        </p>
        <p className="mt-1.5 max-w-[15ch] text-[10px] leading-[1.2] sm:mt-3 sm:text-[clamp(0.95rem,1.5vw,1.3rem)] sm:tracking-[-0.02em]">
          {s.label}
        </p>
      </div>

      <span className="hidden text-[11px] uppercase tracking-[0.18em] sm:block" style={{ color: s.sub }}>
        Masters&rsquo; Union
      </span>
    </article>
  );
}

function VentureCtaTile({ t, ratio }: { t: CtaTile; ratio: string }) {
  return (
    <a
      href={t.to}
      className={`group relative flex ${ratio} flex-col items-start justify-between overflow-hidden break-inside-avoid p-3 transition-transform duration-500 hover:scale-[1.01] sm:p-5`}
      style={{ background: t.bg, color: t.fg, border: t.border ? `1px solid ${t.border}` : undefined }}
    >
      <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] sm:block" style={{ color: t.sub }}>
        Entrepreneurship
      </span>

      <div className="min-w-0">
        <p className="text-base font-medium leading-none sm:text-[clamp(1.6rem,4.2vw,2.7rem)] sm:tracking-[-0.04em]">
          {t.headline}
        </p>
        <p className="mt-1.5 max-w-[18ch] text-[9px] leading-[1.2] sm:mt-2 sm:text-[clamp(0.85rem,1.3vw,1.05rem)] sm:leading-[1.25]" style={{ color: t.sub }}>
          {t.body}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5 sm:mt-5 sm:gap-2">
        <span className="text-[7px] font-semibold uppercase tracking-[0.06em] min-[360px]:text-[8px] sm:text-[11px] sm:tracking-[0.14em]">{t.cta}</span>
        <span
          className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-7"
          style={{ borderColor: t.sub }}
        >
          <ArrowUpRight className="size-3 sm:size-3.5" />
        </span>
      </div>
    </a>
  );
}

function DropshippingSection() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const modalVideo = DROPSHIPPING_VIDEOS.find((v) => v.id === activeVideoId) ?? null;
  useEffect(() => {
    if (!activeVideoId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveVideoId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideoId]);
  const [, setActiveVideo] = useState(0);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const videoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();


  useEffect(() => {
    const geometry = { top: 0, height: 1, w0: 0, h0: 0, center0: 0, containerH: 0, ws: 0, hs: 0 };
    let riseLatch = 0;
    let activeLatch = 0;
    const measure = () => {
      const collage = collageRef.current;
      if (!collage) return;
      const rect = collage.getBoundingClientRect();
      geometry.top = rect.top;
      geometry.height = rect.height;
      const main = videoCardRefs.current[0];
      if (main) {
        geometry.w0 = main.offsetWidth;
        geometry.h0 = main.offsetHeight;
        geometry.center0 = main.offsetTop + main.offsetHeight / 2;
        geometry.containerH = (main.offsetParent as HTMLElement | null)?.clientHeight ?? 0;
      }
      // Side cards are sized via inline width (never scaled with transforms), so
      // their base CSS size is derived analytically to stay correct on resize.
      const ivw = window.innerWidth;
      geometry.ws = ivw < 640 ? Math.min(ivw * 0.66, 340) : Math.min(ivw * 0.35, 360);
      geometry.hs = geometry.ws * (4 / 3);
    };

    return onScrollFrame(({ vh, vw }) => {
      // Reveal only once the section has risen at least 50% of the way to the
      // top of the screen (its top edge at ~50% of the viewport height). The
      // latch below keeps the reveal complete when the user scrolls back up.
      const entryStart = vh * 0.5;
      // Slower reveal: the rise now plays out over roughly twice the scroll
      // distance so the cards drift into place instead of snapping.
      const entryDistance = Math.max(1, vh * 0.6);
      const progress = prefersReducedMotion
        ? 1
        : Math.min(1, Math.max(0, (entryStart - geometry.top) / entryDistance));
      const compact = vw < 768;
      const revealProgress = Math.min(1, Math.max(0, (progress - 0.03) / 0.94));
      activeLatch = Math.max(activeLatch, Math.min(4, Math.floor(revealProgress * 5)));
      setActiveVideo((current) => current === activeLatch ? current : activeLatch);
      // Geometry-driven layout: side cards form an even 2x2 grid flanking card 1,
      // vertically centered on card 1 with identical gaps everywhere.
      const { w0, h0, ws, hs } = geometry;
      const containerH = geometry.containerH || vh;
      const gap = Math.min(28, Math.max(12, vw * 0.018));
      const edge = compact ? 12 : Math.min(48, Math.max(20, vw * 0.03));
      // Top margin clears the "Field Film / Build in public" label row;
      // bottom margin clears the floating bottom navigation bar.
      const topSafe = compact ? 116 : vw < 1024 ? 144 : 156;
      const bottomSafe = compact ? 76 : vw < 1024 ? 80 : 88;
      const desktop = vw >= 1024;
      const mainTop = desktop
        ? topSafe + Math.max(0, (containerH - topSafe - bottomSafe - h0) / 2)
        : 0;
      if (desktop && videoCardRefs.current[0]) {
        videoCardRefs.current[0].style.top = `${mainTop}px`;
      }
      // Vertical budget: the two stacked side cards plus their gap must fit
      // between the safe top and bottom margins.
      const availH = Math.max(0, containerH - topSafe - bottomSafe);
      let s = hs > 0 ? (availH - gap) / (2 * hs) : 0.6;
      let x: number;
      if (compact) {
        // Narrow screens: side cards tuck partly behind card 1, pinned to the screen edges.
        s = Math.min(s, 0.62);
        x = vw / 2 - edge - (ws * s) / 2;
      } else {
        const available = vw / 2 - w0 / 2 - gap - edge;
        s = Math.min(s, ws > 0 ? available / ws : s, 1);
        x = w0 / 2 + gap + (ws * s) / 2;
      }
      const yOff = (hs * s) / 2 + gap / 2;
      // Keep the pair centred on card 1 when possible, but never past the
      // safe top/bottom margins.
      const pairHalf = hs * s + gap / 2;
      const mainCenter = desktop ? mainTop + h0 / 2 : geometry.center0;
      const center = Math.min(
        Math.max(mainCenter, topSafe + pairHalf),
        containerH - bottomSafe - pairHalf,
      );
      const dy = center - containerH / 2;
      const targets = [
        { x: 0, y: 0, scale: 1 },
        { x: -x, y: dy - yOff, scale: s },
        { x, y: dy - yOff, scale: s },
        { x: -x, y: dy + yOff, scale: s },
        { x, y: dy + yOff, scale: s },
      ];

      videoCardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (index === 0) {
          const settle = Math.min(1, progress / 0.12);
          const target = targets[0];
          const scale0 = 0.96 + settle * 0.04;
          card.style.transform = `scale(${scale0}) rotate(0deg)`;
          card.style.setProperty("--ep-scale", String(scale0));
          card.style.visibility = "visible";
          return;
        }

        // All four side cards rise together, once per page load: progress is
        // latched so scrolling back never tucks them under card 1 again.
        const raw = revealProgress;
        if (index === 1) riseLatch = Math.max(riseLatch, raw);
        const local = riseLatch;
        const eased = 1 - Math.pow(1 - local, 3);
        const pairIndex = index % 2 === 0 ? index - 1 : index;
        const pairTarget = targets[pairIndex];
        if (!pairTarget) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const target = {
          x: direction * Math.abs(pairTarget.x),
          y: pairTarget.y,
          scale: pairTarget.scale,
        };
        // Cards emerge from beneath card 1 (card 1 sits at a higher z-index),
        // starting small at its centre and expanding as they slide into place.
        const originX = 0;
        const originY = mainCenter - containerH / 2;
        const startScale = target.scale * 0.34;
        const x = originX + (target.x - originX) * eased;
        const y = originY + (target.y - originY) * eased;
        const scale = startScale + (target.scale - startScale) * eased;
        // Sizing is carried by the inline width — never a transform scale — so
        // everything inside (episode label, play button) renders at its natural
        // size and is pixel-identical across all five cards.
        card.style.width = `${ws * scale}px`;
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(0deg)`;
        card.style.setProperty("--ep-scale", "1");
        card.style.visibility = local > 0.01 ? "visible" : "hidden";
        card.style.pointerEvents = local > 0.86 ? "auto" : "none";
      });
    }, measure);
  }, [prefersReducedMotion]);

  const renderVideo = (video: (typeof DROPSHIPPING_VIDEOS)[number]) => {
    let previewEl: HTMLVideoElement | null = null;

    const startPreview = () => {
      if (!previewEl) return;
      previewEl.muted = true;
      void previewEl.play().catch(() => {});
    };
    const stopPreview = () => {
      if (!previewEl) return;
      previewEl.pause();
      previewEl.currentTime = 0;
    };

    const playButton = (
      <button
        type="button"
        onClick={() => setActiveVideoId(video.id)}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        aria-label={`Play: ${video.aria}`}
        className="group absolute inset-0 block h-full w-full overflow-hidden bg-black"
      >
        <img
          src={video.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {video.src ? (
          <video
            ref={(el) => {
              previewEl = el;
            }}
            src={video.src}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        ) : null}
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span
            className="grid place-items-center bg-accent text-accent-foreground"
            style={{ width: "calc(56px / var(--ep-scale, 1))", height: "calc(56px / var(--ep-scale, 1))" }}
          >
            <Play className="fill-current" />
          </span>
        </span>
      </button>
    );

    return playButton;
  };

  return (
    <Section id="dropshipping" tone="light" tightBottom>
      <div aria-hidden className="spectrum-rule pointer-events-none absolute left-[6%] right-[6%] top-0 z-[2] h-px" />
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow icon={ShoppingBag}>Dropshipping Challenge</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] tracking-normal sm:mt-5 md:leading-[1.08]">
              Build. Launch. Sell.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="max-w-[52ch] text-[13px] leading-[1.6] text-background/70 lg:ml-auto md:text-[15px] md:leading-[1.75]">
            From idea to sales: students build profitable D2C businesses in under four months — running
            their own marketing campaigns, sourcing, supply chains, customers, and sales, start to finish.
          </p>
        </Reveal>
      </div>

      <div
        role="separator"
        aria-hidden="true"
        className="mt-10 h-px w-full bg-background/15"
      />
      <Reveal delay={0.18} className="mt-8 sm:mt-10">
        <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/[0.03]">
          <div className="grid grid-cols-1 divide-y divide-background/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {DROPSHIPPING_STATS.map((stat) => (
              <div key={stat.label} className="min-h-[5.5rem] px-5 py-4 sm:min-h-0 sm:px-8 sm:py-5">
                <div className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-none tracking-[-0.01em]">
                  {stat.value}
                </div>
                <div className="mt-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/60 sm:text-[10px]">
                  {stat.label}
                </div>
                {stat.sub ? (
                  <div className="mt-1 text-[11px] leading-snug text-background/45 sm:text-[12px]">
                    {stat.sub}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <div ref={collageRef} data-dropshipping-collage className="relative h-[100svh] overflow-x-clip">
          <div className="relative h-full overflow-hidden border-t border-background/10">
            <div className="pointer-events-none absolute inset-x-4 top-10 z-20 flex items-start justify-between sm:inset-x-8 lg:inset-x-12 lg:top-12">
              <div className="flex items-center gap-3 pt-1.5 sm:pt-2.5">
                <span className="h-px w-8 bg-background/40 sm:w-14" />
                <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-background/55 sm:text-[10px]">
                  Field Film
                </span>
              </div>
              <span className="pt-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-background/35 sm:pt-2.5 sm:text-[10px]">
                Build in public
              </span>
            </div>



            {DROPSHIPPING_VIDEOS.map((video, index) => {
              const sizes = [
                "aspect-[4/5] w-[min(76vw,410px)] sm:w-[min(52vw,430px)] lg:w-[min(32vw,calc((100svh-17.8125rem)/1.25),470px)]",
                "aspect-[3/4] w-[min(66vw,340px)] sm:w-[min(35vw,360px)]",
                "aspect-[3/4] w-[min(66vw,340px)] sm:w-[min(35vw,360px)]",
                "aspect-[3/4] w-[min(66vw,340px)] sm:w-[min(35vw,360px)]",
                "aspect-[3/4] w-[min(66vw,340px)] sm:w-[min(35vw,360px)]",
              ];
              return (
                <div
                  key={video.id}
                  data-dropshipping-video={video.id}
                  ref={(element) => { videoCardRefs.current[index] = element; }}
                  className={`group/card absolute overflow-visible bg-foreground shadow-2xl will-change-transform ${
                    index === 0
                      ? "left-0 right-0 top-[clamp(11.5rem,40svh,25rem)] sm:top-[clamp(13rem,42svh,27rem)] mx-auto"
                      : "inset-0 m-auto"
                  } ${sizes[index]}`}
                  style={{
                    zIndex: index === 0 ? 10 : 9 - index,
                    transform: "translate3d(0, 0, 0) rotate(0deg)",
                    visibility: index === 0 ? "visible" : "hidden",
                    ["--ep-scale" as string]: index === 0 ? "0.96" : "1",
                  } as React.CSSProperties}
                >
                  <div aria-hidden className="pointer-events-none absolute -inset-2 border border-background/10" />
                  <div className="relative h-full w-full overflow-hidden border border-background/20 bg-foreground">
                    {renderVideo(video)}
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-foreground/70 via-transparent to-foreground/90" />
                    <span
                      className="absolute -left-px -top-px z-20 bg-bottle px-3 py-1 font-tech font-bold uppercase text-background"
                      style={{ fontSize: "calc(9px / var(--ep-scale, 1))" }}
                    >
                      Episode 0{index + 1}
                    </span>
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
                      <h4
                        className="font-display font-semibold italic leading-[1.12] text-background"
                        style={{ fontSize: "calc(13px / var(--ep-scale, 1))" }}
                      >
                        {video.aria}
                      </h4>
                      <p
                        className="mt-1.5 font-tech uppercase tracking-[0.22em] text-background/65"
                        style={{ fontSize: "calc(9px / var(--ep-scale, 1))" }}
                      >
                        Field Film
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider rule under the dropshipping section */}
      <div aria-hidden className="spectrum-rule pointer-events-none mt-14 h-px w-full sm:mt-16" />



      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {modalVideo && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={modalVideo.aria}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
                onClick={() => setActiveVideoId(null)}
              >
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`overflow-hidden rounded-[6px] border border-background/15 bg-black shadow-2xl ${
                    modalVideo.yt ? "aspect-video w-[min(calc(100vw-2rem),64rem)]" : "aspect-[9/16] h-[min(calc(100svh-6rem),52rem)] max-w-[calc(100vw-2rem)]"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {modalVideo.yt ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${modalVideo.yt}?autoplay=1&rel=0`}
                      title={modalVideo.aria}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="block h-full w-full bg-black"
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      playsInline
                      preload="auto"
                      poster={modalVideo.poster}
                      ref={(element) => { if (element) element.play().catch(() => {}); }}
                      className="block h-full w-full bg-black object-contain"
                      aria-label={modalVideo.aria}
                    >
                      <source src={modalVideo.src} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                  )}
                </motion.div>
                <motion.button
                  type="button"
                  aria-label="Close video"
                  onClick={() => setActiveVideoId(null)}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.2 }}
                  className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
                >
                  <X className="size-5" strokeWidth={2} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}

// Portfolio lead-in: headline figures, sitting above the company cards.
// Structured editorial grid: deck left, lead figure right, hairline ledger below.
function ByTheNumbers() {
  const cells = ECOSYSTEM_STATS.filter(
    (s) => s.label !== "Total valuation" && s.label !== "Startups launched",
  );

  return (
    <div id="scale" className="scroll-mt-24">
      <Reveal>
        <Eyebrow dark icon={Briefcase}>Portfolio</Eyebrow>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-9 sm:mt-11 md:mt-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7 xl:col-span-8">
          <Reveal delay={0.05}>
            <h2 className="max-w-[22ch] font-display text-[clamp(1.9rem,4.1vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance">
              This isn&apos;t three stories. It&apos;s a{" "}
              <span className="font-serif text-normal italic">portfolio</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[60ch] text-[13px] leading-[1.6] text-background/65 md:mt-7 md:text-[15px] md:leading-[1.75]">
              More than half of these startups have raised over $1 million. Together, their founders have
              created 500+ jobs since 2021. And when a startup doesn&apos;t make it, the founder walks away
              with sharper skills, real experience, and often, an incredible job offer anyway.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5 lg:justify-self-end xl:col-span-4">
          <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-background/40">
            Total valuation, across 30+ startups
          </div>
          <div className="mt-3 font-display text-[clamp(2.9rem,7vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.045em] tabular-nums">
            ₹593.10
            <span className="ml-2 align-baseline text-[0.36em] font-normal tracking-normal text-background/55">
              Cr
            </span>
          </div>
        </Reveal>
      </div>

      <div
        role="separator"
        aria-hidden="true"
        className="mt-10 h-px w-full bg-background/15"
      />
      <div className="mt-10 grid grid-cols-1 border-l border-t border-background/10 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {cells.map((s, i) => (
          <Reveal
            key={s.label}
            delay={0.05 + i * 0.04}
            className="min-h-[5.5rem] border-b border-r border-background/10 px-5 py-4 transition-colors duration-300 hover:bg-background/[0.04] sm:px-6 sm:py-5"
          >
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/60 sm:text-[10px]">
              {s.label}
            </div>
            <div className="mt-2.5 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-none tracking-[-0.01em] tabular-nums">
              {s.value}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ── Masters' Union Investment Fund ────────────────────────────────────────
const MUIF_VIDEO_ID = "C_6lIbplcy8";

const MUIF_TEAM: { name: string; role: string; photo: string; linkedin: string }[] = [
  { name: "Archit Bhargava", role: "President", photo: muifArchit.url, linkedin: "https://www.linkedin.com/in/architbhargava20/" },
  { name: "Mehul Jain", role: "President", photo: muifMehul.url, linkedin: "https://www.linkedin.com/in/mehul-jain-s/" },
  { name: "Ankit Sharma", role: "Core Member", photo: muifAnkit.url, linkedin: "https://www.linkedin.com/in/ankitsharma1498/" },
  { name: "Vedant Singhania", role: "Core Member", photo: muifVedant.url, linkedin: "https://www.linkedin.com/in/singhaniavedant/" },
  { name: "Kautak Sheth", role: "Core Member", photo: muifKautak.url, linkedin: "https://www.linkedin.com/in/kautuk-sheth/" },
  { name: "Devansh Shukla", role: "Core Member", photo: muifDevansh.url, linkedin: "https://www.linkedin.com/in/devanshshukla1996/" },
  { name: "Nankie Bawa", role: "Core Member", photo: muifNankie.url, linkedin: "https://www.linkedin.com/in/nankie-bawa-9b2580160/" },
  { name: "Pradyuman Beriwal", role: "Core Member", photo: muifIshaan.url, linkedin: "https://www.linkedin.com/in/pradyumnberiwal/" },
  { name: "Ishaan Godha", role: "Core Member", photo: muifHarsh.url, linkedin: "https://www.linkedin.com/in/ishaan-godha/" },
  { name: "Harsh Yadav", role: "Core Member", photo: muifPradyuman.url, linkedin: "https://www.linkedin.com/in/harshy-yadav-hy/" },
];

const MUIF_REPORTS = [
  { label: "MUIF X Sovrenn Perspective Report", href: "https://files.mastersunion.link/uploads/02072025/v1/SovrennxMUIFreport_.pdf", primary: true },
  { label: "MUIF Annual Performance Report", href: "https://files.mastersunion.link/resources/Annual%20Report-1.pdf", primary: false },
];

const IN_THE_NEWS = [
  { outlet: "Entrepreneurs Today", company: "Bullspree", title: "Bullspree: making a game of the investment process", href: "https://entrepreneurstoday.in/bullspree-making-a-game-of-the-investment-process/", img: newsEntrepreneur.url },
  { outlet: "ThePrint", company: "The Eight Network", title: "The Eight Network, a first-of-its-kind open interactive social radio, is set to disrupt audio entertainment", href: "https://theprint.in/ani-press-releases/the-eight-network-a-first-of-its-kind-open-interactive-social-radio-is-set-to-disrupt-the-audio-entertainment-space/821297/", img: newsPrint.url },
  { outlet: "Inc42", company: "Bullspree", title: "How Bullspree is educating the next generation of Indian retail investors", href: "https://inc42.com/startups/bullspree-educating-next-generation-indian-retail-investors/", img: newsInc.url },
  { outlet: "YourStory", company: "Bullspree", title: "Funding roundup: Bullspree, NymbleUp, plus early-stage capital", href: "https://yourstory.com/2023/01/funding-roundup-bullspree-nymbleup-plus-early-stage-capital", img: newsYourStory.url },
  { outlet: "SME Street", company: "PlaySuper", title: "PlaySuper secures $500K investment to boost its gaming and commerce model", href: "https://smestreet.in/technology/playsuper-secures-500k-investment-to-boost-gaming-and-commerce-model-8694977", img: newsSme.url },
  { outlet: "IndianWeb2", company: "PlaySuper", title: "Gaming startup PlaySuper raises $500K in seed funding", href: "https://www.indianweb2.com/2025/02/gaming-startup-playsuper-500k-seed.html", img: newsIndianWeb2.url },
];

function InTheNewsRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: "smooth" });
  };
  return (
    <div className="mt-14 sm:mt-16">
      <div role="separator" aria-hidden="true" className="h-px w-full bg-background/15" />
      <div className="mt-10 flex flex-col gap-5 sm:mt-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-background/45 sm:text-[10px]">
            Press coverage
          </div>
          <h3 className="mt-3 font-display text-[clamp(1.55rem,3.4vw,2.7rem)] font-medium leading-[1.06] tracking-[-0.015em]">
            In the <span className="font-serif text-normal italic">news</span>
          </h3>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-background/60">
            Coverage and features highlighting Masters' Union ventures across leading media platforms.
          </p>
        </div>
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scrollBy(d)}
              aria-label={d < 0 ? "Previous article" : "Next article"}
              className="grid size-11 place-items-center rounded-full border border-background/25 text-background/80 transition-colors hover:bg-background hover:text-foreground"
            >
              {d < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-8 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-10"
      >
        {IN_THE_NEWS.map((n, i) => (
          <a
            key={n.href}
            data-news-card
            href={n.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative flex w-[78vw] shrink-0 snap-start flex-col border border-background/15 bg-background/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-background/30 sm:w-[340px] lg:w-[380px]"
          >
            <span aria-hidden className="absolute left-0 top-0 z-10 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            <div className="relative aspect-[758/676] overflow-hidden">
              <img
                src={n.img}
                alt={`${n.outlet}: ${n.title}`}
                loading="lazy"
                decoding="async"
                className="no-img-zoom h-full w-full scale-[1.07] object-cover transition-transform duration-700 group-hover:scale-[1.12]"
              />
              <span className="absolute left-3 top-3 bg-accent px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                {n.outlet}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-background/45">
                <span>{String(i + 1).padStart(2, "0")} / {n.company}</span>
                <ArrowUpRight className="size-4 text-background/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-[15px] leading-snug text-background/90">{n.title}</p>
              <span className="mt-auto font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-background/60 group-hover:text-background">
                Read article
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function InvestmentFundSection() {
  const reduceMotion = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <Section id="fund" tone="dark" ruleHeightClass="h-px">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-end md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-14">
        <Reveal>
          <div className="min-w-0">
            <Eyebrow dark icon={Briefcase}>Investment Fund</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.9rem,4.1vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance">
              What is the Masters&apos; Union{" "}
              <span className="font-serif text-normal italic">Investment Fund</span>?
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[44ch] text-[13px] leading-[1.6] text-background/65 md:text-[15px] md:leading-[1.75]">
            A student-run fund backing Masters&apos; Union ventures. Watch the film, meet the team behind
            it, and read the published performance reports.
          </p>
        </Reveal>
      </div>

      {/* Film */}
      <Reveal delay={0.05} className="mt-10 sm:mt-12 md:mt-14">
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="group relative block w-full overflow-hidden border border-background/12 bg-background/[0.03] text-left"
          aria-label="Play the Masters' Union Investment Fund film"
        >
          <img
            src={muifBanner.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="no-img-zoom hidden aspect-[16/7] w-full object-cover sm:block"
          />
          <img
            src={muifBannerMob.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="no-img-zoom aspect-square w-full object-cover sm:hidden"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7 md:p-9">
            <div className="min-w-0">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-white/60 sm:text-[10px]">
                The Film
              </div>
              <div className="mt-2 max-w-[18ch] font-display text-[clamp(1.2rem,2.6vw,2rem)] font-medium leading-[1.1] text-white">
                Masters&apos; Union Investment Fund
              </div>
            </div>
            <span className="inline-flex items-center gap-3 border border-white/25 bg-black/40 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-black">
              <Play className="size-3.5 fill-current" strokeWidth={0} />
              Watch Video
            </span>
          </div>
        </button>
      </Reveal>

      {/* Team */}
      <div role="separator" aria-hidden="true" className="mt-14 h-px w-full bg-background/15 sm:mt-16" />

      <Reveal delay={0.05} className="mt-10 sm:mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Team behind the <span className="font-serif text-normal italic">Investment Fund</span>
          </h3>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/45 sm:text-[10px]">
            {MUIF_TEAM.length} members
          </span>
        </div>
      </Reveal>

      <div className="mt-7 grid gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-5 md:mt-9 lg:grid-cols-3 xl:grid-cols-4">
        {MUIF_TEAM.map((m, i) => (
          <Reveal key={m.name} delay={0.03 + (i % 4) * 0.03}>
            <a
              href={m.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="group block min-w-0"
            >
              <div className="relative aspect-[464/260] overflow-hidden bg-background/[0.04]">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
                />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-background/15 py-3.5 sm:py-4">
                <div className="min-w-0">
                  <div className="truncate font-display text-[14px] font-medium leading-tight text-background sm:text-[15px]">
                    {m.name}
                  </div>
                  <div className="mt-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-background/50 sm:text-[9px]">
                    {m.role}
                  </div>
                </div>
                <span className="inline-flex size-8 shrink-0 items-center justify-center border border-background/20 text-background/70 transition-colors duration-300 group-hover:bg-background group-hover:text-foreground">
                  <Linkedin className="size-3.5" strokeWidth={1.75} />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Portfolio performance */}
      <div role="separator" aria-hidden="true" className="mt-14 h-px w-full bg-background/15 sm:mt-16" />

      <div className="mt-10 sm:mt-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,540px)] md:items-end md:gap-10">
          <Reveal>
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-background/45 sm:text-[10px]">
                Published performance
              </div>
              <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(1.55rem,3.4vw,2.7rem)] font-medium leading-[1.06] tracking-[-0.015em]">
                Our portfolio <span className="font-serif text-normal italic">performance</span>
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-col items-stretch gap-2.5 lg:flex-row lg:justify-end">
              {MUIF_REPORTS.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`group inline-flex min-h-12 items-center justify-between gap-4 rounded-full border px-4 py-3 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-300 sm:px-5 sm:text-[9px] ${
                    r.primary
                      ? "border-background/25 bg-background text-foreground hover:bg-background/85"
                      : "border-background/25 text-background/80 hover:bg-background hover:text-foreground"
                  }`}
                >
                  <span className="min-w-0 leading-[1.35]">{r.label}</span>
                  <Download className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-8 sm:mt-10 md:mt-12">
          <div className="relative border-y border-background/15 py-5 sm:py-7 md:py-9">
            <div aria-hidden className="absolute left-0 top-0 h-px w-16 bg-accent sm:w-24" />
            <img
              src={muifPerf.url}
              alt="Masters' Union Investment Fund portfolio performance dashboard"
              loading="lazy"
              decoding="async"
              className="no-img-zoom mx-auto block h-auto w-full object-contain"
            />
          </div>
        </Reveal>
      </div>

      <InTheNewsRail />


      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {videoOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Masters' Union Investment Fund video"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
                onClick={() => setVideoOpen(false)}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-video w-full max-w-5xl overflow-hidden rounded-[6px] border border-white/15 bg-black shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${MUIF_VIDEO_ID}?autoplay=1&rel=0`}
                    title="Masters' Union Investment Fund"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </motion.div>
                <motion.button
                  type="button"
                  aria-label="Close video"
                  onClick={() => setVideoOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.2 }}
                  className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
                >
                  <X className="size-5" strokeWidth={2} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </Section>
  );
}

function VenturesMosaicSection() {


  const foundersGridRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // One observer on the founders mosaic drives a single staggered reveal.
  useEffect(() => {
    const grid = foundersGridRef.current;
    if (!grid) return;
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));
    if (tiles.length === 0) return;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.set(tiles, { autoAlpha: 0, y: 26 });
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            gsap.to(tiles, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              stagger: { each: 0.055 },
              clearProps: "transform,opacity,visibility",
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
        );
        io.observe(grid);
      }, grid);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <Section id="portfolio" tone="paper">
      <ByTheNumbers />

      <div ref={foundersGridRef} className="mt-9 sm:mt-11 md:mt-12">

        {/* Mobile + tablet masonry keeps variable-height cards tightly packed. */}
        <div className="columns-2 gap-[3px] sm:columns-3 md:columns-4 xl:hidden">
          {FOUNDER_TILES.map((t, i) => {
            const ratio = MOSAIC_RATIOS[i % MOSAIC_RATIOS.length];
            if ("kind" in t && t.kind === "cta") {
              return (
                <div key="cta-startups-mobile" data-tile className="mb-[3px] inline-block w-full break-inside-avoid align-top">
                  <VentureCtaTile t={t} ratio={ratio} />
                </div>
              );
            }
            if ("kind" in t) {
              return (
                <div key={`mobile-stat-${t.value}`} data-tile className="mb-[3px] inline-block w-full break-inside-avoid align-top">
                  <StatPoster s={t} ratio={ratio} />
                </div>
              );
            }
            return (
              <div key={`mobile-${t.company}`} data-tile className="mb-[3px] inline-block w-full break-inside-avoid align-top">
                <FounderPoster v={t} ratio={ratio} />
              </div>
            );
          })}
        </div>

        {/* Desktop brand mosaic — explicit equal-width columns fill the row edge to edge. */}
        <div className="hidden grid-cols-5 gap-[3px] xl:grid">
          {FOUNDER_COLUMNS.map((col, c) => (
            <div key={c} className="flex flex-col gap-[3px]">
              {col.map(({ tile: t, index: i }) => {
                const ratio = MOSAIC_RATIOS[(i + c) % MOSAIC_RATIOS.length];
                if ("kind" in t && t.kind === "cta") {
                  return (
                    <div key="cta-startups" data-tile>
                      <VentureCtaTile t={t} ratio={ratio} />
                    </div>
                  );
                }
                if ("kind" in t) {
                  return (
                    <div key={`stat-${t.value}`} data-tile>
                      <StatPoster s={t} ratio={ratio} />
                    </div>
                  );
                }
                return (
                  <div key={t.company} data-tile>
                    <FounderPoster v={t} ratio={ratio} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function VipJourney({ stages }: { stages: Stage[] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();

  const goTo = (next: number) => {
    const bounded = Math.max(0, Math.min(stages.length - 1, next));
    if (bounded === active) return;
    setDirection(bounded > active ? 1 : -1);
    setActive(bounded);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0.25;
    }, { threshold: [0, 0.25, 1] });
    observer.observe(card);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!visible) return;
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, stages.length]);

  const stage = stages[active];
  const previousStage = stages[Math.max(0, active - 1)];
  const nextStage = stages[Math.min(stages.length - 1, active + 1)];
  const progress = ((active + 1) / stages.length) * 100;

  return (
    <div
      ref={cardRef}
      className="relative mt-10 h-[52rem] overflow-hidden rounded-xl border border-background/10 bg-foreground text-background shadow-2xl sm:mt-12 sm:h-[54rem] md:h-[40rem] md:rounded-[2rem] lg:mt-16 lg:h-[42rem]"
      onPointerDown={(event) => { pointerStartRef.current = event.clientX; }}
      onPointerUp={(event) => {
        const start = pointerStartRef.current;
        pointerStartRef.current = null;
        if (start === null || Math.abs(event.clientX - start) < 60) return;
        goTo(active + (event.clientX < start ? 1 : -1));
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-primary/10 to-transparent" />
      <div className="grid h-full grid-rows-[32%_68%] md:grid-cols-12 md:grid-rows-1">
        <div className="relative flex min-h-0 items-center justify-center overflow-hidden p-4 sm:p-6 md:col-span-6 md:p-8 lg:p-12">
          {active > 0 && (
            <button
              type="button"
              aria-label={`Show ${previousStage.name}`}
              onClick={() => goTo(active - 1)}
              className="absolute -left-9 top-1/2 hidden aspect-[4/5] w-[12rem] -translate-y-1/2 overflow-hidden border border-background/10 opacity-25 blur-[2px] transition-all duration-500 hover:opacity-50 hover:blur-none md:block lg:-left-12 lg:w-[15rem]"
            >
              <img src={previousStage.image} alt="" className="h-full w-full object-cover" />
            </button>
          )}
          {active < stages.length - 1 && (
            <button
              type="button"
              aria-label={`Show ${nextStage.name}`}
              onClick={() => goTo(active + 1)}
              className="absolute -right-9 top-1/2 hidden aspect-[4/5] w-[12rem] -translate-y-1/2 overflow-hidden border border-background/10 opacity-25 blur-[2px] transition-all duration-500 hover:opacity-50 hover:blur-none md:block lg:-right-12 lg:w-[15rem]"
            >
              <img src={nextStage.image} alt="" className="h-full w-full object-cover" />
            </button>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={stage.name}
              custom={direction}
              initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 aspect-[4/5] h-full max-h-[17rem] overflow-hidden border border-background/20 shadow-2xl sm:max-h-[20rem] md:max-h-[26rem] lg:max-h-[32rem]"
            >
              <motion.img
                src={stage.image}
                alt={`${stage.name} stage of the Venture Initiation Programme`}
                className="h-full w-full object-cover"
                initial={reduceMotion ? false : { scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-foreground/90 via-transparent to-foreground/20" />
              {/* Label inside a solid container — green / red, as on the OutClass posters. */}
              <span className={`absolute left-0 top-0 px-2 py-1 font-tech text-[9px] font-bold uppercase ${active % 2 === 0 ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"}`}>
                VIP · Stage {stage.n}
              </span>
              <span aria-hidden className="absolute right-3 top-3 font-tech text-[10px] uppercase tracking-[0.18em] text-background/60 [writing-mode:vertical-rl]">
                VIP // Journey
              </span>
                <div className="absolute inset-x-4 bottom-4">
                <div className="font-tech text-[10px] font-bold uppercase tracking-[0.18em] text-background/70">Chapter · {stage.n}</div>
                <div aria-hidden className="my-3 h-px bg-background/30" />
                <h4 className="font-display text-[clamp(1.05rem,2.9vw,2.3rem)] font-black uppercase leading-[0.85] text-background [text-wrap:balance]">
                  {stage.name.split(" ").map((word, i, words) => (
                    <Fragment key={`${word}-${i}`}>
                      <span className="whitespace-nowrap">{word}</span>
                      {i < words.length - 1 ? " " : null}
                    </Fragment>
                  ))}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex min-h-0 flex-col justify-between border-t border-background/10 bg-background/[0.03] p-5 backdrop-blur-xl sm:p-7 md:col-span-6 md:border-l md:border-t-0 md:p-6 lg:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`vip-story-${stage.name}`}
              className="flex min-h-0 flex-1 flex-col"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">The Venture Initiation Programme</p>
              <div className="mt-4 flex items-baseline gap-3 sm:mt-5">
                <span className="font-display text-3xl font-bold text-accent lg:text-4xl">{stage.n}</span>
                <span aria-hidden className="h-px flex-1 bg-background/15" />
                <span className="font-mono text-xs text-background/35">{String(stages.length).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 max-w-[16ch] font-display text-[clamp(1.45rem,2.4vw,2.2rem)] font-semibold uppercase leading-[1.05] text-background">
                {stage.name.split(" ").map((word, i, words) => (
                  <Fragment key={`${word}-${i}`}>
                    <span className="whitespace-nowrap">{word}</span>
                    {i < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h3>
              <div
                data-lenis-prevent
                className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain sm:mt-4 lg:mt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {stage.body.map((para, i) => (
                  <p key={`${stage.name}-body-${i}`} className="text-[13px] leading-[1.5] text-background/72 sm:text-[14px] lg:leading-[1.6]">{para}</p>
                ))}
              </div>
              <div className="relative mt-5 shrink-0 overflow-hidden rounded-lg border border-background/10 bg-background/[0.05] p-4 sm:p-5 lg:mt-7 lg:rounded-2xl lg:p-6">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-background/45">{stage.grant ? "Stage grant" : "Investors in the room"}</span>
                <strong className="mt-2 block font-display text-[clamp(1.7rem,3vw,2.8rem)] font-bold leading-none text-accent">{stage.grant ?? "150+"}</strong>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex shrink-0 items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="h-px overflow-hidden bg-background/15">
                <motion.div className="h-full origin-left bg-accent" animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.45 }} />
              </div>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-background/40">Step {stage.n} of {String(stages.length).padStart(2, "0")}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Previous VIP stage" onClick={() => goTo(active - 1)} disabled={active === 0} className="flex size-10 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-background/50 hover:text-background disabled:pointer-events-none disabled:opacity-25 sm:size-12">
                <ArrowRight className="size-4 rotate-180" strokeWidth={1.5} />
              </button>
              <button type="button" aria-label="Next VIP stage" onClick={() => goTo(active + 1)} disabled={active === stages.length - 1} className="flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-25 sm:size-12">
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VipTopStartups() {
  return (
    <Reveal delay={0.08} className="mt-14 sm:mt-16">
      <div className="border-y border-background/15 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-5 pb-5 sm:pb-6">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/55">Top Startups</p>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-background/35">Venture Initiation Programme</span>
        </div>
        <div className="marquee-hover overflow-hidden" aria-label="Top Startups from the Venture Initiation Programme">
          <ul className="flex w-max animate-marquee-slow items-center">
            {[...VIP_TOP_STARTUPS, ...VIP_TOP_STARTUPS].map((startup, index) => (
              <li
                key={`${startup.name}-${index}`}
                aria-hidden={index >= VIP_TOP_STARTUPS.length}
                className="flex h-20 w-48 shrink-0 items-center justify-center px-6 sm:h-24 sm:w-60 sm:px-8"
              >
                <img
                  src={startup.logo}
                  alt={index >= VIP_TOP_STARTUPS.length ? "" : `${startup.name} logo`}
                  loading="lazy"
                  decoding="async"
                  data-asset-tries="0"
                  className="block max-h-14 w-auto max-w-full object-contain opacity-90 sm:max-h-16"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

const VIP_VIDEO_URL = vipProgramVideo.url;
const VIP_WATCH_MORE_URL = "https://youtu.be/1PTpdpc4kFc";

const VIP_VIDEO_DURATION = 110; // seconds, source clip length
const VIP_PREVIEW_CLIP = 10; // seconds shown per preview loop

function randomVipClipStart() {
  const max = Math.max(1, VIP_VIDEO_DURATION - VIP_PREVIEW_CLIP - 2);
  return 3 + Math.floor(Math.random() * max);
}

function VipVideoCard() {
  const scaleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const reduceMotion = useReducedMotion();
  // Muted preview: the same element keeps playing and simply seeks to a new
  // random moment every VIP_PREVIEW_CLIP seconds — no reload, no gap.
  const [previewOn, setPreviewOn] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPreviewOn(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const video = previewRef.current;
    if (!video) return;
    if (!previewOn || open || reduceMotion) {
      video.pause();
      return;
    }
    const jump = () => {
      video.currentTime = randomVipClipStart();
      void video.play().catch(() => {});
    };
    jump();
    const id = window.setInterval(jump, VIP_PREVIEW_CLIP * 1000);
    return () => window.clearInterval(id);
  }, [previewOn, open, reduceMotion]);

  useEffect(() => {
    if (!open) return;
    const video = modalVideoRef.current;
    if (video) void video.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Same scroll transition as the Spark "Building Starts Here" card: starts
  // small, grows to full size as it enters the viewport, fully reversible.
  useEffect(() => {
    if (reduceMotion) return;
    const el = scaleRef.current;
    if (!el) return;
    let scale = 0.45;
    const apply = () => {
      el.style.transform = `scale(${scale.toFixed(4)})`;
    };
    apply();
    return onScrollFrame(
      apply,
      () => {
        const vh = window.innerHeight || 1;
        const rect = el.getBoundingClientRect();
        const start = vh;
        const end = vh / 2 - rect.height / 2;
        const p = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, start - end)));
        scale = 0.45 + 0.55 * (1 - (1 - p) * (1 - p));
      },
    );
  }, [reduceMotion]);

  return (
    <div className="mt-10 sm:mt-12">
      <div ref={scaleRef} className="will-change-transform" style={{ transformOrigin: "center center" }}>
        <button
          ref={cardRef}
          type="button"
          onClick={() => {
            const card = cardRef.current;
            if (card) setOrigin(card.getBoundingClientRect());
            setOpen(true);
          }}
          aria-label="Watch the Venture Initiation Programme video"
          className="group mx-auto block w-full overflow-hidden rounded-2xl border border-background/15 text-left transition-transform duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl"
        >
          <span className="relative block aspect-video w-full overflow-hidden">
            <video
              ref={previewRef}
              src={VIP_VIDEO_URL}
              muted
              autoPlay
              playsInline
              loop
              preload="metadata"
              tabIndex={-1}
              aria-hidden
              className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
            <span aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center bg-accent text-accent-foreground">
                <Play className="fill-current" />
              </span>
            </span>
          </span>
        </button>
        <div className="mt-5 flex justify-center sm:mt-6">
          <span className="group/frame relative isolate inline-flex rounded-full border border-background/35 p-[5px]">
            {/* Hover fill: white bleeds outward until it reaches the outer
                capsule border, while the inner pill stays fully opaque. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-background opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
            />
            <CtaButton dark href={VIP_WATCH_MORE_URL} className="relative">
              Watch more
            </CtaButton>
          </span>
        </div>
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Venture Initiation Programme video"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={
                    reduceMotion || !origin
                      ? false
                      : {
                          left: origin.left,
                          top: origin.top,
                          width: origin.width,
                          height: origin.height,
                          borderRadius: 16,
                        }
                  }
                  animate={{
                    left: "50%",
                    top: "50%",
                    width: "min(calc(100vw - 2rem), 64rem)",
                    height: "auto",
                    x: "-50%",
                    y: "-50%",
                    borderRadius: 16,
                  }}
                  exit={
                    reduceMotion || !origin
                      ? { opacity: 0 }
                      : {
                          left: origin.left,
                          top: origin.top,
                          width: origin.width,
                          height: origin.height,
                          x: 0,
                          y: 0,
                          borderRadius: 16,
                        }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed aspect-video overflow-hidden border border-background/15 bg-black shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={modalVideoRef}
                    src={VIP_VIDEO_URL}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full"
                  />
                </motion.div>
                <button
                  type="button"
                  aria-label="Close video"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:bg-background/10 hover:text-background"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

/** One vertical highlight-reel card: poster, hover preview, square play button. */
function HsslReelCard({
  reel,
  index,
  onOpen,
}: {
  reel: (typeof HSSL_REELS)[number];
  index: number;
  onOpen: (reel: (typeof HSSL_REELS)[number], origin: DOMRect | null) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  const startPreview = () => {
    const el = previewRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {});
  };
  const stopPreview = () => {
    const el = previewRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <Reveal delay={index * 0.06}>
      <button
        ref={cardRef}
        type="button"
        aria-label={`Play ${reel.title}: ${reel.meta}`}
        onClick={() => onOpen(reel, cardRef.current?.getBoundingClientRect() ?? null)}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        className="group relative block aspect-[9/16] w-full overflow-hidden bg-black text-left transition-transform duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60"
      >
        <img
          src={reel.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <video
          ref={previewRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/85"
        />
        <span className="absolute -left-px -top-px z-20 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
          Highlight reel
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <span className="grid size-12 place-items-center bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-105 sm:size-14">
            <Play className="fill-current" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
          <span className="block font-display text-[clamp(1.15rem,2vw,1.5rem)] font-semibold italic leading-[1.1] text-background">
            {reel.title}
          </span>
          <span className="mt-2 block font-tech text-[9px] uppercase tracking-[0.22em] text-background/65">
            {reel.meta}
          </span>
        </span>
      </button>
    </Reveal>
  );
}

/** The three High School Startup League reels, as vertical cards. */
function HsslVideoCards() {
  const [openReel, setOpenReel] = useState<(typeof HSSL_REELS)[number] | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const reduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!openReel) return;
    const el = modalRef.current;
    if (el) void el.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenReel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openReel]);

  const open = (reel: (typeof HSSL_REELS)[number], rect: DOMRect | null) => {
    setOrigin(rect);
    setOpenReel(reel);
  };

  return (
    <div className="mt-12 sm:mt-16">
      <div
        role="separator"
        aria-hidden="true"
        className="h-px w-full bg-background/15"
      />
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
        {HSSL_REELS.map((reel, i) => (
          <HsslReelCard key={reel.id} reel={reel} index={i} onOpen={open} />
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openReel && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${openReel.title} — ${openReel.meta}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
                onClick={() => setOpenReel(null)}
              >
                <motion.div
                  initial={
                    reduceMotion || !origin
                      ? false
                      : {
                          left: origin.left,
                          top: origin.top,
                          width: origin.width,
                          height: origin.height,
                          borderRadius: 0,
                        }
                  }
                  animate={{
                    left: "50%",
                    top: "50%",
                    width: "min(calc(100vw - 2rem), calc((100svh - 4rem) * 0.5625), 28rem)",
                    height: "min(calc((100vw - 2rem) / 0.5625), calc(100svh - 4rem), 49.78rem)",
                    x: "-50%",
                    y: "-50%",
                    borderRadius: 0,
                  }}
                  exit={
                    reduceMotion || !origin
                      ? { opacity: 0 }
                      : {
                          left: origin.left,
                          top: origin.top,
                          width: origin.width,
                          height: origin.height,
                          x: 0,
                          y: 0,
                          borderRadius: 0,
                        }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed overflow-hidden border border-background/15 bg-black shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={modalRef}
                    src={openReel.src}
                    poster={openReel.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-label={`${openReel.title} — ${openReel.meta}`}
                    className="block h-full w-full bg-black object-contain"
                  />
                </motion.div>
                <button
                  type="button"
                  aria-label="Close video"
                  onClick={() => setOpenReel(null)}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:bg-background/10 hover:text-background"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function VipSection() {
  return (
    <Section id="journey" tone="paper" tightTop>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow icon={Rocket}>The Venture Initiation Programme (VIP)</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] tracking-normal sm:mt-5 md:leading-[1.08]">
              From Idea to Demo Day
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="eyebrow mb-3 text-background/45">Then I decided to build it properly.</div>
          <p className="max-w-[56ch] text-[13px] leading-[1.6] text-background/70 lg:ml-auto md:text-[15px] md:leading-[1.75]">
            Students build a business from 0 to 1, working through the real moving parts — pricing,
            positioning, cash flow — not case studies about someone else&apos;s. The VIP is a structured track,
            not an elective, backed by a grant at every stage and mentorship from founders, CXOs, and investors.
          </p>
        </Reveal>
      </div>

      <div
        role="separator"
        aria-hidden="true"
        className="mt-10 h-px w-full bg-background/15"
      />
      <Reveal delay={0.16} className="mt-8 sm:mt-10">
        <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/[0.03]">
          <div className="grid grid-cols-1 divide-y divide-background/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {VIP_METRICS.map((stat) => (
              <div key={stat.label} className="min-h-[5.5rem] px-5 py-4 sm:min-h-0 sm:px-8 sm:py-5">
                <div className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-none tracking-[-0.01em]">
                  {stat.value}
                </div>
                <div className="mt-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/60 sm:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <VipVideoCard />

      <VipJourney stages={VIP_STAGES} />
      <VipTopStartups />
    </Section>
  );
}



function CtaButton({
  children,
  dark = false,
  icon,
  onClick,
  href,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = `group inline-flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold transition-transform hover:-translate-y-px ${
    dark ? "bg-background text-foreground" : "bg-foreground text-background"
  } ${className}`.trim();
  const inner = (
    <>
      {children}
      <span
        className={`inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
          dark ? "bg-foreground text-background" : "bg-background text-foreground"
        }`}
      >
        {icon ?? <ArrowUpRight className="size-3.5" strokeWidth={2.25} />}
      </span>
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link to="/" className={classes}>
      {inner}
    </Link>
  );
}

function triggerFileDownload(href: string, filename: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const ENTREPRENEURSHIP_REPORTS = [
  {
    label: "Entrepreneurship Report 2021–25",
    detail: "Full report · 84 pages",
    asset: entrepreneurshipReport2021,
    filename: "Masters-Union-Entrepreneurship-Report-2021-25.pdf",
  },
  {
    label: "UG Programmes — Entrepreneurship Report",
    detail: "Web edition · 19 pages",
    asset: entrepreneurshipReportUg,
    filename: "Masters-Union-Entrepreneurship-Report-UG-Programmes.pdf",
  },
] as const;

function HeroReportDownload() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const download = async (item: (typeof ENTREPRENEURSHIP_REPORTS)[number]) => {
    if (busy) return;
    setBusy(item.label);
    try {
      const response = await fetch(item.asset.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      triggerFileDownload(objectUrl, item.filename);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    } catch {
      // Fall back to a direct download from the asset URL.
      triggerFileDownload(item.asset.url, item.filename);
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <span className="group/frame relative isolate inline-flex rounded-full border border-background/35 p-[5px]">
        {/* Hover fill: white bleeds outward until it reaches the outer
            capsule border, while the inner pill stays fully opaque. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-background opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
        />
        <CtaButton
          dark
          className="relative"
          onClick={() => setOpen((v) => !v)}
          icon={<Download className="size-3.5" strokeWidth={2.25} />}
        >
          Download Entrepreneurship Report
        </CtaButton>
      </span>
      {open && (
        <div className="absolute bottom-full left-1/2 z-30 mb-3 w-[300px] -translate-x-1/2 border border-background/15 bg-foreground text-background shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:w-[320px]">
          <div className="border-b border-background/10 px-4 py-3">
            <span className="eyebrow block text-[0.625rem] uppercase tracking-[0.25em] text-background/60">
              Entrepreneurship Report
            </span>
            <span className="mt-1 block text-[12px] text-background/70">Choose an edition to download</span>
          </div>
          {ENTREPRENEURSHIP_REPORTS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => download(item)}
              disabled={busy !== null}
              className="group flex w-full items-start gap-3 border-b border-background/10 px-4 py-3 text-left transition-colors duration-200 last:border-b-0 hover:bg-background/15 disabled:opacity-60"
            >
              <Download className="mt-0.5 size-3.5 shrink-0 text-background/60 transition-colors duration-200 group-hover:text-background" />
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold leading-snug">{item.label}</span>
                <span className="mt-0.5 block text-[11px] uppercase tracking-[0.14em] text-background/55">
                  {busy === item.label ? "Preparing download…" : item.detail}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function useHomeNavScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { scrolled, progress };
}

function useHomeNavActiveSection(ids: string[], lockedRef: React.MutableRefObject<number>) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [active, setActive] as const;
}

function useHomeNavClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return "";
  const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${date} · ${time}`;
}

function homeNavScrollToId(id: string) {
  if (typeof window === "undefined") return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
  if (id === "top") {
    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - 12;
  if (lenis?.scrollTo) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Floating bottom nav reproducing the finished Masters' Union homepage's
 * SectionNav design (pill shape, scroll-progress rail, logo + clock, active
 * section pills, Apply button) — local to this page only. Deliberately
 * hidden below `lg` (the same breakpoint the previous BottomNav used) so it
 * never doubles up with the global MobileBottomBar, which already owns
 * mobile/tablet navigation for every route including this one.
 */
function HomepageStyleNav({
  items,
  applyHref = "#apply",
  visible,
}: {
  items: { id: string; label: string }[];
  applyHref?: string;
  visible: boolean;
}) {
  const { scrolled, progress } = useHomeNavScrollState();
  const lockedUntilRef = useRef(0);
  const [active, setActive] = useHomeNavActiveSection(items.map((i) => i.id), lockedUntilRef);
  const clock = useHomeNavClock();

  const goTo = (id: string) => {
    lockedUntilRef.current = Date.now() + 1400;
    setActive(id);
    homeNavScrollToId(id);
  };

  const activeLabel = items.find((l) => l.id === active)?.label ?? "Overview";

  const handleApply = (e: React.MouseEvent) => {
    if (applyHref.startsWith("#")) {
      e.preventDefault();
      homeNavScrollToId(applyHref.slice(1));
    }
  };

  return (
    <header
      className={`fixed inset-x-0 bottom-0 z-[100] hidden px-3 pb-3 transition-opacity duration-[2200ms] delay-500 ease-out sm:px-5 sm:pb-4 lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={
          "relative mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-2 overflow-hidden rounded-full border px-3 transition-all duration-300 sm:gap-4 sm:px-5 lg:h-11 " +
          (scrolled
            ? "border-border bg-background/85 shadow-[0_-18px_50px_-28px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-border/60 bg-background/80 shadow-[0_-12px_40px_-30px_rgba(0,0,0,0.25)] backdrop-blur-md")
        }
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left transition-transform duration-150"
          style={{
            transform: `scaleX(${progress})`,
            backgroundImage: "linear-gradient(91deg, #39B5D7 -6.14%, #F7D544 47.02%, #E38330 99.71%)",
          }}
        />

        <a href="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="Masters' Union home">
          <img decoding="async" loading="eager" src={muLogoAsset.url} alt="Masters' Union" className="h-4 w-auto sm:h-5 lg:h-6" />
          <span className="hidden h-6 w-px bg-border md:block" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:block">
            {clock}
          </span>
        </a>

        <nav aria-label="Sections" className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.id);
              }}
              className={
                "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-[color,background-color] duration-300 ease-out " +
                (active === item.id
                  ? "bg-foreground/[0.07] text-foreground"
                  : "text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground xl:inline">
            {activeLabel}
          </span>

          <a
            href={applyHref}
            onClick={handleApply}
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary py-0.5 pl-3 pr-0.5 text-[12px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px sm:pl-3.5"
          >
            Apply
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

// The preview's asset delivery intermittently times out and answers a media request
// with a 502. One dropped fetch would otherwise leave a card blank for the rest of the
// session, so re-request a failed image or video a couple of times before giving up.
function useAssetReload(maxTries = 2) {
  useEffect(() => {
    let cancelled = false;

    const claim = (el: Element) => {
      const tries = Number(el.getAttribute("data-asset-tries") || 0);
      if (tries >= maxTries) return false;
      el.setAttribute("data-asset-tries", String(tries + 1));
      return true;
    };

    const later = (run: () => void) => {
      window.setTimeout(() => {
        if (!cancelled) run();
      }, 400);
    };

    const onFailed = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tag = target.tagName.toLowerCase();

      if (tag === "img") {
        const img = target as HTMLImageElement;
        const src = img.getAttribute("src");
        if (!src || src.startsWith("data:") || !claim(img)) return;
        later(() => {
          const [path, query = ""] = src.split("?");
          const params = new URLSearchParams(query);
          params.set("asset-try", img.getAttribute("data-asset-tries") || "1");
          img.src = `${path}?${params.toString()}`;
        });
        return;
      }

      if (tag === "video" || tag === "source") {
        const video = tag === "video" ? (target as HTMLVideoElement) : target.closest("video");
        if (!video || !claim(video)) return;
        later(() => video.load());
      }
    };

    document.addEventListener("error", onFailed, true);
    return () => {
      cancelled = true;
      document.removeEventListener("error", onFailed, true);
    };
  }, [maxTries]);
}

function SharkTankShowcase({
  active,
  onActiveChange,
}: {
  active: number;
  onActiveChange: Dispatch<SetStateAction<number>>;
}) {
  const reduceMotion = useReducedMotion();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const lastGestureAt = useRef(0);
  const activeFounder = SHARK_TANK[active];

  const move = (direction: number) => {
    onActiveChange((current) => (current + direction + SHARK_TANK.length) % SHARK_TANK.length);
  };

  const moveFromGesture = (direction: -1 | 1) => {
    const now = Date.now();
    if (now - lastGestureAt.current < (reduceMotion ? 120 : 650)) return;
    lastGestureAt.current = now;
    move(direction);
  };

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const rect = element.getBoundingClientRect();
      if (rect.top >= window.innerHeight * 0.85 || rect.bottom <= window.innerHeight * 0.15) return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 28 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastGestureAt.current < (reduceMotion ? 120 : 650)) return;
      lastGestureAt.current = now;
      move(event.deltaX > 0 ? 1 : -1);
    };

    window.addEventListener("keyup", onKey);
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keyup", onKey);
      element.removeEventListener("wheel", onWheel);
    };
  }, [active, reduceMotion]);

  if (!activeFounder) return null;

  return (
    <div className="mt-10">
      <div
        ref={showcaseRef}
        className="outline-none focus-visible:ring-1 focus-visible:ring-background/50"
        role="region"
        aria-label="Shark Tank India founders"
        tabIndex={0}
        onTouchStartCapture={(event) => {
          touchStart.current = {
            x: event.touches[0]?.clientX ?? 0,
            y: event.touches[0]?.clientY ?? 0,
          };
        }}
        onTouchEndCapture={(event) => {
          const touch = event.changedTouches[0];
          if (!touch) return;
          const deltaX = touch.clientX - touchStart.current.x;
          const deltaY = touch.clientY - touchStart.current.y;
          if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return;
          moveFromGesture(deltaX < 0 ? 1 : -1);
        }}
      >
        <div className="relative h-[390px] overflow-hidden sm:h-[470px] lg:h-[540px]" aria-live="polite">
          {SHARK_TANK.map((founder, index) => {
            let offset = index - active;
            if (offset > SHARK_TANK.length / 2) offset -= SHARK_TANK.length;
            if (offset < -SHARK_TANK.length / 2) offset += SHARK_TANK.length;
            const isActive = offset === 0;
            const distance = Math.abs(offset);
            const translate = offset * 70;
            const rotate = offset * 2.25;

            return (
              <Button
                key={founder.company}
                type="button"
                variant="ghost"
                onClick={() => onActiveChange(index)}
                aria-label={isActive ? `${founder.founder}, ${founder.company}, selected` : `Show ${founder.founder} of ${founder.company}`}
                aria-current={isActive ? "true" : undefined}
                className={`group absolute left-1/2 top-1/2 block aspect-[3/4] h-auto w-[68vw] max-w-[300px] overflow-hidden rounded-none border-0 bg-foreground p-0 text-left shadow-[0_32px_70px_-34px_var(--foreground)] transition-[transform,opacity,filter] duration-700 ease-out hover:bg-foreground sm:w-[290px] lg:w-[330px] lg:max-w-[330px] ${
                  distance > 2 ? "pointer-events-none" : ""
                }`}
                style={{
                  zIndex: 20 - distance,
                  opacity: distance > 2 ? 0 : isActive ? 1 : 0.58,
                  filter: isActive ? "none" : "saturate(.72) brightness(.62)",
                  transform: `translate(calc(-50% + ${translate}%), -50%) rotate(${rotate}deg) scale(${isActive ? 1 : 0.82})`,
                  transitionDuration: reduceMotion ? "0ms" : undefined,
                }}
              >
                {founder.photo && (
                  <img
                    src={founder.photo}
                    alt={`${founder.founder} of ${founder.company} on Shark Tank India`}
                    loading={isActive ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                )}
                <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-foreground/70 to-transparent" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground via-foreground/55 to-transparent" aria-hidden />
                <span className="absolute left-4 top-4 bg-bottle px-3 py-1 font-tech text-[9px] font-bold uppercase text-background">
                  {founder.season}
                </span>
                <span className="absolute right-4 top-4 grid size-9 place-items-center border border-background/35 bg-foreground/35 font-mono text-[9px] text-background backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="block font-display text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-none text-background">
                    {founder.company}
                  </span>
                  <span className="mt-2 block font-tech text-[9px] font-semibold uppercase tracking-[0.16em] text-background/70">
                    {founder.founder} · {founder.cohort}
                  </span>
                </span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] bg-bottle transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden
                />
              </Button>
            );
          })}
        </div>

        <div className="mx-auto mt-2 grid max-w-[760px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-background/15 pt-5 sm:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-display text-[1.15rem] font-semibold text-background sm:text-[1.35rem]">{activeFounder.company}</h3>
              <span className="font-tech text-[9px] font-bold uppercase tracking-[0.18em] text-background/45">{activeFounder.season}</span>
            </div>
            <p className="mt-1 font-tech text-[9px] uppercase tracking-[0.14em] text-background/55">
              {activeFounder.founder} · {activeFounder.cohort}
            </p>
            <p className="mt-3 max-w-[54ch] text-[13px] leading-[1.65] text-background/75 sm:text-[14px]">
              {activeFounder.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Button type="button" variant="ghost" size="icon" data-shark-direction="-1" onClick={() => move(-1)} aria-label="Previous founder" className="min-h-11 min-w-11 rounded-none border border-background/20 text-background hover:bg-background hover:text-foreground">
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </Button>
            <p className="hidden min-w-14 text-center font-mono text-[10px] text-background/45 sm:block">
              <strong className="text-base font-medium text-background">{String(active + 1).padStart(2, "0")}</strong> / {String(SHARK_TANK.length).padStart(2, "0")}
            </p>
            <Button type="button" variant="ghost" size="icon" data-shark-direction="1" onClick={() => move(1)} aria-label="Next founder" className="min-h-11 min-w-11 rounded-none border border-background/20 text-background hover:bg-background hover:text-foreground">
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-[760px] items-center gap-2" aria-label="Choose a founder">
          {SHARK_TANK.map((founder, index) => (
            <Button
              key={founder.company}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onActiveChange(index)}
              aria-label={`Show ${founder.founder}`}
              aria-current={active === index ? "true" : undefined}
              className="group h-8 min-w-0 flex-1 rounded-none p-0 hover:bg-transparent"
            >
              <span className={`h-[3px] transition-all duration-300 ${active === index ? "w-full bg-bottle" : "w-full bg-background/20 group-hover:bg-background/45"}`} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

const SHARK_TANK_LOGOS = [
  { company: "Nexera Health", logo: sharkNexeraLogo.url },
  { company: "HookD", logo: sharkHookDLogo.url },
  { company: "Meta Fashion", logo: sharkMetaFashionLogo.url },
  { company: "Bullspree", logo: sharkBullspreeLogo.url },
  { company: "HiveSchool", logo: sharkHiveSchoolLogo.url },
  { company: "MemoTag", logo: sharkMemoTagLogo.url },
] as const;

function SharkTankLogoBar() {
  return (
    <div
      className="relative mt-10 overflow-hidden text-background"
      style={{
        background: "linear-gradient(120deg, #16150F 0%, #221F19 45%, #1A1814 72%, #100F0C 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 90% at 4% 0%, rgba(184,145,70,0.20) 0%, rgba(184,145,70,0) 62%), radial-gradient(70% 80% at 96% 100%, rgba(79,163,240,0.14) 0%, rgba(79,163,240,0) 60%)",
        }}
      />

      <div className="relative grid gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-[minmax(0,300px)_1px_1fr] md:items-center md:gap-9 md:p-9">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#C9A34E]">
            Featured on
          </p>
          <h3
            className="mt-3 text-[clamp(1.7rem,3vw,2.35rem)] font-bold uppercase leading-[0.95] tracking-[-0.015em]"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span className="text-[#4FA3F0]">Shark Tank</span>{" "}
            <span className="text-[#F5CE4B]">India.</span>
          </h3>
          <p className="mt-3 max-w-[30ch] text-[12.5px] leading-relaxed text-background/60">
            Six student-founded ventures pitched on India&apos;s biggest startup stage.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 border border-background/15 bg-background/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-background/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5CE4B]" />
            {SHARK_TANK_LOGOS.length} ventures on air
          </p>
        </div>

        <div aria-hidden className="hidden h-full w-px bg-background/10 md:block" />

        <div className="grid grid-cols-2 gap-px overflow-hidden bg-background/10 sm:grid-cols-3">
          {SHARK_TANK_LOGOS.map(({ company, logo }) => {
            const isMeta = /meta\s*fashion/i.test(company);
            return (
              <div
                key={company}
                title={company}
                className="group flex h-14 items-center justify-center bg-foreground px-3 transition-colors duration-300 hover:bg-foreground/75 sm:h-[74px] sm:px-4"
              >
                <img
                  decoding="async"
                  src={logo}
                  alt={company}
                  loading="lazy"
                  style={{ transform: isMeta ? "scale(0.82)" : undefined }}
                  className="max-h-7 w-full object-contain opacity-90 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StartupsPage() {
  useAssetReload();
  const [selectedShark, setSelectedShark] = useState(0);
  const [selectedSpark, setSelectedSpark] = useState(0);
  const reduceHeroMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const heroMarqueeRef = useRef<HTMLDivElement>(null);
  const headlineWordRef = useRef<HTMLSpanElement>(null);
  const heroVideoElRef = useRef<HTMLVideoElement>(null);
  const [wordFontSize, setWordFontSize] = useState<number | null>(null);
  const heroTextOpacity = useMotionValue(1);
  const heroTextScale = useMotionValue(1);
  // The reflection dims in lockstep with the pinned copy: it rides on the same
  // fade value, scaled down to its resting 40% glow.
  const heroReflectionOpacity = useTransform(heroTextOpacity, (v) => v * 0.4);
  // A frosted-glass layer sits on the video card at rest; as scrolling brings
  // the card up toward full screen the frost dissolves so the film plays fully
  // clear when it dominates the viewport.
  const heroOverlayOpacity = useMotionValue(0.72);
  // The card rests slightly tilted in 3D, like it is floating just above the
  // page; the tilt flattens as the video rises to full screen.
  const heroCardTilt = useMotionValue(13);
  // The faint light pool under the card dims as the card settles flat.
  const heroLiftOpacity = useMotionValue(0.35);
  const heroLogoOpacity = useMotionValue(1);
  // The logo slides upward as it fades, so it drifts out of view instead of
  // dissolving in place; the translation rides on the same fade value.
  const heroLogoY = useMotionValue(0);

  useEffect(() => {
    const el = heroVideoElRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    const tryPlay = () => {
      void el.play().catch(() => undefined);
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    document.addEventListener("pointerdown", tryPlay, { once: true });
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("pointerdown", tryPlay);
    };
  }, []);


  useEffect(() => {
    if (reduceHeroMotion) {
      heroTextOpacity.set(1);
      heroTextScale.set(1);
      heroLogoOpacity.set(1);
      heroLogoY.set(0);
      heroOverlayOpacity.set(0);
      return;
    }

    let textRect: DOMRect | undefined;
    let videoRect: DOMRect | undefined;
    let logoRect: DOMRect | undefined;
    let marqueeRect: DOMRect | undefined;
    let maxClearance = 0;
    let maxVideoTop = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    // The copy stays pinned while the video rises over it: the fade begins just
    // before the video reaches the copy and completes as it covers it.


    return onScrollFrame(
      ({ vh }) => {
        if (!textRect || !videoRect) return;

        // Tie the copy release to the live gap above the rising video, so the
        // copy dims as the video slides up and covers it. maxClearance captures
        // the largest gap seen (the video's resting position), so the fade is
        // anchored to this layout instead of a hardcoded threshold.
        const clearance = videoRect.top - textRect.bottom;
        if (clearance > maxClearance) maxClearance = clearance;
        const fadeStart = maxClearance * 0.75;
        const fadeEnd = -textRect.height * 0.55;

        const releaseProgress = clamp((fadeStart - clearance) / Math.max(1, fadeStart - fadeEnd));
        heroTextOpacity.set(1 - releaseProgress);
        heroTextScale.set(1 - releaseProgress * 0.03);

        // Fade the pinned logo out on exactly the same release timing as the
        // typography, so both dissolve together as the video covers them; the
        // marquee-proximity guard stays so the logo never sits on top of the
        // passing logos when restored.
        let logoFade = releaseProgress;
        if (logoRect && marqueeRect) {
          const gap = marqueeRect.top - logoRect.bottom;
          logoFade = Math.max(logoFade, clamp((140 - gap) / 120));
        }
        heroLogoOpacity.set(1 - logoFade);
        // Slide the logo up in lockstep with its fade: fully faded = one logo
        // height of travel, restored to zero on scroll back.
        heroLogoY.set(-logoFade * 48);
        if (heroTextRef.current) {
          heroTextRef.current.style.pointerEvents = releaseProgress >= 0.72 ? "none" : "auto";
        }

        // The scrim on the video card dissolves slowly as scrolling brings the
        // card up toward full screen: anchored to the card's resting position,
        // fully gone once its top nears the viewport top.
        if (videoRect) {
          if (videoRect.top > maxVideoTop) maxVideoTop = videoRect.top;
          const travel = Math.max(1, maxVideoTop - vh * 0.08);
          const overlayProgress = clamp((maxVideoTop - videoRect.top) / travel);
          heroOverlayOpacity.set(0.72 * (1 - overlayProgress));
          // The 3D tilt flattens on the same progress, so the card settles
          // flat exactly as the frost clears.
          heroCardTilt.set(13 * (1 - overlayProgress));
          heroLiftOpacity.set(0.35 * (1 - overlayProgress));
        }
      },
      () => {
        textRect = heroTextRef.current?.getBoundingClientRect();
        videoRect = heroVideoRef.current?.getBoundingClientRect();
        logoRect = heroLogoRef.current?.getBoundingClientRect();
        marqueeRect = heroMarqueeRef.current?.getBoundingClientRect();
      },
    );
  }, [reduceHeroMotion, heroTextOpacity, heroTextScale, heroLogoOpacity, heroLogoY, heroOverlayOpacity, heroCardTilt, heroLiftOpacity]);

  // Fit "Entrepreneurship" to exactly fill its box width on one line at any screen size.
  useLayoutEffect(() => {
    const el = headlineWordRef.current;
    const holder = el?.parentElement;
    if (!el || !holder) return;
    const REF = 100;
    const measure = () => {
      const prev = el.style.fontSize;
      el.style.fontSize = `${REF}px`;
      const natural = el.scrollWidth;
      el.style.fontSize = prev;
      if (!natural || !holder.clientWidth) return;
      // Fit within the holder width, then shave a few extra pixels so the
      // final "p" never touches the overflow-hidden edge.
      setWordFontSize(Math.max(12, ((holder.clientWidth - 6) / natural) * REF - 4));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(holder);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);


  return (
    <main className="min-h-screen bg-black text-foreground [--foreground:#000000]">
      <HomepageStyleNav items={NAV} applyHref="#cta" visible />


      <header
        ref={heroRef}
        id="top"
        className="relative z-0 overflow-x-clip bg-foreground text-background"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-2 sm:pb-14 md:px-10 md:pb-16 md:pt-3 lg:pb-20">
          <motion.div
            ref={heroLogoRef}
            className="sticky top-3 z-20 -mx-1 inline-block bg-foreground/90 px-1 py-2 backdrop-blur-sm md:top-4"
            style={
              reduceHeroMotion
                ? { opacity: 1, y: 0 }
                : { opacity: heroLogoOpacity, y: heroLogoY }
            }
          >
            <img
              decoding="async"
              loading="eager"
              src={muLogoAsset.url}
              alt="Masters' Union"
              className="block h-8 w-auto brightness-0 invert md:h-10"
            />
          </motion.div>

          <div className="relative mx-auto mt-2 w-full max-w-6xl sm:mt-3 md:mt-4 lg:mt-5">
            <motion.div
              ref={heroTextRef}
              className="sticky top-24 z-10 flex w-full flex-col items-center text-center sm:top-28 md:top-32 lg:top-28"
              style={reduceHeroMotion ? { opacity: 1, scale: 1 } : { opacity: heroTextOpacity, scale: heroTextScale }}
            >
              <Reveal delay={0.08} className="w-full">
                <h1 className="mx-auto w-full overflow-hidden pb-[0.14em] font-medium leading-[0.95] tracking-[-0.02em]">
                  <span
                    ref={headlineWordRef}
                    className="block whitespace-nowrap text-[clamp(2.2875rem,8.5vw,3.5875rem)] leading-[0.9] tracking-[-0.03em]"
                    style={wordFontSize ? { fontSize: `${wordFontSize}px` } : undefined}
                  >Entrepreneurship</span>
                  <span className="mb-4 mt-4 block text-[clamp(1.05rem,3.5vw,1.6rem)] font-semibold text-background/80 sm:mb-6 sm:mt-6 md:mb-8 md:mt-8">at Masters&apos; Union</span>
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <HeroReportDownload />
              </Reveal>

              <Reveal delay={0.18}>
                <span className="eyebrow mt-6 inline-block whitespace-nowrap text-[0.6875rem] text-background/70 md:text-[0.8125rem]">
                  120+ Startups · ₹593 Cr Valuation
                </span>
              </Reveal>

              <Reveal delay={0.22}>
                <div
                  aria-hidden="true"
                  className="mt-7 h-px w-28 bg-gradient-to-r from-transparent via-background/35 to-transparent sm:w-36"
                />
              </Reveal>
            </motion.div>

            <motion.div
              ref={heroVideoRef}
              className="relative z-20 mx-auto mt-10 w-full sm:mt-12 lg:mt-8 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl"
            >
              {/* Live reflection: an upright, masked copy of the video sits
                  directly above the card so the playing film casts a soft
                  light glow upward. The mask fades the top edge and tucks the
                  side edges into the dark background so no border shows, and
                  the copy shows the film's top edge, not its bottom. */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 h-[132px] w-full max-w-3xl translate-y-[6px] -translate-x-1/2 overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.95),rgba(0,0,0,0.35)_55%,transparent_80%),linear-gradient(to_right,transparent_0%,black_22%,black_78%,transparent_100%)] sm:h-[172px] sm:translate-y-[17px] md:h-[212px] md:translate-y-[21px] lg:translate-y-[26px]"
                style={{ opacity: heroReflectionOpacity }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  tabIndex={-1}
                  className="absolute left-0 top-0 block h-auto w-full max-w-full rounded-2xl blur-[7px]"
                >
                  <source src={foundersVideo.url} type="video/mp4" />
                  <source src={foundersVideoWebm.url} type="video/webm" />
                </video>
              </motion.div>
              <div className="relative" style={{ perspective: "1400px" }}>
                <motion.div
                  style={
                    reduceHeroMotion
                      ? { rotateX: 0 }
                      : { rotateX: heroCardTilt, transformStyle: "preserve-3d" }
                  }
                  className="relative"
                >
                {/* Soft lift light beneath the card: a faint pool of light
                    that reads as the card floating above the page; it dims on
                    the same progress as the tilt. */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-7 left-[6%] right-[6%] h-14 rounded-[100%] bg-white/10 blur-2xl"
                  style={reduceHeroMotion ? { opacity: 0.35 } : { opacity: heroLiftOpacity }}
                />
                <video
                  ref={heroVideoElRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Masters' Union founders film"
                  className="relative block h-auto w-full max-w-full rounded-2xl border border-background/15 bg-black"
                >
                  <source src={foundersVideo.url} type="video/mp4" />
                  <source src={foundersVideoWebm.url} type="video/webm" />
                </video>
                {/* Frosted glass over the card, styled like dark smoked
                    glassmorphism: a blurred dimmed base with soft light blobs
                    refracting through, a faint diagonal sheen, and a thin
                    polished edge highlight — all dissolving slowly as
                    scrolling brings the card up toward full screen so the
                    film plays fully clear. */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  style={reduceHeroMotion ? { opacity: 0 } : { opacity: heroOverlayOpacity }}
                >
                  {/* A blurred copy of the film as the glass base: a real
                      backdrop-filter cannot sample the backdrop from inside
                      the card's 3D tilt context, so the glass blurs a live
                      duplicate of the video instead — same frosted result,
                      reliable in every browser. */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    tabIndex={-1}
                    className="absolute inset-0 h-full w-full scale-[1.15] object-cover brightness-[0.38] blur-[30px]"
                  >
                    <source src={foundersVideo.url} type="video/mp4" />
                    <source src={foundersVideoWebm.url} type="video/webm" />
                  </video>
                  {/* Dark tinted smoked-glass base */}
                  <div className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-[48px] backdrop-saturate-150" />
                  {/* Soft light sources bleeding through the smoked glass */}
                  <div className="absolute -left-[14%] top-[4%] h-[75%] w-[46%] rounded-full bg-white/55 blur-[72px]" />
                  <div className="absolute -right-[12%] -top-[18%] h-[85%] w-[42%] rounded-full bg-white/35 blur-[84px]" />
                  <div className="absolute -bottom-[28%] left-[28%] h-[75%] w-[38%] rounded-full bg-white/25 blur-[76px]" />
                  {/* Faint diagonal sheen across the pane */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  {/* Thin polished edge highlight */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20" />
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>
                </motion.div>
              </div>
            </motion.div>

          <motion.div
            ref={heroMarqueeRef}
            initial={reduceHeroMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceHeroMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 w-full max-w-6xl overflow-hidden border-y border-background/10 py-5 sm:mt-10 sm:py-6 md:mt-12"
          >
              <motion.div
                className="flex w-max items-center"
                animate={reduceHeroMotion ? undefined : { x: ["0%", "-50%"] }}
                transition={reduceHeroMotion ? undefined : { duration: 48, ease: "linear", repeat: Infinity }}
              >
                {[...SPARK_VENTURE_LOGOS, ...SPARK_VENTURE_LOGOS].map((logo, index) => {
                  const name = logo.original_filename.replace(/\.png$/i, "");
                  return (
                    <div
                      key={`${logo.url}-${index}`}
                      aria-hidden={index >= SPARK_VENTURE_LOGOS.length}
                      className="flex h-12 w-32 shrink-0 items-center justify-center px-5 sm:h-14 sm:w-40 sm:px-7 md:w-44"
                    >
                      <img
                        decoding="async"
                        src={logo.url}
                        alt={index >= SPARK_VENTURE_LOGOS.length ? "" : name}
                        loading="lazy"
                        className="no-img-zoom max-h-9 w-auto max-w-full object-contain opacity-75 brightness-0 invert sm:max-h-10"
                      />
                    </div>
                  );
                })}
              </motion.div>
          </motion.div>
          </div>
        </div>
      </header>

      <div className="relative z-10 bg-foreground font-display text-background [&_h2]:!font-display [&_h2]:!font-semibold [&_h2]:!leading-[1.04] [&_h2]:!tracking-normal [&_h3]:!font-display [&_h3]:!font-semibold [&_h3]:!tracking-normal [&_p]:font-display [&_p]:font-normal">
      <Section id="spark" tone="light" container="max-w-7xl">
        <div className="grid grid-cols-1 gap-5 border-b border-background/20 pb-8 sm:gap-6 sm:pb-10 md:grid-cols-12 md:items-end md:gap-10 md:pb-12 lg:gap-12 lg:pb-14">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow icon={Lightbulb}>The Spark</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[18ch] font-display text-[1.875rem] font-normal leading-[1.2] tracking-normal">
                An idea begins with noticing.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4">
            <p className="max-w-[42ch] text-[13px] leading-[1.6] text-background/70 md:ml-auto md:text-[15px] md:leading-[1.75]">
              At Masters&apos; Union, questions, frustrations, and assignments become real businesses.
            </p>
          </Reveal>
        </div>

        <SparkCarousel companies={SPARK_EXAMPLES} active={selectedSpark} onActiveChange={setSelectedSpark} />
      </Section>

      <OutclassSection />
      <DropshippingSection />
      <VipSection />

      <FounderStoriesGallery />


      <Section id="sharktank" tone="dark">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-end md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-14">
          <Reveal>
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <EyebrowRule />
                <div className="flex min-w-0 items-start gap-2">
                  <Tv className="size-4 shrink-0 text-background/55" strokeWidth={1.75} />
                  <Eyebrow dark rule={false}>On Shark Tank India</Eyebrow>
                </div>
              </div>
              <h2 className="mt-5 max-w-[24ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
                Real founders. Real pitches. National television.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[60ch] text-[13px] leading-[1.6] text-background/75 md:mt-0 md:text-[15px] md:leading-[1.75]">
              Masters&apos; Union students have pitched on India&apos;s biggest startup stage — not as
              alumni years removed from campus, but while still building.
            </p>
          </Reveal>
        </div>

        <div
          role="separator"
          aria-hidden="true"
          className="mt-10 h-px w-full bg-background/15"
        />
        <SharkTankLogoBar />
        <SharkTankShowcase active={selectedShark} onActiveChange={setSelectedShark} />
      </Section>

      <Section id="hssl" tone="paper" ruleHeightClass="h-px">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-end md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-14">
          <Reveal>
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <EyebrowRule />
                <div className="flex min-w-0 items-start gap-2">
                  <GraduationCap className="size-4 shrink-0 text-background/55" strokeWidth={1.75} />
                  <Eyebrow rule={false}>High School Startup League</Eyebrow>
                </div>
              </div>
              <h2 className="mt-5 max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
                The founders here haven&apos;t graduated high school yet.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[60ch] text-[13px] leading-[1.6] text-background/70 md:mt-0 md:text-[15px] md:leading-[1.75]">
              A separate pipeline, built for Class IX–XII students, not current Masters&apos; Union
              enrollees — a launchpad for teen founders to create, pitch, and take their first cheque, with
              past judges including Ashneer Grover, Ankur Warikoo, Techburner, and Sarthak Ahuja.
            </p>
          </Reveal>
        </div>


        <div
          role="separator"
          aria-hidden="true"
          className="mt-10 h-px w-full bg-background/15"
        />
        <Reveal delay={0.18} className="mt-8 sm:mt-10">
          <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/[0.03]">
            <div className="grid grid-cols-1 divide-y divide-background/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {HSSL_STATS.map((stat) => (
                <div key={stat.label} className="min-h-[5.5rem] px-5 py-4 sm:min-h-0 sm:px-8 sm:py-5">
                  <div className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-none tracking-[-0.01em]">
                    {stat.value}
                  </div>
                  <div className="mt-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/60 sm:text-[10px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
            {HSSL_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="eyebrow rounded-full border border-accent px-4 py-2 text-background transition-colors duration-300 hover:bg-accent/10">
                  {stage}
                </span>
                {i < HSSL_STAGES.length - 1 && <ArrowRight className="hidden size-3.5 text-background/30 sm:block" aria-hidden />}
              </div>
            ))}
          </div>
        </Reveal>

        <HsslVideoCards />
      </Section>


      <Section id="people" tone="light" container="max-w-7xl">
        <div className="grid grid-cols-1 gap-5 border-b border-background/20 pb-8 sm:gap-6 sm:pb-10 md:grid-cols-12 md:items-end md:gap-10 md:pb-12 lg:gap-12 lg:pb-14">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow icon={Users}>Mentors, VCs, and Believers</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[18ch] font-display text-[1.875rem] font-normal leading-[1.2] tracking-normal">
                Behind every founder is a room full of people who&apos;ve already done it.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-4">
            <p className="max-w-[42ch] text-[13px] leading-[1.6] text-background/70 md:ml-auto md:text-[15px] md:leading-[1.75]">
              Investors, mentors, and founders who sat in the room — on what they saw.
            </p>
          </Reveal>
        </div>

        <QuoteWall people={TESTIMONIALS} />
      </Section>

      <Section id="fellowship" tone="dark">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-10 lg:gap-12">
          <Reveal>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-none tracking-[-0.03em]">
              ₹50,000
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-background/55">
              per month, no equity taken
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow dark icon={Flame}>For Those Going All In</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
                No placements. No backup plan. Just a runway.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[56ch] text-[13px] leading-[1.6] text-background/75 md:text-[15px] md:leading-[1.75] md:mt-7">
                For students who want to build instead of interview, Masters&apos; Union offers the Founder
                Fellowship: ₹50,000 a month in grants, mentorship from industry veterans, and active help
                with fundraising — no placements, no backup plans. As of the 2021–25 report, 40+ fellows
                had used that runway to build their companies full-time.
              </p>
            </Reveal>
          </div>
        </div>

        <div
          role="separator"
          aria-hidden="true"
          className="mt-10 h-px w-full bg-background/15"
        />
        <Reveal delay={0.18} className="mt-8 sm:mt-10">
          <div className="overflow-hidden rounded-2xl border border-background/15 bg-background/[0.03]">
            <div className="grid grid-cols-1 divide-y divide-background/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {FELLOW_STATS.map((stat) => (
                <div key={stat.label} className="min-h-[5.5rem] px-5 py-4 sm:min-h-0 sm:px-8 sm:py-5">
                  <div className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-normal leading-none tracking-[-0.01em]">
                    {stat.value}
                  </div>
                  <div className="mt-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-background/60 sm:text-[10px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-background/55">
            Our Founders
          </p>
          <FellowshipShowcase />
        </Reveal>
      </Section>

      <VenturesMosaicSection />

      <InvestmentFundSection />



      <Section id="cta" tone="dark" container="max-w-4xl">
        <div className="pb-10 pt-4 text-center sm:pb-14 sm:pt-6 md:pb-20 md:pt-12">
          <Reveal>
            <h2 className="text-balance text-[clamp(2rem,7vw,5.5rem)] font-light leading-[1.04] md:leading-[1] tracking-normal">
              WHAT WILL YOU BUILD?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-7 max-w-[56ch] text-[13px] leading-[1.6] text-background/75 md:text-[15px] md:leading-[1.75] md:mt-8">
              Every company on this page started the same way every company starts: as nothing. A question.
              A bad first batch. A frustration nobody else was naming. The only difference between an idea
              and a startup is whether someone builds it.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <CtaButton dark>Apply to Masters&apos; Union</CtaButton>
            </div>
          </Reveal>
        </div>
      </Section>
      </div>
      <div aria-hidden className="fixed inset-x-0 bottom-0 -z-10 h-28 bg-foreground md:hidden" />
    </main>
  );
}

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Entrepreneurship — Masters' Union" },
      {
        name: "description",
        content:
          "30+ student startups. ₹593 Cr valuation. From dropshipping to Shark Tank: how Masters' Union founders build, test, fail, iterate, pitch, and scale real companies.",
      },
      { property: "og:title", content: "Entrepreneurship — Masters' Union" },
      { property: "og:description", content: "Student founders at Masters' Union build real companies through OutClass, venture-building and the market." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StartupsPage,
});
