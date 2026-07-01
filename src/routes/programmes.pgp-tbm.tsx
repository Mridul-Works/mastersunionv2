import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, Plus, Minus } from "lucide-react";
import logoAsset from "@/assets/logo-2.png.asset.json";
import heroBuilding from "@/assets/hero-building-light.webp";

export const Route = createFileRoute("/programmes/pgp-tbm")({
  head: () => ({
    meta: [
      { title: "PGP in Technology & Business Management — Masters' Union" },
      {
        name: "description",
        content:
          "A 16-month on-campus post-graduate programme built with CEOs, founders and operators. Learn by shipping — ventures, capital, and product from day one.",
      },
      { property: "og:title", content: "PGP in Technology & Business Management — Masters' Union" },
      { property: "og:description", content: "16-month, on-campus. Taught by operators. Built for the next generation of founders and leaders." },
    ],
  }),
  component: PgpTbm,
});

const NAV = ["Programmes", "Faculty", "Admissions", "Campus", "About"];

const STATS = [
  { k: "16", v: "Months, on-campus" },
  { k: "220+", v: "Industry practitioners teaching" },
  { k: "₹32.4 L", v: "Median CTC, Cohort '25" },
  { k: "94%", v: "Placement conversion" },
];

const PILLARS = [
  {
    tag: "01 / Operator-led",
    title: "Taught by people who ship, not people who tenure",
    body: "Sessions are led by CEOs, founders, VCs and operators from Zomato, Swiggy, Sequoia, Nykaa, Nazara, Groww and beyond. Zero lifetime academics on the core faculty.",
  },
  {
    tag: "02 / Learn by doing",
    title: "You ship a real venture in your first semester",
    body: "Every student builds a real D2C business, a live creator brand, and a working AI product — with revenue, users and metrics on the record.",
  },
  {
    tag: "03 / Capital fluency",
    title: "Balance sheets, term sheets, cap tables",
    body: "Finance is treated as a language, not a subject. Trade real portfolios, model real deals, and pitch to real investors from week one.",
  },
  {
    tag: "04 / Placements as a floor",
    title: "Consulting, PE, tech, product — placements are the base case",
    body: "Median CTC of ₹32.4L. Top recruiters: BCG, McKinsey, Bain, Accenture Strategy, JPMC, Nomura, Google, Microsoft, Flipkart, Zomato, Swiggy.",
  },
];

const SEMESTERS = [
  {
    label: "Semester 1",
    title: "Foundations & Ventures",
    body: "Business fundamentals, accounting, statistics, product thinking, and the D2C Challenge — you launch and run a real dropshipping business with your cohort.",
    tags: ["Accounting", "Stats", "Product 101", "D2C Challenge"],
  },
  {
    label: "Semester 2",
    title: "Capital & Markets",
    body: "Live trading desk, capital markets, corporate finance, marketing and consumer psychology. Cohort splits into live venture teams.",
    tags: ["Trading Desk", "Corp Fin", "Marketing", "Consumer Psych"],
  },
  {
    label: "Semester 3",
    title: "Tech, AI & Strategy",
    body: "Applied AI, product management, data engineering, strategy consulting sims. Ship an AI product with 100+ real users.",
    tags: ["Applied AI", "PM", "Strategy Sims", "Data Eng"],
  },
  {
    label: "Semester 4",
    title: "Specialisation & Placement",
    body: "Choose a track — Consulting, Product, Finance, Founder — with capstone under an industry mentor, then placements.",
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

const RECRUITERS = [
  "BCG", "McKinsey", "Bain", "Accenture Strategy", "Kearney",
  "JP Morgan", "Nomura", "Goldman Sachs",
  "Google", "Microsoft", "Amazon", "Flipkart",
  "Zomato", "Swiggy", "Nykaa", "CRED", "Sequoia", "Peak XV",
];

const FEES = [
  { label: "Programme Fee", value: "₹40.5 L", note: "All-inclusive, 16 months" },
  { label: "Financing", value: "0% EMI", note: "Partner banks, no collateral" },
  { label: "Scholarships", value: "up to 100%", note: "Merit + need based" },
];

const FAQ = [
  {
    q: "Who is this programme for?",
    a: "Graduates with 0–4 years of experience who want to build ventures, join top consulting/PE/tech firms, or grow into operator roles. STEM, commerce, and liberal arts backgrounds all welcome.",
  },
  {
    q: "How is this different from a traditional MBA?",
    a: "No lifetime academics. No case-study-only pedagogy. You ship real ventures, trade real capital, and build real products — graded on outcomes, not participation.",
  },
  {
    q: "What is the admissions process?",
    a: "Online application → aptitude assessment → operator interview. No mandatory CAT/GMAT. Rolling rounds until the cohort fills.",
  },
  {
    q: "Where is the campus?",
    a: "DLF Cyberpark, Gurugram — inside a live business district, walking distance from partner offices.",
  },
];

function PgpTbm() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[color:var(--cream)] text-[color:var(--ink)]">
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
            <button type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((s) => !s)} className="flex size-8 items-center justify-center text-black/60 hover:bg-black/5 md:hidden">
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-black/50">
              <Link to="/" className="hover:text-black">Masters' Union</Link>
              <span>/</span>
              <span>Programmes</span>
              <span>/</span>
              <span className="text-black">PGP TBM</span>
            </div>

            <div>
              <div className="mb-5 inline-flex items-center gap-2 border border-black/15 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/70">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Applications open · Cohort 2026
              </div>
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
                PGP in Technology
                <br />
                & Business Management
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-black/70">
                A 16-month, on-campus post-graduate programme built with CEOs, founders and operators.
                You will ship real ventures, trade real capital, and lead real products — long before graduation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#apply" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02] pastel-fill">
                Start application <ArrowUpRight className="size-4" />
              </a>
              <a href="#curriculum" className="inline-flex items-center gap-2 border border-black/20 bg-transparent px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black hover:bg-black/5">
                Explore curriculum
              </a>
              <a href="/brochure.pdf" className="inline-flex items-center gap-2 px-2 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60 hover:text-black">
                Download brochure ↓
              </a>
            </div>

            <dl className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6 sm:grid-cols-4">
              {[
                ["Format", "On Campus"],
                ["Duration", "16 Months"],
                ["Campus", "Gurugram"],
                ["Next Intake", "Aug 2026"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">{k}</dt>
                  <dd className="mt-1 font-display text-[18px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-black">
              <img src={heroBuilding} alt="Masters' Union campus" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">The Campus</div>
                <div className="mt-1 font-display text-[20px] leading-tight">DLF Cyberpark, Gurugram</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-black/10 bg-white px-4 py-3 shadow-lg lg:block">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">Round 1 closes</div>
              <div className="font-display text-[22px] leading-none">15 Aug 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 divide-x divide-black/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.v} className="px-6 py-8 pastel-fill">
              <div className="font-display text-[34px] leading-none tracking-tight sm:text-[44px]">{s.k}</div>
              <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-black/60">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">What makes PGP TBM different</div>
              <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Business school, rebuilt from the ground up.
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-relaxed text-black/60">
              Four principles run through every semester, every module, and every project you touch.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2">
            {PILLARS.map((p) => (
              <article key={p.title} className="group bg-[color:var(--cream)] p-7 transition-colors pastel-fill">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">{p.tag}</div>
                <h3 className="mt-4 font-display text-[22px] leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-black/70">{p.body}</p>
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
              16 months. Four semesters. Zero fluff.
            </h2>
            <div className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50 md:block">Curriculum</div>
          </div>

          <ol className="space-y-px bg-black/10">
            {SEMESTERS.map((s, i) => (
              <li key={s.label} className="grid gap-4 bg-white p-6 md:grid-cols-[110px_180px_1fr_auto] md:items-start md:gap-8 md:p-8">
                <div className="font-display text-[42px] leading-none text-black/25">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">{s.label}</div>
                  <div className="mt-2 font-display text-[20px] leading-tight">{s.title}</div>
                </div>
                <p className="text-[14px] leading-relaxed text-black/70">{s.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="border border-black/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black/70">{t}</span>
                  ))}
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
              Operators, not lecturers.
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

      {/* OUTCOMES */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Outcomes</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              The best cohort in Indian B-schools, by placement quality.
            </h2>
            <div className="mt-8 space-y-6">
              <Metric big="₹32.4 L" small="Median CTC" />
              <Metric big="₹1.05 Cr" small="Highest CTC, Cohort '25" />
              <Metric big="94%" small="Placed within 60 days" />
              <Metric big="30+" small="Student-founded ventures with external funding" />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Where our students land</div>
            <div className="mt-4 grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-3">
              {RECRUITERS.map((r) => (
                <div key={r} className="bg-white px-4 py-6 text-center font-display text-[16px] tracking-tight text-black/80 pastel-fill">
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">Fees & Financing</div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">
              We won't let money be the reason you don't apply.
            </h2>
          </div>
          <div className="grid gap-px bg-black/10 md:grid-cols-3">
            {FEES.map((f) => (
              <div key={f.label} className="bg-[color:var(--cream)] p-7 pastel-fill">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">{f.label}</div>
                <div className="mt-3 font-display text-[42px] leading-none tracking-tight">{f.value}</div>
                <div className="mt-3 text-[13px] text-black/60">{f.note}</div>
              </div>
            ))}
          </div>
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Cohort 2026</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              This programme <em className="italic text-white/70">isn't for everyone.</em>
              <br />
              Find out if it's for you.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
              Round 1 closes 15 August 2026. Rolling admits. No GMAT/CAT required. Fifteen minutes to apply.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="inline-flex items-center justify-between gap-3 bg-white px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.01] pastel-fill">
              Start application <ArrowUpRight className="size-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-between gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 hover:bg-white/5">
              Talk to admissions <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-[11px] uppercase tracking-[0.22em] text-white/40">
        © {new Date().getFullYear()} Masters' Union · PGP TBM
      </footer>
    </main>
  );
}

function Metric({ big, small }: { big: string; small: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-black/10 pt-4">
      <div className="font-display text-[34px] leading-none tracking-tight sm:text-[42px]">{big}</div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60">{small}</div>
    </div>
  );
}
