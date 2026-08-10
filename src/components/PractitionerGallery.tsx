import { useCallback, useEffect, useRef, useState } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SERIF = "'Fraunces', Georgia, serif";

export type GalleryItem = {
  name: string;
  role: string;
  sub?: string;
  blurb?: string;
  img?: string;
};

function Initials({ name }: { name: string }) {
  const initials = name
    .replace(/^Dr\s+|^Captain\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-neutral-800 text-[clamp(3rem,6vw,5rem)] tracking-[-0.02em] text-white/25"
      style={{ fontFamily: MONO }}
    >
      {initials}
    </div>
  );
}

/**
 * Immersive editorial practitioner gallery.
 * Each panel: LEFT information on dark charcoal, RIGHT large portrait, joined by a
 * large sweeping curved cutout. Horizontal scroll-snap + drag + swipe, neighbours peek.
 */
export default function PractitionerGallery({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(mid - centre);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Pointer drag (desktop mouse / trackpad press-drag). Touch uses native scroll.
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  const scrollTo = (i: number) => {
    const el = cardRefs.current[Math.max(0, Math.min(items.length - 1, i))];
    const track = trackRef.current;
    if (!el || !track) return;
    track.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2,
      behavior: "smooth",
    });
  };

  const activeImg = items[active]?.img;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {/* ambient dark atmosphere behind the active card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#0b0b0b]" />
        {activeImg ? (
          <img
            src={activeImg}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.12] grayscale blur-3xl transition-opacity duration-700"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-transparent to-[#0b0b0b]" />
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className="relative flex snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain px-[max(1rem,calc((100vw-min(1400px,88vw))/2))] py-8 md:gap-8 md:py-14 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab", touchAction: "pan-y pinch-zoom" }}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <article
              key={item.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative shrink-0 snap-center overflow-hidden rounded-[24px] bg-[#131313] transition-all duration-500 ease-out md:rounded-[32px] ${
                isActive ? "opacity-100 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]" : "opacity-45"
              }`}
              style={{
                width: "min(1400px, 88vw)",
                height: "clamp(430px, 62vw, 720px)",
                transform: isActive ? "scale(1)" : "scale(0.94)",
              }}
            >
              {/* portrait — right side, full bleed */}
              <div className="absolute inset-y-0 right-0 w-[60%]">
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    draggable={false}
                    className={`h-full w-full select-none object-cover object-top transition duration-700 ${
                      isActive ? "grayscale-[0.35]" : "grayscale"
                    }`}
                  />
                ) : (
                  <Initials name={item.name} />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#131313]/60 via-transparent to-[#131313]/25" />
              </div>

              {/* dark information panel with a large sweeping curved edge into the photo */}
              <div
                className="absolute -left-[6%] top-[-8%] h-[116%] w-[62%] bg-[#131313]"
                style={{
                  borderRadius: "0 42% 42% 0 / 0 50% 50% 0",
                  boxShadow: "24px 0 60px -20px rgba(0,0,0,0.75)",
                }}
                aria-hidden
              />
              <div
                className="absolute -left-[6%] top-[-8%] h-[116%] w-[62%]"
                style={{
                  borderRadius: "0 42% 42% 0 / 0 50% 50% 0",
                  background:
                    "radial-gradient(120% 90% at 10% 50%, rgba(255,255,255,0.05), transparent 62%)",
                }}
                aria-hidden
              />

              {/* information */}
              <div className="relative flex h-full w-[42%] flex-col justify-center p-6 sm:p-9 md:p-14">
                <div
                  className="text-[9.5px] uppercase tracking-[0.24em] text-white/45 md:text-[10.5px]"
                  style={{ fontFamily: MONO }}
                >
                  Industry Practitioner
                </div>
                <h3
                  className="mt-4 text-[clamp(1.35rem,2.6vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white md:mt-6"
                  style={{ fontFamily: SERIF }}
                >
                  {item.name}
                </h3>
                <div
                  className="mt-3 text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-white/60 md:mt-5 md:text-[11px]"
                  style={{ fontFamily: MONO }}
                >
                  {item.role}
                </div>
                {item.blurb ? (
                  <p className="mt-4 max-w-[42ch] text-[12.5px] leading-[1.7] text-white/70 md:mt-7 md:text-[15px]">
                    {item.blurb}
                  </p>
                ) : null}
                {item.sub ? (
                  <div
                    className="mt-5 border-t border-white/12 pt-4 text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-white/45 md:mt-8 md:text-[10.5px]"
                    style={{ fontFamily: MONO }}
                  >
                    {item.sub}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {/* minimal controls */}
      <div className="relative flex items-center justify-center gap-5 pb-8 md:pb-12">
        <button
          type="button"
          onClick={() => scrollTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:opacity-25"
        >
          ←
        </button>
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/45"
          style={{ fontFamily: MONO }}
        >
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:opacity-25"
        >
          →
        </button>
      </div>
    </div>
  );
}
