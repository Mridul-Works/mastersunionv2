import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion";
import Lenis from "lenis";

export const Route = createFileRoute("/how-to-teach")({
  head: () => ({
    meta: [
      { title: "How We Teach — Masters' Union" },
      { name: "description", content: "Your grade is your revenue. The Masters' Union model: classroom theory + real ventures, semester by semester." },
      { property: "og:title", content: "How We Teach — Masters' Union" },
      { property: "og:description", content: "Stop studying businesses. Build one. The market is the final examiner." },
    ],
  }),
  component: HowWeTeachPage,
});

const ACCENT = ["#C94A4A", "#9CC58B", "#EBA15A"] as const;

const HERO_STATS = [
  { value: "₹3.38 Cr", label: "Revenue, one fair, one semester" },
  { value: "200+", label: "Startups founded by students" },
  { value: "₹593 Cr", label: "Total portfolio valuation" },
  { value: "6", label: "Shark Tank India appearances" },
];

type Semester = {
  n: string;
  tag: string;
  title: string;
  inClass: string;
  outClass: string;
  proof: { value: string; label: string }[];
  stories: { name: string; meta: string; body: string }[];
};

const SEMESTERS: Semester[] = [
  {
    n: "01",
    tag: "Semester 1",
    title: "The Dropshipping Fair",
    inClass:
      "Unit economics, pricing strategy, digital marketing, customer psychology — taught by practitioners from Amazon, McKinsey, and India's D2C founders.",
    outClass:
      "Every student sources a product, lists it, runs ads, handles orders, and manages returns. No simulation. No sample dataset. Real suppliers, real customers, real money changing hands.",
    proof: [
      { value: "₹3.38 Cr", label: "Total revenue, Cohort '25" },
      { value: "50", label: "Teams competing" },
      { value: "₹4L+", label: "Average per team" },
    ],
    stories: [
      {
        name: "Lexi's Gourmet Sandwiches",
        meta: "Co'24 · D2C food",
        body: "₹1 Cr+ ARR. Gurgaon's highest-rated gourmet sandwich brand. 4.5+/5 on Swiggy and Zomato within 3 months of launch. Born in an MU classroom.",
      },
      {
        name: "Eat Atlas",
        meta: "Ishita Gupta & Mayuresh Jadhav, Co'24",
        body: "Premium chips and dips, global cuisine flavours, D2C model. Unit economics learned InClass, validated OutClass.",
      },
    ],
  },
  {
    n: "02",
    tag: "Semester 2",
    title: "The Creator Economy",
    inClass:
      "Brand building, content strategy, distribution models, monetisation — taught by founders who have done it.",
    outClass:
      "Each student builds a YouTube channel or Instagram presence on a topic they choose. Grows it. Monetises it. The subscriber count is the grade. The sponsorship is the proof.",
    proof: [
      { value: "100+", label: "Channels built" },
      { value: "5 Mn+", label: "Cumulative followers" },
      { value: "NPS", label: "The subscribe button" },
    ],
    stories: [
      {
        name: "Series C Podcast",
        meta: "Student-led · every cohort",
        body: "150+ episodes across 4 seasons. Interviews with Kunal Bahl, Ghazal Alagh — booked, produced, and distributed entirely by students.",
      },
      {
        name: "Behind Closed Doors",
        meta: "Student-produced series",
        body: "Real startup pitches to real VCs, unfiltered. Filmed and edited by students. Learning content strategy by making it.",
      },
    ],
  },
  {
    n: "03",
    tag: "Semester 3 & Beyond",
    title: "Venture Initiation Programme",
    inClass:
      "Fundraising, cap tables, investor relations, scaling operations — taught by VCs and founders who have raised real capital.",
    outClass:
      "Students take their venture to the next level. Some raise VC money. Some hit ₹1 Cr ARR. Some appear on Shark Tank. 100+ VCs from Sequoia, Nexus, Antler, and InfoEdge attend Demo Day.",
    proof: [
      { value: "₹25.24 Cr", label: "Raised by students" },
      { value: "₹593 Cr", label: "Total valuation" },
      { value: "180+", label: "Jobs created" },
    ],
    stories: [
      {
        name: "Dharmil Bavishi — Bullspree",
        meta: "PGP '22",
        body: "$1.88M raised. Appeared on Shark Tank India. Backed by Aman Gupta and Peyush Bansal. Started as an OutClass project.",
      },
      {
        name: "Nikhil Gaur — Hive School",
        meta: "PGP '25",
        body: "India's first sales school. ₹2 Cr revenue run rate. 3 cohorts completed. Shark Tank appearance. Built while still a student.",
      },
      {
        name: "Reyansh Juneja — MemoTag",
        meta: "UG '28",
        body: "Dementia care wearable. A first-year undergraduate pitching to national investors on primetime television.",
      },
      {
        name: "PlaySuper",
        meta: "Co'24",
        body: "India's first gaming commerce startup. $1.5M raised from 100X.VC and IAN Fund.",
      },
    ],
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

function HowWeTeachPage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-white text-[#1a1a1a] antialiased">
      <Nav />
      <Philosophy />
      <Timeline />
      <ReportCard />
      <CTA />
    </main>
  );
}

function ImagePlaceholder({ ratio = "16 / 9", label = "Image", className = "" }: { ratio?: string; label?: string; className?: string; }) {
  return (
    <div role="img" aria-label={`${label} placeholder`} className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed border-black/15 bg-[#f4f1ea] ${className}`} style={{ aspectRatio: ratio }}>
      <svg aria-hidden className="absolute inset-0 h-full w-full text-black/5" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" />
      </svg>
      <span className="relative font-mono text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]/35">{label}</span>
    </div>
  );
}

function Nav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="pointer-events-auto -full bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/70 backdrop-blur transition hover:text-[#1a1a1a]">
        ← Masters' Union
      </Link>
      <span className="rounded-none bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/50 backdrop-blur">
        How we teach
      </span>
    </div>
  );
}

function Timeline() {
  return (
    <section className="relative overflow-hidden border-t border-black/10 bg-[#fafaf7] px-6 py-12 md:px-12 md:py-16">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/50">The flowchart</div>
        <h2 className="font-display max-w-[22ch] text-balance text-[clamp(1.2rem,3.3vw,2.4rem)] font-bold leading-[1] tracking-tight">
          Three semesters. One continuous build.
        </h2>
        <p className="font-display mt-2.5 max-w-[58ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-[#1a1a1a]/65">
          Each semester follows the same loop. You learn it in class, ship it in the market, and the numbers come back as your grade.
        </p>
        <ImagePlaceholder ratio="21 / 6" label="Classroom → market" className="mt-6" />
        <div className="mt-7 space-y-6">
          {SEMESTERS.map((s, i) => (
            <SemesterFlow key={s.n} sem={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SemesterFlow({ sem, index }: { sem: Semester; index: number; }) {
  const color = ACCENT[index];
  const isLast = index === SEMESTERS.length - 1;
  const [openNode, setOpenNode] = useState<number | null>(null);

  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: flowRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 });

  const nodes = [
    { kind: "In Class", tone: "solid" as const, body: sem.inClass },
    { kind: "Out Class", tone: "outline" as const, body: sem.outClass },
    { kind: "Market", tone: "solid" as const, customTitle: "Real signals", body: "Orders. Customers. Sponsorships. Reviews. Retention. The market reacts in real time." },
    { kind: "Assessment", tone: "solid" as const, stats: sem.proof },
  ];

  const renderBox = (n: (typeof nodes)[number], i: number) => (
    <FlowBox
      key={i}
      nodeIndex={i}
      kind={n.kind}
      accent={color}
      tone={n.tone}
      body={"body" in n ? n.body : undefined}
      customTitle={"customTitle" in n ? n.customTitle : undefined}
      stats={"stats" in n ? n.stats : undefined}
      isOpen={openNode === i}
      onToggle={() => setOpenNode(openNode === i ? null : i)}
      progress={progress}
      threshold={i / (nodes.length - 1)}
    />
  );

  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
      <motion.div className="flex flex-wrap items-center justify-between gap-4 border-l-4 bg-white px-5 py-4" style={{ borderLeftColor: color }} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/55">{sem.tag} · No. {sem.n}</span>
          <h3 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight tracking-tight">{sem.title}</h3>
        </div>
        <span className="rounded-none px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-[#1a1a1a]" style={{ backgroundColor: `${color}1A` }}>
          Loop {sem.n}
        </span>
      </motion.div>

      <div ref={flowRef} className="mt-3">
        <div className="hidden md:block">
          <HorizontalRail progress={progress} count={nodes.length} />
          <div className="mt-2 grid grid-cols-4 gap-4">{nodes.map(renderBox)}</div>
        </div>
        <div className="grid grid-cols-[24px_1fr] gap-3 md:hidden">
          <VerticalRail progress={progress} count={nodes.length} />
          <div className="flex flex-col gap-4">{nodes.map(renderBox)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/55">What students built</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/40">{String(sem.stories.length).padStart(2, "0")} ventures</span>
        </div>
        <StoryDeck stories={sem.stories} />
      </div>

      {!isLast && (
        <motion.div className="relative mt-4 flex items-center justify-center" aria-hidden initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <motion.span className="relative bg-[#fafaf7] px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/70" animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            ↓ Next semester
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}

function StoryDeck({ stories }: { stories: { name: string; meta: string; body: string }[]; }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const idx = Math.round(el.scrollLeft / (cardWidth + 16));
    setActive(Math.max(0, Math.min(stories.length - 1, idx)));
  };

  return (
    <div className="relative">
      <div ref={scrollRef} onScroll={onScroll} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollPaddingLeft: 16, scrollPaddingRight: 16 }}>
        {stories.map((st, i) => (
          <StoryCard key={i} story={st} index={i} total={stories.length} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {stories.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} aria-label={`Go to card ${i + 1}`} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === active ? 28 : 8, background: i === active ? "linear-gradient(90deg,#39B5D7,#F7D544,#E38330)" : "rgba(0,0,0,0.15)" }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[#1a1a1a]/70 transition disabled:opacity-30 hover:border-[#1a1a1a]/40 hover:text-[#1a1a1a]" aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => scrollTo(Math.min(stories.length - 1, active + 1))} disabled={active === stories.length - 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[#1a1a1a]/70 transition disabled:opacity-30 hover:border-[#1a1a1a]/40 hover:text-[#1a1a1a]" aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, index, total }: { story: { name: string; meta: string; body: string }; index: number; total: number; }) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3 }} className="group relative shrink-0 snap-start overflow-hidden rounded-[22px] border border-black/8 bg-white p-3 md:p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_-22px_rgba(227,131,48,0.4)] w-[58vw] max-w-[320px] md:w-[312px] md:max-w-[336px] min-h-[210px] md:min-h-[288px] flex flex-col">
      <span aria-hidden className="absolute inset-y-0 left-0 w-[4px]" style={{ background: "linear-gradient(180deg, #39B5D7 0%, #F7D544 50%, #E38330 100%)" }} />
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: "radial-gradient(circle, #F7D544 0%, #E38330 60%, transparent 100%)" }} />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="font-display leading-[0.85] tracking-[-0.06em] text-[#1a1a1a] text-[clamp(2.7rem,7.2vw,4.5rem)]" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/40 pt-3">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 min-w-0">
          <h4 className="font-display text-[clamp(0.96rem,1.92vw,1.35rem)] font-semibold leading-[1.05] tracking-tight text-[#1a1a1a]">{story.name}</h4>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-[#1a1a1a]/55">{story.meta}</div>
          <p className="mt-3 text-[0.8rem] md:text-[0.9rem] leading-relaxed text-[#1a1a1a]/75 line-clamp-3 md:line-clamp-none">{story.body}</p>
        </div>
        <div className="mt-auto pt-3 md:pt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/40">Student venture</span>
          <motion.span aria-hidden className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full border border-black/10 text-[#1a1a1a]/60 transition-colors group-hover:border-[#1a1a1a]/40 group-hover:text-[#1a1a1a]" initial={false} whileHover={{ rotate: -45 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

function FlowBox({ nodeIndex: _nodeIndex, kind, body, accent, tone, customTitle, stats, isOpen, onToggle, progress, threshold }: { nodeIndex: number; kind: string; body?: string; accent: string; tone: "solid" | "outline"; customTitle?: string; stats?: { value: string; label: string }[]; isOpen: boolean; onToggle: () => void; progress: MotionValue<number>; threshold: number; }) {
  const hasMore = !!body && body.length > 90;
  const preview = hasMore && !isOpen ? body!.slice(0, 88).trimEnd() + "…" : body;

  const [reached, setReached] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    const r = v >= threshold - 0.001;
    if (r !== reached) setReached(r);
  });

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      layout
      className="relative flex flex-col rounded-[16px] bg-white p-4 text-left"
      style={{
        boxShadow: reached ? `0 8px 22px -16px ${accent}99` : tone === "solid" ? `0 2px 8px -4px rgba(0,0,0,0.12)` : `0 2px 8px -4px rgba(0,0,0,0.08)`,
      }}
      animate={{ opacity: 1, y: reached ? -1 : 0 }}
      whileHover={{ y: -2, boxShadow: `0 16px 32px -20px ${accent}AA` }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#1a1a1a]" style={{ opacity: tone === "solid" ? 1 : 0.75 }}>{kind}</span>
        <motion.span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "rgba(26,26,26,0.35)" }} animate={{ rotate: isOpen ? 45 : 0, scale: 1 }} transition={{ duration: 1.4 }}>
          {hasMore ? "+" : tone === "solid" ? "▣" : "◉"}
        </motion.span>
      </div>
      {customTitle && (
        <div className="font-display mt-3 text-[1rem] font-medium tracking-tight">{customTitle}</div>
      )}
      {body && (
        <AnimatePresence initial={false} mode="wait">
          <motion.p key={isOpen ? "full" : "preview"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }} className="font-display mt-3 text-[0.85rem] leading-relaxed text-[#1a1a1a]/75">
            {preview}
          </motion.p>
        </AnimatePresence>
      )}
      {stats && (
        <div className="mt-3 space-y-2">
          {stats.map((s, i) => (
            <motion.div key={i} className="flex items-baseline justify-between gap-2 border-b border-dashed border-black/10 pb-1.5 last:border-0 last:pb-0" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <span className="font-display text-[1.05rem] font-light tracking-tight text-[#1a1a1a]">{s.value}</span>
              <span className="text-right font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#1a1a1a]/55">{s.label}</span>
            </motion.div>
          ))}
        </div>
      )}
      {hasMore && (
        <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.28em] text-[#1a1a1a]/40">
          {isOpen ? "Click to collapse" : "Click to expand"}
        </span>
      )}
    </motion.button>
  );
}

function railStops(count: number) {
  const start = 6;
  const end = 94;
  return Array.from({ length: count }, (_, i) => count === 1 ? 50 : start + ((end - start) * i) / (count - 1));
}

function HorizontalRail({ progress, count }: { progress: MotionValue<number>; count: number; }) {
  const stops = railStops(count);
  const trackWidth = stops[stops.length - 1] - stops[0];
  const fillWidth = useTransform(progress, [0, 1], [0, trackWidth]);
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="hidden md:block h-4 w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="mu-gradient-h" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#39B5D7" />
          <stop offset="0.47" stopColor="#F7D544" />
          <stop offset="1" stopColor="#E38330" />
        </linearGradient>
        <filter id="rail-blur" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <rect x={stops[0]} y="3.5" width={trackWidth} height="3" rx="1.5" fill="rgba(0,0,0,0.08)" />
      <motion.rect x={stops[0]} y="2.5" width={fillWidth} height="6" rx="3" fill="url(#mu-gradient-h)" filter="url(#rail-blur)" opacity="0.45" />
      <motion.rect x={stops[0]} y="3" width={fillWidth} height="4" rx="2" fill="url(#mu-gradient-h)" />
      {stops.map((cx, i) => (
        <RailDot key={i} cx={cx} cy={5} progress={progress} threshold={i / (count - 1)} />
      ))}
    </svg>
  );
}

function VerticalRail({ progress, count }: { progress: MotionValue<number>; count: number; }) {
  const stops = railStops(count);
  const trackHeight = stops[stops.length - 1] - stops[0];
  const fillHeight = useTransform(progress, [0, 1], [0, trackHeight]);
  return (
    <svg viewBox="0 0 10 100" preserveAspectRatio="none" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="mu-gradient-v" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#39B5D7" />
          <stop offset="0.47" stopColor="#F7D544" />
          <stop offset="1" stopColor="#E38330" />
        </linearGradient>
      </defs>
      <rect x="3.5" y={stops[0]} width="3" height={trackHeight} rx="1.5" fill="rgba(0,0,0,0.08)" />
      <motion.rect x="3" y={stops[0]} width="4" height={fillHeight} rx="2" fill="url(#mu-gradient-v)" style={{ height: fillHeight as unknown as number }} />
      {stops.map((cy, i) => (
        <RailDot key={i} cx={5} cy={cy} progress={progress} threshold={i / (count - 1)} />
      ))}
    </svg>
  );
}

function RailDot({ cx, cy, progress, threshold }: { cx: number; cy: number; progress: MotionValue<number>; threshold: number; }) {
  const [lit, setLit] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    const r = v >= threshold - 0.001;
    if (r !== lit) setLit(r);
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r="1.6" fill="#fafaf7" stroke="rgba(0,0,0,0.15)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      <motion.circle cx={cx} cy={cy} r="1.6" fill="url(#mu-gradient-h)" vectorEffect="non-scaling-stroke" animate={{ scale: lit ? 1 : 0, opacity: lit ? 1 : 0 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
    </g>
  );
}

function ReportCard() {
  return (
    <section className="border-t border-black/10 bg-white px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/50">Your report card</div>
        <h2 className="font-display mt-2 max-w-[22ch] text-balance text-[clamp(1.2rem,3.3vw,2.4rem)] font-bold leading-[1] tracking-tight">
          Four metrics. No rubric. No subjective scoring.
        </h2>
        <p className="font-display mt-2.5 max-w-[58ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-[#1a1a1a]/65">
          Just what the market decided about your work.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {REPORT_CARD.map((m, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-black/8 bg-white p-6">
              <div className="flex items-baseline justify-between">
                <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light tracking-tight">{m.metric}</div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/40">0{i + 1}</span>
              </div>
              <div aria-hidden className="mt-3 h-px w-10" style={{ backgroundColor: ACCENT[i % ACCENT.length] }} />
              <p className="font-display mt-4 text-[1.05rem] leading-relaxed text-[#1a1a1a]/75">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="border-t border-black/10 bg-[#fafaf7] px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/50">The philosophy</div>
        <ImagePlaceholder ratio="21 / 7" label="Editorial hero" className="mt-8" />
        <blockquote className="font-display mt-8 text-balance text-[clamp(2.2rem,6.5vw,5rem)] font-light leading-[1.05] tracking-tight">
          <span className="mu-gradient-text">"</span>Traditional B-schools grade you on how well you
          understood the case study. We grade you on whether you{" "}
          <span className="italic mu-gradient-text">became one.</span>
          <span className="mu-gradient-text">"</span>
        </blockquote>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <p className="font-display max-w-[52ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[#1a1a1a]/75">
            India's best business schools taught students how to analyse businesses — not how to build them. The best case studies in the world couldn't replicate what it felt like when a real customer said no, or when a margin turned negative on week three.
          </p>
          <p className="font-display max-w-[52ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-[#1a1a1a]/75">
            We saw this gap up close and inverted the model. The classroom exists to give you the tools. The venture is where you use them. Your grade is what the market says — not what a professor decides behind a marking sheet.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={i} className="rounded-2xl border border-black/8 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/55">
                <span className="inline-block h-1.5 w-6" style={{ backgroundColor: ACCENT[i % ACCENT.length] }} />
                Pillar 0{i + 1}
              </div>
              <h3 className="font-display mt-4 text-[clamp(1.3rem,2.2vw,1.7rem)] font-bold leading-tight tracking-tight">{p.title}</h3>
              <p className="font-display mt-3 text-[1.05rem] leading-relaxed text-[#1a1a1a]/75">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-black/10 bg-[#1a1a1a] px-6 py-14 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-balance text-[clamp(1.6rem,4.8vw,3.6rem)] font-bold leading-[0.95] tracking-tight">
          Stop studying businesses. <br />
          <span className="italic mu-gradient-text">Build one.</span>
        </h2>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
          Applications open for the next cohort
        </p>
        <Link to="/" className="mt-6 inline-flex items-center gap-3 border-[1.5px] border-transparent bg-[#1a1a1a] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-[#1a1a1a]" style={{ borderImage: "linear-gradient(91deg, #39B5D7 -6.14%, #F7D544 47.02%, #E38330 99.71%) 1" }}>
          Apply to Masters' Union →
        </Link>
      </div>
      <div className="mx-auto mt-8 max-w-5xl border-t border-white/10 pt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
        The market is the final examiner.
      </div>
    </section>
  );
}
