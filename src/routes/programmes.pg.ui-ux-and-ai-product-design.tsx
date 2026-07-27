import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PG Programme in UI/UX & AI Product Design",
  shortName: "AI Product Design",
  tagline:
    "India's only AI-first design programme — a 16-month PGP that trains you to design, prototype, and ship modern digital products with AI at the core.",
  duration: "16-month PGP",
  mode: "On-Campus, Gurugram or Online Weekend",
  commencement: "Aug '26",
  intro:
    "Unlike traditional design courses focused on tools or aesthetics, this programme takes a product-first approach — combining design craft with business context, user empathy, and product strategy. Every term runs alongside a live industry challenge with a real client and a defined business outcome.",
  whyNow: [
    "India's digital economy is projected to reach 20% of GVA by 2029-30, making user experience a business priority now. As digital products scale, India lacks the design leadership to drive research, navigate complexity, and shape product decisions.",
    "AI is reshaping how products are built. With 93% of designers in India reporting AI-tool use, there is growing demand for job-ready talent skilled in UI/UX, product thinking, and AI-first feature design.",
  ],
  edge: [
    {
      title: "AI Product Designer — end-to-end capability",
      body: "Interface craft, AI-native UX, research, prototyping, design systems, and handoffs — built around real teams and real product cycles.",
    },
    {
      title: "Taught by design leaders at Swiggy, Cars24, BharatPe, Zepto, Uber",
      body: "70%+ of courses are taught by industry practitioners, with 1:1 mentorship, masterclasses by CDOs, and global professors.",
    },
    {
      title: "Live studios, not classroom projects",
      body: "Solve problems for real companies inside live product cycles — design sprints with engineers and PMs, and ship work with real users and real constraints.",
    },
    {
      title: "Graduate with a portfolio, not just a resume",
      body: "Shipped flows, prototypes, and documented decisions; AI-augmented workflows across research and iteration; production-ready outputs for engineers and PMs.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Foundations of Digital & AI-Native Design",
      summary:
        "Build visual and interaction design fundamentals while integrating AI-driven ideation and code-assisted design with Cursor from day one.",
      outcomes: ["DIGITAL DESIGN FOUNDATIONS", "AI-DRIVEN IDEATION", "CURSOR-ASSISTED PROTOTYPING", "DARK PATTERN AUDITS"],
      courses: [
        "Foundations of digital design: composition, colour, hierarchy",
        "Heuristic evaluation & usability",
        "Wireframing & interface design (Figma, Framer)",
        "Typography systems & responsive scaling",
        "AI-driven design exploration",
        "Designing with Cursor",
      ],
      challenge: {
        name: "Dark Pattern Audit Challenge",
        description:
          "Increase Long-Term User Value by 25% by replacing predatory dark patterns in a high-growth app with transparent, trust-centered design — validated with A/B test forecasts.",
      },
    },
    {
      n: 2,
      title: "Master Research, Prototyping & Industry Practice",
      summary:
        "Deepen user-centered design, information architecture, and hi-fi prototyping — with AI plugins and Cursor for component-level coding.",
      outcomes: ["USER RESEARCH METHODS", "INFORMATION ARCHITECTURE", "HIGH-FIDELITY PROTOTYPING", "DESIGN SYSTEMS"],
      courses: [
        "Research Methods I: field studies, interviews, personas",
        "Information architecture with AI-assisted card sorting",
        "Web technologies for designers: HTML, CSS, JS",
        "Interface prototyping in Figma with Cursor & AI plugins",
        "Collaborative design with MCP servers",
        "Design systems: tokens, components, consistency",
      ],
      challenge: {
        name: "Ghost Cart Revenue Recovery Challenge",
        description:
          "Drive a 15%+ increase in annual gross revenue by redesigning a real e-commerce checkout flow — trust-optimised multi-step experience, A/B plan, and developer handoff with ROI forecast.",
      },
    },
    {
      n: 3,
      title: "Design Thinking, Interaction & Intelligent Systems",
      summary:
        "Advanced design thinking, motion & interaction, and adaptive AI-powered interfaces — plus product/project management.",
      outcomes: ["CRITICAL DESIGN THINKING", "MOTION & INTERACTION DESIGN", "CONVERSATIONAL INTERFACES", "DESIGN SYSTEMS GOVERNANCE"],
      courses: [
        "Critical thinking for designers",
        "Product & project management for design teams",
        "Research Methods II: synthesis at scale",
        "Cursor for research writing",
        "Interaction design & motion",
        "Conversational interfaces & adaptive systems",
        "Advanced design system governance",
      ],
      challenge: {
        name: "The AI-Copilot SaaS Dashboard",
        description:
          "Improve employee productivity by 20%+ by reducing time-to-insight to under 60 seconds — prototype a natural-language copilot with predictive insight components and quantify the efficiency gain.",
      },
    },
    {
      n: 4,
      title: "Advanced Interaction, Systems & Psychology",
      summary:
        "Computational interaction, systems thinking, front-end UI architecture, and the psychology of play and motivation.",
      outcomes: ["HUMAN-COMPUTER INTERACTION", "INCLUSIVE DESIGN", "FRONT-END UI ARCHITECTURE", "PSYCHOLOGY OF PLAY"],
      courses: [
        "Design communication & collaboration",
        "Programming Interactive Experiences (PIX)",
        "Design for inclusive experiences",
        "Software Structures for User Interfaces (SSUI)",
        "Psychology of play, motivation, and behaviour",
        "Conversational interfaces & adaptive systems II",
      ],
      challenge: {
        name: "The Founder's Right Hand Challenge",
        description:
          "Design where decisions cost real money — work directly with unicorn founders and CDOs on early product discovery, MVP UX, and investor demos. Ship design used in real pitches and launches.",
      },
    },
    {
      n: 5,
      title: "The Capstone Project",
      summary:
        "An intensive, sponsor-led simulation of the full product-development lifecycle — from research through iterative prototyping to final industry presentation.",
      outcomes: ["FULL PRODUCT LIFECYCLE", "CLIENT-SPONSORED RESEARCH", "ITERATIVE PROTOTYPING", "0-TO-100K USERS"],
      courses: [
        "Sponsor-led lifecycle: context → research → synthesis",
        "Competitive & user research at scale",
        "Insight synthesis: reports, field notes, video, frameworks",
        "Ideation, prototyping, and iterative testing",
        "Final presentation to faculty and industry stakeholders",
      ],
      challenge: {
        name: "0 → 100K Users Challenge",
        description:
          "Take a product from idea to MVP to live users. Identify real user problems, design and launch an MVP with onboarding, core flow, and analytics — and iterate on real activation and retention data.",
      },
    },
  ],
  faculty: [
    { name: "Saptarishi Prakash", role: "AVP of Design", org: "Swiggy" },
    { name: "Ishaan Panwar Kothiyal", role: "Head of Design", org: "Cars24" },
    { name: "Rewati Raman", role: "Director of Design", org: "ET Money" },
    { name: "Sanjeev Kumar", role: "Head of Design", org: "BharatPe" },
    { name: "Ayush Shrivastava", role: "EVP User Experience Design", org: "Info Edge" },
    { name: "Liso Joseph", role: "AVP Design", org: "Air India" },
    { name: "Hitesh Lakhyani", role: "Design Leader", org: "Tata" },
    { name: "Divya Bokdia", role: "Design Leader", org: "Atlassian" },
    { name: "Leena Jacob", role: "Director UX", org: "Target" },
    { name: "Alok Kumar", role: "Director of User Experience", org: "Myntra" },
    { name: "Naveen Ved", role: "Head of Product Design", org: "IndusInd Bank" },
    { name: "Anoop Kumar", role: "Lead Design Manager", org: "CRED" },
    { name: "Nitin Sharma", role: "Designer 3", org: "Adobe" },
    { name: "Pratik Biswas", role: "Product Designer", org: "Coursera" },
    { name: "Deeksha Gupta", role: "UX Designer 2", org: "Microsoft" },
    { name: "Siraj Rafi", role: "User Research & Strategy", org: "Salesforce" },
    { name: "Balachandra Shetty", role: "Ex Product Design Lead", org: "Google" },
    { name: "Neha Arora", role: "Ex UX Leader", org: "Amazon" },
  ],
  immersions: [
    "Europe — Philips, Mercedes-Benz, Louvre, Disneyland Paris, Porsche",
    "Singapore — Agoda, Singtel, Sanofi, IHH Healthcare, Universal Studios",
    "Japan — Daikin, Nissan, Rakuten, Sensoji, Osaka",
    "Dubai — Careem, noon, Emirates NBD",
  ],
  jobRoles: [
    "Product Designer",
    "Interaction Designer",
    "Experience Designer",
    "UX Researcher",
    "UX Strategist",
    "UI Designer",
    "Design Systems Designer",
    "Product Design Manager",
    "Conversational UX Designer",
    "AR/VR Experience Designer",
    "Content Designer",
    "Prompt Designer for Product Interfaces",
  ],
};

export const Route = createFileRoute("/programmes/pg/ui-ux-and-ai-product-design")({
  head: () => ({
    meta: [
      { title: "PGP in UI/UX & AI Product Design — Masters' Union" },
      {
        name: "description",
        content:
          "India's only AI-first design PGP. 16 months, on-campus or online weekend. Faculty from Swiggy, Cars24, BharatPe. Ship real product work, not classroom projects.",
      },
      { property: "og:title", content: "PGP in UI/UX & AI Product Design — Masters' Union" },
      {
        property: "og:description",
        content:
          "Design AI-native products with Cursor from day one. Live studios with unicorn founders. Aug '26 batch.",
      },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
