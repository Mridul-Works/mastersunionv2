import { useCallback, useEffect, useRef, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";

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

/** thumbnails visible in the initial filmstrip viewport — highest fetch priority */
export const MASTER_VIDEO_PRIORITY_COUNT = 5;
/** every masterclass thumbnail is preloaded eagerly (deduped, finite set) */
export const MASTER_VIDEO_PRELOAD = Array.from(new Set(MASTER_VIDEOS.map((v) => v.thumb)));

const SERIF_IT = "'Fraunces', Georgia, serif";
const SANS_H = "'Inter', system-ui, sans-serif";

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
  statsSlot,
  dark = false,
}: {
  bg?: string;
  statsSlot?: React.ReactNode;
  dark?: boolean;
}) {
  const [open, setOpen] = useState<MasterVideo | null>(null);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const pendingRef = useRef<number | null>(null);
  const total = MASTER_VIDEOS.length;
  const current = MASTER_VIDEOS[active];
  const containerRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef(false);

  // crossfade + subtle slide when the featured item changes
  const goTo = useCallback(
    (next: number) => {
      const idx = ((next % total) + total) % total;
      if (idx === active) return;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setActive(idx);
        return;
      }
      pendingRef.current = idx;
      setPhase("out");
      window.setTimeout(() => {
        if (pendingRef.current !== null) setActive(pendingRef.current);
        pendingRef.current = null;
        setPhase("in");
      }, 240);
    },
    [active, total],
  );

  // keyboard left/right arrows for the prev/next buttons
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, active]);

  // keep the active thumbnail in view
  const stripRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  // own scroll reveal
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

  const line = dark ? "border-white/10" : "border-black/10";
  const shell = dark ? "bg-white/[0.03]" : "bg-white/70";
  const heading = dark ? "text-white" : "text-black";
  const muted = dark ? "text-white/60" : "text-black/60";
  const faint = dark ? "text-white/45" : "text-black/45";

  return (
    <section
      id="masters"
      ref={(node) => {
        sectionRef.current = node;
        containerRef.current = node;
      }}
      onMouseEnter={() => (activeRef.current = true)}
      onMouseLeave={() => (activeRef.current = false)}
      onFocusCapture={() => (activeRef.current = true)}
      onBlurCapture={() => (activeRef.current = false)}
      className={`mv-section ${revealed ? "is-revealed" : ""} relative flex w-full min-h-[calc(100svh-var(--nav-reserve,0px))] flex-col overflow-x-hidden border-t ${line} ${bg}`}
      style={{
        paddingTop: "clamp(0.75rem, 2vh, 1.75rem)",
        paddingBottom: "clamp(2rem, 4vh, 3rem)",
      }}
    >
      {/* compact editorial stats strip — belongs to Section 2 */}
      {statsSlot ? (
        <div className="page-shell w-full">{statsSlot}</div>
      ) : null}

      <div className="flex flex-1 items-center">
        <div className="page-shell w-full pt-[clamp(0.75rem,2vh,1.25rem)] lg:pt-[clamp(28px,3.4vh,46px)]">
          {/* one large rounded exhibition container */}
          <div
            data-touch-gallery
            className={`mv-reveal flex flex-col items-stretch justify-center gap-[clamp(1.25rem,2.6vw,3rem)] overflow-hidden rounded-[clamp(20px,2.6vw,34px)] border ${line} ${shell} backdrop-blur-[14px] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] lg:flex-row lg:gap-[clamp(2.5rem,5vw,5rem)]`}
            style={{ padding: "clamp(1rem,2.2vw,2rem)" }}
          >
              {/* featured portrait artwork */}
              <div className="order-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpen(current)}
                  aria-label={`Play ${current.title}`}
                  className="group relative flex h-full w-full items-center justify-center"
                >
                  {/* frame is sized by height so the full portrait poster stays intact */}
                  <div
                    className={`relative overflow-hidden rounded-[clamp(14px,1.6vw,22px)] border ${line} bg-black`}
                    style={{
                      aspectRatio: "223/398",
                      height: "clamp(360px, 62vh, 720px)",
                      width: "auto",
                      maxWidth: "100%",
                    }}
                  >
                    <TouchColorImg
                      // no `key`: swapping src on the SAME element avoids an
                      // unmount/remount cycle that would re-request the poster
                      src={current.thumb}
                      alt={current.title}
                      decoding="async"
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-contain grayscale contrast-[0.95] saturate-[0.75] transition-all duration-[350ms] ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-100 data-[touch-color-active]:grayscale-0 data-[touch-color-active]:contrast-100 data-[touch-color-active]:saturate-100"
                      style={{
                        opacity: phase === "in" ? 1 : 0,
                        transform:
                          phase === "in" ? "translateX(0) scale(1)" : "translateX(14px) scale(1.01)",
                        transitionDuration: "480ms",
                      }}
                    />
                    <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white/25">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </button>

              </div>

              {/* editorial information panel */}
              <div className="order-2 flex min-w-0 flex-1 flex-col justify-center lg:max-w-[640px]">
                <p className="mv-reveal font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
                  500+ Masters · Masterclass
                </p>
                <h2
                  className={`mv-reveal mt-[clamp(0.65rem,1.5vh,1.05rem)] text-[clamp(1.7rem,3.2vw,3rem)] font-bold not-italic leading-[1.08] tracking-[-0.025em] ${heading}`}
                  style={{ fontFamily: SANS_H, transitionDelay: "200ms" }}
                >
                  Built by Scholars, Led by{" "}
                  <span className="font-light italic text-white/[0.14]" style={{ fontFamily: SERIF_IT }}>
                    Industry Practitioners
                  </span>
                </h2>
                <p
                  className={`mv-reveal mt-[clamp(0.75rem,1.9vh,1.35rem)] max-w-[620px] text-[clamp(14px,1.85vh,16px)] leading-relaxed ${muted}`}
                  style={{ transitionDelay: "320ms" }}
                >
                  At Masters' Union, your classroom is powered by Ivy League academics and global
                  business leaders, from Harvard to McKinsey, from Wharton to Google. Our Masters
                  don't just teach the playbook. They wrote it.
                </p>

                <div className={`mv-reveal mt-[clamp(1.1rem,2.5vh,1.9rem)] border-t pt-[clamp(0.9rem,2.2vh,1.4rem)] ${line}`} style={{ transitionDelay: "400ms" }}>
                  <p className={`font-mono text-[11px] uppercase tracking-[0.24em] ${faint}`}>
                    {current.meta}
                  </p>
                  <h3
                    className={`mt-2 text-[clamp(1.3rem,2.4vw,2rem)] font-semibold not-italic leading-snug tracking-[-0.02em] ${heading}`}
                    style={{ fontFamily: SANS_H }}
                  >
                    {current.title}
                  </h3>
                </div>

                <div
                  className="mv-reveal mt-[clamp(1.2rem,2.6vh,2.1rem)] flex items-center gap-4"
                  style={{ transitionDelay: "480ms" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(current)}
                    className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition ${dark ? "bg-white text-black hover:bg-white/85" : "bg-[#0a0a0a] text-white hover:bg-black/85"}`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous masterclass"
                    className={`group grid h-12 w-12 shrink-0 place-items-center rounded-full border transition ${dark ? "border-white/25 text-white hover:border-white" : "border-black/15 text-black hover:border-black"}`}
                  >
                    <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label="Next masterclass"
                    className={`group grid h-12 w-12 shrink-0 place-items-center rounded-full border transition ${dark ? "border-white/25 text-white hover:border-white" : "border-black/15 text-black hover:border-black"}`}
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                  <span className={`font-mono text-[11px] uppercase tracking-[0.24em] ${faint}`}>
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* thumbnail filmstrip */}
                <div
                  ref={stripRef}
                  className="mv-reveal mt-[clamp(1.2rem,2.6vh,2.1rem)] flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  style={{ transitionDelay: "560ms" }}
                >
                  {MASTER_VIDEOS.map((v, i) => (
                    <button
                      key={v.src}
                      data-idx={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={v.title}
                      aria-current={i === active}
                      className={`group relative h-[clamp(96px,14vh,148px)] shrink-0 overflow-hidden rounded-[14px] border bg-black transition duration-300 ${
                        i === active
                          ? dark
                            ? "border-white/70"
                            : "border-black/70"
                          : line
                      }`}
                      style={{ aspectRatio: "223/398" }}
                    >
                      <TouchColorImg
                        src={v.thumb}
                        alt=""
                        loading="eager"
                        fetchPriority={i < MASTER_VIDEO_PRIORITY_COUNT ? "high" : "auto"}
                        decoding="async"
                        className="h-full w-full object-contain grayscale contrast-[0.95] saturate-[0.75] transition-all duration-[350ms] ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-100 data-[touch-color-active]:grayscale-0 data-[touch-color-active]:contrast-100 data-[touch-color-active]:saturate-100"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
