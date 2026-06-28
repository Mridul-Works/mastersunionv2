import { Link } from "@tanstack/react-router";
import type { Chapter } from "./chapters";

export function ChapterPage({ chapter }: { chapter: Chapter }) {
  return (
    <main className="min-h-screen" style={{ background: chapter.bg, color: chapter.ink, fontFamily: "Georgia, serif" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-20 backdrop-blur-sm"
        style={{ background: `${chapter.bg}E6`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] opacity-80 transition-opacity hover:opacity-100"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: chapter.ink }}
          >
            <span aria-hidden>←</span> Masters&apos; Union
          </Link>
          <div className="text-[11px] uppercase tracking-[0.25em] opacity-70" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
            No. {chapter.n} / 10 · {chapter.tag}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] opacity-70" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
          Chapter {chapter.n} — {chapter.tag}
        </div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          {chapter.headline}
        </h1>
        <p className="mt-10 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] opacity-90">
          {chapter.body}
        </p>

        <div className="mt-16 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-[clamp(5rem,14vw,12rem)] leading-[0.8] tracking-[-0.04em]">
              {chapter.stat}
            </div>
            <div className="mt-4 max-w-[36ch] text-[12px] uppercase tracking-[0.2em] opacity-75" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {chapter.label}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-white/10">
              <img src={chapter.image} alt={chapter.tag} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.3em] opacity-60" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
            The point
          </div>
          <blockquote className="mt-6 text-balance text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] tracking-[-0.01em]">
            &ldquo;{chapter.pullQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
          {chapter.stats.map((s, i) => (
            <div key={i} className="px-4 py-10 text-center" style={{ background: chapter.bg }}>
              <div className="text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">
                {s.value}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.2em] opacity-70" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NARRATIVE SECTIONS */}
      <section className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
        <div className="space-y-16">
          {chapter.sections.map((sec, i) => (
            <article key={i} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-3">
                <div className="text-[11px] uppercase tracking-[0.3em] opacity-60" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-[clamp(1.2rem,1.8vw,1.5rem)] leading-tight">
                  {sec.heading}
                </h3>
              </div>
              <div className="md:col-span-9">
                <p className="text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] opacity-90">
                  {sec.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROOF + IN THE ROOM */}
      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:grid md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] opacity-60" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              Proof
            </div>
            <ul className="mt-6 space-y-3">
              {chapter.proof.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug">
                  <span aria-hidden className="mt-2 inline-block h-[6px] w-[6px] flex-none rounded-full" style={{ background: chapter.ink, opacity: 0.7 }} />
                  <span className="opacity-90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <div className="text-[11px] uppercase tracking-[0.3em] opacity-60" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              In the room
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {chapter.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-3 py-1.5 text-[12px]"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: chapter.ink, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] opacity-95">
          {chapter.closing}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-80"
            style={{ background: chapter.ink, color: chapter.bg, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            ← Back to all 10 things
          </Link>
        </div>
      </section>
    </main>
  );
}
