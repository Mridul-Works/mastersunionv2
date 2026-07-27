import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "Bloomberg Equity Research Programme",
  shortName: "Bloomberg",
  tagline:
    "12 months of monthly, self-paced equity research theory paired with 24 months of unlimited Bloomberg Terminal access at the Masters' Union Gurugram Lab.",
  duration: "12 months theory + 24 months lab access",
  mode: "Hybrid — flexible, self-paced",
  commencement: "Rolling cohorts",
  intro:
    "Designed for investors, traders, brokers, analysts, and asset managers. The programme is built around a single asset — two years of unlimited terminal time — with each month adding one professional research skill you immediately practise on live markets.",
  whyNow: [
    "Fee: ₹9,00,000 total (Round 1). Flexible, self-paced monthly sessions mean no career interruption.",
    "Out-class access runs throughout: unlimited 24/7 Bloomberg Terminal use for two years, monthly Mentor Union sessions with industry experts matched to your interests, and academic plus market research access for live industry study.",
  ],
  edge: [
    {
      title: "Two years of unlimited terminal access",
      body: "24/7 Bloomberg Terminals at the Masters' Union Bloomberg Lab, Gurugram campus — the same tooling used by professional research desks.",
    },
    {
      title: "Monthly Mentor Union",
      body: "One-to-one and small-group access to industry experts aligned to your specific market interests, every month of the programme.",
    },
    {
      title: "Creator Lab and Power Conversations",
      body: "End-to-end creator workflows with podcasting and media-production infrastructure, plus closed-door conversations with figures like Kishore Biyani, Ronnie Screwvala, Kunal Bahl and Nitin Gadkari.",
    },
    {
      title: "One skill per month, immediately applied",
      body: "Every module maps to a concrete terminal capability — data extraction, macro tracking, event studies, dashboards — practised on live markets, not case PDFs.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Months 1–3 — Navigation, Data Integrity & Excel Integration",
      summary:
        "Learn the terminal's command logic, extract clean market data, and move it into Excel responsibly.",
      outcomes: ["TERMINAL NAVIGATION", "CLEAN MARKET DATA", "EXCEL INTEGRATION"],
      courses: [
        "Month 1: Bloomberg command structure, navigation logic, saved workspaces",
        "Month 2: historical price and volume extraction for Indian equities and indices; time periods, frequencies, corporate actions and adjusted prices",
        "Month 3: pulling Bloomberg data into Excel, structuring sheets for prices and returns, managing live versus static data",
      ],
      challenge: {
        name: "Bloomberg Lab — Foundations",
        description:
          "Build your own saved workspace and a clean, corporate-action-adjusted price and returns workbook for a self-selected Indian equity universe.",
      },
    },
    {
      n: 2,
      title: "Months 4–6 — Firm, Sector & Macro Research",
      summary:
        "Move from single securities to peer sets, sectors, and the macro-policy backdrop that moves them.",
      outcomes: ["PEER COMPARISON", "SECTOR ANALYSIS", "MACRO & RBI TRACKING"],
      courses: [
        "Month 4: firm-level statements and ratios, standardising data, peer comparisons for Indian listed firms",
        "Month 5: sector indices and classifications, cross-cycle sector performance, identifying sector leaders",
        "Month 6: Indian macroeconomic indicators, RBI policy decisions, economic calendars, macro-market interpretation",
      ],
      challenge: {
        name: "Sector & Macro Research Note",
        description:
          "Produce a peer-comparison and sector-performance note for one Indian sector, positioned against the current RBI policy and macro cycle.",
      },
    },
    {
      n: 3,
      title: "Months 7–9 — Fixed Income, Cross-Asset & Event Flow",
      summary:
        "Read yield curves, connect global markets to India, and link news flow to price movement.",
      outcomes: ["YIELD CURVE READING", "CROSS-ASSET LINKAGES", "EVENT TIMELINES"],
      courses: [
        "Month 7: Indian government bond yields and benchmarks, yield curves, spreads, term structures, policy transmission",
        "Month 8: commodities and currency pairs, global-to-India transmission channels, cross-asset correlations",
        "Month 9: corporate announcements and macro events, building event timelines, linking news flow with prices",
      ],
      challenge: {
        name: "Cross-Asset Event Study",
        description:
          "Build an event timeline for a major macro or corporate announcement and trace its transmission across bonds, currencies, commodities and equities.",
      },
    },
    {
      n: 4,
      title: "Months 10–12 — Event Research, Dashboards & Full Workflow",
      summary:
        "Formalise event-based research, build monitoring dashboards, and assemble an end-to-end research workflow you can run independently.",
      outcomes: [
        "EVENT-BASED RESEARCH",
        "CUSTOM DASHBOARDS",
        "ESG ANALYTICS",
        "END-TO-END WORKFLOW",
      ],
      courses: [
        "Month 10: price behaviour before and after events, clean observation windows, cross-event comparison",
        "Month 11: multi-asset dashboards, monitoring indicators across markets and time, daily-use customisation",
        "Month 12: ESG scores, disclosures and risk indicators; comparing ESG across firms and sectors; interpreting ESG alongside performance",
      ],
      challenge: {
        name: "End-to-End Bloomberg Research Workflow",
        description:
          "Deliver a complete research workflow — data extraction through dashboard monitoring and ESG-aware conclusions — that you can rerun independently on any coverage universe.",
      },
    },
  ],
  faculty: [
    { name: "Neeraj Gupta", role: "Corporate Trainer", org: "Capital Markets" },
    { name: "Sudhanshu Kanwar", role: "Former VP, Global Banking & Markets", org: "Banking" },
    { name: "Kunal Bothra", role: "Consultant, Market Expert", org: "Capital Markets" },
    { name: "Himanshu Arora", role: "Visiting Faculty", org: "Masters' Union" },
    { name: "Rahul Khetawat", role: "Former SVP", org: "Financial Services" },
    { name: "Rakesh Nair", role: "Head of Academics & Delivery", org: "Masters' Union" },
    { name: "Chilukuri Vajaya Kumar", role: "Market Trainer", org: "Capital Markets" },
    { name: "Paramjeet Singh Chopra", role: "Former Executive Director", org: "Banking" },
    { name: "Vaibhav Jain", role: "Partner, Investments", org: "Edelweiss" },
    { name: "Sanjeev Bhasin", role: "Former Director", org: "IIFL" },
  ],
  immersions: [
    "Bloomberg Lab — unlimited 24/7 terminal access at the Gurugram campus for 2 years",
    "Creator Lab — end-to-end creator workflows with podcasting and media-production infrastructure",
    "Power Conversations — closed-door sessions with leaders including Kishore Biyani, Ronnie Screwvala, Kunal Bahl and Nitin Gadkari",
    "Monthly Mentor Union — industry experts matched to your market interests",
  ],
  jobRoles: [
    "Equity Research Analyst",
    "Buy-Side Analyst",
    "Investment Analyst",
    "Portfolio Analyst",
    "Macro Research Associate",
    "Asset Manager",
    "Independent Investor",
  ],
};

export const Route = createFileRoute("/programmes/executive/bloomberg-equity-research")({
  head: () => ({
    meta: [
      { title: "Bloomberg Equity Research Programme — Masters' Union" },
      {
        name: "description",
        content:
          "12 months of equity research theory plus 24 months of unlimited Bloomberg Terminal access at the Masters' Union Gurugram Lab, with monthly Mentor Union sessions.",
      },
      { property: "og:title", content: "Bloomberg Equity Research Programme — Masters' Union" },
      {
        property: "og:description",
        content:
          "One professional research skill a month, practised live on Bloomberg Terminals — closing with a full end-to-end research workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
