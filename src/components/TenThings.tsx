import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CHAPTERS } from "./chapters";

const GOLD = "#C9A84C";
const DARK = "#141414";

export default function TenThings() {
  return (
    <section className="relative bg-[#0F0F0F] py-20 sm:py-28" style={{ fontFamily: "Georgia, serif" }}>
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-3 flex items-center gap-3" style={{ fontFamily: "Arial, sans-serif" }}>
          <span className="h-px w-10" style={{ background: GOLD }} />
          <span className="text-[10px] tracking-[0.28em]" style={{ color: GOLD }}>CUT THE MARKETING</span>
        </div>
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-white">
          10 things you should know about{" "}
          <em className="italic text-white/50">Masters&apos; Union.</em>
        </h2>
        <p className="mt-5 max-w-xl text-[14px] leading-[1.6] text-white/55" style={{ fontFamily: "Arial, sans-serif" }}>
          No glossy brochure copy. Tap a card to open the full chapter — numbers, partners, and proof.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
        {CHAPTERS.map((c) => (
          <Link
            key={c.n}
            to={c.route}
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--tt-gold)]/40 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]"
            style={{ ["--tt-gold" as never]: GOLD }}
          >
            {/* Full-bleed image with dark overlay */}
            <img
              src={c.image}
              alt={c.tag}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-[#0F0F0F]/30" />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />

            {/* Top chips */}
            <div className="relative z-10 flex items-start justify-between p-5">
              <div
                className="rounded-[3px] border px-2 py-1 text-[9px] tracking-[0.18em]"
                style={{ borderColor: "rgba(201,168,76,0.5)", background: "rgba(20,20,20,0.85)", color: GOLD, fontFamily: "Arial, sans-serif" }}
              >
                {c.tag.toUpperCase()}
              </div>
              <div className="text-[10px] tracking-[0.1em] text-white/40" style={{ fontFamily: "Arial, sans-serif" }}>
                {c.n}
              </div>
            </div>

            {/* Bottom content */}
            <div className="relative z-10 mt-auto flex flex-col justify-end p-5">
              <h3 className="text-[22px] leading-[1.15] tracking-[-0.5px] text-white">
                {c.headline}
              </h3>
              <div className="mt-5 flex items-baseline gap-3">
                <div className="text-[32px] leading-none tracking-[-1px]" style={{ color: GOLD }}>{c.stat}</div>
                <div className="text-[11px] leading-snug text-white/55" style={{ fontFamily: "Arial, sans-serif" }}>
                  {c.label}
                </div>
              </div>
              <div
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.14em] text-white/70 transition-all group-hover:border-[color:var(--tt-gold)]/60 group-hover:text-[color:var(--tt-gold)] group-hover:bg-[color:var(--tt-gold)]/[0.08]"
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
