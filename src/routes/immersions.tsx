import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Building2, Users, ArrowLeft } from "lucide-react";

import babsonLogo from "@/assets/immersion-logos/babson.png.asset.json";
import bocconiLogo from "@/assets/immersion-logos/sda-bocconi.png.asset.json";
import escpLogo from "@/assets/immersion-logos/escp.png.asset.json";
import fosterLogo from "@/assets/immersion-logos/foster.png.asset.json";
import illinoisLogo from "@/assets/immersion-logos/illinois-tech.png.asset.json";
import iveyLogo from "@/assets/immersion-logos/ivey.png.asset.json";
import nbsLogo from "@/assets/immersion-logos/nbs.png.asset.json";
import smuLogo from "@/assets/immersion-logos/smu.png.asset.json";
import ucLogo from "@/assets/immersion-logos/uc.png.asset.json";
import wbsLogo from "@/assets/immersion-logos/wbs.png.asset.json";

import zeptoLogo from "@/assets/bharat-logos/zepto.png.asset.json";
import zerodhaLogo from "@/assets/bharat-logos/zerodha.png.asset.json";
import credLogo from "@/assets/bharat-logos/cred.png.asset.json";
import amulLogo from "@/assets/bharat-logos/amul.png.asset.json";
import infosysLogo from "@/assets/bharat-logos/infosys.png.asset.json";
import itcLogo from "@/assets/bharat-logos/itc.png.asset.json";
import godrejLogo from "@/assets/bharat-logos/godrej.png.asset.json";
import adaniPortsLogo from "@/assets/bharat-logos/adani-ports.png.asset.json";
import nseLogo from "@/assets/bharat-logos/nse.png.asset.json";
import bseLogo from "@/assets/bharat-logos/bse.png.asset.json";

const IMMERSIONS = [
  {
    tag: "Global · Terms 4–5",
    title: "Global Immersion",
    body:
      "A full on-ground module at Fortune 500 HQs and top B-schools — Silicon Valley, Dubai, Singapore, London — meeting operators building at global scale.",
    stats: [
      { k: "5+", v: "Countries hosted to date" },
      { k: "40+", v: "Fortune 500 offices visited" },
      { k: "12", v: "Partner B-schools" },
    ],
    logosLabel: "Partner B-schools",
    logos: [
      { name: "SDA Bocconi", src: bocconiLogo.url },
      { name: "ESCP Business School", src: escpLogo.url },
      { name: "Warwick Business School", src: wbsLogo.url },
      { name: "Ivey Business School", src: iveyLogo.url },
      { name: "Nottingham Business School", src: nbsLogo.url },
      { name: "Singapore Management University", src: smuLogo.url },
      { name: "Foster School of Business", src: fosterLogo.url },
      { name: "Babson College", src: babsonLogo.url },
      { name: "University of California", src: ucLogo.url },
      { name: "Illinois Tech", src: illinoisLogo.url },
    ],
  },
  {
    tag: "Bharat · Terms 4–5",
    title: "Bharat Immersion",
    body:
      "A deep dive into Tier-2 & Tier-3 India — factory floors, family businesses, agri-clusters and D2C hubs. See the market 90% of India actually buys from.",
    stats: [
      { k: "12+", v: "Cities across Bharat" },
      { k: "100+", v: "SMEs & founders met on ground" },
      { k: "6", v: "Sectors covered per cohort" },
    ],
    logosLabel: "On-ground partners",
    logos: [
      { name: "NSE", src: nseLogo.url },
      { name: "BSE", src: bseLogo.url },
      { name: "Infosys", src: infosysLogo.url },
      { name: "ITC", src: itcLogo.url },
      { name: "Godrej Industries", src: godrejLogo.url },
      { name: "Adani Ports", src: adaniPortsLogo.url },
      { name: "Amul", src: amulLogo.url },
      { name: "Zepto", src: zeptoLogo.url },
      { name: "Zerodha", src: zerodhaLogo.url },
      { name: "CRED", src: credLogo.url },
    ],
  },
];

export const Route = createFileRoute("/immersions")({
  head: () => ({
    meta: [
      { title: "Immersions — Global boardrooms. Bharat factory floors. | Masters' Union" },
      {
        name: "description",
        content:
          "Optional immersion modules in Terms 4 & 5 — Global (Silicon Valley, Dubai, Singapore, London) and Bharat (Tier-2/3 India factory floors, family businesses, D2C hubs).",
      },
      { property: "og:title", content: "Immersions — Masters' Union" },
      {
        property: "og:description",
        content:
          "See business where it actually happens — Global Fortune 500 HQs and Bharat's Tier-2/3 markets.",
      },
    ],
  }),
  component: ImmersionsPage,
});

function ImmersionsPage() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black"
        >
          <ArrowLeft className="size-3" /> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55">
          Immersions · On the ground
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
          — Immersions
        </div>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-black">
          Global boardrooms.{" "}
          <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Bharat factory floors.
          </span>
        </h1>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.6] text-black/65">
          Optional immersion modules that slot into Terms 4 and 5. Two tracks, one goal: see
          business where it actually happens — not where slides describe it.
        </p>
      </section>

      {/* IMMERSION CARDS */}
      <section className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid gap-8 border-t border-black/10 py-10 md:grid-cols-[300px_1fr] md:gap-16">
          <div>
            <div className="font-display text-3xl leading-none text-black/25">01 · 02</div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Two immersion tracks
            </div>
            <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight">
              Pick one. Or do both.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/65">
              Global takes you to Fortune 500 offices and partner B-schools abroad. Bharat drops
              you into Tier-2 &amp; Tier-3 India — the market 90% of the country actually buys
              from.
            </p>
          </div>

          <div className="space-y-px bg-black/10">
            {IMMERSIONS.map((im) => (
              <article key={im.title} className="bg-white/90 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                      {im.tag}
                    </div>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">
                      {im.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65">{im.body}</p>

                {/* Outcome metrics */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {im.stats.map((s, i) => (
                    <div
                      key={s.v}
                      className="relative overflow-hidden border border-emerald-900/15 bg-gradient-to-br from-emerald-50/90 to-white p-5"
                    >
                      <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                      <div className="flex items-start justify-between">
                        <div className="inline-flex size-8 items-center justify-center bg-emerald-400/10 text-emerald-700">
                          {i === 0 ? (
                            <Globe className="size-4" />
                          ) : i === 1 ? (
                            <Building2 className="size-4" />
                          ) : (
                            <Users className="size-4" />
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="font-display text-4xl leading-none tracking-tight text-emerald-900">
                          {s.k}
                        </div>
                        <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-black/60">
                          {s.v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Partner logos */}
                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
                    {im.logosLabel}
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-px bg-black/10">
                    {im.logos.map((l) => (
                      <div
                        key={l.name}
                        title={l.name}
                        className="flex h-16 items-center justify-center bg-white p-3 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                      >
                        <img
                          src={l.src}
                          alt={l.name}
                          className={`w-auto max-w-full object-contain ${
                            l.name === "Warwick Business School" ||
                            l.name === "University of California"
                              ? "h-12"
                              : "h-8"
                          }`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-10">
        <div className="border-t border-black/10 pt-10">
          <Link
            to="/programmes/pgp-tbm"
            className="inline-flex items-center gap-2 border-b-2 border-black pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-black/50 hover:text-black/60"
          >
            See the full PGP TBM programme →
          </Link>
        </div>
      </section>
    </main>
  );
}
