import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, Plus, Minus, Check, Star } from "lucide-react";
import logoAsset from "@/assets/logo-2.png.asset.json";
import heroBuilding from "@/assets/hero-building-light.webp";

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

const NAV = ["Programmes", "Faculty", "Admissions", "Campus", "About"];

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

// -------- Curriculum (verbatim from the 2026 programme sheet) --------

const TERMS = [
  {
    label: "Term 1",
    title: "Business Foundations",
    body: "Business fundamentals, economics and quantitative methods, taught alongside the Dropshipping Fair — where cohort teams build and run a live e-commerce business from Day 1.",
    ship: "A live D2C brand with real revenue",
    tags: ["Fundamentals", "Economics", "Quant Methods", "Dropshipping Fair"],
  },
  {
    label: "Term 2",
    title: "Marketing & Capital",
    body: "Marketing, consumer behaviour and corporate finance — anchored by the Content Creator Challenge, where every student launches a real YouTube or Instagram brand.",
    ship: "A shipping creator brand + audited P&L",
    tags: ["Marketing", "Consumer Behaviour", "Corp Finance", "Creator Challenge"],
  },
  {
    label: "Term 3",
    title: "Strategy & Operations",
    body: "Strategy, operations and one-day corporate challenges set by partner CEOs, paired with the Student Investment Fund — real capital, real trades, real P&L reporting.",
    ship: "Live portfolio + corporate challenge wins",
    tags: ["Strategy", "Operations", "SIF", "Corporate Challenges"],
  },
  {
    label: "Term 4",
    title: "Ventures & Global Immersion",
    body: "The Venture Initiation Programme (VIP) — build and pitch a capstone venture — combined with the global immersion module.",
    ship: "A pitched capstone venture + global module",
    tags: ["Entrepreneurship", "VIP", "Global Immersion", "Capstone"],
  },
  {
    label: "Internship",
    title: "3-Month Industry Placement",
    body: "A three-month full-time internship with leading Indian and global companies — from consumer, tech and finance operators to venture funds and startups.",
    ship: "Full-time internship with a leading company",
    tags: ["Internship", "Placement Support", "Leading Companies"],
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const deadline = new Date("2026-08-15T23:59:59+05:30");
  const { d, h, m, s } = useCountdown(deadline);

  return (
    <main className="min-h-screen pastel-gradient text-[color:var(--ink)] pb-24 md:pb-0">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between border border-black/10 bg-white/80 px-2 py-1.5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 px-2.5 py-1">
            <img src={logoAsset.url} alt="Masters' Union" className="h-5 w-auto" />
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="px-3 py-1.5 text-[12px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <a href="#apply" className="bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] pastel-fill">Apply</a>
            <button type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)} className="flex size-8 items-center justify-center text-black/60 hover:bg-black/5 md:hidden">
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

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
                <div key={f.k} className="bg-[color:var(--cream)] p-4">
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
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">
            The school behind the programme
          </div>
          <div className="mt-6 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOOL_STATS.map((st) => (
              <div key={st.v} className="bg-white p-6">
                <div className="font-display text-[38px] leading-none tracking-tight">{st.k}</div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60">{st.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY / PILLARS */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Why this programme exists</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              A business school rebuilt around one idea: <em className="italic text-black/60">ship things.</em>
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <article key={p.title} className="bg-white p-6 pastel-fill">
                <div className="font-display text-[36px] leading-none text-black/25">{p.tag}</div>
                <h3 className="mt-6 font-display text-[18px] leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-black/70">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Curriculum · 16 months</div>
              <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Four terms. One internship. Something shipped every one.
              </h2>
            </div>
          </div>
          <ol className="space-y-px bg-black/10">
            {TERMS.map((t, i) => (
              <li key={t.label} className="grid gap-4 bg-white p-6 md:grid-cols-[90px_200px_1fr_260px] md:items-start md:gap-8 md:p-8">
                <div className="font-display text-[42px] leading-none text-black/25">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{t.label}</div>
                  <div className="mt-2 font-display text-[20px] leading-tight">{t.title}</div>
                </div>
                <p className="text-[14px] leading-relaxed text-black/70">{t.body}</p>
                <div className="flex flex-col gap-3">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">You ship</div>
                    <div className="text-[13px] text-black/80">{t.ship}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span key={tag} className="border border-black/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black/70">{tag}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Signature learning experiences</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              The six things you'll actually do — not just study.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNATURE.map((sg) => (
              <div key={sg.k} className="bg-white p-6 pastel-fill">
                <div className="font-display text-[20px] leading-tight">{sg.k}</div>
                <div className="mt-2 text-[13px] text-black/65">{sg.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">The 30·30·40 faculty model</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              30% Ivy academics. 30% research faculty. 40% sitting operators.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {FACULTY.map((f) => (
              <div key={f.name} className="bg-white p-6 pastel-fill">
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
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Admissions · Cohort 2026</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              From application to campus, in five steps.
            </h2>
          </div>
          <ol className="grid gap-px bg-black/10 md:grid-cols-5">
            {TIMELINE.map((t, i) => (
              <li key={t.t} className="bg-white p-5 pastel-fill">
                <div className="font-display text-[28px] leading-none text-black/30">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55">{t.d}</div>
                <div className="mt-1 font-display text-[15px] leading-tight text-black/85">{t.t}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">FAQ</div>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.02em]">
              Everything you were about to email us.
            </h2>
          </div>
          <div className="border-t border-black/10">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-black/10">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="font-display text-[18px] leading-tight">{f.q}</span>
                    <span className="flex size-8 items-center justify-center border border-black/15 text-black/70">
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  {open && <p className="pb-6 pr-14 text-[14px] leading-relaxed text-black/70">{f.a}</p>}
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

      {/* STICKY APPLY BAR — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-black/10 bg-white/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">R1 closes in</div>
            <div className="font-display text-[16px] leading-none tabular-nums">{d}d {String(h).padStart(2,"0")}h {String(m).padStart(2,"0")}m</div>
          </div>
          <a href="#apply" className="inline-flex items-center gap-2 bg-black px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            Apply <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      {/* STICKY DESKTOP RAIL */}
      <div className="fixed bottom-6 right-6 z-[90] hidden items-center gap-3 border border-black/10 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl md:flex">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/50">R1 closes in</div>
          <div className="font-display text-[16px] leading-none tabular-nums">{d}d {String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</div>
        </div>
        <a href="#apply" className="inline-flex items-center gap-2 bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white pastel-fill">
          Apply now <ArrowUpRight className="size-4" />
        </a>
      </div>
    </main>
  );
}
