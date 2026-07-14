import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, Quote, BarChart3, Building2, Trophy } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import { PortraitCard } from "@/components/PortraitCard";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "infra", label: "Infra", icon: Building2 },
  { id: "portfolio", label: "Portfolio", icon: Trophy },
  { id: "closing", label: "Apply", icon: Quote },
];

const STATS = [
  { value: "₹593 Cr", label: "Total portfolio valuation" },
  { value: "₹480 Cr", label: "Projected revenue across portfolio, FY26" },
  { value: "6", label: "Student startups on Shark Tank India" },
  { value: "180+", label: "Jobs created by student founders" },
  { value: "30+", label: "Startups incubated inside Masters' Union" },
  { value: "₹1.2 Cr", label: "In grants disbursed to student founders" },
];

const INFRA = [
  {
    name: "The MU Fund",
    tag: "₹5 Cr · student-managed",
    body: "A ₹5 Cr student-managed investment fund. Students source deals, conduct due diligence, and make real investment decisions alongside real VCs — not in a simulation, but with actual capital. The fund has consistently beaten public markets by 20–25%. Students manage it. Students own the outcome.",
  },
  {
    name: "MU Grants",
    tag: "₹1.2 Cr disbursed",
    body: "₹1.2 Cr disbursed to date to student founders who show early traction. No equity taken. No strings attached. A bet on you before the market has made one. Applications are reviewed by the MU Ventures team and decided quickly — because founders should be building, not waiting.",
  },
  {
    name: "Demo Day",
    tag: "100+ VCs · every year",
    body: "100+ VCs in the room, every year. Sequoia, Nexus, Antler, InfoEdge — and dozens more. Students pitch live ventures to real investors who write real cheques. Some deals close in the room. Some close in the follow-up email sent before leaving the building. Demo Day is not a showcase. It is a fundraising event.",
  },
  {
    name: "Founder's Fellowship",
    tag: "₹50,000/mo · 12 months",
    body: "₹50,000 per month for one year post-graduation — for every student who chooses to build over placing. Unlimited fellowships per cohort. No equity taken. No conditions. And if the venture doesn't work out, you can still sit for placements with the next batch. So choosing to build costs you nothing except the courage to try.",
  },
  {
    name: "Get Prepped — Mentor Union",
    tag: "500+ mentors · <1 hr",
    body: "500+ mentors on call. Fundraising advice, product feedback, market research, legal guidance — available in under an hour. Not a once-a-semester guest lecture. An actual hotline to the people who have already solved the problem you are facing right now.",
  },
];

const PORTFOLIO = [
  {
    name: "Eight.Network",
    meta: "Co'21 · $3.1M raised · ~$5M ARR",
    body: "Indian audio streaming platform backed by Kae Capital and Venture Highway. Built by MU's very first cohort. Eight.Network has crossed $5M in annual recurring revenue — one of the few student-founded ventures in India to reach that scale within a few years of graduating. They were students here when they started. The market decided the rest.",
  },
  {
    name: "Dharmil Bavishi — Bullspree",
    meta: "PGP '22 · $1.88M seed raised",
    body: "Sports gaming platform. Appeared on Shark Tank India, backed by Aman Gupta and Peyush Bansal, with additional investment from IVY Growth Associates and Desai Ventures. Started as an OutClass venture in Term 1.",
  },
  {
    name: "Nikhil Gaur — Hive School",
    meta: "PGP '25 · ₹2 Cr revenue run rate",
    body: "India's first dedicated sales school. Three cohorts completed. Shark Tank India appearance. Backed by MU grants. Built entirely while Nikhil was still a student at Masters' Union.",
  },
  {
    name: "Reyansh Juneja — MemoTag",
    meta: "UG '28 · Bootstrapped · Shark Tank India",
    body: "A dementia care wearable built by a first-year undergraduate. Reyansh had not completed his first year when he appeared on national television pitching to India's most prominent investors. He is still enrolled.",
  },
  {
    name: "PlaySuper",
    meta: "Co'24 · $1.5M raised",
    body: "India's first gaming commerce startup. Backed by 100X.VC and IAN Fund. The founders raised institutional capital before graduating.",
  },
  {
    name: "Lexi's Gourmet Sandwiches",
    meta: "Co'24 · ₹1 Cr+ ARR",
    body: "Cloud kitchen, gourmet sandwiches. Rated 4.5+/5 on Swiggy and Zomato within three months of launch. Started in the Masters' Union Food Lab. Now expanding from Gurgaon to Delhi.",
  },
];

function StartupsPage() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#closing" />

      {/* Chapter marker */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black"
          style={{ fontFamily: MONO }}
        >
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>
          Entrepreneurship at Masters&apos; Union
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
          Entrepreneurship
        </div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-black">
          A school that incubates startups is still just a school. We are building a portfolio.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          30+ student startups. ₹593 Cr in total valuation. Six appearances on Shark Tank India —
          including one by a first-year undergraduate who hadn&apos;t finished his first semester.
          We don&apos;t wait for students to graduate before calling them founders. The portfolio
          starts on day one.
        </p>
      </section>

      {/* STATS — 6-up grid */}
      <section id="stats" className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-10">
              <div className="text-[clamp(1.8rem,3.2vw,2.8rem)] leading-none tracking-[-0.03em] text-black">
                {s.value}
              </div>
              <div
                className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/60"
                style={{ fontFamily: MONO }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE INFRASTRUCTURE */}
      <section id="infra" className="mx-auto max-w-6xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
          The Infrastructure
        </div>
        <h2 className="mt-5 max-w-[28ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
          Most schools give you a pitch competition. We give you a fund, a grant, and a room full
          of VCs.
        </h2>
        <p className="mt-8 max-w-[68ch] text-[1.05rem] leading-[1.65] text-black/70">
          Entrepreneurship at Masters&apos; Union is not a track you opt into. It is built into
          every semester. Every student runs a real venture from Term 1 — a live e-commerce
          business, a personal brand, a company pitched to 100 VCs. By the time you reach the
          Venture Initiation Programme, you are not preparing to be a founder. You already are one.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
          {INFRA.map((i) => (
            <article key={i.name} className="flex flex-col bg-white p-8 md:p-10">
              <div
                className="text-[10px] uppercase tracking-[0.24em] text-black/55"
                style={{ fontFamily: MONO }}
              >
                {i.tag}
              </div>
              <h3 className="mt-4 text-[clamp(1.3rem,2vw,1.7rem)] font-medium leading-tight text-black">
                {i.name}
              </h3>
              <p className="mt-5 text-[1rem] leading-[1.7] text-black/75">{i.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* THE PORTFOLIO */}
      <section
        id="portfolio"
        className="mt-24 border-t border-black/10 bg-neutral-50 md:mt-32"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-black/55"
            style={{ fontFamily: MONO }}
          >
            The Portfolio
          </div>
          <h2 className="mt-5 max-w-[32ch] text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Six startups on Shark Tank India. One founder was in his first year of undergrad.
          </h2>
          <p className="mt-6 max-w-[68ch] text-[1.05rem] leading-[1.65] text-black/70">
            These are not alumni success stories from a decade ago. These are students who built
            while enrolled — and the market noticed.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((p, i) => (
              <article key={p.name} className="flex flex-col">
                <PortraitCard name={p.name} variant={i} chip="Portfolio" />
                <h3 className="mt-5 text-[1.15rem] font-medium leading-tight text-black">{p.name}</h3>
                <div
                  className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/60"
                  style={{ fontFamily: MONO }}
                >
                  {p.meta}
                </div>
                <p className="mt-4 text-[0.95rem] leading-[1.65] text-black/75">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE + CLOSING */}
      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
        <blockquote className="text-balance text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] tracking-[-0.01em] text-black">
          &ldquo;A school that incubates startups is still just a school. We are building a
          portfolio.&rdquo;
        </blockquote>
        <div className="mt-10 space-y-5 text-[1.05rem] leading-[1.7] text-black/75">
          <p>
            Most institutions add entrepreneurship as a feature. An incubation cell here. A pitch
            night there. A certificate if you show up. We built Masters&apos; Union around the
            opposite assumption: that the only way to learn to build is to build, and the only way
            to build is to have real stakes — real customers, real money, real consequences when it
            doesn&apos;t work.
          </p>
          <p>
            The result is not a programme. It is a portfolio of companies, built by people in their
            twenties, that collectively employ 180+ people and are projected to generate ₹480 Cr in
            revenue this financial year. That number will be larger next year. Because the next
            cohort is already building.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-none bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: MONO }}
          >
            If you&apos;re going to build something, build it here <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black/[0.04]"
            style={{ fontFamily: MONO }}
          >
            ← Back to all 10 things
          </Link>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Entrepreneurship — Masters' Union" },
      {
        name: "description",
        content:
          "30+ student startups. ₹593 Cr valuation. 6 on Shark Tank India. ₹480 Cr projected FY26 revenue. The portfolio starts on day one.",
      },
    ],
  }),
  component: StartupsPage,
});
