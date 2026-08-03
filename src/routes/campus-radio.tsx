import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CAMPUS_RADIO, type CampusRadioEpisode } from "@/lib/campus-radio";
import { CampusRadioCard, CampusRadioPlayer } from "@/components/CampusRadio";

export const Route = createFileRoute("/campus-radio")({
  head: () => ({
    meta: [
      { title: "Campus Radio — CXO Podcasts at Masters' Union" },
      {
        name: "description",
        content:
          "Long-form podcasts recorded on the Masters' Union campus with founders, CXOs, policymakers and operators building India Inc.",
      },
      { property: "og:title", content: "Campus Radio — CXO Podcasts at Masters' Union" },
      {
        property: "og:description",
        content:
          "Founders, CXOs and policymakers in unedited conversation with students at Masters' Union.",
      },
    ],
  }),
  component: CampusRadioPage,
});

function CampusRadioPage() {
  const [open, setOpen] = useState<CampusRadioEpisode | null>(null);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10 bg-[#F5F3EE]">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-16">
          <Link
            to="/"
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-black/50 hover:text-black"
          >
            ← Masters' Union
          </Link>
          <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
            — Campus Radio
          </p>
          <h1
            className="mt-3 max-w-[26ch] text-[clamp(2rem,4.4vw,3.4rem)] font-medium italic leading-[1.05] tracking-tight text-black"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            The people running India Inc., in conversation with our students.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-black/60 md:text-[15px]">
            Campus Radio is the Masters' Union podcast series. Every episode is recorded on campus
            with the founders, CXOs, investors and policymakers who visit to teach, judge live
            briefs, or hire. {CAMPUS_RADIO.length} episodes and counting.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPUS_RADIO.map((ep) => (
            <CampusRadioCard key={ep.id} ep={ep} onPlay={() => setOpen(ep)} />
          ))}
        </div>
      </section>

      {open && <CampusRadioPlayer episode={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
