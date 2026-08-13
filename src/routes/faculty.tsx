import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote } from "lucide-react";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import MastersVideos from "@/components/MastersVideos";
import FacultyHero from "@/components/FacultyHero";
import HeroFadeOut from "@/components/HeroFadeOut";
import FacultyStatsCard from "@/components/FacultyStatsCard";
import { buildFacultyStats, statsRefreshedLabel } from "@/lib/faculty-stats";


import PractitionerGallery from "@/components/PractitionerGallery";

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

const manojImg = manojAsset.url;
const bhupeshImg = bhupeshAsset.url;
const nandiniImg = nandiniAsset.url;
const garimaImg = garimaAsset.url;

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SERIF = "'Fraunces', 'Cormorant Garamond', ui-serif, Georgia, serif";

function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <header className={isCenter ? "text-center" : ""}>
      <p
        className={`mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50 ${
          isCenter ? "flex justify-center gap-3" : "flex gap-3"
        }`}
      >
        <span>{index}</span>
        <span aria-hidden className="text-black/25">/</span>
        <span>{eyebrow}</span>
      </p>
      <h2
        className={`text-[clamp(1.5rem,3.1vw,2.6rem)] font-semibold leading-[1.08] tracking-tight text-black ${
          isCenter ? "mx-auto max-w-[24ch]" : "max-w-[26ch]"
        }`}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 text-[clamp(0.94rem,1vw,1.05rem)] leading-[1.6] text-black/70 ${
            isCenter ? "mx-auto max-w-[62ch]" : "max-w-[62ch]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </header>

  );
}

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

function Initials({ name }: { name: string }) {
  const initials = name.replace(/^Dr\s+|^Captain\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-[clamp(1.6rem,2.4vw,2rem)] tracking-[-0.02em] text-black/40" style={{ fontFamily: MONO }}>
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

function Portrait({ item, aspect = "aspect-[4/5]" }: { item: EditorialItem; aspect?: string }) {
  return (
    <div className={`w-full overflow-hidden bg-[#ececec] ${aspect}`}>
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
        />
      ) : (
        <Initials name={item.name} />
      )}
    </div>
  );
}

function EditorialCaption({ item }: { item: EditorialItem }) {
  return (
    <>
      <h3 className="mt-4 text-[1rem] font-medium leading-[1.2] tracking-[-0.005em] text-black">
        {item.name}
      </h3>
      <div className="mt-1.5 text-[10.5px] uppercase leading-snug tracking-[0.14em] text-black/55" style={{ fontFamily: MONO }}>
        {item.role}
      </div>
      {item.sub ? (
        <div className="mt-0.5 text-[10.5px] uppercase leading-snug tracking-[0.14em] text-black/40" style={{ fontFamily: MONO }}>
          {item.sub}
        </div>
      ) : null}
      {item.blurb ? (
        <p className="mt-3 text-[13px] leading-[1.55] text-black/70">{item.blurb}</p>
      ) : null}
    </>
  );
}

type FacultyStat = { v: string; l: string };

function EditorialGrid({
  items,
  sectionLabel,
  pct,
  tagline,
  stats,
  gallery = false,
}: {
  items: EditorialItem[];
  sectionLabel: string;
  pct: string;
  tagline: string;
  stats: FacultyStat[];
  gallery?: boolean;
}) {
  return (
    <div className="mt-[clamp(1rem,2.5vh,2rem)] border-t border-black/15">
      {/* STATS HERO — replaces featured faculty */}
      <div className="grid gap-x-8 gap-y-[clamp(1rem,2.2vh,1.5rem)] border-b border-black/15 py-[clamp(1rem,2.6vh,2rem)] md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-[10.5px] uppercase tracking-[0.24em] text-black/50" style={{ fontFamily: MONO }}>
            The Mix · {sectionLabel}
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <div className="text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.88] tracking-[-0.04em] text-black">
              {pct}
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>
              of faculty
            </div>
          </div>
          <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-[1.6] text-black/75">{tagline}</p>
        </div>
        <div className="md:col-span-7 md:pl-10 md:border-l md:border-black/10">
          <div className="text-[10.5px] uppercase tracking-[0.24em] text-black/50" style={{ fontFamily: MONO }}>
            By the numbers
          </div>
          <div className="mt-[clamp(1rem,2.4vh,1.5rem)] grid grid-cols-2 gap-x-6 gap-y-[clamp(1rem,2.6vh,2rem)] sm:gap-x-10">
            {stats.map((s) => (
              <div key={s.l} className="group relative">
                <div className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#7a8b6f]" aria-hidden />
                  <div
                    className="text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[0.92] tracking-[-0.035em] text-black"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.v}
                  </div>
                </div>
                <div
                  className="mt-3 pl-[18px] text-[11px] font-medium uppercase leading-[1.5] tracking-[0.18em] text-black/65"
                  style={{ fontFamily: MONO }}
                >
                  {s.l}
                </div>
                <div className="mt-4 ml-[18px] h-px w-10 bg-black/25 transition-all duration-500 group-hover:w-20 group-hover:bg-[#7a8b6f]" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>

      {gallery ? (
        <div className="border-b border-black/15 py-[clamp(1rem,3vh,2.5rem)]">
          <PractitionerGallery items={items} />
        </div>
      ) : (
        <div className="scene-scroll grid grid-cols-2 divide-x divide-y divide-black/10 border-b border-black/15 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <article key={item.name} className="p-5 md:p-6">
              <Portrait item={item} />
              <EditorialCaption item={item} />
            </article>
          ))}
        </div>
      )}
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
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white pb-24 text-black sm:pb-[clamp(4.5rem,7vw,6rem)]" style={{ fontFamily: INTER }}>
      <SectionNav items={NAV} applyHref="#cta" />

      {/* Chapter marker */}
      <div className="page-shell flex items-center justify-between gap-4 border-b border-black/10 pb-[clamp(0.85rem,1.6vw,1.25rem)] pt-[clamp(1.25rem,3vw,2.25rem)] sm:gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>
          Faculty
        </div>
      </div>

      {/* SECTION 1 — HERO: label, headline, description, image, scroll cue, stats card */}
      <HeroFadeOut>
        <FacultyHero />
      </HeroFadeOut>

      {/* SECTION 2 — MASTERS: Built by Scholars, Led by Industry Practitioners */}
      <MastersVideos
        bg="bg-white"
        statsSlot={
          <FacultyStatsCard
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
        }
      />





      {/* INDUSTRY PRACTITIONERS */}
      <section id="practitioners" className="screen-section border-y border-black/10 bg-neutral-50">
        <div className="page-shell screen-y">
          <SectionHeader
            index="01"
            eyebrow="Industry Practitioners"
            title={<>The people who teach here are not between jobs. They are active.</>}
            intro="Half of the faculty are CEOs, MDs, founders and investors — bringing this week's decisions into the classroom, not last decade's case studies."
          />



        <EditorialGrid
          gallery
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
      <section id="full-time" className="screen-section border-y border-black/10 bg-white">
        <div className="page-shell screen-y">
          <SectionHeader
            index="02"
            eyebrow="Full-time Faculty"
            title={<>{FULLTIME.length} PhD faculty. Active researchers. Published where the best B-schools read.</>}
            intro="A core of PhD faculty from India's and the world's top institutions — shaping curriculum and publishing in FT50 and A* journals."
          />

          <EditorialGrid
            sectionLabel="Full-time Faculty"
            pct="30%"
            tagline="A core of PhD faculty from India's and the world's top institutions — shaping curriculum and publishing where the best B-schools read."
            stats={[
              { v: String(FULLTIME.length), l: "Full-time faculty" },
              { v: "50+", l: "FT50 / A* publications" },
            ]}
            items={FULLTIME.map((f) => ({ name: f.name, role: f.note, img: f.img }))}
          />

          <p className="mt-[clamp(1rem,2.4vh,1.75rem)] max-w-[62ch] text-[0.95rem] leading-[1.6] text-black/70">
            Doctorates from IIM Ahmedabad, Bangalore, Calcutta, Kozhikode and Tiruchirappalli, IIT Bombay and Kanpur, Delhi University, Shiv Nadar, Christ University, TERI and the University of Bath — across finance, marketing, operations, organisational behaviour, economics, decision sciences and strategy.
          </p>

        </div>
      </section>

      {/* VISITING */}
      <section id="visiting" className="screen-section bg-neutral-50">
        <div className="page-shell screen-y">
          <SectionHeader
            index="03"
            eyebrow="Visiting Faculty"
            title={<>Professors who teach here because they believe in what Masters&apos; Union is building.</>}
            intro="Professors from Ivy League and global top schools bringing international rigour and perspective to Gurugram — every term."
          />


        <EditorialGrid
          sectionLabel="Visiting Faculty"
          pct="20%"
          tagline="Professors from Ivy League and global top schools bringing international rigour and perspective to Gurugram — every term."
          stats={[
            { v: "40+", l: "Visiting professors annually" },
            { v: "12", l: "Countries represented" },
          ]}

          items={VISITING.map((v) => ({ name: v.name, role: v.role, sub: v.school, img: v.img }))}
        />



        <div className="mt-[clamp(1rem,2.6vh,2.25rem)] border-l-2 border-black/80 bg-neutral-50 p-[clamp(1.25rem,3vh,2.5rem)]">
          <p className="max-w-[70ch] text-[1.05rem] leading-[1.65] text-black/80">
            <span className="font-medium text-black">Kellogg School of Management</span> — led by Professor Mohanbir Sawhney, one of the world&apos;s foremost authorities on technology strategy and marketing innovation — has brought students to Masters&apos; Union for two consecutive years. <span className="font-medium text-black">Harvard Business School India</span> immersion students have visited campus. When schools like these come here to learn, something is working.
          </p>
        </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="screen-section border-y border-black/10 bg-neutral-50">
        <div className="page-shell screen-y">
          <SectionHeader
            index="04"
            eyebrow="What students say"
            title={<>Learning from operators, in their own words.</>}
          />
          <div className="mt-[clamp(1.25rem,3vh,2rem)] grid gap-[clamp(1rem,2.4vh,1.5rem)] md:grid-cols-3">

            {TESTIMONIALS.map((t) => (
              <figure key={t.a} className="border border-black/10 bg-white p-[clamp(1.25rem,3vh,2rem)]">
                <Quote className="size-5 text-black/40" />
                <blockquote className="mt-4 text-[0.98rem] leading-[1.6] text-black/80">&ldquo;{t.q}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-black/10 pt-4">
                  <div className="text-[0.95rem] text-black">{t.a}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/55" style={{ fontFamily: MONO }}>{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A MASTER */}
      <section className="screen-section page-shell">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionHeader
              index="05"
              eyebrow="Become a Master"
              title={<>We&apos;re always looking for practitioners who want to teach what they know.</>}
              intro="If you have built something, led something, invested in something, or shaped something — and you believe the best way to teach business is to have done it — we want to hear from you."
            />
          </div>

          <div className="md:col-span-5 md:text-right">
            <a href="https://mastersunion.org/become-a-master" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80" style={{ fontFamily: MONO }}>
              Apply to teach <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* THE NUMBER */}
      <section className="screen-section border-y border-black/10 bg-black text-white">
        <div className="page-shell-narrow text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: MONO }}>The number that matters</div>
          <div className="mt-[clamp(1.25rem,3.5vh,2rem)] text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.88] tracking-tight" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>500+</div>
          <p className="mx-auto mt-[clamp(1.25rem,3.5vh,2rem)] max-w-[52ch] text-[1.05rem] leading-[1.55] text-white/80">
            Masters on the roster. 50% of them active industry practitioners who were in a meeting this morning before they came to teach you this afternoon.
          </p>
          <p className="mx-auto mt-6 max-w-[52ch] text-[0.95rem] italic text-white/60">
            That is not a teaching philosophy. It is a hiring policy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="screen-section page-shell-narrow text-center">
        <p className="text-balance text-[clamp(1.2rem,2.2vw,1.9rem)] italic leading-[1.25] text-black/90">
          Learn from the people doing it — not just studying it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/applications_center" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80" style={{ fontFamily: MONO }}>
            Apply to Masters&apos; Union <ArrowUpRight className="size-3.5" />
          </Link>
          <a href="https://mastersunion.org/become-a-master" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-black/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black/[0.04]" style={{ fontFamily: MONO }}>
            Or join them <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>
    </main>
  );
}
