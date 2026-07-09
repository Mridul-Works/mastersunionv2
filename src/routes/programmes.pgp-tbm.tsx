import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Star,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Calendar,
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  MapPin,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import SectionDivider from "@/components/SectionDivider";
import { cn } from "@/lib/utils";
import logoWhite from "@/assets/logo-4.png.asset.json";

import bambaiiAsset from "@/assets/startup-logos/Bambaii.png.asset.json";
import beyondVedaAsset from "@/assets/startup-logos/BeyondVeda.png.asset.json";
import blueBrewAsset from "@/assets/startup-logos/BlueBrew.png.asset.json";
import eatAtlasAsset from "@/assets/startup-logos/EatAtlas.png.asset.json";
import fnorAsset from "@/assets/startup-logos/FNOR.png.asset.json";
import flourishFoodsAsset from "@/assets/startup-logos/FlourishFoods.png.asset.json";
import kazeAsset from "@/assets/startup-logos/Kaze.png.asset.json";
import lexisAsset from "@/assets/startup-logos/Lexis.png.asset.json";
import momsAsset from "@/assets/startup-logos/Moms.png.asset.json";
import monarqueAsset from "@/assets/startup-logos/Monarque.png.asset.json";
import nivaraAsset from "@/assets/startup-logos/Nivara.png.asset.json";
import woodysAsset from "@/assets/startup-logos/WoodysPizzeria.png.asset.json";

const STARTUP_LOGOS: { name: string; url: string }[] = [
  { name: "Bambaii", url: bambaiiAsset.url },
  { name: "BeyondVeda", url: beyondVedaAsset.url },
  { name: "BlueBrew", url: blueBrewAsset.url },
  { name: "EatAtlas", url: eatAtlasAsset.url },
  { name: "FNOR", url: fnorAsset.url },
  { name: "Flourish Foods", url: flourishFoodsAsset.url },
  { name: "Kaze", url: kazeAsset.url },
  { name: "Lexi's", url: lexisAsset.url },
  { name: "Mom's", url: momsAsset.url },
  { name: "Monarque", url: monarqueAsset.url },
  { name: "Nivara", url: nivaraAsset.url },
  { name: "Woody's Pizzeria", url: woodysAsset.url },
];

import metaAsset from "@/assets/career-logos/Meta.png.asset.json";
import mckinseyAsset from "@/assets/career-logos/McKinsey.png.asset.json";
import credAsset from "@/assets/career-logos/Cred.png.asset.json";
import servicenowAsset from "@/assets/career-logos/Servicenow.png.asset.json";
import flipkartAsset from "@/assets/career-logos/Flipkart.png.asset.json";
import bainAsset from "@/assets/career-logos/BainAndCompany.png.asset.json";
import goodCapitalAsset from "@/assets/career-logos/GoodCapital.png.asset.json";
import accentureAsset from "@/assets/career-logos/Accenture.png.asset.json";
import kaptureAsset from "@/assets/career-logos/Kapture.png.asset.json";
import zeptoAsset from "@/assets/career-logos/Zepto.png.asset.json";
import bloombergAsset from "@/assets/career-logos/Bloomberg.png.asset.json";
import iciciAsset from "@/assets/career-logos/ICICI.png.asset.json";

const CAREER_LOGOS: { name: string; url: string; className?: string }[] = [
  { name: "McKinsey", url: mckinseyAsset.url },
  { name: "Bain & Company", url: bainAsset.url },
  { name: "Accenture", url: accentureAsset.url },
  { name: "Meta", url: metaAsset.url },
  { name: "ServiceNow", url: servicenowAsset.url },
  { name: "Flipkart", url: flipkartAsset.url },
  { name: "Zepto", url: zeptoAsset.url, className: "h-6 max-w-[75%]" },
  { name: "Cred", url: credAsset.url },
  { name: "Bloomberg", url: bloombergAsset.url },
  { name: "ICICI", url: iciciAsset.url },
  { name: "Kapture", url: kaptureAsset.url },
  { name: "Good Capital", url: goodCapitalAsset.url },
];


const PGP_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "pathways", label: "Pathways" },
  { id: "model", label: "The Model" },
  { id: "terms", label: "8 Terms" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faculty", label: "Faculty" },
  { id: "faq", label: "FAQ" },
];

const PATHWAYS = [
  {
    id: "tbm",
    num: "01",
    label: "Experienced Professionals",
    shortTitle: "PGP TBM",
    fullTitle: "PGP in Technology & Business Management",
    accentClass: "text-black",
    accentBg: "bg-black",
    color: "#000000",
    quickStats: [
      { icon: Clock, text: "16 Months" },
      { icon: Users, text: ">1 year work experience" },
      { icon: BookOpen, text: "120 credits (Inclass + Outclass)" },
      { icon: TrendingUp, text: "Avg. CTC: ₹33.39 LPA" },
    ],
    location: "Gurugram (DLF Cyberpark)",
    cohortSize: "~120",
    nextCohort: "June 2026",
    ideal:
      "Built for ambitious professionals with 1–8 years of experience ready to leap into tech-forward leadership roles — learn from CXOs of Google, McKinsey & Bain, not just textbooks.",
    highlights: [
      { stat: "₹1.28 Cr", desc: "Highest CTC placed" },
      { stat: "145+", desc: "Marquee recruiters — Google, Flipkart, Zomato & more" },
      { stat: "₹5 Cr", desc: "Student-led investment fund — real startups & equities" },
      { stat: "20+", desc: "Cities covered in Bharat Immersion field programme" },
      { stat: "100+", desc: "VCs at Demo Day — launch your startup on campus" },
      { stat: "11.2%", desc: "Students placed as EiR & Chief of Staff at top startups" },
    ],
    applyLink: "https://mastersunion.org/pgp-tbm-applynow",
  },
  {
    id: "ylc",
    num: "02",
    label: "Young Leaders",
    shortTitle: "PGP TBM YLC",
    fullTitle: "Young Leaders' Certificate Programme",
    accentClass: "text-black",
    accentBg: "bg-black",
    color: "#000000",
    quickStats: [
      { icon: Clock, text: "24 Mo" },
      { icon: Users, text: "0–1 year experience" },
      { icon: BookOpen, text: "200 credits (Inclass + Outclass)" },
      { icon: TrendingUp, text: "Avg. CTC: ₹28.24 LPA" },
    ],
    location: "Gurugram (DLF Cyberpark)",
    cohortSize: "~80",
    nextCohort: "June 2026",
    ideal:
      "Designed for fresh graduates and early-career go-getters (0–1 year experience) who want to fast-track into leadership — with extra foundational depth and a mandatory industry internship.",
    highlights: [
      { stat: "₹46.22 LPA", desc: "Highest CTC placed" },
      { stat: "100+", desc: "Recruiting companies across sectors" },
      { stat: "₹2 Cr+", desc: "Earned collectively in Dropshipping Challenge" },
      { stat: "200", desc: "Credits — deeper foundational business & tech modules" },
      { stat: "Day 1", desc: "Startup incubation — graduate with a running business" },
      { stat: "1M+", desc: "Followers built via Creator-preneur track" },
    ],
    applyLink: "https://mastersunion.org/pgp-tbm-applynow",
  },
];

function AdmissionPathwaysSection() {
  const [selected, setSelected] = useState<string | null>("tbm");
  const active = PATHWAYS.find((p) => p.id === selected);

  return (
    <section id="pathways" className="relative overflow-hidden text-black">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ADMISSION PATHWAYS
            </div>
            <h2 className="font-display text-3xl leading-[1.15] tracking-[-0.02em]">
              Two Programmes.
              <br />
              <span className="font-bold">One Mission.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-black/60 md:text-right">
            Choose the pathway that matches your experience level and career ambitions. Both lead to transformative outcomes.
          </p>
        </div>

        <div className="flex flex-col gap-0 lg:flex-row">
          {/* Left: Programme cards */}
          <div className="grid shrink-0 grid-cols-2 gap-0 lg:w-[360px] lg:grid-cols-1">
            {PATHWAYS.map((p) => {
              const isActive = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(isActive ? null : p.id)}
                  className="group relative overflow-hidden text-left transition-all duration-300"
                >
                  <div className={`h-1.5 w-full transition-all duration-300 ${isActive ? p.accentBg : "bg-black/10"}`} />
                  <div
                    className={`border px-3 py-4 transition-all duration-300 sm:px-6 sm:py-8 ${
                      isActive ? "border-black/15 bg-white" : "border-black/10 bg-white hover:bg-black/[0.02]"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between sm:mb-6">
                      <span
                        className={`font-sans text-sm font-bold leading-none tracking-tighter transition-colors duration-300 sm:text-3xl ${
                          isActive ? p.accentClass : "text-black/15"
                        }`}
                      >
                        {p.num}
                      </span>
                      <div
                        className={`flex h-7 w-7 items-center justify-center transition-all duration-300 sm:h-10 sm:w-10 ${
                          isActive ? `${p.accentBg} text-white` : "bg-black/10 text-black/50"
                        }`}
                      >
                        <ArrowUpRight size={16} className="sm:h-[18px] sm:w-[18px]" />
                      </div>
                    </div>

                    <p
                      className={`mb-1 text-xs font-bold uppercase leading-tight tracking-[0.15em] transition-colors sm:mb-2 sm:text-xs sm:tracking-[0.2em] ${
                        isActive ? p.accentClass : "text-black/50"
                      }`}
                    >
                      {p.label}
                    </p>

                    <h3 className="mb-3 font-sans text-sm font-bold tracking-tight text-black sm:mb-6 sm:text-sm">
                      {p.shortTitle}
                    </h3>

                    <div className={`mb-3 h-px w-full transition-colors sm:mb-6 ${isActive ? "bg-black/20" : "bg-black/10"}`} />

                    <div className="mb-8 hidden space-y-4 sm:block">
                      {p.quickStats.map((h) => {
                        const HIcon = h.icon;
                        return (
                          <div key={h.text} className="flex items-center gap-3">
                            <HIcon
                              size={14}
                              className={`shrink-0 transition-colors ${isActive ? p.accentClass : "text-black/40"}`}
                            />
                            <span className={`text-sm transition-colors ${isActive ? "text-black/80" : "text-black/55"}`}>
                              {h.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all sm:gap-2 sm:text-sm ${
                        isActive ? p.accentClass : "text-black/40 group-hover:text-black/60"
                      }`}
                    >
                      {isActive ? "Viewing" : "View"}
                      <ChevronRight
                        size={12}
                        className={`transition-transform sm:h-[14px] sm:w-[14px] ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: expanded detail panel */}
          {active && (
            <div className="max-h-[80vh] min-w-0 flex-1 overflow-y-auto border border-t-0 border-black/15 bg-white lg:max-h-none lg:border-l-0 lg:border-t">
              <div className={`h-1.5 w-full ${active.accentBg}`} />
              <div className="p-5 sm:p-6 md:p-8">
                <span
                  className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: active.color }}
                >
                  {active.label}
                </span>

                <h3 className="mb-2 font-sans text-sm font-bold tracking-tight text-black sm:text-sm md:text-3xl">
                  {active.fullTitle}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-black/65 sm:mb-8">{active.ideal}</p>

                <div className="mb-6 grid grid-cols-1 gap-0 sm:mb-8 sm:grid-cols-3">
                  {[
                    { icon: MapPin, label: "Location", value: active.location },
                    { icon: Users, label: "Cohort Size", value: active.cohortSize },
                    { icon: GraduationCap, label: "Next Cohort", value: active.nextCohort },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-black/10 bg-white px-3 py-3 sm:px-5 sm:py-4"
                    >
                      <stat.icon size={14} className="mb-1.5 text-black/50 sm:mb-2" />
                      <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-black/55 sm:mb-1 sm:text-xs">
                        {stat.label}
                      </p>
                      <p className="break-words text-xs font-semibold text-black sm:text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-black/55 sm:mb-4">Programme Highlights</p>
                <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:grid-cols-3 sm:gap-3 md:gap-4">
                  {active.highlights.map((h, i) => (
                    <div key={i} className="rounded border border-black/10 bg-white p-3 sm:p-4">
                      <span
                        className="mb-1 block font-display text-sm font-extrabold sm:text-3xl"
                        style={{ color: active.color }}
                      >
                        {h.stat}
                      </span>
                      <span className="text-xs leading-snug text-black/65 sm:text-xs">{h.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href={active.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/85 sm:w-auto"
                  >
                    Apply for {active.shortTitle} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


export const Route = createFileRoute("/programmes/pgp-tbm")({
  head: () => ({
    meta: [
      { title: "PGP in Technology & Business Management — Masters' Union" },
      {
        name: "description",
        content:
          "16 months at Masters' Union structured around three engines — InClass fundamentals, OutClass live ventures (D2C brand + Creator Challenge) and Global + Bharat Immersions.",
      },
      { property: "og:title", content: "PGP in Technology & Business Management — Masters' Union" },
      {
        property: "og:description",
        content:
          "Three engines. Real customers, real revenue, real followers, real ground. Median CTC ₹34.6 LPA. 200+ startups founded on campus.",
      },
    ],
  }),
  component: PgpTbm,
});





const IN_CLASS = {
  tracks: [
    { name: "Finance & Fintech", eg: "Read financial statements · Value a business · Raise capital" },
    { name: "Sales & Marketing", eg: "GTM funnels · CRO · Brand psychology · D2C" },
    { name: "Management & Strategy", eg: "Analyse markets · KPIs · Game theory" },
    { name: "Product & Tech", eg: "Code · No-code apps · UI/UX · Dashboards" },
    { name: "AI & ML", eg: "Prompt engineering · LLMs · AI-powered products" },
    { name: "Communication", eg: "Persuasive writing · Speaking · Storytelling" },
    { name: "Liberal Arts", eg: "Geopolitics · Economies · Philosophy" },
  ],
  stats: [
    { k: "150+", v: "Courses across 7 modules" },
    { k: "40%", v: "Faculty are sitting operators" },
    { k: "0", v: "Rote exams" },
  ],
};

// D2C Brand challenge — per-term arc
const D2C_ARC = [
  { t: "T1", h: "Launch", d: "Source, list & sell on Amazon, Blinkit and own store" },
  { t: "T1", h: "Offline fair", d: "1,000+ footfall single-day retail push" },
  { t: "T3", h: "Scale", d: "In-the-Wild consulting: revenue growth for real SMEs" },
  { t: "T5", h: "GTM", d: "Design a full go-to-market for a live consumer product" },
  { t: "T6", h: "PMF", d: "Lower CAC, prove why customers stay" },
  { t: "T8", h: "Profit", d: "One-Day Profit challenge with influencers + artisans" },
];

// Creator Challenge — per-term arc
const CREATOR_ARC = [
  { t: "T2", h: "Kickoff", d: "Pick a niche, script, film, release weekly" },
  { t: "T3", h: "Brand", d: "Voice, tone, identity · YouTube + Instagram release" },
  { t: "T4", h: "Community", d: "Build a community around your idea" },
  { t: "T5", h: "Distribution", d: "Decode social algorithms · scale reach" },
  { t: "T6", h: "Monetise", d: "Brand deals · sponsorships · own products" },
];

const OUT_CLASS = [
  {
    tag: "OutClass · Runs across terms",
    title: "Build a D2C Brand",
    body: "Every student ships a live consumer brand — sourced, launched and scaled on Amazon, Blinkit, Instagram and their own store. Graded on real customers and real revenue, not slides.",
    arc: D2C_ARC,
    stats: [
      { k: "₹10L+", v: "Avg. GMV / student team" },
      { k: "180+", v: "Brands launched to date" },
      { k: "1,000+", v: "Footfall at the offline fair" },
    ],
  },
  {
    tag: "OutClass · Runs across terms",
    title: "Creator Challenge",
    body: "From Term 2, every student builds a personal brand on YouTube, Instagram or LinkedIn — scripting, filming, editing and distributing weekly. Graded on real audience growth in the wild.",
    arc: CREATOR_ARC,
    stats: [
      { k: "50M+", v: "Cumulative views generated" },
      { k: "2.5M+", v: "Followers built by past cohorts" },
      { k: "40+", v: "Creators past 100k followers" },
    ],
  },
];

const IMMERSIONS = [
  {
    tag: "Runs in mid-terms",
    title: "Global Immersion",
    body: "A full on-ground module at Fortune 500 HQs and top B-schools — Silicon Valley, Dubai, Singapore, London — meeting operators building at global scale.",
    stats: [
      { k: "5+", v: "Countries hosted to date" },
      { k: "40+", v: "Fortune 500 offices visited" },
      { k: "12", v: "Partner B-schools" },
    ],
  },
  {
    tag: "Runs in mid-terms",
    title: "Bharat Immersion",
    body: "A deep dive into Tier-2 & Tier-3 India — factory floors, family businesses, agri-clusters and D2C hubs. See the market 90% of India actually buys from.",
    stats: [
      { k: "12+", v: "Cities across Bharat" },
      { k: "100+", v: "SMEs & founders met on ground" },
      { k: "6", v: "Sectors covered per cohort" },
    ],
  },
];

// -------- 8-term timeline (three engines, term by term) --------
type EngineCell = { label: string; kind: "in" | "d2c" | "creator" | "imm" };
type TermRow = { term: string; inClass: string; outClass: EngineCell[] };

const TERM_MATRIX: TermRow[] = [
  { term: "T1", inClass: "Fundamentals · Finance · Sales", outClass: [{ label: "D2C · Dropshipping launch", kind: "d2c" }] },
  { term: "T2", inClass: "GTM · Product mindset · LLMs", outClass: [{ label: "D2C · Marketing hackathon", kind: "d2c" }, { label: "Creator · Kickoff", kind: "creator" }] },
  { term: "T3", inClass: "Storytelling · Banking · No-code", outClass: [{ label: "D2C · In-the-wild consulting", kind: "d2c" }, { label: "Creator · Brand", kind: "creator" }] },
  { term: "T4", inClass: "Valuation · UI/UX · Crisis mgmt", outClass: [{ label: "D2C · MVP debut", kind: "d2c" }, { label: "Creator · Community", kind: "creator" }, { label: "Global Immersion", kind: "imm" }] },
  { term: "T5", inClass: "Models · Analytics · B2B", outClass: [{ label: "D2C · GTM challenge", kind: "d2c" }, { label: "Creator · Distribution", kind: "creator" }, { label: "Bharat Immersion", kind: "imm" }] },
  { term: "T6", inClass: "Pricing · PE/VC · Copy", outClass: [{ label: "D2C · Product-Market Fit", kind: "d2c" }, { label: "Creator · Monetise", kind: "creator" }] },
  { term: "T7", inClass: "IPOs · IP law · ML", outClass: [{ label: "Raise a Seed Fund", kind: "d2c" }] },
  { term: "T8", inClass: "DeFi · Risk · Compliance", outClass: [{ label: "One-Day Profit challenge", kind: "d2c" }] },
];

const ENGINE_COLORS: Record<EngineCell["kind"], string> = {
  in: "bg-white/90 text-black/80",
  d2c: "bg-emerald-50 text-emerald-800 border-l-2 border-emerald-500",
  creator: "bg-amber-50 text-amber-800 border-l-2 border-amber-500",
  imm: "bg-indigo-50 text-indigo-800 border-l-2 border-indigo-500",
};

// -------- Outcomes --------
const OUTCOME_HEADLINE = [
  { k: "₹34.6 LPA", v: "Median CTC · Class of 2025" },
  { k: "₹1.2 Cr", v: "Highest domestic offer" },
  { k: "500+", v: "Recruiters on campus" },
];

const OUTCOME_STARTUP = [
  { k: "200+", v: "Startups founded on campus" },
  { k: "₹60 Cr+", v: "Funding raised by student ventures" },
  { k: "35+", v: "Ventures with paying customers" },
];

const OUTCOME_ROLES = [
  { role: "Product & Growth", pct: "28%" },
  { role: "Strategy & Consulting", pct: "22%" },
  { role: "Founder / Own venture", pct: "18%" },
  { role: "Finance & Investing", pct: "17%" },
  { role: "Tech & AI", pct: "15%" },
];

// -------- Faculty --------
import facultyFaverie from "@/assets/faculty/faverie.png.asset.json";
import facultyLanMa from "@/assets/faculty/lanma.png.asset.json";
import facultyZal from "@/assets/faculty/zal.png.asset.json";
import facultyDaniel from "@/assets/faculty/daniel.png.asset.json";
import facultyManoj from "@/assets/faculty/manoj.png.asset.json";
import facultyBhupesh from "@/assets/faculty/bhupesh.png.asset.json";
import facultyNandini from "@/assets/faculty/nandini.png.asset.json";
import facultyGarima from "@/assets/faculty/garima.png.asset.json";

type FacultyMember = {
  name: string;
  role: string;
  tag: string;
  image: string;
  bio: string;
  focus: string[];
};

const FACULTY: FacultyMember[] = [
  {
    name: "Kunal Shah",
    role: "Founder, CRED",
    tag: "Consumer Behaviour",
    image: facultyFaverie.url,
    bio: "Built India's most-loved consumer fintech brand. Teaches the psychology of trust, status and retention that turns a product into a habit — and a habit into a business.",
    focus: ["Consumer Psychology", "Retention Economics", "Brand as Behaviour"],
  },
  {
    name: "Deepinder Goyal",
    role: "Founder, Zomato",
    tag: "Building at Scale",
    image: facultyDaniel.url,
    bio: "Scaled a food-delivery startup into a listed consumer platform across 1,000+ cities. Brings first-hand frameworks on org design, marketplace economics and building through cycles.",
    focus: ["Marketplace Design", "Org Building at Scale", "Public-Market Playbook"],
  },
  {
    name: "Nithin Kamath",
    role: "Founder, Zerodha",
    tag: "Capital Markets",
    image: facultyManoj.url,
    bio: "Built India's largest brokerage without a single rupee of external capital. Teaches capital markets from the inside — how retail investors actually behave and how durable businesses are financed.",
    focus: ["Capital Markets Structure", "Bootstrapped Scaling", "Retail Investor Behaviour"],
  },
  {
    name: "Ronnie Screwvala",
    role: "Founder, upGrad · UTV",
    tag: "Media & Ventures",
    image: facultyZal.url,
    bio: "Built and exited one of India's largest media houses, then rebuilt in edtech. Advises operators on category creation, storytelling, and the second-act discipline of serial founders.",
    focus: ["Category Creation", "Media & Distribution", "Serial Entrepreneurship"],
  },
  {
    name: "Radhika Gupta",
    role: "CEO, Edelweiss AMC",
    tag: "Asset Management",
    image: facultyNandini.url,
    bio: "Runs one of India's fastest-growing asset managers. Translates institutional-grade portfolio construction into frameworks operators can use to think about risk, allocation and long-horizon compounding.",
    focus: ["Asset Allocation", "Risk Frameworks", "Long-Horizon Compounding"],
  },
  {
    name: "Anand Chandrasekaran",
    role: "GM, Meta",
    tag: "Product Leadership",
    image: facultyBhupesh.url,
    bio: "Has led product at Meta, Snap, Airtel and Bharti — shipping to hundreds of millions of users. Teaches the craft of product decisions, review culture and how great PMs actually earn trust with engineering.",
    focus: ["Product Strategy", "Review Culture", "Cross-Functional Leadership"],
  },
];

// -------- Admissions & FAQ --------
// Sourced from mastersunion.org/pgp-tbm-admissions-and-fees
const APPLICATION_STEPS = [
  {
    step: "01",
    title: "Complete the Application Form",
    summary:
      "Fill out your details and upload supporting documents so the admissions team can review your profile.",
    points: [
      "Latest resume — any clean, concise format works",
      "Qualification documents covering academics, work and extra-curriculars",
      "Optional: upload your CAT / GMAT / GMAT Focus score",
    ],
  },
  {
    step: "02",
    title: "MU-BAAT",
    summary:
      "The Masters' Union Business Aptitude & Admissions Test — an online, recorded conversation that evaluates business aptitude, clarity of thought and creative thinking.",
    points: [
      "45–60 minutes · 9 questions across 5 sections",
      "Only required if you haven't submitted a CAT / GMAT score you're happy with",
      "Test link is shared the day after the application deadline",
    ],
  },
  {
    step: "03",
    title: "Personal Interview",
    summary:
      "Shortlisted applicants are invited to an interview conducted by distinguished faculty members and seasoned industry leaders.",
    points: [
      "Invitations sent 3–5 days before the interview",
      "Faculty + operator panel evaluation",
      "Date, venue and time confirmed in advance",
    ],
  },
  {
    step: "04",
    title: "Final Admission Decision",
    summary:
      "The admissions committee slots applicants into accepted, waitlisted or not-accepted pools.",
    points: [
      "Offers include the full financial structure for the programme",
      "Waitlisted candidates are promoted on a rolling basis — no ranked list",
      "Not-accepted applicants may re-apply in the next academic year",
    ],
  },
];

const FAQ = [
  {
    q: "How is the 16 months actually structured?",
    a: "Three engines run in parallel every term: InClass (7 tracks of fundamentals), OutClass (a live D2C brand + a Creator Challenge that both run across terms) and Immersions (Global + Bharat modules in the middle terms). Every course, challenge and trip is graded on a real deliverable.",
  },
  {
    q: "Do all students do the D2C and Creator challenges?",
    a: "Yes. Both are mandatory OutClass tracks. The D2C brand starts Term 1; the Creator Challenge kicks in from Term 2 and runs alongside curriculum through Term 6.",
  },
  {
    q: "Are immersions mandatory?",
    a: "Global and Bharat immersions are opt-in. Most students opt into at least one; many opt into both. Immersions slot into Terms 4 and 5.",
  },
  {
    q: "How is this different from a traditional MBA?",
    a: "You don't submit case-study essays. You launch real ventures, ship real products and manage real money. 40% of faculty are sitting CEOs, founders and operators — not just professors.",
  },
  {
    q: "Do I need CAT or GMAT?",
    a: "No. Admission is via our own aptitude assessment and an operator-led interview, in rolling rounds until the cohort fills.",
  },
];


// -------- 8-term Gantt calendar --------
const TERM_META = [
  { months: "Months 1–2", window: "Aug – Sep '26" },
  { months: "Months 3–4", window: "Oct – Nov '26" },
  { months: "Months 5–6", window: "Dec '26 – Jan '27" },
  { months: "Months 7–8", window: "Feb – Mar '27" },
  { months: "Months 9–10", window: "Apr – May '27" },
  { months: "Months 11–12", window: "Jun – Jul '27" },
  { months: "Months 13–14", window: "Aug – Sep '27" },
  { months: "Months 15–16", window: "Oct – Nov '27" },
];

type Lane = {
  key: string;
  engine: "in" | "d2c" | "creator" | "capstone" | "imm";
  label: string;
  sub: string;
  bars: { start: number; end: number; text: string; tone: "d2c" | "creator" | "imm" | "capstone" }[];
};

const IN_CLASS_TRACKS = [
  "Finance · Sales",
  "Strategy · Product",
  "Marketing · Comms",
  "AI/ML · Product",
  "Finance · Strategy",
  "Sales · AI/ML",
  "Product · Liberal Arts",
  "Finance · Comms",
];

const OUT_LANES: Lane[] = [
  {
    key: "d2c",
    engine: "d2c",
    label: "D2C brand",
    sub: "Live consumer venture",
    bars: [{ start: 1, end: 8, text: "Launch → Scale → PMF → Profit", tone: "d2c" }],
  },
  {
    key: "creator",
    engine: "creator",
    label: "Creator Challenge",
    sub: "Personal brand in the wild",
    bars: [{ start: 2, end: 6, text: "Brand → Community → Monetise", tone: "creator" }],
  },
  {
    key: "imm",
    engine: "imm",
    label: "Immersions",
    sub: "On-ground trips",
    bars: [
      { start: 4, end: 4, text: "Global", tone: "imm" },
      { start: 5, end: 5, text: "Bharat", tone: "imm" },
    ],
  },
];


const TONE_ACCENT: Record<string, string> = {
  in: "bg-black",
  d2c: "bg-[#0F8F6E]",
  creator: "bg-[#E38330]",
  imm: "bg-[#39B5D7]",
  capstone: "bg-black",
};

const TONE_INK: Record<string, string> = {
  in: "text-black",
  d2c: "text-[#0F8F6E]",
  creator: "text-[#E38330]",
  imm: "text-[#2A7E96]",
  capstone: "text-black",
};

const LANE_TONE_LABELS: Record<string, string> = {
  d2c: "Live D2C brand",
  creator: "Creator challenge",
  imm: "Immersion trip",
  capstone: "Final challenge",
};

type RowDef = {
  key: string;
  engine: "in" | "d2c" | "creator" | "imm";
  label: string;
  sub: string;
  cells: (null | { text: string; note?: string; tone: "in" | "d2c" | "creator" | "imm" })[];
};

const ROWS: RowDef[] = [
  {
    key: "in",
    engine: "in",
    label: "InClass",
    sub: "Business fundamentals",
    cells: IN_CLASS_TRACKS.map((t) => ({ text: t, tone: "in" as const })),
  },
  {
    key: "d2c",
    engine: "d2c",
    label: "D2C brand",
    sub: "Live consumer venture",
    cells: [
      { text: "Launch", note: "Idea → SKU", tone: "d2c" },
      { text: "Ship", note: "First orders", tone: "d2c" },
      { text: "Scale", note: "Paid + retention", tone: "d2c" },
      { text: "PMF", note: "Cohorts hold", tone: "d2c" },
      { text: "Margin", note: "Unit economics", tone: "d2c" },
      { text: "Profit", note: "Cashflow positive", tone: "d2c" },
      { text: "Handoff", note: "Board review", tone: "d2c" },
      { text: "Exit note", note: "Case + demo day", tone: "d2c" },
    ],
  },
  {
    key: "creator",
    engine: "creator",
    label: "Creator",
    sub: "Personal brand",
    cells: [
      null,
      { text: "Brand", note: "Voice + niche", tone: "creator" },
      { text: "Community", note: "First 1k", tone: "creator" },
      { text: "Publish", note: "Weekly cadence", tone: "creator" },
      { text: "Monetise", note: "Offer + funnel", tone: "creator" },
      { text: "Compound", note: "Distribution", tone: "creator" },
      null,
      null,
    ],
  },
  {
    key: "imm",
    engine: "imm",
    label: "Immersions",
    sub: "On-ground trips",
    cells: [
      null,
      null,
      null,
      { text: "Global", note: "SF / Dubai", tone: "imm" },
      { text: "Bharat", note: "Tier-2 markets", tone: "imm" },
      null,
      null,
      null,
    ],
  },
];

function TermsGantt({ embedded = false }: { embedded?: boolean } = {}) {
  const [active, setActive] = useState<number | null>(null);

  const Wrapper: React.ElementType = embedded ? "div" : "section";
  const wrapperProps = embedded
    ? { id: "terms", className: "" }
    : {
        id: "terms",
        className: "bg-white",
      };
  const innerClass = embedded ? "" : "mx-auto max-w-[1180px] px-4 py-20 sm:px-6";

  return (
    <Wrapper {...wrapperProps}>
      <div className={innerClass}>
        {!embedded && (
          <div className="mb-8 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50">The proof · 8 terms in one view</div>
            <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
              The whole 16 months, on one calendar.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-black/60">
              Rows are engines, columns are terms. Every cell is what you actually do that term.
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-black/50">
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-black" /> InClass</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-[#0F8F6E]" /> D2C</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-[#E38330]" /> Creator</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-[#39B5D7]" /> Immersion</span>
        </div>

        {/* Matrix */}
        <div className="overflow-x-auto">
          <div
            className="min-w-[980px] border border-black/15 divide-y divide-black/10"
            onMouseLeave={() => setActive(null)}
          >
            {/* Header row: Term columns */}
            <div className="grid grid-cols-[200px_repeat(8,1fr)] divide-x divide-black/10 bg-black text-white">
              <div className="flex flex-col justify-center gap-1 px-4 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">Aug '26 → Nov '27</div>
                <div className="font-display text-sm tracking-tight text-white/90">16 months · 8 terms</div>
              </div>
              {TERM_META.map((m, i) => {
                const t = i + 1;
                const isActive = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onMouseEnter={() => setActive(t)}
                    onFocus={() => setActive(t)}
                    onClick={() => setActive(t)}
                    className={`group relative flex flex-col items-start gap-1 px-3 py-4 text-left transition-colors ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-display text-lg leading-none tracking-tight ${isActive ? "text-black" : "text-white"}`}>{String(t).padStart(2, "0")}</span>
                      <span className={`text-[10px] uppercase tracking-[0.18em] ${isActive ? "text-black/50" : "text-white/50"}`}>Term</span>
                    </div>
                    <div className={`text-[11px] leading-tight ${isActive ? "text-black/70" : "text-white/70"}`}>{m.months}</div>
                    <div className={`text-[10px] uppercase tracking-[0.14em] ${isActive ? "text-black/45" : "text-white/45"}`}>{m.window}</div>
                  </button>
                );
              })}
            </div>

            {/* Data rows */}
            {ROWS.map((row) => (
              <div key={row.key} className="grid grid-cols-[200px_repeat(8,1fr)] divide-x divide-black/10">
                {/* Row label */}
                <div className="flex flex-col justify-center gap-1 px-4 py-4">
                  <div className={`flex items-center gap-2 font-display text-sm tracking-tight ${TONE_INK[row.engine]}`}>
                    <span className={`h-3 w-[3px] ${TONE_ACCENT[row.engine]}`} />
                    {row.label}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-black/45">{row.sub}</div>
                </div>
                {row.cells.map((cell, i) => {
                  const t = i + 1;
                  const isActive = active === t;
                  if (!cell) {
                    return (
                      <div
                        key={t}
                        onMouseEnter={() => setActive(t)}
                        className={`relative min-h-[76px] transition-colors ${isActive ? "bg-black/[0.04]" : "bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(0,0,0,0.04)_6px_7px)]"}`}
                      />
                    );
                  }
                  return (
                    <div
                      key={t}
                      onMouseEnter={() => setActive(t)}
                      className={`group relative flex min-h-[76px] flex-col justify-between px-3 py-3 transition-colors ${isActive ? "bg-black text-white" : "bg-white"}`}
                    >
                      <div className={`h-[3px] w-6 ${TONE_ACCENT[cell.tone]} ${isActive ? "opacity-100" : "opacity-90"}`} />
                      <div>
                        <div className={`font-display text-[13px] leading-tight tracking-tight ${isActive ? "text-white" : "text-black"}`}>{cell.text}</div>
                        {cell.note && (
                          <div className={`mt-0.5 text-[10px] uppercase tracking-[0.14em] ${isActive ? "text-white/60" : "text-black/45"}`}>{cell.note}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Term detail strip */}
        <div className="mt-5 grid gap-0 border border-black/15 md:grid-cols-[220px_1fr]">
          <div className="border-b border-black/10 bg-black p-5 text-white md:border-b-0 md:border-r">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">{active ? "In this term" : "Preview a term"}</div>
            <div className="mt-2 font-display text-3xl leading-none tracking-tight">
              {active ? `Term ${active}` : "—"}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/55">
              {active ? TERM_META[active - 1].window : "Hover a column above"}
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4">
            {ROWS.map((row) => {
              const cell = active ? row.cells[active - 1] : null;
              return (
                <div key={row.key} className="p-4">
                  <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${TONE_INK[row.engine]}`}>
                    <span className={`h-2 w-2 ${TONE_ACCENT[row.engine]}`} />
                    {row.label}
                  </div>
                  <div className="mt-2 font-display text-sm tracking-tight text-black">
                    {cell ? cell.text : <span className="text-black/25">—</span>}
                  </div>
                  {cell?.note && (
                    <div className="mt-0.5 text-[11px] text-black/55">{cell.note}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Wrapper>

  );
}


// -------- Alumni Showcase --------
type Alum = {
  name: string;
  batch: string;
  role: string;
  company: string;
  domain: string;
  quote: string;
  linkedin: string;
  calendly?: string;
  accent: string;
  image: string;
};

const ALUMNI: Alum[] = [
  {
    name: "Ananya Verma",
    batch: "PGP '23",
    role: "Product Manager",
    company: "Zomato",
    domain: "Product",
    quote: "My D2C brand from Term 2 became my portfolio piece at Zomato interviews.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-emerald-400 to-teal-600",
    image: facultyNandini.url,
  },
  {
    name: "Rohan Iyer",
    batch: "PGP '22",
    role: "Founder & CEO",
    company: "Kettl (Seed · $1.2M)",
    domain: "Startup",
    quote: "The Creator Challenge taught me distribution before I knew I'd need it as a founder.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-amber-400 to-orange-600",
    image: facultyBhupesh.url,
  },
  {
    name: "Sanya Kapoor",
    batch: "PGP '24",
    role: "Investment Analyst",
    company: "Peak XV Partners",
    domain: "VC & Finance",
    quote: "Running a real P&L for 16 months is a better filter than any DCF model.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-indigo-400 to-violet-600",
    image: facultyGarima.url,
  },
  {
    name: "Kabir Menon",
    batch: "PGP '23",
    role: "Growth Lead",
    company: "CRED",
    domain: "Growth",
    quote: "The InClass GTM track plugged straight into my first CRED growth sprint.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-rose-400 to-pink-600",
    image: facultyZal.url,
  },
  {
    name: "Meera Joshi",
    batch: "PGP '22",
    role: "Consultant",
    company: "Bain & Company",
    domain: "Consulting",
    quote: "Bharat Immersion is why I chose consumer strategy over generalist consulting.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-sky-400 to-blue-600",
    image: facultyLanMa.url,
  },
  {
    name: "Aarav Suri",
    batch: "PGP '24",
    role: "Co-founder",
    company: "Motif Labs (YC W25)",
    domain: "Startup",
    quote: "Met my co-founder in the T5 Bharat Immersion. We shipped MVP by T7.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-lime-400 to-emerald-600",
    image: facultyDaniel.url,
  },
  {
    name: "Ishita Rao",
    batch: "PGP '23",
    role: "Brand Manager",
    company: "Nykaa",
    domain: "Consumer",
    quote: "I walked into Nykaa having already run a live D2C P&L for 14 months.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-fuchsia-400 to-purple-600",
    image: facultyFaverie.url,
  },
  {
    name: "Dev Shah",
    batch: "PGP '22",
    role: "Associate",
    company: "Kotak Investment Banking",
    domain: "Finance",
    quote: "The PE/VC track in Term 6 was taught by people who actually write cheques.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-slate-500 to-zinc-800",
    image: facultyManoj.url,
  },
];

function initialsOf(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function Eyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground/60">
      <span className="text-muted-foreground">/{num}</span>
      <span className="h-px w-8 bg-foreground/20" />
      <span>{label}</span>
    </div>
  );
}

function AlumniShowcase() {
  const industries = ["All", ...Array.from(new Set(ALUMNI.map((a) => a.domain)))];
  const [industry, setIndustry] = useState<string>("All");
  const filtered = industry === "All" ? ALUMNI : ALUMNI.filter((a) => a.domain === industry);
  const [idx, setIdx] = useState(0);
  const total = filtered.length;
  const safeIdx = total > 0 ? Math.min(idx, total - 1) : 0;
  const active = filtered[safeIdx];
  const nextIdx = total > 0 ? (safeIdx + 1) % total : 0;
  const next = filtered[nextIdx];
  const go = (dir: 1 | -1) => setIdx((i) => total === 0 ? 0 : (safeIdx + dir + total) % total);
  const handleIndustry = (v: string) => { setIndustry(v); setIdx(0); };


  const secondary = filtered[nextIdx];
  const tertiaryIdx = total > 0 ? (safeIdx + 2) % total : 0;
  const tertiary = filtered[tertiaryIdx];

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ALUMNI NETWORK
          </div>
          <h3 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-black md:text-5xl">
            Success <span className="font-serif-italic font-normal">stories.</span>
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-black/60">
          Our work speaks for itself, but our 1,400+ alumni say it even better. Meet a few — and reach out.
        </p>
      </div>

      {/* Industry filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-black/10 pt-5">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.28em] text-black/45">Filter · Industry</span>
        {industries.map((ind) => {
          const isActive = ind === industry;
          const count = ind === "All" ? ALUMNI.length : ALUMNI.filter((a) => a.domain === ind).length;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => handleIndustry(ind)}
              className={`inline-flex items-center gap-2 rounded-none border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
              }`}
            >
              <span>{ind}</span>
              <span className={isActive ? "text-white/60" : "text-black/35"}>{count}</span>
            </button>
          );
        })}
      </div>

      {total === 0 ? (
        <div className="mt-12 rounded-none border border-black/10 bg-white/60 p-10 text-center font-mono text-xs uppercase tracking-[0.24em] text-black/50">
          No alumni in this industry yet.
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {/* FEATURE — Portrait + quote overlay */}
            <article
              className="relative col-span-12 overflow-hidden rounded-none lg:col-span-7 lg:min-h-[560px]"
              style={{ boxShadow: "0 40px 120px -40px rgba(0,0,0,0.35)" }}
            >
              {filtered.map((a, i) => (
                <div
                  key={a.name}
                  className="absolute inset-0"
                  style={{
                    opacity: i === safeIdx ? 1 : 0,
                    transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <ImagePlaceholder label={`${a.name} portrait`} aspect="4/5" className="h-full w-full" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(233,90,50,0.55) 0%, rgba(232,140,60,0.25) 45%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />
                </div>
              ))}

              {/* Top-left brand chip */}
              <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-none bg-white/90 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-none bg-teal" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/70">
                  {active.domain} · {active.batch}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-9">
                {filtered.map((a, i) => (
                  <div
                    key={a.name}
                    style={{
                      opacity: i === safeIdx ? 1 : 0,
                      transform: i === safeIdx ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 700ms ease, transform 700ms ease",
                      position: i === safeIdx ? "relative" : "absolute",
                      inset: i === safeIdx ? "auto" : "auto 1.75rem 1.75rem 1.75rem",
                      pointerEvents: i === safeIdx ? "auto" : "none",
                    }}
                  >
                    <p className="max-w-xl font-display text-2xl font-semibold leading-[1.2] text-white md:text-[28px] md:leading-[1.18]">
                      &ldquo;{a.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-display text-base font-semibold text-white">{a.name}</p>
                        <p className="text-xs text-white/75">{a.role} · {a.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={a.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 items-center gap-1.5 rounded-none bg-white px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-black transition hover:bg-white/85"
                        >
                          <Linkedin className="size-3" /> Connect
                        </a>
                        {a.calendly && (
                          <a
                            href={a.calendly}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-none border border-white/60 px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                          >
                            <Calendar className="size-3" /> Book
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* RIGHT column — Two testimonial cards */}
            <div className="col-span-12 grid gap-5 lg:col-span-5">
              {/* Dark card */}
              {secondary && (
                <div className="rounded-none bg-black p-6 text-white md:p-7">
                  <p className="font-display text-lg leading-[1.35] text-white md:text-xl">
                    &ldquo;{secondary.quote}&rdquo;
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                    <div>
                      <p className="font-display text-2xl font-semibold text-white">{secondary.batch}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">Batch</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold text-white">{secondary.domain}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">Track</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-none bg-white/10 font-mono text-[11px] text-white">
                      {initialsOf(secondary.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{secondary.name}</p>
                      <p className="text-[11px] text-white/60">{secondary.role} · {secondary.company}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Light card */}
              {tertiary && (
                <div className="rounded-none border border-black/10 bg-white p-6 md:p-7">
                  <p className="font-display text-lg leading-[1.35] text-black md:text-xl">
                    &ldquo;{tertiary.quote}&rdquo;
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
                    <div>
                      <p className="font-display text-2xl font-semibold text-black">{tertiary.batch}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">Batch</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold text-black">{tertiary.domain}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">Track</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-none bg-black/5 font-mono text-[11px] text-black">
                      {initialsOf(tertiary.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{tertiary.name}</p>
                      <p className="text-[11px] text-black/60">{tertiary.role} · {tertiary.company}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-5">
            <div className="flex items-baseline gap-2 font-display">
              <span className="text-2xl font-semibold leading-none text-black">
                {String(safeIdx + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl leading-none text-black/30">
                /{String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Go to alumni ${i + 1}`}
                  className="transition-all duration-500 ease-out"
                  style={{
                    width: i === safeIdx ? "28px" : "8px",
                    height: "2px",
                    background: i === safeIdx ? "rgb(0,0,0)" : "rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous alumni"
                className="flex h-10 w-10 items-center justify-center rounded-none border border-black/15 text-black transition hover:bg-black hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next alumni"
                className="flex h-10 w-10 items-center justify-center rounded-none border border-black/15 text-black transition hover:bg-black hover:text-white"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


function FacultyShowcase() {
  const [idx, setIdx] = useState(0);
  const total = FACULTY.length;
  const active = FACULTY[idx];
  const nextIdx = (idx + 1) % total;
  const next = FACULTY[nextIdx];
  const go = (dir: 1 | -1) => setIdx((i) => (i + dir + total) % total);

  return (
    <div className="mt-16 grid gap-10 lg:gap-14 lg:[grid-template-columns:minmax(0,1fr)_minmax(0,0.34fr)]">
      {/* Featured */}
      <article className="relative lg:min-h-[620px]">
        <div className="grid gap-8 lg:gap-14 items-start grid-cols-1 sm:[grid-template-columns:minmax(0,0.6fr)_minmax(0,1fr)]">
          {/* Portrait cross-fade stack */}
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden sm:mx-0 sm:aspect-[4/5] sm:max-w-[320px]"
            style={{
              boxShadow: "0 60px 140px -40px rgba(0,0,0,0.95)",
            }}
          >
            {FACULTY.map((f, i) => (
              <div
                key={f.name}
                className="absolute inset-0"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transition: "opacity 900ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <ImagePlaceholder label={`${f.name} portrait`} aspect="4/5" className="h-full w-full" />
              </div>
            ))}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-color"
              style={{ background: "linear-gradient(180deg, rgba(0,156,80,0.18) 0%, rgba(0,72,34,0.42) 100%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(13,20,16,0) 40%, rgba(13,20,16,0.7) 100%)" }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {active.tag}
              </p>
            </div>
          </div>

          {/* Content cross-fade */}
          <div className="relative">
            {FACULTY.map((f, i) => (
              <div
                key={f.name}
                className="flex flex-col"
                style={{
                  position: i === idx ? "relative" : "absolute",
                  inset: i === idx ? "auto" : 0,
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 800ms cubic-bezier(0.4,0,0.2,1), transform 800ms cubic-bezier(0.4,0,0.2,1)",
                  pointerEvents: i === idx ? "auto" : "none",
                }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-block h-px w-8 bg-foreground/40" />
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/70">
                    Faculty · {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-foreground/50">
                  {f.tag}
                </p>
                <h3 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm text-foreground/65">{f.role}</p>
                <div className="mt-6 h-px w-12 bg-foreground/30" />
                <p className="mt-5 text-sm leading-[1.7] text-foreground/85 md:mt-6 md:text-sm md:leading-[1.75]">{f.bio}</p>

                <div className="mt-8">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                    Selected Portfolio
                  </p>
                  <ul className="space-y-2.5">
                    {f.focus.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-foreground/85">
                        <span className="text-muted-foreground">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Controls */}
            <div className="mt-10 flex items-center gap-5 border-t border-border pt-6">
              <div className="flex gap-1.5">
                {FACULTY.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`Go to faculty ${i + 1}`}
                    className="transition-all duration-700 ease-out"
                    style={{
                      width: i === idx ? "32px" : "8px",
                      height: "2px",
                      background: i === idx ? "var(--smoke-300)" : "rgba(13,20,16,0.25)",
                    }}
                  />
                ))}
              </div>
              <div className="h-px flex-1 bg-muted/40" />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous faculty"
                  className="flex h-10 w-10 items-center justify-center text-foreground transition-colors duration-500 hover:bg-muted/60"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next faculty"
                  className="flex h-10 w-10 items-center justify-center text-foreground transition-colors duration-500 hover:bg-muted/60"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Up Next */}
      <aside className="mx-auto flex w-full flex-col gap-6 lg:mx-0">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/45">Up Next</p>
        <button
          type="button"
          onClick={() => go(1)}
          className="group relative block overflow-hidden text-left"
          style={{ aspectRatio: "4 / 5", boxShadow: "0 40px 100px -40px rgba(0,0,0,0.9)" }}
        >
          {FACULTY.map((f, i) => (
            <div
              key={f.name}
              className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              style={{
                opacity: i === nextIdx ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: "1400ms, 900ms",
                transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <ImagePlaceholder label={`${f.name} portrait`} aspect="4/5" className="h-full w-full" />
            </div>
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-color"
            style={{ background: "linear-gradient(180deg, rgba(0,156,80,0.18) 0%, rgba(0,72,34,0.5) 100%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(13,20,16,0) 45%, rgba(13,20,16,0.8) 100%)" }}
          />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">{next.tag}</p>
            <p className="font-display text-sm font-bold leading-tight text-smoke-900">{next.name}</p>
            <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-smoke-900/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              View <ArrowUpRight className="size-3" />
            </span>
          </div>
        </button>
        <div className="flex items-baseline gap-2 font-display">
          <span className="text-3xl font-light leading-none text-foreground">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="text-3xl leading-none text-foreground/30">
            /{String(total).padStart(2, "0")}
          </span>
        </div>
      </aside>
    </div>
  );
}





function PgpTbm() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-background via-muted/50 to-background text-[color:var(--ink)] pb-28 md:pb-32"
      style={{
        "--pastel-start": "oklch(0.99 0.014 220 / 0.4)",
        "--pastel-mid": "oklch(0.985 0.020 210 / 0.4)",
      } as React.CSSProperties}
    >
      <SectionNav items={PGP_NAV} applyHref="#apply" />

      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6 sm:pb-24">
          {/* Top eyebrow row */}
          <div className="mb-10 flex flex-col gap-4 border-b border-black/10 pb-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-3 py-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Round 4 admissions open
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white/70 px-3 py-1">
                <Star className="size-3 fill-current" /> Accredited by EFMD & AACSB
              </span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
              PGP · Technology & Business Management
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* Left: headline + copy */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-[68px]">
                  Learn business
                  <br />
                  <span className="text-black/45">by running one.</span>
                </h1>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-black/65">
                  16 months at Masters' Union structured around three engines —
                  <strong className="font-semibold text-black"> InClass</strong> fundamentals,
                  <strong className="font-semibold text-black"> OutClass</strong> live ventures and
                  <strong className="font-semibold text-black"> Immersions</strong> on the ground.
                  Graded on outcomes measured in the open market.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#apply"
                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02]"
                  >
                    Start application <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="#model"
                    className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-black/5"
                  >
                    See the model ↓
                  </a>
                </div>
              </div>

              {/* Inline stat strip — matches the page's card/section aesthetic */}
              <div className="grid grid-cols-2 gap-0 border-t border-black/10 pt-6 sm:grid-cols-4">
                {[
                  { k: "16", v: "Months" },
                  { k: "₹34.6L", v: "Median CTC" },
                  { k: "200+", v: "Startups founded" },
                  { k: "145+", v: "Recruiters" },
                ].map((s) => (
                  <div key={s.v} className="border-l border-black/10 px-4 first:border-l-0 first:pl-0">
                    <div className="font-display text-2xl font-semibold leading-none tracking-tight text-black sm:text-3xl">
                      {s.k}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image card */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-black">
                <ImagePlaceholder label="Hero visual" className="h-full w-full" aspect="4/5" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    The Campus
                  </div>
                  <div className="mt-1 font-display text-sm leading-tight">DLF Cyber Park, Gurugram</div>
                  <div className="mt-1 text-xs text-white/60">85% of Fortune 500 within a 2 km walk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      <AdmissionPathwaysSection />

      <SectionDivider />

      {/* THE MODEL — three engines */}
      <section id="model" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              THE MODEL
            </div>
            <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
              Three engines. In parallel. <em className="italic text-black/60">Every term.</em>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-black/65">
              You don't pick between theory and practice — you get both, every week.
              <strong> InClass</strong> teaches the fundamentals across 7 modules.
              <strong> OutClass</strong> forces you to apply them on two live ventures — a D2C brand and a Creator Challenge — that run across terms.
              <strong> Immersions</strong> take you to the ground, globally and across Bharat.
              The whole 16 months is laid out on one calendar: every row is one engine, every column is one 2-month term. Hover or tap any term to see what you'll be doing then.
            </p>
          </div>

          {/* Unified calendar: 8 terms × 3 engines on one grid */}

          <TermsGantt embedded />






          {/* ENGINE 01 — InClass */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-3xl leading-none text-black/25">01</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-black/55">InClass · The learning core</div>
              <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">Seven modules. Zero rote exams.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Taught by 30% Ivy academics, 30% research faculty and 40% sitting operators. Every course is graded on a real deliverable — a P&amp;L, a shipped feature, a live campaign.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                {IN_CLASS.stats.map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-3xl leading-none tracking-tight">{s.k}</dt>
                    <dd className="mt-1.5 text-xs leading-snug text-black/55">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
              <ImagePlaceholder label="InClass modules" aspect="16/9" className="sm:col-span-2 lg:col-span-3" />
              {IN_CLASS.tracks.map((t, i) => (
                <article key={t.name} className="bg-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center bg-amber-500 text-xs font-semibold text-white">M{i + 1}</span>
                    <h4 className="font-display text-sm leading-tight">{t.name}</h4>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-black/60">{t.eg}</p>
                </article>
              ))}
              <div className="bg-black p-6 text-white sm:col-span-2 lg:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Delivered as</div>
                <div className="mt-2 font-display text-2xl leading-tight">150+ courses · 8 terms · project-graded</div>
              </div>
            </div>
          </div>

          {/* ENGINE 02 — OutClass */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-3xl leading-none text-black/25">02</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">OutClass · Live ventures across terms</div>
              <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">Real customers. Real revenue. Real followers.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Two flagship OutClass tracks run continuously alongside InClass. Both are graded on outcomes measured in the open market — not in decks.
              </p>
            </div>
            <div className="space-y-px bg-black/10">
              <ImagePlaceholder label="OutClass ventures" aspect="16/9" />
              {OUT_CLASS.map((o) => (
                <article key={o.title} className="bg-white/90 p-6 pastel-fill">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{o.tag}</div>
                      <h4 className="mt-2 font-display text-3xl leading-tight tracking-tight">{o.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {o.stats.map((s) => (
                        <div key={s.v}>
                          <div className="font-display text-3xl leading-none tracking-tight">{s.k}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.12em] text-black/55">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/65">{o.body}</p>
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">Term-by-term arc</div>
                    <ol className="mt-3 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                      {o.arc.map((a, i) => (
                        <li key={`${o.title}-${i}`} className="bg-white p-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 items-center justify-center bg-emerald-500 text-xs font-semibold text-white">{a.t}</span>
                            <span className="font-display text-sm leading-tight">{a.h}</span>
                          </div>
                          <div className="mt-2 text-xs leading-snug text-black/60">{a.d}</div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ENGINE 03 — Immersions */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-3xl leading-none text-black/25">03</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Immersions · On the ground</div>
              <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">Global boardrooms. Bharat factory floors.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Optional immersion modules that slot into Terms 4 and 5. Two tracks, one goal: see business where it actually happens — not where slides describe it.
              </p>
            </div>
            <div className="grid gap-px bg-black/10 md:grid-cols-2">
              <ImagePlaceholder label="Immersions" aspect="16/9" className="md:col-span-2" />
              {IMMERSIONS.map((im) => (
                <article key={im.title} className="bg-white/90 p-6 pastel-fill">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">{im.tag}</div>
                  <h4 className="mt-2 font-display text-3xl leading-tight tracking-tight">{im.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-black/65">{im.body}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                    {im.stats.map((s) => (
                      <div key={s.v}>
                        <dt className="font-display text-3xl leading-none tracking-tight">{s.k}</dt>
                        <dd className="mt-1.5 text-xs leading-snug text-black/55">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>




      <SectionDivider />

      {/* OUTCOMES */}
      <section id="outcomes" className="relative overflow-hidden">
        {/* soft ambient glows */}

        <div className="relative mx-auto max-w-[1180px] px-4 py-24 sm:px-6">
          {/* Header */}
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                OUTCOMES
              </div>
              <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl">
                Two paths out.
                <br />
                <span className="bg-gradient-to-r from-teal-500 via-emerald-600 to-sage-500 bg-clip-text text-transparent">Both measured in numbers.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Graded on the open market — salaries, offers, funded ventures. No vanity metrics, no soft claims.
            </p>
          </div>

          {/* Two-panel grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* CAREERS PANEL */}
            <div className="group relative flex flex-col overflow-hidden border border-border bg-card/80 p-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_60px_-30px_rgba(0,0,0,0.15)] transition hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_80px_-30px_rgba(20,184,166,0.25)]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
                  01 · Careers
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">Class of 2025</div>
              </div>

              {/* Hero stat */}
              <div className="mt-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/55">Median CTC</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="bg-gradient-to-br from-teal-500 via-emerald-600 to-sage-600 bg-clip-text font-display text-6xl leading-none tracking-tight text-transparent sm:text-7xl">
                    ₹34.6
                  </span>
                  <span className="font-display text-2xl text-black/70">LPA</span>
                </div>
                <div className="mt-2 h-px w-16 bg-gradient-to-r from-teal-500 to-transparent" />
              </div>

              {/* Secondary stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {OUTCOME_HEADLINE.slice(1).map((s) => (
                  <div key={s.v} className="border border-border bg-muted/50 p-4">
                    <div className="font-display text-2xl leading-none tracking-tight text-black/90">{s.k}</div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/55">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Roles */}
              <div className="mt-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/55">Where alumni land</div>
                <ul className="mt-4 space-y-3.5">
                  {OUTCOME_ROLES.map((r) => (
                    <li key={r.role}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-black/75">{r.role}</span>
                        <span className="font-display text-sm font-semibold tabular-nums text-teal-700">{r.pct}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sage-500"
                          style={{ width: r.pct }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logos */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/55">Where alumni got hired</div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                  {CAREER_LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex h-16 items-center justify-center border border-border bg-white p-2 transition hover:border-teal-200 hover:bg-teal-50/40"
                      title={logo.name}
                    >
                      <img
                        src={logo.url}
                        alt={`${logo.name} logo`}
                        className={cn(
                          "h-8 w-auto max-w-[85%] object-contain opacity-70 transition group-hover:opacity-90 hover:!opacity-100",
                          logo.className
                        )}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right text-xs font-medium italic text-black/50">and many more…</div>
              </div>
            </div>

            {/* STARTUPS PANEL */}
            <div className="group relative flex flex-col overflow-hidden border border-emerald-900/10 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 p-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_60px_-30px_rgba(0,0,0,0.15)] transition hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_80px_-30px_rgba(16,185,129,0.3)]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  02 · Startups
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-900/40">Founded on campus</div>
              </div>

              {/* Hero stat */}
              <div className="mt-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900/60">Startups founded on campus</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text font-display text-6xl leading-none tracking-tight text-transparent sm:text-7xl">
                    200+
                  </span>
                </div>
                <div className="mt-2 h-px w-16 bg-gradient-to-r from-emerald-500 to-transparent" />
              </div>

              {/* Secondary stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {OUTCOME_STARTUP.slice(1).map((s) => (
                  <div key={s.v} className="border border-emerald-900/5 bg-white/70 p-4 backdrop-blur">
                    <div className="font-display text-2xl leading-none tracking-tight text-emerald-950">{s.k}</div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-900/60">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* What ventures produce */}
              <div className="mt-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900/60">What ventures produce</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { label: "D2C brands built in Term 2", value: "Live" },
                    { label: "Creator Challenge ventures", value: "Live" },
                    { label: "Graded on open-market outcomes", value: "Yes" },
                    { label: "Founder / Own venture track", value: "18%" },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between border border-emerald-900/5 bg-white/60 px-4 py-2.5"
                    >
                      <span className="text-black/75">{row.label}</span>
                      <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-0.5 font-display text-xs font-semibold tabular-nums text-white shadow-sm">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Startup logos */}
              <div className="mt-8 border-t border-emerald-900/10 pt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900/60">Ventures built on campus</div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                  {STARTUP_LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex h-16 items-center justify-center border border-emerald-900/5 bg-white/80 p-2 transition hover:border-emerald-300 hover:bg-emerald-50/60"
                      title={logo.name}
                    >
                      <img
                        src={logo.url}
                        alt={`${logo.name} logo`}
                        className="h-8 w-auto max-w-[85%] object-contain opacity-75 transition hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right text-xs font-medium italic text-emerald-900/50">and many more…</div>
              </div>
            </div>
          </div>



          <div className="mt-16">
            <AlumniShowcase />
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* FACULTY */}
      <section id="faculty" className="relative overflow-hidden py-12 md:py-16">
        <div className="relative mx-auto max-w-7xl px-5 md:px-6">
          <Eyebrow num="04" label="Faculty" />
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-4xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground md:text-3xl md:leading-[1.05]">
              30% Ivy academics. 30% research faculty.{" "}
              <span className="font-serif-italic font-normal">40% sitting operators.</span>
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              The 30·30·40 faculty model brings academics, researchers and operators into one teaching bench.
            </p>
          </div>

          <FacultyShowcase />
        </div>
      </section>

      <SectionDivider />

      {/* ADMISSIONS */}
      <section id="admissions" className="relative overflow-hidden">
        {/* soft ambient glows */}

        <div className="relative mx-auto max-w-[1180px] px-4 py-24 sm:px-6">
          <div className="mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ADMISSIONS
            </div>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl">
              Four steps from application to{" "}
              <span className="font-serif-italic">campus.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A holistic evaluation across academics, professional experience, communication and
              business aptitude. No cut-offs — the admissions committee reviews every profile in full.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-2">
            {APPLICATION_STEPS.map((s) => (
              <li
                key={s.step}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/80 p-7 shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_40px_-20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_60px_-20px_rgba(20,184,166,0.18)] backdrop-blur-sm"
              >
                <div className="flex items-baseline gap-4">
                  <div className="font-display text-3xl leading-none text-teal/70 transition-colors group-hover:text-teal">
                    {s.step}
                  </div>
                  <div className="font-display text-sm leading-tight text-foreground">{s.title}</div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <ul className="mt-1 space-y-2 border-t border-border pt-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal/60" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <a
              href="#"
              className="inline-flex items-center justify-between gap-3 bg-foreground px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-background transition-transform hover:scale-[1.01]"
            >
              Start application <ArrowUpRight className="size-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-between gap-3 border border-border bg-card/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-muted/80"
            >
              Talk to admissions <ArrowUpRight className="size-5" />
            </a>
            <a
              href="https://mastersunion.org/pgp-technology-and-business-management"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 border border-border bg-card/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-muted/80"
            >
              Download brochure <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              FAQ
            </div>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] tracking-[-0.02em]">
              Everything you were about to email us.
            </h2>
          </div>
          <div className="border-t border-border bg-card/80 backdrop-blur-sm">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left px-5">
                    <span className="font-display text-sm leading-tight text-foreground">{f.q}</span>
                    <span className="flex size-8 items-center justify-center border border-border text-foreground/70">
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  {open && <p className="pb-6 pr-14 pl-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src={logoWhite.url}
                alt="Masters' Union"
                className="h-10 w-auto brightness-0 invert md:h-12"
              />
              <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center rounded-none border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol title="Programs" links={["PGP in Tech & Business Management", "PGP in Quantitative Finance", "UG in Tech & Business Management", "Executive Programs"]} />
            <FooterCol title="Campus" links={["Faculty", "Mentors", "Outclass", "Food Lab", "MU Ventures"]} />
            <FooterCol title="Connect" links={["Admissions", "Press & Media", "Careers at MU", "Brochure (PDF)"]} />
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-white/40 md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Masters' Union Education Pvt. Ltd.</span>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white/80">Privacy</a>
              <a href="#" className="hover:text-white/80">Terms</a>
              <a href="#" className="hover:text-white/80">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px] text-white/70 transition-colors hover:text-white">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
