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
          "16 months. ₹32.4L median CTC. 94% placed in 60 days. Taught by CEOs, founders and operators. Applications for Cohort 2026 are open.",
      },
      { property: "og:title", content: "PGP in Technology & Business Management — Masters' Union" },
      { property: "og:description", content: "₹32.4L median CTC. 94% placed in 60 days. Built by operators, for operators." },
    ],
  }),
  component: PgpTbm,
});

const NAV = ["Programmes", "Faculty", "Admissions", "Campus", "About"];

// -------- Outcome-first data --------

const HERO_STATS = [
  { k: "₹32.4L", v: "Median CTC" },
  { k: "₹1.05Cr", v: "Highest CTC" },
  { k: "94%", v: "Placed in 60 days" },
  { k: "220+", v: "Recruiters on campus" },
];

const OUTCOMES = [
  { k: "₹32.4 L", v: "Median CTC", note: "Cohort '25 · verified by third-party audit" },
  { k: "₹52 L", v: "Top 10% CTC", note: "Consulting, PE, product leadership" },
  { k: "₹1.05 Cr", v: "Highest CTC", note: "International strategy role" },
  { k: "94%", v: "Placed within 60 days", note: "Of the eligible cohort" },
  { k: "38%", v: "Non-linear roles", note: "Founder / PE / VC / product" },
  { k: "3.2×", v: "Average salary jump", note: "Vs. pre-programme CTC" },
];

const ROLES = [
  "Consulting Associate", "Product Manager", "Investment Banker",
  "PE / VC Associate", "Founder's Office", "Growth Lead",
  "Strategy Manager", "Trading Analyst", "AI Product Lead",
];

const RECRUITERS = [
  "BCG", "McKinsey", "Bain", "Accenture Strategy", "Kearney",
  "JP Morgan", "Nomura", "Goldman Sachs",
  "Google", "Microsoft", "Amazon", "Flipkart",
  "Zomato", "Swiggy", "Nykaa", "CRED", "Sequoia", "Peak XV",
];

const ALUMNI = [
  {
    name: "Aarav Sinha",
    role: "Consultant, BCG",
    ctc: "₹36 L",
    quote:
      "I walked in with a commerce degree. I walked out with a consulting offer, a live D2C brand doing 8L/month, and the confidence to actually run a P&L.",
  },
  {
    name: "Ishita Rao",
    role: "APM, Google",
    ctc: "₹48 L",
    quote:
      "By the end of semester 3, I had shipped an AI product with 4,000 users. That was the interview.",
  },
  {
    name: "Kabir Mehta",
    role: "Founder, Loomly (Seed: $1.2M)",
    ctc: "Raised · Peak XV",
    quote:
      "Masters' Union didn't teach me entrepreneurship. It gave me capital, mentors, and a room full of people I'd hire tomorrow.",
  },
];

const WHY = [
  {
    tag: "01",
    title: "Operators, not lecturers",
    body: "220+ CEOs, founders and VCs teach the core curriculum. Zero lifetime academics.",
  },
  {
    tag: "02",
    title: "Ship, don't submit",
    body: "You'll run a real D2C brand, a creator business, and an AI product with real users — graded on outcomes.",
  },
  {
    tag: "03",
    title: "Capital as a language",
    body: "Trade real portfolios, model live deals, and pitch real investors from week one.",
  },
  {
    tag: "04",
    title: "Placements as a floor",
    body: "₹32.4L median, 94% placed in 60 days. The outcome is the baseline, not the pitch.",
  },
];

const SEMESTERS = [
  {
    label: "Semester 1",
    title: "Foundations & Ventures",
    body: "Business fundamentals, accounting, statistics, product thinking, and the D2C Challenge — you launch and run a real dropshipping business with your cohort.",
    ship: "Live D2C business with revenue on the record",
    tags: ["Accounting", "Stats", "Product 101", "D2C Challenge"],
  },
  {
    label: "Semester 2",
    title: "Capital & Markets",
    body: "Live trading desk, corporate finance, marketing and consumer psychology. Cohort splits into venture teams.",
    ship: "Managed portfolio + venture MVP",
    tags: ["Trading Desk", "Corp Fin", "Marketing", "Consumer Psych"],
  },
  {
    label: "Semester 3",
    title: "Tech, AI & Strategy",
    body: "Applied AI, product management, data engineering, strategy consulting simulations. Ship an AI product with 100+ users.",
    ship: "AI product with 100+ real users",
    tags: ["Applied AI", "PM", "Strategy Sims", "Data Eng"],
  },
  {
    label: "Semester 4",
    title: "Specialisation & Placement",
    body: "Choose a track — Consulting, Product, Finance, Founder — with a capstone under an industry mentor, then placements.",
    ship: "Capstone under an operator mentor + placement",
    tags: ["Consulting", "Product", "Finance", "Founder Track"],
  },
];

const FACULTY = [
  { name: "Kunal Shah", role: "Founder, CRED", tag: "Consumer Behaviour" },
  { name: "Deepinder Goyal", role: "Founder, Zomato", tag: "Building at Scale" },
  { name: "Nithin Kamath", role: "Founder, Zerodha", tag: "Capital Markets" },
  { name: "Ronnie Screwvala", role: "Founder, upGrad, UTV", tag: "Media & Ventures" },
  { name: "Radhika Gupta", role: "CEO, Edelweiss AMC", tag: "Asset Management" },
  { name: "Anand Chandrasekaran", role: "GM, Meta", tag: "Product Leadership" },
];

const TIMELINE = [
  { d: "15 Aug 2026", t: "Round 1 application deadline" },
  { d: "22 Aug 2026", t: "Aptitude assessment" },
  { d: "5 Sep 2026", t: "Operator interview" },
  { d: "20 Sep 2026", t: "Admit decision" },
  { d: "10 Aug 2026", t: "Cohort begins on campus" },
];

const FEES = [
  { label: "Programme Fee", value: "₹40.5 L", note: "All-inclusive, 16 months" },
  { label: "0% EMI Financing", value: "Available", note: "Partner banks, no collateral" },
  { label: "Scholarships", value: "up to 100%", note: "Merit + need based" },
];

const FAQ = [
  { q: "Who is this programme for?", a: "Graduates with 0–4 years of experience who want to build ventures or land top consulting, PE, product and tech roles. STEM, commerce, and liberal arts backgrounds are all welcome." },
  { q: "How is this different from a traditional MBA?", a: "No lifetime academics. No case-study-only pedagogy. You ship real ventures, trade real capital, and build real products — graded on outcomes, not participation." },
  { q: "Do I need CAT or GMAT?", a: "No. Admission is via our own aptitude assessment and an operator interview. Rolling rounds until the cohort fills." },
  { q: "Where is the campus?", a: "DLF Cyberpark, Gurugram — inside a live business district, walking distance from partner offices." },
  { q: "What is the average salary jump?", a: "3.2× versus pre-programme CTC across the last three cohorts (audited)." },
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
    <main className="min-h-screen bg-[color:var(--cream)] text-[color:var(--ink)] pb-24 md:pb-0">
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

      {/* HERO — outcome first */}
      <section className="relative overflow-hidden border-b border-black/10 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pb-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60">
              <span className="inline-flex items-center gap-2 border border-black/15 bg-white/70 px-3 py-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cohort 2026 · Applications open
              </span>
              <span className="inline-flex items-center gap-1 border border-black/15 bg-white/70 px-3 py-1">
                <Star className="size-3 fill-current" /> India's #1 new-age B-school · Outlook 2025
              </span>
            </div>

            <div>
              <h1 className="font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[0.98] tracking-[-0.03em]">
                ₹32.4L median CTC.
                <br />
                <span className="text-black/50">94% placed in 60 days.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-black/70">
                The PGP in Technology & Business Management is a 16-month, on-campus programme
                built by operators — for people who intend to run companies, not just work at them.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#apply" className="inline-flex items-center gap-2 bg-black px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02] pastel-fill">
                Start application <ArrowUpRight className="size-4" />
              </a>
              <a href="/brochure.pdf" className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-black hover:bg-black/5">
                Download brochure ↓
              </a>
              <div className="flex items-center gap-2 text-[11px] text-black/55">
                <Check className="size-3.5" /> No CAT / GMAT · 15 min to apply
              </div>
            </div>

            {/* Countdown */}
            <div className="border border-black/10 bg-white/70 p-4 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">Round 1 closes in</div>
              <div className="mt-2 flex items-baseline gap-4 font-display">
                {[
                  ["Days", d], ["Hrs", h], ["Min", m], ["Sec", s],
                ].map(([lbl, val]) => (
                  <div key={lbl as string} className="flex items-baseline gap-1">
                    <span className="text-[32px] leading-none tracking-tight tabular-nums sm:text-[40px]">{String(val).padStart(2, "0")}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero stat strip */}
            <dl className="grid grid-cols-2 gap-px border-t border-black/10 bg-black/10 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.v} className="bg-[color:var(--cream)] p-4">
                  <dt className="font-display text-[22px] leading-none tracking-tight sm:text-[26px]">{s.k}</dt>
                  <dd className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-black">
              <img src={heroBuilding} alt="Masters' Union campus" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">The Campus</div>
                <div className="mt-1 font-display text-[20px] leading-tight">DLF Cyberpark, Gurugram</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-black/10 bg-white px-4 py-3 shadow-lg lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">Seats filling</div>
              <div className="font-display text-[22px] leading-none">78 / 180 <span className="text-[13px] text-black/50">left</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — recruiter marquee */}
      <section className="border-b border-black/10 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1180px] px-4 py-5 sm:px-6 flex items-center gap-6">
          <div className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">Recruiters</div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
              {[...RECRUITERS, ...RECRUITERS].map((r, i) => (
                <span key={i} className="font-display text-[16px] tracking-tight text-black/70">{r}</span>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }`}</style>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Outcomes — Cohort '25</div>
              <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Numbers we're comfortable being audited on.
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-black/55">
              Third-party audited by Grant Thornton. Full placement report available on request.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div key={o.v} className="bg-[color:var(--cream)] p-7 pastel-fill">
                <div className="font-display text-[44px] leading-none tracking-tight">{o.k}</div>
                <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-black/70">{o.v}</div>
                <div className="mt-2 text-[12px] text-black/55">{o.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Roles our cohort landed</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <span key={r} className="border border-black/15 bg-white px-3 py-1.5 text-[12px] font-medium text-black/75">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALUMNI PROOF */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">The people who did it</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Alumni, in their own words.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 md:grid-cols-3">
            {ALUMNI.map((a) => (
              <figure key={a.name} className="flex flex-col justify-between gap-6 bg-[color:var(--cream)] p-7 pastel-fill">
                <blockquote className="font-display text-[18px] leading-snug tracking-tight text-black/85">
                  “{a.quote}”
                </blockquote>
                <figcaption>
                  <div className="font-display text-[16px]">{a.name}</div>
                  <div className="text-[12px] text-black/60">{a.role}</div>
                  <div className="mt-2 inline-block border border-black/15 bg-white px-2 py-0.5 text-[11px] font-semibold tracking-tight">{a.ctc}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY / PILLARS */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Why the outcomes look like this</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Business school, rebuilt around one idea: ship things.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map((p) => (
              <article key={p.title} className="bg-[color:var(--cream)] p-6 pastel-fill">
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
            <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              16 months. Four semesters. Something shipped every one.
            </h2>
          </div>
          <ol className="space-y-px bg-black/10">
            {SEMESTERS.map((s, i) => (
              <li key={s.label} className="grid gap-4 bg-white p-6 md:grid-cols-[90px_180px_1fr_260px] md:items-start md:gap-8 md:p-8">
                <div className="font-display text-[42px] leading-none text-black/25">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{s.label}</div>
                  <div className="mt-2 font-display text-[20px] leading-tight">{s.title}</div>
                </div>
                <p className="text-[14px] leading-relaxed text-black/70">{s.body}</p>
                <div className="flex flex-col gap-3">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">You ship</div>
                    <div className="text-[13px] text-black/80">{s.ship}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="border border-black/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black/70">{t}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACULTY */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Who teaches you</div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Operators. Not lecturers.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {FACULTY.map((f) => (
              <div key={f.name} className="bg-[color:var(--cream)] p-6 pastel-fill">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{f.tag}</div>
                <div className="mt-4 font-display text-[22px] leading-tight">{f.name}</div>
                <div className="mt-1 text-[13px] text-black/60">{f.role}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[12px] uppercase tracking-[0.14em] text-black/50">+ 220 practitioners across strategy, product, capital and design.</div>
        </div>
      </section>

      {/* FEES + ROI framing */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Fees & Financing</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              Pays back in ~15 months, on median.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-black/65">
              ₹40.5L in. ₹32.4L median CTC out. 0% EMI. Scholarships up to 100%.
              We won't let money be the reason you don't apply.
            </p>
            <a href="#apply" className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white pastel-fill">
              Check scholarship eligibility <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-3">
            {FEES.map((f) => (
              <div key={f.label} className="bg-[color:var(--cream)] p-6 pastel-fill">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">{f.label}</div>
                <div className="mt-3 font-display text-[32px] leading-none tracking-tight">{f.value}</div>
                <div className="mt-3 text-[12px] text-black/60">{f.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">What happens next</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              From application to campus, in five steps.
            </h2>
          </div>
          <ol className="grid gap-px bg-black/10 md:grid-cols-5">
            {TIMELINE.map((t, i) => (
              <li key={t.t} className="bg-[color:var(--cream)] p-5 pastel-fill">
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Cohort 2026 · 78 seats left</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              You have 15 minutes.
              <br />
              <em className="italic text-white/70">We have a seat.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
              Round 1 closes {deadline.toDateString()}. Rolling admits. No GMAT/CAT required.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="inline-flex items-center justify-between gap-3 bg-white px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.01] pastel-fill">
              Start application <ArrowUpRight className="size-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-between gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 hover:bg-white/5">
              Talk to admissions <ArrowUpRight className="size-5" />
            </a>
            <a href="/brochure.pdf" className="inline-flex items-center justify-between gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 hover:bg-white/5">
              Download brochure <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-[11px] uppercase tracking-[0.22em] text-white/40">
        © {new Date().getFullYear()} Masters' Union · PGP TBM
      </footer>

      {/* STICKY APPLY BAR */}
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
