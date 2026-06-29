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
        data-tenthings-rail
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
  const nextIdx = (parseInt(chapter.n, 10) % 10);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const splitHeadline = (text: string) => {
    const splitters = [". ", " — ", ": ", ", "];
    for (const sep of splitters) {
      const idx = text.indexOf(sep);
      if (idx > 0 && idx < text.length * 0.65) {
        return [text.slice(0, idx + sep.length - 1), text.slice(idx + sep.length)];
      }
    }
    return [text, ""];
  };
  const [headA, headB] = splitHeadline(chapter.headline);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 20, height: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 240 }}
      className="overflow-hidden border-y border-black/10 bg-[#0A0A0A]"
      style={{ fontFamily: FONT }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row">
          {/* Left vertical status rail */}
          <div className="hidden lg:flex w-16 shrink-0 flex-col items-center border-r border-white/10 py-8 gap-12 bg-[#050505]">
            <div className="font-mono text-[10px] text-white/40 -rotate-90 whitespace-nowrap uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Dossier {chapter.n} // 10
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {CHAPTERS.map((c, i) => {
                const active = parseInt(c.n, 10) === parseInt(chapter.n, 10);
                return (
                  <div
                    key={c.n}
                    className="w-1 h-8 transition-colors"
                    style={{ background: active ? accent : "rgba(255,255,255,0.1)" }}
                  />
                );
              })}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-white/50 hover:text-white"
            >
              <div className="w-1 h-1 rounded-full bg-current" />
            </button>
          </div>

          {/* Main dossier area */}
          <div className="flex-1 flex flex-col">
            {/* Masthead */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 px-6 py-8 lg:px-10 lg:py-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[10px] uppercase tracking-tighter"
                    style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    [ {chapter.tag.toUpperCase()} ]
                  </span>
                  <div className="h-px w-12" style={{ background: `${accent}30` }} />
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter leading-none text-white">
                  {headA}
                  {headB && <span className="block md:ml-12 text-white/50">{headB}</span>}
                </h3>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1">
                <p className="font-mono text-[11px] text-white/40 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Categorization
                </p>
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  {chapter.tag}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col lg:flex-row">
              <div className="flex-[3] border-b border-white/10 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10 space-y-8">
                {/* Hero image */}
                <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-white/5 group">
                  <img
                    src={chapter.image}
                    alt={chapter.headline}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className="font-mono text-[9px] uppercase"
                      style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Exhibit A: {chapter.tag} in action
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Primary Thesis</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{chapter.body}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Key Outcome</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <ul className="space-y-2">
                      {chapter.proof.slice(0, 4).map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                          <span
                            className="font-mono text-xs"
                            style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Detailed sections */}
                <div className="space-y-6 pt-4">
                  {chapter.sections.map((s, i) => (
                    <div key={i} className="border-t border-white/10 pt-6">
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-sm font-black uppercase tracking-tight text-white">{s.heading}</h4>
                      </div>
                      <p className="mt-2 text-[13px] leading-[1.65] text-white/60">{s.body}</p>
                    </div>
                  ))}
                </div>

                {/* Closing */}
                <div className="border-l-2 pl-5" style={{ borderColor: accent }}>
                  <p className="text-base font-medium italic leading-snug text-white/80">
                    &ldquo;{chapter.pullQuote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Stats sidebar */}
              <div className="flex-1 bg-[#050505] px-6 py-8 lg:px-10 lg:py-10">
                <p
                  className="mb-12 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Performance Indicators
                </p>

                <div className="space-y-10">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Indicator 01
                    </p>
                    <h4 className="text-sm font-bold uppercase text-white/80">{chapter.label}</h4>
                    <div className="pt-2 text-5xl font-black tracking-tighter text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {chapter.stat}
                    </div>
                  </div>

                  {chapter.stats.map((s, i) => (
                    <div key={i} className="space-y-1 border-t border-white/10 pt-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Indicator {String(i + 2).padStart(2, "0")}
                      </p>
                      <div className="pt-2 text-4xl font-black tracking-tighter text-white">
                        {s.value}
                        <span style={{ color: accent }}>.</span>
                      </div>
                      <p className="text-[11px] uppercase leading-tight text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    In the room
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className="border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-8">
                  <button
                    onClick={() => {
                      const rail = document.querySelector('[data-tenthings-rail]') as HTMLElement | null;
                      if (rail) {
                        rail.scrollTo({ left: nextIdx * 360, behavior: 'smooth' });
                      }
                      onClose();
                    }}
                    className="group flex w-full items-center justify-between bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:opacity-90"
                    style={{ color: "#0A0A0A" }}
                  >
                    Explore Next
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
