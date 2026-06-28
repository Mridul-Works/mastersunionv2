import { useState } from "react";
import { Plus, X } from "lucide-react";
import mu01 from "@/assets/mu-01.jpg";
import mu02 from "@/assets/mu-02.jpg";
import mu03 from "@/assets/mu-03.jpg";
import mu04 from "@/assets/mu-04.jpg";
import mu05 from "@/assets/mu-05.jpg";
import mu06 from "@/assets/mu-06.jpg";
import mu07 from "@/assets/mu-07.jpg";
import mu08 from "@/assets/mu-08.jpg";
import mu09 from "@/assets/mu-09.jpg";
import mu10 from "@/assets/mu-10.jpg";

type Card = {
  n: string;
  tag: string;
  stat: string;
  label: string;
  body: string;
  substats: { v: string; l: string }[];
  chips: string[];
  chipStyle: number[];
  image: string;
};

const CARDS: Card[] = [
  {
    n: "01", tag: "CURRICULUM", stat: "₹3.38 Cr", label: "Cohort revenue — before midterms",
    body: "Forget GPA. Your report card is your P&L. 50 teams ran real e-commerce stores and made ₹3.38 Cr — before their first midterm. The market doesn't accept late submissions.",
    substats: [{ v: "₹45L", l: "Top team" }, { v: "50", l: "Competing teams" }, { v: "0", l: "Late submissions accepted" }],
    chips: ["Real P&L", "Live stores", "Shopify", "Meta Ads", "Stripe", "Razorpay"], chipStyle: [1,0,1,0,1,0], image: mu01,
  },
  {
    n: "02", tag: "ENTREPRENEURSHIP", stat: "₹593 Cr", label: "Total valuation of student startups",
    body: "30+ startups. 6 Shark Tank India appearances. One founder was still figuring out his hostel mess timetable. We don't incubate ideas. We incubate revenue.",
    substats: [{ v: "₹480 Cr", l: "Projected revenue, FY26" }, { v: "6", l: "On Shark Tank India" }, { v: "180+", l: "Jobs created" }],
    chips: ["Shark Tank", "Sequoia Spark", "Blume", "Titan Capital", "Y Combinator"], chipStyle: [1,1,1,1,1], image: mu03,
  },
  {
    n: "03", tag: "MENTORS", stat: "500+", label: "Mentors who actually pick up",
    body: "Burning cash faster than you planned? Talk to a founder who's been there twice. Need a GTM playbook? Ask someone who launched last quarter. 500+ mentors who actually pick up. No office hours. No waiting lists. Just answers.",
    substats: [{ v: "<1 hr", l: "Average response" }, { v: "On demand", l: "Not on stage" }, { v: "24/7", l: "Hotline open" }],
    chips: ["Kunal Shah", "Nikhil Kamath", "Varun Dua", "Ritesh Malik", "Peyush Bansal"], chipStyle: [0,0,0,0,0], image: mu02,
  },
  {
    n: "04", tag: "FOOD LAB", stat: "₹1 Cr+", label: "ARR from a student food brand",
    body: "Other B-schools have cafeterias. We have a commercial kitchen where students launch actual food brands. Lexi's went from classroom concept to Gurgaon's highest-rated sandwich brand.",
    substats: [{ v: "4.5+", l: "Lexi's Zomato rating" }, { v: "Cohort '24", l: "Founded" }, { v: "1", l: "Commercial kitchen on campus" }],
    chips: ["Lexi's", "Zomato", "Swiggy", "Real kitchens", "Student-run"], chipStyle: [1,0,0,1,0], image: mu04,
  },
  {
    n: "05", tag: "IMMERSIONS", stat: "7,000 km", label: "Bharat route across India — for credits",
    body: "Choose your adventure: 7,000 km across India meeting CXOs, or 7 countries with INSEAD and BMW. Both count for credits. Both look better on your LinkedIn than 'summer internship at dad's office.'",
    substats: [{ v: "7", l: "Countries" }, { v: "40+", l: "CXO sessions" }, { v: "50+", l: "1-day immersions" }],
    chips: ["INSEAD", "BMW", "Bharat route", "CXO access", "Global"], chipStyle: [1,1,0,1,0], image: mu05,
  },
  {
    n: "06", tag: "FACULTY", stat: "40%", label: "Faculty who are sitting CEOs & MDs",
    body: "Your finance professor is the MD of Morgan Stanley. Your marketing prof runs a unicorn. They're not retired luminaries dropping wisdom from a podium — they're currently running the companies you're learning about.",
    substats: [{ v: "200+", l: "Industry experts" }, { v: "30%", l: "Ivy-league visiting" }, { v: "0", l: "Pure academic-only tracks" }],
    chips: ["Morgan Stanley", "Harvard", "Wharton", "Unicorn CEOs", "Sitting MDs"], chipStyle: [1,0,0,1,1], image: mu06,
  },
  {
    n: "07", tag: "CREATOR CHALLENGE", stat: "46M+", label: "Aggregate reach built in one term",
    body: "One student made ₹45L selling socks on Instagram. Another hit 5M+ views while still figuring out hostel wifi. Here, your 'extracurricular' might pay your tuition.",
    substats: [{ v: "100+", l: "Channels built" }, { v: "5 Mn+", l: "Cumulative followers" }, { v: "150+", l: "Active creators" }],
    chips: ["Instagram", "YouTube", "LinkedIn", "Shorts", "Brand deals"], chipStyle: [1,1,0,0,1], image: mu07,
  },
  {
    n: "08", tag: "CAMPUS", stat: "85%", label: "Fortune 500 within 2 km of class",
    body: "Your classroom is in DLF Cyberpark. So is Google. So is Microsoft. Your commute to the recruiter is shorter than your commute to the canteen.",
    substats: [{ v: "DLF", l: "Cyberpark, Gurugram" }, { v: "LEED", l: "Platinum certified" }, { v: "2 km", l: "To your next interview" }],
    chips: ["Google", "Microsoft", "DLF Cyberpark", "Gurugram", "LEED Platinum"], chipStyle: [1,1,0,0,1], image: mu08,
  },
  {
    n: "09", tag: "LIFE AT MU", stat: "24/7", label: "Campus access — sleep is optional",
    body: "9 AM: Strategy with a sitting CEO. 2 PM: Shoot content in our studio. 6 PM: Call with a Sequoia partner. 11 PM: Kitchen experiments in Food Lab. Sleep is optional. Building is mandatory.",
    substats: [{ v: "40%", l: "Faculty are sitting CEOs" }, { v: "500+", l: "Mentors on call" }, { v: "1", l: "Studio, kitchen, fund — all on-site" }],
    chips: ["Content studio", "Food Lab", "Sequoia calls", "Always-on", "Build mode"], chipStyle: [0,1,1,0,1], image: mu09,
  },
  {
    n: "10", tag: "PLACEMENTS", stat: "₹61.98L", label: "Highest CTC — and it keeps growing",
    body: "₹61.98L highest CTC. 3x average salary jump. But the real flex? 28% of grads join as Founder's Office or Chief of Staff — because they already built things, not just studied them.",
    substats: [{ v: "3×", l: "Pre-MBA salary jump" }, { v: "10–20%", l: "Annual growth post-grad" }, { v: "28%", l: "Founder's Office / CoS" }],
    chips: ["Zepto", "McKinsey", "a16z", "Razorpay", "Google", "Peak XV"], chipStyle: [1,1,0,1,1,0], image: mu10,
  },
];

const GOLD = "#C9A84C";

export default function TenThings() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative bg-[#090909] py-20 sm:py-28" style={{ fontFamily: "Georgia, serif" }}>
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-3 flex items-center gap-3" style={{ fontFamily: "Arial, sans-serif" }}>
          <span className="h-px w-10" style={{ background: GOLD }} />
          <span className="text-[10px] tracking-[0.28em]" style={{ color: GOLD }}>CUT THE MARKETING</span>
        </div>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[#F5F2EC]">
          10 things you should know about{" "}
          <em className="italic text-[#F5F2EC]/70">Masters&apos; Union.</em>
        </h2>
        <p className="mt-5 max-w-xl text-[14px] leading-[1.6] text-[#F5F2EC]/45" style={{ fontFamily: "Arial, sans-serif" }}>
          No glossy brochure copy. Tap a card to see the numbers, the partners, and the proof behind each claim.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map((c, i) => {
          const isOpen = open === i;
          return (
            <article
              key={c.n}
              className={`group relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0f0f0f] transition-all duration-300 hover:border-[color:var(--tt-gold)]/40 ${
                isOpen ? "sm:col-span-2 lg:col-span-3 xl:col-span-4" : ""
              }`}
              style={{ ["--tt-gold" as never]: GOLD }}
            >
              {!isOpen ? (
                // ── HOOK ──
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="flex h-full w-full flex-col text-left"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.tag}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent" />
                    <div
                      className="absolute left-3 top-3 rounded-[3px] border px-2 py-1 text-[9px] tracking-[0.18em]"
                      style={{ borderColor: "rgba(201,168,76,0.35)", background: "rgba(0,0,0,0.55)", color: GOLD, fontFamily: "Arial, sans-serif" }}
                    >
                      {c.tag}
                    </div>
                    <div className="absolute right-3 top-3 text-[10px] tracking-[0.1em] text-white/30" style={{ fontFamily: "Arial, sans-serif" }}>
                      {c.n}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="text-[44px] leading-none tracking-[-1.5px] text-[#F5F2EC]">{c.stat}</div>
                      <div className="mt-2 text-[12px] leading-snug text-white/45" style={{ fontFamily: "Arial, sans-serif" }}>
                        {c.label}
                      </div>
                    </div>
                    <div
                      className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.14em] text-white/60 transition-all group-hover:border-[color:var(--tt-gold)]/60 group-hover:text-[color:var(--tt-gold)]"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      <Plus className="size-3" /> Read the proof
                    </div>
                  </div>
                </button>
              ) : (
                // ── EXPANDED ──
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-56 w-full overflow-hidden md:h-full md:min-h-[320px]">
                    <img src={c.image} alt={c.tag} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f0f]/60" />
                    <div
                      className="absolute left-4 top-4 rounded-[3px] border px-2 py-1 text-[9px] tracking-[0.18em]"
                      style={{ borderColor: "rgba(201,168,76,0.35)", background: "rgba(0,0,0,0.55)", color: GOLD, fontFamily: "Arial, sans-serif" }}
                    >
                      {c.tag}
                    </div>
                  </div>
                  <div className="relative p-6 sm:p-8">
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      aria-label="Close"
                      className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-[color:var(--tt-gold)]/60 hover:text-[color:var(--tt-gold)]"
                      style={{ ["--tt-gold" as never]: GOLD }}
                    >
                      <X className="size-4" />
                    </button>
                    <div className="text-[10px] tracking-[0.18em] text-white/30" style={{ fontFamily: "Arial, sans-serif" }}>
                      {c.n} / 10
                    </div>
                    <div className="mt-4 flex items-baseline gap-4">
                      <div className="text-[64px] leading-none tracking-[-2px] text-[#F5F2EC]">{c.stat}</div>
                      <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: GOLD, fontFamily: "Arial, sans-serif" }}>
                        {c.label}
                      </div>
                    </div>
                    <p className="mt-5 max-w-prose text-[14px] leading-[1.65] text-white/60" style={{ fontFamily: "Arial, sans-serif" }}>
                      {c.body}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
                      {c.substats.map((s) => (
                        <div key={s.l} className="bg-[#0f0f0f] p-4">
                          <div className="text-[22px] leading-none tracking-[-0.5px] text-[#F5F2EC]">{s.v}</div>
                          <div className="mt-2 text-[9px] uppercase tracking-[0.1em] text-white/35" style={{ fontFamily: "Arial, sans-serif" }}>
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {c.chips.map((chip, ci) => (
                        <span
                          key={chip}
                          className="rounded-full border px-2.5 py-1 text-[10px]"
                          style={{
                            fontFamily: "Arial, sans-serif",
                            borderColor: c.chipStyle[ci] ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.1)",
                            color: c.chipStyle[ci] ? GOLD : "rgba(255,255,255,0.5)",
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
