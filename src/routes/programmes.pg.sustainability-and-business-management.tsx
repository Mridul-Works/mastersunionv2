import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PG Programme in Sustainability & Business Management",
  shortName: "Sustainability",
  tagline:
    "A 16-month PGP aligned to India's 2030 climate targets and 2070 net-zero goal — carbon accounting, ESG reporting, climate finance, and decarbonisation, taught by NASA, climate funds, and Fortune 500 ESG teams.",
  duration: "16-month Full-Time PGP",
  mode: "On-Campus, Gurugram",
  commencement: "Aug '26",
  intro:
    "India's climate targets have turned sustainability into a core business function. Companies now need talent that can measure carbon credibly, cut it operationally, and report it transparently under BRSR/ESG standards. This programme builds those capabilities.",
  whyNow: [
    "The curriculum is designed around the 17 UN Sustainable Development Goals and aligned to India's 2030 climate targets and 2070 net-zero pathway.",
    "Every term pairs foundational business courses with an outcome-focused challenge — from launching a sustainable D2C brand to drafting policy for HUL, Nykaa, or Blinkit, to producing BRSR-Core-ready ESG reports.",
    "Faculty includes practitioners from NASA, global climate funds, Tesla, Samsung, Airtel, and Fortune 500 ESG teams — plus policymakers from NITI Aayog and the Government of India.",
  ],
  edge: [
    {
      title: "SDG-linked curriculum for India's net-zero opportunity",
      body: "Every module maps to an SDG and to India's near-term decarbonisation reality — go-to-market for sustainable products, revenue models for new rules, and BRSR-aligned ESG reports.",
    },
    {
      title: "Global immersions where sustainability is being made",
      body: "UN Headquarters in Geneva, Rabobank HQ in Amsterdam, and smart-city decarbonisation study in Singapore.",
    },
    {
      title: "Careers into the climate economy",
      body: "Pathways into ESG consulting at EY, PwC, Deloitte; sustainability teams at Tata and Mahindra; and climate-tech at Samsung, Green Marble, and beyond.",
    },
    {
      title: "3+1 dual degree with Illinois Institute of Technology",
      body: "Optionally study abroad and earn a globally-recognised credential alongside the MU programme.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Fundamentals of Business & Sustainability",
      summary:
        "Ground yourself in business fundamentals and the global sustainability landscape — Paris Agreement, SDGs, and reading financial statements.",
      outcomes: [
        "GLOBAL SUSTAINABILITY LANDSCAPE",
        "ECOSYSTEM MAPPING",
        "SUSTAINABLE BRAND POSITIONING",
        "FINANCIAL STATEMENT LITERACY",
      ],
      courses: [
        "Global sustainability landscape — Paris, COP, SDGs",
        "Ecosystem mapping & materiality thinking",
        "Reading financial statements & investment decisions",
        "Positioning and pricing sustainable brands",
      ],
      challenge: {
        name: "Sustainable Dropshipping Challenge",
        description:
          "Launch a sustainability-led online business end-to-end and hit ₹5-10L in real GMV — real budgets, real customers, real fulfilment.",
      },
    },
    {
      n: 2,
      title: "Governance, Policy & ESG",
      summary:
        "Learn how sustainability is governed, regulated, and reported — through ESG frameworks, CSR, and Indian environmental law.",
      outcomes: ["ESG REPORTING FRAMEWORKS", "INDIAN ENVIRONMENTAL LAW", "CSR STRATEGY", "EXECUTIVE COMMUNICATION"],
      courses: [
        "ESG reporting: GRI, BRSR, ISSB, IFRS, CSRD",
        "Environmental regulation & compliance",
        "CSR Act & community engagement",
        "Executive communication for sustainability leaders",
      ],
      challenge: {
        name: "The Policy Playbook Challenge",
        description:
          "Step into a policymaker's shoes and draft a real sector-level sustainability regulation for FMCG, fashion, e-commerce, or logistics — model impact on HUL, Nykaa, or Blinkit.",
      },
    },
    {
      n: 3,
      title: "Carbon Markets & Climate Finance",
      summary:
        "Explore how carbon is measured, traded, financed, and monetised — and how climate-focused businesses are built around it.",
      outcomes: ["CARBON CREDIT MARKETS", "CLIMATE TECH INVESTING", "GHG PROTOCOL", "GREEN BONDS & SLLS"],
      courses: [
        "Carbon markets: compliance vs voluntary",
        "Climate tech VC & scaling models",
        "GHG Protocol & Scope 1/2/3 emissions",
        "Green bonds, SLLs, and climate finance instruments",
      ],
      challenge: {
        name: "Sustainable Investment Challenge",
        description:
          "Act as the ESG team for a listed-style company. Build a credible 2030 roadmap with net-zero, circularity, and Scope 3 strategies, and model 30-40% emission cuts.",
      },
    },
    {
      n: 4,
      title: "Renewable Energy Businesses",
      summary:
        "Understand how the renewable energy sector works — technology, business models, project economics, and scaling strategies.",
      outcomes: ["RENEWABLE VALUE CHAIN", "C&I POWER CONTRACTS", "BATTERY STORAGE MODELS", "PROJECT FINANCE"],
      courses: [
        "Renewable ecosystem: solar, wind, hydro, bioenergy",
        "Rooftop solar & C&I power contracts",
        "Storage-as-a-service & grid support",
        "Project finance: PPAs, tariffs, refinancing",
      ],
      challenge: {
        name: "Sustainability Reporting War Room",
        description:
          "Operate as a corporate sustainability team under scrutiny. Produce an investor-ready BRSR-Core / GRI / ISSB-aligned ESG report from fragmented multi-year data.",
      },
    },
    {
      n: 5,
      title: "Circular Economy & Waste",
      summary:
        "Turn waste, recycling, and circular systems into profitable businesses through smart design, ops, and market structure.",
      outcomes: ["CIRCULAR BUSINESS MODELS", "EPR COMPLIANCE", "RECYCLING VALUE CHAINS", "WASTE-TECH STARTUPS"],
      courses: [
        "Circular principles & product redesign",
        "MVP design & scale for circular startups",
        "Packaging, recycling, and EPR compliance",
        "Tech for circular economy: traceability, AI sorting",
      ],
      challenge: {
        name: "Waste to Wealth Innovation Lab",
        description:
          "Design a profitable circular venture around a real waste stream — H&M offcuts, Zomato packaging, or campus hostels — with unit economics and tCO₂e impact.",
      },
    },
    {
      n: 6,
      title: "Agritech & Sustainable Supply Chains",
      summary:
        "Understand how agritech, climate innovation, and sustainable supply chains are transforming food, agriculture, and global commerce.",
      outcomes: ["CLIMATE-SMART AGRICULTURE", "AGRITECH STARTUPS", "SUPPLY CHAIN RESILIENCE", "TRACEABILITY TECH"],
      courses: [
        "Climate-smart & regenerative agriculture",
        "Agritech ecosystem: DeHaat, Ninjacart, WayCool, CropIn",
        "Farm-to-fork supply chain & cold chain",
        "Sustainable & resilient supply chain design",
      ],
      challenge: {
        name: "Green Supply Chain Rearchitecture",
        description:
          "Rearchitect a real business's supply chain to cut emissions by 30% using EVs, rail, and SBTi-aligned supplier scorecards.",
      },
    },
    {
      n: 7,
      title: "Sustainability in Action: Sector Labs",
      summary:
        "Choose one sector — EV & Mobility, Construction, Textiles, Pharma, or FMCG — and go deep on its real sustainability challenges.",
      outcomes: ["SECTOR DEEP-DIVE", "EV & MOBILITY", "CIRCULAR FASHION", "INDUSTRY INTERNSHIP"],
      courses: [
        "Sector deep-dive: EV, Construction, Textiles, Pharma, or FMCG",
        "Sector-specific decarbonisation levers",
        "Industry case studies with sector leaders",
        "Preparing for the industry immersion",
      ],
      challenge: {
        name: "Industry Immersion Internship",
        description:
          "Step into the sustainability, ESG, or ops function of a real organisation — ESG reporting, decarbonisation, circular pilots, or supply chain optimisation.",
      },
    },
    {
      n: 8,
      title: "Careers, Consulting & Ventures",
      summary:
        "Prepare for the real world with career planning, consulting-style problem solving, and startup fundamentals.",
      outcomes: ["CAREER POSITIONING", "CASE INTERVIEW SKILLS", "FOUNDER MINDSET", "INVESTOR PITCHING"],
      courses: [
        "Career mapping across corporate, consulting, and climate tech",
        "Resume, LinkedIn, and interview prep",
        "Structured problem-solving & case interviews",
        "Founder mindset & investor pitching",
      ],
      challenge: {
        name: "Career Acceleration & Venture Sprint",
        description:
          "Convert your internship into a role — or build a venture thesis grounded in real market problems, validate MVPs, and pitch to industry experts and investors.",
      },
    },
  ],
  ventures: [
    {
      founder: "Pranjal Agrawal",
      startup: "Source With Solomon",
      description: "Sourcing authentic Indian products for global buyers with eco-friendly packaging.",
    },
    {
      founder: "Jaishree Soni",
      startup: "Saaha",
      description: "Luxury house turning Indian culture and craft into collectible limited-edition art.",
    },
    {
      founder: "Ananya Kulshrestha",
      startup: "Mellovia",
      description: "Non-toxic kitchenware from natural rice husk — durable, biodegradable, plastic-free.",
    },
  ],
  faculty: [
    { name: "Ruchira Shukla", role: "Founder & CEO", org: "Green Marble" },
    { name: "Michael Dioha", role: "Senior Energy Researcher", org: "Clean Air Task Force" },
    { name: "Rachel Konrad", role: "Former Director of Communications", org: "Tesla" },
    { name: "Dr Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Manoj Kohli", role: "Former CEO", org: "Airtel" },
    { name: "Elkana Ezekiel", role: "Former CMO", org: "Samsung" },
    { name: "Dr Bhaskar Chatterjee", role: "Father of Indian CSR", org: "Government of India" },
    { name: "Tanya Singhal", role: "Founder", org: "SolarArise" },
    { name: "Pawan Raj Kumar", role: "Partner", org: "ZeCa Capital" },
    { name: "Vivek Mehra", role: "Co-Founder", org: "OnlyGood" },
    { name: "Jayati Talapatra", role: "Sustainability Consultant", org: "Nalanda" },
    { name: "Sumeet Popli", role: "Founder", org: "Biome Build" },
  ],
  immersions: [
    "UN Headquarters, Geneva — sustainability policy",
    "Rabobank HQ, Amsterdam — climate finance",
    "Singapore — smart-city decarbonisation",
    "3+1 dual degree option at Illinois Institute of Technology, US",
  ],
  testimonials: [
    {
      name: "Archit Bhargava",
      role: "Analyst, Avaana Capital",
      quote:
        "The hands-on learning environment and Venture Capital program helped me understand how funds evaluate startups. The exposure to real investors was instrumental in securing my role at Avaana Capital — one of India's leading climate-tech VCs.",
    },
    {
      name: "Aashutosh Varakhedkar",
      role: "Expert – ESG, Trident Group",
      quote:
        "The programme's emphasis on data-driven decision-making and real-world problem solving strengthened my analytical thinking. Masters' Union has truly been the launchpad for my transition into the ESG domain.",
    },
    {
      name: "Yeshvanth Suresh",
      role: "Chief of Staff, Ather Energy",
      quote:
        "Live consulting projects and building a startup from scratch significantly improved my problem-solving ability. These experiences prepared me to crack a role with Ather.",
    },
    {
      name: "Yash Chhabra",
      role: "Investment Associate, Waterbridge Ventures",
      quote:
        "The Creator Challenge pushed me to build a startup and a VC-focused podcast. The mentorship helped me develop a strong perspective on evaluating new-age businesses and secure my role at Waterbridge.",
    },
  ],
  jobRoles: [
    "ESG Analyst / Consultant",
    "Sustainability Strategy Lead",
    "Climate Finance Analyst",
    "Carbon Markets Specialist",
    "Renewable Energy PM",
    "Circular Economy Founder",
    "Sustainable Supply Chain Lead",
    "Corporate Sustainability Officer",
    "Climate Tech Investor",
    "Policy & Regulation Advisor",
  ],
};

export const Route = createFileRoute("/programmes/pg/sustainability-and-business-management")({
  head: () => ({
    meta: [
      { title: "PGP in Sustainability & Business Management — Masters' Union" },
      {
        name: "description",
        content:
          "A 16-month PGP aligned to India's 2030 climate targets — carbon accounting, ESG reporting, climate finance. Faculty from NASA, Tesla, and Fortune 500 ESG teams.",
      },
      { property: "og:title", content: "PGP in Sustainability & Business Management — Masters' Union" },
      {
        property: "og:description",
        content:
          "SDG-linked curriculum, global immersions at the UN and Rabobank, real ESG reports and climate ventures. Aug '26 batch.",
      },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
