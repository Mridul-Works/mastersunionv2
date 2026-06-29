import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CHAPTERS } from "./chapters";

const GOLD = "#C9A84C";

export default function TenThings() {
  return (
    <section className="relative bg-[#FAF8F4] py-20 sm:py-28" style={{ fontFamily: "Georgia, serif" }}>
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-3 flex items-center gap-3" style={{ fontFamily: "Arial, sans-serif" }}>
          <span className="h-px w-10" style={{ background: GOLD }} />
          <span className="text-[10px] tracking-[0.28em]" style={{ color: GOLD }}>CUT THE MARKETING</span>
        </div>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[#141414]">
          10 things you should know about{" "}
          <em className="italic text-[#141414]/55">Masters&apos; Union.</em>
        </h2>
        <p className="mt-5 max-w-xl text-[14px] leading-[1.6] text-[#141414]/55" style={{ fontFamily: "Arial, sans-serif" }}>
          No glossy brochure copy. Tap a card to open the full chapter — numbers, partners, and proof.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
        {CHAPTERS.map((c) => (
          <Link
            key={c.n}
            to={c.route}
            className="group relative flex flex-col overflow-hidden rounded-[14px] border border-black/[0.08] bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--tt-gold)]/50 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)]"
            style={{ ["--tt-gold" as never]: GOLD }}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={c.image}
                alt={c.tag}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
              <div
                className="absolute left-3 top-3 rounded-[3px] border px-2 py-1 text-[9px] tracking-[0.18em]"
                style={{ borderColor: "rgba(201,168,76,0.45)", background: "rgba(255,255,255,0.85)", color: GOLD, fontFamily: "Arial, sans-serif" }}
              >
                {c.tag.toUpperCase()}
              </div>
              <div className="absolute right-3 top-3 text-[10px] tracking-[0.1em] text-black/30" style={{ fontFamily: "Arial, sans-serif" }}>
                {c.n}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="text-[22px] leading-[1.15] tracking-[-0.5px] text-[#141414]">
                  {c.headline}
                </h3>
                <div className="mt-5 flex items-baseline gap-3">
                  <div className="text-[32px] leading-none tracking-[-1px]" style={{ color: GOLD }}>{c.stat}</div>
                  <div className="text-[11px] leading-snug text-black/45" style={{ fontFamily: "Arial, sans-serif" }}>
                    {c.label}
                  </div>
                </div>
              </div>
              <div
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-black/10 px-3 py-1.5 text-[10px] tracking-[0.14em] text-black/60 transition-all group-hover:border-[color:var(--tt-gold)]/60 group-hover:text-[color:var(--tt-gold)] group-hover:bg-[color:var(--tt-gold)]/[0.06]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {c.cta.toUpperCase()} <ArrowUpRight className="size-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
