import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Plus } from "lucide-react";
import img01 from "@/assets/mu-01.jpg";
import img02 from "@/assets/mu-02.jpg";
import img03 from "@/assets/mu-03.jpg";
import img04 from "@/assets/mu-04.jpg";
import img05 from "@/assets/mu-05.jpg";
import img06 from "@/assets/mu-06.jpg";
import img07 from "@/assets/mu-07.jpg";
import img08 from "@/assets/mu-08.jpg";
import img09 from "@/assets/mu-09.jpg";
import img10 from "@/assets/mu-10.jpg";

type Card = {
  n: string;
  tag: string;
  headline: string;
  body: string;
  stats: { value: string; label: string }[];
  cta: string;
  image: string;
  bg: string;
  ink: string;
};

const CARDS: Card[] = [
  {
    n: "01", tag: "Curriculum",
    headline: "Your grade depends on how much money you made.",
    body: "Forget GPA. Your report card is your P&L. 50 teams ran real e-commerce stores and made ₹3.38 Cr — before their first midterm. The market doesn't accept late submissions.",
    stats: [
      { value: "₹3.38 Cr", label: "Cohort revenue" },
      { value: "₹45L", label: "Top team" },
      { value: "50", label: "Competing teams" },
    ],
    cta: "See the syllabus", image: img01, bg: "#6B1F2A", ink: "#F5E9D4",
  },
  {
    n: "02", tag: "Entrepreneurship",
    headline: "Our students built startups worth ₹593 crore.",
    body: "30+ startups. 6 Shark Tank India appearances. One founder was still figuring out his hostel mess timetable. We don't incubate ideas. We incubate revenue.",
    stats: [
      { value: "₹593 Cr", label: "Total valuation" },
      { value: "₹480 Cr", label: "Projected revenue, FY26" },
      { value: "6", label: "On Shark Tank India" },
      { value: "180+", label: "Jobs created" },
    ],
    cta: "Start building", image: img02, bg: "#1F4D3F", ink: "#EFE7D6",
  },
  {
    n: "03", tag: "Mentors",
    headline: "500+ mentors. One hour or less.",
    body: "Burning cash faster than you planned? Talk to a founder who's been there twice. Need a GTM playbook? Ask someone who launched last quarter. 500+ mentors who actually pick up. No office hours. No waiting lists. Just answers.",
    stats: [
      { value: "500+", label: "Mentors on call" },
      { value: "<1 hr", label: "Average response" },
      { value: "On demand", label: "Not on stage" },
    ],
    cta: "Get the hotline", image: img03, bg: "#1E2B58", ink: "#E8E3D2",
  },
  {
    n: "04", tag: "Food Lab",
    headline: "We built a food incubator with real kitchens inside a B-school.",
    body: "Other B-schools have cafeterias. We have a commercial kitchen where students launch actual food brands. Lexi's went from classroom concept to Gurgaon's highest-rated sandwich brand.",
    stats: [
      { value: "4.5+", label: "Lexi's Zomato rating" },
      { value: "₹1 Cr+", label: "ARR" },
      { value: "Cohort '24", label: "Founded" },
    ],
    cta: "Taste the lab", image: img04, bg: "#C99211", ink: "#1A1408",
  },
  {
    n: "05", tag: "Immersions",
    headline: "A term travelling 7,000 km across India. Or flying to INSEAD. Your call.",
    body: "Choose your adventure: 7,000 km across India meeting CXOs, or 7 countries with INSEAD and BMW. Both count for credits. Both look better on your LinkedIn than 'summer internship at dad's office.'",
    stats: [
      { value: "7,000 km", label: "Bharat route" },
      { value: "7", label: "Countries" },
      { value: "40+", label: "CXO sessions" },
      { value: "50+", label: "1-day immersions" },
    ],
    cta: "Pick your trip", image: img05, bg: "#B5482A", ink: "#F4E5CC",
  },
  {
    n: "06", tag: "Faculty",
    headline: "40% of our faculty are sitting CEOs and MDs. Not retired. Sitting.",
    body: "Your finance professor is the MD of Morgan Stanley. Your marketing prof runs a unicorn. They're not retired luminaries dropping wisdom from a podium — they're currently running the companies you're learning about.",
    stats: [
      { value: "40%", label: "Industry practitioners" },
      { value: "200+", label: "Industry experts" },
      { value: "30%", label: "Ivy-league visiting faculty" },
    ],
    cta: "Meet your bosses", image: img06, bg: "#1C1C1C", ink: "#E9DFC9",
  },
  {
    n: "07", tag: "Term 2",
    headline: "The assignment: grow a real audience. Some got very, very good at it.",
    body: "One student made ₹45L selling socks on Instagram. Another hit 5M+ views while still figuring out hostel wifi. Here, your 'extracurricular' might pay your tuition.",
    stats: [
      { value: "100+", label: "Channels built" },
      { value: "5 Mn+", label: "Cumulative followers" },
      { value: "150+", label: "Active creators" },
      { value: "46M+", label: "Aggregate reach" },
    ],
    cta: "See the creators", image: img07, bg: "#4B2240", ink: "#F1E3CE",
  },
  {
    n: "08", tag: "Campus",
    headline: "Your classroom is inside DLF Cyberpark. So is your future employer.",
    body: "Your classroom is in DLF Cyberpark. So is Google. So is Microsoft. Your commute to the recruiter is shorter than your commute to the canteen.",
    stats: [
      { value: "85%", label: "Fortune 500 within 2 km" },
      { value: "DLF", label: "Cyberpark, Gurugram" },
      { value: "LEED", label: "Platinum certified" },
    ],
    cta: "Walk the campus", image: img08, bg: "#14233F", ink: "#E6DDC8",
  },
  {
    n: "09", tag: "Life at MU",
    headline: "A day here can rather be a bit unusual.",
    body: "9 AM: Strategy with a sitting CEO. 2 PM: Shoot content in our studio. 6 PM: Call with a Sequoia partner. 11 PM: Kitchen experiments in Food Lab. Sleep is optional. Building is mandatory.",
    stats: [
      { value: "40%", label: "Faculty are sitting CEOs" },
      { value: "500+", label: "Mentors on call" },
      { value: "24/7", label: "Campus access" },
    ],
    cta: "Live the day", image: img09, bg: "#8A3A12", ink: "#F2E4CB",
  },
  {
    n: "10", tag: "Placements",
    headline: "Our alumni salaries grow 10–20% every single year after they leave.",
    body: "₹61.98L highest CTC. 3x average salary jump. But the real flex? 28% of grads join as Founder's Office or Chief of Staff — because they already built things, not just studied them.",
    stats: [
      { value: "₹61.98L", label: "Highest CTC" },
      { value: "3x", label: "Pre-MBA salary jump" },
      { value: "10–20%", label: "Annual growth" },
    ],
    cta: "See salaries", image: img10, bg: "#4A5A1E", ink: "#EFE7D0",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function CardRow({
  card,
  isOpen,
  onToggle,
}: {
  card: Card;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      transition={{ duration: 0.6, ease: EASE }}
      style={{ backgroundColor: card.bg, color: card.ink }}
      className="overflow-hidden rounded-3xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]"
    >
      {/* HOOK ROW — always visible, clickable */}
      <motion.button
        layout
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-6 px-7 py-7 text-left sm:gap-10 sm:px-10 sm:py-9"
      >
        <motion.span
          layout
          className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-none tabular-nums opacity-80"
        >
          {card.n}
        </motion.span>

        <motion.div layout className="min-w-0 flex-1">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] opacity-65">
            {card.tag}
          </div>
          <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.95rem)] font-light leading-[1.15] tracking-tight">
            {card.headline}
          </h3>
        </motion.div>

        <motion.span
          layout
          className="grid size-12 shrink-0 place-items-center rounded-full border transition-colors group-hover:bg-white/10"
          style={{ borderColor: `${card.ink}55` }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex"
          >
            <Plus className="size-5" />
          </motion.span>
        </motion.span>
      </motion.button>

      {/* EXPAND PANEL */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 px-7 pb-10 sm:grid-cols-[1.05fr_1fr] sm:gap-12 sm:px-10 sm:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                className="aspect-[4/3] overflow-hidden rounded-2xl"
                style={{ backgroundColor: "rgba(0,0,0,0.22)" }}
              >
                <motion.img
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  src={card.image}
                  alt={card.tag}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <div className="flex flex-col justify-between gap-8">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.18 }}
                  className="text-[15px] leading-relaxed opacity-90 sm:text-[17px]"
                >
                  {card.body}
                </motion.p>

                <div className="grid grid-cols-2 gap-5">
                  {card.stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.26 + i * 0.07,
                      }}
                      className="pt-3"
                      style={{ borderTop: `1px solid ${card.ink}40` }}
                    >
                      <div className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-none tracking-tight">
                        {s.value}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] opacity-65">
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.45 }}
                >
                  <span
                    className="inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em]"
                    style={{ borderColor: card.ink }}
                  >
                    {card.cta}
                    <span aria-hidden>→</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function TenThings() {
  const [openId, setOpenId] = useState<string | null>("01");

  return (
    <section id="ten-things" className="bg-background px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/55">
              <span className="h-px w-10 bg-foreground/30" />
              <span>A field guide</span>
            </div>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[0.98] tracking-tight">
              Cut the marketing.
              <br />
              <span className="italic text-foreground/70">
                10 things you should know about Masters&rsquo; Union.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-foreground/60">
            Tap any row to open it — the receipts unfold inside.
          </p>
        </div>

        <LayoutGroup>
          <motion.div layout className="flex flex-col gap-4">
            {CARDS.map((c) => (
              <CardRow
                key={c.n}
                card={c}
                isOpen={openId === c.n}
                onToggle={() => setOpenId((curr) => (curr === c.n ? null : c.n))}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
