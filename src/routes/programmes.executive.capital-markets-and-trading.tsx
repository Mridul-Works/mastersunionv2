import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP in Capital Markets & Trading",
  shortName: "CMT",
  tagline:
    "A 12-month blended programme for traders, investors, and analysts — six modules across equities, derivatives, quant, fixed income, real estate, and crypto, with a real ₹40L trading corpus and 24/7 Bloomberg Terminal access.",
  duration: "12 months",
  mode: "Blended — weekend online + in-person",
  commencement: "Rolling cohorts",
  intro:
    "Designed for traders, investors, brokers, analysts, and asset managers who want to move from opinions to systems. Every module pairs market theory with live execution — real capital, real terminals, real journaling.",
  whyNow: [
    "Fees: ₹50,000 admission + ₹20,50,000 tuition = ₹21,00,000 total (GST-exempt). Weekend format built for practitioners already in the market.",
    "The applied component is entirely markets-based — the Masters' Union Investment Fund, the Bloomberg Lab, and partnerships with Upstox and StockEdge replace influencer-led advice with structured, risk-managed execution.",
  ],
  edge: [
    {
      title: "Trade a real ₹40 Lakh corpus",
      body: "The Masters' Union Investment Fund gives students a live Demat account to design and execute equity and derivative strategies with genuine P&L consequences.",
    },
    {
      title: "24/7 Bloomberg Terminal access for 2 years",
      body: "Unlimited access to the Masters' Union Bloomberg Lab at the Gurugram DLF Cyberpark campus — live dashboards, multi-asset data, and custom research.",
    },
    {
      title: "Built with Upstox and StockEdge",
      body: "Upstox experts co-design curriculum and run live market walkthroughs; StockEdge coaches intraday and short-term frameworks on real NSE & BSE data.",
    },
    {
      title: "From discretionary to systematic",
      body: "Python for financial data, ARCH/GARCH volatility modelling, Monte Carlo VaR, and structured backtesting turn instinct into coded, testable strategy.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Foundations of Capital Markets, Investment Analysis & Equity Derivatives",
      summary:
        "Market theory becomes muscle memory — statements and candlesticks in class, real money traded from the ₹40L fund out of class.",
      outcomes: ["₹40L REAL CAPITAL", "EQUITY HACKATHON", "METATRADER 5.0", "RULES-BASED TRADING"],
      courses: [
        "Capital markets ecosystem: players, price discovery, order types, circuit filters",
        "Risk & return: asset allocation, Efficient Frontier, Sharpe/Treynor/Jensen, VaR & CVaR",
        "Fundamental analysis & valuation: ratios, comparables, earnings forecasting",
        "Financial modelling in Excel: TVM, DCF, dashboards, sensitivity charting",
        "Technical analysis: candles, support/resistance, Fibonacci, Dow Theory, RSI, MACD",
        "Derivatives & Greeks: futures, margins, Delta/Gamma/Theta/Vega, Black-Scholes",
        "Tool training: TradingView, Chartink, MetaTrader 5.0",
      ],
      challenge: {
        name: "Equity Hackathon with the MU Investment Fund",
        description:
          "Invest and trade a real ₹40 Lakh corpus on MU's Demat account — design valuation and derivative strategies, execute rules-based trades with documented entry-exit logic, and defend your risk-mitigation approach.",
      },
    },
    {
      n: 2,
      title: "Applied Trading, Commodities, Derivatives & Risk Management",
      summary:
        "Risk discipline joins conviction — hedging and commodity cycles in class, a public trading brand and Bloomberg research out of class.",
      outcomes: [
        "BLOOMBERG TERMINAL",
        "PERSONAL TRADING BRAND",
        "OPTIONS HEDGING",
        "COMMODITY TRADING",
      ],
      courses: [
        "Global regulation: SEBI, MiFID II, SEC, KYC/AML/FATCA, RegTech",
        "Day trading: opening range, gaps, CRP & VWAP, breakout and pullback setups",
        "Swing trading: moving averages, MACD, RSI divergence, Bollinger, ATR, position sizing",
        "Hedging: covered calls, collars, straddles, iron condors, risk parity, CPPI",
        "Exotic derivatives: barrier, Asian, lookback, quanto, swaptions, cliquet, digital",
        "Commodities: macro drivers, energy/metals/agri, EIA/OPEC/CFTC data, hedging",
        "Trading psychology: cognitive biases, mindfulness, the mental trading game",
      ],
      challenge: {
        name: "Creatorpreneur + Bloomberg Lab",
        description:
          "Build a personal finance brand across LinkedIn, YouTube, and Meta with a 15-post content calendar, while running live Bloomberg terminal research across equity, fixed income, commodity, FX, and macro data.",
      },
    },
    {
      n: 3,
      title: "Quantitative Trading, Forex, REITs & Smart Money",
      summary:
        "Trading becomes systematic — coded, backtested strategies alongside how India's wealth management industry is actually built.",
      outcomes: [
        "PYTHON FOR FINANCE",
        "BACKTESTED STRATEGIES",
        "REIT VALUATION",
        "SMART MONEY CONCEPTS",
      ],
      courses: [
        "Quant strategies: factor models, momentum, mean reversion, backtesting",
        "Volatility modelling: ARCH/GARCH, VIX, delta-neutral trading",
        "Risk models: Brownian motion, historical/parametric/Monte Carlo VaR, stress testing",
        "Forex: market structure, macro drivers, RBI/FEMA/LRS, USDINR hedging",
        "Real estate & REITs: NAV, FFO, cap rates, PropTech, REIT taxation",
        "Smart money: liquidity pools, stop hunts, fair value gaps, Nifty & Bank Nifty cases",
        "ESG & green finance: metrics, green bonds, sustainable portfolios",
      ],
      challenge: {
        name: "WealthPreneur + Python for Financial Data",
        description:
          "Study how Indian wealth management firms are built and regulated (RIA, MFD, PMS, AIF), and build Python workflows with Pandas, NumPy, Matplotlib and Seaborn to analyse and visualise market data.",
      },
    },
    {
      n: 4,
      title: "Fixed Income, AIF, Digital Assets, AI & Market Microstructure",
      summary:
        "The toolkit stretches across bonds, private markets, and crypto — closing with a defensible, risk-aware fixed-income thesis.",
      outcomes: ["FIXED INCOME CAPSTONE", "CRYPTO & DIGITAL ASSETS", "AI FOR FINANCE", "ALGO TRADING"],
      courses: [
        "Debt markets: G-Secs, T-Bills, SDLs, corporate bonds, duration, convexity, yield curves",
        "Securitisation: ABS, MBS, CDOs, 2008 lessons, RBI Retail Direct",
        "Alternatives: AIF Categories I–III, PE & VC lifecycle, distressed investing under IBC",
        "Digital assets: blockchain, exchanges, custody, crypto derivatives, regulation",
        "Global flows: FDI, FPI, balance of payments, FATCA/CRS/DTAA",
        "AI for quant finance: GPT/Claude/Perplexity, AI screening, LLMs for earnings & macro",
        "Market microstructure: auction theory, order flow, imbalances, intraday frameworks",
      ],
      challenge: {
        name: "Global Fixed Income & Yield Curve Capstone",
        description:
          "Interpret macro and monetary signals, construct yield-curve positioning strategies, evaluate trade performance, and formulate risk-aware recommendations — alongside HNI/UHNI advisory simulations and algo trading in Python.",
      },
    },
    {
      n: 5,
      title: "Real Estate & Alternative Investments",
      summary:
        "Real estate and alternatives become a full asset class you can underwrite and defend.",
      outcomes: ["REIT & PROPTECH", "ESG INVESTING", "ALTERNATIVE ASSETS", "REAL ESTATE CAPSTONE"],
      courses: [
        "REIT opportunities: NAV, FFO, cap rates, market cycles, leverage and liquidity risk",
        "Portfolio diversification: MPT, risk parity, PE, hedge funds, real assets, distressed",
        "ESG and green bonds: metrics, frameworks, carbon and compliance risk",
        "Urbanisation & tech: Smart City, PropTech, AI/IoT in valuation",
        "Debt trading: bond pricing, yields, duration, spreads, active vs passive",
        "CDOs & ABS: tranching, cash-flow waterfalls, credit enhancement, synthetic structures",
      ],
      challenge: {
        name: "Real Estate Evaluation & Investment Framework",
        description:
          "Build and defend a real estate investment decision framework synthesising valuation, macro reasoning, and strategy — while designing a wealth management firm's portfolios, tech stack, and risk systems.",
      },
    },
    {
      n: 6,
      title: "Cryptocurrency, PE/VC & Global Investment Strategy",
      summary:
        "Closes at the frontier — crypto and private capital — with an actual VC term sheet as the final proof of readiness.",
      outcomes: [
        "VC TERM SHEET CAPSTONE",
        "CRYPTO TRADING",
        "GLOBAL CAPITAL FLOWS",
        "HNWI WEALTH PILOT",
      ],
      courses: [
        "Blockchain & crypto fundamentals; crypto vs equity markets; mining and risk psychology",
        "Advanced crypto trading: futures, options, margin, tax and security challenges",
        "Bitcoin & Ethereum: halving cycles, network upgrades, Indian regulation and custody",
        "PE/VC strategies for public markets: event-driven signals from exits, lock-ins, block deals",
        "Global capital flows: FDI, portfolio flows, BoP, fintech and green finance",
        "Cross-border taxation: DTAs, FATCA, CRS, tax-efficient global reporting",
      ],
      challenge: {
        name: "PE/VC Deal Evaluation & Term Sheet Capstone",
        description:
          "Evaluate a real-world startup deal, perform investment analysis, construct a VC term sheet, and build an execution thesis — with advanced Bloomberg analytics, API integration, and strategy backtests.",
      },
    },
  ],
  faculty: [
    { name: "Sanjiv Bhasin", role: "Former Director", org: "IIFL" },
    { name: "Nikhil Rungta", role: "Co-Chief Investment Officer", org: "NSE" },
    { name: "Aman Singhania", role: "SVP & Head, Financial Products", org: "NSE" },
    { name: "Kunal Bothra", role: "Market Expert & Consultant", org: "The Economic Times" },
    { name: "Venkatachalam Srivatsa", role: "Executive Vice President", org: "UTI" },
    { name: "Siddhartha Rastogi", role: "Managing Director", org: "Ambit" },
    { name: "Vaibhav Jain", role: "Partner, Investments", org: "Edelweiss" },
    { name: "Arnab Ghosh", role: "Former Director, Operations & Risk", org: "Macquarie" },
    { name: "Neeraj Gupta", role: "Corporate Trainer", org: "NSE" },
    { name: "Abhishek Gupta", role: "Former VP, Market Risk", org: "Credit Suisse" },
    { name: "Rajesh Madhavan", role: "Visiting Faculty, Investments", org: "IIM" },
    { name: "Payal Jain", role: "Partner", org: "Loestro" },
    { name: "Vijaya Bhaskar Marisetty", role: "Former Associate Professor", org: "IIM" },
    { name: "Himanshu Jain", role: "Co-Founder", org: "Wall Street" },
    { name: "Aswini Bajaj", role: "Visiting Faculty, Investments", org: "NSE" },
  ],
  immersions: [
    "Masters' Union Bloomberg Lab — unlimited 24/7 terminal access at Gurugram (DLF Cyberpark) for 2 years",
    "Masters' Union x Upstox — co-designed curriculum and live market walkthroughs with Upstox experts",
    "Masters' Union x StockEdge — intraday and short-term frameworks coached on NSE & BSE data",
    "Masters' Union Investment Fund — a student-run ₹40 Lakh live trading desk",
  ],
  jobRoles: [
    "Equity Research Analyst",
    "Derivatives Trader",
    "Portfolio Manager",
    "Quantitative Analyst",
    "Wealth Manager (HNI/UHNI)",
    "Risk Analyst",
    "Fixed Income Strategist",
    "Commodity & FX Trader",
    "PE/VC Investment Associate",
    "Independent Trader",
  ],
};

export const Route = createFileRoute("/programmes/executive/capital-markets-and-trading")({
  head: () => ({
    meta: [
      { title: "PGP in Capital Markets & Trading — Masters' Union" },
      {
        name: "description",
        content:
          "A 12-month blended trading programme with a real ₹40L trading corpus, 24/7 Bloomberg Terminal access, and six modules across equities, quant, fixed income and crypto.",
      },
      { property: "og:title", content: "PGP in Capital Markets & Trading — Masters' Union" },
      {
        property: "og:description",
        content:
          "Trade real capital, use Bloomberg Terminals for two years, and build backtested strategies with NSE, Upstox and StockEdge practitioners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
