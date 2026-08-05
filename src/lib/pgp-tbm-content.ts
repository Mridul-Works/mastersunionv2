// Content for the PGP TBM editorial programme layout.
// Shapes mirror the reference "Program Layout - PG" site-config so the ported
// section components stay pixel-faithful; every value here is existing
// PGP TBM page content.

import vJustMyRoots from "@/assets/venture-logos/JustMyRoots.png.asset.json";
import vHiveschool from "@/assets/venture-logos/Hiveschool.png.asset.json";
import vPlaysuper from "@/assets/venture-logos/Playsuper.png.asset.json";
import vSeedsAI from "@/assets/venture-logos/SeedsAI.png.asset.json";
import vStartt from "@/assets/venture-logos/Startt.png.asset.json";
import vPixel from "@/assets/venture-logos/Pixel.png.asset.json";
import vYango from "@/assets/venture-logos/Yango.png.asset.json";
import vEight from "@/assets/venture-logos/EIGHT.png.asset.json";
import vGuardex from "@/assets/venture-logos/Guardex.png.asset.json";
import vTrueBrands from "@/assets/venture-logos/TrueBrandsIndia.png.asset.json";
import vVinyasa from "@/assets/venture-logos/Vinyasa.png.asset.json";
import vShrnm from "@/assets/venture-logos/Shrnm.png.asset.json";

import rMckinsey from "@/assets/recruiter-logos/McKinsey.png.asset.json";
import rBain from "@/assets/recruiter-logos/Bain.png.asset.json";
import rBcg from "@/assets/recruiter-logos/BCG.png.asset.json";
import rAccenture from "@/assets/recruiter-logos/Accenture.png.asset.json";
import rGoogle from "@/assets/recruiter-logos/Google.png.asset.json";
import rMeta from "@/assets/recruiter-logos/Meta.png.asset.json";
import rMicrosoft from "@/assets/recruiter-logos/Microsoft.png.asset.json";
import rFlipkart from "@/assets/recruiter-logos/Flipkart.png.asset.json";
import rZomato from "@/assets/recruiter-logos/Zomato.png.asset.json";
import rRazorpay from "@/assets/recruiter-logos/Razorpay.png.asset.json";
import rCred from "@/assets/recruiter-logos/Cred.png.asset.json";
import rIcici from "@/assets/recruiter-logos/ICICI.png.asset.json";

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

import nseLogo from "@/assets/bharat-logos/nse.png.asset.json";
import bseLogo from "@/assets/bharat-logos/bse.png.asset.json";
import infosysLogo from "@/assets/bharat-logos/infosys.png.asset.json";
import itcLogo from "@/assets/bharat-logos/itc.png.asset.json";
import godrejLogo from "@/assets/bharat-logos/godrej.png.asset.json";
import adaniPortsLogo from "@/assets/bharat-logos/adani-ports.png.asset.json";
import amulLogo from "@/assets/bharat-logos/amul.png.asset.json";
import zeptoLogo from "@/assets/bharat-logos/zepto.png.asset.json";
import zerodhaLogo from "@/assets/bharat-logos/zerodha.png.asset.json";
import credLogo from "@/assets/bharat-logos/cred.png.asset.json";

import facultyFaverie from "@/assets/faculty/faverie.png.asset.json";
import facultyDaniel from "@/assets/faculty/daniel.png.asset.json";
import facultyManoj from "@/assets/faculty/manoj.png.asset.json";
import facultyZal from "@/assets/faculty/zal.png.asset.json";
import facultyNandini from "@/assets/faculty/nandini.png.asset.json";
import facultyBhupesh from "@/assets/faculty/bhupesh.png.asset.json";

export type LogoRef = { name: string; src: string };

export const pgpApplicationWindow = {
  isLive: true,
  round: "Round 4",
  cohort: "Cohort Aug '26",
  deadline: "Rolling rounds until the cohort fills",
  note: "Earlier rounds get first pick of seats and scholarships.",
};

export const pgpHero = {
  badge: "Round 4 admissions open",
  accreditation: "Accredited by EFMD & AACSB",
  kicker: "PGP · Technology & Business Management",
  title: ["Learn business", "by running one."],
  body:
    "16 months at Masters' Union structured around three engines — InClass fundamentals, OutClass live ventures and Immersions on the ground. Graded on outcomes measured in the open market.",
  primary: { label: "Start application", href: "#admissions" },
  secondary: { label: "See the model", href: "#curriculum" },
  panel: {
    title: "Programme snapshot",
    rows: [
      { label: "Duration", value: "16 months · 8 terms" },
      { label: "Format", value: "Full-time, on campus" },
      { label: "Campus", value: "DLF Cyber Park, Gurugram" },
      { label: "Next intake", value: "Round 4 · Aug '26" },
    ],
  },
  stats: [
    { value: "16", label: "Months" },
    { value: "₹34.6L", label: "Median CTC" },
    { value: "200+", label: "Startups founded" },
    { value: "145+", label: "Recruiters" },
  ],
};

export const pgpCurriculum = {
  eyebrow: "/ 01 — Curriculum",
  title: ["Eight terms, three engines running", "in parallel"],
  body:
    "Every term runs InClass fundamentals alongside live OutClass ventures and on-ground Immersions. Every course, challenge and trip is graded on a real deliverable.",
  years: [
    {
      id: "Term 1",
      label: "01",
      theme: "Fundamentals · Finance · Sales",
      window: "Months 1–2 · Aug – Sep '26",
      subjects: [
        {
          title: "InClass — Finance · Sales",
          question: "How do you read a business before you try to run one?",
          lessons: [
            "Read financial statements",
            "Value a business",
            "Raise capital",
            "GTM funnels · CRO · brand psychology",
          ],
        },
        {
          title: "OutClass — D2C dropshipping launch",
          question: "Can you get a real customer to pay you in your first term?",
          lessons: [
            "Source, list & sell on Amazon, Blinkit and own store",
            "Pricing and contribution margin",
            "Offline fair with 1,000+ footfall",
          ],
        },
      ],
    },
    {
      id: "Term 2",
      label: "02",
      theme: "GTM · Product mindset · LLMs",
      window: "Months 3–4 · Oct – Nov '26",
      subjects: [
        {
          title: "InClass — Strategy · Product",
          question: "How do you analyse a market and pick where to play?",
          lessons: ["Analyse markets", "KPIs & unit metrics", "Game theory", "Prompt engineering & LLMs"],
        },
        {
          title: "OutClass — D2C marketing hackathon",
          question: "What actually moves a conversion rate in a week?",
          lessons: ["Performance marketing sprint", "Creative testing", "Channel economics"],
        },
        {
          title: "OutClass — Creator Challenge kickoff",
          question: "Can you build an audience from zero, in public?",
          lessons: ["Pick a niche", "Script, film, release weekly", "Retention analysis"],
        },
      ],
    },
    {
      id: "Term 3",
      label: "03",
      theme: "Storytelling · Banking · No-code",
      window: "Months 5–6 · Dec '26 – Jan '27",
      subjects: [
        {
          title: "InClass — Marketing · Comms",
          question: "How does a business get believed before it gets bought?",
          lessons: ["Persuasive writing", "Speaking & storytelling", "Banking fundamentals", "No-code apps"],
        },
        {
          title: "OutClass — In-the-wild consulting",
          question: "Can you grow someone else's revenue with your own hands?",
          lessons: ["Revenue growth for real SMEs", "Diagnosis to intervention", "Client reporting"],
        },
        {
          title: "OutClass — Creator brand",
          question: "What makes a channel recognisable in three seconds?",
          lessons: ["Voice, tone, identity", "YouTube + Instagram release", "Format design"],
        },
      ],
    },
    {
      id: "Term 4",
      label: "04",
      theme: "Valuation · UI/UX · Crisis management",
      window: "Months 7–8 · Feb – Mar '27",
      subjects: [
        {
          title: "InClass — AI/ML · Product",
          question: "How do you build a product people return to?",
          lessons: ["Valuation", "UI/UX", "AI-powered products", "Crisis management"],
        },
        {
          title: "OutClass — MVP debut",
          question: "What survives contact with real users?",
          lessons: ["Ship the MVP", "Instrument the funnel", "Iterate on evidence"],
        },
        {
          title: "Immersion — Global",
          question: "How do operators build at global scale?",
          lessons: [
            "Fortune 500 HQs — Silicon Valley, Dubai, Singapore, London",
            "Sessions at partner B-schools",
            "On-ground company visits",
          ],
        },
      ],
    },
    {
      id: "Term 5",
      label: "05",
      theme: "Models · Analytics · B2B",
      window: "Months 9–10 · Apr – May '27",
      subjects: [
        {
          title: "InClass — Finance · Strategy",
          question: "How do you defend a number in front of people who fund them?",
          lessons: ["Financial models", "Analytics & dashboards", "B2B sales motion"],
        },
        {
          title: "OutClass — GTM challenge",
          question: "How do you take a live consumer product to market?",
          lessons: ["Design a full go-to-market", "Channel selection", "Launch execution"],
        },
        {
          title: "Immersion — Bharat",
          question: "What does the market 90% of India buys from actually look like?",
          lessons: [
            "12+ cities across Bharat",
            "Factory floors, family businesses, agri-clusters",
            "100+ SMEs and founders met on ground",
          ],
        },
      ],
    },
    {
      id: "Term 6",
      label: "06",
      theme: "Pricing · PE/VC · Copy",
      window: "Months 11–12 · Jun – Jul '27",
      subjects: [
        {
          title: "InClass — Sales · AI/ML",
          question: "What is the price a customer will actually pay?",
          lessons: ["Pricing strategy", "PE/VC structures", "Copywriting", "Applied ML"],
        },
        {
          title: "OutClass — Product-market fit",
          question: "Why do customers stay?",
          lessons: ["Lower CAC", "Prove retention", "Cohort analysis"],
        },
        {
          title: "OutClass — Creator monetisation",
          question: "When does an audience become a business?",
          lessons: ["Brand deals", "Sponsorships", "Own products"],
        },
      ],
    },
    {
      id: "Term 7",
      label: "07",
      theme: "IPOs · IP law · ML",
      window: "Months 13–14 · Aug – Sep '27",
      subjects: [
        {
          title: "InClass — Product · Liberal Arts",
          question: "How does capital get raised, and what does it cost you?",
          lessons: ["IPOs & public markets", "IP law", "Machine learning", "Geopolitics & economies"],
        },
        {
          title: "OutClass — Raise a seed fund",
          question: "Can you run capital, not just ask for it?",
          lessons: ["Thesis & diligence", "Term sheets", "Portfolio construction"],
        },
      ],
    },
    {
      id: "Term 8",
      label: "08",
      theme: "DeFi · Risk · Compliance",
      window: "Months 15–16 · Oct – Nov '27",
      subjects: [
        {
          title: "InClass — Finance · Comms",
          question: "How do you run a business that regulators and markets trust?",
          lessons: ["DeFi", "Risk management", "Compliance", "Executive communication"],
        },
        {
          title: "OutClass — One-Day Profit challenge",
          question: "Can you turn a profit in a single day, from scratch?",
          lessons: ["Influencer + artisan collaborations", "Live retail execution", "P&L on the day"],
        },
      ],
    },
  ],
};

export const pgpOutClass = {
  eyebrow: "/ 02 — OutClass",
  title: ["Live ventures graded on real customers,", "not slides"],
  body:
    "Two OutClass tracks run alongside the curriculum for the length of the programme — a live D2C brand and a personal creator brand, both measured in the open market.",
  tracks: [
    {
      tag: "OutClass · Runs across terms",
      title: "Build a D2C Brand",
      body:
        "Every student ships a live consumer brand — sourced, launched and scaled on Amazon, Blinkit, Instagram and their own store. Graded on real customers and real revenue, not slides.",
      arc: [
        { t: "T1", h: "Launch", d: "Source, list & sell on Amazon, Blinkit and own store" },
        { t: "T1", h: "Offline fair", d: "1,000+ footfall single-day retail push" },
        { t: "T3", h: "Scale", d: "In-the-Wild consulting: revenue growth for real SMEs" },
        { t: "T5", h: "GTM", d: "Design a full go-to-market for a live consumer product" },
        { t: "T6", h: "PMF", d: "Lower CAC, prove why customers stay" },
        { t: "T8", h: "Profit", d: "One-Day Profit challenge with influencers + artisans" },
      ],
      stats: [
        { k: "₹10L+", v: "Avg. GMV / student team" },
        { k: "180+", v: "Brands launched to date" },
        { k: "1,000+", v: "Footfall at the offline fair" },
      ],
    },
    {
      tag: "OutClass · Runs across terms",
      title: "Creator Challenge",
      body:
        "From Term 2, every student builds a personal brand on YouTube, Instagram or LinkedIn — scripting, filming, editing and distributing weekly. Graded on real audience growth in the wild.",
      arc: [
        { t: "T2", h: "Kickoff", d: "Pick a niche, script, film, release weekly" },
        { t: "T3", h: "Brand", d: "Voice, tone, identity · YouTube + Instagram release" },
        { t: "T4", h: "Community", d: "Build a community around your idea" },
        { t: "T5", h: "Distribution", d: "Decode social algorithms · scale reach" },
        { t: "T6", h: "Monetise", d: "Brand deals · sponsorships · own products" },
      ],
      stats: [
        { k: "50M+", v: "Cumulative views generated" },
        { k: "2.5M+", v: "Followers built by past cohorts" },
        { k: "40+", v: "Creators past 100k followers" },
      ],
    },
  ],
};

export const pgpImmersions = {
  eyebrow: "/ 03 — Immersions",
  title: ["Terms that happen on the ground,", "not in a classroom"],
  body:
    "Two on-ground modules slot into the middle terms — one global, one deep inside Bharat — so the market is studied where it actually trades.",
  tracks: [
    {
      tag: "Runs in mid-terms",
      title: "Global Immersion",
      body:
        "A full on-ground module at Fortune 500 HQs and top B-schools — Silicon Valley, Dubai, Singapore, London — meeting operators building at global scale.",
      stats: [
        { k: "5+", v: "Countries hosted to date" },
        { k: "40+", v: "Fortune 500 offices visited" },
        { k: "12", v: "Partner B-schools" },
      ],
      partners: [
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
      ] as LogoRef[],
    },
    {
      tag: "Runs in mid-terms",
      title: "Bharat Immersion",
      body:
        "A deep dive into Tier-2 & Tier-3 India — factory floors, family businesses, agri-clusters and D2C hubs. See the market 90% of India actually buys from.",
      stats: [
        { k: "12+", v: "Cities across Bharat" },
        { k: "100+", v: "SMEs & founders met on ground" },
        { k: "6", v: "Sectors covered per cohort" },
      ],
      partners: [
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
      ] as LogoRef[],
    },
  ],
};

export const pgpCareer = {
  eyebrow: "/ 04 — Careers",
  title: ["Outcomes measured in offers,", "not attendance"],
  body:
    "The Class of 2025 closed a ₹34.6 LPA median with 500+ recruiters on campus across product, strategy, finance and AI roles.",
  headline: [
    { k: "₹34.6 LPA", v: "Median CTC · Class of 2025" },
    { k: "₹1.2 Cr", v: "Highest domestic offer" },
    { k: "500+", v: "Recruiters on campus" },
  ],
  roles: [
    { role: "Product & Growth", pct: "28%" },
    { role: "Strategy & Consulting", pct: "22%" },
    { role: "Founder / Own venture", pct: "18%" },
    { role: "Finance & Investing", pct: "17%" },
    { role: "Tech & AI", pct: "15%" },
  ],
  recruiters: [
    { name: "McKinsey", src: rMckinsey.url },
    { name: "Bain", src: rBain.url },
    { name: "BCG", src: rBcg.url },
    { name: "Accenture", src: rAccenture.url },
    { name: "Google", src: rGoogle.url },
    { name: "Meta", src: rMeta.url },
    { name: "Microsoft", src: rMicrosoft.url },
    { name: "Flipkart", src: rFlipkart.url },
    { name: "Zomato", src: rZomato.url },
    { name: "Razorpay", src: rRazorpay.url },
    { name: "Cred", src: rCred.url },
    { name: "ICICI", src: rIcici.url },
  ] as LogoRef[],
  footnote: "A representative sample of the 500+ recruiters that hire from campus each year.",
};

export const pgpEntrepreneurship = {
  eyebrow: "/ 05 — Ventures",
  title: ["Companies that start on campus", "and keep trading after"],
  body:
    "Students who choose to build get capital, mentors and customers while they are still studying — 200+ ventures have been founded on campus so far.",
  stats: [
    { k: "200+", v: "Startups founded on campus" },
    { k: "₹60 Cr+", v: "Funding raised by student ventures" },
    { k: "35+", v: "Ventures with paying customers" },
    { k: "180+", v: "D2C brands launched in OutClass" },
  ],
  support: [
    {
      title: "Capital while you study",
      body: "Student ventures have raised ₹60 Cr+ to date, with investor access built into the programme calendar.",
    },
    {
      title: "Operator mentors on call",
      body: "40% of faculty are sitting founders, CEOs and operators who review ventures the way investors do.",
    },
    {
      title: "Customers from day one",
      body: "OutClass sends every venture into the open market — Amazon, Blinkit, Instagram and offline retail fairs.",
    },
  ],
  ventures: [
    { name: "JustMyRoots", src: vJustMyRoots.url },
    { name: "Hiveschool", src: vHiveschool.url },
    { name: "Playsuper", src: vPlaysuper.url },
    { name: "SeedsAI", src: vSeedsAI.url },
    { name: "Startt", src: vStartt.url },
    { name: "Pixel", src: vPixel.url },
    { name: "Yango", src: vYango.url },
    { name: "EIGHT", src: vEight.url },
    { name: "Guardex", src: vGuardex.url },
    { name: "TrueBrands India", src: vTrueBrands.url },
    { name: "Vinyasa", src: vVinyasa.url },
    { name: "Shrnm", src: vShrnm.url },
  ] as LogoRef[],
};

export const pgpFaculty = {
  eyebrow: "/ 06 — The People",
  title: ["You learn from operators", "— not only lecturers"],
  pillars: [
    { stat: "150+", title: "Courses", body: "150+ courses across 7 InClass modules, from finance to AI to liberal arts." },
    { stat: "40%", title: "Operators", body: "40% of faculty are sitting founders, CEOs and operators teaching live playbooks." },
    { stat: "0", title: "Rote exams", body: "No rote exams. Every course is graded on a deliverable that leaves the classroom." },
  ],
  tracks: [
    { name: "Finance & Fintech", eg: "Read financial statements · Value a business · Raise capital" },
    { name: "Sales & Marketing", eg: "GTM funnels · CRO · Brand psychology · D2C" },
    { name: "Management & Strategy", eg: "Analyse markets · KPIs · Game theory" },
    { name: "Product & Tech", eg: "Code · No-code apps · UI/UX · Dashboards" },
    { name: "AI & ML", eg: "Prompt engineering · LLMs · AI-powered products" },
    { name: "Communication", eg: "Persuasive writing · Speaking · Storytelling" },
    { name: "Liberal Arts", eg: "Geopolitics · Economies · Philosophy" },
  ],
  people: [
    {
      name: "Kunal Shah",
      role: "Founder, CRED",
      note: "Consumer Behaviour",
      image: facultyFaverie.url,
    },
    {
      name: "Deepinder Goyal",
      role: "Founder, Zomato",
      note: "Building at Scale",
      image: facultyDaniel.url,
    },
    {
      name: "Nithin Kamath",
      role: "Founder, Zerodha",
      note: "Capital Markets",
      image: facultyManoj.url,
    },
    {
      name: "Ronnie Screwvala",
      role: "Founder, upGrad · UTV",
      note: "Media & Ventures",
      image: facultyZal.url,
    },
    {
      name: "Radhika Gupta",
      role: "CEO, Edelweiss AMC",
      note: "Asset Management",
      image: facultyNandini.url,
    },
    {
      name: "Anand Chandrasekaran",
      role: "GM, Meta",
      note: "Product Leadership",
      image: facultyBhupesh.url,
    },
  ],
};

export const pgpApplication = {
  eyebrow: "/ 07 — Admissions",
  title: ["Four steps from application", "to offer"],
  body:
    "Admission runs on an aptitude assessment and an operator-led interview, in rolling rounds until the cohort fills. CAT and GMAT scores are optional.",
  ctaLabel: "Start your application",
  ctaHref: "https://apply.mastersunion.org",
  steps: [
    {
      step: "01",
      title: "Complete the Application Form",
      summary:
        "Fill out your details and upload supporting documents so the admissions team can review your profile.",
      points: [
        "Latest resume — any clean, concise format works",
        "Qualification documents covering academics, work and extra-curriculars",
        "Optional: upload your CAT / GMAT / GMAT Focus score",
      ],
    },
    {
      step: "02",
      title: "MU-BAAT",
      summary:
        "The Masters' Union Business Aptitude & Admissions Test — an online, recorded conversation that evaluates business aptitude, clarity of thought and creative thinking.",
      points: [
        "45–60 minutes · 9 questions across 5 sections",
        "Only required if you haven't submitted a CAT / GMAT score you're happy with",
        "Test link is shared the day after the application deadline",
      ],
    },
    {
      step: "03",
      title: "Personal Interview",
      summary:
        "Shortlisted applicants are invited to an interview conducted by distinguished faculty members and seasoned industry leaders.",
      points: [
        "Invitations sent 3–5 days before the interview",
        "Faculty + operator panel evaluation",
        "Date, venue and time confirmed in advance",
      ],
    },
    {
      step: "04",
      title: "Final Admission Decision",
      summary:
        "The admissions committee slots applicants into accepted, waitlisted or not-accepted pools.",
      points: [
        "Offers include the full financial structure for the programme",
        "Waitlisted candidates are promoted on a rolling basis — no ranked list",
        "Not-accepted applicants may re-apply in the next academic year",
      ],
    },
  ],
};

export const pgpFaq = {
  eyebrow: "/ 08 — FAQs",
  title: ["Questions applicants", "ask us most"],
  items: [
    {
      q: "How is the 16 months actually structured?",
      a: "Three engines run in parallel every term: InClass (7 tracks of fundamentals), OutClass (a live D2C brand + a Creator Challenge that both run across terms) and Immersions (Global + Bharat modules in the middle terms). Every course, challenge and trip is graded on a real deliverable.",
    },
    {
      q: "Do all students do the D2C and Creator challenges?",
      a: "Yes. Both are mandatory OutClass tracks. The D2C brand starts Term 1; the Creator Challenge kicks in from Term 2 and runs alongside curriculum through Term 6.",
    },
    {
      q: "Are immersions mandatory?",
      a: "Global and Bharat immersions are opt-in. Most students opt into at least one; many opt into both. Immersions slot into Terms 4 and 5.",
    },
    {
      q: "How is this different from a traditional MBA?",
      a: "You don't submit case-study essays. You launch real ventures, ship real products and manage real money. 40% of faculty are sitting CEOs, founders and operators — not just professors.",
    },
    {
      q: "Do I need CAT or GMAT?",
      a: "No. Admission is via our own aptitude assessment and an operator-led interview, in rolling rounds until the cohort fills.",
    },
  ],
};
