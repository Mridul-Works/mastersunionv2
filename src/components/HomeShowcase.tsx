import { useEffect, useRef, useState, type SyntheticEvent } from "react";
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
import havish from "@/assets/faculty/havish-madhvapaty.png.asset.json";
import ekhlaque from "@/assets/faculty/ekhlaque-bari.png.asset.json";
import sumit from "@/assets/faculty/sumit-shukla.png.asset.json";
import aditya from "@/assets/faculty/aditya-turalapati.png.asset.json";
import divij from "@/assets/faculty/divij-bajaj.png.asset.json";
import parikshit from "@/assets/faculty/parikshit-khanna.png.asset.json";
import karmanya from "@/assets/faculty/karmanya-suri.png.asset.json";
import gauravA from "@/assets/faculty/gaurav-arora.png.asset.json";
import daveLewis from "@/assets/faculty/dave-lewis.png.asset.json";
import umberto from "@/assets/faculty/umberto.png.asset.json";
import carolina from "@/assets/faculty/carolina.png.asset.json";
import federico from "@/assets/faculty/federico-biasutti.png.asset.json";
import paola from "@/assets/faculty/paola-santoro.png.asset.json";
import rosario from "@/assets/faculty/rosario.png.asset.json";
import timothy from "@/assets/faculty/timothy-oconnell.png.asset.json";
import frank from "@/assets/faculty/frank-barry.png.asset.json";
import mairead from "@/assets/faculty/mairead-braddy.png.asset.json";
import enno from "@/assets/faculty/enno-masurel.png.asset.json";
import orestis from "@/assets/faculty/orestis.png.asset.json";
import annalisa from "@/assets/faculty/annalisa.png.asset.json";
import evangelos from "@/assets/faculty/evangelos.png.asset.json";
import xiaoyu from "@/assets/faculty/xiaoyu.png.asset.json";

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
import vBambaii from "@/assets/venture-logos/Bambaii.png.asset.json";
import vBanaroma from "@/assets/venture-logos/Banaroma.png.asset.json";
import vBeyondVeda from "@/assets/venture-logos/BeyondVeda.png.asset.json";
import vBlueBrew from "@/assets/venture-logos/BlueBrew.png.asset.json";
import vBullspree from "@/assets/venture-logos/Bullspree.png.asset.json";
import vEight from "@/assets/venture-logos/EIGHT.png.asset.json";
import vEatAtlas from "@/assets/venture-logos/EatAtlas.png.asset.json";
import vEventsa from "@/assets/venture-logos/Eventsa.png.asset.json";
import vFnor from "@/assets/venture-logos/FNOR.png.asset.json";
import vFlourish from "@/assets/venture-logos/FlourishFoods.png.asset.json";
import vGuardex from "@/assets/venture-logos/Guardex.png.asset.json";
import vHiveschool from "@/assets/venture-logos/Hiveschool.png.asset.json";
import vJustMyRoots from "@/assets/venture-logos/JustMyRoots.png.asset.json";
import vKaze from "@/assets/venture-logos/Kaze.png.asset.json";
import vLexis from "@/assets/venture-logos/Lexis.png.asset.json";
import vMoms from "@/assets/venture-logos/Moms.png.asset.json";
import vMonarque from "@/assets/venture-logos/Monarque.png.asset.json";
import vNivara from "@/assets/venture-logos/Nivara.png.asset.json";
import vOfflyn from "@/assets/venture-logos/Offlyn.png.asset.json";
import vPixel from "@/assets/venture-logos/Pixel.png.asset.json";
import vPlaysuper from "@/assets/venture-logos/Playsuper.png.asset.json";
import vSaaha from "@/assets/venture-logos/Saaha.png.asset.json";
import vSeedsAI from "@/assets/venture-logos/SeedsAI.png.asset.json";
import vShrnm from "@/assets/venture-logos/Shrnm.png.asset.json";
import vSpawnRight from "@/assets/venture-logos/SpawnRight.png.asset.json";
import vStartt from "@/assets/venture-logos/Startt.png.asset.json";
import vTrueBrands from "@/assets/venture-logos/TrueBrandsIndia.png.asset.json";
import vVinyasa from "@/assets/venture-logos/Vinyasa.png.asset.json";
import vWittyAdverts from "@/assets/venture-logos/WittyAdverts.png.asset.json";
import vWoodys from "@/assets/venture-logos/WoodysPizzeria.png.asset.json";
import vYango from "@/assets/venture-logos/Yango.png.asset.json";


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

// Founder portraits + Shark Tank stage
import founder1 from "@/assets/founders/founder-1.jpg.asset.json";
import founder2 from "@/assets/founders/founder-2.jpg.asset.json";
import founder3 from "@/assets/founders/founder-3.jpg.asset.json";
import founder4 from "@/assets/founders/founder-4.jpg.asset.json";
import sharkTankStage from "@/assets/founders/sharktank-stage.jpg.asset.json";

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
  { name: "Dave Lewis", role: "Former Group CEO", company: "Tesco", img: daveLewis.url, category: "Industry" },
  { name: "Havish Madhvapaty", role: "Industry Practitioner", company: "Masters' Union", img: havish.url, category: "Industry" },
  { name: "Ekhlaque Bari", role: "Industry Practitioner", company: "Masters' Union", img: ekhlaque.url, category: "Industry" },
  { name: "Sumit Shukla", role: "Industry Practitioner", company: "Masters' Union", img: sumit.url, category: "Industry" },
  { name: "Aditya Turalapati", role: "Industry Practitioner", company: "Masters' Union", img: aditya.url, category: "Industry" },
  { name: "Divij Bajaj", role: "Industry Practitioner", company: "Masters' Union", img: divij.url, category: "Industry" },
  { name: "Parikshit Khanna", role: "Industry Practitioner", company: "Masters' Union", img: parikshit.url, category: "Industry" },
  { name: "Karmanya Suri", role: "Industry Practitioner", company: "Masters' Union", img: karmanya.url, category: "Industry" },
  { name: "Gaurav Arora", role: "Industry Practitioner", company: "Masters' Union", img: gauravA.url, category: "Industry" },

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
  { name: "Enno Masurel", role: "Professor of Entrepreneurship", company: "VU Amsterdam", img: enno.url, category: "Visiting" },
  { name: "Frank Barry", role: "Professor of International Business", company: "Trinity College Dublin", img: frank.url, category: "Visiting" },
  { name: "Timothy O'Connell", role: "Visiting Faculty", company: "Global Partner Universities", img: timothy.url, category: "Visiting" },
  { name: "Mairead Braddy", role: "Visiting Faculty", company: "Global Partner Universities", img: mairead.url, category: "Visiting" },
  { name: "Umberto", role: "Visiting Faculty", company: "SDA Bocconi", img: umberto.url, category: "Visiting" },
  { name: "Carolina", role: "Visiting Faculty", company: "SDA Bocconi", img: carolina.url, category: "Visiting" },
  { name: "Federico Biasutti", role: "Visiting Faculty", company: "SDA Bocconi", img: federico.url, category: "Visiting" },
  { name: "Paola Santoro", role: "Visiting Faculty", company: "SDA Bocconi", img: paola.url, category: "Visiting" },
  { name: "Rosario", role: "Visiting Faculty", company: "SDA Bocconi", img: rosario.url, category: "Visiting" },
  { name: "Orestis", role: "Visiting Faculty", company: "Global Partner Universities", img: orestis.url, category: "Visiting" },
  { name: "Annalisa", role: "Visiting Faculty", company: "Global Partner Universities", img: annalisa.url, category: "Visiting" },
  { name: "Evangelos", role: "Visiting Faculty", company: "Global Partner Universities", img: evangelos.url, category: "Visiting" },
  { name: "Xiaoyu", role: "Visiting Faculty", company: "CUHK Business School", img: xiaoyu.url, category: "Visiting" },
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
  { label: "Food & Beverage", logos: [vBlueBrew, vEatAtlas, vFlourish, vMoms, vWoodys, vBeyondVeda, vSaaha, vJustMyRoots, vBanaroma, vVinyasa] },
  { label: "Consumer Brands", logos: [vBambaii, vKaze, vLexis, vMonarque, vNivara, vFnor, vTrueBrands, vGuardex, vShrnm, vYango] },
  { label: "Tech & Platforms", logos: [vOfflyn, vPlaysuper, vSeedsAI, vHiveschool, vSpawnRight, vBullspree, vEventsa, vWittyAdverts, vPixel, vStartt, vEight] },
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

// Renders a logo sized so its bounding width is roughly uniform across the wall.
// Wide logos shrink in height; short/square logos grow in height (within limits)
// so a tall-narrow mark doesn't look smaller than a wide wordmark.
function NormalizedLogo({ src, alt }: { src: string; alt: string }) {
  const [h, setH] = useState<number>(44);
  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / Math.max(1, img.naturalHeight);
    const targetWidth = 120;
    const raw = targetWidth / Math.max(0.4, ratio);
    const clamped = Math.max(28, Math.min(64, raw));
    setH(clamped);
  };
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={onLoad}
      style={{ height: `${h}px` }}
      className="w-auto max-w-full object-contain opacity-95 transition duration-300 hover:opacity-100"
    />
  );
}



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
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {visible.map((l) => {
          const name = l.original_filename.replace(/\.png$/i, "");
          return (
            <div
              key={l.url}
              title={name}
              className="flex h-20 items-center justify-center rounded-lg border border-black/[0.06] bg-white px-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition hover:border-black/15 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
            >
              <NormalizedLogo src={l.url} alt={name} />
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
      <FacultyPager key={active} items={visible} />
    </div>
  );
}

function FacultyPager({ items }: { items: typeof FACULTY_ALL }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 16; // 4 cols x 4 rows
  const pages: typeof FACULTY_ALL[] = [];
  for (let i = 0; i < items.length; i += PER_PAGE) pages.push(items.slice(i, i + PER_PAGE));
  const totalPages = Math.max(1, pages.length);

  const go = (dir: 1 | -1) => {
    const next = Math.min(totalPages - 1, Math.max(0, page + dir));
    setPage(next);
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const p = Math.round(el.scrollLeft / el.clientWidth);
          if (p !== page) setPage(p);
        }}
      >
        {pages.map((pageItems, pi) => (
          <div key={pi} className="w-full flex-shrink-0 snap-start">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
              {pageItems.map((f) => (
                <figure key={f.name} title={f.name} className="group flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-black/5">
                    {f.img ? (
                      <img
                        src={f.img}
                        alt={f.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-2xl tracking-tight text-black/35"
                        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      >
                        {f.name.replace(/^Dr\s+|^Captain\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                    )}
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
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
            {page + 1} / {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={page === 0}
              aria-label="Previous faculty"
              className="flex h-9 w-9 items-center justify-center border border-black/15 text-black transition hover:border-black disabled:opacity-30 disabled:hover:border-black/15"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={page >= totalPages - 1}
              aria-label="Next faculty"
              className="flex h-9 w-9 items-center justify-center border border-black/15 text-black transition hover:border-black disabled:opacity-30 disabled:hover:border-black/15"
            >
              →
            </button>
          </div>
        </div>
      )}
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
  const items = ALUM_STORIES.length >= 6
    ? ALUM_STORIES.slice(0, 6)
    : ALUM_STORIES.concat(ALUM_STORIES).slice(0, 6);

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-8">
        {items.map((alum, i) => (
          <figure key={`${alum.name}-${i}`} className="flex flex-col">
            <div className="relative w-full aspect-[2/5] overflow-hidden bg-neutral-200">
              <img
                src={alum.photo}
                alt={alum.name}
                className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-[1.05]"
              />
            </div>
            <figcaption className="mt-3 pr-1">
              <p className="text-[13px] font-semibold text-black leading-tight">
                {alum.name}.
              </p>
              <p className="mt-2 text-[11px] leading-[1.5] text-neutral-700 italic">
                &ldquo;{alum.quote}&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 not-italic">
                {alum.role}, {alum.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}




const FOUNDER_STORIES = [
  { name: "Rhea Kapoor", role: "Co-founder", company: "BlueBrew", photo: founder2.url, quote: "We tested the first 400 bottles from the campus canteen — six months later we were in 12 cities." },
  { name: "Arnav Sethi", role: "Founder & CEO", company: "Kaze", photo: founder1.url, quote: "The MU Ventures studio put a designer, a dev and a mentor on my table before I had a landing page." },
  { name: "Ishaan Verma", role: "Co-founder", company: "EatAtlas", photo: founder3.url, quote: "Pre-seed cheque from the in-house fund closed in the same week I pitched." },
  { name: "Meher Anand", role: "Founder", company: "Nivara", photo: founder4.url, quote: "Two co-founders, one advisor and one recruiter — all from the same 60-person cohort." },
];

function FounderFilmstrip() {
  return (
    <div className="pt-2 pb-4">
      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
        Founders in the making
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6">
        {FOUNDER_STORIES.map((f, i) => (
          <figure key={`${f.name}-${i}`} className="flex flex-col">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-200">
              <img
                src={f.photo}
                alt={f.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-[1.05]"
              />
            </div>
            <figcaption className="mt-3 pr-1">
              <p className="text-[13px] font-semibold text-black leading-tight">{f.name}.</p>
              <p className="mt-2 text-[11px] leading-[1.5] text-neutral-700 italic">
                &ldquo;{f.quote}&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 not-italic">
                {f.role}, {f.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const SHARK_TANK_PITCHES: Array<{
  company: string;
  founder: string;
  cohort: string;
  season: string;
  pitch: string;
  logo?: { url: string; original_filename: string };
  cardImg: string;
}> = [
  {
    company: "Nexera Health",
    founder: "Himanshu Rajpurohit",
    cohort: "CEO Challenge",
    season: "S4",
    pitch: "Redefining workplace wellness for India's fastest-growing companies.",
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame16188739811.webp",
  },
  {
    company: "HookD",
    founder: "Dia Goel",
    cohort: "PGP TBM '23",
    season: "S5",
    pitch: "India's first ready-to-eat non-vegetarian snacking brand.",
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873983.webp",
  },
  {
    company: "Meta Fashion",
    founder: "Arjun Goel",
    cohort: "UG TBM '28",
    season: "S5",
    pitch: "Phygital commerce — connecting in-game discovery with real-world fashion.",
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/SharkTankCard.webp",
  },
  {
    company: "Bullspree",
    founder: "Dharmil Bavishi",
    cohort: "PGP TBM '21",
    season: "S2",
    pitch: "India's favourite stock market playground for learning and investing.",
    logo: vBullspree,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873979.webp",
  },
  {
    company: "HiveSchool",
    founder: "Nikhil Gaur",
    cohort: "PGP TBM '24",
    season: "S4",
    pitch: "India's first Sales School — training the next generation of GTM operators.",
    logo: vHiveschool,
    cardImg: "https://images.mastersunion.link/uploads/15042026/v1/Frame1618873982.webp",
  },
  {
    company: "MemoTag",
    founder: "Reyansh Juneja",
    cohort: "UG TBM '28",
    season: "S4",
    pitch: "AI-driven wearable purpose-built for dementia care.",
    cardImg: "https://images.mastersunion.link/uploads/25032026/v1/SharkTankCard16.webp",
  },
];

function SharkTankCompact() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Header with stage image */}
      <div className="relative h-[172px] w-full overflow-hidden">
        <img
          src={sharkTankStage.url}
          alt="Shark Tank India stage"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-black/55">
            Featured on
          </p>
          <div>
            <h4
              className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Shark Tank{" "}
              <span
                className="italic font-light"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                India.
              </span>
            </h4>
            <p className="mt-2 max-w-[38ch] text-[11.5px] leading-relaxed text-black/60">
              Six student-founded ventures have pitched on India's biggest startup stage.
            </p>
          </div>
        </div>
      </div>
      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-black/[0.08] border-y border-black/[0.08] bg-[#FAF9F6]">
        {[
          { v: "6", l: "Ventures" },
          { v: "4", l: "Seasons" },
          { v: "5", l: "Deals closed" },
        ].map((s) => (
          <div key={s.l} className="px-5 py-3">
            <p className="text-[18px] font-semibold leading-none text-black" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              {s.v}
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">{s.l}</p>
          </div>
        ))}
      </div>
      <ul className="flex-1 divide-y divide-black/[0.06]">
        {SHARK_TANK_PITCHES.map((p, i) => (
          <li key={p.company} className="flex items-center gap-3 px-5 py-2.5">
            <span className="w-5 shrink-0 font-mono text-[10px] text-black/35">0{i + 1}</span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-black/[0.08] bg-white">
              {p.logo ? (
                <img
                  src={p.logo.url}
                  alt={p.company}
                  loading="lazy"
                  className="max-h-6 max-w-[80%] object-contain"
                />
              ) : (
                <span
                  className="text-[10px] font-semibold text-black/50"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {p.company.slice(0, 1)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold text-black">{p.company}</p>
              <p className="truncate text-[10.5px] text-black/55">
                {p.founder} · {p.cohort}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-black/[0.05] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-black/55">
              {p.season}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function VenturesSplit() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <CategorizedLogos groups={VENTURE_GROUPS} />
      </div>
      <SharkTankCompact />
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
        <FounderFilmstrip />
        <div className="mt-8">
          <VenturesSplit />
        </div>
      </ShowcaseShell>

      <ShowcaseShell section={PARTNERS_SECTION}>
        <CategorizedLogos groups={PARTNER_GROUPS} withFilter />
      </ShowcaseShell>
    </>
  );
}


