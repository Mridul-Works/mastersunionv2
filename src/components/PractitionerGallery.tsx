import { useCallback, useEffect, useRef, useState } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

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
      className="flex h-full w-full items-center justify-center bg-neutral-100 text-[clamp(2rem,3vw,2.75rem)] tracking-[-0.02em] text-black/35"
      style={{ fontFamily: MONO }}
    >
      {initials}
    </div>
  );
}

/**
 * Horizontal editorial gallery: one dominant centred card, neighbours peeking
 * on both edges. Scroll-snap + pointer drag + touch swipe.
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
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startLeft - dx;
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

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain px-[max(1.25rem,calc((100%-min(640px,72vw))/2))] py-2 md:gap-14 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
              className={`shrink-0 snap-center transition-all duration-500 ease-out ${
                isActive ? "opacity-100" : "opacity-60"
              }`}
              style={{
                width: "min(640px, 78vw)",
                transform: isActive ? "scale(1)" : "scale(0.93)",
                transformOrigin: "center bottom",
              }}
            >
              <div className="w-full overflow-hidden bg-[#ececec]" style={{ aspectRatio: "4 / 5" }}>
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    draggable={false}
                    className={`h-full w-full select-none object-cover transition duration-700 ${
                      isActive ? "grayscale-0" : "grayscale"
                    }`}
                  />
                ) : (
                  <Initials name={item.name} />
                )}
              </div>

              <h3 className="mt-6 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.15] tracking-[-0.01em] text-black">
                {item.name}
              </h3>
              <div
                className="mt-2 text-[11px] uppercase leading-snug tracking-[0.16em] text-black/55"
                style={{ fontFamily: MONO }}
              >
                {item.role}
              </div>
              {item.sub ? (
                <div
                  className="mt-1 text-[11px] uppercase leading-snug tracking-[0.16em] text-black/40"
                  style={{ fontFamily: MONO }}
                >
                  {item.sub}
                </div>
              ) : null}
              {item.blurb ? (
                <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-black/70">{item.blurb}</p>
              ) : null}
            </article>
          );
        })}
      </div>

      {/* Minimal navigation */}
      <div className="mt-6 flex items-center gap-6 px-5 md:px-10">
        <button
          type="button"
          onClick={() => scrollTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="text-[13px] text-black/60 transition-colors hover:text-black disabled:opacity-25"
          style={{ fontFamily: MONO }}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollTo(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next"
          className="text-[13px] text-black/60 transition-colors hover:text-black disabled:opacity-25"
          style={{ fontFamily: MONO }}
        >
          →
        </button>
        <div
          className="text-[10.5px] uppercase tracking-[0.22em] text-black/45"
          style={{ fontFamily: MONO }}
        >
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
