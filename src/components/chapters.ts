import mu01 from "@/assets/mu-01.jpg";
import mu02 from "@/assets/mu-02.jpg";
import mu03 from "@/assets/mu-03.jpg";
import mu04 from "@/assets/mu-04.jpg";
import mu05 from "@/assets/mu-05.jpg";
import mu06 from "@/assets/mu-06.jpg";
import mu07 from "@/assets/mu-07.jpg";
import mu08 from "@/assets/mu-08.jpg";
import mu09 from "@/assets/mu-09.jpg";
import mu10 from "@/assets/mu-10.jpg";

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
    pullQuote: "Your grade is your revenue. The market is the examiner.",
    sections: [
      { heading: "Semester 1 — The Dropshipping Fair", body: "InClass: unit economics, pricing, digital marketing and customer psychology — taught by practitioners from Amazon, McKinsey and India's D2C founders. OutClass: every student sources a product, lists it, runs the ads, takes the orders, and handles the returns. No simulation, no sample dataset. Cohort '25 generated ₹3.38 Cr across 50 teams in a single semester — an average of ₹4L+ per team. Brands like Lexi's Gourmet Sandwiches (₹1 Cr+ ARR, 4.5+ on Swiggy/Zomato within three months) and Eat Atlas were born in this exact classroom." },
      { heading: "Semester 2 — The Creator Economy", body: "InClass: brand building, content strategy, distribution and monetisation, taught by founders who have done it. OutClass: each student builds a YouTube channel or Instagram presence on a topic of their choice. The subscriber count is the grade; the sponsorship is the proof. 100+ channels, 5 Mn+ cumulative followers. Series C Podcast (150+ episodes, 4 seasons — Kunal Bahl, Ghazal Alagh) and Behind Closed Doors are entirely student-booked, produced and distributed." },
      { heading: "Semester 3 & Beyond — Venture Initiation Programme", body: "InClass: fundraising, cap tables, investor relations and scaling operations, taught by VCs and founders who have raised real capital. OutClass: students take their venture to the next level. Some raise institutional rounds, some cross ₹1 Cr ARR, some appear on Shark Tank. 100+ VCs from Sequoia, Nexus, Antler and InfoEdge attend Demo Day. Students have collectively raised ₹25.24 Cr; the portfolio sits at ₹593 Cr valuation and 180+ jobs created." },
    ],
    proof: ["₹3.38 Cr cohort revenue in one semester", "50 teams · ₹4L+ average per team", "100+ channels · 5 Mn+ cumulative followers", "₹25.24 Cr raised · ₹593 Cr portfolio valuation"],
    closing: "Revenue is truth. Margin is discipline. NPS is the final exam. The whole report card, compressed into three numbers.",
  },
  "/startups": {
    pullQuote: "A school that incubates startups is still just a school. We are building a portfolio.",
    sections: [
      { heading: "The infrastructure, not the inspiration", body: "Entrepreneurship at Masters' Union is not a track you opt into — it is the method. The MU Fund is a ₹5 Cr student-managed investment fund that has beaten public markets by 20–25%. MU Grants have disbursed ₹1.2 Cr to early-stage student founders — no equity, no strings. The Founder's Fellowship pays ₹50,000/month for twelve months post-graduation to anyone who chooses to build instead of place. 500+ mentors are on-call for fundraising, product, market research and legal in under an hour." },
      { heading: "Demo Day is a real deal room", body: "100+ VCs in the room every year — Sequoia, Nexus, Antler, InfoEdge. Students pitch live and deals get done. By the time founders reach Demo Day they are not first-time founders; they have already failed at something, fixed it, and sold something that worked — usually twice. The VCs in the room know this, which is why they keep coming back." },
      { heading: "The portfolio (a selection)", body: "Eight.Network (Co'21) — $3.1M raised from Kae Capital and Venture Highway, ~$5M ARR. Bullspree (PGP '22) — $1.88M seed, Shark Tank India, backed by Aman Gupta and Peyush Bansal. Hive School (PGP '25) — India's first sales school, ₹2 Cr run rate, Shark Tank India, built while Nikhil was still a student. MemoTag (UG '28) — a dementia-care wearable built by a first-year undergraduate, pitched on Shark Tank before he completed Year 1. PlaySuper (Co'24) — $1.5M from 100X.VC and IAN Fund. Lexi's (Co'24) — ₹1 Cr+ ARR, 4.5+ on Swiggy/Zomato within three months." },
    ],
    proof: ["30+ student startups · ₹593 Cr aggregate valuation", "₹480 Cr projected revenue, FY26", "6 Shark Tank India appearances · 180+ jobs created", "₹5 Cr fund · ₹1.2 Cr grants · 100+ VCs at Demo Day"],
    closing: "We do not wait for students to graduate before calling them founders. The portfolio starts on day one.",
  },
  "/mentors": {
    pullQuote: "On-call, not on-stage. 500+ mentors. One hour or less.",
    sections: [
      { heading: "Mentor Union is not a list of alumni", body: "Most business schools give you access to a mentor network — a list of LinkedIn profiles and good intentions. You email them, some reply, the meeting is three weeks out and lasts thirty minutes. Mentor Union is different. You book a slot, you get a mentor — an active founder, operator, investor or specialist — within the hour. The conversation is direct, specific and immediately useful. You leave with an answer, a name, or a number. Sometimes all three." },
      { heading: "Who is in the network", body: "500+ active mentors across every function and sector. Consulting partners and alumni from Bain, BCG, McKinsey, EY-Parthenon, Kearney. Investors from Sequoia, Nexus, Antler, WaterBridge, Avaana Capital and InnoVen. Operators from Google, Microsoft, Razorpay, Zerodha, Flipkart and Zomato. Finance practitioners from Axis Capital, Kotak IB, Citi, American Express and Bloomberg. Founders who have built, scaled, raised and exited. Legal specialists for term sheets, incorporation, FSSAI and IP." },
      { heading: "What students actually use it for", body: "Term-sheet review the night before a pitch — a founder who has signed ten of them walks you through every clause. Growth strategy for a venture that is not growing fast enough — an operator finds the leak before you scale it. BCG first-round interview prep at 9am. Pricing from someone who has set prices at a company you use — not a framework, a number. A cap table sanity check forty minutes after booking. And when you do not know where to start, a name and a number to call — sometimes a warm introduction follows." },
    ],
    proof: ["500+ mentors on call", "<1 hour median response", "Every function · every sector", "Always-on hotline · no waiting lists"],
    closing: "The answer you need is one booking away.",
  },
  "/food-lab": {
    pullQuote: "Most food businesses die before a single plate is served. Food Lab eliminates that problem entirely.",
    sections: [
      { heading: "The opportunity", body: "Only 4% of Indians order food online — vs 40–50% in the US and China. India has 8 lakh restaurants; China has 1.2 crore. Swiggy and Zomato are projected to double in five years and need new, sticky brands to fuel that growth. The next decade of Indian F&B belongs to whoever shows up first." },
      { heading: "The pre-launch bill, eliminated", body: "Without Food Lab, a food founder owes ₹15L before serving a single plate — ₹6L kitchen rent and setup, ₹3L R&D and chef consultant, ₹1.5L compliance and onboarding, ₹6L working capital. With Food Lab, that bill is zero. You get a fully equipped commercial kitchen ready from day one, a culinary expert and kitchen staff on site, procurement and supply chain handled, FSSAI licensing managed, live aggregator onboarding to Zomato and Swiggy, and mentorship from food operators who have built from zero." },
      { heading: "Brands already cooking", body: "Lexi's Gourmet Sandwiches — truffle mushroom ciabattas, crispy katsu sandos — started inside Food Lab, rated 4.5+/5 on Swiggy and Zomato within three months, ₹1 Cr+ ARR, expanding to Delhi. Woody's Pizzeria (Lajpat Nagar) — vegetarian-only Neapolitan, ₹2.4L monthly revenue purely organic with half the menu still live, customers calling it the best pizza they have ever had. Venture cheques of ₹10–20L are written at a -1 stage; most decisions are made in under ten days." },
    ],
    proof: ["₹1 Cr+ ARR from Lexi's · 4.5+ Zomato rating", "₹15L+ pre-launch bill eliminated", "₹10–20L cheque · decisions in <10 days", "FSSAI, supply chain and aggregator onboarding handled"],
    closing: "Your idea. Our kitchen. India's next food brand.",
  },
  "/immersions": {
    pullQuote: "Most MBAs send you to a classroom to learn about the world. We send you to the world.",
    sections: [
      { heading: "Global Immersions — 8 across 7 countries", body: "Paris, Singapore, Boston, Milan, Berlin, London, Canada — each immersion is 1–2 weeks, carries academic credits, and puts students inside the companies and institutions that define their industries. Working facilities, live business sessions, and time with the people who run these organisations. Partner universities include INSEAD; company visits have included Boeing, Starbucks, BMW, Ferragamo, the Ferrari Research Center, Rakuten, the Nissan Auto Plant, the Canton Fair, and finance and trade desks in London and New York. Kellogg and Harvard Business School have sent students to Masters' Union for two consecutive years." },
      { heading: "Bharat Immersion — 7,000 km, one full term", body: "8 hubs, 20+ cities, one full term of academic credit. Students spend the entire term travelling India's economic geography — Chandni Chowk (India's oldest wholesale trading hub), Dalal Street (the financial nerve centre), Adani's Mundra ports, the tea estates of Darjeeling. 40+ CXO sessions and 50+ one-day immersions replace classroom instruction for the whole term." },
      { heading: "Programmes where immersion is the degree", body: "Masters' Union has built standalone programmes around this idea — PGP Bharat (India's first immersion-based MBA, 7,000 km and 40+ CXOs as a full academic degree), the Bharat Summer Fellowship (a short-form Bharat experience for credits), PGP TBM Summer School (the full InClass / OutClass model compressed into a summer), and the D2C Brand Bootcamp for founders and brand builders." },
    ],
    proof: ["8 immersions across 7 countries", "7,000 km · 20+ cities across Bharat", "40+ CXO sessions · 50+ one-day immersions", "4 standalone immersion-based programmes"],
    closing: "A classroom can teach you a framework. It cannot teach you the difference between how a business looks on a slide and how it runs on a floor.",
  },
  "/faculty": {
    pullQuote: "At most schools, faculty study companies. We hire the people who ran them.",
    sections: [
      { heading: "Masters in Residence, not professors", body: "300+ faculty and practitioners — 40% are sitting CEOs, MDs, founders and investors. You learn pricing from someone who set prices at a company you use, fundraising from someone who closed a round last quarter, people management from someone who manages thousands of people today. Their case studies are not from a textbook — they are from this quarter's board meeting. Rajat Mathur (MD, Morgan Stanley) teaches people management through interactive games and debates. Naveen Munjal (MD, Hero Electric) teaches EV strategy and business building." },
      { heading: "Full-time academic faculty", body: "25 full-time PhDs with backgrounds from IIM Calcutta, IIM Bangalore, IIM Ahmedabad, IIT, and global universities. 50+ publications in FT50 and A* journals. Active research collaborations with PwC and EY. Dr. Kenwyn K. Smith (Wharton) teaches team dynamics and leadership. Mohanbir Sawhney (Kellogg) — one of the world's leading authorities on technology strategy and marketing innovation — brought Kellogg students to Masters' Union for two consecutive years." },
      { heading: "What this means for students", body: "Operators, professors and founders teaching in the same room. Institutions represented include Stanford, Wharton, Harvard, IIM Calcutta, IIM Bangalore, IIM Ahmedabad, IIT and INSEAD. The upcoming MU × PwC Centre for Generative AI at Cyberpark adds NVIDIA-powered infrastructure, AI robots and large-scale data science to the bench. Your professor might have been in a board meeting this morning — and is back in front of you by 9am." },
    ],
    proof: ["300+ faculty & practitioners", "40% sitting CEOs and MDs", "25 full-time PhDs · 50+ FT50/A* publications", "MU × PwC GenAI Centre at Cyberpark"],
    closing: "A professor teaches what is known. A Master teaches what they have lived. That is not a coincidence — it is a hiring policy.",
  },
  "/creator-challenge": {
    pullQuote: "The assignment: grow a real audience. Some got very, very good at it.",
    sections: [
      { heading: "Verified creators", body: "Angry Toast — a student founded a design-led socks brand, closed 7 brand deals in one month, and hit 5M+ views while still enrolled. Built a real D2C audience from scratch and turned content into revenue. Tech, simplified — another student built a 40K audience and closed 20+ brand collaborations before graduating; simplified complex technology into high-impact content that brands wanted to sponsor, not because of reach alone but because the audience trusted the voice." },
      { heading: "Three platforms, one objective", body: "Instagram — aesthetic-led brands, product showcases and lifestyle narratives that attract organic followings and paid collaborations. YouTube — documentary-style content, case studies and educational series that establish domain expertise and drive subscriber growth into the tens of thousands. LinkedIn — thought leadership, industry commentary and founder journeys that turn a student profile into a magnet for recruiters and investors." },
      { heading: "Creative infrastructure and commercial outcomes", body: "Dedicated studios on campus, full-time editors, and production support — the assignment is not theoretical. It is to grow a real audience with real metrics and real commercial outcomes: brand deals, sponsored content, affiliate revenue and D2C sales. 150+ students build real audiences across the three platforms; 100+ channels with 5 Mn+ cumulative followers and 46M+ aggregate reach." },
    ],
    proof: ["100+ channels built · 5 Mn+ cumulative followers", "150+ active creators · 46M+ aggregate reach", "On-campus studios · editors · production support", "Brand deals · sponsored content · D2C revenue"],
    closing: "Your 'extracurricular' might pay your tuition.",
  },
  "/campus": {
    pullQuote: "Your classroom is inside DLF Cyberpark. So is your future employer.",
    sections: [
      { heading: "Where you are", body: "Tower A & C, DLF Cyber Park, Phase II, Sector 20, Gurugram. To the left, CyberHub — the heart of Gurugram's MNC ecosystem. To the right, Udyog Vihar — India's most concentrated belt of corporate headquarters. Two minutes from Cyber City Rapid Metro, ten minutes from the hostel, thirty minutes from IGI Airport. 85% of Fortune 500 companies operate within 2 km of this building. You bump into the people who will hire you, fund you, or co-found something with you — in the corridors of the same building, on an ordinary Tuesday. The location is not a perk. It is part of the curriculum." },
      { heading: "Inside the building", body: "A floor inside a commercial tower where your classroom shares an elevator with the firms that will later recruit you. 12+ eating options from KFC to Bikanerwala. Creative studios built for YouTube and content production. High-speed Wi-Fi throughout. μ.AI — Masters' Union's proprietary AI learning platform — on every device. A Bloomberg terminal that is not a prop — students manage a ₹5 Cr fund from it. LEED Platinum certified — the same standard as the world's most environmentally responsible buildings. Medanta and Columbia Asia hospitals within reach, 24/7 ambulance access. The Oberoi, Trident, The Leela and Lemon Tree for when visitors, mentors and VCs come to campus — and they come often. Neighbours include Google, Microsoft, IBM, Deloitte, PwC, KPMG and American Express." },
      { heading: "The hostel and the visitors", body: "6+ premium hostel buildings in Gurugram, 10–15 minutes from campus by shuttle. Gym, high-speed Wi-Fi, daily meals, housekeeping, 24/7 security. The conversations that happen at midnight over maggi have a way of turning into Term 2 ventures. Visitors include Kellogg School of Management and Harvard Business School (every year), and a rotating in-residence presence of Aman Gupta, Ghazal Alagh, Rohit Kapoor, Alakh Pandey, Ankur Warikoo and Kunal Bahl. VCs visit for Demo Days, pitch reviews and Mentor Union sessions — term sheets get signed in the cafeteria." },
    ],
    proof: ["85% of Fortune 500 within 2 km", "LEED Platinum certified · 12+ eating options", "6+ premium hostel buildings · 10–15 min shuttle", "μ.AI · Bloomberg terminal · creator studios"],
    closing: "Most business schools put you near industry. Masters' Union puts you inside it.",
  },
  "/life-at-mu": {
    pullQuote: "A day here can rather be a bit unusual.",
    sections: [
      { heading: "Morning — the alarm loses to a Shopify notification", body: "7:30 — before coffee, you check Shopify. Someone in Pune ordered three units at 2am, the margin is good, you make a mental note to increase ad spend. 9:00 — the person in front of the room was in a board meeting yesterday. He is the MD of Morgan Stanley. He does not use slides; he asks questions instead — pointed, uncomfortable, the kind that make your answer dissolve the moment you say it out loud. He tells you your pricing is wrong. Your Shopify notification, buzzing in your pocket, respectfully disagrees. 10:45 — you and your co-founder (also your batchmate, also your hostel neighbour) walk to KFC on campus and argue about ad spend for fifteen minutes. You land on a number. You both know it might be wrong. You run it anyway. This is called unit economics." },
      { heading: "Afternoon — the founder in the room and the deck autopsy", body: "11:00 — the next guest is someone you follow on Instagram. She built a D2C brand to ₹100 Cr ARR. She is 31. She takes a question from you, answers it, and asks a follow-up about your own venture. The room goes quiet. You answer. 13:00 — lunch is fast because your pitch deck has three slides held together by optimism and a font choice you regret. 14:00 — your faculty mentor (ex-Partner at McKinsey) looks at your deck for four minutes of silence that age you three years, then tells you the structure is wrong, not the content. You rebuild slides 4 through 9 while he watches. You hate that he was right." },
      { heading: "Evening — the studio, the VC, the final score", body: "15:30 — Creator Challenge session. You shoot three reels back to back; the third hook lands in the first two seconds. 17:00 — a D2C skincare founder with 200K followers replies to your last post; you message your mentor for a number, he answers in four minutes with the words 'don't go lower'. 18:00 — Mentor Union slot, a VC with 40+ investments, fifteen minutes, two questions you had been sitting on for a month, ends with a name to email. 19:00 — the reel goes live. You try to ignore it for six minutes (1,200 views). You give up at ten and watch it climb. 21:00 — dinner. Your batchmate got a Bain callback. Another got a term sheet. Another just hit 10K followers. 23:45 — final score: 18K reel views, Shopify up ₹12,000, deck structurally sound, brand deal in progress, investor follow-up sent. Sleep, imminent. Tomorrow's lecture, 9am." },
    ],
    proof: ["18K reel views by midnight", "₹12,000 Shopify uplift since morning", "1 hour from booking to VC call", "Twelve scenes · one ordinary Tuesday"],
    closing: "By midnight, the day has paid for itself. Tomorrow is a different day entirely. It is also somehow exactly the same.",
  },
  "/placements": {
    pullQuote: "Most MBAs get you a job. We change what kind of job you can get — and how fast you grow once you are in it.",
    sections: [
      { heading: "The numbers", body: "Cohort '24: average CTC ₹28.52L · highest CTC ₹61.98L · 3.03× pre-MBA salary jump · 148 total recruiters · 28% of offers in Founder's Office and Chief of Staff roles · 12% in VC and investment roles · 10 international offers · 37% of offers with early joining bonuses. Year-on-year salary growth of 10–20% post-graduation — among the highest for any MBA in India. Co'21 illustrates the curve: ₹29.12L → ₹37.18L → ₹39.61L → ₹41.67L across four years." },
      { heading: "Three paths — chosen, not assigned", body: "Consulting: Bain, BCG, McKinsey, Accenture Strategy, EY-Parthenon, Kearney, PwC, Deloitte. Recent placements include Jeneesha Singh (Associate Consultant, Bain), Prashasti Singh (Consultant, McKinsey) and Abhishek Deb (Senior Associate, BCG). Technology & Growth: Google, Microsoft, ServiceNow, Flipkart, Zerodha, Zepto, Zomato, Razorpay, MakeMyTrip, Cashfree, BluSmart. VC & Investment Banking: WaterBridge Ventures, Avaana Capital, InnoVen Capital, Kae Capital, Kotak IB, Axis Capital, Good Capital — with placements like Gautam Marwah (Chief of Staff, Kae Capital) and Yash Chhabra (Investment Associate, WaterBridge)." },
      { heading: "International and Founder's Office", body: "10 international offers in Co'24 — Daniel Paul Nath (Growth Strategist, Google Dublin), Adeetya Prakash (PM II, Careem Dubai), Naman Sangal and K. Sri Badarinadh (Talabat, Dubai), Mehul Soni (Quant Trader, Avirom Capital, US), Anmol Malhotra (Manager Strategy, ZKX, Estonia), Vidul Tyagi (Cloudtech, New York). 28% of offers come in as Founder's Office or Chief of Staff at Zepto, Razorpay, Cred and Peak XV-backed startups — because students have already built things. Recruiters do not interview here to fill an analyst seat; they interview here to find operators who can own a P&L on Day 30." },
    ],
    proof: ["₹28.52L average · ₹61.98L highest CTC, Co'24", "3.03× pre-MBA salary · 10–20% YoY growth", "148 recruiters · 10 international offers", "28% Founder's Office / CoS · 12% VC & investment"],
    closing: "Not just what you earn on day one. What you earn every year after.",
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
    body: "30+ startups. 6 Shark Tank India appearances. One founder was still figuring out his hostel mess timetable. We don't incubate ideas. We incubate revenue.",
    stat: "₹593 Cr", label: "Total valuation of student startups",
    stats: [{ value: "₹593 Cr", label: "Total valuation" }, { value: "₹480 Cr", label: "Projected revenue, FY26" }, { value: "6", label: "On Shark Tank India" }, { value: "180+", label: "Jobs created" }],
    chips: ["Shark Tank", "Sequoia Spark", "Blume", "Titan Capital", "Y Combinator"],
    cta: "Start building", route: "/startups", bg: "#1F4D3F", ink: "#EFE7D6", image: mu03,
  },
  {
    n: "03", tag: "Mentors",
    headline: "500+ mentors. One hour or less.",
    body: "Burning cash faster than you planned? Talk to a founder who's been there twice. Need a GTM playbook? Ask someone who launched last quarter. 500+ mentors who actually pick up. No office hours. No waiting lists. Just answers.",
    stat: "500+", label: "Mentors who actually pick up",
    stats: [{ value: "500+", label: "Mentors on call" }, { value: "<1 hr", label: "Average response" }, { value: "On demand", label: "Not on stage" }],
    chips: ["Kunal Shah", "Nikhil Kamath", "Varun Dua", "Ritesh Malik", "Peyush Bansal"],
    cta: "Get the hotline", route: "/mentors", bg: "#1E2B58", ink: "#E8E3D2", image: mu02,
  },
  {
    n: "04", tag: "Food Lab",
    headline: "We built a food incubator with real kitchens inside a B-school.",
    body: "Other B-schools have cafeterias. We have a commercial kitchen where students launch actual food brands. Lexi's went from classroom concept to Gurgaon's highest-rated sandwich brand.",
    stat: "₹1 Cr+", label: "ARR from a student food brand",
    stats: [{ value: "4.5+", label: "Lexi's Zomato rating" }, { value: "₹1 Cr+", label: "ARR" }, { value: "Cohort '24", label: "Founded" }],
    chips: ["Lexi's", "Zomato", "Swiggy", "Real kitchens", "Student-run"],
    cta: "Taste the lab", route: "/food-lab", bg: "#C99211", ink: "#1A1408", image: mu04,
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
    n: "06", tag: "Faculty",
    headline: "40% of our faculty are sitting CEOs and MDs. Not retired. Sitting.",
    body: "Your finance professor is the MD of Morgan Stanley. Your marketing prof runs a unicorn. They're not retired luminaries dropping wisdom from a podium — they're currently running the companies you're learning about.",
    stat: "40%", label: "Faculty who are sitting CEOs & MDs",
    stats: [{ value: "40%", label: "Industry practitioners" }, { value: "200+", label: "Industry experts" }, { value: "30%", label: "Ivy-league visiting faculty" }],
    chips: ["Morgan Stanley", "Harvard", "Wharton", "Unicorn CEOs", "Sitting MDs"],
    cta: "Meet your bosses", route: "/faculty", bg: "#1C1C1C", ink: "#E9DFC9", image: mu06,
  },
  {
    n: "07", tag: "Creator Challenge",
    headline: "The assignment: grow a real audience. Some got very, very good at it.",
    body: "One student made ₹45L selling socks on Instagram. Another hit 5M+ views while still figuring out hostel wifi. Here, your 'extracurricular' might pay your tuition.",
    stat: "46M+", label: "Aggregate reach built in one term",
    stats: [{ value: "100+", label: "Channels built" }, { value: "5 Mn+", label: "Cumulative followers" }, { value: "150+", label: "Active creators" }, { value: "46M+", label: "Aggregate reach" }],
    chips: ["Instagram", "YouTube", "LinkedIn", "Shorts", "Brand deals"],
    cta: "See the creators", route: "/creator-challenge", bg: "#4B2240", ink: "#F1E3CE", image: mu07,
  },
  {
    n: "08", tag: "Campus",
    headline: "Your classroom is inside DLF Cyberpark. So is your future employer.",
    body: "Your classroom is in DLF Cyberpark. So is Google. So is Microsoft. Your commute to the recruiter is shorter than your commute to the canteen.",
    stat: "85%", label: "Fortune 500 within 2 km of class",
    stats: [{ value: "85%", label: "Fortune 500 within 2 km" }, { value: "DLF", label: "Cyberpark, Gurugram" }, { value: "LEED", label: "Platinum certified" }],
    chips: ["Google", "Microsoft", "DLF Cyberpark", "Gurugram", "LEED Platinum"],
    cta: "Walk the campus", route: "/campus", bg: "#14233F", ink: "#E6DDC8", image: mu08,
  },
  {
    n: "09", tag: "Life at MU",
    headline: "A day here can rather be a bit unusual.",
    body: "9 AM: Strategy with a sitting CEO. 2 PM: Shoot content in our studio. 6 PM: Call with a Sequoia partner. 11 PM: Kitchen experiments in Food Lab. Sleep is optional. Building is mandatory.",
    stat: "24/7", label: "Campus access — sleep is optional",
    stats: [{ value: "40%", label: "Faculty are sitting CEOs" }, { value: "500+", label: "Mentors on call" }, { value: "24/7", label: "Campus access" }],
    chips: ["Content studio", "Food Lab", "Sequoia calls", "Always-on", "Build mode"],
    cta: "Live the day", route: "/life-at-mu", bg: "#8A3A12", ink: "#F2E4CB", image: mu09,
  },
  {
    n: "10", tag: "Placements",
    headline: "Our alumni salaries grow 10–20% every single year after they leave.",
    body: "₹61.98L highest CTC. 3x average salary jump. But the real flex? 28% of grads join as Founder's Office or Chief of Staff — because they already built things, not just studied them.",
    stat: "₹61.98L", label: "Highest CTC — and it keeps growing",
    stats: [{ value: "₹61.98L", label: "Highest CTC" }, { value: "3x", label: "Pre-MBA salary jump" }, { value: "10–20%", label: "Annual growth" }],
    chips: ["Zepto", "McKinsey", "a16z", "Razorpay", "Google", "Peak XV"],
    cta: "See salaries", route: "/placements", bg: "#4A5A1E", ink: "#EFE7D0", image: mu10,
  },
];

export const CHAPTERS: Chapter[] = RAW_CHAPTERS.map((c) => withSections(c));

export const CHAPTERS_BY_ROUTE: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.route, c])
);
