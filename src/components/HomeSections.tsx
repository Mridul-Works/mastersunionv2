import { ArrowUpRight, ChevronLeft, ChevronRight, Hourglass, Quote, GraduationCap, Rocket, Briefcase, Users, Mic, ChefHat, Building2, Send, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const NEWS = [
  { tag: "Press", month: "Jun", day: "15", time: "09:00 AM", title: "Masters' Union ranked among India's top new-age B-schools", source: "Forbes India" },
  { tag: "Cohort", month: "May", day: "22", time: "11:30 AM", title: "PGP 2026 applications cross 18,000 — admit rate drops to 4%", source: "Inside MU" },
  { tag: "Founders", month: "Apr", day: "08", time: "02:15 PM", title: "Six student ventures featured on Shark Tank India S5", source: "Sony LIV" },
  { tag: "Faculty", month: "Mar", day: "29", time: "10:00 AM", title: "Kunal Shah joins as Distinguished Practitioner-in-Residence", source: "ET Now" },
];

const PROGRAMS = [
  { image: prog01, mode: "ON CAMPUS", duration: "2 YEARS", title: "PGP in Technology & Business Management", round: "Round 1 Applications Open" },
  { image: prog02, mode: "ON CAMPUS", duration: "1 YEAR", title: "PGP in Quantitative Finance & Business", round: "Round 2 Applications Open" },
  { image: prog03, mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Technology & Business Management", round: "Round 4 Applications Open" },
  { image: prog04, mode: "ON CAMPUS", duration: "4 YEARS", title: "UG Programme in Psychology & Marketing", round: "Round 4 Applications Open" },
];

const PEDAGOGY = [
  { icon: GraduationCap, tag: "01 · Faculty", title: "Taught by the people building the companies you study.", body: "40% of faculty are sitting CEOs, MDs and CXOs. 30% visiting from Harvard, Wharton, Kellogg and Booth. The slides update on Monday morning.", cta: "Meet the faculty" },
  { icon: Rocket, tag: "02 · Entrepreneurship", title: "30+ ventures. ₹593 Cr in combined valuation.", body: "An on-campus venture studio that handles incorporation, hiring, and warm intros to Sequoia, Blume and Y Combinator. Six alumni on Shark Tank India.", cta: "See the startups" },
  { icon: Briefcase, tag: "03 · Career", title: "100% placement. ₹61.98L highest CTC.", body: "28% of grads join as Founder's Office or Chief of Staff. 3× average pre-MBA salary jump and 10–20% annual growth post-grad.", cta: "Read the report" },
  { icon: Users, tag: "04 · Mentor Union", title: "500+ operators. Median response under an hour.", body: "Founders mid-build, investors mid-cheque, CMOs mid-quarter. No office hours, no waiting lists — just answers when you need them.", cta: "Browse mentors" },
  { icon: Mic, tag: "05 · Outclass", title: "Build your brand. Win the creator challenge.", body: "A full content studio on campus. 150+ active creators, 46M+ aggregate reach, and student-run channels that pay tuition before graduation.", cta: "See the creators" },
  { icon: ChefHat, tag: "06 · Food Lab", title: "A commercial kitchen inside a B-school.", body: "Lexi's went from a classroom concept to Gurgaon's highest-rated sandwich brand. FSSAI-certified production line, 4.5★ on Zomato, ₹1 Cr+ ARR.", cta: "Tour the lab" },
  { icon: Building2, tag: "07 · MU Ventures", title: "The fund that backs cohorts before convocation.", body: "An in-house venture arm that writes pre-seed cheques into student companies — and opens the door to a 200+ investor network for the next round.", cta: "Pitch the fund" },
];

export default function HomeSections() {
  return (
    <div className="bg-[#FAF8F4] text-[#16140F]">
      {/* NEWS */}
      <section id="news" className="border-t border-black/10">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="border-t-4 border-[#6B1F2A] pt-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B1F2A] mb-1">The Dispatch</p>
                <h2 className="font-display text-[1.35rem] font-bold leading-tight text-[#16140F] md:text-[1.8rem]">
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

            <div className="flex flex-nowrap overflow-x-auto snap-x border-y border-black/10 md:overflow-x-visible">
              {NEWS.map((n, i) => (
                <article
                  key={n.title}
                  className={`group flex min-w-[300px] flex-1 cursor-pointer snap-start gap-5 p-5 transition-all hover:bg-white md:min-w-0 ${
                    i !== NEWS.length - 1 ? "border-b border-black/10 md:border-b-0 md:border-r" : ""
                  }`}
                >
                  <div className="flex h-16 w-14 flex-shrink-0 flex-col items-center justify-center bg-[#6B1F2A] text-white shadow-sm transition-colors group-hover:bg-[#16140F]">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-tighter opacity-80">{n.month}</span>
                    <span className="font-display text-2xl font-extrabold leading-none">
                      {n.day}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                      {n.time} &bull; {n.tag}
                    </span>
                    <h3
                      className="font-display text-lg font-semibold leading-snug text-black/90 transition-colors group-hover:text-[#6B1F2A]"
                    >
                      {n.title}
                    </h3>
                    <p className="font-sans mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
                      Source: {n.source}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#"
                className="font-sans border-b-2 border-[#16140F] pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#16140F] transition-colors hover:border-[#6B1F2A] hover:text-[#6B1F2A]"
              >
                Enter Full Archive
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS / APPLICATIONS */}
      <section id="deadlines" className="border-t border-black/10 bg-[#FAF8F4]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="border-t-4 border-[#1F4D3F] pt-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1F4D3F] mb-1">Admissions · Cohort 2026</p>
                <h2 className="font-display text-[1.35rem] font-bold leading-tight text-[#16140F] md:text-[1.8rem]">
                  Programmes Accepting Applications
                </h2>
              </div>
              <a href="#" className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#16140F] underline-offset-4 hover:underline md:inline-flex items-center gap-1.5">
                View all programmes <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PROGRAMS.map((p) => (
                <article
                  key={p.title}
                  className="group flex flex-col gap-5 rounded-2xl border border-black/8 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] sm:flex-row sm:items-stretch sm:gap-5"
                >
                  <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-[44%]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#16140F] px-3 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-white">{p.mode}</span>
                      <span className="rounded-full bg-black/5 px-3 py-1 font-sans text-[10px] font-bold tracking-[0.14em] text-black/70">{p.duration}</span>
                    </div>
                    <h3 className="font-display mt-4 text-[1.15rem] font-bold leading-snug text-[#16140F] md:text-[1.25rem]">
                      {p.title}
                    </h3>
                    <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-[#E6F0E4] px-3 py-1.5">
                      <Hourglass className="size-3.5 text-[#1F4D3F]" />
                      <span className="font-sans text-[12px] font-semibold text-[#1F4D3F]">{p.round}</span>
                    </div>
                    <div className="mt-auto pt-5">
                      <div className="border-t border-black/10 pt-3">
                        <a href="#" className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-[#16140F] transition-colors group-hover:text-[#6B1F2A]">
                          Apply Now <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-black/10">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">A note from the founders</p>
              <div className="mt-8 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#C9A84C] via-[#8A3A12] to-[#1F4D3F] p-px">
                <div className="flex h-full w-full flex-col justify-end rounded-3xl bg-[#1A211A] p-8 text-white">
                  <Quote className="mb-6 size-7 text-[#C9A84C]" />
                  <p className="text-[14px] uppercase tracking-[0.2em] text-white/60">Pratham Mittal</p>
                  <p className="text-[12px] text-white/40">Founder · Masters' Union</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-4xl leading-[1.05] tracking-tight md:text-[64px]" style={{ fontFamily: "'Fraunces', serif" }}>
                "We didn't build another <span className="italic text-[#8A3A12]">business school</span>. We built the school we wished existed when we were starting up."
              </h2>
              <div className="mt-10 space-y-5 text-[16px] leading-[1.75] text-black/75 md:text-[17px]">
                <p>
                  Every founder I know learned the hard way — by losing money, mis-hiring, mispricing, and shipping the wrong thing first. That's an expensive curriculum. We wanted to compress it.
                </p>
                <p>
                  Masters' Union is what happens when sitting CEOs design the syllabus, when the final exam is a P&L statement, and when the campus is built next door to the companies you'll one day run or build alongside.
                </p>
                <p>
                  If you're tired of theory, allergic to fluff, and willing to ship in semester one — this is your school.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-black/50">
                <span className="rounded-full border border-black/15 px-4 py-2">Class of 2017, Wharton</span>
                <span className="rounded-full border border-black/15 px-4 py-2">Ex-Founder, OakNorth</span>
                <span className="rounded-full border border-black/15 px-4 py-2">Forbes 30u30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-black/10 bg-[#F1EFE7]">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The pedagogy" title={<>How Masters' Union <span className="italic text-[#8A3A12]">actually</span> teaches.</>} lede="Seven systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              const featured = i === 0;
              return (
                <article
                  key={p.tag}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-[#FAF8F4] p-8 transition-all hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:p-10 ${
                    featured ? "lg:col-span-2 lg:row-span-1 bg-[#1A211A] text-[#F4EFE3]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${featured ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-black/5 text-black/70"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${featured ? "text-white/50" : "text-black/40"}`}>{p.tag}</span>
                  </div>

                  <div className="mt-12">
                    <h3 className={`text-3xl leading-[1.05] tracking-tight md:text-[34px] ${featured ? "text-white" : ""}`} style={{ fontFamily: "'Fraunces', serif" }}>
                      {p.title}
                    </h3>
                    <p className={`mt-5 text-[14px] leading-relaxed ${featured ? "text-white/70" : "text-black/65"}`}>{p.body}</p>
                  </div>

                  <button type="button" className={`mt-10 inline-flex w-fit items-center gap-2 border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all ${featured ? "border-[#C9A84C] text-[#C9A84C]" : "border-black/30 text-black/70 group-hover:border-black group-hover:text-black"}`}>
                    {p.cta}
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section id="apply" className="border-t border-black/10 bg-[#FAF8F4]">
        <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-40">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#6B1F2A] via-[#1F4D3F] to-[#14233F] p-10 text-white md:p-20">
            <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[#C9A84C]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 size-[480px] rounded-full bg-[#8A3A12]/30 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">PGP · Cohort 2026</p>
                <h2 className="mt-6 text-5xl leading-[0.95] tracking-tight md:text-[88px]" style={{ fontFamily: "'Fraunces', serif" }}>
                  Apply to <span className="italic">Masters' Union.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
                  Submit a 4-question application. Hear back in 14 days. No GMAT, no essays about your childhood — we want to know what you've built or what you'd build with us.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Next deadline</p>
                  <p className="mt-3 text-3xl tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>15 Aug 2026</p>
                  <p className="mt-2 text-[12px] text-white/60">Round 1 · Early admit + scholarship</p>
                  <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A84C] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:scale-[1.02]">
                    Start application <Send className="size-3.5" />
                  </button>
                  <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/5">
                    Talk to admissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-[#0F140F] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-3xl leading-tight tracking-tight md:text-4xl" style={{ fontFamily: "'Fraunces', serif" }}>
                Masters' Union — <span className="italic text-[#C9A84C]">business education,<br />rebuilt for the next decade.</span>
              </p>
              <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C]">
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
          {Icon && <Icon className="size-4 text-[#8A3A12]" />}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/50">{eyebrow}</p>
        </div>
        <h2 className="mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ fontFamily: "'Fraunces', serif" }}>
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]">{title}</p>
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
