import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "UG in Technology & Business Management",
  shortName: "UG TBM",
  tagline:
    "A four-year undergraduate degree built around three consecutive builds — a ₹1Cr+ D2C brand, a 100K+ creator channel, and a funded startup pitched to 150+ investors.",
  duration: "4 Years (incl. 1 year industry training)",
  mode: "Full-Time, Opt-in Residential — Gurugram",
  commencement: "Aug '26",
  intro:
    "Open to Class XII current students and pass-outs. The programme compresses three distinct business disciplines — e-commerce, media, and venture-building — into three consecutive years, each ending in a real, measurable outcome rather than a grade.",
  whyNow: [
    "Undergraduate business education in India still ends in a transcript. This one ends in revenue, an audience, and a cap table — outcomes that recruiters and investors can verify.",
    "Every year has a single build: sell online in Year 1, build a media audience in Year 2, and raise for a startup in Year 3. Year 4 is industry training with a company.",
    "Faculty are operators — CEOs, Finance Secretaries, NASA and Morgan Stanley leadership — teaching alongside professors from NYU, Harvard, Cornell and Columbia.",
  ],
  edge: [
    {
      title: "₹1Cr+ in dropshipping revenue before Year 2",
      body: "Students build a real D2C brand from scratch — sourcing, ads, fulfilment, and margins — and cross ₹1Cr+ in revenue before the first year ends.",
    },
    {
      title: "100K+ followers as a creator-preneur",
      body: "Year 2 builds a content channel from zero: content strategy, distribution, and monetisation, taken to a real audience of 100K+ on YouTube or Instagram.",
    },
    {
      title: "150+ investor pitches in Year 3",
      body: "Identify a market opportunity, build a startup, generate revenue, and pitch to a room of over 150 investors — with the option to keep building after graduation.",
    },
    {
      title: "Dual degrees and global campuses",
      body: "Semester or summer abroad at Harvard, UC Berkeley, NUS, Imperial, Babson, or SDA Bocconi; dual degree pathways at Illinois Tech (Chicago) or Griffith University (Australia).",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Year 1 — Start a D2C Brand",
      summary:
        "Build a dropshipping business end-to-end and cross ₹1Cr+ in revenue before the first year ends — real budgets, real customers, real fulfilment.",
      outcomes: ["₹1CR+ DROPSHIPPING REVENUE", "PERFORMANCE MARKETING", "SUPPLY & FULFILMENT", "UNIT ECONOMICS"],
      courses: [
        "Business fundamentals and financial literacy",
        "Sourcing, catalogue, and fulfilment operations",
        "Performance marketing across Meta and Google",
        "Pricing, margins, and contribution economics",
        "Industry immersions — factory floors and startup offices",
      ],
      challenge: {
        name: "The Dropshipping Challenge",
        description:
          "Launch and run a real online brand with live inventory, paid acquisition, and customer service — and take it past ₹1Cr+ in revenue inside the first year.",
      },
    },
    {
      n: 2,
      title: "Year 2 — Become a Creator-preneur",
      summary:
        "Build a content channel from zero, master content strategy, and grow a real audience to 100K+ followers on YouTube or Instagram.",
      outcomes: ["100K+ FOLLOWING", "CONTENT STRATEGY", "AUDIENCE DISTRIBUTION", "BRAND MONETISATION"],
      courses: [
        "Content strategy and audience positioning",
        "Production: camera, editing, and story structure",
        "Platform algorithms and distribution mechanics",
        "Creator monetisation: brand deals and products",
        "Global immersion — Japan, Europe, Singapore, UAE, or South Korea",
      ],
      challenge: {
        name: "The Creator Challenge",
        description:
          "Grow a channel from zero to 100K+ followers with a documented content system — publishing cadence, retention analysis, and a monetisation plan.",
      },
    },
    {
      n: 3,
      title: "Year 3 — Build Your Own Startup",
      summary:
        "Identify a market opportunity, build a startup, generate revenue, and pitch to 150+ investors.",
      outcomes: ["150+ INVESTOR PITCHES", "MVP TO REVENUE", "FUNDRAISE READINESS", "VENTURE THESIS"],
      courses: [
        "Opportunity identification and market sizing",
        "MVP build, pricing, and first customers",
        "Fundraising: cap tables, terms, and diligence",
        "Investor storytelling and pitch craft",
        "Bharat Immersion — 20+ cities across India",
      ],
      challenge: {
        name: "The Startup Challenge",
        description:
          "Build a venture with paying customers and pitch it to a network of 150+ investors — Chandni Chowk markets to Adani, Lenskart, Meesho, ITC and Amul inform the thesis.",
      },
    },
    {
      n: 4,
      title: "Year 4 — Industry Training & Global Pathways",
      summary:
        "A full year inside a company, a partner campus, or a dual-degree track abroad.",
      outcomes: ["1-YEAR INDUSTRY TRAINING", "SEMESTER ABROAD", "DUAL DEGREE", "PGP PATHWAYS"],
      courses: [
        "Year-long industry training with a partner company",
        "Summer or semester abroad — Harvard, UC Berkeley, NUS, Imperial, Babson, SDA Bocconi",
        "Dual degree at Illinois Institute of Technology, Chicago",
        "Dual degree at Griffith University, Australia",
      ],
      challenge: {
        name: "Industry Training Year",
        description:
          "Spend a year embedded in a real company — or convert the pathway into a dual degree abroad and graduate with two credentials.",
      },
    },
  ],
  faculty: [
    { name: "Manoj Kohli", role: "Former CEO & MD", org: "Airtel" },
    { name: "Vivek Gambhir", role: "Former CEO", org: "boAt" },
    { name: "Dr Arvind Mayaram", role: "Former Finance Secretary", org: "Government of India" },
    { name: "Monica Jasuja", role: "Former Head", org: "Mastercard" },
    { name: "Nitin Gaur", role: "Former Director", org: "IBM" },
    { name: "Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Rohit Kapoor", role: "CEO", org: "Swiggy" },
    { name: "Dr Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Saurabh Sengupta", role: "Former VP", org: "Zomato" },
    { name: "Dr Lan Ma", role: "Adjunct Professor of Business", org: "NYU" },
    { name: "Daniel G Van Der Vliet", role: "Executive Director", org: "Cornell" },
    { name: "Barkha Dutt", role: "Former Editor", org: "NDTV" },
    { name: "Meenakshi Rishi", role: "Professor of Economics", org: "Seattle University" },
    { name: "Dr Shad Morris", role: "Executive Director", org: "BYU" },
    { name: "Rajat Mathur", role: "Former MD", org: "Morgan Stanley" },
    { name: "Raghu Raman", role: "Former President", org: "Reliance" },
    { name: "Dr Zal Phiroz", role: "Adjunct Professor", org: "Harvard" },
    { name: "Rajat Baijal", role: "Adjunct Professor", org: "Columbia" },
    { name: "Dr Alireza Kabirian", role: "Professor of Data Sciences", org: "USC" },
    { name: "Rachel Konrad", role: "Former Director of Communications", org: "Tesla" },
  ],
  immersions: [
    "Industry immersions (1-2 days) — factory floors and startup offices",
    "Global immersions (1-2 weeks) — Japan, Europe, Singapore, UAE, South Korea",
    "Bharat Immersion (1-2 months) — 20+ cities, Adani, Dharma, Lenskart, Meesho, ITC, Amul",
    "Summer or semester abroad — Harvard, UC Berkeley, NUS, Imperial, Babson, SDA Bocconi",
    "Dual degree — Illinois Institute of Technology, Chicago or Griffith University, Australia",
  ],
  jobRoles: [
    "Founder / Co-founder",
    "Product Manager",
    "Growth & Performance Marketer",
    "Business Analyst",
    "Category Manager",
    "Creator & Media Entrepreneur",
    "Strategy Associate",
    "Venture Capital Analyst",
    "Operations Manager",
    "Management Consultant",
  ],
};

export const Route = createFileRoute("/programmes/undergraduate/technology-and-business-management")({
  head: () => ({
    meta: [
      { title: "UG in Technology & Business Management — Masters' Union" },
      {
        name: "description",
        content:
          "A 4-year undergraduate degree with three builds: a ₹1Cr+ D2C brand, a 100K+ creator channel, and a startup pitched to 150+ investors. Faculty from Swiggy, NASA, Morgan Stanley.",
      },
      { property: "og:title", content: "UG in Technology & Business Management — Masters' Union" },
      {
        property: "og:description",
        content:
          "Build a D2C brand, a creator channel, and a startup across three years — plus a year of industry training. Aug '26 batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
