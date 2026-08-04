import griffithLogo from "@/assets/immersion-logos/griffith.png.asset.json";
import illinoisLogo from "@/assets/immersion-logos/illinois-tech.png.asset.json";
import bocconiLogo from "@/assets/immersion-logos/sda-bocconi.png.asset.json";
import smuLogo from "@/assets/immersion-logos/smu.png.asset.json";

export type Audience = "ug" | "pg" | "all";

export const AUDIENCE_LABELS: Record<Audience, string> = {
  all: "All students",
  ug: "Undergraduate",
  pg: "Postgraduate",
};

export type PathwayKind =
  | "Short-Term Immersion"
  | "Semester Abroad"
  | "Transfer / Articulation"
  | "Dual Degree"
  | "Scholarship";

export type Pathway = {
  id: string;
  name: string;
  kind: PathwayKind;
  audiences: Audience[];
  summary: string;
  facts: { k: string; v: string }[];
  notes?: string[];
  duration: string;
};

export type Partner = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  country: string;
  logo?: string;
  tags: string[];
  about: string;
  pathways: Pathway[];
  extras?: { title: string; items: string[] }[];
};

export const PARTNERS: Partner[] = [
  {
    id: "illinois-tech",
    name: "Illinois Institute of Technology",
    shortName: "Illinois Tech",
    location: "Chicago, Illinois",
    country: "USA",
    logo: illinoisLogo.url,
    tags: ["Exchange", "Semester Abroad", "Transfer", "Scholarship"],
    about:
      "A private research university in Chicago, founded in 1890, recognised nationally for technology, engineering, design and business. Its Richard H. Driehaus College of Business runs applied, industry-linked undergraduate and graduate offerings, and its Chicago location makes it one of the most strategically valuable campuses for Indian students seeking US work exposure.",
    pathways: [
      {
        id: "illinois-summer",
        name: "Summer Immersion Program",
        kind: "Short-Term Immersion",
        audiences: ["all"],
        duration: "Short-term (summer)",
        summary:
          "A short summer programme on the Chicago campus blending coursework with cultural exposure and professional development — the natural first step before a longer US engagement.",
        facts: [
          { k: "Duration", v: "Short-term (summer; dates defined per cohort)" },
          { k: "Location", v: "Illinois Tech Campus, Chicago, IL" },
          { k: "Who can apply", v: "All Masters' Union programmes, subject to nomination" },
          { k: "Academic credit", v: "Credit recognition confirmed per engagement" },
          { k: "Outcome", v: "US campus experience; cultural and professional development certification" },
        ],
      },
      {
        id: "illinois-semester",
        name: "Semester or Year Abroad",
        kind: "Semester Abroad",
        audiences: ["ug"],
        duration: "1–2 semesters",
        summary:
          "Spend one or two full semesters at Illinois Tech as a visiting student, attending classes and living full campus life in Chicago, then return to Masters' Union to finish your degree.",
        facts: [
          { k: "Duration", v: "1 or 2 semesters at Illinois Tech" },
          { k: "Eligibility", v: "Completed minimum 2 years of the UG degree at Masters' Union" },
          { k: "Status", v: "Visiting student at Illinois Tech" },
          { k: "Return", v: "Return to Masters' Union to complete your degree" },
          { k: "Credit transfer", v: "Agreed in writing before the exchange commences" },
          { k: "Financial benefit", v: "Eligible for merit-based scholarship" },
        ],
      },
      {
        id: "illinois-transfer",
        name: "Transfer Program",
        kind: "Transfer / Articulation",
        audiences: ["ug"],
        duration: "Final year abroad",
        summary:
          "Transfer after three years at Masters' Union, complete your final year in Chicago and graduate with an Illinois Tech bachelor's degree. Each application is reviewed individually.",
        facts: [
          { k: "When you can transfer", v: "After 3 years at Masters' Union" },
          { k: "Years at Illinois Tech", v: "Final 1 year of the bachelor's programme" },
          { k: "Degree awarded", v: "Bachelor's degree from Illinois Institute of Technology" },
          { k: "Admission", v: "Subject to Illinois Tech transfer credit evaluation and approval" },
          { k: "Financial benefit", v: "Eligible for merit-based scholarship" },
        ],
      },
      {
        id: "illinois-scholarship",
        name: "Scholarships for Nominated Students",
        kind: "Scholarship",
        audiences: ["ug"],
        duration: "Duration of stay",
        summary:
          "Nominated students admitted as semester/year abroad or transfer students may receive merit-based scholarship support toward Illinois Tech tuition.",
        facts: [
          { k: "Nomination", v: "Masters' Union must officially nominate the student" },
          { k: "GPA", v: "Minimum cumulative 3.0 / 4.0" },
          { k: "Award", v: "25% of tuition for the duration of the stay" },
          { k: "Final decision", v: "Illinois Tech retains full discretion on scholarship awards" },
        ],
      },
    ],
  },
  {
    id: "griffith",
    name: "Griffith University",
    shortName: "Griffith",
    location: "Queensland",
    country: "Australia",
    logo: griffithLogo.url,
    tags: ["Articulation Agreement", "2+2 Bachelor's Pathway"],
    about:
      "A major public university in Queensland with campuses across Brisbane, Gold Coast and Logan, consistently ranked among Australia's top universities and known for Griffith Business School. CRICOS registered provider (No. 00233E) and TEQSA accredited (PRV12076).",
    pathways: [
      {
        id: "griffith-2plus2",
        name: "2+2 Articulation — Bachelor of Business",
        kind: "Transfer / Articulation",
        audiences: ["ug"],
        duration: "2 years at Griffith",
        summary:
          "Complete the first two years of the Technology & Business Management UG programme at Masters' Union, then transfer to Griffith for the remaining 160 credit points of the Bachelor of Business and graduate with a full Griffith degree.",
        facts: [
          { k: "Eligible MU programme", v: "Technology & Business Management UG (Years 1 & 2)" },
          { k: "Griffith programme", v: "Bachelor of Business (Code 1632) — 240 credit points total" },
          { k: "Credit transfer", v: "80CP transferred from Masters' Union (one full year)" },
          { k: "Years at Griffith", v: "2 years (160CP), Trimester 1 (March) or Trimester 2 (July)" },
          { k: "Degree awarded", v: "Bachelor of Business, Griffith University" },
          { k: "Campus", v: "Nathan, Brisbane, Queensland" },
        ],
        notes: [
          "Students pay standard international tuition directly to Griffith for the two years on campus.",
          "Student visa, flights and accommodation costs are arranged and borne by the student.",
          "Free airport reception from Brisbane or Coolangatta airports, if booked in advance.",
          "Overseas Student Health Cover organised by Griffith, or self-arranged with evidence of comparable cover.",
          "All eligible students can access Griffith international scholarships: griffith.edu.au/international/scholarships-finance",
        ],
      },
    ],
    extras: [
      {
        title: "MU courses that earn the 80CP credit — Year 1",
        items: [
          "Semester 1: Foundations of Managerial Behaviour · Statistics for Business Decisions · Financial Accounting and Analysis · Introduction to Programming · Art of Communications · Legalities in Business · Building Marketing Strategies",
          "Semester 2: Managerial Accounting · Managerial Economics (Micro) · Application of Accounting · Macroeconomics · Intro to Programming II – App Development · Principles of Marketing · Company Law · Art of Communications · Financial Literacy · Life Skills",
        ],
      },
      {
        title: "MU courses that earn the 80CP credit — Year 2",
        items: [
          "Semester 3: Introduction to HRM · Problem Solving and Structuring · Corporate Finance · Product Analytics · Mastering Data Visualization · Social Media Marketing",
          "Semester 4: Introduction to Operations · Valuations & VC · Management Strategy · Corporate Governance · Understanding Consumer Behaviour · Introduction to Machine Learning – Python",
        ],
      },
    ],
  },
  {
    id: "ienyc",
    name: "IE New York College",
    shortName: "IENYC",
    location: "New York City",
    country: "USA",
    tags: ["Articulation Agreement", "3+1 Pathway", "1+1 Pathway"],
    about:
      "The American campus of the IE Group, one of the world's leading business and management education institutions, headquartered in Madrid. IENYC runs master's programmes in management, finance, sustainability and analytics from New York City, placing students at the heart of the global business and finance ecosystem.",
    pathways: [
      {
        id: "ienyc-3plus1",
        name: "3+1 Combined Programme",
        kind: "Dual Degree",
        audiences: ["ug"],
        duration: "4 years total",
        summary:
          "Three years at Masters' Union followed by a master's year in New York City — you earn a Masters' Union degree and an IENYC master's from a single integrated journey, faster than taking each separately.",
        facts: [
          { k: "Structure", v: "3 years UG at Masters' Union + 1 year master's at IENYC" },
          { k: "Credential 1", v: "Masters' Union degree, awarded on thesis completion" },
          { k: "Credential 2", v: "Master's degree from IE New York College" },
        ],
      },
      {
        id: "ienyc-1plus1",
        name: "1+1 Combined Programme",
        kind: "Dual Degree",
        audiences: ["pg"],
        duration: "2–2.5 years",
        summary:
          "One year at Masters' Union, then the master's year in New York City. Best suited to postgraduate students who want a US credential without a full separate master's.",
        facts: [
          { k: "Structure", v: "1 year at Masters' Union + 1 year at IENYC" },
          { k: "Total duration", v: "2 years (Fall intake) or 2.5 years (Spring intake)" },
          { k: "When to apply", v: "During your year at Masters' Union" },
          { k: "Credential 1", v: "Masters' Union degree" },
          { k: "Credential 2", v: "Master's degree from IE New York College" },
        ],
      },
    ],
    extras: [
      {
        title: "Which MU programme unlocks which IENYC master's",
        items: [
          "UG in Technology & Business Management → MS in Management · MS in Global Business & Sustainability · MS in Business Analytics & AI · MS in Finance",
          "UG in Psychology & Marketing → MS in Strategic and Creative Marketing, Communication and Media · MS in Management",
          "UG in Data Science & AI → MS in Business Analytics & AI · MS in Global Business & Sustainability",
          "PGP in Sustainability & Management → MS in Global Business & Sustainability · MS in Management · MS in Business Analytics & AI · MS in Finance · MS in Strategic and Creative Marketing, Communication and Media",
        ],
      },
      {
        title: "Admission requirements for the IENYC master's",
        items: [
          "Minimum cumulative GPA of 3.0 / 4.0 — candidates slightly below may apply but face additional review",
          "Letter of Intent",
          "English proficiency waived — Masters' Union programmes are taught in English",
          "An interview may form part of the IENYC admissions process",
          "Applications are submitted during your final year at Masters' Union",
        ],
      },
    ],
  },
  {
    id: "sda-bocconi",
    name: "SDA Bocconi School of Management",
    shortName: "SDA Bocconi",
    location: "Milan",
    country: "Italy",
    logo: bocconiLogo.url,
    tags: ["International Immersion", "Global Study Tour"],
    about:
      "The graduate School of Management of Universita Commerciale Luigi Bocconi, founded in 1971 and one of Europe's most prestigious business schools. SDA Bocconi holds triple-crown accreditation (AACSB, EQUIS, AMBA) — held by fewer than 1% of business schools globally — and ranks among the top 20 European business schools by the Financial Times.",
    pathways: [
      {
        id: "bocconi-immersion",
        name: "International Immersion Program",
        kind: "Short-Term Immersion",
        audiences: ["all"],
        duration: "3 weeks",
        summary:
          "A certificate immersion in Milan built for Masters' Union students, focused on international management, the luxury industry and doing business in foreign markets.",
        facts: [
          { k: "Focus areas", v: "International Management, Luxury Industries, Business in Foreign Markets" },
          { k: "Format", v: "8 half-days of face-to-face teaching over 3 weeks" },
          { k: "Additional activities", v: "Guest speakers + up to 4 cultural and business trips in Milan" },
          { k: "Location", v: "SDA Bocconi Campus, Milan" },
          { k: "Session times", v: "Morning 9:00–12:30 · Afternoon 14:00–17:30" },
          { k: "Max cohort size", v: "60 Masters' Union students per edition" },
          { k: "Outcome", v: "SDA Bocconi attendance certificate co-branded with Masters' Union" },
        ],
        notes: [
          "Designed and delivered by SDA Bocconi faculty, led by Prof. Olga Annushkina (Associate Professor of Practice, Strategy and Entrepreneurship).",
          "Includes access to SDA Bocconi's learning platform for didactic materials — credentials are personal and non-transferable.",
          "Didactic materials are for personal academic use only and may not be copied or published.",
          "Any student promotional content referencing the programme must be pre-approved by SDA Bocconi.",
        ],
      },
    ],
  },
  {
    id: "ieseg",
    name: "IESEG School of Management",
    shortName: "IESEG",
    location: "Paris",
    country: "France",
    tags: ["Short-Term Programs", "Summer & Winter", "5-Year Agreement"],
    about:
      "A leading French Grande Ecole business school headquartered in Lille with its primary international campus in Paris (La Defense). Fully recognised by the French Ministry for Higher Education, Research and Innovation, holding AACSB and EQUIS dual accreditation, with students from over 100 countries on campus.",
    pathways: [
      {
        id: "ieseg-summer",
        name: "Summer Programmes — Paris Campus",
        kind: "Short-Term Immersion",
        audiences: ["all"],
        duration: "~2 weeks each June",
        summary:
          "Five intensive on-campus tracks in Paris each June: AI & Sustainability (AISSP), Digital Marketing (DMSP), Entrepreneurship & Innovation (EISP), Fashion Business (FBSP) and the International Summer Academy (ISA).",
        facts: [
          { k: "Tracks", v: "AISSP · DMSP · EISP · FBSP · ISA" },
          { k: "Duration", v: "Approximately two weeks each June" },
          { k: "Delivery", v: "IESEG Paris Campus (La Defense)" },
          { k: "Included", v: "All teaching and materials, full campus facilities access" },
          { k: "Credential", v: "Two official IESEG transcripts + certificate, transferable ECTS credits" },
          { k: "Optional housing", v: "Single rooms with private bathroom and Wi-Fi (June 16 – July 1)" },
        ],
        notes: [
          "Housing package adds two extra-curricular activities (Seine river cruise, Opera Garnier, tours of Paris, Versailles and more).",
          "IESEG fees include no insurance — arrange your own medical, travel and civil liability cover.",
        ],
      },
      {
        id: "ieseg-winter",
        name: "Winter Programme — Online",
        kind: "Short-Term Immersion",
        audiences: ["all"],
        duration: "2–4 weeks, January",
        summary:
          "A fully online January programme with topic-based courses you can stack — take between one and four courses, with 30 places available per course.",
        facts: [
          { k: "Format", v: "Entirely online" },
          { k: "Duration", v: "2–4 weeks each January" },
          { k: "Course load", v: "1–4 topic-based courses" },
          { k: "Capacity", v: "30 places per course" },
          { k: "Credential", v: "Official IESEG transcript + certificate with transferable ECTS credits" },
        ],
      },
    ],
    extras: [
      {
        title: "Eligibility requirements",
        items: [
          "Currently enrolled student at Masters' Union",
          "Valid passport with minimum validity as per programme requirements",
          "English proficiency at B2 level — TOEFL IBT 90, IELTS 6.0, TOEIC 850, Cambridge B2, Duolingo 105, or a letter from Masters' Union attesting competency",
        ],
      },
    ],
  },
  {
    id: "smu",
    name: "Singapore Management University",
    shortName: "SMU",
    location: "Singapore",
    country: "Singapore",
    logo: smuLogo.url,
    tags: ["Visiting Student Programme", "Semester Exchange"],
    about:
      "One of Singapore's premier public research universities, established in 2000 and modelled in part on the Wharton School. SMU ranks among the top universities in Asia, holds AACSB accreditation, and sits in Singapore's civic district with direct proximity to the city's financial, legal and technology hubs.",
    pathways: [
      {
        id: "smu-vsp",
        name: "Visiting Student Programme (VSP)",
        kind: "Semester Abroad",
        audiences: ["ug"],
        duration: "One semester",
        summary:
          "Enrol at SMU for a regular academic semester as a fee-paying visiting student, study alongside SMU students with full facilities access, and transfer credits back to Masters' Union.",
        facts: [
          { k: "Programme type", v: "Fee-paying semester exchange" },
          { k: "Duration", v: "One semester (single term)" },
          { k: "Student status", v: "Full-time non-graduating SMU student for the visiting period" },
          { k: "Tuition discount", v: "10% scholarship" },
          { k: "Course load", v: "Typically 4 courses (4 SMU CUs); minimum 2, maximum 4 CUs" },
          { k: "Academic credits", v: "Transferable back to Masters' Union, subject to MU regulations" },
        ],
        notes: [
          "Must have completed at least one full academic year of UG study at Masters' Union.",
          "Must remain a registered MU undergraduate throughout the visiting period.",
          "Minimum cumulative GPA of 3.0 / 4.0, as assessed by SMU, plus SMU English proficiency requirements.",
          "Not encouraged during your final term at MU — credit transfer may delay graduation filing.",
          "Course enrolment is restricted to courses normally open to incoming exchange students.",
        ],
      },
    ],
    extras: [
      {
        title: "On-campus life at SMU",
        items: [
          "Treated as a regular SMU student with full-time non-graduating status",
          "Same access to library, IT services, university network, sports facilities, health centre and student activities",
          "Governed by the same regulations and performance standards as regular SMU students",
          "Formal orientation to help you settle into Singapore, with ongoing support through your stay",
        ],
      },
      {
        title: "Academic credit transfer",
        items: [
          "Plan your SMU course selection with Masters' Union to ensure courses are acceptable for credit",
          "SMU provides module descriptions and syllabuses to support course equivalency evaluation",
        ],
      },
    ],
  },
  {
    id: "h-farm",
    name: "H-Farm",
    shortName: "H-Farm",
    location: "Roncade, Venice",
    country: "Italy",
    tags: ["Short-Term Immersion", "Startup Ecosystems", "Digital Transformation"],
    about:
      "One of Europe's most distinctive innovation campuses, founded in 2005 near Venice, sitting at the intersection of education, entrepreneurship and digital transformation. The campus hosts a live ecosystem of startups, scaleups and corporate innovation programmes, and is used by leading corporations and business schools globally for innovation immersions.",
    pathways: [
      {
        id: "hfarm-immersion",
        name: "Startup Ecosystems & Digital Transformation Immersion",
        kind: "Short-Term Immersion",
        audiences: ["all"],
        duration: "1 week",
        summary:
          "A one-week experiential programme inside a working innovation campus — you engage directly with founders, investors and digital innovators rather than sitting in a lecture room.",
        facts: [
          { k: "Partnership type", v: "Short-term immersion programme" },
          { k: "Duration", v: "1 week" },
          { k: "Location", v: "H-Farm Campus, Roncade, Venice" },
          { k: "Format", v: "Immersive visits and live ecosystem engagement" },
          { k: "Core themes", v: "Startup ecosystems, digital transformation, innovation, entrepreneurship" },
          { k: "Outcome", v: "Certificate of participation; exposure to a leading European innovation hub" },
        ],
        notes: [
          "Direct interaction with founders and entrepreneurs building companies on campus.",
          "Behind-the-scenes access to startup operations, product teams and innovation labs.",
          "Sessions on how digital transformation is reshaping industries, taught by practitioners.",
          "Programme fee details should be confirmed with the University Partnerships team.",
        ],
      },
    ],
  },
];

export const PATHWAY_KINDS: PathwayKind[] = [
  "Short-Term Immersion",
  "Semester Abroad",
  "Transfer / Articulation",
  "Dual Degree",
  "Scholarship",
];

export function matchesAudience(pathway: Pathway, audience: Audience | "any") {
  if (audience === "any") return true;
  if (pathway.audiences.includes("all")) return true;
  return pathway.audiences.includes(audience);
}
