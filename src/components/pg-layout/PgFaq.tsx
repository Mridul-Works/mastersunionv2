import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/pg-layout/Reveal";

const FAQ = [
  {
    q: "How is the 16 months actually structured?",
    a: "Three engines run in parallel every term: InClass (7 tracks of fundamentals), OutClass (a live D2C brand + a Creator Challenge that both run across terms) and Immersions (Global + Bharat modules in the middle terms). Every course, challenge and trip is graded on a real deliverable.",
  },
  {
    q: "Do all students do the D2C and Creator challenges?",
    a: "Yes. Both are mandatory OutClass tracks. The D2C brand starts Term 1; the Creator Challenge kicks in from Term 2 and runs alongside curriculum through Term 6.",
  },
  {
    q: "Are immersions mandatory?",
    a: "Global and Bharat immersions are opt-in. Most students opt into at least one; many opt into both. Immersions slot into Terms 4 and 5.",
  },
  {
    q: "How is this different from a traditional MBA?",
    a: "You don't submit case-study essays. You launch real ventures, ship real products and manage real money. 40% of faculty are sitting CEOs, founders and operators — not just professors.",
  },
  {
    q: "Do I need CAT or GMAT?",
    a: "No. Admission is via our own aptitude assessment and an operator-led interview, in rolling rounds until the cohort fills.",
  },
];

export function PgFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden section-band py-20 md:py-28">
      <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 font-tech text-3xl leading-[1.05] tracking-[-0.02em] text-ink">
            Everything you were about to email us.
          </h2>
        </Reveal>
        <Reveal delay={100} className="border-t border-ink/10 bg-paper/80 backdrop-blur-sm">
          {FAQ.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                >
                  <span className="font-tech text-sm leading-tight text-ink">{f.q}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center border border-ink/15 text-ink/70">
                    {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                {open && (
                  <p className="pb-6 pl-5 pr-14 text-sm leading-relaxed text-ink/60">{f.a}</p>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export default PgFaq;
