import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, TrendingUp, Briefcase, Globe2 } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "where", label: "Where", icon: Briefcase },
  { id: "intl", label: "Global", icon: Globe2 },
];

const STATS = [
  { value: "₹28.52L", label: "Average CTC, Co'24" },
  { value: "₹61.98L", label: "Highest CTC, Co'24" },
  { value: "3.03×", label: "Average salary jump from pre-MBA" },
  { value: "148", label: "Total recruiters, Co'24" },
  { value: "28%", label: "Placed in Founder's Office or Chief of Staff" },
  { value: "10", label: "International offers" },
  { value: "37%", label: "Offers with early joining bonuses" },
];

const GROWTH = [
  { cohort: "Co'21", trail: "₹29.12L → ₹37.18L → ₹39.61L → ₹41.67L" },
  { cohort: "Co'22", trail: "₹33.1L → ₹37.27L → ₹43.29L" },
  { cohort: "Co'23", trail: "₹34.07L → ₹38.23L" },
  { cohort: "Co'24", trail: "₹28.52L → tracking upward" },
];

const DOMAINS = [
  {
    name: "Consulting",
    body: "Bain & Company, BCG, McKinsey, Accenture Strategy, EY-Parthenon, Kearney, PwC, Deloitte. Masters' Union students are recruited by every major consulting firm in India — not as a one-off, but as a consistent pattern across cohorts.",
    people: [
      { name: "Jeneesha Singh", role: "Associate Consultant, Bain & Company", note: "Placed directly into Bain's consulting practice. One of several MU graduates at the firm." },
      { name: "Prashasti Singh", role: "Consultant, McKinsey", note: "Recruited by McKinsey's India practice straight from the Masters' Union campus." },
      { name: "Abhishek Deb", role: "Senior Associate, BCG", note: "\"The pedagogy and mentorship played a crucial role in securing my dream role.\"" },
      { name: "Omkar Hundekari", role: "Junior Consultant, Bain & Co.", note: "Placed at Bain. Attended 50+ CXO sessions on campus that shaped how he thinks about business." },
    ],
  },
  {
    name: "Technology & Growth",
    body: "Google, Microsoft, ServiceNow, Flipkart, Zerodha, Zepto, Zomato, Razorpay, MakeMyTrip, Cashfree, BluSmart. Technology companies recruit Masters' Union students for product, growth, strategy, and operations roles — not support functions.",
    people: [],
  },
  {
    name: "Venture Capital & Investment Banking",
    body: "WaterBridge Ventures, Avaana Capital, InnoVen Capital, Kae Capital, Kotak IB, Axis Capital, Good Capital, Bessemer, JSW Ventures. 12% of students placed directly into VC and investment roles — a number almost unmatched at a business school of this age.",
    people: [
      { name: "Archit Bhargava", role: "Analyst, Avaana Capital", note: "Placed directly into one of India's most active early-stage funds." },
      { name: "Gautam Marwah", role: "Chief of Staff, Kae Capital", note: "Working directly with the partners at one of India's leading VC firms." },
      { name: "Yash Chhabra", role: "Investment Associate, WaterBridge Ventures", note: "Evaluating and executing investments at one of India's top consumer-focused funds." },
    ],
  },
];

const INTL = [
  { name: "Daniel Paul Nath", role: "Growth Strategist, Google, Dublin", note: "One of the highest-profile international placements in the cohort." },
  { name: "Adeetya Prakash", role: "Product Manager II, Careem, Dubai", note: "Product role at one of the Middle East's largest super-apps." },
  { name: "Mehul Soni", role: "Quant Trader, Avirom Capital, US", note: "Placed into quantitative trading at a US-based fund." },
  { name: "Anmol Malhotra", role: "Manager Strategy, ZKX, Estonia", note: "Strategy role in the European Web3 ecosystem." },
];

function Page() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>Careers at Masters&apos; Union</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Careers</div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Not just what you earn on day one. What you earn every year after.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          ₹61.98L highest CTC. 3.03× average salary jump from pre-MBA. 28% of graduates in Founder&apos;s Office or Chief of Staff roles from day one. Bain, BCG, McKinsey, Google, Zerodha. And if you&apos;d rather build — ₹50,000 a month for a year, no equity taken.
        </p>
      </section>

      <section id="stats" className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-10">
              <div className="text-[clamp(1.6rem,2.8vw,2.4rem)] leading-none tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="growth" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Salary Growth — Cohort by Cohort</div>
        <h2 className="mt-5 max-w-[30ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
          The number that matters most is not what you earn on placement day. It is what you earn three years later.
        </h2>
        <p className="mt-6 max-w-[68ch] text-[1.05rem] leading-[1.65] text-black/70">
          Masters&apos; Union graduates consistently grow their salaries by 10–20% year-on-year — among the highest for any MBA in India.
        </p>
        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {GROWTH.map((g) => (
            <div key={g.cohort} className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/60 md:col-span-2" style={{ fontFamily: MONO }}>{g.cohort}</div>
              <div className="text-[clamp(1.05rem,1.6vw,1.4rem)] leading-snug md:col-span-10">{g.trail}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[68ch] text-[1rem] leading-[1.7] text-black/70">The pattern is consistent across every cohort. The placement number is just the beginning.</p>
      </section>

      <section id="where" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Where Students Go</div>
        <div className="mt-10 space-y-16">
          {DOMAINS.map((d) => (
            <div key={d.name}>
              <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight">{d.name}</h3>
              <p className="mt-5 max-w-[70ch] text-[1.05rem] leading-[1.7] text-black/75">{d.body}</p>
              {d.people.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
                  {d.people.map((p) => (
                    <div key={p.name} className="bg-white p-6">
                      <div className="text-[1rem] font-medium leading-tight">{p.name}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{p.role}</div>
                      <p className="mt-4 text-[0.9rem] leading-[1.6] text-black/70">{p.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="intl" className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>International Placements — 10 Offers, Co&apos;24</div>
          <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {INTL.map((p) => (
              <div key={p.name} className="bg-white p-6">
                <div className="text-[1rem] font-medium leading-tight">{p.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{p.role}</div>
                <p className="mt-4 text-[0.9rem] leading-[1.6] text-black/70">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>28% in Founder&apos;s Office and Chief of Staff</div>
        <p className="mt-6 max-w-[70ch] text-[1.05rem] leading-[1.7] text-black/75">
          This is the number no other B-school talks about — because no other B-school produces it at this scale. 28% of Masters&apos; Union graduates take Founder&apos;s Office or Chief of Staff roles — working directly with the founders and CEOs of India&apos;s highest-growth companies from day one.
        </p>
        <p className="mt-5 max-w-[70ch] text-[1.05rem] leading-[1.7] text-black/75">
          This happens because Masters&apos; Union students arrive already knowing how to operate. They have run real ventures, managed real P&amp;Ls, and worked with real customers before their first day at work. Founders notice that difference immediately. They don&apos;t want someone who needs six months to get up to speed. They want someone who is already running.
        </p>
      </section>

      <section id="closing" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Two Paths. One Decision.</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          <div className="bg-white p-8 md:p-10">
            <h3 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-medium">Place</h3>
            <p className="mt-5 text-[1rem] leading-[1.7] text-black/75">With 148 recruiters, an average CTC of ₹28.52L, and Bain, BCG, and McKinsey in the room, the placement record stands on its own. Whatever you want to do next, the network and the credential get you there faster.</p>
          </div>
          <div className="bg-white p-8 md:p-10">
            <h3 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-medium">Build</h3>
            <p className="mt-5 text-[1rem] leading-[1.7] text-black/75">The Founder&apos;s Fellowship gives serious founders ₹50,000 per month for a year post-graduation to keep building. No equity. No conditions. You can still sit for placements with the next batch as a safety net — so choosing to build costs you nothing except the decision itself.</p>
          </div>
        </div>
        <p className="mt-10 max-w-[68ch] text-[1.05rem] leading-[1.7] text-black/75">Both paths are real. Both are supported. Both produce outcomes that make the two years worthwhile. The choice is yours.</p>
        <div className="mt-12 flex flex-wrap items-center gap-4 pb-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            The career starts here <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Careers — Masters' Union" },
      { name: "description", content: "₹28.52L avg CTC, ₹61.98L highest, 3.03× salary jump, 148 recruiters, 28% in Founder's Office. Bain, BCG, McKinsey, Google, Zerodha." },
    ],
  }),
  component: Page,
});
