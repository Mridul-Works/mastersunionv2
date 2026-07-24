import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, Minus, MapPin, Clock } from "lucide-react";

export type Term = {
  n: number;
  title: string;
  summary: string;
  outcomes: string[];
  courses: string[];
  challenge: { name: string; description: string };
};

export type Edge = { title: string; body: string };
export type FacultyMember = { name: string; role: string; org: string };
export type Testimonial = { name: string; role: string; quote: string };
export type Venture = { founder: string; startup: string; description: string };

export type ProgrammeData = {
  name: string;
  shortName: string;
  tagline: string;
  duration: string;
  mode: string;
  commencement: string;
  intro: string;
  whyNow: string[];
  edge: Edge[];
  terms: Term[];
  faculty: FacultyMember[];
  testimonials?: Testimonial[];
  ventures?: Venture[];
  immersions?: string[];
  jobRoles?: string[];
};

export default function ProgrammePage({ data }: { data: ProgrammeData }) {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-neutral-900">
      <TopBar />
      <Hero data={data} />
      <WhyNow data={data} />
      <EdgeSection data={data} />
      <Curriculum terms={data.terms} />
      {data.ventures && data.ventures.length > 0 && <VenturesSection ventures={data.ventures} />}
      {data.immersions && data.immersions.length > 0 && <Immersions items={data.immersions} />}
      <Faculty roster={data.faculty} />
      {data.testimonials && data.testimonials.length > 0 && <Testimonials list={data.testimonials} />}
      {data.jobRoles && data.jobRoles.length > 0 && <JobRoles roles={data.jobRoles} />}
      <CTA name={data.name} />
    </div>
  );
}

function TopBar() {
  return (
    <div className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">
        <Link to="/" className="text-sm font-medium tracking-widest uppercase">
          Masters&apos; Union
        </Link>
        <Link
          to="/applications_center"
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white transition"
        >
          Apply <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Hero({ data }: { data: ProgrammeData }) {
  return (
    <section className="px-10 pt-16 pb-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
          Post-Graduate Programme
        </div>
        <h1 className="font-[Fraunces] font-light text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-5xl">
          {data.name}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-neutral-600 max-w-3xl leading-relaxed">
          {data.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <Meta icon={<Clock className="w-4 h-4" />} label={data.duration} />
          <Meta icon={<MapPin className="w-4 h-4" />} label={data.mode} />
          <Meta icon={null} label={`Commences ${data.commencement}`} />
        </div>
      </div>
    </section>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-700">
      {icon}
      <span className="uppercase tracking-widest text-xs font-medium">{label}</span>
    </div>
  );
}

function WhyNow({ data }: { data: ProgrammeData }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
            About the programme
          </div>
          <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight">
            Why {data.shortName}, why now?
          </h2>
        </div>
        <div className="md:col-span-8 space-y-6 text-[15px] leading-relaxed text-neutral-700">
          <p className="text-lg text-neutral-900">{data.intro}</p>
          {data.whyNow.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function EdgeSection({ data }: { data: ProgrammeData }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
          The Masters&apos; Union edge
        </div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-2xl mb-12">
          What makes this programme different
        </h2>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {data.edge.map((e, i) => (
            <div key={i} className="border-t border-neutral-900 pt-5">
              <div className="text-xs font-mono text-neutral-500 mb-2">0{i + 1}</div>
              <h3 className="font-[Fraunces] text-xl md:text-2xl leading-snug mb-3">{e.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Curriculum({ terms }: { terms: Term[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-10 py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Curriculum</div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-3xl mb-10">
          {terms.length} terms of in-class rigour and out-class execution
        </h2>
        <div className="border-t border-neutral-900">
          {terms.map((t, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-neutral-300">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-start gap-6 hover:bg-neutral-50 transition px-2"
                >
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mt-1 w-16 shrink-0">
                    Term {t.n}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[Fraunces] text-xl md:text-2xl leading-snug">{t.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{t.summary}</p>
                  </div>
                  <div className="pt-2">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-10 pl-24 pr-8 grid md:grid-cols-2 gap-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                        Outcomes
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {t.outcomes.map((o) => (
                          <span
                            key={o}
                            className="text-[11px] uppercase tracking-widest border border-neutral-300 px-2.5 py-1 bg-white"
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                        In-class core courses
                      </div>
                      <ul className="space-y-2 text-sm text-neutral-700">
                        {t.courses.map((c, ci) => (
                          <li key={ci} className="flex gap-2">
                            <span className="text-neutral-400">→</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-neutral-900 text-white p-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                        Out-class challenge
                      </div>
                      <h4 className="font-[Fraunces] text-xl leading-snug mb-3">
                        {t.challenge.name}
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-300">
                        {t.challenge.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VenturesSection({ ventures }: { ventures: Venture[] }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
          Student ventures
        </div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-3xl mb-10">
          Companies built by students in this programme
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {ventures.map((v, i) => (
            <div key={i} className="border border-neutral-200 p-6 bg-[#faf8f3]">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                {v.founder}
              </div>
              <h3 className="font-[Fraunces] text-xl mb-2">{v.startup}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Immersions({ items }: { items: string[] }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
          Global immersions
        </div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-3xl mb-10">
          Study where the world&apos;s best do the work
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <div key={i} className="border-t border-neutral-900 pt-5">
              <div className="text-xs font-mono text-neutral-500 mb-2">{String(i + 1).padStart(2, "0")}</div>
              <p className="text-sm text-neutral-700 leading-relaxed">{it}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty({ roster }: { roster: FacultyMember[] }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Faculty</div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-3xl mb-10">
          Learn from practitioners, not just professors
        </h2>
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
          {roster.map((f, i) => (
            <div key={i} className="border-t border-neutral-200 pt-3">
              <div className="font-medium text-sm">{f.name}</div>
              <div className="text-xs text-neutral-500 mt-0.5">
                {f.role} · {f.org}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ list }: { list: Testimonial[] }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
          Placement stories
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {list.map((t, i) => (
            <figure key={i} className="border-t border-neutral-900 pt-5">
              <blockquote className="font-[Fraunces] text-xl leading-snug text-neutral-900">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-widest text-neutral-500">
                {t.name} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobRoles({ roles }: { roles: string[] }) {
  return (
    <section className="px-10 py-20 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">Career paths</div>
        <h2 className="font-[Fraunces] text-3xl md:text-4xl font-light leading-tight max-w-3xl mb-10">
          Roles graduates go on to
        </h2>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <span
              key={r}
              className="text-xs uppercase tracking-widest border border-neutral-300 px-3 py-1.5 bg-[#faf8f3]"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ name }: { name: string }) {
  return (
    <section className="px-10 py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
            Applications open
          </div>
          <h2 className="font-[Fraunces] text-4xl md:text-5xl font-light leading-tight">
            Ready to apply to the {name}?
          </h2>
        </div>
        <div className="md:col-span-4 flex md:justify-end">
          <Link
            to="/applications_center"
            className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-4 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
          >
            Start your application <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
