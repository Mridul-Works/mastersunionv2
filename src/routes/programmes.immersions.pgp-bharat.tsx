import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PGP Bharat",
  shortName: "PGP Bharat",
  tagline:
    "Learn business by travelling 7,000 km across 20+ cities of India — 25+ immersions inside factories, markets and boardrooms, wrapped around hybrid weekend classes.",
  duration: "28 weeks — 20 weeks weekend classes + 8 weeks travel",
  mode: "Travel based — travel + hybrid weekend classes",
  commencement: "October 2026",
  intro:
    "An immersion-driven programme for people who learn best by travelling and doing. Consult, immerse and step into industries, factories and boardrooms — from bustling local markets to India's biggest startups, with CXO sessions shaping real-world learning. You must be able to commit two months of travel and four months of weekend hybrid classes.",
  whyNow: [
    "Built for final-year students and 0–2 year professionals, mid and senior leaders seeking a fresh view of India's industries, entrepreneurs and creators, and family business owners and successors across generations.",
    "25+ business immersions and 10+ cultural immersions, 30+ CXOs and mentors, Fortune 500 companies and top unicorns — and eight One Day Consultancy challenges that turn every week of travel into a portfolio piece.",
  ],
  edge: [
    {
      title: "Experience — learn by travelling",
      body: "A 7,000 km transformational journey across 20+ cities, with 25+ business and 10+ cultural immersions inside real operating businesses.",
    },
    {
      title: "Exposure — learn by collaborating",
      body: "30+ CXOs and mentors, Fortune 500 companies and top unicorns, and insights drawn from millions of real Indians rather than case PDFs.",
    },
    {
      title: "Extract — learn by building",
      body: "Master business skills through VIP and the Dropshipping Challenge, build a digital identity with the Creator Challenge, and assemble a portfolio across eight hands-on consultancy challenges.",
    },
    {
      title: "Eight hubs, eight economies",
      body: "Delhi, Jalandhar, Jaipur, Mumbai, Goa, Bengaluru, Darjeeling and Lucknow — defence manufacturing to tea estates, dabbawalas to Dalal Street.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Orientation",
      summary:
        "One week of skill-building, cultural discovery, CXO sessions and peer bonding to open the journey.",
      outcomes: ["SKILL BUILDING", "CXO SESSIONS", "COHORT BONDING"],
      courses: [
        "Pre-programme skill-building workshops",
        "Cultural discovery sessions",
        "CXO and mentor introductions",
        "Team formation for the travel legs ahead",
      ],
      challenge: {
        name: "Orientation Week",
        description:
          "Kick off PGP Bharat with intensive workshops, cultural discovery and direct access to the CXOs who will teach across the programme.",
      },
    },
    {
      n: 2,
      title: "Term 1 (Months 1–2) — In-Class & Dropshipping Challenge",
      summary:
        "Run a real dropshipping venture while learning the frameworks through in-class sessions and out-class workshops.",
      outcomes: ["STRATEGY", "MARKETING", "OPERATIONS", "FINANCE", "GENERATIVE AI"],
      courses: [
        "Strategy: designing strategies and driving transformation with structured thinking and data; how strategic archetypes emerge and how firms choose among them",
        "Marketing: systematically acquiring, converting and retaining the right customers; where growth strategies generalise and where they fail",
        "Operations: structuring processes for speed, cost and quality trade-offs; when operating models outperform",
        "Finance: using financial language to assess and communicate performance; spotting patterns that signal scalable, resilient business models",
        "Generative AI: using AI tools for productivity and decision-making; when AI adoption creates advantage versus parity or wasted spend",
      ],
      challenge: {
        name: "Dropshipping Challenge",
        description:
          "Teams target ₹1Cr+ revenue selling on Amazon, Blinkit and their own storefronts — real inventory, real customers, real margin.",
      },
    },
    {
      n: 3,
      title: "Term 2 (Months 3–4) — Travel-Based Immersions",
      summary:
        "Eight weeks on the road across eight hubs, applying classroom learning through weekly consultancy challenges.",
      outcomes: ["25+ IMMERSIONS", "8 CONSULTANCY GIGS", "20+ CITIES", "CREATOR CHALLENGE"],
      courses: [
        "Hub 1 — Delhi: sales and revenue operations at Addverb Technologies; organisation design at Parliament and the Election Commission of India; Lenskart, Mercedes-Benz T&T Motors and NDMA crisis management",
        "Hub 2 — Jalandhar: consumer behaviour at ITC, pricing strategy at Sonalika Tractors, brand positioning at Nivia Sports, education at scale at LPU, plus Golden Temple, Wagha Border and Army Cantonment",
        "Hub 3 — Jaipur (new hub): social entrepreneurship at Jaipur Rugs, marketplace and digital business at CarDekho, trust through transparency at Minimalist; Cars24, IJYA Jewellery, Patanjali and Jal Mahal",
        "Hub 4 — Mumbai: GTM and channel strategy with RSVP Movies and a Dharma Production assignment, finance at Kotak Mahindra Bank, operational excellence with the Mumbai Dabbawalas, legacy and trust at Godrej, U Sports, Swades, Dharavi and the RBI",
        "Hub 5 — Goa: the Mumbai–Goa leg aboard Cordelia, brand building and distribution at IndoBevs, pharma innovation at Zydus, vertical integration and risk at JSW Group, plus Deltin Casino and Goa nightlife",
        "Hub 6 — Bengaluru: product strategy at Meesho, strategic HRM at Infosys, generative UI and user journeys at Swiggy, a Cred product assignment, Zerodha, Cingularity TEC India and the HAL Aerospace Museum",
        "Hub 7 — Darjeeling: rural immersion in Indo-Nepal villages, product life cycle and brand building at Glenburn Tea Estate, sustainable business with TIEEDI, Mayukh Tea and the Darjeeling Himalayan Railway",
        "Hub 8 — Lucknow: UP defence manufacturing at Indo-Russian Rifles, global luxury embroidery, a Chief Minister's Office assignment on urban challenges, the Prayagraj Mela Authority, Ada, Deloitte and SEWA",
      ],
      challenge: {
        name: "One Day Consultancy Challenges (8×)",
        description:
          "A real business problem every week of travel — scoped, solved and defended in front of the client's own operators.",
      },
    },
    {
      n: 4,
      title: "Term 3 (Months 5–6) — In-Class & Venture Initiation Programme",
      summary:
        "Turn the road into a venture — present your startup idea for pre-seed funding while completing the core curriculum.",
      outcomes: ["VIP PRE-SEED PITCH", "CORE COURSES", "CREATOR CHALLENGE"],
      courses: [
        "Core courses across strategy, marketing, operations, finance and generative AI",
        "Workshops and real-world challenges blended into in-class learning",
        "Creator Challenge: building a personal brand from the documented journey",
        "VIP: validating and shaping the venture for the pre-seed panel",
      ],
      challenge: {
        name: "VIP Pre-Seed Challenge",
        description:
          "Validate and present your startup idea to fight for pre-seed funding in front of investors and operators.",
      },
    },
  ],
  faculty: [
    { name: "Mr. Manoj Kohli", role: "Former CEO", org: "SoftBank" },
    { name: "Dr. Arvind Mayaram", role: "Former Finance Secretary of India", org: "Government of India" },
    { name: "Mr. Rohit Kapoor", role: "CEO, Food Marketplace", org: "Swiggy" },
    { name: "Rajat Mathur", role: "Managing Director", org: "Morgan Stanley" },
    { name: "Dr. Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Rajiv Gupta", role: "Ex-VP, Sales & Marketing", org: "Honda" },
    { name: "Sanjiv Bhasin", role: "Ex-Director", org: "IIFL Securities" },
    { name: "Saurabh Sengupta", role: "Ex-SVP", org: "Zomato" },
    { name: "Ms. Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Ms. Monica Jasuja", role: "Head of Digital & Emerging Partnerships", org: "Mastercard" },
    { name: "Avantika Tomar", role: "Partner", org: "EY-Parthenon" },
    { name: "Alok Shrivastav", role: "Ex-AVP", org: "OYO" },
    { name: "Vaibhav Jain", role: "Former Partner", org: "Edelweiss Financial Services" },
    { name: "Mr. Sidharth Balakrishna", role: "Former Group Strategy Head", org: "Essel Group" },
    { name: "Dr. Soumik Bhusan", role: "Ex-Head CX Strategy", org: "Amazon" },
    { name: "Dr. Tathagata Dasgupta", role: "Chief Data & Analytics Officer", org: "Saatchi & Saatchi" },
    { name: "Ms. Vineeta Tikekar", role: "Former Head of Marketing", org: "Standard Chartered" },
    { name: "Mr. Elkana Ezekiel", role: "Former CMO", org: "Samsung" },
    { name: "Mr. Satish Krishnan", role: "Former MD", org: "Standard Chartered" },
    { name: "Mr. Ajay Jamuar", role: "Chief Operations Officer", org: "Wells Fargo" },
    { name: "Dr. Lan Ma", role: "Adjunct Professor of Business", org: "NYU" },
    { name: "Dr. Shad Morris", role: "Professor", org: "MIT Sloan" },
    { name: "Dr. Rajesh Bhargave", role: "Professor", org: "Imperial College Business School" },
    { name: "Dr. Meenakshi Rishi", role: "Professor of Economics", org: "Seattle University" },
    { name: "Dr. Daniel GVD Vliet", role: "Executive Director", org: "Cornell" },
    { name: "Dr. Vishnuprasad N.", role: "Former Dean", org: "IIM Bangalore" },
    { name: "Dr. Nandini Seth", role: "Ph.D", org: "IIM Bangalore" },
    { name: "Dr. Bhupesh Manoharan", role: "Ph.D", org: "IIM Calcutta" },
    { name: "Dr. Kashika Sud", role: "Ph.D", org: "IIM Ahmedabad" },
    { name: "Dr. Garima Chaklader", role: "Ph.D", org: "IIM Bangalore" },
    { name: "Dr. Rakshita Sharma", role: "Former CHRO", org: "Bobble AI" },
    { name: "Dr. Francis Rebello", role: "Former Head - HR", org: "Plan International" },
  ],
  immersions: [
    "Delhi — Addverb, Lenskart, Mercedes-Benz T&T Motors, NDMA, Parliament and the Election Commission of India",
    "Jalandhar — ITC Foods Factory, Sonalika Tractors, Nivia, LPU, Golden Temple and Wagha Border",
    "Jaipur — Jaipur Rugs, CarDekho, Minimalist, Cars24, IJYA Jewellery and Patanjali",
    "Mumbai — Godrej, Kotak, Mumbai Dabbawalas, RSVP Movies, Dharma Production, Swades, Dharavi and the RBI",
    "Goa — Cordelia Cruise, IndoBevs Distillery, Zydus, JSW Mines and Deltin",
    "Bengaluru — Meesho, Infosys, Swiggy, Cred, Zerodha and Cingularity TEC India",
    "Darjeeling — Glenburn Tea Estate, TIEEDI, Mayukh Tea and Indo-Nepal village immersion",
    "Lucknow — Indo-Russian Rifles, Ada, Deloitte, SEWA and the Prayagraj Mela Authority",
  ],
  jobRoles: [
    "Founder / Venture Builder",
    "Strategy & Consulting Associate",
    "Business Operations Manager",
    "Growth & GTM Lead",
    "Family Business Successor",
    "Creator / Content Entrepreneur",
  ],
};

export const Route = createFileRoute("/programmes/immersions/pgp-bharat")({
  head: () => ({
    meta: [
      { title: "PGP Bharat — Masters' Union" },
      {
        name: "description",
        content:
          "A 28-week immersion programme: 7,000 km across 20+ Indian cities, 25+ business immersions, 8 consultancy challenges and hybrid weekend classes. Commences October 2026.",
      },
      { property: "og:title", content: "PGP Bharat — Masters' Union" },
      {
        property: "og:description",
        content:
          "Learn business by travelling across 20+ cities of India — factories, markets and boardrooms, with 30+ CXOs and mentors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
