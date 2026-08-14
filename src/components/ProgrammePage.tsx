import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Clock,
  MapPin,
  GraduationCap,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import SectionDivider from "@/components/SectionDivider";
import logoWhite from "@/assets/logo-4.png.asset.json";
import {
  findFacultyImage,
  findImmersionLogo,
  findVentureLogo,
  FACULTY_POOL,
} from "@/lib/programme-images";

export type Term = {
  n: number;
  title: string;
  summary: string;
  outcomes: string[];
  courses: string[];
  challenge: { name: string; description: string };
};

export type Edge = { title: string; body: string };
export type FacultyMember = { name: string; role: string; org: string };
export type Testimonial = { name: string; role: string; quote: string };
export type Venture = { founder: string; startup: string; description: string };

export type ProgrammeData = {
  name: string;
  shortName: string;
  tagline: string;
  duration: string;
  mode: string;
  commencement: string;
  intro: string;
  whyNow: string[];
  edge: Edge[];
  terms: Term[];
  faculty: FacultyMember[];
  testimonials?: Testimonial[];
  ventures?: Venture[];
  immersions?: string[];
  jobRoles?: string[];
};

const NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "why", label: "Why Now" },
  { id: "edge", label: "The Edge" },
  { id: "curriculum", label: "Curriculum" },
  { id: "faculty", label: "Faculty" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faq", label: "FAQ" },
];

export default function ProgrammePage({ data }: { data: ProgrammeData }) {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-background via-muted/50 to-background text-[color:var(--ink)] pb-16 md:pb-18"
      style={
        {
          "--pastel-start": "oklch(0.99 0.014 220 / 0.4)",
          "--pastel-mid": "oklch(0.985 0.020 210 / 0.4)",
        } as React.CSSProperties
      }
    >
      <SectionNav items={NAV} applyHref="#apply" />

      <Hero data={data} />
      <SectionDivider />
      <WhyNow data={data} />
      <SectionDivider />
      <EdgeSection data={data} />
      <SectionDivider />
      <Curriculum terms={data.terms} shortName={data.shortName} />
      <SectionDivider />
      {data.ventures && data.ventures.length > 0 && (
        <>
          <VenturesSection ventures={data.ventures} />
          <SectionDivider />
        </>
      )}
      {data.immersions && data.immersions.length > 0 && (
        <>
          <Immersions items={data.immersions} />
          <SectionDivider />
        </>
      )}
      <Faculty roster={data.faculty} />
      <SectionDivider />
      {data.testimonials && data.testimonials.length > 0 && (
        <>
          <Testimonials list={data.testimonials} />
          <SectionDivider />
        </>
      )}
      {data.jobRoles && data.jobRoles.length > 0 && (
        <>
          <JobRoles roles={data.jobRoles} />
          <SectionDivider />
        </>
      )}
      <FAQSection data={data} />
      <Footer name={data.name} />
    </main>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero({ data }: { data: ProgrammeData }) {
  return (
    <section id="top" className="relative overflow-hidden pt-16 sm:pt-18">
      <div className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6 sm:pb-14">
        {/* Eyebrow row */}
        <div className="mb-7 flex flex-col gap-4 border-b border-foreground/10 pb-6 sm:mb-9 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/80 px-3 py-1">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Applications open · {data.commencement}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-card/80 px-3 py-1">
              <Star className="size-3 fill-current" /> Accredited by EFMD & AACSB
            </span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
            PGP · {data.shortName}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* Left: headline + copy */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h1 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                {data.name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65">
                {data.tagline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Start application <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:bg-foreground/5"
                >
                  See the curriculum ↓
                </a>
              </div>
            </div>

            {/* Meta strip */}
            <div className="grid grid-cols-3 gap-0 border-t border-foreground/10 pt-6">
              {[
                { icon: Clock, k: data.duration.split(" ")[0], v: data.duration.split(" ").slice(1).join(" ") || "Full-Time" },
                { icon: MapPin, k: data.mode.split(",")[0], v: data.mode.split(",").slice(1).join(",").trim() || "Campus" },
                { icon: GraduationCap, k: data.commencement, v: "Cohort" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.v}
                    className="border-l border-foreground/10 px-4 first:border-l-0 first:pl-0"
                  >
                    <Icon className="mb-2 size-4 text-foreground/50" />
                    <div className="font-display text-xl font-semibold leading-none tracking-tight text-foreground sm:text-2xl">
                      {s.k}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
                      {s.v}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: image card */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-primary">
              <ImagePlaceholder label="Programme hero" className="h-full w-full" aspect="4/5" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent p-5 text-primary-foreground">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                  The Campus
                </div>
                <div className="mt-1 font-display text-sm leading-tight">
                  DLF Cyber Park, Gurugram
                </div>
                <div className="mt-1 text-xs text-primary-foreground/60">
                  85% of Fortune 500 within a 2 km walk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── WHY NOW ─────────────────────── */

function WhyNow({ data }: { data: ProgrammeData }) {
  return (
    <section id="why" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[0.6fr_1fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              WHY {data.shortName.toUpperCase()}, WHY NOW
            </div>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] tracking-[-0.02em]">
              Built for the <em className="italic text-black/60">next decade.</em>
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-relaxed text-foreground/80">
            <p className="text-lg text-foreground">{data.intro}</p>
            {data.whyNow.map((p, i) => (
              <p key={i} className="text-foreground/70">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── EDGE ─────────────────────── */

function EdgeSection({ data }: { data: ProgrammeData }) {
  return (
    <section id="edge" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            THE EDGE
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            What makes this programme{" "}
            <em className="italic text-black/60">different.</em>
          </h2>
        </div>

        <div className="grid gap-px bg-black/10 md:grid-cols-2">
          {data.edge.map((e, i) => (
            <article
              key={i}
              className="group relative flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-white/95"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl leading-none tracking-tight text-black/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  Edge
                </span>
              </div>
              <h3 className="font-display text-xl leading-snug tracking-tight text-foreground">
                {e.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/65">{e.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CURRICULUM ─────────────────────── */

function Curriculum({ terms, shortName }: { terms: Term[]; shortName: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="curriculum" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            CURRICULUM
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            {terms.length} terms of in-class rigour.{" "}
            <em className="italic text-black/60">Every one shipped in the wild.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            The {shortName} curriculum runs on two engines every term — foundational
            in-class courses and a live out-class challenge that produces a real
            deliverable. Tap any term to expand.
          </p>
        </div>

        <div className="border-t border-black/15">
          {terms.map((t, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-black/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start gap-6 px-2 py-6 text-left transition-colors hover:bg-black/[0.02]"
                >
                  <div className="mt-1 w-20 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-black/50">
                    Term {String(t.n).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl leading-snug tracking-tight text-foreground md:text-2xl">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                      {t.summary}
                    </p>
                  </div>
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center border border-black/15 text-foreground/70">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="grid gap-8 pb-7 pl-2 pr-2 sm:pl-24 md:grid-cols-2 md:gap-12">
                    <div>
                      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
                        Outcomes
                      </div>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {t.outcomes.map((o) => (
                          <span
                            key={o}
                            className="border border-black/20 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/70"
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
                        In-class core
                      </div>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {t.courses.map((c, ci) => (
                          <li key={ci} className="flex gap-2">
                            <span className="text-black/35">→</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative overflow-hidden border border-emerald-900/15 bg-gradient-to-br from-emerald-950 via-emerald-900 to-black p-7 text-white">
                      <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Out-class challenge · Term {t.n}
                      </div>
                      <h4 className="mt-3 font-display text-2xl leading-snug tracking-tight">
                        {t.challenge.name}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">
                        {t.challenge.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── VENTURES ─────────────────────── */

function VenturesSection({ ventures }: { ventures: Venture[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            STUDENT VENTURES
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            Companies built{" "}
            <em className="italic text-black/60">on campus.</em>
          </h2>
        </div>

        <div className="grid gap-px bg-black/10 md:grid-cols-3">
          {ventures.map((v, i) => {
            const logo = findVentureLogo(v.startup);
            return (
              <article key={i} className="flex flex-col bg-white p-7">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
                  {String(i + 1).padStart(2, "0")} · {v.founder}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {logo ? (
                    <img
                      src={logo}
                      alt={v.startup}
                      className="h-8 max-w-[120px] object-contain"
                      loading="lazy"
                    />
                  ) : null}
                  <h3 className="font-display text-xl leading-snug tracking-tight text-foreground">
                    {v.startup}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {v.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── IMMERSIONS ─────────────────────── */

function Immersions({ items }: { items: string[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            IMMERSIONS
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            Study where the world&apos;s best{" "}
            <em className="italic text-black/60">do the work.</em>
          </h2>
        </div>

        <div className="grid gap-px bg-black/10 md:grid-cols-2">
          {items.map((it, i) => {
            const logo = findImmersionLogo(it);
            return (
              <article key={i} className="flex gap-5 bg-white p-7">
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    className="h-10 w-16 shrink-0 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-display text-3xl leading-none tracking-tight text-black/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <p className="text-sm leading-relaxed text-foreground/75">{it}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FACULTY ─────────────────────── */

function Faculty({ roster }: { roster: FacultyMember[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(false);

  // Attach portraits to each faculty; fall back to the shared pool so the carousel
  // always has visual density even when names don't match a filename directly.
  const cards = roster.map((f, i) => {
    const match = findFacultyImage(f.name);
    const fallback = FACULTY_POOL[i % FACULTY_POOL.length] ?? null;
    return { ...f, image: match ?? fallback, hasMatch: Boolean(match) };
  });

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-faculty-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: dir * step * 1.5, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBy(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBy(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="faculty"
      className="relative overflow-hidden"
      onMouseEnter={() => (activeRef.current = true)}
      onMouseLeave={() => (activeRef.current = false)}
      onFocusCapture={() => (activeRef.current = true)}
      onBlurCapture={() => (activeRef.current = false)}
      tabIndex={0}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              FACULTY
            </div>
            <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
              Learn from practitioners,{" "}
              <em className="italic text-black/60">not just professors.</em>
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 md:flex-col md:items-end">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The 30·30·40 faculty model — Ivy academics, research faculty and sitting
              operators on one bench.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous faculty"
                className="grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white text-foreground transition hover:bg-black hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next faculty"
                className="grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white text-foreground transition hover:bg-black hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((f, i) => (
            <article
              key={i}
              data-faculty-card
              className="group relative shrink-0 basis-[240px] snap-start overflow-hidden bg-white sm:basis-[280px]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.name}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center font-display text-4xl text-black/15">
                    {f.name
                      .split(" ")
                      .map((p) => p[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <div className="absolute left-3 top-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white mix-blend-difference">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="border-t border-black/10 p-4">
                <div className="font-display text-base leading-tight text-foreground">
                  {f.name}
                </div>
                <div className="mt-1 text-xs leading-snug text-foreground/60">
                  {f.role} · {f.org}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TESTIMONIALS ─────────────────────── */

function Testimonials({ list }: { list: Testimonial[] }) {
  return (
    <section id="outcomes" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            OUTCOMES
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            In their <em className="italic text-black/60">own words.</em>
          </h2>
        </div>

        <div className="grid gap-px bg-black/10 md:grid-cols-2">
          {list.map((t, i) => (
            <figure key={i} className="bg-white p-8">
              <blockquote className="font-display text-xl leading-snug tracking-tight text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-black/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
                {t.name} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── JOB ROLES ─────────────────────── */

function JobRoles({ roles }: { roles: string[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <div className="mb-7 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            CAREER PATHS
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.03] tracking-[-0.02em]">
            Roles graduates{" "}
            <em className="italic text-black/60">go on to.</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <span
              key={r}
              className="border border-black/15 bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */

function FAQSection({ data }: { data: ProgrammeData }) {
  const faqs = [
    {
      q: `How is the ${data.shortName} programme structured?`,
      a: `${data.duration.toLowerCase()} split across ${data.terms.length} terms. Each term pairs in-class fundamentals with an out-class challenge that produces a real deliverable — no rote exams.`,
    },
    {
      q: "Who is this programme for?",
      a: data.intro,
    },
    {
      q: "Where is the programme held?",
      a: `${data.mode}. Cohort commences ${data.commencement}.`,
    },
    {
      q: "Do I need CAT or GMAT?",
      a: "No. Admission is via our own aptitude assessment (MU-BAAT) and an operator-led interview, in rolling rounds until the cohort fills.",
    },
    {
      q: "Is there placement support?",
      a: "Yes. Every programme has a dedicated career team, on-campus recruiter drives, and access to Masters' Union's 1,400+ alumni network.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            FAQ
          </div>
          <h2 className="mt-3 font-display text-3xl leading-[1.05] tracking-[-0.02em]">
            Everything you were about to email us.
          </h2>
        </div>
        <div className="border-t border-border bg-card/80 backdrop-blur-sm">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                >
                  <span className="font-display text-sm leading-tight text-foreground">
                    {f.q}
                  </span>
                  <span className="flex size-8 items-center justify-center border border-border text-foreground/70">
                    {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                {open && (
                  <p className="pb-6 pl-5 pr-14 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */

function Footer({ name }: { name: string }) {
  return (
    <footer id="apply" className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <img
              src={logoWhite.url}
              alt="Masters' Union"
              className="h-10 w-auto brightness-0 invert md:h-12"
            />
            <h2 className="mt-8 font-display text-3xl font-light leading-tight md:text-4xl">
              Ready to apply to the{" "}
              <span className="italic">{name}</span>?
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/55">
              Rolling admissions. Reviewed in full by an operator-led committee.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
            <Link
              to="/applications_center"
              className="inline-flex items-center gap-2 bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-white/85"
            >
              Start your application <ArrowUpRight className="size-4" />
            </Link>
            <a
              href="mailto:admissions@mastersunion.org"
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Talk to admissions <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
