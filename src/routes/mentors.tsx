import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, Users, MessageSquare, Quote } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "network", label: "Network", icon: Users },
  { id: "uses", label: "Uses", icon: MessageSquare },
  { id: "voices", label: "Voices", icon: Quote },
];

const STATS = [
  { value: "500+", label: "Mentors on the roster" },
  { value: "<1 hour", label: "Average response to booking" },
  { value: "On-call", label: "Not on-stage" },
  { value: "Any time", label: "Available throughout the academic year" },
];

const NETWORK = [
  { name: "Consulting", body: "Partners and senior alumni from Bain & Company, BCG, McKinsey, EY-Parthenon, Kearney, PwC, and Deloitte. Whether you are prepping for a case interview tomorrow or trying to understand what a consulting career actually looks like, these mentors have done it and can tell you the truth." },
  { name: "Venture Capital", body: "Active investors from Sequoia, Nexus, Antler, WaterBridge Ventures, Avaana Capital, InnoVen Capital, Kae Capital, Bessemer, JSW Ventures, Sorin Investments, growX Ventures, and GetFive Fund. Students have used Mentor Union to review term sheets, prep investor pitches, understand cap table mechanics, and get warm introductions — sometimes in the same call." },
  { name: "Technology & Growth", body: "Operators from Google, Microsoft, Razorpay, Zerodha, Flipkart, and Zomato. Product strategy, growth frameworks, platform mechanics, go-to-market — from people who are executing these things today, not five years ago." },
  { name: "Finance & Investment Banking", body: "Practitioners from Axis Capital, Kotak IB, Citi, American Express, and Bloomberg. For students building toward finance careers or managing the MU Fund, these mentors provide the market context that no textbook delivers." },
  { name: "Founders & Operators", body: "Entrepreneurs who have built, scaled, raised, and exited. The mentors who have been through the founder journey — the failures, the pivots, the fundraise that almost didn't close — are often the most useful. They have no incentive to give you a polished answer. They give you the real one." },
  { name: "Legal & Compliance", body: "Specialists for term sheets, company incorporation, FSSAI compliance, IP protection, and regulatory navigation. The questions that feel trivial to ask in a classroom are the ones that matter most when you're building something real." },
];

const USES = [
  "Term sheet review before a pitch tomorrow morning.",
  "Growth strategy for a venture that is not growing fast enough.",
  "Interview prep for a BCG first round at 9am — the night before.",
  "Pricing advice from someone who has set prices at a company you actually use.",
  "A second opinion on a cap table that doesn't feel right.",
  "A name to email when you don't know where to start.",
  "A sanity check on a decision that is keeping you up at night.",
];

const QUOTES = [
  { quote: "I booked a Mentor Union slot the night before my Bain interview. The mentor had been through the same process and told me exactly what to expect. I got the offer.", who: "Abhishek Deb, Senior Associate, BCG" },
  { quote: "I had a term sheet I did not fully understand. Within forty minutes of booking, I was on a call with a founder who had signed ten of them. He walked me through every clause.", who: "VIP student, Cohort '24" },
  { quote: "The mentor I spoke to gave me a number to call. That number led to my first investor meeting. That meeting led to our seed round.", who: "Nikhil Gaur, Hive School" },
  { quote: "Before Mentor Union, I would have spent three weeks trying to get a fifteen-minute call with someone who knew what I needed to know. Here, it happened in forty-five minutes on a Tuesday afternoon.", who: "Priyansh Sharma, Manager Strategy, Talabaat Dubai" },
];

function Page() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>Mentor Union at Masters&apos; Union</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Mentor Union</div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          500+ mentors. One hour or less. Not a guest lecture. An actual hotline.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          Need a term sheet reviewed? A growth strategy challenged? A pitch fixed before tomorrow morning? Mentors from Bain, Sequoia, Zomato, and 500+ companies pick up. Students have closed internships, fixed failing ventures, and prepped for BCG interviews — all through a single session booked on demand.
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
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What It Is</div>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>Most business schools give you access to a mentor network. A list of alumni with LinkedIn profiles and good intentions. You email them. Some reply. Most don&apos;t. The meeting, if it happens, is scheduled three weeks out and lasts thirty minutes of pleasantries followed by five minutes of advice.</p>
          <p>Mentor Union is different. You book a slot. You get a mentor — an active founder, operator, investor, or specialist — within the hour. The conversation is direct, specific, and immediately useful. You leave with an answer, a name, or a number. Sometimes all three.</p>
          <p>One student cold-booked a slot with a VC who had made 40+ investments. Asked two questions he had been sitting on for a month. Got both answered, plus a warm introduction. Emailed the introduction before leaving the building. That is what Mentor Union is for.</p>
        </div>
      </section>

      <section id="network" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Who Is in the Network</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {NETWORK.map((n) => (
            <article key={n.name} className="bg-white p-8 md:p-10">
              <h3 className="text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium">{n.name}</h3>
              <p className="mt-4 text-[1rem] leading-[1.7] text-black/75">{n.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="uses" className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What Students Use It For</div>
          <ul className="mt-8 space-y-4">
            {USES.map((u) => (
              <li key={u} className="flex items-start gap-4 border-b border-black/10 pb-4 text-[1.05rem] leading-[1.6] text-black/80">
                <span aria-hidden className="mt-2 inline-block h-[6px] w-[6px] flex-none rounded-full bg-black/70" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="voices" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What Students Say</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {QUOTES.map((q) => (
            <figure key={q.who} className="bg-white p-8 md:p-10">
              <blockquote className="text-[clamp(1.05rem,1.5vw,1.25rem)] italic leading-[1.5] text-black/85">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>— {q.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">
          The answer you need is probably one booking away.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            Apply to Masters&apos; Union <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentor Union — Masters' Union" },
      { name: "description", content: "500+ mentors. One hour or less. Bain, Sequoia, Zomato — on-call, not on-stage. An actual hotline for term sheets, interviews, growth, and cap tables." },
    ],
  }),
  component: Page,
});
