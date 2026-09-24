import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Flag,
  GraduationCap,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  Play,
  Trophy,
  Tv,
  Users,
  X,
} from "lucide-react";
import eightVentureImg from "@/assets/founders/ventures/eight.jpg.asset.json";
import bullspreeVentureImg from "@/assets/founders/ventures/bullspree.jpg.asset.json";
import outclassDropshippingImg from "@/assets/outclass-dropshipping.jpg.asset.json";
import hiveschoolVentureImg from "@/assets/founders/ventures/hiveschool.jpg.asset.json";
import lexisVentureImg from "@/assets/founders/ventures/lexis.jpg.asset.json";
import playsuperVentureImg from "@/assets/founders/ventures/playsuper.jpg.asset.json";
import seedsaiVentureImg from "@/assets/founders/ventures/seedsai.jpg.asset.json";
import woodysVentureImg from "@/assets/founders/ventures/woodys.jpg.asset.json";
import sharkTankStageImg from "@/assets/founders/sharktank-stage.jpg.asset.json";
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
import instaVideo5Poster from "@/assets/insta-video-5-frame.jpg.asset.json";
import sparkVideoThumb from "@/assets/spark-video-thumb.jpg";

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
import sharkMemoTagLogo from "@/assets/sharktank/MemoTag.png.asset.json";
import sharkMetaFashionLogo from "@/assets/sharktank/MetaFashion.png.asset.json";
import brandPhotoEight from "@/assets/founders/brand/eight.jpg";
import brandPhotoBullspree from "@/assets/founders/brand/bullspree.jpg";
import brandPhotoHiveschool from "@/assets/founders/brand/hiveschool.jpg";
import brandPhotoLexis from "@/assets/founders/brand/lexis.jpg";
import brandPhotoMemotag from "@/assets/founders/brand/memotag.jpg";
import brandPhotoMetafashion from "@/assets/founders/brand/metafashion.jpg";
import brandPhotoPlaysuper from "@/assets/founders/brand/playsuper.jpg";
import brandPhotoSeedsai from "@/assets/founders/brand/seedsai.jpg";
import brandPhotoWoodys from "@/assets/founders/brand/woodys.jpg";
import { onScrollFrame } from "@/lib/scroll-driver";

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
}[] = [
  {
    name: "Eight",
    founder: "Mohit Paliwal & co.",
    cohort: "PGP TBM 2021",
    product: "The Stage for Stories",
    body: "Mohit Paliwal, Mohit Goswami, and Yugal Tamang realized at a Masters' Union cafeteria table that not everyone wants to be seen, but everyone has a story worth telling — Eight became the stage for it.",
    founderImage: sparkEightFounders.url,
  },
  {
    name: "Sanyark Space",
    founder: "Raghava Kundrapu & Akhileshwar Reddy",
    cohort: "PGP TBM 2023",
    product: "LEO Nav-Com Satellites",
    body: "Raghava Kundrapu spent eight years as an ISRO scientist before his PGP TBM — then teamed up with fellow ISRO veteran Akhileshwar Reddy to build Sanyark Space: LEO satellites that fuse precision navigation with secure communications.",
  },
  {
    name: "Mandrake Bio",
    founder: "Tanay Lohia",
    cohort: "PGP TBM 2022",
    product: "AI-Designed Gene-Editing Enzymes",
    body: "Tanay Lohia graduated top of his PGP TBM cohort and chose to make life programmable — Mandrake Bio uses generative AI to design gene-editing enzymes from scratch, and just raised ₹16 Cr to prove the approach.",
  },
  {
    name: "PlaySuper",
    founder: "Shouradeep Chakraborty & co.",
    cohort: "PGP TBM 2024",
    product: "Rewards for Casual Gamers",
    body: "Shouradeep Chakraborty and his co-founders saw India's 438M casual gamers churning out of games that gave nothing back — PlaySuper is the rewards platform that turns loyalty into real-world incentives.",
  },
  {
    name: "Bullspree",
    founder: "Dharmil Bavishi & co.",
    cohort: "PGP TBM 2021",
    product: "The Stock Market Playground",
    body: "Dharmil Bavishi went from supply-chain analyst to the CEO's office, then asked why learning to invest felt so intimidating — Bullspree turns India's curiosity about markets into financial confidence.",
  },
  {
    name: "MemoTag",
    founder: "Reyansh Juneja",
    cohort: "UG TBM 2028",
    product: "AI Wearable for Dementia Care",
    body: "Reyansh Juneja started MemoTag while still an undergraduate — an AI-driven wearable purpose-built for dementia care, designed to catch the moments caregivers can't.",
  },
  {
    name: "Hive School",
    founder: "Nikhil Gaur",
    cohort: "PGP TBM 2024",
    product: "India's First Sales School",
    body: "Nikhil Gaur built a ₹2 Cr run rate while still a student — Hive School is India's first Sales School, training the next generation of GTM operators companies are desperate to hire.",
  },
  {
    name: "Meta Fashion",
    founder: "Arjun Goel",
    cohort: "UG TBM 2028",
    product: "Phygital Fashion Commerce",
    body: "Arjun Goel is connecting in-game discovery with real-world fashion — Meta Fashion's phygital commerce lets players find a look inside the game and wear it outside it.",
  },
  {
    name: "SeedsAI",
    founder: "Shubham Khatri & Vansh Miglani",
    cohort: "PGP TBM 2024",
    product: "AI for NBFC Review",
    body: "Shubham Khatri and Vansh Miglani didn't start with a business plan. They started by shadowing NBFC call-center agents and noticing how much time was wasted on manual review.",
    founderImage: sparkSeedsAiFounders.url,
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
  { id: "highlight", src: instaVideo1.url, poster: instaVideo1Poster.url, aria: "Student entrepreneurship film" },
  { id: "ventures", src: instaVideo2.url, poster: instaVideo2Poster.url, aria: "Student ventures film" },
  { id: "campus", src: instaVideo3.url, poster: instaVideo3Poster.url, aria: "Campus film" },
  { id: "hero-info", src: instaVideo4.url, poster: instaVideo4Poster.url, aria: "Student programme film" },
  { id: "hero", src: instaVideo5.url, poster: instaVideo5Poster.url, aria: "Student venture film" },
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
  photo: string;
  logo?: { url: string };
  sector: string;
  stage: string;
  raised: string;
  note?: string;
};

const FOUNDER_VENTURES: VentureTile[] = [
  {
    company: "Eight.Network",
    founder: "Mohit Goswami, Mohit Paliwal, Yugal Tamang · Co'21",
    photo: brandPhotoEight,
    logo: ventureEightLogo,
    sector: "Audio streaming",
    stage: "Venture-backed",
    raised: "$3.1M",
    note: "~$5M ARR",
  },
  {
    company: "PlaySuper",
    founder: "Shouradeep Chakraborty, Abhir Das, Upamanyu Chatterjee · Co'24",
    photo: brandPhotoPlaysuper,
    logo: venturePlaysuperLogo,
    sector: "Gaming commerce",
    stage: "Seed · 4 rounds",
    raised: "$1.69M",
    note: "Latest $1M seed, Sep 2025",
  },
  {
    company: "Bullspree",
    founder: "Dharmil Bavishi, Harsh Dhanawat, Divyansh Mathur",
    photo: brandPhotoBullspree,
    logo: ventureBullspreeLogo,
    sector: "Sports gaming",
    stage: "Seed · 2 rounds",
    raised: "$1.5M",
    note: "₹2 Cr (Sep '21) + ₹1 Cr (Feb '22)",
  },
  {
    company: "MemoTag",
    founder: "Reyansh Juneja, Japnoor Kaur Sandhu · UG '28",
    photo: brandPhotoMemotag,
    logo: sharkMemoTagLogo,
    sector: "Dementia care wearables",
    stage: "Early stage",
    raised: "~₹2.5 Cr",
    note: "Founder-stated",
  },
  {
    company: "Meta Fashion",
    founder: "Arjun Goel · UG TBM '28",
    photo: brandPhotoMetafashion,
    logo: sharkMetaFashionLogo,
    sector: "Fashion tech",
    stage: "Pre-seed",
    raised: "~$400K",
  },
  {
    company: "Hive School",
    founder: "Nikhil Gaur · PGP '25",
    photo: brandPhotoHiveschool,
    logo: ventureHiveschoolLogo,
    sector: "EdTech · sales school",
    stage: "Grant + revenue",
    raised: "₹2 Cr run rate",
  },
  {
    company: "Lexi's",
    founder: "MU student founders",
    photo: brandPhotoLexis,
    logo: ventureLexis,
    sector: "Cloud kitchen",
    stage: "Student-founded",
    raised: "₹1 Cr+ ARR",
  },
  {
    company: "Seeds AI",
    founder: "MU student founders",
    photo: brandPhotoSeedsai,
    logo: ventureSeedsAILogo,
    sector: "Applied AI",
    stage: "Pre-seed",
    raised: "Undisclosed",
  },
  {
    company: "Woody's Pizzeria",
    founder: "MU student founders",
    photo: brandPhotoWoodys,
    logo: ventureWoodys,
    sector: "F&B · QSR",
    stage: "Bootstrapped",
    raised: "Revenue-funded",
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

const OUTCLASS_MOMENTS = [
  {
    n: "01",
    action: "Run",
    label: "Dropshipping stores",
    body: "Taking risks, testing ideas, and putting something into the world.",
    media: "Students running a live storefront",
    image: outclassDropshippingImg.url,
  },
  {
    n: "02",
    action: "Launch",
    label: "Content brands",
    body: "Real growth doesn’t come from case studies.",
    media: "A student content brand going live",
    image: null,
  },
  {
    n: "03",
    action: "Build",
    label: "Start companies from scratch",
    body: "Half the curriculum happens outside the classroom, from day one.",
    media: "Students building a company after class",
    image: null,
  },
];

type Stage = { n: string; name: string; grant: string | null; body: string; image: string; culmination?: boolean };

const VIP_STAGES: Stage[] = [
  {
    n: "01",
    name: "Pre-Seed",
    grant: "₹15–20L",
    body: "Bust the myths, find a real problem worth solving, pick the right co-founders, learn to talk to customers — validated in front of founders, VCs, and alumni.",
    image: brandPhotoMetafashion,
  },
  {
    n: "02",
    name: "MVP",
    grant: "₹15–20L",
    body: "Build the smallest real version of the idea, prove customer centricity, ship on no-to-low-code tools, and defend it at MVP Demo Day.",
    image: brandPhotoSeedsai,
  },
  {
    n: "03",
    name: "Go-to-Market",
    grant: "₹20L",
    body: "Learn the marketing playbook and understand your funnel — turning a working product into a repeatable one.",
    image: brandPhotoPlaysuper,
  },
  {
    n: "04",
    name: "Product-Market Fit",
    grant: "₹25L",
    body: "One final dry run, then Demo Day.",
    image: brandPhotoHiveschool,
  },
  {
    n: "05",
    name: "Demo Day",
    grant: null,
    body: "150+ venture capitalists and angel investors in the room, assessing student startups for real funding.",
    image: sharkTankStageImg.url,
    culmination: true,
  },
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

const PATTERN_STEPS = ["Question", "Experiment", "First Customer", "Failure", "Iteration", "Traction", "Pitch", "Scale"];

type SharkTankEntry = { company: string; founder: string; cohort: string; season: string; description: string };
const SHARK_TANK: SharkTankEntry[] = [
  {
    company: "Bullspree",
    founder: "Dharmil Bavishi",
    cohort: "PGP TBM Co'21",
    season: "Season 2",
    description: "Bullspree is building India's favourite stock market playground for learning & investing.",
  },
  {
    company: "HiveSchool",
    founder: "Nikhil Gaur",
    cohort: "PGP TBM Co'24",
    season: "Season 4",
    description: "HiveSchool is building India's first Sales School.",
  },
  {
    company: "MemoTag",
    founder: "Reyansh Juneja",
    cohort: "UG TBM Co'28",
    season: "Season 4",
    description: "MemoTag is building an AI-driven wearable for dementia care.",
  },
];

const HSSL_STATS = [
  { value: "10,000+", label: "Applications" },
  { value: "500+", label: "Schools participated" },
  { value: "15+", label: "States represented" },
  { value: "₹20L+", label: "Cash prize / funding pool" },
];
const HSSL_STAGES = ["Ideation", "MVP Showdown", "Investor Pitch"];

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
  },
  {
    quote:
      "This journey was more than just building a brand — it was about finding purpose and passion in every step... It wasn't just business; it became a home for our grit and growth.",
    name: "Sarthak Khanna",
    role: "Founder, Monarque",
  },
  {
    quote:
      "Masters' Union provided the environment and mentorship to transform a simple question into a meaningful product.",
    name: "Sakshi Tuteja",
    role: "Founder, Yango",
  },
  {
    quote:
      "I found some of the problem statements genuinely compelling, especially those being tackled by Cryptique, Guardex, and Spawnright.",
    name: "Sahil Dhingra",
    role: "VP, Info Edge Ventures",
  },
];

const NEXT_GEN = [
  {
    name: "Meta Fashion",
    pitch: "A phygital fashion house building trend-driven digital wearables and virtual-world drops.",
  },
  {
    name: "MemoTag",
    pitch:
      "An AI companion that engages patients in clinically structured phone conversations, turning them into graded reports for doctors.",
  },
  {
    name: "Zenmo",
    pitch: "An automotive-lifestyle apparel brand blending motorsport culture with streetwear.",
  },
  {
    name: "Internet Human Co.",
    pitch: "AI agents built as tireless “digital employees,” managed like remote team members.",
  },
  {
    name: "Angry Toast",
    pitch: "A content-first sock and footwear brand for Gen Z, built on creator-led community.",
  },
  {
    name: "AceCard",
    pitch: "A smart NFC business card that turns a single tap into a full CRM-synced digital profile.",
  },
];

type Company = {
  name: string;
  founder: string;
  category: string;
  metric: string;
  description: string;
};

const PORTFOLIO_PRIMARY: Company[] = [
  {
    name: "Eight",
    founder: "Yugal Tamang, Mohit Paliwal, Mohit Goswami",
    category: "Tech & Media",
    metric: "5M+ downloads",
    description: "Audio-to-microdrama storytelling platform.",
  },
  {
    name: "Nivara",
    founder: "Vikas Kabra",
    category: "D2C",
    metric: "₹15Cr ARR, bootstrapped",
    description: "Lab-grown diamond jewellery, profitable with zero outside capital.",
  },
  {
    name: "Bullspree",
    founder: "Dharmil Bavishi",
    category: "Fintech",
    metric: "10L+ registered users",
    description: "Experiential investing platform for India's retail traders.",
  },
  {
    name: "PlaySuper",
    founder: "Upamanyu Chatterjee, Shouradeep Chakraborty",
    category: "Gaming",
    metric: "₹83.5Cr last valuation",
    description: "Rewards platform helping gaming studios fix retention.",
  },
  {
    name: "Lexi's",
    founder: "Naveen Balaji, Rhea Melwani, Alex Puthusserry, Ayush Melwani",
    category: "F&B",
    metric: "₹1.5Cr+ ARR",
    description: "Gurgaon's top-rated gourmet sandwich brand.",
  },
  {
    name: "Cryptique",
    founder: "Parth Agarwal, Akshit Varsani",
    category: "Web3",
    metric: "30+ project waitlist in 3 days",
    description: "An AI-native intelligence layer for Web3 marketing ROI.",
  },
];

const PORTFOLIO_MORE: Company[] = [
  {
    name: "JustMyRoots",
    founder: "Karan Sachdeva",
    category: "Logistics / F&B",
    metric: "₹500Cr last valuation",
    description: "Regional food delivery grown into a national logistics backbone.",
  },
  {
    name: "Bambaii Foods",
    founder: "Gaurav Dasgupta",
    category: "F&B",
    metric: "5,000+ customers",
    description: "Guilt-free snacking, reborn from a failed first batch.",
  },
  {
    name: "Eat Atlas",
    founder: "Ishita Gupta, Anshul Gupta, Mayuresh Jadhav",
    category: "F&B",
    metric: "Top 3, Demo Day",
    description: "Global-flavor dips in boarding-pass packaging.",
  },
  {
    name: "Woody's Pizzeria",
    founder: "Kanav Rishi Kumar",
    category: "F&B",
    metric: "4.7★ across 3,000+ orders",
    description: "South Delhi's highest-rated vegetarian pizzeria.",
  },
  {
    name: "SeedsAI",
    founder: "Vansh Miglani, Shubham Khatri",
    category: "AI / Fintech",
    metric: "₹60L ARR (FY25)",
    description: "AI voice intelligence for NBFC collections and compliance.",
  },
  {
    name: "Blue Brew",
    founder: "Aditya Rathi",
    category: "D2C / Fashion",
    metric: "₹3.6Cr ARR",
    description: "Fit-first denim and streetwear, profitable and bootstrapped.",
  },
  {
    name: "Flourish Foods",
    founder: "Sonam Sharma, Nikhil Sharma",
    category: "F&B",
    metric: "15x more iron than regular atta",
    description: "Functional attas engineered for diabetes, iron deficiency, and low energy.",
  },
  {
    name: "Monarque",
    founder: "Sarthak Khanna",
    category: "D2C / Perfumes",
    metric: "₹24L+ ARR",
    description: "Long-lasting, accessible luxury fragrances.",
  },
  {
    name: "Guardex",
    founder: "Naman Jain",
    category: "DeepTech",
    metric: "Piloted across 5 factories",
    description: "Turns passive CCTV into AI-powered factory safety monitoring.",
  },
];

const REALITY_EXAMPLES = [
  {
    name: "Bambaii Foods",
    body: "A ₹60 snack mix that flopped, a founder who called his own product “shit,” a team that disbanded before the real version got built.",
  },
  {
    name: "EIGHT",
    body: "A full pivot from live audio to microdrama when the founders read that the format itself was aging out.",
  },
  {
    name: "Woody's Pizzeria",
    body: "Kanav Rishi Kumar's first weekend of full orders came with an early 1-star review before the rating climbed to 4.7 across 3,000+ orders.",
  },
  {
    name: "TrueBrands",
    body: "Three months in, both the co-founder and tech lead walked away. Mukund Gupta kept going alone until two new interns joined.",
  },
  {
    name: "PlaySuper",
    body: "Its founders' previous venture, CollegeShala, was acquired — then the 2023 edtech crash forced layoffs at the company that acquired it, before PlaySuper was even an idea.",
  },
];

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
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

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-background/50">
      {children}
    </div>
  );
}

function Section({
  id,
  tone = "light",
  container = "max-w-7xl",
  tightTop = false,
  tightBottom = false,
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "paper";
  container?: string;
  tightTop?: boolean;
  tightBottom?: boolean;
  children: React.ReactNode;
}) {
  const surfaceClass =
    tone === "paper"
      ? "bg-foreground"
      : tone === "dark"
        ? "bg-foreground"
        : "bg-foreground";
  const FILM_SECTION_RULE =
    "linear-gradient(to right, transparent, oklch(0.75 0.15 215) 12%, oklch(0.88 0.18 95) 50%, oklch(0.65 0.22 45) 88%, transparent)";
  const padClass = tightTop && tightBottom
    ? "px-4 pt-10 pb-12 sm:px-7 sm:pt-12 sm:pb-16 md:px-8 md:pt-14 md:pb-20 lg:px-12 lg:pt-16 lg:pb-24"
    : tightTop
      ? "px-4 pt-10 pb-16 sm:px-7 sm:pt-12 sm:pb-20 md:px-8 md:pt-14 md:pb-24 lg:px-12 lg:pt-16 lg:pb-32"
      : tightBottom
        ? "px-4 pt-16 pb-12 sm:px-7 sm:pt-20 sm:pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-12 lg:pt-32 lg:pb-24"
        : "px-4 py-16 sm:px-7 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32";
  return (
    <section id={id} className={`relative ${id === "spark" || id === "doing" || id === "dropshipping" ? "overflow-x-clip overflow-y-visible" : "overflow-hidden"} text-background ${surfaceClass}`}>
      {/* Homepage section rule — thin inset hairline floating above each section */}
      {id === "ventures" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute left-[6%] right-[6%] top-0 z-[1] h-px bg-background/15"
        />
      ) : id !== "journey" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute left-[6%] right-[6%] top-0 z-[1] h-[0.5px]"
          style={{ background: FILM_SECTION_RULE }}
        />
      ) : null}
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

function MediaRail({
  labels,
  kind = "image",
  className = "",
}: {
  labels: string[];
  kind?: "image" | "video";
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (active + direction + labels.length) % labels.length;
    const card = track.children[next] as HTMLElement | undefined;
    if (!card) return;
    setActive(next);
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={`mt-9 sm:mt-11 md:mt-12 ${className}`}>
      <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-background/15 pb-4">
        <span className="eyebrow text-background/50">
          {String(active + 1).padStart(2, "0")} / {String(labels.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-background/35 sm:inline">Slide to explore</span>
          <button type="button" aria-label="Previous media" onClick={() => go(-1)} className="flex size-10 items-center justify-center border border-background/20 text-background transition-colors hover:bg-background/10">
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <button type="button" aria-label="Next media" onClick={() => go(1)} className="flex size-10 items-center justify-center bg-background text-foreground transition-opacity hover:opacity-80">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          const first = track.children[0] as HTMLElement | undefined;
          if (!first) return;
          setActive(Math.min(labels.length - 1, Math.max(0, Math.round(track.scrollLeft / first.offsetWidth))));
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:-mx-7 sm:gap-4 sm:px-7 md:-mx-8 md:gap-5 md:px-8 lg:-mx-12 lg:gap-6 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {labels.map((label, index) => (
          <Reveal key={label} delay={index * 0.05} className="group w-[calc(100vw-2.5rem)] max-w-[32rem] shrink-0 snap-start sm:w-[72vw] md:w-[54vw] lg:w-[31vw]">
            <div className={`transition-transform duration-700 ease-out group-hover:-translate-y-2 ${index % 2 ? "md:mt-14" : ""}`}>
              <Placeholder kind={kind} aspect="aspect-[4/5] md:aspect-[5/4]" note={label} />
              <div className="mt-4 flex items-center justify-between border-t border-background/15 pt-4">
                <span className="font-serif-italic text-xl text-background/85">{label}</span>
                <span className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </Reveal>
        ))}
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
      <div
        ref={storyRef}
        className="relative mt-5 sm:mt-7 md:mt-8"
        style={{ height: `${count * 100}svh` }}
      >
        <div ref={stickyRef} className="sticky top-0 flex min-h-[100svh] items-end overflow-hidden pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+88px)] md:pt-4 md:pb-[84px] lg:pt-4 lg:pb-[84px]">
        <div className="w-full pt-0 sm:pt-1 md:pt-2 lg:pt-0">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(72px,0.28fr)_minmax(0,1fr)] items-stretch gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(120px,0.3fr)_minmax(0,1fr)] sm:gap-4 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.36fr)_minmax(0,1fr)] md:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.4fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-2 grid min-h-[2.75rem] text-center text-background/45 sm:mb-3 sm:min-h-[3rem]">
                {companies.map((item, index) => (
                  <span key={item.name} aria-hidden={index !== active} className={`col-start-1 row-start-1 self-end ${index === active ? "visible" : "invisible"}`}>
                    {item.founder} — {item.cohort}
                  </span>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-[6px]">
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
                    className="rounded-[6px]"
                  />
                </motion.div>
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
              <div className="relative overflow-hidden rounded-[6px]">
                <motion.div
                  key={`right-${active}`}
                  initial={reduceMotion ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Placeholder
                    kind="image"
                    aspect="aspect-[1200/896]"
                    note={`${company.name} — product detail`}
                    className="rounded-[6px]"
                  />
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
                  <p className="mx-auto mt-2.5 text-[0.98rem] leading-[1.6] text-background/70 sm:mt-3 md:text-[1.05rem] md:leading-[1.65]">
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
              className="group mx-auto mt-10 block w-full overflow-hidden rounded-2xl border border-background/15 text-left transition-transform duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 sm:mt-12 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl"
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
                <span className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 sm:size-20">
                  <Play className="ml-0.5 size-6 fill-current sm:size-7" strokeWidth={2} />
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
              <p className="mt-2 text-[0.96rem] leading-[1.6] text-background/75 sm:text-[1rem] md:text-[1.02rem] md:leading-[1.65]">
                {b.body}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

function OutclassSection() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let next = 0;
    return onScrollFrame(
      () => {
        if (next !== active) setActive(next);
      },
      () => {
        const vh = window.innerHeight || 1;
        // A card becomes "active" once its top has reached the pin line.
        const line = vh * 0.34;
        let found = 0;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const top = el.getBoundingClientRect().top;
          if (top <= line + 4) found = Math.max(found, i);
        });
        next = found;
      },
    );
  }, [active]);



  return (
    <Section id="doing" tone="paper">
      {/* Main divider rule above the section */}
      <div aria-hidden className="spectrum-rule pointer-events-none absolute left-[6%] right-[6%] top-0 z-[2] h-px" />
      <div className="grid gap-8 border-b border-background/15 pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-8">
          <Reveal><Eyebrow>The Outclass</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium leading-[1.12] tracking-[-0.02em] sm:mt-6 md:leading-[1.08]">
              Half the curriculum doesn&apos;t happen in a classroom.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="max-w-[42ch] text-[13px] leading-[1.6] text-background/70 md:ml-auto md:text-[15px] md:leading-[1.75]">
            At Masters&apos; Union, real growth doesn&apos;t come from case studies — it comes from taking risks,
            testing ideas, and putting something into the world.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-8 sm:mt-12 md:mt-16 lg:grid-cols-[minmax(180px,0.42fr)_minmax(0,1.58fr)] lg:gap-14">
        <aside className="hidden self-start lg:sticky lg:top-[38svh] lg:flex lg:flex-col">
          <div className="eyebrow text-background/45">So I started doing something about it.</div>

          <ol className="mt-8 border-l border-background/15">
            {OUTCLASS_MOMENTS.map((moment, index) => (
              <li
                key={moment.n}
                className={`relative border-l py-3 pl-5 transition-all duration-500 ${
                  index === active ? "-ml-px border-accent text-background" : "border-transparent text-background/35"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{moment.n} — {moment.action}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="relative pb-16 sm:pb-20 lg:pb-0">
          {OUTCLASS_MOMENTS.map((moment, index) => {
            const depth = Math.max(0, Math.min(active - index, 3));
            return (
            <div
              key={moment.n}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="sticky mb-8 last:mb-0 sm:mb-10 lg:mb-14"
              style={{ top: `calc(3rem + ${index * 1.25}rem)`, zIndex: index + 1 }}
            >

              <div
                className="transition-[transform,filter] duration-700 ease-out"
                style={{
                  transformOrigin: "top center",
                  transform: `scale(${1 - depth * 0.018})`,
                  filter: depth > 0 ? `blur(${Math.min(depth * 4, 10)}px)` : "blur(0px)",
                }}
              >
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl border border-background/15 bg-foreground shadow-[0_-18px_40px_-28px_rgba(0,0,0,0.85),0_30px_70px_-35px_rgba(0,0,0,0.9)]"
                >
                  <div

                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[3] bg-foreground transition-opacity duration-500"
                    style={{ opacity: depth * 0.16 }}
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/[0.04]" />

                  <div className="relative grid gap-7 p-6 sm:gap-9 sm:p-9 md:grid-cols-12 md:items-center md:gap-8 md:p-10 lg:p-12">
                    <div className="md:col-span-5">
                      <span className="block font-display text-[clamp(4rem,10vw,8.5rem)] font-light leading-[0.82] text-background/12">
                        {moment.n}
                      </span>
                      <div className="mt-5 flex items-center gap-3">
                        <span aria-hidden className="h-px w-9 bg-accent" />
                        <span className="eyebrow text-background/65">{moment.action}</span>
                      </div>
                      <h3 className="mt-4 max-w-[15ch] text-[clamp(1.5rem,3.2vw,2.65rem)] font-medium leading-[1.05]">
                        {moment.label}
                      </h3>
                      <p className="mt-4 max-w-[34ch] text-[13px] leading-[1.65] text-background/65 md:text-[15px] md:leading-[1.75]">
                        {moment.body}
                      </p>
                    </div>
                    <div className="md:col-span-7">
                      {moment.image ? (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
                          <img
                            src={moment.image}
                            alt={moment.media}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="absolute inset-0 size-full object-cover"
                          />
                        </div>
                      ) : (
                        <Placeholder kind="image" aspect="aspect-[16/10]" note={moment.media} className="rounded-[6px]" />
                      )}
                    </div>
                  </div>
                </motion.article>
              </div>
            </div>
            );
          })}

        </div>
      </div>
    </Section>
  );
}

function FounderPoster({ v, ratio }: { v: VentureTile; ratio: string }) {
  return (
    <article className={`group relative ${ratio} overflow-hidden break-inside-avoid`}>
      {/* full-bleed founder photo — covers the entire tile */}
      <img
        src={v.photo}
        alt={`${v.company} founders`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.03]"
      />

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
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/85 via-black/50 to-transparent sm:h-[45%]" />

      {/* caption block overlaid on the photo */}
      <div className="absolute inset-x-0 bottom-0 px-2 pb-1.5 sm:px-4 sm:pb-3">
        <div className="flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] leading-[1.05] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-[clamp(0.95rem,1.6vw,1.35rem)] sm:tracking-[-0.035em]">
              {v.company}
            </p>
            <p className="mt-0.5 hidden text-[10px] uppercase tracking-[0.14em] text-white/75 sm:block">
              {v.sector}
            </p>
          </div>
          <p className="shrink-0 text-[8px] font-medium leading-none text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-[13px] sm:tracking-[-0.03em] sm:text-white">
            {v.raised}
          </p>
        </div>
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
        <span aria-hidden className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-[calc(48px/var(--ep-scale,1))] w-[calc(48px/var(--ep-scale,1))] items-center justify-center rounded-full border border-background/40 bg-black/45 backdrop-blur-sm transition-colors duration-300 group-hover:border-background/70 group-hover:bg-black/60 sm:h-[calc(56px/var(--ep-scale,1))] sm:w-[calc(56px/var(--ep-scale,1))]">
            <svg viewBox="0 0 24 24" className="ml-[calc(2px/var(--ep-scale,1))] h-[calc(16px/var(--ep-scale,1))] w-[calc(16px/var(--ep-scale,1))] fill-background sm:h-[calc(20px/var(--ep-scale,1))] sm:w-[calc(20px/var(--ep-scale,1))]" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
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
          <Reveal><Eyebrow>Dropshipping Challenge</Eyebrow></Reveal>
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
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-foreground/90 via-foreground/45 to-transparent px-4 pb-14 pt-4">
                      <span
                        className="font-mono font-medium uppercase tracking-[0.28em] text-background"
                        style={{ fontSize: "calc(11px / var(--ep-scale, 1))" }}
                      >
                        Episode 0{index + 1}
                      </span>
                      <span
                        className="rounded-full bg-background/80"
                        style={{ width: "calc(7px / var(--ep-scale, 1))", height: "calc(7px / var(--ep-scale, 1))" }}
                      />
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
    <Section id="ventures" tone="light">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-background/40 sm:text-[10px]">
            Selected student ventures
          </p>
          <h3 className="mb-3 mt-1.5 font-display text-[clamp(1.7rem,4vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.03em] sm:mb-5 sm:mt-2">
            Then I put it in front of{" "}
            <em className="font-serif-italic font-light !text-background">real people</em>
          </h3>
        </div>
      </div>

      <div ref={foundersGridRef}>
        {/* Mobile + tablet masonry keeps variable-height cards tightly packed. */}
        <div className="columns-3 gap-[3px] sm:columns-4 xl:hidden">
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
      <div aria-hidden className="spectrum-rule pointer-events-none mt-14 h-px w-full sm:mt-16" />
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
  const progress = ((active + 1) / stages.length) * 100;

  return (
    <div
      ref={cardRef}
      className="relative mt-10 h-[min(78svh,48rem)] min-h-[38rem] overflow-hidden rounded-[8px] border border-background/15 bg-[#F5E7C8] text-foreground sm:mt-12 md:h-[min(82svh,52rem)] md:min-h-[42rem] lg:mt-16 lg:min-h-[44rem]"
      onPointerDown={(event) => { pointerStartRef.current = event.clientX; }}
      onPointerUp={(event) => {
        const start = pointerStartRef.current;
        pointerStartRef.current = null;
        if (start === null || Math.abs(event.clientX - start) < 60) return;
        goTo(active + (event.clientX < start ? 1 : -1));
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={stage.name}
          custom={direction}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid md:grid-cols-[minmax(0,1.7fr)_minmax(19rem,0.8fr)]"
        >
          <div className="relative min-h-0 overflow-hidden">
            <motion.img
              src={stage.image}
              alt={`${stage.name} stage of the Venture Initiation Programme`}
              className="h-full w-full object-cover"
              initial={reduceMotion ? false : { scale: 1.08, x: direction * 28 }}
              animate={{ scale: 1, x: 0 }}
              exit={reduceMotion ? undefined : { scale: 1.03, x: direction * -18 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/10 to-foreground/35 md:bg-linear-to-r md:from-foreground/20 md:via-transparent md:to-foreground/35" />
            <div className="absolute inset-x-5 top-5 flex items-start justify-between text-background sm:inset-x-7 sm:top-7 lg:inset-x-10 lg:top-9">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-background/60">The Venture Initiation Programme</p>
                <p className="mt-2 max-w-[12ch] font-display text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-[0.95]">From Idea to Demo Day</p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.16em] text-background/65">{stage.n} / {String(stages.length).padStart(2, "0")}</span>
            </div>
            <motion.span
              aria-hidden
              className="absolute bottom-1 left-3 font-serif-italic text-[clamp(9rem,22vw,20rem)] leading-none text-background/12 sm:left-6"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
            >
              {stage.n}
            </motion.span>
          </div>

          <div className="relative z-10 flex min-h-[22rem] flex-col justify-between border-t border-foreground/15 bg-[#F5E7C8] px-5 py-6 sm:px-8 sm:py-8 md:min-h-0 md:border-l md:border-t-0 lg:px-10 lg:py-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.08 }}
            >
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/55">
                <span className={`size-1.5 rounded-full ${stage.culmination ? "bg-accent" : "bg-primary"}`} />
                Stage {stage.n}
              </div>
              <h3 className="mt-5 max-w-[9ch] font-serif-italic text-[clamp(2.8rem,5vw,5.7rem)] font-light leading-[0.88] text-foreground">{stage.name}</h3>
              <p className="mt-6 max-w-[34ch] text-[13px] leading-[1.65] text-foreground/65 sm:text-[14px] lg:mt-8 lg:text-[15px] lg:leading-[1.75]">{stage.body}</p>
              <div className="mt-7 min-h-10 border-t border-foreground/15 pt-4 lg:mt-9">
                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/40">{stage.grant ? "Grant" : "Investors in the room"}</span>
                <span className="mt-1 block text-[13px] font-medium text-foreground">{stage.grant ?? "150+"}</span>
              </div>
            </motion.div>

            <div className="mt-7 flex items-end justify-between gap-5">
              <div className="min-w-0 flex-1">
                <div className="h-px overflow-hidden bg-foreground/15">
                  <motion.div className="h-full origin-left bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.5 }} />
                </div>
                <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/40">Step {stage.n} of {String(stages.length).padStart(2, "0")}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" aria-label="Previous VIP stage" onClick={() => goTo(active - 1)} disabled={active === 0} className="flex size-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-25">
                  <ArrowRight className="size-4 rotate-180" strokeWidth={1.5} />
                </button>
                <button type="button" aria-label="Next VIP stage" onClick={() => goTo(active + 1)} disabled={active === stages.length - 1} className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-25">
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function VipSection() {
  return (
    <Section id="journey" tone="paper" tightTop>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>The Venture Initiation Programme (VIP)</Eyebrow></Reveal>
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

      <VipJourney stages={VIP_STAGES} />
    </Section>
  );
}



function PortfolioCard({ company, delay = 0, featured = false }: { company: Company; delay?: number; featured?: boolean }) {
  return (
    <Reveal delay={delay} className={featured ? "md:col-span-2" : undefined}>
      <article className={`group relative h-full overflow-hidden border border-background/10 bg-background/[0.045] p-5 text-background transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 sm:p-6 md:p-7 ${featured ? "md:p-9 lg:p-10" : ""}`}>
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <LogoBadge src={VENTURE_IMAGES[company.name]} alt={`${company.name} logo`} size={featured ? "size-11" : "size-9"} />
            <h3 className={`font-medium leading-tight ${featured ? "text-[1.6rem]" : "text-[1.1rem]"}`}>{company.name}</h3>
          </div>
          <span className="eyebrow shrink-0 text-background/45">{company.category}</span>
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-background/50">{company.founder}</div>
        <div className={`mt-4 font-medium tracking-[-0.02em] ${featured ? "text-[1.6rem]" : "text-[1.15rem]"}`}>{company.metric}</div>
        <p className={`mt-3 leading-[1.6] text-background/70 ${featured ? "max-w-[60ch] text-[1rem]" : "text-[0.92rem]"}`}>
          {company.description}
        </p>
      </article>
    </Reveal>
  );
}

function CtaButton({
  children,
  dark = false,
  icon,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
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

function StartupsPage() {
  const [showMorePortfolio, setShowMorePortfolio] = useState(false);
  const [selectedShark, setSelectedShark] = useState(0);
  const [selectedQuote, setSelectedQuote] = useState(0);
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

  const activeShark = SHARK_TANK[selectedShark];
  const activeQuote = TESTIMONIALS[selectedQuote];

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
              {/* Mountain ridgeline: dashed lines rise from the video frame
                  edges into a peaked range that sits below the MU logo and
                  above the headline. Mobile uses a shallower range because the
                  band between logo and headline is tighter. The ridgeline dims
                  in lockstep with the pinned copy. */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 w-full max-w-3xl -translate-x-1/2 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl"
                style={reduceHeroMotion ? { opacity: 1 } : { opacity: heroTextOpacity }}
              >
              <svg
                className="pointer-events-none absolute bottom-0 left-0 h-[310px] w-full text-background/25 sm:hidden"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M1.5 100 L1.5 24 L12 19 L25 23.5 L38 20 L50 17.5 L62 20 L75 23.5 L88 19 L98.5 24 L98.5 100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="text-background/10"
                  d="M1.5 24 L14 20.5 L27 23.8 L40 21 L50 19 L60 21 L73 23.8 L86 20.5 L98.5 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <svg
                className="pointer-events-none absolute bottom-0 left-0 hidden w-full text-background/25 sm:block sm:h-[352px] md:h-[400px] lg:h-[410px]"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M1.5 100 L1.5 21 L14 15 L26 20 L38 10.5 L50 4.5 L62 10.5 L74 20 L86 15 L98.5 21 L98.5 100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="text-background/10"
                  d="M8 21 L20 16.5 L32 21 L44 11.5 L50 8 L56 11.5 L68 21 L80 16.5 L92 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              </motion.div>
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
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-12 bg-gradient-to-r from-sky-400 via-yellow-300 to-orange-400" />
                <Eyebrow>The Spark</Eyebrow>
              </div>
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
      <VenturesMosaicSection />

      <Section id="eight" tone="dark">
        <Reveal>
          <Eyebrow dark>Chapter 01 · MU Whiteboards to 5M+ Downloads</Eyebrow>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="mt-4 flex items-center gap-3">
            <LogoBadge src={VENTURE_IMAGES.Eight} alt="Eight logo" dark />
            <FounderLine names="Mohit Paliwal · Mohit Goswami · Yugal Tamang" cohort="PGP TBM 2021" dark />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.8rem,4.2vw,3.6rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            What if the next big creator wasn&apos;t on camera?
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <ChapterChips labels={EIGHT_BEATS.map((b) => b.stage)} dark />
        </Reveal>
        <div className="relative mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:gap-10 md:mt-12 md:grid-cols-[1fr_0.85fr] md:items-start md:gap-10 lg:gap-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-2 select-none text-[6rem] font-bold leading-none text-background/[0.035] md:text-[9rem]"
          >
            01
          </span>
          <StoryBeats beats={EIGHT_BEATS} dark />
          <div className="md:sticky md:top-24">
            <Reveal delay={0.1}>
              <Placeholder kind="image" src={VENTURE_IMAGES.Eight} alt="Eight" aspect="aspect-[3/2]" dark />
            </Reveal>
          </div>
        </div>
        <MediaRail labels={["The first whiteboard", "Recording the pilot", "The founding team", "Five million downloads"]} />
        <Reveal delay={0.1} className="mt-12 border-t border-background/10 pt-8">
          <KeyMetrics
            dark
            dominant={{ value: "5M+", label: "Downloads" }}
            supporting={[
              { value: "750K+", label: "Monthly active users" },
              { value: "80,000+", label: "Paid subscribers" },
            ]}
          />
        </Reveal>
      </Section>

      <Section id="bambaii" tone="light">
        <Reveal>
          <Eyebrow>Chapter 20 · From Dorm Room Experiment to India&apos;s Favorite Guilt-Free Snack</Eyebrow>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="mt-4 flex items-center gap-3">
            <LogoBadge />
            <FounderLine names="Gaurav Dasgupta" cohort="PGP TBM 2025" />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-serif-italic mt-5 max-w-[28ch] text-balance text-[clamp(1.8rem,4.2vw,3.6rem)] !font-serif !font-light leading-[1.04] !text-transparent" style={{ backgroundImage: "linear-gradient(100deg, oklch(0.75 0.15 215), oklch(0.88 0.18 95) 53%, oklch(0.65 0.22 45))", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
            &ldquo;Ek haath se becho, dusre haath se paise lo.&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <ChapterChips labels={BAMBAII_BEATS.map((b) => b.stage)} />
        </Reveal>
        <div className="relative mt-8 grid grid-cols-1 gap-9 sm:mt-10 sm:gap-10 md:mt-12 md:grid-cols-[0.85fr_1fr] md:items-start md:gap-10 lg:gap-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 select-none text-[6rem] font-bold leading-none text-background/[0.035] md:text-[9rem]"
          >
            20
          </span>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {["Dorm-room batch", "Product detail", "Packing orders", "Customer tasting"].map((label, index) => (
                <div key={label} className={index % 2 ? "translate-y-8" : ""}>
                  <Placeholder kind="image" aspect="aspect-[4/5]" note={label} />
                </div>
              ))}
            </div>
          </Reveal>
          <StoryBeats beats={BAMBAII_BEATS} />
        </div>
        <Reveal delay={0.1} className="mt-12 border-t border-background/10 pt-8">
          <KeyMetrics
            dominant={{ value: "₹50L", label: "ARR" }}
            supporting={[
              { value: "5,000+", label: "Customers" },
              { value: "₹1.2Cr", label: "Projected revenue" },
            ]}
          />
        </Reveal>
      </Section>

      <Section id="eat-atlas" tone="dark">
        <Reveal>
          <Eyebrow dark>Chapter 27 · From Bland Chips to Bold Global Dips</Eyebrow>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="mt-4 flex items-center gap-3">
            <LogoBadge dark />
            <FounderLine names="Ishita Gupta · Anshul Gupta · Mayuresh Jadhav" cohort="PGP TBM 2024" dark />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.8rem,4.2vw,3.6rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            One bland chip. Three founders who couldn&apos;t stop thinking about it.
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <ChapterChips labels={EATATLAS_BEATS.map((b) => b.stage)} dark />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <span
            aria-hidden
            className="mb-3 block select-none text-[3.5rem] font-bold leading-none text-background/15 md:text-[4.5rem]"
          >
            27
          </span>
          <Placeholder kind="image" aspect="aspect-[21/9]" dark note="Product photography / pop-up event" />
        </Reveal>
        <MediaRail labels={["The bland chip", "Flavour trials", "Pop-up counter", "First sold-out batch"]} />
        <div className="mt-9 sm:mt-11 md:mt-12 md:columns-2 md:gap-x-10 lg:gap-x-12">
          <StoryBeats beats={EATATLAS_BEATS} dark />
        </div>
        <Reveal delay={0.1} className="mt-12 border-t border-background/10 pt-8">
          <KeyMetrics
            dark
            dominant={{ value: "₹80L", label: "ARR" }}
            supporting={[
              { value: "₹15L", label: "Raised" },
              { value: "₹2Cr", label: "Projected FY26" },
            ]}
          />
        </Reveal>
      </Section>

      <Section id="pattern" tone="paper">
        <Reveal>
          <Eyebrow>Zoom Out</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            The company changes. The pattern doesn&apos;t.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-px border border-background/10 sm:mt-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {PATTERN_STEPS.map((step, i) => (
            <Reveal key={step} delay={0.05 + i * 0.04}>
              <div className="group flex min-h-20 items-center justify-between border-background/10 p-5">
                <span className="eyebrow text-background/75 transition-colors group-hover:text-accent">
                  {step}
                </span>
                {i < PATTERN_STEPS.length - 1 && <ArrowRight className="size-3.5 text-background/30" aria-hidden />}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[68ch] text-[13px] leading-[1.6] text-background/70 md:text-[15px] md:leading-[1.75] md:mt-10">
            A cafeteria question about who gets to be a creator. A canteen complaint about boring chips. A
            ₹60 snack mix nobody wanted, repriced to ₹50 and sold out in an hour. None of these started as
            a business plan — they started as a small, cheap experiment that either worked or told the
            founder something true. This is an editorial pattern, not a claim that every startup on this
            page followed the exact same sequence — but it's the shape that shows up again and again.
          </p>
        </Reveal>
      </Section>

      <Section id="sharktank" tone="dark">
        <Reveal>
          <div className="flex items-center gap-2">
            <Tv className="size-4 text-background/55" strokeWidth={1.75} />
            <Eyebrow dark>On Shark Tank India</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            Real founders. Real pitches. National television.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[64ch] text-[13px] leading-[1.6] text-background/75 md:text-[15px] md:leading-[1.75] md:mt-7">
            Masters&apos; Union students have pitched on India&apos;s biggest startup stage — not as
            alumni years removed from campus, but while still building.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Placeholder kind="image" src={sharkTankStageImg.url} alt="Shark Tank India stage" aspect="aspect-[21/9]" dark />
        </Reveal>

        <div className="mt-px grid grid-cols-1 gap-px bg-background/10 sm:grid-cols-3">
          {SHARK_TANK.map((f, i) => (
            <Reveal key={f.company} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setSelectedShark(i)}
                aria-pressed={selectedShark === i}
                className={`h-full w-full p-5 text-left transition-colors duration-300 sm:p-6 md:p-7 ${
                  selectedShark === i ? "bg-background/[0.045] text-background" : "bg-foreground text-background hover:bg-background/[0.06]"
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <LogoBadge src={VENTURE_IMAGES[f.company]} alt={`${f.company} logo`} dark={selectedShark !== i} />
                    <h3 className="text-[1.15rem] font-medium">{f.company}</h3>
                  </div>
                  <span className={`eyebrow ${selectedShark === i ? "text-background/45" : "text-background/45"}`}>{f.season}</span>
                </div>
                <div
                  className={`mt-3 text-[11px] uppercase tracking-[0.18em] ${
                    selectedShark === i ? "text-background/50" : "text-background/50"
                  }`}
                >
                  {f.founder} · {f.cohort}
                </div>
                <p className={`mt-4 text-[0.95rem] leading-[1.65] ${selectedShark === i ? "text-background/75" : "text-background/75"}`}>
                  {f.description}
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Placeholder
            kind="video"
            aspect="aspect-video md:aspect-[21/9]"
            dark
            note={`${activeShark.company} — ${activeShark.season} pitch reel`}
          />
        </Reveal>
      </Section>

      <Section id="hssl" tone="paper">
        <Reveal>
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-background/55" strokeWidth={1.75} />
            <Eyebrow>High School Startup League</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            The founders here haven&apos;t graduated high school yet.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[66ch] text-[13px] leading-[1.6] text-background/70 md:text-[15px] md:leading-[1.75] md:mt-7">
            A separate pipeline, built for Class IX–XII students, not current Masters&apos; Union
            enrollees — a launchpad for teen founders to create, pitch, and take their first cheque, with
            past judges including Ashneer Grover, Ankur Warikoo, Techburner, and Sarthak Ahuja.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-px bg-background/10 sm:mt-11 md:mt-12 md:grid-cols-4">
          {HSSL_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.04}>
              <div className="h-full border-t-2 border-accent bg-background/[0.045] px-5 py-8 transition-colors duration-300 hover:bg-accent/[0.06]">
                <div className="text-[clamp(1.7rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">{s.value}</div>
                <div className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-background/55">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
            {HSSL_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="eyebrow rounded-full border border-accent px-4 py-2 text-background transition-colors duration-300 hover:bg-accent/10">
                  {stage}
                </span>
                {i < HSSL_STAGES.length - 1 && <ArrowRight className="size-3.5 text-background/30" aria-hidden />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <Placeholder kind="video" aspect="aspect-video" note="High School Startup League highlight reel" />
        </Reveal>
        <MediaRail
          kind="video"
          labels={["Meet the teen founders", "Prototype lab", "Pitch rehearsal", "The final stage"]}
        />
      </Section>

      <Section id="scale" tone="dark">
        <Reveal>
          <Eyebrow dark>By the Numbers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            This isn&apos;t three stories. It&apos;s a portfolio.
          </h2>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-7 sm:mt-11 sm:gap-8 md:mt-14 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-10 lg:gap-12">
          <Reveal delay={0.1}>
            <div className="text-[clamp(3.2rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em]">
              ₹593.10 Cr
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-background/55">
              Total valuation, across 30+ startups
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {ECOSYSTEM_STATS.filter((s) => s.label !== "Total valuation" && s.label !== "Startups launched").map((s, i) => (
              <Reveal key={s.label} delay={0.05 + i * 0.03}>
                <div className="border border-background/15 px-5 py-4 transition-colors duration-300 hover:border-background/30">
                  <div className="text-[1.3rem] font-medium leading-none tracking-[-0.02em]">{s.value}</div>
                  <div className="mt-2 text-[9px] uppercase leading-relaxed tracking-[0.16em] text-background/55">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-[68ch] text-[13px] leading-[1.6] text-background/70 md:text-[15px] md:leading-[1.75] md:mt-12">
            More than half of these startups have raised over $1 million. Together, their founders have
            created 500+ jobs since 2021. And when a startup doesn&apos;t make it, the founder walks away
            with sharper skills, real experience, and often, an incredible job offer anyway.
          </p>
        </Reveal>

        <MediaRail labels={["Demo Day crowd", "Pitch room", "Investor conversations", "Founder celebrations"]} />
      </Section>

      <Section id="people" tone="light">
        <Reveal>
          <Eyebrow>Mentors, VCs, and Believers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            Behind every founder is a room full of people who&apos;ve already done it.
          </h2>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:mt-11 sm:gap-10 md:mt-14 md:grid-cols-[1fr_0.55fr] md:items-start md:gap-10 lg:gap-12">
          <Reveal key={selectedQuote}>
            <figure>
              <blockquote className="text-balance text-[clamp(1.3rem,2.6vw,2rem)] italic leading-[1.4] text-background/90">
                &ldquo;{activeQuote.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <PortraitBadge />
                <figcaption className="eyebrow text-background/55">
                  {activeQuote.name} · {activeQuote.role}
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <div className="flex flex-row flex-wrap gap-2 md:flex-col md:items-stretch">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setSelectedQuote(i)}
                aria-pressed={selectedQuote === i}
                className={`border-l-2 px-4 py-2 text-left text-[0.85rem] transition-colors duration-300 ${
                  selectedQuote === i ? "border-background text-background" : "border-background/10 text-background/45 hover:text-background/70"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
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
              <Eyebrow dark>For Those Going All In</Eyebrow>
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
            <Reveal delay={0.15} className="mt-9">
              <div className="grid max-w-xl grid-cols-2 gap-3">
                {["Founder at work", "Mentor session", "Product sprint", "Investor room"].map((label, index) => (
                  <div key={label} className={index === 1 || index === 3 ? "translate-y-7" : ""}>
                    <Placeholder kind="image" aspect="aspect-[4/5]" dark note={label} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="next-gen" tone="light">
        <Reveal>
          <Eyebrow>The UG Ecosystem, 2025–26</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            The founders below aren&apos;t waiting for an MBA to start.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[66ch] text-[13px] leading-[1.6] text-background/70 md:text-[15px] md:leading-[1.75] md:mt-7">
            Masters&apos; Union&apos;s undergraduate cohort has its own entrepreneurship track — and its
            own portfolio. In the 2025–26 cycle alone, UG founders have been granted ₹75L+ and generated
            ₹14Cr+ in revenue, with two startups earning Shark Tank India pitches.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-px bg-background/10 sm:mt-11 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {NEXT_GEN.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.04}>
              <article className="group h-full bg-background/[0.045] p-7 transition-colors duration-300 hover:bg-background/[0.08]">
                <div className="flex items-center gap-3">
                  <LogoBadge size="size-8" />
                  <h3 className="text-[1.05rem] font-medium">{v.name}</h3>
                </div>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-background/70">{v.pitch}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="portfolio" tone="paper">
        <Reveal>
          <Eyebrow>Selected Companies</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            Portfolio
          </h2>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-px bg-background/10 sm:mt-11 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {PORTFOLIO_PRIMARY.map((p, i) => (
            <PortfolioCard key={p.name} company={p} delay={i * 0.03} featured={i === 0} />
          ))}
          {showMorePortfolio &&
            PORTFOLIO_MORE.map((p, i) => <PortfolioCard key={p.name} company={p} delay={i * 0.03} />)}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowMorePortfolio((v) => !v)}
            className="eyebrow inline-flex items-center gap-2 text-background/70 transition-colors hover:text-background"
          >
            {showMorePortfolio ? "Show fewer ventures" : "View all ventures"}
            <ArrowRight className={`size-3.5 transition-transform duration-300 ${showMorePortfolio ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </Reveal>
      </Section>

      <Section id="reality" tone="dark">
        <Reveal>
          <Eyebrow dark>Not a Straight Line</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] md:leading-[1.08] tracking-normal">
            For every launch, there&apos;s a version that didn&apos;t work first.
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-px border-y border-background/10 sm:mt-12 md:mt-14 md:grid-cols-2">
          {REALITY_EXAMPLES.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <li className="h-full border-background/10 p-5 sm:p-6 md:p-8 lg:p-9">
                <span className="font-serif-italic text-[1rem]">{r.name}</span>
                <p className="mt-3 max-w-[70ch] text-[13px] leading-[1.6] text-background/80 md:text-[15px] md:leading-[1.75]">{r.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-14">
          <Placeholder kind="video" aspect="aspect-video" dark note="Founder-interview, talking-head" />
        </Reveal>
      </Section>

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
    ],
  }),
  component: StartupsPage,
});
