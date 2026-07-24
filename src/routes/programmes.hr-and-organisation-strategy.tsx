import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PG Programme in Human Resources & Organisation Strategy",
  shortName: "HR & OS",
  tagline:
    "A 16-month full-time PGP built with Aon that turns HR from a support function into a business-critical strategy role — powered by AI, culture design, and hands-on people analytics.",
  duration: "16-month Full-Time PGP",
  mode: "On-Campus, Gurugram",
  commencement: "Aug '26",
  intro:
    "HR is being reinvented. Talent, culture, compensation, and organisation design now sit at the centre of every board conversation — and this programme trains you to lead that conversation with data, technology, and business context.",
  whyNow: [
    "In partnership with Aon — the world's leading talent and rewards consultancy — the curriculum blends people analytics, org design, culture, and executive coaching with real client work from term one.",
    "Every term pairs foundational business courses with an out-class challenge: run a hiring sprint, design a compensation architecture, audit a culture, or coach real leaders through ICF-accredited frameworks.",
  ],
  edge: [
    {
      title: "Built with Aon — global standards, Indian context",
      body: "Frameworks, benchmarks, and case data from Aon's global talent and rewards practice, applied to Indian companies.",
    },
    {
      title: "ICF-recognised coaching certification",
      body: "Graduate with an internationally-recognised coaching credential alongside your PGP — rare among Indian HR programmes.",
    },
    {
      title: "AI-native HR toolkit",
      body: "Build people-analytics dashboards, hiring copilots, and pulse-survey NLP pipelines using the same AI tools used by top talent teams.",
    },
    {
      title: "Live labs with real clients",
      body: "Culture Audit Labs, Hiring Sprints, and Total-Rewards war rooms with real companies — you present to real CHROs, not classmates.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Business Foundations & Talent Acquisition",
      summary:
        "Ground yourself in business fundamentals and modern hiring — from EVP design to AI-assisted sourcing.",
      outcomes: ["EVP DESIGN", "AI SOURCING", "HIRING SPRINTS", "BUSINESS BASICS"],
      courses: [
        "Reading financial statements & business decision-making",
        "Modern talent acquisition: EVP, sourcing, assessment",
        "AI in hiring: sourcing, screening, structured interviews",
        "Storytelling & influence for HR",
      ],
      challenge: {
        name: "The Hiring Sprint",
        description:
          "Run a real hiring sprint for a partner company — build the JD, source candidates, design the assessment, and close a hire in 6 weeks.",
      },
    },
    {
      n: 2,
      title: "Compensation, Rewards & People Analytics",
      summary:
        "Learn how total rewards, incentives, and pay architecture actually drive behaviour — with Aon benchmarks.",
      outcomes: ["TOTAL REWARDS", "PAY BENCHMARKING", "ESOP DESIGN", "PEOPLE ANALYTICS"],
      courses: [
        "Compensation strategy & pay architecture",
        "ESOPs, LTIPs, and variable pay design",
        "People analytics: attrition, engagement, productivity",
        "Aon benchmarking methodology",
      ],
      challenge: {
        name: "Total-Rewards War Room",
        description:
          "Rebuild the compensation architecture for a listed-style Indian company — pay bands, variable pay, ESOP pool, benchmarked with Aon data.",
      },
    },
    {
      n: 3,
      title: "Culture, Engagement & Organisation Design",
      summary:
        "Understand how culture is measured, engineered, and reset — and how org structures scale or break under growth.",
      outcomes: ["CULTURE AUDIT", "ORG DESIGN", "ENGAGEMENT NPS", "CHANGE MGMT"],
      courses: [
        "Culture diagnostics & pulse-survey design",
        "Organisation design: structures, spans, layers",
        "Change management & communication",
        "Employee experience & journey mapping",
      ],
      challenge: {
        name: "Culture Audit Lab",
        description:
          "Audit the culture of a real high-growth startup — run diagnostics, present findings to the CHRO, and design a 90-day culture reset.",
      },
    },
    {
      n: 4,
      title: "Learning, Leadership & Executive Coaching",
      summary:
        "Build L&D strategy, leadership pipelines, and start the ICF-accredited coaching certification track.",
      outcomes: ["L&D STRATEGY", "LEADERSHIP PIPELINE", "ICF COACHING", "CAPABILITY BUILDING"],
      courses: [
        "Learning strategy & capability architecture",
        "Leadership development & succession planning",
        "ICF coaching foundations (module 1 of certification)",
        "Building learning ecosystems with AI",
      ],
      challenge: {
        name: "Executive Coaching Practicum",
        description:
          "Coach real senior leaders under supervision — log coaching hours toward the ICF credential and produce a portfolio of coaching cases.",
      },
    },
    {
      n: 5,
      title: "HR Technology, Automation & AI",
      summary:
        "Ship HR-tech: automate onboarding, build AI copilots for HRBPs, and design people-data pipelines.",
      outcomes: ["HR TECH STACK", "PROCESS AUTOMATION", "AI COPILOTS", "DATA GOVERNANCE"],
      courses: [
        "HR technology architecture: HRIS, ATS, LMS",
        "Workflow automation for HR ops",
        "Building AI agents for HR use cases",
        "People-data privacy & governance",
      ],
      challenge: {
        name: "HR AI Agent Build",
        description:
          "Build an AI agent that automates a real HR workflow — onboarding, payroll queries, or leave management — for a partner organisation.",
      },
    },
    {
      n: 6,
      title: "Industrial Relations, Compliance & Global HR",
      summary:
        "Work across labour law, IR, DEI, and multi-country HR — the operator toolkit for CHRO-track roles.",
      outcomes: ["LABOUR LAW", "IR & UNIONS", "DEI STRATEGY", "GLOBAL HR"],
      courses: [
        "Indian labour codes & compliance",
        "Industrial relations & union negotiations",
        "DEI strategy & measurement",
        "Cross-border HR & mobility",
      ],
      challenge: {
        name: "Compliance & IR Simulation",
        description:
          "Navigate a live IR scenario for a manufacturing partner — from grievance to negotiation to settlement, with full compliance documentation.",
      },
    },
    {
      n: 7,
      title: "Strategic HR & Business Partnering",
      summary:
        "Operate like a CHRO — align talent with strategy, run board conversations, and drive workforce transformation.",
      outcomes: ["HR BUSINESS PARTNERING", "BOARD CONVERSATIONS", "WORKFORCE PLANNING", "M&A HR"],
      courses: [
        "Strategic HRBP frameworks",
        "Workforce planning & talent forecasting",
        "M&A HR: integration & retention",
        "The CHRO-CEO conversation",
      ],
      challenge: {
        name: "HRBP Consulting Sprint",
        description:
          "Act as the HRBP for a real business unit — diagnose talent risks, present a 12-month people plan, and defend it in front of the leadership team.",
      },
    },
    {
      n: 8,
      title: "Careers, Capstone & Coaching Certification",
      summary:
        "Complete the ICF coaching credential, run the industry capstone, and prepare for CHRO-track placements.",
      outcomes: ["CAPSTONE", "ICF CERTIFICATION", "PLACEMENT PREP", "PORTFOLIO"],
      courses: [
        "ICF coaching certification (final module)",
        "Capstone: end-to-end people strategy for a real client",
        "Case interviews for HR consulting roles",
        "Personal brand, LinkedIn, and executive presence",
      ],
      challenge: {
        name: "Industry Capstone",
        description:
          "A full-lifecycle people-strategy project for a partner company — from diagnosis to board presentation to implementation plan.",
      },
    },
  ],
  faculty: [
    { name: "Dr Francis Rebello", role: "Former Head - HR", org: "Plan International" },
    { name: "Dr Rakshita Sharma", role: "Former CHRO", org: "Bobble AI" },
    { name: "Sumoya Ghosh", role: "People Experience Partner", org: "Google" },
    { name: "Manoj Kohli", role: "Former CEO", org: "Airtel" },
    { name: "Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Dr Kashika Sud", role: "PhD", org: "IIM Ahmedabad" },
    { name: "Dr Rinku Mahindru", role: "PhD", org: "Delhi University" },
    { name: "Shivanee Pethe", role: "PhD", org: "IIM Calcutta" },
    { name: "Dr Aarti Sharma", role: "PhD", org: "Shiv Nadar University" },
    { name: "Dr Meha Kohli Mishra", role: "PhD", org: "VCU" },
    { name: "Dr Garima Chaklader", role: "PhD", org: "IIM Bangalore" },
    { name: "Rajesh Madhavan", role: "Advisor", org: "AlphaBeta" },
  ],
  immersions: [
    "Cornell University — HR analytics & workforce science with Dr Daniel GVD Vliet",
    "IIM Bangalore — organisation design case studies with Indian conglomerates",
    "Aon Global Center — total-rewards benchmarking & job architecture",
    "Optional summer track at Babson, IESEG France or SDA Bocconi",
  ],
  jobRoles: [
    "HR Business Partner",
    "Talent Acquisition Lead",
    "Compensation & Benefits Analyst",
    "Organisation Design Consultant",
    "People Analytics Manager",
    "L&D Strategist",
    "Executive Coach (ICF)",
    "Culture & Engagement Lead",
    "HR Tech Product Manager",
    "CHRO Track",
  ],
};

export const Route = createFileRoute("/programmes/hr-and-organisation-strategy")({
  head: () => ({
    meta: [
      { title: "PGP in Human Resources & Organisation Strategy — Masters' Union" },
      {
        name: "description",
        content:
          "A 16-month PGP with Aon in HR analytics, culture, compensation, and executive coaching — ICF certification included. Commencement Aug '26.",
      },
      {
        property: "og:title",
        content: "PGP in Human Resources & Organisation Strategy — Masters' Union",
      },
      {
        property: "og:description",
        content:
          "Built with Aon. AI-native people analytics, ICF coaching credential, real client work. Aug '26 batch.",
      },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
