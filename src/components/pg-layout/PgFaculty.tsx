import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";

type FacultyMember = {
  name: string;
  role: string;
  tag: string;
  bio: string;
  focus: string[];
};

const FACULTY: FacultyMember[] = [
  {
    name: "Kunal Shah",
    role: "Founder, CRED",
    tag: "Consumer Behaviour",
    bio: "Built India's most-loved consumer fintech brand. Teaches the psychology of trust, status and retention that turns a product into a habit — and a habit into a business.",
    focus: ["Consumer Psychology", "Retention Economics", "Brand as Behaviour"],
  },
  {
    name: "Deepinder Goyal",
    role: "Founder, Zomato",
    tag: "Building at Scale",
    bio: "Scaled a food-delivery startup into a listed consumer platform across 1,000+ cities. Brings first-hand frameworks on org design, marketplace economics and building through cycles.",
    focus: ["Marketplace Design", "Org Building at Scale", "Public-Market Playbook"],
  },
  {
    name: "Nithin Kamath",
    role: "Founder, Zerodha",
    tag: "Capital Markets",
    bio: "Built India's largest brokerage without a single rupee of external capital. Teaches capital markets from the inside — how retail investors actually behave and how durable businesses are financed.",
    focus: ["Capital Markets Structure", "Bootstrapped Scaling", "Retail Investor Behaviour"],
  },
  {
    name: "Ronnie Screwvala",
    role: "Founder, upGrad · UTV",
    tag: "Media & Ventures",
    bio: "Built and exited one of India's largest media houses, then rebuilt in edtech. Advises operators on category creation, storytelling, and the second-act discipline of serial founders.",
    focus: ["Category Creation", "Media & Distribution", "Serial Entrepreneurship"],
  },
  {
    name: "Radhika Gupta",
    role: "CEO, Edelweiss AMC",
    tag: "Asset Management",
    bio: "Runs one of India's fastest-growing asset managers. Translates institutional-grade portfolio construction into frameworks operators can use to think about risk, allocation and long-horizon compounding.",
    focus: ["Asset Allocation", "Risk Frameworks", "Long-Horizon Compounding"],
  },
  {
    name: "Anand Chandrasekaran",
    role: "GM, Meta",
    tag: "Product Leadership",
    bio: "Has led product at Meta, Snap, Airtel and Bharti — shipping to hundreds of millions of users. Teaches the craft of product decisions, review culture and how great PMs actually earn trust with engineering.",
    focus: ["Product Strategy", "Review Culture", "Cross-Functional Leadership"],
  },
];

const PILLARS = [
  { pct: "30%", label: "Ivy academics", desc: "Rigorous theory from faculty trained at the world's leading business schools." },
  { pct: "30%", label: "Research faculty", desc: "Frameworks grounded in applied research, not recycled case studies." },
  { pct: "40%", label: "Sitting operators", desc: "Founders and CXOs teaching live from the businesses they run today." },
];

export function PgFaculty() {
  const [idx, setIdx] = useState(0);
  const total = FACULTY.length;
  const active = FACULTY[idx];
  const nextIdx = (idx + 1) % total;
  const next = FACULTY[nextIdx];
  const go = (dir: 1 | -1) => setIdx((i) => (i + dir + total) % total);

  return (
    <section id="faculty" className="relative overflow-hidden section-band py-20 md:py-28">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <span className="eyebrow">04 · Faculty</span>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-4xl font-tech text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-4xl md:leading-[1.05]">
              30% Ivy academics. 30% research faculty.{" "}
              <span className="text-gradient-brand">40% sitting operators.</span>
            </h2>
            <p className="max-w-sm text-sm text-ink/60">
              The 30·30·40 faculty model brings academics, researchers and operators onto one teaching bench.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.label} className="card-elevated rounded-2xl p-6">
              <div className="font-tech text-3xl font-bold text-teal">{p.pct}</div>
              <div className="mt-2 text-sm font-semibold text-ink">{p.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.desc}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-14 grid gap-10 lg:gap-14 lg:[grid-template-columns:minmax(0,1fr)_minmax(0,0.34fr)]">
          {/* Featured */}
          <article className="relative lg:min-h-[560px]">
            <div className="grid grid-cols-1 items-start gap-8 sm:[grid-template-columns:minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-14">
              <div
                className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl glow-ring sm:mx-0 sm:aspect-[4/5] sm:max-w-[320px]"
                style={{ boxShadow: "0 60px 140px -40px rgba(0,0,0,0.45)" }}
              >
                {FACULTY.map((f, i) => (
                  <div
                    key={f.name}
                    className="absolute inset-0 bg-gradient-to-br from-teal/70 to-bottle"
                    style={{ opacity: i === idx ? 1 : 0, transition: "opacity 900ms cubic-bezier(0.4,0,0.2,1)" }}
                  />
                ))}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(13,20,16,0) 40%, rgba(13,20,16,0.7) 100%)" }}
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-cream/80">{active.tag}</p>
                </div>
              </div>

              <div className="relative">
                {FACULTY.map((f, i) => (
                  <div
                    key={f.name}
                    className="flex flex-col"
                    style={{
                      position: i === idx ? "relative" : "absolute",
                      inset: i === idx ? "auto" : 0,
                      opacity: i === idx ? 1 : 0,
                      transform: i === idx ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1), transform 800ms cubic-bezier(0.4,0,0.2,1)",
                      pointerEvents: i === idx ? "auto" : "none",
                    }}
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-block h-px w-8 bg-ink/40" />
                      <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/70">
                        Faculty · {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-ink/50">{f.tag}</p>
                    <h3 className="font-tech text-3xl font-bold leading-[1.05] tracking-tight text-ink">{f.name}</h3>
                    <p className="mt-2 text-sm text-ink/65">{f.role}</p>
                    <div className="mt-6 rule-gradient h-px w-12" />
                    <p className="mt-5 text-sm leading-[1.7] text-ink/85 md:mt-6 md:leading-[1.75]">{f.bio}</p>

                    <div className="mt-8">
                      <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-ink/50">Focus Areas</p>
                      <ul className="space-y-2.5">
                        {f.focus.map((p) => (
                          <li key={p} className="flex gap-3 text-sm text-ink/85">
                            <span className="text-ink/40">—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="mt-7 flex items-center gap-5 border-t border-ink/10 pt-6">
                  <div className="flex gap-1.5">
                    {FACULTY.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-label={`Go to faculty ${i + 1}`}
                        className="transition-all duration-700 ease-out"
                        style={{
                          width: i === idx ? "32px" : "8px",
                          height: "2px",
                          background: i === idx ? "var(--color-teal)" : "rgba(13,20,16,0.25)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="h-px flex-1 bg-ink/10" />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous faculty"
                      className="flex h-10 w-10 items-center justify-center text-ink transition-colors duration-500 hover:bg-ink/5"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next faculty"
                      className="flex h-10 w-10 items-center justify-center text-ink transition-colors duration-500 hover:bg-ink/5"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="mx-auto flex w-full flex-col gap-6 lg:mx-0">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ink/45">Up Next</p>
            <button
              type="button"
              onClick={() => go(1)}
              className="group relative block overflow-hidden rounded-2xl text-left"
              style={{ aspectRatio: "4 / 5", boxShadow: "0 40px 100px -40px rgba(0,0,0,0.4)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-bottle to-teal/70 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(13,20,16,0) 45%, rgba(13,20,16,0.8) 100%)" }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-cream/80">{next.tag}</p>
                <p className="font-tech text-sm font-bold leading-tight text-cream">{next.name}</p>
                <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-cream/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View <ArrowUpRight className="size-3" />
                </span>
              </div>
            </button>
            <div className="flex items-baseline gap-2 font-tech">
              <span className="text-3xl font-light leading-none text-ink">{String(idx + 1).padStart(2, "0")}</span>
              <span className="text-3xl leading-none text-ink/30">/{String(total).padStart(2, "0")}</span>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

export default PgFaculty;
