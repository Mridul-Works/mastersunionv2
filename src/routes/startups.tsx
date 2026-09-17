import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Flag,
  Home,
  Image as ImageIcon,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import BottomNav, { type BottomNavItem } from "@/components/BottomNav";

const NAV: BottomNavItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "journey", label: "Journey", icon: Flag },
  { id: "eight", label: "Stories", icon: Users },
  { id: "scale", label: "Scale", icon: BarChart3 },
  { id: "portfolio", label: "Portfolio", icon: Trophy },
];

/* ---------------------------------- Data ---------------------------------- */

const SPARK_EXAMPLES = [
  {
    name: "Nivara",
    founder: "Vikas Kabra",
    body: "Vikas Kabra didn't set out to build a diamond company. A personal milestone made him ask why lab-grown diamond jewellery felt neither modern nor accessible — and Nivara was born from that question.",
  },
  {
    name: "Yango",
    founder: "Sakshi Tuteja",
    body: "Sakshi Tuteja overheard a mother ask, in a product meeting at GNC, “Why don't we have healthier options for kids?” She couldn't shake the question. Yango is the answer.",
  },
  {
    name: "TrueBrands",
    founder: "Mukund Gupta",
    body: "Mukund Gupta watched brand-new, unsold clothes pile up in a Delhi warehouse and asked the obvious question nobody was solving: why do brands burn inventory while people can't afford the same brands?",
  },
  {
    name: "SeedsAI",
    founder: "Shubham Khatri & Vansh Miglani",
    body: "Shubham Khatri and Vansh Miglani didn't start with a business plan. They started by shadowing NBFC call-center agents and noticing how much time was wasted on manual review.",
  },
];

type Stage = { n: string; name: string; grant: string | null; body: string; culmination?: boolean };

const VIP_STAGES: Stage[] = [
  {
    n: "01",
    name: "Pre-Seed",
    grant: "₹15–20L",
    body: "Bust the myths, find a real problem worth solving, pick the right co-founders, learn to talk to customers — validated in front of founders, VCs, and alumni.",
  },
  {
    n: "02",
    name: "MVP",
    grant: "₹15–20L",
    body: "Build the smallest real version of the idea, prove customer centricity, ship on no-to-low-code tools, and defend it at MVP Demo Day.",
  },
  {
    n: "03",
    name: "Go-to-Market",
    grant: "₹20L",
    body: "Learn the marketing playbook and understand your funnel — turning a working product into a repeatable one.",
  },
  {
    n: "04",
    name: "Product-Market Fit",
    grant: "₹25L",
    body: "One final dry run, then Demo Day.",
  },
  {
    n: "05",
    name: "Demo Day",
    grant: null,
    body: "150+ venture capitalists and angel investors in the room, assessing student startups for real funding.",
    culmination: true,
  },
];

type Beat = { stage: string; body: string };

const EIGHT_BEATS: Beat[] = [
  {
    stage: "Idea",
    body: "At a Masters' Union cafeteria table, Mohit Paliwal, Mohit Goswami, and Yugal Tamang realized something the internet was missing: not everyone wants to be seen, but everyone has a story worth telling.",
  },
  {
    stage: "Early Build",
    body: "While their cohort chased summer placements, the trio used the Startup VIP program and their own engineering favors to get a live-audio prototype off the ground — whiteboards, wireframes, and cafeteria debates.",
  },
  {
    stage: "Testing",
    body: "They launched inside their own 60-member batch first. No frills. Users tuned in, shows got made, feedback was instant.",
  },
  {
    stage: "Traction",
    body: "Venture Highway came in with a $400K seed round. EIGHT scaled to 5M+ downloads, 750K+ monthly active users, and 80,000+ paying subscribers.",
  },
  {
    stage: "Pivot",
    body: "In early 2025, they read the shift in Gen Z attention toward short-form video — and pivoted from live audio to microdrama. In 14 weeks: 20 original series, 500K+ users, $1M+ ARR.",
  },
  {
    stage: "Outcome",
    body: "₹13Cr+ ARR today, ₹27Cr raised to date, ₹43.7Cr+ projected for FY26, 20 employees — India's storytelling powerhouse, still writing its next act.",
  },
];

const BAMBAII_BEATS: Beat[] = [
  {
    stage: "First Experiment",
    body: "During the Dropshipping Challenge, Gaurav Dasgupta and his group combined nuts, seeds, and condiments into a homemade snack mix — priced at ₹60. It flopped.",
  },
  {
    stage: "Early Sales",
    body: "They dropped the price to ₹50. The first 100-pack batch sold out in an hour, generating over ₹60,000 in sales during the challenge alone.",
  },
  {
    stage: "Failure / Realisation",
    body: "Despite the sales, Gaurav's own verdict was blunt: “The product was still... for the lack of a better word... shit.” The team disbanded amicably.",
  },
  {
    stage: "Iteration",
    body: "Months later, stuck for a new idea in Jaisalmer, a call from his mother reminded him of her business advice — sell with one hand, take the money with the other. He found leftover bottles from the old challenge and, in eight days (Jan 7–15), fixed the taste, texture, and size, and rebranded it — naming it Bambaii Foods last-minute, as the label printer was about to close.",
  },
  {
    stage: "Product-Market Traction",
    body: "The relaunched Piri Piri Chiwda became a hit — winning the MVP grant and earning Gaurav a spot on Demo Day. Today: ₹50L ARR, ₹1.2Cr projected revenue, 5,000+ customers, retail presence in Kolkata and Kathmandu.",
  },
];

const EATATLAS_BEATS: Beat[] = [
  {
    stage: "Problem",
    body: "In a Deloitte canteen, Ishita Gupta grew frustrated with how little the snacking industry had evolved. The question stuck with her even after she moved on to Sleepy Owl.",
  },
  {
    stage: "Research",
    body: "At Masters' Union, she teamed up with her brother Anshul Gupta (food systems, supply chain expertise from EY and the Ministry of Agriculture) and hostel neighbor Mayuresh Jadhav (branding). Together they had product thinking, operational depth, and brand instinct.",
  },
  {
    stage: "Testing",
    body: "Over 45 days, they tested across campuses, events, and food courts, narrowing down to three flavors based on adaptability, virality, and supply-chain feasibility.",
  },
  {
    stage: "Product",
    body: "Global-cuisine-inspired dips, packaged like boarding passes — snacks designed to “travel through taste.”",
  },
  {
    stage: "Launch",
    body: "Official marketplace launch in January 2025, backed by 50+ pop-ups across Delhi NCR to test pin-code-specific trends — including a viral, unplanned moment at a Coldplay concert.",
  },
  {
    stage: "Traction",
    body: "The only consumer brand to make the Top 3 at Demo Day, backed by Masters' Union grants and the Founder Fellowship. Now incubated at IIM Bangalore, IIT Kozhikode, BITS Pilani, and NIFTEM. Current: ₹80L ARR, ₹15L raised, ₹2Cr projected FY26.",
  },
];

const PATTERN_STEPS = ["Question", "Experiment", "Product", "Customer", "Iteration", "Traction"];

const ECOSYSTEM_STATS = [
  { value: "30+", label: "Startups launched" },
  { value: "₹593.10 Cr", label: "Total valuation" },
  { value: "₹480 Cr", label: "Projected revenue, FY26" },
  { value: "₹319.8 Cr", label: "Annualised revenue" },
  { value: "₹5.7 Cr", label: "Grants given by Masters' Union" },
  { value: "10,000+", label: "1:1 mentorship hours" },
  { value: "14.7x", label: "Capital efficiency" },
  { value: "500+", label: "Jobs created" },
];

const TESTIMONIALS = [
  {
    quote:
      "I came in expecting good ideas, but what I saw were real businesses. Students with traction, customers, and actual revenues. The ambition in that room was electric. This is what business education should be.",
    name: "Divya Gupta",
    role: "Director, Aavishkar Capital",
  },
  {
    quote:
      "This journey was more than just building a brand — it was about finding purpose and passion in every step... It wasn't just business; it became a home for our grit and growth.",
    name: "Sarthak Khanna",
    role: "Founder, Monarque",
  },
  {
    quote:
      "Masters' Union provided the environment and mentorship to transform a simple question into a meaningful product.",
    name: "Sakshi Tuteja",
    role: "Founder, Yango",
  },
  {
    quote:
      "I found some of the problem statements genuinely compelling, especially those being tackled by Cryptique, Guardex, and Spawnright.",
    name: "Sahil Dhingra",
    role: "VP, Info Edge Ventures",
  },
];

const NEXT_GEN = [
  {
    name: "Meta Fashion",
    pitch: "A phygital fashion house building trend-driven digital wearables and virtual-world drops.",
  },
  {
    name: "MemoTag",
    pitch:
      "An AI companion that engages patients in clinically structured phone conversations, turning them into graded reports for doctors.",
  },
  {
    name: "Zenmo",
    pitch: "An automotive-lifestyle apparel brand blending motorsport culture with streetwear.",
  },
  {
    name: "Internet Human Co.",
    pitch: "AI agents built as tireless “digital employees,” managed like remote team members.",
  },
  {
    name: "Angry Toast",
    pitch: "A content-first sock and footwear brand for Gen Z, built on creator-led community.",
  },
  {
    name: "AceCard",
    pitch: "A smart NFC business card that turns a single tap into a full CRM-synced digital profile.",
  },
];

type Company = {
  name: string;
  founder: string;
  category: string;
  metric: string;
  description: string;
};

const PORTFOLIO: Company[] = [
  {
    name: "Eight",
    founder: "Yugal Tamang, Mohit Paliwal, Mohit Goswami",
    category: "Tech & Media",
    metric: "5M+ downloads",
    description: "Audio-to-microdrama storytelling platform.",
  },
  {
    name: "Nivara",
    founder: "Vikas Kabra",
    category: "D2C",
    metric: "₹15Cr ARR, bootstrapped",
    description: "Lab-grown diamond jewellery, profitable with zero outside capital.",
  },
  {
    name: "Bullspree",
    founder: "Dharmil Bavishi",
    category: "Fintech",
    metric: "10L+ registered users",
    description: "Experiential investing platform for India's retail traders.",
  },
  {
    name: "PlaySuper",
    founder: "Upamanyu Chatterjee, Shouradeep Chakraborty",
    category: "Gaming",
    metric: "₹83.5Cr last valuation",
    description: "Rewards platform helping gaming studios fix retention.",
  },
  {
    name: "Lexi's",
    founder: "Naveen Balaji, Rhea Melwani, Alex Puthusserry, Ayush Melwani",
    category: "F&B",
    metric: "₹1.5Cr+ ARR",
    description: "Gurgaon's top-rated gourmet sandwich brand.",
  },
  {
    name: "Cryptique",
    founder: "Parth Agarwal, Akshit Varsani",
    category: "Web3",
    metric: "30+ project waitlist in 3 days",
    description: "An AI-native intelligence layer for Web3 marketing ROI.",
  },
  {
    name: "JustMyRoots",
    founder: "Karan Sachdeva",
    category: "Logistics / F&B",
    metric: "₹500Cr last valuation",
    description: "Regional food delivery grown into a national logistics backbone.",
  },
  {
    name: "Bambaii Foods",
    founder: "Gaurav Dasgupta",
    category: "F&B",
    metric: "5,000+ customers",
    description: "Guilt-free snacking, reborn from a failed first batch.",
  },
  {
    name: "Eat Atlas",
    founder: "Ishita Gupta, Anshul Gupta, Mayuresh Jadhav",
    category: "F&B",
    metric: "Top 3, Demo Day",
    description: "Global-flavor dips in boarding-pass packaging.",
  },
];

const REALITY_EXAMPLES = [
  {
    name: "Bambaii Foods",
    body: "A ₹60 snack mix that flopped, a founder who called his own product “shit,” a team that disbanded before the real version got built.",
  },
  {
    name: "EIGHT",
    body: "A full pivot from live audio to microdrama when the founders read that the format itself was aging out.",
  },
  {
    name: "Woody's Pizzeria",
    body: "Kanav Rishi Kumar's first weekend of full orders came with an early 1-star review before the rating climbed to 4.7 across 3,000+ orders.",
  },
  {
    name: "TrueBrands",
    body: "Three months in, both the co-founder and tech lead walked away. Mukund Gupta kept going alone until two new interns joined.",
  },
  {
    name: "PlaySuper",
    body: "Its founders' previous venture, CollegeShala, was acquired — then the 2023 edtech crash forced layoffs at the company that acquired it, before PlaySuper was even an idea.",
  },
];

/* ------------------------------- Components -------------------------------- */

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`eyebrow ${dark ? "text-background/60" : "text-foreground/55"}`}>{children}</div>;
}

function Section({
  id,
  tone = "light",
  container = "max-w-6xl",
  children,
}: {
  id?: string;
  tone?: "light" | "dark" | "paper";
  container?: string;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "dark"
      ? "bg-foreground text-background"
      : tone === "paper"
        ? "bg-muted text-foreground"
        : "bg-background text-foreground";
  return (
    <section id={id} className={toneClass}>
      <div className={`mx-auto ${container} px-5 py-16 md:px-10 md:py-24`}>{children}</div>
    </section>
  );
}

function Placeholder({
  kind,
  aspect,
  dark = false,
  note,
  className = "",
}: {
  kind: "image" | "video";
  aspect: string;
  dark?: boolean;
  note?: string;
  className?: string;
}) {
  const Icon = kind === "video" ? Play : ImageIcon;
  return (
    <div
      className={`relative w-full overflow-hidden ${aspect} ${className} ${
        dark ? "border border-background/15 bg-background/[0.04]" : "border border-border bg-foreground/[0.03]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${
            dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
          } 0px, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px, transparent 14px)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className={`flex size-11 items-center justify-center rounded-full border ${
            dark ? "border-background/25 text-background/60" : "border-border text-foreground/45"
          }`}
        >
          <Icon className="size-4" strokeWidth={1.5} />
        </span>
        <span className={`eyebrow ${dark ? "text-background/50" : "text-foreground/45"}`}>
          {kind === "video" ? "Video Placeholder" : "Image Placeholder"}
        </span>
        {note && (
          <span className={`text-[10px] uppercase tracking-[0.18em] ${dark ? "text-background/30" : "text-foreground/30"}`}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

function StoryBeats({ beats, dark = false }: { beats: Beat[]; dark?: boolean }) {
  return (
    <ol className="mt-2 space-y-8">
      {beats.map((b, i) => (
        <Reveal key={b.stage} delay={i * 0.05}>
          <li
            className={`flex gap-5 border-t pt-6 first:border-t-0 first:pt-0 ${
              dark ? "border-background/10" : "border-border"
            }`}
          >
            <span className={`eyebrow shrink-0 ${dark ? "text-background/50" : "text-foreground/50"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className={`eyebrow ${dark ? "text-background/70" : "text-foreground/70"}`}>{b.stage}</div>
              <p className={`mt-2 text-[1.02rem] leading-[1.7] ${dark ? "text-background/80" : "text-foreground/75"}`}>
                {b.body}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

function JourneyStages({ stages }: { stages: Stage[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-px bg-border md:grid-cols-5">
      {stages.map((s, i) => (
        <Reveal key={s.name} delay={i * 0.06} className="h-full">
          <div
            className={`flex h-full flex-col justify-between p-6 md:p-7 ${
              s.culmination ? "bg-foreground text-background" : "bg-background text-foreground"
            }`}
          >
            <div>
              <div className={`eyebrow ${s.culmination ? "text-background/55" : "text-foreground/50"}`}>{s.n}</div>
              <h3 className="mt-3 text-[1.15rem] font-medium leading-tight">{s.name}</h3>
              {s.grant && (
                <div
                  className={`mt-3 inline-block text-[10px] uppercase tracking-[0.18em] ${
                    s.culmination ? "text-background/60" : "text-foreground/55"
                  }`}
                >
                  Grant · {s.grant}
                </div>
              )}
            </div>
            <p className={`mt-5 text-[0.92rem] leading-[1.6] ${s.culmination ? "text-background/80" : "text-foreground/70"}`}>
              {s.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function PortfolioCard({ company, delay = 0 }: { company: Company; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group h-full bg-background p-7 transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.1rem] font-medium leading-tight">{company.name}</h3>
          <span className="eyebrow shrink-0 text-foreground/45">{company.category}</span>
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground/50">{company.founder}</div>
        <div className="mt-4 text-[1.15rem] font-medium tracking-[-0.02em]">{company.metric}</div>
        <p className="mt-3 text-[0.92rem] leading-[1.6] text-foreground/70">{company.description}</p>
      </article>
    </Reveal>
  );
}

function CtaButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold transition-transform hover:-translate-y-px ${
        dark ? "bg-background text-foreground" : "bg-foreground text-background"
      }`}
    >
      {children}
      <span
        className={`inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
          dark ? "bg-foreground text-background" : "bg-background text-foreground"
        }`}
      >
        <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
      </span>
    </Link>
  );
}

/* ---------------------------------- Page ----------------------------------- */

function StartupsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BottomNav items={NAV} applyHref="#cta" />

      <div className="mx-auto flex max-w-6xl items-center justify-between bg-background px-5 pt-6 md:px-10 md:pt-8">
        <Link
          to="/"
          className="eyebrow inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> Masters&apos; Union
        </Link>
        <div className="eyebrow text-foreground/55">Entrepreneurship at Masters&apos; Union</div>
      </div>

      {/* 1. HERO */}
      <header id="top" className="relative overflow-hidden bg-foreground pb-16 pt-10 text-background md:pb-24 md:pt-14">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <Eyebrow dark>Entrepreneurship at Masters&apos; Union</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[22ch] text-balance text-[clamp(2.6rem,7.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
              Some of our students don&apos;t graduate into jobs. They graduate into{" "}
              <em
                className="not-italic font-serif italic text-background/90"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                companies
              </em>
              .
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[62ch] text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-background/75">
              30+ startups. ₹593 Cr in combined valuation. Built by students who turned a cafeteria
              question, a canteen frustration, or a failed first batch into a real business — while still
              enrolled.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <CtaButton dark>Start Building</CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.32} className="mt-14">
            <Placeholder
              kind="video"
              aspect="aspect-video md:aspect-[21/9]"
              dark
              note="Full-bleed campus / founder reel"
            />
          </Reveal>
        </div>
      </header>

      {/* 2. WHERE IDEAS BEGIN */}
      <Section id="spark" tone="light">
        <Reveal>
          <Eyebrow>The Spark</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Nobody sits down to “found a startup.” They notice something first.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[68ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            Some ideas start with a question nobody else was asking. Some start with a frustration nobody
            else was naming. A few start as a homework assignment nobody meant to turn into a business. At
            Masters&apos; Union, that first spark is treated as the beginning of something real — not an
            extracurricular.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {SPARK_EXAMPLES.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.05}>
                <article className="h-full bg-background p-7">
                  <h3 className="text-[1.05rem] font-medium">{e.name}</h3>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/50">{e.founder}</div>
                  <p className="mt-4 text-[0.95rem] leading-[1.65] text-foreground/75">{e.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <Placeholder kind="image" aspect="aspect-[4/5]" note="Editorial portrait grid" />
          </Reveal>
        </div>
      </Section>

      {/* 3. ENTREPRENEURSHIP BY DOING */}
      <Section id="doing" tone="paper">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <Eyebrow>The Outclass</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
                Half the curriculum doesn&apos;t happen in a classroom.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[56ch] text-[1.05rem] leading-[1.7] text-foreground/70">
                At Masters&apos; Union, real growth doesn&apos;t come from case studies — it comes from
                taking risks, testing ideas, and putting something into the world. That&apos;s what the
                Outclass is: half the curriculum happens outside the classroom, where students run
                dropshipping stores, launch content brands, and start companies from scratch, from day one.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Placeholder kind="video" aspect="aspect-video" note="Documentary-style, students building" />
          </Reveal>
        </div>
      </Section>

      {/* 4. THE VENTURE JOURNEY */}
      <Section id="journey" tone="light">
        <Reveal>
          <Eyebrow>The Venture Initiation Programme (VIP)</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Nearly half the MBA. Four stages. One Demo Day.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[64ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            The VIP is a structured track — not an elective — that takes an idea through four defined
            stages, each backed by a grant and mentorship from founders, CXOs, and investors.
          </p>
        </Reveal>
        <JourneyStages stages={VIP_STAGES} />
      </Section>

      {/* 5. FOUNDER STORY - EIGHT */}
      <Section id="eight" tone="dark">
        <Reveal>
          <Eyebrow dark>Chapter 01 · MU Whiteboards to 5M+ Downloads</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            What if the next big creator wasn&apos;t on camera?
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:items-start">
          <StoryBeats beats={EIGHT_BEATS} dark />
          <Reveal delay={0.1}>
            <Placeholder kind="image" aspect="aspect-[3/2]" dark note="Founder portrait / product still" />
          </Reveal>
        </div>
      </Section>

      {/* 6. FOUNDER STORY - BAMBAII FOODS */}
      <Section id="bambaii" tone="light">
        <Reveal>
          <Eyebrow>Chapter 20 · From Dorm Room Experiment to India&apos;s Favorite Guilt-Free Snack</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif-italic mt-5 max-w-[28ch] text-balance text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.05]">
            &ldquo;Ek haath se becho, dusre haath se paise lo.&rdquo;
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:items-start">
          <StoryBeats beats={BAMBAII_BEATS} />
          <Reveal delay={0.1}>
            <Placeholder kind="image" aspect="aspect-square" note="Product / process photography" />
          </Reveal>
        </div>
      </Section>

      {/* 7. FOUNDER STORY - EAT ATLAS */}
      <Section id="eat-atlas" tone="dark">
        <Reveal>
          <Eyebrow dark>Chapter 27 · From Bland Chips to Bold Global Dips</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            One bland chip. Three founders who couldn&apos;t stop thinking about it.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:items-start">
          <StoryBeats beats={EATATLAS_BEATS} dark />
          <Reveal delay={0.1}>
            <Placeholder kind="image" aspect="aspect-[3/2]" dark note="Product photography / pop-up event" />
          </Reveal>
        </div>
      </Section>

      {/* 8. THE COMMON PATTERN */}
      <Section id="pattern" tone="paper">
        <Reveal>
          <Eyebrow>Zoom Out</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Different founders. Different products. The same six moves.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
            {PATTERN_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="eyebrow rounded-full bg-foreground px-4 py-2 text-background">{step}</span>
                {i < PATTERN_STEPS.length - 1 && <ArrowRight className="size-3.5 text-foreground/30" aria-hidden />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-[68ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            A cafeteria question about who gets to be a creator. A canteen complaint about boring chips. A
            ₹60 snack mix nobody wanted, repriced to ₹50 and sold out in an hour. None of these
            started as a business plan — they started as a small, cheap experiment that either worked or
            told the founder something true. The ones that became companies are the ones where the founder
            actually listened to that answer, and did it again.
          </p>
        </Reveal>
      </Section>

      {/* 9. THE SCALE OF THE ECOSYSTEM */}
      <Section id="scale" tone="dark">
        <Reveal>
          <Eyebrow dark>By the Numbers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            This isn&apos;t three stories. It&apos;s a portfolio.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px bg-background/10 md:grid-cols-4">
          {ECOSYSTEM_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.04}>
              <div className="h-full bg-foreground px-5 py-8">
                <div className="text-[clamp(1.7rem,3vw,2.6rem)] leading-none tracking-[-0.03em]">{s.value}</div>
                <div className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-background/55">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-[68ch] text-[1.02rem] leading-[1.7] text-background/70">
            More than half of these startups have raised over $1 million. Four have pitched on Shark Tank
            India. And when a startup doesn&apos;t make it, the founder walks away with sharper skills, real
            experience, and often, an incredible job offer anyway.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <Placeholder kind="image" aspect="aspect-[16/7]" dark note="Demo Day crowd / data visualization" />
        </Reveal>
      </Section>

      {/* 10. THE PEOPLE AROUND FOUNDERS */}
      <Section id="people" tone="light">
        <Reveal>
          <Eyebrow>Mentors, VCs, and Believers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Behind every founder is a room full of people who&apos;ve already done it.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="h-full bg-background p-8 md:p-10">
                <blockquote className="text-[clamp(1.02rem,1.5vw,1.2rem)] italic leading-[1.55] text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="eyebrow mt-6 text-foreground/55">
                  {t.name} · {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11. FOUNDER FELLOWSHIP */}
      <Section id="fellowship" tone="dark">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Reveal>
            <div className="text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.03em]">
              ₹50,000
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-background/55">
              per month, no equity taken
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow dark>For Those Going All In</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em]">
                No placements. No backup plan. Just a runway.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[56ch] text-[1.02rem] leading-[1.7] text-background/75">
                For students who want to build instead of interview, Masters&apos; Union offers the Founder
                Fellowship: ₹50,000 a month in grants, mentorship from industry veterans, and active
                help with fundraising — no placements, no backup plans. Right now, 40+ fellows are using
                that runway to build their companies full-time.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9">
              <Placeholder kind="image" aspect="aspect-[4/5]" dark note="Founder-at-work portrait" className="max-w-sm" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 12. THE NEXT GENERATION */}
      <Section id="next-gen" tone="light">
        <Reveal>
          <Eyebrow>The UG Ecosystem, 2025–26</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            The founders below aren&apos;t waiting for an MBA to start.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-[66ch] text-[1.05rem] leading-[1.7] text-foreground/70">
            Masters&apos; Union&apos;s undergraduate cohort has its own entrepreneurship track — and its
            own portfolio. In the 2025–26 cycle alone, UG founders have been granted ₹75L+ and
            generated ₹14Cr+ in revenue, with two startups earning Shark Tank India pitches.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {NEXT_GEN.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.04}>
              <article className="h-full bg-background p-7">
                <h3 className="text-[1.05rem] font-medium">{v.name}</h3>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-foreground/70">{v.pitch}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 13. PORTFOLIO */}
      <Section id="portfolio" tone="paper">
        <Reveal>
          <Eyebrow>Selected Companies</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Portfolio
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <PortfolioCard key={p.name} company={p} delay={i * 0.03} />
          ))}
        </div>
      </Section>

      {/* 14. THE REALITY OF BUILDING */}
      <Section id="reality" tone="dark">
        <Reveal>
          <Eyebrow dark>Not a Straight Line</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-[26ch] text-[clamp(1.9rem,3.8vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            For every launch, there&apos;s a version that didn&apos;t work first.
          </h2>
        </Reveal>

        <ul className="mt-12 space-y-8">
          {REALITY_EXAMPLES.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <li className="border-t border-background/10 pt-6 first:border-t-0 first:pt-0">
                <span className="eyebrow text-background/55">{r.name}</span>
                <p className="mt-2 max-w-[70ch] text-[1rem] leading-[1.7] text-background/80">{r.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-12">
          <Placeholder kind="video" aspect="aspect-video" dark note="Founder-interview, talking-head" />
        </Reveal>
      </Section>

      {/* 15. FINAL CTA */}
      <Section id="cta" tone="dark" container="max-w-4xl">
        <div className="pb-4 pt-4 text-center md:pb-8 md:pt-8">
          <Reveal>
            <h2 className="text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              WHAT WILL YOU BUILD?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-8 max-w-[56ch] text-[1.05rem] leading-[1.7] text-background/75">
              Every company on this page started the same way every company starts: as nothing. A question.
              A bad first batch. A frustration nobody else was naming. The only difference between an idea
              and a startup is whether someone builds it.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <CtaButton dark>Apply to Masters&apos; Union</CtaButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Entrepreneurship — Masters' Union" },
      {
        name: "description",
        content:
          "30+ student startups. ₹593 Cr valuation. From a cafeteria question to a $400K seed round: how Masters' Union founders build, test, fail, iterate, and scale real companies.",
      },
    ],
  }),
  component: StartupsPage,
});
