import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import hiveschoolVentureImg from "@/assets/founders/ventures/hiveschool.jpg.asset.json";
import lexisVentureImg from "@/assets/founders/ventures/lexis.jpg.asset.json";
import playsuperVentureImg from "@/assets/founders/ventures/playsuper.jpg.asset.json";
import seedsaiVentureImg from "@/assets/founders/ventures/seedsai.jpg.asset.json";
import woodysVentureImg from "@/assets/founders/ventures/woodys.jpg.asset.json";
import sharkTankStageImg from "@/assets/founders/sharktank-stage.jpg.asset.json";
import muLogoAsset from "@/assets/mu-logo-dark.png.asset.json";
import studentEnterHeroAsset from "@/assets/studentEnterHero-3.webp.asset.json";
import entrepreneurshipReport2021 from "@/assets/entrepreneurship-report-2021-25.pdf.asset.json";
import entrepreneurshipReportUg from "@/assets/entrepreneurship-report-ug-programmes.pdf.asset.json";
import studentEntrepreneurshipVideo from "@/assets/MU_Student_Entreprenuership_Video-2.mp4.asset.json";
import sparkVideoThumb from "@/assets/spark-video-thumb.jpg";
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

const SPARK_EXAMPLES = [
  {
    name: "Nivara",
    founder: "Vikas Kabra",
    body: "Vikas Kabra didn't set out to build a diamond company. A personal milestone made him ask why lab-grown diamond jewellery felt neither modern nor accessible — and Nivara was born from that question.",
  },
  {
    name: "Yango",
    founder: "Sakshi Tuteja",
    body: "Sakshi Tuteja overheard a mother ask, in a product meeting at GNC, “Why don't we have healthier options for kids?” She couldn't shake the question. Yango is the answer.",
  },
  {
    name: "Eight",
    founder: "Mohit Paliwal",
    body: "Mohit Paliwal, Mohit Goswami, and Yugal Tamang realized at a Masters' Union cafeteria table that not everyone wants to be seen, but everyone has a story worth telling — Eight became the stage for it.",
  },
  {
    name: "SeedsAI",
    founder: "Shubham Khatri & Vansh Miglani",
    body: "Shubham Khatri and Vansh Miglani didn't start with a business plan. They started by shadowing NBFC call-center agents and noticing how much time was wasted on manual review.",
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

const DROPSHIPPING_STATS = [
  { value: "₹10Cr+", label: "Revenue generated", dominant: true },
  { value: "500+", label: "Students participated" },
  { value: "150+", label: "Businesses built" },
];

const DROPSHIPPING_TOP = [
  { name: "Zeller Crystals", revenue: "₹14.17L", body: "India's first crystal couture brand." },
  { name: "The Frenzie Store", revenue: "₹14L", body: "A hair-care brand built around frizz-free, shiny, smooth results." },
  { name: "Khareedo.shop", revenue: "₹11.8L", body: "Drones, home decor, and orthopaedic pillows under one storefront." },
  { name: "ThriftFly", revenue: "₹11.3L", body: "A travel-discounts platform built as a student side hustle." },
];

type Stage = { n: string; name: string; grant: string | null; body: string; culmination?: boolean };

const VIP_STAGES: Stage[] = [
  {
    n: "01",
    name: "Pre-Seed",
    grant: "₹15–20L",
    body: "Bust the myths, find a real problem worth solving, pick the right co-founders, learn to talk to customers — validated in front of founders, VCs, and alumni.",
  },
  {
    n: "02",
    name: "MVP",
    grant: "₹15–20L",
    body: "Build the smallest real version of the idea, prove customer centricity, ship on no-to-low-code tools, and defend it at MVP Demo Day.",
  },
  {
    n: "03",
    name: "Go-to-Market",
    grant: "₹20L",
    body: "Learn the marketing playbook and understand your funnel — turning a working product into a repeatable one.",
  },
  {
    n: "04",
    name: "Product-Market Fit",
    grant: "₹25L",
    body: "One final dry run, then Demo Day.",
  },
  {
    n: "05",
    name: "Demo Day",
    grant: null,
    body: "150+ venture capitalists and angel investors in the room, assessing student startups for real funding.",
    culmination: true,
  },
];

type Episode = { label: string; body: string; culmination?: boolean };

const STARTUP_CHALLENGE_EPISODES: Episode[] = [
  {
    label: "Episode 1",
    body: "Founders of 73 Boston, NOVA School, and Samarpana take leading Indian investors through the journey of their market research.",
  },
  {
    label: "Episode 2",
    body: "Fundee, Buzzinga, and Zwel's founders pitch to over 100 venture capitalists to show why their ideas are worth investing in.",
  },
  {
    label: "Episode 3",
    body: "Crispee, Soul Gappa, and Modulus showcase their startup ideas, vying for mentorship and funding from key investors.",
  },
  {
    label: "Grand Finale",
    body: "The top three startups secure funding worth over ₹30 lakh, plus exclusive 1:1 mentorship from India's biggest investors.",
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
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "paper";
  container?: string;
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
  return (
    <section id={id} className={`relative ${id === "spark" ? "overflow-x-clip overflow-y-visible" : "overflow-hidden"} text-background ${surfaceClass}`}>
      {/* Homepage section rule — thin inset gradient hairline floating above each section */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] right-[6%] top-0 z-[1] h-[0.5px]"
        style={{ background: FILM_SECTION_RULE }}
      />
      {id ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 top-6 select-none font-display text-[clamp(4.5rem,14vw,12rem)] font-light uppercase leading-none text-background/[0.025] md:right-6 md:top-8"
        >
          {id.replace("-", " ")}
        </span>
      ) : null}
      <div className={`relative z-[1] mx-auto w-full ${container} px-4 py-16 sm:px-7 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32`}>{children}</div>
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
    <div
      ref={storyRef}
      className="relative mt-5 sm:mt-7 md:mt-8"
      style={{ height: `${(count + 0.75) * 100}svh` }}
    >
      <div ref={stickyRef} className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-5 sm:py-7 md:py-9 lg:py-10">
        <div className="w-full pt-2 sm:pt-3 md:pt-4">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(96px,0.46fr)_minmax(0,1fr)] items-stretch gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(165px,0.55fr)_minmax(0,1fr)] sm:gap-4 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.6fr)_minmax(0,1fr)] md:gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.76fr)_minmax(0,1fr)] lg:gap-10">
            <motion.div
              key={`left-${active}`}
              initial={reduceMotion ? false : { opacity: 0, x: -28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.7, 0, 0.2, 1] }}
              className="h-[46svh] sm:h-[50svh] md:h-[56svh] lg:h-[60svh]"
            >
              <Placeholder
                kind="image"
                aspect="h-full"
                note={`${company.name} — founder at work`}
                className="rounded-[6px]"
              />
            </motion.div>

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
                      className={`cursor-pointer pr-[0.08em] font-serif-italic text-[clamp(2.05rem,5vw,4.8rem)] leading-[1.04] text-background transition-[opacity,transform] duration-500 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 ${
                        index === active ? "scale-100 opacity-100" : "scale-[0.82] opacity-20"
                      }`}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              key={`right-${active}`}
              initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.7, 0, 0.2, 1] }}
              className="h-[46svh] sm:h-[50svh] md:h-[56svh] lg:h-[60svh]"
            >
              <Placeholder
                kind="image"
                aspect="h-full"
                note={`${company.name} — product detail`}
                className="rounded-[6px]"
              />
            </motion.div>
          </div>

          <motion.div
            key={`copy-${active}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.12 }}
            className="mx-auto mt-6 max-w-5xl border-t border-background/15 pt-5 text-center sm:mt-8 sm:pt-6"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/50">
              {company.founder}
            </div>
            <p className="mx-auto mt-4 text-[0.98rem] leading-[1.6] text-background/70 sm:mt-5 md:text-[1.05rem] md:leading-[1.65]">
              {company.body}
            </p>
            <div
              role="separator"
              aria-hidden="true"
              className="mx-auto mt-10 h-px w-full max-w-4xl bg-background/15 sm:mt-12"
            />
            <p className="mx-auto mt-10 max-w-3xl font-serif-italic !font-serif !font-light !text-white text-[clamp(1.15rem,2.2vw,1.6rem)] leading-[1.35] sm:mt-12">
              Fueling the next generation of founders, where
              <br />
              ideas turn into ventures &amp;
              <br />
              students become entrepreneurs.
            </p>
            <button
              ref={videoCardRef}
              type="button"
              onClick={openVideo}
              aria-label="Watch the Masters' Union student entrepreneurship video"
              className="group mx-auto mt-10 block w-full max-w-4xl overflow-hidden rounded-[6px] border border-background/15 text-left transition-transform duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/60 sm:mt-12"
            >
              <span className="relative block aspect-video w-full overflow-hidden">
                <img
                  src={sparkVideoThumb}
                  alt="Students presenting on stage at Masters' Union"
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
                <span className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 sm:size-20">
                  <Play className="ml-0.5 size-6 fill-current sm:size-7" strokeWidth={2} />
                </span>
              </span>
            </button>
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
                        className="no-img-zoom max-h-9 w-auto max-w-[85%] object-contain opacity-90 brightness-0 invert transition duration-300 group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
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

function JourneyStages({ stages }: { stages: Stage[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-px bg-background/10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-5">
      {stages.map((s, i) => (
        <Reveal key={s.name} delay={i * 0.06} className="h-full">
          <div
            className={`group flex h-full min-h-0 flex-col justify-between p-5 transition-colors duration-300 sm:min-h-64 sm:p-6 lg:min-h-0 lg:p-7 ${
              s.culmination ? "bg-accent text-foreground" : "bg-background/[0.045] text-background hover:bg-background/[0.08]"
            }`}
          >
            <div>
              <div className={`eyebrow flex items-center gap-2 ${s.culmination ? "text-foreground/60" : "text-background/50"}`}>
                <span
                  className={`h-1 w-4 rounded-full transition-all duration-300 ${
                    s.culmination ? "w-6 bg-foreground/60" : "bg-accent group-hover:w-6"
                  }`}
                  aria-hidden
                />
                {s.n}
              </div>
              <h3 className="mt-3 text-[1.15rem] font-medium leading-tight">{s.name}</h3>
              {s.grant && (
                <div
                  className={`mt-3 inline-block text-[10px] uppercase tracking-[0.18em] ${
                    s.culmination ? "text-foreground/60" : "text-background/55"
                  }`}
                >
                  Grant · {s.grant}
                </div>
              )}
            </div>
            <p className={`mt-5 text-[0.92rem] leading-[1.6] ${s.culmination ? "text-foreground/80" : "text-background/70"}`}>
              {s.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function ScrollCarousel({
  children,
  count,
  dark = false,
}: {
  children: React.ReactNode;
  count: number;
  dark?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (active + dir + count) % count;
    const card = track.children[next] as HTMLElement | undefined;
    if (!card) return;
    setActive(next);
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="mt-8 sm:mt-10">
      <div className="mb-4 flex items-center justify-between">
        <span className={`eyebrow ${dark ? "text-background/50" : "text-foreground/50"}`}>
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className={`flex size-9 items-center justify-center border transition-colors ${
              dark ? "border-background/25 text-background hover:bg-background/10" : "border-border text-foreground hover:bg-muted"
            }`}
          >
            <ArrowRight className="size-3.5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className={`flex size-9 items-center justify-center transition-opacity hover:opacity-85 ${
              dark ? "bg-background text-foreground" : "bg-foreground text-background"
            }`}
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          const first = track.children[0] as HTMLElement | undefined;
          if (!first) return;
          const w = first.offsetWidth + 1;
          setActive(Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / w))));
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:-mx-7 sm:gap-4 sm:px-7 md:-mx-8 md:gap-5 md:px-8 lg:-mx-12 lg:gap-6 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

function EpisodeStrip({ episodes }: { episodes: Episode[] }) {
  return (
    <ScrollCarousel count={episodes.length}>
      {episodes.map((e, i) => (
        <Reveal key={e.label} delay={i * 0.05} className="w-[calc(100vw-2.5rem)] shrink-0 snap-start sm:w-[68%] md:w-[52%] lg:w-[31%]">
          <div
            className={`flex h-full flex-col gap-4 p-5 sm:p-6 ${
              e.culmination ? "bg-foreground text-background" : "bg-background text-foreground"
            }`}
          >
            <Placeholder kind="video" aspect="aspect-video" dark={e.culmination} note={e.label} />
            <div>
              <div className={`eyebrow ${e.culmination ? "text-background/70" : "text-foreground/60"}`}>{e.label}</div>
              <p className={`mt-2 text-[0.88rem] leading-[1.55] ${e.culmination ? "text-background/85" : "text-foreground/70"}`}>
                {e.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ScrollCarousel>
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
}: {
  children: React.ReactNode;
  dark?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  const classes = `group inline-flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold transition-transform hover:-translate-y-px ${
    dark ? "bg-background text-foreground" : "bg-foreground text-background"
  }`;
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
      <CtaButton
        dark
        onClick={() => setOpen((v) => !v)}
        icon={<Download className="size-3.5" strokeWidth={2.25} />}
      >
        Download Entrepreneurship Report
      </CtaButton>
      {open && (
        <div className="absolute bottom-full left-0 z-30 mb-3 w-[300px] border border-background/15 bg-foreground/95 text-background shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-md sm:w-[320px]">
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
              className="group flex w-full items-start gap-3 border-b border-background/10 px-4 py-3 text-left transition-colors duration-200 last:border-b-0 hover:bg-background/10 disabled:opacity-60"
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
  const headlineWordRef = useRef<HTMLSpanElement>(null);
  const [wordFontSize, setWordFontSize] = useState<number | null>(null);

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

  // 0..1 progress of the Spark section covering the pinned hero (one viewport of scroll).
  // Applied directly to the fade wrapper's style to avoid re-rendering the page on scroll.
  const heroFadeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroFadeRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      el.style.opacity = (1 - p).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeShark = SHARK_TANK[selectedShark];
  const activeQuote = TESTIMONIALS[selectedQuote];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HomepageStyleNav items={NAV} applyHref="#cta" visible />


      <header
        id="top"
        className="sticky top-0 z-0 h-[100svh] min-h-[600px] overflow-hidden bg-foreground text-background"
      >
        <div ref={heroFadeRef} className="h-full w-full" style={{ opacity: 1 }}>
        <img
          src={studentEnterHeroAsset.url}
          alt="Masters' Union student presenting on stage"
          decoding="async"
          loading="eager"
          className="absolute inset-0 block h-full w-full scale-[1.35] translate-x-[16%] object-cover object-center opacity-75"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="mx-auto max-w-[1440px] px-5 pt-2 md:px-10 md:pt-3">
            <div className="pointer-events-auto flex items-start justify-between">
              <img
                decoding="async"
                loading="eager"
                src={muLogoAsset.url}
                alt="Masters' Union"
                className="h-8 w-auto md:h-10 brightness-0 invert"
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute inset-0 flex flex-col">
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 md:px-10">
            <div className="flex flex-1 flex-col justify-end pb-[72px] md:pb-[88px]">
              <div className="@container relative border border-background/15 md:border-0">
                {/* outer border — only the top-left and bottom-right edges remain */}
                <span aria-hidden className="pointer-events-none absolute left-0 top-0 hidden h-px w-1/2 bg-background/15 md:block" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-px w-1/2 bg-background/15 md:block" />
                <span aria-hidden className="pointer-events-none absolute bottom-1/2 left-0 top-0 hidden w-px bg-background/15 md:block" />
                <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 top-1/2 hidden w-px bg-background/15 md:block" />
                {/* 4 outer-corner diamonds (top-right and bottom-left corners have no meeting lines — omitted) */}
                <span aria-hidden className="absolute -left-[4.5px] -top-[4.5px] hidden size-[9px] rotate-45 bg-background md:block" />
                <span aria-hidden className="absolute -bottom-[4.5px] -right-[4.5px] hidden size-[9px] rotate-45 bg-background md:block" />
                {/* 4 edge-midpoint diamonds */}
                <span aria-hidden className="absolute -top-[4.5px] left-1/2 hidden size-[9px] -translate-x-1/2 rotate-45 bg-background md:block" />
                <span aria-hidden className="absolute -bottom-[4.5px] left-1/2 hidden size-[9px] -translate-x-1/2 rotate-45 bg-background md:block" />
                <span aria-hidden className="absolute -left-[4.5px] top-1/2 hidden size-[9px] -translate-y-1/2 rotate-45 bg-background md:block" />
                <span aria-hidden className="absolute -right-[4.5px] top-1/2 hidden size-[9px] -translate-y-1/2 rotate-45 bg-background md:block" />
                {/* center diamond */}
                <span aria-hidden className="absolute left-1/2 top-1/2 hidden size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background md:block" />
                {/* full cross-divider */}
                <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-background/15 md:block" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-background/15 md:block" />

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative flex min-h-[170px] flex-col p-5 sm:min-h-[200px] sm:p-6 md:min-h-[250px] md:p-10 lg:min-h-[300px] lg:p-12">
                    <Reveal delay={0.08}>
                      <h1 className="w-full overflow-hidden pb-[0.14em] font-medium leading-[0.95] tracking-[-0.02em]">
                        <span
                          ref={headlineWordRef}
                          className="block whitespace-nowrap text-[clamp(2.2875rem,8.5vw,3.5875rem)] leading-[0.9] tracking-[-0.03em]"
                          style={wordFontSize ? { fontSize: `${wordFontSize}px` } : undefined}
                        >Entrepreneurship</span>
                        <span className="mt-4 block text-[clamp(1.05rem,3.5vw,1.6rem)] font-semibold text-background/80 sm:mt-6 md:mt-8">-at Masters&apos; Union</span>
                      </h1>
                    </Reveal>
                    <Reveal delay={0.16} className="mt-auto">
                      <span className="eyebrow inline-block whitespace-nowrap text-[0.6875rem] text-background/70 md:text-[0.8125rem]">
                        120+ Startups · ₹593 Cr Valuation
                      </span>
                    </Reveal>
                  </div>
                  <div className="relative hidden min-h-[250px] p-10 md:block lg:min-h-[300px] lg:p-12" />
                  <div className="relative hidden min-h-[250px] p-10 md:block lg:min-h-[300px] lg:p-12" />
                  <div className="relative flex min-h-[170px] flex-col justify-end border-t border-background/15 p-5 sm:min-h-[200px] sm:p-6 md:min-h-[250px] md:border-t-0 md:p-10 lg:min-h-[300px] lg:p-12">
                    <Reveal delay={0.16}>
                      <div className="flex items-stretch gap-5">
                        <span aria-hidden className="w-px shrink-0 bg-background/30" />
                        <p className="max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-background/75">
                          Built by students who turned a cafeteria question, a canteen frustration, or a failed
                          first batch into a real business — while still enrolled.
                        </p>
                      </div>
                    </Reveal>
                    <Reveal delay={0.24}>
                      <div className="mt-9 flex flex-wrap items-center gap-8">
                        <HeroReportDownload />
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-background/60">Scroll</span>
                          <div className="relative h-9 w-px overflow-hidden bg-background/20">
                            <div className="mu-scroll-line absolute left-0 top-0 h-1/2 w-full bg-background" />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      <Section id="doing" tone="paper">
        <div className="ml-auto w-full max-w-4xl border-l border-accent/70 pl-4 text-left sm:pl-6 md:pl-8 lg:pl-12">
          <Reveal>
            <Eyebrow>The Outclass</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,5.5vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.02em] sm:mt-6 md:leading-[1.08]">
              Half the curriculum doesn&apos;t happen in a classroom.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[56ch] text-[13px] leading-[1.6] text-background/70 sm:mt-6 md:mt-7 md:text-[15px] md:leading-[1.75]">
              At Masters&apos; Union, real growth doesn&apos;t come from case studies — it comes from
              taking risks, testing ideas, and putting something into the world. That&apos;s what the
              Outclass is: half the curriculum happens outside the classroom, where students run
              dropshipping stores, launch content brands, and start companies from scratch, from day one.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="ml-auto mt-9 w-full max-w-5xl sm:mt-11 md:mt-14 md:w-[92%] lg:mt-16 lg:w-[88%]">
          <Placeholder kind="video" aspect="aspect-video" note="Documentary-style, students building" />
        </Reveal>
        <MediaRail
          kind="video"
          labels={["The first prototype", "Customer interviews", "Building after class", "The launch room"]}
        />
      </Section>

      <Section id="dropshipping" tone="light">
        <Reveal>
          <Eyebrow>Dropshipping Challenge</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[22ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] tracking-normal sm:mt-5 md:leading-[1.08]">
            Build, Launch & Sell
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[66ch] text-[13px] leading-[1.6] text-background/70 sm:mt-6 md:mt-7 md:text-[15px] md:leading-[1.75]">
            From idea to sales: students build profitable D2C businesses in under four months — running
            their own marketing campaigns, sourcing, supply chains, customers, and sales, start to finish.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 grid grid-cols-2 gap-px border-y border-background/15 sm:mt-11 lg:grid-cols-4">
          {DROPSHIPPING_STATS.map((s) => (
            <div key={s.label} className="min-h-28 border-r border-background/10 p-4 sm:min-h-32 sm:p-5 md:p-6 lg:p-7">
              <div
                className={
                  "dominant" in s && s.dominant
                    ? "text-[clamp(3rem,7vw,5rem)] font-medium leading-[0.9] tracking-[-0.03em]"
                    : "text-[1.7rem] font-medium leading-none tracking-[-0.02em]"
                }
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-background/55">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 sm:mt-12 md:mt-14">
          <Placeholder kind="video" aspect="aspect-video" note="Dropshipping Challenge highlight reel" />
        </Reveal>

        <MediaRail
          labels={["Finding the product", "Supplier negotiations", "Campaign day", "First order shipped"]}
        />

        <Reveal delay={0.25} className="mt-10 sm:mt-12 md:mt-14">
          <div className="eyebrow text-background/55">Top performers, this edition</div>
        </Reveal>
        <ScrollCarousel count={DROPSHIPPING_TOP.length}>
          {DROPSHIPPING_TOP.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.04} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-[38%] lg:w-[28%]">
              <article className="h-full bg-background/[0.045] p-6">
                <div className="flex items-center gap-3">
                  <LogoBadge size="size-8" />
                  <h3 className="text-[1rem] font-medium">{d.name}</h3>
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-background/50">{d.revenue} revenue</div>
                <p className="mt-3 text-[0.88rem] leading-[1.55] text-background/70">{d.body}</p>
              </article>
            </Reveal>
          ))}
        </ScrollCarousel>
      </Section>

      <Section id="journey" tone="paper">
        <Reveal>
          <Eyebrow>The Venture Initiation Programme (VIP)</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[24ch] text-[clamp(1.75rem,3.8vw,3.2rem)] font-light leading-[1.12] tracking-normal sm:mt-5 md:leading-[1.08]">
            Nearly half the MBA. Four stages. One Demo Day.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[64ch] text-[13px] leading-[1.6] text-background/70 sm:mt-6 md:mt-7 md:text-[15px] md:leading-[1.75]">
            Students build a business from 0 to 1, working through the real moving parts — pricing,
            positioning, cash flow — not case studies about someone else's. The VIP is a structured track,
            not an elective, backed by a grant at every stage and mentorship from founders, CXOs, and
            investors.
          </p>
        </Reveal>
        <JourneyStages stages={VIP_STAGES} />

        <Reveal delay={0.2} className="mt-11 sm:mt-13 md:mt-16">
          <Eyebrow>The Startup Challenge</Eyebrow>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-4 max-w-[64ch] text-[13px] leading-[1.6] text-background/70 md:text-[15px] md:leading-[1.75]">
            A four-part video series that tracks student ventures from first pitch to funded company.
          </p>
        </Reveal>
        <EpisodeStrip episodes={STARTUP_CHALLENGE_EPISODES} />
      </Section>

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
