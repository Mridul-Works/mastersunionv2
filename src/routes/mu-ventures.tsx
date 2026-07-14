import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, Wallet, Layers, Store, Users } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import { PortraitCard } from "@/components/PortraitCard";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "funds", label: "Funds", icon: Wallet },
  { id: "beyond", label: "Beyond", icon: Layers },
  { id: "portfolio", label: "Portfolio", icon: Store },
  { id: "team", label: "Team", icon: Users },
];

const STATS = [
  { value: "$10M", label: "Investment vehicle" },
  { value: "₹10–20L", label: "Cheque sizes across funds" },
  { value: "<10 days", label: "Most funding decisions" },
  { value: "Under 25", label: "All founders in the portfolio" },
];

const FUNDS = [
  { name: "Dropout Fund", status: "Live Now · ₹15L cheque", body: "For school, UG, and PG dropouts ready to build instead of follow the script. The Dropout Fund backs founders who have made the hardest decision — to leave the safety of a degree and build something that didn't exist before. 12-month build year inside the MU ecosystem. Up to 100 Founder Credits toward conviction capital — credits that can be converted as the startup grows. Academic safety net: if the startup doesn't continue, the path back to education remains open. The risk of dropping out is real. We try to reduce it." },
  { name: "Founders' Fund", status: "Launching Soon · ₹15–20L cheque", body: "Pre-seed capital for consumer brands and deep-tech founders. The Founders' Fund backs high-conviction founders with a clear insight, a defined problem, and the obsession to solve it. Operator-led mentorship from day zero. Access to MU's investor network for follow-on rounds." },
  { name: "Creator Fund", status: "Launching Soon · ₹10L cheque", body: "For builders with proven distribution who are ready to turn audience into business. 500K+ followers or ~80% organic traffic preferred. Content-led businesses: YouTube channels becoming courses, Instagram accounts becoming brands, newsletters becoming platforms. The largest cheque in the MUV stack — because distribution is the hardest thing to build, and if you already have it, you deserve the most support to monetise it." },
];

const PILLARS = [
  { name: "1:1 Monthly Mentorship", body: "Monthly founder sessions to solve the specific problem in front of you right now — not generic advice, but targeted help from people who have faced the same thing." },
  { name: "Co-working Space", body: "Access to an exclusive workspace on the Masters' Union campus. The infrastructure to build without distraction." },
  { name: "Tech Tools & Credits", body: "AWS, Google Cloud, Microsoft Azure, Notion, Figma, HubSpot, Slack, GitHub, Stripe, Vercel, MongoDB, OpenAI — the full stack, with credits to build and ship your MVP faster." },
  { name: "Masters' Union Network", body: "Connect with 5,000+ founders, CXOs, and potential customers. The network that took MU five years to build is available to every portfolio founder from day one." },
  { name: "PR & Branding Support", body: "Tailored video assets, press coverage, and recognition that scales alongside the company. Your story told well, early." },
  { name: "Next-Round Investor Prep", body: "Build a strong pitch and get warm introductions to the right VCs. The Mentor Union network of investors — Avaana Capital, Kae Capital, Bessemer, JSW Ventures, Sorin Investments, growX Ventures — is accessible to portfolio founders." },
];

const PORTFOLIO = [
  { name: "Cryptique", tagline: "Intelligence-first growth platform for DeFi & Crypto · cryptique.io", body: "Backed at idea stage. Building intelligence infrastructure for the next generation of decentralised finance." },
  { name: "ORBIT Sanyark Space", tagline: "Multi-mission satellites for secure navigation and communications · sanyark.com", body: "Deep-tech at the earliest possible stage. Building satellite infrastructure for India's growing space economy." },
  { name: "Lexi's Sandwiches", tagline: "Turning flavour into fandom · ₹1 Cr+ ARR · linktr.ee/lexis_sandos", body: "Started in the Masters' Union Food Lab. Now ₹1 Cr+ ARR, rated 4.5+/5 on Swiggy and Zomato, expanding to Delhi." },
  { name: "Blue Brew", tagline: "The new era of denim wear · bluebrew.in", body: "Consumer brand backed at the concept stage. Building the next generation of denim for India." },
];

const TEAM = [
  { name: "Pratham Mittal", role: "General Partner · Founder, Masters' Union · Co-Founder, Outgrow · Forbes 30 Under 30", body: "Built Outgrow from zero to a globally recognised SaaS product. Founded Masters' Union. Now backing the next generation of builders before anyone else will." },
  { name: "Saksham Kotiya", role: "Managing Partner · Ex-VC, DSG Partners", body: "Brings institutional VC experience to the -1 stage. Manages the day-to-day of the MUV portfolio and leads the Dropout Fund." },
  { name: "Sumit Vijapure", role: "Vice President · EIR, Masters' Union · Ex ISRO, Urban Company · IIT Madras", body: "Operator-turned-investor. Brings hands-on building experience from ISRO and Urban Company to portfolio founders." },
  { name: "Anshu Mehta", role: "Vice President · CFA Charterholder · Ex-Futures First", body: "Leads financial analysis, fund operations, and portfolio company finance strategy." },
];

const ADVISORS = [
  { name: "Manoj Kohli", note: "Former CEO & MD, Bharti Airtel — global business strategy and scale" },
  { name: "Shishir Maheshwari", note: "MD, EverSource Capital — institutional investment and fund strategy" },
  { name: "Swapna Gupta", note: "Former Partner, Avaana Capital — early-stage venture and consumer investing" },
  { name: "Arjun Vaidya", note: "Co-Founder, V3 Ventures — D2C brand building and consumer markets" },
];

const VC_MENTORS = "Archit Bhargava (Avaana Capital) · Sahil Kumrah (growX Ventures) · Gautam Marwah (Kae Capital) · Aman Jain (GetFive Fund) · Alok Anand Patra (Sorin Investments) · Puneet Kumar (BII) · Vatsalya Tandon (Bessemer Venture Partners) · Zoeb Ali Khan (Sauce VC) · Niyati Raval (JSW Ventures)";

function Page() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>MU Ventures</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>MU Ventures</div>
        <h1 className="mt-6 max-w-[24ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Most funds want traction. We write the cheque before any of that exists.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          We back founders at the -1 stage — before day zero. When all you have is an idea, an insight, and the courage to start. Sector-agnostic. Open to all builders under 25. Most funding decisions in under 10 days. When traditional investors call it &ldquo;too early,&rdquo; we lean in.
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

      <section className="mx-auto max-w-5xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Thesis</div>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>Every great company starts as an idea on a napkin. Most early-stage funds want to see the napkin turned into a deck, the deck turned into a prototype, and the prototype turned into traction before they will take a meeting. By then, someone else has already built it.</p>
          <p>MU Ventures exists for the moment before all of that. We back founders when the idea is still on paper, the prototype isn&apos;t built, and the first customers are just a dream. We believe that the most important thing a first investor can provide is not capital — it is conviction. The cheque says: we believe in you before the market does.</p>
          <p>No suits. No endless paperwork. Once you&apos;re in, we get to work — customer discovery, rapid prototyping, growth channels, next-round prep. We move at builder speed because that is the only speed that matters.</p>
        </div>
      </section>

      <section id="funds" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Three Funds</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {FUNDS.map((f) => (
            <article key={f.name} className="bg-white p-8 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.24em] text-black/60" style={{ fontFamily: MONO }}>{f.status}</div>
              <h3 className="mt-4 text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-tight">{f.name}</h3>
              <p className="mt-5 text-[0.98rem] leading-[1.7] text-black/75">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="beyond" className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What You Get Beyond Capital</div>
          <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-[1.65] text-black/75">Capital is the beginning. Six pillars built around every founder in the portfolio.</p>
          <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.name} className="bg-white p-7">
                <h3 className="text-[1.05rem] font-medium leading-tight">{p.name}</h3>
                <p className="mt-4 text-[0.92rem] leading-[1.65] text-black/75">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Portfolio</div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PORTFOLIO.map((p, i) => (
            <article key={p.name} className="flex flex-col">
              <PortraitCard name={p.name} img={undefined} variant={i} chip="MUV" />
              <h3 className="mt-5 text-[1.2rem] font-medium leading-tight">{p.name}</h3>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{p.tagline}</div>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-black/75">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Team</div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {TEAM.map((t, i) => (
            <article key={t.name} className="flex flex-col">
              <PortraitCard name={t.name} img={undefined} variant={i + 1} chip="Team" />
              <h3 className="mt-4 text-[1rem] font-medium leading-tight">{t.name}</h3>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-black/60" style={{ fontFamily: MONO }}>{t.role}</div>
              <p className="mt-3 text-[0.88rem] leading-[1.6] text-black/70">{t.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Advisory Council</div>
            <ul className="mt-6 space-y-4">
              {ADVISORS.map((a) => (
                <li key={a.name} className="border-b border-black/10 pb-4">
                  <div className="text-[1rem] font-medium">{a.name}</div>
                  <div className="mt-1 text-[0.9rem] leading-[1.6] text-black/70">{a.note}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>VC Mentors in the Network</div>
            <p className="mt-6 text-[0.98rem] leading-[1.8] text-black/75">{VC_MENTORS}</p>
          </div>
        </div>
      </section>

      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
        <blockquote className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">
          &ldquo;When traditional investors call it too early, we lean in.&rdquo;
        </blockquote>
        <p className="mt-8 max-w-[68ch] text-[1.05rem] leading-[1.7] text-black/75">
          The best time to back a founder is before they need you. Before the deck is polished. Before the metrics are clean. Before anyone else has validated the idea. That is when the real conviction is required — and that is when MU Ventures shows up.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="https://ventures.mastersunion.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            Most people apply for jobs. A few apply to build the future <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/mu-ventures")({
  head: () => ({
    meta: [
      { title: "MU Ventures — Masters' Union" },
      { name: "description", content: "$10M vehicle. ₹10–20L cheques. Under-25 founders. Most decisions in under 10 days. Dropout Fund live now. Founders' & Creator Funds launching." },
    ],
  }),
  component: Page,
});
