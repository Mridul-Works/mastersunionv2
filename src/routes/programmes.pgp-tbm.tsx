import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Plus, Minus, Check, Star, Home, Layers, BookOpen, Users, CalendarDays, HelpCircle } from "lucide-react";
import heroBuilding from "@/assets/hero-building-light.webp";
import SignatureCarousel from "@/components/SignatureCarousel";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const PGP_NAV: BottomNavItem[] = [
  { id: "top", label: "Overview", icon: Home },
  { id: "structure", label: "Structure", icon: Layers },
  { id: "curriculum", label: "Curriculum", icon: BookOpen },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "admissions", label: "Admissions", icon: CalendarDays },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

// -------- Programme structure (InClass + OutClass + Immersions) --------

const STRUCTURE_STATS = [
  { k: "8", v: "Terms across 16 months" },
  { k: "150+", v: "In-class courses shipped" },
  { k: "16", v: "Out-class live challenges" },
  { k: "2", v: "Immersion tracks · Global + Bharat" },
];

const IN_CLASS_TRACKS = [
  "Finance & Fintech",
  "Sales & Marketing",
  "Management & Strategy",
  "Product & Tech",
  "AI & ML",
  "Communication & Self-Development",
  "Liberal Arts",
];

const OUT_CLASS = [
  {
    tag: "Runs across terms",
    title: "Build a D2C Brand",
    body: "Every student ships a live consumer brand — sourcing, launching and scaling it on Amazon, Blinkit, Instagram and their own store. Graded on real customers and real revenue.",
    stats: [
      { k: "₹10L+", v: "Avg. GMV / student team" },
      { k: "180+", v: "D2C brands launched to date" },
      { k: "1,000+", v: "Footfall at the offline fair" },
    ],
  },
  {
    tag: "Runs across terms",
    title: "Creator Challenge",
    body: "Students build a personal brand on YouTube, Instagram or LinkedIn from Term 2 onwards — scripting, filming, editing and distributing weekly. Graded on real audience growth.",
    stats: [
      { k: "50M+", v: "Cumulative views generated" },
      { k: "2.5M+", v: "Followers built by past cohorts" },
      { k: "40+", v: "Creators past 100k followers" },
    ],
  },
];

const IMMERSIONS = [
  {
    title: "Global Immersion",
    body: "A full module on the ground at Fortune 500 HQs and top B-schools — Silicon Valley, Dubai, Singapore, London — meeting operators building at global scale.",
    stats: [
      { k: "5+", v: "Countries hosted to date" },
      { k: "40+", v: "Fortune 500 offices visited" },
    ],
  },
  {
    title: "Bharat Immersion",
    body: "A deep dive into Tier-2 & Tier-3 India — factory floors, family businesses, agri-clusters and D2C hubs — to understand the market 90% of India actually buys from.",
    stats: [
      { k: "12+", v: "Cities across Bharat" },
      { k: "100+", v: "SMEs & founders met on ground" },
    ],
  },
];



export const Route = createFileRoute("/programmes/pgp-tbm")({
  head: () => ({
    meta: [
      { title: "PGP in Technology & Business Management — Masters' Union" },
      {
        name: "description",
        content:
          "16 months, on-campus in Gurugram. The flagship practitioner-led PGP at Masters' Union — learn business by running one. Includes 3-month internship, live ventures and global immersion.",
      },
      { property: "og:title", content: "PGP in Technology & Business Management — Masters' Union" },
      {
        property: "og:description",
        content:
          "16 months. Live D2C, live capital, live AI products. Taught by CEOs, founders and operators at DLF Cyber Park.",
      },
    ],
  }),
  component: PgpTbm,
});



// -------- Programme fact sheet (from Masters' Union Programme Overview 2026) --------

const FACTS = [
  { k: "Duration", v: "16 Months", note: "Includes 3-month internship" },
  { k: "Format", v: "On Campus", note: "Opt-in residential · Gurugram" },
  { k: "Eligibility", v: "2–5 yrs", note: "Work experience preferred" },
  { k: "Cohort", v: "2026", note: "Applications open · rolling rounds" },
];

// School-wide signals from the 2026 overview
const SCHOOL_STATS = [
  { k: "2,500+", v: "Students across programmes" },
  { k: "200+", v: "Startups founded on campus" },
  { k: "₹60 Cr+", v: "Funding raised by student ventures" },
  { k: "85%", v: "Fortune 500 within 2 km of class" },
];

const PILLARS = [
  {
    tag: "01",
    title: "Learn by doing",
    body: "You don't submit case-study essays. You launch real ventures, ship real products and manage real money — graded on outcomes, not participation.",
  },
  {
    tag: "02",
    title: "30·30·40 faculty",
    body: "30% Ivy-league academics, 30% research-led professors, 40% sitting CEOs, founders and operators running the companies you're studying.",
  },
  {
    tag: "03",
    title: "Built inside a business district",
    body: "The campus sits inside DLF Cyber Park, Gurugram — surrounded by 85% of India's Fortune 500 offices within a 2 km walk.",
  },
  {
    tag: "04",
    title: "Global + Bharat immersion",
    body: "Every cohort ships a global immersion module alongside a domestic Bharat track — from Fortune 500 boardrooms to Tier-2 factory floors.",
  },
];

// -------- Curriculum (pulled from mastersunion.org/pgp-tbm-curriculum) --------

type TermGroup = { k: string; items: string[] };
type Term = {
  label: string;
  title: string;
  outClass: { name: string; note: string }[];
  inClass: TermGroup[];
};

const TERMS: Term[] = [
  {
    label: "Term 1",
    title: "Fundamentals & the Dropshipping Challenge",
    outClass: [
      { name: "Dropshipping Challenge", note: "Build a live e-commerce brand on Amazon, BlinkIt and your own site — target ₹10L+ in real revenue." },
      { name: "Sell All You Got: One-Day Fair", note: "Take products offline at a 1,000+ footfall fair across prime NCR locations." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["How to Give an Inspiring Speech", "How to Write Persuasively"] },
      { k: "Finance & Fintech", items: ["Basic Financial Terminology", "Read and Analyse Financial Statements", "Get Comfortable With Excel"] },
      { k: "Sales & Marketing", items: ["Advertise Without Spending Money", "Run Simple Ads on TikTok, Meta and Google", "Identify Products That Sell and Make Money"] },
      { k: "Management & Strategy", items: ["Work Effectively in Teams", "Procure & Ship Globally", "Analyse Markets & Identify New Business Opportunities"] },
      { k: "Product & Tech", items: ["Use Stats to Build a Better Business", "Set Up an E-commerce Website", "Design Thinking for Products & Solutions"] },
      { k: "AI & ML", items: ["Master Prompt Engineering to Leverage Generative AI"] },
      { k: "Liberal Arts", items: ["Shifting World Order and World Politics After 9/11 and Covid"] },
    ],
  },
  {
    label: "Term 2",
    title: "Creator Challenge & Marketing Hackathon",
    outClass: [
      { name: "Creator Challenge", note: "Build your own YouTube or Instagram brand — scale to thousands (and even millions) of followers." },
      { name: "Marketing Hackathon", note: "Solve real briefs from CMOs at Marico, boAt, MMT and more." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Be Productive and Get Things Done", "Manage Personal Finances"] },
      { k: "Finance & Fintech", items: ["Allocate Budgets and Control Costs", "Create an MIS for a Business", "Why the Global Financial Meltdown Happened"] },
      { k: "Sales & Marketing", items: ["Develop a GTM Strategy Using Funnels", "Execute CRO and Increase AOV", "Leverage Amazon to Sell Your Products", "Position Your Brand Using Consumer Psychology"] },
      { k: "Management & Strategy", items: ["Identify and Track Key Business Metrics", "How a Country's Economy Works", "How the (Micro) Economy Works"] },
      { k: "Product & Tech", items: ["Read and Write Code", "Build Dashboards and Use Advanced Excel", "Develop a Product Mindset"] },
      { k: "AI & ML", items: ["How LLMs Actually Work"] },
      { k: "Liberal Arts", items: ["Mapping 5000 Years of Indian History", "How Countries Grow and Make Money"] },
    ],
  },
  {
    label: "Term 3",
    title: "Pre-Seed Cheque & In-the-Wild Consulting",
    outClass: [
      { name: "Pre-Seed Cheque Challenge", note: "Validate a startup idea and fight for ₹15L+ in pre-seed funding to build your MVP." },
      { name: "In-the-Wild Consulting", note: "Take on local businesses — revamp strategy, ops and drive real revenue growth." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Craft a Compelling Personal Portfolio", "Master the Craft of Storytelling"] },
      { k: "Finance & Fintech", items: ["How Time Is Money", "How the Global Banking System Works"] },
      { k: "Sales & Marketing", items: ["Craft a Brand Like Nike — Voice, Tone, Identity", "Sell an Idea", "Build a Personal Brand", "Script, Record and Release for YouTube & Instagram"] },
      { k: "Management & Strategy", items: ["Create a B-Plan and Pitch in 7 Slides", "Think Strategically About Your Business", "Network Effortlessly"] },
      { k: "Product & Tech", items: ["Read and Write Code (Part 1 & 2)", "Design Surveys for Primary Research", "Build Apps Using No-Code"] },
      { k: "AI & ML", items: ["Build AI-Powered Products"] },
      { k: "Liberal Arts", items: ["How China's Communism Has Evolved", "How International Relations Shape the World"] },
    ],
  },
  {
    label: "Term 4",
    title: "Build Your MVP & Blockchain Hackathon",
    outClass: [
      { name: "Building Your Minimum Viable Product", note: "Turn product, ops and strategy into a real MVP debut for beta testing." },
      { name: "Blockchain Hackathon", note: "Build blockchain solutions, network with experts and compete for top prizes." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Use Mental Models to Solve Problems", "Run Effective Meetings and Motivate Teams"] },
      { k: "Finance & Fintech", items: ["Value a Business", "Raise Debt and Equity Capital", "Make Rent/Buy Real Estate Decisions"] },
      { k: "Sales & Marketing", items: ["Use and Manage CRM Tools", "Nail Content Marketing to Grow Your Business", "Sell, Follow Up and Close Deals", "Build a Community Around Your Idea"] },
      { k: "Management & Strategy", items: ["Manage a Crisis", "Motivate Your Teams and Give Feedback", "Use KPIs and KRAs to Improve Alignment"] },
      { k: "Product & Tech", items: ["Design UI/UX Using Figma", "Build Habit-Forming Products", "Manage Developers and Software Projects"] },
      { k: "AI & ML", items: ["Use AI to Build Fast"] },
      { k: "Liberal Arts", items: ["How African History Shaped Its Politics", "Foreign Language — L2"] },
    ],
  },
  {
    label: "Term 5",
    title: "Go-to-Market & Data Science Hackathon",
    outClass: [
      { name: "Go-to-Market Challenge", note: "Design a game-changing GTM strategy that lands your product with real customer value." },
      { name: "Data Science Hackathon", note: "Turn murky data and tight deadlines into a data-driven story for stakeholders." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Write Emails That Get Responses", "Influence People Without Authority"] },
      { k: "Finance & Fintech", items: ["Invest in Capital Markets and Build a Portfolio", "Build Financial Models", "Invest in Fixed Income Securities"] },
      { k: "Sales & Marketing", items: ["Use Marketing Analytics to Optimise Conversion", "Decode Social Media Algorithms", "Do B2B Marketing", "Sell in Stores, D2C or Quick Commerce", "Market and Sell to the Bottom of the Pyramid"] },
      { k: "Management & Strategy", items: ["Use Game Theory for Business and Life", "Never Lose a Customer"] },
      { k: "Product & Tech", items: ["Gamification & Behavioural Design", "Leverage Neuroscience in Business"] },
      { k: "AI & ML", items: ["Use Big Data to Drive Decision Making"] },
      { k: "Liberal Arts", items: ["How American Politics Works", "Thinkers of the Modern World"] },
    ],
  },
  {
    label: "Term 6",
    title: "Product-Market-Fit & Avishkar Weekend",
    outClass: [
      { name: "The Product-Market-Fit Challenge", note: "Sharpen your product, lower CAC and prove why customers can't live without it." },
      { name: "Avishkar: EdTech Startup Weekend", note: "A weekend-long sprint on the biggest problems in EdTech." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Become a Better Leader"] },
      { k: "Finance & Fintech", items: ["How PE and VC Firms Work", "How M&A Works", "Invest in Exotic Financial Securities"] },
      { k: "Sales & Marketing", items: ["Price Your Products Strategically", "Motivate and Incentivize Sales Teams", "Spark Product-Led Growth Using Nudge Theory", "Craft Compelling Copy to Maximise Sales", "Negotiate Win-Win Deals"] },
      { k: "Management & Strategy", items: ["Use Mathematical Models for Business Optimisation"] },
      { k: "Product & Tech", items: ["Use Power BI to Visualise Data", "Use Product Analytics for Deeper Insights", "AB Test New Features"] },
      { k: "AI & ML", items: ["Leverage AI to Automate Content Creation"] },
      { k: "Liberal Arts", items: ["Think Like a Philosopher", "Appreciate Art"] },
    ],
  },
  {
    label: "Term 7",
    title: "Raise the Seed Fund & HackVerse",
    outClass: [
      { name: "Raising the Seed Fund Challenge", note: "Shark Tank-style pitch to real VCs to raise capital against equity." },
      { name: "HackVerse: Metaverse Startup Weekend", note: "48 hours to build the best Metaverse prototype with peers." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Hack Your Hormones"] },
      { k: "Finance & Fintech", items: ["How IPOs Work", "Innovate on Monetisation Techniques", "Trade FOREX"] },
      { k: "Sales & Marketing", items: ["Measure Brand Asset Value", "Fundraise Capital for Social Projects", "Position and Market Your Non-Profit Brand", "Set Up Drip Campaigns"] },
      { k: "Management & Strategy", items: ["Protect Ideas Using Intellectual Property Law", "How the Renewable Energy Market Works"] },
      { k: "Product & Tech", items: ["Leverage Machine Learning for Business Solutions"] },
      { k: "Liberal Arts", items: ["How the EU Works and Why Britain Exited", "Foreign Language — L1"] },
    ],
  },
  {
    label: "Term 8",
    title: "One-Day Profit & Agri-Tech Hackathon",
    outClass: [
      { name: "One-Day Profit Challenge", note: "Work with influencers to rebrand and upsell products from local artisans — impact + profit." },
      { name: "Agri-Tech Hackathon", note: "Ship tech solutions to real problems across agriculture and ecotourism." },
    ],
    inClass: [
      { k: "Communication & Self-Development", items: ["Master Power Writing and Deep Reading"] },
      { k: "Finance & Fintech", items: ["Leverage DeFi and Crypto in Business", "Manage Risk and Optimise Returns", "Understand Taxes and Compliances"] },
      { k: "Sales & Marketing", items: ["Leverage AI and ML in Marketing", "Use Interactive Content for Better Conversions", "Leverage Design to Inspire Trust"] },
      { k: "Management & Strategy", items: ["How the Carbon Credits Economy Works"] },
      { k: "Product & Tech", items: ["Build Hardware Prototypes"] },
    ],
  },
];

const FACULTY = [
  { name: "Kunal Shah", role: "Founder, CRED", tag: "Consumer Behaviour" },
  { name: "Deepinder Goyal", role: "Founder, Zomato", tag: "Building at Scale" },
  { name: "Nithin Kamath", role: "Founder, Zerodha", tag: "Capital Markets" },
  { name: "Ronnie Screwvala", role: "Founder, upGrad · UTV", tag: "Media & Ventures" },
  { name: "Radhika Gupta", role: "CEO, Edelweiss AMC", tag: "Asset Management" },
  { name: "Anand Chandrasekaran", role: "GM, Meta", tag: "Product Leadership" },
];

const SIGNATURE = [
  { k: "Dropshipping Fair", v: "Term 1 · Live e-commerce brand from Day 1" },
  { k: "Content Creator Challenge", v: "Term 2 · Real audience, real brand deals" },
  { k: "Student Investment Fund", v: "Term 3 · Real capital, real trades" },
  { k: "Venture Initiation Programme", v: "Term 4 · Capstone venture, pitched to investors" },
  { k: "Corporate One-Day Challenges", v: "CEO-set briefs across the year" },
  { k: "Global Immersion", v: "International module in Term 4" },
];

const TIMELINE = [
  { d: "Round 4", t: "Applications open now" },
  { d: "Step 2", t: "Aptitude assessment" },
  { d: "Step 3", t: "Operator interview" },
  { d: "Step 4", t: "Admit decision + scholarship review" },
  { d: "Start", t: "Cohort 2026 begins on campus" },
];

const FAQ = [
  {
    q: "Who is this programme for?",
    a: "The PGP TBM is designed for candidates with 2–5 years of work experience who want to run companies — as founders, operators, product leaders or investors. STEM, commerce and liberal-arts backgrounds are all welcome.",
  },
  {
    q: "How long is the programme and what does it include?",
    a: "16 months on campus at DLF Cyber Park, Gurugram. Four academic terms plus a three-month full-time industry internship. Every term includes a signature live project — from the Dropshipping Fair in Term 1 to the capstone Venture Initiation Programme in Term 4.",
  },
  {
    q: "How is this different from a traditional MBA?",
    a: "Masters' Union runs on a Learn-by-Doing philosophy: grades are based on real products, real revenue and real outcomes, not just exams. The 30·30·40 faculty model means 40% of your teachers are sitting CEOs, founders and operators.",
  },
  {
    q: "Where is the campus?",
    a: "DLF Cyber Park, Sector 20, Gurugram — surrounded by 85% of the Fortune 500 offices in India within a 2 km radius.",
  },
  {
    q: "Do I need CAT or GMAT?",
    a: "No. Admission is via our own aptitude assessment and an operator-led interview, in rolling rounds until the cohort fills.",
  },
];

// -------- Countdown (kept for admissions urgency) --------

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function PgpTbm() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openTerm, setOpenTerm] = useState<number | null>(0);
  const deadline = new Date("2026-08-15T23:59:59+05:30");
  const { d, h, m } = useCountdown(deadline);



  return (
    <main
      className="min-h-screen pastel-gradient text-[color:var(--ink)] pb-28 md:pb-32"
      style={{
        "--pastel-start": "oklch(0.99 0.014 220 / 0.4)",
        "--pastel-mid": "oklch(0.985 0.020 210 / 0.4)",
      } as React.CSSProperties}
    >
      <BottomNav items={PGP_NAV} applyHref="#apply" />


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
                The flagship 16-month, practitioner-led PGP at Masters' Union. Cohort-based, on
                campus in Gurugram — with a three-month industry internship and both domestic and
                global immersions built into the curriculum.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#apply" className="inline-flex items-center gap-2 bg-black px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02] pastel-fill">
                Start application <ArrowUpRight className="size-4" />
              </a>
              <a href="https://mastersunion.org/pgp-technology-and-business-management" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-black hover:bg-black/5">
                Download brochure ↓
              </a>
              <div className="flex items-center gap-2 text-[11px] text-black/55">
                <Check className="size-3.5" /> No CAT / GMAT · 15 min to apply
              </div>
            </div>

            {/* Fact sheet */}
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
              <img src={heroBuilding} alt="Masters' Union campus, DLF Cyber Park" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">The Campus</div>
                <div className="mt-1 font-display text-[20px] leading-tight">DLF Cyber Park, Gurugram</div>
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

      {/* SCHOOL-WIDE PROOF */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">
            The school behind the programme
          </div>
          <div className="mt-6 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOOL_STATS.map((st) => (
              <div key={st.v} className="bg-white/90 p-6 backdrop-blur-sm">
                <div className="font-display text-[38px] leading-none tracking-tight">{st.k}</div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60">{st.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME STRUCTURE — InClass · OutClass · Immersions */}
      <section id="structure" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">How the programme is structured</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Three engines. One outcome — <em className="italic text-black/60">operators who ship.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-black/65">
              Every term at Masters' Union runs on three parallel engines. <strong>InClass</strong> builds the fundamentals across seven tracks. <strong>OutClass</strong> forces you to apply them on live ventures that run across terms. <strong>Immersions</strong> take you to the ground — globally and across Bharat — to learn how business actually happens.
            </p>
          </div>

          {/* Outcome stat strip */}
          <div className="mb-14 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {STRUCTURE_STATS.map((s) => (
              <div key={s.v} className="bg-white/90 p-6 backdrop-blur-sm">
                <div className="font-display text-[38px] leading-none tracking-tight">{s.k}</div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60">{s.v}</div>
              </div>
            ))}
          </div>

          {/* ENGINE 1 — InClass */}
          <div className="grid gap-8 border-t border-black/10 py-10 md:grid-cols-[280px_1fr] md:gap-16">
            <div>
              <div className="font-display text-[42px] leading-none text-black/25">01</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">InClass · Fundamentals</div>
              <h3 className="mt-2 font-display text-[26px] leading-tight tracking-tight">The learning core</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Seven tracks, taught across all 8 terms by a mix of Ivy academics, research faculty and 40% sitting operators. Every course is graded on a real deliverable, never on rote exams.
              </p>
            </div>
            <div>
              <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                {IN_CLASS_TRACKS.map((t) => (
                  <div key={t} className="bg-white/90 p-4 text-[13px] font-medium leading-tight text-black/80 pastel-fill">
                    {t}
                  </div>
                ))}
                <div className="bg-black p-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90">
                  150+ courses · 8 terms
                </div>
              </div>
            </div>
          </div>

          {/* ENGINE 2 — OutClass */}
          <div className="grid gap-8 border-t border-black/10 py-10 md:grid-cols-[280px_1fr] md:gap-16">
            <div>
              <div className="font-display text-[42px] leading-none text-black/25">02</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">OutClass · Live ventures</div>
              <h3 className="mt-2 font-display text-[26px] leading-tight tracking-tight">Two flagships. Real customers, real revenue.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Two OutClass tracks run continuously alongside InClass across terms. Both are graded on outcomes measured in the open market — not on decks.
              </p>
            </div>
            <div className="grid gap-px bg-black/10 md:grid-cols-2">
              {OUT_CLASS.map((o) => (
                <article key={o.title} className="bg-white/90 p-6 backdrop-blur-sm pastel-fill">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">{o.tag}</div>
                  <h4 className="mt-3 font-display text-[22px] leading-tight tracking-tight">{o.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/65">{o.body}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                    {o.stats.map((s) => (
                      <div key={s.v}>
                        <dt className="font-display text-[22px] leading-none tracking-tight">{s.k}</dt>
                        <dd className="mt-1.5 text-[10.5px] leading-snug text-black/55">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>

          {/* ENGINE 3 — Immersions */}
          <div className="grid gap-8 border-t border-black/10 py-10 md:grid-cols-[280px_1fr] md:gap-16">
            <div>
              <div className="font-display text-[42px] leading-none text-black/25">03</div>
              <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">Immersions · On the ground</div>
              <h3 className="mt-2 font-display text-[26px] leading-tight tracking-tight">Two tracks. Global boardrooms to Bharat factories.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-black/65">
                Students opt into immersion modules across terms — going where the business actually happens, not where slides describe it.
              </p>
            </div>
            <div className="grid gap-px bg-black/10 md:grid-cols-2">
              {IMMERSIONS.map((im) => (
                <article key={im.title} className="bg-white/90 p-6 backdrop-blur-sm pastel-fill">
                  <h4 className="font-display text-[22px] leading-tight tracking-tight">{im.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/65">{im.body}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4">
                    {im.stats.map((s) => (
                      <div key={s.v}>
                        <dt className="font-display text-[26px] leading-none tracking-tight">{s.k}</dt>
                        <dd className="mt-1.5 text-[11px] leading-snug text-black/55">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>

          {/* Outcome closer */}
          <div className="mt-12 grid gap-px bg-black/10 sm:grid-cols-3">
            <div className="bg-black p-6 text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Outcomes · Class of 2025</div>
              <div className="mt-3 font-display text-[28px] leading-tight">Numbers over narrative.</div>
            </div>
            <div className="bg-white/90 p-6 pastel-fill">
              <div className="font-display text-[38px] leading-none tracking-tight">₹34.6 LPA</div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">Median CTC · flagship cohort</div>
            </div>
            <div className="bg-white/90 p-6 pastel-fill">
              <div className="font-display text-[38px] leading-none tracking-tight">200+</div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">Startups founded on campus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="border-b border-black/10">

        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Curriculum · 16 months · 8 terms</div>
              <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Eight terms. Every one ships something real.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-black/60">
                In-class courses across seven tracks, paired with an out-class challenge every term — from the Dropshipping Challenge in Term 1 to raising a real seed fund in Term 7. Curriculum lifted from{" "}
                <a href="https://mastersunion.org/pgp-tbm-curriculum" target="_blank" rel="noreferrer" className="underline underline-offset-2">mastersunion.org/pgp-tbm-curriculum</a>.
              </p>
            </div>
          </div>
          <ol className="space-y-px bg-black/10">
            {TERMS.map((t, i) => {
              const open = openTerm === i;
              return (
                <li key={t.label} className="bg-white/90 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setOpenTerm(open ? null : i)}
                    className="grid w-full grid-cols-[64px_1fr_24px] items-center gap-4 p-6 text-left md:grid-cols-[90px_180px_1fr_24px] md:gap-8 md:p-8"
                    aria-expanded={open}
                  >
                    <div className="font-display text-[42px] leading-none text-black/25">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{t.label}</div>
                      <div className="mt-2 font-display text-[20px] leading-tight">{t.title}</div>
                    </div>
                    <div className="hidden text-[13px] leading-relaxed text-black/60 md:block">
                      {t.outClass.map((o) => o.name).join(" · ")}
                    </div>
                    <div className={`justify-self-end font-display text-[24px] leading-none text-black/40 transition-transform ${open ? "rotate-45" : ""}`}>+</div>
                  </button>
                  {open && (
                    <div className="grid gap-8 border-t border-black/10 p-6 md:grid-cols-[1fr_1.4fr] md:gap-12 md:p-8">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Out-class · You ship</div>
                        <div className="mt-4 space-y-4">
                          {t.outClass.map((o) => (
                            <div key={o.name} className="border-l-2 border-emerald-500 pl-3">
                              <div className="font-display text-[16px] leading-tight">{o.name}</div>
                              <div className="mt-1 text-[13px] leading-relaxed text-black/65">{o.note}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">In-class · Courses</div>
                        <div className="mt-4 space-y-4">
                          {t.inClass.map((g) => (
                            <div key={g.k}>
                              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">{g.k}</div>
                              <ul className="mt-1.5 space-y-1">
                                {g.items.map((it) => (
                                  <li key={it} className="text-[13px] leading-snug text-black/70">— {it}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] text-black/55">
            <span className="inline-block h-px w-8 bg-black/30" />
            Each term for experienced professionals lasts 1–2 months; 2–3 months for the YLC cohort. Non-mandatory 3-month internship follows the on-campus terms.
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <SignatureCarousel />


      {/* FACULTY */}
      <section id="faculty" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">The 30·30·40 faculty model</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              30% Ivy academics. 30% research faculty. 40% sitting operators.
            </h2>
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

      {/* ADMISSIONS TIMELINE */}
      <section id="admissions" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Admissions · Cohort 2026</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              From application to campus, in five steps.
            </h2>
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
