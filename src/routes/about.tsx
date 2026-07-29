import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Milestone, Compass, Users, Globe2, Trophy } from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const INTER = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Masters' Union — Our story, vision and recognition" },
      {
        name: "description",
        content:
          "The story of Masters' Union: year-by-year milestones, vision and mission, board and faculty, the U.N.I.O.N. way, and awards, rankings and accreditations.",
      },
      { property: "og:title", content: "About Masters' Union" },
      {
        property: "og:description",
        content:
          "Milestones, leadership, the U.N.I.O.N. way, and the awards, rankings and accreditations behind Masters' Union.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "story", label: "Story", icon: Milestone },
  { id: "vision", label: "Vision", icon: Compass },
  { id: "people", label: "People", icon: Users },
  { id: "union", label: "The Way", icon: Globe2 },
  { id: "awards", label: "Awards", icon: Trophy },
];

const TIMELINE = [
  {
    year: "2020",
    title: "The “unofficial” launch",
    points: [
      "Website went live and HT Mint carried the news — 12,000 visits in under 12 hours.",
      "72 early adopters took a bet on an institution that didn't even exist on Google Maps.",
    ],
  },
  {
    year: "2021",
    title: "Second cohort comes aboard",
    points: [
      "66 more students expanded the community and carried a young legacy forward.",
      "Nithin Kamath addressed Cohort 1. Student startups BullSpree and EIGHT raised $1M+.",
    ],
  },
  {
    year: "2022",
    title: "Undergraduate launch",
    points: [
      "Sanjeev Bikhchandani inspired Cohort 2 on campus; average salary jumped to ₹33 LPA.",
      "3,000 applications produced a record low acceptance rate of under 10%.",
      "The undergraduate programme blending tech, business and real-world work launched.",
    ],
  },
  {
    year: "2023",
    title: "Campus growth & startup wins",
    points: [
      "A 35,000 sq. ft. experiential campus opened, doubling collaborative learning space.",
      "Mentor network crossed 200+ leaders from Bain, BCG, Google and Microsoft.",
      "6 affiliated startups featured on Shark Tank — the most by any institution.",
    ],
  },
  {
    year: "2024",
    title: "Convocation & global recognition",
    points: [
      "Peyush Bansal graced the 3rd Convocation; average package of ₹34.07 LPA.",
      "Critical global memberships furthered the Top 10 global rank quest.",
      "Top B-school MBAs, including Harvard, began annual India Immersion visits.",
    ],
  },
  {
    year: "2025",
    title: "GenAI Lab & a new campus era",
    points: [
      "PwC and MU launched a next-gen GenAI Lab for students.",
      "Shri Jagdeep Dhankhar honoured the 4th Convocation.",
      "At 2,000 students, a new campus opened with AI Labs.",
      "A scholarship and seed fund launched to back non-traditional founders.",
    ],
  },
];

const BOARD = [
  { name: "Manoj Kohli", role: "Chairman" },
  { name: "Pankaj Bansal", role: "Board Member" },
  { name: "Vivek Gambhir", role: "Board Member" },
];

const LEADERS = [
  { name: "Pratham Mittal", role: "Founder" },
  { name: "Swati Ganeti", role: "Managing Director" },
  { name: "Nikhil Mittal", role: "Managing Director" },
  { name: "Abhishek Kaul", role: "Director, Career Services" },
  { name: "Dr. Bhupesh Manoharan", role: "Director Faculty, Marketing" },
  { name: "Sudhanshu Garg", role: "Director, Master Relations" },
  { name: "Anil Taneja", role: "Director, Special Projects" },
  { name: "Manpreet Singh Chhabra", role: "Director" },
  { name: "Shikhar Mahajan", role: "Associate Director, New Initiatives" },
  { name: "Abhinav Arora", role: "Associate Director, Alumni Relations & Career Prep" },
  { name: "Saksham Kotiya", role: "Associate Director, Entrepreneurship" },
  { name: "Divyam Goenka", role: "Associate Director, Brand" },
  { name: "Vinayak Khandelwal", role: "Associate Director, Growth" },
  { name: "Utsav Patodia", role: "Associate Director, UG Programs" },
  { name: "Aayushi Banotra", role: "Associate Director, Student Affairs" },
  { name: "Nishant Singh", role: "Associate Director, Corporate Relations" },
  { name: "Sahil Verma", role: "Head, Design" },
  { name: "Rajat Puri", role: "Head, Engineering" },
  { name: "Tarun Gupta", role: "Associate Director, IT" },
  { name: "Dr. Nandini Seth", role: "Head, Academics" },
  { name: "Anurag Yadav", role: "Head, Corporate Partnerships" },
  { name: "Yashika Hasija", role: "Head, Operations" },
  { name: "Vidhu Goel", role: "Head, Career Preparation" },
  { name: "Anil Raghav", role: "Lead, Finance" },
];

const RESIDENT_FACULTY = [
  { name: "Dr. Bhupesh Manoharan", role: "Director, Academic Services" },
  { name: "Dr. Nandini Seth", role: "Quantitative Methods & Decision Sciences" },
  { name: "Dr. Garima Chaklader", role: "Economics" },
  { name: "Dr. Manu Prasad", role: "Organizational Behavior & HRM" },
  { name: "Dr. Kashika Sud", role: "Organizational Behavior" },
  { name: "Dr. Ajith Babu", role: "Operations Management" },
  { name: "Dr. Ashish Bhandari", role: "Operations Management" },
  { name: "Prof. Shivangi Rajora", role: "Public Policies" },
  { name: "Dr. Bhasker Malu", role: "Psychology" },
  { name: "Dr. Muneer Kalliyil", role: "Economics" },
  { name: "Dr. Antra", role: "Decision Sciences" },
  { name: "Dr. Anushree Poddar", role: "Business Sustainability & Marketing" },
  { name: "Dr. Aarti Sharma", role: "Management Finance" },
  { name: "Dr. Rinku Mahindru", role: "Organizational Behaviour" },
  { name: "Dr. Nimisha Bora", role: "Accounting & Finance" },
  { name: "Dr. Vipin Sreekumar", role: "Strategic Management" },
];

const DIVERSITY = [
  { value: "61.3%", label: "Male students" },
  { value: "38.7%", label: "Female students" },
  { value: "48%", label: "Male employees" },
  { value: "52%", label: "Female employees" },
];

const UNION = [
  {
    letter: "U",
    title: "Unconventional",
    body: "We break away from traditional B-school playbooks, blending CXO-led classes, live projects and boardroom learning instead of lecture halls.",
  },
  {
    letter: "N",
    title: "Network Capital",
    body: "Your classmates, faculty and guest speakers are your investors, mentors and collaborators — an ever-growing asset for life.",
  },
  {
    letter: "I",
    title: "Immersions",
    body: "From headquarters of Fortune 500 companies to rural India, every term takes you somewhere new to understand how business works on the ground.",
  },
  {
    letter: "O",
    title: "Operator Mindset",
    body: "We teach you to build, run and scale — not just strategise. You'll get your hands dirty before you ever pick up the PowerPoint.",
  },
  {
    letter: "N",
    title: "No Finish Line",
    body: "Learning here doesn't end at graduation. Our alumni, mentors and resources stay with you as your career evolves.",
  },
];

const AFFILIATION_CATEGORIES = [
  "Practitioners",
  "Academic Collaborations",
  "Accreditations & Memberships",
  "NGOs & Communities",
  "Government Bodies",
];

const ACCREDITATIONS = [
  {
    name: "Business School Impact System (BSIS)",
    body: "BSIS by EFMD Global recognises business schools for impact in industry engagement, societal contribution and regional development beyond academics.",
  },
  {
    name: "AACSB",
    body: "The world's largest network of business schools and corporate partners, recognised globally as the benchmark for quality, excellence and impact in business education.",
  },
  {
    name: "EFMD Global",
    body: "A leading international association for management education, advancing excellence, innovation and global best practices across business schools worldwide.",
  },
  {
    name: "Business Graduates Association (BGA)",
    body: "Institutional membership demonstrating commitment to responsible leadership, global engagement and internationally benchmarked standards.",
  },
];

const RANKINGS = [
  { rank: "#5", title: "India's Top B-Schools for One-Year Programmes", source: "Business World, 2025" },
  { rank: "#3", title: "India's Private B-Schools", source: "EducationWorld, 2025" },
  { rank: "#5", title: "India's Emerging Private B-Schools", source: "Outlook-ICARE, 2026" },
  { rank: "#8", title: "India's Private B-Schools for One-Year PGP Programmes", source: "IIRF India MBA Rankings, 2026" },
];

const AWARDS = [
  {
    honour: "Gold — Startup Ecosystem",
    body: "Recognising a sustained, institution-led startup ecosystem with strong industry linkage and founder outcomes.",
    source: "ETEducation 2025",
  },
  {
    honour: "Bronze — Reimagine Education",
    body: "Recognising innovation in business education, selected from 1,200+ global entries reviewed by international experts.",
    source: "QS Reimagine Education 2025-26",
  },
  {
    honour: "QS I-GAUGE IOH Certification",
    body: "Awarded to institutions meeting QS benchmarks for campus wellbeing, engagement and overall student experience.",
    source: "QS I-GAUGE IOH 2025-26",
  },
  {
    honour: "Institutional Excellence Certification",
    body: "Recognising strong performance across comprehensive student outcomes and innovation.",
    source: "Indian Education Congress & Awards 2026",
  },
  {
    honour: "Best Use of AI in Education",
    body: "Recognising institutions using AI to improve learning, access and operational efficiency.",
    source: "World Education Summit 2026",
  },
  {
    honour: "#1 for Enabling Start-Up Culture",
    body: "Recognising excellence in entrepreneurship, innovation, incubation and startup support.",
    source: "Financial Express AIconic Awards 2026",
  },
  {
    honour: "Gold — Industry Partnerships & Employability",
    body: "Recognising strong industry integration and career outcomes for graduates.",
    source: "EducationWorld Grand Jury Awards",
  },
];

const NEWS = [
  { title: "Leading business school Masters' Union places 30 students in global companies", source: "The Hindu BusinessLine", date: "Dec 2025" },
  { title: "Gurugram B-school records strongest placement season; high recruiter interest", source: "Financial Express", date: "Dec 2025" },
  { title: "Indian B-schools see rising global demand for tech-skilled graduates", source: "India Today", date: "Dec 2025" },
  { title: "A new generation of institutions is trying to find India's next founders", source: "Economic Times", date: "Mar 2026" },
  { title: "Masters' Union reports ₹33.39 LPA average for the 2025 cohort", source: "Education World", date: "Nov 2025" },
  { title: "5 UAE companies recruit 13+ students from Masters' Union — a regional first", source: "Khaleej Times", date: "Nov 2025" },
  { title: "PwC India partners with Masters' Union to equip future leaders", source: "Big News Network", date: "Nov 2024" },
  { title: "Can the experiential learning of Masters' Union be the Indian MBA alternative?", source: "Forbes India", date: "May 2023" },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] uppercase tracking-[0.3em] text-black/55" style={{ fontFamily: MONO }}>
    {children}
  </div>
);

function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-28 text-black md:pb-32" style={{ fontFamily: INTER }}>
      <BottomNav items={NAV} applyHref="#contact" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/70 hover:text-black"
          style={{ fontFamily: MONO }}
        >
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="text-[11px] uppercase tracking-[0.25em] text-black/55" style={{ fontFamily: MONO }}>
          About Us
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Reimagining business education.
        </h1>
        <p className="mt-10 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-black/70">
          At Masters&apos; Union we teach business by doing business. Students build ventures, run funds and ship
          products alongside industry mentors — because leadership is learned when you launch, not when you listen.
        </p>
      </section>

      {/* TIMELINE */}
      <section id="story" className="border-t border-black/10 bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <Eyebrow>Year by year</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            From 72 early adopters to 2,000 students.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-black/10 md:grid-cols-2">
            {TIMELINE.map((t) => (
              <article key={t.year} className="bg-[#FAF8F4] p-6 md:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em]">{t.year}</span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-black/50" style={{ fontFamily: MONO }}>
                    {t.title}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[14px] leading-[1.6] text-black/70">
                      <span aria-hidden className="mt-[9px] h-px w-4 shrink-0 bg-black/30" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <Eyebrow>Vision &amp; Mission</Eyebrow>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em]">
            Our aim is to become a global top 10 B-school, setting new benchmarks through innovation, industry connect
            and impact.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-black/10 md:grid-cols-2">
            <div className="bg-white p-7 md:p-9">
              <Eyebrow>Our Vision</Eyebrow>
              <p className="mt-4 text-[18px] leading-[1.5] text-black/80">
                To iterate an education model that maximises human potential.
              </p>
            </div>
            <div className="bg-white p-7 md:p-9">
              <Eyebrow>Our Mission</Eyebrow>
              <p className="mt-4 text-[18px] leading-[1.5] text-black/80">
                To build a globally eminent institution that continuously challenges pedagogy and processes to deliver
                unparalleled human growth.
              </p>
            </div>
          </div>

          <blockquote className="mt-12 max-w-[60ch] border-l-2 border-black/20 pl-6 text-[clamp(1.1rem,2vw,1.5rem)] italic leading-[1.4] text-black/75">
            “A future of education is not just a means to an end, but a transformative journey that shapes leaders and
            innovators.”
            <footer className="mt-4 text-[12px] not-italic uppercase tracking-[0.2em] text-black/50" style={{ fontFamily: MONO }}>
              Mr. Manoj Kohli, Chairman
            </footer>
          </blockquote>
        </div>
      </section>

      {/* PEOPLE */}
      <section id="people" className="border-t border-black/10 bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <Eyebrow>A community of change-makers</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Board, leadership and faculty.
          </h2>

          <div className="mt-12">
            <Eyebrow>Board of Governors</Eyebrow>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-black/10 sm:grid-cols-3">
              {BOARD.map((p) => (
                <div key={p.name} className="bg-[#FAF8F4] p-6">
                  <div className="text-[17px] font-medium tracking-[-0.01em]">{p.name}</div>
                  <div className="mt-1 text-[13px] text-black/60">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Eyebrow>Executive Leadership</Eyebrow>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
              {LEADERS.map((p) => (
                <div key={p.name + p.role} className="bg-[#FAF8F4] p-5">
                  <div className="text-[15px] font-medium tracking-[-0.01em]">{p.name}</div>
                  <div className="mt-1 text-[12.5px] leading-snug text-black/60">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Eyebrow>Masters in Residence — full-time faculty</Eyebrow>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
              {RESIDENT_FACULTY.map((p) => (
                <div key={p.name} className="bg-[#FAF8F4] p-5">
                  <div className="text-[14.5px] font-medium tracking-[-0.01em]">{p.name}</div>
                  <div className="mt-1 text-[12px] leading-snug text-black/60">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Eyebrow>Diversity &amp; Inclusion</Eyebrow>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.6] text-black/70">
              We celebrate diversity with strong representation from all communities across our students and employees,
              and create a supportive, dynamic learning environment for everyone.
            </p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-sm bg-black/10 grid-cols-2 lg:grid-cols-4">
              {DIVERSITY.map((d) => (
                <div key={d.label} className="bg-[#FAF8F4] p-6">
                  <div className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em]">{d.value}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-black/55" style={{ fontFamily: MONO }}>
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNION WAY */}
      <section id="union" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <Eyebrow>The Masters&apos; Union way</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            U.N.I.O.N.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-black/10 md:grid-cols-2">
            {UNION.map((u, i) => (
              <article key={u.title} className={`bg-white p-7 md:p-9 ${i === UNION.length - 1 ? "md:col-span-2" : ""}`}>
                <div className="flex items-start gap-5">
                  <span className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.03em] text-black/25">
                    {u.letter}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.01em]">{u.title}</h3>
                    <p className="mt-2 max-w-[58ch] text-[14.5px] leading-[1.6] text-black/70">{u.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <Eyebrow>Affiliations &amp; collaborations</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {AFFILIATION_CATEGORIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-black/15 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-black/65"
                  style={{ fontFamily: MONO }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section id="awards" className="border-t border-black/10 bg-[#0F140F] text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/55" style={{ fontFamily: MONO }}>
            Awards &amp; Recognition
          </div>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Rankings, awards and accreditations that hold us to a global standard.
          </h2>

          {/* Rankings */}
          <div className="mt-12">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/50" style={{ fontFamily: MONO }}>
              Rankings
            </div>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {RANKINGS.map((r) => (
                <div key={r.title} className="bg-[#0F140F] p-6">
                  <div className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.03em] text-[#C9A84C]">
                    {r.rank}
                  </div>
                  <div className="mt-4 text-[14px] leading-[1.45] text-white/85">{r.title}</div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/45" style={{ fontFamily: MONO }}>
                    {r.source}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="mt-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/50" style={{ fontFamily: MONO }}>
              Awards
            </div>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-white/15 md:grid-cols-2 lg:grid-cols-3">
              {AWARDS.map((a) => (
                <article key={a.honour} className="flex flex-col bg-[#0F140F] p-6">
                  <h3 className="text-[16px] font-medium leading-snug tracking-[-0.01em] text-white">{a.honour}</h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-[1.6] text-white/65">{a.body}</p>
                  <div className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#C9A84C]" style={{ fontFamily: MONO }}>
                    {a.source}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Accreditations */}
          <div className="mt-14">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/50" style={{ fontFamily: MONO }}>
              Accreditations &amp; memberships
            </div>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-white/15 md:grid-cols-2">
              {ACCREDITATIONS.map((a) => (
                <article key={a.name} className="bg-[#0F140F] p-6 md:p-8">
                  <h3 className="text-[16px] font-medium tracking-[-0.01em] text-white">{a.name}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.6] text-white/65">{a.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-white/55">
              Also affiliated with NSDC (National Skill Development Corporation) as a Training Partner.
            </p>
          </div>
        </div>
      </section>

      {/* IN THE NEWS */}
      <section id="news" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <Eyebrow>In the news</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            Coverage across national and global media.
          </h2>
          <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {NEWS.map((n) => (
              <li key={n.title} className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <span className="max-w-[70ch] text-[15.5px] leading-[1.5] text-black/80">{n.title}</span>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-black/50" style={{ fontFamily: MONO }}>
                  {n.source} · {n.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/10 bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
          <Eyebrow>Contact</Eyebrow>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <p className="max-w-[42ch] text-[15px] leading-[1.65] text-black/70">
              Ground Floor, Tower C, DLF Cyber Park, Plot No. 405 B, Sector 20, Udyog Vihar Phase III, Gurgaon, Haryana
              122022
            </p>
            <p className="text-[15px] leading-[1.65] text-black/70">
              <a href="mailto:info@mastersunion.org" className="underline underline-offset-4 hover:text-black">
                info@mastersunion.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
