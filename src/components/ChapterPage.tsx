import { Link } from "@tanstack/react-router";
import type { Chapter } from "./chapters";

export function ChapterPage({ chapter }: { chapter: Chapter }) {
  return (
    <main className="min-h-screen" style={{ background: chapter.bg, color: chapter.ink }}>
      {/* Top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-75 transition-opacity hover:opacity-100"
          style={{ color: chapter.ink }}
        >
          <span aria-hidden>←</span> Back to Masters&apos; Union
        </Link>
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
          No. {chapter.n} / 10
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-10 md:pt-16">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-70">
          {chapter.tag}
        </div>

        <h1
          className="mt-6 max-w-[20ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {chapter.headline}
        </h1>

        <p
          className="mt-10 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-relaxed opacity-90"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {chapter.body}
        </p>

        {/* Hero stat */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              className="text-[clamp(5rem,14vw,12rem)] leading-[0.8] tracking-[-0.04em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {chapter.stat}
            </div>
            <div className="mt-4 max-w-[34ch] font-mono text-[12px] uppercase tracking-[0.2em] opacity-75">
              {chapter.label}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-white/10">
              <img src={chapter.image} alt={chapter.tag} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
          {chapter.stats.map((s, i) => (
            <div key={i} className="px-4 py-8 text-center" style={{ background: chapter.bg }}>
              <div className="text-[clamp(1.4rem,3vw,2.6rem)] leading-none tracking-[-0.03em]" style={{ fontFamily: "Georgia, serif" }}>
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chips */}
        <div className="mt-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">In the room</div>
          <div className="flex flex-wrap gap-2">
            {chapter.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border px-3 py-1.5 text-[12px]"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: chapter.ink }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* CTA back */}
        <div className="mt-20 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-80 transition-opacity hover:opacity-100"
          >
            <span aria-hidden>←</span> Back to all 10 things
          </Link>
        </div>
      </div>
    </main>
  );
}
