import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CHAPTERS } from "./chapters";

const ACCENTS = [
  "#4F46E5", "#F43F5E", "#F59E0B", "#10B981", "#0EA5E9",
  "#8B5CF6", "#F97316", "#0F172A", "#EC4899", "#65A30D",
];

const FONT = "'Inter', system-ui, sans-serif";

export default function TenThings() {
  return (
    <section className="relative bg-[#FAF8F4] py-20 sm:py-28" style={{ fontFamily: FONT }}>
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-black" />
              <span className="text-[10px] font-black tracking-[0.32em] text-black">CUT THE MARKETING</span>
            </div>
            <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1] tracking-tight text-black uppercase">
              10 things you should know about Masters&apos; Union.
            </h2>
            <p className="mt-5 max-w-xl text-[13px] font-medium tracking-wide text-black/60">
              No glossy brochure copy. Ten chapters. Scroll through, tap any to open the full story.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/50">
            <span>scroll</span>
            <span className="h-px w-12 bg-black/30" />
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="mt-14 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max gap-5 px-5 sm:px-8 snap-x snap-mandatory">
          {CHAPTERS.map((c, i) => {
            const accent = ACCENTS[i] ?? "#0F172A";
            return (
              <li key={c.n} className="snap-start">
                <Link
                  to={c.route}
                  className="group relative flex h-[460px] w-[320px] flex-col overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-[12px_12px_0_0_#0F172A]"
                  style={{ fontFamily: FONT }}
                >
                  {/* Image */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.headline}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-0 top-0 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white"
                      style={{ background: accent }}
                    >
                      Chapter {c.n}
                    </span>
                    <span className="absolute right-3 top-3 bg-white/95 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-black">
                      {c.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <h3 className="text-[19px] font-black leading-[1.1] tracking-tight text-black uppercase">
                      {c.headline}
                    </h3>

                    <div className="mt-4">
                      <div className="flex items-end justify-between border-t border-black/10 pt-4">
                        <div>
                          <div className="text-2xl font-black leading-none text-black">{c.stat}</div>
                          <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                            {c.label}
                          </div>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                          style={{ color: accent }}
                        >
                          {c.cta}
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Accent bar */}
                  <div
                    className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: accent }}
                  />
                </Link>
              </li>
            );
          })}

          {/* End cap */}
          <li className="snap-start">
            <div className="flex h-[460px] w-[260px] flex-col items-start justify-between border border-black/10 bg-black p-6 text-white">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">End of index</span>
              <div>
                <h3 className="text-2xl font-black leading-[1.05] uppercase tracking-tight">
                  Want the full dossier?
                </h3>
                <p className="mt-3 text-[12px] text-white/60 leading-relaxed">
                  Download the unedited prospectus — every number, every program, every placement.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 border border-white/30 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors">
                Get prospectus <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
