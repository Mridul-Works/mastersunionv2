import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  BarChart3,
  TrendingUp,
  Briefcase,
  Users,
  Route as RouteIcon,
} from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import {
  Chapter,
  CountUp,
  Headline,
  Label,
  MONO,
  Rise,
  Rule,
  TextCta,
} from "@/components/placements/editorial";
import heroImage from "@/assets/programs/editorial-postgraduate.jpg.asset.json";
import storyImage from "@/assets/programs/editorial-executive.jpg.asset.json";
import teamImage from "@/assets/widget/widget-campus-life.jpg.asset.json";
import readinessImage from "@/assets/programs/editorial-global.jpg.asset.json";

const INTER = "'Inter', system-ui, sans-serif";

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
  { id: "salaries", label: "Salaries", icon: TrendingUp },
  { id: "hiring", label: "Hiring", icon: Briefcase },
  { id: "readiness", label: "Readiness", icon: Users },
  { id: "roadmap", label: "Roadmap", icon: RouteIcon },
];

const TOP_NAV = [
  { id: "outcomes", label: "Outcomes" },
  { id: "salaries", label: "Salaries" },
  { id: "hiring", label: "Hiring" },
  { id: "roadmap", label: "Careers" },
  { id: "readiness", label: "Industry readiness" },
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

const PREP_PRINCIPLES = [
  {
    n: "01",
    title: "Company outreach",
    note: "A full-time outreach desk that builds and maintains the recruiter pipeline across six hiring categories, year after year.",
  },
  {
    n: "02",
    title: "Career preparation",
    note: "Psychometrics, mentor allocation, resume reviews, personal branding and behavioural mocks, sequenced across eight terms.",
  },
  {
    n: "03",
    title: "Role-specific coaching",
    note: "Consulting case training, product practicums, financial modelling and domain seminars, matched to each student's target role.",
  },
  {
    n: "04",
    title: "Employer alignment",
    note: "Live industry projects, corporate competitions and CXO sessions that put students in front of recruiters before the drive begins.",
  },
];

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

const RECRUITER_GROUPS: { category: string; logos: string[]; note: string }[] = [
  {
    category: "Consulting",
    note: "Strategy, transformation and operations roles across the global and Big Four consulting houses.",
    logos: ["McKinsey", "Bain", "BCG", "Accenture", "Deloitte", "EY", "PWC", "Kearney", "OliverWyman"],
  },
  {
    category: "Large Tech",
    note: "Product management, programme management and client solutions inside global technology firms.",
    logos: ["Google", "Meta", "Microsoft", "Youtube", "Servicenow"],
  },
  {
    category: "Consumer Tech",
    note: "Category, growth and founder's-office mandates at India's fastest-scaling consumer platforms.",
    logos: ["Flipkart", "Zomato", "Zepto", "Unacademy", "PhysicsWallah", "MamaEarth"],
  },
  {
    category: "BFSI",
    note: "Investment banking, credit risk, payments and analytics across banks and financial infrastructure.",
    logos: ["ICICI", "HSBC", "CITI", "AmericanExpress", "Razorpay", "PineLabs", "Cred"],
  },
  {
    category: "Venture Capital",
    note: "Deal sourcing, diligence and portfolio roles with early and growth-stage investors.",
    logos: ["GoodCapital", "Waterbridge", "Antler", "StrideVentures", "IPV"],
  },
  {
    category: "Emerging Tech",
    note: "Product, analytics and go-to-market roles at high-growth SaaS and emerging technology firms.",
    logos: ["Kapture", "Twyn", "Webengage", "Zycus", "Mindtickle"],
  },
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

/* ------------------------------- components ------------------------------- */

function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = false;
    const handler = () => {
      const next = window.scrollY > 24;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>

      <header
        className={
          "fixed inset-x-0 top-0 z-50 hidden transition-colors duration-300 lg:block " +
          (scrolled
            ? "border-b border-black/10 bg-[#F7F7F5]/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent")
        }
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-12 py-4">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.26em] text-black"
            style={{ fontFamily: MONO }}
          >
            Masters&apos; Union
          </Link>
          <nav aria-label="Sections" className="flex items-center gap-8">
            {TOP_NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-[11px] uppercase tracking-[0.2em] text-black/55 transition-colors hover:text-black"
                style={{ fontFamily: MONO }}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border-b border-black/30 pb-0.5 text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:border-[#C8102E]"
            style={{ fontFamily: MONO }}
          >
            Enquire
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </header>
    </>
  );
}


/** Minimal vertical bar series. */
function BarSeries({
  data,
  max,
  caption,
}: {
  data: { cohort: string; value: number }[];
  max: number;
  caption: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/50" style={{ fontFamily: MONO }}>
          {caption}
        </p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/35" style={{ fontFamily: MONO }}>
          ₹ lakh
        </p>
      </div>
      <div className="mt-10 flex h-52 items-end gap-4 md:gap-7">
        {data.map((d, i) => (
          <div key={d.cohort} className="flex flex-1 flex-col items-center justify-end gap-3">
            <span className="text-[0.9rem] tracking-[-0.02em]">₹{d.value}L</span>
            <div
              className="w-full origin-bottom bg-black transition-transform duration-[900ms] ease-out"
              style={{ height: `${(d.value / max) * 100}%`, transitionDelay: `${i * 70}ms` }}
            />
            <span
              className="text-[9px] uppercase tracking-[0.2em] text-black/45"
              style={{ fontFamily: MONO }}
            >
              {d.cohort}
            </span>
          </div>
        ))}
      </div>
      <Rule className="mt-3" />
    </div>
  );
}

/** Thin distribution line: bottom-25 → top-25 span with average + median markers. */
function DistributionRow({ row, max }: { row: CohortRow; max: number }) {
  const left = (row.bottom25 / max) * 100;
  const width = ((row.top25 - row.bottom25) / max) * 100;
  const avg = (row.avg / max) * 100;
  const med = (row.median / max) * 100;

  return (
    <div className="group grid grid-cols-1 gap-4 border-b border-black/10 py-6 md:grid-cols-12 md:items-center md:gap-8">
      <div
        className="text-[10px] uppercase tracking-[0.24em] text-black/50 md:col-span-1"
        style={{ fontFamily: MONO }}
      >
        Co{row.cohort}
      </div>

      <div className="md:col-span-6">
        <div className="relative h-6 w-full">
          <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <span
            aria-hidden
            className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-black/25 transition-colors group-hover:bg-black/40"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
          <span aria-hidden className="absolute inset-y-0 w-px bg-[#C8102E]" style={{ left: `${avg}%` }} />
          <span aria-hidden className="absolute inset-y-1.5 w-px bg-black/55" style={{ left: `${med}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 md:col-span-5">
        {[
          { v: `₹${row.avg}L`, l: "Average" },
          { v: `₹${row.median}L`, l: "Median" },
          { v: row.highestLabel, l: "Highest" },
        ].map((c) => (
          <div key={c.l}>
            <div className="text-[1.05rem] tracking-[-0.02em]">{c.v}</div>
            <div
              className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
              style={{ fontFamily: MONO }}
            >
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoWall({ names }: { names: string[] }) {
  const found = names.filter((n) => LOGOS[n]);
  if (!found.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
      {found.map((n) => (
        <img
          key={n}
          src={LOGOS[n]}
          alt={n}
          loading="lazy"
          decoding="async"
          className="no-img-zoom h-6 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
        />
      ))}
    </div>
  );
}

function StoryFeature() {
  const [playing, setPlaying] = useState(false);
  const id = "uiNTwDixAts";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              title="How Masters' Union prepares students for top 1% placements"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the placements conversation"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                alt="Masters' Union placement team in conversation"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />
              <span aria-hidden className="absolute inset-0 bg-black/10" />
              <span className="absolute bottom-6 left-6 grid size-14 place-items-center rounded-full border border-white/50 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-black">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-5 lg:pb-4">
        <Label>Featured · The placement engine</Label>
        <h3 className="mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
          How Masters&apos; Union prepares students for top 1% placements.
        </h3>
        <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-black/60">
          A detailed conversation on the placement engine behind Masters&apos; Union — how recruiter
          access, live industry projects and year-round career coaching translate into offers at the
          firms shaping the next decade.
        </p>
        <TextCta href={`https://www.youtube.com/watch?v=${id}`} className="mt-8">
          Watch the conversation
        </TextCta>
      </div>
    </div>
  );
}

function HiringCalendar() {
  const [active, setActive] = useState(0);
  const group = RECRUITER_GROUPS[active];

  return (
    <div>
      <div className="grid grid-cols-2 border-t border-black/12 md:grid-cols-3 lg:grid-cols-6">
        {RECRUITER_GROUPS.map((g, i) => (
          <button
            key={g.category}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={
              "group border-b border-r border-black/12 px-4 py-6 text-left transition-colors " +
              (active === i ? "bg-black text-white" : "hover:bg-black/[0.04]")
            }
          >
            <span
              className={
                "block text-[10px] tracking-[0.24em] " +
                (active === i ? "text-white/55" : "text-black/40")
              }
              style={{ fontFamily: MONO }}
            >
              0{i + 1}
            </span>
            <span className="mt-4 block text-[0.95rem] font-medium leading-tight tracking-[-0.01em]">
              {g.category}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 border-b border-black/12 py-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="text-[16px] leading-[1.7] text-black/60">{group.note}</p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-black/40" style={{ fontFamily: MONO }}>
            {group.logos.length} recruiters listed
          </p>
        </div>
        <div className="lg:col-span-8">
          <LogoWall names={group.logos} />
        </div>
      </div>
    </div>
  );
}

function EmployerIndex() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-14">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group inline-flex items-center gap-3 border-b border-black/25 pb-1.5 text-[11px] uppercase tracking-[0.24em] text-black transition-colors hover:border-[#C8102E]"
        style={{ fontFamily: MONO }}
      >
        {open ? "Hide full employer index" : "View all employers"}
        <span
          aria-hidden
          className={"transition-transform duration-300 " + (open ? "rotate-90" : "group-hover:translate-x-1")}
        >
          →
        </span>
      </button>

      {open ? (
        <div className="mt-10 border-t border-black/12">
          {RECRUITER_GROUPS.map((g) => (
            <div
              key={g.category}
              className="grid grid-cols-1 gap-4 border-b border-black/12 py-6 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <div className="text-[0.98rem] font-medium tracking-[-0.01em]">{g.category}</div>
                <div
                  className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {g.logos.length} firms
                </div>
              </div>
              <ul className="md:col-span-9 md:columns-3">
                {g.logos.map((l) => (
                  <li
                    key={l}
                    className="mb-1.5 break-inside-avoid text-[0.92rem] text-black/60 transition-colors hover:text-black"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TransitionBlock({ t }: { t: (typeof TRANSITIONS)[number] }) {
  const [open, setOpen] = useState(false);
  const rows = open ? t.rows : t.rows.slice(0, 3);

  return (
    <div className="border-t border-black/12 pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-3">
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.015em]">{t.title}</h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/45" style={{ fontFamily: MONO }}>
            {t.sub}
          </p>
        </div>

        <div className="lg:col-span-9">
          {rows.map(([from, to]) => (
            <div
              key={from + to}
              className="group grid grid-cols-1 items-center gap-2 border-b border-black/10 py-5 md:grid-cols-[1fr_auto_1fr] md:gap-8"
            >
              <div className="text-[0.95rem] text-black/50">{from}</div>
              <div aria-hidden className="hidden h-px w-16 bg-black/15 md:block group-hover:bg-[#C8102E]" />
              <div className="text-[0.98rem] text-black">{to}</div>
            </div>
          ))}
          {t.rows.length > 3 ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-5 text-[10px] uppercase tracking-[0.24em] text-black/50 transition-colors hover:text-black"
              style={{ fontFamily: MONO }}
            >
              {open ? "Show fewer" : `Show all ${t.rows.length}`}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <div className="mt-14">
      <div className="relative">
        <span aria-hidden className="absolute left-0 right-0 top-[26px] hidden h-px bg-black/12 lg:block" />
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] lg:gap-8 [&::-webkit-scrollbar]:hidden">
          {TERMS.map((t, i) => (
            <article
              key={t.term}
              className="w-[76vw] shrink-0 snap-start sm:w-[52vw] lg:w-[calc((100%-4rem)/3)]"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="size-[7px] rounded-full bg-[#C8102E]" />
                <span
                  className="text-[10px] uppercase tracking-[0.26em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  Term {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 border-t border-black/12 pt-5">
                <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.015em]">{t.title}</h3>
                <ul className="mt-4 space-y-1.5">
                  {t.items.map((item) => (
                    <li key={item} className="text-[0.88rem] leading-[1.55] text-black/55">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.24em] text-black/40" style={{ fontFamily: MONO }}>
        Scroll horizontally →
      </p>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

function Page() {
  const maxCtc = 55;

  return (
    <main className="min-h-screen bg-[#F7F7F5] pb-20 text-black" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#contact" />
      <TopNav />

      {/* ------------------------------- HERO ------------------------------- */}
      <Chapter id="top" className="pt-10 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Label>Careers / Placements — Outcomes 2025</Label>
            <Headline as="h1" className="mt-8 max-w-[13ch] text-[clamp(3rem,8.4vw,7.5rem)] leading-[0.92]">
              Accelerate your career growth.
            </Headline>
            <p className="mt-10 max-w-[58ch] text-[17px] leading-[1.75] text-black/60">
              Placements at Masters&apos; Union are not a season — they are a continuous, four-year-long
              career-building process. Benefit from an exceptional track record of our graduates&apos;
              success: audited, published, and repeated across five cohorts.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <TextCta href="#outcomes">Explore outcomes</TextCta>
              <a
                href="#contact"
                className="text-[11px] uppercase tracking-[0.22em] text-black/50 transition-colors hover:text-black"
                style={{ fontFamily: MONO }}
              >
                Talk to the placement team
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full overflow-hidden bg-black/5">
              <img
                src={heroImage.url}
                alt="Masters' Union students at work on campus"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover grayscale-[0.35] transition duration-700"
              />
            </div>
          </div>
        </div>

        {/* hero statistics */}
        <div className="mt-16 border-t border-black/12 lg:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <Rise
                key={s.label}
                delay={i * 70}
                className={
                  "border-b border-black/12 px-0 py-8 lg:border-b-0 lg:py-10 " +
                  (i % 2 === 1 ? "pl-6 " : "pr-6 ") +
                  (i > 0 ? "lg:border-l lg:border-black/12 lg:pl-8 lg:pr-6" : "lg:pr-8")
                }
              >
                <div className="text-[clamp(1.9rem,3.6vw,3.1rem)] leading-none tracking-[-0.045em]">
                  <CountUp value={s.value} />
                </div>
                <div
                  className="mt-5 max-w-[22ch] text-[10px] uppercase leading-[1.6] tracking-[0.22em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {s.label}
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </Chapter>

      {/* --------------------------- FEATURED STORY -------------------------- */}
      <Chapter surface="white" className="mt-16 border-y border-black/10 py-16 lg:mt-24 lg:py-24">
        <Rise>
          <StoryFeature />
        </Rise>
      </Chapter>

      {/* --------------------------- PREPARATION ---------------------------- */}
      <Chapter className="py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Label>Placement philosophy</Label>
            <Headline className="mt-7 max-w-[16ch]">Built for the top 1%, term by term.</Headline>
          </div>
          <div className="lg:col-span-6 lg:pt-16">
            <p className="max-w-[62ch] text-[17px] leading-[1.75] text-black/60">
              Preparation begins in Term 1 and never pauses. Every student is assigned a mentor, a
              domain track and a recruiter set — then coached against it until an offer lands.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-black/12">
          {PREP_PRINCIPLES.map((p, i) => (
            <Rise key={p.n} delay={i * 60}>
              <div className="group grid grid-cols-1 gap-4 border-b border-black/12 py-8 md:grid-cols-12 md:gap-10">
                <div
                  className="text-[10px] uppercase tracking-[0.26em] text-black/40 md:col-span-1"
                  style={{ fontFamily: MONO }}
                >
                  {p.n}
                </div>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] md:col-span-4">
                  {p.title}
                </h3>
                <p className="max-w-[62ch] text-[16px] leading-[1.7] text-black/60 md:col-span-7">
                  {p.note}
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </Chapter>

      {/* ------------------------- PROVEN OUTCOMES -------------------------- */}
      <Chapter id="outcomes" surface="white" className="border-y border-black/10 py-16 lg:py-24">
        <Label>Outcomes / Five years audited</Label>
        <Headline className="mt-7 max-w-[18ch]">Proven outcomes, verified line by line.</Headline>
        <p className="mt-8 max-w-[64ch] text-[17px] leading-[1.75] text-black/60">
          Our placement reports are audited by Brickworks — auditor for IIM Ahmedabad — and follow the
          IPRS Revision 2.2 framework for transparent, consistent compensation data.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
          {AUDIT_STATS.map((s, i) => (
            <Rise
              key={s.suffix}
              delay={i * 80}
              className={
                "border-t border-black/12 py-10 md:py-12 " +
                (i > 0 ? "md:border-l md:border-black/12 md:pl-10" : "md:pr-10")
              }
            >
              <div className="text-[clamp(2.6rem,6vw,5rem)] leading-none tracking-[-0.05em]">
                <CountUp value={s.value} />
              </div>
              <div
                className="mt-6 text-[10px] uppercase tracking-[0.24em] text-black/50"
                style={{ fontFamily: MONO }}
              >
                {s.suffix}
              </div>
              <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.65] text-black/55">{s.note}</p>
            </Rise>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/12 pt-8">
          <span className="text-[10px] uppercase tracking-[0.26em] text-black/40" style={{ fontFamily: MONO }}>
            Reports
          </span>
          {REPORT_YEARS.map((y) => (
            <span
              key={y}
              className="text-[11px] uppercase tracking-[0.2em] text-black/60"
              style={{ fontFamily: MONO }}
            >
              Cohort {y}
            </span>
          ))}
        </div>
      </Chapter>

      {/* --------------------------- MANIFESTO ------------------------------ */}
      <Chapter surface="ink" className="py-24 lg:py-36">
        <Label tone="dark">Placement philosophy</Label>
        <Rise>
          <blockquote className="mt-12 max-w-[24ch] text-balance text-[clamp(2rem,5.2vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            “We don&apos;t approach placements the way most B-schools do.”
          </blockquote>
        </Rise>
        <p className="mt-14 max-w-[58ch] text-[17px] leading-[1.8] text-white/55">
          At Masters&apos; Union, placements are run by a 50+ member, full-time team spanning company
          outreach, career preparation, and role-specific coaching.
        </p>
        <p className="mt-12 text-[10px] uppercase tracking-[0.26em] text-white/45" style={{ fontFamily: MONO }}>
          Pratham Mittal — Founder &amp; CEO, Masters&apos; Union
        </p>
      </Chapter>

      {/* --------------------------- SALARY STORY --------------------------- */}
      <Chapter id="salaries" className="py-16 lg:py-24">
        <Label>Salary outcomes / Cohort averages</Label>
        <Headline className="mt-7 max-w-[22ch]">
          ₹29.12L, ₹33.10L and ₹34.07L — cohort averages that surpassed top B-schools.
        </Headline>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Rise>
            <BarSeries data={TBM_SERIES} max={38} caption="PGP TBM — average CTC" />
          </Rise>
          <Rise delay={90}>
            <BarSeries data={YLC_SERIES} max={38} caption="PGP TBM YLC — average CTC" />
          </Rise>
        </div>

        <p className="mt-10 max-w-[70ch] text-[15px] leading-[1.75] text-black/50">
          Reports available for Cohorts 2021–2024, verified and audited by Brickworks Analytics,
          auditor for IIM Ahmedabad&apos;s placement report.
        </p>
      </Chapter>

      {/* ------------------------- DISTRIBUTION ----------------------------- */}
      <Chapter surface="white" className="border-y border-black/10 py-16 lg:py-24">
        <Label>Salary distribution — PGP TBM</Label>
        <Headline className="mt-7 max-w-[18ch]">
          The full distribution, not just the headline number.
        </Headline>

        <div className="mt-14 border-t border-black/12">
          {TBM_TABLE.map((r) => (
            <DistributionRow key={r.cohort} row={r} max={maxCtc} />
          ))}
        </div>

        <div
          className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[9px] uppercase tracking-[0.2em] text-black/45"
          style={{ fontFamily: MONO }}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-[3px] w-8 bg-black/25" /> Bottom 25% → Top 25%
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-4 w-px bg-[#C8102E]" /> Average
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-4 w-px bg-black/55" /> Median
          </span>
        </div>

        {/* salary components */}
        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-black/12 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Label>Salary components — Cohort &apos;24</Label>
            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.7] text-black/60">
              How packages are structured between in-hand cash components and stock options, counting
              Year 1 vesting only.
            </p>
          </div>
          <div className="lg:col-span-8">
            {SALARY_COMPONENTS.map((c, i) => (
              <div key={c.label} className="border-b border-black/10 py-6">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-[1rem] tracking-[-0.01em]">{c.label}</span>
                  <span className="text-[1.4rem] tracking-[-0.03em]">{c.pct}%</span>
                </div>
                <div className="mt-4 h-px w-full bg-black/10">
                  <div
                    className="h-px bg-black transition-[width] duration-700"
                    style={{ width: `${c.pct}%`, transitionDelay: `${i * 80}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* --------------------------- HIRING --------------------------------- */}
      <Chapter id="hiring" className="py-16 lg:py-24">
        <Label>Hiring ecosystem</Label>
        <Headline className="mt-7 max-w-[16ch]">Six categories. One hiring calendar.</Headline>
        <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.75] text-black/60">
          Recruiters are worked year-round across six categories — each with its own outreach cycle,
          role set and preparation track.
        </p>

        <div className="mt-14">
          <HiringCalendar />
          <EmployerIndex />
        </div>
      </Chapter>

      {/* ---------------------- ORIGINS & DESTINATIONS ---------------------- */}
      <Chapter surface="white" className="border-y border-black/10 py-16 lg:py-24">
        <Label>Career transitions</Label>
        <Headline className="mt-7 max-w-[20ch]">Where students come from, and where they go.</Headline>

        <div className="mt-16 space-y-14">
          {TRANSITIONS.map((t) => (
            <TransitionBlock key={t.title} t={t} />
          ))}
        </div>
      </Chapter>

      {/* ----------------------------- VOICES -------------------------------- */}
      <Chapter className="py-16 lg:py-24">
        <Label>In their words</Label>
        <Headline className="mt-7 max-w-[18ch]">Hear straight from our alumni.</Headline>

        <div className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALUMNI.map((a) => (
            <figure
              key={a.name}
              className="w-[80vw] shrink-0 snap-start border-t border-black/12 pt-6 sm:w-[46vw] lg:w-[30rem]"
            >
              <blockquote className="text-[1.15rem] leading-[1.5] tracking-[-0.015em] text-black/85">
                “{a.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <div className="text-[0.98rem] font-medium">{a.name}</div>
                <div
                  className="mt-1 text-[10px] uppercase tracking-[0.2em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {a.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 border-t border-black/12 pt-10">
          <Label>Student placement experience — 39 stories, selected</Label>
          <div className="mt-10 grid grid-cols-1 gap-x-14 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border-b border-black/10 py-6">
                <div className="text-[0.98rem] font-medium leading-tight">{t.name}</div>
                <div
                  className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {t.role}
                </div>
                <p className="mt-3 text-[0.9rem] leading-[1.65] text-black/60">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* -------------------------- ROADMAP --------------------------------- */}
      <Chapter id="roadmap" surface="white" className="border-y border-black/10 py-16 lg:py-24">
        <Label>Career roadmap</Label>
        <Headline className="mt-7 max-w-[16ch]">Eight terms. One continuous career roadmap.</Headline>
        <Roadmap />
      </Chapter>

      {/* ------------------------ INDUSTRY READINESS ------------------------ */}
      <Chapter id="readiness" className="py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Label>Industry readiness</Label>
            <Headline className="mt-7 max-w-[12ch]">Making you industry ready.</Headline>
            <div className="mt-10 aspect-[4/3] w-full overflow-hidden bg-black/5">
              <img
                src={readinessImage.url}
                alt="Students working on a live industry project"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[0.4]"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            {COACH_TRACKS.map((c, i) => (
              <div key={c.title} className="border-t border-black/12 py-8">
                <div
                  className="text-[10px] uppercase tracking-[0.26em] text-black/40"
                  style={{ fontFamily: MONO }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-[1.3rem] font-semibold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-3 max-w-[54ch] text-[16px] leading-[1.7] text-black/60">{c.note}</p>
              </div>
            ))}

            <div className="mt-10 border-t border-black/12 pt-8">
              <Label>Dedicated career coaches</Label>
              <div className="mt-6">
                {COACHES.map((c) => (
                  <div
                    key={c.name}
                    className="grid grid-cols-1 gap-1 border-b border-black/10 py-4 md:grid-cols-12 md:items-baseline md:gap-6"
                  >
                    <div className="text-[0.98rem] font-medium md:col-span-4">{c.name}</div>
                    <div className="text-[0.92rem] text-black/55 md:col-span-6">{c.role}</div>
                    <div
                      className="text-[9px] uppercase tracking-[0.2em] text-black/45 md:col-span-2 md:text-right"
                      style={{ fontFamily: MONO }}
                    >
                      {c.exp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ventures, competitions, live projects, creators */}
        <div className="mt-20 border-t border-black/12 pt-12">
          <Label>Startups founded by MU students</Label>
          <div className="mt-10 grid grid-cols-1 gap-x-14 md:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((v) => (
              <div key={v.name} className="border-b border-black/10 py-6">
                <div className="text-[1rem] font-medium leading-tight">{v.name}</div>
                <div
                  className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {v.founder}
                </div>
                <p className="mt-3 text-[0.9rem] leading-[1.65] text-black/60">{v.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <Label>Case competition wins</Label>
              <div className="mt-8">
                {COMPETITIONS.map((c) => (
                  <div key={c.what} className="border-b border-black/10 py-5">
                    <div className="text-[0.98rem] font-medium">{c.what}</div>
                    <div
                      className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
                      style={{ fontFamily: MONO }}
                    >
                      {c.who}
                    </div>
                    <p className="mt-2 text-[0.9rem] leading-[1.65] text-black/60">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Live projects</Label>
              <div className="mt-8">
                {LIVE_PROJECTS.map((p) => (
                  <div key={p.name} className="border-b border-black/10 py-5">
                    <div className="text-[0.98rem] font-medium">{p.name}</div>
                    <p className="mt-2 text-[0.9rem] leading-[1.65] text-black/60">{p.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Label>Student content creators</Label>
                <div className="mt-8">
                  {CREATORS.map((c) => (
                    <div
                      key={c.name}
                      className="grid grid-cols-1 gap-1 border-b border-black/10 py-4 md:grid-cols-12 md:items-baseline md:gap-4"
                    >
                      <div className="text-[0.95rem] font-medium md:col-span-5">{c.handle}</div>
                      <div className="text-[0.88rem] text-black/55 md:col-span-7">
                        {c.name} · {c.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-black/12 pt-10">
            <Label>Your future recruiters on campus</Label>
            <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.75] text-black/60">
              CEOs and MDs, CHROs, unicorn founders and senior executives teach, mentor and recruit on
              campus.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-14 md:grid-cols-2 lg:grid-cols-3">
              {LEADERS.map((l) => (
                <div key={l.name} className="border-b border-black/10 py-4">
                  <div className="text-[0.95rem] font-medium leading-tight">{l.name}</div>
                  <div
                    className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/45"
                    style={{ fontFamily: MONO }}
                  >
                    {l.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Chapter>

      {/* ------------------------ PLACEMENT TEAM ---------------------------- */}
      <Chapter surface="white" className="border-y border-black/10 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Label>Outcome support</Label>
            <Headline className="mt-7 max-w-[14ch]">
              A 50+ member team, working full time on your outcome.
            </Headline>
            <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.75] text-black/60">
              Company outreach, career preparation and role-specific coaching sit under one roof — so
              no student is left to find a job alone.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <TextCta href="mailto:careerservices@mastersunion.org">
                careerservices@mastersunion.org
              </TextCta>
              <span
                className="text-[11px] uppercase tracking-[0.22em] text-black/45"
                style={{ fontFamily: MONO }}
              >
                Internship report
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/11] w-full overflow-hidden bg-black/5">
              <img
                src={teamImage.url}
                alt="Masters' Union career services team on campus"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[0.35]"
              />
            </div>
          </div>
        </div>
      </Chapter>

      {/* ------------------------------ CTA --------------------------------- */}
      <Chapter id="contact" surface="ink" className="py-24 lg:py-36">
        <Label tone="dark">Next step</Label>
        <Headline className="mt-10 max-w-[14ch] text-[clamp(2.5rem,6.4vw,5.5rem)]">
          Your next career move starts here.
        </Headline>
        <p className="mt-10 max-w-[56ch] text-[17px] leading-[1.8] text-white/55">
          Five years of audited outcomes, six recruiter categories and a career roadmap that runs from
          Term 1 to your first day on the job.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
          <TextCta href="/" tone="dark">
            Explore Masters&apos; Union
          </TextCta>
          <a
            href="mailto:careerservices@mastersunion.org"
            className="text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white"
            style={{ fontFamily: MONO }}
          >
            Talk to the team
          </a>
        </div>
        <Rule tone="dark" className="mt-20" />
        <p className="mt-6 text-[10px] uppercase tracking-[0.26em] text-white/35" style={{ fontFamily: MONO }}>
          Masters&apos; Union — Careers &amp; Placements
        </p>
      </Chapter>
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
