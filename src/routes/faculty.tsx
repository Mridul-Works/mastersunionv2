import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TouchColorImg } from "@/components/TouchColorImg";
import { ArrowUpRight } from "lucide-react";
import StudentTestimonials from "@/components/StudentTestimonials";
import { Accent, SectionIntro } from "@/components/SectionIntro";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import MastersVideos, { MASTER_VIDEO_PRELOAD } from "@/components/MastersVideos";
import FacultyHero from "@/components/FacultyHero";
import HeroFadeOut from "@/components/HeroFadeOut";
import StackReveal from "@/components/StackReveal";

import FacultyStatsCard from "@/components/FacultyStatsCard";
import { buildFacultyStats, statsRefreshedLabel } from "@/lib/faculty-stats";

import { FULL_TIME_FACULTY } from "@/lib/full-time-faculty";
import { INDUSTRY_PRACTITIONERS, INDUSTRY_PHOTOS } from "@/lib/industry-practitioners";
import manojAsset from "@/assets/faculty/manoj.png.asset.json";
import bhupeshAsset from "@/assets/faculty/bhupesh.png.asset.json";
import nandiniAsset from "@/assets/faculty/nandini.png.asset.json";
import garimaAsset from "@/assets/faculty/garima.png.asset.json";
import daveLewisAsset from "@/assets/faculty/dave-lewis.png.asset.json";
import raghuAsset from "@/assets/faculty/raghu-raman.png.asset.json";
import nitinAsset from "@/assets/faculty/nitin-gaur.png.asset.json";
import havishAsset from "@/assets/faculty/havish-madhvapaty.png.asset.json";
import ekhlaqueAsset from "@/assets/faculty/ekhlaque-bari.png.asset.json";
import sumitAsset from "@/assets/faculty/sumit-shukla.png.asset.json";
import adityaAsset from "@/assets/faculty/aditya-turalapati.png.asset.json";
import parikshitAsset from "@/assets/faculty/parikshit-khanna.png.asset.json";
import karmanyaAsset from "@/assets/faculty/karmanya-suri.png.asset.json";
import gauravAAsset from "@/assets/faculty/gaurav-arora.png.asset.json";
// Visiting faculty portraits (new set)
import vfKaushal from "@/assets/faculty/visiting/kaushal-bhagat.png.asset.json";
import vfUtkarsh from "@/assets/faculty/visiting/utkarsh-majmudar.png.asset.json";
import vfAkash from "@/assets/faculty/visiting/akash-krishnan.png.asset.json";
import vfThomas from "@/assets/faculty/visiting/thomas-joseph.png.asset.json";
import vfSouvik from "@/assets/faculty/visiting/souvik-dutta.png.asset.json";
import vfRadhika from "@/assets/faculty/visiting/radhika-narayanan.png.asset.json";
import vfPratap from "@/assets/faculty/visiting/pratap-giri.png.asset.json";
import vfPradeep from "@/assets/faculty/visiting/pradeep-hota.png.asset.json";
import vfHarshali from "@/assets/faculty/visiting/harshali-damle.png.asset.json";
import vfAmit from "@/assets/faculty/visiting/amit-shrivastava.png.asset.json";
import footerStripAsset from "@/assets/widget/widget-campus-life.jpg.asset.json";
import vfMihir from "@/assets/faculty/visiting/mihir-mankad.png.asset.json";
import vfShruti from "@/assets/faculty/visiting/shruti-mantri.png.asset.json";
import vfAlireza from "@/assets/faculty/visiting/alireza-kabirian.png.asset.json";
import vfSundar from "@/assets/faculty/visiting/sundar-venkatesh.png.asset.json";
import vfDaniel from "@/assets/faculty/visiting/daniel-vandervliet.png.asset.json";
import vfKrishanu from "@/assets/faculty/visiting/krishanu-rakshit.png.asset.json";
import vfLanMa from "@/assets/faculty/visiting/lan-ma.png.asset.json";
import vfRajat from "@/assets/faculty/visiting/rajat-baijal.png.asset.json";
import vfBenjamin from "@/assets/faculty/visiting/benjamin-dunford.png.asset.json";
import vfMeenakshi from "@/assets/faculty/visiting/meenakshi-rishi.png.asset.json";
import vfVijaya from "@/assets/faculty/visiting/vijaya-marisetty.png.asset.json";
import vfShad from "@/assets/faculty/visiting/shad-morris.png.asset.json";
import vfZal from "@/assets/faculty/visiting/zal-phiroz.png.asset.json";
import vfGarrick from "@/assets/faculty/visiting/garrick-hileman.png.asset.json";
import vfJyotsna from "@/assets/faculty/visiting/jyotsna-bhatnagar.png.asset.json";
import vfVishnu from "@/assets/faculty/visiting/vishnuprasad-n.png.asset.json";
import vfRajesh from "@/assets/faculty/visiting/rajesh-bhargave.png.asset.json";
import SchoolsScrollPanel from "@/components/faculty/SchoolsScrollPanel";
import PedigreeScrollPanel from "@/components/faculty/PedigreeScrollPanel";
import { SectionDivider } from "@/components/patterns/section-divider";
import { LogoMarquee } from "@/components/patterns/logo-marquee";



const manojImg = manojAsset.url;
const bhupeshImg = bhupeshAsset.url;
const nandiniImg = nandiniAsset.url;
const garimaImg = garimaAsset.url;

/* Typography from the Masters' Union design system tokens (src/styles.css). */
const INTER = "var(--font-sans)";
const MONO = "var(--font-mono)";
const SERIF = "var(--font-serif)";


const NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "masters", label: "Masters" },
  { id: "practitioners", label: "Industry" },
  { id: "full-time", label: "Full-time" },
  { id: "visiting", label: "Visiting" },
];

type Practitioner = { name: string; role: string; blurb: string };

const PRACTITIONERS: Practitioner[] = [
  ...INDUSTRY_PRACTITIONERS.map((p) => ({
    name: p.name,
    role: `${p.role}, ${p.company}`,
    blurb: p.blurb,
  })),
  { name: "Rajat Mathur", role: "Former Managing Director, Morgan Stanley", blurb: "Teaches people management through interactive debates, games, and live case studies. Rated among the most popular faculty at Masters' Union. Was in a board meeting before your class started." },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace, Swiggy", blurb: "Teaches growth, marketplace dynamics, and P&L management from the front seat of one of India's most complex consumer businesses." },
  { name: "Manoj Kohli", role: "Former CEO & MD, SoftBank India · Former CEO, Airtel International", blurb: "Teaches global business strategy and leadership from a career spanning the world's largest telecoms and technology investors." },
  { name: "Captain Raghu Raman", role: "Former President, Reliance Industries · Former CEO, NATGRID", blurb: "Teaches leadership, national security strategy, and high-stakes organisational decision-making. There is no textbook for what he teaches." },
  { name: "Malthi Satish", role: "Former Director of Product Management, PayPal", blurb: "Teaches product management and digital platform strategy from inside one of the world's first and most influential fintech companies." },
  { name: "Dr Arvind Mayaram", role: "Former Finance Secretary of India", blurb: "Teaches macroeconomics, fiscal policy, and public finance from the office that once managed India's economy. Literally." },
  { name: "Saurabh Sengupta", role: "Former VP, Zomato", blurb: "Teaches growth, product strategy, and consumer marketplaces from one of India's most scrutinised public companies." },
  { name: "Rachel Konrad", role: "Former Director of Communications, Tesla", blurb: "Teaches communications, brand narrative, and launch strategy. Her last major project was helping introduce the Model S to the world. Before that, Amazon." },
  { name: "Vivek Gambhir", role: "Former CEO, boAt", blurb: "Teaches brand building and consumer electronics — the mechanics of building a ₹3,000 Cr consumer brand from near-zero in under a decade." },
  { name: "Sanjiv Bhasin", role: "Former Director, IIFL", blurb: "Teaches equity markets, capital markets strategy, and investment analysis from decades on India's trading floors." },
  { name: "Dave Lewis", role: "Former Group CEO, Tesco", blurb: "Teaches large-scale organisational transformation and consumer strategy from the turnaround of one of the world's largest retailers." },
  { name: "Havish Madhvapaty", role: "Industry Practitioner, Masters' Union", blurb: "Teaches marketing, brand strategy and consumer research grounded in live industry engagements." },
  { name: "Ekhlaque Bari", role: "Industry Practitioner, Masters' Union", blurb: "Teaches technology strategy and enterprise transformation from a career leading large digital programmes." },
  { name: "Sumit Shukla", role: "Industry Practitioner, Masters' Union", blurb: "Teaches business strategy and operations from years spent building and scaling category-defining businesses." },
  { name: "Aditya Turalapati", role: "Industry Practitioner, Masters' Union", blurb: "Teaches finance and analytics with a practitioner-first, case-driven approach." },
  { name: "Parikshit Khanna", role: "Industry Practitioner, Masters' Union", blurb: "Teaches technology, product and platform strategy from an operator's vantage point." },
  { name: "Karmanya Suri", role: "Industry Practitioner, Masters' Union", blurb: "Teaches strategy and general management, blending consulting rigour with startup pace." },
  { name: "Gaurav Arora", role: "Industry Practitioner, Masters' Union", blurb: "Teaches finance and corporate strategy from a career across capital markets and industry." },
];

const PRACTITIONER_PHOTOS: Record<string, string> = {
  ...INDUSTRY_PHOTOS,
  "Manoj Kohli": manojImg,
  "Dave Lewis": daveLewisAsset.url,
  "Havish Madhvapaty": havishAsset.url,
  "Ekhlaque Bari": ekhlaqueAsset.url,
  "Sumit Shukla": sumitAsset.url,
  "Aditya Turalapati": adityaAsset.url,
  "Parikshit Khanna": parikshitAsset.url,
  "Karmanya Suri": karmanyaAsset.url,
  "Gaurav Arora": gauravAAsset.url,
  "Captain Raghu Raman": raghuAsset.url,
  "Nitin Gaur": nitinAsset.url,
};

type FullTimer = { name: string; note: string; img?: string };
const FULLTIME: FullTimer[] = FULL_TIME_FACULTY.map((f) => ({
  name: f.name,
  note: `${f.credential} · ${f.role}`,
  img: f.img,
}));

type Visiting = { name: string; role: string; school: string; img?: string };
const VISITING: Visiting[] = [
  { name: "Dr Zal Phiroz", role: "Adjunct Professor, Supply Chain & Operations", school: "Harvard University", img: vfZal.url },
  { name: "Daniel G. Van Der Vliet", role: "Executive Director, Family Business", school: "Cornell University", img: vfDaniel.url },
  { name: "Dr Lan Ma", role: "Adjunct Professor of Business", school: "NYU Stern", img: vfLanMa.url },
  { name: "Mihir Mankad", role: "Senior Lecturer", school: "Harvard Kennedy School", img: vfMihir.url },
  { name: "Dr Rajesh Bhargave", role: "Associate Professor of Marketing", school: "Imperial College London", img: vfRajesh.url },
  { name: "Rajat Baijal", role: "Adjunct Professor, Enterprise Risk Management", school: "Columbia University", img: vfRajat.url },
  { name: "Dr Shad Morris", role: "Professor of Global Strategy", school: "Brigham Young University", img: vfShad.url },
  { name: "Meenakshi Rishi", role: "Professor of Economics", school: "Seattle University", img: vfMeenakshi.url },
  { name: "Dr Alireza Kabirian", role: "Professor of Data Sciences", school: "USC", img: vfAlireza.url },
  { name: "Benjamin Dunford", role: "Professor of Management", school: "Purdue University", img: vfBenjamin.url },
  { name: "Dr Garrick Hileman", role: "Visiting Fellow", school: "London School of Economics", img: vfGarrick.url },
  { name: "Shruti Mantri", role: "Associate Director", school: "Indian School of Business", img: vfShruti.url },
  { name: "Dr Krishanu Rakshit", role: "Professor of Marketing", school: "IIM Calcutta", img: vfKrishanu.url },
  { name: "Dr Jyotsna Bhatnagar", role: "Professor of OB & HRM", school: "MDI Gurgaon", img: vfJyotsna.url },
  { name: "Vijaya Bhaskar Marisetty", role: "Professor of Finance", school: "University of Hyderabad", img: vfVijaya.url },
  { name: "Dr Sundar Venkatesh", role: "Visiting Faculty", school: "Asian Institute of Technology", img: vfSundar.url },
  { name: "Utkarsh Majmudar", role: "Visiting Faculty, Finance", school: "IIM Bangalore", img: vfUtkarsh.url },
  { name: "Kaushal Kumar Bhagat", role: "Visiting Faculty", school: "IIT Kharagpur", img: vfKaushal.url },
  { name: "Dr Thomas Joseph", role: "Visiting Faculty", school: "Masters' Union", img: vfThomas.url },
  { name: "Dr Pratap Giri", role: "Visiting Faculty", school: "Masters' Union", img: vfPratap.url },
  { name: "Dr Harshali Damle", role: "Visiting Faculty", school: "Masters' Union", img: vfHarshali.url },
  { name: "Souvik Dutta", role: "Visiting Faculty", school: "Masters' Union", img: vfSouvik.url },
  { name: "Radhika Narayanan", role: "Visiting Faculty", school: "Masters' Union", img: vfRadhika.url },
  { name: "Akash Krishnan", role: "Visiting Faculty", school: "Masters' Union", img: vfAkash.url },
  { name: "Pradeep Hota", role: "Visiting Faculty", school: "Masters' Union", img: vfPradeep.url },
  { name: "Amit Shrivastava", role: "Visiting Faculty", school: "Masters' Union", img: vfAmit.url },
  { name: "Dr Vishnuprasad N.", role: "Visiting Faculty", school: "Masters' Union", img: vfVishnu.url },
];

/** Unique schools represented by the visiting roster — text lockup marquee. */
const VISITING_SCHOOLS = Array.from(new Set(VISITING.map((v) => v.school))).filter(
  (s) => s !== "Masters' Union",
);

/**
 * Live "By the numbers" figures, derived from the rosters above (practitioners,
 * full-time PhD faculty, visiting faculty and their universities). Recomputed
 * on every render, so preview/demo and production always show current data,
 * with a month stamp that rolls over automatically.
 */
const HERO_STATS = buildFacultyStats({
  practitioners: PRACTITIONERS,
  fullTime: FULLTIME,
  visiting: VISITING,
  rosterTotal: 500,
});

const TESTIMONIALS = [
  { q: "I met and learned from 50+ CXOs and MDs on the Masters' Union campus. That gave me confidence and exposure that nothing else could have.", a: "Priyansh Sharma", r: "Manager Strategy, Talabat Dubai" },
  { q: "The faculty here are not teaching from textbooks. They are teaching from last quarter's decisions. That changes everything about how you absorb what they say.", a: "Abhishek Deb", r: "Senior Associate, BCG" },
  { q: "You ask a question and the person answering it was the one who actually made the decision. Not someone who read about it. The actual person.", a: "Omkar Hundekari", r: "Bain & Co." },
];

function Initials({ name, dark = false }: { name: string; dark?: boolean }) {
  const initials = name.replace(/^Dr\s+|^Captain\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className={`flex h-full w-full items-center justify-center text-[clamp(1.6rem,2.4vw,2rem)] tracking-[-0.02em] ${dark ? "bg-neutral-800 text-white/40" : "bg-neutral-100 text-black/40"}`} style={{ fontFamily: MONO }}>
      {initials}
    </div>
  );
}

type EditorialItem = {
  name: string;
  role: string;
  sub?: string;
  blurb?: string;
  img?: string;
};

function Portrait({ item, aspect = "aspect-[4/5]", dark = false }: { item: EditorialItem; aspect?: string; dark?: boolean }) {
  return (
    <div className={`faculty-portrait-frame w-full overflow-hidden ${dark ? "bg-card" : "bg-secondary"} ${aspect}`}>
      {item.img ? (
        <TouchColorImg
          src={item.img}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="faculty-portrait h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0 data-[touch-color-active]:grayscale-0"
        />
      ) : (
        <Initials name={item.name} dark={dark} />
      )}
    </div>
  );
}

function EditorialCaption({ item, dark = false }: { item: EditorialItem; dark?: boolean }) {
  return (
    <div className="faculty-caption">
      <p className="faculty-caption-kicker">Faculty</p>
      <h3 className={`mt-3 text-[clamp(1.35rem,2vw,2rem)] font-normal leading-[1.05] ${dark ? "text-foreground" : "text-foreground"}`} style={{ fontFamily: SERIF }}>
        {item.name}
      </h3>
      <div className="mt-2 text-[10px] uppercase leading-relaxed text-muted-foreground" style={{ fontFamily: MONO, letterSpacing: "0.14em" }}>
        {item.role}
      </div>
      {item.sub ? (
        <div className="mt-1 text-[10px] uppercase leading-relaxed text-muted-foreground/70" style={{ fontFamily: MONO, letterSpacing: "0.14em" }}>
          {item.sub}
        </div>
      ) : null}
      {item.blurb ? (
        <p className="mt-4 text-[13px] leading-[1.65] text-foreground/68">{item.blurb}</p>
      ) : null}
    </div>
  );
}

type FacultyStat = { v: string; l: string };

function EditorialGrid({
  items,
  sectionLabel,
  pct,
  tagline,
  stats,
  cardStats = false,
  gallery = false,
  dark = false,
}: {
  items: EditorialItem[];
  sectionLabel: string;
  pct: string;
  tagline: string;
  stats: FacultyStat[];
  cardStats?: boolean;
  gallery?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`mt-[clamp(1rem,2.5vh,2rem)] border-t ${dark ? "border-white/15" : "border-black/15"}`}>
      {/* STATS HERO — card style (matches Section 2) */}
    {cardStats ? (
        <div className={`border-b py-[clamp(0.85rem,2vh,1.5rem)] ${dark ? "border-white/15" : "border-black/15"}`}>
          <FacultyStatsCard
            dark={dark}
            refreshed={sectionLabel}
            stats={[{ v: pct, l: "of faculty" }, ...stats]}
          />
        </div>
      ) : (
        <div className={`grid gap-x-8 gap-y-[clamp(0.75rem,1.8vh,1.25rem)] border-b py-[clamp(0.85rem,2vh,1.5rem)] md:grid-cols-12 ${dark ? "border-white/15" : "border-black/15"}`}>
          <div className="md:col-span-5">
            <div className={`text-[10.5px] uppercase tracking-[0.24em] ${dark ? "text-white/50" : "text-black/50"}`} style={{ fontFamily: MONO }}>
              The Mix · {sectionLabel}
            </div>
            <div className="mt-[clamp(0.5rem,1.5vh,1rem)] flex items-baseline gap-3">
              <div className={`text-[clamp(1.9rem,min(4.2vw,5.5vh),3.25rem)] font-medium leading-[0.88] tracking-[-0.04em] ${dark ? "text-white" : "text-black"}`}>
                {pct}
              </div>
              <div className={`text-[11px] uppercase tracking-[0.2em] ${dark ? "text-white/55" : "text-black/55"}`} style={{ fontFamily: MONO }}>
                of faculty
              </div>
            </div>
            <p className={`mt-[clamp(0.5rem,1.5vh,1rem)] max-w-[38ch] text-[0.98rem] leading-[1.6] ${dark ? "text-white/75" : "text-black/75"}`}>{tagline}</p>
          </div>
          <div className={`md:col-span-7 md:pl-10 md:border-l ${dark ? "md:border-white/10" : "md:border-black/10"}`}>
            <div className={`text-[10.5px] uppercase tracking-[0.24em] ${dark ? "text-white/50" : "text-black/50"}`} style={{ fontFamily: MONO }}>
              By the numbers
            </div>
            <div className="mt-[clamp(1rem,2.4vh,1.5rem)] grid grid-cols-2 gap-x-6 gap-y-[clamp(1rem,2.6vh,2rem)] sm:gap-x-10">
              {stats.map((s) => (
                <div key={s.l} className="group relative">
                  <div className="flex items-start gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#7a8b6f]" aria-hidden />
                    <div
                      className={`text-[clamp(1.35rem,min(2.6vw,3.4vh),2.2rem)] font-extrabold not-italic leading-[0.92] tracking-[-0.04em] ${dark ? "text-white" : "text-black"}`}
                    >
                      {s.v}
                    </div>
                  </div>
                  <div
                    className={`mt-3 pl-[18px] text-[11px] font-medium uppercase leading-[1.5] tracking-[0.18em] ${dark ? "text-white/65" : "text-black/65"}`}
                    style={{ fontFamily: MONO }}
                  >
                    {s.l}
                  </div>
                  <div className={`mt-4 ml-[18px] h-px w-10 transition-all duration-500 group-hover:w-20 ${dark ? "bg-white/25 group-hover:bg-[#7a8b6f]" : "bg-black/25 group-hover:bg-[#7a8b6f]"}`} aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        data-touch-gallery
        className={`${gallery ? "faculty-magazine-grid" : "scene-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"} border-b ${dark ? "border-white/15" : "border-black/15"}`}
      >
          {items.map((item) => (
            <article key={item.name} className="faculty-profile" data-faculty-reveal>
              <Portrait item={item} dark={dark} />
              <EditorialCaption item={item} dark={dark} />
            </article>
          ))}
      </div>
    </div>
  );
}

function EditorialSplit({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="mt-[clamp(0.75rem,1.8vh,1.25rem)] grid grid-cols-1 gap-0 border border-white/10 bg-white/[0.04] md:grid-cols-[minmax(0,68%)_minmax(0,32%)]">
      <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:border-white/10 md:p-8 lg:p-10">
        {left}
      </div>
      <div className="p-6 md:p-8 lg:p-10">
        {right}
      </div>
    </div>
  );
}


function SupportingPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="mb-4 text-[10px] uppercase tracking-[0.26em] text-white/50" style={{ fontFamily: MONO }}>
        {title}
      </div>
      {children}
    </>
  );
}

function InfoRow({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      tabIndex={0}
      className={`mu-info-row mt-2 min-w-0 px-3 py-2.5 first:mt-0 sm:px-3.5 sm:py-3 ${className}`}
      style={{ ["--sweep-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function PedigreeGroup({ label, items, delay = 0 }: { label: string; items: string; delay?: number }) {
  return (
    <InfoRow delay={delay}>
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/70" style={{ fontFamily: MONO }}>{label}</div>
      <div className="mt-1 break-words text-[0.92rem] leading-[1.45] text-white/85">{items}</div>
    </InfoRow>
  );
}

const MARQUEE_WORDS = ["Built", "Led", "Invested", "Shaped"];

function WordMarquee() {
  return (
    <div className="marquee-hover mt-[clamp(2.5rem,7vh,5rem)] w-full border-y border-white/10 py-[clamp(1.25rem,4vh,2.5rem)]">
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-slow flex w-max items-baseline">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-baseline">
              {MARQUEE_WORDS.map((word) => (
                <span
                  key={word}
                  tabIndex={copy === 0 ? 0 : -1}
                  className="block cursor-default select-none px-[clamp(1.25rem,3vw,3.5rem)] text-[clamp(4.5rem,13vw,15rem)] font-semibold uppercase leading-[0.86] tracking-[-0.02em] text-white/[0.14] outline-none transition-colors duration-500 hover:text-cream/85 focus-visible:text-cream/85"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Masters' Union" },
      { name: "description", content: "500+ Masters. Built by scholars. Led by industry practitioners. Ivy League academics and global business leaders — from Harvard to McKinsey, from Wharton to Google." },
      { property: "og:title", content: "Faculty — Masters' Union" },
      { property: "og:description", content: "500+ Masters. 50% active industry practitioners. Real operators, not retired ones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: MASTER_VIDEO_PRELOAD.map((href, i) => ({
      rel: "preload" as const,
      as: "image" as const,
      href,
      fetchpriority: i < 5 ? "high" : "auto",
    })),
  }),
  component: FacultyPage,
});

function FacultyPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-faculty-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset["visible"] = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ink-scope faculty-redesign min-h-screen bg-ink pb-24 text-foreground sm:pb-[clamp(4.5rem,7vw,6rem)]" style={{ fontFamily: INTER }}>
      <SectionNav items={NAV} applyHref="#cta" />

      <StackReveal
        coverMultipliers={[
          1, // Hero — unchanged
          1, // Masters · Masterclass
          1.75, // 01 Industry Practitioners — slower cover-up
          1.75, // 02 Full-time Faculty
          1.75, // 03 Visiting Faculty
          1, // 04 What students say
          1, // 05 Become a Master
          1, // The Number · 500+ DOERS
          1, // Footer (last panel — no cover-up)
        ]}
      >
      {/* HERO — first pinned layer of the stack (hero content + image + By the numbers panel) */}
      <div className="flex min-h-[calc(100svh-var(--nav-reserve,0px))] flex-col bg-ink md:min-h-screen md:pb-0">
        <HeroFadeOut>
          <FacultyHero />
          {/* By the numbers — attached to the hero's bottom edge, moves with the hero */}
          <div
            className="page-shell w-full bg-ink pb-[clamp(1.25rem,3vh,2.25rem)]"
            style={{ marginTop: "calc(-1 * clamp(2rem, 6vh, 4.5rem) + clamp(1.25rem, 2.5vh, 1.75rem))" }}
          >
            <FacultyStatsCard
              dark
              stats={HERO_STATS}
              refreshed={statsRefreshedLabel()}
              universities={[
                "Harvard",
                "Wharton",
                "Stanford",
                "Kellogg",
                "Cornell",
                "NYU",
                "Columbia",
                "USC",
                "Imperial",
              ]}
            />
          </div>
        </HeroFadeOut>
      </div>




      {/* SECTION 2 — MASTERS: Built by Scholars, Led by Industry Practitioners */}
      <MastersVideos dark bg="bg-ink" />


      {/* INDUSTRY PRACTITIONERS */}
      <section id="practitioners" className="screen-section border-y border-white/10 bg-ink">
        <div className="page-shell screen-y">
          <SectionIntro
            index="01"
            eyebrow="Industry Practitioners"
            title={<>The people who teach here are not between jobs. They are <Accent>active</Accent>.</>}
            intro="Half of the faculty are CEOs, MDs, founders and investors — bringing this week's decisions into the classroom, not last decade's case studies."
          />
          <SectionDivider inset="none" className="my-[clamp(1.5rem,4vh,2.5rem)]" />
          <EditorialGrid
            gallery
            cardStats
            dark
            sectionLabel="Industry Practitioners"
            pct="50%"
            tagline="Half of the faculty are active operators — CEOs, MDs, founders and investors bringing this week's decisions into the classroom."
            stats={[
              { v: "250+", l: "Active practitioners on roster" },
              { v: "40+", l: "CXOs & Managing Directors" },
            ]}
            items={PRACTITIONERS.map((p) => ({
              name: p.name,
              role: p.role,
              blurb: p.blurb,
              img: PRACTITIONER_PHOTOS[p.name],
            }))}
          />
        </div>
      </section>

      {/* FULL-TIME FACULTY */}
      <section id="full-time" className="screen-section border-y border-white/10 bg-ink">
        <div className="page-shell screen-y">
          <SectionIntro
            index="02"
            eyebrow="Full-time Faculty"
            title={<>{FULLTIME.length} PhD faculty. Active researchers. Published where the <Accent>best B-schools read</Accent>.</>}
            intro="A core of PhD faculty from India's and the world's top institutions — shaping curriculum and publishing in FT50 and A* journals."
          />
          <SectionDivider inset="none" className="my-[clamp(1.5rem,4vh,2.5rem)]" />
          <EditorialGrid
            gallery
            cardStats
            dark
            sectionLabel="Full-time Faculty"
            pct="30%"
            tagline="A core of PhD faculty from India's and the world's top institutions — shaping curriculum and publishing where the best B-schools read."
            stats={[
              { v: String(FULLTIME.length), l: "Full-time faculty" },
              { v: "50+", l: "FT50 / A* publications" },
            ]}
            items={FULLTIME.map((f) => ({ name: f.name, role: f.note, img: f.img }))}
          />
          <PedigreeScrollPanel />

        </div>
      </section>

      {/* VISITING */}
      <section id="visiting" className="screen-section border-y border-white/10 bg-ink">
        <div className="page-shell screen-y">
          <SectionIntro
            index="03"
            eyebrow="Visiting Faculty"
            title={<>Professors who teach here because they <Accent>believe</Accent> in what Masters&apos; Union is building.</>}
            intro="Professors from Ivy League and global top schools bringing international rigour and perspective to Gurugram — every term."
          />
          <SectionDivider inset="none" className="my-[clamp(1.5rem,4vh,2.5rem)]" />
          <EditorialGrid
            gallery
            cardStats
            dark
            sectionLabel="Visiting Faculty"
            pct="20%"
            tagline="Professors from Ivy League and global top schools bringing international rigour and perspective to Gurugram — every term."
            stats={[
              { v: "40+", l: "Visiting professors annually" },
              { v: "12", l: "Countries represented" },
            ]}
            items={VISITING.map((v) => ({ name: v.name, role: v.role, sub: v.school, img: v.img }))}
          />
          <LogoMarquee
            variant="banded"
            speed="slow"
            className="mt-[clamp(1.25rem,3vh,2rem)]"
            label="Schools our visiting faculty teach at"
            items={VISITING_SCHOOLS.map((name) => ({ name }))}
          />
          <SchoolsScrollPanel />

        </div>
      </section>

      {/* TESTIMONIALS */}
        <section className="screen-section border-y border-white/10 bg-ink">
        <div className="page-shell screen-y">
          <SectionIntro
            index="04"
            eyebrow="What students say"
            title={<>Learning from operators, <Accent>in their own words</Accent>.</>}
          />
          <SectionDivider inset="none" className="my-[clamp(1.5rem,4vh,2.5rem)]" />
          <StudentTestimonials items={TESTIMONIALS} />

        </div>
      </section>

      {/* BECOME A MASTER */}
      <section className="screen-section border-y border-white/10 bg-ink text-white">
        <div className="screen-y flex w-full flex-col items-center justify-center">
          <div className="page-shell w-full">
            <SectionIntro
              index="05"
              eyebrow="Become a Master"
              title={<>We&apos;re always looking for practitioners who want to <Accent>teach what they know</Accent>.</>}
              intro={<>If you have built something, led something, invested in something, or shaped something — and you believe the best way to teach business is to have done it — we want to hear from you.</>}
            />

            <div className="mt-[clamp(1.5rem,4vh,2.5rem)] flex justify-center">
              <a
                href="https://mastersunion.org/become-a-master"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-[2px] border border-cream bg-cream px-7 py-4 text-[11px] uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:bg-transparent hover:text-cream"
                style={{ fontFamily: MONO }}
              >
                Apply to teach
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Editorial marquee wordmark */}
          <WordMarquee />

        </div>
      </section>


      {/* THE NUMBER */}
      <section className="group relative flex min-h-[calc(110svh-var(--nav-reserve,0px))] flex-col items-center justify-center overflow-hidden border-y border-white/10 bg-ink py-[clamp(4rem,10vh,8rem)] text-white">
        <div className="page-shell-narrow relative z-10 mt-[clamp(2rem,7svh,4rem)] text-center md:mt-0">
          <div className="faculty-section-kicker text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ fontFamily: MONO }}>
            The number that matters
          </div>

          <div className="mt-[clamp(1.25rem,3.5vh,2rem)]">
            <div className="relative z-10 text-[clamp(6rem,17vw,14rem)] font-normal leading-[0.85]" style={{ fontFamily: "var(--faculty-font-display)" }}>
              500+
            </div>
            <div className="faculty-heading-accent relative z-0 -mt-[clamp(2rem,5vh,3.5rem)] text-[clamp(4rem,11vw,9rem)] font-normal italic leading-[0.85] transition-colors duration-500" style={{ fontFamily: "var(--faculty-font-display)" }}>
              DOERS
            </div>
          </div>

          <div className="mt-[clamp(2.5rem,6vh,4rem)] space-y-[clamp(1.25rem,3vh,1.75rem)]">
            <p className="text-[clamp(0.875rem,1.8vw,1.125rem)] font-medium leading-[1.4] tracking-[-0.01em] text-white/90">
              Masters on the roster.
            </p>
            <p className="mx-auto max-w-[52ch] text-[0.98rem] leading-[1.6] text-white/70">
              50% of them active industry practitioners who were in a meeting this morning before they came to teach you this afternoon.
            </p>
            <p className="mx-auto max-w-[52ch] text-[0.98rem] font-medium leading-[1.6] text-white/90">
              That is not a teaching philosophy. It is a hiring policy.
            </p>
          </div>
        </div>
      </section>



      {/* CTA / CLOSING FOOTER */}
      <footer id="cta" className="relative min-h-[calc(100svh-var(--nav-reserve,0px))] overflow-x-hidden bg-ink text-white">
        <div className="flex min-h-[calc(100svh-var(--nav-reserve,0px))] flex-col justify-between pt-[clamp(4rem,14vh,10rem)]">
          {/* Top CTA */}
          <div className="page-shell-narrow text-center">
            <p className="text-balance text-[0.98rem] not-italic leading-[1.35] text-white/85">
              Learn from the people doing it — not just studying it.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/applications_center" className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-80" style={{ fontFamily: MONO }}>
                Apply to Masters&apos; Union <ArrowUpRight className="size-3" />
              </Link>
              <a href="https://mastersunion.org/become-a-master" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-white/85 transition-colors hover:bg-white/10" style={{ fontFamily: MONO }}>
                Or join them <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* Giant type + strip + utility row */}
          <div className="mt-[clamp(40px,8vh,86px)]">

            <div className="px-[clamp(1rem,2.5vw,2.5rem)]">
              <h2 className="sr-only">Join the Union</h2>
              {/* Fluid full-width display type: SVG auto-fits the container at any width */}
              <div className="text-white/[0.14] transition-colors duration-500 hover:text-cream/85">
                <svg
                  aria-hidden
                  viewBox="0 0 1200 168"
                  className="hidden h-auto w-full sm:block"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <text
                    x="600"
                    y="132"
                    textAnchor="middle"
                    textLength="1188"
                    lengthAdjust="spacingAndGlyphs"
                    fill="currentColor"
                    fontSize="170"
                    fontWeight="700"
                    style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "-0.04em" }}
                  >
                    JOIN THE UNION
                  </text>
                </svg>
                <div className="sm:hidden">
                  {["JOIN THE", "UNION"].map((line) => (
                    <svg
                      key={line}
                      aria-hidden
                      viewBox="0 0 600 120"
                      className="h-auto w-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <text
                        x="300"
                        y="98"
                        textAnchor="middle"
                        textLength="592"
                        lengthAdjust="spacingAndGlyphs"
                        fill="currentColor"
                        fontSize="120"
                        fontWeight="700"
                        style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "-0.04em" }}
                      >
                        {line}
                      </text>
                    </svg>
                  ))}
                </div>
              </div>

            </div>


            <div className="relative mt-[clamp(1.5rem,4vh,3rem)] h-[clamp(209px,41.8vh,437px)] w-full">
              <img
                src={footerStripAsset.url}
                alt="Masters' Union campus life"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[56%_40%] opacity-60 grayscale-[0.25]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
              <div aria-hidden className="absolute inset-0 bg-ink/25" />
            </div>

            <div className="border-t border-white/10">
              <div className="page-shell flex flex-wrap items-center justify-between gap-2 py-4 pb-[clamp(4.5rem,8vh,6rem)] text-[10px] uppercase tracking-[0.22em] text-white/40" style={{ fontFamily: MONO }}>
                <span>© 2026 Masters&apos; Union</span>
                <span className="text-white/30">
                  Faculty · <span className="text-[#d8b45f]/70">Practitioners over professors</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </StackReveal>
    </main>

  );
}
