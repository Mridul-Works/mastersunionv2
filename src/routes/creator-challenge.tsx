import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, BarChart3, Layers, Trophy, GraduationCap } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import { PortraitCard } from "@/components/PortraitCard";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "phases", label: "Phases", icon: Layers },
  { id: "winners", label: "Winners", icon: Trophy },
  { id: "mentors", label: "Mentors", icon: GraduationCap },
];

const STATS = [
  { value: "46M+", label: "Aggregate reach, PGP edition" },
  { value: "5 Mn+", label: "Cumulative followers across cohort" },
  { value: "120+", label: "Active creators" },
  { value: "₹10L+", label: "Prize pool, PGP edition" },
  { value: "₹2.75L", label: "Prizes awarded, UG edition" },
  { value: "29.8M", label: "Highest single-video views (Anany Chauhan)" },
  { value: "3L+", label: "Total impressions, UG edition" },
];

const PHASES = [
  { name: "Phase 01 — Digital Architecture", body: "Build the foundation. Students identify a niche, establish a unique visual and tonal identity, and engineer a personal brand that works as a 24/7 professional and commercial asset. Full-time professional editors are assigned from day one — so students focus entirely on storytelling and niche authority, not technical polish. The editor handles the execution. The student handles the idea." },
  { name: "Phase 02 — Algorithmic Leverage", body: "Master the distribution. Students learn viral hook frameworks, execute high-frequency content cycles across LinkedIn, Instagram, and YouTube, and use real-time analytics to double down on what works and cut what doesn't. The goal is not just reach — it is commanded reach at scale. An audience that shows up because you trained it to." },
  { name: "Phase 03 — Market Validation", body: "Prove it commercially. Students partner with real D2C brands, execute live creative briefs, and deliver professional-quality assets under real-world market pressure. The highest commercial impact wins a share of the ₹10L+ prize pool." },
];

const WINNERS = [
  { name: "Siddhanth Vengali", place: "1st Place · ₹1L", role: "Founder, Angry Toast", body: "5M+ views in three months. ₹4L+ revenue for Angry Toast — a design-led socks brand he founded from his content audience. 7+ brand deals in one month. 8.2K+ follower growth. Built a community and expanded into retail. All while enrolled. All while attending lectures. The assignment became the business." },
  { name: "Samriddhi Saraf", place: "2nd Place · ₹75K", role: "40K+ followers · 15M+ views · 20+ brand collaborations", body: "Built a content platform around tech, gadgets, and digital discoveries — simplifying complex technology for mass audiences. 20+ brand collaborations. Recognised by industry creators and startup founders. Built a tech platform from her audience before graduating." },
  { name: "Chirag Naryani", place: "3rd Place (shared) · ₹50K", role: "3.5M+ views · Business storytelling", body: "Content around business, startups, marketing, and consumer psychology with a storytelling lens. Primary audience: founders and professionals aged 25–34. Authored research on \"boring businesses\" and their scalability. Closed brand collaborations within the first two weeks of creating content." },
  { name: "Guduru Spandana", place: "3rd Place (shared) · ₹50K", role: "2K → 11.5K followers in one month · 1.8M viral reel", body: "AI education for non-technical audiences. Grew from 2,000 to 11.5K+ followers organically in a month. Viral reel with 1.8M+ views and consistent 100K–500K performance. Secured early-stage brand deals. Recognised by prominent creators in the startup ecosystem." },
  { name: "Parag Jain", place: "Special Recognition · ₹50K", role: "YouTube · Entertainment & social experiments", body: "First brand sponsorship secured with just 5 videos. 100%+ average view duration on YouTube Shorts. Scaled reach from 800 to 25K+ impressions in 7 days." },
];

const FINALISTS = [
  { name: "Ananya Kulshrestha", handle: "@ananyarchives_", note: "14.4K followers. 2.5M+ views. ₹3L brand collaboration secured over 10 months. Fashion and lifestyle niche." },
  { name: "@delhi_per_sqft", handle: "Guneet Singh Narula & team", note: "15K followers. 40M+ views. Built one of the fastest-growing creator-led offline IPs. Delhi real estate and culture." },
  { name: "Saiansh Gupta", handle: "LinkedIn · Finance", note: "Managed a ₹96L+ portfolio through LinkedIn content. 30K+ impressions per post. Finance and investing niche." },
  { name: "Sidhanth Dhall & team", handle: "@sidhant_dhall", note: "12.4K followers. 15M+ views. Lifestyle and culture content." },
];

const MENTORS = [
  { name: "Deepak Pareek", handle: "@dkpareek · 383K followers", role: "Digital creator & podcast host · Host of The Chill Hour", body: "Teaches authentic storytelling and conversational content. How to build an audience that trusts you before they buy from you." },
  { name: "Ishaan Arora", handle: "@ishaanarora1 · 428K followers", role: "AI educator · Co-founder, FinLadder · 50K+ taught · 5,000+ placed", body: "Teaches how to turn complex knowledge into engaging educational content that builds authority and drives career outcomes." },
  { name: "Gaurav Ghai", handle: "@thegauravghai · 594K followers", role: "AI-certified SDE · 3× TEDx speaker", body: "Teaches students to scale creative output with AI tools. How to produce more, faster, without compromising quality." },
  { name: "Daksh Sethi", handle: "@thewolfofjobstreet", role: "Serial entrepreneur · 7× TEDx speaker", body: "Teaches high-impact communication. How to dominate any platform — not just with content, but with presence." },
];

const QUOTES = [
  { quote: "Before CCC, I never thought students could build a brand on LinkedIn. I've since been invited to panels, offered internship interviews, and now mentor juniors on how to build their own narrative online.", who: "Siddhanth Vengali" },
  { quote: "CCC showed me the importance of storytelling and audience psychology. Winning the LinkedIn track made content creation feel less overwhelming and more intentional.", who: "Saiansh Gupta" },
  { quote: "CCC helped me find my clear point of view in a crowded space. It wasn't just content — it was an execution strategy.", who: "Guduru Spandana" },
];

function Page() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>The Creator Challenge at Masters&apos; Union</div>
      </div>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Creator Challenge</div>
        <h1 className="mt-6 max-w-[24ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          A student founded a socks brand, closed 7 brand deals in one month, and hit 5M+ views. While enrolled.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          150+ students build real audiences, close real brand deals, and generate real revenue across Instagram, YouTube, and LinkedIn. 100+ channels. 5 Mn+ cumulative followers. 46M+ aggregate reach. The assignment: grow a real audience. Some got very, very good at it.
        </p>
      </section>

      <section id="stats" className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-10">
              <div className="text-[clamp(1.5rem,2.6vw,2.2rem)] leading-none tracking-[-0.03em]">{s.value}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Why This Exists</div>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>The creator economy is not a side hustle. It is a ₹2,200 Cr industry in India, growing at 25% annually. Every business, every brand, every founder today needs to understand how to build an audience, how to communicate in the language of platforms, and how to turn distribution into revenue.</p>
          <p>So Masters&apos; Union made it a course. Not an elective. Not a club. A structured, credit-bearing, mentor-supported programme where students build real personal brands from scratch — and are graded on how well the market responds.</p>
        </div>
      </section>

      <section id="phases" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Three Phases</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {PHASES.map((p) => (
            <article key={p.name} className="bg-white p-8 md:p-10">
              <h3 className="text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-tight">{p.name}</h3>
              <p className="mt-5 text-[0.98rem] leading-[1.7] text-black/75">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The Brand Hackathon — PGP Edition</div>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
            <p>A high-pressure environment built to mirror doomscrolling. Content has to stop the scroll of real founders — in real time, in a randomised rapid-fire sequence.</p>
            <p>8+ real D2C brand partners issue live pain points as problem statements. Students respond with broadcast-quality content, produced with professional editors, deployed live across platforms within 24 hours. Founders from Perfora, Vama, Smylo, Anveshan, Rabitat, Bruno Milano, Soverenn, and WanderOn watch and react on the spot.</p>
            <p>This is not a simulation of what brand collaboration looks like. It is brand collaboration — with the stakes, the time pressure, and the public judgement intact.</p>
            <p className="font-medium text-black/90">80+ live brand assets deployed. 40+ teams competing. ₹10L+ prize pool. 24-hour turnaround.</p>
          </div>
        </div>
      </section>

      <section id="winners" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>UG Winners — Class of 2028</div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {WINNERS.map((w, i) => (
            <article key={w.name} className="flex flex-col">
              <PortraitCard name={w.name} variant={i} chip="Winner" />
              <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>{w.place}</div>
              <h3 className="mt-2 text-[1.15rem] font-medium leading-tight">{w.name}</h3>
              <div className="mt-1 text-[12px] italic text-black/60">{w.role}</div>
              <p className="mt-3 text-[0.92rem] leading-[1.65] text-black/75">{w.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Other Finalists Worth Noting</div>
        <div className="mt-6 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {FINALISTS.map((f) => (
            <div key={f.name} className="bg-white p-6">
              <div className="text-[1rem] font-medium leading-tight">{f.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{f.handle}</div>
              <p className="mt-4 text-[0.88rem] leading-[1.6] text-black/70">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mentors" className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Mentors</div>
          <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
            {MENTORS.map((m) => (
              <article key={m.name} className="bg-white p-8">
                <h3 className="text-[1.15rem] font-medium leading-tight">{m.name}</h3>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>{m.handle}</div>
                <div className="mt-2 text-[12px] italic text-black/60">{m.role}</div>
                <p className="mt-4 text-[0.95rem] leading-[1.7] text-black/75">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What Students Say</div>
        <div className="mt-10 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.who} className="bg-white p-8">
              <blockquote className="text-[1.05rem] italic leading-[1.5] text-black/85">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[11px] uppercase tracking-[0.22em] text-black/60" style={{ fontFamily: MONO }}>— {q.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">Stop consuming. Start dominating.</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white hover:opacity-80" style={{ fontFamily: MONO }}>
            Apply to Masters&apos; Union <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/creator-challenge")({
  head: () => ({
    meta: [
      { title: "Creator Challenge — Masters' Union" },
      { name: "description", content: "46M+ reach. 5M+ followers. 120+ creators. ₹10L+ prize pool. Real brand deals. Real revenue. All while enrolled." },
    ],
  }),
  component: Page,
});
