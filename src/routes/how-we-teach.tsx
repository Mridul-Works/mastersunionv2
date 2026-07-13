import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const PAGE_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "report", label: "Report" },
  { id: "philosophy", label: "Philosophy" },
];

const HERO_STATS = [
  { value: "₹3.38 Cr", label: "Revenue, one semester" },
  { value: "200+", label: "Startups founded by students" },
  { value: "₹593 Cr", label: "Total portfolio valuation" },
  { value: "6", label: "Shark Tank India appearances" },
];

type Semester = {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  inClass: string;
  outClass: string;
  proof: string[];
  stories: { name: string; body: string }[];
  accent: string; // bg color for stage
  ink: string; // text color
};

const SEMESTERS: Semester[] = [
  {
    id: "sem1",
    eyebrow: "Semester 1",
    title: "The Dropshipping Fair",
    tagline: "Source. List. Sell. Learn what a customer really wants.",
    inClass:
      "Unit economics, pricing strategy, digital marketing, customer psychology — taught by practitioners from Amazon, McKinsey, and India's D2C founders.",
    outClass:
      "Every student sources a product, lists it, runs ads, handles orders, manages returns. No simulation. Real suppliers. Real customers. Real money.",
    proof: ["₹3.38 Cr revenue, Cohort '25", "50 teams", "₹4L+ avg per team"],
    stories: [
      {
        name: "Lexi's Gourmet Sandwiches — Co'24",
        body: "₹1 Cr+ ARR. Gurgaon's highest-rated gourmet sandwich brand. 4.5+/5 on Swiggy and Zomato within 3 months of launch.",
      },
      {
        name: "Eat Atlas — Co'24",
        body: "Premium chips and dips, global cuisine flavours, D2C. Unit economics learned InClass, validated OutClass.",
      },
    ],
    accent: "#F4EFE6",
    ink: "#111111",
  },
  {
    id: "sem2",
    eyebrow: "Semester 2",
    title: "The Creator Economy",
    tagline: "Build an audience. Ship content. Turn attention into revenue.",
    inClass:
      "Brand building, content strategy, distribution models, monetisation — taught by founders who have done it.",
    outClass:
      "Each student builds a YouTube channel or Instagram presence on a topic they choose. Grows it. Monetises it. The subscriber count is the grade.",
    proof: ["100+ channels built", "5 Mn+ cumulative followers", "NPS — the subscribe button"],
    stories: [
      {
        name: "Series C Podcast — student-led",
        body: "150+ episodes, 4 seasons. Student interviews with Karan Johar, Kunal Bahl, Ghazal Alagh — booked, produced, distributed entirely by students.",
      },
      {
        name: "Behind Closed Doors",
        body: "Real startup pitches to real VCs, unfiltered. Filmed and edited by students. Learning content strategy by making it.",
      },
    ],
    accent: "#E9E4F5",
    ink: "#111111",
  },
  {
    id: "sem3",
    eyebrow: "Semester 3 & beyond",
    title: "Venture Initiation",
    tagline: "Raise capital. Scale operations. Put your name on the cap table.",
    inClass:
      "Fundraising, cap tables, investor relations, scaling operations — taught by VCs and founders who have raised real capital.",
    outClass:
      "Students take their venture to the next level. Some raise VC money. Some hit ₹1 Cr ARR. Some appear on Shark Tank. 100+ VCs from Sequoia, Nexus, Antler attend Demo Day.",
    proof: ["₹25.24 Cr raised", "₹593 Cr valuation", "180+ jobs created"],
    stories: [
      {
        name: "Dharmil Bavishi — PGP '22, Bullspree",
        body: "$1.88M seed raised. Appeared on Shark Tank India. Backed by Aman Gupta and Peyush Bansal. Started as an OutClass project.",
      },
      {
        name: "Nikhil Gaur — PGP '25, Hive School",
        body: "India's first sales school. ₹2 Cr revenue run rate. 3 cohorts completed. Shark Tank appearance. Backed by MU grants.",
      },
    ],
    accent: "#111111",
    ink: "#F4EFE6",
  },
];

const REPORT_CARD = [
  { metric: "Revenue", body: "Did real people pay real money for what you built? The Stripe dashboard doesn't lie." },
  { metric: "Margin", body: "Did you keep enough of it? A business that sells but bleeds is not a business yet." },
  { metric: "Profit", body: "Are your unit economics sound? Every rupee in needs to justify itself." },
  { metric: "NPS", body: "Would your customers recommend you? The only score that predicts everything else." },
];

const PILLARS = [
  { title: "Revenue is truth", body: "It tells you whether anyone wanted what you made. Everything else is a hypothesis until this number moves." },
  { title: "Margin is discipline", body: "Revenue without margin is theatre. A business that can't keep money is a charity with extra steps." },
  { title: "NPS is the final exam", body: "Would your customer do it again? Would they bring a friend? That is the whole report card, compressed into one number." },
];

export const Route = createFileRoute("/how-we-teach")({
  head: () => ({
    meta: [
      { title: "How We Teach — Your grade is your revenue · Masters' Union" },
      {
        name: "description",
        content:
          "Scroll the Masters' Union journey — from Semester 1 dropshipping fairs to Semester 3 venture raises. Your grade comes from customers, not professors.",
      },
      { property: "og:title", content: "How We Teach — Masters' Union" },
      {
        property: "og:description",
        content: "Your grade is your revenue. The Masters' Union journey, semester by semester.",
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



      {/* FOUNDER QUOTE — dark, scroll text reveal */}
      <FounderQuote />

      {/* IMMERSIVE JOURNEY — zoom cards after the letter */}
      <JourneyScroll />



      {/* REPORT CARD */}
      <section id="report" className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: MONO }}>
            Your report card
          </div>
          <h2 className="mt-4 max-w-[24ch] text-balance text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            What your report card looks like.
          </h2>
          <p className="mt-6 max-w-[60ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-white/75">
            Four metrics. No rubric. No subjective scoring. Just what the market decided about your work.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2">
            {REPORT_CARD.map((r) => (
              <div key={r.metric} className="bg-black p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: MONO }}>
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
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
            Philosophy
          </div>
          <blockquote className="mt-8 text-balance text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] tracking-[-0.01em]">
            &ldquo;Traditional B-schools grade you on how well you understood the case study. We grade
            you on whether you became one.&rdquo;
          </blockquote>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="border-t border-black pt-6">
                <h3 className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-tight">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-black/75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <h2 className="text-balance text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          Stop studying businesses. Build one.
        </h2>
        <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-black/60" style={{ fontFamily: MONO }}>
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

/* ============================================================
   Immersive scroll: pinned stage that zooms through each stop
   ============================================================ */

function JourneyScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // 4 stops: Overview map, Sem1, Sem2, Sem3
  // Divide the 0-1 range into 4 equal slots.
  const STOPS = 4;
  const slot = 1 / STOPS; // 0.25

  return (
    <section
      id="journey"
      ref={wrapRef}
      className="relative"
      style={{ height: `${STOPS * 130}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-neutral-100">
        {/* progress bar */}
        <ProgressRail progress={scrollYProgress} labels={["Journey", "Sem 1", "Sem 2", "Sem 3"]} />

        {/* Stop 0 — overview */}
        <Stage progress={scrollYProgress} start={0} end={slot} first>
          <OverviewStage />
        </Stage>

        {/* Stops 1..3 — semesters */}
        {SEMESTERS.map((sem, i) => (
          <Stage
            key={sem.id}
            progress={scrollYProgress}
            start={(i + 1) * slot}
            end={(i + 2) * slot}
            last={i === SEMESTERS.length - 1}
          >
            <SemesterStage sem={sem} index={i + 1} />
          </Stage>
        ))}
      </div>
    </section>
  );
}

function Stage({
  progress,
  start,
  end,
  first,
  last,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
}) {
  const w = end - start;
  const enterEnd = start + w * 0.35;
  const holdEnd = start + w * 0.7;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));

  const scale = useTransform(progress, (v) => {
    if (v <= enterEnd) {
      const from = first ? 1 : 0.35;
      const t = (v - (start - w * 0.2)) / (enterEnd - (start - w * 0.2));
      return lerp(from, 1, t);
    }
    if (v <= holdEnd) return 1;
    const to = last ? 1 : 2.2;
    const t = (v - holdEnd) / (end + w * 0.1 - holdEnd);
    return lerp(1, to, t);
  });

  const opacity = useTransform(progress, (v) => {
    if (first && v < start) return 1;
    if (last && v > end) return 1;
    if (v < start) {
      const t = (v - (start - w * 0.25)) / (w * 0.25);
      return lerp(0, 0.15, t);
    }
    if (v < enterEnd) {
      const t = (v - start) / (enterEnd - start);
      return lerp(0.15, 1, t);
    }
    if (v < holdEnd) return 1;
    if (v < end) {
      const t = (v - holdEnd) / (end - holdEnd);
      return lerp(1, 0, t);
    }
    return 0;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

function ProgressRail({
  progress,
  labels,
}: {
  progress: MotionValue<number>;
  labels: string[];
}) {
  const width = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-5 md:px-10 md:pt-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-[10px] uppercase tracking-[0.28em] text-black/50" style={{ fontFamily: MONO }}>
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="mx-auto mt-3 h-[2px] max-w-6xl bg-black/10">
        <motion.div className="h-full bg-black" style={{ width }} />
      </div>
    </div>
  );
}

function OverviewStage() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
      <div
        className="text-[11px] uppercase tracking-[0.35em] text-black/55"
        style={{ fontFamily: MONO }}
      >
        The journey
      </div>
      <h2 className="mt-6 text-balance text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
        Three semesters.<br />One venture built.
      </h2>
      <p className="mt-8 max-w-[52ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.55] text-black/65">
        Keep scrolling — you&apos;ll zoom into each semester in order. Product first. Audience next.
        Capital last.
      </p>

      <div className="mt-14 grid w-full grid-cols-3 gap-3 md:gap-6">
        {SEMESTERS.map((s, i) => (
          <div
            key={s.id}
            className="border border-black/15 bg-white/70 p-4 text-left backdrop-blur md:p-6"
          >
            <div
              className="text-[10px] uppercase tracking-[0.3em] text-black/50"
              style={{ fontFamily: MONO }}
            >
              0{i + 1}
            </div>
            <div className="mt-3 text-[clamp(0.95rem,1.3vw,1.15rem)] leading-tight">
              {s.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-14 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-black/50"
        style={{ fontFamily: MONO }}
      >
        <span>↓</span> Scroll to zoom in
      </div>
    </div>
  );
}

function SemesterStage({ sem, index }: { sem: Semester; index: number }) {
  const dark = sem.accent === "#111111";
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: sem.accent, color: sem.ink }}
    >
      {/* huge decorative number */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none text-[42vw] font-medium leading-none tracking-[-0.06em] md:-right-10 md:-top-24"
        style={{ color: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
      >
        0{index}
      </div>

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
        <div
          className="text-[11px] uppercase tracking-[0.35em] opacity-60"
          style={{ fontFamily: MONO }}
        >
          {sem.eyebrow}
        </div>
        <h2 className="mt-4 max-w-[16ch] text-balance text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          {sem.title}
        </h2>
        <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.6vw,1.35rem)] leading-[1.4] opacity-80">
          {sem.tagline}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-10">
          <div
            className="border-t pt-4"
            style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)" }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.3em] opacity-60"
              style={{ fontFamily: MONO }}
            >
              In class
            </div>
            <p className="mt-3 text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.55] opacity-85">
              {sem.inClass}
            </p>
          </div>
          <div
            className="border-t pt-4"
            style={{ borderColor: dark ? "#ffffff" : "#000000" }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO }}
            >
              OutClass
            </div>
            <p className="mt-3 text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.55]">
              {sem.outClass}
            </p>
          </div>
        </div>

        {/* proof */}
        <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
          {sem.proof.map((p) => (
            <span
              key={p}
              className="rounded-none border px-3 py-1.5 text-[11px]"
              style={{
                fontFamily: MONO,
                borderColor: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* stories — compact */}
        <div className="mt-6 hidden grid-cols-2 gap-4 md:mt-8 md:grid">
          {sem.stories.map((story) => (
            <article
              key={story.name}
              className="border p-5"
              style={{
                borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
                backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
              }}
            >
              <h3 className="text-[15px] leading-tight">{story.name}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] opacity-80">{story.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Founder quote — dark section with scroll-driven word reveal
   ============================================================ */

const FOUNDER_QUOTE_PARAGRAPHS: string[] = [
  "Most schools teach you how to analyse a business. We make you run one.",
  "Every semester, what you learn in class — you deploy outside it. On a real business. With real customers. For real money.",
  "We don't believe in case studies about someone else's decisions. We believe in putting you in a position where you have to make the decision yourself — and live with what happens next.",
  "The frameworks you learn on Monday should be stress-tested by Friday. The concept you study in the morning should have a real-world application by the afternoon. And at the end of the term, your grade doesn't come from me or any professor in this building.",
  "It comes from the market.",
  "Revenue. Margin. Profit. NPS. Four numbers. No subjectivity. No partial credit for a well-structured answer that didn't actually work.",
  "That is the only education worth giving. And it is the only one we know how to deliver.",
];

function FounderQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const totalWords = FOUNDER_QUOTE_PARAGRAPHS.reduce(
    (acc, p) => acc + p.split(" ").length,
    0,
  );

  return (
    <section
      ref={ref}
      className="relative border-t border-white/10 bg-black text-white"
      style={{ fontFamily: INTER, height: "300vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 md:px-10 md:py-24">
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-white/50"
            style={{ fontFamily: MONO }}
          >
            A note from the founder
          </div>

          <div className="mt-8 space-y-6 text-balance text-[clamp(1.15rem,2.2vw,1.9rem)] leading-[1.4] tracking-[-0.01em]">
            {FOUNDER_QUOTE_PARAGRAPHS.map((p, pi) => {
              const before = FOUNDER_QUOTE_PARAGRAPHS.slice(0, pi).reduce(
                (acc, s) => acc + s.split(" ").length,
                0,
              );
              const pWords = p.split(" ");
              return (
                <p key={pi}>
                  {pWords.map((w, wi) => {
                    const idx = before + wi;
                    const start = idx / totalWords;
                    const end = Math.min(1, start + 1.5 / totalWords);
                    return (
                      <RevealWord
                        key={`${pi}-${wi}`}
                        progress={scrollYProgress}
                        start={start}
                        end={end}
                      >
                        {w}
                      </RevealWord>
                    );
                  })}
                </p>
              );
            })}
          </div>

          <div
            className="mt-10 text-[11px] uppercase tracking-[0.28em] text-white/60"
            style={{ fontFamily: MONO }}
          >
            — Pratham Mittal, Founder, Masters&apos; Union
          </div>
        </div>
      </div>
    </section>
  );
}


function RevealWord({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <>
      <motion.span style={{ opacity, color: "rgba(255,255,255,1)" }} className="inline">
        {children}
      </motion.span>{" "}
    </>
  );
}

