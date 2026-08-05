import { Store, Play, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { cn } from "@/lib/utils";

type ArcStep = { t: string; h: string; d: string };
type Stat = { k: string; v: string };
type OutClassEntry = {
  tag: string;
  title: string;
  body: string;
  arc: ArcStep[];
  stats: Stat[];
};

const D2C_ARC: ArcStep[] = [
  { t: "T1", h: "Launch", d: "Source, list & sell on Amazon, Blinkit and own store" },
  { t: "T1", h: "Offline fair", d: "1,000+ footfall single-day retail push" },
  { t: "T3", h: "Scale", d: "In-the-Wild consulting: revenue growth for real SMEs" },
  { t: "T5", h: "GTM", d: "Design a full go-to-market for a live consumer product" },
  { t: "T6", h: "PMF", d: "Lower CAC, prove why customers stay" },
  { t: "T8", h: "Profit", d: "One-Day Profit challenge with influencers + artisans" },
];

const CREATOR_ARC: ArcStep[] = [
  { t: "T2", h: "Kickoff", d: "Pick a niche, script, film, release weekly" },
  { t: "T3", h: "Brand", d: "Voice, tone, identity · YouTube + Instagram release" },
  { t: "T4", h: "Community", d: "Build a community around your idea" },
  { t: "T5", h: "Distribution", d: "Decode social algorithms · scale reach" },
  { t: "T6", h: "Monetise", d: "Brand deals · sponsorships · own products" },
];

const OUT_CLASS: OutClassEntry[] = [
  {
    tag: "OutClass · Runs across terms",
    title: "Build a D2C Brand",
    body: "Every student ships a live consumer brand — sourced, launched and scaled on Amazon, Blinkit, Instagram and their own store. Graded on real customers and real revenue, not slides.",
    arc: D2C_ARC,
    stats: [
      { k: "₹10L+", v: "Avg. GMV / student team" },
      { k: "180+", v: "Brands launched to date" },
      { k: "1,000+", v: "Footfall at the offline fair" },
    ],
  },
  {
    tag: "OutClass · Runs across terms",
    title: "Creator Challenge",
    body: "From Term 2, every student builds a personal brand on YouTube, Instagram or LinkedIn — scripting, filming, editing and distributing weekly. Graded on real audience growth in the wild.",
    arc: CREATOR_ARC,
    stats: [
      { k: "50M+", v: "Cumulative views generated" },
      { k: "2.5M+", v: "Followers built by past cohorts" },
      { k: "40+", v: "Creators past 100k followers" },
    ],
  },
];

type Lane = {
  key: string;
  engine: "d2c" | "creator" | "imm";
  label: string;
  sub: string;
  bars: { start: number; end: number; text: string }[];
};

const OUT_LANES: Lane[] = [
  {
    key: "d2c",
    engine: "d2c",
    label: "D2C brand",
    sub: "Live consumer venture",
    bars: [{ start: 1, end: 8, text: "Launch → Scale → PMF → Profit" }],
  },
  {
    key: "creator",
    engine: "creator",
    label: "Creator Challenge",
    sub: "Personal brand in the wild",
    bars: [{ start: 2, end: 6, text: "Brand → Community → Monetise" }],
  },
  {
    key: "imm",
    engine: "imm",
    label: "Immersions",
    sub: "On-ground trips",
    bars: [
      { start: 4, end: 4, text: "Global" },
      { start: 5, end: 5, text: "Bharat" },
    ],
  },
];

const LANE_TONE: Record<Lane["engine"], string> = {
  d2c: "bg-teal/80",
  creator: "bg-bottle/80",
  imm: "bg-foreground/70",
};

function TermGantt() {
  const terms = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div className="overflow-hidden rounded-[4px] border border-border">
      <div className="rail-scroll">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[160px_repeat(8,1fr)] border-b border-border bg-secondary/40">
            <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Engine
            </div>
            {terms.map((t) => (
              <div
                key={t}
                className="border-l border-border px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                T{t}
              </div>
            ))}
          </div>
          {OUT_LANES.map((lane) => (
            <div key={lane.key} className="grid grid-cols-[160px_repeat(8,1fr)] border-b border-border last:border-b-0">
              <div className="px-4 py-4">
                <div className="text-sm font-medium text-foreground">{lane.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{lane.sub}</div>
              </div>
              <div className="relative col-span-8 grid grid-cols-8">
                {terms.map((t) => (
                  <div key={t} className="border-l border-border" />
                ))}
                {lane.bars.map((bar, i) => {
                  const span = bar.end - bar.start + 1;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "absolute top-1/2 flex h-7 -translate-y-1/2 items-center justify-center rounded-[3px] px-2 text-[10px] font-medium text-background",
                        LANE_TONE[lane.engine],
                      )}
                      style={{
                        left: `${((bar.start - 1) / 8) * 100}%`,
                        width: `${(span / 8) * 100}%`,
                      }}
                    >
                      <span className="truncate">{bar.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PgOutClass() {
  return (
    <section id="outclass" className="section-edge relative overflow-hidden py-20 sm:py-28">
      <div className="page-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow text-teal">OutClass</span>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            Real customers. Real revenue. <span className="text-gradient-brand">Real followers.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Two flagship OutClass tracks run continuously alongside InClass. Both are graded on outcomes measured in
            the open market — not in decks.
          </p>
        </Reveal>

        <div className="mt-14 space-y-14">
          {OUT_CLASS.map((o, idx) => {
            const isD2C = idx === 0;
            const Icon = isD2C ? Store : Play;
            return (
              <Reveal key={o.title} delay={idx * 80}>
                <article className="card-elevated border border-border bg-card p-6 sm:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {o.tag}
                      </span>
                      <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground">
                        {o.title}
                      </h3>
                    </div>
                    <span className="glow-ring flex size-10 items-center justify-center rounded-full bg-secondary/60 text-teal">
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{o.body}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {o.stats.map((s, i) => (
                      <div
                        key={s.v}
                        className="relative overflow-hidden rounded-[4px] border border-border bg-secondary/30 p-5"
                      >
                        <div className="rule-gradient absolute inset-x-0 top-0" />
                        <div className="flex items-start justify-between">
                          <span className="flex size-8 items-center justify-center rounded-full bg-teal/10 text-teal">
                            {i === 0 ? <Icon className="size-4" /> : i === 1 ? <TrendingUp className="size-4" /> : <Users className="size-4" />}
                          </span>
                        </div>
                        <div className="mt-3 text-3xl font-medium leading-none tracking-[-0.01em] text-foreground">
                          {s.k}
                        </div>
                        <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Term-by-term arc
                    </div>
                    <ol className="mt-3 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                      {o.arc.map((a, i) => (
                        <li key={`${o.title}-${i}`} className="bg-card p-4">
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                              {a.t}
                            </span>
                            <span className="text-sm font-medium leading-tight text-foreground">{a.h}</span>
                          </div>
                          <div className="mt-2 text-xs leading-snug text-muted-foreground">{a.d}</div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160} className="mt-14">
          <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            8-term OutClass calendar
          </div>
          <div className="mt-3">
            <TermGantt />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PgOutClass;
