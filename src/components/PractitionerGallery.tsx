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

/** Cards visible on either side of the active one along the elliptical arc. */
const VISIBLE = 3;

/**
 * Immersive editorial practitioner gallery arranged along an invisible 3D
 * elliptical arc: the active card sits closest to the viewer, neighbours recede
 * in depth with progressively smaller scale, lower opacity and natural overlap.
 * Each panel keeps its existing composition — LEFT information on dark charcoal,
 * RIGHT portrait, joined by a large sweeping curved cutout — and the portrait can
 * still be clicked to flip and reveal the practitioner's details.
 */
export default function PractitionerGallery({ items }: { items: GalleryItem[] }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      setFlipped(null);
      setActive((a) => ((a + dir) % n + n) % n);
    },
    [n],
  );

  // signed offset from the active card, wrapped so the arc is continuous
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - active;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      return d;
    },
    [active, n],
  );

  // drag / swipe
  const drag = useRef({ down: false, startX: 0, moved: 0, fired: false });
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { down: true, startX: e.clientX, moved: 0, fired: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    if (!drag.current.fired && drag.current.moved > 60) {
      drag.current.fired = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  // wheel / trackpad rotation, throttled so one gesture moves one card
  const wheelLock = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (!d) return;
    e.preventDefault();
    const now = Date.now();
    if (now - wheelLock.current < 420) return;
    wheelLock.current = now;
    go(d > 0 ? 1 : -1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const activeImg = items[active]?.img;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
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

      {/* 3D stage */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
        onDragStart={(e) => e.preventDefault()}
        className="relative h-[min(500px,max(420px,calc(100svh-260px)))] w-full sm:h-[min(clamp(430px,62vw,720px),max(400px,calc(100svh-240px)))]"
        style={{
          perspectiveOrigin: "50% 50%",
          cursor: "grab",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        {items.map((item, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          const hidden = abs > VISIBLE;
          const isActive = off === 0;
          const isFlipped = flipped === i;

          // elliptical arc: sideways travel eases off while depth keeps growing
          const x = Math.sign(off) * (1 - Math.cos((Math.min(abs, VISIBLE) * Math.PI) / 9)) * 220 + off * 300;
          const z = -abs * 240;
          const rotY = -off * 26;
          const scale = Math.max(0.6, 1 - abs * 0.1);
          const opacity = hidden ? 0 : Math.max(0.18, 1 - abs * 0.28);

          return (
            <article
              key={`${item.name}-${i}`}
              onClick={() => {
                if (drag.current.moved > 6) return;
                if (!isActive) {
                  go(off > 0 ? 1 : -1);
                  return;
                }
                setFlipped((f) => (f === i ? null : i));
              }}
              aria-hidden={hidden}
              className={`absolute left-1/2 top-1/2 h-[min(500px,max(420px,calc(100svh-260px)))] w-[min(1320px,88vw)] overflow-hidden rounded-[20px] sm:h-[min(clamp(430px,62vw,720px),max(400px,calc(100svh-240px)))] sm:w-[min(1100px,74vw)] sm:rounded-[24px] md:rounded-[32px] ${
                isActive ? "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]" : ""
              }`}
              style={{
                zIndex: 100 - abs,
                opacity,
                pointerEvents: hidden ? "none" : "auto",
                backgroundColor: "#0f0f0f",
                transform: `perspective(1600px) translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                transition:
                  "transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* portrait — sharp subject confined to the right image region */}
              <div className="absolute inset-0 bg-[#0f0f0f]">
                {item.img ? (
                  <div
                    className="absolute inset-x-0 top-0 h-[62%] sm:inset-y-0 sm:left-[46%] sm:right-0 sm:h-auto md:left-[48%]"
                    style={{ perspective: "1400px" }}
                  >
                    <div
                      role="button"
                      tabIndex={isActive ? 0 : -1}
                      aria-pressed={isFlipped}
                      aria-label={`Show details for ${item.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setFlipped((f) => (f === i ? null : i));
                        }
                      }}
                      className="relative h-full w-full cursor-pointer outline-none"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          draggable={false}
                          className={`h-full w-full select-none object-cover object-[58%_top] transition duration-700 sm:object-[64%_top] md:object-[66%_top] ${
                            isActive ? "grayscale-[0.35]" : "grayscale"
                          }`}
                        />
                      </div>
                      <div
                        className="absolute inset-0 flex flex-col justify-center overflow-hidden bg-[#131313] px-6 py-6 sm:px-10 md:px-12"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                        aria-hidden={!isFlipped}
                      >
                        <div
                          className="text-[9px] uppercase tracking-[0.22em] text-white/45 md:text-[10.5px]"
                          style={{ fontFamily: MONO }}
                        >
                          Industry Practitioner
                        </div>
                        <h4
                          className="mt-3 text-[clamp(1.2rem,3.4vw,2.2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
                          style={{ fontFamily: SERIF }}
                        >
                          {item.name}
                        </h4>
                        <div
                          className="mt-2.5 text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-white/60 md:text-[11px]"
                          style={{ fontFamily: MONO }}
                        >
                          {item.role}
                        </div>
                        {item.blurb ? (
                          <p className="mt-3 max-w-[42ch] text-[12.5px] leading-[1.65] text-white/70 md:mt-5 md:text-[15px]">
                            {item.blurb}
                          </p>
                        ) : null}
                        {item.sub ? (
                          <div
                            className="mt-5 border-t border-white/12 pt-4 text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-white/45 md:text-[10.5px]"
                            style={{ fontFamily: MONO }}
                          >
                            {item.sub}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Initials name={item.name} />
                )}
              </div>

              {/* dark information panel — the curve is the only boundary */}
              <div
                className="absolute inset-x-0 bottom-0 top-[56%] rounded-t-[28px] bg-[#131313] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.75)] sm:hidden"
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
              <div className="relative flex h-full w-full flex-col justify-end overflow-hidden px-5 pb-5 sm:w-[42%] sm:justify-center sm:p-9 md:p-14">
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

              {/* depth shading for receding cards */}
              {!isActive && !hidden ? (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `rgba(6,6,6,${Math.min(0.55, abs * 0.2)})` }}
                  aria-hidden
                />
              ) : null}
            </article>
          );
        })}
      </div>

      {/* minimal controls */}
      <div className="relative z-20 flex items-center justify-center gap-5 pb-6 pt-4 md:pb-8">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          ←
        </button>
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/45"
          style={{ fontFamily: MONO }}
        >
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
