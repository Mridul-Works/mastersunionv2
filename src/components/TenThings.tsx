import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CHAPTERS } from "./chapters";

type Slot = {
  bg: string;
  ink: "white" | "black";
  span: string;
  size: "xl" | "wide" | "tall" | "sq";
};

// Mondrian bento arrangement — sharp edges, vibrant blocks
const SLOTS: Slot[] = [
  { bg: "#4F46E5", ink: "white", span: "md:col-span-2 md:row-span-2", size: "xl" },   // 01
  { bg: "#F43F5E", ink: "white", span: "", size: "sq" },                              // 02
  { bg: "#F59E0B", ink: "black", span: "", size: "sq" },                              // 03
  { bg: "#10B981", ink: "white", span: "md:col-span-2", size: "wide" },               // 04
  { bg: "#0EA5E9", ink: "white", span: "md:row-span-2", size: "tall" },               // 05
  { bg: "#8B5CF6", ink: "white", span: "", size: "sq" },                              // 06
  { bg: "#F97316", ink: "white", span: "", size: "sq" },                              // 07
  { bg: "#1E293B", ink: "white", span: "md:row-span-2", size: "tall" },               // 08 (dark anchor)
  { bg: "#EC4899", ink: "white", span: "", size: "sq" },                              // 09
  { bg: "#A3E635", ink: "black", span: "", size: "sq" },                              // 10
];

const FONT = "'Inter', system-ui, sans-serif";

export default function TenThings() {
  return (
    <section className="relative bg-[#FAF8F4] py-20 sm:py-28" style={{ fontFamily: FONT }}>
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-10 bg-black" />
          <span className="text-[10px] font-black tracking-[0.32em] text-black">CUT THE MARKETING</span>
        </div>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1] tracking-tight text-black uppercase">
          10 things you should know about Masters&apos; Union.
        </h2>
        <p className="mt-5 max-w-xl text-[13px] font-medium tracking-wide text-black/60">
          No glossy brochure copy. Ten blocks. Tap any to open the full chapter.
        </p>
      </div>

      {/* Mondrian bento */}
      <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 md:grid-cols-4 md:auto-rows-[200px]">
        {CHAPTERS.map((c, i) => {
          const slot = SLOTS[i] ?? SLOTS[9];
          const ink = slot.ink === "white" ? "text-white" : "text-black";
          const subInk = slot.ink === "white" ? "text-white/70" : "text-black/60";
          const numInk = slot.ink === "white" ? "text-white/25" : "text-black/25";
          const btn =
            slot.ink === "white"
              ? "bg-white text-black hover:bg-black hover:text-white"
              : "bg-black text-white hover:bg-white hover:text-black";

          if (slot.size === "xl") {
            return (
              <Link
                key={c.n}
                to={c.route}
                className={`group relative flex flex-col justify-between p-8 transition-transform duration-300 hover:-translate-y-1 ${slot.span} ${ink}`}
                style={{ background: slot.bg, fontFamily: FONT }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">Chapter {c.n}</span>
                  <span className="bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{c.tag}</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-3xl sm:text-4xl font-black leading-[1] uppercase tracking-tight">{c.headline}</h3>
                  <p className={`mt-3 text-sm leading-snug max-w-md ${subInk}`}>{c.body}</p>
                </div>
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <div className="text-4xl font-black leading-none">{c.stat}</div>
                    <div className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${subInk}`}>{c.label}</div>
                  </div>
                  <span className={`px-5 py-3 font-black text-xs uppercase tracking-tighter inline-flex items-center gap-2 transition-colors ${btn}`}>
                    {c.cta} <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            );
          }

          if (slot.size === "wide") {
            return (
              <Link
                key={c.n}
                to={c.route}
                className={`group relative flex items-center justify-between p-6 transition-transform duration-300 hover:-translate-y-1 ${slot.span} ${ink}`}
                style={{ background: slot.bg, fontFamily: FONT }}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.28em] block mb-2 ${subInk}`}>
                    {c.n} · {c.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black leading-[1.05] uppercase tracking-tight">{c.headline}</h3>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-black leading-none">{c.stat}</div>
                  <div className={`mt-1 text-[9px] font-bold uppercase tracking-widest ${subInk}`}>{c.label}</div>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase underline underline-offset-4">
                    {c.cta} <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
            );
          }

          if (slot.size === "tall") {
            return (
              <Link
                key={c.n}
                to={c.route}
                className={`group relative flex flex-col justify-between p-6 transition-transform duration-300 hover:-translate-y-1 ${slot.span} ${ink}`}
                style={{ background: slot.bg, fontFamily: FONT }}
              >
                <span
                  className="self-start px-2 py-1 text-[10px] font-black uppercase tracking-widest"
                  style={{
                    background: slot.ink === "white" ? "#ffffff" : "#000000",
                    color: slot.bg,
                  }}
                >
                  Chapter {c.n}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black leading-[1] uppercase tracking-tight">{c.headline}</h3>
                  <p className={`mt-3 text-xs font-medium ${subInk}`}>{c.tag.toUpperCase()}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-current/20 pb-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${subInk}`}>Metric</span>
                    <span className="text-[10px] font-black">{c.stat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${subInk}`}>Proof</span>
                    <span className="text-[10px] font-black truncate max-w-[60%] text-right">{c.label}</span>
                  </div>
                  <span className={`mt-2 block w-full py-3 text-center font-black text-xs uppercase tracking-tighter transition-colors ${btn}`}>
                    {c.cta}
                  </span>
                </div>
              </Link>
            );
          }

          // sq
          return (
            <Link
              key={c.n}
              to={c.route}
              className={`group relative flex flex-col justify-between p-6 transition-transform duration-300 hover:-translate-y-1 ${slot.span} ${ink}`}
              style={{ background: slot.bg, fontFamily: FONT }}
            >
              <div className="flex items-start justify-between">
                <span className={`text-4xl font-black leading-none ${numInk}`}>{c.n}</span>
                <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h3 className="text-lg sm:text-xl font-black leading-[1.05] uppercase tracking-tight">{c.headline}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black">{c.stat}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${subInk}`}>{c.tag}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
