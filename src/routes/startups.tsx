import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Flag,
  GraduationCap,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  Play,
  Trophy,
  Tv,
  Users,
} from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import eightVentureImg from "@/assets/founders/ventures/eight.jpg.asset.json";
import bullspreeVentureImg from "@/assets/founders/ventures/bullspree.jpg.asset.json";
import hiveschoolVentureImg from "@/assets/founders/ventures/hiveschool.jpg.asset.json";
import lexisVentureImg from "@/assets/founders/ventures/lexis.jpg.asset.json";
import playsuperVentureImg from "@/assets/founders/ventures/playsuper.jpg.asset.json";
import seedsaiVentureImg from "@/assets/founders/ventures/seedsai.jpg.asset.json";
import woodysVentureImg from "@/assets/founders/ventures/woodys.jpg.asset.json";
import sharkTankStageImg from "@/assets/founders/sharktank-stage.jpg.asset.json";
import muLogoAsset from "@/assets/mu-logo-dark.png.asset.json";
import heroVideoAsset from "@/assets/mu-student-entrepreneurship-video.mp4.asset.json";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "journey", label: "Journey", icon: Flag },
  { id: "eight", label: "Stories", icon: Users },
  { id: "sharktank", label: "Shark Tank", icon: Trophy },
  { id: "portfolio", label: "Portfolio", icon: LayoutGrid },
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
    name: "TrueBrands",
    founder: "Mukund Gupta",
    body: "Mukund Gupta watched brand-new, unsold clothes pile up in a Delhi warehouse and asked the obvious question nobody was solving: why do brands burn inventory while people can't afford the same brands?",
  },
  {
    name: "SeedsAI",
    founder: "Shubham Khatri & Vansh Miglani",
    body: "Shubham Khatri and Vansh Miglani didn't start with a business plan. They started by shadowing NBFC call-center agents and noticing how much time was wasted on manual review.",
  },
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
  return <div className={`eyebrow ${dark ? "text-background/60" : "text-foreground/55"}`}>{children}</div>;
}

function Section({
  id,
  tone = "light",
  container = "max-w-6xl",
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "paper";
  container?: string;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "dark"
      ? "bg-foreground text-background"
      : tone === "paper"
        ? "bg-muted text-foreground"
        : "bg-background text-foreground";
  return (
    <section id={id} className={toneClass}>
      <div className={`mx-auto ${container} px-5 py-16 md:px-10 md:py-24`}>{children}</div>
    </section>
  );
}

function LogoBadge({ src, alt, dark = false, size = "size-9" }: { src?: string; alt?: string; dark?: boolean; size?: string }) {
  if (src) {
    return <img src={src} alt={alt ?? ""} loading="lazy" className={`${size} shrink-0 rounded-full border object-cover ${dark ? "border-background/25" : "border-border"}`} />;
  }
  return (
    <span
      aria-label="Logo placeholder"
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border ${dark ? "border-background/25 text-background/30" : "border-border text-foreground/25"}`}
    >
      <ImageIcon className="size-3.5" strokeWidth={1.5} />
    </span>
  );
}

function PortraitBadge({ src, alt, dark = false, size = "size-14" }: { src?: string; alt?: string; dark?: boolean; size?: string }) {
  if (src) {
    return <img src={src} alt={alt ?? ""} loading="lazy" className={`${size} shrink-0 rounded-full border object-cover ${dark ? "border-background/25" : "border-border"}`} />;
  }
  return (
    <span
      aria-label="Founder image placeholder"
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border ${dark ? "border-background/25 text-background/30" : "border-border text-foreground/25"}`}
    >
      <Users className="size-4" strokeWidth={1.5} />
    </span>
  );
}

function FounderLine({ names, cohort, dark = false }: { names: string; cohort: string; dark?: boolean }) {
  return (
    <span className={`text-[11px] uppercase tracking-[0.2em] ${dark ? "text-background/60" : "text-foreground/60"}`}>
      {names} · {cohort}
    </span>
  );
}

function ChapterChips({ labels, dark = false }: { labels: string[]; dark?: boolean }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-3">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span
            className={`eyebrow rounded-full px-3 py-1.5 ${dark ? "bg-background/10 text-background/80" : "bg-foreground/[0.06] text-foreground/80"}`}
          >
            {l}
          </span>
          {i < labels.length - 1 && <ArrowRight className={`size-3 ${dark ? "text-background/25" : "text-foreground/25"}`} aria-hidden />}
        </div>
      ))}
    </div>
  );
}

type Metric = { value: string; label: string };

function KeyMetrics({ dominant, supporting, dark = false }: { dominant: Metric; supporting: Metric[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
      <div>
        <div className="text-[clamp(2.1rem,4.2vw,3.2rem)] font-medium leading-none tracking-[-0.02em]">{dominant.value}</div>
        <div className={`mt-2 text-[10px] uppercase tracking-[0.18em] ${dark ? "text-background/55" : "text-foreground/55"}`}>{dominant.label}</div>
      </div>
      {supporting.map((s) => (
        <div key={s.label}>
          <div className="text-[1.25rem] font-medium leading-none tracking-[-0.01em]">{s.value}</div>
          <div className={`mt-2 text-[9px] uppercase tracking-[0.16em] ${dark ? "text-background/50" : "text-foreground/50"}`}>{s.label}</div>
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
          dark ? "border border-background/15" : "border border-border"
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
        dark ? "border border-background/15 bg-background/[0.04]" : "border border-border bg-foreground/[0.03]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-[1.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${
            dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
          } 0px, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px, transparent 14px)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className={`flex size-12 items-center justify-center rounded-full border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${
            dark ? "border-background/40 bg-background/10 text-background" : "border-foreground/25 bg-background/50 text-foreground"
          }`}
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </span>
        <span className={`eyebrow ${dark ? "text-background/50" : "text-foreground/45"}`}>
          {kind === "video" ? "Video Placeholder" : kind === "logo" ? "Logo Placeholder" : "Image Placeholder"}
        </span>
        {note && (
          <span className={`text-[10px] uppercase tracking-[0.18em] ${dark ? "text-background/30" : "text-foreground/30"}`}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

function StoryBeats({ beats, dark = false }: { beats: Beat[]; dark?: boolean }) {
  return (
    <ol className="mt-2 space-y-8">
      {beats.map((b, i) => (
        <Reveal key={b.stage} delay={i * 0.05} className="break-inside-avoid">
          <li
            className={`flex gap-5 border-t pt-6 first:border-t-0 first:pt-0 ${
              dark ? "border-background/10" : "border-border"
            }`}
          >
            <span className={`eyebrow shrink-0 ${dark ? "text-background/50" : "text-foreground/50"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className={`eyebrow ${dark ? "text-background/70" : "text-foreground/70"}`}>{b.stage}</div>
              <p className={`mt-2 text-[1.02rem] leading-[1.7] ${dark ? "text-background/80" : "text-foreground/75"}`}>
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
    <div className="mt-10 grid grid-cols-1 gap-px bg-border md:grid-cols-5">
      {stages.map((s, i) => (
        <Reveal key={s.name} delay={i * 0.06} className="h-full">
          <div
            className={`group flex h-full flex-col justify-between p-6 transition-colors duration-300 md:p-7 ${
              s.culmination ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            <div>
              <div className={`eyebrow flex items-center gap-2 ${s.culmination ? "text-background/55" : "text-foreground/50"}`}>
                <span
                  className={`h-1 w-4 rounded-full transition-all duration-300 ${
                    s.culmination ? "w-6 bg-background/60" : "bg-accent group-hover:w-6"
                  }`}
                  aria-hidden
                />
                {s.n}
              </div>
              <h3 className="mt-3 text-[1.15rem] font-medium leading-tight">{s.name}</h3>
              {s.grant && (
                <div
                  className={`mt-3 inline-block text-[10px] uppercase tracking-[0.18em] ${
                    s.culmination ? "text-background/60" : "text-foreground/55"
                  }`}
                >
                  Grant · {s.grant}
                </div>
              )}
            </div>
            <p className={`mt-5 text-[0.92rem] leading-[1.6] ${s.culmination ? "text-background/80" : "text-foreground/70"}`}>
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
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between md:hidden">
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
        className="-mx-5 flex snap-x snap-mandatory gap-px overflow-x-auto bg-border px-5 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
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
        <Reveal key={e.label} delay={i * 0.05} className="w-[82%] shrink-0 snap-start sm:w-[55%] md:w-auto">
          <div
            className={`flex h-full flex-col gap-4 p-6 ${
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
      <article className={`group relative h-full overflow-hidden bg-background p-7 transition-transform duration-300 hover:-translate-y-1 ${featured ? "md:p-10" : ""}`}>
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <LogoBadge src={VENTURE_IMAGES[company.name]} alt={`${company.name} logo`} size={featured ? "size-11" : "size-9"} />
            <h3 className={`font-medium leading-tight ${featured ? "text-[1.6rem]" : "text-[1.1rem]"}`}>{company.name}</h3>
          </div>
          <span className="eyebrow shrink-0 text-foreground/45">{company.category}</span>
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground/50">{company.founder}</div>
        <div className={`mt-4 font-medium tracking-[-0.02em] ${featured ? "text-[1.6rem]" : "text-[1.15rem]"}`}>{company.metric}</div>
        <p className={`mt-3 leading-[1.6] text-foreground/70 ${featured ? "max-w-[60ch] text-[1rem]" : "text-[0.92rem]"}`}>
          {company.description}
        </p>
      </article>
    </Reveal>
  );
}

function CtaButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold transition-transform hover:-translate-y-px ${
        dark ? "bg-background text-foreground" : "bg-foreground text-background"
      }`}
    >
      {children}
      <span
        className={`inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
          dark ? "bg-foreground text-background" : "bg-background text-foreground"
        }`}
      >
        <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
      </span>
    </Link>
  );
}

function StartupsPage() {
  const [showMorePortfolio, setShowMorePortfolio] = useState(false);
  const [selectedShark, setSelectedShark] = useState(0);
  const [selectedQuote, setSelectedQuote] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [heroControlsVisible, setHeroControlsVisible] = useState(false);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTypographyOpacity = useTransform(heroScrollProgress, [0, 0.4], [1, 0]);
  const heroTypographyY = useTransform(heroScrollProgress, [0, 0.4], [0, -24]);

  useEffect(() => {
    return heroScrollProgress.on("change", (v) => setHeroControlsVisible(v > 0.4));
  }, [heroScrollProgress]);

  const activeShark = SHARK_TANK[selectedShark];
  const activeQuote = TESTIMONIALS[selectedQuote];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BottomNav items={NAV} applyHref="#cta" />


      <header
        id="top"
        ref={heroRef}
        className="relative h-[100svh] min-h-[600px] overflow-hidden bg-foreground text-background"
      >
        <video
          src={heroVideoAsset.url}
          autoPlay
          muted
          loop
          playsInline
          controls={heroControlsVisible}
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60"
        />

        <motion.div
          style={{
            opacity: heroTypographyOpacity,
            y: heroTypographyY,
            pointerEvents: heroControlsVisible ? "none" : "auto",
          }}
          className="absolute inset-0 flex flex-col"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 md:px-10">
            <Reveal>
              <div className="flex items-start justify-between pt-10 md:pt-14">
                <img
                  decoding="async"
                  loading="eager"
                  src={muLogoAsset.url}
                  alt="Masters' Union"
                  className="h-8 w-auto md:h-10 brightness-0 invert"
                />
              </div>
            </Reveal>

            <div className="flex flex-1 flex-col items-center justify-center pb-16">
              <Reveal delay={0.04}>
                <span className="eyebrow inline-flex items-center rounded-full border border-background/25 px-4 py-1.5 text-background/70">
                  30+ Startups · ₹593 Cr Valuation
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mx-auto mt-6 max-w-[22ch] text-balance text-center text-[clamp(2.6rem,7.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
                  Entrepreneurship at Masters&apos; Union
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mx-auto mt-7 max-w-[62ch] text-center text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-background/75">
                  30+ startups. ₹593 Cr in combined valuation. Built by students who turned a cafeteria
                  question, a canteen frustration, or a failed first batch into a real business — while still
                  enrolled.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-8">
                  <CtaButton dark>Start Building</CtaButton>
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
        </motion.div>
      </header>

      <Section id="spark" tone="light">
        <Reveal>
          <Eyebrow>The Spark</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Nobody sits down to “found a startup.” They notice something first.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[68ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            Some ideas start with a question nobody else was asking. Some start with a frustration nobody
            else was naming. A few start as a homework assignment nobody meant to turn into a business. At
            Masters&apos; Union, that first spark is treated as the beginning of something real — not an
            extracurricular.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {SPARK_EXAMPLES.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.05}>
                <article className="h-full border-l-2 border-transparent bg-background p-7 transition-colors duration-300 hover:border-accent hover:bg-muted">
                  <h3 className="text-[1.05rem] font-medium">{e.name}</h3>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/50">{e.founder}</div>
                  <p className="mt-4 text-[0.95rem] leading-[1.65] text-foreground/75">{e.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <Placeholder kind="image" aspect="aspect-[4/5]" note="Editorial portrait grid" />
          </Reveal>
        </div>
      </Section>

      <Section id="doing" tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>The Outclass</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              Half the curriculum doesn&apos;t happen in a classroom.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-[56ch] text-[1.05rem] leading-[1.7] text-foreground/70">
              At Masters&apos; Union, real growth doesn&apos;t come from case studies — it comes from
              taking risks, testing ideas, and putting something into the world. That&apos;s what the
              Outclass is: half the curriculum happens outside the classroom, where students run
              dropshipping stores, launch content brands, and start companies from scratch, from day one.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
          <Placeholder kind="video" aspect="aspect-video" note="Documentary-style, students building" />
        </Reveal>
      </Section>

      <Section id="dropshipping" tone="light">
        <Reveal>
          <Eyebrow>Dropshipping Challenge</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Build, Launch & Sell
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[66ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            From idea to sales: students build profitable D2C businesses in under four months — running
            their own marketing campaigns, sourcing, supply chains, customers, and sales, start to finish.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-12 sm:gap-y-6">
          {DROPSHIPPING_STATS.map((s) => (
            <div key={s.label}>
              <div
                className={
                  "dominant" in s && s.dominant
                    ? "text-[clamp(3rem,7vw,5rem)] font-medium leading-[0.9] tracking-[-0.03em]"
                    : "text-[1.7rem] font-medium leading-none tracking-[-0.02em]"
                }
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-foreground/55">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <Placeholder kind="video" aspect="aspect-video" note="Dropshipping Challenge highlight reel" />
        </Reveal>

        <Reveal delay={0.25} className="mt-14">
          <div className="eyebrow text-foreground/55">Top performers, this edition</div>
        </Reveal>
        <ScrollCarousel count={DROPSHIPPING_TOP.length}>
          {DROPSHIPPING_TOP.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.04} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <article className="h-full bg-background p-6">
                <div className="flex items-center gap-3">
                  <LogoBadge size="size-8" />
                  <h3 className="text-[1rem] font-medium">{d.name}</h3>
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-foreground/50">{d.revenue} revenue</div>
                <p className="mt-3 text-[0.88rem] leading-[1.55] text-foreground/70">{d.body}</p>
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
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Nearly half the MBA. Four stages. One Demo Day.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[64ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            Students build a business from 0 to 1, working through the real moving parts — pricing,
            positioning, cash flow — not case studies about someone else's. The VIP is a structured track,
            not an elective, backed by a grant at every stage and mentorship from founders, CXOs, and
            investors.
          </p>
        </Reveal>
        <JourneyStages stages={VIP_STAGES} />

        <Reveal delay={0.2} className="mt-16">
          <Eyebrow>The Startup Challenge</Eyebrow>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-4 max-w-[64ch] text-[1rem] leading-[1.7] text-foreground/70">
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
          <h2 className="mt-5 max-w-[26ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            What if the next big creator wasn&apos;t on camera?
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <ChapterChips labels={EIGHT_BEATS.map((b) => b.stage)} dark />
        </Reveal>
        <div className="relative mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:items-start">
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
          <h2 className="font-serif-italic mt-5 max-w-[28ch] text-balance text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.05]">
            &ldquo;Ek haath se becho, dusre haath se paise lo.&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <ChapterChips labels={BAMBAII_BEATS.map((b) => b.stage)} />
        </Reveal>
        <div className="relative mt-12 grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1fr] md:items-start">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 select-none text-[6rem] font-bold leading-none text-foreground/[0.035] md:text-[9rem]"
          >
            20
          </span>
          <Reveal delay={0.1}>
            <Placeholder kind="image" aspect="aspect-square" note="Product / process photography" />
          </Reveal>
          <StoryBeats beats={BAMBAII_BEATS} />
        </div>
        <Reveal delay={0.1} className="mt-12 border-t border-border pt-8">
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
          <h2 className="mt-5 max-w-[26ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.015em]">
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
        <div className="mt-12 md:columns-2 md:gap-x-12">
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
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            The company changes. The pattern doesn&apos;t.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
          {PATTERN_STEPS.map((step, i) => (
            <Reveal key={step} delay={0.05 + i * 0.04}>
              <div className="flex items-center gap-3">
                <span className="eyebrow rounded-full bg-foreground px-4 py-2 text-background transition-transform duration-300 hover:-translate-y-0.5">
                  {step}
                </span>
                {i < PATTERN_STEPS.length - 1 && <ArrowRight className="size-3.5 text-foreground/30" aria-hidden />}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-[68ch] text-[1.05rem] leading-[1.7] text-foreground/70">
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
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Real founders. Real pitches. National television.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[64ch] text-[1.05rem] leading-[1.7] text-background/75">
            Masters&apos; Union students have pitched on India&apos;s biggest startup stage — not as
            alumni years removed from campus, but while still building.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Placeholder kind="image" src={sharkTankStageImg.url} alt="Shark Tank India stage" aspect="aspect-[21/9]" dark />
        </Reveal>

        <div className="mt-px grid grid-cols-1 gap-px bg-background/10 md:grid-cols-3">
          {SHARK_TANK.map((f, i) => (
            <Reveal key={f.company} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setSelectedShark(i)}
                aria-pressed={selectedShark === i}
                className={`h-full w-full p-7 text-left transition-colors duration-300 ${
                  selectedShark === i ? "bg-background text-foreground" : "bg-foreground text-background hover:bg-background/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <LogoBadge src={VENTURE_IMAGES[f.company]} alt={`${f.company} logo`} dark={selectedShark !== i} />
                    <h3 className="text-[1.15rem] font-medium">{f.company}</h3>
                  </div>
                  <span className={`eyebrow ${selectedShark === i ? "text-foreground/45" : "text-background/45"}`}>{f.season}</span>
                </div>
                <div
                  className={`mt-3 text-[11px] uppercase tracking-[0.18em] ${
                    selectedShark === i ? "text-foreground/50" : "text-background/50"
                  }`}
                >
                  {f.founder} · {f.cohort}
                </div>
                <p className={`mt-4 text-[0.95rem] leading-[1.65] ${selectedShark === i ? "text-foreground/75" : "text-background/75"}`}>
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
            <GraduationCap className="size-4 text-foreground/55" strokeWidth={1.75} />
            <Eyebrow>High School Startup League</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            The founders here haven&apos;t graduated high school yet.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[66ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            A separate pipeline, built for Class IX–XII students, not current Masters&apos; Union
            enrollees — a launchpad for teen founders to create, pitch, and take their first cheque, with
            past judges including Ashneer Grover, Ankur Warikoo, Techburner, and Sarthak Ahuja.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {HSSL_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.04}>
              <div className="h-full border-t-2 border-accent bg-background px-5 py-8 transition-colors duration-300 hover:bg-accent/[0.06]">
                <div className="text-[clamp(1.7rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">{s.value}</div>
                <div className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-foreground/55">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
            {HSSL_STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="eyebrow rounded-full border border-accent px-4 py-2 text-foreground transition-colors duration-300 hover:bg-accent/10">
                  {stage}
                </span>
                {i < HSSL_STAGES.length - 1 && <ArrowRight className="size-3.5 text-foreground/30" aria-hidden />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <Placeholder kind="video" aspect="aspect-video" note="High School Startup League highlight reel" />
        </Reveal>
      </Section>

      <Section id="scale" tone="dark">
        <Reveal>
          <Eyebrow dark>By the Numbers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            This isn&apos;t three stories. It&apos;s a portfolio.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-12">
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
          <p className="mt-12 max-w-[68ch] text-[1.02rem] leading-[1.7] text-background/70">
            More than half of these startups have raised over $1 million. Together, their founders have
            created 500+ jobs since 2021. And when a startup doesn&apos;t make it, the founder walks away
            with sharper skills, real experience, and often, an incredible job offer anyway.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <Placeholder kind="image" aspect="aspect-[16/7]" dark note="Demo Day crowd / data visualization" />
        </Reveal>
      </Section>

      <Section id="people" tone="light">
        <Reveal>
          <Eyebrow>Mentors, VCs, and Believers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Behind every founder is a room full of people who&apos;ve already done it.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_0.55fr] md:items-start">
          <Reveal key={selectedQuote}>
            <figure>
              <blockquote className="text-balance text-[clamp(1.3rem,2.6vw,2rem)] italic leading-[1.4] text-foreground/90">
                &ldquo;{activeQuote.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <PortraitBadge />
                <figcaption className="eyebrow text-foreground/55">
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
                  selectedQuote === i ? "border-foreground text-foreground" : "border-border text-foreground/45 hover:text-foreground/70"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section id="fellowship" tone="dark">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
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
              <h2 className="mt-5 max-w-[20ch] text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
                No placements. No backup plan. Just a runway.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[56ch] text-[1.02rem] leading-[1.7] text-background/75">
                For students who want to build instead of interview, Masters&apos; Union offers the Founder
                Fellowship: ₹50,000 a month in grants, mentorship from industry veterans, and active help
                with fundraising — no placements, no backup plans. As of the 2021–25 report, 40+ fellows
                had used that runway to build their companies full-time.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9">
              <Placeholder kind="image" aspect="aspect-[4/5]" dark note="Founder-at-work portrait" className="max-w-sm" />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="next-gen" tone="light">
        <Reveal>
          <Eyebrow>The UG Ecosystem, 2025–26</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            The founders below aren&apos;t waiting for an MBA to start.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[66ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            Masters&apos; Union&apos;s undergraduate cohort has its own entrepreneurship track — and its
            own portfolio. In the 2025–26 cycle alone, UG founders have been granted ₹75L+ and generated
            ₹14Cr+ in revenue, with two startups earning Shark Tank India pitches.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {NEXT_GEN.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.04}>
              <article className="group h-full bg-background p-7 transition-colors duration-300 hover:bg-muted">
                <div className="flex items-center gap-3">
                  <LogoBadge size="size-8" />
                  <h3 className="text-[1.05rem] font-medium">{v.name}</h3>
                </div>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-foreground/70">{v.pitch}</p>
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
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Portfolio
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            className="eyebrow inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
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
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            For every launch, there&apos;s a version that didn&apos;t work first.
          </h2>
        </Reveal>

        <ul className="mt-14 space-y-12">
          {REALITY_EXAMPLES.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <li className="border-t border-background/10 pt-8 first:border-t-0 first:pt-0">
                <span className="font-serif-italic text-[1rem]">{r.name}</span>
                <p className="mt-3 max-w-[70ch] text-[1rem] leading-[1.7] text-background/80">{r.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-14">
          <Placeholder kind="video" aspect="aspect-video" dark note="Founder-interview, talking-head" />
        </Reveal>
      </Section>

      <Section id="cta" tone="dark" container="max-w-4xl">
        <div className="pb-16 pt-8 text-center md:pb-20 md:pt-12">
          <Reveal>
            <h2 className="text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              WHAT WILL YOU BUILD?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-8 max-w-[56ch] text-[1.05rem] leading-[1.7] text-background/75">
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
