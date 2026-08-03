import { useEffect, useRef, useState } from "react";

export type MasterVideo = {
  thumb: string;
  /** YouTube id, or a full mp4 URL */
  src: string;
  kind: "youtube" | "cdn";
  title: string;
  meta: string;
};

export const MASTER_VIDEOS: MasterVideo[] = [
  {
    thumb: "https://images.mastersunion.link/uploads/16062025/v1/Frame1321317813.webp",
    src: "cIwcTjcZV7U",
    kind: "youtube",
    title: "Strategic HR Management",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/16062025/v1/oneImg.webp",
    src: "rwD1iM4K8gU",
    kind: "youtube",
    title: "Master the Art of Decision Making",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v3.webp",
    src: "uQdW8SJuIVY",
    kind: "youtube",
    title: "Business Transformation",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/17062025/v1/rajivgupta.webp",
    src: "https://files.mastersunion.link/uploads/17062025/v1/rajivgupta.mp4",
    kind: "cdn",
    title: "Family Business Management",
    meta: "Master session",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v1.webp",
    src: "ZNbVM5gFiR8",
    kind: "youtube",
    title: "Mergers and Acquisitions",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v2.webp",
    src: "mvlcxnG-E1g",
    kind: "youtube",
    title: "Social Entrepreneurship",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/MonicaMasterclass.webp",
    src: "dnHLyNoTkV4",
    kind: "youtube",
    title: "Tech in Finance",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/NidhiMasterclass.webp",
    src: "y-kLTcu8RG0",
    kind: "youtube",
    title: "The Art of Communication",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/SaurabhMasterclass.webp",
    src: "5fof2r7ptTE",
    kind: "youtube",
    title: "Master the Science of Modern Sales",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/NandiniMasterclass.webp",
    src: "LfPCEMcm9Ac",
    kind: "youtube",
    title: "Statistics for Business",
    meta: "Masterclass",
  },
];


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PlayGlyph({ size = 44 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-full border border-white/70 bg-black/25 backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-black/40"
      style={{ width: size, height: size }}
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
        <path d="M13 8L0.999999 15.7942L1 0.205771L13 8Z" fill="white" />
      </svg>
    </span>
  );
}

function VideoModal({ video, onClose }: { video: MasterVideo; onClose: () => void }) {
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
      className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
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
          {video.kind === "youtube" ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.src}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video className="h-full w-full" src={video.src} controls autoPlay playsInline />
          )}
        </div>
      </div>
    </div>
  );
}

export default function MastersVideos({
  bg = "bg-[#F5F3EE]",
}: {
  bg?: string;
}) {
  const [open, setOpen] = useState<MasterVideo | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section id="masters" className={`border-t border-black/10 ${bg}`}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left: sticky editorial column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
            500+ Masters
          </p>
          <h2
            className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium italic leading-[1.1] tracking-tight text-black"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Built by Scholars, Led by Industry Practitioners
          </h2>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-black/60">
            At Masters' Union, your classroom is powered by Ivy League academics and global business
            leaders, from Harvard to McKinsey, from Wharton to Google. Our Masters don't just teach
            the playbook. They wrote it.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous videos"
              className="group grid h-12 w-12 place-items-center rounded-full border border-black/10 text-black transition hover:border-black"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next videos"
              className="group grid h-12 w-12 place-items-center rounded-full bg-black text-white transition hover:bg-black/85"
            >
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        {/* Right: portrait rail */}
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] lg:col-span-8 [&::-webkit-scrollbar]:hidden"
        >
          {MASTER_VIDEOS.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setOpen(v)}
              className={`group w-[230px] shrink-0 snap-start text-left md:w-[270px] ${
                i % 2 === 1 ? "lg:mt-8" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-[12px] bg-black shadow-[0_12px_34px_-20px_rgba(0,0,0,0.55)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_46px_-22px_rgba(0,0,0,0.6)]">
                <div className="aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[12px] border border-transparent transition-colors duration-500 group-hover:border-[#B89146]/40" />
                <div className="absolute bottom-5 left-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white/20">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89146]">
                {v.meta}
              </p>
              <h3
                className="mt-1 text-[17px] leading-snug text-black"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {v.title}
              </h3>
            </button>
          ))}
        </div>
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
