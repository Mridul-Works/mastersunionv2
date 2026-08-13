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
  const [isAnimating, setIsAnimating] = useState(false);

  const TRANSITION_MS = 850;
  const lock = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Advance exactly one card, then lock every input until the arc settles. */
  const go = useCallback(
    (dir: number) => {
      if (lock.current) return;
      lock.current = true;
      setIsAnimating(true);
      setFlipped(null);
      setActive((a) => ((a + Math.sign(dir)) % n + n) % n);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      unlockTimer.current = setTimeout(() => {
        lock.current = false;
        setIsAnimating(false);
      }, TRANSITION_MS);
    },
    [n],
  );

  useEffect(
    () => () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    },
    [],
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

  // drag / swipe — one completed gesture advances exactly one card
  const drag = useRef({ down: false, startX: 0, moved: 0, fired: false });
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { down: true, startX: e.clientX, moved: 0, fired: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down || drag.current.fired) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    if (drag.current.moved > 60) {
      drag.current.fired = true; // no further movement in this gesture can advance again
      go(dx < 0 ? 1 : -1);
    }
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  /**
   * Wheel / trackpad: treat a continuous burst of events as ONE gesture.
   * The first event past the threshold advances a single card; everything else
   * until the gesture goes idle (and the animation completes) is ignored.
   */
  const gesture = useRef({ active: false, idle: 0 });
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onWheel = (e: React.WheelEvent) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (!dx) return;
    e.preventDefault();

    // any wheel activity keeps the current gesture alive
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      gesture.current.active = false;
    }, 160);

    if (gesture.current.active || lock.current) return; // same gesture, or still animating
    if (Math.abs(dx) < 8) return; // ignore tiny accidental trackpad drift

    gesture.current.active = true;
    go(dx > 0 ? 1 : -1);
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
        className="relative h-[min(460px,max(380px,calc(100svh-280px)))] w-full sm:h-[min(clamp(420px,52vw,600px),max(380px,calc(100svh-240px)))]"
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
          const x = Math.sign(off) * (1 - Math.cos((Math.min(abs, VISIBLE) * Math.PI) / 9)) * 120 + off * 210;
          const z = -abs * 240;
          const rotY = -off * 26;
          const scale = Math.max(0.6, 1 - abs * 0.12);
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
              className={`absolute left-1/2 top-1/2 h-[min(460px,max(380px,calc(100svh-280px)))] w-[min(320px,72vw)] overflow-hidden rounded-[20px] sm:h-[min(clamp(420px,52vw,600px),max(380px,calc(100svh-240px)))] sm:w-[min(420px,34vw)] sm:rounded-[24px] md:rounded-[28px] ${
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
              {/* flip card: front = image only, back = details */}
              <div className="absolute inset-0 bg-[#0f0f0f]" style={{ perspective: "1400px" }}>
                <div
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-pressed={isFlipped}
                  aria-label={`Show details for ${item.name}`}
                  onKeyDown={(e) => {
                    if (!isActive) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlipped((f) => (f === i ? null : i));
                    }
                  }}
                  className="relative h-full w-full cursor-pointer outline-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped && isActive ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* FRONT — image only */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[32px]"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        draggable={false}
                        className={`h-full w-full select-none object-cover object-[50%_top] transition duration-700 ${
                          isActive ? "grayscale-[0.35]" : "grayscale"
                        }`}
                      />
                    ) : (
                      <Initials name={item.name} />
                    )}
                  </div>

                  {/* BACK — practitioner details */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-[20px] bg-[#131313] px-6 py-6 sm:rounded-[24px] sm:px-10 md:rounded-[32px] md:px-12"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    aria-hidden={!(isFlipped && isActive)}
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
          disabled={isAnimating}
          aria-label="Previous practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/70"
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
          disabled={isAnimating}
          aria-label="Next practitioner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[12px] text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/70"
        >
          →
        </button>
      </div>
    </div>
  );
}
