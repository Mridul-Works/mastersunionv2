import { Briefcase, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { LogoTile } from "@/components/pg-layout/LogoTile";

// -------- Content sourced from the PGP-TBM programme page --------
const OUTCOME_HEADLINE = [
  { k: "₹34.6 LPA", v: "Median CTC · Class of 2025" },
  { k: "₹1.2 Cr", v: "Highest domestic offer" },
  { k: "500+", v: "Recruiters on campus" },
];

const OUTCOME_ROLES = [
  { role: "Product & Growth", pct: "28%" },
  { role: "Strategy & Consulting", pct: "22%" },
  { role: "Founder / Own venture", pct: "18%" },
  { role: "Finance & Investing", pct: "17%" },
  { role: "Tech & AI", pct: "15%" },
];

const CAREER_LOGOS: { name: string; url: string }[] = [
  { name: "McKinsey", url: "" },
  { name: "Bain", url: "" },
  { name: "BCG", url: "" },
  { name: "Accenture", url: "" },
  { name: "Google", url: "" },
  { name: "Meta", url: "" },
  { name: "Microsoft", url: "" },
  { name: "Flipkart", url: "" },
  { name: "Zomato", url: "" },
  { name: "Razorpay", url: "" },
  { name: "Cred", url: "" },
  { name: "ICICI", url: "" },
];

const ALUMNI = [
  {
    name: "Daniel Nath",
    role: "Strategy Lead",
    company: "Google",
    quote: "Masters' Union threw us into real problems with real stakes — that's why the leap to Google felt natural.",
  },
  {
    name: "Jeneesha Singh",
    role: "Consultant",
    company: "Bain & Co.",
    quote: "The consulting projects, live P&Ls and CXO conversations on campus prepared me for day one at Bain.",
  },
  {
    name: "Vibhor Agarwal",
    role: "Founder's Office",
    company: "Hike",
    quote: "Every term shipped a new venture. That muscle is what got me the Founder's Office seat at Hike.",
  },
  {
    name: "Mehul Soni",
    role: "Quantitative Trader",
    company: "Avirom Capital",
    quote: "The quant and finance electives were taught by practitioners — no gap between classroom and trading desk.",
  },
];

export function PgCareers() {
  return (
    <section id="career" className="section-edge relative overflow-hidden py-20 sm:py-28">
      <div className="page-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow text-teal">Careers</span>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            Two paths out. <span className="text-gradient-brand">Both measured in numbers.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Graded on the open market — salaries, offers, funded ventures. No vanity metrics, no soft claims.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <article className="card-elevated mt-14 border border-border bg-card p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Careers · Class of 2025
                </span>
                <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground">
                  Where alumni land
                </h3>
              </div>
              <span className="glow-ring flex size-10 items-center justify-center rounded-full bg-secondary/60 text-teal">
                <Briefcase className="size-4" />
              </span>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Median CTC</div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-medium leading-none tracking-[-0.01em] text-foreground sm:text-5xl">
                  ₹34.6
                </span>
                <span className="text-xl text-muted-foreground">LPA</span>
              </div>
              <div className="rule-gradient mt-3 h-px w-16" />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {OUTCOME_HEADLINE.slice(1).map((s, i) => (
                <div key={s.v} className="relative overflow-hidden rounded-[4px] border border-border bg-secondary/30 p-5">
                  <div className="rule-gradient absolute inset-x-0 top-0" />
                  <div className="flex items-start justify-between">
                    <span className="flex size-8 items-center justify-center rounded-full bg-teal/10 text-teal">
                      {i === 0 ? <TrendingUp className="size-4" /> : <Users className="size-4" />}
                    </span>
                  </div>
                  <div className="mt-3 text-3xl font-medium leading-none tracking-[-0.01em] text-foreground">{s.k}</div>
                  <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Where alumni land
              </div>
              <ul className="mt-4 space-y-3.5">
                {OUTCOME_ROLES.map((r) => (
                  <li key={r.role}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-foreground/80">{r.role}</span>
                      <span className="text-sm font-semibold tabular-nums text-teal">{r.pct}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
                      <div className="h-full rounded-full bg-teal" style={{ width: r.pct }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Where alumni got hired
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {CAREER_LOGOS.map((logo) => (
                  <LogoTile key={logo.name} name={logo.name} src={logo.url || undefined} size="sm" />
                ))}
              </div>
              <div className="mt-3 text-right text-xs font-medium italic text-muted-foreground">and many more…</div>
            </div>
          </article>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Alumni network
            </div>
            <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,1.8rem)] font-medium leading-tight tracking-[-0.01em] text-foreground">
              Our work speaks for itself, but our alumni say it even better.
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ALUMNI.map((a, idx) => (
              <Reveal key={a.name} delay={idx * 60}>
                <div className="relative overflow-hidden rounded-[4px] border border-border bg-card p-6">
                  <div className="rule-gradient absolute inset-x-0 top-0" />
                  <p className="text-sm leading-relaxed text-muted-foreground">"{a.quote}"</p>
                  <div className="mt-4 text-sm font-medium text-foreground">{a.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.role} · {a.company}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PgCareers;
