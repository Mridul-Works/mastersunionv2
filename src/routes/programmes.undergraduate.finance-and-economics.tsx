import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "UG in Finance & Economics",
  shortName: "UG Finance",
  tagline:
    "A four-year degree with integrated CA or CFA pathways — and eight out-class terms where you occupy a different seat on the finance floor each time, from equity analyst to portfolio manager.",
  duration: "4 Years (incl. CA articleship or CFA Levels I-III)",
  mode: "Full-Time, Opt-in Residential — Gurugram",
  commencement: "Aug '26",
  intro:
    "Open to Class XII current students and pass-outs. A full CA or CFA-track curriculum runs in parallel with eight out-class role challenges — each with a real deliverable, from a DCF model to an institutional portfolio built on Bloomberg terminals.",
  whyNow: [
    "Finance hiring rewards people who have already done the job. The programme structures every term around a different professional seat with a deliverable to match.",
    "Students run a ₹5 Cr Masters' Union Investment Fund and a ₹50L Beat The Sensex portfolio — real capital, audited returns, not simulations.",
    "Big 4 articleships with EY, KPMG, Deloitte and PwC, plus 200+ companies recruiting for internships — 85%+ of students intern in Year 1.",
  ],
  edge: [
    {
      title: "Choose your professional track — CA or CFA",
      body: "A CA pathway with a 2-year articleship and Foundation → Inter → Final coverage, or a CFA pathway covering Levels I-III with valuation, derivatives, and portfolio management.",
    },
    {
      title: "Eight finance roles, eight real deliverables",
      body: "Equity analyst, mutual fund manager, wealth manager, investment banker, PE/VC analyst, tax strategist, auditor, and portfolio manager — one per term.",
    },
    {
      title: "Real capital under management",
      body: "A ₹5 Cr student-managed fund across equities, startups, crypto, real estate and commodities (10+ investments/year, 65%+ returns in 2024-25), plus a ₹50L Beat The Sensex portfolio with 53% realised gains over 3 years.",
    },
    {
      title: "Global finance immersions",
      body: "Europe (UN, Rabobank, Mercedes-Benz), Singapore (Temasek, Agoda, Singtel), Japan (Rakuten, Nissan, Kyoto Research Park), and the London and New York financial hubs.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Year 1 — Lay the Foundations of Finance, Accounting & Markets",
      summary:
        "Accounting, economics and statistics on the CA track; markets, fixed income and corporate finance on the CFA track — with the first two role challenges running alongside.",
      outcomes: ["EQUITY RESEARCH REPORT", "₹50L VIRTUAL PORTFOLIO", "FINANCIAL STATEMENT MASTERY", "EXCEL FOR FINANCE"],
      courses: [
        "CA: Fundamentals of Accounting · Advanced Accounting · Microeconomics · Macroeconomics",
        "CA: Business Statistics · Business Law & Regulatory Framework · Corporate Laws · Other Laws",
        "CA: Income Tax · Indirect Taxes · Quantitative Techniques & Logical Reasoning",
        "CFA: Introduction to Stock Markets · Fixed Income · Quantitative Methods I · Corporate Finance I",
        "CFA: Excel for Finance · AI Tools in Trading",
        "The Art of Communication",
      ],
      challenge: {
        name: "Equity Analyst → Mutual Fund Manager",
        description:
          "Term 1: publish an equity report with a DCF and comparables valuation. Term 2 (Beat the Sensex): run a ₹50L virtual multi-asset portfolio and defend a backtested strategy report. Hands-on work includes consolidating multi-subsidiary statements and forensic analysis of a public company.",
      },
    },
    {
      n: 2,
      title: "Year 2 — Master Compliance, Valuation & Investment Core",
      summary:
        "Audit, cost accounting and financial management on the CA track; valuation, portfolio management, PE/VC and investment banking on the CFA track.",
      outcomes: ["HNI WEALTH PLAN", "M&A DECK & VALUATION", "CAPM PORTFOLIO BUILD", "TALLY ERP MASTERY"],
      courses: [
        "CA: Auditing & Ethics · Cost & Management Accounting · Financial Management · Strategic Management",
        "CA: Business Finance with Tally · Intro to PowerPoint & Excel · AI Tools in Trading",
        "CFA: Corporate Finance II · Quantitative Methods II · Alternative Investments I",
        "CFA: Financial Reporting and Analysis I & II · Ethics & Professional Standards",
        "CFA: Portfolio Management · Sustainable Finance & ESG Investing",
        "CFA: Private Equity & Venture Capital · Investment Banking · Industry Primers",
      ],
      challenge: {
        name: "Wealth Manager → Investment Banker",
        description:
          "Term 3 (WealthPreneur): build an HNI client wealth plan with goal-based, tax-optimised allocation. Term 4: build an M&A deck and valuation model and defend it before a mock board. Projects include capital budgeting with NPV/IRR and a risk-based audit simulation.",
      },
    },
    {
      n: 3,
      title: "Year 3 — Advance into Risk, Strategy & Asset Management",
      summary:
        "Financial reporting and advanced assurance on the CA track; equity valuation, derivatives and multi-factor strategy on the CFA track.",
      outcomes: ["PE/VC INVESTMENT MEMO", "CROSS-BORDER TAX MODEL", "BLACK-SCHOLES VALUATION", "MULTI-FACTOR BACKTEST"],
      courses: [
        "CA: Financial Reporting · Advanced Financial Management · Advanced Auditing and Ethics",
        "CFA: Fixed Income II · Quantitative Methods III · Economics for Investment Management",
        "CFA: Equity Valuation · Advanced Financial Reporting & Analysis · Corporate Issuers",
        "CFA: Portfolio Management & Wealth Planning · Derivatives II",
        "CFA: Investment Exit Strategies · Alternative Investments II · Ethics II",
      ],
      challenge: {
        name: "Startup Investment Analyst → Tax Strategist",
        description:
          "Term 5: write an investment memo and exit model from a sector thesis. Term 6 (The Tax Playbook): produce a tax report and computation model covering cross-border cases. Projects include forecasting asset returns and backtesting an active multi-factor equity strategy.",
      },
    },
    {
      n: 4,
      title: "Year 4 — Emerge as a Complete Finance Professional",
      summary:
        "Integrated business solutions and international taxation on the CA track; asset allocation and institutional portfolio construction on the CFA track.",
      outcomes: ["AUDIT REPORT & RISK MATRIX", "BLOOMBERG PORTFOLIO CAPSTONE", "BIG 4 ARTICLESHIP", "ASSET ALLOCATION FRAMEWORK"],
      courses: [
        "CA: Indirect Tax Laws · Integrated Business Solutions · Direct Tax Laws & International Taxation",
        "CFA: Advanced Portfolio Management Strategies · Portfolio Construction",
        "CFA: Portfolio Performance & Attribution · Derivatives & Risk Management",
        "CFA: Asset Allocation · Ethics & Professional Standards III",
      ],
      challenge: {
        name: "Controls & Assurance → Portfolio Manager",
        description:
          "Term 7 (Financial Audit Challenge): deliver an audit report and risk matrix using IND-AS and Tally. Term 8: build a final portfolio report on Bloomberg terminals, alongside an institutional portfolio optimisation and a hedging strategy backtest.",
      },
    },
  ],
  faculty: [
    { name: "Rajat Mathur", role: "Former Managing Director", org: "Morgan Stanley" },
    { name: "Dr Arvind Mayaram", role: "Former Finance Secretary", org: "Government of India" },
    { name: "Dr Rinku Mahindru", role: "PhD", org: "Delhi School of Economics" },
    { name: "Dr Meenakshi Rishi", role: "Professor of Economics", org: "Seattle University" },
    { name: "Havish Madvapathy", role: "Master Trainer", org: "PwC" },
    { name: "Nitin Gaur", role: "Former Director, Financial Sciences", org: "IBM" },
    { name: "Aman Singhania", role: "SVP & Head, Financial Products", org: "NSE" },
    { name: "Vaibhav Jain", role: "Partner, Investments", org: "Edelweiss" },
    { name: "Abhishek Gupta", role: "Former VP, Market Risk", org: "Credit Suisse" },
    { name: "Himanshu Jain", role: "Co-Founder", org: "Wall Street" },
    { name: "Venkatachalam Srivatsa", role: "Executive Vice President", org: "UTI" },
    { name: "Nikhil Rungta", role: "Co-Chief Investment Officer", org: "LIC" },
    { name: "Gopal Iyer", role: "Former Associate Director", org: "EY" },
    { name: "CA Pulkit Marwaha", role: "Assistant Manager", org: "Deloitte" },
    { name: "Nikhil Nath", role: "Former VP", org: "Goldman Sachs" },
    { name: "Vishal Jain", role: "CEO", org: "Zerodha Fund House" },
    { name: "Nilay Arun", role: "Founder", org: "Alaavo" },
  ],
  immersions: [
    "Masters' Union Investment Fund — a ₹5 Cr student-managed fund, 10+ investments/year, 65%+ returns in 2024-25",
    "Beat The Sensex — a ₹50L fund across stocks, bonds, commodities and crypto, 53% realised gains over 3 years",
    "Europe — United Nations, Rabobank, Mercedes-Benz",
    "Singapore — Temasek, Agoda, Singtel",
    "Japan — Rakuten, Nissan, Kyoto Research Park",
    "UK & US financial hubs — London and New York",
    "Study abroad — Babson College, IÉSEG France, SDA Bocconi, Harvard",
    "Big 4+ articleship and internships — EY, KPMG, Deloitte, PwC; 200+ recruiting companies",
  ],
  jobRoles: [
    "Equity Research Analyst",
    "Investment Banking Analyst",
    "Chartered Accountant",
    "Portfolio Manager",
    "Wealth Manager",
    "PE / VC Analyst",
    "Risk & Assurance Associate",
    "Tax Strategist",
    "Corporate Finance Associate",
    "Quantitative Analyst",
  ],
};

export const Route = createFileRoute("/programmes/undergraduate/finance-and-economics")({
  head: () => ({
    meta: [
      { title: "UG in Finance & Economics (CA / CFA) — Masters' Union" },
      {
        name: "description",
        content:
          "A 4-year finance degree with integrated CA or CFA pathways, eight term-long finance roles, a ₹5 Cr student-managed fund, and Big 4 articleships with EY, KPMG, Deloitte and PwC.",
      },
      { property: "og:title", content: "UG in Finance & Economics (CA / CFA) — Masters' Union" },
      {
        property: "og:description",
        content:
          "Occupy a new seat on the finance floor every term — analyst, banker, VC, auditor, portfolio manager — alongside a full CA or CFA curriculum. Aug '26 batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
