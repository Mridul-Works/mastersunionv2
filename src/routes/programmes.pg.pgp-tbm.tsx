import { useEffect, useRef, useState, type SyntheticEvent } from "react";
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
  Globe,
  ChevronRight,

  GraduationCap,
  Store,
  Building2,
  Play,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import SectionDivider from "@/components/SectionDivider";
import { cn } from "@/lib/utils";
import logoWhite from "@/assets/logo-4.png.asset.json";

// Startup logos — sourced from homepage Entrepreneurship venture set
import vJustMyRoots from "@/assets/venture-logos/JustMyRoots.png.asset.json";
import vHiveschool from "@/assets/venture-logos/Hiveschool.png.asset.json";
import vPlaysuper from "@/assets/venture-logos/Playsuper.png.asset.json";
import vSeedsAI from "@/assets/venture-logos/SeedsAI.png.asset.json";
import vStartt from "@/assets/venture-logos/Startt.png.asset.json";
import vPixel from "@/assets/venture-logos/Pixel.png.asset.json";
import vYango from "@/assets/venture-logos/Yango.png.asset.json";
import vEight from "@/assets/venture-logos/EIGHT.png.asset.json";
import vGuardex from "@/assets/venture-logos/Guardex.png.asset.json";
import vTrueBrands from "@/assets/venture-logos/TrueBrandsIndia.png.asset.json";
import vVinyasa from "@/assets/venture-logos/Vinyasa.png.asset.json";
import vShrnm from "@/assets/venture-logos/Shrnm.png.asset.json";

const STARTUP_LOGOS: { name: string; url: string }[] = [
  { name: "JustMyRoots", url: vJustMyRoots.url },
  { name: "Hiveschool", url: vHiveschool.url },
  { name: "Playsuper", url: vPlaysuper.url },
  { name: "SeedsAI", url: vSeedsAI.url },
  { name: "Startt", url: vStartt.url },
  { name: "Pixel", url: vPixel.url },
  { name: "Yango", url: vYango.url },
  { name: "EIGHT", url: vEight.url },
  { name: "Guardex", url: vGuardex.url },
  { name: "TrueBrands India", url: vTrueBrands.url },
  { name: "Vinyasa", url: vVinyasa.url },
  { name: "Shrnm", url: vShrnm.url },
];

// Career/recruiter logos — sourced from homepage Career Outcomes set
import rMckinsey from "@/assets/recruiter-logos/McKinsey.png.asset.json";
import rBain from "@/assets/recruiter-logos/Bain.png.asset.json";
import rBcg from "@/assets/recruiter-logos/BCG.png.asset.json";
import rAccenture from "@/assets/recruiter-logos/Accenture.png.asset.json";
import rGoogle from "@/assets/recruiter-logos/Google.png.asset.json";
import rMeta from "@/assets/recruiter-logos/Meta.png.asset.json";
import rMicrosoft from "@/assets/recruiter-logos/Microsoft.png.asset.json";
import rFlipkart from "@/assets/recruiter-logos/Flipkart.png.asset.json";
import rZomato from "@/assets/recruiter-logos/Zomato.png.asset.json";
import rRazorpay from "@/assets/recruiter-logos/Razorpay.png.asset.json";
import rCred from "@/assets/recruiter-logos/Cred.png.asset.json";
import rIcici from "@/assets/recruiter-logos/ICICI.png.asset.json";

const CAREER_LOGOS: { name: string; url: string; className?: string }[] = [
  { name: "McKinsey", url: rMckinsey.url },
  { name: "Bain", url: rBain.url },
  { name: "BCG", url: rBcg.url },
  { name: "Accenture", url: rAccenture.url },
  { name: "Google", url: rGoogle.url },
  { name: "Meta", url: rMeta.url },
  { name: "Microsoft", url: rMicrosoft.url },
  { name: "Flipkart", url: rFlipkart.url },
  { name: "Zomato", url: rZomato.url },
  { name: "Razorpay", url: rRazorpay.url },
  { name: "Cred", url: rCred.url },
  { name: "ICICI", url: rIcici.url },
];


// Uniform logo — scales each image so visually normalized across a grid.
// Sized slightly smaller than the homepage's NormalizedLogo.
function NormalizedLogo({ src, alt }: { src: string; alt: string }) {
  const boost = /warwick|wbs|singapore management|university of california/i.test(alt)
    ? 1.8
    : /meta|microsoft/i.test(alt)
    ? 1.5
    : /amul|infosys|nse|bse|zepto|youtube|servicenow|flipkart|google|physics.?wallah|mamaearth|antler|stride|inflection|webengage/i.test(alt)
    ? 0.65
    : 1;
  const initial = 26 * boost;
  const [logoH, setLogoH] = useState<number>(initial);
  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / Math.max(1, img.naturalHeight);
    const targetWidth = 78 * boost;
    const raw = targetWidth / Math.max(0.4, ratio);
    const [min, max] = [18 * boost, 42 * boost];
    setLogoH(Math.max(min, Math.min(max, raw)));
  };
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={onLoad}
      style={{ height: `${logoH}px` }}
      className="w-auto max-w-full object-contain opacity-90 transition duration-300 hover:opacity-100"
    />
  );
}




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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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


export const Route = createFileRoute("/programmes/pg/pgp-tbm")({
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

import babsonLogo from "@/assets/immersion-logos/babson.png.asset.json";
import bocconiLogo from "@/assets/immersion-logos/sda-bocconi.png.asset.json";
import escpLogo from "@/assets/immersion-logos/escp.png.asset.json";
import fosterLogo from "@/assets/immersion-logos/foster.png.asset.json";
import griffithLogo from "@/assets/immersion-logos/griffith.png.asset.json";
import illinoisLogo from "@/assets/immersion-logos/illinois-tech.png.asset.json";
import imperialLogo from "@/assets/immersion-logos/imperial-1.png.asset.json";
import iveyLogo from "@/assets/immersion-logos/ivey.png.asset.json";
import nbsLogo from "@/assets/immersion-logos/nbs.png.asset.json";
import smuLogo from "@/assets/immersion-logos/smu.png.asset.json";
import ucLogo from "@/assets/immersion-logos/uc.png.asset.json";
import wbsLogo from "@/assets/immersion-logos/wbs.png.asset.json";
import cuhkLogo from "@/assets/immersion-logos/cuhk.png.asset.json";

const GLOBAL_PARTNER_LOGOS: { name: string; src: string }[] = [
  { name: "SDA Bocconi", src: bocconiLogo.url },
  { name: "ESCP Business School", src: escpLogo.url },
  { name: "Warwick Business School", src: wbsLogo.url },
  { name: "Ivey Business School", src: iveyLogo.url },
  { name: "Nottingham Business School", src: nbsLogo.url },
  { name: "Singapore Management University", src: smuLogo.url },
  { name: "Foster School of Business", src: fosterLogo.url },
  { name: "Babson College", src: babsonLogo.url },
  { name: "University of California", src: ucLogo.url },
  { name: "Illinois Tech", src: illinoisLogo.url },
];


import zeptoLogo from "@/assets/bharat-logos/zepto.png.asset.json";
import zerodhaLogo from "@/assets/bharat-logos/zerodha.png.asset.json";
import credLogo from "@/assets/bharat-logos/cred.png.asset.json";
import lenskartLogo from "@/assets/bharat-logos/lenskart.png.asset.json";
import amulLogo from "@/assets/bharat-logos/amul.png.asset.json";
import infosysLogo from "@/assets/bharat-logos/infosys.png.asset.json";
import itcLogo from "@/assets/bharat-logos/itc.png.asset.json";
import godrejLogo from "@/assets/bharat-logos/godrej.png.asset.json";
import adaniPortsLogo from "@/assets/bharat-logos/adani-ports.png.asset.json";
import adaniWilmarLogo from "@/assets/bharat-logos/adani-wilmar.png.asset.json";
import rbiLogo from "@/assets/bharat-logos/rbi.png.asset.json";
import nseLogo from "@/assets/bharat-logos/nse.png.asset.json";
import bseLogo from "@/assets/bharat-logos/bse.png.asset.json";

const BHARAT_PARTNER_LOGOS: { name: string; src: string }[] = [
  
  { name: "NSE", src: nseLogo.url },
  { name: "BSE", src: bseLogo.url },
  { name: "Infosys", src: infosysLogo.url },
  { name: "ITC", src: itcLogo.url },
  { name: "Godrej Industries", src: godrejLogo.url },
  { name: "Adani Ports", src: adaniPortsLogo.url },
  { name: "Amul", src: amulLogo.url },
  { name: "Zepto", src: zeptoLogo.url },
  { name: "Zerodha", src: zerodhaLogo.url },
  { name: "CRED", src: credLogo.url },
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
  creator: "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-400",
  imm: "bg-teal/10 text-ink border-l-2 border-teal",
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

// -------- Alumni portraits --------
import alumAnurag from "@/assets/alumni/anurag-bansal.png.asset.json";
import alumDaniel from "@/assets/alumni/daniel-nath.png.asset.json";
import alumDeepanker from "@/assets/alumni/deepanker-mathur.png.asset.json";
import alumDharmil from "@/assets/alumni/dharmil-bavishi.png.asset.json";
import alumJeneesha from "@/assets/alumni/jeneesha-singh.png.asset.json";
import alumBadarinadh from "@/assets/alumni/kakaraparthi-badarinadh.png.asset.json";
import alumMehul from "@/assets/alumni/mehul-soni.png.asset.json";
import alumPrabhu from "@/assets/alumni/prabhu-guliani.png.asset.json";
import alumVibhor from "@/assets/alumni/vibhor-agarwal.png.asset.json";

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
  in: "bg-smoke-400",
  d2c: "bg-teal",
  creator: "bg-[#E38330]",
  imm: "bg-teal",
  capstone: "bg-smoke-400",
};

const TONE_INK: Record<string, string> = {
  in: "text-foreground",
  d2c: "text-teal",
  creator: "text-[#E38330]",
  imm: "text-teal",
  capstone: "text-foreground",
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
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/50">The proof · 8 terms in one view</div>
            <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
              The whole 16 months, on one calendar.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/60">
              Rows are engines, columns are terms. Every cell is what you actually do that term.
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-foreground/50">
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-smoke-400" /> InClass</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-teal" /> D2C</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-[#E38330]" /> Creator</span>
          <span className="inline-flex items-center gap-2"><span className="h-[3px] w-5 bg-teal" /> Immersion</span>
        </div>

        {/* Matrix */}
        <div className="overflow-x-auto">
          <div
            className="min-w-[980px] border border-teal/40 divide-y divide-teal/25"
            onMouseLeave={() => setActive(null)}
          >
            {/* Header row: Term columns */}
            <div className="grid grid-cols-[200px_repeat(8,1fr)] divide-x divide-teal/25 bg-white text-foreground">
              <div className="flex flex-col justify-center gap-1 px-4 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal/70">Aug '26 → Nov '27</div>
                <div className="font-display text-sm tracking-tight text-teal">16 months · 8 terms</div>
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
                    className={`group relative flex flex-col items-start gap-1 px-3 py-4 text-left transition-colors ${isActive ? "bg-teal/[0.12] text-foreground" : "text-foreground hover:bg-teal/[0.08]"}`}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-lg leading-none tracking-tight text-teal">{String(t).padStart(2, "0")}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-teal/60">Term</span>
                    </div>
                    <div className="text-[11px] leading-tight text-foreground/70">{m.months}</div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-foreground/45">{m.window}</div>
                  </button>
                );
              })}
            </div>

            {/* Data rows */}
            {ROWS.map((row) => (
              <div key={row.key} className="grid grid-cols-[200px_repeat(8,1fr)] divide-x divide-teal/25">
                {/* Row label */}
                <div className="flex flex-col justify-center gap-1 px-4 py-4">
                  <div className={`flex items-center gap-2 font-display text-sm tracking-tight ${TONE_INK[row.engine]}`}>
                    <span className={`h-3 w-[3px] ${TONE_ACCENT[row.engine]}`} />
                    {row.label}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-foreground/45">{row.sub}</div>
                </div>
                {row.cells.map((cell, i) => {
                  const t = i + 1;
                  const isActive = active === t;
                  if (!cell) {
                    return (
                      <div
                        key={t}
                        onMouseEnter={() => setActive(t)}
                        className={`relative min-h-[76px] transition-colors ${isActive ? "bg-teal/[0.08]" : "bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(0,106,78,0.06)_6px_7px)]"}`}
                      />
                    );
                  }
                  return (
                    <div
                      key={t}
                      onMouseEnter={() => setActive(t)}
                      className={`group relative flex min-h-[76px] flex-col justify-between px-3 py-3 transition-colors ${isActive ? "bg-teal/[0.12] text-foreground" : "bg-white hover:bg-teal/[0.08]"}`}
                    >
                      <div className={`h-[3px] w-6 ${TONE_ACCENT[cell.tone]} opacity-90`} />
                      <div>
                        <div className="font-display text-[13px] leading-tight tracking-tight text-foreground">{cell.text}</div>
                        {cell.note && (
                          <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-foreground/50">{cell.note}</div>
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
        <div className="mt-5 grid gap-0 border border-teal/40 md:grid-cols-[220px_1fr]">
          <div className="border-b border-teal/25 bg-white p-5 text-foreground md:border-b-0 md:border-r">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal/70">{active ? "In this term" : "Preview a term"}</div>
            <div className="mt-2 font-display text-3xl leading-none tracking-tight text-teal">
              {active ? `Term ${active}` : "—"}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-foreground/55">
              {active ? TERM_META[active - 1].window : "Hover a column above"}
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-foreground/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4">
            {ROWS.map((row) => {
              const cell = active ? row.cells[active - 1] : null;
              return (
                <div key={row.key} className="p-4">
                  <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${TONE_INK[row.engine]}`}>
                    <span className={`h-2 w-2 ${TONE_ACCENT[row.engine]}`} />
                    {row.label}
                  </div>
                  <div className="mt-2 font-display text-sm tracking-tight text-foreground">
                    {cell ? cell.text : <span className="text-foreground/25">—</span>}
                  </div>
                  {cell?.note && (
                    <div className="mt-0.5 text-[11px] text-foreground/55">{cell.note}</div>
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
    name: "Daniel Nath",
    batch: "PGP TBM · Cohort '21",
    role: "Strategy Lead",
    company: "Google",
    domain: "Tech",
    quote: "Masters' Union threw us into real problems with real stakes — that's why the leap to Google felt natural.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-emerald-400 to-emerald-500",
    image: alumDaniel.url,
  },
  {
    name: "Jeneesha Singh",
    batch: "PGP TBM · Cohort '21",
    role: "Consultant",
    company: "Bain & Co.",
    domain: "Consulting",
    quote: "The consulting projects, live P&Ls and CXO conversations on campus prepared me for day one at Bain.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-sky-400 to-blue-600",
    image: alumJeneesha.url,
  },
  {
    name: "Dharmil Bavishi",
    batch: "PGP TBM · Cohort '22",
    role: "Co-founder",
    company: "Bullspree",
    domain: "Startup",
    quote: "I started Bullspree while still on campus. The Founders' Fellowship and mentor network made that possible.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-emerald-300 to-emerald-600",
    image: alumDharmil.url,
  },
  {
    name: "Deepankar Mathur",
    batch: "PGP TBM · Cohort '22",
    role: "Founder's Office",
    company: "Zerodha",
    domain: "Finance",
    quote: "The pedagogy trained me to think from first principles — exactly what Founder's Office roles demand.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-slate-500 to-zinc-800",
    image: alumDeepanker.url,
  },
  {
    name: "Vibhor Agarwal",
    batch: "PGP TBM · Cohort '23",
    role: "Founder's Office",
    company: "Hike",
    domain: "Tech",
    quote: "Every term shipped a new venture. That muscle is what got me the Founder's Office seat at Hike.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-fuchsia-400 to-purple-600",
    image: alumVibhor.url,
  },
  {
    name: "Mehul Soni",
    batch: "PGP TBM · Cohort '24",
    role: "Quantitative Trader",
    company: "Avirom Capital",
    domain: "Finance",
    quote: "The quant and finance electives were taught by practitioners — no gap between classroom and trading desk.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-teal to-emerald-400",
    image: alumMehul.url,
  },
  {
    name: "Kakaraparthi Badarinadh",
    batch: "PGP TBM · Cohort '24",
    role: "Senior Specialist",
    company: "Talabat",
    domain: "Product",
    quote: "Global immersions and consulting projects gave me the profile Talabat was hiring for.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-rose-400 to-pink-600",
    image: alumBadarinadh.url,
  },
  {
    name: "Prabhu Dayal Guliani",
    batch: "PGP TBM · Cohort '23",
    role: "Head of Growth",
    company: "AMPM",
    domain: "Growth",
    quote: "Creator Challenge and D2C sprints gave me the growth playbook I now run at AMPM.",
    linkedin: "https://www.linkedin.com/",
    accent: "from-orange-400 to-amber-600",
    image: alumPrabhu.url,
  },
  {
    name: "Anurag Bansal",
    batch: "PGP TBM · Cohort '23",
    role: "Founder's Office",
    company: "Zerodha",
    domain: "Finance",
    quote: "The Creator Challenge and Masters' Union Investment Fund set the foundation for my success.",
    linkedin: "https://www.linkedin.com/",
    calendly: "https://cal.com/",
    accent: "from-emerald-300 to-emerald-500",
    image: alumAnurag.url,
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

  const railRef = useRef<HTMLDivElement | null>(null);
  const scrollTo = (i: number) => {
    if (total === 0) return;
    const target = (i + total) % total;
    const rail = railRef.current;
    const card = rail?.querySelectorAll<HTMLElement>("[data-alum-card]")[target];
    if (rail && card) {
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
    }
    setIdx(target);
  };
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-alum-card]"));
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c: HTMLElement, i: number) => {
      const d = Math.abs(c.offsetLeft - rail.offsetLeft - rail.scrollLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setIdx(best);
  };



  const secondary = filtered[nextIdx];
  const tertiaryIdx = total > 0 ? (safeIdx + 2) % total : 0;
  const tertiary = filtered[tertiaryIdx];

  const CARD_COLORS = [
    { bg: "#5C2E1F", fg: "#FFFFFF", swatch: "#F2C9D1" },
    { bg: "#C8397A", fg: "#FFFFFF", swatch: "#F4D8A8" },
    { bg: "#4A2A8A", fg: "#FFFFFF", swatch: "#E9C4A8" },
    { bg: "#D9612C", fg: "#FFFFFF", swatch: "#F3E3C7" },
    { bg: "#0F5559", fg: "#FFFFFF", swatch: "#E7C7A2" },
    { bg: "#1B2A6B", fg: "#FFFFFF", swatch: "#F0C9D7" },
    { bg: "#7A1F3D", fg: "#FFFFFF", swatch: "#EED3B6" },
    { bg: "#3A2E7D", fg: "#FFFFFF", swatch: "#F1CFC4" },
  ];

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ALUMNI NETWORK
          </div>
          <h3 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[1.03] tracking-tight text-foreground">
            Success <span className="font-serif-italic font-normal">stories.</span>
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-black/60">
          Our work speaks for itself, but our 1,400+ alumni say it even better. Meet a few — and reach out.
        </p>
      </div>

      {/* Industry filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-black/10 pt-5">
        <span className="mr-2 font-mono text-xs uppercase tracking-[0.28em] text-black/45">Filter · Industry</span>
        {industries.map((ind) => {
          const isActive = ind === industry;
          const count = ind === "All" ? ALUMNI.length : ALUMNI.filter((a) => a.domain === ind).length;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => handleIndustry(ind)}
              className={`inline-flex items-center gap-2 rounded-none border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
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
          {/* Editorial filmstrip rail */}
          <div className="relative mt-10 -mx-5 md:-mx-10">
            <div
              ref={railRef}
              onScroll={onRailScroll}
              className="flex snap-x snap-mandatory gap-px overflow-x-auto border-y border-black/10 bg-black/10 px-5 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filtered.map((a, i) => (
                <article
                  key={a.name}
                  data-alum-card
                  onMouseEnter={() => setIdx(i)}
                  className="group relative flex shrink-0 snap-start flex-col bg-[#F7F5F0] transition-colors duration-500 hover:bg-white"
                  style={{ width: "min(82vw, 320px)" }}
                >
                  {/* Portrait */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEAE4]">
                    <img
                      src={a.image}
                      alt={a.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />


                    <span className="absolute left-0 top-0 bg-black px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-0 right-0 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-black/70">
                      {a.domain}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-display text-[21px] font-semibold leading-[1.1] tracking-tight text-black">
                      {a.name}
                    </h4>
                    <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-black/50">
                      {a.role} · {a.company}
                    </p>
                    <div className="my-4 h-px w-full bg-black/10" />
                    <p className="text-[13px] leading-[1.6] text-black/70">
                      &ldquo;{a.quote}&rdquo;
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border-b border-black/25 pb-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:border-black"
                      >
                        LinkedIn
                      </a>
                      {a.calendly && (
                        <a
                          href={a.calendly}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Book a chat with ${a.name}`}
                          className="flex size-8 items-center justify-center rounded-none border border-black/15 text-black/70 transition-colors hover:border-black hover:bg-black hover:text-white"
                        >
                          <Calendar className="size-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                      {a.batch}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-5">
            <div className="flex items-baseline gap-2 font-display">
              <span className="text-xl font-semibold leading-none text-black">
                {String(safeIdx + 1).padStart(2, "0")}
              </span>
              <span className="text-xl leading-none text-black/30">
                /{String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
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
                onClick={() => scrollTo(safeIdx - 1)}
                aria-label="Previous alumni"
                className="flex h-10 w-10 items-center justify-center rounded-none border border-black/15 text-black transition hover:bg-black hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollTo(safeIdx + 1)}
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
          <div className="mb-10 flex flex-col gap-4 border-b border-foreground/10 pb-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/80 px-3 py-1">
                <span className="size-1.5 rounded-full bg-smoke-400 animate-pulse" />
                Round 4 admissions open
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-card/80 px-3 py-1">
                <Star className="size-3 fill-current" /> Accredited by EFMD & AACSB
              </span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
              PGP · Technology & Business Management
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* Left: headline + copy */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <h1 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Learn business
                  <br />
                  <span className="font-normal text-foreground/40">by running one.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65">
                  16 months at Masters' Union structured around three engines —
                  <strong className="font-semibold text-foreground"> InClass</strong> fundamentals,
                  <strong className="font-semibold text-foreground"> OutClass</strong> live ventures and
                  <strong className="font-semibold text-foreground"> Immersions</strong> on the ground.
                  Graded on outcomes measured in the open market.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#apply"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    Start application <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="#model"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:bg-foreground/5"
                  >
                    See the model ↓
                  </a>
                </div>
              </div>

              {/* Inline stat strip — matches the page's card/section aesthetic */}
              <div className="grid grid-cols-2 gap-0 border-t border-foreground/10 pt-6 sm:grid-cols-4">
                {[
                  { k: "16", v: "Months" },
                  { k: "₹34.6L", v: "Median CTC" },
                  { k: "200+", v: "Startups founded" },
                  { k: "145+", v: "Recruiters" },
                ].map((s) => (
                  <div key={s.v} className="border-l border-foreground/10 px-4 first:border-l-0 first:pl-0">
                    <div className="font-display text-2xl font-semibold leading-none tracking-tight text-foreground sm:text-3xl">
                      {s.k}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image card */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-primary">
                <ImagePlaceholder label="Hero visual" className="h-full w-full" aspect="4/5" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent p-5 text-primary-foreground">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                    The Campus
                  </div>
                  <div className="mt-1 font-display text-sm leading-tight">DLF Cyber Park, Gurugram</div>
                  <div className="mt-1 text-xs text-primary-foreground/60">85% of Fortune 500 within a 2 km walk</div>
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
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
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
            <div className="space-y-4">


              <div className="grid gap-3 sm:grid-cols-2">
                {IN_CLASS.tracks.map((t, i) => (
                  <article
                    key={t.name}
                    className="group relative flex gap-4 border border-black/10 bg-white p-5 transition-colors hover:border-black/30"
                  >
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-smoke-300 transition-colors group-hover:bg-black" />
                    <div className="flex flex-col items-start">
                      <span className="font-display text-2xl leading-none tracking-tight text-black/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                        Module
                      </span>
                    </div>
                    <div className="flex-1 border-l border-black/10 pl-4">
                      <h4 className="font-display text-base leading-tight tracking-tight">{t.name}</h4>
                      <p className="mt-1.5 text-xs leading-snug text-black/60">{t.eg}</p>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </div>

          {/* ENGINE 02 — OutClass */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-3xl leading-none text-black/25">02</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-smoke-400">OutClass · Live ventures across terms</div>
              <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">Real customers. Real revenue. Real followers.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Two flagship OutClass tracks run continuously alongside InClass. Both are graded on outcomes measured in the open market — not in decks.
              </p>
            </div>
            <div className="space-y-px bg-black/10">
              <ImagePlaceholder label="OutClass ventures" aspect="16/9" />
              {OUT_CLASS.map((o, idx) => {
                const isD2C = idx === 0;
                const accent = isD2C ? "emerald" : "teal";
                const Icon = isD2C ? Store : Play;
                return (
                  <article key={o.title} className="bg-white/90 p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke-400">{o.tag}</div>
                        <h4 className="mt-2 font-display text-3xl leading-tight tracking-tight">{o.title}</h4>
                      </div>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65">{o.body}</p>

                    {/* Outcome metrics */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {o.stats.map((s, i) => (
                        <div
                          key={s.v}
                          className={cn(
                            "relative overflow-hidden border p-5",
                            isD2C
                              ? "border-emerald-900/15 bg-gradient-to-br from-emerald-50/90 to-white"
                              : "border-emerald-800/15 bg-gradient-to-br from-emerald-50/90 to-white"
                          )}
                        >
                          <div className={cn(
                            "absolute left-0 top-0 h-1.5 w-full",
                            isD2C ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gradient-to-r from-emerald-400 to-emerald-400"
                          )} />
                          <div className="flex items-start justify-between">
                            <div className={cn(
                              "inline-flex size-8 items-center justify-center",
                              isD2C ? "bg-emerald-400/10 text-emerald-700" : "bg-emerald-400/10 text-emerald-600"
                            )}>
                              {i === 0 ? <Icon className="size-4" /> : i === 1 ? <TrendingUp className="size-4" /> : <Users className="size-4" />}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className={cn(
                              "font-display text-4xl leading-none tracking-tight",
                              isD2C ? "text-emerald-900" : "text-emerald-800"
                            )}>
                              {s.k}
                            </div>
                            <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-black/60">
                              {s.v}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">Term-by-term arc</div>
                      <ol className="mt-3 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                        {o.arc.map((a, i) => (
                          <li key={`${o.title}-${i}`} className="bg-white p-4">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex size-6 items-center justify-center bg-smoke-400 text-xs font-semibold text-white">{a.t}</span>
                              <span className="font-display text-sm leading-tight">{a.h}</span>
                            </div>
                            <div className="mt-2 text-xs leading-snug text-black/60">{a.d}</div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ENGINE 03 — Immersions */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-3xl leading-none text-black/25">03</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">Immersions · On the ground</div>
              <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">Global boardrooms. Bharat factory floors.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Optional immersion modules that slot into Terms 4 and 5. Two tracks, one goal: see business where it actually happens — not where slides describe it.
              </p>
            </div>
            <div className="space-y-px bg-black/10">
              {IMMERSIONS.map((im, idx) => {
                const isGlobal = im.title.includes("Global");
                const logos = isGlobal ? GLOBAL_PARTNER_LOGOS : BHARAT_PARTNER_LOGOS;
                const logosLabel = isGlobal ? "Partner B-schools" : "On-ground partners";
                const tag = isGlobal ? "Global · Terms 4–5" : "Bharat · Terms 4–5";
                return (
                  <article key={im.title} className="bg-white/90 p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke-400">{tag}</div>
                        <h4 className="mt-2 font-display text-3xl leading-tight tracking-tight">{im.title}</h4>
                      </div>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65">{im.body}</p>

                    {/* Outcome metrics — matches OutClass style */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {im.stats.map((s, i) => (
                        <div
                          key={s.v}
                          className="relative overflow-hidden border border-emerald-900/15 bg-gradient-to-br from-emerald-50/90 to-white p-5"
                        >
                          <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                          <div className="flex items-start justify-between">
                            <div className="inline-flex size-8 items-center justify-center bg-emerald-400/10 text-emerald-700">
                              {i === 0 ? <Globe className="size-4" /> : i === 1 ? <Building2 className="size-4" /> : <Users className="size-4" />}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="font-display text-4xl leading-none tracking-tight text-emerald-900">
                              {s.k}
                            </div>
                            <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-black/60">
                              {s.v}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Partner logos — matches OutClass term-by-term arc grid */}
                    <div className="mt-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">{logosLabel}</div>
                      <div className="mt-3 grid grid-cols-5 gap-x-4 gap-y-5">
                        {logos.map((l) => (
                          <div
                            key={l.name}
                            title={l.name}
                            className="flex h-14 items-center justify-center opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                          >
                            <NormalizedLogo src={l.src} alt={l.name} />
                          </div>
                        ))}
                      </div>

                    </div>
                  </article>
                );
              })}
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
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                OUTCOMES
              </div>
              <h2 className="mt-4 font-display text-3xl leading-[1.03] tracking-[-0.02em] text-foreground">
                Two paths out.
                <br />
                <span className="text-foreground">Both measured in numbers.</span>
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
                <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  01 · Careers
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-black/40">Class of 2025</div>
              </div>

              {/* Hero stat */}
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55">Median CTC</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
                    ₹34.6
                  </span>
                  <span className="font-display text-xl text-black/70">LPA</span>
                </div>
                <div className="mt-2 h-px w-16 bg-gradient-to-r from-emerald-400 to-transparent" />
              </div>

              {/* Secondary stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {OUTCOME_HEADLINE.slice(1).map((s) => (
                  <div key={s.v} className="border border-border bg-muted/50 p-4">
                    <div className="font-display text-3xl leading-none tracking-tight text-black/90">{s.k}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/55">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Roles */}
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55">Where alumni land</div>
                <ul className="mt-4 space-y-3.5">
                  {OUTCOME_ROLES.map((r) => (
                    <li key={r.role}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-black/75">{r.role}</span>
                        <span className="font-display text-sm font-semibold tabular-nums text-emerald-600">{r.pct}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
                          style={{ width: r.pct }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logos */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55">Where alumni got hired</div>
                <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                  {CAREER_LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex h-14 items-center justify-center"
                      title={logo.name}
                    >
                      <NormalizedLogo src={logo.url} alt={logo.name} />
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-right text-xs font-medium italic text-black/50">and many more…</div>
              </div>
            </div>

            {/* STARTUPS PANEL */}
            <div className="group relative flex flex-col overflow-hidden border border-emerald-900/10 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/40 p-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_60px_-30px_rgba(0,0,0,0.15)] transition hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_80px_-30px_rgba(16,185,129,0.3)]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  02 · Startups
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-emerald-900/40">Founded on campus</div>
              </div>

              {/* Hero stat */}
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900/60">Startups founded on campus</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
                    200+
                  </span>
                </div>
                <div className="mt-2 h-px w-16 bg-gradient-to-r from-emerald-500 to-transparent" />
              </div>

              {/* Secondary stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {OUTCOME_STARTUP.slice(1).map((s) => (
                  <div key={s.v} className="border border-emerald-900/5 bg-white/70 p-4 backdrop-blur">
                    <div className="font-display text-3xl leading-none tracking-tight text-emerald-950">{s.k}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/60">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* What ventures produce */}
              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900/60">What ventures produce</div>
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
                      <span className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-2.5 py-0.5 font-display text-xs font-semibold tabular-nums text-white shadow-sm">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Startup logos */}
              <div className="mt-8 border-t border-emerald-900/10 pt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900/60">Ventures built on campus</div>
                <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                  {STARTUP_LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex h-14 items-center justify-center"
                      title={logo.name}
                    >
                      <NormalizedLogo src={logo.url} alt={logo.name} />
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
