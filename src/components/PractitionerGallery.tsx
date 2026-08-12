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
  const [active, setActive] = useState(0); // index within the tripled list
  const n = items.length;
  const loop = n > 1;
  const slides = loop ? [...items, ...items, ...items] : items;
  const didInit = useRef(false);

  const leftFor = useCallback((idx: number) => {
    const el = cardRefs.current[idx];
    const track = trackRef.current;
    if (!el || !track) return null;
    return Math.max(
      0,
      Math.min(
        track.scrollWidth - track.clientWidth,
        el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2,
      ),
    );
  }, []);

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

  // Once scrolling settles, silently teleport back into the middle copy so the
  // gallery never reaches an end.
  const normalise = useCallback(() => {
    const track = trackRef.current;
    if (!track || !loop) return;
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
    if (best >= n && best < 2 * n) return;
    const target = (best % n) + n;
    const from = leftFor(best);
    const to = leftFor(target);
    if (from == null || to == null) return;
    track.scrollLeft = track.scrollLeft + (to - from);
    setActive(target);
  }, [leftFor, loop, n]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (loop && !didInit.current) {
      const left = leftFor(n);
      if (left != null) track.scrollLeft = left;
      didInit.current = true;
      setActive(n);
    }
    measure();
    let raf = 0;
    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
      clearTimeout(settle);
      settle = setTimeout(normalise, 180);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure, normalise, leftFor, loop, n]);


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

  const scrollTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const idx = loop ? i : Math.max(0, Math.min(slides.length - 1, i));
      const left = leftFor(idx);
      if (left == null) return;
      setActive(idx);
      if (typeof track.scrollTo === "function") {
        track.scrollTo({ left, behavior: "smooth" });
      } else {
        track.scrollLeft = left;
      }
    },
    [leftFor, loop, slides.length],
  );

  const realIndex = loop ? ((active % n) + n) % n : active;
  const activeImg = slides[active]?.img;

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
        className="relative flex snap-x snap-mandatory items-center gap-4 overflow-x-auto overscroll-x-contain px-[6vw] py-5 sm:gap-5 sm:px-[max(1rem,calc((100vw-min(1320px,82vw))/2))] sm:py-6 md:gap-8 md:py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab", touchAction: "pan-y pinch-zoom" }}
      >
        {slides.map((item, i) => {
          const isActive = i === active;
          return (
            <article
              key={`${item.name}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative h-[min(600px,max(440px,calc(100svh-190px)))] w-[min(1320px,88vw)] shrink-0 snap-center overflow-hidden rounded-[20px] transition-all duration-500 ease-out sm:h-[min(clamp(430px,62vw,720px),max(400px,calc(100svh-240px)))] sm:w-[min(1320px,82vw)] sm:rounded-[24px] md:rounded-[32px] ${
                isActive ? "opacity-100 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]" : "opacity-45"
              }`}
              style={{ transform: isActive ? "scale(1)" : "scale(0.94)" }}
            >
              {/* portrait — sharp subject confined to the right image region so the
                  face never sits behind the curved information panel */}
              <div className="absolute inset-0 bg-[#131313]/60">
                {item.img ? (
                  <>





                    {/* the actual subject frame: starts to the right of the curve */}
                    <div className="absolute inset-x-0 top-0 h-[52%] overflow-hidden sm:inset-y-0 sm:left-[46%] sm:right-0 sm:h-auto md:left-[48%]">
                      <img
                        src={item.img}
                        alt={item.name}
                        draggable={false}
                        className={`h-full w-full select-none object-cover object-[58%_top] transition duration-700 sm:object-[64%_top] md:object-[66%_top] ${
                          isActive ? "grayscale-[0.35]" : "grayscale"
                        }`}
                      />
                    </div>
                  </>
                ) : (
                  <Initials name={item.name} />
                )}
              </div>


              {/* dark information panel — the curve is the only boundary */}
              {/* mobile: information sheet rises from the bottom under the portrait */}
              <div
                className="absolute inset-x-0 bottom-0 top-[46%] rounded-t-[32px] bg-[#131313] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.75)] sm:hidden"
                aria-hidden
              />
              <div
                className="absolute -left-[6%] top-[-8%] hidden h-[116%] w-[50%] bg-[#131313] sm:block"
                style={{
                  borderRadius: "0 30% 30% 0 / 0 50% 50% 0",
                  boxShadow: "24px 0 60px -20px rgba(0,0,0,0.75)",
                }}
                aria-hidden
              />
              <div
                className="absolute -left-[6%] top-[-8%] hidden h-[116%] w-[50%] sm:block"
                style={{
                  borderRadius: "0 30% 30% 0 / 0 50% 50% 0",
                  background:
                    "radial-gradient(120% 90% at 10% 50%, rgba(255,255,255,0.05), transparent 62%)",
                }}
                aria-hidden
              />

              {/* information */}
              <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-5 pb-6 pt-[48%] sm:w-[42%] sm:justify-center sm:px-0 sm:p-9 md:p-14">
                <div
                  className="text-[9px] uppercase tracking-[0.22em] text-white/45 sm:text-[9.5px] sm:tracking-[0.24em] md:text-[10.5px]"
                  style={{ fontFamily: MONO }}
                >
                  Industry Practitioner
                </div>
                <h3
                  className="mt-3 text-[clamp(1.3rem,5vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:mt-4 md:mt-6"
                  style={{ fontFamily: SERIF }}
                >
                  {item.name}
                </h3>
                <div
                  className="mt-2.5 text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-white/60 sm:mt-3 md:mt-5 md:text-[11px]"
                  style={{ fontFamily: MONO }}
                >
                  {item.role}
                </div>
                {item.blurb ? (
                  <p className="mt-3 line-clamp-5 max-w-[42ch] text-[12.5px] leading-[1.65] text-white/70 sm:mt-4 sm:line-clamp-none md:mt-7 md:text-[15px]">
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
      <div className="relative z-20 flex items-center justify-center gap-5 pb-6 md:pb-8">
        <button
          type="button"
          onClick={() => scrollTo(active - 1)}
          disabled={!loop && active === 0}
          aria-label="Previous practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:opacity-25"
        >
          ←
        </button>
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/45"
          style={{ fontFamily: MONO }}
        >
          {String(realIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(active + 1)}
          disabled={!loop && active === slides.length - 1}
          aria-label="Next practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:opacity-25"
        >
          →
        </button>
      </div>
    </div>
  );
}

