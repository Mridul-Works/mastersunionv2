import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, CheckCircle2, ChevronLeft, ClipboardList, Clock, FileText, GraduationCap, Sparkles } from "lucide-react";

type Program = {
  id: string;
  mode: string;
  duration: string;
  title: string;
  round: string;
  status: string;
  deadline: string;
  category: "Postgraduate" | "Undergraduate" | "Executive";
  fee: string;
  seats: string;
};

const PROGRAMS: Program[] = [
  { id: "pgp-tbm", mode: "ON CAMPUS", duration: "2 YEARS", title: "PGP in Technology & Business Management", round: "Round 1", status: "Applications Open", deadline: "2026-08-15T23:59:59", category: "Postgraduate", fee: "₹38.5 L", seats: "180 seats" },
  { id: "pgp-qfb", mode: "ON CAMPUS", duration: "1 YEAR", title: "PGP in Quantitative Finance & Business", round: "Round 2", status: "Applications Open", deadline: "2026-09-30T23:59:59", category: "Postgraduate", fee: "₹28 L", seats: "60 seats" },
  { id: "ug-tbm", mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Technology & Business Management", round: "Round 3", status: "Applications Open", deadline: "2026-10-31T23:59:59", category: "Undergraduate", fee: "₹18 L / yr", seats: "240 seats" },
  { id: "ug-psy", mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Psychology & Marketing", round: "Round 4", status: "Applications Open", deadline: "2026-11-15T23:59:59", category: "Undergraduate", fee: "₹16 L / yr", seats: "120 seats" },
  { id: "ug-dsai", mode: "ON CAMPUS", duration: "4 YEARS", title: "UG in Data Science & Artificial Intelligence", round: "Round 5", status: "Applications Open", deadline: "2026-12-01T23:59:59", category: "Undergraduate", fee: "₹19 L / yr", seats: "120 seats" },
];

const APPLICATION_STEPS = [
  { n: "01", title: "Submit Application", body: "Complete the online form with academic background, statement of intent, and proof-of-work portfolio.", icon: FileText },
  { n: "02", title: "Aptitude & Case", body: "MU-CAT (60 min) plus a written case response. Waivable with a valid CAT / GMAT / GRE / SAT score.", icon: ClipboardList },
  { n: "03", title: "Panel Interview", body: "A 30-minute conversation with a practitioner, an alum and a member of the admissions committee.", icon: GraduationCap },
  { n: "04", title: "Offer & Enrolment", body: "Decisions roll out within 10 days. Confirm your seat with the enrolment fee to lock the cohort.", icon: CheckCircle2 },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.floor(diff / 86400000));
}

function buildTimeline(deadline: string) {
  const end = new Date(deadline);
  const offset = (days: number) => {
    const d = new Date(end);
    d.setDate(d.getDate() + days);
    return d.toISOString();
  };
  return [
    { label: "Applications Open", date: offset(-120), status: "done" as const },
    { label: "Priority Deadline", date: offset(-30), status: "active" as const },
    { label: "Final Application Deadline", date: end.toISOString(), status: "upcoming" as const },
    { label: "Interviews Conclude", date: offset(21), status: "upcoming" as const },
    { label: "Offer Letters Released", date: offset(35), status: "upcoming" as const },
    { label: "Cohort Kick-off", date: offset(90), status: "upcoming" as const },
  ];
}

function ApplicationsCenter() {
  const [selectedId, setSelectedId] = useState<string>(PROGRAMS[0].id);
  const selected = useMemo(() => PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0], [selectedId]);
  const timeline = useMemo(() => buildTimeline(selected.deadline), [selected]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-black">
      {/* Header */}
      <header className="border-b border-black/10 bg-[#F5F3EE]/90 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60 hover:text-black">
            <ChevronLeft className="size-4" /> Back to Masters' Union
          </Link>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em] text-black/50">
            <Sparkles className="size-3" /> Admissions · Cohort 2026
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-14 pb-10">
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
          Applications Center
        </p>
        <h1
          className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.98] tracking-tight"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Choose your programme.
          <br />
          <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Start your application.
          </span>
        </h1>
        <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-black/60">
          Rolling reviews across rounds. Pick a programme on the left to see the process, timelines, and how to apply.
        </p>
      </section>

      {/* Split view */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* LEFT — programme list */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-black/50">
                {PROGRAMS.length} Programmes Open
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/40">
                Cohort 2026
              </span>
            </div>

            {PROGRAMS.map((p) => {
              const active = p.id === selected.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`group relative w-full text-left p-5 transition-all duration-200 border ${
                    active
                      ? "bg-black text-white border-black shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]"
                      : "bg-white border-black/10 hover:border-black/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${active ? "text-white/60" : "text-black/45"}`}>
                    <span>{p.mode}</span>
                    <span className={active ? "text-white/30" : "text-black/25"}>·</span>
                    <span>{p.duration}</span>
                    <span className={active ? "text-white/30" : "text-black/25"}>·</span>
                    <span>{p.category}</span>
                  </div>
                  <h3
                    className="mt-3 text-[18px] font-semibold leading-[1.25] tracking-tight"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className={`flex items-center gap-2 text-[12px] ${active ? "text-white/75" : "text-black/60"}`}>
                      <span className={`font-semibold ${active ? "text-white" : "text-black"}`}>{p.round}</span>
                      <span className={active ? "text-white/30" : "text-black/30"}>·</span>
                      <span>Closes {formatDate(p.deadline)}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        active ? "text-white" : "text-black group-hover:gap-2 transition-all"
                      }`}
                    >
                      Apply <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — detail panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-black/10 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]">
              {/* Program summary */}
              <div className="border-b border-black/10 bg-[#F5F3EE] p-6">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">
                  <span>{selected.category}</span>
                  <span className="text-black/25">·</span>
                  <span>{selected.mode}</span>
                  <span className="text-black/25">·</span>
                  <span>{selected.duration}</span>
                </div>
                <h2
                  className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-tight text-black"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {selected.title}
                </h2>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <Stat label="Round" value={selected.round} />
                  <Stat label="Programme fee" value={selected.fee} />
                  <Stat label="Cohort size" value={selected.seats} />
                </div>
              </div>

              {/* 1. Application Process */}
              <div className="p-6 border-b border-black/10">
                <SectionHeader icon={<ClipboardList className="size-3.5" />} eyebrow="01" title="Application Process" />
                <div className="mt-5 grid gap-3">
                  {APPLICATION_STEPS.map((s) => (
                    <div key={s.n} className="flex gap-4 p-4 border border-black/10 hover:border-black/30 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="flex size-10 items-center justify-center bg-black text-white">
                          <s.icon className="size-4" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-black/40">{s.n}</span>
                          <h4 className="text-[14px] font-semibold text-black">{s.title}</h4>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-black/60">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Timelines & Dates */}
              <div className="p-6 border-b border-black/10">
                <SectionHeader icon={<Calendar className="size-3.5" />} eyebrow="02" title="Timelines & Dates" />
                <ol className="mt-5 relative border-l border-black/15 pl-6 space-y-4">
                  {timeline.map((t) => (
                    <li key={t.label} className="relative">
                      <span
                        className={`absolute -left-[29px] top-1.5 flex size-3 items-center justify-center rounded-full border-2 ${
                          t.status === "done"
                            ? "bg-black border-black"
                            : t.status === "active"
                              ? "bg-white border-black ring-4 ring-black/10"
                              : "bg-white border-black/30"
                        }`}
                      />
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-[13px] font-semibold ${t.status === "upcoming" ? "text-black/70" : "text-black"}`}>
                          {t.label}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-black/50">
                          {formatDate(t.date)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 3. Apply Now CTA */}
              <div className="p-6 bg-black text-white">
                <SectionHeader icon={<Sparkles className="size-3.5" />} eyebrow="03" title="Apply Now" tone="dark" />
                <div className="mt-4 flex items-center gap-2 text-[12px] text-white/70">
                  <Clock className="size-3.5" />
                  <span>
                    <span className="font-semibold text-white">{daysUntil(selected.deadline)} days</span> left for {selected.round}
                  </span>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/70 max-w-[46ch]">
                  Your application takes about 20 minutes. Save progress as you go and complete it on any device.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://apply.mastersunion.org/?program=${encodeURIComponent(selected.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-white/90 transition-colors"
                  >
                    Start Application <ArrowRight className="size-4" />
                  </a>
                  <a
                    href="mailto:admissions@mastersunion.org"
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-white/10 transition-colors"
                  >
                    Talk to Admissions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 bg-white p-3">
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-black/45">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-black">{value}</div>
    </div>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  tone = "light",
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
}) {
  const eyebrowColor = tone === "dark" ? "text-white/50" : "text-black/45";
  const titleColor = tone === "dark" ? "text-white" : "text-black";
  const iconClasses = tone === "dark" ? "bg-white text-black" : "bg-black text-white";
  return (
    <div className="flex items-center gap-3">
      <div className={`flex size-7 items-center justify-center ${iconClasses}`}>{icon}</div>
      <div>
        <div className={`font-mono text-[10px] font-semibold uppercase tracking-[0.24em] ${eyebrowColor}`}>Step {eyebrow}</div>
        <h3 className={`text-[16px] font-semibold tracking-tight ${titleColor}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {title}
        </h3>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/applications_center")({
  head: () => ({
    meta: [
      { title: "Applications Center — Masters' Union" },
      { name: "description", content: "Apply to Masters' Union Cohort 2026. Explore programmes, application process, timelines and deadlines in one place." },
      { property: "og:title", content: "Applications Center — Masters' Union" },
      { property: "og:description", content: "Apply to Masters' Union Cohort 2026. Explore programmes, application process, timelines and deadlines in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplicationsCenter,
});
