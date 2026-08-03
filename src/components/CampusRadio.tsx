import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { CAMPUS_RADIO, CAMPUS_RADIO_FEATURED, ytThumb, type CampusRadioEpisode } from "@/lib/campus-radio";

export function CampusRadioPlayer({
  episode,
  onClose,
}: {
  episode: CampusRadioEpisode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[130] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={episode.title}
    >
      <div
        className="relative w-full max-w-[980px] overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${episode.id}?autoplay=1&rel=0`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89146]">
            {episode.designation}
          </p>
          <h3 className="mt-1 text-[15px] text-white">
            {episode.name} — {episode.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function CampusRadioCard({
  ep,
  onPlay,
  compact,
}: {
  ep: CampusRadioEpisode;
  onPlay: () => void;
  compact?: boolean;
}) {
  return (
    <button type="button" onClick={onPlay} className="group block w-full text-left">
      <div className="relative overflow-hidden bg-[#E8E4DD]">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={ytThumb(ep.id)}
            alt={`${ep.name} — ${ep.title}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        </div>
        <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center bg-black text-white transition-colors group-hover:bg-[#B89146] group-hover:text-black">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0 bg-[#F5F3EE] px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-black/60">
          {ep.duration}
        </span>
      </div>

      <div className="mt-3 border-t border-black/15 pt-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
            {ep.name}
          </p>
        </div>
        <p className="mt-1 text-[10.5px] uppercase tracking-[0.1em] text-black/45">
          {ep.designation}
        </p>
        <h3
          className="mt-2 text-[15px] italic leading-snug text-black"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {ep.title}
        </h3>
        {!compact && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-black/60">{ep.description}</p>
        )}
      </div>
    </button>
  );
}





/**
 * Poster strip of CXO episodes: colour-blocked portrait tiles with name,
 * designation and a play button that opens the lightbox.
 */
export function CampusRadioSlab({ start = 0, count = 1 }: { start?: number; count?: number }) {
  const [open, setOpen] = useState<CampusRadioEpisode | null>(null);
  const episodes = CAMPUS_RADIO.slice(start, start + count);
  const large = episodes.length <= 2;
  const solo = episodes.length === 1;


  return (
    <div className="flex h-full flex-col justify-center">
      <p className="mb-3 flex justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.5em] text-black/45">
        {"PODCAST".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </p>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${episodes.length}, minmax(0, 1fr))` }}
      >
        {episodes.map((ep) => (
          <button
            key={ep.id}
            type="button"
            onClick={() => setOpen(ep)}
            aria-label={`Play ${ep.name} — ${ep.title}`}
            className="group text-left"
          >
            <div className="relative overflow-hidden rounded-[3px] bg-black">
              <div className={solo ? "aspect-video w-full" : large ? "aspect-video w-full" : "aspect-video w-full"}>
                <img
                  src={ytThumb(ep.id)}
                  alt={`${ep.name} — ${ep.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute inset-0 grid place-items-center">
                <span
                  className={cn(
                    "grid place-items-center rounded-full bg-white/90 text-black shadow-md transition group-hover:scale-110",
                    solo ? "h-14 w-14 text-[15px]" : large ? "h-11 w-11 text-[12px]" : "h-8 w-8 text-[9px]"
                  )}
                >
                  ▶
                </span>
              </span>
              <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white">
                {ep.duration}
              </span>
            </div>

            <p
              className={cn(
                "mt-2.5 font-semibold leading-tight text-black",
                large ? "text-[14px]" : "text-[11px]"
              )}
            >
              {ep.name}
            </p>
            <p
              className={cn(
                "mt-1 leading-tight text-black/50",
                large ? "text-[11px]" : "text-[9.5px]"
              )}
            >
              {ep.designation}
            </p>
            <p
              className={cn(
                "mt-2 leading-snug text-black",
                large ? "text-[15px]" : "text-[12px]"
              )}
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {ep.title}
            </p>
          </button>
        ))}
      </div>


      {open && <CampusRadioPlayer episode={open} onClose={() => setOpen(null)} />}
    </div>
  );
}


export default function CampusRadio() {
  const [open, setOpen] = useState<CampusRadioEpisode | null>(null);
  const episodes = CAMPUS_RADIO_FEATURED.slice(0, 3);

  return (
    <section id="campus-radio" className="border-t border-black/10 bg-[#F5F3EE]">
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
              — Campus Radio
            </p>
            <h2
              className="mt-3 text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium italic leading-[1.1] tracking-tight text-black"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              The CXOs who visit our campus, on the record.
            </h2>
            <p className="mt-3 max-w-[58ch] text-[13.5px] leading-relaxed text-black/60">
              Founders, CXOs, policymakers and operators sit down with students for long-form,
              unedited conversations — the same week they teach or judge in class.
            </p>
          </div>
          <Link
            to="/campus-radio"
            className="inline-flex shrink-0 items-center gap-2 border-b border-black pb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition hover:gap-3"
          >
            All episodes <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 border-t border-black/15 lg:grid-cols-4">
          {episodes.map((ep, i) => (
            <div
              key={ep.id}
              className={cn(
                "border-b border-black/15 px-0 py-5 sm:px-5",
                i % 2 === 1 && "border-l border-black/15",
                "lg:border-b-0 lg:border-l lg:first:border-l-0",
                i % 2 === 0 && "lg:border-l"
              )}
            >
              <CampusRadioCard ep={ep} onPlay={() => setOpen(ep)} compact />
            </div>
          ))}
        </div>
      </div>


      {open && <CampusRadioPlayer episode={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
