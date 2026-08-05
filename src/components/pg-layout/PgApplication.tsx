import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";
import { Cta } from "@/components/pg-layout/Cta";

const APPLICATION_STEPS = [
  {
    step: "01",
    title: "Complete the Application Form",
    summary:
      "Fill out your details and upload supporting documents so the admissions team can review your profile.",
    points: [
      "Latest resume — any clean, concise format works",
      "Qualification documents covering academics, work and extra-curriculars",
      "Optional: upload your CAT / GMAT / GMAT Focus score",
    ],
  },
  {
    step: "02",
    title: "MU-BAAT",
    summary:
      "The Masters' Union Business Aptitude & Admissions Test — an online, recorded conversation that evaluates business aptitude, clarity of thought and creative thinking.",
    points: [
      "45–60 minutes · 9 questions across 5 sections",
      "Only required if you haven't submitted a CAT / GMAT score you're happy with",
      "Test link is shared the day after the application deadline",
    ],
  },
  {
    step: "03",
    title: "Personal Interview",
    summary:
      "Shortlisted applicants are invited to an interview conducted by distinguished faculty members and seasoned industry leaders.",
    points: [
      "Invitations sent 3–5 days before the interview",
      "Faculty + operator panel evaluation",
      "Date, venue and time confirmed in advance",
    ],
  },
  {
    step: "04",
    title: "Final Admission Decision",
    summary: "The admissions committee slots applicants into accepted, waitlisted or not-accepted pools.",
    points: [
      "Offers include the full financial structure for the programme",
      "Waitlisted candidates are promoted on a rolling basis — no ranked list",
      "Not-accepted applicants may re-apply in the next academic year",
    ],
  },
];

export function PgApplication() {
  return (
    <section id="admissions" className="relative overflow-hidden section-band py-20 md:py-28">
      <div className="page-grid pointer-events-none absolute inset-0 opacity-[0.3]" />
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        <Reveal className="mb-9 max-w-3xl">
          <span className="eyebrow">Admissions</span>
          <h2 className="mt-4 font-tech text-4xl leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
            Four steps from application to <span className="text-gradient-brand">campus.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
            A holistic evaluation across academics, professional experience, communication and business
            aptitude. No cut-offs — the admissions committee reviews every profile in full.
          </p>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-2">
          {APPLICATION_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 80} as="li">
              <div className="card-elevated group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-baseline gap-4">
                  <div className="font-tech text-3xl leading-none text-teal/70 transition-colors group-hover:text-teal">
                    {s.step}
                  </div>
                  <div className="font-tech text-sm leading-tight text-ink">{s.title}</div>
                </div>
                <p className="text-sm leading-relaxed text-ink/60">{s.summary}</p>
                <ul className="mt-1 space-y-2 border-t border-ink/10 pt-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/60">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal/60" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={320} className="mt-8 grid gap-3 sm:grid-cols-3">
          <Cta href="#" label="Start application" />
          <a
            href="#"
            className="inline-flex items-center justify-between gap-3 border border-ink/15 bg-paper/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/5"
          >
            Talk to admissions <ArrowUpRight className="size-5" />
          </a>
          <a
            href="https://mastersunion.org/pgp-technology-and-business-management"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between gap-3 border border-ink/15 bg-paper/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/5"
          >
            Download brochure <ArrowUpRight className="size-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default PgApplication;
