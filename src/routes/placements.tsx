import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Home,
  BarChart3,
  TrendingUp,
  Briefcase,
  Users,
  Route as RouteIcon,
  Download,
  
  Mail,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mic2,
  BadgeCheck,
  Compass,
  Play,
} from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";
import heroBg from "@/assets/placement-hero.webp.asset.json";
import report2021 from "@/assets/placement-reports/report-2021.pdf.asset.json";
import report2022 from "@/assets/placement-reports/report-2022.pdf.asset.json";
import report2023 from "@/assets/placement-reports/report-2023.pdf.asset.json";
import report2024 from "@/assets/placement-reports/report-2024.pdf.asset.json";
import report2025 from "@/assets/placement-reports/report-2025.pdf.asset.json";
import cover2021 from "@/assets/placement-reports/cover-2021.png.asset.json";
import cover2022 from "@/assets/placement-reports/cover-2022.png.asset.json";
import cover2023 from "@/assets/placement-reports/cover-2023.png.asset.json";
import cover2024 from "@/assets/placement-reports/cover-2024.png.asset.json";
import cover2025 from "@/assets/placement-reports/cover-2025.png.asset.json";
import jasDesaiImg from "@/assets/placements/jas-desai.webp.asset.json";
import komalBansalImg from "@/assets/placements/komal-bansal.webp.asset.json";
import architBansalImg from "@/assets/placements/archit-bansal.webp.asset.json";
import karanMulkyImg from "@/assets/placements/karan-mulky.webp.asset.json";
import architBhargavaImg from "@/assets/placements/archit-bhargava.webp.asset.json";
import yashMehtaImg from "@/assets/placements/yash-mehta.webp.asset.json";
import souravDasImg from "@/assets/placements/sourav.webp.asset.json";
import diveshAroraImg from "@/assets/placements/divesh.webp.asset.json";
import ishetaImg from "@/assets/placements/isheta.webp.asset.json";
import rishieImg from "@/assets/placements/rishie.webp.asset.json";
import lakshyaImg from "@/assets/placements/lakshya.webp.asset.json";
import ankitaImg from "@/assets/placements/ankita.webp.asset.json";
import tusharImg from "@/assets/placements/tushar.webp.asset.json";
import kritiImg from "@/assets/placements/kriti.webp.asset.json";
import bhanuImg from "@/assets/placements/bhanu.webp.asset.json";
import kritiSharmaImg from "@/assets/placements/kritiSharma.webp.asset.json";
import shibiImg from "@/assets/placements/shibi.webp.asset.json";
import varunImg from "@/assets/placements/varun.webp.asset.json";
import sidhantaImg from "@/assets/placements/sidhanta.webp.asset.json";
import kartikImg from "@/assets/placements/kartik.webp.asset.json";
import ankitSharmaImg from "@/assets/placements/ankitsharma.webp.asset.json";
import ashmitaImg from "@/assets/placements/ashmita.webp.asset.json";
import { ReportModalProvider, useReportModal } from "@/components/placements/ReportDownloadModal";
import manojKohliBg from "@/assets/ManojKohli.webp.asset.json";

import {
  ClipReveal,
  CountUp,
  Draw,
  Parallax,
  Reveal,
  ScrollProgress,
  TimelineRail,
  useInView,
  useReducedMotion,
} from "@/components/placements/motion";
import { HeroMaskReveal } from "@/components/placements/HeroMaskReveal";
import { onScrollFrame, onViewportResize, invalidateScroll } from "@/lib/scroll-driver";
import { bakeImageFilter } from "@/lib/bake-image-filter";


import { SectionHeading } from "@/components/patterns/section-heading";
import { LogoMarquee } from "@/components/patterns/logo-marquee";
import { StatStrip } from "@/components/patterns/stat-strip";
import { TestimonialCarousel } from "@/components/patterns/testimonial-carousel";
import { Button } from "@/components/ui/button";

function EditorialRule() {
  return (
    <div
      className="placements-editorial-rule h-px w-full"
      aria-hidden="true"
    />
  );
}






const INTER = "var(--font-display)";
const MONO = "var(--font-mono-tech)";

const logoModules = import.meta.glob<{ default: { url: string } }>(
  "../assets/recruiter-logos/*.png.asset.json",
  { eager: true },
);
const LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(logoModules).map(([path, mod]) => [
    path.split("/").pop()!.replace(".png.asset.json", ""),
    mod.default.url,
  ]),
);

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "outcomes", label: "Outcomes", icon: BarChart3 },
  { id: "cohorts", label: "Cohorts", icon: TrendingUp },
  { id: "recruiters", label: "Recruiters", icon: Briefcase },
  { id: "stories", label: "Stories", icon: Users },
  { id: "pathway", label: "Pathway", icon: RouteIcon },
];

/* ---------------------------------- data --------------------------------- */

const HERO_STATS = [
  { value: "1.42", label: "Offers generated per student" },
  { value: "$149,114", label: "International average CTC (PPP)" },
  { value: "30", label: "International & remote offers" },
  { value: "₹64 LPA", label: "International average CTC" },
];

const AUDIT_STATS = [
  { value: "4", suffix: "OFFERS > ₹1 CR", note: "Marking strong compensation figures" },
  { value: ">90%", suffix: "PLACED EARLY", note: "Joined full-time roles before the penultimate term" },
  { value: "₹54.80 LPA", suffix: "TOP 25% AVG CTC", note: "Cohort '25 top quartile" },
];

const REPORT_YEARS = ["2021", "2022", "2023", "2024", "2025"];

const PLACEMENT_REPORTS: Record<string, { pdf: string; cover: string }> = {
  "2021": { pdf: report2021.url, cover: cover2021.url },
  "2022": { pdf: report2022.url, cover: cover2022.url },
  "2023": { pdf: report2023.url, cover: cover2023.url },
  "2024": { pdf: report2024.url, cover: cover2024.url },
  "2025": { pdf: report2025.url, cover: cover2025.url },
};

type CohortRow = {
  cohort: string;
  avg: string;
  median: string;
  highest: string;
  top25: string;
  bottom25: string;
  mid80: string;
};

const TBM_TABLE: CohortRow[] = [
  { cohort: "2025", avg: "₹33.39 L", median: "₹27.79 L", highest: "₹1.28 Cr", top25: "₹54.80 L", bottom25: "₹22.75 L", mid80: "₹29.20 L" },
  { cohort: "2024", avg: "₹28.52 L", median: "₹27.77 L", highest: "₹61.80 L", top25: "₹43.79 L", bottom25: "₹19.30 L", mid80: "₹27.05 L" },
  { cohort: "2023", avg: "₹34.07 L", median: "₹32.19 L", highest: "₹57.08 L", top25: "₹44.67 L", bottom25: "₹22.35 L", mid80: "₹34.09 L" },
  { cohort: "2022", avg: "₹33.10 L", median: "₹30.92 L", highest: "₹64.15 L", top25: "₹44.52 L", bottom25: "₹20.02 L", mid80: "₹33.73 L" },
  { cohort: "2021", avg: "₹29.12 L", median: "₹29.50 L", highest: "₹45 L", top25: "₹41.14 L", bottom25: "₹19.38 L", mid80: "₹28.76 L" },
];

const YLC_TABLE = [
  { cohort: "2025", avg: "₹28.24 L", median: "₹27.43 L", highest: "₹46.22 L" },
  { cohort: "2024", avg: "₹23.59 L", median: "₹22.69 L", highest: "₹36 L" },
  { cohort: "2023", avg: "₹27.76 L", median: "₹26 L", highest: "₹38 L" },
  { cohort: "2022", avg: "₹27.17 L", median: "₹25 L", highest: "₹42 L" },
  { cohort: "2021", avg: "₹23.57 L", median: "₹24 L", highest: "₹30 L" },
];

const SALARY_DISTRIBUTION = [
  { range: "₹20–25L", pct: 21.02 },
  { range: "₹25–30L", pct: 33.76 },
  { range: "₹30–35L", pct: 17.2 },
  { range: "₹35–40L", pct: 8.28 },
  { range: "₹40L+", pct: 19.75 },
];

const SALARY_COMPONENTS = [
  { label: "Avg. Base", pct: 81, value: "₹27.16 Lakh" },
  { label: "Avg. Variable", pct: 13, value: "₹4.34 Lakh" },
  { label: "Avg. ESOPs", pct: 6, value: "₹2 Lakh" },
];

const RECRUITER_GROUPS: { category: string; logos: string[] }[] = [
  { category: "Consulting", logos: ["McKinsey", "Bain", "BCG", "Accenture", "Deloitte", "EY", "PWC", "Kearney", "OliverWyman"] },
  { category: "Large Tech", logos: ["Google", "Meta", "Microsoft", "Youtube", "Servicenow"] },
  { category: "Consumer Tech", logos: ["Flipkart", "Zomato", "Zepto", "Unacademy", "PhysicsWallah", "MamaEarth"] },
  { category: "BFSI", logos: ["ICICI", "HSBC", "CITI", "AmericanExpress", "Razorpay", "PineLabs", "Cred"] },
  { category: "Venture Capital", logos: ["GoodCapital", "Waterbridge", "Antler", "StrideVentures", "IPV"] },
  { category: "Emerging Tech", logos: ["Kapture", "Twyn", "Webengage", "Zycus", "Mindtickle"] },
];


const TRANSITIONS = [
  {
    title: "Industry transition",
    sub: "PGP TBM · Pre-MBA to Post-MBA",
    columns: ["From", "To"],
    rows: [
      ["Senior Data Science Analyst, Merkle", "Program Manager, Zomato"],
      ["Project Manager, One Window Overseas Education", "Consultant, KPMG India"],
      ["CIB Analyst, JPMC", "Manager – Design Planning, Razorpay"],
      ["Business Analyst, FreshWorks", "Senior Manager I – Program Management, Zepto"],
      ["Senior Financial Analyst, TresVista Financial Services", "Manager – CEO Office, Reliance Infrastructure"],
      ["Deputy Manager, Hero Motorcorp", "Program Manager, Blinkit"],
      ["Consultant, Protiviti", "Product Specialist – Analytics Department, Bloomberg"],
      ["Analyst, McKinsey and Company", "Lead, Partnerships, OneBanc"],
      ["Tax Associate, Guru and Jana", "Growth Strategist, Consultadd"],
      ["Associate Consultant, ZS Associates", "Inbound Product Manager, Service Now"],
    ],
  },
  {
    title: "Career advancement",
    sub: "PGP TBM · Pre-MBA to Post-MBA",
    columns: ["From", "To"],
    rows: [
      ["Associate Consultant, ZS Associates", "Senior Associate – Transformation, DP World"],
      ["Senior Analyst, Capgemini", "Management Trainee – Data Science & Business Analytics, American Express"],
      ["Executive of Marketing & Business Strategy, Bhagat Forge Limited", "Management Trainee, Aditya Birla Capital"],
      ["Associate Product Manager, Statiq", "Digital Product Manager, IndusInd Bank"],
      ["Team Lead – Product, Paytm", "Assistant Manager – Product, Airtel"],
      ["PPC Manager, Feel Good Contacts", "Senior Manager – Digital Marketing, Just Dial"],
      ["IT Engineer II, Honeywell", "Insights and Automation Manager, Careem"],
      ["Q.C. Officer 3, Alter Domus", "Manager – Quality, Flipkart"],
      ["Senior Relationship Manager, Drip Capital", "Senior Manager I – Strategic Alliances & Partnerships, Zepto"],
      ["Associate ML Engineer, Delhivery", "Data Scientist, Funder.ai"],
    ],
  },
  {
    title: "Career launches",
    sub: "PGP TBM YLC · Undergraduate to Post-MBA",
    columns: ["UG College", "Post MBA Company", "Post MBA Role"],
    rows: [
      ["Delhi Technological University, Delhi", "KPMG India", "Consultant"],
      ["University Of Madras, Tamil Nadu", "WebEngage", "Growth Consultant"],
      ["G.H. Raisoni College Of Engineering", "Yardstick", "Marketing Specialist"],
      ["Vellore Institute Of Technology", "Consultadd", "Strategic Consultant"],
      ["University Of Calcutta", "Hyperflex", "Business Development Representative"],
      ["HR College, Mumbai", "Flipkart", "Management Trainee – Business"],
      ["Maitreyi College, Delhi University", "Fitelo", "AVP – Brand Marketing"],
      ["Sri Aurobindo College, Delhi University", "Pine Labs", "Solution Specialist I"],
      ["Veer Narmad South Gujarat University, Gujarat", "Neve Jewels", "Associate Founder's Office"],
    ],
  },
];

const ALUMNI = [
  { name: "Shreya Kulkarni", role: "Product Manager II, Microsoft", quote: "Mentors like Aditya Turalapati (PM2, Microsoft) and Sumit Kumar provided vital guidance, while the PM curriculum, live projects, and global placement approach thoroughly prepared me." },
  { name: "Deep Bhatia", role: "Investment Banking Associate, Axis Capital", quote: "The support at Masters' Union was incredible — faculty and the career prep team made the placement journey seamless. Mock interviews honed my technical skills." },
  { name: "CA Harsh Nahar", role: "Senior Business Analyst, Kearney", quote: "From being elected Vice President to organizing Case Union, India's largest case competition conclave, the experience was filled with rewarding challenges." },
  { name: "Shruti Kumari", role: "Manager – Brand Marketing, Flipkart", quote: "Masters' Union provided me with unparalleled exposure to the e-commerce landscape, which significantly shaped my understanding of the sector." },
  { name: "Kakaraparthi Sri Badarinadh", role: "Senior Specialist – Strategic Accounts, Talabat, Dubai", quote: "The innovative case-based teaching was key to my interview success, helping me approach real-world challenges with a structured mindset." },
  { name: "Tilottama Ghosh", role: "Associate, Kotak Investment Bank", quote: "The focus on financial modelling and investment strategies helped me build a strong foundation, while industry mentorship sharpened my problem solving." },
];

const TESTIMONIALS = [
  { name: "Jas Desai", role: "Senior Associate, CEO's Office (Transformation & Strategy)\nDP World, Dubai", note: "Masters' Union's distinctive pedagogy was key to my success in securing a role at DP World, Dubai. The In-class & Out-class approach built practical problem-solving skills for the Transformation & Strategy role at the CEO's Office. Regular CXO sessions and C-suite interactions strengthened my understanding, confidence, and performance during interviews.", image: jasDesaiImg.url },
  { name: "Komal Bansal", role: "Senior Associate, BCG", note: "Masters’ Union shaped my journey from bringing firms like BCG to campus to building a structured thought process through in-class learnings (special thanks to Bhupesh Sir and Vipin Sir) and Get Prepped mentorship. Real-world exposure via Dropshipping and the VIP program equipped me with practical skills that helped me contribute meaningfully during my internship.", image: komalBansalImg.url },
  { name: "Archit Bansal", role: "Manager – CEO's Office, Reliance Infrastructure", note: "Masters’ Union has been a defining chapter in my professional growth. Coming from a core finance background, the program broadened my perspective beyond numbers. Leading the Masters’ Union Investment Fund sharpened my strategic and decision-making skills, which I now apply daily at Reliance Infrastructure across operations, leadership strategy, and business transformation.", image: architBansalImg.url },
  { name: "Karan Mulky", role: "Client Solutions Manager, Meta", note: "Masters’ Union enhanced my skills in marketing, technology and problem-solving, helping me secure my dream role at Meta. The FOCOS practicum built first-principles thinking and a structured interview prep, while constant support from faculty and the placement team pushed me beyond my comfort zone. The real-world learning, exposure and mentorship continue to guide my career.", image: karanMulkyImg.url },
  { name: "Archit Bhargava", role: "Analyst, Avaana Capital\n(Venture Capital)", note: "The hands-on learning during the Investing program at Masters’ Union gave me a deep understanding of fund operations - from sourcing deals to due diligence and evaluating startups for long-term growth. Exposure to live investment committees, mentorship from industry experts and the alumni network strengthened my analytical skills and helped me secure my role at Avaana Capital.", image: architBhargavaImg.url },
  { name: "Yash Mehta", role: "Chief of Staff – Operations, Puffy, Dubai", note: "Landing a global role in Dubai has been a life-changing milestone. At Masters’ Union, the Careers team helped me refine my narrative, prepare strategically for interviews and negotiate with confidence. Mentorship from BCG and McKinsey leaders via GetPrepped sharpened my thinking, while MU’s blend of academics and real-world readiness made all the difference.", image: yashMehtaImg.url },
  { name: "Sourav Das", role: "Junior Consultant, Larsen & Toubro | Riyadh", note: "Some of the best experiences of my life came at Masters’ Union, and securing an international role in Riyadh was the perfect culmination. MU is not just a B-school - it immerses students in real-world problems, ensuring theory translates into practice and industry readiness. I’m grateful to have chosen Masters’ Union; it has truly catapulted my career to the next level.", image: souravDasImg.url },
  { name: "Divesh Arora", role: "Management Trainee, Aditya Birla Capital", note: "The behavioural handbook at Masters’ Union was instrumental in helping me crack my interview at Aditya Birla Capital. It covered a wide range of questions that I practised to refine my responses. A call with alumni working at ABC further gave me clarity on culture, expectations and the work at ABC, ensuring I walked into the interview fully prepared and confident.", image: diveshAroraImg.url },
  { name: "Isheta Agrawal", role: "Project Consultant, Ernst & Young (EY)", note: "Securing this job wouldn’t have been possible without Masters’ Union. The Placement Cell’s support - from CV building to mock interviews and networking - shaped my preparation for the recruitment process. More importantly, the peer group pushed me to grow every day. Masters’ Union didn’t just help me land a job; it shaped me into a professional ready to thrive anywhere.", image: ishetaImg.url },
  { name: "Rishie Prabhakaran", role: "Product Specialist - Analytics Department, Bloomberg", note: "My journey to prepare for the Bloomberg interview was deeply supported by the structured preparation at Masters’ Union. Multiple resume iterations, regular behavioural mock interviews and personalized mentorship helped me understand my experiences better and articulate them with clarity and confidence—enabling me to show the depth of thought Bloomberg was seeking.", image: rishieImg.url },
  { name: "Lakshya Punjabi", role: "Management Trainee – Data Science & Business Analytics, American Express", note: "Masters’ Union played a pivotal role in helping me secure my role at American Express. The hands-on learning, industry-immersive curriculum and exposure to real-world business problems sharpened my analytical and problem-solving abilities, pushed me to think strategically and execute with precision - directly contributing to my success in the multi-round AMEX interview process.", image: lakshyaImg.url },
  { name: "Ankita Saxena", role: "Manager, Credit Risk, Citibank", note: "Masters’ Union broadened my perspective beyond sheets and risk models. Real-world cases, live projects and mentorship from industry leaders helped me think like a business partner rather than just an analyst. Wearing multiple hats across finance, marketing and ops proved invaluable in transitioning into a managerial role in Credit and Real Estate Underwriting at Citibank.", image: ankitaImg.url },
  { name: "Tushar Gauba", role: "Digital Product Manager, IndusInd Bank", note: "Masters’ Union was instrumental in helping me secure the Product Manager role at IndusInd Bank. The Product Practicum gave me hands-on experience in solving real business problems, which translated into strong talking points during interviews. The career team’s personalized mentorship and timely mock interviews ensured I was fully prepared for questions from the BFSI product space.", image: tusharImg.url },
  { name: "Kriti Gupta", role: "Merchandising Manager, Careem | Dubai", note: "Masters’ Union was instrumental in helping me secure my role at Careem. The Career Services team proactively shared my profile for a strong-fit role and coordinated seamlessly with Careem’s recruitment team. They guided me through every stage, including last-mile prep, mock interviews, and connecting me with E-commerce alumni for actionable insights.", image: kritiImg.url },
  { name: "Bhanu Pratap Singh", role: "Strategic Lead, Everest Fleet", note: "Masters’ Union meaningfully shaped my interview readiness and career journey. The curriculum sharpened my core business fundamentals and enabled real-world problem-solving. All of the simulated coursework, case discussions and faculty guidance built enough confidence in me, while the unwavering support from the Prep and Outreach teams helped align roles with my aspirations.", image: bhanuImg.url },
  { name: "Kriti Sharma", role: "Consultant, Praxis Global", note: "Masters’ Union was key in shaping my journey into consulting. Campus interviews with BCG gave me my first exposure, leading to my role at Praxis Global Alliance as a Management Consultant. From excelling in the Dropshipping Challenge to winning a Pre-Seed grant, the real-world problem-solving equipped me with the confidence, skills, and mindset to succeed.", image: kritiSharmaImg.url },
  {
    name: "Shibi Sadasivam",
    role: "Program Manager, Zomato",
    note: "Masters’ Union provided a strong platform for my career transition. The industry-focused curriculum, peer learning, and access to a robust network helped me navigate the job search effectively. Guidance from the placement team, faculty and prep team, along with exposure to real-world business problems, shaped me as an individual and helped secure this opportunity.",
    image: shibiImg.url,
  },
  {
    name: "Varun Makhija",
    role: "Product Manager, ServiceNow",
    note: "Masters’ Union played a pivotal role in helping me secure my Product Manager role at ServiceNow. The campus hiring opportunities were exceptional, and the preparation support invaluable. Case practice and product practicums, guided by mentors like Gaurav Sahu and Aditya, sharpened my problem-solving, while Gopika Ma’am’s guidance in behavioural prep was a game-changer.",
    image: varunImg.url,
  },
  {
    name: "Sidhanta Kumar Panigrahi",
    role: "General Manager - Business Development, Morphogenesis",
    note: "Serving as Student Council President at Masters’ Union gave me first-hand experience in managing teams. MU helped channel that energy into strategic execution and stakeholder management. Its immersive pedagogy and exposure to real industry-led projects through experiential learning developed a 360° business perspective, making my transition to Morphogenesis seamless.",
    image: sidhantaImg.url,
  },
  {
    name: "Kartik Sharma",
    role: "Senior Manager - Digital Marketing, JustDial",
    note: "Masters’ Union turned my job hunt into a strategic campaign. Mock interview marathons sharpened my case-solving, storytelling, and situational judgement, so I could answer Justdial’s questions confidently. Marketing Analytics, Full-Funnel Growth, and Statistics labs equipped me with skills to generate insights and prioritize features in Product Management sprints.",
    image: kartikImg.url,
  },
  {
    name: "Ankit Sharma",
    role: "Business Analyst, Sirius International Holdings | Abu Dhabi",
    note: "The hands-on learning and mentorship from industry leaders at Masters’ Union were instrumental in my seamless transition into a global role at Sirius International Holdings. I’m grateful to Pratham Mittal, Abhishek Kaul, Bhupesh Manoharan, Saksham Kotiya, and the MU team for guiding me, refining my analytical thinking and strengthening my business fundamentals.",
    image: ankitSharmaImg.url,
  },
  {
    name: "Ashmita Malik",
    role: "Senior Associate, Alvarez & Marsal",
    note: "Masters’ Union was instrumental in helping me pivot to a strategy role at A&M from my audit role at EY. Focusing on real-world business problems and consulting workshops transformed my approach. Continuous support from mentors and the placement team, including mock interviews, resume reviews, and one-on-one guidance, helped me navigate recruitment with clarity and confidence.",
    image: ashmitaImg.url,
  },
  ...Array.from({ length: 21 }, (_, i) => ({
    name: `Placement Story ${String(i + 19).padStart(2, "0")}`,
    role: "Role & Company — to be confirmed",
    note: "Placeholder story. Portrait, role and quote will be added once the cohort details are shared.",
  })),
];


/** Composite-pattern feeds: recruiter marquee + testimonial carousels. */
const ALL_RECRUITERS = RECRUITER_GROUPS.flatMap((g) => g.logos).map((name) => ({
  name,
  src: LOGOS[name],
}));

const STORY_QUOTES = TESTIMONIALS.map((t) => ({
  id: t.name,
  quote: t.note,
  author: t.name,
  role: t.role,
}));

const VENTURES = [
  { name: "Bullspree", founder: "Dharmil Bavishi", note: "Experiential stock market gaming platform teaching market dynamics through play." },
  { name: "Eight.Network", founder: "Mohit Paliwal", note: "Audio streaming for stories and podcasts. 1 million+ listeners." },
  { name: "Buzzinga", founder: "Rashweta Bagga", note: "Ready-to-serve baked chicken crisps. 40,000+ orders." },
  { name: "Heal Paws", founder: "Smit Bhavsar", note: "Rapid oral-dissolve strips for pet medicine and supplements." },
  { name: "Aikyam", founder: "Rishika Kormala", note: "Natural premixes addressing chronic gut-related issues." },
  { name: "Crispee", founder: "Shivangi Sardana", note: "Healthy fusion snacking. Dosa Chips crossed 10,000 orders." },
  { name: "73 Boston", founder: "Divita Aggarwal", note: "Wines and spirits for Indian palates. 500 pre-orders, ₹7.5L revenue." },
  { name: "Soul Gappa", founder: "Yukta Rajpal", note: "Hygienic street food. 75% gross margin, 25% EBITDA." },
  { name: "TailorHub", founder: "Sneha Rao", note: "Centralised platform connecting customers with tailors." },
  { name: "Stay Desi", founder: "Anirudh Jain", note: "Curated traditional Indian health foods sourced nationwide." },
  { name: "FNOR", founder: "Abhimany Verma", note: "Modern streetwear at an accessible price point." },
  { name: "Kismat Foods", founder: "Jovial Alex Lejo", note: "Kashmiri premium dry fruit business; flagship dry fruit muesli." },
];

const COMPETITIONS = [
  { who: "Sahil Arora, Mahesh Lalwani", what: "Prodigy '23 — IIM Calcutta", note: "Product development and GTM strategy for health-monitoring wearables." },
  { who: "Praveen Putrevu, Jovial Alex", what: "Brain-a-Thon — IIM Ahmedabad", note: "Brand strategy for a fresh-meat brand entering meat alternatives." },
  { who: "Sahil Arora", what: "Prod War 1.0 — IIT Bombay", note: "Solve Adobe's dilemma: acquire Figma or Canva?" },
  { who: "Aashna Bhardwaj, Priya Ramesh", what: "AWL Resolve — IIM Ahmedabad", note: "Real-world strategy problem sponsored by Adani Wilmar." },
];

const LIVE_PROJECTS = [
  { name: "Microsoft", note: "Hands-on technology live project with Microsoft product teams." },
  { name: "Ather Energy", note: "Students formulated the pricing strategy for a new Ather feature." },
  { name: "PepsiCo", note: "IIT, IIM and MU students competed in the PepsiCo India Challenge on campus." },
];

const CREATORS = [
  { name: "Anurag Bansal", handle: "Business with Bansal", note: "Business, marketing and finance strategies of top companies." },
  { name: "Himanshu Wadekar", handle: "Product Pathshala", note: "Knowledge platform for product management on Instagram and Spotify." },
  { name: "Yash Shah", handle: "Medium Masala", note: "Decoding the lives of influencers and CEOs." },
  { name: "Ayush Sinha", handle: "Iamayushsnh", note: "Abstract films made relatable through captivating storytelling." },
  { name: "Yukta Rajpal", handle: "House of K", note: "South Korean culture, language and economy." },
  { name: "Anishhka Malik", handle: "All About Brands 101", note: "Journeys behind ₹100 crore brands and startups." },
  { name: "Amitoj Singh", handle: "Amitojrocketsingh", note: "The frontline of the sales scene — highs, lows and adventures." },
  { name: "Madhav Nangru", handle: "Seriesmaddy", note: "Dialogues with founders, VCs, CXOs and thinkers." },
];

const TERMS = [
  { term: "Term 1", title: "Mentor allocation & profile building", items: ["Psychometric assessment", "1-1 mentor allocation", "Resume formatting", "LinkedIn profiling", "Professional photography", "Institution of PlaCom", "Know all domains", "Placement policies", "Case & business plan workshop"] },
  { term: "Term 2", title: "Outreach plan & personal branding", items: ["Company list finalisation", "Company outreach plan", "Shortlist top 3 domains", "Presentation skills", "Industry engagement", "Personal branding", "Storytelling workshop", "Career practicums", "Corporate competitions"] },
  { term: "Term 3", title: "Functional role-based workshops", items: ["Resume review #1", "Behavioural mocks", "Consulting case training", "Domain seminars", "Teamwork & conflict management", "Role-based workshops"] },
  { term: "Term 4", title: "Interview preparations", items: ["Resume review #2", "Stress management", "Domain seminars", "Corporate competitions", "Role-based workshops", "Mock interviews", "Last mile preps"] },
  { term: "Term 5", title: "Business etiquette & grooming", items: ["Business etiquette & grooming", "Mock interviews", "Last mile preps", "1-1 with Director of Career Preparation"] },
  { term: "Term 6", title: "Salary negotiation", items: ["Peer best practices", "Salary negotiation workshops", "Mock interviews", "Last mile preps"] },
  { term: "Term 7", title: "Placement drive phase 1", items: ["Mock interviews", "Placement drives", "Last mile preps"] },
  { term: "Term 8", title: "Placement drive phase 2", items: ["Placement drives", "Last mile preps"] },
];

const COACH_TRACKS = [
  { title: "Public speaking & communication", note: "Master public speaking fears, build executive presence, and command respect through personalised coaching." },
  { title: "Personal branding", note: "Cultivate influence through blogging, podcasting, personal websites, and LinkedIn followership." },
  { title: "Career & industry", note: "Network with dream-company executives and excel at interviews through repeated mock sessions." },
];

const COACHES = [
  { name: "Rajnish Virmani", role: "Ex President, COO at Reliance", exp: "10+ yrs" },
  { name: "Mamta Wasan", role: "Director & CEO, Mekosha Ayurveda", exp: "3+ yrs" },
  { name: "Sandeep Bidani", role: "Ex Executive Director HR, IBM", exp: "10+ yrs" },
  { name: "Andrea Stone", role: "Ex CMO, Mahindra Comviva", exp: "10+ yrs" },
  { name: "Santosh Sharan", role: "Ex Director HR, SC Johnson", exp: "5+ yrs" },
  { name: "Sandeep Suri", role: "Ex Country Head, Fidelity Investments", exp: "3+ yrs" },
];

const LEADERS = [
  { name: "Amit Khatri", role: "Co-founder, Noise" },
  { name: "Swati & Rohan Bhargava", role: "Co-founders, CashKaro" },
  { name: "Nipin Marya", role: "CEO, IQOO" },
  { name: "Vikramaditya Chaudhri", role: "Co-Founder, Wingreens Farms" },
  { name: "Hitesh Oberoi", role: "CEO, Info Edge India" },
  { name: "Rakesh Verma", role: "CMD & Co-Founder, MapmyIndia" },
  { name: "Sarvesh Agarwal", role: "Founder & CEO, Internshala" },
  { name: "Punit K Goyal", role: "Co-founder, BluSmart" },
  { name: "Rohit Kapoor", role: "CEO, Food Marketplace, Swiggy" },
  { name: "Rajat Mathur", role: "MD, Morgan Stanley" },
  { name: "Manish Chowdhary", role: "Co-founder, WOW Skin Science" },
  { name: "Sunjay Kapur", role: "Chairman, Sona Comstar" },
];

const CAREERS_TEAM = [
  { name: "Abhishek Kaul", role: "Director — Corporate Engagements, Masters' Union & Tetr", background: "MBA, IIM-L; Ex-Walt Disney, EY, Times Group" },
  { name: "Abhinav Arora", role: "Associate Director — Strategic Initiatives", background: "MBA, IIM-L; Ex-Ernst & Young, Jio, Jio" },
  { name: "Amit Kumar", role: "Associate Director — Corporate Engagements", background: "MBA, IIM-Ahmedabad; Ex-Paytm, Pepsi, upGrad, NET" },
  { name: "Ali Zein Alabdain Qaddo", role: "Associate Director — Corporate Engagements", background: "Ex-HR director, Orange, Egypt" },
  { name: "Anurag Yadav", role: "Associate Director — Corporate Engagements", background: "MBA, MDI Gurgaon; Ex-Accenture" },
  { name: "Nishant Singh Tanwar", role: "Associate Director — Corporate Engagements", background: "MBA, XLRI; Ex-Naukri.com, XamFerry" },
  { name: "Akhil Krishna Gupta", role: "Associate Director — Corporate Engagements", background: "IIT Kharagpur Alumni; Ex-Naukri.com, Ecolab, IGR" },
  { name: "Dibyendu Choudhury", role: "Deputy Director — Corporate Engagements", background: "Ivy, Amity University" },
  { name: "Aastha Arora", role: "Deputy Director — Corporate Engagements", background: "Ex-Finsmart" },
  { name: "Vinayak Chowdhri", role: "Deputy Director — Corporate Engagements", background: "Ex-mPokket, Proschool, IITC, Hansa, Crownit" },
  { name: "Chaneerat Singh Kalra", role: "General Manager — Corporate Engagements", background: "Ex-Zomato" },
  { name: "Riman Khatri", role: "General Manager — Corporate Engagements", background: "Ex-KPMG, MuSigma" },
  { name: "Vishu Goyal", role: "General Manager — Career Preparation", background: "MEM, Masters' Union; LLB, LLR, Collabera, K-Laundry" },
  { name: "Mishika Mansad", role: "General Manager — Corporate Engagements", background: "Kingston University Alumni; Ex-Middlesex University, Dubai" },
  { name: "Rachika Bawa", role: "Senior Manager — Career Preparation", background: "MBA, Masters' Union; Ex-Lowshik, Autonify, Vtrious" },
];

const LEADER_GROUPS = [
  { label: "CEO & MDs", people: LEADERS.slice(0, 3) },
  { label: "CHROs", people: [LEADERS[8], LEADERS[9], LEADERS[11]] },
  { label: "Unicorn Founders", people: [LEADERS[0], LEADERS[1], LEADERS[6]] },
  { label: "Executives", people: [LEADERS[4], LEADERS[7], LEADERS[10]] },
];

const PODCAST_CHAPTERS = [
  { time: "00:00", title: "Trailer", seconds: 0 },
  { time: "01:49", title: "Introduction", seconds: 109 },
  { time: "03:40", title: "Student Placement Stories", seconds: 220 },
  { time: "08:55", title: "Where Career Prep Starts", seconds: 535 },
  { time: "17:16", title: "Starting Out: Framework & Resume Prep", seconds: 1036 },
  { time: "23:08", title: "Career Team Structure", seconds: 1388 },
  { time: "29:08", title: "LMP & the Placement War Room", seconds: 1748 },
  { time: "33:06", title: "Job Negotiation Training", seconds: 1986 },
  { time: "37:32", title: "AI-Led Career Consultation", seconds: 2252 },
  { time: "40:00", title: "Student Practice & Mock Preparation", seconds: 2400 },
  { time: "44:47", title: "Building a Standout CV", seconds: 2687 },
  { time: "52:02", title: "Cracking Your Dream Job", seconds: 3122 },
];


/* -------------------------------- primitives ------------------------------ */

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const base = className.includes("text-") ? "" : "text-muted-foreground";
  const rule = className.includes("text-white") ? "bg-[#FFFFFF]" : "bg-border";
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${base} ${className}`}>
      <span aria-hidden className={`h-px w-6 ${rule}`} />
      <span>{children}</span>
    </p>
  );
}

/** Section index marker used across the editorial rows. */
function Index({ n }: { n: number }) {
  return (
    <span className="text-[10px] tabular-nums tracking-[0.24em] text-black/35" style={{ fontFamily: MONO }}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

function Rule({ delay = 0 }: { delay?: number }) {
  return <Draw delay={delay} className="rule-gradient w-full" />;
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // boolean flag only — React re-renders on the crossing, never per frame
    let on = false;
    return onScrollFrame(({ y }) => {
      const next = y > threshold;
      if (next === on) return;
      on = next;
      setScrolled(next);
    });
  }, [threshold]);
  return scrolled;
}


/* ------------------------------ cinematic hero ----------------------------- */

const HERO_EASE = "cubic-bezier(0.16, 0.84, 0.24, 1)";

/**
 * Full-bleed editorial hero: the graduation photograph fills the viewport at
 * full fidelity, the existing copy sits as quiet metadata, and the existing
 * headline anchors the lower third as oversized typography.
 * Content is unchanged — composition, scale, layering and motion only.
 */
function CinematicHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const reportModal = useReportModal();


  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Bake the hero tone into the bitmap so the parallax frames stay
  // compositor-only (a live CSS filter on a transformed layer re-runs per frame).
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    return bakeImageFilter(img, "contrast(1.06) saturate(1.02)");
  }, []);


  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    // section geometry never changes while scrolling → measure once + on resize
    let docTop = 0;
    let track = 1;
    let lastP = NaN;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      docTop = rect.top + window.scrollY;
      track = Math.max(1, rect.height - (window.innerHeight || 1));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    const offResize = onViewportResize(measure);

    const off = onScrollFrame(({ y }) => {
      // 0 at rest, 1 once the second section has taken over
      const p = Math.min(1, Math.max(0, (y - docTop) / track));
      if (p === lastP) return;
      lastP = p;
      if (imgWrapRef.current) {
        // the photograph drifts upward behind the pinned copy; it never fades —
        // the second section physically slides over it instead
        imgWrapRef.current.style.transform = `translate3d(0, ${(-p * 22).toFixed(2)}%, 0)`;
      }
      if (copyRef.current) {
        // stays put, then eases out only at the very end of the pin
        const cp = Math.min(1, Math.max(0, (p - 0.68) / 0.32));
        copyRef.current.style.opacity = String(1 - cp);
        copyRef.current.style.transform = `translate3d(0, ${(cp * 12).toFixed(1)}px, 0)`;
      }
      if (headlineRef.current) {
        const hp = Math.min(1, Math.max(0, (p - 0.74) / 0.26));
        headlineRef.current.style.opacity = String(1 - hp);
        headlineRef.current.style.transform = `translate3d(0, ${(hp * 14).toFixed(1)}px, 0)`;
      }
    });

    return () => {
      ro.disconnect();
      offResize();
      off();
    };
  }, [reduced]);


  const on = entered || reduced;
  const step = (delay: number, y = 22) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : `translate3d(0,${y}px,0)`,
    transition: reduced
      ? "opacity 240ms linear"
      : `opacity 900ms ${HERO_EASE} ${delay}ms, transform 1000ms ${HERO_EASE} ${delay}ms`,
  });

  return (
    <>
      <section
        id="top"
        ref={sectionRef}
        className="relative z-0 bg-[#0a0a0a]"
        style={{ height: reduced ? "100svh" : "200svh" }}
      >
       <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photograph — full bleed, full fidelity */}
        <div ref={imgWrapRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ willChange: "transform" }}>
          <img
            ref={imgRef}
            src={heroBg.url}
            alt=""
            className="no-img-zoom h-full w-full object-cover object-[58%_46%] md:object-[60%_38%]"
            style={{
              filter: "contrast(1.06) saturate(1.02)",
               transform: on ? "translate3d(0,0,0) scale(1.005)" : "translate3d(0,0,0) scale(1.035)",
              transition: reduced ? "none" : `transform 1700ms ${HERO_EASE} 120ms`,
              willChange: "transform",
            }}
            decoding="async"
            fetchPriority="high"
          />
          {/* Localized readability gradients only — no panel, no wash */}
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/35 via-black/10 to-transparent lg:w-[52%]" />
          {/* Very subtle transparent black overlay over the entire image */}
          <div className="absolute inset-0 bg-black/[0.13]" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent lg:w-[65%]" aria-hidden />
        </div>




        {/* Editorial composition */}
        <div className="page-x relative z-10 flex h-full flex-col pb-28 pt-24 md:pb-24 md:pt-28">

          {/* top: careers eyebrow */}
          <div style={step(450, 16)}>
            <Eyebrow className="text-white">Careers</Eyebrow>
          </div>

          {/* oversized headline under the eyebrow */}
          <div
            ref={headlineRef}
            className="pt-2 md:pt-3"
            style={{ willChange: "transform, opacity" }}
          >
            <h1
              className="max-w-[16ch] text-[clamp(3.1rem,9.4vw,7.6rem)] font-medium leading-[0.92] tracking-[-0.015em] text-[#FFFFFF]"
              style={{
                ...step(980, 56),
                textShadow: "0 1px 40px rgba(0,0,0,0.28)",
              }}
            >
              Accelerate your <em className="font-serif-italic">career growth.</em>
            </h1>
          </div>

          {/* left/middle: supporting copy + CTA directly under headline */}
          <div ref={copyRef} className="mt-8 max-w-[600px] md:mt-14" style={{ willChange: "transform, opacity" }}>
            <p
              className="text-[25px] leading-relaxed placements-dim-white"
              style={step(700, 22)}
            >
              Benefit from an exceptional track record of our graduates&apos; success — audited, published, and repeated across five cohorts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-14" style={step(860, 18)}>
              <button
                type="button"
                onClick={reportModal.open}
                className="hero-sweep-button group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden bg-white px-8 py-4.5 text-[11px] uppercase tracking-[0.22em] text-black transition-all duration-300 ease-out hover:bg-accent hover:shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)] hover:opacity-100"
                style={{ fontFamily: MONO }}
              >
                <span className="hero-sweep-button-content relative z-10 inline-flex items-center gap-2 transition-colors duration-300">
                  <Download className="size-3.5 transition-all duration-300 group-hover:translate-y-0.5" /> Placement report
                </span>
              </button>
              <a
                href="#recruiters"
                className="hero-sweep-button group relative inline-flex items-center gap-2 overflow-hidden border border-white/35 px-8 py-4.5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-300 ease-out hover:border-accent hover:bg-accent hover:shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                style={{ fontFamily: MONO }}
              >
                <span className="hero-sweep-button-content relative z-10 inline-flex items-center gap-2 transition-colors duration-300">
                  Our recruiters <ArrowUpRight className="size-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Editorial block reveal — runs once on first load */}
        <HeroMaskReveal />
       </div>
      </section>
    </>
  );
}




function Band({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "paper" | "grey";
  className?: string;
  children: React.ReactNode;
}) {
  const bg = "bg-[#0B1215]";
  return (
    <section id={id} className={`section-edge relative ${bg} ${className}`}>
      <div className="page-x py-16 md:py-28">
        <div className="placements-section-shell placements-section-shell-light">{children}</div>
      </div>
    </section>
  );
}

/** Sticky editorial column: heading holds while the data scrolls beside it. */
function StickyHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-24">{children}</div>
    </div>
  );
}

function CareerTransitionList({ transition }: { transition: (typeof TRANSITIONS)[number] }) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [scrollKey, setScrollKey] = React.useState<string | null>(null);
  const [hoverKey, setHoverKey] = React.useState<string | null>(null);
  const [hovering, setHovering] = React.useState(false);
  // Hover always wins while the pointer is inside the list; scroll only
  // highlights the row that actually sits on the focus line.
  const activeKey = hovering ? hoverKey : scrollKey;
  const isLaunch = transition.columns.length === 3;

  React.useEffect(() => {
    const compute = () => {
      const list = listRef.current;
      if (!list) return;
      const focus = window.innerHeight * 0.45;
      let activeRow: string | null = null;
      list.querySelectorAll<HTMLElement>("[data-row-key]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        // Only the row crossing the focus line is active — scroll past it and
        // the highlight clears instead of sticking to the nearest row.
        if (rect.top <= focus && rect.bottom >= focus) {
          activeRow = node.dataset.rowKey ?? null;
        }
      });
      setScrollKey(activeRow);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      className="career-transition-list"
      ref={listRef}
      onMouseLeave={() => {
        setHovering(false);
        setHoverKey(null);
      }}
    >
      <div className={`career-transition-columns ${isLaunch ? "career-transition-columns-launch" : ""}`}>
        {transition.columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      {transition.rows.map((row) => {
        const key = row.join("-");
        return (
          <div
            key={key}
            data-row-key={key}
            className={`career-transition-row group ${isLaunch ? "career-transition-row-launch" : ""}`}
            data-active={activeKey === key ? "true" : "false"}
            onMouseEnter={() => {
              setHovering(true);
              setHoverKey(key);
            }}
            onMouseLeave={() => setHoverKey(null)}
          >
            {row.map((value, index) => (
              <React.Fragment key={`${value}-${index}`}>
                <div className="career-transition-cell">
                  <span className="career-transition-mobile-label">{transition.columns[index]}</span>
                  <span>{value}</span>
                </div>
                {!isLaunch && index === 0 ? (
                  <div className="career-transition-arrow" aria-hidden="true">
                    <span />
                    <ArrowUpRight className="size-4 rotate-45" />
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}


function CareerTransitionsSection() {
  return (
    <Band tone="white" className="career-transitions-section">
      <Reveal>
        <Eyebrow>Career transitions</Eyebrow>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-6 max-w-[28ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          Where students come from, <em className="font-serif-italic">and where they go.</em>
        </h2>
      </Reveal>

      <div className="career-transition-story mt-14">
        {TRANSITIONS.map((transition, transitionIndex) => (
          <section key={transition.title} className="career-transition-chapter">
            <div className="career-transition-sticky">
              <div className="career-transition-category">
                <div className="flex items-baseline gap-4">
                  <Index n={transitionIndex + 1} />
                  <h3 className="text-[1.2rem] font-medium capitalize">{transition.title}</h3>
                </div>
                <p className="mt-2 pl-9 text-[11px] uppercase tracking-[0.2em] text-black/55" style={{ fontFamily: MONO }}>
                  {transition.sub}
                </p>
                <span className="career-transition-category-rule" aria-hidden="true" />
              </div>
            </div>

            <CareerTransitionList transition={transition} />

          </section>
        ))}
      </div>
    </Band>
  );
}

function PortraitPlaceholder({ name, imageSrc, className = "" }: { name: string; imageSrc?: string; className?: string }) {
  if (imageSrc) {
    return (
      <div className={`career-portrait-placeholder career-portrait-image ${className}`}>
        <img src={imageSrc} alt={`${name} portrait`} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`career-portrait-placeholder ${className}`} role="img" aria-label={`${name} portrait placeholder`}>
      <span aria-hidden="true">{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
    </div>
  );
}

function CareerExperienceArea() {
  const [story, setStory] = useState(0);
  const [term, setTerm] = useState(0);
  const [leaderGroup, setLeaderGroup] = useState(0);
  const featuredStories = TESTIMONIALS;
  const currentStory = featuredStories[story];
  const currentTerm = TERMS[term];
  const currentLeaders = LEADER_GROUPS[leaderGroup];

  const moveStory = (direction: number) => {
    setStory((current) => (current + direction + featuredStories.length) % featuredStories.length);
  };

  return (
    <div className="career-experience-area">
      <Band id="stories" tone="paper">
        <div className="career-section-number">01</div>
        <div className="career-story-heading">
          <Reveal><Eyebrow>Student placement experience</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2>Featured <em className="font-serif-italic">stories</em></h2>
          </Reveal>
        </div>

        <div
          className="career-featured-story"
          role="region"
          aria-roledescription="carousel"
          aria-label="Student placement stories"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") moveStory(-1);
            if (event.key === "ArrowRight") moveStory(1);
          }}
        >
          <div className="career-story-toolbar">
            <div className="career-story-progress" aria-label={`Story ${story + 1} of ${featuredStories.length}`}>
              <span>{String(story + 1).padStart(2, "0")}</span>
              <i aria-hidden="true"><b style={{ width: `${((story + 1) / featuredStories.length) * 100}%` }} /></i>
              <span>{String(featuredStories.length).padStart(2, "0")}</span>
            </div>
            <div className="career-story-arrows">
              <Button variant="outline" size="icon" onClick={() => moveStory(-1)} aria-label="Previous student story"><ChevronLeft /></Button>
              <Button variant="outline" size="icon" onClick={() => moveStory(1)} aria-label="Next student story"><ChevronRight /></Button>
            </div>
          </div>

          <div className="career-story-stage" key={currentStory.name} aria-live="polite">
            <div className="career-featured-copy">
              <div>
                <p className="career-kicker">Featured story <span>— {String(story + 1).padStart(2, "0")}</span></p>
                <h3>{currentStory.name}</h3>
                <p className="career-role">{currentStory.role}</p>
              </div>
              <blockquote>“{currentStory.note}”</blockquote>
            </div>

            <div className="career-story-visual">
              <PortraitPlaceholder name={currentStory.name} imageSrc={(currentStory as any).image} className="career-featured-portrait" />
              <div className="career-story-accent">
                <span>Student voice</span>
                <p>{currentStory.name}</p>
                <strong aria-hidden="true">↗</strong>
              </div>
            </div>
          </div>

          <div className="career-story-tabs" role="tablist" aria-label="Choose a student story">
            {featuredStories.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={story === index}
                aria-label={`Show story from ${item.name}`}
                onClick={() => setStory(index)}
              >
                <span aria-hidden="true" />
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="grey">
        <div className="career-section-number">02</div>
        <Reveal><Eyebrow>Professional guidance</Eyebrow></Reveal>
        <Reveal delay={100}><h2 className="career-area-title">Careers <em className="font-serif-italic">Team</em></h2></Reveal>
        <div className="career-team-grid mt-12">
          {CAREERS_TEAM.map((member, index) => (
            <Reveal key={member.name} delay={(index % 5) * 55}>
              <article className="career-team-card">
                <PortraitPlaceholder name={member.name} />
                <div className="career-team-copy">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <small>{member.background}</small>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <a className="career-contact-strip mt-10" href="mailto:careerservices@mastersunion.org">
          <Mail aria-hidden="true" /> Reach out to our team at <span>careerservices@mastersunion.org</span><ArrowUpRight aria-hidden="true" />
        </a>
      </Band>

      <Band id="pathway" tone="white">
        <div className="career-section-number">03</div>
        <Reveal><Eyebrow>Annual roadmap</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="career-area-title">Benefit From a Tailored <em className="font-serif-italic">Career Pathway</em></h2>
          <p className="career-area-intro">Leverage the opportunity to engage in workshops, training, panel discussions, counselling sessions, and personalised career progression plans.</p>
        </Reveal>
        <div className="career-term-selector mt-10" role="tablist" aria-label="Career pathway terms">
          {TERMS.map((item, index) => (
            <Button key={item.term} variant="ghost" role="tab" aria-selected={term === index} className={term === index ? "is-active" : ""} onClick={() => setTerm(index)}>{item.term}</Button>
          ))}
        </div>
        <div className="career-pathway-panel" key={currentTerm.term}>
          <div className="career-pathway-content">
            <p className="career-kicker">{currentTerm.term}</p>
            <h3>{currentTerm.title}</h3>
            <ul>{currentTerm.items.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul>
          </div>
          <div className="career-pathway-visual" role="img" aria-label="Students taking part in career preparation">
            <img src={heroBg.url} alt="Masters' Union students in a career preparation session" loading="lazy" />
            <span>{String(term + 1).padStart(2, "0")} / 08</span>
          </div>
        </div>
      </Band>

      <Band tone="paper">
        <div className="career-section-number">04</div>
        <Reveal><Eyebrow>Dedicated career coaches</Eyebrow></Reveal>
        <Reveal delay={100}><h2 className="career-area-title">Making You <em className="font-serif-italic">Industry Ready</em></h2></Reveal>
        <div className="career-coach-grid mt-12">
          {COACH_TRACKS.map((track, trackIndex) => (
            <article className="career-coach-track" key={track.title}>
              <div className="career-coach-icon">{trackIndex === 0 ? <Mic2 /> : trackIndex === 1 ? <BadgeCheck /> : <Compass />}</div>
              <h3>{track.title} Coach</h3>
              <p>{track.note}</p>
              <div className="career-coach-people">
                {COACHES.slice(trackIndex * 2, trackIndex * 2 + 2).map((coach) => (
                  <div className="career-coach-person" key={coach.name}>
                    <PortraitPlaceholder name={coach.name} />
                    <div><strong>{coach.name}</strong><span>{coach.role}</span><small>Coaching experience: {coach.exp}</small></div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Band>

      <Band tone="white">
        <div className="career-section-number">05</div>
        <Reveal><Eyebrow>Leadership guidance</Eyebrow></Reveal>
        <Reveal delay={100}><h2 className="career-area-title">Your Future Recruiters <em className="font-serif-italic">on Campus</em></h2></Reveal>
        <div className="career-leader-layout mt-12">
          <div className="career-leader-selector" role="tablist" aria-label="Recruiter leadership categories">
            {LEADER_GROUPS.map((group, index) => (
              <Button key={group.label} variant="ghost" role="tab" aria-selected={leaderGroup === index} className={leaderGroup === index ? "is-active" : ""} onClick={() => setLeaderGroup(index)}>{group.label}</Button>
            ))}
          </div>
          <div className="career-leader-cards" key={currentLeaders.label}>
            {currentLeaders.people.map((leader, index) => (
              <article className="career-leader-card" key={leader.name}>
                <div className="career-leader-media"><PortraitPlaceholder name={leader.name} /><span><Play fill="currentColor" /></span></div>
                <h3>{leader.name}</h3><p>{leader.role}</p><small>{String(index + 1).padStart(2, "0")} / 03</small>
              </article>
            ))}
          </div>
        </div>
      </Band>

      <section className="career-closing-section">
        <div className="page-x">
          <div className="career-closing-cta">
            <h2>Explore <em className="font-serif-italic">Masters' Union</em></h2>
            <nav aria-label="Explore Masters' Union">
              <a href="/life-at-mu">Student Life <ArrowUpRight /></a>
              <a href="/placements">Explore Careers <ArrowUpRight /></a>
              <a href="mailto:admissions@mastersunion.org">Book a Visit <ArrowUpRight /></a>
              <a href="/life-at-mu">Explore Events <ArrowUpRight /></a>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

const PODCAST_ID = "uiNTwDixAts";

type PodcastCtx = { seek: (seconds: number) => void };
const PodcastContext = React.createContext<PodcastCtx>({ seek: () => {} });

function PodcastSection() {
  const [state, setState] = useState<{ playing: boolean; start: number; token: number }>({
    playing: false,
    start: 0,
    token: 0,
  });

  const seek = React.useCallback((seconds: number) => {
    setState((s) => ({ playing: true, start: seconds, token: s.token + 1 }));
  }, []);

  return (
    <PodcastContext.Provider value={{ seek }}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <PodcastTextBlock />
        </div>
        <div className="lg:col-span-7">
          <PodcastVideoPlayer
            playing={state.playing}
            start={state.start}
            seekToken={state.token}
            onPlay={() => setState((s) => ({ ...s, playing: true }))}
          />
          <div className="mt-4 flex flex-col gap-4">
            <div className="h-px w-full bg-black/20" />
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/50">
              Episode — The story behind ₹33 lakh per LPA average placements — Watch / Listen
            </p>
          </div>
        </div>
      </div>
    </PodcastContext.Provider>
  );
}

function PodcastTextBlock() {
  const id = PODCAST_ID;
  return (
    <div className="flex flex-col justify-center">
      <Reveal>
        <Eyebrow>Podcast</Eyebrow>
      </Reveal>
      <Reveal delay={90}>
        <h3 className="mt-4 text-[clamp(1.55rem,2.9vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          How Masters&apos; Union <em className="font-serif-italic">prepares students for top 1% placements</em>
        </h3>
      </Reveal>
      <Reveal delay={180}>
        <p className="mt-4 max-w-[50ch] text-[16px] leading-relaxed text-black/65">
          A detailed conversation on the placement engine behind Masters&apos; Union — how recruiter
          access, live industry projects and year-round career coaching translate into offers at the
          firms shaping the next decade.
        </p>
      </Reveal>
      <Reveal delay={230}>
        <div className="mt-8 max-w-[46ch] rounded-md border border-[var(--teal)] bg-[#0B1215] p-5">
          <p className="text-[15px] leading-relaxed text-black/80">
            Inside the <em className="font-serif-italic">placement engine</em> behind the next
            generation of business leaders.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noreferrer"
            className="sweep-link group mt-4 inline-flex items-center gap-2 border-b border-black/25 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black"
          >
            Watch on YouTube
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <PodcastChapters />
        </div>
      </Reveal>
    </div>
  );
}

function PodcastVideoPlayer({
  playing,
  start,
  seekToken,
  onPlay,
}: {
  playing: boolean;
  start: number;
  seekToken: number;
  onPlay: () => void;
}) {
  const id = PODCAST_ID;

  return (
    <ClipReveal>
      <div className="group relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            key={seekToken}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&start=${start}`}
            title="How Masters' Union prepares students for top 1% placements"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label="Play placements podcast"
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt="Masters' Union placements podcast"
              loading="lazy"
              className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="relative grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition group-hover:bg-white/25">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -inset-[3px] size-[50px] transition-[stroke-dashoffset] duration-[900ms] ease-out [stroke-dasharray:138.23] [stroke-dashoffset:138.23] group-hover:[stroke-dashoffset:0]"
                  viewBox="0 0 50 50"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="22"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                Play podcast
              </span>
            </span>
          </button>
        )}
      </div>
    </ClipReveal>
  );
}

function PodcastChapters() {
  const { seek } = React.useContext(PodcastContext);
  const [open, setOpen] = useState(false);
  const PREVIEW_COUNT = 4;
  const previewChapters = PODCAST_CHAPTERS.slice(0, PREVIEW_COUNT);
  const extraChapters = PODCAST_CHAPTERS.slice(PREVIEW_COUNT);

  const ChapterRow = ({ chapter }: { chapter: (typeof PODCAST_CHAPTERS)[number] }) => (
    <li key={chapter.seconds}>
      <button
        type="button"
        onClick={() => seek(chapter.seconds)}
        className="group flex w-full items-center justify-between gap-3 border-b border-black/15 py-3 text-left transition-colors duration-300"
      >
        <span className="flex items-baseline gap-4">
          <span
            className="text-[11px] tabular-nums tracking-[0.12em] text-black/40 transition-colors duration-300 group-hover:text-[var(--accent)]"
            style={{ fontFamily: MONO }}
          >
            {chapter.time}
          </span>
          <span className="text-[14px] leading-snug text-black/80 transition-colors duration-300 group-hover:text-[var(--accent)]">
            {chapter.title}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-3.5 shrink-0 -translate-x-1 text-black/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[var(--accent)] group-hover:opacity-100"
        />
      </button>
    </li>
  );

  return (
    <div className="mt-5 border-t border-black/15 pt-4">
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50"
          style={{ fontFamily: MONO }}
        >
          What you&apos;ll hear
        </span>
      </div>

      <ul className="flex flex-col">
        {previewChapters.map((chapter) => (
          <ChapterRow chapter={chapter} key={chapter.seconds} />
        ))}
      </ul>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-[600ms] ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ul className="flex flex-col overflow-hidden">
          {extraChapters.map((chapter) => (
            <ChapterRow chapter={chapter} key={chapter.seconds} />
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle chapter timeline"
        className="group mt-3 flex w-full items-center justify-end gap-3 border-t border-black/15 pt-3 text-left"
      >
        <ChevronDown
          aria-hidden
          className={`size-4 text-black/40 transition-transform duration-500 ease-in-out group-hover:text-[var(--accent)] ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

/** Editorial metric blocks for the Podcast and Proven Outcomes sections. */
function HorizontalMetricsStrip() {
  return (
    <div className="placements-metrics-strip grid grid-cols-1 gap-px overflow-hidden border-y border-foreground/10 bg-foreground/10 lg:grid-cols-3">
      {AUDIT_STATS.map((stat, i) => (
        <div
          key={stat.suffix}
          className="metric-card group relative flex flex-col overflow-hidden bg-background transition-colors duration-500 ease-out"
        >
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-5 py-6 md:px-7 md:py-7 lg:px-8 lg:py-8">
            {/* index */}
            <span
              className="text-[10px] tabular-nums tracking-[0.28em] text-black/40 transition-colors duration-500"
              style={{ fontFamily: MONO }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* number */}
            <span className="whitespace-nowrap text-center text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium leading-none tracking-[-0.04em] text-black transition-colors duration-500">
              {stat.value}
            </span>

            {/* divider */}
            <div className="h-px w-20 bg-border" />

            {/* label + description */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span
                className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-black/80 transition-colors duration-500"
                style={{ fontFamily: MONO }}
              >
                {stat.suffix}
              </span>
              <p className="max-w-[26ch] text-center text-[13px] leading-snug text-black/55 transition-colors duration-500">
                {stat.note}
              </p>
            </div>
            <span aria-hidden className="placements-metric-accent mt-1 block h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}


function SalaryDistributionChart() {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -8% 0px");
  const reduced = useReducedMotion();

  return (
    <div ref={ref} data-in-view={inView || reduced} className="salary-viz-bars" aria-label="Salary distribution by CTC range">
      <div className="salary-viz-scale" aria-hidden>
        {[40, 30, 20, 10, 0].map((tick) => (
          <div key={tick} className="salary-viz-scale-row">
            <span>{tick}%</span>
            <i />
          </div>
        ))}
      </div>
      <div className="salary-viz-columns">
        {SALARY_DISTRIBUTION.map((item, index) => (
          <Button
            key={item.range}
            type="button"
            variant="ghost"
            className="salary-viz-column group h-auto rounded-none p-0 hover:bg-transparent focus-visible:ring-accent"
            style={{ "--salary-pct": `${item.pct}`, "--salary-delay": `${index * 85}ms` } as React.CSSProperties}
            aria-label={`${item.range}: ${item.pct.toFixed(2)} percent`}
          >
            <span className="salary-viz-value"><CountUp value={`${item.pct.toFixed(2)}%`} delay={index * 85} /></span>
            <span className="salary-viz-extrusion" aria-hidden>
              <span className="salary-viz-face-front" />
              <span className="salary-viz-face-side" />
            </span>
            <span className="salary-viz-range">{item.range}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function SalaryComponentsDonut() {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -8% 0px");
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  let offset = 0;
  const on = inView || reduced;

  return (
    <div ref={ref} className="salary-viz-donut-layout">
      <div className="salary-viz-donut-wrap">
        <svg className="salary-viz-donut" viewBox="0 0 200 200" role="img" aria-labelledby="salary-components-title salary-components-desc">
          <title id="salary-components-title">Salary components</title>
          <desc id="salary-components-desc">Average base is 81 percent, average variable is 13 percent, and average ESOPs are 6 percent of CTC.</desc>
          <circle cx="100" cy="100" r="68" pathLength="100" className="salary-viz-donut-track" />
          {SALARY_COMPONENTS.map((item, index) => {
            const start = offset;
            const angle = (-90 + (start + item.pct / 2) * 3.6) * (Math.PI / 180);
            const distance = active === index && !reduced ? 6 : 0;
            offset += item.pct;
            return (
              <g
                key={item.label}
                className="salary-viz-segment-group"
                style={{ transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)` }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="68"
                  pathLength="100"
                  fill="none"
                  className={`salary-viz-segment salary-viz-segment-${index + 1}${active === index ? " is-active" : ""}`}
                  strokeDasharray={`${on ? item.pct : 0} ${on ? 100 - item.pct : 100}`}
                  strokeDashoffset={-start}
                  transform="rotate(-90 100 100)"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  aria-label={`${item.label}: ${item.pct}% of CTC, ${item.value}`}
                />
              </g>
            );
          })}
          <text x="100" y="89.79" textAnchor="middle" className="salary-viz-donut-kicker">TOTAL CTC</text>
          <text x="100" y="111.79" textAnchor="middle" className="salary-viz-donut-total">100%</text>
        </svg>
      </div>

      <div className="salary-viz-legend" aria-label="Salary component details">
        {SALARY_COMPONENTS.map((item, index) => (
          <Button
            key={item.label}
            type="button"
            variant="ghost"
            className={`salary-viz-legend-row h-auto w-full rounded-none p-0 text-left hover:bg-transparent focus-visible:ring-accent${active === index ? " is-active" : ""}`}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            aria-label={`${item.label}: ${item.pct}% of CTC, ${item.value}`}
          >
            <span className={`salary-viz-swatch salary-viz-swatch-${index + 1}`} aria-hidden />
            <span className="salary-viz-legend-copy">
              <span className="salary-viz-legend-label">{item.label}</span>
              <span className="salary-viz-legend-detail">{item.pct}% of CTC</span>
            </span>
            <span className="salary-viz-legend-value">{item.value}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function SalaryVisualizations() {
  return (
    <section className="salary-viz-section section-edge bg-[#0B1215]" aria-labelledby="salary-viz-title">
      <div className="page-x py-10 md:py-14">
        <div className="placements-section-shell placements-section-shell-dark">
        <header className="salary-viz-header">
          <div>
            <span className="salary-viz-kicker" style={{ fontFamily: MONO }}>Compensation anatomy / Cohort 2025</span>
            <h2 id="salary-viz-title" className="salary-viz-title">Beyond the average. <em>Inside the offer.</em></h2>
          </div>
        </header>

        <div className="salary-viz-grid">
          <article className="salary-viz-panel salary-viz-panel-distribution" aria-labelledby="salary-distribution-heading">
            <div className="salary-viz-panel-heading">
              <span style={{ fontFamily: MONO }}>01 / DISTRIBUTION</span>
              <h3 id="salary-distribution-heading">Salary <em>distribution</em></h3>
            </div>
            <SalaryDistributionChart />
            <div className="salary-viz-distribution-intro">
              <p>How compensation is distributed across the cohort, and how the average offer is constructed.</p>
            </div>
          </article>

          <article className="salary-viz-panel salary-viz-panel-components" aria-labelledby="salary-components-heading">
            <div className="salary-viz-panel-heading">
              <span style={{ fontFamily: MONO }}>02 / COMPONENTS</span>
              <h3 id="salary-components-heading">Salary <em>components</em></h3>
            </div>
            <SalaryComponentsDonut />
          </article>
        </div>
        </div>
      </div>
    </section>
  );
}

function MetricBarGroup({
  metrics,
  max,
  unit,
}: {
  metrics: { label: string; value: string; raw: number }[];
  max: number;
  unit?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -8% 0px");
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      data-in-view={inView || reduced}
      className="placement-stats-bars"
      aria-label={`Metrics up to ${max} ${unit || "LPA"}`}
    >
      <div className="placement-stats-scale" aria-hidden>
        <span>
          {max} {unit || "L"}
        </span>
        <span>
          {max / 2} {unit || "L"}
        </span>
        <span>0</span>
      </div>
      <div className="placement-stats-columns">
        {metrics.map((item, index) => {
          const height = Math.min(100, Math.max(4, (item.raw / max) * 100));
          return (
            <Button
              key={item.label}
              type="button"
              variant="ghost"
              className="placement-stats-column group h-auto rounded-none p-0 hover:bg-transparent focus-visible:ring-accent"
              style={
                { "--bar-pct": `${height}`, "--bar-delay": `${index * 120}ms` } as React.CSSProperties
              }
              aria-label={`${item.label}: ${item.value}`}
            >
              <span className="placement-stats-bar-stack">
                <span className="placement-stats-value">
                  <CountUp value={item.value} delay={index * 120} />
                </span>
                <span className="placement-stats-extrusion" aria-hidden>
                  <span className="placement-stats-face-front" />
                  <span className="placement-stats-face-side" />
                </span>
              </span>
              <span className="placement-stats-label">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

const PLACEMENT_STATS = {
  international: { offers: "30", average: "₹64 LPA" },
  ylc: [
    { label: "Average CTC", value: "₹28.24 LPA", raw: 28.24 },
    { label: "Median CTC", value: "₹27.43 LPA", raw: 27.43 },
    { label: "Highest CTC", value: "₹46.22 LPA", raw: 46.22 },
  ],
  tbm: [
    { label: "Average CTC", value: "₹33.39 LPA", raw: 33.39 },
    { label: "Domestic Average CTC", value: "₹30.72 LPA", raw: 30.72 },
    { label: "Highest CTC", value: "₹1.28 Cr", raw: 128 },
  ],
};

function OurPlacementStatistics() {
  return (
    <div className="mt-10" aria-labelledby="placement-stats-title">
      <div className="placements-section-shell placements-section-shell-dark">
        <header className="placement-stats-header">
          <div>
            <span className="placement-stats-kicker" style={{ fontFamily: MONO }}>
              Placement statistics / 2025
            </span>
            <h2 id="placement-stats-title" className="placement-stats-title">
              Our placement <em className="font-serif-italic" style={{ color: "var(--teal)" }}>statistics.</em>
            </h2>
          </div>
          <div className="placement-stats-headlines">
            <div className="placement-stats-headline">
              <span className="placement-stats-headline-value">
                <CountUp value="30" />
              </span>
              <span className="placement-stats-headline-label">Total International &amp; International Remote Offers</span>
            </div>
            <span className="placement-stats-headline-divider" aria-hidden="true" />
            <div className="placement-stats-headline">
              <span className="placement-stats-headline-value">
                <CountUp value="₹64 LPA" />
              </span>
              <span className="placement-stats-headline-label">International Average CTC</span>
            </div>
          </div>
        </header>

        <div className="placement-stats-grid">
          <article className="placement-stats-panel" aria-labelledby="placement-stats-ylc-heading">
            <div className="placement-stats-panel-heading">
              <span style={{ fontFamily: MONO }}>01 / PGP TBM YLC</span>
              <h3 id="placement-stats-ylc-heading">
                PGP TBM <em className="font-serif-italic" style={{ color: "var(--teal)" }}>YLC</em>
              </h3>
            </div>
            <MetricBarGroup metrics={PLACEMENT_STATS.ylc} max={50} />
          </article>

          <article className="placement-stats-panel" aria-labelledby="placement-stats-tbm-heading">
            <div className="placement-stats-panel-heading">
              <span style={{ fontFamily: MONO }}>02 / PGP TBM</span>
              <h3 id="placement-stats-tbm-heading">
                PGP TBM <em className="font-serif-italic" style={{ color: "var(--teal)" }}>cohort</em>
              </h3>
            </div>
            <MetricBarGroup metrics={PLACEMENT_STATS.tbm} max={150} />
          </article>
        </div>
      </div>
    </div>
  );
}

function LogoRow({ names }: { names: string[] }) {
  const found = names.filter((n) => LOGOS[n]);
  if (found.length === 0) return null;
  return (
    <div className="recruiter-logo-row flex flex-wrap items-center gap-x-12 gap-y-8">
      {found.map((n, i) => (
        <Reveal key={n} delay={i * 60} y={14} duration={650}>
          <div className="recruiter-logo-tile flex h-14 w-28 items-center justify-center">
            <img
              src={LOGOS[n]}
              alt={n}
              loading="lazy"
              className="no-img-zoom max-h-full max-w-full object-contain opacity-70 transition-opacity duration-500 hover:opacity-100"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------- audited outcomes ---------------------------- */

function OutcomesAccordion() {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* LEFT — anchored editorial column */}
        <div className="lg:col-span-4">
          <Eyebrow>Five years of audited placements</Eyebrow>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.55rem,2.9vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
            Proven outcomes, <em className="font-serif-italic">verified line by line.</em>
          </h2>
          <p className="mt-4 max-w-[50ch] text-[16px] leading-relaxed text-black/65">
            Our placement reports are audited by Brickworks — auditor for IIM Ahmedabad — and follow
            the IPRS Revision 2.2 framework for transparent, consistent compensation data.{" "}
            <a
              href="https://www01.iima.ac.in/iprs/about-iprs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-[var(--teal)] underline underline-offset-2 decoration-2 transition-all duration-300 hover:brightness-110 hover:drop-shadow-[0_0_6px_color-mix(in_oklab,var(--teal)_40%,transparent)]"
            >
              Know more <ArrowUpRight className="inline-block size-3.5" strokeWidth={2} />
            </a>
          </p>
        </div>

        {/* RIGHT — static metrics bar (shared Podcast layout) */}
        <div className="lg:col-span-8">
          <HorizontalMetricsStrip />
        </div>
      </div>
    </div>
  );
}



function CohortReportCard({ year, href, cover }: { year: string; href: string; cover: string }) {
  const is2022 = year.includes("2022");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`${year} placement report (PDF)`}
      className="card-elevated group flex h-full flex-col border border-border bg-card p-3 transition-colors duration-500 hover:border-teal/40"
    >
      {/* compact document preview */}
      <div className="relative flex aspect-[16/17] w-full items-center justify-center overflow-hidden bg-muted">
          <img
            src={cover}
            alt={`${year} placement report cover`}
            loading="lazy"
            className={`h-full w-full ${is2022 ? "object-contain object-center" : "object-cover object-center"}`}
          />
        </div>

        <div className="mt-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[16px] leading-relaxed text-black">{year}</div>
            <div
              className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50"
              style={{ fontFamily: MONO }}
            >
              Placement report
            </div>
          </div>
          <Download className="mt-0.5 size-3.5 shrink-0 text-black/40 transition-transform duration-500 group-hover:translate-y-0.5" />
      </div>
    </a>
  );
}

function CohortReports() {
  const reportModal = useReportModal();
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {REPORT_YEARS.map((y, i) => (
          <Reveal key={y} delay={i * 70} y={16}>
            <CohortReportCard
              year={`Cohort ${y}`}
              href={PLACEMENT_REPORTS[y].pdf}
              cover={PLACEMENT_REPORTS[y].cover}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={reportModal.open}
          className="report-sweep-button group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden border border-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/70 transition-colors duration-500 hover:border-black/45"
          style={{ fontFamily: MONO }}
        >
          <span
            aria-hidden
            className="absolute inset-0 z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
          <span className="report-sweep-button-content relative z-10 inline-flex items-center gap-2 transition-colors duration-500">
            <Download className="size-3.5" /> Download placement report
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------------------- quote: bottom-to-top cover ------------------------ */

/* Single continuous progress channel, written once per frame without React re-renders. */
type QuoteCoverSub = (p: number) => void;
const quoteCoverSubs = new Set<QuoteCoverSub>();
let quoteCoverP = 0;
function setQuoteCoverProgress(p: number) {
  if (p === quoteCoverP) return;
  quoteCoverP = p;
  quoteCoverSubs.forEach((f) => f(p));
}
function subscribeQuoteCover(f: QuoteCoverSub) {
  quoteCoverSubs.add(f);
  f(quoteCoverP);
  return () => {
    quoteCoverSubs.delete(f);
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const QUOTE_TEXT =
  "We don't approach placements the way most B-schools do. At Masters' Union, placements are run by a 50+ member, full-time team spanning company outreach, career preparation, and role-specific coaching.";
const QUOTE_WORDS = QUOTE_TEXT.split(/\s+/).map((text, idx) => ({
  text,
  em: idx >= 14 && idx <= 20,
}));

const TYPOGRAPHY_ITEMS: { type: "open" | "word" | "close" | "attribution"; text: string; em?: boolean }[] = [
  { type: "open", text: "\u201C" },
  ...QUOTE_WORDS.map((w) => ({ type: "word" as const, text: w.text, em: w.em })),
  { type: "close", text: "\u201D" },
  { type: "attribution", text: "Pratham Mittal — Founder & CEO, Masters' Union" },
];

function FounderQuoteSection({ animated = false }: { animated?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const wordRefs = useRef<(HTMLElement | null)[]>([]);

  /* One continuous state: the full image covers upward, then the existing text reveal runs. */
  const lastQ = useRef(NaN);
  const apply = useCallback(
    (q: number) => {
      const t = q < 0 ? 0 : q > 2 ? 2 : q;
      if (t === lastQ.current) return;
      lastQ.current = t;
      // phase A (0 → 1): the complete Quote section covers upward as one stable layer.
      const p = Math.min(1, t);
      const cover = p * p * (3 - 2 * p);
      if (hostRef.current) {
        hostRef.current.style.transform =
          p >= 1 ? "translate3d(0, 0, 0)" : `translate3d(0, ${((1 - cover) * 100).toFixed(3)}%, 0)`;
      }

      // phase B — preserve the existing quote fade and word-by-word reveal.
      const phase = Math.min(1, Math.max(0, t - 1));
      const fade = Math.min(1, phase / 0.16);
      if (textRef.current) {
        textRef.current.style.opacity = `${fade}`;
        textRef.current.style.transform = `translate3d(0px, ${((1 - fade) * 18).toFixed(2)}px, 0px)`;
      }

      // scroll-driven top-to-bottom word reveal, only after the fade-in
      const words = wordRefs.current;
      const totalWords = words.length;
      if (totalWords > 1) {
        const rp = Math.min(1, Math.max(0, (phase - 0.16) / 0.74));
        const dim = 0.18;
        for (let i = 0; i < totalWords; i++) {
          const el = words[i];
          if (!el) continue;
          const at = i / (totalWords - 1);
          const win = 0.12;
          const raw = (rp - (at - win / 2)) / win;
          const local = raw <= 0 ? 0 : raw >= 1 ? 1 : easeOutCubic(raw);
          el.style.opacity = `${dim + (1 - dim) * local}`;
        }
      }
    },
    [],
  );

  useEffect(() => {
    lastQ.current = NaN;
    if (!animated) {
      apply(2);
      return;
    }
    return subscribeQuoteCover(apply);
  }, [animated, apply]);

  return (
    <section
      ref={hostRef}
      className="relative flex items-end lg:items-start pt-20 md:pt-24 lg:pt-28 py-14 md:py-16"
      style={{
        backgroundColor: "black",
        backgroundImage: `url(${manojKohliBg.url})`,
        backgroundPosition: "85% 55%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform: animated ? "translate3d(0, 100%, 0)" : "translate3d(0, 0, 0)",
        willChange: animated ? "transform" : undefined,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Existing dark overlay, now applied once over the continuous image. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"
        style={{ zIndex: 2 }}
      />

      <div className="page-x relative w-full" style={{ zIndex: 3 }}>
        <div
          ref={textRef}
          className="relative max-w-[56ch]"
          style={{
            opacity: animated ? 0 : 1,
            transform: animated ? "translate3d(0px, 18px, 0px)" : "translate3d(0px, 0px, 0px)",
            willChange: animated ? "opacity, transform" : undefined,
          }}
        >
          <Quote
            className="absolute -left-1 -top-2 size-10 text-white/15 md:-top-4 md:size-16"
            strokeWidth={1}
            aria-hidden="true"
          />
          <blockquote className="text-[clamp(1.5rem,3.6vw,2.8rem)] font-medium leading-[1.3] tracking-[-0.015em] placements-dim-white">
            {TYPOGRAPHY_ITEMS.map((item, i) => {
              if (item.type === "attribution") return null;
              const isLastWord = item.type === "word" && i === TYPOGRAPHY_ITEMS.length - 3;
              return (
                <React.Fragment key={i}>
                  <span
                    ref={(n) => {
                      wordRefs.current[i] = n;
                    }}
                    className={`inline-block ${item.em ? "font-serif-italic" : ""}`}
                    style={{ opacity: animated ? 0.18 : 1, willChange: "opacity" }}
                  >
                    {item.text}
                  </span>
                  {item.type === "word" && !isLastWord ? "\u00A0" : ""}
                </React.Fragment>
              );
            })}
          </blockquote>
          {TYPOGRAPHY_ITEMS.map((item, i) => {
            if (item.type !== "attribution") return null;
            return (
              <div
                key={i}
                ref={(n) => {
                  wordRefs.current[i] = n;
                }}
                className="mt-8 text-[10px] uppercase tracking-[0.2em] placements-dim-white"
                style={{ fontFamily: MONO, opacity: animated ? 0.18 : 1, willChange: "opacity" }}
              >
                {item.text}
              </div>
            );
          })}
          <button
            type="button"
            className="hero-sweep-button quote-readmore-button group relative mt-8 inline-flex items-center gap-2 overflow-hidden border border-white/35 px-8 py-4.5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-300 ease-out hover:border-accent hover:bg-accent hover:shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
            style={{ fontFamily: MONO }}
          >
            <span className="hero-sweep-button-content relative z-10 inline-flex items-center gap-2 transition-colors duration-300">
              Read more <ArrowUpRight className="size-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}




function AuditedOutcomes() {
  return (
    <section
      id="outcomes"
      className="relative flex flex-col justify-between bg-white py-8 md:py-10 lg:py-12"
    >
      <div className="page-x">
        <div className="placements-section-shell placements-section-shell-light">
          {/* sticky left + click-driven horizontal accordion */}
          <OutcomesAccordion />

          {/* cohort reports */}
          <div className="pt-0">
            <div
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50"
              style={{ fontFamily: MONO }}
            >
              Reports
            </div>
            <CohortReports />
            <div className="mt-8 md:mt-10 lg:mt-12">
              <EditorialRule />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function EditorialPlacementData() {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -10% 0px");
  const tbmColumns: Array<{ key: keyof CohortRow; label: string }> = [
    { key: "cohort", label: "Cohort" },
    { key: "avg", label: "Avg. CTC" },
    { key: "median", label: "Median CTC" },
    { key: "highest", label: "Highest CTC" },
    { key: "top25", label: "Top 25%" },
    { key: "bottom25", label: "Bottom 25%" },
    { key: "mid80", label: "Middle 80%" },
  ];
  const ylcColumns = [
    { key: "cohort", label: "Cohort" },
    { key: "avg", label: "Avg. CTC" },
    { key: "median", label: "Median CTC" },
    { key: "highest", label: "Highest CTC" },
  ] as const;

  return (
    <section
      id="cohorts"
      data-in-view={inView}
      className="placement-data-section section-edge relative bg-[#0B1215]"
      aria-labelledby="placement-data-title"
    >
      <div className="page-x py-16 md:py-24">
        <div className="placements-section-shell placements-section-shell-dark">
        <div ref={ref} className="placement-data-bento grid overflow-hidden border border-white/15 lg:grid-cols-12">
          <header className="flex min-h-[260px] flex-col justify-between border-b border-white/15 p-7 md:p-10 lg:col-span-7 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: MONO }}>
                Financial performance / 2021—2025
              </span>
              <span className="h-px w-10 origin-left bg-accent placement-data-rule" aria-hidden />
            </div>
            <div>
              <h2 id="placement-data-title" className="max-w-[16ch] text-[clamp(2.25rem,5vw,4.7rem)] font-medium leading-[0.98] text-white">
                Cohort average CTC &amp; <em className="font-serif-italic text-accent">placement statistics.</em>
              </h2>
              <p className="mt-5 max-w-[58ch] text-[0.95rem] leading-relaxed text-white/58">
                Five cohorts, presented as a complete compensation distribution rather than a single headline figure.
              </p>
            </div>
          </header>

          <div className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden p-7 md:p-10 lg:col-span-5">
            <div className="placement-data-grid absolute inset-0 opacity-25" aria-hidden />
            <span className="absolute left-7 top-7 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 md:left-10 md:top-10" style={{ fontFamily: MONO }}>
              Latest cohort / PGP TBM
            </span>
            <div className="relative flex flex-col items-center text-center">
              <div className="placement-data-number text-[clamp(3.5rem,7vw,6.6rem)] font-medium leading-none text-white">
                <CountUp value="₹33.39 L" />
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-accent" aria-hidden />
                <span className="text-[10px] uppercase tracking-[0.22em] text-accent" style={{ fontFamily: MONO }}>Average CTC · Cohort 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-white/15 bg-[#0A1712]">
          <div className="flex flex-col gap-4 border-b border-white/15 px-5 py-5 md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-accent" style={{ fontFamily: MONO }}>Primary data view</div>
              <h3 className="mt-2 text-[clamp(1.45rem,2.6vw,2.25rem)] font-medium text-white">PGP TBM <em className="font-serif-italic text-accent">cohort ledger</em></h3>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: MONO }}>All values / annual CTC</div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[980px] table-fixed border-collapse text-left">
              <thead>
                <tr>
                  {tbmColumns.map((column, index) => (
                    <th key={column.key} scope="col" className={`px-5 py-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/42 md:px-8 ${index === 0 ? "w-[12%]" : ""}`} style={{ fontFamily: MONO }}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TBM_TABLE.map((row, rowIndex) => (
                  <tr key={row.cohort} className="placement-ledger-row border-t border-white/12">
                    {tbmColumns.map((column, columnIndex) => (
                      <td key={column.key} className={`placement-data-number px-5 py-5 tabular-nums md:px-8 ${columnIndex === 0 ? "text-[11px] font-medium tracking-[0.16em]" : "text-[0.98rem]"}`} style={{ transitionDelay: `${rowIndex * 55 + columnIndex * 22}ms`, fontFamily: columnIndex === 0 ? MONO : undefined }}>
                        {columnIndex === 0 ? row[column.key] : <CountUp value={row[column.key]} delay={rowIndex * 65 + columnIndex * 30} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 grid border border-white/15 bg-[#0A1712] lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-white/15 p-7 md:p-8 lg:col-span-3 lg:border-r lg:border-b-0">
            <span className="text-[10px] uppercase tracking-[0.22em] text-accent" style={{ fontFamily: MONO }}>Distinct programme view</span>
            <div className="mt-14 lg:mt-0">
              <h3 className="text-[clamp(1.65rem,3vw,2.6rem)] font-medium leading-tight text-white">PGP TBM <em className="font-serif-italic text-accent">YLC</em></h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-white/52">Average, median and highest CTC across five cohorts.</p>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar lg:col-span-9">
            <table className="w-full min-w-[620px] table-fixed border-collapse text-left">
              <thead>
                <tr>
                  {ylcColumns.map((column) => (
                    <th key={column.key} scope="col" className="px-5 py-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/42 md:px-8" style={{ fontFamily: MONO }}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {YLC_TABLE.map((row, rowIndex) => (
                  <tr key={row.cohort} className="placement-ledger-row border-t border-white/12">
                    {ylcColumns.map((column, columnIndex) => (
                      <td key={column.key} className={`placement-data-number px-5 py-4 tabular-nums md:px-8 ${columnIndex === 0 ? "text-[11px] font-medium tracking-[0.16em]" : "text-[0.98rem]"}`} style={{ transitionDelay: `${320 + rowIndex * 55 + columnIndex * 22}ms`, fontFamily: columnIndex === 0 ? MONO : undefined }}>
                        {columnIndex === 0 ? row[column.key] : <CountUp value={row[column.key]} delay={rowIndex * 65 + columnIndex * 30} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <OurPlacementStatistics />

        <p className="mt-6 text-[10px] uppercase tracking-[0.16em] text-white/38" style={{ fontFamily: MONO }}>
          *Please note that the YLC numbers have been taken from the students having 0–1 years of experience from PGP TBM cohort.
        </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- page ---------------------------------- */

function Page() {
  const [recruiterTab, setRecruiterTab] = useState(RECRUITER_GROUPS[0].category);
  const active = RECRUITER_GROUPS.find((g) => g.category === recruiterTab)!;
  return (
    <ReportModalProvider>
    <main className="placements-obsidian placements-ug-v2 ink-scope min-h-screen overflow-x-clip bg-[#0B1215] pb-16 text-foreground md:pb-18" style={{ fontFamily: INTER }}>
      <ScrollProgress />

      {/* Global top navigation — fixed, hides on scroll down, reveals on scroll up */}
      <BottomNav
        items={NAV}
        applyHref="#contact"
        className="!fixed !inset-x-0 !top-0 !bottom-auto z-50 justify-center px-3 pt-0 pb-3 lg:flex"
        innerClassName="!max-w-none"
        compact
        hideOnScroll
      />



      {/* HERO — full-bleed cinematic editorial */}
      <CinematicHero />



      {/* Podcast rises over the pinned Hero, then all following sections continue in normal flow. */}
      <div className="relative z-20 -mt-[100svh] motion-reduce:mt-0">
        <section className="relative min-h-[100svh] bg-[#0B1215]">
          <div className="page-x flex h-full min-h-[100svh] items-center pt-8 pb-6 md:pt-10 md:pb-8 lg:pt-12 lg:pb-10">
            <div className="placements-section-shell placements-section-shell-dark relative flex w-full flex-col gap-10 lg:gap-14">
              <PodcastSection />
              <div className="mt-6 md:mt-8 lg:mt-10">
                <EditorialRule />
              </div>
            </div>
          </div>
        </section>
        <AuditedOutcomes />
        <FounderQuoteSection />
      </div>



      {/* COHORT AVERAGES + PLACEMENT STATISTICS */}
      <EditorialPlacementData />

      <SalaryVisualizations />

      {/* RECRUITERS */}
      <Band id="recruiters" tone="grey" className="border-y border-black/10">
        <Reveal>
          <SectionHeading
            size="md"
            eyebrow="Our recruiters"
            title="Six categories."
            emphasis="One hiring calendar."
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2">

          {RECRUITER_GROUPS.map((g, i) => {
            const isActive = recruiterTab === g.category;
            return (
              <Reveal key={g.category} delay={i * 70} y={12}>
                <button
                  onClick={() => setRecruiterTab(g.category)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${
                    isActive
                      ? "recruiter-category-button is-active bg-accent text-accent-foreground"
                      : "recruiter-category-button border border-black/15 text-black/65"
                  }`}
                  style={{ fontFamily: MONO }}
                >
                  <span>{g.category}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div key={recruiterTab} className="recruiter-logo-panel mt-10 min-h-[132px] p-4 sm:p-6 lg:p-8">
          <LogoRow names={active.logos} />
        </div>

        <div className="recruiter-marquee-panel mt-10 p-4 sm:p-6">
          <EditorialRule />
          <LogoMarquee
            className="recruiter-logo-marquee mt-6"
            variant="banded"
            speed="slow"
            label="All recruiting partners"
            items={ALL_RECRUITERS}
          />
        </div>
      </Band>


      {/* TRANSITIONS */}
      <CareerTransitionsSection />

      <CareerExperienceArea />

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden border-t border-black/10 bg-[#f2f1ee]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center text-[18vw] font-semibold leading-none tracking-[-0.05em] text-black/[0.04]"
        >
          <Parallax strength={60}>CAREERS</Parallax>
        </div>
        <div className="page-x relative py-20 md:py-28">
          <div className="placements-section-shell placements-section-shell-light">
          <Reveal>
            <Eyebrow>Careers team</Eyebrow>
          </Reveal>
          <Reveal delay={140} duration={950}>
            <h2 className="mt-6 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.015em]">
              A 50+ member team, <em className="font-serif-italic">working full time on your outcome.</em>
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="mailto:careerservices@mastersunion.org" className="placements-pill-accent group inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-medium" style={{ fontFamily: INTER }}>
                <Mail className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" /> careerservices@mastersunion.org
              </a>
              <span className="placements-pill-ghost inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-medium" style={{ fontFamily: INTER }}>
                <Download className="size-3.5" /> Internship report
              </span>
            </div>
          </Reveal>
          </div>
        </div>
      </section>
   </main>
    </ReportModalProvider>
  );
}

/** One roadmap stage: node activates and content reveals as it enters view. */
function RoadmapStage({
  term,
  index,
}: {
  term: { term: string; title: string; items: string[] };
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -25% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="relative pl-10">
      <span
        className="absolute left-0 top-[6px] block size-[15px] rounded-full border border-black/25 bg-white"
        style={{
          transition: reduced ? "none" : "border-color 600ms ease-out, transform 600ms cubic-bezier(0.16,0.84,0.24,1)",
          borderColor: on ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.2)",
          transform: on ? "scale(1)" : "scale(0.7)",
        }}
      >
        <span
          className="absolute inset-[3px] rounded-full bg-black"
          style={{
            opacity: on ? 1 : 0,
            transition: reduced ? "none" : "opacity 600ms ease-out 120ms",
          }}
        />
      </span>

      <div
        style={{
          opacity: on ? 1 : 0.25,
          transform: on ? "none" : "translate3d(0,22px,0)",
          transition: reduced
            ? "opacity 240ms linear"
            : "opacity 800ms cubic-bezier(0.16,0.84,0.24,1), transform 800ms cubic-bezier(0.16,0.84,0.24,1)",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-black/50" style={{ fontFamily: MONO }}>{term.term}</div>
        <div className="mt-3 max-w-[24ch] text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug">{term.title}</div>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {term.items.map((i, k) => (
            <li
              key={i}
              className="text-[0.85rem] leading-[1.5] text-black/65"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translate3d(0,10px,0)",
                transition: reduced
                  ? "none"
                  : `opacity 600ms ease-out ${180 + k * 55}ms, transform 600ms cubic-bezier(0.16,0.84,0.24,1) ${180 + k * 55}ms`,
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">{index}</span>
    </div>
  );
}

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Careers & Placements — Masters' Union" },
      { name: "description", content: "1.42 offers per student, $149,114 international average CTC, ₹54.80L top-quartile average. Five years of Brickworks-audited placement outcomes." },
      { property: "og:title", content: "Careers & Placements — Masters' Union" },
      { property: "og:description", content: "Audited placement outcomes across five cohorts: average CTC, distributions, recruiters and alumni career transitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
