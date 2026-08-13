import type { FacultyStat } from "@/lib/faculty-stats";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF_IT = "'Fraunces', Georgia, serif";

/**
 * "By the numbers" panel — belongs to SECTION 2 (white). Light glass treatment,
 * reveals with the section (uses the parent .mv-section reveal system).
 */
export default function FacultyStatsCard({
  stats,
  refreshed,
  universities,
  dark = false,
}: {
  stats: FacultyStat[];
  refreshed?: string;
  universities?: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`mv-reveal w-full rounded-[clamp(16px,2.2vw,24px)] border py-[clamp(0.55rem,1vh,0.75rem)] backdrop-blur-[14px] lg:py-2 ${dark ? "border-white/10 bg-white/[0.04] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)]" : "border-black/[0.07] bg-white/60 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.22)]"}`}
      style={{
        ["--card-pad" as string]: "clamp(1rem, 2.4vw, 2.25rem)",
        paddingInline: "var(--card-pad)",
      }}
    >
      <div
        className={`flex flex-wrap items-center justify-start gap-2 text-[clamp(9px,1.9vw,10px)] uppercase tracking-[0.22em] sm:gap-3 sm:tracking-[0.24em] ${dark ? "text-white/50" : "text-black/50"}`}
        style={{ fontFamily: MONO }}
      >
        <span className={`inline-flex items-center justify-center whitespace-nowrap rounded-[999px] px-[7px] py-0.5 text-center ${dark ? "border border-white/15 bg-white/10 text-white/75" : "border border-black/10 bg-[#0a0a0a] text-white/70"}`}>
          By the numbers
        </span>
        {refreshed ? (
          <>
            <span className={`hidden h-3 w-px sm:block ${dark ? "bg-white/20" : "bg-black/15"}`} aria-hidden />
            <span className={`inline-flex items-center justify-center whitespace-nowrap rounded-[999px] px-[7px] py-0.5 text-center uppercase tracking-[inherit] ${dark ? "border border-white/15 bg-white/10 text-white/75" : "border border-black/10 bg-[#0a0a0a] text-white/70"}`}>
              {refreshed}
            </span>
          </>
        ) : null}
      </div>

      <div className="mt-3 overflow-hidden lg:mt-1.5" aria-hidden>
        <div
          className={`h-[2px] w-full origin-center ${dark ? "mu-pulse-rgb" : "mu-pulse-rgb mu-pulse-rgb-light"}`}
        />
      </div>

      <div
        className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:mt-1.5 lg:gap-x-4 lg:gap-y-0 lg:[grid-template-columns:repeat(var(--lg-cols),minmax(0,1fr))]"
        style={{ ["--lg-cols" as string]: stats.length }}
      >
        {stats.map((s) => (
          <div key={s.l} className="group flex min-w-0 flex-col items-center text-center">
            <div
              className={`text-[clamp(1.5rem,4.6vw,2.6rem)] font-medium leading-[0.9] tracking-[-0.035em] ${dark ? "text-white" : "text-black"}`}
              style={{ fontFamily: SERIF_IT }}
            >
              {s.v}
            </div>
            <div
              className={`mt-1 max-w-full text-[clamp(9px,1.9vw,10px)] font-medium uppercase leading-[1.5] tracking-[0.14em] sm:tracking-[0.16em] lg:whitespace-nowrap ${dark ? "text-white/80" : "text-black/90"}`}
              style={{ fontFamily: MONO }}
            >
              {s.l}
            </div>
            <div
              className={`mx-auto mt-2 h-px w-8 origin-center transition-all duration-500 group-hover:w-24 lg:mt-1 ${dark ? "bg-white/20 group-hover:bg-white" : "bg-black/15 group-hover:bg-[#0a0a0a]"}`}
              aria-hidden
            />
          </div>
        ))}
      </div>

      {universities?.length ? (
        <div className="mt-3 pt-3 lg:mt-1.5 lg:pt-1.5">
          <div
            className="overflow-x-auto [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden"
            style={{
              marginInline: "calc(var(--card-pad) * -1)",
              paddingInline: "var(--card-pad)",
            }}
          >
            <div
              className="flex min-w-max items-center md:grid md:min-w-0"
              style={{
                gridTemplateColumns: `repeat(${universities.length}, minmax(min-content, 1fr))`,
              }}
            >
              {universities.map((name) => (
                <div key={name} className="flex items-center justify-center">
                  <span
                    className={`whitespace-nowrap text-center text-[clamp(0.78rem,2.1vw,0.95rem)] italic tracking-[0.01em] transition-colors ${dark ? "text-white/65 hover:text-white" : "text-black/65 hover:text-black"}`}
                    style={{ fontFamily: SERIF_IT }}
                    title={name}
                  >
                    {name}
                  </span>
                  <span className={`mx-2 md:ml-3 md:mr-0 ${dark ? "text-white/25" : "text-black/20"}`} aria-hidden>
                    |
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
