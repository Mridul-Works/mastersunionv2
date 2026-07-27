import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP in Entrepreneurship & Business Acceleration",
  shortName: "EBAP",
  tagline:
    "A 6-month hybrid programme for SME, MSME, and family business owners — ten modules that take a founder-dependent business and turn it into a systemised, governed, growth-ready company.",
  duration: "6 months (classes + optional global immersion)",
  mode: "Hybrid — weekend online + 6 NCR residencies",
  commencement: "Rolling cohorts",
  intro:
    "Built for entrepreneurs and family business owners running real companies. ~5 hours a week of weekend sessions, six in-person residencies in NCR, and a batch capped under 60 for deeper mentoring.",
  whyNow: [
    "Most Indian family businesses stall not from lack of demand but from founder dependency — no systems, unclear family roles, and governance that never scaled. This programme attacks that directly.",
    "A three-stage execution framework runs across all ten modules: diagnose core challenges with Balanced Scorecard diagnostics and founder interviews, build tactical solutions (SOPs, scorecards, cash-flow systems, incentive design), then implement and validate with 1:1 coaching and a measurable-impact capstone.",
  ],
  edge: [
    {
      title: "Batch capped under 60",
      body: "Deeper mentoring, real peer accountability, and 1:1 coaching from seasoned family business veterans throughout the capstone.",
    },
    {
      title: "Industry immersions, not lectures",
      body: "Automotive giants on Kaizen and robotics, Haldiram's and Varun Beverages on family-run F&B, and Europe's legacy brands — Ferrari, Fendi, Prosecco Ventures — on multi-generational governance.",
    },
    {
      title: "Residencies that include your family",
      body: "The Family Dynamics Residency and Executive Leadership Residency bring key family members and top executives into the room to resolve real conflicts, not hypothetical ones.",
    },
    {
      title: "Tools you install, not just learn",
      body: "ClickUp dashboards and SOP flows, HubSpot CRM pipelines, Notion knowledge hubs, cash-flow trackers, performance scorecards, incentive templates, founder time maps, approval matrices, and org chart builders.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Run Your Business on Autopilot",
      summary:
        "Attacks founder-dependency directly — a working 1-year plan and dashboard discipline, grounded in how automotive manufacturers run on process, not personality.",
      outcomes: ["AUTOMOTIVE IMMERSION", "1-YEAR BUSINESS PLAN", "FOUNDER AUTOPILOT SYSTEMS"],
      courses: [
        "Setting a clear direction with vision, mission & values",
        "Linking big goals to a simple 1-year plan everyone can follow",
        "Tracking sales, costs, and performance without chasing people",
        "Fixing problems fast when results fall short",
        "Making processes smooth enough that work happens without you",
      ],
      challenge: {
        name: "Orientation Residency + Automotive Industry Immersion",
        description:
          "Connect with fellow family business leaders on campus, then see how automotive giants use precision, robotics, and the Kaizen philosophy — and convert it into scaling strategies for your own business.",
      },
    },
    {
      n: 2,
      title: "People Who Deliver (Family & Non-Family)",
      summary:
        "The hardest part of a family business — people, especially family — modelled on European legacy brands.",
      outcomes: [
        "EUROPE IMMERSION",
        "ROLE CLARITY FOR FAMILY",
        "DELEGATION SYSTEMS",
        "NEXT-GEN LEADERS",
      ],
      courses: [
        "Paying, rewarding, and promoting fairly so people stay motivated",
        "Hiring and keeping talent that grows with your business",
        "Making family members work like professionals with role clarity",
        "Delegating so work gets done without micromanaging",
        "Growing next-generation leaders who take responsibility",
      ],
      challenge: {
        name: "Global Immersion in Europe",
        description:
          "Master advanced digitalisation and governance at elite institutions like H-Farm, Italy, and engage with legendary family brands like Ferrari and Fendi to uncover their multi-generational growth secrets.",
      },
    },
    {
      n: 3,
      title: "Tech Made Simple: Tools That Save Time & Money",
      summary:
        "Digital adoption made practical rather than aspirational — then a residency to align family and professional leadership around it.",
      outcomes: ["ERP/CRM ADOPTION", "AI FORECASTING", "EXECUTIVE LEADERSHIP RESIDENCY"],
      courses: [
        "Using ERP/CRM so you see everything in one place",
        "Simple dashboards for instant visibility on sales, costs, and profits",
        "Applying AI to sales forecasting, customer insights, and inventory control",
        "Making digital an ally for faster growth and better decisions",
        "Improving customer experience with digital touchpoints",
      ],
      challenge: {
        name: "Executive Leadership Residency",
        description:
          "Bring your top executives to a residency that aligns family values with management expertise — addressing owner-CEO relationships, resolving conflicts, and strengthening board governance.",
      },
    },
    {
      n: 4,
      title: "Profits, Money & Governance",
      summary:
        "Numbers and governance in the same room — financial discipline that survives contact with real family politics.",
      outcomes: [
        "FAMILY DYNAMICS RESIDENCY",
        "FUNDRAISING (BANK/PE/IPO)",
        "GOVERNANCE WITHOUT LOSING CONTROL",
      ],
      courses: [
        "Reading your numbers and spotting hidden profit leaks",
        "Controlling cash flow and working capital without daily firefighting",
        "Raising funds — bank, PE, IPO — when you need to scale",
        "Bringing governance discipline without losing family control",
        "Increasing business value and preparing for the future",
      ],
      challenge: {
        name: "Family Dynamics Residency",
        description:
          "Under the mentorship of top industry experts, convene key family members to address critical dynamics and the pressing challenges inside your business.",
      },
    },
    {
      n: 5,
      title: "Building New Growth Engines",
      summary:
        "The innovation module — testing whether the business can grow beyond its core without cannibalising it.",
      outcomes: ["NEW VENTURE TESTING", "FIRST 100 CUSTOMERS", "1:1 CAPSTONE COACHING"],
      courses: [
        "Identifying new business opportunities and testing them quickly",
        "Designing a new product/service and launching it fast",
        "Winning your first 100 customers in new ventures",
        "Raising early-stage capital if needed",
        "Scaling or exiting new ventures without risking the family business",
      ],
      challenge: {
        name: "1:1 Coaching during the Capstone Project",
        description:
          "Tailored mentorship from seasoned family business veterans, guiding execution with strategic insight and hands-on support.",
      },
    },
    {
      n: 6,
      title: "Sales & Marketing That Work",
      summary:
        "Sales as a system, not an art — a predictable pipeline plus exposure to global manufacturing and GTM practice.",
      outcomes: ["INTERNATIONAL TRADE EVENT", "PREDICTABLE PIPELINE", "GTM STRATEGY DESIGN"],
      courses: [
        "Designing winning GTM strategies — D2C, distributor, franchise",
        "Running digital + offline marketing that delivers ROI",
        "Building brand equity so customers trust and stay loyal",
        "Creating a predictable sales pipeline with systems, not luck",
        "Tracking and improving sales team productivity with simple dashboards",
      ],
      challenge: {
        name: "International Industry Visit",
        description:
          "Explore top-tier manufacturing practices at the world's largest trade event and gain insights from global industry leaders.",
      },
    },
    {
      n: 7,
      title: "Innovation, Leadership & Legacy",
      summary:
        "Innovation instinct paired with legacy instinct — studying India's biggest family-run F&B brands doing both at once.",
      outcomes: ["F&B IMMERSION", "INNOVATION & LEGACY BALANCE", "NEGOTIATION SKILLS"],
      courses: [
        "Driving innovation in products and processes",
        "Negotiating better with customers, vendors, and even family",
        "Leading teams in uncertain and fast-changing times",
        "Balancing growth with preserving your family's legacy",
        "Building a culture of sustainability and long-term success",
      ],
      challenge: {
        name: "F&B Industry Immersion",
        description:
          "Unlock the secrets of iconic family-run F&B brands like Haldiram's and Varun Beverages — and learn to blend tradition with innovation.",
      },
    },
    {
      n: 8,
      title: "Cost Control & Supply Chain Excellence",
      summary: "Tightening the operational engine — waste, vendors, productivity, and maintenance.",
      outcomes: ["VENDOR MANAGEMENT", "WASTE REDUCTION", "PREVENTIVE MAINTENANCE"],
      courses: [
        "Reducing waste and saving money in operations",
        "Managing vendors and suppliers for best prices and reliability",
        "Improving productivity in manufacturing and service delivery",
        "Setting service standards that keep customers happy",
        "Preventing breakdowns and losses with smart maintenance",
      ],
      challenge: {
        name: "Campus Residency: Convocation Track",
        description:
          "Network with industry leaders and innovators on campus, forging strategic partnerships for growth and tailored support.",
      },
    },
    {
      n: 9,
      title: "Managing Self & Family",
      summary:
        "Turns inward — a business can't outlast a burned-out leader or an unresolved family conflict.",
      outcomes: ["EMOTIONAL INTELLIGENCE", "FAMILY INVOLVEMENT RULES", "FOUNDER SUSTAINABILITY"],
      courses: [
        "Building self-awareness and emotional intelligence as a leader",
        "Managing stress, time, and energy for peak performance",
        "Establishing clear rules for family involvement in business",
        "Resolving conflicts between family and non-family members",
        "Living a balanced life while growing the business",
      ],
      challenge: {
        name: "Campus Residency",
        description:
          "Continued residency work with mentors and peers on founder wellbeing, family charters, and conflict resolution.",
      },
    },
    {
      n: 10,
      title: "Protecting Your Business in Tough Times",
      summary:
        "The resilience module — preparing founders for the crises that eventually hit every business.",
      outcomes: ["CRISIS PLANNING", "COMPLIANCE & RISK", "CONVOCATION & PEER NETWORK"],
      courses: [
        "Identifying risks before they become big problems",
        "Preparing crisis plans that keep the business running",
        "Staying compliant and avoiding legal or regulatory issues",
        "Protecting profits with insurance, hedging, and buffers",
        "Protecting reputation and customer trust during crises",
      ],
      challenge: {
        name: "Campus Residency: Convocation",
        description:
          "Complete the journey with a measurable-impact capstone presentation and a powerful network of industry leaders and innovators.",
      },
    },
  ],
  faculty: [
    { name: "Rajiv Gupta", role: "Chairperson", org: "School of Family Business" },
    { name: "Sanjiv Bhasin", role: "Former Director", org: "IIFL" },
    { name: "Dr Bhupesh Manoharan", role: "Director – Faculty and Academics", org: "Masters' Union" },
    { name: "Dr Nandini Seth", role: "Director, Curriculum & L&D", org: "Masters' Union" },
    { name: "Hetal Sonpal", role: "Strategy & Business Scale-up", org: "Industry Practitioner" },
    { name: "Amit Pandey", role: "CEO & Board of Director", org: "Industry" },
    { name: "Dhiraj Tripathi", role: "Former Vice President, Exports", org: "Industry" },
    { name: "Shishir Bhartia", role: "Directional Strategy Consultant", org: "Industry" },
    { name: "Devesh Garg", role: "CCSO/CSMO, Executive Committee", org: "Industry" },
    { name: "Nalin Kapoor", role: "Strategic Advisor", org: "CARS24" },
    { name: "Prof S. Ram Kumar", role: "Chief Provocateur", org: "Industry" },
    { name: "Avishkar Mehrotra", role: "Ex-CHRO", org: "Industry" },
    { name: "Saurav Sen Gupta", role: "Modern Sales Educator", org: "Industry" },
    { name: "Vinod Menon", role: "Brand, Product Management & CRM", org: "Industry" },
    { name: "Niranjan Mishra", role: "Former VP (Retail) & Divisional Head", org: "Industry" },
    { name: "Saurabh Jain", role: "CEO, Overseas Operations", org: "Industry" },
  ],
  immersions: [
    "China & Taiwan — manufacturing excellence, trade innovation, and the world's largest trade fair",
    "Europe — legacy family empires including Ferrari, Fendi, and Prosecco Ventures",
    "H-Farm, Italy — governance and digital innovation at a leading global innovation hub",
    "India — Automotive and F&B industry immersions (Haldiram's, Varun Beverages)",
  ],
  jobRoles: [
    "Family Business Successor",
    "Managing Director / Owner-CEO",
    "Business Head",
    "Head of Operations",
    "Head of Sales & GTM",
    "New Venture Lead",
    "Board Member / Governance Lead",
  ],
};

export const Route = createFileRoute("/programmes/executive/entrepreneurship-and-business-acceleration")(
  {
    head: () => ({
      meta: [
        { title: "PGP in Entrepreneurship & Business Acceleration — Masters' Union" },
        {
          name: "description",
          content:
            "A 6-month hybrid programme for SME, MSME and family business owners — ten modules, six NCR residencies, and global immersions across Europe, China and Taiwan.",
        },
        {
          property: "og:title",
          content: "PGP in Entrepreneurship & Business Acceleration — Masters' Union",
        },
        {
          property: "og:description",
          content:
            "Systemise a founder-dependent business: SOPs, governance, family role clarity, and a measurable-impact capstone. Batch capped under 60.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
    component: () => <ProgrammePage data={data} />,
  },
);
