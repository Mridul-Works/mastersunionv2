import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "UG in Psychology & Marketing",
  shortName: "UG Psych & Marketing",
  tagline:
    "A four-year degree that pairs behavioural science with go-to-market execution — neuroscience and consumer psychology taught alongside a real D2C brand, a creator channel, and live GTM campaigns.",
  duration: "4 Years (incl. 1 year industry training)",
  mode: "Full-Time, Opt-in Residential — Gurugram",
  commencement: "Aug '26",
  intro:
    "Open to Class XII current students and pass-outs. Every year links what is taught in class — how people decide, remember, and buy — to something built outside it: a brand, a channel, a campaign, or a fundraise.",
  whyNow: [
    "Marketing has become an applied behavioural science. The teams that win are the ones that can read consumer psychology and translate it into funnels, pricing, and creative.",
    "Each year runs a parallel out-class build — a ₹10L+ D2C brand in Year 1, a 5,000+ follower channel and a live GTM partnership in Year 2, and a fundraising campaign plus a public trade challenge in Year 3.",
    "Global immersions run every year, with a 3+1 dual degree at Illinois Tech and a direct one-year pathway to a Master's at IE New York College.",
  ],
  edge: [
    {
      title: "Behavioural science applied to real consumers",
      body: "Neuroscience, cognitive and social psychology, and research methods taught next to funnels, pricing, and brand strategy — then tested on real customers.",
    },
    {
      title: "A new build every year",
      body: "A ₹10L+ D2C brand, a restaurant redesign that lifts sales 20%, a 5,000-follower channel, a live GTM partnership, a fundraising campaign, and a ₹500 → ₹10,000 trade challenge.",
    },
    {
      title: "A global immersion every year",
      body: "US, Italy, Singapore, and France in Year 1, with a new country each subsequent year — plus Bharat Immersion across 8 hubs and 20+ Indian cities.",
    },
    {
      title: "3+1 dual degree and a Master's pathway",
      body: "Three years in India plus one in Chicago for a BSc in Business & Psychology from Illinois Tech, or a one-year progression to a Master's at IE New York College.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Year 1 — Explore the Foundations of Mind & Market",
      summary:
        "Learn how humans actually make decisions — and immediately test it by building a D2C brand and redesigning a real restaurant's customer experience.",
      outcomes: ["₹10L+ DROPSHIPPING REVENUE", "4-COUNTRY IMMERSION", "20% SALES BOOST PROJECT", "CONSUMER RESEARCH"],
      courses: [
        "Introduction to Psychology — how humans really make decisions",
        "Neuroscience — decoding the human brain",
        "Developmental, Social & Cognitive Psychology",
        "People and Personalities",
        "Psychological Research — uncovering what customers won't say",
        "Environmental Psychology & Stress Management",
        "Building Marketing Strategies — GTM via funnels",
        "Scaling a D2C Business",
        "Consumer Behaviour",
        "Art of Communication",
      ],
      challenge: {
        name: "Dropshipping + Hack Your Consumer Mindset",
        description:
          "Build a D2C brand from scratch selling online and offline to ₹10L+ revenue, then redesign a local restaurant's menu and experience to lift sales 20% using psychological nudges. Includes a global immersion across the US, Italy, Singapore and France.",
      },
    },
    {
      n: 2,
      title: "Year 2 — Deepen Your Analytical & Creative Muscle",
      summary:
        "Become a working creator and growth marketer at once — building a personal audience while running a real GTM campaign for someone else's business.",
      outcomes: ["5,000+ FOLLOWER CHANNEL", "LIVE GTM PARTNERSHIP", "PAID MEDIA MASTERY", "BRAND STRATEGY"],
      courses: [
        "Cross-Cultural Psychology",
        "Positive Psychology",
        "Digital Marketing — Meta, Google, TikTok ads",
        "Social Media Marketing",
        "Marketing Research",
        "Introduction to Camera & Film Design",
        "Graphic Design",
        "Essentials of Brand Strategy",
      ],
      challenge: {
        name: "Content Creation + Growth Marketing Challenge",
        description:
          "Build a digital presence on YouTube or Instagram past 5,000 followers, and partner with a real business to build and execute a full GTM strategy tracked on live performance. A new country immersion runs alongside.",
      },
    },
    {
      n: 3,
      title: "Year 3 — Lead Marketing Strategies Through Behavioural Insight",
      summary:
        "Shift from execution to strategy — pricing, product-led growth, neuromarketing, and negotiation, tested through a live fundraising campaign and a public trade challenge.",
      outcomes: ["₹500 → ₹10,000+ TRADE", "LIVE FUNDRAISING CAMPAIGN", "NEUROMARKETING", "INDUSTRY TREK ACCESS"],
      courses: [
        "Growth Strategy",
        "Pricing Strategy",
        "Product-Led Growth",
        "Neuromarketing",
        "Luxury Retail",
        "AI in Marketing",
        "Game Theory & Strategic Negotiation",
        "Leadership & Organisational Behaviour",
        "Running a Non-Profit",
      ],
      challenge: {
        name: "Social Fundraising + Trade Your Way",
        description:
          "Design and run a real fundraising campaign for a social cause using persuasion and behavioural psychology — and start with ₹500, trading up to an item worth ₹10,000+ while documenting the journey on YouTube.",
      },
    },
    {
      n: 4,
      title: "Year 4 — Get Ready for the Real World",
      summary:
        "The transition year — into industry, research, a foreign campus, or a Masters' Union postgraduate pathway.",
      outcomes: ["INDUSTRY TRAINING", "STUDY ABROAD (CHICAGO)", "GUIDED RESEARCH", "PGP PATHWAYS"],
      courses: [
        "Industry training — a year with marketing leaders at top firms",
        "Research project — guided academic research under a professor",
        "Study abroad at partner university, Chicago, USA",
        "PGP pathway — PGP TBM, PGP Rise, or PGP Bharat",
      ],
      challenge: {
        name: "Industry Training or Global Pathway",
        description:
          "Spend the final year inside a marketing organisation, on a research project, or on a partner campus abroad — or progress directly into a Masters' Union postgraduate programme.",
      },
    },
  ],
  faculty: [
    { name: "Ghazal Alagh", role: "Co-founder & Chief Innovation Officer", org: "Mamaearth" },
    { name: "Dr Lan Ma", role: "Adjunct Professor of Business", org: "NYU" },
    { name: "Vineeta Tikekar", role: "Former Head of Marketing", org: "Consumer Brands" },
    { name: "Manoj Kohli", role: "Former CEO", org: "Airtel" },
    { name: "Dr Daniel G Van Der Vliet", role: "Executive Director", org: "Cornell" },
    { name: "Dr Bhupesh Manoharan", role: "PhD", org: "IIM Calcutta" },
    { name: "Dr Anahita Bhandari", role: "Professor, Psychology", org: "Masters' Union" },
    { name: "Alok Saraogi", role: "Former Country Manager", org: "Global FMCG" },
    { name: "Dr James Oldroyd", role: "Former Country Head", org: "BYU" },
    { name: "Hardeep Singh Brar", role: "Sr VP & Head of Marketing", org: "Kia India" },
    { name: "Arjun Vaidya", role: "Former CEO", org: "Dr Vaidya's" },
    { name: "Siddarth Menon", role: "Former CMO", org: "WazirX" },
    { name: "Rajat Mathur", role: "Managing Director", org: "Morgan Stanley" },
    { name: "Anuradha Agnihotri", role: "Professor, Marketing", org: "Masters' Union" },
    { name: "Siddarth Padmanabhan", role: "Former Partner Manager", org: "Meta" },
    { name: "Avantika Tomar", role: "Partner", org: "EY-Parthenon" },
    { name: "Kevyn Eva Norton", role: "Former Tech Strategist", org: "Global" },
    { name: "Dr Itisha Nagar", role: "PhD, Psychology", org: "Masters' Union" },
    { name: "Dr Sneh Kapoor", role: "PhD, Clinical Psychology", org: "Masters' Union" },
    { name: "Poonam Kaul", role: "Former Marketing Director", org: "Pepsico" },
  ],
  immersions: [
    "Industry immersions (1-2 days) — MakeMyTrip, Snitch, Mishtten, Farmley",
    "Europe — Mercedes-Benz, UN Headquarters",
    "Singapore — Singtel, Agoda",
    "Japan — Rakuten, Nissan, Daikin",
    "UAE — Careem, DIFC Innovation Hub",
    "Bharat Immersion — 8 hubs, 20+ cities: Delhi NCR, Jalandhar, Mundra & Ahmedabad, Mumbai, Goa, Bengaluru, Darjeeling, Lucknow",
    "Summer or semester abroad — Babson, SDA Bocconi, UC Berkeley, SMU, Illinois Tech",
    "3+1 dual degree — BSc Business & Psychology, Illinois Tech Chicago",
    "1-year UG-to-Master's pathway — IE New York College",
    "Student Investment Fund — a ₹5 Cr fund across equities, crypto, REITs, InvITs and startups",
  ],
  jobRoles: [
    "Brand Manager",
    "Growth Marketer",
    "Consumer Insights Analyst",
    "UX & Behavioural Researcher",
    "Performance Marketing Lead",
    "Content & Creator Strategist",
    "Product Marketing Manager",
    "Marketing Consultant",
    "Category Manager",
    "Founder — Consumer Brands",
  ],
};

export const Route = createFileRoute("/programmes/undergraduate/psychology-and-marketing")({
  head: () => ({
    meta: [
      { title: "UG in Psychology & Marketing — Masters' Union" },
      {
        name: "description",
        content:
          "A 4-year undergraduate degree blending behavioural science with marketing execution — a ₹10L+ D2C brand, live GTM campaigns, global immersions, and a 3+1 dual degree at Illinois Tech.",
      },
      { property: "og:title", content: "UG in Psychology & Marketing — Masters' Union" },
      {
        property: "og:description",
        content:
          "Neuroscience and consumer psychology taught alongside real brands, real campaigns, and a global immersion every year. Aug '26 batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
