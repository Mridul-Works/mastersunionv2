import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "Bharat Summer Fellowship",
  shortName: "Summer Fellowship",
  tagline:
    "India's first immersion-based business programme for global learners aged 18–21 — a 3,000 km journey across 10+ cities, blending on-ground immersions with CXO-led insight and weekly build challenges.",
  duration: "6 weeks — travel across 10+ cities",
  mode: "Travel based — for ages 18 to 21, global learners",
  commencement: "June 2026",
  intro:
    "Engage, immerse and step into factories, markets and cultural hubs. The Fellowship is built for learners who are curious about the depth of India's businesses and cultures, comfortable with intensive travel and new environments, and convinced that real learning happens beyond the classroom.",
  whyNow: [
    "10+ CXOs and mentors, Fortune 500 companies and top unicorns, and 20+ business and cultural immersions compressed into six weeks — with insights drawn from millions of real Indians.",
    "Six One Day Challenges turn every week into a shipped outcome, while a parallel content-creation track builds your public voice on video, audio or writing.",
  ],
  edge: [
    {
      title: "Experience — learn by travelling",
      body: "A 3,000 km transformational journey across 10+ cities, with 12+ business immersions and 8+ cultural immersions inside real operating businesses.",
    },
    {
      title: "Exposure — learn by collaborating",
      body: "10+ CXOs and mentors, Fortune 500 companies and top unicorns, plus Professors-in-Residence teaching tech, business, strategy and product management.",
    },
    {
      title: "Extract — learn by building",
      body: "Master business skills through One Day Challenges, create your digital identity through content creation, and build a portfolio from multi-industry exposure.",
    },
    {
      title: "A creator track that has produced creators",
      body: "Fellowship alums include Anurag Bansal (@businesswithbansal), Yash Shah (@mediummasala) and Janhvi Shukla (@createwithjanhvi).",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Orientation — Laying the Foundation",
      summary:
        "Pre-orientation sessions prepare you for the road; on-campus orientation at Masters' Union opens the journey.",
      outcomes: ["PRE-ORIENTATION", "CAMPUS ORIENTATION", "COHORT FORMATION"],
      courses: [
        "Pre-orientation sessions to prepare for immersions",
        "On-campus orientation at the Masters' Union Gurugram campus",
        "1:1 mentorship matching with practitioners, alumni and domain experts",
        "Masterclasses with CXOs, founders and operators",
      ],
      challenge: {
        name: "Orientation Week",
        description:
          "Arrive, meet the cohort and faculty, and set the personal goals you will be measured against over six weeks of travel.",
      },
    },
    {
      n: 2,
      title: "Immersions — Travel Across Bharat (North)",
      summary:
        "Delhi NCR, Dehradun, Jalandhar and Jaipur — logistics, manufacturing, brand-building and heritage exports.",
      outcomes: ["LOGISTICS", "MANUFACTURING", "BRAND BUILDING", "MARKETPLACES"],
      courses: [
        "Hub 1 — Delhi NCR: airport cargo logistics with Skyways Group, luxury positioning at Mercedes-Benz T&T Motors, a Parliament visit and local market immersion",
        "Hub 2 — Dehradun: manufacturing excellence at Hero MotoCorp, Mahindra & Mahindra, Mankind, Patanjali at scale, plus the Forest Research Institute and Mussoorie",
        "Hub 3 — Jalandhar: large-scale manufacturing at ITC Foods, global brand-building at NIVIA, tractors made for India at Sonalika, LPU's 650-acre education and agri ecosystem, Lovely Sweets and the Army Cantonment",
        "Hub 4 — Jaipur: marketplace model at CarDekho, heritage exports at Jaipur Rugs, brand-building at IJYA, agri value creation at Northern Extract, Minimalist, Patanjali and Jal Mahal",
      ],
      challenge: {
        name: "One Day Profit Challenge + 24-Hour Ad Challenge",
        description:
          "From idea to income in 24 hours on real revenue, then an innovative ad concept for a real brand tested against the market.",
      },
    },
    {
      n: 3,
      title: "Immersions — Travel Across Bharat (West & South)",
      summary:
        "Mundra & Ahmedabad, Mumbai, Goa and Bengaluru — ports, dairy, capital markets, distilleries and aerospace.",
      outcomes: ["PORTS & ENERGY", "CAPITAL MARKETS", "PRODUCT & TECH", "AEROSPACE"],
      courses: [
        "Mundra & Ahmedabad: three Adani enterprises across Ports, Wilmar and Solar, Amul's dairy factory, IIM Ahmedabad Ventures and four CXO sessions",
        "Hub 5 — Mumbai: production house operations, the Dabbawala network decoded, brand legacy and one brand DNA across many businesses at Godrej, the NSE and the Reserve Bank of India",
        "Hub 6 — Goa: Cordelia cruise to Goa, iron mines and a Feni distillery, Fado music, Portuguese culture and Goa's nightlife",
        "Hub 6 — Bengaluru: aerospace innovation at Cingularity, human resource management and India's biggest export story at Infosys, Cred, Zerodha, Meesho, Cubbon Park and the HAL Aerospace Museum",
      ],
      challenge: {
        name: "Personal Finance + Consulting Garage Challenge",
        description:
          "Design your own wealth blueprint from budgeting to investing, then break down a complex problem, structure the solution and defend it under pressure.",
      },
    },
    {
      n: 4,
      title: "Immersions (East) & Content Creation",
      summary:
        "Darjeeling and Lucknow close the road, while the content track turns six weeks of travel into a public body of work.",
      outcomes: ["SUSTAINABILITY", "DEFENCE & CRAFT", "AI PRODUCT", "PERSONAL BRAND"],
      courses: [
        "Hub 8 — Darjeeling: rural immersion in Indo-Nepal villages, tea estate visits covering brand building, culture and sustainability",
        "Hub 9 — Lucknow: UP defence manufacturing, global luxury embroidery, and meetings with government leaders shaping a trillion-dollar economy",
        "Content creation: launching a podcast, vlog series or long-form writing practice; becoming a LinkedIn Top Voice",
        "Programme partners across Nivia, ITC, Godrej, Infosys, RSVP, Northern Extract, CarDekho, Skyways, Hero and Patanjali",
      ],
      challenge: {
        name: "AI Product Creation + Design Thinking Challenge",
        description:
          "Identify a real-world problem, design an AI-powered product and test whether it works — then learn to design your way forward when answers aren't obvious and stakes are high.",
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
  ],
  immersions: [
    "Delhi NCR — Skyways Group, Mercedes-Benz T&T Motors, Parliament and local markets",
    "Dehradun — Hero MotoCorp, Mahindra & Mahindra, Mankind, Patanjali and the Forest Research Institute",
    "Jalandhar — ITC Foods Factory, NIVIA Sports, Sonalika Tractors, LPU and the Army Cantonment",
    "Jaipur — CarDekho, Jaipur Rugs, IJYA Jewellery, Northern Extract, Minimalist and Jal Mahal",
    "Mundra & Ahmedabad — Adani Ports, Adani Wilmar, Adani Solar, Amul and IIM Ahmedabad Ventures",
    "Mumbai — Godrej Industries, Mumbai Dabbawalas, NSE, the Reserve Bank of India and a production studio",
    "Goa — Cordelia Cruise, iron mines, a Feni distillery and Portuguese-Goan cultural immersion",
    "Bengaluru — Cingularity Aerospace, Infosys, Cred, Zerodha, Meesho and the HAL Aerospace Museum",
    "Darjeeling — Indo-Nepal village immersion and Darjeeling tea estates",
    "Lucknow — defence manufacturing, luxury embroidery and government leadership sessions",
  ],
  jobRoles: [
    "Founder / Early-Stage Builder",
    "Business Analyst",
    "Consulting Associate",
    "Product & Growth Associate",
    "Creator / Content Entrepreneur",
    "Family Business Successor",
  ],
};

export const Route = createFileRoute("/programmes/immersions/bharat-summer-fellowship")({
  head: () => ({
    meta: [
      { title: "Bharat Summer Fellowship — Masters' Union" },
      {
        name: "description",
        content:
          "A 6-week immersion fellowship for global learners aged 18–21 — 3,000 km across 10+ Indian cities, 20+ business and cultural immersions, weekly One Day Challenges. Commences June 2026.",
      },
      { property: "og:title", content: "Bharat Summer Fellowship — Masters' Union" },
      {
        property: "og:description",
        content:
          "India's first immersion-based business programme for global learners — factories, markets and cultural hubs across 10+ cities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
