import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  Star,
  Linkedin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";


const PGP_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "model", label: "The Model" },
  { id: "terms", label: "8 Terms" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faculty", label: "Faculty" },
  { id: "faq", label: "FAQ" },
];

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

// -------- Hero fact sheet --------
const FACTS = [
  { k: "Duration", v: "16 Months", note: "Incl. 3-month internship" },
  { k: "Format", v: "On Campus", note: "DLF Cyber Park · Gurugram" },
  { k: "Eligibility", v: "2–5 yrs", note: "No CAT / GMAT" },
  { k: "Cohort", v: "2026", note: "Rolling admissions · Round 4" },
];

// -------- The Model : three engines --------
const MODEL_STATS = [
  { k: "8", v: "Terms across 16 months" },
  { k: "150+", v: "InClass courses" },
  { k: "2", v: "OutClass ventures that run across terms" },
  { k: "2", v: "Immersion tracks · Global + Bharat" },
];

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
    { k: "150+", v: "Courses across 7 tracks" },
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
  { k: "97%", v: "Placement rate" },
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
const FACULTY = [
  { name: "Kunal Shah", role: "Founder, CRED", tag: "Consumer Behaviour" },
  { name: "Deepinder Goyal", role: "Founder, Zomato", tag: "Building at Scale" },
  { name: "Nithin Kamath", role: "Founder, Zerodha", tag: "Capital Markets" },
  { name: "Ronnie Screwvala", role: "Founder, upGrad · UTV", tag: "Media & Ventures" },
  { name: "Radhika Gupta", role: "CEO, Edelweiss AMC", tag: "Asset Management" },
  { name: "Anand Chandrasekaran", role: "GM, Meta", tag: "Product Leadership" },
];

// -------- Admissions & FAQ --------
const TIMELINE = [
  { d: "Step 1", t: "Submit application (15 min)" },
  { d: "Step 2", t: "Aptitude assessment" },
  { d: "Step 3", t: "Operator interview" },
  { d: "Step 4", t: "Admit + scholarship review" },
  { d: "Start", t: "Cohort 2026 begins on campus" },
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

// -------- Countdown --------
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return { d, h };
}

// -------- 8-term Gantt calendar --------
const TERM_MONTHS = ["Aug '26", "Oct '26", "Dec '26", "Feb '27", "Apr '27", "Jun '27", "Aug '27", "Oct '27"];

type Lane = {
  key: string;
  engine: "in" | "d2c" | "creator" | "capstone" | "imm";
  label: string;
  bars: { start: number; end: number; text: string; tone: "d2c" | "creator" | "imm" | "capstone" }[];
};

const IN_CLASS_TRACKS = [
  "Fundamentals · Finance · Sales",
  "GTM · Product mindset · LLMs",
  "Storytelling · Banking · No-code",
  "Valuation · UI/UX · Crisis mgmt",
  "Models · Analytics · B2B",
  "Pricing · PE/VC · Copy",
  "IPOs · IP law · ML",
  "DeFi · Risk · Compliance",
];

const OUT_LANES: Lane[] = [
  {
    key: "d2c",
    engine: "d2c",
    label: "D2C Brand",
    bars: [{ start: 1, end: 6, text: "Dropship → Hackathon → Consulting → MVP → GTM → PMF", tone: "d2c" }],
  },
  {
    key: "creator",
    engine: "creator",
    label: "Creator Challenge",
    bars: [{ start: 2, end: 6, text: "Kickoff → Brand → Community → Distribution → Monetise", tone: "creator" }],
  },
  {
    key: "imm",
    engine: "imm",
    label: "Immersions",
    bars: [
      { start: 4, end: 4, text: "Global Immersion", tone: "imm" },
      { start: 5, end: 5, text: "Bharat Immersion", tone: "imm" },
    ],
  },
  {
    key: "capstone",
    engine: "capstone",
    label: "Capstones",
    bars: [
      { start: 7, end: 7, text: "Raise a Seed Fund", tone: "capstone" },
      { start: 8, end: 8, text: "One-Day Profit", tone: "capstone" },
    ],
  },
];

const TONE_STYLES: Record<"d2c" | "creator" | "imm" | "capstone", string> = {
  d2c: "bg-emerald-500 text-white",
  creator: "bg-amber-500 text-black",
  imm: "bg-indigo-500 text-white",
  capstone: "bg-black text-white",
};

const TONE_DOTS: Record<string, string> = {
  d2c: "bg-emerald-500",
  creator: "bg-amber-500",
  imm: "bg-indigo-500",
  capstone: "bg-black",
};

function TermsGantt() {
  const [active, setActive] = useState<number | null>(null);
  const activeTerm = active ?? 1;

  const activityForTerm = (t: number) => {
    const items: { label: string; tone: string }[] = [];
    items.push({ label: `InClass: ${IN_CLASS_TRACKS[t - 1]}`, tone: "in" });
    for (const lane of OUT_LANES) {
      for (const b of lane.bars) {
        if (t >= b.start && t <= b.end) {
          items.push({ label: `${lane.label}${b.start !== b.end ? " (continuing)" : ""}`, tone: b.tone });
        }
      }
    }
    return items;
  };

  return (
    <section id="terms" className="border-b border-black/10 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.06),transparent_40%),radial-gradient(circle_at_90%_100%,rgba(245,158,11,0.06),transparent_40%)]">
      <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">The proof · 8 terms in one view</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em]">
              The whole 16 months, on one calendar.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-black/60">
              Every row is an engine. Every column is a term. Hover — or tap — a term to see what's live that fortnight.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-black/60">
            <span className="inline-flex items-center gap-2"><span className={`size-2.5 ${TONE_DOTS.d2c}`} /> D2C Brand</span>
            <span className="inline-flex items-center gap-2"><span className={`size-2.5 ${TONE_DOTS.creator}`} /> Creator Challenge</span>
            <span className="inline-flex items-center gap-2"><span className={`size-2.5 ${TONE_DOTS.imm}`} /> Immersion</span>
            <span className="inline-flex items-center gap-2"><span className={`size-2.5 ${TONE_DOTS.capstone}`} /> Capstone</span>
          </div>
        </div>

        {/* Gantt */}
        <div className="overflow-x-auto">
          <div className="min-w-[820px] rounded-sm border border-black/10 bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.03),0_20px_40px_-30px_rgba(0,0,0,0.25)]">
            {/* Column header */}
            <div className="grid grid-cols-[140px_repeat(8,1fr)] border-b border-black/10">
              <div className="p-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Aug '26 → Oct '27</div>
              {TERM_MONTHS.map((m, i) => {
                const t = i + 1;
                const isActive = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onMouseEnter={() => setActive(t)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(t)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(t)}
                    className={`group relative border-l border-black/10 p-3 text-left transition-colors ${isActive ? "bg-black text-white" : "bg-white/80 hover:bg-black/[0.03]"}`}
                  >
                    <div className={`font-display text-[18px] leading-none tracking-tight ${isActive ? "text-white" : "text-black"}`}>T{t}</div>
                    <div className={`mt-1 text-[10px] uppercase tracking-[0.14em] ${isActive ? "text-white/70" : "text-black/45"}`}>{m}</div>
                  </button>
                );
              })}
            </div>

            {/* InClass lane */}
            <div className="grid grid-cols-[140px_repeat(8,1fr)] border-b border-black/10">
              <div className="flex items-center gap-2 p-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60">
                <span className="size-1.5 rounded-full bg-black/70" /> InClass
              </div>
              {IN_CLASS_TRACKS.map((track, i) => {
                const t = i + 1;
                const isActive = active === t;
                return (
                  <div
                    key={t}
                    className={`border-l border-black/10 p-3 text-[11.5px] leading-snug transition-colors ${isActive ? "bg-black/[0.04] text-black" : "text-black/70"}`}
                  >
                    {track}
                  </div>
                );
              })}
            </div>

            {/* OutClass lanes with spanning bars */}
            {OUT_LANES.map((lane) => (
              <div key={lane.key} className="grid grid-cols-[140px_repeat(8,1fr)] border-b border-black/10 last:border-b-0">
                <div className="flex items-center gap-2 p-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/60">
                  <span className={`size-1.5 rounded-full ${TONE_DOTS[lane.engine === "capstone" ? "capstone" : lane.engine === "imm" ? "imm" : lane.engine]}`} />
                  {lane.label}
                </div>
                {/* Track row with absolutely placed bars */}
                <div className="relative col-span-8 h-16">
                  {/* Column dividers + hover highlight */}
                  <div className="absolute inset-0 grid grid-cols-8">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const t = i + 1;
                      const isActive = active === t;
                      return <div key={t} className={`border-l border-black/10 transition-colors ${isActive ? "bg-black/[0.04]" : ""}`} />;
                    })}
                  </div>
                  {/* Bars */}
                  {lane.bars.map((b, bi) => {
                    const leftPct = ((b.start - 1) / 8) * 100;
                    const widthPct = ((b.end - b.start + 1) / 8) * 100;
                    const spans = b.end - b.start + 1;
                    return (
                      <div
                        key={bi}
                        className={`absolute top-1/2 -translate-y-1/2 rounded-[3px] px-3 py-2 text-[11.5px] font-medium tracking-tight shadow-sm transition-transform hover:-translate-y-[calc(50%+2px)] ${TONE_STYLES[b.tone]}`}
                        style={{ left: `calc(${leftPct}% + 6px)`, width: `calc(${widthPct}% - 12px)` }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate">{b.text}</span>
                          {spans > 1 && <span className="shrink-0 text-[10px] opacity-70">{spans} terms</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="mt-6 grid gap-4 md:grid-cols-[140px_1fr] md:items-start">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/50">
            {active ? `Live in T${activeTerm}` : `Hover a term ↑`}
          </div>
          <div className="flex flex-wrap gap-2">
            {activityForTerm(activeTerm).map((item, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-opacity ${active ? "opacity-100" : "opacity-60"} ${
                  item.tone === "in"
                    ? "border-black/15 bg-white text-black/75"
                    : item.tone === "d2c"
                    ? "border-emerald-500/30 bg-emerald-50 text-emerald-800"
                    : item.tone === "creator"
                    ? "border-amber-500/30 bg-amber-50 text-amber-800"
                    : item.tone === "imm"
                    ? "border-indigo-500/30 bg-indigo-50 text-indigo-800"
                    : "border-black/70 bg-black text-white"
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-[12px] text-black/55">
          Full curriculum at{" "}
          <a href="https://mastersunion.org/pgp-tbm-curriculum" target="_blank" rel="noreferrer" className="underline underline-offset-2">mastersunion.org/pgp-tbm-curriculum</a>. Non-mandatory 3-month internship follows the on-campus terms.
        </div>
      </div>
    </section>
  );
}


function PgpTbm() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const deadline = new Date("2026-08-15T23:59:59+05:30");
  const { d, h } = useCountdown(deadline);

  return (
    <main
      className="min-h-screen pastel-gradient text-[color:var(--ink)] pb-28 md:pb-32"
      style={{
        "--pastel-start": "oklch(0.99 0.014 220 / 0.4)",
        "--pastel-mid": "oklch(0.985 0.020 210 / 0.4)",
      } as React.CSSProperties}
    >
      <SectionNav items={PGP_NAV} applyHref="#apply" />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pb-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60">
              <span className="inline-flex items-center gap-2 border border-black/15 bg-white/70 px-3 py-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cohort 2026 · Round 4 open
              </span>
              <span className="inline-flex items-center gap-1 border border-black/15 bg-white/70 px-3 py-1">
                <Star className="size-3 fill-current" /> Accredited by EFMD & AACSB
              </span>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">
                PGP in Technology & Business Management
              </div>
              <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.98] tracking-[-0.03em]">
                Learn business
                <br />
                <span className="text-black/50">by running one.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-black/70">
                16 months at Masters' Union structured around three engines — <strong>InClass</strong> fundamentals,
                <strong> OutClass</strong> live ventures and <strong>Immersions</strong> on the ground.
                Graded on outcomes measured in the open market.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#apply" className="inline-flex items-center gap-2 bg-black px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02] pastel-fill">
                Start application <ArrowUpRight className="size-4" />
              </a>
              <a href="#model" className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-black hover:bg-black/5">
                See the model ↓
              </a>
              <div className="flex items-center gap-2 text-[11px] text-black/55">
                <Check className="size-3.5" /> No CAT / GMAT · 15 min to apply
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px border-t border-black/10 bg-black/10 sm:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-white p-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">{f.k}</dt>
                  <dd className="mt-1.5 font-display text-[22px] leading-none tracking-tight">{f.v}</dd>
                  <div className="mt-1.5 text-[11px] leading-snug text-black/55">{f.note}</div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-black">
              <ImagePlaceholder label="Hero visual" className="h-full w-full" aspect="4/5" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">The Campus</div>
                <div className="mt-1 font-display text-[20px] leading-tight">DLF Cyber Park, Gurugram</div>
                <div className="mt-1 text-[11px] text-white/60">85% of Fortune 500 within a 2 km walk</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-black/10 bg-white px-4 py-3 shadow-lg lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">Round 1 closes</div>
              <div className="font-display text-[22px] leading-none tabular-nums">
                {String(d).padStart(2, "0")}d · {String(h).padStart(2, "0")}h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE MODEL — three engines */}
      <section id="model" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">How 16 months are structured</div>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.03] tracking-[-0.02em]">
              Three engines. In parallel. <em className="italic text-black/60">Every term.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-black/65">
              You don't pick between theory and practice — you get both, every week.
              <strong> InClass</strong> teaches the fundamentals across 7 tracks.
              <strong> OutClass</strong> forces you to apply them on two live ventures — a D2C brand and a Creator Challenge — that run across terms.
              <strong> Immersions</strong> take you to the ground, globally and across Bharat.
            </p>
          </div>

          <ImagePlaceholder label="The three engines" className="mb-10" aspect="21/9" />

          <div className="mb-16 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {MODEL_STATS.map((s) => (
              <div key={s.v} className="bg-white/90 p-6 backdrop-blur-sm">
                <div className="font-display text-[38px] leading-none tracking-tight">{s.k}</div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60">{s.v}</div>
              </div>
            ))}
          </div>

          {/* ENGINE 01 — InClass */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-[46px] leading-none text-black/25">01</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">InClass · The learning core</div>
              <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tight">Seven tracks. Zero rote exams.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Taught by 30% Ivy academics, 30% research faculty and 40% sitting operators. Every course is graded on a real deliverable — a P&amp;L, a shipped feature, a live campaign.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                {IN_CLASS.stats.map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-[24px] leading-none tracking-tight">{s.k}</dt>
                    <dd className="mt-1.5 text-[10.5px] leading-snug text-black/55">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid gap-px bg-black/10 sm:grid-cols-2">
              <ImagePlaceholder label="InClass tracks" aspect="16/9" className="sm:col-span-2" />
              {IN_CLASS.tracks.map((t) => (
                <div key={t.name} className="bg-white/90 p-5 pastel-fill">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">Track</div>
                  <div className="mt-2 font-display text-[17px] leading-tight tracking-tight">{t.name}</div>
                  <div className="mt-2 text-[12px] leading-snug text-black/60">{t.eg}</div>
                </div>
              ))}
              <div className="bg-black p-5 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Delivered as</div>
                <div className="mt-2 font-display text-[17px] leading-tight">150+ courses · 8 terms · project-graded</div>
              </div>
            </div>
          </div>

          {/* ENGINE 02 — OutClass */}
          <div className="grid gap-8 border-t border-black/10 py-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div>
              <div className="font-display text-[46px] leading-none text-black/25">02</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">OutClass · Live ventures across terms</div>
              <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tight">Real customers. Real revenue. Real followers.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Two flagship OutClass tracks run continuously alongside InClass. Both are graded on outcomes measured in the open market — not in decks.
              </p>
            </div>
            <div className="space-y-px bg-black/10">
              <ImagePlaceholder label="OutClass ventures" aspect="16/9" />
              {OUT_CLASS.map((o) => (
                <article key={o.title} className="bg-white/90 p-6 pastel-fill">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">{o.tag}</div>
                      <h4 className="mt-2 font-display text-[24px] leading-tight tracking-tight">{o.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {o.stats.map((s) => (
                        <div key={s.v}>
                          <div className="font-display text-[22px] leading-none tracking-tight">{s.k}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-black/55">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-black/65">{o.body}</p>
                  <div className="mt-6">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">Term-by-term arc</div>
                    <ol className="mt-3 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                      {o.arc.map((a, i) => (
                        <li key={`${o.title}-${i}`} className="bg-white p-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 items-center justify-center bg-emerald-500 text-[10px] font-semibold text-white">{a.t}</span>
                            <span className="font-display text-[14px] leading-tight">{a.h}</span>
                          </div>
                          <div className="mt-2 text-[11.5px] leading-snug text-black/60">{a.d}</div>
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
              <div className="font-display text-[46px] leading-none text-black/25">03</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">Immersions · On the ground</div>
              <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tight">Global boardrooms. Bharat factory floors.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Optional immersion modules that slot into Terms 4 and 5. Two tracks, one goal: see business where it actually happens — not where slides describe it.
              </p>
            </div>
            <div className="grid gap-px bg-black/10 md:grid-cols-2">
              <ImagePlaceholder label="Immersions" aspect="16/9" className="md:col-span-2" />
              {IMMERSIONS.map((im) => (
                <article key={im.title} className="bg-white/90 p-6 pastel-fill">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">{im.tag}</div>
                  <h4 className="mt-2 font-display text-[22px] leading-tight tracking-tight">{im.title}</h4>
                  <p className="mt-3 text-[13px] leading-relaxed text-black/65">{im.body}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                    {im.stats.map((s) => (
                      <div key={s.v}>
                        <dt className="font-display text-[24px] leading-none tracking-tight">{s.k}</dt>
                        <dd className="mt-1.5 text-[10.5px] leading-snug text-black/55">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 TERMS · Gantt calendar of the three engines */}
      <TermsGantt />

      {/* OUTCOMES */}
      <section id="outcomes" className="border-b border-black/10 bg-white/40">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Outcomes · What the three engines produce</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em]">
              We publish numbers, not narrative.
            </h2>
            <ImagePlaceholder label="Outcomes" className="mt-5" aspect="16/9" />
          </div>

          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOME_HEADLINE.map((s) => (
              <div key={s.v} className="bg-white p-6">
                <div className="font-display text-[40px] leading-none tracking-tight">{s.k}</div>
                <div className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-black/60">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
            <div className="border border-black/10 bg-white/90 p-6 pastel-fill">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Startup outcomes</div>
              <div className="mt-2 font-display text-[22px] leading-tight tracking-tight">Ventures born inside the programme</div>
              <dl className="mt-5 space-y-4 border-t border-black/10 pt-4">
                {OUTCOME_STARTUP.map((s) => (
                  <div key={s.v} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[13px] text-black/70">{s.v}</dt>
                    <dd className="font-display text-[26px] leading-none tracking-tight">{s.k}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-black/10 bg-white/90 p-6 pastel-fill">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">Where alumni land</div>
              <div className="mt-2 font-display text-[22px] leading-tight tracking-tight">Role distribution · Class of 2025</div>
              <ul className="mt-5 space-y-3 border-t border-black/10 pt-4">
                {OUTCOME_ROLES.map((r) => (
                  <li key={r.role}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="text-black/75">{r.role}</span>
                      <span className="font-display text-[16px] tabular-nums">{r.pct}</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full bg-black/5">
                      <div className="h-full bg-black/70" style={{ width: r.pct }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">The 30·30·40 faculty model</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              30% Ivy academics. 30% research faculty. 40% sitting operators.
            </h2>
            <ImagePlaceholder label="Faculty" className="mt-5 max-w-3xl" aspect="16/9" />
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {FACULTY.map((f) => (
              <div key={f.name} className="bg-white/90 p-6 backdrop-blur-sm pastel-fill">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{f.tag}</div>
                <div className="mt-4 font-display text-[22px] leading-tight">{f.name}</div>
                <div className="mt-1 text-[13px] text-black/60">{f.role}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[12px] uppercase tracking-[0.14em] text-black/50">
            + 200 practitioners across strategy, product, capital and design.
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section id="admissions" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Admissions · Cohort 2026</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              From application to campus, in five steps.
            </h2>
            <ImagePlaceholder label="Admissions journey" className="mt-5 max-w-3xl" aspect="16/9" />
          </div>
          <ol className="grid gap-px bg-black/10 md:grid-cols-5">
            {TIMELINE.map((t, i) => (
              <li key={t.t} className="bg-white/90 p-5 backdrop-blur-sm pastel-fill">
                <div className="font-display text-[28px] leading-none text-black/30">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55">{t.d}</div>
                <div className="mt-1 font-display text-[15px] leading-tight text-black/85">{t.t}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-black/10">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">FAQ</div>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.02em]">
              Everything you were about to email us.
            </h2>
            <ImagePlaceholder label="FAQ" className="mt-5" aspect="16/9" />
          </div>
          <div className="border-t border-black/10 bg-white/90 backdrop-blur-sm">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-black/10">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left px-5">
                    <span className="font-display text-[18px] leading-tight">{f.q}</span>
                    <span className="flex size-8 items-center justify-center border border-black/15 text-black/70">
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  {open && <p className="pb-6 pr-14 pl-5 text-[14px] leading-relaxed text-black/70">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLY CTA */}
      <section id="apply" className="bg-black text-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Cohort 2026 · Round 4 open</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              You have 15 minutes.
              <br />
              <em className="italic text-white/70">We have a seat.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
              Rolling admits. No GMAT / CAT required. Round 1 closes {deadline.toDateString()}.
            </p>
            <ImagePlaceholder label="Apply" className="mt-6 max-w-lg" aspect="16/9" />
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="inline-flex items-center justify-between gap-3 bg-white px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.01] pastel-fill">
              Start application <ArrowUpRight className="size-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-between gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 hover:bg-white/5">
              Talk to admissions <ArrowUpRight className="size-5" />
            </a>
            <a href="https://mastersunion.org/pgp-technology-and-business-management" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 hover:bg-white/5">
              Download brochure <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-[11px] uppercase tracking-[0.22em] text-white/40">
        © {new Date().getFullYear()} Masters' Union · PGP in Technology & Business Management
      </footer>
    </main>
  );
}
