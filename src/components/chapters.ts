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
};

export const CHAPTERS: Chapter[] = [
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

export const CHAPTERS_BY_ROUTE: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.route, c])
);
