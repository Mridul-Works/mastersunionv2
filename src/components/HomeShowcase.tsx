import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Faculty
import bhupesh from "@/assets/faculty/bhupesh.png.asset.json";
import nandini from "@/assets/faculty/nandini.png.asset.json";
import garima from "@/assets/faculty/garima.png.asset.json";
import zal from "@/assets/faculty/zal.png.asset.json";
import daniel from "@/assets/faculty/daniel.png.asset.json";
import lanma from "@/assets/faculty/lanma.png.asset.json";
import manoj from "@/assets/faculty/manoj.png.asset.json";
import faverie from "@/assets/faculty/faverie.png.asset.json";

// Career logos
import mckinsey from "@/assets/career-logos/McKinsey.png.asset.json";
import bain from "@/assets/career-logos/BainAndCompany.png.asset.json";
import accenture from "@/assets/career-logos/Accenture.png.asset.json";
import bloomberg from "@/assets/career-logos/Bloomberg.png.asset.json";
import cred from "@/assets/career-logos/Cred.png.asset.json";
import flipkart from "@/assets/career-logos/Flipkart.png.asset.json";
import icici from "@/assets/career-logos/ICICI.png.asset.json";
import meta from "@/assets/career-logos/Meta.png.asset.json";
import servicenow from "@/assets/career-logos/Servicenow.png.asset.json";
import zepto from "@/assets/career-logos/Zepto.png.asset.json";
import goodcapital from "@/assets/career-logos/GoodCapital.png.asset.json";
import waterbridge from "@/assets/career-logos/Waterbridge.png.asset.json";

// Startup / venture logos
import bambaii from "@/assets/startup-logos/Bambaii.png.asset.json";
import beyondveda from "@/assets/startup-logos/BeyondVeda.png.asset.json";
import bluebrew from "@/assets/startup-logos/BlueBrew.png.asset.json";
import eatatlas from "@/assets/startup-logos/EatAtlas.png.asset.json";
import fnor from "@/assets/startup-logos/FNOR.png.asset.json";
import flourish from "@/assets/startup-logos/FlourishFoods.png.asset.json";
import kaze from "@/assets/startup-logos/Kaze.png.asset.json";
import lexis from "@/assets/startup-logos/Lexis.png.asset.json";
import moms from "@/assets/startup-logos/Moms.png.asset.json";
import monarque from "@/assets/startup-logos/Monarque.png.asset.json";
import nivara from "@/assets/startup-logos/Nivara.png.asset.json";
import woodys from "@/assets/startup-logos/WoodysPizzeria.png.asset.json";

// Academic partner logos (immersions)
import wbs from "@/assets/immersion-logos/wbs.png.asset.json";
import imperial from "@/assets/immersion-logos/imperial-1.png.asset.json";
import babson from "@/assets/immersion-logos/babson.png.asset.json";
import ivey from "@/assets/immersion-logos/ivey.png.asset.json";
import escp from "@/assets/immersion-logos/escp.png.asset.json";
import bocconi from "@/assets/immersion-logos/sda-bocconi.png.asset.json";
import cuhk from "@/assets/immersion-logos/cuhk.png.asset.json";
import smu from "@/assets/immersion-logos/smu.png.asset.json";
import nbs from "@/assets/immersion-logos/nbs.png.asset.json";
import foster from "@/assets/immersion-logos/foster.png.asset.json";
import illinois from "@/assets/immersion-logos/illinois-tech.png.asset.json";
import uc from "@/assets/immersion-logos/uc.png.asset.json";
import griffith from "@/assets/immersion-logos/griffith.png.asset.json";

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  lede: string;
  bg: string;
  cta: { label: string; to: string };
  stats: { value: string; label: string }[];
};

const FACULTY = [
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace · Swiggy", img: manoj.url },
  { name: "Manoj Kohli", role: "Former CEO, Airtel International", img: manoj.url },
  { name: "Dr Bhupesh Manoharan", role: "PhD · Strategy & Organisation", img: bhupesh.url },
  { name: "Dr Nandini Seth", role: "PhD · Marketing", img: nandini.url },
  { name: "Dr Garima Chaklader", role: "PhD · Economics", img: garima.url },
  { name: "Dr Zal Phiroz", role: "Adjunct Prof · Harvard University", img: zal.url },
  { name: "Daniel G. Van Der Vliet", role: "Executive Director · Cornell", img: daniel.url },
  { name: "Dr Lan Ma", role: "Adjunct Prof of Business · NYU Stern", img: lanma.url },
  { name: "Faverie", role: "Visiting Faculty · Global Partners", img: faverie.url },
];

const CAREER_LOGOS = [mckinsey, bain, accenture, bloomberg, cred, flipkart, icici, meta, servicenow, zepto, goodcapital, waterbridge];
const VENTURE_LOGOS = [bambaii, beyondveda, bluebrew, eatatlas, fnor, flourish, kaze, lexis, moms, monarque, nivara, woodys];
const PARTNER_LOGOS = [wbs, imperial, babson, ivey, escp, bocconi, cuhk, smu, nbs, foster, illinois, uc, griffith];

const FACULTY_SECTION: Section = {
  id: "faculty",
  eyebrow: "The Practitioners · Faculty",
  title: "Taught by people who ",
  titleItalic: "actually did it.",
  lede: "A deliberate mix of doers, scholars, and global professors — so every class is grounded in what's happening now, why it works, and how the world sees it.",
  bg: "bg-white",
  cta: { label: "Meet the faculty", to: "/faculty" },
  stats: [],
};

const FACULTY_MIX = [
  {
    pct: "50%",
    title: "Industry Practitioners",
    body: "Leaders and entrepreneurs sharing insights from what they are doing right now. Not a decade ago. The thing they are working on today — brought into your classroom this afternoon.",
  },
  {
    pct: "30%",
    title: "Full-Time Faculty",
    body: "Dedicated educators with PhDs from India's and the world's top institutions. They shape the core curriculum, publish in FT50 and A* journals, and build the intellectual foundation that makes everything stick.",
  },
  {
    pct: "20%",
    title: "Visiting Faculty",
    body: "Professors from Harvard, Stanford, Wharton, Kellogg, Columbia, NYU, Cornell, BYU, USC, Imperial College London, and Seattle University — bringing global rigour and international perspective to Gurugram.",
  },
];

const CAREER_SECTION: Section = {
  id: "career",
  eyebrow: "Outcomes · Career",
  title: "Placed where ",
  titleItalic: "decisions are made.",
  lede: "Consulting, investment banking, product, growth and venture — our alumni ship at the firms shaping the next decade.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "See placement report", to: "/placements" },
  stats: [
    { value: "96%", label: "Placement rate" },
    { value: "₹32.4L", label: "Median CTC" },
    { value: "400+", label: "Recruiting partners" },
  ],
};

const VENTURES_SECTION: Section = {
  id: "entrepreneurship",
  eyebrow: "MU Ventures · Entrepreneurship",
  title: "Companies started ",
  titleItalic: "before graduation.",
  lede: "In-house pre-seed capital, founder studios and go-to-market labs — students launch real businesses while they study.",
  bg: "bg-white",
  cta: { label: "Explore MU Ventures", to: "/mu-ventures" },
  stats: [
    { value: "120+", label: "Student startups" },
    { value: "₹85 Cr+", label: "Raised by alumni" },
    { value: "$1M", label: "In-house seed fund" },
  ],
};

const PARTNERS_SECTION: Section = {
  id: "partnerships",
  eyebrow: "Global Network · Academic Partnerships",
  title: "Immersions across ",
  titleItalic: "the world's best schools.",
  lede: "Warwick, Imperial, Babson, Ivey, ESCP, SDA Bocconi and more — cohorts spend weeks abroad learning inside partner institutions.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "See immersion programmes", to: "/immersions" },
  stats: [
    { value: "13", label: "Partner schools" },
    { value: "9", label: "Countries" },
    { value: "4 wks", label: "Avg. immersion" },
  ],
};

function ShowcaseShell({
  section,
  children,
}: {
  section: Section;
  children: React.ReactNode;
}) {
  return (
    <section id={section.id} className={`border-t border-black/10 ${section.bg}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-24">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[46ch]">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">
              {section.eyebrow}
            </p>
            <h2
              className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {section.title}
              <span
                className="italic font-light"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {section.titleItalic}
              </span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-black/60">{section.lede}</p>
            <Link
              to={section.cta.to}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85"
            >
              {section.cta.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          {section.stats.length > 0 && (
            <dl className="grid grid-cols-3 gap-4 md:max-w-md md:gap-8">
              {section.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                    {s.label}
                  </dt>
                  <dd
                    className="mt-1 text-2xl font-semibold tracking-tight text-black md:text-3xl"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function LogoGrid({ logos }: { logos: { url: string; original_filename: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {logos.map((l) => (
        <div
          key={l.url}
          title={l.original_filename.replace(/\.png$/i, "")}
          className="flex h-16 items-center justify-center border border-black/10 bg-white p-3 opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        >
          <img
            src={l.url}
            alt={l.original_filename.replace(/\.png$/i, "")}
            className="h-7 w-auto max-w-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function FacultyBlock() {
  return (
    <div className="flex flex-col gap-10">
      {/* Composition: 50 / 30 / 20 */}
      <div className="grid gap-4 md:grid-cols-3">
        {FACULTY_MIX.map((m) => (
          <div
            key={m.title}
            className="flex flex-col border border-black/10 bg-white p-6 transition hover:border-black/30 hover:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-4xl font-semibold tracking-tight text-black md:text-5xl"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {m.pct}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50">
                of faculty
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-black">{m.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-black/65">{m.body}</p>
          </div>
        ))}
      </div>

      {/* Faculty photo strip */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
        {FACULTY.map((f) => (
          <div key={f.name} className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
              <img
                src={f.img}
                alt={f.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-2 text-[12px] font-semibold leading-tight text-black">{f.name}</p>
            <p className="text-[10px] leading-tight text-black/55">{f.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeShowcase() {
  return (
    <>
      <ShowcaseShell section={FACULTY_SECTION}>
        <FacultyBlock />
      </ShowcaseShell>
      <ShowcaseShell section={CAREER_SECTION}>
        <LogoGrid logos={CAREER_LOGOS} />
      </ShowcaseShell>
      <ShowcaseShell section={VENTURES_SECTION}>
        <LogoGrid logos={VENTURE_LOGOS} />
      </ShowcaseShell>
      <ShowcaseShell section={PARTNERS_SECTION}>
        <LogoGrid logos={PARTNER_LOGOS} />
      </ShowcaseShell>
    </>
  );
}
