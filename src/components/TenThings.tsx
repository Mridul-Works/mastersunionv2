import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CHAPTERS, type Chapter } from "./chapters";

const ACCENTS = [
  "#4F46E5", "#F43F5E", "#F59E0B", "#10B981", "#0EA5E9",
  "#8B5CF6", "#F97316", "#0F172A", "#EC4899", "#65A30D",
];

const FONT = "'Inter', system-ui, sans-serif";

export default function TenThings() {
  const railRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= maxScroll - 1 && e.deltaY > 0;
      if (!atStart && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <section className="relative bg-[#FAF8F4] py-20 sm:py-28" style={{ fontFamily: FONT }}>
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
              No glossy brochure copy. Ten chapters. Tap any card to open the full dossier.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex size-11 items-center justify-center border border-black/20 bg-white text-black transition-colors hover:bg-black hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex size-11 items-center justify-center border border-black bg-black text-white transition-colors hover:bg-white hover:text-black"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        onWheel={onWheel}
        className="mt-14 overflow-x-auto overflow-y-hidden pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-5 px-5 sm:px-8 snap-x snap-mandatory">
          {CHAPTERS.map((c, i) => {
            const accent = ACCENTS[i] ?? "#0F172A";
            const isOpen = openIdx === i;
            return (
              <li key={c.n} className="snap-start">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className={`group relative flex flex-col overflow-hidden border border-black/10 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-[12px_12px_0_0_#0F172A] ${isOpen ? "ring-2 ring-black" : ""}`}
                  style={{ fontFamily: FONT, height: "480px", width: "340px" }}
                >
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.headline}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <h3 className="text-[19px] font-black leading-[1.1] tracking-tight text-black uppercase">
                      {c.headline}
                    </h3>
                    <div className="mt-4 flex items-end justify-between border-t border-black/10 pt-4">
                      <div>
                        <div className="text-2xl font-black leading-none text-black">{c.stat}</div>
                        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                          {c.label}
                        </div>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em]"
                        style={{ color: accent }}
                      >
                        {isOpen ? "Close" : "Expand"}
                        <ArrowUpRight className={`size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isOpen ? "rotate-180" : ""}`} />
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: accent }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Inline expanded dossier — lives inside the page flow, not a popup */}
      <AnimatePresence>
        {openIdx !== null && (
          <ExpandedPanel
            chapter={CHAPTERS[openIdx]}
            accent={ACCENTS[openIdx] ?? "#0F172A"}
            onClose={() => setOpenIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ExpandedPanel({ chapter, accent, onClose }: { chapter: Chapter; accent: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 20, height: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 240 }}
      className="overflow-hidden border-y border-black/10 bg-white"
      style={{ fontFamily: FONT }}
    >
      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 sm:py-12">
        {/* Masthead */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-block px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white"
              style={{ background: accent }}
            >
              Chapter {chapter.n} · {chapter.tag}
            </span>
            <h3 className="mt-4 max-w-[24ch] text-[clamp(1.6rem,3.5vw,2.8rem)] font-black uppercase leading-[1.05] tracking-tight text-black">
              {chapter.headline}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 items-center justify-center border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative mb-10 h-[260px] w-full overflow-hidden sm:h-[360px]">
          <img src={chapter.image} alt={chapter.headline} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <blockquote className="max-w-[40ch] text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium italic leading-[1.3] text-white">
              &ldquo;{chapter.pullQuote}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[15px] leading-[1.65] text-black/80">{chapter.body}</p>

            <div className="mt-10 space-y-6">
              {chapter.sections.map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[15px] font-black uppercase tracking-tight text-black">{s.heading}</h4>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-black/75">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="border border-black/10 bg-[#FAF8F4]">
              <div className="border-b border-black/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/60">
                The dossier
              </div>
              <div className="px-5 py-6">
                <div className="text-[clamp(2.6rem,5vw,3.6rem)] font-black leading-none text-black">{chapter.stat}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-black/55">{chapter.label}</div>
              </div>
              <div className="grid grid-cols-2 border-t border-black/10">
                {chapter.stats.map((s, i) => (
                  <div
                    key={i}
                    className="border-black/10 px-5 py-5 [&:nth-child(odd)]:border-r [&:not(:nth-last-child(-n+2))]:border-b"
                  >
                    <div className="text-[20px] font-black leading-none text-black">{s.value}</div>
                    <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-black/55">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60">Proof</div>
              <ul className="mt-3 space-y-2">
                {chapter.proof.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-black/80">
                    <span aria-hidden className="mt-1.5 inline-block size-1.5 flex-none" style={{ background: accent }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60">In the room</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {chapter.chips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-black/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/75"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Closing */}
        <div className="mt-10 border-t border-black/10 px-0 py-6 sm:py-8">
          <div className="max-w-[60ch] border-l-2 pl-5" style={{ borderColor: accent }}>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-medium italic leading-snug text-black">
              {chapter.closing}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
