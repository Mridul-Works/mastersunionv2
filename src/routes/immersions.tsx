import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Factory,
  Globe,
  Map,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";

const IMMERSIONS_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "formats", label: "Formats" },
  { id: "standalone", label: "Standalone" },
  { id: "credits", label: "Credits" },
  { id: "apply", label: "Apply" },
];

// Global immersion companies (from Drive)
import daikinLogo from "@/assets/immersions/global/daikin.png.asset.json";
import universalStudiosLogo from "@/assets/immersions/global/universal-studios.png.asset.json";
import heinekenLogo from "@/assets/immersions/global/heineken.png.asset.json";
import rabobankLogo from "@/assets/immersions/global/rabobank.png.asset.json";
import agodaLogo from "@/assets/immersions/global/agoda.png.asset.json";
import philipsLogo from "@/assets/immersions/global/philips.png.asset.json";
import nissanLogo from "@/assets/immersions/global/nissan.png.asset.json";
import disneylandLogo from "@/assets/immersions/global/disneyland.png.asset.json";
import stationFLogo from "@/assets/immersions/global/station-f.png.asset.json";
import rakutenLogo from "@/assets/immersions/global/rakuten.png.asset.json";
import unitedNationsLogo from "@/assets/immersions/global/united-nations.png.asset.json";
import porscheLogo from "@/assets/immersions/global/porsche.png.asset.json";
import zaanseSchansLogo from "@/assets/immersions/global/zaanse-schans.png.asset.json";

// Bharat immersion companies (from Drive)
import indoRiflesLogo from "@/assets/immersions/bharat/indo-rifles.png.asset.json";
import adaniSolarLogo from "@/assets/immersions/bharat/adani-solar.png.asset.json";
import zeptoLogo from "@/assets/immersions/bharat/zepto.png.asset.json";
import dabbawalasLogo from "@/assets/immersions/bharat/dabbawalas.png.asset.json";
import adaniWilmarLogo from "@/assets/immersions/bharat/adani-wilmar.png.asset.json";
import zerodhaLogo from "@/assets/immersions/bharat/zerodha.png.asset.json";
import mercedesLogo from "@/assets/immersions/bharat/mercedes.png.asset.json";
import universalBooksellersLogo from "@/assets/immersions/bharat/universal-booksellers.png.asset.json";
import niviaLogo from "@/assets/immersions/bharat/nivia.png.asset.json";
import dharmaProductionsLogo from "@/assets/immersions/bharat/dharma-productions.png.asset.json";
import bseLogo from "@/assets/immersions/bharat/bse.png.asset.json";
import goaShipyardLogo from "@/assets/immersions/bharat/goa-shipyard.png.asset.json";
import lpuLogo from "@/assets/immersions/bharat/lpu.png.asset.json";
import godrejLogo from "@/assets/immersions/bharat/godrej.png.asset.json";
import govUpLogo from "@/assets/immersions/bharat/gov-up.png.asset.json";
import infosysLogo from "@/assets/immersions/bharat/infosys.png.asset.json";
import nseLogo from "@/assets/immersions/bharat/nse.png.asset.json";
import ndmaLogo from "@/assets/immersions/bharat/ndma.png.asset.json";
import adaniPortsLogo from "@/assets/immersions/bharat/adani-ports.png.asset.json";
import amulLogo from "@/assets/immersions/bharat/amul.png.asset.json";
import cordellaCruisesLogo from "@/assets/immersions/bharat/cordella-cruises.png.asset.json";
import addverbLogo from "@/assets/immersions/bharat/addverb.png.asset.json";
import cingularityLogo from "@/assets/immersions/bharat/cingularity.png.asset.json";
import rbiLogo from "@/assets/immersions/bharat/rbi.png.asset.json";
import lenskartLogo from "@/assets/immersions/bharat/lenskart.png.asset.json";
import sesaGoaLogo from "@/assets/immersions/bharat/sesa-goa.png.asset.json";
import sonalikaLogo from "@/assets/immersions/bharat/sonalika.png.asset.json";
import adaLogo from "@/assets/immersions/bharat/ada.png.asset.json";
import cazuloLogo from "@/assets/immersions/bharat/cazulo.png.asset.json";
import credLogo from "@/assets/immersions/bharat/cred.png.asset.json";
import itcLogo from "@/assets/immersions/bharat/itc.png.asset.json";

// Summer / Semester Abroad partner campuses
import babsonLogo from "@/assets/immersions/campuses/babson.png.asset.json";
import bocconiLogo from "@/assets/immersions/campuses/sda-bocconi.png.asset.json";
import fosterLogo from "@/assets/immersions/campuses/foster.png.asset.json";
import griffithLogo from "@/assets/immersions/campuses/griffith.png.asset.json";
import illinoisLogo from "@/assets/immersions/campuses/illinois-tech.png.asset.json";
import imperialLogo from "@/assets/immersions/campuses/imperial.png.asset.json";
import smuLogo from "@/assets/immersions/campuses/smu.png.asset.json";
import ucLogo from "@/assets/immersions/campuses/uc.png.asset.json";
import escpLogo from "@/assets/immersions/campuses/escp.png.asset.json";
import nbsLogo from "@/assets/immersions/campuses/nbs.png.asset.json";
import wbsLogo from "@/assets/immersions/campuses/wbs.png.asset.json";
import iveyLogo from "@/assets/immersions/campuses/ivey.png.asset.json";
import cuhkLogo from "@/assets/immersions/campuses/cuhk.png.asset.json";


const INTER = "'Inter', system-ui, sans-serif";
const SERIF = "'Fraunces', Georgia, serif";

const HERO_STATS = [
  { k: "5", v: "Immersion formats" },
  { k: "20+", v: "Countries & cities" },
  { k: "Yes", v: "Academic credits" },
  { k: "Real", v: "Companies, not campuses" },
];

const GLOBAL_PARTNERS = [
  { name: "Nissan", src: nissanLogo.url },
  { name: "Rakuten", src: rakutenLogo.url },
  { name: "Porsche", src: porscheLogo.url },
  { name: "Daikin", src: daikinLogo.url },
  { name: "Heineken", src: heinekenLogo.url },
  { name: "Philips", src: philipsLogo.url },
  { name: "Rabobank", src: rabobankLogo.url },
  { name: "Agoda", src: agodaLogo.url },
  { name: "Universal Studios", src: universalStudiosLogo.url },
  { name: "Disneyland", src: disneylandLogo.url },
  { name: "Station F", src: stationFLogo.url },
  { name: "United Nations", src: unitedNationsLogo.url },
];

const BHARAT_PARTNERS = [
  { name: "Adani Ports", src: adaniPortsLogo.url },
  { name: "ITC", src: itcLogo.url },
  { name: "Amul", src: amulLogo.url },
  { name: "Infosys", src: infosysLogo.url },
  { name: "Godrej Industries", src: godrejLogo.url },
  { name: "Lenskart", src: lenskartLogo.url },
  { name: "Zepto", src: zeptoLogo.url },
  { name: "CRED", src: credLogo.url },
  { name: "Zerodha", src: zerodhaLogo.url },
  { name: "NSE", src: nseLogo.url },
  { name: "Reserve Bank of India", src: rbiLogo.url },
  { name: "Dharma Productions", src: dharmaProductionsLogo.url },
];

const CAMPUS_PARTNERS = [
  { name: "SDA Bocconi", src: bocconiLogo.url },
  { name: "ESCP Business School", src: escpLogo.url },
  { name: "Warwick Business School", src: wbsLogo.url },
  { name: "Nottingham Business School", src: nbsLogo.url },
  { name: "Ivey Business School", src: iveyLogo.url },
  { name: "Foster School of Business", src: fosterLogo.url },
  { name: "Babson College", src: babsonLogo.url },
  { name: "University of California", src: ucLogo.url },
  { name: "Singapore Management University", src: smuLogo.url },
  { name: "Illinois Tech", src: illinoisLogo.url },
  { name: "Griffith University", src: griffithLogo.url },
];


function LogoStrip({
  items,
  label,
}: {
  items: { name: string; src: string }[];
  label: string;
}) {
  return (
    <div className="mt-6 border-t border-black/10 pt-5">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-black/50">
        {label}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-black/10 sm:grid-cols-4 md:grid-cols-6">
        {items.map((l) => (
          <div
            key={l.name}
            title={l.name}
            className="flex h-16 items-center justify-center bg-white px-3 opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <img
              src={l.src}
              alt={l.name}
              className="max-h-7 w-auto max-w-[85%] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type Format = {
  n: string;
  tag: string;
  duration: string;
  title: string;
  lede: string;
  body: React.ReactNode;
  footnote: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};


const FORMATS: Format[] = [
  {
    n: "01",
    tag: "Industry Immersions",
    duration: "1–2 days",
    title: "From factory floors to startup offices.",
    lede: "See how products are built, brands are scaled, and companies operate on the ground.",
    body: (
      <>
        Students have visited Adani Enterprises, Lenskart, Dharma Productions, Meesho, ITC, and
        Amul — not for a guided tour, but for working sessions with the teams that run them. You
        leave with a calibration of what business looks like at scale that no classroom can
        provide.
      </>
    ),
    footnote: "Available across all programmes · Integrated into the curriculum throughout the year.",
    icon: Factory,
    gradient: "radial-gradient(120% 100% at 20% 20%, #E8F1EC 0%, #B7D6C4 55%, #7EB89A 100%)",
  },
  {
    n: "02",
    tag: "Global Immersions",
    duration: "1–2 weeks · Academic credits",
    title: "Across global business hubs.",
    lede: "Experience how companies build, scale, and operate in different markets.",
    body: (
      <div className="space-y-3">
        <p>
          <strong className="font-semibold text-black/85">Japan</strong> — Rakuten. Nissan Auto
          Plant. One of the world's most disciplined manufacturing ecosystems, from the inside.
        </p>
        <p>
          <strong className="font-semibold text-black/85">Europe</strong> — Ferragamo's operations
          in Florence. Ferrari Research Center. SDA Bocconi, Europe's #1 business school. The
          intersection of luxury, engineering, and strategy — in the buildings where it was
          invented.
        </p>
        <p>
          <strong className="font-semibold text-black/85">Singapore</strong> — Southeast Asia's
          most concentrated tech and finance ecosystem. Regional business visits and structured
          sessions with operators building across ASEAN.
        </p>
        <p>
          <strong className="font-semibold text-black/85">UAE</strong> — One of the fastest-growing
          business hubs in the world. Students visit companies and meet operators building in a
          market that did not exist forty years ago.
        </p>
        <p>
          <strong className="font-semibold text-black/85">South Korea</strong> — Technology,
          manufacturing, and consumer brands at global scale. A market most Indian students have
          studied from a distance and never seen up close.
        </p>
        <p className="pt-2 text-black/60">
          Partner universities include INSEAD. Kellogg School of Management has sent students to
          Masters' Union for two consecutive years. Harvard Business School India immersion
          students have visited campus.
        </p>
        <LogoStrip items={GLOBAL_PARTNERS} label="Companies visited on global immersions" />
      </div>
    ),
    footnote: "Elective · Academic credits awarded · GIP Reports available for Japan, Europe, Singapore, UAE.",
    icon: Globe,
    gradient: "radial-gradient(120% 100% at 80% 20%, #E4EEFB 0%, #B8CDEE 55%, #6E90D0 100%)",
  },
  {
    n: "03",
    tag: "Bharat Immersion",
    duration: "1–2 months · Full term · Academic credits",
    title: "Most business schools teach you about India. We take you through it.",
    lede: "7,000 km. 20+ cities. One full term of academic credit.",
    body: (
      <>
        <p>
          Students travel India's economic geography — from the wholesale lanes of Chandni Chowk to
          factory floors in Surat, from Adani's Mundra ports to Dharma Productions in Mumbai. 40+
          CXO sessions. 50+ one-day company visits. The route is the curriculum.
        </p>
        <p className="mt-3">
          Companies visited: Adani Enterprises, Lenskart, Dharma Productions, Meesho, ITC, Amul —
          and 40+ others across every sector of the Indian economy.
        </p>
        <p className="mt-3">
          The Bharat Immersion is not a field trip. It is a term. Traditional classroom instruction
          is replaced entirely. Every lesson happens inside a real business, with real operators,
          in real time.
        </p>
        <LogoStrip items={BHARAT_PARTNERS} label="Bharat on-ground partners" />
      </>
    ),
    footnote: "Elective · Replaces classroom instruction for the full term · Academic credits awarded.",
    icon: Map,
    gradient: "radial-gradient(120% 100% at 25% 80%, #FFE8CE 0%, #F7BE7D 55%, #E68A34 100%)",
  },
  {
    n: "04",
    tag: "Summer or Semester Abroad",
    duration: "1–2 months",
    title: "Spend a summer or semester at some of the world's most respected institutions.",
    lede: "Six partner campuses. Self-apply. MU provides guidance and support.",
    body: (
      <div className="space-y-3">
        <p>
          <strong className="font-semibold text-black/85">Harvard University</strong> — Business
          and leadership programmes at one of the world's most recognised campuses.
        </p>
        <p>
          <strong className="font-semibold text-black/85">UC Berkeley</strong> — Technology,
          innovation, and entrepreneurship in Silicon Valley's academic home.
        </p>
        <p>
          <strong className="font-semibold text-black/85">NUS Singapore</strong> — Asia's
          top-ranked university. Business, tech, and regional market exposure.
        </p>
        <p>
          <strong className="font-semibold text-black/85">Imperial College London</strong> —
          Engineering, technology, and business in one of Europe's most globally connected cities.
        </p>
        <p>
          <strong className="font-semibold text-black/85">Babson College</strong> — The world's #1
          ranked entrepreneurship school. For students serious about building.
        </p>
        <p>
          <strong className="font-semibold text-black/85">SDA Bocconi</strong> — Europe's #1
          business school by multiple rankings. Milan. Strategy, luxury, and European business.
        </p>
        <LogoStrip items={CAMPUS_PARTNERS} label="Partner campuses" />
      </div>
    ),
    footnote: "Elective · Students self-apply to partner programmes · MU provides guidance and support.",
    icon: GraduationCap,
    gradient: "radial-gradient(120% 100% at 75% 75%, #F3E2FF 0%, #C8A4F0 55%, #8E63D6 100%)",
  },
  {
    n: "05",
    tag: "Dual Degree Pathways",
    duration: "1–2 years",
    title: "Graduate with two degrees — from Masters' Union and a global partner university.",
    lede: "Structured pathway. Year 4 fees differ. Contact admissions for details.",
    body: (
      <div className="space-y-3">
        <p>
          <strong className="font-semibold text-black/85">Illinois Tech, Chicago, USA</strong> —
          Available for UG in Technology &amp; Business Management, UG in Psychology &amp;
          Marketing, and UG in Data Science &amp; AI. Spend Year 4 in Chicago, graduating with
          degrees from both institutions.
        </p>
        <p>
          <strong className="font-semibold text-black/85">Griffith University, Australia</strong> —
          Available for UG in Technology &amp; Business Management. Study at one of Australia's
          most internationally connected universities.
        </p>
      </div>
    ),
    footnote: "Structured pathway · Year 4 fees differ · Contact admissions for details.",
    icon: Layers,
    gradient: "radial-gradient(120% 100% at 50% 30%, #FFE0EA 0%, #F49AB3 55%, #DC5983 100%)",
  },
];




const STANDALONE = [
  {
    title: "PGP Bharat",
    body: "India's first immersion-based MBA. 7,000 km across India, 40+ CXOs, real ventures built on the road.",
    href: "https://mastersunion.org/pgp-bharat-immersion-driven-programme",
  },
  {
    title: "Bharat Summer Fellowship",
    body: "An intensive short-form version of the Bharat experience.",
    href: "https://mastersunion.org/bharat-summer-fellowship-immersion-driven-programme",
  },
  {
    title: "PGP TBM Summer School",
    body: "The Masters' Union methodology — InClass, OutClass, real companies — in a condensed summer format.",
    href: "https://pgpsummerschool.mastersunion.org",
  },
  {
    title: "D2C Brand Bootcamp",
    body: "For founders and brand builders. Learn how India's fastest D2C brands operate, from supply chain to content.",
    href: "https://d2c.mastersunion.org",
  },
];

export const Route = createFileRoute("/immersions")({
  head: () => ({
    meta: [
      { title: "Immersions at Masters' Union — 5 formats, 20+ cities, real companies" },
      {
        name: "description",
        content:
          "Factory floors in Japan. Trade desks in London. Tea estates in Darjeeling. Harvard summer programmes. Five immersion formats at Masters' Union — with academic credits every step of the way.",
      },
      { property: "og:title", content: "Immersions at Masters' Union" },
      {
        property: "og:description",
        content:
          "Most MBAs send you to a classroom to learn about the world. We send you to the world. Five immersion formats across 20+ countries and cities.",
      },
    ],
  }),
  component: ImmersionsPage,
});

function ImmersionsPage() {
  return (
    <main
      className="min-h-screen bg-white pb-28 text-black md:pb-32"
      style={{ fontFamily: INTER }}
    >
      <SectionNav items={IMMERSIONS_NAV} applyHref="#apply" />

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
      <section id="top" className="mx-auto max-w-6xl px-5 pt-16 md:px-10 md:pt-24">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
          — Immersions at Masters&apos; Union
        </div>
        <h1 className="mt-5 text-[clamp(2.1rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-black">
          Most MBAs send you to a classroom to learn about the world.{" "}
          <span className="italic font-light" style={{ fontFamily: SERIF }}>
            We send you to the world.
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <p className="text-[15.5px] leading-[1.65] text-black/70 md:text-[16px]">
            Factory floors in Japan. Trade desks in London. Tea estates in Darjeeling. Harvard
            summer programmes. A Nissan auto plant. Adani&apos;s Mundra ports. Dharma Productions.
            Lenskart&apos;s HQ.{" "}
            <span className="text-black/85">Academic credits every step of the way.</span>
          </p>
          <p className="text-[14.5px] leading-[1.6] text-black/60">
            There are five kinds of immersions at Masters&apos; Union. All of them are real. None
            of them are optional in spirit.
          </p>
        </div>

        {/* Hero stats */}
        <div className="mt-12 grid grid-cols-2 border-y border-black/10 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.v}
              className={`flex flex-col gap-2 py-6 pr-4 ${
                i > 0 ? "md:border-l md:border-black/10 md:pl-6" : ""
              } ${i >= 2 ? "border-t border-black/10 pt-6 md:border-t-0 md:pt-6" : ""}`}
            >
              <span className="font-display text-[2rem] font-semibold leading-none tracking-tight text-black md:text-[2.4rem]">
                {s.k}
              </span>
              <span className="text-[11.5px] uppercase tracking-[0.18em] text-black/55">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FIVE FORMATS */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10 md:pt-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
            Five formats · One system
          </p>
          <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-black">
            Different lengths. Different geographies.{" "}
            <span className="italic font-light" style={{ fontFamily: SERIF }}>
              Same principle.
            </span>
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          {FORMATS.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.n}
                className="grid gap-6 border border-black/10 bg-white md:grid-cols-[280px_1fr]"
              >
                {/* Left panel — visual */}
                <div
                  className="relative flex flex-col justify-between p-6 md:p-8"
                  style={{ background: f.gradient }}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-display text-4xl font-semibold leading-none tracking-tight text-black/70 md:text-5xl">
                      {f.n}
                    </div>
                    <div className="flex size-11 items-center justify-center border border-black/20 bg-white/45 text-black/75 backdrop-blur-sm">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <div className="mt-14 md:mt-20">
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-black/70">
                      {f.tag}
                    </div>
                    <div className="mt-2 text-[12px] font-medium text-black/70">
                      {f.duration}
                    </div>
                  </div>
                </div>

                {/* Right panel — content */}
                <div className="p-6 md:py-8 md:pl-8 md:pr-10">
                  <h3 className="font-display text-[1.55rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[1.75rem]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.55] text-black/70">{f.lede}</p>
                  <div className="mt-5 space-y-3 text-[13.5px] leading-[1.6] text-black/70">
                    {f.body}
                  </div>
                  <div className="mt-6 border-t border-black/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55">
                    {f.footnote}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>


      {/* DID YOU KNOW — standalone programmes */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10 md:pt-28">
        <div className="border border-black/10 bg-neutral-50 p-6 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-teal">
                <Sparkles className="size-3.5" /> Did you know?
              </div>
              <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-tight text-black">
                Masters&apos; Union has built entire standalone programmes where immersion is not a
                module —{" "}
                <span className="italic font-light" style={{ fontFamily: SERIF }}>
                  it is the degree.
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {STANDALONE.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between gap-4 border border-black/10 bg-white p-5 transition-all hover:border-teal/40 hover:shadow-[0_14px_40px_-24px_rgba(0,106,78,0.35)]"
              >
                <div>
                  <div className="font-display text-[1.2rem] font-semibold leading-tight tracking-tight text-black">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.55] text-black/65">{s.body}</p>
                </div>
                <div className="flex items-center justify-between border-t border-black/10 pt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
                  <span className="truncate">Know more</span>

                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CREDITS */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-8 border-t border-black/10 pt-12 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal">
              Why immersions carry academic credits
            </div>
          </div>
          <div className="space-y-4 text-[15px] leading-[1.65] text-black/70">
            <p>
              A classroom teaches you a framework. It cannot teach you the difference between how a
              business looks on a slide and how it runs on a floor.
            </p>
            <p>
              The companies students visit are not there for a polished presentation. They are
              operating businesses with real constraints and real decisions being made in real
              time. Students see that — and come back with a different calibration for what
              business actually involves.
            </p>
            <p className="text-black/85">
              That is why immersions at Masters&apos; Union are not extras. They are part of the
              degree.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-20 md:px-10 md:pt-28">
        <div className="relative overflow-hidden border border-black bg-black p-8 text-white md:p-14">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-10">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              See the world before you&apos;re hired{" "}
              <span className="italic font-light text-white/85" style={{ fontFamily: SERIF }}>
                to navigate it.
              </span>
            </h2>
            <div className="flex md:justify-end">
              <Link
                to="/applications_center"
                className="inline-flex items-center gap-3 border border-white/30 bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:bg-white/90"
              >
                Apply to Masters&apos; Union
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
