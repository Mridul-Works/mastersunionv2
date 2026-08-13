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
}: {
  stats: FacultyStat[];
  refreshed?: string;
  universities?: string[];
}) {
  return (
    <div
      className="mv-reveal w-full rounded-[clamp(16px,2.2vw,24px)] border border-white/10 bg-[#0B0F0D]/72 shadow-[0_18px_55px_-20px_rgba(0,0,0,0.45)] backdrop-blur-[18px]"
      style={{
        ["--card-pad" as string]: "clamp(1rem, 2.4vw, 2.25rem)",
        paddingInline: "var(--card-pad)",
        paddingBlock: "clamp(0.7rem, 1.5vh, 1.2rem)",
      }}
    >
      <div
        className="flex flex-wrap items-center justify-start gap-2 text-[clamp(9px,1.9vw,10px)] uppercase tracking-[0.22em] text-black/50 sm:gap-3 sm:tracking-[0.24em]"
        style={{ fontFamily: MONO }}
      >
        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[999px] border border-black/10 bg-[#CBE4DE] px-[7px] py-1 text-center text-black/70">
          By the numbers
        </span>
        {refreshed ? (
          <>
            <span className="hidden h-3 w-px bg-black/15 sm:block" aria-hidden />
            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[999px] border border-black/10 bg-[#CBE4DE] px-[7px] py-1 text-center uppercase tracking-[inherit] text-black/70">
              {refreshed}
            </span>
          </>
        ) : null}
      </div>

      <div className="mt-[clamp(0.9rem,2vh,1.25rem)] overflow-hidden" aria-hidden>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="mt-[clamp(0.9rem,2vh,1.25rem)] grid w-full grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8">
        {stats.map((s) => (
          <div key={s.l} className="group flex min-w-0 flex-col items-center text-center">
            <div
              className="text-[clamp(1.5rem,4.6vw,2.6rem)] font-medium leading-[0.9] tracking-[-0.035em] text-black"
              style={{ fontFamily: SERIF_IT }}
            >
              {s.v}
            </div>
            <div
              className="mt-2 max-w-full text-[clamp(9px,1.9vw,10px)] font-medium uppercase leading-[1.5] tracking-[0.14em] text-black/90 sm:mt-2.5 sm:tracking-[0.16em] lg:whitespace-nowrap"
              style={{ fontFamily: MONO }}
            >
              {s.l}
            </div>
            <div
              className="mx-auto mt-3 h-px w-8 origin-center bg-black/15 transition-all duration-500 group-hover:w-24 group-hover:bg-[#CBE4DE]"
              aria-hidden
            />
          </div>
        ))}
      </div>

      {universities?.length ? (
        <div className="mt-[clamp(0.9rem,2vh,1.25rem)] pt-[clamp(0.9rem,2vh,1.25rem)]">
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
                    className="whitespace-nowrap text-center text-[clamp(0.78rem,2.1vw,0.95rem)] italic tracking-[0.01em] text-black/65 transition-colors hover:text-black"
                    style={{ fontFamily: SERIF_IT }}
                    title={name}
                  >
                    {name}
                  </span>
                  <span className="mx-2 text-black/20 md:ml-3 md:mr-0" aria-hidden>
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
