import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Globe2,
  GraduationCap,
  MapPin,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  AUDIENCE_LABELS,
  PARTNERS,
  PATHWAY_KINDS,
  matchesAudience,
  type Audience,
  type Partner,
  type Pathway,
  type PathwayKind,
} from "@/lib/pathways";

const AUDIENCE_TABS: { id: Audience | "any"; label: string; hint: string }[] = [
  { id: "any", label: "All pathways", hint: "Every tie-up on the table" },
  { id: "ug", label: "Undergraduate", hint: "UG students at Masters' Union" },
  { id: "pg", label: "Postgraduate", hint: "PGP & master's students" },
  { id: "all", label: "Open to everyone", hint: "No programme restriction" },
];

function PathwaysPage() {
  const [audience, setAudience] = useState<Audience | "any">("any");
  const [kind, setKind] = useState<PathwayKind | "any">("any");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PARTNERS.map((partner) => ({
      partner,
      pathways: partner.pathways.filter((p) => {
        const audienceOk =
          audience === "any"
            ? true
            : audience === "all"
              ? p.audiences.includes("all")
              : matchesAudience(p, audience);
        const kindOk = kind === "any" || p.kind === kind;
        return audienceOk && kindOk;
      }),
    })).filter((row) => row.pathways.length > 0);
  }, [audience, kind]);

  const totalPathways = filtered.reduce((n, r) => n + r.pathways.length, 0);
  const countries = new Set(filtered.map((r) => r.partner.country));

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#F5F3EE]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60 hover:text-black"
          >
            <ChevronLeft className="size-4" /> Back to Masters' Union
          </Link>
          <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-black/50 md:flex">
            <Globe2 className="size-3" /> Global Pathways · University Partnerships
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-8 pt-10">
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
          Global Pathways
        </p>
        <h1
          className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.98] tracking-tight text-balance"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Study abroad without
          <br />
          <span className="font-light italic" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            starting over.
          </span>
        </h1>
        <p className="mt-5 max-w-[62ch] text-pretty text-[14px] leading-relaxed text-black/60">
          Masters' Union holds formal agreements with universities across the US, Europe, Australia and Asia — summer
          immersions, semester exchanges, credit-transfer articulations and combined degrees. Filter by where you are in
          your degree to see exactly what is open to you.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-[720px]">
          <HeroStat value={String(PARTNERS.length)} label="Partner institutions" />
          <HeroStat value={String(PARTNERS.reduce((n, p) => n + p.pathways.length, 0))} label="Distinct pathways" />
          <HeroStat value={String(new Set(PARTNERS.map((p) => p.country)).size)} label="Countries" />
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[57px] z-20 border-y border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">
              I am
            </span>
            {AUDIENCE_TABS.map((tab) => {
              const active = tab.id === audience;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setAudience(tab.id)}
                  title={tab.hint}
                  className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white text-black/60 hover:border-black/40 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="relative flex items-center">
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as PathwayKind | "any")}
                className="appearance-none border border-black/15 bg-white py-2 pl-3.5 pr-9 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70 outline-none hover:border-black/40 focus:border-black"
              >
                <option value="any">All pathway types</option>
                {PATHWAY_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 size-3.5 text-black/40" />
            </label>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 sm:inline">
              {totalPathways} option{totalPathways === 1 ? "" : "s"} · {countries.size} countr
              {countries.size === 1 ? "y" : "ies"}
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-[1400px] px-6 py-12">
        {filtered.length === 0 ? (
          <div className="border border-black/10 bg-[#F5F3EE] p-10 text-center">
            <p className="text-[15px] font-semibold text-black">No pathways match this combination.</p>
            <p className="mt-2 text-[13px] text-black/60">
              Try a different pathway type, or reset to all pathways to see the full set of agreements.
            </p>
            <button
              type="button"
              onClick={() => {
                setAudience("any");
                setKind("any");
              }}
              className="mt-5 inline-flex items-center gap-2 bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {filtered.map(({ partner, pathways }) => (
              <PartnerBlock
                key={partner.id}
                partner={partner}
                pathways={pathways}
                openId={openId}
                onToggle={(id) => setOpenId((cur) => (cur === id ? null : id))}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
              <Sparkles className="size-3" /> University Partnerships
            </div>
            <h2
              className="mt-3 max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Not sure which pathway fits your degree?
            </h2>
            <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-white/65">
              Nominations, credit mapping and scholarship eligibility are handled by the University Partnerships team.
              Share your programme and year, and they will map the options open to you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:partnerships@mastersunion.org"
              className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-white/90"
            >
              Talk to Partnerships <ArrowRight className="size-4" />
            </a>
            <Link
              to="/immersions"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
            >
              See immersions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-black/10 bg-[#F5F3EE] p-4">
      <div
        className="text-[28px] font-semibold leading-none tracking-tight"
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">{label}</div>
    </div>
  );
}

function AudienceChip({ audiences }: { audiences: Pathway["audiences"] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {audiences.map((a) => (
        <span
          key={a}
          className={`inline-flex items-center gap-1 border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
            a === "all" ? "border-black/20 bg-black/[0.04] text-black/70" : "border-black/20 bg-white text-black/70"
          }`}
        >
          <GraduationCap className="size-3" />
          {AUDIENCE_LABELS[a]}
        </span>
      ))}
    </div>
  );
}

function PartnerBlock({
  partner,
  pathways,
  openId,
  onToggle,
}: {
  partner: Partner;
  pathways: Pathway[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <article className="border border-black/10 bg-white">
      {/* Partner head */}
      <div className="flex flex-col gap-5 border-b border-black/10 bg-[#F5F3EE] p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[70ch]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
            <MapPin className="size-3" />
            {partner.location} · {partner.country}
          </div>
          <h2
            className="mt-2.5 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {partner.name}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {partner.tags.map((t) => (
              <span
                key={t}
                className="border border-black/15 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-pretty text-[13px] leading-relaxed text-black/60">{partner.about}</p>
        </div>
        {partner.logo ? (
          <div className="flex h-16 w-40 flex-shrink-0 items-center justify-center border border-black/10 bg-white px-4">
            <img
              src={partner.logo}
              alt={`${partner.shortName} logo`}
              loading="lazy"
              className="no-img-zoom max-h-8 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex h-16 w-40 flex-shrink-0 items-center justify-center border border-black/10 bg-white">
            <span
              className="text-[15px] font-semibold tracking-tight text-black/70"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {partner.shortName}
            </span>
          </div>
        )}
      </div>

      {/* Pathways */}
      <div className="grid gap-px bg-black/10 md:grid-cols-2">
        {pathways.map((p) => {
          const open = openId === p.id;
          return (
            <div key={p.id} className={`bg-white p-5 ${open ? "md:col-span-2" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                    {p.kind}
                  </span>
                  <h3
                    className="mt-2 text-[16px] font-semibold leading-[1.25] tracking-tight"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {p.name}
                  </h3>
                </div>
                <span className="whitespace-nowrap border border-black/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
                  {p.duration}
                </span>
              </div>

              <div className="mt-3">
                <AudienceChip audiences={p.audiences} />
              </div>

              <p className="mt-3 text-pretty text-[13px] leading-relaxed text-black/60">{p.summary}</p>

              <button
                type="button"
                onClick={() => onToggle(p.id)}
                className="mt-4 inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                {open ? <Minus className="size-3" /> : <Plus className="size-3" />}
                {open ? "Hide details" : "View details"}
              </button>

              {open && (
                <div className="mt-5 grid gap-5 border-t border-black/10 pt-5 lg:grid-cols-2">
                  <dl className="grid gap-px bg-black/10">
                    {p.facts.map((f) => (
                      <div key={f.k} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 bg-white p-3">
                        <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                          {f.k}
                        </dt>
                        <dd className="text-[12.5px] leading-relaxed text-black/75">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.notes && p.notes.length > 0 && (
                    <div className="border border-black/10 bg-[#F5F3EE] p-4">
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                        Good to know
                      </div>
                      <ul className="mt-3 space-y-2">
                        {p.notes.map((n) => (
                          <li key={n} className="flex gap-2 text-[12.5px] leading-relaxed text-black/70">
                            <span className="mt-[7px] size-1 flex-shrink-0 bg-black/50" />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Extras */}
      {partner.extras && partner.extras.length > 0 && (
        <div className="grid gap-px border-t border-black/10 bg-black/10 lg:grid-cols-2">
          {partner.extras.map((ex) => (
            <div key={ex.title} className="bg-[#FBFAF7] p-5">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                {ex.title}
              </div>
              <ul className="mt-3 space-y-2">
                {ex.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[12.5px] leading-relaxed text-black/70">
                    <span className="mt-[7px] size-1 flex-shrink-0 bg-black/40" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export const Route = createFileRoute("/pathways")({
  head: () => ({
    meta: [
      { title: "Global Pathways — Masters' Union Partner Universities" },
      {
        name: "description",
        content:
          "Summer immersions, semester exchanges, 2+2 transfers and combined degrees with Illinois Tech, Griffith, IE New York, SDA Bocconi, IESEG, SMU and H-Farm — filtered by UG or PG eligibility.",
      },
      { property: "og:title", content: "Global Pathways — Masters' Union Partner Universities" },
      {
        property: "og:description",
        content:
          "Explore every Masters' Union university tie-up abroad: exchanges, transfers, dual degrees and scholarships, filtered by what your programme unlocks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PathwaysPage,
});
