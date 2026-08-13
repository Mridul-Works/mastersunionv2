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
  const [flipped, setFlipped] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * ONE physical 3D wheel. `pos` is a CONTINUOUS rotational position measured in
   * cards. Autoplay, drag/swipe, trackpad and the arrows all write into the same
   * rotational state — there is no second animation system anywhere.
   */
  const posRef = useRef(0);
  const velRef = useRef(0); // cards per frame-equivalent (16ms)
  const targetRef = useRef<number | null>(null);
  const [pos, setPos] = useState(0);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const hoverRef = useRef(false);
  const resumeAtRef = useRef(0); // timestamp when autoplay may take over again
  const lastTsRef = useRef(0);
  const [frontIdx, setFrontIdx] = useState(0);

  /** px of horizontal travel that equals one card of wheel rotation. */
  const STEP_PX = 260;
  /** Heavy-wheel autoplay: ~one card position every 5s. */
  const AUTO_VEL = 16 / 5000; // cards per 16ms
  const RESUME_DELAY_MS = 4500;
  const FRICTION = 0.94;
  const SPRING = 0.085;
  const DAMP = 0.78;
  const MAX_VEL = 0.55;
  const BLEND = 0.035; // how gently free motion eases into the autoplay drift

  const mod = useCallback((v: number) => ((v % n) + n) % n, [n]);

  /** Any manual input pauses the drift and re-arms the resume delay. */
  const takeControl = useCallback(() => {
    resumeAtRef.current = performance.now() + RESUME_DELAY_MS;
  }, []);

  const tick = useCallback(
    (now: number) => {
      const prev = lastTsRef.current || now;
      const dt = Math.min(64, Math.max(4, now - prev)) / 16; // frame-equivalents
      lastTsRef.current = now;

      if (!draggingRef.current) {
        const autoOn = !hoverRef.current && n > 1 && now >= resumeAtRef.current;
        const t = targetRef.current;
        if (t !== null) {
          // controlled rotation (arrows / keys): spring the wheel to the target
          velRef.current += (t - posRef.current) * SPRING * dt;
          velRef.current *= Math.pow(DAMP, dt);
          if (Math.abs(t - posRef.current) < 0.002 && Math.abs(velRef.current) < 0.004) {
            posRef.current = t;
            velRef.current = 0;
            targetRef.current = null;
            takeControl();
          }
        } else if (autoOn) {
          // continuous heavy-wheel drift — gesture momentum eases into it
          velRef.current += (AUTO_VEL - velRef.current) * BLEND * dt;
        } else {
          // paused (hover) or waiting to resume: let inertia decay to a stop
          velRef.current *= Math.pow(FRICTION, dt);
          if (Math.abs(velRef.current) < 0.0004) velRef.current = 0;
        }
        velRef.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, velRef.current));
        posRef.current += velRef.current * dt;
      }

      setPos(posRef.current);
      const nf = mod(Math.round(posRef.current));
      setFrontIdx((p) => (p === nf ? p : nf));

      rafRef.current = requestAnimationFrame(tick);
    },
    [mod, n, takeControl],
  );

  useEffect(() => {
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [tick]);

  useEffect(() => {
    hoverRef.current = isHovered;
    if (isHovered) resumeAtRef.current = Number.POSITIVE_INFINITY;
    else resumeAtRef.current = 0; // resume autoplay immediately on leave
  }, [isHovered]);

  /** Controlled wheel rotation used by the arrows and keyboard. */
  const go = useCallback(
    (dir: number) => {
      setFlipped(null);
      takeControl();
      const base = targetRef.current !== null ? targetRef.current : Math.round(posRef.current);
      targetRef.current = base + Math.sign(dir);
    },
    [takeControl],
  );

  const active = frontIdx;

  // signed offset from the continuous wheel position, wrapped so the arc loops
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - pos;
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
      return d;
    },
    [pos, n],
  );

  // drag / swipe — the wheel follows the pointer 1:1, then keeps its momentum
  const drag = useRef({ down: false, startX: 0, startPos: 0, moved: 0, lastX: 0, lastTs: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    targetRef.current = null;
    velRef.current = 0;
    takeControl();
    drag.current = {
      down: true,
      startX: e.clientX,
      startPos: posRef.current,
      moved: 0,
      lastX: e.clientX,
      lastTs: e.timeStamp || performance.now(),
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    posRef.current = drag.current.startPos - dx / STEP_PX;

    const now = e.timeStamp || performance.now();
    const dt = Math.max(8, now - drag.current.lastTs);
    velRef.current = -((e.clientX - drag.current.lastX) / STEP_PX) * (16 / dt);
    drag.current.lastX = e.clientX;
    drag.current.lastTs = now;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    draggingRef.current = false;
    targetRef.current = null; // free spin: inertia then back into the drift
    takeControl();
  };

  /**
   * Wheel / trackpad. Horizontal delta feeds the same rotational velocity —
   * a stronger flick spins further and several cards pass the centre in one
   * gesture; there is no one-card-per-gesture snap.
   */
  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!dx) return;
      e.preventDefault();
      targetRef.current = null;
      takeControl();
      velRef.current += (dx / STEP_PX) * 0.5;
      velRef.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, velRef.current));
    },
    [takeControl],
  );

  const handleWheelRef = useRef(handleWheel);
  handleWheelRef.current = handleWheel;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const listener = (e: WheelEvent) => handleWheelRef.current(e);
    el.addEventListener("wheel", listener, { passive: false });
    return () => el.removeEventListener("wheel", listener);
  }, []);

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
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

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
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}

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
          const hidden = abs > VISIBLE + 0.5;
          const isActive = i === active;
          const isFront = abs < 0.5;
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
                if (!isFront) {
                  go(off > 0 ? 1 : -1);
                  return;
                }
                setFlipped((f) => (f === i ? null : i));
              }}
              aria-hidden={hidden}
              className={`absolute left-1/2 top-1/2 h-[min(460px,max(380px,calc(100svh-280px)))] w-[min(320px,72vw)] overflow-hidden rounded-[20px] sm:h-[min(clamp(420px,52vw,600px),max(380px,calc(100svh-240px)))] sm:w-[min(420px,34vw)] sm:rounded-[24px] md:rounded-[28px] ${
                isFront ? "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]" : ""
              }`}
              style={{
                zIndex: 100 - Math.round(abs * 10),
                opacity,
                pointerEvents: hidden ? "none" : "auto",
                backgroundColor: "#0f0f0f",
                transform: `perspective(1600px) translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                willChange: "transform, opacity",

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

        {/* side navigation — vertically centred on the active card */}
        <button
          type="button"
          onClick={() => go(-1)}
          
          aria-label="Previous practitioner"
          className="absolute top-1/2 z-[200] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[13px] text-white/70 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/70 left-[max(6px,calc(50%-min(320px,72vw)/2-30px))] sm:left-[max(10px,calc(50%-min(420px,34vw)/2-40px))]"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          
          aria-label="Next practitioner"
          className="absolute top-1/2 z-[200] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[13px] text-white/70 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/70 right-[max(6px,calc(50%-min(320px,72vw)/2-30px))] sm:right-[max(10px,calc(50%-min(420px,34vw)/2-40px))]"
        >
          →
        </button>
      </div>

      {/* counter */}
      <div
        className="relative z-20 flex items-center justify-center pb-6 pt-4 text-[10px] uppercase tracking-[0.22em] text-white/45 md:pb-8"
        style={{ fontFamily: MONO }}
      >
        {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </div>
    </div>
  );
}
