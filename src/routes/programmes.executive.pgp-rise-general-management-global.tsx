import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP Rise: General Management (Global)",
  shortName: "Rise Global",
  tagline:
    "A 12-month online general management programme for senior professionals with 5+ years of experience — four terms, three global immersions across Dubai, INSEAD France, and the GCC, and a live venture track ending in a VC pitch.",
  duration: "12 months, incl. immersions",
  mode: "Online + 3 global immersions",
  commencement: "Rolling cohorts",
  intro:
    "The global edition of PGP Rise — built for working professionals with a minimum of five years' experience who want international exposure without pausing their career. Every term ends in something built, pitched, or funded.",
  whyNow: [
    "Fees: ₹82,600 admission + ₹21,12,200 tuition + ₹1,29,800 lifelong Union membership = ₹23,24,600 (current cohort tables may list tuition at ₹28,48,160 + GST).",
    "Three global immersions — Dubai orientation, INSEAD in France, and Fortune 500 and startup visits across the GCC — put the cohort in front of international faculty, C-suite operators, and founders.",
  ],
  edge: [
    {
      title: "INSEAD and global HQ access",
      body: "Sessions with INSEAD's world-class faculty in France plus visits to headquarters of companies like Louis Vuitton and Schneider Electric.",
    },
    {
      title: "GCC Fortune 500 immersion",
      body: "Exclusive access to companies such as Emirates, Aramco, Talabat, and DU Mobile — corporate office visits and direct C-suite interaction.",
    },
    {
      title: "Global faculty bench",
      body: "NASA's former Chief Knowledge Officer, professors from Purdue, NYU Shanghai, USC and BYU Marriott, alongside Morgan Stanley, PayPal, Accenture and Zomato operators.",
    },
    {
      title: "Lifelong Union membership",
      body: "MasterCamp programmes across marketing, creatorpreneurship and UX design, the Masters' Union Vault digital library, and continuing access to MU events and workshops.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Foundations & First Venture",
      summary:
        "Financial literacy, brand-building, and personal presence — tested immediately by a live dropshipping venture.",
      outcomes: ["ORIENTATION", "DROPSHIPPING CHALLENGE", "ADVANCED EXCEL"],
      courses: [
        "Finance: reading financial statements, allocating budgets and controlling costs",
        "Sales & Marketing: building a digital strategy, building a brand",
        "Leadership: inspiring speeches, personal brand, mental models for problem solving",
        "Product & Technology: using data to make decisions",
        "Tool Training: advanced Excel · Career Prep: crafting a winning resume",
      ],
      challenge: {
        name: "Orientation + Dropshipping Challenge",
        description:
          "Intensive workshops and networking to open the programme, then design a website, launch marketing campaigns, streamline supply chain, and compete for maximum revenue.",
      },
    },
    {
      n: 2,
      title: "Growth, Ventures & Global Immersion",
      summary:
        "From personal skill-building to venture-building, anchored by a global immersion with international faculty and companies.",
      outcomes: ["VIP PRE-SEED PITCH", "GLOBAL IMMERSION", "GROWTH-LED PRODUCT DESIGN"],
      courses: [
        "Finance: building & evaluating financial models, leveraging DeFi and crypto",
        "Sales & Marketing: decoding consumers in the age of AI, constructing a GTM strategy",
        "Leadership: influence, vision & mission-driven leadership, competitive strategy",
        "Product & Technology: AI-powered products, building growth into your product",
        "Tool Training: Power BI · Career Prep: an attractive LinkedIn profile",
      ],
      challenge: {
        name: "VIP: Pre-Seed + Global Immersion",
        description:
          "Find your dream team, brainstorm bold ideas, and pitch to industry experts who will shape your startup's foundation — alongside industrial visits, workshops and B-school classes abroad.",
      },
    },
    {
      n: 3,
      title: "Prototype, Consulting & Second Immersion",
      summary:
        "A working prototype forced into existence — via the VIP venture's MVP or a consulting-style engagement — validated by practitioners.",
      outcomes: ["VIP MVP / CONSULTING GARAGE", "SECOND GLOBAL IMMERSION", "FIGMA UI/UX"],
      courses: [
        "Finance: judging P&L performance, structuring successful M&A",
        "Sales & Marketing: selling without selling, product-led growth using Nudge theory",
        "Leadership: KPIs and incentives, effective meetings, applied economic theory",
        "Product & Technology: building habit-forming products",
        "Tool Training: UI/UX in Figma · Career Prep: a compelling personal portfolio",
      ],
      challenge: {
        name: "VIP: MVP / Consulting Garage",
        description:
          "Build it, pitch it, perfect it — present your prototype to a panel of industry experts and product managers, backed by a second round of global industrial visits and B-school workshops.",
      },
    },
    {
      n: 4,
      title: "Funding, GCC Immersion & Final Round",
      summary:
        "The proof point — a real funding pitch to real VCs, backed by a GCC industry immersion.",
      outcomes: ["VC SEED FUND PITCH", "GCC INDUSTRY IMMERSION", "FINAL ROUND / CREATOR CHALLENGE"],
      courses: [
        "Finance: international finance, raising debt & equity capital",
        "Sales & Marketing: business research, motivating and incentivising sales teams",
        "Leadership: body language and executive presence, productivity and getting things done",
        "Product & Technology: leveraging neuroscience in business",
        "Tool Training: Canva presentations · Career Prep: interview preparation",
      ],
      challenge: {
        name: "Raising-the-Seed-Fund Challenge",
        description:
          "Present startup ideas to VCs Shark Tank style to raise funding against equity, with a GCC industry immersion including corporate visits and C-suite interactions — closing with the VIP Final Seed Round or the Creators' Challenge.",
      },
    },
  ],
  faculty: [
    { name: "Dr. Edward W. Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Freda Liu", role: "Personal Branding Coach", org: "30+ years" },
    { name: "Shad Morris", role: "Executive Director", org: "BYU Marriott School of Business" },
    { name: "Kevyn Eva Norton", role: "Product Lead", org: "Easy Bites App" },
    { name: "Zal Phiroz", role: "Partner", org: "Pier Consulting Group" },
    { name: "Benjamin Dunford", role: "Professor of Management", org: "Purdue University" },
    { name: "Christian Farioli", role: "CEO", org: "ESD Dubai" },
    { name: "Lan Ma", role: "Adjunct Professor of Business", org: "NYU Shanghai" },
    { name: "Alireza Kabirian", role: "Associate Professor", org: "University of Southern California" },
    { name: "Rajat Mathur", role: "MD", org: "Morgan Stanley" },
    { name: "Malthi S. S.", role: "Former Director of Product Management", org: "PayPal" },
    { name: "Subhonil Ghoshal", role: "Former MD", org: "Accenture" },
    { name: "Srinivasan Satyamurthy", role: "Head, Loyalty & Subscription", org: "Swiggy" },
    { name: "Jishnu Changkakoti", role: "Former Director, Marketing", org: "Samsung" },
    { name: "Saurabh Sengupta", role: "Former SVP, Sales", org: "Zomato" },
    { name: "Dr. Bhupesh Manoharan", role: "PhD", org: "IIM Calcutta" },
    { name: "Dr. Garima Chaklader", role: "PhD", org: "IIM Bangalore" },
  ],
  immersions: [
    "INSEAD (France) — world-class faculty plus HQ visits to companies like Louis Vuitton and Schneider Electric",
    "Orientation in Dubai — kickstart the 12-month journey with peers, faculty, and industry leaders",
    "GCC region — Fortune 500 and startup visits including Emirates, Aramco, Talabat, and DU Mobile",
    "Startup Weekend, Creator Challenge, and Cross-Cultural Business Insights coaching run alongside the terms",
  ],
  jobRoles: [
    "General Manager",
    "Regional / Country Head",
    "Business Unit Leader",
    "Global Product Manager",
    "Strategy Director",
    "Growth & GTM Lead",
    "Founder / Venture Builder",
    "Consulting Principal",
  ],
};

export const Route = createFileRoute("/programmes/executive/pgp-rise-general-management-global")({
  head: () => ({
    meta: [
      { title: "PGP Rise: General Management (Global) — Masters' Union" },
      {
        name: "description",
        content:
          "A 12-month online general management programme with immersions at INSEAD France, Dubai, and the GCC — for professionals with 5+ years of experience.",
      },
      { property: "og:title", content: "PGP Rise: General Management (Global) — Masters' Union" },
      {
        property: "og:description",
        content:
          "Four terms, three global immersions, a live venture track ending in a VC pitch, and lifelong Union membership.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
