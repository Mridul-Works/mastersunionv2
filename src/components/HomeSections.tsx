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

export default function HomeSections() {
  return (
    <div className="bg-background text-foreground">
      {/* NEWS */}
      <section id="news" className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The wire" title="In the news" lede="Press, milestones and cohort moments — straight from the campus desk." icon={Newspaper} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {NEWS.map((n) => (
              <article key={n.title} className="group flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-card md:p-10">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1">{n.tag}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="font-display text-2xl leading-snug tracking-tight md:text-[28px]">
                  {n.title}
                </h3>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-5 text-[12px] text-muted-foreground">
                  <span>{n.source}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION DEADLINES */}
      <section id="deadlines" className="border-t border-border bg-charcoal text-background">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Admissions · Cohort 2026</p>
              <h2 className="font-display mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl">
                Three rounds.<br />
                <span className="text-accent">One decision.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                Apply early. Scholarship pools shrink with every round, and ~80% of seats are filled by the time Round 3 opens.
              </p>
            </div>
            <button type="button" className="self-start rounded-full bg-accent px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-foreground transition-transform hover:scale-[1.02]">
              Start application
            </button>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {DEADLINES.map((d, i) => (
              <div key={d.round} className="flex flex-col gap-6 bg-charcoal p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">{String(i + 1).padStart(2, "0")} · {d.round}</span>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${d.status === "Open" ? "bg-accent/20 text-accent" : "bg-white/10 text-white/60"}`}>{d.status}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <Calendar className="size-5 text-accent" />
                  <span className="font-display text-3xl tracking-tight md:text-4xl">{d.date}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-white/70">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER'S MESSAGE */}
      <section id="founders" className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">A note from the founders</p>
              <div className="mt-8 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent/70 to-charcoal p-px">
                <div className="flex h-full w-full flex-col justify-end rounded-3xl bg-charcoal p-8 text-white">
                  <Quote className="mb-6 size-7 text-accent" />
                  <p className="text-[14px] uppercase tracking-[0.2em] text-white/60">Pratham Mittal</p>
                  <p className="text-[12px] text-white/40">Founder · Masters' Union</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-[64px]">
                "We didn't build another <span className="text-accent">business school</span>. We built the school we wished existed when we were starting up."
              </h2>
              <div className="mt-10 space-y-5 text-[16px] leading-[1.75] text-foreground/75 md:text-[17px]">
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

              <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="rounded-full border border-border px-4 py-2">Class of 2017, Wharton</span>
                <span className="rounded-full border border-border px-4 py-2">Ex-Founder, OakNorth</span>
                <span className="rounded-full border border-border px-4 py-2">Forbes 30u30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY */}
      <section id="pedagogy" className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHead eyebrow="The pedagogy" title={<>How Masters' Union <span className="text-accent">actually</span> teaches.</>} lede="Seven systems that work in concert — built so theory never outpaces practice." />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PEDAGOGY.map((p, i) => {
              const Icon = p.icon;
              const featured = i === 0;
              return (
                <article
                  key={p.tag}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:p-10 ${
                    featured ? "lg:col-span-2 lg:row-span-1 bg-charcoal text-background" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${featured ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${featured ? "text-white/50" : "text-muted-foreground"}`}>{p.tag}</span>
                  </div>

                  <div className="mt-12">
                    <h3 className={`font-display text-3xl leading-[1.05] tracking-tight md:text-[34px] ${featured ? "text-white" : ""}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-5 text-[14px] leading-relaxed ${featured ? "text-white/70" : "text-foreground/65"}`}>{p.body}</p>
                  </div>

                  <button type="button" className={`mt-10 inline-flex w-fit items-center gap-2 border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all ${featured ? "border-accent text-accent" : "border-foreground/30 text-foreground/70 group-hover:border-foreground group-hover:text-foreground"}`}>
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
      <section id="apply" className="border-t border-border bg-background">
        <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-40">
          <div className="relative overflow-hidden rounded-[40px] bg-charcoal p-10 text-white md:p-20">
            <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 size-[480px] rounded-full bg-accent/30 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">PGP · Cohort 2026</p>
                <h2 className="font-display mt-6 text-5xl leading-[0.95] tracking-tight md:text-[88px]">
                  Apply to <span className="text-accent">Masters' Union.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
                  Submit a 4-question application. Hear back in 14 days. No GMAT, no essays about your childhood — we want to know what you've built or what you'd build with us.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Next deadline</p>
                  <p className="font-display mt-3 text-3xl tracking-tight">15 Aug 2026</p>
                  <p className="mt-2 text-[12px] text-white/60">Round 1 · Early admit + scholarship</p>
                  <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-foreground transition-transform hover:scale-[1.02]">
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
      <footer className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                Masters' Union — <span className="text-accent">business education,<br />rebuilt for the next decade.</span>
              </p>
              <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/55">
                DLF Cyberpark, Phase III<br />
                Gurugram 122002, India<br />
                hello@mastersunion.org
              </p>
              <div className="mt-8 flex items-center gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent hover:text-accent">
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
          {Icon && <Icon className="size-4 text-accent" />}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>
        </div>
        <h2 className="font-display mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl">
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">{lede}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{title}</p>
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
