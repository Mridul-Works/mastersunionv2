import { useCallback, useEffect, useRef, useState } from "react";

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

const SERIF_IT = "'Fraunces', Georgia, serif";

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
      ref={sectionRef}
      className={`mv-section ${revealed ? "is-revealed" : ""} relative flex w-full min-h-[100svh] flex-col overflow-x-hidden border-t ${line} ${bg}`}
      style={{
        paddingTop: "clamp(0.75rem, 2vh, 1.75rem)",
        paddingBottom: "clamp(2rem,4vh,3rem)",
      }}
    >
      {/* compact editorial stats strip — belongs to Section 2 */}
      {statsSlot ? (
        <div className="mx-auto w-full max-w-[1520px] px-5 md:px-10">{statsSlot}</div>
      ) : null}

      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1520px] px-5 pt-[clamp(0.75rem,2vh,1.25rem)] md:px-10 lg:pt-[clamp(28px,3.4vh,46px)]">
          {/* one large rounded exhibition container */}
          <div
            className={`mv-reveal overflow-hidden rounded-[clamp(20px,2.6vw,34px)] border ${line} ${shell} backdrop-blur-[14px] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)]`}
          >
            <div
              className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]"
              style={{ padding: "clamp(1rem,2.2vw,2rem)", gap: "clamp(1.25rem,2.6vw,3rem)" }}
            >
              {/* featured portrait artwork */}
              <div className="order-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpen(current)}
                  aria-label={`Play ${current.title}`}
                  className={`group relative block w-full overflow-hidden rounded-[clamp(14px,1.6vw,22px)] border ${line} bg-black`}
                >
                  <div className="h-[clamp(300px,54vh,620px)] w-full overflow-hidden lg:h-[clamp(340px,58vh,660px)]">
                    <img
                      key={current.thumb}
                      src={current.thumb}
                      alt={current.title}
                      className="h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.03]"
                      style={{
                        opacity: phase === "in" ? 1 : 0,
                        transform:
                          phase === "in" ? "translateX(0) scale(1)" : "translateX(14px) scale(1.015)",
                        transitionDuration: "480ms",
                      }}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white/25">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* editorial information panel */}
              <div className="order-2 flex min-w-0 flex-col justify-center">
                <p className="mv-reveal font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]">
                  500+ Masters · Masterclass
                </p>
                <h2
                  className={`mv-reveal mt-[clamp(0.5rem,1.2vh,0.9rem)] text-[clamp(1.4rem,2.6vw,2.35rem)] font-medium italic leading-[1.1] tracking-tight ${heading}`}
                  style={{ fontFamily: SERIF_IT, transitionDelay: "200ms" }}
                >
                  Built by Scholars, Led by Industry Practitioners
                </h2>
                <p
                  className={`mv-reveal mt-[clamp(0.6rem,1.6vh,1.1rem)] max-w-xl text-[clamp(12.5px,1.6vh,14px)] leading-relaxed ${muted}`}
                  style={{ transitionDelay: "320ms" }}
                >
                  At Masters' Union, your classroom is powered by Ivy League academics and global
                  business leaders, from Harvard to McKinsey, from Wharton to Google. Our Masters
                  don't just teach the playbook. They wrote it.
                </p>

                <div className={`mv-reveal mt-[clamp(0.9rem,2vh,1.4rem)] border-t pt-[clamp(0.75rem,1.8vh,1.1rem)] ${line}`} style={{ transitionDelay: "400ms" }}>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.24em] ${faint}`}>
                    {current.meta}
                  </p>
                  <h3
                    className={`mt-1.5 text-[clamp(1.05rem,1.9vw,1.5rem)] leading-snug ${heading}`}
                    style={{ fontFamily: SERIF_IT }}
                  >
                    {current.title}
                  </h3>
                </div>

                <div
                  className="mv-reveal mt-[clamp(0.9rem,2vh,1.4rem)] flex items-center gap-3"
                  style={{ transitionDelay: "480ms" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(current)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${dark ? "bg-white text-black hover:bg-white/85" : "bg-[#0a0a0a] text-white hover:bg-black/85"}`}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous masterclass"
                    className={`group grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${dark ? "border-white/25 text-white hover:border-white" : "border-black/15 text-black hover:border-black"}`}
                  >
                    <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label="Next masterclass"
                    className={`group grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${dark ? "border-white/25 text-white hover:border-white" : "border-black/15 text-black hover:border-black"}`}
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${faint}`}>
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* thumbnail strip */}
                <div
                  ref={stripRef}
                  className="mv-reveal mt-[clamp(0.9rem,2vh,1.4rem)] flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                      className={`relative h-[clamp(58px,8vh,84px)] shrink-0 overflow-hidden rounded-[10px] border bg-black transition duration-300 ${
                        i === active
                          ? dark
                            ? "border-white/70 opacity-100"
                            : "border-black/70 opacity-100"
                          : `${line} opacity-55 hover:opacity-90`
                      }`}
                      style={{ aspectRatio: "223/398" }}
                    >
                      <img
                        src={v.thumb}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
