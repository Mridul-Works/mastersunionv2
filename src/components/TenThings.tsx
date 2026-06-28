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
  { n: "01", tag: "PLACEMENTS", stat: "₹34L", label: "Median first salary",
    body: "Not the toppers. Not the outliers. The median graduate earned ₹34L in their first role — across AI companies, global brands, and boutique advisory firms.",
    substats: [{ v: "₹72L", l: "Highest offer" }, { v: "91%", l: "Placed in 60 days" }, { v: "38%", l: "Into tech / AI" }],
    chips: ["Zepto", "McKinsey", "a16z", "Razorpay", "Google", "Peak XV"], chipStyle: [1,1,0,1,1,0], image: mu01 },
  { n: "02", tag: "FACULTY", stat: "300+", label: "Practitioners on faculty",
    body: "Every course is led by someone who's actually done it — a founder, a CFO, a product lead. Academics are the exception, not the rule.",
    substats: [{ v: "12%", l: "Full-time academics" }, { v: "6", l: "Unicorn founders" }, { v: "22", l: "Active investors" }],
    chips: ["Kunal Shah", "Nikhil Kamath", "Varun Dua", "Ritesh Malik", "Peyush Bansal"], chipStyle: [0,0,0,0,0], image: mu02 },
  { n: "03", tag: "STUDENT VENTURES", stat: "₹50Cr", label: "Raised by students while in school",
    body: "This year alone, 300 students collectively raised ₹50 crore — before graduation. The MBA here is a launchpad, not a waiting room.",
    substats: [{ v: "40+", l: "Active startups" }, { v: "₹1.2Cr", l: "Avg. raise per founder" }, { v: "3", l: "Acqui-hires" }],
    chips: ["Sequoia Spark", "Blume", "Titan Capital", "Kae Capital", "Better Capital"], chipStyle: [1,1,1,1,1], image: mu03 },
  { n: "04", tag: "CURRICULUM", stat: "100%", label: "Industry-built curriculum",
    body: "Every module is co-designed with a company. Students don't study business — they do it. Real briefs, real data, real stakes.",
    substats: [{ v: "0", l: "Textbook-only courses" }, { v: "60+", l: "Live company projects" }, { v: "18", l: "Months, not 2 years" }],
    chips: ["Amazon", "Bain", "Mamaearth", "upGrad", "Meesho", "Nykaa"], chipStyle: [0,0,1,0,1,1], image: mu04 },
  { n: "05", tag: "COHORT", stat: "60+", label: "Countries in one cohort",
    body: "When your study group debates strategy across 60 countries of lived experience, the case study is the conversation.",
    substats: [{ v: "280", l: "Students per batch" }, { v: "41%", l: "International students" }, { v: "54%", l: "Women in cohort" }],
    chips: ["Nigeria", "Vietnam", "Colombia", "Germany", "UAE", "Indonesia"], chipStyle: [0,0,0,0,0,0], image: mu05 },
  { n: "06", tag: "MU VENTURES", stat: "₹50Cr", label: "Fund managed by students",
    body: "MU Ventures was started by students. Today it backs founders under 25, writing real cheques into real companies — from inside the classroom.",
    substats: [{ v: "22", l: "Portfolio companies" }, { v: "₹25L", l: "Avg. cheque size" }, { v: "3×", l: "Avg. follow-on rate" }],
    chips: ["Groww", "Zepto", "Slice", "Fi Money", "Jar", "Cashify"], chipStyle: [1,1,0,1,0,1], image: mu06 },
  { n: "07", tag: "SCHOLARSHIPS", stat: "₹0", label: "Upfront tuition for top scholars",
    body: "Our merit scholars pay zero upfront. We take a share of future earnings — so our incentives are completely aligned with theirs.",
    substats: [{ v: "18%", l: "Income-share rate" }, { v: "34", l: "Scholars per batch" }, { v: "₹12L", l: "Avg. salary at trigger" }],
    chips: ["Need-based", "Merit-based", "ISA model", "No collateral", "Deferred tuition"], chipStyle: [0,0,1,0,0], image: mu07 },
  { n: "08", tag: "NETWORK", stat: "4,000+", label: "Alumni across 30 countries",
    body: "Four years in, Masters' Union alumni are founding companies, running funds, and leading product teams at the world's fastest-growing companies.",
    substats: [{ v: "12", l: "Alumni-founded startups funded" }, { v: "₹280Cr", l: "Total alumni fundraise" }, { v: "6", l: "Alumni-led exits" }],
    chips: ["Flipkart", "Stripe", "Y Combinator", "Notion", "Brex", "Plaid"], chipStyle: [1,1,1,0,1,0], image: mu08 },
  { n: "09", tag: "BIOSCIENCES", stat: "4", label: "Research platforms launching 2025",
    body: "India's first practitioner-led biosciences school — with labs in genetic engineering, bioprinting, fermentation, and agricultural genomics.",
    substats: [{ v: "₹60Cr", l: "Endowment target" }, { v: "8", l: "Lab partners" }, { v: "2025", l: "First cohort" }],
    chips: ["MedGenome", "Biocon", "Strand Life Sciences", "NCBS", "IndiaBioscience"], chipStyle: [1,1,1,0,0], image: mu09 },
  { n: "10", tag: "MANDATE", stat: "1", label: "Non-negotiable rule above all others",
    body: "Every student must ship a product, close a deal, or file a patent before graduating. Learning without making is just entertainment.",
    substats: [{ v: "89%", l: "Shipped before graduation" }, { v: "14", l: "Patents filed (2024)" }, { v: "₹8Cr", l: "Student revenue generated" }],
    chips: ["Ship it", "File a patent", "Close a deal", "Build in public", "Real stakes"], chipStyle: [1,0,1,0,0], image: mu10 },
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
