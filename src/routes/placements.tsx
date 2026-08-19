import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Home,
  BarChart3,
  TrendingUp,
  Briefcase,
  Users,
  Route as RouteIcon,
  Download,
  Mail,
} from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import heroBg from "@/assets/placement-hero.webp.asset.json";

import {
  ClipReveal,
  CountUp,
  Draw,
  Parallax,
  Reveal,
  ScrollProgress,
  TimelineRail,
  useInView,
  useReducedMotion,
} from "@/components/placements/motion";
import { HeroMaskReveal } from "@/components/placements/HeroMaskReveal";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const logoModules = import.meta.glob<{ default: { url: string } }>(
  "../assets/recruiter-logos/*.png.asset.json",
  { eager: true },
);
const LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(logoModules).map(([path, mod]) => [
    path.split("/").pop()!.replace(".png.asset.json", ""),
    mod.default.url,
  ]),
);

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
  { id: "cohorts", label: "Cohorts", icon: TrendingUp },
  { id: "recruiters", label: "Recruiters", icon: Briefcase },
  { id: "stories", label: "Stories", icon: Users },
  { id: "pathway", label: "Pathway", icon: RouteIcon },
];

/* ---------------------------------- data --------------------------------- */

const HERO_STATS = [
  { value: "1.42", label: "Offers generated per student" },
  { value: "$149,114", label: "International average CTC (PPP)" },
  { value: "30", label: "International & remote offers" },
  { value: "₹64 LPA", label: "International average CTC" },
];

const AUDIT_STATS = [
  { value: "4", suffix: "Offers > ₹1 Cr", note: "Marking strong compensation figures" },
  { value: ">90%", suffix: "Placed early", note: "Joined full-time roles before the penultimate term" },
  { value: "₹54.80L", suffix: "Top 25% average CTC", note: "Cohort '25 top quartile" },
];

const REPORT_YEARS = ["2021", "2022", "2023", "2024", "2025"];

type CohortRow = {
  cohort: string;
  avg: number;
  median: number;
  highest: number;
  top25: number;
  bottom25: number;
  mid80: number;
  highestLabel: string;
};

const TBM_TABLE: CohortRow[] = [
  { cohort: "'21", avg: 29.12, median: 29.5, highest: 45, top25: 41.14, bottom25: 19.38, mid80: 28.76, highestLabel: "₹45 L" },
  { cohort: "'22", avg: 33.1, median: 30.92, highest: 64.15, top25: 44.52, bottom25: 20.02, mid80: 33.73, highestLabel: "₹64.15 L" },
  { cohort: "'23", avg: 34.07, median: 32.19, highest: 57.08, top25: 44.67, bottom25: 22.35, mid80: 34.09, highestLabel: "₹57.08 L" },
  { cohort: "'24", avg: 28.52, median: 27.77, highest: 61.8, top25: 43.79, bottom25: 19.3, mid80: 27.05, highestLabel: "₹61.80 L" },
  { cohort: "'25", avg: 33.39, median: 27.79, highest: 128, top25: 54.8, bottom25: 22.75, mid80: 29.2, highestLabel: "₹1.28 Cr" },
];

const YLC_SERIES = [
  { cohort: "Co'21", value: 23.57 },
  { cohort: "Co'22", value: 27.17 },
  { cohort: "Co'23", value: 27.76 },
];

const TBM_SERIES = [
  { cohort: "Co'21", value: 29.12 },
  { cohort: "Co'22", value: 33.1 },
  { cohort: "Co'23", value: 34.07 },
  { cohort: "Co'24", value: 28.52 },
  { cohort: "Co'25", value: 33.39 },
];

const SALARY_COMPONENTS = [
  { label: "Fixed cash", pct: 72 },
  { label: "Variable / bonus", pct: 16 },
  { label: "Stock (Year 1 vesting)", pct: 12 },
];

const RECRUITER_GROUPS: { category: string; logos: string[] }[] = [
  { category: "Consulting", logos: ["McKinsey", "Bain", "BCG", "Accenture", "Deloitte", "EY", "PWC", "Kearney", "OliverWyman"] },
  { category: "Large Tech", logos: ["Google", "Meta", "Microsoft", "Youtube", "Servicenow"] },
  { category: "Consumer Tech", logos: ["Flipkart", "Zomato", "Zepto", "Unacademy", "PhysicsWallah", "MamaEarth"] },
  { category: "BFSI", logos: ["ICICI", "HSBC", "CITI", "AmericanExpress", "Razorpay", "PineLabs", "Cred"] },
  { category: "Venture Capital", logos: ["GoodCapital", "Waterbridge", "Antler", "StrideVentures", "IPV"] },
  { category: "Emerging Tech", logos: ["Kapture", "Twyn", "Webengage", "Zycus", "Mindtickle"] },
];


const TRANSITIONS = [
  {
    title: "Industry transition",
    sub: "PGP TBM · changing industries",
    rows: [
      ["Senior Data Science Analyst, Merkle", "Program Manager, Zomato"],
      ["CIB Analyst, JPMC", "Manager – Design Planning, Razorpay"],
      ["Senior Financial Analyst, TresVista", "Manager – CEO Office, Reliance Infrastructure"],
    ],
  },
  {
    title: "Career advancement",
    sub: "PGP TBM · rising up the ranks",
    rows: [
      ["Associate Consultant, ZS Associates", "Senior Associate – Transformation, DP World"],
      ["Associate Product Manager, Statiq", "Digital Product Manager, IndusInd Bank"],
      ["Team Lead – Product, Paytm", "Assistant Manager – Product, Airtel"],
    ],
  },
  {
    title: "Career launches",
    sub: "PGP TBM YLC · undergraduate to industry",
    rows: [
      ["Hans Raj College", "Associate Program Manager, Zomato"],
      ["NMIMS", "Deputy Manager, Founders' Office, Tata 1mg"],
      ["Delhi College of Arts and Commerce", "Analytics – ADSK, Bloomberg"],
      ["Delhi Technological University", "Consultant, KPMG India"],
      ["HR College, Mumbai", "Management Trainee – Business, Flipkart"],
      ["Maitreyi College, DU", "AVP – Brand Marketing, Fitelo"],
      ["Sri Aurobindo College, DU", "Solution Specialist I, Pine Labs"],
      ["Veer Narmad South Gujarat University", "Associate Founder's Office, Neve Jewels"],
    ],
  },
];

const ALUMNI = [
  { name: "Shreya Kulkarni", role: "Product Manager II, Microsoft", quote: "Mentors like Aditya Turalapati (PM2, Microsoft) and Sumit Kumar provided vital guidance, while the PM curriculum, live projects, and global placement approach thoroughly prepared me." },
  { name: "Deep Bhatia", role: "Investment Banking Associate, Axis Capital", quote: "The support at Masters' Union was incredible — faculty and the career prep team made the placement journey seamless. Mock interviews honed my technical skills." },
  { name: "CA Harsh Nahar", role: "Senior Business Analyst, Kearney", quote: "From being elected Vice President to organizing Case Union, India's largest case competition conclave, the experience was filled with rewarding challenges." },
  { name: "Shruti Kumari", role: "Manager – Brand Marketing, Flipkart", quote: "Masters' Union provided me with unparalleled exposure to the e-commerce landscape, which significantly shaped my understanding of the sector." },
  { name: "Kakaraparthi Sri Badarinadh", role: "Senior Specialist – Strategic Accounts, Talabat, Dubai", quote: "The innovative case-based teaching was key to my interview success, helping me approach real-world challenges with a structured mindset." },
  { name: "Tilottama Ghosh", role: "Associate, Kotak Investment Bank", quote: "The focus on financial modelling and investment strategies helped me build a strong foundation, while industry mentorship sharpened my problem solving." },
];

const TESTIMONIALS = [
  { name: "Jas Desai", role: "Senior Associate, CEO's Office, DP World, Dubai", note: "Credits the In-class/Out-class approach and CXO sessions for interview confidence." },
  { name: "Komal Bansal", role: "Senior Associate, BCG", note: "Structured thinking from faculty, Get Prepped mentorship, Dropshipping and VIP exposure." },
  { name: "Archit Bansal", role: "Manager – CEO's Office, Reliance Infrastructure", note: "Led the Masters' Union Investment Fund, sharpening strategic decision-making." },
  { name: "Karan Mulky", role: "Client Solutions Manager, Meta", note: "FOCOS practicum for first-principles thinking and structured interview prep." },
  { name: "Archit Bhargava", role: "Analyst, Avaana Capital", note: "Investing programme gave hands-on deal sourcing, diligence and startup evaluation." },
  { name: "Yash Mehta", role: "Chief of Staff – Operations, Puffy, Dubai", note: "Careers team refined his narrative; GetPrepped mentorship from BCG/McKinsey leaders." },
  { name: "Rishie Prabhakaran", role: "Product Specialist – Analytics, Bloomberg", note: "Structured resume iterations and behavioural mocks built clarity." },
  { name: "Lakshya Punjabi", role: "Management Trainee – DS & Analytics, American Express", note: "Industry-immersive curriculum sharpened analytics through the multi-round AMEX process." },
  { name: "Ankita Saxena", role: "Manager, Credit Risk, Citibank", note: "Real-world cases and live projects built a business-partner mindset." },
  { name: "Kriti Gupta", role: "Merchandising Manager, Careem, Dubai", note: "Career Services proactively shared profiles and opened alumni connections." },
  { name: "Varun Makhija", role: "Product Manager, ServiceNow", note: "Case practice, product practicums and behavioural prep from named mentors." },
  { name: "Harshit Gambhir", role: "Program Manager, Blinkit", note: "Built product acumen after 6 years in automotive R&D — offer within 8 months." },
];

const VENTURES = [
  { name: "Bullspree", founder: "Dharmil Bavishi", note: "Experiential stock market gaming platform teaching market dynamics through play." },
  { name: "Eight.Network", founder: "Mohit Paliwal", note: "Audio streaming for stories and podcasts. 1 million+ listeners." },
  { name: "Buzzinga", founder: "Rashweta Bagga", note: "Ready-to-serve baked chicken crisps. 40,000+ orders." },
  { name: "Heal Paws", founder: "Smit Bhavsar", note: "Rapid oral-dissolve strips for pet medicine and supplements." },
  { name: "Aikyam", founder: "Rishika Kormala", note: "Natural premixes addressing chronic gut-related issues." },
  { name: "Crispee", founder: "Shivangi Sardana", note: "Healthy fusion snacking. Dosa Chips crossed 10,000 orders." },
  { name: "73 Boston", founder: "Divita Aggarwal", note: "Wines and spirits for Indian palates. 500 pre-orders, ₹7.5L revenue." },
  { name: "Soul Gappa", founder: "Yukta Rajpal", note: "Hygienic street food. 75% gross margin, 25% EBITDA." },
  { name: "TailorHub", founder: "Sneha Rao", note: "Centralised platform connecting customers with tailors." },
  { name: "Stay Desi", founder: "Anirudh Jain", note: "Curated traditional Indian health foods sourced nationwide." },
  { name: "FNOR", founder: "Abhimany Verma", note: "Modern streetwear at an accessible price point." },
  { name: "Kismat Foods", founder: "Jovial Alex Lejo", note: "Kashmiri premium dry fruit business; flagship dry fruit muesli." },
];

const COMPETITIONS = [
  { who: "Sahil Arora, Mahesh Lalwani", what: "Prodigy '23 — IIM Calcutta", note: "Product development and GTM strategy for health-monitoring wearables." },
  { who: "Praveen Putrevu, Jovial Alex", what: "Brain-a-Thon — IIM Ahmedabad", note: "Brand strategy for a fresh-meat brand entering meat alternatives." },
  { who: "Sahil Arora", what: "Prod War 1.0 — IIT Bombay", note: "Solve Adobe's dilemma: acquire Figma or Canva?" },
  { who: "Aashna Bhardwaj, Priya Ramesh", what: "AWL Resolve — IIM Ahmedabad", note: "Real-world strategy problem sponsored by Adani Wilmar." },
];

const LIVE_PROJECTS = [
  { name: "Microsoft", note: "Hands-on technology live project with Microsoft product teams." },
  { name: "Ather Energy", note: "Students formulated the pricing strategy for a new Ather feature." },
  { name: "PepsiCo", note: "IIT, IIM and MU students competed in the PepsiCo India Challenge on campus." },
];

const CREATORS = [
  { name: "Anurag Bansal", handle: "Business with Bansal", note: "Business, marketing and finance strategies of top companies." },
  { name: "Himanshu Wadekar", handle: "Product Pathshala", note: "Knowledge platform for product management on Instagram and Spotify." },
  { name: "Yash Shah", handle: "Medium Masala", note: "Decoding the lives of influencers and CEOs." },
  { name: "Ayush Sinha", handle: "Iamayushsnh", note: "Abstract films made relatable through captivating storytelling." },
  { name: "Yukta Rajpal", handle: "House of K", note: "South Korean culture, language and economy." },
  { name: "Anishhka Malik", handle: "All About Brands 101", note: "Journeys behind ₹100 crore brands and startups." },
  { name: "Amitoj Singh", handle: "Amitojrocketsingh", note: "The frontline of the sales scene — highs, lows and adventures." },
  { name: "Madhav Nangru", handle: "Seriesmaddy", note: "Dialogues with founders, VCs, CXOs and thinkers." },
];

const TERMS = [
  { term: "Term 1", title: "Mentor allocation & profile building", items: ["Psychometric assessment", "1-1 mentor allocation", "Resume formatting", "LinkedIn profiling", "Professional photography", "Institution of PlaCom", "Know all domains", "Placement policies", "Case & business plan workshop"] },
  { term: "Term 2", title: "Outreach plan & personal branding", items: ["Company list finalisation", "Company outreach plan", "Shortlist top 3 domains", "Presentation skills", "Industry engagement", "Personal branding", "Storytelling workshop", "Career practicums", "Corporate competitions"] },
  { term: "Term 3", title: "Functional role-based workshops", items: ["Resume review #1", "Behavioural mocks", "Consulting case training", "Domain seminars", "Teamwork & conflict management", "Role-based workshops"] },
  { term: "Term 4", title: "Interview preparations", items: ["Resume review #2", "Stress management", "Domain seminars", "Corporate competitions", "Role-based workshops", "Mock interviews", "Last mile preps"] },
  { term: "Term 5", title: "Business etiquette & grooming", items: ["Business etiquette & grooming", "Mock interviews", "Last mile preps", "1-1 with Director of Career Preparation"] },
  { term: "Term 6", title: "Salary negotiation", items: ["Peer best practices", "Salary negotiation workshops", "Mock interviews", "Last mile preps"] },
  { term: "Term 7", title: "Placement drive phase 1", items: ["Mock interviews", "Placement drives", "Last mile preps"] },
  { term: "Term 8", title: "Placement drive phase 2", items: ["Placement drives", "Last mile preps"] },
];

const COACH_TRACKS = [
  { title: "Public speaking & communication", note: "Master public speaking fears, build executive presence, and command respect through personalised coaching." },
  { title: "Personal branding", note: "Cultivate influence through blogging, podcasting, personal websites, and LinkedIn followership." },
  { title: "Career & industry", note: "Network with dream-company executives and excel at interviews through repeated mock sessions." },
];

const COACHES = [
  { name: "Rajnish Virmani", role: "Ex President, COO at Reliance", exp: "10+ yrs" },
  { name: "Mamta Wasan", role: "Director & CEO, Mekosha Ayurveda", exp: "3+ yrs" },
  { name: "Sandeep Bidani", role: "Ex Executive Director HR, IBM", exp: "10+ yrs" },
  { name: "Andrea Stone", role: "Ex CMO, Mahindra Comviva", exp: "10+ yrs" },
  { name: "Santosh Sharan", role: "Ex Director HR, SC Johnson", exp: "5+ yrs" },
  { name: "Sandeep Suri", role: "Ex Country Head, Fidelity Investments", exp: "3+ yrs" },
];

const LEADERS = [
  { name: "Amit Khatri", role: "Co-founder, Noise" },
  { name: "Swati & Rohan Bhargava", role: "Co-founders, CashKaro" },
  { name: "Nipin Marya", role: "CEO, IQOO" },
  { name: "Vikramaditya Chaudhri", role: "Co-Founder, Wingreens Farms" },
  { name: "Hitesh Oberoi", role: "CEO, Info Edge India" },
  { name: "Rakesh Verma", role: "CMD & Co-Founder, MapmyIndia" },
  { name: "Sarvesh Agarwal", role: "Founder & CEO, Internshala" },
  { name: "Punit K Goyal", role: "Co-founder, BluSmart" },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace, Swiggy" },
  { name: "Rajat Mathur", role: "MD, Morgan Stanley" },
  { name: "Manish Chowdhary", role: "Co-founder, WOW Skin Science" },
  { name: "Sunjay Kapur", role: "Chairman, Sona Comstar" },
];


/* -------------------------------- primitives ------------------------------ */

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-[11px] uppercase tracking-[0.3em] text-black/55 ${className}`} style={{ fontFamily: MONO }}>
      {children}
    </div>
  );
}

/** Section index marker used across the editorial rows. */
function Index({ n }: { n: number }) {
  return (
    <span className="text-[10px] tabular-nums tracking-[0.24em] text-black/35" style={{ fontFamily: MONO }}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

function Rule({ delay = 0 }: { delay?: number }) {
  return <Draw delay={delay} className="h-px w-full bg-black/12" />;
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > threshold);
    };
    const tick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", tick, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
    };
  }, [threshold]);
  return scrolled;
}

/* ------------------------------ cinematic hero ----------------------------- */

const HERO_EASE = "cubic-bezier(0.16, 0.84, 0.24, 1)";

/**
 * Full-bleed editorial hero: the graduation photograph fills the viewport at
 * full fidelity, the existing copy sits as quiet metadata, and the existing
 * headline anchors the lower third as oversized typography.
 * Content is unchanged — composition, scale, layering and motion only.
 */
function CinematicHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();


  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      // travel distance over which the pin lasts
      const track = Math.max(1, rect.height - window.innerHeight);
      // 0 at rest, 1 once the second section has taken over
      const p = Math.min(1, Math.max(0, -rect.top / track));
      if (imgWrapRef.current) {
        // the photograph drifts upward behind the pinned copy; it never fades —
        // the second section physically slides over it instead
        imgWrapRef.current.style.transform = `translate3d(0, ${(-p * 22).toFixed(2)}%, 0)`;
      }
      if (copyRef.current) {
        // stays put, then eases out only at the very end of the pin
        const cp = Math.min(1, Math.max(0, (p - 0.68) / 0.32));
        copyRef.current.style.opacity = String(1 - cp);
        copyRef.current.style.transform = `translate3d(0, ${(cp * 12).toFixed(1)}px, 0)`;
      }
      if (headlineRef.current) {
        const hp = Math.min(1, Math.max(0, (p - 0.74) / 0.26));
        headlineRef.current.style.opacity = String(1 - hp);
        headlineRef.current.style.transform = `translate3d(0, ${(hp * 14).toFixed(1)}px, 0)`;
      }
    };
    const tick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };


    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [reduced]);

  const on = entered || reduced;
  const step = (delay: number, y = 22) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : `translate3d(0,${y}px,0)`,
    transition: reduced
      ? "opacity 240ms linear"
      : `opacity 900ms ${HERO_EASE} ${delay}ms, transform 1000ms ${HERO_EASE} ${delay}ms`,
  });

  return (
    <>
      <section
        id="top"
        ref={sectionRef}
        className="relative z-0 bg-[#0a0a0a]"
        style={{ height: reduced ? "100svh" : "200svh" }}
      >
       <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photograph — full bleed, full fidelity */}
        <div ref={imgWrapRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ willChange: "transform" }}>
          <img
            ref={imgRef}
            src={heroBg.url}
            alt=""
            className="no-img-zoom h-full w-full object-cover object-[58%_46%] md:object-[60%_38%]"
            style={{
              filter: "contrast(1.06) saturate(1.02)",
               transform: on ? "translate3d(0,0,0) scale(1.005)" : "translate3d(0,0,0) scale(1.035)",
              transition: reduced ? "none" : `transform 1700ms ${HERO_EASE} 120ms`,
              willChange: "transform",
            }}
            decoding="async"
            fetchPriority="high"
          />
          {/* Localized readability gradients only — no panel, no wash */}
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/35 via-black/10 to-transparent lg:w-[52%]" />
          {/* Very subtle transparent black overlay over the entire image */}
          <div className="absolute inset-0 bg-black/[0.13]" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent lg:w-[65%]" aria-hidden />
        </div>




        {/* Editorial composition */}
        <div className="page-x relative z-10 flex h-full flex-col pb-28 pt-24 md:pb-24 md:pt-28">

          {/* top: careers eyebrow */}
          <div style={step(450, 16)}>
            <Eyebrow className="text-white/75">Careers</Eyebrow>
          </div>

          {/* oversized headline under the eyebrow */}
          <div
            ref={headlineRef}
            className="pt-2 md:pt-3"
            style={{ willChange: "transform, opacity" }}
          >
            <h1
              className="max-w-[16ch] text-[clamp(3.1rem,9.4vw,7.6rem)] font-medium leading-[1.0] tracking-[-0.035em] text-white"
              style={{
                ...step(980, 56),
                textShadow: "0 1px 40px rgba(0,0,0,0.28)",
              }}
            >
              Accelerate your career growth.
            </h1>
          </div>

          {/* left/middle: supporting copy + CTA directly under headline */}
          <div ref={copyRef} className="mt-4 max-w-[600px] md:mt-5" style={{ willChange: "transform, opacity" }}>
            <p
              className="text-[clamp(1rem,1.35vw,1.2rem)] font-medium leading-[1.6] text-white/85"
              style={step(700, 22)}
            >
              Benefit from an exceptional track record of our graduates&apos; success — audited, published, and repeated across five cohorts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={step(860, 18)}>
              <a
                href="#outcomes"
                className="group inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-black transition hover:opacity-85"
                style={{ fontFamily: MONO }}
              >
                <Download className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" /> Placement report
              </a>
              <a
                href="#recruiters"
                className="group inline-flex items-center gap-2 border border-white/35 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white transition hover:border-white"
                style={{ fontFamily: MONO }}
              >
                Our recruiters <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Editorial block reveal — runs once on first load */}
        <HeroMaskReveal />
       </div>
      </section>
    </>
  );
}

/** Horizontal preview-stack accordion for the four hero statistics. */
function StatsAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 h-full min-h-[540px] w-full bg-[#0a0a0a] text-white md:min-h-[600px] lg:min-h-[640px]">
      <div className="flex h-full min-h-[inherit] w-full flex-col md:flex-row">
        {HERO_STATS.map((s, i) => {
          const isActive = active === i;
          const idx = String(i + 1).padStart(2, "0");
          return (
            <div
              key={s.label}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${s.label} statistic`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className={`group relative min-h-[120px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                i > 0 ? "border-t border-white/12 md:border-t-0 md:border-l md:border-white/12" : ""
              } ${isActive ? "cursor-default bg-[#faf9f7] text-[#0a0a0a]" : "cursor-pointer bg-[#0a0a0a] text-white hover:bg-[#141414]"}`}
              style={{
                flexGrow: isActive ? 68 : 12,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                containerType: "inline-size",
              }}
            >
              {/* Index — anchored to its own panel */}
              <span
                className={`pointer-events-none absolute inset-x-0 top-10 text-center text-[10px] tabular-nums tracking-[0.28em] transition-colors duration-500 md:top-16 ${
                  isActive ? "text-black/45" : "text-white/45"
                }`}
                style={{ fontFamily: MONO }}
              >
                {idx}
              </span>

              {/* Main value — always mounted, centered in its own panel */}
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center px-5 transition-opacity duration-500 md:px-8 lg:px-10"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <div
                  className="w-full min-w-0 whitespace-nowrap text-center leading-[0.86] tracking-[-0.05em]"
                  style={{
                    fontSize: `min(clamp(2.25rem, 30cqw, 8.5rem), ${Math.round(
                      150 / Math.max(3, s.value.length),
                    )}cqw)`,
                  }}
                >
                  {isActive ? <CountUp value={s.value} delay={80} /> : s.value}
                </div>
              </div>

              {/* Vertical divider — closed columns only, centered above the label */}
              <div
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bg-white/25 transition-opacity duration-500 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
                style={{ bottom: "196px", width: "1px", height: "40px" }}
              />

              {/* Label — closed: vertical, anchored near bottom of its own column; active: horizontal at bottom */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center transition-opacity duration-500 ${
                  isActive ? "h-16 text-black/60" : "h-[180px] text-white/45 group-hover:text-white/70"
                }`}
              >
                <span
                  className="whitespace-nowrap uppercase tracking-[0.24em]"
                  style={{
                    fontFamily: MONO,
                    fontSize: isActive ? "10px" : "9px",
                    transform: isActive ? "none" : "rotate(-90deg)",
                  }}
                >
                  {s.label}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}


/** Shared editorial shell: generous whitespace, tonal background, full-bleed rules. */
function Band({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "paper" | "grey";
  className?: string;
  children: React.ReactNode;
}) {
  const bg = tone === "white" ? "bg-white" : tone === "paper" ? "bg-[#faf9f7]" : "bg-[#f2f1ee]";
  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      <div className="page-x py-16 md:py-28">{children}</div>
    </section>
  );
}

/** Sticky editorial column: heading holds while the data scrolls beside it. */
function StickyHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-24">{children}</div>
    </div>
  );
}

function CareerPodcast() {
  const [playing, setPlaying] = useState(false);
  const id = "uiNTwDixAts";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Reveal>
          <Eyebrow>Podcast</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h3 className="mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            How Masters&apos; Union prepares students for top 1% placements
          </h3>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-6 max-w-[50ch] text-[16px] leading-relaxed text-black/65">
            A detailed conversation on the placement engine behind Masters&apos; Union — how recruiter
            access, live industry projects and year-round career coaching translate into offers at the
            firms shaping the next decade.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-b border-black/25 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:border-black"
          >
            Watch on YouTube
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      <ClipReveal>
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              title="How Masters' Union prepares students for top 1% placements"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play placements podcast"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                alt="Masters' Union placements podcast"
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition group-hover:bg-white/25">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  Play podcast
                </span>
              </span>
            </button>
          )}
        </div>
      </ClipReveal>
    </div>
  );
}

function BarChart({ data, max, unit = "L" }: { data: { cohort: string; value: number }[]; max: number; unit?: string }) {
  return (
    <div className="flex h-60 items-end gap-4 md:gap-8">
      {data.map((d, i) => (
        <div key={d.cohort} className="group flex flex-1 flex-col items-center justify-end gap-3">
          <Reveal delay={i * 90} y={12} duration={650} className="text-[0.9rem] tracking-[-0.02em]">
            <CountUp value={`₹${d.value}${unit}`} delay={i * 90} />
          </Reveal>
          <Draw
            axis="y"
            delay={i * 90}
            duration={1000}
            className="w-full bg-black transition-colors duration-500 group-hover:bg-black/70"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <div className="text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>
            {d.cohort}
          </div>
        </div>
      ))}
    </div>
  );
}

function RangeBar({ row, max, delay = 0 }: { row: CohortRow; max: number; delay?: number }) {
  const left = (row.bottom25 / max) * 100;
  const width = ((row.top25 - row.bottom25) / max) * 100;
  const avg = (row.avg / max) * 100;
  const med = (row.median / max) * 100;
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="relative h-8 w-full bg-black/[0.045]">
      <div
        className="absolute inset-y-[10px] origin-left bg-black/20"
        style={{
          left: `${left}%`,
          width: `${width}%`,
          transform: on ? "scaleX(1)" : "scaleX(0)",
          transition: reduced ? "none" : `transform 900ms cubic-bezier(0.16,0.84,0.24,1) ${delay}ms`,
        }}
      />
      {[
        { pos: avg, cls: "inset-y-0 bg-black", d: 420 },
        { pos: med, cls: "inset-y-1 bg-black/40", d: 540 },
      ].map((m) => (
        <div
          key={m.cls}
          className={`absolute w-[2px] ${m.cls}`}
          style={{
            left: `${m.pos}%`,
            opacity: on ? 1 : 0,
            transform: on ? "scaleY(1)" : "scaleY(0.3)",
            transition: reduced
              ? "none"
              : `opacity 500ms ease-out ${delay + m.d}ms, transform 500ms cubic-bezier(0.16,0.84,0.24,1) ${delay + m.d}ms`,
          }}
          title={m.d === 420 ? `Average ₹${row.avg}L` : `Median ₹${row.median}L`}
        />
      ))}
    </div>
  );
}

function Donut({ data }: { data: { label: string; pct: number }[] }) {
  const R = 60;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const shades = ["rgba(0,0,0,0.88)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.18)"];
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-12">
      <svg viewBox="0 0 160 160" className="size-44 -rotate-90">
        {data.map((d, i) => {
          const len = (d.pct / 100) * C;
          const start = offset;
          const el = (
            <circle
              key={d.label}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={shades[i % shades.length]}
              strokeWidth="22"
              strokeDasharray={`${on ? len : 0} ${on ? C - len : C}`}
              strokeDashoffset={-start}
              style={{
                transition: reduced
                  ? "none"
                  : `stroke-dasharray 950ms cubic-bezier(0.16,0.84,0.24,1) ${i * 160}ms`,
              }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-5">
        {data.map((d, i) => (
          <Reveal key={d.label} delay={i * 90} y={14} className="flex items-center gap-3">
            <span className="size-3" style={{ background: shades[i % shades.length] }} />
            <span className="text-[0.95rem]">{d.label}</span>
            <span className="text-[0.95rem] text-black/50">
              <CountUp value={`${d.pct}%`} delay={i * 90} />
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LogoRow({ names }: { names: string[] }) {
  const found = names.filter((n) => LOGOS[n]);
  if (found.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
      {found.map((n, i) => (
        <Reveal key={n} delay={i * 60} y={14} duration={650}>
          <img
            src={LOGOS[n]}
            alt={n}
            loading="lazy"
            className="no-img-zoom h-6 w-auto object-contain opacity-70 transition-opacity duration-500 hover:opacity-100"
          />
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

function Page() {
  const reduced = useReducedMotion();
  const maxCtc = 55;
  const [recruiterTab, setRecruiterTab] = useState(RECRUITER_GROUPS[0].category);
  const active = RECRUITER_GROUPS.find((g) => g.category === recruiterTab)!;
  return (
    <main className="min-h-screen overflow-x-clip bg-white pb-16 text-black md:pb-18" style={{ fontFamily: INTER }}>
      <ScrollProgress />

      {/* Global top navigation — fixed, hides on scroll down, reveals on scroll up */}
      <BottomNav
        items={NAV}
        applyHref="#contact"
        className="!fixed !inset-x-0 !top-0 !bottom-auto z-50 justify-center px-3 pt-0 pb-3 lg:flex"
        innerClassName="!max-w-none"
        compact
        hideOnScroll
      />



      {/* HERO — full-bleed cinematic editorial */}
      <CinematicHero />



      {/* PODCAST + STATISTICS — rises from below and slides over the pinned hero */}
      <section
        className="relative z-20 bg-[#faf9f7]"
        style={{ marginTop: reduced ? 0 : "calc(-100svh - 1px)" }}
      >
        <div className="page-x py-10 md:py-12 lg:py-14">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <CareerPodcast />
            <StatsAccordion />
          </div>
        </div>
      </section>

      {/* AUDITED OUTCOMES */}
      <Band id="outcomes" tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <StickyHead>
            <Reveal>
              <Eyebrow>Five years of audited placements</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-[26ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
                Proven outcomes, verified line by line.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-[68ch] text-[1.05rem] leading-[1.65] text-black/70">
                Our placement reports are audited by Brickworks — auditor for IIM Ahmedabad — and follow the IPRS Revision 2.2 framework for transparent, consistent compensation data.
              </p>
            </Reveal>
          </StickyHead>

          <div className="lg:col-span-8">
            <Rule />
            {AUDIT_STATS.map((s, i) => (
              <div key={s.suffix}>
                <Reveal
                  delay={i * 120}
                  className="group grid grid-cols-1 gap-4 py-8 transition-colors duration-500 hover:bg-black/[0.02] md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <div className="md:col-span-1">
                    <Index n={i + 1} />
                  </div>
                  <div className="md:col-span-5">
                    <div className="text-[clamp(2rem,4.4vw,3.4rem)] leading-none tracking-[-0.03em]">
                      <CountUp value={s.value} delay={i * 120} />
                    </div>
                    <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.suffix}</div>
                  </div>
                  <p className="text-[0.92rem] leading-[1.6] text-black/70 md:col-span-6">{s.note}</p>
                </Reveal>
                <Rule delay={i * 120 + 60} />
              </div>
            ))}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Reveal y={12}>
                <span className="text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>Reports</span>
              </Reveal>
              {REPORT_YEARS.map((y, i) => (
                <Reveal key={y} delay={80 + i * 80} y={12}>
                  <span className="inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-black/75 transition-colors duration-500 hover:border-black/45" style={{ fontFamily: MONO }}>
                    <Download className="size-3" /> Cohort {y}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Band>

      {/* FOUNDER QUOTE */}
      <section className="relative overflow-hidden border-y border-black/10 bg-[#f2f1ee]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 -top-16 select-none text-[22rem] leading-none text-black/[0.04]"
        >
          <Parallax strength={50}>“</Parallax>
        </div>
        <div className="page-x relative py-20 md:py-28">

          <Reveal duration={950}>
            <blockquote className="max-w-[52ch] text-[clamp(1.3rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.015em]">
              “We don&apos;t approach placements the way most B-schools do. At Masters&apos; Union, placements are run by a 50+ member, full-time team spanning company outreach, career preparation, and role-specific coaching.”
            </blockquote>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>
              Pratham Mittal — Founder &amp; CEO, Masters&apos; Union
            </div>
          </Reveal>
        </div>
      </section>

      {/* COHORT CHARTS */}
      <Band id="cohorts" tone="white">
        <Reveal>
          <Eyebrow>Cohort average CTC</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-[30ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            ₹29.12L, ₹33.10L and ₹34.07L — cohort averages that surpassed top B-schools.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Reveal y={14}>
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>PGP TBM — average CTC</div>
                <div className="text-[11px] text-black/45" style={{ fontFamily: MONO }}>₹ lakh</div>
              </div>
            </Reveal>
            <div className="mt-10"><BarChart data={TBM_SERIES} max={38} /></div>
          </div>
          <div>
            <Reveal y={14} delay={100}>
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>PGP TBM YLC — average CTC</div>
                <div className="text-[11px] text-black/45" style={{ fontFamily: MONO }}>₹ lakh</div>
              </div>
            </Reveal>
            <div className="mt-10"><BarChart data={YLC_SERIES} max={38} /></div>
          </div>
        </div>
        <Reveal delay={160}>
          <p className="mt-12 max-w-[70ch] text-[0.95rem] leading-[1.7] text-black/60">
            Reports available for Cohorts 2021–2024, verified and audited by Brickworks Analytics, auditor for IIM Ahmedabad&apos;s placement report.
          </p>
        </Reveal>
      </Band>

      {/* DISTRIBUTION TABLE */}
      <Band tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <StickyHead>
            <Reveal>
              <Eyebrow>Placement statistics — PGP TBM</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-[30ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
                The full distribution, not just the headline number.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-6 bg-black/20" /> Bottom 25% → Top 25%</span>
                <span className="inline-flex items-center gap-2"><span className="h-4 w-[2px] bg-black" /> Average</span>
                <span className="inline-flex items-center gap-2"><span className="h-4 w-[2px] bg-black/40" /> Median</span>
              </div>
            </Reveal>
          </StickyHead>

          <div className="lg:col-span-8">
            <Rule />
            {TBM_TABLE.map((r, i) => (
              <div key={r.cohort}>
                <Reveal
                  delay={i * 90}
                  className="group grid grid-cols-1 gap-5 py-7 transition-colors duration-500 hover:bg-black/[0.02] md:grid-cols-12 md:items-center md:gap-6"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/60 md:col-span-1" style={{ fontFamily: MONO }}>Co{r.cohort}</div>
                  <div className="md:col-span-6"><RangeBar row={r} max={maxCtc} delay={i * 90} /></div>
                  <div className="grid grid-cols-3 gap-4 md:col-span-5">
                    <div>
                      <div className="text-[1.05rem] tracking-[-0.02em]"><CountUp value={`₹${r.avg}L`} delay={i * 90} /></div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Average</div>
                    </div>
                    <div>
                      <div className="text-[1.05rem] tracking-[-0.02em]"><CountUp value={`₹${r.median}L`} delay={i * 90 + 80} /></div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Median</div>
                    </div>
                    <div>
                      <div className="text-[1.05rem] tracking-[-0.02em]"><CountUp value={r.highestLabel} delay={i * 90 + 160} /></div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Highest</div>
                    </div>
                  </div>
                </Reveal>
                <Rule delay={i * 90 + 60} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-black/10 pt-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Salary components — Cohort &apos;24</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[46ch] text-[1rem] leading-[1.7] text-black/70">
                How packages are structured between in-hand cash components and stock options, counting Year 1 vesting only.
              </p>
            </Reveal>
          </div>
          <Donut data={SALARY_COMPONENTS} />
        </div>
      </Band>

      {/* RECRUITERS */}
      <Band id="recruiters" tone="grey" className="border-y border-black/10">
        <Reveal>
          <Eyebrow>Our recruiters</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-[26ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Six categories. One hiring calendar.
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2">
          {RECRUITER_GROUPS.map((g, i) => (
            <Reveal key={g.category} delay={i * 70} y={12}>
              <button
                onClick={() => setRecruiterTab(g.category)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-500 ${
                  recruiterTab === g.category ? "bg-black text-white" : "border border-black/15 text-black/65 hover:border-black/40"
                }`}
                style={{ fontFamily: MONO }}
              >
                {g.category}
              </button>
            </Reveal>
          ))}
        </div>
        <div key={recruiterTab} className="mt-10 min-h-[132px] bg-white p-10">
          <LogoRow names={active.logos} />
        </div>
      </Band>

      {/* TRANSITIONS */}
      <Band tone="white">
        <Reveal>
          <Eyebrow>Career transitions</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-[28ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Where students come from, and where they go.
          </h2>
        </Reveal>
        <div className="mt-14 space-y-16">
          {TRANSITIONS.map((t, ti) => (
            <div key={t.title} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              <StickyHead>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <Index n={ti + 1} />
                    <h3 className="text-[1.2rem] font-medium">{t.title}</h3>
                  </div>
                  <div className="mt-2 pl-9 text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>{t.sub}</div>
                </Reveal>
              </StickyHead>
              <div className="lg:col-span-8">
                <Rule />
                {t.rows.map(([from, to], i) => (
                  <div key={from + to}>
                    <Reveal
                      delay={i * 80}
                      className="group grid grid-cols-1 items-center gap-2 py-5 transition-colors duration-500 hover:bg-black/[0.02] md:grid-cols-[1fr_auto_1fr] md:gap-6"
                    >
                      <div className="text-[0.98rem] text-black/60 transition-colors duration-500 group-hover:text-black/80">{from}</div>
                      <ArrowUpRight className="size-4 rotate-45 text-black/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-black/60" />
                      <div className="text-[0.98rem]">{to}</div>
                    </Reveal>
                    <Rule delay={i * 80 + 60} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* ALUMNI STORIES */}
      <Band id="stories" tone="paper">
        <Reveal>
          <Eyebrow>Hear straight from our alumni</Eyebrow>
        </Reveal>
        <div className="mt-12 space-y-0">
          <Rule />
          {ALUMNI.map((a, i) => (
            <div key={a.name}>
              <Reveal
                delay={(i % 2) * 90}
                className="group grid grid-cols-1 gap-6 py-10 transition-colors duration-500 hover:bg-black/[0.02] lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-4">
                    <Index n={i + 1} />
                    <div>
                      <div className="text-[1.05rem] font-medium leading-tight">{a.name}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>{a.role}</div>
                    </div>
                  </div>
                </div>
                <p className="text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-black/80 lg:col-span-8">“{a.quote}”</p>
              </Reveal>
              <Rule delay={60} />
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <Eyebrow>Student placement experience — 39 stories, selected</Eyebrow>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}>
                <Reveal
                  delay={(i % 2) * 90}
                  className="group border-t border-black/10 py-7 transition-colors duration-500 hover:bg-black/[0.02]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-[0.98rem] font-medium leading-tight">{t.name}</div>
                    <Index n={i + 1} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{t.role}</div>
                  <p className="mt-3 max-w-[52ch] text-[0.9rem] leading-[1.6] text-black/70">{t.note}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Band>

      {/* VENTURES + COMPETITIONS + LIVE PROJECTS */}
      <Band tone="grey" className="border-y border-black/10">
        <Reveal>
          <Eyebrow>Startups founded by MU students</Eyebrow>
        </Reveal>
        <div className="mt-10">
          <Rule />
          {VENTURES.map((v, i) => (
            <div key={v.name}>
              <Reveal
                delay={(i % 3) * 80}
                className="group grid grid-cols-1 items-baseline gap-3 py-6 transition-colors duration-500 hover:bg-black/[0.03] md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-1"><Index n={i + 1} /></div>
                <div className="text-[1.15rem] font-medium leading-tight transition-transform duration-500 group-hover:translate-x-1 md:col-span-3">{v.name}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-black/55 md:col-span-3" style={{ fontFamily: MONO }}>{v.founder}</div>
                <p className="text-[0.9rem] leading-[1.6] text-black/70 md:col-span-5">{v.note}</p>
              </Reveal>
              <Rule delay={40} />
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Case competition wins</Eyebrow>
            </Reveal>
            <div className="mt-8">
              <Rule />
              {COMPETITIONS.map((c, i) => (
                <div key={c.what}>
                  <Reveal delay={i * 80} className="group py-6 transition-colors duration-500 hover:bg-black/[0.03]">
                    <div className="text-[0.98rem] font-medium">{c.what}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{c.who}</div>
                    <p className="mt-2 text-[0.9rem] leading-[1.6] text-black/70">{c.note}</p>
                  </Reveal>
                  <Rule delay={40} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <Eyebrow>Live projects</Eyebrow>
            </Reveal>
            <div className="mt-8">
              <Rule />
              {LIVE_PROJECTS.map((p, i) => (
                <div key={p.name}>
                  <Reveal delay={i * 80} className="group py-6 transition-colors duration-500 hover:bg-black/[0.03]">
                    <div className="text-[0.98rem] font-medium">{p.name}</div>
                    <p className="mt-2 text-[0.9rem] leading-[1.6] text-black/70">{p.note}</p>
                  </Reveal>
                  <Rule delay={40} />
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Reveal>
                <Eyebrow>Student content creators</Eyebrow>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-2">
                {CREATORS.map((c, i) => (
                  <Reveal key={c.name} delay={i * 60} y={12}>
                    <span className="inline-block border border-black/15 bg-white px-3 py-2 text-[0.85rem] text-black/75 transition-colors duration-500 hover:border-black/40">
                      {c.handle} <span className="text-black/40">· {c.name}</span>
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* PATHWAY */}
      <Band id="pathway" tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <StickyHead>
            <Reveal>
              <Eyebrow>A tailored career pathway</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-[28ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
                Eight terms. One continuous career roadmap.
              </h2>
            </Reveal>
          </StickyHead>

          <div className="relative lg:col-span-8">
            {/* progressively drawn roadmap rail */}
            <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-black/10">
              <TimelineRail className="h-full w-px bg-black" />
            </div>

            <div className="space-y-14 md:space-y-16">
              {TERMS.map((t, i) => (
                <RoadmapStage key={t.term} term={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </Band>

      {/* COACHES */}
      <Band tone="paper">
        <Reveal>
          <Eyebrow>Dedicated career coaches</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Making you industry ready.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-14 md:grid-cols-3">
          {COACH_TRACKS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100} className="border-t border-black/10 pt-7">
              <div className="flex items-baseline gap-3">
                <Index n={i + 1} />
                <div className="text-[1.05rem] font-medium leading-tight">{c.title}</div>
              </div>
              <p className="mt-4 text-[0.92rem] leading-[1.6] text-black/70">{c.note}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <Rule />
          {COACHES.map((c, i) => (
            <div key={c.name}>
              <Reveal
                delay={i * 80}
                className="group grid grid-cols-1 gap-1 py-6 transition-colors duration-500 hover:bg-black/[0.02] md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <div className="text-[1rem] font-medium transition-transform duration-500 group-hover:translate-x-1 md:col-span-3">{c.name}</div>
                <div className="text-[0.95rem] text-black/65 md:col-span-7">{c.role}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-black/50 md:col-span-2 md:text-right" style={{ fontFamily: MONO }}>{c.exp}</div>
              </Reveal>
              <Rule delay={40} />
            </div>
          ))}
        </div>
      </Band>

      {/* LEADERS */}
      <Band tone="white">
        <Reveal>
          <Eyebrow>Your future recruiters on campus</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-[1.7] text-black/70">
            CEOs and MDs, CHROs, unicorn founders and senior executives teach, mentor and recruit on campus.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-14 md:grid-cols-2">
          {LEADERS.map((l, i) => (
            <Reveal
              key={l.name}
              delay={(i % 2) * 90}
              className="group flex items-baseline justify-between gap-6 border-t border-black/10 py-6 transition-colors duration-500 hover:bg-black/[0.02]"
            >
              <div>
                <div className="text-[0.98rem] font-medium leading-tight transition-transform duration-500 group-hover:translate-x-1">{l.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{l.role}</div>
              </div>
              <Index n={i + 1} />
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden border-t border-black/10 bg-[#f2f1ee]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center text-[18vw] font-semibold leading-none tracking-[-0.05em] text-black/[0.04]"
        >
          <Parallax strength={60}>CAREERS</Parallax>
        </div>
        <div className="page-x relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>Careers team</Eyebrow>
          </Reveal>
          <Reveal delay={140} duration={950}>
            <h2 className="mt-6 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
              A 50+ member team, working full time on your outcome.
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="mailto:careerservices@mastersunion.org" className="group inline-flex items-center gap-2 bg-black px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white transition hover:opacity-80" style={{ fontFamily: MONO }}>
                <Mail className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" /> careerservices@mastersunion.org
              </a>
              <span className="inline-flex items-center gap-2 border border-black/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-black/70" style={{ fontFamily: MONO }}>
                <Download className="size-3.5" /> Internship report
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/** One roadmap stage: node activates and content reveals as it enters view. */
function RoadmapStage({
  term,
  index,
}: {
  term: { term: string; title: string; items: string[] };
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -25% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="relative pl-10">
      <span
        className="absolute left-0 top-[6px] block size-[15px] rounded-full border border-black/25 bg-white"
        style={{
          transition: reduced ? "none" : "border-color 600ms ease-out, transform 600ms cubic-bezier(0.16,0.84,0.24,1)",
          borderColor: on ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.2)",
          transform: on ? "scale(1)" : "scale(0.7)",
        }}
      >
        <span
          className="absolute inset-[3px] rounded-full bg-black"
          style={{
            opacity: on ? 1 : 0,
            transition: reduced ? "none" : "opacity 600ms ease-out 120ms",
          }}
        />
      </span>

      <div
        style={{
          opacity: on ? 1 : 0.25,
          transform: on ? "none" : "translate3d(0,22px,0)",
          transition: reduced
            ? "opacity 240ms linear"
            : "opacity 800ms cubic-bezier(0.16,0.84,0.24,1), transform 800ms cubic-bezier(0.16,0.84,0.24,1)",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-black/50" style={{ fontFamily: MONO }}>{term.term}</div>
        <div className="mt-3 max-w-[24ch] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug">{term.title}</div>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {term.items.map((i, k) => (
            <li
              key={i}
              className="text-[0.85rem] leading-[1.5] text-black/65"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translate3d(0,10px,0)",
                transition: reduced
                  ? "none"
                  : `opacity 600ms ease-out ${180 + k * 55}ms, transform 600ms cubic-bezier(0.16,0.84,0.24,1) ${180 + k * 55}ms`,
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">{index}</span>
    </div>
  );
}

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Careers & Placements — Masters' Union" },
      { name: "description", content: "1.42 offers per student, $149,114 international average CTC, ₹54.80L top-quartile average. Five years of Brickworks-audited placement outcomes." },
      { property: "og:title", content: "Careers & Placements — Masters' Union" },
      { property: "og:description", content: "Audited placement outcomes across five cohorts: average CTC, distributions, recruiters and alumni career transitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
