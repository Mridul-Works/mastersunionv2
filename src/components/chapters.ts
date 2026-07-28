import mu01 from "@/assets/mu-01.webp";
import mu02 from "@/assets/mu-02.webp";
import mu03 from "@/assets/mu-03.webp";
import mu04 from "@/assets/mu-04.webp";
import mu05 from "@/assets/mu-05.webp";
import mu06 from "@/assets/mu-06.webp";
import mu07 from "@/assets/mu-07.webp";
import mu08 from "@/assets/mu-08.webp";

import mu10 from "@/assets/mu-10.webp";

export type Chapter = {
  n: string;
  tag: string;
  headline: string;
  body: string;
  stat: string;
  label: string;
  stats: { value: string; label: string }[];
  chips: string[];
  cta: string;
  route: string;
  bg: string;
  ink: string;
  image: string;
  pullQuote: string;
  sections: { heading: string; body: string }[];
  proof: string[];
  closing: string;
};

const SECTIONS: Record<string, { pullQuote: string; sections: { heading: string; body: string }[]; proof: string[]; closing: string }> = {
  "/how-we-teach": {
    pullQuote: "Your exam is a Stripe dashboard. Your grade is your revenue. Welcome to Term 1.",
    sections: [
      { heading: "InClass", body: "Unit economics, pricing strategy, digital marketing, customer psychology — taught by practitioners from Amazon, McKinsey, and India's D2C founders. The theory is dense, but it's only there to protect the money you're about to spend." },
      { heading: "OutClass", body: "Every student sources a product, lists it, runs ads, handles orders, and manages returns. No simulation, no sample dataset. Real suppliers. Real customers. Real money changing hands. The Stripe dashboard is the report card." },
      { heading: "Grades", body: "Revenue. Margin. Profit. NPS. Four numbers, no subjectivity. The Dropshipping Fair alone generated ₹3.38 Cr across 50 teams in a single semester — an average of ₹4L+ per team before their first midterm." },
      { heading: "Brands born here", body: "Lexi's Gourmet Sandwiches — Gurgaon's highest-rated sandwich brand, ₹1 Cr+ ARR, 4.5+/5 on Swiggy and Zomato within three months. Eat Atlas — premium chips and dips with a global-flavours D2C model. Unit economics learned InClass, validated OutClass." },
    ],
    proof: ["₹3.38 Cr cohort revenue", "50 teams competing", "₹4L+ average per team", "0 simulation assignments"],
    closing: "Most MBAs give you a case study about someone else's supply chain problem. We give you your own. Start your business before your first semester ends.",
  },
  "/startups": {
    pullQuote: "A school that incubates startups is still just a school. We are building a portfolio.",
    sections: [
      { heading: "The MU Fund", body: "A ₹5 Cr student-managed investment fund. Students source deals, conduct due diligence, and make investment decisions alongside real VCs. The fund has beaten public markets by 20–25% consistently." },
      { heading: "MU Grants & Founder's Fellowship", body: "₹1.2 Cr disbursed to date — no equity taken, no strings. The Founder's Fellowship adds ₹50,000 per month for one year post-graduation, unlimited fellowships per cohort, with an academic safety net: you can still sit for placements with the next batch." },
      { heading: "Demo Day", body: "100+ VCs in the room, every year. Sequoia, Nexus, Antler, InfoEdge. Students pitch live. Deals get done. Get Prepped adds 500+ mentors on call — fundraising advice, product feedback, legal — in under an hour." },
      { heading: "The portfolio", body: "Eight.Network (Co'21) — $3.1M raised, ~$5M ARR. Bullspree (PGP '22) — $1.88M seed, backed by Aman Gupta and Peyush Bansal. Hive School (PGP '25) — ₹2 Cr ARR, built while still a student. MemoTag — dementia care wearable built by a first-year undergraduate, still enrolled. PlaySuper — $1.5M raised. Lexi's — ₹1 Cr+ ARR." },
    ],
    proof: ["₹593 Cr portfolio valuation", "₹480 Cr projected revenue FY26", "6 on Shark Tank India", "180+ jobs created by student founders"],
    closing: "Most institutions add entrepreneurship as a feature. We built the school around the opposite assumption: the only way to learn to build is to build. If you're going to build something, build it here.",
  },
  "/mentors": {
    pullQuote: "500+ mentors. One hour or less. Not a guest lecture. An actual hotline.",
    sections: [
      { heading: "Who is in the network", body: "Partners from Bain, BCG, McKinsey, EY-Parthenon, Kearney. Investors from Sequoia, Nexus, Antler, WaterBridge, Avaana, Kae, Bessemer, JSW Ventures, Sorin. Operators from Google, Microsoft, Razorpay, Zerodha, Flipkart, Zomato. Practitioners from Axis Capital, Kotak IB, Citi, Bloomberg. Founders who have built, scaled, raised and exited. Legal specialists for term sheets, FSSAI, IP." },
      { heading: "What students use it for", body: "Term sheet review before a pitch tomorrow. Growth strategy for a venture that is not growing fast enough. Interview prep for a BCG first round at 9am. Pricing advice from someone who has set prices at a company you use. A second opinion on a cap table that does not feel right. A name to email when you do not know where to start." },
      { heading: "What students say", body: "\"I booked a Mentor Union slot the night before my Bain interview. The mentor had been through the same process and told me exactly what to expect. I got the offer.\" — Abhishek Deb, Senior Associate, BCG. \"The mentor I spoke to gave me a number to call. That number led to my first investor meeting. That meeting led to our seed round.\" — Nikhil Gaur, Hive School." },
    ],
    proof: ["500+ mentors on the roster", "<1 hr average response", "On-call, not on-stage", "0 waiting lists"],
    closing: "The answer you need is probably one booking away.",
  },
  "/food-lab": {
    pullQuote: "Most food businesses die before a single plate is served. Not because the idea was bad. Because the bill arrived first.",
    sections: [
      { heading: "The problem", body: "Kitchen rent and setup: ₹6L. R&D and chef consultant: ₹3L. Compliance and onboarding: ₹1.5L+. Working capital: ₹6L. Total due before a single order: ₹15L+. Food Lab eliminates that problem entirely — you bring the idea and the obsession, we handle everything else." },
      { heading: "What we handle", body: "Fully equipped commercial kitchen ready from day one. Culinary expert and professional kitchen staff on site. Procurement and supply chain sourced and managed. FSSAI licensing and compliance handled. Aggregator onboarding — live on Zomato and Swiggy. Mentorship from operators who have built from zero." },
      { heading: "Brands already cooking", body: "Lexi's Gourmet Sandwiches (Delhi & Gurgaon) — ₹1 Cr+ ARR, truffle mushroom ciabattas, crispy katsu sandos, 4.5+/5 on Swiggy and Zomato within three months, now expanding to Delhi. Woody's Pizzeria (Lajpat Nagar) — ₹2.4L monthly revenue, years of perfecting Neapolitan recipes, vegetarian-only, Indian-inspired, purely organic growth." },
      { heading: "Mentors & partners", body: "Ankit Tiwari (ex-Leela, Oberoi, Salad Days). Abhijeet Joshi (AVP, Zomato). Anshul Aggarwal (Customer Retention, Nando's). Kabir Chugh (serial food entrepreneur). Naveen Balaji (6 years at Zomato, co-founder Lexi's). Saksham Kotiya (Head of Entrepreneurship, MU). Swarup Potta (ex-ISRO, Urban Company)." },
    ],
    proof: ["4% Indians order food online vs 40–50% in US & China", "8L restaurants in India vs 1.2 Cr in China", "2× Swiggy + Zomato growth projected in 5 yrs", "₹15L+ pre-launch bill — eliminated"],
    closing: "Cloud kitchens are where we start — but Food Lab incubates any F&B brand. Packaged snacks, beverages, health foods, ready-to-eat, condiments, restaurants, food tech. Your idea. Our kitchen. India's next food brand.",
  },
  "/immersions": {
    pullQuote: "Both count for credits. Both look better than 'summer internship at dad's office.'",
    sections: [
      { heading: "The Bharat route", body: "An eight-week, 7,000-km journey across India. Steel plants in Jamshedpur, dairy co-ops in Gujarat, textile clusters in Tirupur, fintech war-rooms in Bengaluru, government think-tanks in Delhi. You meet the people building India outside the LinkedIn algorithm." },
      { heading: "The global route", body: "Seven countries, including a residency at INSEAD Fontainebleau and operational immersions at BMW Munich, plus partner sessions in Singapore, Dubai and London. Same credits, different lens." },
      { heading: "What it does to you", body: "It re-calibrates 'normal'. After watching a 70-year-old textile owner negotiate a margin in Tirupur and a 28-year-old PM ship a feature in Bangalore in the same week, you stop quoting Harvard case studies. You start quoting people." },
    ],
    proof: ["7,000 km across India", "7 countries on the global track", "40+ CXO sessions per cohort", "50+ 1-day immersions"],
    closing: "School should leave the campus more than it stays on it.",
  },
  "/faculty": {
    pullQuote: "Not retired luminaries. Currently running the companies you're studying.",
    sections: [
      { heading: "Who teaches you", body: "40% of the teaching faculty are sitting CEOs, MDs or CXOs. The finance professor runs a Morgan Stanley desk. The marketing professor runs a unicorn. The ops professor closed a fundraise last Tuesday." },
      { heading: "Visiting bench", body: "30% of the visiting faculty are professors at Harvard, Wharton, Kellogg and Booth — flown in for module-length residencies. The remaining bench is 200+ industry experts dropping in for masterclasses, panels and reviews." },
      { heading: "Why this matters", body: "When the person teaching you SaaS pricing is currently re-pricing their own SaaS company, the slides update on Monday morning. Theory ages. Practice doesn't." },
    ],
    proof: ["40% sitting CEOs / MDs", "200+ industry experts", "30% Ivy-league visiting", "0 pure-academic-only tracks"],
    closing: "You're not learning about the companies. You're being taught by them.",
  },
  "/creator-challenge": {
    pullQuote: "A student founded a socks brand, closed 7 brand deals in one month, and hit 5M+ views — while still enrolled.",
    sections: [
      { heading: "Phase 01 — Digital Architecture", body: "Niche selection. Visual and tonal identity. Personal brand engineered as a 24/7 professional asset. Full-time professional editors assigned from day one." },
      { heading: "Phase 02 — Algorithmic Leverage", body: "Viral hook frameworks. High-frequency content cycles across LinkedIn, Instagram, and YouTube. Real-time analytics to double down on what works." },
      { heading: "Phase 03 — Market Validation", body: "Students partner with real D2C brands, execute live creative briefs, and deliver professional assets under real-world market pressure. The Brand Hackathon (PGP edition) brought in 8+ D2C partners — Perfora, Vama, Smylo, Anveshan, Rabitat, Bruno Milano, Soverenn, WanderOn — with a ₹10L+ prize pool distributed by commercial impact." },
      { heading: "Winners — UG Class of 2028", body: "Siddhanth Vengali (1st, ₹1L) — Angry Toast socks, 5M+ views in 3 months, ₹4L+ revenue, 7+ brand deals in one month. Samriddhi Saraf (2nd, ₹75K) — 40K+ followers, 15M+ views, 20+ collabs. Chirag Naryani & Guduru Spandana (3rd, ₹50K). Parag Jain (Special Recognition, ₹50K) — 800 to 25K+ impressions in 7 days." },
      { heading: "Top creators & mentors", body: "Simran Wassan (@wingwoman.sim) — 18 to 5,000+ followers in weeks, 28.7M peak views. Anany Chauhan — 29.8M views on a single video. Ananya Kulshrestha — 14.4K followers, ₹3L brand collab. Mentors: Deepak Pareek (383K), Ishaan Arora (428K), Gaurav Ghai (594K, 3× TEDx), Daksh Sethi (7× TEDx)." },
    ],
    proof: ["46M+ aggregate reach", "5 Mn+ cumulative followers", "120+ active creators", "₹10L+ prize pool (PGP)"],
    closing: "Stop consuming. Start dominating.",
  },
  "/campus": {
    pullQuote: "Your commute to the recruiter is shorter than your commute to the canteen.",
    sections: [
      { heading: "The location", body: "Right inside DLF Cyberpark in Gurugram — the densest concentration of Fortune 500 offices in India. Google, Microsoft, Amazon, Goldman Sachs, McKinsey, Bain and PwC are all within a 2-km radius. So is your next job interview." },
      { heading: "The building", body: "LEED Platinum certified. 24/7 student access. Open studios, a food lab, an investment lab with live Bloomberg terminals, a podcast room, and breakout pods designed by people who actually use them." },
      { heading: "The neighbourhood", body: "Lunch is a coffee with a founder you cold-emailed at 9am. Dinner is a beer with a recruiter you met at a meetup downstairs. Network density is a curriculum advantage — we just made it a literal one." },
    ],
    proof: ["85% of Fortune 500 within 2 km", "LEED Platinum certified", "24/7 campus access", "DLF Cyberpark, Gurugram"],
    closing: "The campus isn't a bubble. It's the busiest corner of corporate India.",
  },
  "/life-at-mu": {
    pullQuote: "Sleep is optional. Building is mandatory.",
    sections: [
      { heading: "Morning", body: "9 AM strategy session with a sitting CEO. Coffee on the way out. 11 AM, you're in a working group reviewing GTM for a classmate's startup. By lunch, you've signed off on a creative for the cohort's e-commerce store." },
      { heading: "Afternoon", body: "2 PM shoot in the content studio for your Reels challenge. 4 PM, a partner from Peak XV drops by for an unannounced AMA. 6 PM, you take a call with a Sequoia associate reviewing your friend's pitch deck." },
      { heading: "Night", body: "9 PM, three teams are in the Food Lab plating a new menu. 11 PM, the investment lab is still half-full. The 1 AM whiteboard wars are where most of the actual decisions get made." },
    ],
    proof: ["24/7 campus access", "Daily mentor calls", "On-site studio, kitchen, fund", "Always-on cohort Slack"],
    closing: "A normal day here would be a quarter's worth of memories anywhere else.",
  },
  "/placements": {
    pullQuote: "The offer is the start. The compounding is the story.",
    sections: [
      { heading: "The numbers", body: "₹28.52L average CTC (Co'24). ₹61.98L highest CTC. 3.03× average salary jump from pre-MBA. 148 total recruiters. 28% placed in Founder's Office or Chief of Staff roles. 10 international offers. 37% of offers with early joining bonuses." },
      { heading: "Salary growth, cohort by cohort", body: "Co'21: ₹29.12L → ₹37.18L → ₹39.61L → ₹41.67L. Co'22: ₹33.1L → ₹37.27L → ₹43.29L. Co'23: ₹34.07L → ₹38.23L. Co'24: ₹28.52L. That's 10–20% annual salary growth — among the highest for any MBA in India." },
      { heading: "Where students go", body: "Consulting — Bain, BCG, McKinsey, Accenture Strategy, EY-Parthenon, Kearney, PwC, Deloitte. Tech & growth — Google, Microsoft, ServiceNow, Flipkart, Zerodha, Zepto, Zomato, Razorpay, MakeMyTrip, BluSmart. VC & IB — WaterBridge, Avaana, InnoVen, Kae, Kotak IB, Axis Capital, Good Capital. International — Daniel Nath (Google, Dublin), Adeetya Prakash (Careem, Dubai), Mehul Soni (Avirom Capital, US), Anmol Malhotra (ZKX, Estonia)." },
      { heading: "Two paths, one decision", body: "Place — with 148 recruiters and Bain, BCG and McKinsey in the room, the record stands on its own. Build — the Founder's Fellowship gives serious founders ₹50,000 per month for a year post-graduation. No equity. No conditions. You can still sit for placements with the next batch if you change your mind." },
    ],
    proof: ["₹28.52L average CTC (Co'24)", "₹61.98L highest CTC", "3.03× pre-MBA salary jump", "28% in Founder's Office / CoS"],
    closing: "The career starts here.",
  },
  "/mu-ventures": {
    pullQuote: "Most funds want traction. MU Ventures writes the first cheque before any of that exists.",
    sections: [
      { heading: "Three funds", body: "Dropout Fund (live now, ₹15L cheque) — for school, UG and PG dropouts ready to build instead of follow the script. 12-month build year inside the MU ecosystem, up to 100 Founder Credits, academic safety net if the startup doesn't continue. Founders' Fund (launching soon, ₹15–20L) — pre-seed for consumer brands and deep-tech. Creator Fund (launching soon, ₹10L) — for builders with proven distribution, 500K+ followers or ~80% organic traffic preferred." },
      { heading: "Beyond capital", body: "1:1 monthly mentorship. Exclusive co-working space on the Masters' Union campus. Tech tools and credits from AWS, Google Cloud, Azure, Notion, Figma, HubSpot, Stripe, Vercel and OpenAI. Access to 5,000+ founders, CXOs and potential customers. PR and branding. Next-round prep with the right VCs." },
      { heading: "Portfolio", body: "Cryptique — intelligence-first growth platform for DeFi & Crypto. ORBIT Sanyark Space — multi-mission satellites for secure navigation and communications. Lexi's Sandwiches — ₹1 Cr+ ARR, turning flavour into fandom. Blue Brew — the new era of denim wear." },
      { heading: "The team & advisors", body: "Pratham Mittal (GP, Founder MU, Co-founder Outgrow, Forbes 30 Under 30). Saksham Kotiya (Managing Partner, ex-DSG Partners). Sumit Vijapure (VP, EIR at MU). Anshu Mehta (VP, CFA, ex-Futures First). Advisory Council: Manoj Kohli (ex-CEO Bharti Airtel), Shishir Maheshwari (MD, EverSource Capital), Swapna Gupta (ex-Partner, Avaana), Arjun Vaidya (Co-founder, V3 Ventures). VC Mentors from Avaana, growX, Kae, GetFive, Sorin, BII, Bessemer, Sauce, JSW Ventures." },
    ],
    proof: ["$10M investment vehicle", "₹10–20L cheque sizes", "<10 days for most decisions", "All founders under 25"],
    closing: "Most people apply for jobs. A few apply to build the future.",
  },
  "/d2c-challenge": {
    pullQuote: "Your exam is a Stripe dashboard. Your grade is your revenue. Welcome to Term 1.",
    sections: [
      { heading: "How it works", body: "Every student sources a product, builds a store, runs ads, handles orders, and manages returns. No simulation. No sample dataset. Real suppliers. Real customers. Real money changing hands. The Dropshipping Fair generated ₹3.38 Cr across 50 teams in a single semester." },
      { heading: "The scoreboard", body: "Revenue. Margin. Profit. NPS. Four numbers, no subjectivity. 50 teams compete simultaneously, averaging ₹4L+ per team in Term 1 — before their first midterm. The Shopify dashboard is the report card." },
      { heading: "What you actually learn", body: "Unit economics, pricing strategy, digital marketing, customer psychology — taught by practitioners from Amazon, McKinsey, and India's D2C founders. By the end of Term 1, you have made mistakes, fixed them, and learned more about unit economics from one semester of doing than most people learn in an entire MBA from reading." },
      { heading: "Brands born here", body: "Lexi's Gourmet Sandwiches (Co'24) — ₹1 Cr+ ARR, 4.5+/5 on Swiggy and Zomato within three months, now expanding from Gurgaon to Delhi. Eat Atlas — premium chips and dips with a global-flavours D2C model. Unit economics learned InClass, validated OutClass." },
    ],
    proof: ["₹3.38 Cr cohort revenue, Co'25", "50 teams competing simultaneously", "₹4L+ average revenue per team", "0 simulation assignments"],
    closing: "The number on your Shopify dashboard is not a proxy for learning. It is the learning.",
  },
};


function withSections<T extends { route: string }>(c: T): T & { pullQuote: string; sections: { heading: string; body: string }[]; proof: string[]; closing: string } {
  const s = SECTIONS[c.route];
  return { ...c, ...s };
}

const RAW_CHAPTERS = [
  {
    n: "01", tag: "Curriculum",
    headline: "Your grade depends on how much money you made.",
    body: "Forget GPA. Your report card is your P&L. 50 teams ran real e-commerce stores and made ₹3.38 Cr — before their first midterm. The market doesn't accept late submissions.",
    stat: "₹3.38 Cr", label: "Cohort revenue — before midterms",
    stats: [{ value: "₹3.38 Cr", label: "Cohort revenue" }, { value: "₹45L", label: "Top team" }, { value: "50", label: "Competing teams" }],
    chips: ["Real P&L", "Live stores", "Shopify", "Meta Ads", "Stripe", "Razorpay"],
    cta: "See the syllabus", route: "/how-we-teach", bg: "#6B1F2A", ink: "#F5E9D4", image: mu01,
  },
  {
    n: "02", tag: "Entrepreneurship",
    headline: "Our students built startups worth ₹593 crore.",
    body: "30+ startups. ₹593 Cr total valuation. 6 Shark Tank India appearances — including one by a first-year undergraduate. We do not wait for students to graduate before calling them founders. The portfolio starts on day one.",
    stat: "₹593 Cr", label: "Total valuation of student startups",
    stats: [{ value: "₹593 Cr", label: "Total valuation" }, { value: "₹480 Cr", label: "Projected revenue, FY26" }, { value: "6", label: "On Shark Tank India" }, { value: "180+", label: "Jobs created" }],
    chips: ["MU Fund ₹5 Cr", "MU Grants ₹1.2 Cr", "Founder's Fellowship", "Demo Day 100+ VCs"],
    cta: "Start building", route: "/startups", bg: "#1F4D3F", ink: "#EFE7D6", image: mu03,
  },
  {
    n: "03", tag: "D2C Challenge",
    headline: "Your exam is a Stripe dashboard. Your grade is your revenue.",
    body: "Every student runs a real D2C store in Term 1 — sourcing, ads, orders, returns. 50 teams generated ₹3.38 Cr in a single semester, ₹4L+ per team on average — before their first midterm.",
    stat: "₹3.38 Cr", label: "Cohort revenue — before midterms",
    stats: [{ value: "₹3.38 Cr", label: "Cohort revenue" }, { value: "50", label: "Competing teams" }, { value: "₹4L+", label: "Avg per team" }, { value: "0", label: "Simulations" }],
    chips: ["Shopify", "Meta Ads", "Stripe", "Razorpay", "Live stores", "Real P&L"],
    cta: "See the scoreboard", route: "/d2c-challenge", bg: "#0F3D2E", ink: "#F1E7D2", image: mu01,
  },
  {
    n: "04", tag: "Careers",
    headline: "The offer is the start. The compounding is the story.",
    body: "₹61.98L highest CTC. 3.03× average salary jump. 28% of grads join as Founder's Office or Chief of Staff. 148 recruiters — Bain, BCG, McKinsey, Google, Zerodha. And if you'd rather build: ₹50,000/month for a year, no equity taken.",
    stat: "₹61.98L", label: "Highest CTC, Co'24",
    stats: [{ value: "₹28.52L", label: "Average CTC, Co'24" }, { value: "₹61.98L", label: "Highest CTC" }, { value: "3.03×", label: "Pre-MBA salary jump" }, { value: "148", label: "Total recruiters" }],
    chips: ["Bain", "BCG", "McKinsey", "Google", "Zerodha", "Zepto"],
    cta: "See salaries", route: "/placements", bg: "#4A5A1E", ink: "#EFE7D0", image: mu10,
  },
  {
    n: "05", tag: "Immersions",
    headline: "A term travelling 7,000 km across India. Or flying to INSEAD. Your call.",
    body: "Choose your adventure: 7,000 km across India meeting CXOs, or 7 countries with INSEAD and BMW. Both count for credits. Both look better on your LinkedIn than 'summer internship at dad's office.'",
    stat: "7,000 km", label: "Bharat route across India — for credits",
    stats: [{ value: "7,000 km", label: "Bharat route" }, { value: "7", label: "Countries" }, { value: "40+", label: "CXO sessions" }, { value: "50+", label: "1-day immersions" }],
    chips: ["INSEAD", "BMW", "Bharat route", "CXO access", "Global"],
    cta: "Pick your trip", route: "/immersions", bg: "#B5482A", ink: "#F4E5CC", image: mu05,
  },
  {
    n: "06", tag: "Creator Challenge",
    headline: "The assignment: grow a real audience. Some got very, very good at it.",
    body: "One student made ₹45L selling socks on Instagram. Another hit 5M+ views while still figuring out hostel wifi. Here, your 'extracurricular' might pay your tuition.",
    stat: "46M+", label: "Aggregate reach built in one term",
    stats: [{ value: "100+", label: "Channels built" }, { value: "5 Mn+", label: "Cumulative followers" }, { value: "150+", label: "Active creators" }, { value: "46M+", label: "Aggregate reach" }],
    chips: ["Instagram", "YouTube", "LinkedIn", "Shorts", "Brand deals"],
    cta: "See the creators", route: "/creator-challenge", bg: "#4B2240", ink: "#F1E3CE", image: mu07,
  },
  {
    n: "07", tag: "Mentors",
    headline: "500+ mentors. One hour or less.",
    body: "Burning cash faster than you planned? Talk to a founder who's been there twice. Need a GTM playbook? Ask someone who launched last quarter. 500+ mentors who actually pick up. No office hours. No waiting lists. Just answers.",
    stat: "500+", label: "Mentors who actually pick up",
    stats: [{ value: "500+", label: "Mentors on call" }, { value: "<1 hr", label: "Average response" }, { value: "On demand", label: "Not on stage" }],
    chips: ["Kunal Shah", "Nikhil Kamath", "Varun Dua", "Ritesh Malik", "Peyush Bansal"],
    cta: "Get the hotline", route: "/mentors", bg: "#1E2B58", ink: "#E8E3D2", image: mu02,
  },
  {
    n: "08", tag: "Food Lab",
    headline: "We built a food incubator with real kitchens inside a B-school.",
    body: "Other B-schools have cafeterias. We have a commercial kitchen where students launch actual food brands. Lexi's went from classroom concept to Gurgaon's highest-rated sandwich brand.",
    stat: "₹1 Cr+", label: "ARR from a student food brand",
    stats: [{ value: "4.5+", label: "Lexi's Zomato rating" }, { value: "₹1 Cr+", label: "ARR" }, { value: "Cohort '24", label: "Founded" }],
    chips: ["Lexi's", "Zomato", "Swiggy", "Real kitchens", "Student-run"],
    cta: "Taste the lab", route: "/food-lab", bg: "#C99211", ink: "#1A1408", image: mu04,
  },
  {
    n: "09", tag: "Faculty",
    headline: "40% of our faculty are sitting CEOs and MDs. Not retired. Sitting.",
    body: "Your finance professor is the MD of Morgan Stanley. Your marketing prof runs a unicorn. They're not retired luminaries dropping wisdom from a podium — they're currently running the companies you're learning about.",
    stat: "40%", label: "Faculty who are sitting CEOs & MDs",
    stats: [{ value: "40%", label: "Industry practitioners" }, { value: "200+", label: "Industry experts" }, { value: "30%", label: "Ivy-league visiting faculty" }],
    chips: ["Morgan Stanley", "Harvard", "Wharton", "Unicorn CEOs", "Sitting MDs"],
    cta: "Meet your bosses", route: "/faculty", bg: "#1C1C1C", ink: "#E9DFC9", image: mu06,
  },
  {
    n: "10", tag: "Campus",
    headline: "Your classroom is inside DLF Cyberpark. So is your future employer.",
    body: "Your classroom is in DLF Cyberpark. So is Google. So is Microsoft. Your commute to the recruiter is shorter than your commute to the canteen.",
    stat: "85%", label: "Fortune 500 within 2 km of class",
    stats: [{ value: "85%", label: "Fortune 500 within 2 km" }, { value: "DLF", label: "Cyberpark, Gurugram" }, { value: "LEED", label: "Platinum certified" }],
    chips: ["Google", "Microsoft", "DLF Cyberpark", "Gurugram", "LEED Platinum"],
    cta: "Walk the campus", route: "/campus", bg: "#14233F", ink: "#E6DDC8", image: mu08,
  },
];

export const CHAPTERS: Chapter[] = RAW_CHAPTERS.map((c) => withSections(c));

export const CHAPTERS_BY_ROUTE: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.route, c])
);

