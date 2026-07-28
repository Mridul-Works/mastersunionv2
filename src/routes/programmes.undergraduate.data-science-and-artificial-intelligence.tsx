import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "UG in Data Science & Artificial Intelligence",
  shortName: "UG DS & AI",
  tagline:
    "A four-year AI degree co-designed with PwC and Ola Krutrim — every year ships a real system: a revenue-generating AI product, autonomous agents, and production-grade RAG assistants.",
  duration: "4 Years (incl. 1 year industry training)",
  mode: "Full-Time, Opt-in Residential — Gurugram",
  commencement: "Aug '26",
  intro:
    "Open to Class XII students with Mathematics. Curriculum co-designed with PwC and Ola Krutrim, so what is taught tracks what production AI teams actually deploy — and every year closes with a system running against real data.",
  whyNow: [
    "AI has moved from research to deployment. The scarce talent is people who can take a model from notebook to production against messy, real business data.",
    "Each year ends in a measurable deployment — ₹5L+ in AI product revenue in Year 1, 25%+ operational efficiency gains from autonomous agents in Year 2, and a 1,500+ query RAG assistant in Year 3.",
    "Faculty come from Microsoft, Google, Meta, IBM, PayPal, NASA and Mastercard, with the curriculum co-designed by PwC and Ola Krutrim.",
  ],
  edge: [
    {
      title: "Curriculum co-designed with PwC and Ola Krutrim",
      body: "Course content and challenges are built with practitioners who run AI at scale, so the toolchain and the problems mirror industry.",
    },
    {
      title: "AI products with real clients and real revenue",
      body: "Year 1 turns an AI idea into a business using APIs and open-source models — ₹5L+ in revenue across five B2B clients.",
    },
    {
      title: "Agentic AI against live operations",
      body: "Build autonomous agents that automate HR operations, ad-creative generation, and procurement — targeting 25%+ efficiency gains and 10,000+ workforce hours saved annually.",
    },
    {
      title: "Production deployment, not notebooks",
      body: "MLOps, big data, cloud, and computer vision, closing with a RAG assistant answering 1,500+ queries in a chosen domain — legal, medical, education, or finance.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Year 1 — Learn the Fundamentals of DS and AI",
      summary:
        "Foundations in maths, programming, and machine learning — turned immediately into a revenue-generating AI product.",
      outcomes: ["₹5L+ AI REVENUE", "5 B2B CLIENTS", "UNSUPERVISED ML ON BRAND DATA", "AI AGENT DEPLOYMENT"],
      courses: [
        "Introduction to Data Science",
        "Linear Algebra",
        "Probability & Statistics",
        "Data-Driven Storytelling",
        "Programming Fundamentals I & II",
        "The Origins of AI",
        "Computer Fundamentals & Data Structures",
        "Coding with Java",
        "Unsupervised Machine Learning",
        "Building and Deploying AI Agents",
        "Transformation through AI-I",
        "The Art of Communication",
      ],
      challenge: {
        name: "Applied AI Challenge + AI Application in Industry",
        description:
          "Turn an AI idea into a business using APIs and open-source code, generating ₹5L+ in revenue — then build AI products for consumer-tech companies using unsupervised learning for segmentation, anomaly detection, fraud detection, and demand forecasting.",
      },
    },
    {
      n: 2,
      title: "Year 2 — Master DS and AI for Career Excellence",
      summary:
        "Move from single products to autonomous systems — agents that run themselves against real operational problems.",
      outcomes: ["25%+ EFFICIENCY GAIN", "10,000+ HOURS SAVED", "3-SECTOR DEPLOYMENT", "DATA ENGINEERING"],
      courses: [
        "Data Wrangling & EDA",
        "Supervised Machine Learning",
        "Database Management",
        "Statistical Methods for Data Science",
        "Optimisation Theory",
        "Transformation through AI-II",
        "Advanced ML & DL-I",
        "Building Products",
        "Signals & Systems",
        "Data Engineering & Data Architecture",
        "Sociology of AI",
      ],
      challenge: {
        name: "Agentic AI Accelerator + Sector Immersion",
        description:
          "Build an autonomous agent automating repetitive functions for 25%+ efficiency gains — HR ops, ad creative, procurement — then deploy AI in retail, health and finance for 10,000+ workforce hours saved per year.",
      },
    },
    {
      n: 3,
      title: "Year 3 — Become an AI Leader",
      summary:
        "The specialisation year — reinforcement learning, NLP, computer vision and MLOps, closing with a production-grade RAG assistant.",
      outcomes: ["1,500+ QUERY RAG ASSISTANT", "MLOPS & PRODUCTION", "DOMAIN SPECIALISATION", "AI ETHICS & POLICY"],
      courses: [
        "Reinforcement Learning",
        "Natural Language Processing",
        "AI in the Cloud",
        "Advanced ML & DL-II",
        "AI Ethics and Policy",
        "MLOps & AI Systems",
        "Big Data & Cloud Computing",
        "Data Science & AI in Finance",
        "AI in Leadership",
        "Computer Vision",
        "Data Science in Public Policy",
        "Career Prep & Industry Engagement",
      ],
      challenge: {
        name: "RAG Building Challenge",
        description:
          "Deploy an AI assistant using Retrieval Augmented Generation that answers 1,500+ queries accurately — a legal document summariser, medical assistant, educational FAQ engine, or finance RAG system.",
      },
    },
    {
      n: 4,
      title: "Year 4 — Get Ready for the Real World",
      summary:
        "Live industry work with Big Tech and AI startups, a founder's seat, or a year in Chicago.",
      outcomes: ["BIG TECH PLACEMENT", "IOT & ADAS PROJECTS", "AI VENTURE BUILD", "CHICAGO STUDY YEAR"],
      courses: [
        "Industry training with Big Tech companies and AI startups",
        "Live project — AI in IoT and autonomous driving (ADAS) with Krutrim or PwC",
        "Startup for Future — build an AI venture with mentorship from AI leaders",
        "Study abroad — one year at the partner university in Chicago, USA",
      ],
      challenge: {
        name: "Industry Training / AI Venture",
        description:
          "Spend the year inside a Big Tech or AI startup team, on ADAS and IoT projects with Krutrim or PwC, building an AI venture, or studying in Chicago.",
      },
    },
  ],
  faculty: [
    { name: "Manoj Kohli", role: "Former CEO & MD", org: "Airtel" },
    { name: "Vivek Gambhir", role: "Former CEO", org: "boAt" },
    { name: "Siddarth Padmanabhan", role: "Former Partner Manager", org: "Meta" },
    { name: "Nitin Gaur", role: "Former Director, Digital Assets", org: "IBM" },
    { name: "Divij Bajaj", role: "Data and Applied Scientist", org: "Microsoft" },
    { name: "Karan Bhyana", role: "Business Intelligence Generalist", org: "Google" },
    { name: "Sumoya Ghosh", role: "People Experience Partner", org: "Google" },
    { name: "Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Harneet S N", role: "Founder", org: "Rabbitt AI" },
    { name: "Prithvi Dhingra", role: "Sr Manager, Special Engagements", org: "American Express" },
    { name: "Dr Nandini Seth", role: "Founding Faculty, PhD Data Science", org: "Masters' Union" },
    { name: "Dr Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Ujjyaini Mitra", role: "Former Chief Data Officer", org: "Zee" },
    { name: "Shubhranil Kundu", role: "Former Associate Researcher", org: "Microsoft" },
    { name: "Tarun Malik", role: "Co-Founder", org: "Zaystack" },
    { name: "Sumit Kumar Singh", role: "Ex-Principal Product Manager", org: "Microsoft" },
    { name: "Monica Jasuja", role: "Former Head", org: "Mastercard" },
    { name: "Aquib Ajani", role: "Lead Instructor", org: "Masters' Union" },
  ],
  immersions: [
    "Industry immersions (1-2 days) — factory floors and tech HQs, systems optimisation and automated supply chains",
    "Global immersions (1-2 weeks) — Japan, Europe, Singapore, UAE, South Korea",
    "Bharat Immersion — 20+ cities incl. Zerodha, CRED, Zepto warehouses, Adani Ports, Godrej, Infosys",
    "Summer or semester abroad — Harvard, UC Berkeley, NUS, Imperial College London, Babson, SDA Bocconi",
    "Dual degree — Illinois Institute of Technology, Chicago",
    "Industry sessions — ChapterApps, CARPL.ai, Rabbitt AI, CoinSwitch, PwC, IQOO, Naukri.com, Hike",
  ],
  jobRoles: [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Product Manager",
    "Data Engineer",
    "MLOps Engineer",
    "Computer Vision Engineer",
    "NLP Engineer",
    "Business Intelligence Analyst",
    "AI Research Associate",
    "AI Startup Founder",
  ],
};

export const Route = createFileRoute("/programmes/undergraduate/data-science-and-artificial-intelligence")({
  head: () => ({
    meta: [
      { title: "UG in Data Science & AI — Masters' Union" },
      {
        name: "description",
        content:
          "A 4-year AI degree co-designed with PwC and Ola Krutrim. Ship revenue-generating AI products, autonomous agents, and production RAG assistants. Faculty from Microsoft, Google, Meta.",
      },
      { property: "og:title", content: "UG in Data Science & AI — Masters' Union" },
      {
        property: "og:description",
        content:
          "₹5L+ AI product revenue in Year 1, agentic AI in Year 2, production RAG in Year 3, Big Tech industry training in Year 4. Aug '26 batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
