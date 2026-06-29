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
    pullQuote: "If the store doesn't sell, you don't pass. The market is the examiner.",
    sections: [
      { heading: "The brief", body: "On Day 1 of Term 1, every cohort is split into 50 teams. Each team is handed a budget, a category, and a runway of eight weeks to build, launch and scale a live D2C store. There are no simulations, no case studies, no 'what would you do?' decks. You ship a product, you take payments, you handle returns." },
      { heading: "The scoreboard", body: "Your grade is a weighted blend of revenue, gross margin, and unit economics. The top team this cohort cleared ₹45L in eight weeks. The bottom team learned that paid acquisition without a hook burns cash in 72 hours. Both walk out with the same lesson: spreadsheets lie, the market doesn't." },
      { heading: "What you actually learn", body: "Shopify ops, Meta ads architecture, Razorpay reconciliation, CAC/LTV modelling, COD risk, return logistics, influencer seeding. By the end you've written copy, A/B tested creatives, negotiated with a 3PL, and refunded an angry customer at 11pm. That's the curriculum." },
    ],
    proof: ["50 teams launched live stores", "₹3.38 Cr in cohort revenue", "₹45L from the top team", "0 simulation assignments"],
    closing: "If you want a B-school where the final exam is a P&L statement — this is the one.",
  },
  "/startups": {
    pullQuote: "We don't incubate ideas. We incubate revenue.",
    sections: [
      { heading: "The pipeline", body: "30+ student startups have been spun out of campus. Combined valuation: ₹593 Cr. Combined projected FY26 revenue: ₹480 Cr. Six have pitched on Shark Tank India. One closed a seed round before he finished his second semester." },
      { heading: "The build stack", body: "Every founder gets matched with a mentor who has either built or backed in their category. The on-campus venture studio handles incorporation, compliance, hiring, and intro warm-ups to Sequoia Spark, Blume, Titan Capital and Y Combinator partners." },
      { heading: "The bar", body: "Startups are reviewed every six weeks against a hard metric — revenue, signed LOIs, or active users. Vanity metrics don't move you up the pipeline. Companies that don't show traction are politely told to either pivot or go get a job. It's brutal. It works." },
    ],
    proof: ["30+ active student startups", "180+ jobs created by alumni founders", "6 alumni on Shark Tank India", "₹593 Cr aggregate valuation"],
    closing: "If you came here to be a 'future founder', you're at the wrong school. Founders here ship in semester one.",
  },
  "/mentors": {
    pullQuote: "No office hours. No waiting lists. Just answers.",
    sections: [
      { heading: "The roster", body: "500+ operators on call — founders mid-build, investors mid-cheque, CMOs mid-quarter. Kunal Shah, Nikhil Kamath, Varun Dua, Ritesh Malik, Peyush Bansal and ~495 others you'd pay a consulting retainer to reach." },
      { heading: "How it works", body: "Students post a question or request a 1:1 inside the mentor portal. Median response time is under 60 minutes. Calls happen on Zoom, on WhatsApp, or — surprisingly often — in the hallway when a mentor drops in to teach a session." },
      { heading: "What you ask for", body: "GTM teardown for your launch. Term sheet review before you sign. A warm intro to a customer or a VC. Hiring advice when your first ops lead ghosts you. The mentors here have done it, are doing it, and will tell you what they'd do differently." },
    ],
    proof: ["500+ active mentors", "<1 hour median response", "Always-on hotline", "0 waiting lists"],
    closing: "The hardest part of building is figuring out who to ask. We solved that part.",
  },
  "/food-lab": {
    pullQuote: "Other B-schools have cafeterias. We have a commercial kitchen.",
    sections: [
      { heading: "Inside the lab", body: "A full commercial-grade kitchen on campus — convection ovens, induction ranges, walk-in cold storage, packaging line. Students rotate through prep, plating, costing, and FSSAI compliance under chefs who've run kitchens at unicorn-scale F&B brands." },
      { heading: "The brands", body: "Lexi's started here as a classroom concept. It's now Gurgaon's highest-rated sandwich brand on Zomato and Swiggy, doing ₹1 Cr+ in ARR with a permanent shelf in the campus cafe and three dark-kitchen partners across NCR." },
      { heading: "Why it exists", body: "F&B is the fastest way to teach unit economics, supply chain, marketing and brand-building inside a 90-day cycle. You either get to a positive contribution margin per order or you eat the loss — literally and figuratively." },
    ],
    proof: ["1 commercial kitchen on campus", "Lexi's: 4.5★ on Zomato", "₹1 Cr+ ARR student brand", "FSSAI-certified production"],
    closing: "The food brand you order on Swiggy next month might be a student's midterm.",
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
    pullQuote: "Your 'extracurricular' might pay your tuition.",
    sections: [
      { heading: "The assignment", body: "Pick a niche. Build an audience from zero. You have one term. Graded on reach, retention and revenue — not vibes. 150+ active creators in the current cohort. 100+ channels launched." },
      { heading: "What broke out", body: "One student turned an Instagram sock brand into ₹45L of GMV. Another hit 5M+ views on Reels while still onboarding to hostel wifi. A LinkedIn finance creator now charges brands more for a single post than his term fee." },
      { heading: "The kit", body: "Full content studio on campus — cameras, sound, lights, editing bays. Brand-deal templates, IP-rights workshops, agent-style negotiation labs. By the end of the term most creators have at least one paid brand collaboration." },
    ],
    proof: ["46M+ aggregate reach", "5M+ cumulative followers", "150+ active creators", "100+ channels built"],
    closing: "The fastest way to learn marketing is to do it on yourself, in public.",
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
    pullQuote: "28% of grads join as Founder's Office or Chief of Staff — because they already built things.",
    sections: [
      { heading: "The numbers", body: "₹61.98L highest CTC last cohort. 3× average pre-MBA salary jump. 100% placement across PGP cohorts to date. And 10–20% YoY salary growth post-grad — measured, not estimated." },
      { heading: "Where they land", body: "Founder's Office and Chief of Staff roles at Zepto, Razorpay, Cred and Peak XV-backed startups. Strategy at McKinsey and Bain. Product at Google and Microsoft. Investing at a16z scout networks and India-side funds." },
      { heading: "Why the bar is high", body: "Recruiters don't interview here to fill an analyst seat. They interview here to find operators who can own a P&L on Day 30. The curriculum produces that profile by accident — placements just confirm it." },
    ],
    proof: ["₹61.98L highest CTC", "3× average salary jump", "10–20% annual post-grad growth", "28% in Founder's Office / CoS"],
    closing: "We don't optimise for the first job. We optimise for the next three.",
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
