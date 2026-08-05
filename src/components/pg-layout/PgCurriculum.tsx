import { useState } from "react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { cn } from "@/lib/utils";

/**
 * Curriculum content sourced from the PGP-TBM page (IN_CLASS, TERM_MATRIX,
 * TERM_META, IN_CLASS_TRACKS in src/routes/programmes.pg.pgp-tbm.tsx).
 * Term tabs map to TERM_MATRIX rows; each shows its InClass focus, the
 * live OutClass tracks running that term, and the InClass pillar mix.
 */
const IN_CLASS_PILLARS = [
  { name: "Finance & Fintech", eg: "Read financial statements · Value a business · Raise capital" },
  { name: "Sales & Marketing", eg: "GTM funnels · CRO · Brand psychology · D2C" },
  { name: "Management & Strategy", eg: "Analyse markets · KPIs · Game theory" },
  { name: "Product & Tech", eg: "Code · No-code apps · UI/UX · Dashboards" },
  { name: "AI & ML", eg: "Prompt engineering · LLMs · AI-powered products" },
  { name: "Communication", eg: "Persuasive writing · Speaking · Storytelling" },
  { name: "Liberal Arts", eg: "Geopolitics · Economies · Philosophy" },
];

const IN_CLASS_STATS = [
  { k: "150+", v: "Courses across 7 modules" },
  { k: "40%", v: "Faculty are sitting operators" },
  { k: "0", v: "Rote exams" },
];

type EngineCell = { label: string; kind: "in" | "d2c" | "creator" | "imm" };
type TermRow = { term: string; inClass: string; outClass: EngineCell[] };

const TERM_MATRIX: TermRow[] = [
  { term: "T1", inClass: "Fundamentals · Finance · Sales", outClass: [{ label: "D2C · Dropshipping launch", kind: "d2c" }] },
  { term: "T2", inClass: "GTM · Product mindset · LLMs", outClass: [{ label: "D2C · Marketing hackathon", kind: "d2c" }, { label: "Creator · Kickoff", kind: "creator" }] },
  { term: "T3", inClass: "Storytelling · Banking · No-code", outClass: [{ label: "D2C · In-the-wild consulting", kind: "d2c" }, { label: "Creator · Brand", kind: "creator" }] },
  { term: "T4", inClass: "Valuation · UI/UX · Crisis mgmt", outClass: [{ label: "D2C · MVP debut", kind: "d2c" }, { label: "Creator · Community", kind: "creator" }, { label: "Global Immersion", kind: "imm" }] },
  { term: "T5", inClass: "Models · Analytics · B2B", outClass: [{ label: "D2C · GTM challenge", kind: "d2c" }, { label: "Creator · Distribution", kind: "creator" }, { label: "Bharat Immersion", kind: "imm" }] },
  { term: "T6", inClass: "Pricing · PE/VC · Copy", outClass: [{ label: "D2C · Product-Market Fit", kind: "d2c" }, { label: "Creator · Monetise", kind: "creator" }] },
  { term: "T7", inClass: "IPOs · IP law · ML", outClass: [{ label: "Raise a Seed Fund", kind: "d2c" }] },
  { term: "T8", inClass: "DeFi · Risk · Compliance", outClass: [{ label: "One-Day Profit challenge", kind: "d2c" }] },
];

const TERM_META = [
  { months: "Months 1–2", window: "Aug – Sep '26" },
  { months: "Months 3–4", window: "Oct – Nov '26" },
  { months: "Months 5–6", window: "Dec '26 – Jan '27" },
  { months: "Months 7–8", window: "Feb – Mar '27" },
  { months: "Months 9–10", window: "Apr – May '27" },
  { months: "Months 11–12", window: "Jun – Jul '27" },
  { months: "Months 13–14", window: "Aug – Sep '27" },
  { months: "Months 15–16", window: "Oct – Nov '27" },
];

const IN_CLASS_TRACKS = [
  "Finance · Sales",
  "Strategy · Product",
  "Marketing · Comms",
  "AI/ML · Product",
  "Finance · Strategy",
  "Sales · AI/ML",
  "Product · Liberal Arts",
  "Finance · Comms",
];

const ENGINE_TONE: Record<EngineCell["kind"], string> = {
  in: "bg-secondary/60 text-foreground",
  d2c: "bg-teal/10 text-teal border border-teal/30",
  creator: "bg-bottle/10 text-bottle border border-bottle/30",
  imm: "bg-foreground/10 text-foreground border border-foreground/20",
};

export function PgCurriculum() {
  const [active, setActive] = useState(0);
  const row = TERM_MATRIX[active];
  const meta = TERM_META[active];
  const subjects = row.inClass.split("·").map((s) => s.trim());

  return (
    <section id="curriculum" className="section-edge relative overflow-hidden py-20 sm:py-28">
      <div className="page-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow text-teal">Curriculum</span>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            Seven pillars, <span className="text-gradient-brand">eight terms.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            InClass builds fundamentals across seven pillars while OutClass ventures and Immersions run alongside —
            term by term, for all 16 months.
          </p>
        </Reveal>

        {/* Seven InClass pillars */}
        <Reveal delay={80}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {IN_CLASS_PILLARS.map((p) => (
              <div key={p.name} className="bg-card p-5">
                <div className="text-sm font-medium leading-tight text-foreground">{p.name}</div>
                <div className="mt-2 text-xs leading-snug text-muted-foreground">{p.eg}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {IN_CLASS_STATS.map((s) => (
              <div key={s.v} className="relative overflow-hidden rounded-[4px] border border-border bg-secondary/30 p-5">
                <div className="rule-gradient absolute inset-x-0 top-0" />
                <div className="text-3xl font-medium leading-none tracking-[-0.01em] text-foreground">{s.k}</div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Term-by-term tabs */}
        <Reveal delay={160}>
          <div className="mt-16">
            <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Term-by-term
            </div>

            <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {TERM_MATRIX.map((t, i) => (
                <button
                  key={t.term}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition",
                    i === active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {t.term}
                </button>
              ))}
            </div>

            <div className="card-elevated relative mt-6 overflow-hidden border border-border bg-card p-6 sm:p-8">
              <div className="rule-gradient absolute inset-x-0 top-0" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-foreground">{row.term} · InClass focus</h3>
                <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {meta.months} · {meta.window}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  OutClass running this term
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {row.outClass.map((c) => (
                    <span
                      key={c.label}
                      className={cn("rounded-full px-3 py-1 text-xs font-medium", ENGINE_TONE[c.kind])}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-5">
                {IN_CLASS_TRACKS.map((track, i) => (
                  <span
                    key={`${track}-${i}`}
                    className={cn(
                      "rounded-[3px] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] transition",
                      i === active ? "bg-foreground text-background" : "bg-secondary/40 text-muted-foreground",
                    )}
                  >
                    T{i + 1} · {track}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PgCurriculum;
