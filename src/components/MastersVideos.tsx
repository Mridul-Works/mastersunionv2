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
    title: "Inside a Masters' Union classroom",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/16062025/v1/oneImg.webp",
    src: "rwD1iM4K8gU",
    kind: "youtube",
    title: "Learning from operators",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v3.webp",
    src: "uQdW8SJuIVY",
    kind: "youtube",
    title: "Practitioners in session",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/17062025/v1/rajivgupta.webp",
    src: "https://files.mastersunion.link/uploads/17062025/v1/rajivgupta.mp4",
    kind: "cdn",
    title: "Rajiv Gupta",
    meta: "Master session",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v1.webp",
    src: "ZNbVM5gFiR8",
    kind: "youtube",
    title: "Case in the room",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/12082025/v1/v2.webp",
    src: "mvlcxnG-E1g",
    kind: "youtube",
    title: "Boardroom to classroom",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/MonicaMasterclass.webp",
    src: "dnHLyNoTkV4",
    kind: "youtube",
    title: "Monica",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/NidhiMasterclass.webp",
    src: "y-kLTcu8RG0",
    kind: "youtube",
    title: "Nidhi",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/SaurabhMasterclass.webp",
    src: "5fof2r7ptTE",
    kind: "youtube",
    title: "Saurabh",
    meta: "Masterclass",
  },
  {
    thumb: "https://images.mastersunion.link/uploads/19092025/v1/NandiniMasterclass.webp",
    src: "LfPCEMcm9Ac",
    kind: "youtube",
    title: "Nandini",
    meta: "Masterclass",
  },
];

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
        className="relative w-full max-w-[980px] overflow-hidden rounded-xl bg-black shadow-2xl"
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
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[62ch]">
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
              500+ Masters
            </p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-tight text-black"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Built by Scholars, <em className="italic">Led by Industry Practitioners</em>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-black/60 md:text-[14px]">
              At Masters' Union, your classroom is powered by Ivy League academics and global
              business leaders, from Harvard to McKinsey, from Wharton to Google. Our Masters don't
              just teach the playbook. They wrote it.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous videos"
              className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-black/70 transition hover:border-black/40 hover:text-black"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next videos"
              className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-black/70 transition hover:border-black/40 hover:text-black"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MASTER_VIDEOS.map((v) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setOpen(v)}
              className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border border-black/10 bg-black text-left md:w-[300px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-white">{v.title}</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                    {v.meta}
                  </div>
                </div>
                <PlayGlyph />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
