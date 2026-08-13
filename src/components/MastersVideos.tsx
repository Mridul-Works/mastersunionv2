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

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return perView;
}

export default function MastersVideos({
  bg = "bg-[#F5F3EE]",
  statsSlot,
}: {
  bg?: string;
  statsSlot?: React.ReactNode;
}) {
  const [open, setOpen] = useState<MasterVideo | null>(null);
  const perView = usePerView();
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(MASTER_VIDEOS.length / perView));
  const safePage = Math.min(page, pages - 1);

  useEffect(() => {
    setPage(0);
  }, [perView]);

  const go = (dir: 1 | -1) => {
    setPage((p) => {
      const next = Math.min(pages - 1, Math.max(0, p + dir));
      return next;
    });
  };

  const gap = 24; // matches gap-6

  // own scroll reveal — heading, paragraph, then the cards
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="masters"
      ref={sectionRef}
      className={`mv-section ${revealed ? "is-revealed" : ""} relative w-full overflow-x-hidden border-t border-black/10 ${bg}`}
    >
      {statsSlot ? (
        <div className="mx-auto w-full max-w-[1280px] px-5 pt-[clamp(3rem,7vw,5.5rem)] md:px-10">
          {statsSlot}
        </div>
      ) : null}

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 py-[clamp(3rem,7vw,5.5rem)] md:px-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left: sticky editorial column */}
        <div className="min-w-0 lg:col-span-4 lg:sticky lg:top-24">
          <p className="mv-reveal mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
            500+ Masters
          </p>
          <h2
            className="mv-reveal text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium italic leading-[1.1] tracking-tight text-black"
            style={{ fontFamily: "'Fraunces', Georgia, serif", transitionDelay: "90ms" }}
          >
            Built by Scholars, Led by Industry Practitioners
          </h2>
          <p
            className="mv-reveal mt-6 max-w-sm text-[14px] leading-relaxed text-black/60"
            style={{ transitionDelay: "200ms" }}
          >
            At Masters' Union, your classroom is powered by Ivy League academics and global business
            leaders, from Harvard to McKinsey, from Wharton to Google. Our Masters don't just teach
            the playbook. They wrote it.
          </p>

          <div className="mv-reveal mt-7 flex items-center gap-3" style={{ transitionDelay: "300ms" }}>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={safePage === 0}
              aria-label="Previous videos"
              className="group grid h-12 w-12 shrink-0 place-items-center rounded-full border border-black/10 text-black transition hover:border-black disabled:opacity-30"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={safePage >= pages - 1}
              aria-label="Next videos"
              className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-white transition hover:bg-black/85 disabled:opacity-30"
            >
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/45">
              {String(safePage + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Right: paged rail — fits the screen, never scrolls sideways */}
        <div className="mv-reveal min-w-0 overflow-hidden lg:col-span-8" style={{ transitionDelay: "380ms" }}>
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${safePage * 100}% - ${safePage * gap}px))` }}
          >
            {MASTER_VIDEOS.map((v) => (
              <button
                key={v.src}
                type="button"
                onClick={() => setOpen(v)}
                className="group shrink-0 text-left"
                style={{ width: `calc((100% - ${(perView - 1) * gap}px) / ${perView})` }}
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
                  className="mt-1 truncate text-[17px] leading-snug text-black"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {v.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

