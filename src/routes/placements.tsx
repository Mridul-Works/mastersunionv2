import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
      {children}
    </div>
  );
}

function BarChart({ data, max, unit = "L" }: { data: { cohort: string; value: number }[]; max: number; unit?: string }) {
  return (
    <div className="flex h-56 items-end gap-3 md:gap-6">
      {data.map((d) => (
        <div key={d.cohort} className="flex flex-1 flex-col items-center justify-end gap-3">
          <div className="text-[0.9rem] tracking-[-0.02em]">₹{d.value}{unit}</div>
          <div
            className="w-full rounded-t-[3px] bg-black transition-all duration-500"
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

function RangeBar({ row, max }: { row: CohortRow; max: number }) {
  const left = (row.bottom25 / max) * 100;
  const width = ((row.top25 - row.bottom25) / max) * 100;
  const avg = (row.avg / max) * 100;
  const med = (row.median / max) * 100;
  return (
    <div className="relative h-8 w-full rounded-[3px] bg-black/[0.05]">
      <div className="absolute inset-y-2 rounded-[2px] bg-black/20" style={{ left: `${left}%`, width: `${width}%` }} />
      <div className="absolute inset-y-0 w-[2px] bg-black" style={{ left: `${avg}%` }} title={`Average ₹${row.avg}L`} />
      <div className="absolute inset-y-1 w-[2px] bg-black/40" style={{ left: `${med}%` }} title={`Median ₹${row.median}L`} />
    </div>
  );
}

function Donut({ data }: { data: { label: string; pct: number }[] }) {
  const R = 60;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const shades = ["rgba(0,0,0,0.88)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.18)"];
  return (
    <div className="flex flex-wrap items-center gap-10">
      <svg viewBox="0 0 160 160" className="size-40 -rotate-90">
        {data.map((d, i) => {
          const len = (d.pct / 100) * C;
          const el = (
            <circle
              key={d.label}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={shades[i % shades.length]}
              strokeWidth="22"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="size-3 rounded-[2px]" style={{ background: shades[i % shades.length] }} />
            <span className="text-[0.95rem]">{d.label}</span>
            <span className="text-[0.95rem] text-black/50">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoRow({ names }: { names: string[] }) {
  const found = names.filter((n) => LOGOS[n]);
  if (found.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
      {found.map((n) => (
        <img key={n} src={LOGOS[n]} alt={n} loading="lazy" className="h-6 w-auto object-contain opacity-80" />
      ))}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

function Page() {
  const maxCtc = 55;
  const [recruiterTab, setRecruiterTab] = useState(RECRUITER_GROUPS[0].category);
  const active = RECRUITER_GROUPS.find((g) => g.category === recruiterTab)!;

  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#contact" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>Careers at Masters&apos; Union</div>
      </div>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:px-10 md:pt-24">
        <Eyebrow>Careers</Eyebrow>
        <h1 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Accelerate your career growth.
        </h1>
        <p className="mt-8 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.55] text-black/70">
          Benefit from an exceptional track record of our graduates&apos; success — audited, published, and repeated across five cohorts.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#outcomes" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            <Download className="size-3.5" /> Placement report
          </a>
          <a href="#recruiters" className="inline-flex items-center gap-2 border border-black/20 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black hover:border-black" style={{ fontFamily: MONO }}>
            Our recruiters <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-10">
              <div className="text-[clamp(1.7rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PODCAST */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10 md:pt-24">
        <CareerPodcast />
      </section>



      {/* AUDITED OUTCOMES */}
      <section id="outcomes" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Five years of audited placements</Eyebrow>
        <h2 className="mt-5 max-w-[26ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
          Proven outcomes, verified line by line.
        </h2>
        <p className="mt-6 max-w-[68ch] text-[1.05rem] leading-[1.65] text-black/70">
          Our placement reports are audited by Brickworks — auditor for IIM Ahmedabad — and follow the IPRS Revision 2.2 framework for transparent, consistent compensation data.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {AUDIT_STATS.map((s) => (
            <div key={s.suffix} className="bg-white p-8">
              <div className="text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.suffix}</div>
              <p className="mt-4 text-[0.92rem] leading-[1.6] text-black/70">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>Reports</span>
          {REPORT_YEARS.map((y) => (
            <span key={y} className="inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-black/75" style={{ fontFamily: MONO }}>
              <Download className="size-3" /> Cohort {y}
            </span>
          ))}
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="mt-24 border-y border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
          <blockquote className="max-w-[52ch] text-[clamp(1.3rem,2.6vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.015em]">
            “We don&apos;t approach placements the way most B-schools do. At Masters&apos; Union, placements are run by a 50+ member, full-time team spanning company outreach, career preparation, and role-specific coaching.”
          </blockquote>
          <div className="mt-8 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>
            Pratham Mittal — Founder &amp; CEO, Masters&apos; Union
          </div>
        </div>
      </section>

      {/* COHORT CHARTS */}
      <section id="cohorts" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Cohort average CTC</Eyebrow>
        <h2 className="mt-5 max-w-[30ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
          ₹29.12L, ₹33.10L and ₹34.07L — cohort averages that surpassed top B-schools.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="border border-black/10 p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>PGP TBM — average CTC</div>
              <div className="text-[11px] text-black/45" style={{ fontFamily: MONO }}>₹ lakh</div>
            </div>
            <div className="mt-8"><BarChart data={TBM_SERIES} max={38} /></div>
          </div>
          <div className="border border-black/10 p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>PGP TBM YLC — average CTC</div>
              <div className="text-[11px] text-black/45" style={{ fontFamily: MONO }}>₹ lakh</div>
            </div>
            <div className="mt-8"><BarChart data={YLC_SERIES} max={38} /></div>
          </div>
        </div>
        <p className="mt-8 max-w-[70ch] text-[0.95rem] leading-[1.7] text-black/60">
          Reports available for Cohorts 2021–2024, verified and audited by Brickworks Analytics, auditor for IIM Ahmedabad&apos;s placement report.
        </p>
      </section>

      {/* DISTRIBUTION TABLE */}
      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Placement statistics — PGP TBM</Eyebrow>
        <h2 className="mt-5 max-w-[30ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          The full distribution, not just the headline number.
        </h2>
        <div className="mt-10 space-y-6">
          {TBM_TABLE.map((r) => (
            <div key={r.cohort} className="grid grid-cols-1 gap-4 border-b border-black/10 pb-6 md:grid-cols-12 md:items-center md:gap-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/60 md:col-span-1" style={{ fontFamily: MONO }}>Co{r.cohort}</div>
              <div className="md:col-span-6"><RangeBar row={r} max={maxCtc} /></div>
              <div className="grid grid-cols-3 gap-4 md:col-span-5">
                <div>
                  <div className="text-[1.05rem] tracking-[-0.02em]">₹{r.avg}L</div>
                  <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Average</div>
                </div>
                <div>
                  <div className="text-[1.05rem] tracking-[-0.02em]">₹{r.median}L</div>
                  <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Median</div>
                </div>
                <div>
                  <div className="text-[1.05rem] tracking-[-0.02em]">{r.highestLabel}</div>
                  <div className="text-[9px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>Highest</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-6 bg-black/20" /> Bottom 25% → Top 25%</span>
          <span className="inline-flex items-center gap-2"><span className="h-4 w-[2px] bg-black" /> Average</span>
          <span className="inline-flex items-center gap-2"><span className="h-4 w-[2px] bg-black/40" /> Median</span>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-black/10 pt-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Salary components — Cohort &apos;24</Eyebrow>
            <p className="mt-5 max-w-[46ch] text-[1rem] leading-[1.7] text-black/70">
              How packages are structured between in-hand cash components and stock options, counting Year 1 vesting only.
            </p>
          </div>
          <Donut data={SALARY_COMPONENTS} />
        </div>
      </section>

      {/* RECRUITERS */}
      <section id="recruiters" className="mt-24 border-y border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <Eyebrow>Our recruiters</Eyebrow>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Six categories. One hiring calendar.
          </h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {RECRUITER_GROUPS.map((g) => (
              <button
                key={g.category}
                onClick={() => setRecruiterTab(g.category)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  recruiterTab === g.category ? "bg-black text-white" : "border border-black/15 text-black/65 hover:border-black/40"
                }`}
                style={{ fontFamily: MONO }}
              >
                {g.category}
              </button>
            ))}
          </div>
          <div className="mt-10 min-h-[120px] bg-white p-8">
            <LogoRow names={active.logos} />
          </div>
        </div>
      </section>

      {/* TRANSITIONS */}
      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Career transitions</Eyebrow>
        <h2 className="mt-5 max-w-[28ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          Where students come from, and where they go.
        </h2>
        <div className="mt-12 space-y-14">
          {TRANSITIONS.map((t) => (
            <div key={t.title}>
              <h3 className="text-[1.2rem] font-medium">{t.title}</h3>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>{t.sub}</div>
              <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                {t.rows.map(([from, to]) => (
                  <div key={from + to} className="grid grid-cols-1 items-center gap-2 py-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                    <div className="text-[0.98rem] text-black/60">{from}</div>
                    <ArrowUpRight className="size-4 rotate-45 text-black/30" />
                    <div className="text-[0.98rem]">{to}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALUMNI STORIES */}
      <section id="stories" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Hear straight from our alumni</Eyebrow>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {ALUMNI.map((a) => (
            <div key={a.name} className="bg-white p-7">
              <p className="text-[0.98rem] leading-[1.65] text-black/80">“{a.quote}”</p>
              <div className="mt-6 text-[1rem] font-medium leading-tight">{a.name}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>{a.role}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Eyebrow>Student placement experience — 39 stories, selected</Eyebrow>
          <div className="mt-8 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-6">
                <div className="text-[0.98rem] font-medium leading-tight">{t.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{t.role}</div>
                <p className="mt-3 text-[0.9rem] leading-[1.6] text-black/70">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENTURES + COMPETITIONS + LIVE PROJECTS */}
      <section className="mt-24 border-y border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <Eyebrow>Startups founded by MU students</Eyebrow>
          <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((v) => (
              <div key={v.name} className="bg-white p-6">
                <div className="text-[1rem] font-medium leading-tight">{v.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{v.founder}</div>
                <p className="mt-3 text-[0.9rem] leading-[1.6] text-black/70">{v.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Case competition wins</Eyebrow>
              <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                {COMPETITIONS.map((c) => (
                  <div key={c.what} className="py-5">
                    <div className="text-[0.98rem] font-medium">{c.what}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{c.who}</div>
                    <p className="mt-2 text-[0.9rem] leading-[1.6] text-black/70">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Live projects</Eyebrow>
              <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                {LIVE_PROJECTS.map((p) => (
                  <div key={p.name} className="py-5">
                    <div className="text-[0.98rem] font-medium">{p.name}</div>
                    <p className="mt-2 text-[0.9rem] leading-[1.6] text-black/70">{p.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Eyebrow>Student content creators</Eyebrow>
                <div className="mt-6 flex flex-wrap gap-2">
                  {CREATORS.map((c) => (
                    <span key={c.name} className="border border-black/15 bg-white px-3 py-2 text-[0.85rem] text-black/75">
                      {c.handle} <span className="text-black/40">· {c.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAY */}
      <section id="pathway" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>A tailored career pathway</Eyebrow>
        <h2 className="mt-5 max-w-[28ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          Eight terms. One continuous career roadmap.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {TERMS.map((t) => (
            <div key={t.term} className="bg-white p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-black/50" style={{ fontFamily: MONO }}>{t.term}</div>
              <div className="mt-3 text-[1rem] font-medium leading-snug">{t.title}</div>
              <ul className="mt-4 space-y-1.5">
                {t.items.map((i) => (
                  <li key={i} className="text-[0.85rem] leading-[1.5] text-black/65">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* COACHES */}
      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Dedicated career coaches</Eyebrow>
        <h2 className="mt-5 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          Making you industry ready.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {COACH_TRACKS.map((c) => (
            <div key={c.title} className="bg-white p-7">
              <div className="text-[1.05rem] font-medium leading-tight">{c.title}</div>
              <p className="mt-4 text-[0.92rem] leading-[1.6] text-black/70">{c.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {COACHES.map((c) => (
            <div key={c.name} className="grid grid-cols-1 gap-1 py-4 md:grid-cols-12 md:items-baseline md:gap-6">
              <div className="text-[1rem] font-medium md:col-span-3">{c.name}</div>
              <div className="text-[0.95rem] text-black/65 md:col-span-7">{c.role}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-black/50 md:col-span-2 md:text-right" style={{ fontFamily: MONO }}>{c.exp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERS */}
      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <Eyebrow>Your future recruiters on campus</Eyebrow>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-[1.7] text-black/70">
          CEOs and MDs, CHROs, unicorn founders and senior executives teach, mentor and recruit on campus.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3 lg:grid-cols-4">
          {LEADERS.map((l) => (
            <div key={l.name} className="bg-white p-6">
              <div className="text-[0.98rem] font-medium leading-tight">{l.name}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{l.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="border border-black/10 p-8 md:p-12">
          <Eyebrow>Careers team</Eyebrow>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            A 50+ member team, working full time on your outcome.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="mailto:careerservices@mastersunion.org" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
              <Mail className="size-3.5" /> careerservices@mastersunion.org
            </a>
            <span className="inline-flex items-center gap-2 border border-black/20 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black/70" style={{ fontFamily: MONO }}>
              <Download className="size-3.5" /> Internship report
            </span>
          </div>
        </div>
      </section>
    </main>
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
