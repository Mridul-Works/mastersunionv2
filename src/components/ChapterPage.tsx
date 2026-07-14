import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Home, Quote, BarChart3, BookOpen, CheckCircle2 } from "lucide-react";
import type { Chapter } from "./chapters";
import BottomNav, { type BottomNavItem } from "./BottomNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const CHAPTER_NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "point", label: "Point", icon: Quote },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "story", label: "Story", icon: BookOpen },
  { id: "proof", label: "Proof", icon: CheckCircle2 },
];

export function ChapterPage({ chapter }: { chapter: Chapter }) {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={CHAPTER_NAV} applyHref="#closing" />
      {/* Chapter marker */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black"
          style={{ fontFamily: MONO }}
        >
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>
          No. {chapter.n} / 10 · {chapter.tag}
        </div>
      </div>


      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
          Chapter {chapter.n} — {chapter.tag}
        </div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-black">
          {chapter.headline}
        </h1>
        <p className="mt-10 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          {chapter.body}
        </p>

        <div className="mt-16 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-[clamp(5rem,14vw,12rem)] leading-[0.8] tracking-[-0.04em] text-black">
              {chapter.stat}
            </div>
            <div className="mt-4 max-w-[36ch] text-[12px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>
              {chapter.label}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none ring-1 ring-black/10">
              <img src={chapter.image} alt={chapter.tag} className="absolute inset-0 h-full w-full object-cover grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section id="point" className="border-y border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
            The point
          </div>
          <blockquote className="mt-6 text-balance text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.15] tracking-[-0.01em] text-black">
            &ldquo;{chapter.pullQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* STATS STRIP */}
      <section id="stats" className="mx-auto max-w-6xl px-5 pt-20 md:px-10">
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {chapter.stats.map((s, i) => (
            <div key={i} className="bg-white px-4 py-10 text-center">
              <div className="text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.03em] text-black">
                {s.value}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NARRATIVE SECTIONS */}
      <section id="story" className="mx-auto max-w-5xl px-5 py-20 md:px-10 md:py-28">
        <div className="space-y-16">
          {chapter.sections.map((sec, i) => (
            <article key={i} className="grid grid-cols-1 gap-6 border-t border-black/10 pt-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-3">
                <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-[clamp(1.2rem,1.8vw,1.5rem)] leading-tight text-black">
                  {sec.heading}
                </h3>
              </div>
              <div className="md:col-span-9">
                <p className="text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-black/75">
                  {sec.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROOF + IN THE ROOM */}
      <section id="proof" className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-20 md:grid md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
              Proof
            </div>
            <ul className="mt-6 space-y-3">
              {chapter.proof.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug text-black/80">
                  <span aria-hidden className="mt-2 inline-block h-[6px] w-[6px] flex-none rounded-full bg-black/70" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
              In the room
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {chapter.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-none border border-black/15 px-3 py-1.5 text-[12px] text-black/80"
                  style={{ fontFamily: MONO }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section id="closing" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">
          {chapter.closing}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-none bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: MONO }}
          >
            ← Back to all 10 things
          </Link>
          <Link
            to="/"
            hash="pedagogy"
            className="inline-flex items-center gap-2 rounded-none border border-black/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black/[0.04]"
            style={{ fontFamily: MONO }}
          >
            Explore pedagogy <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
