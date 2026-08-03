import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, ClipboardList, Store } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "how", label: "How", icon: ClipboardList },
  { id: "brands", label: "Brands", icon: Store },
];

const STATS = [
  { value: "₹3.38 Cr", label: "Total revenue generated, Cohort '25" },
  { value: "50", label: "Teams competing simultaneously" },
  { value: "₹4L+", label: "Average revenue per team, Term 1" },
];

const PHASES = [
  { name: "InClass — The Foundation", body: "Unit economics, pricing strategy, digital marketing, customer psychology, supply chain fundamentals — taught by practitioners from Amazon, McKinsey, and India's leading D2C founders. The classroom gives you the framework. It gives you the vocabulary. It gives you the tools. But a framework untested is just a theory. Which is why InClass is only half of the model." },
  { name: "OutClass — The Real Test", body: "Every student sources a real product from a real supplier. Lists it on a real platform. Runs real ads with a real budget. Processes real orders. Handles real returns from real customers who paid real money and have real opinions about what they received. The pressure is real. The margin is real. The mistake of mispricing a product shows up in your P&L the same day you make it. No buffer. No partial credit for a well-structured answer that didn't actually work. The market is the examiner." },
  { name: "The Grade", body: "Revenue. Margin. Profit. NPS. Four numbers. No subjectivity. No rubric. Just what the market decided about your work this week." },
];

const BRANDS = [
  { name: "Lexi's Gourmet Sandwiches", meta: "Co'24 · ₹1 Cr+ ARR · 4.5+/5 on Swiggy & Zomato", body: "Gurgaon's highest-rated gourmet sandwich brand. Truffle mushroom ciabattas. Crispy katsu sandos. Started as a dropshipping exercise in Term 1. By graduation, it was a real cloud kitchen doing ₹1 Cr+ ARR, rated 4.5+/5 on Swiggy and Zomato within three months of launch, and expanding from Gurgaon to Delhi. The assignment became the company." },
  { name: "Eat Atlas", meta: "Ishita Gupta & Mayuresh Jadhav, Co'24", body: "Premium chips and dips, global cuisine flavours, D2C model. Unit economics learned InClass, validated OutClass, turned into a real brand by the end of the programme." },
];

function Page() {
  return (
    <main className="min-h-screen bg-white pb-16 text-black md:pb-18" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>The D2C Challenge at Masters&apos; Union</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>D2C Challenge</div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Your exam is a Stripe dashboard. Your grade is your revenue.
        </h1>
        <p className="mt-7 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          Welcome to Term 1. Every student sources a product, builds a store, runs ads, handles orders, and manages returns. No simulation. No sample dataset. Real suppliers. Real customers. Real money changing hands. The Dropshipping Fair generated ₹3.38 Cr across 50 teams in a single semester.
        </p>
      </section>

      <section id="stats" className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-7">
              <div className="text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-5 pt-14 md:px-10 md:pt-18">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>How It Works</div>
        <div className="mt-7 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <article key={p.name} className="bg-white p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/55" style={{ fontFamily: MONO }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-tight">{p.name}</h3>
              <p className="mt-5 text-[0.98rem] leading-[1.7] text-black/75">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-black/10 bg-neutral-50 md:mt-18">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-10 md:py-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>This Is Not a Simulation</div>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
            <p>Most MBA programmes give you a case study about someone else&apos;s supply chain problem. You read it, discuss it, write a recommendation, and receive a grade based on how well you argued. You never know if your recommendation would have worked. You never have to find out.</p>
            <p>At Masters&apos; Union, the case study is your own. The cost of a wrong pricing decision is not a bad grade — it is a margin that doesn&apos;t work and a business that bleeds. The cost of a failed ad campaign is not feedback — it is real money spent on a hypothesis that didn&apos;t hold. That is the only way to actually learn.</p>
            <p>By the end of Term 1, you have made mistakes, fixed them, made more, and learned more about unit economics from one semester of doing than most people learn in an entire MBA from reading. The number on your Shopify dashboard is not a proxy for learning. It is the learning.</p>
          </div>
        </div>
      </section>

      <section id="brands" className="mx-auto max-w-6xl px-5 pt-14 md:px-10 md:pt-18">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Brands Born Here</div>
        <div className="mt-7 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {BRANDS.map((b) => (
            <article key={b.name} className="bg-white p-8 md:p-10">
              <h3 className="text-[1.25rem] font-medium leading-tight">{b.name}</h3>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>{b.meta}</div>
              <p className="mt-5 text-[1rem] leading-[1.7] text-black/75">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="closing" className="mx-auto max-w-5xl px-5 py-14 text-center md:px-10 md:py-18">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">Start your business before your first semester ends.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            Apply to Masters&apos; Union <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/d2c-challenge")({
  head: () => ({
    meta: [
      { title: "The D2C Challenge — Masters' Union" },
      { name: "description", content: "₹3.38 Cr revenue. 50 teams. One semester. Real suppliers, real customers, real money. Term 1 at Masters' Union." },
    ],
  }),
  component: Page,
});
