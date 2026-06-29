import { ArrowUpRight, Calendar, Newspaper, Quote, GraduationCap, Rocket, Briefcase, Users, Mic, ChefHat, Building2, Send, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const NEWS = [
  { tag: "Press", date: "Jun 2026", title: "Masters' Union ranked among India's top new-age B-schools", source: "Forbes India" },
  { tag: "Cohort", date: "May 2026", title: "PGP 2026 applications cross 18,000 — admit rate drops to 4%", source: "Inside MU" },
  { tag: "Founders", date: "Apr 2026", title: "Six student ventures featured on Shark Tank India S5", source: "Sony LIV" },
  { tag: "Faculty", date: "Mar 2026", title: "Kunal Shah joins as Distinguished Practitioner-in-Residence", source: "ET Now" },
];

const DEADLINES = [
  { round: "Round 1", date: "15 Aug 2026", note: "Early admit · highest scholarship pool", status: "Open" },
  { round: "Round 2", date: "30 Sep 2026", note: "Standard pool · interviews rolling", status: "Open" },
  { round: "Round 3", date: "15 Nov 2026", note: "Final round · limited seats", status: "Soon" },
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

const INK = "#111111";
const PAPER = "#F9F9F9";
const SIGNAL = "#FF4D00";

export default function HomeSections() {
  return (
    <div className="bg-[#F9F9F9] text-[#111111] font-['Geist']">
      {/* NEWS */}
      <section id="news" className="border-t border-[#111111]">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <SectionHead eyebrow="[ The Wire // 01 ]" title={<>In the<br/>news.</>} lede="Press, milestones and cohort moments — straight from the campus desk." icon={Newspaper} />
          <div className="mt-16 grid gap-px border border-[#111111] bg-[#111111] md:grid-cols-2">
            {NEWS.map((n) => (
              <article key={n.title} className="group flex flex-col gap-6 bg-white p-8 transition-colors hover:bg-[#F9F9F9] md:p-10">
                <div className="flex items-center justify-between font-['Geist'] text-[10px] font-medium uppercase tracking-[0.22em] text-[#111111]/60">
                  <span className="bg-[#FF4D00] px-2 py-1 text-white">{n.tag}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-[28px]">
                  {n.title}
                </h3>
                <div className="mt-auto flex items-center justify-between border-t border-[#111111]/15 pt-5 font-['Geist'] text-[11px] uppercase tracking-[0.18em] text-[#111111]/60">
                  <span>{n.source}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION DEADLINES */}
      <section id="deadlines" className="border-t border-[#111111] bg-[#111111] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-['Geist'] text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF4D00]">[ Admissions // Cohort 2026 ]</p>
              <h2 className="mt-6 text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-7xl">
                Three rounds.<br />
                <span className="font-['Instrument_Serif'] italic font-normal normal-case tracking-normal text-[#FF4D00]">one decision.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                Apply early. Scholarship pools shrink with every round, and ~80% of seats are filled by the time Round 3 opens.
              </p>
            </div>
            <button type="button" className="self-start bg-[#FF4D00] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111]">
              Start application
            </button>
          </div>

          <div className="mt-16 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
            {DEADLINES.map((d, i) => (
              <div key={d.round} className="flex flex-col gap-6 bg-[#111111] p-8 md:p-10">
                <div className="flex items-center justify-between font-['Geist'] text-[10px] font-medium uppercase tracking-[0.22em]">
                  <span className="text-white/55">{String(i + 1).padStart(2, "0")} / {d.round}</span>
                  <span className={`px-2 py-1 ${d.status === "Open" ? "bg-[#FF4D00] text-white" : "border border-white/30 text-white/70"}`}>{d.status}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <Calendar className="size-5 text-[#FF4D00]" />
                  <span className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{d.date}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-white/70">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-[#111111]">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-['Geist'] text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF4D00]">[ A note from the founders ]</p>
              <div className="mt-8 aspect-[4/5] w-full border border-[#111111] bg-[#111111]">
                <div className="flex h-full w-full flex-col justify-end p-8 text-white">
                  <Quote className="mb-6 size-8 text-[#FF4D00]" />
                  <p className="font-['Geist'] text-[11px] uppercase tracking-[0.22em] text-white/70">Pratham Mittal</p>
                  <p className="font-['Geist'] text-[10px] uppercase tracking-[0.22em] text-white/40">Founder · Masters' Union</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-4xl font-extrabold uppercase leading-[1.02] tracking-tighter md:text-[64px]">
                "We didn't build another <span className="font-['Instrument_Serif'] italic font-normal normal-case tracking-normal text-[#FF4D00]">business school</span>. We built the school we wished existed when we were starting up."
              </h2>
              <div className="mt-10 space-y-5 text-[16px] leading-[1.7] text-[#111111]/75 md:text-[17px]">
                <p>
                  Every founder I know learned the hard way — by losing money, mis-hiring, mispricing, and shipping the wrong thing first. That's an expensive curriculum. We wanted to compress it.
                </p>
                <p>
                  Masters' Union is what happens when sitting CEOs design the syllabus, when the final exam is a P&amp;L statement, and when the campus is built next door to the companies you'll one day run or build alongside.
                </p>
                <p>
                  If you're tired of theory, allergic to fluff, and willing to ship in semester one — this is your school.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 font-['Geist'] text-[10px] uppercase tracking-[0.2em] text-[#111111]/60">
                <span className="border border-[#111111] px-4 py-2">Class of 2017, Wharton</span>
                <span className="border border-[#111111] px-4 py-2">Ex-Founder, OakNorth</span>
                <span className="border border-[#111111] px-4 py-2">Forbes 30u30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-[#111111] bg-[#F9F9F9]">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <SectionHead eyebrow="[ The Pedagogy // 02 ]" title={<>How Masters' Union <span className="font-['Instrument_Serif'] italic font-normal normal-case tracking-normal text-[#FF4D00]">actually</span> teaches.</>} lede="Seven systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid gap-px border border-[#111111] bg-[#111111] md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              const featured = i === 0;
              return (
                <article
                  key={p.tag}
                  className={`group relative flex flex-col justify-between p-8 transition-colors md:p-10 ${
                    featured ? "lg:col-span-2 bg-[#111111] text-white hover:bg-[#1a1a1a]" : "bg-white hover:bg-[#F9F9F9]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center ${featured ? "bg-[#FF4D00] text-white" : "bg-[#111111] text-white"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className={`font-['Geist'] text-[10px] font-medium uppercase tracking-[0.22em] ${featured ? "text-[#FF4D00]" : "text-[#111111]/55"}`}>{p.tag}</span>
                  </div>

                  <div className="mt-12">
                    <h3 className={`text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-[30px] ${featured ? "text-white" : "text-[#111111]"}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-5 text-[14px] leading-relaxed ${featured ? "text-white/70" : "text-[#111111]/70"}`}>{p.body}</p>
                  </div>

                  <button type="button" className={`mt-10 inline-flex w-fit items-center gap-2 font-['Geist'] text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${featured ? "text-[#FF4D00] hover:text-white" : "text-[#111111] hover:text-[#FF4D00]"}`}>
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
      <section id="apply" className="border-t border-[#111111] bg-[#F9F9F9]">
        <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
          <div className="relative overflow-hidden border border-[#111111] bg-[#111111] p-10 text-white md:p-20">
            <div className="absolute right-0 top-0 h-2 w-full bg-[#FF4D00]" />

            <div className="relative grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="font-['Geist'] text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF4D00]">[ PGP // Cohort 2026 ]</p>
                <h2 className="mt-6 text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-[96px]">
                  Apply to<br /><span className="font-['Instrument_Serif'] italic font-normal normal-case tracking-normal text-[#FF4D00]">Masters' Union.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
                  Submit a 4-question application. Hear back in 14 days. No GMAT, no essays about your childhood — we want to know what you've built or what you'd build with us.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="border border-white/20 bg-white/5 p-6">
                  <p className="font-['Geist'] text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">Next deadline</p>
                  <p className="mt-3 text-3xl font-extrabold uppercase tracking-tight">15 Aug 2026</p>
                  <p className="mt-2 font-['Geist'] text-[10px] uppercase tracking-[0.18em] text-white/55">Round 1 · Early admit + scholarship</p>
                  <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 bg-[#FF4D00] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111]">
                    Start application <Send className="size-3.5" />
                  </button>
                  <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 border border-white/30 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/10">
                    Talk to admissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#111111] bg-[#111111] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tighter md:text-4xl">
                Masters' Union<br /><span className="font-['Instrument_Serif'] italic font-normal normal-case tracking-normal text-[#FF4D00]">— business education,<br />rebuilt for the next decade.</span>
              </h2>
              <p className="mt-8 max-w-sm font-['Geist'] text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-2">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-white">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol title="Programs" links={["PGP in Tech & Business Management", "PGP in Quantitative Finance", "UG in Tech & Business Management", "Executive Programs"]} />
            <FooterCol title="Campus" links={["Faculty", "Mentors", "Outclass", "Food Lab", "MU Ventures"]} />
            <FooterCol title="Connect" links={["Admissions", "Press & Media", "Careers at MU", "Brochure (PDF)"]} />
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 font-['Geist'] text-[10px] uppercase tracking-[0.22em] text-white/45 md:flex-row md:items-center">
            <span>DESIGN REF // SWISS_01 — © 2026 Masters' Union Education Pvt. Ltd.</span>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-[#FF4D00]">Privacy</a>
              <a href="#" className="hover:text-[#FF4D00]">Terms</a>
              <a href="#" className="hover:text-[#FF4D00]">Code of Conduct</a>
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
          {Icon && <Icon className="size-4 text-[#FF4D00]" />}
          <p className="font-['Geist'] text-[11px] font-medium uppercase tracking-[0.22em] text-[#FF4D00]">{eyebrow}</p>
        </div>
        <h2 className="mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-7xl">
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-[#111111]/65">{lede}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="font-['Geist'] text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4D00]">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[13px] font-medium uppercase tracking-tight text-white/70 transition-colors hover:text-[#FF4D00]">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
