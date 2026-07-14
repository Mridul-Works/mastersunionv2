import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, AlertTriangle, ChefHat, Store, Users } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import { PortraitCard } from "@/components/PortraitCard";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "problem", label: "Problem", icon: AlertTriangle },
  { id: "solution", label: "Solution", icon: ChefHat },
  { id: "brands", label: "Brands", icon: Store },
  { id: "mentors", label: "Mentors", icon: Users },
];

const STATS = [
  { value: "4% vs 40–50%", label: "Indians ordering food online vs USA & China" },
  { value: "8L vs 1.2 Cr", label: "Restaurants in India vs China" },
  { value: "2×", label: "Swiggy + Zomato projected growth in 5 years" },
  { value: "₹15L+", label: "Typical pre-launch bill — eliminated by Food Lab" },
];

const PROBLEMS = [
  { name: "No kitchen", body: "You cannot test a food business from your home kitchen. Before your first trial, you need access to a commercial kitchen — which costs ₹6,00,000+ to set up." },
  { name: "No chef", body: "Great food is not built on guesswork. You need culinary expertise on day one. A chef consultant costs ₹3,00,000+ before you've served anyone." },
  { name: "No equipment", body: "Deep fryers, blast chillers, dough mixers. A home setup will not cut it. The equipment alone can run to lakhs." },
  { name: "Compliance maze", body: "FSSAI licensing. GST registration. Company incorporation. Bank accounts. Vendor onboarding. Aggregator listing. The paperwork starts long before the customers do." },
];

const COSTS = [
  { label: "Kitchen rent + setup", value: "₹6,00,000" },
  { label: "R&D + chef consultant", value: "₹3,00,000" },
  { label: "Compliance + onboarding", value: "₹1,50,000+" },
  { label: "Working capital", value: "₹6,00,000" },
  { label: "Total due before a single order", value: "₹15L+" },
];

const SOLUTION = [
  { name: "Fully equipped commercial kitchen", body: "Ready to use from day one. No setup cost. No rent negotiation. No waiting." },
  { name: "Culinary expert & professional kitchen staff", body: "On site. Your food is built to standard from the first batch." },
  { name: "Procurement & supply chain", body: "Sourced and managed. You focus on the product, not the vendor calls." },
  { name: "FSSAI licensing & compliance", body: "Handled entirely. The paperwork that kills most early-stage food founders before they start — gone." },
  { name: "Aggregator onboarding", body: "Live on Zomato and Swiggy. Your brand is discoverable before you've spent a rupee on marketing." },
  { name: "Mentorship from food operators", body: "From people who have built food businesses from zero — including a 6-year Zomato veteran, an AVP at Zomato, and alumni of The Leela, Oberoi, and Nando's." },
];

const BRANDS = [
  { name: "Lexi's Gourmet Sandwiches", meta: "Delhi & Gurgaon · ₹1 Cr+ ARR · 4.5+/5 on Swiggy & Zomato", body: "What started as a passion for bold, indulgent sandwiches became Gurgaon's highest-rated gourmet sandwich brand. Truffle mushroom ciabattas. Crispy katsu sandos. Cult favourites. Rated 4.5+/5 on Swiggy and Zomato within three months of launch. ₹1 Cr+ ARR. Now expanding to Delhi. The founders are Masters' Union graduates who started in the Food Lab and kept building." },
  { name: "Woody's Pizzeria", meta: "Lajpat Nagar, Delhi · ₹2.4L monthly revenue · Organic growth", body: "Kanav started baking pizzas in 2011. After years of perfecting Neapolitan recipes, he launched Woody's — live in Lajpat Nagar, Delhi. Vegetarian-only. Indian-inspired. Neapolitan-built. ₹2.4L monthly revenue, purely organic, with half the menu still live. Customers keep calling it the best pizza they've ever had." },
];

const MENTORS = [
  { name: "Ankit Tiwari", role: "Ex Leela, Oberoi, Salad Days", note: "Hospitality and culinary operations" },
  { name: "Abhijeet Joshi", role: "AVP, Zomato", note: "Aggregator strategy and platform growth" },
  { name: "Anshul Aggarwal", role: "Customer Retention, Nando's", note: "Brand loyalty and repeat purchase" },
  { name: "Kabir Chugh", role: "Serial Food Entrepreneur & Creator", note: "Brand building and content" },
  { name: "Naveen Balaji", role: "6 years at Zomato · Co-founder, Lexi's", note: "Operations and scale" },
  { name: "Saksham Kotiya", role: "Head of Entrepreneurship & Investments, MU", note: "Strategy and funding" },
  { name: "Swarup Potta", role: "Ex ISRO, Urban Company · IIT Madras", note: "Operations and growth" },
  { name: "Anshu Mehta", role: "CFA Charterholder · Ex-Futures First", note: "Finance and unit economics" },
];

function Page() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>Masters&apos; Union Food Lab</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Food Lab</div>
        <h1 className="mt-6 max-w-[24ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Most food businesses die before a single plate is served. Not because the idea was bad. Because the bill arrived first.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          Kitchen rent. Chef. Compliance. Supply chain. Aggregator onboarding. Before your first customer order, you are already ₹15L in the hole. Food Lab eliminates that problem entirely. You bring the idea and the obsession. We handle everything else.
        </p>
      </section>

      <section id="stats" className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-10">
              <div className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Opportunity</div>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>India&apos;s food economy is decades behind the West and China. Only 4% of Indians order food online — compared to 40–50% in the US and China. India has approximately 8 lakh restaurants. China has 1.2 crore. Swiggy and Zomato are projected to double in the next five years.</p>
          <p>They need new, sticky, scalable brands to fuel that growth. The decade belongs to whoever shows up first with the right product, the right story, and the operational infrastructure to deliver it consistently. Food Lab exists to make sure that person is a Masters&apos; Union founder.</p>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Problem — Before Food Lab</div>
        <h2 className="mt-5 max-w-[32ch] text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-[1.1]">
          Most great food ideas die not in the kitchen, but in the paperwork and the pre-launch costs that arrive before the first customer does.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {PROBLEMS.map((p) => (
            <article key={p.name} className="bg-white p-8">
              <h3 className="text-[1.15rem] font-medium">{p.name}</h3>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-black/75">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 border border-black/15 bg-neutral-50 p-8 md:p-10">
          <div className="text-[11px] uppercase tracking-[0.24em] text-black/60" style={{ fontFamily: MONO }}>Pre-launch bill, founder edition</div>
          <ul className="mt-6 divide-y divide-black/10">
            {COSTS.map((c) => (
              <li key={c.label} className="flex items-baseline justify-between gap-6 py-4">
                <span className="text-[0.98rem] text-black/80">{c.label}</span>
                <span className="text-[1rem] font-medium tabular-nums text-black">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="solution" className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Food Lab Solution</div>
          <h2 className="mt-5 max-w-[32ch] text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-[1.1]">
            You walk in with a concept and an obsession. You walk out with a live brand on Zomato and Swiggy.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTION.map((s) => (
              <article key={s.name} className="bg-white p-7">
                <h3 className="text-[1.05rem] font-medium leading-tight">{s.name}</h3>
                <p className="mt-4 text-[0.92rem] leading-[1.65] text-black/75">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Brands Already Cooking</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {BRANDS.map((b) => (
            <article key={b.name} className="bg-white p-8 md:p-10">
              <h3 className="text-[1.25rem] font-medium leading-tight">{b.name}</h3>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>{b.meta}</div>
              <p className="mt-5 text-[1rem] leading-[1.7] text-black/75">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="mentors" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Mentors &amp; Partners</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((m) => (
            <div key={m.name} className="bg-white p-6">
              <div className="text-[1rem] font-medium leading-tight">{m.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{m.role}</div>
              <p className="mt-4 text-[0.88rem] leading-[1.6] text-black/70">{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Think Bigger</div>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>Cloud kitchens are where we start. But Food Lab is designed to incubate any food and beverage brand — not just delivery-first concepts. If it&apos;s food and it can scale, we want to hear about it.</p>
          <p><span className="font-medium text-black">Currently live:</span> Cloud Kitchens</p>
          <p><span className="font-medium text-black">Coming soon:</span> D2C Food Brands · Beverages · Restaurants · Food Tech</p>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="https://foodlab.mastersunion.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            Your idea. Our kitchen. Apply <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/food-lab")({
  head: () => ({
    meta: [
      { title: "Food Lab — Masters' Union" },
      { name: "description", content: "The ₹15L pre-launch bill for a food brand — eliminated. Commercial kitchen, chef, FSSAI, Zomato & Swiggy onboarding — all handled. Bring the idea." },
    ],
  }),
  component: Page,
});
