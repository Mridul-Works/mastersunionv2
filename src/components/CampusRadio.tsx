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
    <button
      type="button"
      onClick={onPlay}
      className="group block w-full text-left transition-colors hover:bg-[#F6F2E9]"
    >
      <div className="relative overflow-hidden border border-black/10 bg-black">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={ytThumb(ep.id)}
            alt={`${ep.name} — ${ep.title}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[0.15] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 grid h-9 w-9 place-items-center bg-[#B89146] text-black transition group-hover:w-12">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="absolute bottom-0 right-0 bg-black px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-white">
          {ep.duration}
        </span>
      </div>
      <div className="border-x border-b border-black/10 px-3 pb-3 pt-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89146]">
          {ep.name}
        </p>
        <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.08em] text-black/45">
          {ep.designation}
        </p>
        <h3
          className="mt-1.5 text-[15px] leading-snug text-black"
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
  const [lead, ...rest] = CAMPUS_RADIO_FEATURED;

  return (
    <section id="campus-radio" className="border-t border-black/10 bg-white">
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
              Podcasts recorded on campus, with the people running India Inc.
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

        <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <CampusRadioCard ep={lead} onPlay={() => setOpen(lead)} />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:col-span-6">
            {rest.map((ep) => (
              <CampusRadioCard key={ep.id} ep={ep} onPlay={() => setOpen(ep)} compact />
            ))}
          </div>
        </div>
      </div>

      {open && <CampusRadioPlayer episode={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
