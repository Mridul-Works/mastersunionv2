import { Globe, Building2, Users } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { LogoTile } from "@/components/pg-layout/LogoTile";

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

type Stat = { k: string; v: string };
type Immersion = { tag: string; title: string; body: string; stats: Stat[] };

const IMMERSIONS: Immersion[] = [
  {
    tag: "Global · Terms 4–5",
    title: "Global Immersion",
    body: "A full on-ground module at Fortune 500 HQs and top B-schools — Silicon Valley, Dubai, Singapore, London — meeting operators building at global scale.",
    stats: [
      { k: "5+", v: "Countries hosted to date" },
      { k: "40+", v: "Fortune 500 offices visited" },
      { k: "12", v: "Partner B-schools" },
    ],
  },
  {
    tag: "Bharat · Terms 4–5",
    title: "Bharat Immersion",
    body: "A deep dive into Tier-2 & Tier-3 India — factory floors, family businesses, agri-clusters and D2C hubs. See the market 90% of India actually buys from.",
    stats: [
      { k: "12+", v: "Cities across Bharat" },
      { k: "100+", v: "SMEs & founders met on ground" },
      { k: "6", v: "Sectors covered per cohort" },
    ],
  },
];

const GLOBAL_PARTNER_LOGOS: { name: string; src: string }[] = [
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
];

const BHARAT_PARTNER_LOGOS: { name: string; src: string }[] = [
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
];

export function PgImmersions() {
  return (
    <section id="immersions" className="section-band relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow text-bottle">Immersions</span>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
            Global boardrooms. <span className="text-gradient-brand">Bharat factory floors.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Optional immersion modules that slot into Terms 4 and 5. Two tracks, one goal: see business where it
            actually happens — not where slides describe it.
          </p>
        </Reveal>

        <div className="mt-14 space-y-14">
          {IMMERSIONS.map((im, idx) => {
            const isGlobal = im.title.includes("Global");
            const logos = isGlobal ? GLOBAL_PARTNER_LOGOS : BHARAT_PARTNER_LOGOS;
            const logosLabel = isGlobal ? "Partner B-schools" : "On-ground partners";
            return (
              <Reveal key={im.title} delay={idx * 80}>
                <article className="card-elevated border border-border bg-card p-6 sm:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <span className="font-tech text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {im.tag}
                      </span>
                      <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground">
                        {im.title}
                      </h3>
                    </div>
                    <span className="glow-ring flex size-10 items-center justify-center rounded-full bg-secondary/60 text-teal">
                      {isGlobal ? <Globe className="size-4" /> : <Building2 className="size-4" />}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{im.body}</p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {im.stats.map((s, i) => (
                      <div
                        key={s.v}
                        className="relative overflow-hidden rounded-[4px] border border-border bg-secondary/30 p-5"
                      >
                        <div className="rule-gradient absolute inset-x-0 top-0" />
                        <div className="flex items-start justify-between">
                          <span className="flex size-8 items-center justify-center rounded-full bg-teal/10 text-teal">
                            {i === 0 ? <Globe className="size-4" /> : i === 1 ? <Building2 className="size-4" /> : <Users className="size-4" />}
                          </span>
                        </div>
                        <div className="mt-3 text-3xl font-medium leading-none tracking-[-0.01em] text-foreground">
                          {s.k}
                        </div>
                        <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <div className="font-tech text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {logosLabel}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {logos.map((l) => (
                        <LogoTile key={l.name} name={l.name} src={l.src} size="sm" />
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PgImmersions;
