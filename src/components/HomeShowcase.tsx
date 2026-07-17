import { useState } from "react";
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

// Academic partner logos
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

// Corporate immersion logos
import porsche from "@/assets/immersions/global/porsche.png.asset.json";
import philips from "@/assets/immersions/global/philips.png.asset.json";
import heineken from "@/assets/immersions/global/heineken.png.asset.json";
import rabobank from "@/assets/immersions/global/rabobank.png.asset.json";
import rakuten from "@/assets/immersions/global/rakuten.png.asset.json";
import agoda from "@/assets/immersions/global/agoda.png.asset.json";
import nissan from "@/assets/immersions/global/nissan.png.asset.json";
import stationF from "@/assets/immersions/global/station-f.png.asset.json";
import unitedNations from "@/assets/immersions/global/united-nations.png.asset.json";
import godrej from "@/assets/immersions/bharat/godrej.png.asset.json";
import itc from "@/assets/immersions/bharat/itc.png.asset.json";
import infosys from "@/assets/immersions/bharat/infosys.png.asset.json";
import zeptoImm from "@/assets/immersions/bharat/zepto.png.asset.json";
import credImm from "@/assets/immersions/bharat/cred.png.asset.json";
import amul from "@/assets/immersions/bharat/amul.png.asset.json";
import rbi from "@/assets/immersions/bharat/rbi.png.asset.json";
import nse from "@/assets/immersions/bharat/nse.png.asset.json";
import lenskart from "@/assets/immersions/bharat/lenskart.png.asset.json";

// Alumni portraits
import aaravImg from "@/assets/alumni/aarav.jpg.asset.json";
import ishaImg from "@/assets/alumni/isha.jpg.asset.json";
import kabirImg from "@/assets/alumni/kabir.jpg.asset.json";
import ananyaImg from "@/assets/alumni/ananya.jpg.asset.json";

type Stat = { value: string; label: string };
type Section = {
  id: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  lede: string;
  bg: string;
  cta: { label: string; to: string };
  stats: Stat[];
};

const FACULTY_ALL: { name: string; role: string; company: string; img?: string; category: "Industry" | "Full-Time" | "Visiting" }[] = [
  // Industry Practitioners
  { name: "Manoj Kohli", role: "Former CEO & MD", company: "SoftBank India", img: manoj.url, category: "Industry" },
  { name: "Rajat Mathur", role: "Former Managing Director", company: "Morgan Stanley", category: "Industry" },
  { name: "Naveen Munjal", role: "Managing Director", company: "Hero Electric", category: "Industry" },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace", company: "Swiggy", category: "Industry" },
  { name: "Captain Raghu Raman", role: "Former President", company: "Reliance Industries", category: "Industry" },
  { name: "Arjun Vaidya", role: "Founder", company: "Dr. Vaidya's", category: "Industry" },
  { name: "Monica Jasuja", role: "Former Head", company: "Mastercard", category: "Industry" },
  { name: "Nitin Gaur", role: "Former Director", company: "IBM", category: "Industry" },
  { name: "Malthi Satish", role: "Former Director, Product", company: "PayPal", category: "Industry" },
  { name: "Dr Arvind Mayaram", role: "Former Finance Secretary", company: "Government of India", category: "Industry" },
  { name: "Saurabh Sengupta", role: "Former VP", company: "Zomato", category: "Industry" },
  { name: "Barkha Dutt", role: "Former Editor", company: "NDTV", category: "Industry" },
  { name: "Rachel Konrad", role: "Former Director of Communications", company: "Tesla", category: "Industry" },
  { name: "Dr Edward W. Rogers", role: "Former Chief Knowledge Officer", company: "NASA", category: "Industry" },
  { name: "Vivek Gambhir", role: "Former CEO", company: "boAt", category: "Industry" },
  { name: "Sanjiv Bhasin", role: "Former Director", company: "IIFL", category: "Industry" },

  // Full-Time Faculty
  { name: "Dr Bhupesh Manoharan", role: "PhD · Strategy & Organisation", company: "Masters' Union", img: bhupesh.url, category: "Full-Time" },
  { name: "Dr Nandini Seth", role: "PhD · Marketing", company: "Masters' Union", img: nandini.url, category: "Full-Time" },
  { name: "Dr Garima Chaklader", role: "PhD · Economics", company: "Masters' Union", img: garima.url, category: "Full-Time" },
  { name: "Dr Manu Prasad", role: "PhD · Finance", company: "Masters' Union", category: "Full-Time" },
  { name: "Dr Kashika Sud", role: "PhD · Organisational Behaviour", company: "Masters' Union", category: "Full-Time" },
  { name: "Dr Vipin Sreekumar", role: "PhD · Operations", company: "Masters' Union", category: "Full-Time" },

  // Visiting Faculty
  { name: "Dr Zal Phiroz", role: "Adjunct Professor, Supply Chain", company: "Harvard University", img: zal.url, category: "Visiting" },
  { name: "Daniel G. Van Der Vliet", role: "Executive Director, Family Business", company: "Cornell University", img: daniel.url, category: "Visiting" },
  { name: "Dr Lan Ma", role: "Adjunct Professor of Business", company: "NYU Stern", img: lanma.url, category: "Visiting" },
  { name: "Emmanuel Faverie", role: "Visiting Faculty", company: "ESCP Business School", img: faverie.url, category: "Visiting" },
  { name: "Rajat Baijal", role: "Adjunct Professor, Enterprise Risk", company: "Columbia University", category: "Visiting" },
  { name: "Dr Shad Morris", role: "Executive Director", company: "Brigham Young University", category: "Visiting" },
  { name: "Dr Rajesh Bhargave", role: "Associate Professor of Marketing", company: "Imperial College London", category: "Visiting" },
  { name: "Meenakshi Rishi", role: "Professor of Economics", company: "Seattle University", category: "Visiting" },
  { name: "Dr Alireza Kabirian", role: "Professor of Data Sciences", company: "USC", category: "Visiting" },
  { name: "Dr Kenwyn K. Smith", role: "Professor", company: "Wharton, UPenn", category: "Visiting" },
];


const FACULTY_MIX = [
  { key: "Industry", pct: "50%", title: "Industry Practitioners", body: "CEOs, founders and operators teaching what they're building today." },
  { key: "Full-Time", pct: "30%", title: "Full-Time Faculty", body: "PhDs from India's and the world's top institutions. FT50 / A* research." },
  { key: "Visiting", pct: "20%", title: "Visiting Faculty", body: "Professors from Harvard, Stanford, Wharton, Kellogg, Columbia, NYU, Cornell, Imperial." },
];

const CAREER_GROUPS = [
  { label: "Consulting", logos: [mckinsey, bain, accenture] },
  { label: "Tech & Product", logos: [meta, servicenow, flipkart, cred, zepto, infosys, lenskart] },
  { label: "Finance & Markets", logos: [bloomberg, icici, nse] },
  { label: "Consumer & Corporate", logos: [godrej, itc, amul] },
  { label: "Venture Capital", logos: [goodcapital, waterbridge] },
];

const VENTURE_GROUPS = [
  { label: "Food & Wellness", logos: [bluebrew, eatatlas, flourish, moms, woodys, beyondveda] },
  { label: "Consumer & Tech", logos: [bambaii, kaze, lexis, monarque, nivara, fnor] },
];

const PARTNER_GROUPS = [
  { label: "Academic", logos: [wbs, escp, bocconi, nbs, babson, ivey, foster, illinois, uc, smu, griffith] },
  { label: "Corporate", logos: [porsche, philips, heineken, rabobank, rakuten, agoda, nissan, stationF, unitedNations, godrej, itc, infosys, zeptoImm, credImm, amul, nse, lenskart] },
];

const FACULTY_SECTION: Section = {
  id: "faculty",
  eyebrow: "Faculty",
  title: "Taught by people who ",
  titleItalic: "actually did it.",
  lede: "Our faculty is a deliberate 50 / 30 / 20 mix of industry practitioners, tenured PhDs and visiting global professors. CXOs, founders and operators lead the majority of classes, while academic rigour is anchored by researchers from Ivy+ and top global schools.",
  bg: "bg-white",
  cta: { label: "Meet the faculty", to: "/faculty" },
  stats: [
    { value: "500+", label: "Faculty" },
    { value: "60+", label: "PhDs" },
    { value: "12", label: "Ivy+ schools" },
  ],
};

const CAREER_SECTION: Section = {
  id: "career",
  eyebrow: "Career Outcomes",
  title: "Placed where ",
  titleItalic: "decisions are made.",
  lede: "Students graduate into consulting, product, finance and venture roles at the firms shaping the next decade — from McKinsey and Bain to Meta, Flipkart and Bloomberg. Every batch is supported by a dedicated placements team, live recruiter access and year-round industry projects.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "Placement report", to: "/placements" },
  stats: [
    { value: "96%", label: "Placement rate" },
    { value: "₹32.4L", label: "Median CTC" },
    { value: "400+", label: "Recruiters" },
  ],
};

const VENTURES_SECTION: Section = {
  id: "entrepreneurship",
  eyebrow: "Entrepreneurship",
  title: "Companies started ",
  titleItalic: "before graduation.",
  lede: "Entrepreneurship at Masters' Union isn't a club — it's an operating system. Students access pre-seed capital, in-house founder studios and GTM labs, and launch real companies while they study, backed by mentors who have built and scaled ventures themselves.",
  bg: "bg-white",
  cta: { label: "MU Ventures", to: "/mu-ventures" },
  stats: [
    { value: "120+", label: "Student startups" },
    { value: "₹85 Cr+", label: "Raised by alumni" },
    { value: "$1M", label: "In-house fund" },
  ],
};

const PARTNERS_SECTION: Section = {
  id: "partnerships",
  eyebrow: "Academic Partnerships",
  title: "Immersions across ",
  titleItalic: "the world's best schools.",
  lede: "Every Masters' Union student spends weeks studying on the campuses of the world's leading business schools — Warwick, Imperial, Babson, Ivey, ESCP, SDA Bocconi and more. Alongside academics, we partner deeply with India's most iconic companies to bring real boardrooms, factories and trading floors into the classroom.",
  bg: "bg-[#F5F3EE]",
  cta: { label: "Immersion programmes", to: "/immersions" },
  stats: [
    { value: "13", label: "Partner schools" },
    { value: "9", label: "Countries" },
    { value: "4 wks", label: "Avg. immersion" },
  ],
};

function ShowcaseShell({ section, children }: { section: Section; children: React.ReactNode }) {
  return (
    <section id={section.id} className={`border-t border-black/10 ${section.bg}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        <div className="mb-6 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[52ch]">
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
              {section.eyebrow}
            </p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-tight text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {section.title}
              <span className="italic font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                {section.titleItalic}
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-black/60">{section.lede}</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <dl className="flex gap-6">
              {section.stats.map((s) => (
                <div key={s.label}>
                  <dd
                    className="text-xl font-semibold tracking-tight text-black md:text-2xl"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.value}
                  </dd>
                  <dt className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <Link
              to={section.cta.to}
              className="group inline-flex items-center gap-2 rounded-full bg-black px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/85"
            >
              {section.cta.label}
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

type Logo = { url: string; original_filename: string };
type LogoGroup = { label: string; logos: Logo[] };

function CategorizedLogos({ groups, withFilter = false }: { groups: LogoGroup[]; withFilter?: boolean }) {
  const [active, setActive] = useState<string>("All");
  const total = groups.reduce((sum, g) => sum + g.logos.length, 0);
  const tabs = [{ label: "All", count: total }, ...groups.map((g) => ({ label: g.label, count: g.logos.length }))];
  const visible: Logo[] = !withFilter || active === "All"
    ? groups.flatMap((g) => g.logos)
    : groups.find((g) => g.label === active)?.logos ?? [];

  return (
    <div>
      {withFilter && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          {tabs.map((t) => {
            const isActive = t.label === active;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(t.label)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight transition ${
                  isActive ? "bg-black text-white" : "bg-black/[0.04] text-black/70 hover:bg-black/[0.08]"
                }`}
              >
                {t.label}
                <span className={`font-mono text-[10px] ${isActive ? "text-white/60" : "text-black/40"}`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {visible.map((l) => {
          const name = l.original_filename.replace(/\.png$/i, "");
          const key = name.toLowerCase();
          const scale =
            key.includes("amul") || key.includes("zepto") || key.includes("nse")
              ? "h-6"
              : key.includes("infosys")
                ? "h-7"
                : key.includes("meta") || key.includes("goodcapital") || key.includes("waterbridge")
                  ? "h-14"
                  : "h-10";
          return (
            <div key={l.url} title={name} className="flex h-14 items-center justify-center">
              <img
                src={l.url}
                alt={name}
                loading="lazy"
                className={`${scale} w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}


function FacultyBlock() {
  const [active, setActive] = useState<string>("All");
  const visible = active === "All" ? FACULTY_ALL : FACULTY_ALL.filter((f) => f.category === active);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {/* Left: vertical mix (clickable filters) */}
      <div className="flex flex-col gap-3">
        {FACULTY_MIX.map((m) => {
          const isActive = active === m.key;
          return (
            <button
              key={m.title}
              type="button"
              onClick={() => setActive(isActive ? "All" : m.key)}
              aria-pressed={isActive}
              className={`flex items-start gap-4 border p-4 text-left transition ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white text-black hover:border-black/30 hover:bg-black/[0.02]"
              }`}
            >
              <span
                className="text-3xl font-semibold leading-none tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {m.pct}
              </span>
              <div>
                <h3 className="text-[13px] font-semibold tracking-tight">{m.title}</h3>
                <p className={`mt-1 text-[12px] leading-snug ${isActive ? "text-white/70" : "text-black/60"}`}>
                  {m.body}
                </p>
              </div>
            </button>
          );
        })}
        {active !== "All" && (
          <button
            type="button"
            onClick={() => setActive("All")}
            className="self-start text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50 hover:text-black"
          >
            ← Show all faculty
          </button>
        )}
      </div>

      {/* Right: faculty images with designations */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
        {visible.map((f) => (
          <figure key={f.name} title={f.name} className="group flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-black/5">
              <img
                src={f.img}
                alt={f.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="mt-2">
              <div className="text-[11px] font-semibold leading-tight tracking-tight text-black">
                {f.name}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-black/60">{f.role}</div>
              <div className="text-[10px] leading-tight text-black/45">{f.company}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}


const ALUM_STORIES = [
  { name: "Aarav Mehta", role: "Business Analyst", company: "McKinsey & Company", logo: mckinsey.url, photo: aaravImg.url, quote: "Live case work in Year 2 got me an offer before final placements." },
  { name: "Isha Rao", role: "Associate Consultant", company: "Bain & Company", logo: bain.url, photo: ishaImg.url, quote: "MU's practitioner faculty rewired how I break down a problem." },
  { name: "Kabir Shah", role: "APM", company: "Meta", logo: meta.url, photo: kabirImg.url, quote: "Building at MU Ventures made the PM interview feel like a normal Tuesday." },
  { name: "Ananya Gupta", role: "Investor", company: "Good Capital", logo: goodcapital.url, photo: ananyaImg.url, quote: "Pitched a portfolio company on campus, joined the fund that heard the pitch." },
];

function AlumStories() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
          Alum stories
        </span>
        <span className="h-px flex-1 bg-black/10" />
        <span className="font-mono text-[10px] text-black/40">{ALUM_STORIES.length}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ALUM_STORIES.map((a) => (
          <figure
            key={a.name}
            className="group relative aspect-[4/5] overflow-hidden border border-black/10 bg-black"
          >
            <img
              src={a.photo}
              alt={a.name}
              loading="lazy"
              width={800}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <img
              src={a.logo}
              alt={a.company}
              loading="lazy"
              className="absolute right-3 top-3 h-5 w-auto max-w-[70px] object-contain opacity-90 [filter:brightness(0)_invert(1)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
              <blockquote
                className="mb-3 text-[13px] leading-snug"
                style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic" }}
              >
                &ldquo;{a.quote}&rdquo;
              </blockquote>
              <div className="border-t border-white/25 pt-2">
                <p className="text-[12px] font-semibold leading-tight">{a.name}</p>
                <p className="text-[10px] leading-tight text-white/70">
                  {a.role} · {a.company}
                </p>
              </div>
            </figcaption>
          </figure>
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
        <AlumStories />
        <div className="mt-8">
          <CategorizedLogos groups={CAREER_GROUPS} />
        </div>
      </ShowcaseShell>
      <ShowcaseShell section={VENTURES_SECTION}>
        <CategorizedLogos groups={VENTURE_GROUPS} />
      </ShowcaseShell>
      <ShowcaseShell section={PARTNERS_SECTION}>
        <CategorizedLogos groups={PARTNER_GROUPS} withFilter />
      </ShowcaseShell>
    </>
  );
}

