import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP TBM Summer School",
  shortName: "Summer School",
  tagline:
    "Eight weekends. Four stages. One venture taken from opportunity to pitch — offline in Bengaluru, Mumbai or Gurugram, closing with a national finale on the Masters' Union campus.",
  duration: "8 weekends · 32–40 live hours (2 months)",
  mode: "Offline weekend classes — Bengaluru · Mumbai · Gurugram",
  commencement: "July 2026 (Cohort 01) · Apply by 31 July 2026",
  intro:
    "Experience PGP TBM before you apply. Built for UG students and professionals with 1–4 years of experience, the Summer School runs an eight-weekend system where every weekend ends with something shipped, defended or signed. Limited seats, application-based, rolling admissions.",
  whyNow: [
    "Total fee ₹2,45,500 (₹500 application + ₹10,000 admission deposit + ₹2,35,000 tuition), fully adjustable against PGP TBM tuition if you are selected. Scholarships of 10–25% available, subject to evaluation.",
    "Strong performers get direct interview consideration for the Masters' Union PGP in Technology & Business Management — a live admissions pathway, not a certificate.",
  ],
  edge: [
    {
      title: "Idea on Friday. Venture by Sunday. Repeat eight times.",
      body: "Four stages — Discover, Build, Defend, Decide — each weekend producing a concrete artefact: a validated gap, a model, a defended forecast, a pitch.",
    },
    {
      title: "Every team takes the stage",
      body: "No shortlists, no filters. Every team that completes the eight weekends flies to the Gurugram campus for the national finale — travel and stay fully sponsored by Masters' Union.",
    },
    {
      title: "Taught by people who've built it",
      body: "Operators and founders like Rajat Mathur (Morgan Stanley), Naveen Munjal (Hero Electric), Arjun Vaidya (Dr. Vaidya's) alongside global faculty from Harvard, MIT Sloan, Cambridge and Imperial.",
    },
    {
      title: "Three city cohorts, one room",
      body: "Students from Bengaluru, Mumbai and Gurugram meet at the finale, watch each other present and trade notes — for many the most valuable network they walk away with.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Stage 1 · W01–W02 — Discover",
      summary: "Spot the gap. Validate the demand.",
      outcomes: ["MARKET MAPPING", "CUSTOMER DISCOVERY", "VALIDATED SIGNAL"],
      courses: [
        "W01 — Market Mapping: find the opportunity others have missed; map the landscape, the white spaces, the unmet demand",
        "W02 — Customer Discovery: talk to real customers, hunt the signal, validate before you build",
        "In-class: business fundamentals and case discussions",
        "Out-class: customer interviews and market research",
      ],
      challenge: {
        name: "Validated Opportunity Brief",
        description:
          "Produce a mapped market and a customer-validated problem statement your team is willing to build against.",
      },
    },
    {
      n: 2,
      title: "Stage 2 · W03–W04 — Build",
      summary: "Shape the venture. Lock the go-to-market.",
      outcomes: ["BUSINESS MODEL", "GTM STRATEGY", "UNIT ECONOMICS", "BRAND"],
      courses: [
        "W03 — Business Model & GTM: architect the offer, the channel and the way in; decide who you sell to and how",
        "W04 — Unit Economics & Brand: price it, position it, make the math work and the story land",
        "In-class: finance and strategy sessions, product and growth workshops",
        "Out-class: build sprints and team missions",
      ],
      challenge: {
        name: "Venture Build Sprint",
        description:
          "Ship a working go-to-market plan with unit economics that survive scrutiny and a brand position that lands in one line.",
      },
    },
    {
      n: 3,
      title: "Stage 3 · W05–W06 — Defend",
      summary: "Pressure-test every assumption under fire.",
      outcomes: ["FINANCIAL DEFENCE", "MOATS", "INVESTOR LENS"],
      courses: [
        "W05 — Financial Defence: defend the numbers, stress-test the model, survive the questions you didn't see coming",
        "W06 — Moats & Investor Lens: competition, risk and capital handled the way founders do — in the room",
        "In-class: founder and CXO sessions",
        "Out-class: peer reviews and founder-style reviews",
      ],
      challenge: {
        name: "Investor Pressure Test",
        description:
          "Defend your model, moat and capital plan live against practitioners who have run the same conversations for real.",
      },
    },
    {
      n: 4,
      title: "Stage 4 · W07–W08 — Decide",
      summary: "Make the call. Own the room.",
      outcomes: ["LEADERSHIP DECISIONS", "NEGOTIATION", "FINAL PITCH"],
      courses: [
        "W07 — Leadership Decisions: prioritise, negotiate, choose under pressure and communicate it with conviction",
        "W08 — Final Pitch: stand up, pitch the venture, win the founders, CXOs and investors in the room",
        "In-class: pitch preparation and live feedback",
        "Out-class: final pitch prep and the national finale",
      ],
      challenge: {
        name: "National Finale, Gurugram",
        description:
          "Every team pitches on the Masters' Union campus to a panel of founders, CXOs, investors and business leaders — travel and stay fully sponsored.",
      },
    },
  ],
  faculty: [
    { name: "Rajat Mathur", role: "Managing Director", org: "Morgan Stanley" },
    { name: "Naveen Munjal", role: "Managing Director", org: "Hero Electric" },
    { name: "Rahul Wadhawan", role: "Partner", org: "Bain & Company" },
    { name: "Avantika Tomar", role: "Partner", org: "EY-Parthenon" },
    { name: "Thomas Kuruvilla", role: "Managing Partner", org: "Arthur D. Little" },
    { name: "Arjun Vaidya", role: "Founder", org: "Dr. Vaidya's" },
    { name: "Revant Bhate", role: "CEO", org: "Man Matters" },
    { name: "Jaidit Brar", role: "Former Partner", org: "McKinsey" },
    { name: "Rajeev Soni", role: "Director, Product Management", org: "Gartner" },
    { name: "Nitin Gaur", role: "Former Director", org: "IBM" },
    { name: "Dr. Zal Phiroz", role: "Adjunct Professor", org: "Harvard University" },
    { name: "Dr. Shad Morris", role: "Adjunct Professor", org: "MIT Sloan" },
    { name: "Dr. Garrick Hileman", role: "Professor", org: "University of Cambridge" },
    { name: "Dr. Rajesh Bhargave", role: "Associate Professor", org: "Imperial College London" },
    { name: "Dr. Benjamin Dunford", role: "Professor", org: "Purdue University" },
    { name: "Daniel Garett Van Der Vliet", role: "Family Business", org: "Cornell University" },
  ],
  immersions: [
    "National Finale at the Masters' Union campus, Gurugram — travel and stay fully sponsored, every team pitches",
    "Founder and CXO sessions across all eight weekends",
    "Team missions in the real world — customer interviews, market research and build sprints",
    "Direct interview pathway into PGP TBM for strong performers, subject to evaluation",
  ],
  jobRoles: [
    "Founder / Venture Builder",
    "Family Business Successor",
    "Business Analyst",
    "Product Associate",
    "Growth & GTM Associate",
    "MBA / PGP TBM Aspirant",
  ],
};

export const Route = createFileRoute("/programmes/immersions/pgp-tbm-summer-school")({
  head: () => ({
    meta: [
      { title: "PGP TBM Summer School — Masters' Union" },
      {
        name: "description",
        content:
          "An 8-weekend offline summer school in Bengaluru, Mumbai and Gurugram — build a venture from opportunity to pitch, with a fully sponsored national finale and a direct interview pathway into PGP TBM.",
      },
      { property: "og:title", content: "PGP TBM Summer School — Masters' Union" },
      {
        property: "og:description",
        content:
          "Idea on Friday. Venture by Sunday. Repeat eight times. Cohort 01 begins July 2026 — apply by 31 July 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
