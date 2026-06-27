import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img01 from "@/assets/mu-01.jpg";
import img02 from "@/assets/mu-02.jpg";
import img03 from "@/assets/mu-03.jpg";
import img04 from "@/assets/mu-04.jpg";
import img05 from "@/assets/mu-05.jpg";
import img06 from "@/assets/mu-06.jpg";
import img07 from "@/assets/mu-07.jpg";
import img08 from "@/assets/mu-08.jpg";
import img09 from "@/assets/mu-09.jpg";
import img10 from "@/assets/mu-10.jpg";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  n: string;
  tag: string;
  headline: string;
  body: string;
  stats: { value: string; label: string }[];
  cta: string;
  image: string;
  bg: string;
  ink: string;
};

const CARDS: Card[] = [
  {
    n: "01", tag: "Curriculum",
    headline: "Your grade depends on how much money you made.",
    body: "Forget GPA. Your report card is your P&L. 50 teams ran real e-commerce stores and made ₹3.38 Cr — before their first midterm. The market doesn't accept late submissions.",
    stats: [
      { value: "₹3.38 Cr", label: "Cohort revenue" },
      { value: "₹45L", label: "Top team" },
      { value: "50", label: "Competing teams" },
    ],
    cta: "See the syllabus", image: img01, bg: "#6B1F2A", ink: "#F5E9D4",
  },
  {
    n: "02", tag: "Entrepreneurship",
    headline: "Our students built startups worth ₹593 crore.",
    body: "30+ startups. 6 Shark Tank India appearances. One founder was still figuring out his hostel mess timetable. We don't incubate ideas. We incubate revenue.",
    stats: [
      { value: "₹593 Cr", label: "Total valuation" },
      { value: "₹480 Cr", label: "Projected FY26" },
      { value: "6", label: "On Shark Tank India" },
      { value: "180+", label: "Jobs created" },
    ],
    cta: "Start building", image: img02, bg: "#1F4D3F", ink: "#EFE7D6",
  },
  {
    n: "03", tag: "Mentors",
    headline: "500+ mentors. One hour or less.",
    body: "Burning cash faster than you planned? Talk to a founder who's been there twice. Need a GTM playbook? Ask someone who launched last quarter. 500+ mentors who actually pick up.",
    stats: [
      { value: "500+", label: "Mentors on call" },
      { value: "<1 hr", label: "Avg response" },
      { value: "On demand", label: "Not on stage" },
    ],
    cta: "Get the hotline", image: img03, bg: "#1E2B58", ink: "#E8E3D2",
  },
  {
    n: "04", tag: "Food Lab",
    headline: "We built a food incubator with real kitchens inside a B-school.",
    body: "Other B-schools have cafeterias. We have a commercial kitchen where students launch actual food brands. Lexi's went from classroom concept to Gurgaon's highest-rated sandwich brand.",
    stats: [
      { value: "4.5+", label: "Lexi's Zomato rating" },
      { value: "₹1 Cr+", label: "ARR" },
      { value: "Cohort '24", label: "Founded" },
    ],
    cta: "Taste the lab", image: img04, bg: "#C99211", ink: "#1A1408",
  },
  {
    n: "05", tag: "Immersions",
    headline: "A term travelling 7,000 km across India. Or flying to INSEAD.",
    body: "Choose your adventure: 7,000 km across India meeting CXOs, or 7 countries with INSEAD and BMW. Both count for credits.",
    stats: [
      { value: "7,000 km", label: "Bharat route" },
      { value: "7", label: "Countries" },
      { value: "40+", label: "CXO sessions" },
      { value: "50+", label: "Immersions" },
    ],
    cta: "Pick your trip", image: img05, bg: "#B5482A", ink: "#F4E5CC",
  },
  {
    n: "06", tag: "Faculty",
    headline: "40% of our faculty are sitting CEOs and MDs.",
    body: "Your finance professor is the MD of Morgan Stanley. Your marketing prof runs a unicorn. They're currently running the companies you're learning about.",
    stats: [
      { value: "40%", label: "Practitioners" },
      { value: "200+", label: "Industry experts" },
      { value: "30%", label: "Ivy-league visiting" },
    ],
    cta: "Meet your bosses", image: img06, bg: "#1C1C1C", ink: "#E9DFC9",
  },
  {
    n: "07", tag: "Term 2",
    headline: "The assignment: grow a real audience.",
    body: "One student made ₹45L selling socks on Instagram. Another hit 5M+ views while still figuring out hostel wifi. Here, your 'extracurricular' might pay your tuition.",
    stats: [
      { value: "100+", label: "Channels built" },
      { value: "5 Mn+", label: "Followers" },
      { value: "150+", label: "Active creators" },
      { value: "46M+", label: "Aggregate reach" },
    ],
    cta: "See the creators", image: img07, bg: "#4B2240", ink: "#F1E3CE",
  },
  {
    n: "08", tag: "Campus",
    headline: "Your classroom is inside DLF Cyberpark. So is your future employer.",
    body: "Your classroom is in DLF Cyberpark. So is Google. So is Microsoft. Your commute to the recruiter is shorter than your commute to the canteen.",
    stats: [
      { value: "85%", label: "Fortune 500 ≤ 2 km" },
      { value: "DLF", label: "Cyberpark, Gurugram" },
      { value: "LEED", label: "Platinum certified" },
    ],
    cta: "Walk the campus", image: img08, bg: "#14233F", ink: "#E6DDC8",
  },
  {
    n: "09", tag: "Life at MU",
    headline: "A day here can rather be a bit unusual.",
    body: "9 AM: Strategy with a sitting CEO. 2 PM: Shoot content in our studio. 6 PM: Call with a Sequoia partner. 11 PM: Kitchen experiments in Food Lab.",
    stats: [
      { value: "40%", label: "Faculty are CEOs" },
      { value: "500+", label: "Mentors on call" },
      { value: "24/7", label: "Campus access" },
    ],
    cta: "Live the day", image: img09, bg: "#8A3A12", ink: "#F2E4CB",
  },
  {
    n: "10", tag: "Placements",
    headline: "Alumni salaries grow 10–20% every single year after they leave.",
    body: "₹61.98L highest CTC. 3x average salary jump. 28% of grads join as Founder's Office or Chief of Staff — because they already built things.",
    stats: [
      { value: "₹61.98L", label: "Highest CTC" },
      { value: "3x", label: "Salary jump" },
      { value: "10–20%", label: "Annual growth" },
    ],
    cta: "See salaries", image: img10, bg: "#4A5A1E", ink: "#EFE7D0",
  },
];

export function TenThings() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || !trackRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const pin = pinRef.current!;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".mu-hcard");
      cards.forEach((card) => {
        const image = card.querySelector(".mu-hcard-image");
        const meta = card.querySelector(".mu-hcard-meta");
        const headline = card.querySelector(".mu-hcard-headline");
        const body = card.querySelector(".mu-hcard-body");
        const stats = card.querySelectorAll(".mu-hcard-stat");
        const cta = card.querySelector(".mu-hcard-cta");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(card, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(image, { scale: 1.2, duration: 1.2, ease: "power3.out" }, "<")
          .from(meta, { y: 20, opacity: 0, duration: 0.5 }, "-=0.5")
          .from(headline, { y: 30, opacity: 0, duration: 0.6 }, "-=0.35")
          .from(body, { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
          .from(stats, { y: 18, opacity: 0, duration: 0.45, stagger: 0.07 }, "-=0.3")
          .from(cta, { y: 14, opacity: 0, duration: 0.4 }, "-=0.2");
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ten-things"
      ref={rootRef}
      className="bg-background"
    >
      {/* Intro */}
      <div className="px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/55">
                <span className="h-px w-10 bg-foreground/30" />
                <span>A field guide</span>
              </div>
              <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[0.98] tracking-tight">
                Cut the marketing.
                <br />
                <span className="italic text-foreground/70">
                  10 things you should know about Masters&rsquo; Union.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-foreground/60">
              Scroll. Cards slide sideways as you go.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal pinned track */}
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 px-[8vw] will-change-transform"
        >
          {CARDS.map((card) => (
            <article
              key={card.n}
              className="mu-hcard flex h-[78vh] w-[88vw] max-w-[1100px] shrink-0 overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.55)] sm:w-[78vw]"
              style={{ backgroundColor: card.bg, color: card.ink }}
            >
              <div className="grid w-full grid-cols-1 sm:grid-cols-2">
                <div
                  className="relative min-h-[260px] overflow-hidden"
                  style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                >
                  <img
                    src={card.image}
                    alt={card.tag}
                    loading="lazy"
                    className="mu-hcard-image absolute inset-0 h-[115%] w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
                  <div>
                    <div className="mu-hcard-meta mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] opacity-70">
                      <span className="font-display text-[2rem] font-light leading-none tabular-nums opacity-90">
                        {card.n}
                      </span>
                      <span className="h-px w-8 bg-current opacity-40" />
                      <span>{card.tag}</span>
                    </div>
                    <h3 className="mu-hcard-headline font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-light leading-[1.1] tracking-tight">
                      {card.headline}
                    </h3>
                    <p className="mu-hcard-body mt-5 text-[14px] leading-relaxed opacity-90 sm:text-[16px]">
                      {card.body}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {card.stats.map((s) => (
                      <div
                        key={s.label}
                        className="mu-hcard-stat pt-3"
                        style={{ borderTop: `1px solid ${card.ink}40` }}
                      >
                        <div className="font-display text-[clamp(1.3rem,2vw,1.8rem)] font-light leading-none tracking-tight">
                          {s.value}
                        </div>
                        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] opacity-65">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mu-hcard-cta">
                    <span
                      className="inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em]"
                      style={{ borderColor: card.ink }}
                    >
                      {card.cta}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="shrink-0 pr-[8vw]" aria-hidden />
        </div>

        {/* Progress hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          ← scroll →
        </div>
      </div>
    </section>
  );
}
