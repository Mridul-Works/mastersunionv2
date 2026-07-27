import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PG Programme in Applied AI & Agentic Systems",
  shortName: "Applied AI",
  tagline:
    "A 15-month PGP that trains you to build, ship, and sell AI agents, RAG systems, and LLM-native products — taught by 20+ practitioners from Amazon, Microsoft, PayPal, and MIT.",
  duration: "15-month Full-Time PGP",
  mode: "On-Campus, Gurugram",
  commencement: "Aug '26",
  intro:
    "AI is moving from demos to production. Companies want people who can build agents, RAG systems, and LLM products that actually solve real problems — not just talk about them. This PGP is built for that.",
  whyNow: [
    "Every term ships a deployable AI product: a chatbot with paying users, an agent that automates real workflows, a RAG system answering 1,000+ customer queries, and a domain-specific ML solution with 3-5 real clients.",
    "Faculty includes 20+ practicing AI engineers from Amazon, Microsoft, PayPal, MIT, and Rabbit AI — plus guest sessions with global AI leaders like Tarun Malik and Malthi Satish.",
  ],
  edge: [
    {
      title: "Build 6 deployable AI agents across real industries",
      body: "Every out-class challenge produces a working, deployable system — published on GitHub and HuggingFace as portfolio proof.",
    },
    {
      title: "20+ AI practitioners as faculty",
      body: "Learn from AI engineers, researchers, and founders who are shipping production LLM systems today — not textbook academics.",
    },
    {
      title: "Small squads, weekly code & model reviews",
      body: "Work in review squads with practicing engineers who critique your code, models, and deployments every week.",
    },
    {
      title: "Real-client capstone (5-6 terms)",
      body: "AI Immersion challenge spans two terms and lands 3-5 real paying clients with a market-ready, domain-specific AI solution.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "AI Fundamentals & LLM Product Building",
      summary:
        "Ship an AI chatbot end-to-end: prompt engineering, LLM APIs, Python workflows, and conversational UX.",
      outcomes: ["LLM APIS", "PROMPT ENGINEERING", "CONVERSATIONAL UX", "PYTHON BASICS"],
      courses: [
        "LLM API integration (OpenAI / equivalent)",
        "Data structures & data handling (Pandas, CSV/JSON)",
        "Prompt engineering & conversational UX",
        "Chatbot workflow design & basic automation testing",
      ],
      challenge: {
        name: "Applied AI Chatbot Challenge",
        description:
          "Build an end-to-end AI chatbot solving one meaningful use case — wellbeing, study support, or customer service. Target: 5 B2B clients with ₹5L+ in real sales.",
      },
    },
    {
      n: 2,
      title: "Agents & Automation with Modern AI",
      summary:
        "Move from single prompts to autonomous, tool-using agents that plan and execute multi-step workflows.",
      outcomes: ["AGENT ARCHITECTURES", "TOOL INTEGRATION", "PROCESS AUTOMATION", "OPS DESIGN"],
      courses: [
        "Modern agent architectures in real workflows",
        "Prompt, tool schema, and constraint design for reliability",
        "External tool integration in agent workflows",
        "Testing, validation, deployment, and monitoring of agents",
        "Basic machine learning for predictions",
      ],
      challenge: {
        name: "Agentic AI Accelerator for Business",
        description:
          "Build autonomous, tool-using agents that reduce real man-hours — automating HR ops for a consulting firm, creative for a D2C brand, or procurement for a manufacturer.",
      },
    },
    {
      n: 3,
      title: "Applied Machine Learning for Real Decisions",
      summary:
        "Build, tune, deploy, and communicate ML models that influence business strategy.",
      outcomes: ["SUPERVISED & UNSUPERVISED ML", "FEATURE ENGINEERING", "MODEL DEPLOYMENT", "DATA STORYTELLING"],
      courses: [
        "Unsupervised learning & pattern discovery",
        "Supervised ML: classification & regression",
        "Feature engineering & data preprocessing",
        "Model tuning without overfitting",
        "Deploying lightweight ML models as APIs",
      ],
      challenge: {
        name: "ML Consulting Garage",
        description:
          "Translate a real business problem into an ML decision — clustering for Myntra/Zomato, churn for a subscription business, or forecasting for D2C.",
      },
    },
    {
      n: 4,
      title: "RAG, Neural Networks & Data Engineering",
      summary:
        "Ship scalable retrieval-augmented generation systems and understand the neural network fundamentals behind them.",
      outcomes: ["RETRIEVAL-AUGMENTED GENERATION", "VECTOR DATABASES", "NEURAL NETWORKS", "DATA PIPELINES"],
      courses: [
        "Embeddings and vector databases in practice",
        "Ingesting, chunking, and cleaning documents",
        "RAG evaluation & monitoring",
        "Deploying scalable RAG applications",
        "Neural network fundamentals",
        "Data pipelines at scale",
      ],
      challenge: {
        name: "RAG System Building Challenge",
        description:
          "Deploy a RAG system that answers 1,000+ real customer queries without human help — legal summariser, medical assistant, or research assistant.",
      },
    },
    {
      n: 5,
      title: "Domain AI & Enterprise ML Design",
      summary:
        "Apply everything to regulated industries — retail, healthcare, and finance — where compliance and reliability matter as much as accuracy.",
      outcomes: ["DOMAIN-SPECIFIC AI", "REGULATORY CONSTRAINTS", "REINFORCEMENT LEARNING", "AI GOVERNANCE"],
      courses: [
        "Designing AI around domain constraints",
        "Data architecture for AI systems",
        "ML & AI technical interview prep",
        "Electives: Computer Vision, Reinforcement Learning, or Streaming AI",
      ],
      challenge: {
        name: "AI Immersion in Retail, Health & Finance (spans Term 5-6)",
        description:
          "Build a domain-specific AI system for a real industry problem and secure 3-5 real paying clients — supplier selection for retail, cancer-risk diagnostics, or RL-based portfolio optimisation.",
      },
    },
    {
      n: 6,
      title: "AI Immersion, Capstone & Careers",
      summary:
        "Ship the AI Immersion capstone to real clients and prepare for placement into AI engineering, product, and research roles.",
      outcomes: ["CAPSTONE", "PAYING CLIENTS", "PLACEMENT PREP", "PORTFOLIO"],
      courses: [
        "Advanced deployment & MLOps",
        "AI product management",
        "Case & technical interview prep",
        "Building your GitHub & HuggingFace portfolio",
      ],
      challenge: {
        name: "AI Immersion Capstone",
        description:
          "Complete the two-term AI Immersion — deliver a market-ready, domain-specific AI solution to 3-5 paying clients and present at community demos & OSS showcases.",
      },
    },
  ],
  ventures: [
    {
      founder: "Reyansh Juneja",
      startup: "MemoTag",
      description: "Hardware-AI solution for dementia patients, pitched at Shark Tank India's finale.",
    },
    {
      founder: "Kabir Teria",
      startup: "theGoodBrowser",
      description: "A large-action-model-based AI browser positioning against Google Chrome.",
    },
    {
      founder: "Ansh Mamgain",
      startup: "AIOS",
      description: "An AI-based operating system that adapts to users, Jarvis-style.",
    },
    {
      founder: "Aashwin Dev",
      startup: "Professor Chatbot & Elite",
      description: "AI professor chatbot for peer study, and a SaaS hiring tool in pilot.",
    },
    {
      founder: "Arjun",
      startup: "Meta Fashion",
      description: "A fashion dress-up game in beta with 40,000+ paying users worldwide.",
    },
    {
      founder: "Tanvee Maheshwari",
      startup: "SEMS",
      description: "Student experience management system streamlining campus communication.",
    },
  ],
  faculty: [
    { name: "Nitin Gaur", role: "Former Director, Financial Sciences & Digital Assets", org: "IBM" },
    { name: "Divij Bajaj", role: "Data & Applied Scientist", org: "Microsoft" },
    { name: "Karan Bhyana", role: "Business Intelligence Generalist", org: "Google" },
    { name: "Harneet S N", role: "Founder", org: "Rabbit AI" },
    { name: "Tarun Malik", role: "Co-Founder", org: "ZayStack" },
    { name: "Ujjyaini Mitra", role: "Former Chief Data Officer", org: "Zee" },
    { name: "Dr Soumik Bhusan", role: "Ex-Head CX Strategy", org: "Amazon" },
    { name: "Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Dr Tathagata Dasgupta", role: "Chief Data & Analytics Officer", org: "Saatchi & Saatchi" },
    { name: "Dr Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Vaibhav Gupta", role: "Sr. Product Manager", org: "MakeMyTrip" },
    { name: "Sanjiv Bhasin", role: "Former Director", org: "IIFL" },
  ],
  jobRoles: [
    "AI Engineer",
    "LLM / Applied ML Engineer",
    "AI Agent Developer",
    "RAG Systems Engineer",
    "AI Product Manager",
    "MLOps Engineer",
    "AI Research Engineer",
    "AI Consultant",
    "Data Scientist",
    "AI Startup Founder",
  ],
};

export const Route = createFileRoute("/programmes/pg/applied-ai-and-agentic-systems")({
  head: () => ({
    meta: [
      { title: "PGP in Applied AI & Agentic Systems — Masters' Union" },
      {
        name: "description",
        content:
          "A 15-month PGP to build and ship AI agents, RAG systems, and LLM products — taught by 20+ AI practitioners from Amazon, Microsoft, PayPal, and MIT.",
      },
      { property: "og:title", content: "PGP in Applied AI & Agentic Systems — Masters' Union" },
      {
        property: "og:description",
        content:
          "Ship 6 deployable AI agents. Land real paying clients. Learn from practitioners, not textbooks. Aug '26 batch.",
      },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
