import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  k: string;
  term: string;
  headline: string;
  body: string;
  stats: { v: string; l: string }[];
};

const ITEMS: Item[] = [
  {
    k: "Dropshipping Fair",
    term: "Term 1",
    headline: "Launch a live e-commerce brand from Day 1.",
    body: "Every student ships a real D2C store — sourcing, ads, funnel, fulfilment. Graded on revenue, not slides.",
    stats: [
      { v: "₹8 Cr+", l: "Cohort revenue" },
      { v: "Day 15", l: "First sale" },
      { v: "100%", l: "Students ship" },
    ],
  },
  {
    k: "Creator Challenge",
    term: "Term 2",
    headline: "Build a real audience. Land real brand deals.",
    body: "12 weeks to grow a channel from zero — YouTube, Instagram, LinkedIn. Winners cash monetised partnerships on stage.",
    stats: [
      { v: "50M+", l: "Cohort reach" },
      { v: "₹1.2 Cr", l: "Brand deals" },
      { v: "3 tracks", l: "Long / short / written" },
    ],
  },
  {
    k: "Student Investment Fund",
    term: "Term 3",
    headline: "Trade real capital. Pitch real theses.",
    body: "A student-run fund with a real corpus. You build a coverage universe, defend picks weekly, and get marked to market.",
    stats: [
      { v: "Live", l: "Corpus deployed" },
      { v: "Weekly", l: "IC reviews" },
      { v: "PM-led", l: "Public market mentors" },
    ],
  },
  {
    k: "Venture Initiation Programme",
    term: "Term 4",
    headline: "Ship the capstone venture. Pitch to investors.",
    body: "12-week zero-to-one build. Founders, cheque-writers and operators sit on your kill-committee — nothing is theatre.",
    stats: [
      { v: "200+", l: "Startups founded" },
      { v: "₹60 Cr+", l: "Follow-on funding" },
      { v: "Demo Day", l: "Live investor pitch" },
    ],
  },
  {
    k: "Corporate One-Day Challenges",
    term: "Year-round",
    headline: "CEO-set briefs. Solved in a day.",
    body: "Sitting CEOs walk in with a real board-level problem in the morning. You present your recommendation to them by evening.",
    stats: [
      { v: "24 hrs", l: "Turnaround" },
      { v: "40+", l: "Companies annually" },
      { v: "Boardroom", l: "Direct exposure" },
    ],
  },
  {
    k: "Global Immersion",
    term: "Term 4",
    headline: "Board Fortune 500 rooms. On the other side of the world.",
    body: "An international module inside operating companies — factory floors, HQ boardrooms, venture partners. Not sight-seeing.",
    stats: [
      { v: "2 weeks", l: "In-market" },
      { v: "Fortune 500", l: "Host companies" },
      { v: "1:1", l: "Executive sessions" },
    ],
  },
];

export default function SignatureCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getShift = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getShift(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${getShift()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(ITEMS.length - 1, Math.round(self.progress * (ITEMS.length - 1)));
            setActive(i);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const jump = (i: number) => {
    const st = ScrollTrigger.getAll().find((s) => s.trigger === wrapRef.current);
    if (!st) return;
    const p = i / (ITEMS.length - 1);
    const y = st.start + (st.end - st.start) * p;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="border-y border-black/10 bg-[#0a0a0a] text-white">
      <div ref={wrapRef} className="relative h-screen w-full overflow-hidden">
        {/* Header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1400px] items-end justify-between px-6 pt-8 sm:px-10 sm:pt-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Signature learning experiences
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.02] tracking-[-0.02em]">
              Six things you'll actually do — not just study.
            </h2>
          </div>
          <div className="hidden font-mono text-[11px] tracking-[0.2em] text-white/50 md:block">
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(ITEMS.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 pl-6 pr-[50vw] pt-40 sm:gap-8 sm:pl-10"
          style={{ willChange: "transform" }}
        >
          {ITEMS.map((it, i) => (
            <article
              key={it.k}
              className="relative flex h-[62vh] w-[78vw] shrink-0 flex-col justify-between border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-sm sm:w-[52vw] sm:p-10 lg:w-[42vw]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[clamp(9rem,18vw,16rem)] font-black leading-none text-white/[0.06]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  {it.term}
                </div>
                <div className="mt-3 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.05] tracking-[-0.01em]">
                  {it.k}
                </div>
                <p className="mt-6 max-w-md font-display text-[clamp(1.15rem,1.5vw,1.5rem)] leading-[1.15] tracking-[-0.01em] text-white/90">
                  {it.headline}
                </p>
                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/60">
                  {it.body}
                </p>
              </div>
              <div className="relative z-10 mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {it.stats.map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-[20px] leading-none tracking-tight">{s.v}</div>
                    <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white/45">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="pointer-events-auto flex items-center gap-1.5">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => jump(i)}
                aria-label={`Go to experience ${i + 1}`}
                className="h-[3px] w-10 overflow-hidden bg-white/15"
              >
                <span
                  className="block h-full origin-left bg-white transition-transform duration-500"
                  style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
          <div className="pointer-events-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/50">
            <span className="hidden sm:inline">Scroll</span>
            <span className="flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
