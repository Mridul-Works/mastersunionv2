import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const PAGE_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "sem1", label: "Sem 1" },
  { id: "sem2", label: "Sem 2" },
  { id: "report", label: "Report" },
  { id: "philosophy", label: "Philosophy" },
];

const TICKER = [
  "₹3.38 Cr revenue — 50 teams — one semester",
  "200+ startups founded by students",
  "₹25.24 Cr raised by student ventures",
  "₹593 Cr total portfolio valuation",
  "5 Mn+ social followers built in class",
  "6 Shark Tank appearances",
  "₹5 Cr fund — beats markets by 20–25%",
];

const HERO_STATS = [
  { value: "₹3.38 Cr", label: "Revenue, one fair, one semester" },
  { value: "200+", label: "Startups founded by students" },
  { value: "₹593 Cr", label: "Total portfolio valuation" },
  { value: "6", label: "Shark Tank India appearances" },
];

type Semester = {
  id: string;
  eyebrow: string;
  title: string;
  inClass: string;
  outClass: string;
  proof: string[];
  stories: { name: string; body: string }[];
};

const SEMESTERS: Semester[] = [
  {
    id: "sem1",
    eyebrow: "Semester 1",
    title: "The Dropshipping Fair",
    inClass:
      "Unit economics, pricing strategy, digital marketing, customer psychology — taught by practitioners from Amazon, McKinsey, and India's D2C founders.",
    outClass:
      "Every student sources a product, lists it, runs ads, handles orders, and manages returns. No simulation. No sample dataset. Real suppliers. Real customers. Real money changing hands.",
    proof: ["₹3.38 Cr total revenue, Cohort '25", "50 teams competing", "₹4L+ average per team"],
    stories: [
      {
        name: "Lexi's Gourmet Sandwiches — Co'24",
        body: "₹1 Cr+ ARR. Gurgaon's highest-rated gourmet sandwich brand. Rated 4.5+/5 on Swiggy and Zomato within 3 months of launch. Born in an MU classroom.",
      },
      {
        name: "Eat Atlas — Ishita Gupta & Mayuresh Jadhav, Co'24",
        body: "Premium chips and dips, global cuisine flavours, D2C model. Unit economics learned InClass, validated OutClass.",
      },
    ],
  },
  {
    id: "sem2",
    eyebrow: "Semester 2",
    title: "The Creator Economy",
    inClass:
      "Brand building, content strategy, distribution models, monetisation — taught by founders who have done it.",
    outClass:
      "Each student builds a YouTube channel or Instagram presence on a topic they choose. Grows it. Monetises it. The subscriber count is the grade. The sponsorship is the proof.",
    proof: ["100+ channels built", "5 Mn+ cumulative followers", "NPS — the subscribe button"],
    stories: [
      {
        name: "Series C Podcast — student-led, every cohort",
        body: "150+ episodes, 4 seasons. Student interviews with Karan Johar, Kunal Bahl, Ghazal Alagh — booked, produced, and distributed entirely by students.",
      },
      {
        name: "Behind Closed Doors — student-produced series",
        body: "Real startup pitches to real VCs, unfiltered. Filmed and edited by students. Learning content strategy by making it.",
      },
    ],
  },
  {
    id: "sem3",
    eyebrow: "Semester 3 & beyond",
    title: "Venture Initiation Programme",
    inClass:
      "Fundraising, cap tables, investor relations, scaling operations — taught by VCs and founders who have raised real capital.",
    outClass:
      "Students take their venture to the next level. Some raise VC money. Some hit ₹1 Cr ARR. Some appear on Shark Tank. 100+ VCs from Sequoia, Nexus, Antler, and InfoEdge attend Demo Day.",
    proof: ["₹25.24 Cr raised by students", "₹593 Cr total valuation", "180+ jobs created"],
    stories: [
      {
        name: "Dharmil Bavishi — PGP '22, Bullspree",
        body: "$1.88M seed raised. Appeared on Shark Tank India. Backed by Aman Gupta and Peyush Bansal. Started as an OutClass project.",
      },
      {
        name: "Nikhil Gaur — PGP '25, Hive School",
        body: "India's first sales school. ₹2 Cr revenue run rate. 3 cohorts completed. Shark Tank appearance. Backed by MU grants. Built while still a student.",
      },
      {
        name: "Reyansh Juneja — UG '28, MemoTag",
        body: "Dementia care wearable. A first-year undergraduate student pitching to national investors on primetime television.",
      },
      {
        name: "PlaySuper — Co'24",
        body: "India's first gaming commerce startup. $1.5M raised from 100X.VC and IAN Fund.",
      },
    ],
  },
];

const REPORT_CARD = [
  {
    metric: "Revenue",
    body: "Did real people pay real money for what you built? The Stripe dashboard doesn't lie.",
  },
  {
    metric: "Margin",
    body: "Did you keep enough of it? A business that sells but bleeds is not a business yet.",
  },
  {
    metric: "Profit",
    body: "Are your unit economics sound? Every rupee in needs to justify itself.",
  },
  {
    metric: "NPS",
    body: "Would your customers recommend you? The only score that predicts everything else.",
  },
];

const PILLARS = [
  {
    title: "Revenue is truth",
    body: "It tells you whether anyone wanted what you made. Everything else is a hypothesis until this number moves.",
  },
  {
    title: "Margin is discipline",
    body: "Revenue without margin is theatre. A business that can't keep money is a charity with extra steps.",
  },
  {
    title: "NPS is the final exam",
    body: "Would your customer do it again? Would they bring a friend? That is the whole report card, compressed into one number.",
  },
];

export const Route = createFileRoute("/how-we-teach")({
  head: () => ({
    meta: [
      { title: "How We Teach — Your grade is your revenue · Masters' Union" },
      {
        name: "description",
        content:
          "At Masters' Union your grade comes from customers, margins, and NPS — not a professor. See the InClass + OutClass model that has produced ₹3.38 Cr in semester revenue and 200+ student ventures.",
      },
      { property: "og:title", content: "How We Teach — Masters' Union" },
      {
        property: "og:description",
        content: "Your grade is your revenue. The Masters' Union model, semester by semester.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowWeTeachPage,
});

function HowWeTeachPage() {
  return (
    <main
      id="top"
      className="min-h-screen bg-white pb-28 text-black md:pb-32"
      style={{ fontFamily: INTER }}
    >
      <SectionNav items={PAGE_NAV} applyHref="#apply" />

      {/* Top marker */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black"
          style={{ fontFamily: MONO }}
        >
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div
          className="text-[11px] uppercase tracking-[0.25em] text-black/55"
          style={{ fontFamily: MONO }}
        >
          The MU Model
        </div>
      </div>


      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:px-10 md:pt-28">
        <div
          className="text-[11px] uppercase tracking-[0.3em] text-black/55"
          style={{ fontFamily: MONO }}
        >
          The Masters&apos; Union model
        </div>
        <h1 className="mt-6 max-w-[18ch] text-balance text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black">
          Your grade is your revenue.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          Every semester, you study in class — and then you build a real business outside it. Your
          marks don&apos;t come from a professor. They come from customers, margins, and whether
          people would recommend you.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-px border border-black/10 bg-black/10 md:grid-cols-4">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-white px-4 py-10 text-center">
              <div className="text-[clamp(1.6rem,3.2vw,2.8rem)] leading-none tracking-[-0.03em] text-black">
                {s.value}
              </div>
              <div
                className="mx-auto mt-3 max-w-[22ch] text-[10px] uppercase tracking-[0.2em] text-black/60"
                style={{ fontFamily: MONO }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEMESTERS */}
      {SEMESTERS.map((sem, idx) => (
        <section
          key={sem.id}
          id={sem.id}
          className={`border-t border-black/10 ${idx % 2 === 0 ? "bg-neutral-50" : "bg-white"}`}
        >
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
            <div
              className="text-[11px] uppercase tracking-[0.3em] text-black/55"
              style={{ fontFamily: MONO }}
            >
              {sem.eyebrow}
            </div>
            <h2 className="mt-4 text-balance text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1] tracking-[-0.02em] text-black">
              {sem.title}
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-black/15 pt-6">
                <div
                  className="text-[11px] uppercase tracking-[0.3em] text-black/60"
                  style={{ fontFamily: MONO }}
                >
                  In class
                </div>
                <p className="mt-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-black/75">
                  {sem.inClass}
                </p>
              </div>
              <div className="border-t border-black pt-6">
                <div
                  className="text-[11px] uppercase tracking-[0.3em] text-black"
                  style={{ fontFamily: MONO }}
                >
                  OutClass
                </div>
                <p className="mt-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-black/85">
                  {sem.outClass}
                </p>
              </div>
            </div>

            {/* proof strip */}
            <div className="mt-12 flex flex-wrap gap-2">
              {sem.proof.map((p) => (
                <span
                  key={p}
                  className="rounded-none border border-black/15 px-3 py-1.5 text-[12px] text-black/80"
                  style={{ fontFamily: MONO }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* stories */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {sem.stories.map((story) => (
                <article
                  key={story.name}
                  className="border border-black/10 bg-white p-6 md:p-8"
                >
                  <h3 className="text-[clamp(1.1rem,1.6vw,1.35rem)] leading-tight text-black">
                    {story.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-black/75">{story.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* REPORT CARD */}
      <section id="report" className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-white/60"
            style={{ fontFamily: MONO }}
          >
            Your report card
          </div>
          <h2 className="mt-4 max-w-[24ch] text-balance text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            What your report card looks like.
          </h2>
          <p className="mt-6 max-w-[60ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-white/75">
            Four metrics. No rubric. No subjective scoring. Just what the market decided about your
            work.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2">
            {REPORT_CARD.map((r) => (
              <div key={r.metric} className="bg-black p-8 md:p-10">
                <div
                  className="text-[11px] uppercase tracking-[0.3em] text-white/60"
                  style={{ fontFamily: MONO }}
                >
                  {r.metric}
                </div>
                <p className="mt-4 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-white/90">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-black/55"
            style={{ fontFamily: MONO }}
          >
            Philosophy
          </div>
          <blockquote className="mt-8 text-balance text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] tracking-[-0.01em] text-black">
            &ldquo;Traditional B-schools grade you on how well you understood the case study. We
            grade you on whether you became one.&rdquo;
          </blockquote>

          <div className="mt-14 space-y-6 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.75] text-black/75">
            <p>
              India&apos;s best business schools taught students how to analyse businesses — not how
              to build them. The best case studies in the world couldn&apos;t replicate what it felt
              like when a real customer said no, or when a margin turned negative on week three.
            </p>
            <p>
              Pratham Mittal saw this gap up close. As co-founder of Outgrow, he learned that the
              hardest, most durable lessons in business came only when real money was at stake and
              real customers could walk away. No simulation captures that.
            </p>
            <p>
              So Masters&apos; Union inverted the model. The classroom exists to give you the tools.
              The venture is where you use them. Your grade is what the market says — not what a
              professor decides behind a marking sheet.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="border-t border-black pt-6">
                <h3 className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-tight text-black">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-black/75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <h2 className="text-balance text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-black">
          Stop studying businesses. Build one.
        </h2>
        <p
          className="mt-6 text-[11px] uppercase tracking-[0.3em] text-black/60"
          style={{ fontFamily: MONO }}
        >
          Applications open for the next cohort
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/applications_center"
            className="inline-flex items-center gap-2 rounded-none bg-black px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: MONO }}
          >
            Apply to Masters&apos; Union <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-none border border-black/15 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black/[0.04]"
            style={{ fontFamily: MONO }}
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
