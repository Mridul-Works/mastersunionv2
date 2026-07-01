import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Hourglass, Quote, GraduationCap, Rocket, Briefcase, Users, Mic, ChefHat, Building2, Instagram, Linkedin, Youtube, Twitter, ShoppingCart } from "lucide-react";

import { Link } from "@tanstack/react-router";
import founderPhoto from "@/assets/founder-pratham.jpg.asset.json";
import logoWhite from "@/assets/logo-4.png.asset.json";
import pathwaySchool from "@/assets/pathways/school.jpg";
import pathwayCollege from "@/assets/pathways/college.jpg";
import pathwayWork from "@/assets/pathways/work.jpg";
import pathwayOwner from "@/assets/pathways/owner.jpg";

type Programme = { title: string; duration: string; format: string; href?: string };
type Pathway = {
  key: string;
  label: string;
  headline: string;
  subhead: string;
  programmes: Programme[];
  viewAllHref: string;
  theme: string;
  image: string;
};

const PATHWAYS: Pathway[] = [
  {
    key: "school",
    label: "I'm in School",
    headline: "School",
    subhead: "For students in Grade 11 & 12 ready to skip the textbook detour and start building.",
    viewAllHref: "https://mastersunion.org/undergraduate",
    theme: "linear-gradient(135deg, #e8f0f5 0%, #d6e6e8 35%, #f0e6d8 70%, #e6d5c5 100%)",
    image: pathwaySchool,
    programmes: [
      { title: "UG in Technology & Business Management", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Psychology & Marketing", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Data Science & Artificial Intelligence", duration: "4 Yrs", format: "On Campus" },
      { title: "UG in Finance & Economics (CA/CFA Pathway)", duration: "4 Yrs", format: "On Campus" },
      { title: "UG Programme in Design (MUDS)", duration: "4 Yrs", format: "On Campus" },
      { title: "UG Global Track — Illinois Tech, US", duration: "3+1 Yrs", format: "Dual Campus" },
      { title: "UG Global Track — Griffith University, Australia", duration: "2+2 Yrs", format: "Dual Campus" },
      { title: "Bharat Summer Fellowship", duration: "6 Wks", format: "Travel" },
    ],
  },
  {
    key: "college",
    label: "I'm in College",
    headline: "College",
    subhead: "For undergraduates and fresh graduates trading the placement queue for real ventures.",
    viewAllHref: "https://mastersunion.org/postgraduate",
    theme: "linear-gradient(135deg, #f5e6f0 0%, #f7d9c4 25%, #f8e8d4 50%, #d4e6e0 100%)",
    image: pathwayCollege,
    programmes: [
      { title: "PGP in Technology & Business Management — Young Leaders Cohort", duration: "24 Mo", format: "On Campus" },
      { title: "PGP in Applied AI & Agentic Systems", duration: "15 Mo", format: "On Campus" },
      { title: "PGP in UI/UX & AI Product Design", duration: "12 Mo", format: "On Campus" },
      { title: "PGP in Human Resources & Organisation Strategy", duration: "16 Mo", format: "On Campus" },
      { title: "PGP in Sports Management & Gaming", duration: "16 Mo", format: "On Campus" },
      { title: "PGP in Sustainability & Business Management", duration: "16 Mo", format: "On Campus" },
      { title: "PGP Bharat", duration: "24 Wks", format: "Travel + Hybrid" },
      { title: "PGP TBM Summer School", duration: "Summer Intensive", format: "On Campus" },
    ],
  },
  {
    key: "work",
    label: "I'm at Work",
    headline: "Work",
    subhead: "For working professionals levelling up — without pausing the paycheque.",
    viewAllHref: "https://mastersunion.org/executive-education",
    theme: "linear-gradient(135deg, #e6e8f0 0%, #d4dbe8 40%, #c8d5e8 70%, #b8c9e0 100%)",
    image: pathwayWork,
    programmes: [
      { title: "PGP in Technology & Business Management (flagship)", duration: "16 Mo", format: "On Campus" },
      { title: "PGP Rise: General Management", duration: "1 Yr", format: "Blended Weekend" },
      { title: "PGP Rise: General Management (Global)", duration: "1 Yr", format: "Online" },
      { title: "PGP in Capital Markets & Trading", duration: "1 Yr", format: "Online/In-Person Weekend" },
      { title: "Applied Markets & Bloomberg Equity Research", duration: "12–36 Mo", format: "Blended" },
      { title: "Executive Leadership Programme in AI & GCC Transformation", duration: "6 Mo", format: "Weekend" },
      { title: "AI First Operator Programme", duration: "Short-form", format: "Online/Hybrid" },
    ],
  },
  {
    key: "owner",
    label: "I'm a Business Owner",
    headline: "Business Owner",
    subhead: "For founders, promoters and next-gen leaders scaling the business they already run.",
    viewAllHref: "https://mastersunion.org/family-business",
    theme: "linear-gradient(135deg, #f5ebe0 0%, #ede3d5 35%, #e2d2c0 65%, #d6c2b0 100%)",
    image: pathwayOwner,
    programmes: [
      { title: "PGP Rise: Owners & Promoters Management", duration: "1 Yr", format: "Blended Weekend" },
      { title: "PGP in Entrepreneurship & Business Acceleration", duration: "9 Mo", format: "Blended" },
      { title: "D2C Brand Bootcamp", duration: "Short-form", format: "Intensive Bootcamp" },
    ],
  },
];

function Programs() {
  const [activeKey, setActiveKey] = useState<string>(PATHWAYS[0].key);
  const active = PATHWAYS.find((p) => p.key === activeKey) ?? PATHWAYS[0];

  return (
    <section id="programs" className="border-t border-black/10 bg-[#F5F3EE] mt-4 mb-4">
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-6 py-20 md:px-10 md:py-28">
        {/* Editorial intro */}
        <div className="col-span-12 lg:col-span-4">
          <h2 className="mb-8 inline-block border-b border-black pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.32em]">
            Programme Finder
          </h2>
          <h1
            className="mb-6 text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter text-black"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            FIND <br /> YOUR <br />
            <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              Path.
            </span>
          </h1>
          <p className="max-w-xs text-[15px] font-medium leading-snug text-black/75">
            Tell us where you are. We'll tell you where to go next — every Masters' Union programme, organised by who you are today.
          </p>

          {/* Persona switcher (small) */}
          <div className="mt-10 flex flex-wrap gap-2">
            {PATHWAYS.map((p, i) => {
              const isActive = p.key === activeKey;
              return (
                <button
                  key={p.key}
                  onClick={() => setActiveKey(p.key)}
                  className={`border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "border-black bg-black text-[#F5F3EE]"
                      : "border-black/20 bg-transparent text-black hover:border-black"
                  }`}
                >
                  <span className="mr-2 font-mono text-black/40">{String(i + 1).padStart(2, "0")}</span>
                  {p.label.replace("I'm ", "").replace("a ", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial grid */}
        <div className="relative col-span-12 grid grid-cols-1 gap-4 md:grid-cols-5 lg:col-span-8">
          {/* Feature tile — editorial poster */}
          <div
            key={active.key}
            className="group relative col-span-1 flex h-[640px] flex-col overflow-hidden md:col-span-2 border border-black"
            style={{ background: active.theme }}
          >
            <img
              src={active.image}
              alt={active.headline}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center animate-[fadeIn_0.6s_ease-out]"
            />
            {/* Full-height dark scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/55" />

            {/* Top content — small, in the image's negative space */}
            <div className="relative z-10 p-6 md:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/70">
                Currently viewing
              </p>
              <h3
                className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {active.headline}.
              </h3>
            </div>

            {/* Bottom content — compact, sits above the subject */}
            <div className="relative z-10 mt-auto p-6 md:p-8">
              <div className="border-l-2 border-white/40 pl-4">
                <p className="max-w-[32ch] text-[13px] font-medium leading-snug text-white/90">
                  {active.subhead}
                </p>
              </div>
            </div>
          </div>

          {/* Programmes tile — taller, scrollable list */}
          <div className="relative col-span-1 flex h-[640px] flex-col overflow-hidden border border-black bg-[#F5F3EE] p-6 md:col-span-3">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-black/50">
                  Browse the list
                </p>
                <h3
                  className="text-[clamp(1.8rem,3vw,2.5rem)] font-black uppercase leading-[0.9] text-black"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Programmes
                </h3>
              </div>
              <span className="shrink-0 border border-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-black">
                {String(active.programmes.length).padStart(2, "0")} Total
              </span>
            </div>

            <ul className="flex-1 min-h-0 space-y-0 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar]:w-1.5 hover:[scrollbar-width:thin] hover:[&::-webkit-scrollbar-thumb]:bg-black/40">
              {active.programmes.map((pg, i) => (
                <li key={pg.title}>
                  <a
                    href={pg.href ?? active.viewAllHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group/row grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-b border-black/10 py-3 transition hover:border-black"
                  >
                    <span className="mt-1 font-mono text-[10px] text-black/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[13px] font-semibold leading-snug text-black">
                      {pg.title}
                      <span className="mt-1 block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black/45">
                        {pg.duration} · {pg.format}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 opacity-30 transition group-hover/row:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Scroll prompt */}
            <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
              <div className="h-px flex-1 bg-black/10" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
                Scroll to explore
              </span>
              <div className="h-px flex-1 bg-black/10" />
            </div>
          </div>
        </div>

        {/* Admissions · Cohort 2026 — folded into the same section */}
        <div className="col-span-12 mt-24 border-t-2 border-black pt-16">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
                Admissions · Cohort 2026
              </p>
              <h2
                className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[0.95] tracking-tight text-black"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Programmes Accepting
                <br />
                <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Applications.
                </span>
              </h2>
            </div>
            <p className="hidden max-w-[24ch] text-right text-[13px] font-medium leading-snug text-black/60 md:block">
              Round-based deadlines. Rolling reviews. Apply before seats fill.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <article
                key={p.title}
                className="group relative flex cursor-pointer flex-col overflow-hidden bg-[#F5F3EE] p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)]"
              >
                {/* Top accent strip */}
                <div className="absolute top-0 left-0 h-1 w-full bg-black transition-all duration-300 group-hover:h-1.5" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-none bg-black px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-colors group-hover:bg-white group-hover:text-black">
                    {p.mode}
                  </span>
                  <span className="rounded-none border border-black/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/70 transition-colors group-hover:border-white/30 group-hover:text-white/80">
                    {p.duration}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-5 pt-1">
                  <h3
                    className="flex-1 text-[1.2rem] font-medium leading-[1.25] tracking-tight text-black transition-colors group-hover:text-white md:text-[1.25rem]"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <div className="inline-flex w-fit items-center gap-2 border-l-2 border-black/20 pl-3 transition-colors group-hover:border-white/30">
                    <Hourglass className="size-3.5 text-black/60 transition-colors group-hover:text-white/70" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/80 transition-colors group-hover:text-white/80">
                      {p.round}
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="#"
                    className="group/btn inline-flex w-full items-center justify-center gap-2 bg-black px-5 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    Apply Now
                    <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


const NEWS = [
  { tag: "Press", month: "Jun", day: "15", time: "09:00 AM", title: "Masters' Union ranked among India's top new-age B-schools", source: "Forbes India" },
  { tag: "Cohort", month: "May", day: "22", time: "11:30 AM", title: "PGP 2026 applications cross 18,000 — admit rate drops to 4%", source: "Inside MU" },
  { tag: "Founders", month: "Apr", day: "08", time: "02:15 PM", title: "Six student ventures featured on Shark Tank India S5", source: "Sony LIV" },
  { tag: "Faculty", month: "Mar", day: "29", time: "10:00 AM", title: "Kunal Shah joins as Distinguished Practitioner-in-Residence", source: "ET Now" },
];

const PROGRAMS = [
  { mode: "ON CAMPUS", duration: "2 YEARS", title: "PGP in Technology & Business Management", round: "Round 1 Applications Open" },
  { mode: "ON CAMPUS", duration: "1 YEAR", title: "PGP in Quantitative Finance & Business", round: "Round 2 Applications Open" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Technology & Business Management", round: "Round 4 Applications Open" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Psychology & Marketing", round: "Round 4 Applications Open" },
];

const PEDAGOGY = [
  { icon: GraduationCap, tag: "01 · Faculty", title: "Taught by the people building the companies you study.", body: "40% of faculty are sitting CEOs, MDs and CXOs. 30% visiting from Harvard, Wharton, Kellogg and Booth. The slides update on Monday morning.", stats: [{ value: "40%", label: "Industry practitioners" }, { value: "200+", label: "Visiting experts" }, { value: "30%", label: "Ivy-league visiting" }], cta: "Meet the faculty", route: "/faculty" },
  { icon: Rocket, tag: "02 · Entrepreneurship", title: "30+ ventures. ₹593 Cr in combined valuation.", body: "An on-campus venture studio that handles incorporation, hiring, and warm intros to Sequoia, Blume and Y Combinator. Six alumni on Shark Tank India.", stats: [{ value: "30+", label: "Active startups" }, { value: "₹593 Cr", label: "Combined valuation" }, { value: "6", label: "On Shark Tank India" }], cta: "See the startups", route: "/startups" },
  { icon: Briefcase, tag: "03 · Career", title: "100% placement. ₹61.98L highest CTC.", body: "28% of grads join as Founder's Office or Chief of Staff. 3× average pre-MBA salary jump and 10–20% annual growth post-grad.", stats: [{ value: "₹61.98L", label: "Highest CTC" }, { value: "3×", label: "Average salary jump" }, { value: "100%", label: "Placement" }], cta: "Read the report", route: "/placements" },
  { icon: Users, tag: "04 · Mentor Union", title: "500+ operators. Median response under an hour.", body: "Founders mid-build, investors mid-cheque, CMOs mid-quarter. No office hours, no waiting lists — just answers when you need them.", stats: [{ value: "500+", label: "Mentors" }, { value: "<1 hr", label: "Median response" }, { value: "On demand", label: "Always on" }], cta: "Browse mentors", route: "/mentors" },
  { icon: ShoppingCart, tag: "05 · D2C Challenge", title: "Real revenue. Real stores. Real P&L.", body: "Students launch live dropshipping stores and get graded on the market, not the memo. 50 teams. ₹3.38 Cr in cohort revenue. The top store did ₹45L in eight weeks.", stats: [{ value: "₹3.38 Cr", label: "Cohort revenue" }, { value: "₹45L", label: "Top team" }, { value: "50", label: "Live teams" }], cta: "See the scoreboard", route: "/how-we-teach" },
  { icon: Mic, tag: "06 · Creator Challenge", title: "Build your brand. Win the creator challenge.", body: "A full content studio on campus. 150+ active creators, 46M+ aggregate reach, and student-run channels that pay tuition before graduation.", stats: [{ value: "46M+", label: "Aggregate reach" }, { value: "150+", label: "Active creators" }, { value: "100+", label: "Channels built" }], cta: "See the creators", route: "/creator-challenge" },
  { icon: ChefHat, tag: "07 · Food Lab", title: "A commercial kitchen inside a B-school.", body: "Lexi's went from a classroom concept to Gurgaon's highest-rated sandwich brand. FSSAI-certified production line, 4.5★ on Zomato, ₹1 Cr+ ARR.", stats: [{ value: "4.5★", label: "Zomato rating" }, { value: "₹1 Cr+", label: "Student brand ARR" }, { value: "FSSAI", label: "Certified" }], cta: "Tour the lab", route: "/food-lab" },
  { icon: Building2, tag: "08 · MU Ventures", title: "The fund that backs cohorts before convocation.", body: "An in-house venture arm that writes pre-seed cheques into student companies — and opens the door to a 200+ investor network for the next round.", stats: [{ value: "200+", label: "Investor network" }, { value: "Pre-seed", label: "Cheques written" }, { value: "On campus", label: "Venture arm" }], cta: "Pitch the fund", route: "/startups" },
] as const;

export default function HomeSections() {
  return (
    <div className="bg-white text-black" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* NEWS */}
      <section id="news" className="border-t border-black/10">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-18">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60 mb-1">The Dispatch</p>
              <h2 className="font-display text-[1.35rem] font-bold leading-tight text-black md:text-[1.8rem]">
                Latest News
              </h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                <ChevronLeft className="size-4 text-black/60" />
              </button>
              <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                <ChevronRight className="size-4 text-black/60" />
              </button>
            </div>
          </div>

          <div className="flex flex-nowrap gap-4 overflow-x-auto snap-x md:overflow-x-visible md:gap-6">
            {NEWS.map((n) => (
              <article
                key={n.title}
                className="group flex min-w-[300px] flex-1 cursor-pointer snap-start gap-5 p-5 transition-all hover:bg-black/[0.03] md:min-w-0"
              >
                <div className="flex h-16 w-14 flex-shrink-0 flex-col items-center justify-center bg-black text-white shadow-sm transition-colors group-hover:bg-neutral-700">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-tighter opacity-80">{n.month}</span>
                  <span className="font-display text-2xl font-extrabold leading-none">
                    {n.day}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    {n.time} &bull; {n.tag}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug text-black/90 transition-colors group-hover:text-black">
                    {n.title}
                  </h3>
                  <p className="font-sans mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Source: {n.source}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="font-sans border-b-2 border-black pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-black/50 hover:text-black/60"
            >
              Enter Full Archive
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <Programs />

      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-6 md:px-10 md:py-8">
          <div className="relative overflow-hidden rounded-none min-h-[520px] md:min-h-[640px]">
            <img
              src={founderPhoto.url}
              alt="Pratham Mittal speaking at Masters' Union"
              loading="lazy"
              width={1920}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-end p-6 md:min-h-[640px] md:p-8 lg:p-12">
              <div className="max-w-[34ch]">
                <Quote className="mb-4 size-6 text-white/60" />
                <h2 className="text-2xl leading-[1.1] tracking-tight text-white md:text-3xl lg:text-[34px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  "If education was working, we wouldn't have built&nbsp;<span className="italic text-white/80" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>Masters' Union.</span>"
                </h2>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-10 bg-white/40" />
                  <div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Pratham Mittal</p>
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/60">Founder, Masters' Union</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The pedagogy" title={<>How Masters' Union <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>actually</span> teaches.</>} lede="Eight systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              const featured = i === 0;
              return (
                <Link
                  key={p.tag}
                  to={p.route}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-none border border-black/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:p-10 ${
                    featured ? "lg:col-span-2 lg:row-span-1" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-none ${featured ? "bg-black text-white" : "bg-black/5 text-black/70"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">{p.tag}</span>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-[1.6rem] font-medium leading-[1.15] tracking-tight text-black md:text-[1.85rem]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[14px] leading-relaxed text-black/65">{p.body}</p>
                  </div>

                  {p.stats && (
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-black/10 pt-5">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <div className="text-[21px] font-semibold tracking-tight text-black">{s.value}</div>
                          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="mt-10 inline-flex w-full items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
                    {p.cta}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src={logoWhite.url}
                alt="Masters' Union"
                className="h-12 w-auto brightness-0 invert md:h-14"
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
            <span>© 2026 Masters' Union Education Pvt. Ltd.</span>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white/80">Privacy</a>
              <a href="#" className="hover:text-white/80">Terms</a>
              <a href="#" className="hover:text-white/80">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, lede, icon: Icon }: { eyebrow: string; title: React.ReactNode; lede: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-4 text-black/70" />}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">{eyebrow}</p>
        </div>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[0.95] tracking-tight text-black md:text-[clamp(2.5rem,5vw,4rem)]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-black/60">{lede}</p>
    </div>
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
