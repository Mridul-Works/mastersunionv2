import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "Executive Leadership Programme in AI & GCC Transformation",
  shortName: "AI & GCC",
  tagline:
    "A 6-month executive programme for senior GCC leaders — six modules from executive presence to HQ influence, with five company immersions, quarterly CXO residencies, and a four-country global immersion.",
  duration: "6 months, incl. industry-led live projects",
  mode: "Offline/Online — Sat–Sun classes",
  commencement: "Rolling cohorts",
  intro:
    "Built for leaders with 15+ years of Global Capability Centre experience who need to reposition their GCC from cost centre to capability hub — and win the budget and board backing to do it.",
  whyNow: [
    "Eligibility: minimum 15 years of GCC experience and an undergraduate degree in any discipline (STEM preferred, non-technical welcome). Fees: ₹80,000 offer acceptance + ₹4,50,000 at commencement + ₹4,50,000 mid-programme = ₹9,80,000 total.",
    "Every module ships frameworks you apply immediately — the 7-Stage GCC Lifecycle, the GCC Value Pyramid, the 5-Factor Location Scorecard, ADKAR, and the 7I Model for HQ influence — culminating in a board-approved AI roadmap with measurable ROI.",
  ],
  edge: [
    {
      title: "Five GCC company immersions",
      body: "Alcon on AI-enabled global operations, Infosys on enterprise AI operating models, Microsoft on responsible AI, AWS on AI infrastructure, and Deloitte on AI strategy.",
    },
    {
      title: "Quarterly 2-day CXO residencies",
      body: "Closed-door sessions with product and AI leaders from Zomato, Swiggy and Flipkart on AI unit economics, scale decisions, and 2026 product bets.",
    },
    {
      title: "Four-country global immersion",
      body: "Singapore, Europe, UAE and Japan — from Philips R&D and the United Nations HQ to Emirates, Smart Dubai, Rakuten and the Nissan Tochigi Plant.",
    },
    {
      title: "A board-ready capstone",
      body: "Pick an organisation, audit its AI readiness, design production-ready systems, and deliver a board-approved roadmap with measurable ROI.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "How to Build Executive Leadership Excellence",
      summary:
        "The executive credibility layer — board-ready communication and crisis command — that every later module depends on.",
      outcomes: ["5P LEADERSHIP MODEL", "BOARD-LEVEL COMMUNICATION", "CRISIS DECISION-MAKING"],
      courses: [
        "Building executive presence in C-suite conversations and value-focused board narratives",
        "Navigating crises with data-driven confidence and predictive analytics",
        "Building leadership succession frameworks",
        "Influencing across geographies without authority; leading distributed teams",
        "Frameworks: 5P Executive Leadership Model, Human + AI Leadership Model, ADKAR, S-Curve, Resilience Model",
      ],
      challenge: {
        name: "Executive Presence Lab",
        description:
          "Deliver ROI-focused business narratives to a simulated board and design a crisis-management framework using predictive analytics — the transition from functional expert to P&L leader.",
      },
    },
    {
      n: 2,
      title: "How to Set Up a GCC",
      summary:
        "Reframes the GCC's value proposition — from cost centre to capability hub — with the financial modelling and location strategy to prove it.",
      outcomes: ["GCC VALUE PYRAMID", "LOCATION STRATEGY", "CAPABILITY HUB POSITIONING"],
      courses: [
        "Financial models proving value beyond arbitrage; multi-year ROI projections and cost structures",
        "Structuring tax-optimised legal entities globally; transfer pricing and tax-treaty optimisation",
        "Defining an effective location strategy; balancing global control with local agility",
        "Designing governance that ensures sponsorship and autonomy",
        "Frameworks: 7-Stage GCC Lifecycle Model, GCC Value Pyramid, 5-Factor Location Scorecard",
      ],
      challenge: {
        name: "GCC Business Case Build",
        description:
          "Quantify innovation velocity and capability differentiation, then build an executive-sponsorship case that positions the GCC as an enterprise capability hub rather than a cost line.",
      },
    },
    {
      n: 3,
      title: "How to Lead Transformation Through Process Redesign & AI-Enabled Thinking",
      summary:
        "The operating core — turning AI ambition into a prioritised, funded, stakeholder-backed roadmap that survives implementation.",
      outcomes: ["IMPACT-EFFORT PRIORITISATION", "BUSINESS CASE BUILDING", "CHANGE SUSTAINABILITY"],
      courses: [
        "Aligning transformation with long-term strategic goals; identifying processes for redesign",
        "Building business cases with measurable impact and practical MVPs",
        "Stakeholder mapping and structured buy-in; managing resistance",
        "Prioritising with impact-effort; sustaining change with metrics, adoption and discipline",
        "Frameworks: Control-Impact Matrix, 7 Ingredients of Culture Change, Solution-Effect Diagram, ADKAR (Prosci)",
      ],
      challenge: {
        name: "Transformation Roadmap Sprint",
        description:
          "Design a structured transformation roadmap for your own GCC — high-impact automation opportunities, an MVP with success metrics, and a change-management plan built on Prosci ADKAR.",
      },
    },
    {
      n: 4,
      title: "How to Create the Right Talent Strategy in GCC",
      summary:
        "The hardest constraint — building a workforce strategy that competes globally for AI capability, not just headcount.",
      outcomes: ["CAPABILITY-LED HIRING", "AI/ML TALENT COMPETITION", "CAREER MOBILITY DESIGN"],
      courses: [
        "Shifting from cost-hiring to capability-led talent; mapping future skills and roadmaps",
        "Designing retention for modern workforce needs; transparent career-progression frameworks",
        "Competing for top AI/ML talent globally with data-driven attraction and compensation",
        "AI-powered skills forecasting, turnover prediction and skills-gap analysis",
        "Frameworks: 3B Talent Sourcing Model, 7C Model for GCC Talent Excellence, GCC Talent Maturity Model",
      ],
      challenge: {
        name: "Workforce Strategy Design",
        description:
          "Build an enterprise workforce strategy for a differentiated, future-ready GCC — skills forecasts, compensation positioning, and career-mobility architecture.",
      },
    },
    {
      n: 5,
      title: "How to Drive Business Innovation in GCCs",
      summary:
        "Institutionalises innovation — pilots, pods and forums with a structured path from concept to measured revenue impact.",
      outcomes: ["INNOVATION PODS & FORUMS", "RAPID PILOT TESTING", "REVENUE-LINKED INNOVATION"],
      courses: [
        "Driving innovation for long-term GCC advantage; overcoming cultural and structural barriers",
        "Building a customer-first, curiosity mindset; enabling low-risk pilots and rapid learning",
        "Creating pods and forums to test ideas; linking innovation to revenue and efficiency",
        "Balanced innovation portfolios and measuring impact through customer value",
        "Frameworks: ADKAR, Impact-Effort Matrix, Brainwriting (6-3-5), Affinity Mapping, Innovation Funnel",
      ],
      challenge: {
        name: "Innovation Operating Model",
        description:
          "Design a simple innovation operating model with a balanced portfolio, a fast-learning experimentation culture, and leadership sponsorship secured against known organisational biases.",
      },
    },
    {
      n: 6,
      title: "How to Influence Global Headquarters",
      summary:
        "Closes where it matters commercially — translating five modules of capability-building into board-level backing, budget, and a defensible ESG narrative.",
      outcomes: ["HQ INFLUENCE MAPPING", "CFO-LEVEL REPORTING", "ESG & ETHICAL AI POSITIONING"],
      courses: [
        "Securing board-level visibility; repositioning the GCC as a strategic business partner",
        "Navigating HQ-GCC dynamics and budget politics",
        "Communicating impact in revenue and market terms; quantifying impact in CFO language",
        "Embedding the GCC into enterprise ESG strategy and ethical-AI leadership",
        "Frameworks: 7I Model for HQ Influence, HQ Stakeholder Influence Map, GCC-HQ Influence Maturity Model",
      ],
      challenge: {
        name: "Board-Ready AI Capstone",
        description:
          "Pick an organisation, audit its AI readiness, design production-ready systems, and deliver a board-approved transformation roadmap with measurable ROI.",
      },
    },
  ],
  faculty: [
    {
      name: "Dr. Dinesh Kumar Murugesan",
      role: "Programme Chairperson; CEO, EzyAct Consulting",
      org: "Ex-TCS, Deloitte, Bank of America",
    },
    { name: "Dr. Sumit Mitra", role: "Chief Executive Officer", org: "GCC Leadership" },
    { name: "Priyaranjan Jha", role: "SVP & Head of GBS", org: "Iron Mountain" },
    { name: "Sudhir Dasamantharao", role: "Chairman, GCC Senior Advisor", org: "GCC Advisory" },
    { name: "Mr. Manoj Kohli", role: "Former CEO", org: "Bharti Airtel" },
    { name: "Sumit Bhatia", role: "Senior People Partner", org: "Marsh" },
    { name: "Manoj Kalra", role: "Global Head", org: "Industry" },
    { name: "Vineet Dwivedi", role: "Sr. Vice President", org: "Industry" },
    { name: "Bhawani Prasad Chavali", role: "CEO; Ex-L&D Director", org: "Industry" },
    { name: "Dr. Murali Padmanabhan", role: "Board Advisor", org: "Industry" },
    { name: "Navendu Pandey", role: "Founder", org: "Industry" },
    { name: "Rajeev Mall", role: "CEO", org: "Industry" },
    { name: "Dr. Nandini Seth", role: "PhD", org: "IIM Bangalore" },
    { name: "Dr. Francis Rebello", role: "Former Head – HR", org: "Plan International" },
  ],
  immersions: [
    "Singapore — finance, sustainability and global markets; Singtel, Agoda, IHH Healthcare",
    "Europe — governance, renewable energy and auto-engineering; Philips R&D HQ, IÉSEG Campus, United Nations HQ",
    "UAE — AI-driven smart infrastructure; Emirates Group and Smart Dubai initiatives",
    "Japan — R&D at scale; Nissan Tochigi Plant, Kyoto Research Park, Daikin R&D Centre, Rakuten",
    "GCC company immersions — Alcon, Infosys, Microsoft, Amazon/AWS, Deloitte",
  ],
  jobRoles: [
    "GCC Head / Country Head",
    "VP, Global Business Services",
    "Chief Transformation Officer",
    "Head of AI & Automation",
    "Enterprise Digital Strategy Lead",
    "GCC Talent & Capability Head",
    "Board Advisor, Global Capability",
  ],
};

export const Route = createFileRoute("/programmes/executive/ai-and-gcc-transformation")({
  head: () => ({
    meta: [
      { title: "Executive Leadership Programme in AI & GCC Transformation — Masters' Union" },
      {
        name: "description",
        content:
          "A 6-month executive programme for senior GCC leaders — six modules, five company immersions, quarterly CXO residencies, and a four-country global immersion.",
      },
      {
        property: "og:title",
        content: "Executive Leadership Programme in AI & GCC Transformation — Masters' Union",
      },
      {
        property: "og:description",
        content:
          "Reposition your GCC from cost centre to capability hub — and deliver a board-approved AI roadmap with measurable ROI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
