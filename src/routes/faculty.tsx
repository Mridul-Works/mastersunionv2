import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote } from "lucide-react";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";

import manojAsset from "@/assets/faculty/manoj.png.asset.json";
import bhupeshAsset from "@/assets/faculty/bhupesh.png.asset.json";
import nandiniAsset from "@/assets/faculty/nandini.png.asset.json";
import garimaAsset from "@/assets/faculty/garima.png.asset.json";
import zalAsset from "@/assets/faculty/zal.png.asset.json";
import danielAsset from "@/assets/faculty/daniel.png.asset.json";
import lanmaAsset from "@/assets/faculty/lanma.png.asset.json";
import faverieAsset from "@/assets/faculty/faverie.png.asset.json";
import havishAsset from "@/assets/faculty/havish-madhvapaty.png.asset.json";
import ekhlaqueAsset from "@/assets/faculty/ekhlaque-bari.png.asset.json";
import sumitAsset from "@/assets/faculty/sumit-shukla.png.asset.json";
import adityaAsset from "@/assets/faculty/aditya-turalapati.png.asset.json";
import divijAsset from "@/assets/faculty/divij-bajaj.png.asset.json";
import parikshitAsset from "@/assets/faculty/parikshit-khanna.png.asset.json";
import karmanyaAsset from "@/assets/faculty/karmanya-suri.png.asset.json";
import gauravAAsset from "@/assets/faculty/gaurav-arora.png.asset.json";
import daveLewisAsset from "@/assets/faculty/dave-lewis.png.asset.json";
import umbertoAsset from "@/assets/faculty/umberto.png.asset.json";
import carolinaAsset from "@/assets/faculty/carolina.png.asset.json";
import federicoAsset from "@/assets/faculty/federico-biasutti.png.asset.json";
import paolaAsset from "@/assets/faculty/paola-santoro.png.asset.json";
import rosarioAsset from "@/assets/faculty/rosario.png.asset.json";
import timothyAsset from "@/assets/faculty/timothy-oconnell.png.asset.json";
import frankAsset from "@/assets/faculty/frank-barry.png.asset.json";
import maireadAsset from "@/assets/faculty/mairead-braddy.png.asset.json";
import ennoAsset from "@/assets/faculty/enno-masurel.png.asset.json";
import orestisAsset from "@/assets/faculty/orestis.png.asset.json";
import annalisaAsset from "@/assets/faculty/annalisa.png.asset.json";
import evangelosAsset from "@/assets/faculty/evangelos.png.asset.json";
import xiaoyuAsset from "@/assets/faculty/xiaoyu.png.asset.json";
import raghuAsset from "@/assets/faculty/raghu-raman.png.asset.json";
import nitinAsset from "@/assets/faculty/nitin-gaur.png.asset.json";

const manojImg = manojAsset.url;
const bhupeshImg = bhupeshAsset.url;
const nandiniImg = nandiniAsset.url;
const garimaImg = garimaAsset.url;
const zalImg = zalAsset.url;
const danielImg = danielAsset.url;
const lanmaImg = lanmaAsset.url;
const faverieImg = faverieAsset.url;

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "model", label: "Model" },
  { id: "practitioners", label: "Industry" },
  { id: "full-time", label: "Full-time" },
  { id: "visiting", label: "Visiting" },
];

type Practitioner = { name: string; role: string; blurb: string };

const PRACTITIONERS: Practitioner[] = [
  { name: "Rajat Mathur", role: "Former Managing Director, Morgan Stanley", blurb: "Teaches people management through interactive debates, games, and live case studies. Rated among the most popular faculty at Masters' Union. Was in a board meeting before your class started." },
  { name: "Naveen Munjal", role: "Managing Director, Hero Electric", blurb: "Teaches strategy and business building in the EV sector. One of the most consequential executives in India's electric vehicle transition — teaching the next generation who will operate in it." },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace, Swiggy", blurb: "Teaches growth, marketplace dynamics, and P&L management from the front seat of one of India's most complex consumer businesses." },
  { name: "Manoj Kohli", role: "Former CEO & MD, SoftBank India · Former CEO, Airtel International", blurb: "Teaches global business strategy and leadership from a career spanning the world's largest telecoms and technology investors." },
  { name: "Captain Raghu Raman", role: "Former President, Reliance Industries · Former CEO, NATGRID", blurb: "Teaches leadership, national security strategy, and high-stakes organisational decision-making. There is no textbook for what he teaches." },
  { name: "Arjun Vaidya", role: "Founder, Dr. Vaidya's", blurb: "Teaches brand building, D2C strategy, and consumer psychology. Built a company and sold it to a Fortune 500 group — in his early thirties." },
  { name: "Monica Jasuja", role: "Former Head, Mastercard", blurb: "Teaches payments, fintech, and digital financial infrastructure from inside one of the world's most consequential payment networks." },
  { name: "Nitin Gaur", role: "Former Director, IBM", blurb: "Teaches blockchain, digital assets, and technology strategy from the team that built IBM's blockchain and digital currency research division." },
  { name: "Malthi Satish", role: "Former Director of Product Management, PayPal", blurb: "Teaches product management and digital platform strategy from inside one of the world's first and most influential fintech companies." },
  { name: "Dr Arvind Mayaram", role: "Former Finance Secretary of India", blurb: "Teaches macroeconomics, fiscal policy, and public finance from the office that once managed India's economy. Literally." },
  { name: "Saurabh Sengupta", role: "Former VP, Zomato", blurb: "Teaches growth, product strategy, and consumer marketplaces from one of India's most scrutinised public companies." },
  { name: "Barkha Dutt", role: "Former Editor, NDTV", blurb: "Teaches communication, public narrative, and media strategy. One of India's most recognised journalists — now teaching the next generation how to tell stories that matter." },
  { name: "Rachel Konrad", role: "Former Director of Communications, Tesla", blurb: "Teaches communications, brand narrative, and launch strategy. Her last major project was helping introduce the Model S to the world. Before that, Amazon." },
  { name: "Dr Edward W. Rogers", role: "Former Chief Knowledge Officer, NASA", blurb: "Teaches knowledge management, innovation systems, and organisational learning. His previous employer sent people to space." },
  { name: "Vivek Gambhir", role: "Former CEO, boAt", blurb: "Teaches brand building and consumer electronics — the mechanics of building a ₹3,000 Cr consumer brand from near-zero in under a decade." },
  { name: "Sanjiv Bhasin", role: "Former Director, IIFL", blurb: "Teaches equity markets, capital markets strategy, and investment analysis from decades on India's trading floors." },
  { name: "Dave Lewis", role: "Former Group CEO, Tesco", blurb: "Teaches large-scale organisational transformation and consumer strategy from the turnaround of one of the world's largest retailers." },
  { name: "Havish Madhvapaty", role: "Industry Practitioner, Masters' Union", blurb: "Teaches marketing, brand strategy and consumer research grounded in live industry engagements." },
  { name: "Ekhlaque Bari", role: "Industry Practitioner, Masters' Union", blurb: "Teaches technology strategy and enterprise transformation from a career leading large digital programmes." },
  { name: "Sumit Shukla", role: "Industry Practitioner, Masters' Union", blurb: "Teaches business strategy and operations from years spent building and scaling category-defining businesses." },
  { name: "Aditya Turalapati", role: "Industry Practitioner, Masters' Union", blurb: "Teaches finance and analytics with a practitioner-first, case-driven approach." },
  { name: "Divij Bajaj", role: "Industry Practitioner, Masters' Union", blurb: "Teaches product, growth and go-to-market strategy from the front lines of consumer businesses." },
  { name: "Parikshit Khanna", role: "Industry Practitioner, Masters' Union", blurb: "Teaches technology, product and platform strategy from an operator's vantage point." },
  { name: "Karmanya Suri", role: "Industry Practitioner, Masters' Union", blurb: "Teaches strategy and general management, blending consulting rigour with startup pace." },
  { name: "Gaurav Arora", role: "Industry Practitioner, Masters' Union", blurb: "Teaches finance and corporate strategy from a career across capital markets and industry." },
];

const PRACTITIONER_PHOTOS: Record<string, string> = {
  "Manoj Kohli": manojImg,
  "Dave Lewis": daveLewisAsset.url,
  "Havish Madhvapaty": havishAsset.url,
  "Ekhlaque Bari": ekhlaqueAsset.url,
  "Sumit Shukla": sumitAsset.url,
  "Aditya Turalapati": adityaAsset.url,
  "Divij Bajaj": divijAsset.url,
  "Parikshit Khanna": parikshitAsset.url,
  "Karmanya Suri": karmanyaAsset.url,
  "Gaurav Arora": gauravAAsset.url,
  "Captain Raghu Raman": raghuAsset.url,
  "Nitin Gaur": nitinAsset.url,
};

type FullTimer = { name: string; note: string; img?: string };
const FULLTIME: FullTimer[] = [
  { name: "Dr Bhupesh Manoharan", note: "PhD · Strategy & Organisation", img: bhupeshImg },
  { name: "Dr Nandini Seth", note: "PhD · Marketing", img: nandiniImg },
  { name: "Dr Manu Prasad", note: "PhD · Finance" },
  { name: "Dr Kashika Sud", note: "PhD · Organisational Behaviour" },
  { name: "Dr Vipin Sreekumar", note: "PhD · Operations" },
  { name: "Dr Garima Chaklader", note: "PhD · Economics", img: garimaImg },
];

type Visiting = { name: string; role: string; school: string; img?: string };
const VISITING: Visiting[] = [
  { name: "Dr Zal Phiroz", role: "Adjunct Professor, Supply Chain & Operations", school: "Harvard University", img: zalImg },
  { name: "Daniel G. Van Der Vliet", role: "Executive Director", school: "Cornell University", img: danielImg },
  { name: "Dr Lan Ma", role: "Adjunct Professor of Business", school: "NYU Stern", img: lanmaImg },
  { name: "Emmanuel Faverie", role: "Visiting Faculty", school: "ESCP Business School", img: faverieImg },
  { name: "Enno Masurel", role: "Professor of Entrepreneurship", school: "VU Amsterdam", img: ennoAsset.url },
  { name: "Frank Barry", role: "Professor of International Business", school: "Trinity College Dublin", img: frankAsset.url },
  { name: "Timothy O'Connell", role: "Visiting Faculty", school: "Global Partner Universities", img: timothyAsset.url },
  { name: "Mairead Braddy", role: "Visiting Faculty", school: "Global Partner Universities", img: maireadAsset.url },
  { name: "Umberto", role: "Visiting Faculty", school: "SDA Bocconi", img: umbertoAsset.url },
  { name: "Carolina", role: "Visiting Faculty", school: "SDA Bocconi", img: carolinaAsset.url },
  { name: "Federico Biasutti", role: "Visiting Faculty", school: "SDA Bocconi", img: federicoAsset.url },
  { name: "Paola Santoro", role: "Visiting Faculty", school: "SDA Bocconi", img: paolaAsset.url },
  { name: "Rosario", role: "Visiting Faculty", school: "SDA Bocconi", img: rosarioAsset.url },
  { name: "Orestis", role: "Visiting Faculty", school: "Global Partner Universities", img: orestisAsset.url },
  { name: "Annalisa", role: "Visiting Faculty", school: "Global Partner Universities", img: annalisaAsset.url },
  { name: "Evangelos", role: "Visiting Faculty", school: "Global Partner Universities", img: evangelosAsset.url },
  { name: "Xiaoyu", role: "Visiting Faculty", school: "CUHK Business School", img: xiaoyuAsset.url },
  { name: "Rajat Baijal", role: "Adjunct Professor, Enterprise Risk Management", school: "Columbia University" },
  { name: "Dr Shad Morris", role: "Executive Director", school: "BYU (Brigham Young University)" },
  { name: "Dr Rajesh Bhargave", role: "Associate Professor of Marketing", school: "Imperial College London" },
  { name: "Meenakshi Rishi", role: "Professor of Economics", school: "Seattle University" },
  { name: "Dr Alireza Kabirian", role: "Professor of Data Sciences", school: "USC" },
  { name: "Dr Kenwyn K. Smith", role: "Professor", school: "Wharton School, University of Pennsylvania" },
];

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

function EditorialGrid({ items, sectionLabel }: { items: EditorialItem[]; sectionLabel: string }) {
  const [hero, ...rest] = items;
  return (
    <div className="mt-12 border-t border-black/15">
      {hero ? (
        <div className="grid gap-x-8 gap-y-8 border-b border-black/15 py-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Portrait item={hero} aspect="aspect-[4/3]" />
          </div>
          <div className="md:col-span-6 md:pl-2">
            <div className="text-[10.5px] uppercase tracking-[0.24em] text-black/50" style={{ fontFamily: MONO }}>
              Featured · {sectionLabel}
            </div>
            <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.015em] text-black">
              {hero.name}
            </h3>
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-black/60" style={{ fontFamily: MONO }}>
              {hero.role}
            </div>
            {hero.sub ? (
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-black/45" style={{ fontFamily: MONO }}>
                {hero.sub}
              </div>
            ) : null}
            {hero.blurb ? (
              <p className="mt-6 max-w-[52ch] text-[1rem] leading-[1.6] text-black/75">{hero.blurb}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border-b border-black/15 sm:grid-cols-3 md:grid-cols-4">
        {rest.map((item) => (
          <article key={item.name} className="p-5 md:p-6">
            <Portrait item={item} />
            <EditorialCaption item={item} />
          </article>
        ))}
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
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <SectionNav items={NAV} applyHref="#cta" />

      {/* Chapter marker */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 transition-colors hover:text-black" style={{ fontFamily: MONO }}>
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>
          Faculty
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
          Faculty at Masters&apos; Union
        </div>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          At most B-schools, faculty study companies. Here, they ran them — and most still do.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          500+ Masters. Built by scholars. Led by industry practitioners. Your classroom is powered by Ivy League academics and global business leaders — from Harvard to McKinsey, from Wharton to Google. They don&apos;t just teach the playbook. They wrote it.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-px border border-black/10 bg-black/10 md:grid-cols-4">
          {[
            { v: "500+", l: "Masters on the roster" },
            { v: "50%", l: "Active industry practitioners" },
            { v: "9", l: "Ivy & top global schools" },
            { v: "25", l: "Full-time PhD faculty" },
          ].map((s) => (
            <div key={s.l} className="bg-white px-4 py-10 text-center">
              <div className="text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">{s.v}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {["Harvard", "Wharton", "Stanford", "Kellogg", "Cornell", "NYU", "Columbia", "USC", "Imperial"].map((c) => (
            <span key={c} className="rounded-none border border-black/15 px-3 py-1.5 text-[12px] text-black/80" style={{ fontFamily: MONO }}>{c}</span>
          ))}
        </div>
      </section>

      {/* THE MODEL */}
      <section id="model" className="border-y border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>The model</div>
          <h2 className="mt-4 max-w-[26ch] text-balance text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
            A faculty model designed for real-world mastery.
          </h2>
          <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.6] text-black/70">
            Most business schools have one kind of faculty. Masters&apos; Union has three — deliberately structured so that students get industry depth, academic rigour, and global perspective inside the same programme, often in the same week.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { pct: "50%", tag: "Industry Practitioners", body: "Leaders and entrepreneurs sharing insights from what they are doing right now. Not a decade ago. The thing they are working on today — brought into your classroom this afternoon." },
              { pct: "30%", tag: "Full-Time Faculty", body: "Dedicated educators with PhDs from India's and the world's top institutions. They shape the core curriculum, publish in FT50 and A* journals, and build the intellectual foundation that makes everything stick." },
              { pct: "20%", tag: "Visiting Faculty", body: "Professors from Harvard, Stanford, Wharton, Kellogg, Columbia, NYU, Cornell, BYU, USC, Imperial College London, and Seattle University — bringing global rigour and international perspective to Gurugram." },
            ].map((b) => (
              <div key={b.tag} className="border border-black/10 bg-white p-8">
                <div className="text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.03em]">{b.pct}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.24em] text-black/60" style={{ fontFamily: MONO }}>{b.tag}</div>
                <p className="mt-5 text-[0.98rem] leading-[1.6] text-black/75">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY PRACTITIONERS */}
      <section id="practitioners" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Industry Practitioners</div>
        <h2 className="mt-4 max-w-[24ch] text-balance text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
          The people who teach here are not between jobs. They are active.
        </h2>

        <EditorialGrid
          sectionLabel="Industry Practitioners"
          items={PRACTITIONERS.map((p) => ({
            name: p.name,
            role: p.role,
            blurb: p.blurb,
            img: PRACTITIONER_PHOTOS[p.name],
          }))}
        />


      </section>

      {/* FULL-TIME FACULTY */}
      <section id="full-time" className="border-y border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Full-time Faculty</div>
          <h2 className="mt-4 max-w-[26ch] text-balance text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
            25 PhD faculty. Active researchers. Published in the journals McKinsey and the world&apos;s best B-schools read.
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
            {FULLTIME.map((f) => (
              <div key={f.name} className="group">
                <div className="aspect-square w-full overflow-hidden bg-[#ececec]">
                  {f.img ? (
                    <img
                      src={f.img}
                      alt={f.name}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <Initials name={f.name} />
                  )}
                </div>
                <h3 className="mt-4 text-[0.95rem] font-medium leading-tight text-black">
                  {f.name}
                </h3>
                <div
                  className="mt-1 text-[11px] leading-snug text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {f.note}
                </div>
              </div>
            ))}
          </div>


          <p className="mt-10 max-w-[62ch] text-[1rem] leading-[1.6] text-black/70">
            And 19 more across finance, marketing, operations, organisational behaviour, economics, data science, and strategy.
          </p>

          <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-3">
            {[
              { v: "50+", l: "Research publications in FT50 / A*" },
              { v: "PwC · EY", l: "Active research collaborations" },
              { v: "MU × PwC", l: "Upcoming Centre for Generative AI, DLF Cyberpark" },
            ].map((s) => (
              <div key={s.l} className="bg-white px-5 py-8">
                <div className="text-[clamp(1.4rem,2.4vw,2rem)] leading-none tracking-[-0.02em]">{s.v}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISITING */}
      <section id="visiting" className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Visiting Faculty</div>
        <h2 className="mt-4 max-w-[26ch] text-balance text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
          Professors who teach here because they believe in what Masters&apos; Union is building.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {VISITING.map((v) => (
            <article key={v.name} className="group">
              <div className="aspect-square w-full overflow-hidden bg-[#ececec]">
                {v.img ? (
                  <img
                    src={v.img}
                    alt={v.name}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <Initials name={v.name} />
                )}
              </div>
              <h3 className="mt-4 text-[0.95rem] font-medium leading-tight text-black">
                {v.name}
              </h3>
              <div
                className="mt-1 text-[11px] leading-snug text-black/55"
                style={{ fontFamily: MONO }}
              >
                {v.role}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-black/45" style={{ fontFamily: MONO }}>
                {v.school}
              </div>
            </article>
          ))}
        </div>


        <div className="mt-14 border-l-2 border-black/80 bg-neutral-50 p-8 md:p-10">
          <p className="max-w-[70ch] text-[1.05rem] leading-[1.65] text-black/80">
            <span className="font-medium text-black">Kellogg School of Management</span> — led by Professor Mohanbir Sawhney, one of the world&apos;s foremost authorities on technology strategy and marketing innovation — has brought students to Masters&apos; Union for two consecutive years. <span className="font-medium text-black">Harvard Business School India</span> immersion students have visited campus. When schools like these come here to learn, something is working.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>What students say</div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.a} className="border border-black/10 bg-white p-8">
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
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>Become a Master</div>
            <h2 className="mt-4 max-w-[22ch] text-balance text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
              We&apos;re always looking for practitioners who want to teach what they know.
            </h2>
            <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.6] text-black/70">
              If you have built something, led something, invested in something, or shaped something — and you believe the best way to teach business is to have done it — we want to hear from you.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a href="https://mastersunion.org/become-a-master" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80" style={{ fontFamily: MONO }}>
              Apply to teach <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* THE NUMBER */}
      <section className="border-y border-black/10 bg-black text-white">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: MONO }}>The number that matters</div>
          <div className="mt-8 text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em]">500+</div>
          <p className="mx-auto mt-8 max-w-[52ch] text-[1.1rem] leading-[1.55] text-white/80">
            Masters on the roster. 50% of them active industry practitioners who were in a meeting this morning before they came to teach you this afternoon.
          </p>
          <p className="mx-auto mt-6 max-w-[52ch] text-[0.95rem] italic text-white/60">
            That is not a teaching philosophy. It is a hiring policy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <p className="text-balance text-[clamp(1.4rem,3vw,2.4rem)] italic leading-[1.2] text-black/90">
          Learn from the people doing it — not just studying it.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
