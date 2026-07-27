import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP Rise: General Management",
  shortName: "PGP Rise",
  tagline:
    "A 12-month blended general management programme for working professionals — finance, growth, product, and AI, taught through live ventures, campus residencies, and two global immersions.",
  duration: "12 months, incl. 2 immersions",
  mode: "Blended — weekend online + in-person",
  commencement: "Rolling cohorts",
  intro:
    "Built for working professionals who want the full operator toolkit without leaving their jobs. Four modules move from leadership foundations to real-world application, with a venture track that can end in real pre-seed funding.",
  whyNow: [
    "Fees: ₹75,000 admission (non-refundable) + ₹27,25,000 tuition = ₹28,00,000 total. Weekend classes keep you in your role while you build.",
    "Every module pairs in-class business fundamentals with an out-class challenge — a dropshipping business, an offline market stall, a VIP funding pitch — so learning is proven by outcomes, not attendance.",
  ],
  edge: [
    {
      title: "Venture Initiation Programme with real money",
      body: "Pitch through Pre-Seed, MVP, and Final Seed rounds — with ₹15L+ in pre-seed funding on the table for ventures that earn it.",
    },
    {
      title: "Two global immersions",
      body: "SDA Bocconi in Italy for global business perspective, and H-Farm — Italy's No.1 startup hub — with visits historically including Ferrari and Dyson.",
    },
    {
      title: "Practitioner faculty only",
      body: "Morgan Stanley MDs, ex-Accenture MDs, ex-PayPal product directors, and ex-Zomato sales SVPs teach the exact functions they ran.",
    },
    {
      title: "Tool training in every module",
      body: "Advanced Excel, Power BI, Figma, and Canva — plus prompt engineering, no-code app building, and AI-powered product work.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Leadership Foundation",
      summary:
        "Operating basics — reading a P&L, telling a brand story, using data to argue a point — plus an on-campus orientation that turns a cohort into a network.",
      outcomes: [
        "ORIENTATION RESIDENCY",
        "FINANCE FOUNDATIONS",
        "PERSONAL BRANDING",
        "AI PROMPT ENGINEERING",
      ],
      courses: [
        "Finance & Fintech: reading and analysing financial statements, allocating costs & budgets",
        "Sales & Marketing: taking an idea to market, narrating a captivating brand story",
        "Leadership: speeches that inspire, personal brand, winning over others, consumer choice",
        "Product & Tech: using statistics to build a better business",
        "AI & ML: mastering prompt engineering to leverage generative AI",
        "Tool Training: advanced Excel for data analysis · Career Prep: crafting a winning resume",
      ],
      challenge: {
        name: "Campus Residency: Orientation",
        description:
          "Connect with fellow leaders on campus, explore the ecosystem, and network with industry experts before the first module begins.",
      },
    },
    {
      n: 2,
      title: "Growth & Scaling",
      summary:
        "Money on the table — a live dropshipping store and an original idea pitched at VIP Pre-Seed.",
      outcomes: [
        "DROPSHIPPING CHALLENGE",
        "VIP PRE-SEED PITCH",
        "NO-CODE PRODUCT BUILD",
        "POWER BI",
      ],
      courses: [
        "Finance & Fintech: how companies manage money, leveraging DeFi and crypto",
        "Sales & Marketing: decoding consumer psyche, market research decisions",
        "Leadership: stakeholder interests, macroeconomics, competitive strategy, hacking your hormones",
        "Product & Tech: building AI-powered products · AI & ML: building a no-code app",
        "Tool Training: Power BI · Career Prep: an attractive LinkedIn profile",
      ],
      challenge: {
        name: "Dropshipping Challenge + VIP Pre-Seed",
        description:
          "Design your website, launch marketing campaigns, streamline supply chain, and compete for maximum revenue — then pitch bold ideas to entrepreneurs, experts, and investors for funding.",
      },
    },
    {
      n: 3,
      title: "Advanced Leadership & Impact",
      summary:
        "The idea survives contact with real customers — literally, at a market stall — and with real investors.",
      outcomes: [
        "OFFLINE MARKET STALL",
        "₹15L+ PRE-SEED FUNDING",
        "MVP BUILD",
        "FIGMA UX/UI",
      ],
      courses: [
        "Finance & Fintech: financial models, IPOs and company worth",
        "Sales & Marketing: leveraging social media algorithms",
        "Product & Tech: building habit-forming products",
        "Leadership: mental models, effective meetings, entering new markets",
        "AI & ML: analysing data · Tool Training: UX/UI design in Figma",
        "Career Prep: crafting a compelling personal portfolio",
      ],
      challenge: {
        name: "Market Stall Residency + VIP: MVP",
        description:
          "Bring your dropshipping business offline — set up a real market stall, sell to customers, and take mentor feedback — then validate and present your startup to fight for ₹15+ lakhs in pre-seed funding.",
      },
    },
    {
      n: 4,
      title: "Real-world Application",
      summary:
        "Closes on three fronts — global immersion for perspective, Creator Challenge for audience, and a Final Seed Round for a real funding outcome.",
      outcomes: [
        "GLOBAL B-SCHOOL IMMERSION",
        "CREATOR CHALLENGE",
        "VIP FINAL SEED ROUND",
        "GTM + PMF",
      ],
      courses: [
        "Finance & Fintech: international finance, startup capital raising, structuring M&A",
        "Sales & Marketing: selling without selling, building stellar brands and pricing",
        "Leadership: value-creating deals, competitive moves, leading with empathy, delegation",
        "Product & Tech: enhancing product performance using data",
        "Tool Training: powerful presentations in Canva · Career Prep: interview preparation",
      ],
      challenge: {
        name: "Global Immersion + VIP Final Seed Round",
        description:
          "Engage with global C-suite leaders through industrial visits and sessions at B-schools like INSEAD and SDA Bocconi, build an influencer brand in the Creator Challenge, and master GTM + PMF to secure seed funding.",
      },
    },
  ],
  faculty: [
    { name: "Rajat Mathur", role: "MD", org: "Morgan Stanley" },
    { name: "Malthi S. S.", role: "Former Director, Product Management", org: "PayPal" },
    { name: "Subhonil Ghoshal", role: "Former MD", org: "Accenture" },
    { name: "Akshay Gurnani", role: "Co-founder & CEO", org: "Schbang" },
    { name: "Mukesh Ghuraiya", role: "Chief Marketing Officer", org: "Modi Naturals" },
    { name: "Vikrant Khorana", role: "Former Chief Innovation Officer", org: "Payswiff" },
    { name: "Siddarth Menon", role: "Former CMO", org: "Epigamia" },
    { name: "Sindhu Biswal", role: "Former Head of Growth & Marketing", org: "Betterhalf" },
    { name: "Gopal Iyer", role: "Former Associate Director", org: "EY" },
    { name: "Divij Bajaj", role: "Data & Applied Scientist", org: "Microsoft" },
    { name: "Jishnu Changkakoti", role: "Former Director, Marketing", org: "Samsung" },
    { name: "Saurabh Sengupta", role: "Former SVP, Sales", org: "Zomato" },
    { name: "Rakesh Godhwani", role: "Chairman", org: "School of Meaningful Experiences" },
    { name: "Dr. Bhupesh Manoharan", role: "PhD, Master-in-Residence", org: "IIM Calcutta" },
    { name: "Dr. Garima Chaklader", role: "PhD, Master-in-Residence", org: "IIM Bangalore" },
    { name: "Monica Jasuja", role: "Former Head, Digital & Emerging Partnerships", org: "Mastercard" },
  ],
  immersions: [
    "SDA Bocconi (Italy) — celebrated professors, renowned courses, and a global peer cohort",
    "H-Farm Business School (Italy) — Italy's No.1 startup hub; startups, VCs, and digital transformation; visits historically include Ferrari and Dyson",
    "Campus residencies at Gurugram — orientation, market stall, and mentor reviews",
  ],
  jobRoles: [
    "General Manager",
    "Business Head / P&L Owner",
    "Growth Lead",
    "Product Manager",
    "Strategy & Operations Lead",
    "Founder / Venture Builder",
    "Marketing Head",
    "Consulting Manager",
  ],
};

export const Route = createFileRoute("/programmes/executive/pgp-rise-general-management")({
  head: () => ({
    meta: [
      { title: "PGP Rise: General Management — Masters' Union" },
      {
        name: "description",
        content:
          "A 12-month blended general management programme for working professionals — live ventures, ₹15L+ pre-seed funding, and immersions at SDA Bocconi and H-Farm.",
      },
      { property: "og:title", content: "PGP Rise: General Management — Masters' Union" },
      {
        property: "og:description",
        content:
          "Weekend classes, four modules, real venture funding, and two global immersions for working professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
