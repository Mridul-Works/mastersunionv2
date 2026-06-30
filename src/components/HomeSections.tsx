import { useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Hourglass, Quote, GraduationCap, Rocket, Briefcase, Users, Mic, ChefHat, Building2, Send, Instagram, Linkedin, Youtube, Twitter, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import founderPhoto from "@/assets/pratham-chest.png.asset.json";
import undergraduateAsset from "@/assets/programs/editorial-undergraduate.jpg.asset.json";
import postgraduateAsset from "@/assets/programs/editorial-postgraduate.jpg.asset.json";
import executiveAsset from "@/assets/programs/editorial-executive.jpg.asset.json";
import immersionAsset from "@/assets/programs/editorial-immersions.jpg.asset.json";
import familyBusinessAsset from "@/assets/programs/editorial-family-business.jpg.asset.json";
import aiAsset from "@/assets/programs/editorial-ai.jpg.asset.json";
import venturesAsset from "@/assets/programs/editorial-ventures.jpg.asset.json";
import globalAsset from "@/assets/programs/editorial-global.jpg.asset.json";
import b2bAsset from "@/assets/programs/editorial-b2b.jpg.asset.json";

const PROGRAM_STAGES = [
  { name: "Undergraduate", image: undergraduateAsset.url, accent: "#E8A87C", gradient: "linear-gradient(135deg, #FCE5D8 0%, #F8D4A8 50%, #F0E8D4 100%)", textOn: "#1A1208", pathway: "Build foundations through real-world learning.", offerings: ["Technology & Business", "Data Science & AI", "Finance & Economics", "Psychology & Marketing"], href: "https://mastersunion.org/undergraduate" },
  { name: "Postgraduate", image: postgraduateAsset.url, accent: "#C9A0DC", gradient: "linear-gradient(135deg, #E8D4E8 0%, #F8D4A8 45%, #D4E8F0 100%)", textOn: "#1A1208", pathway: "Accelerate your career through execution.", offerings: ["PGP in Technology & Business Management", "Young Leaders Programme", "Career acceleration", "Venture building"], href: "https://mastersunion.org/postgraduate" },
  { name: "Executive", image: executiveAsset.url, accent: "#F0A0A0", gradient: "linear-gradient(135deg, #F5D2C8 0%, #F0A0A0 55%, #E8D4E8 100%)", textOn: "#1A1208", pathway: "Transform leadership through practical learning.", offerings: ["Leadership development", "General management", "Executive programmes", "Applied strategy"], href: "https://mastersunion.org/executive-education" },
  { name: "Immersions", image: immersionAsset.url, accent: "#A8C0A0", gradient: "linear-gradient(135deg, #E8F4E8 0%, #D8E8C8 50%, #E8E2BC 100%)", textOn: "#0F1A05", pathway: "Bharat Summer Schools, Travel-Based Learnings, intensive bootcamps.", offerings: ["Bharat Summer Schools", "Travel-Based Learnings", "D2C Bootcamps", "AI Bootcamps"], href: "https://mastersunion.org/experiencesatmastersunion" },
  { name: "Family Business", image: familyBusinessAsset.url, accent: "#D4A8D8", gradient: "linear-gradient(135deg, #F0D8E8 0%, #D4A8D8 50%, #E8D4E8 100%)", textOn: "#160820", pathway: "Scale and transform legacy businesses.", offerings: ["Scale legacy businesses", "Navigate succession", "Drive transformation", "Build the next chapter"], href: "https://mastersunion.org/family-business" },
  { name: "AI", image: aiAsset.url, accent: "#8AC8E0", gradient: "linear-gradient(135deg, #D8EEF2 0%, #8AC8E0 45%, #E8D4E8 100%)", textOn: "#040E1F", pathway: "Create products and businesses powered by AI.", offerings: ["AI products", "Applied intelligence", "Business automation", "Venture creation"], href: "https://mastersunion.org/ai" },
  { name: "Ventures", image: venturesAsset.url, accent: "#E88AAB", gradient: "linear-gradient(135deg, #F5D2C8 0%, #E88AAB 50%, #F8D4A8 100%)", textOn: "#1A0408", pathway: "Build, launch and fund new ideas.", offerings: ["Incubation", "Funding", "Founder support", "Builder ecosystem"], href: "https://mastersunion.org/student-entrepreneurship" },
  { name: "Global", image: globalAsset.url, accent: "#8A9ED8", gradient: "linear-gradient(135deg, #D4E8F0 0%, #8A9ED8 50%, #E8D4E8 100%)", textOn: "#050F2E", pathway: "Experience business beyond borders.", offerings: ["Global campuses", "International faculty", "Company visits", "Cross-border networks"], href: "https://mastersunion.org/undergraduate-global" },
  { name: "B2B", image: b2bAsset.url, accent: "#98C8A8", gradient: "linear-gradient(135deg, #E8F4F0 0%, #98C8A8 50%, #E8E2BC 100%)", textOn: "#04140D", pathway: "Transform teams and organizations.", offerings: ["Corporate learning", "Workforce transformation", "Custom programmes", "Leadership academies"], href: "https://mastersunion.org/enterprise" },
] as const;

function Programs() {
  const [active, setActive] = useState(0);
  const stage = PROGRAM_STAGES[active];
  return (
    <section id="programs" className="border-t border-black/10 bg-gradient-to-b from-[#FDF8F0] via-[#F0E8F4] to-[#E8F0F8]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/50">Programmes</p>
            <h2
              className="mt-4 text-[clamp(2.6rem,6.5vw,5.2rem)] font-light leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Build your <span className="italic font-extralight">way.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-[14px] leading-relaxed text-black/65">
            9 distinct pathways. One shared obsession — real businesses, not case studies.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {/* Featured pastel card */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9] lg:aspect-[24/9]"
            style={{ background: stage.gradient }}
          >
            <img
              key={stage.name}
              src={stage.image}
              alt={`Editorial — ${stage.name}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: stage.accent }} />

            {/* Vertical index */}
            <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:right-8 lg:block">
              <span
                className="block text-[clamp(2.4rem,5vw,4.5rem)] font-light tracking-tighter text-black/10"
                style={{ transform: "rotate(90deg)", fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                0{active + 1}/09
              </span>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-[640px]">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-black/60">
                  <span>0{active + 1}</span>
                  <span className="h-px w-8 bg-black/30" />
                  <span>Featured pathway</span>
                </div>
                <h3
                  className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1] tracking-tight text-black"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {stage.name}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-black/80">
                  {stage.pathway}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-black/75">
                  {stage.offerings.map((o) => (
                    <li key={o} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-black/70" />
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href={stage.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-black/40 pb-1 text-[11px] font-medium uppercase tracking-[0.3em] text-black transition-colors hover:border-black"
                >
                  View all
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Programme grid */}
          <nav aria-label="Programmes">
            <ol className="grid grid-cols-3 gap-1 border border-black/10 bg-white/40 p-2 backdrop-blur-sm sm:grid-cols-5 lg:grid-cols-9">
              {PROGRAM_STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex w-full flex-col items-start gap-2 px-3 py-3 text-left transition ${
                        isActive ? "bg-black text-[#F2E8D3]" : "text-[#1C1C1C] hover:bg-black/5"
                      }`}
                    >
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60"
                        style={isActive ? { color: s.accent, opacity: 1 } : undefined}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[13px] font-medium leading-tight tracking-tight">{s.name}</span>
                      <span
                        className="mt-1 h-[2px] w-8 transition"
                        style={{ backgroundColor: isActive ? s.accent : "rgba(28,28,28,0.15)" }}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

const NEWS = [
  { tag: "Press", month: "Jun", day: "15", time: "09:00 AM", title: "Masters' Union ranked among India's top new-age B-schools", source: "Forbes India" },
  { tag: "Cohort", month: "May", day: "22", time: "11:30 AM", title: "PGP 2026 applications cross 18,000 — admit rate drops to 4%", source: "Inside MU" },
  { tag: "Founders", month: "Apr", day: "08", time: "02:15 PM", title: "Six student ventures featured on Shark Tank India S5", source: "Sony LIV" },
  { tag: "Faculty", month: "Mar", day: "29", time: "10:00 AM", title: "Kunal Shah joins as Distinguished Practitioner-in-Residence", source: "ET Now" },
];

const PROGRAMS = [
  { mode: "ON CAMPUS", duration: "2 YEARS", title: "PGP in Technology & Business Management", round: "Round 1 Applications Open" },
  { mode: "ON CAMPUS", duration: "1 YEAR", title: "PGP in Quantitative Finance & Business", round: "Round 2 Applications Open" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Technology & Business Management", round: "Round 4 Applications Open" },
  { mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Psychology & Marketing", round: "Round 4 Applications Open" },
];

const PEDAGOGY = [
  { icon: GraduationCap, tag: "01 · Faculty", title: "Taught by the people building the companies you study.", body: "40% of faculty are sitting CEOs, MDs and CXOs. 30% visiting from Harvard, Wharton, Kellogg and Booth. The slides update on Monday morning.", stats: [{ value: "40%", label: "Industry practitioners" }, { value: "200+", label: "Visiting experts" }, { value: "30%", label: "Ivy-league visiting" }], cta: "Meet the faculty", route: "/faculty" },
  { icon: Rocket, tag: "02 · Entrepreneurship", title: "30+ ventures. ₹593 Cr in combined valuation.", body: "An on-campus venture studio that handles incorporation, hiring, and warm intros to Sequoia, Blume and Y Combinator. Six alumni on Shark Tank India.", stats: [{ value: "30+", label: "Active startups" }, { value: "₹593 Cr", label: "Combined valuation" }, { value: "6", label: "On Shark Tank India" }], cta: "See the startups", route: "/startups" },
  { icon: Briefcase, tag: "03 · Career", title: "100% placement. ₹61.98L highest CTC.", body: "28% of grads join as Founder's Office or Chief of Staff. 3× average pre-MBA salary jump and 10–20% annual growth post-grad.", stats: [{ value: "₹61.98L", label: "Highest CTC" }, { value: "3×", label: "Average salary jump" }, { value: "100%", label: "Placement" }], cta: "Read the report", route: "/placements" },
  { icon: Users, tag: "04 · Mentor Union", title: "500+ operators. Median response under an hour.", body: "Founders mid-build, investors mid-cheque, CMOs mid-quarter. No office hours, no waiting lists — just answers when you need them.", stats: [{ value: "500+", label: "Mentors" }, { value: "<1 hr", label: "Median response" }, { value: "On demand", label: "Always on" }], cta: "Browse mentors", route: "/mentors" },
  { icon: ShoppingCart, tag: "05 · D2C Challenge", title: "Real revenue. Real stores. Real P&L.", body: "Students launch live dropshipping stores and get graded on the market, not the memo. 50 teams. ₹3.38 Cr in cohort revenue. The top store did ₹45L in eight weeks.", stats: [{ value: "₹3.38 Cr", label: "Cohort revenue" }, { value: "₹45L", label: "Top team" }, { value: "50", label: "Live teams" }], cta: "See the scoreboard", route: "/how-we-teach" },
  { icon: Mic, tag: "06 · Creator Challenge", title: "Build your brand. Win the creator challenge.", body: "A full content studio on campus. 150+ active creators, 46M+ aggregate reach, and student-run channels that pay tuition before graduation.", stats: [{ value: "46M+", label: "Aggregate reach" }, { value: "150+", label: "Active creators" }, { value: "100+", label: "Channels built" }], cta: "See the creators", route: "/creator-challenge" },
  { icon: ChefHat, tag: "07 · Food Lab", title: "A commercial kitchen inside a B-school.", body: "Lexi's went from a classroom concept to Gurgaon's highest-rated sandwich brand. FSSAI-certified production line, 4.5★ on Zomato, ₹1 Cr+ ARR.", stats: [{ value: "4.5★", label: "Zomato rating" }, { value: "₹1 Cr+", label: "Student brand ARR" }, { value: "FSSAI", label: "Certified" }], cta: "Tour the lab", route: "/food-lab" },
  { icon: Building2, tag: "08 · MU Ventures", title: "The fund that backs cohorts before convocation.", body: "An in-house venture arm that writes pre-seed cheques into student companies — and opens the door to a 200+ investor network for the next round.", stats: [{ value: "200+", label: "Investor network" }, { value: "Pre-seed", label: "Cheques written" }, { value: "On campus", label: "Venture arm" }], cta: "Pitch the fund", route: "/startups" },
] as const;

export default function HomeSections() {
  return (
    <div className="bg-white text-black" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* NEWS */}
      <section id="news" className="border-t border-black/10">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-18">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60 mb-1">The Dispatch</p>
              <h2 className="font-display text-[1.35rem] font-bold leading-tight text-black md:text-[1.8rem]">
                Latest News
              </h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                <ChevronLeft className="size-4 text-black/60" />
              </button>
              <button type="button" className="p-2 border border-black/10 transition-colors hover:bg-black/5">
                <ChevronRight className="size-4 text-black/60" />
              </button>
            </div>
          </div>

          <div className="flex flex-nowrap gap-4 overflow-x-auto snap-x md:overflow-x-visible md:gap-6">
            {NEWS.map((n) => (
              <article
                key={n.title}
                className="group flex min-w-[300px] flex-1 cursor-pointer snap-start gap-5 p-5 transition-all hover:bg-black/[0.03] md:min-w-0"
              >
                <div className="flex h-16 w-14 flex-shrink-0 flex-col items-center justify-center bg-black text-white shadow-sm transition-colors group-hover:bg-neutral-700">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-tighter opacity-80">{n.month}</span>
                  <span className="font-display text-2xl font-extrabold leading-none">
                    {n.day}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    {n.time} &bull; {n.tag}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug text-black/90 transition-colors group-hover:text-black">
                    {n.title}
                  </h3>
                  <p className="font-sans mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Source: {n.source}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="font-sans border-b-2 border-black pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-black/50 hover:text-black/60"
            >
              Enter Full Archive
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMS / APPLICATIONS */}
      <section id="deadlines" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-18">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60 mb-1">Admissions · Cohort 2026</p>
              <h2 className="font-display text-[1.35rem] font-bold leading-tight text-black md:text-[1.8rem]">
                Programmes Accepting Applications
              </h2>
            </div>
            <a href="#" className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-black underline-offset-4 hover:underline md:inline-flex items-center gap-1.5">
              View all programmes <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <div className="flex flex-nowrap gap-4 overflow-x-auto snap-x md:overflow-x-visible md:gap-6">
            {PROGRAMS.map((p) => (
              <article
                key={p.title}
                className="group flex min-w-[280px] flex-1 cursor-pointer snap-start flex-col gap-6 border border-black/10 bg-white p-6 transition-all hover:bg-black/[0.03] md:min-w-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-none bg-black px-3 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-white">{p.mode}</span>
                  <span className="rounded-none bg-black/5 px-3 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-black/70">{p.duration}</span>
                </div>
                <h3 className="font-display text-[1.15rem] font-bold leading-snug text-black md:text-[1.25rem]">
                  {p.title}
                </h3>
                <div className="inline-flex w-fit items-center gap-2 rounded-none bg-black/5 px-3 py-1.5">
                  <Hourglass className="size-3.5 text-black/70" />
                  <span className="font-sans text-[12px] font-semibold text-black/80">{p.round}</span>
                </div>
                <div className="mt-auto pt-4">
                  <a href="#" className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-black transition-colors group-hover:text-black/70">
                    Apply Now <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-6 md:px-10 md:py-8">
          <div className="relative grid rounded-none bg-black md:grid-cols-12 min-h-[360px] md:min-h-[420px]">
            <div className="relative flex items-end justify-center md:col-span-4">
              <img
                src={founderPhoto.url}
                alt="Pratham Mittal"
                className="h-[360px] w-full object-contain object-bottom md:h-[420px]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:col-span-8 md:p-8 lg:p-10">
              <Quote className="mb-3 size-5 text-white/70" />
              <h2 className="text-lg leading-[1.1] tracking-tight text-white md:text-[22px] lg:text-[26px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                "If education was working, we wouldn't have built <span className="italic text-white">Masters' Union.</span>"
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-px w-8 bg-white/40" />
                <div>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Pratham Mittal</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/50">Founder, Masters' Union</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <Programs />

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The pedagogy" title={<>How Masters' Union <span className="italic">actually</span> teaches.</>} lede="Eight systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              const featured = i === 0;
              return (
                <Link
                  key={p.tag}
                  to={p.route}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-none border border-black/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:p-10 ${
                    featured ? "lg:col-span-2 lg:row-span-1" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-none ${featured ? "bg-black text-white" : "bg-black/5 text-black/70"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">{p.tag}</span>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-3xl leading-[1.05] tracking-tight text-black md:text-[34px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[14px] leading-relaxed text-black/65">{p.body}</p>
                  </div>

                  {p.stats && (
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-black/10 pt-5">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <div className="text-[21px] font-semibold tracking-tight text-black">{s.value}</div>
                          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className={`mt-10 inline-flex w-fit items-center gap-2 border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all ${featured ? "border-black text-black" : "border-black/30 text-black/70 group-hover:border-black group-hover:text-black"}`}>
                    {p.cta}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section id="apply" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-40">
          <div className="relative overflow-hidden rounded-none bg-black p-10 text-white md:p-20">
            <div className="absolute -right-24 -top-24 size-[420px] rounded-none bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 size-[480px] rounded-none bg-white/5 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">PGP · Cohort 2026</p>
                <h2 className="mt-6 text-5xl leading-[0.95] tracking-tight md:text-[88px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Apply to <span className="italic">Masters' Union.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
                  Submit a 4-question application. Hear back in 14 days. No GMAT, no essays about your childhood — we want to know what you've built or what you'd build with us.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-none border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Next deadline</p>
                  <p className="mt-3 text-3xl tracking-tight" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>15 Aug 2026</p>
                  <p className="mt-2 text-[12px] text-white/60">Round 1 · Early admit + scholarship</p>
                  <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-none bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:scale-[1.02]">
                    Start application <Send className="size-3.5" />
                  </button>
                  <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-none border border-white/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/5">
                    Talk to admissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-3xl leading-tight tracking-tight md:text-4xl" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Masters' Union — <span className="italic text-white/70">business education,<br />rebuilt for the next decade.</span>
              </p>
              <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center rounded-none border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol title="Programs" links={["PGP in Tech & Business Management", "PGP in Quantitative Finance", "UG in Tech & Business Management", "Executive Programs"]} />
            <FooterCol title="Campus" links={["Faculty", "Mentors", "Outclass", "Food Lab", "MU Ventures"]} />
            <FooterCol title="Connect" links={["Admissions", "Press & Media", "Careers at MU", "Brochure (PDF)"]} />
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-white/40 md:flex-row md:items-center">
            <span>© 2026 Masters' Union Education Pvt. Ltd.</span>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white/80">Privacy</a>
              <a href="#" className="hover:text-white/80">Terms</a>
              <a href="#" className="hover:text-white/80">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, lede, icon: Icon }: { eyebrow: string; title: React.ReactNode; lede: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-4 text-black/70" />}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">{eyebrow}</p>
        </div>
        <h2 className="mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-black/60">{lede}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px] text-white/70 transition-colors hover:text-white">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
