import { useCallback, useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { findBrand } from "@/lib/brand-logos";

/**
 * Portraits ship as ~1000x1360 PNGs (up to 1.8 MB). Requesting a width-capped
 * variant keeps the identical composition while cutting decode + rescale cost,
 * which is what made the arc hitch as cards entered the viewport.
 */
function sized(url: string, w: number) {
  return url.includes("?") ? url : `${url}?w=${w}`;
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS_H = "'Inter', system-ui, sans-serif";

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

/** Card geometry measured from the stage so the arc scales with the viewport. */
type Geometry = { cw: number; ch: number; visible: number; spread: number; depth: number };

function computeGeometry(stageW: number, viewportH: number): Geometry {
  // Active card: a generous portrait that comfortably shows the upper body.
  const ch = Math.max(300, Math.min(viewportH * 0.6, 660));
  const cw = Math.min(ch * 0.76, stageW * 0.46);
  const visible = stageW < 640 ? 1 : stageW < 1024 ? 2 : 3;
  return { cw, ch, visible, spread: cw * 0.86, depth: cw * 0.7 };
}


/**
 * Immersive editorial practitioner gallery arranged along an invisible 3D
 * elliptical arc: the active card sits closest to the viewer, neighbours recede
 * in depth with progressively smaller scale, lower opacity and natural overlap.
 * Each panel keeps its existing composition — LEFT information on dark charcoal,
 * RIGHT portrait, joined by a large sweeping curved cutout — and the portrait can
 * still be clicked to flip and reveal the practitioner's details.
 */
export default function PractitionerGallery({
  items,
  category = "Industry Practitioner",
}: {
  items: GalleryItem[];
  category?: string;
}) {
  const n = items.length;
  const [inputMode, setInputMode] = useState<"touch" | "pointer">("pointer");
  const [isTouchViewport, setIsTouchViewport] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [activeHovered, setActiveHovered] = useState(false);
  const [spinFlipIcon, setSpinFlipIcon] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  /**
   * Hybrid devices can have both a fine pointer and a touchscreen, so viewport
   * breakpoints are not a reliable input signal. Start with the device's actual
   * capabilities, then follow the pointer type used for the latest interaction.
   */
  useEffect(() => {
    const hasTouch = navigator.maxTouchPoints > 0 || window.matchMedia("(any-pointer: coarse)").matches;
    setInputMode(hasTouch ? "touch" : "pointer");

    const mql = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsTouchViewport(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  /**
   * ONE physical 3D wheel. `pos` is a CONTINUOUS rotational position measured in
   * cards. Autoplay, drag/swipe, trackpad and the arrows all write into the same
   * rotational state — there is no second animation system anywhere.
   */
  const posRef = useRef(0);
  const velRef = useRef(0); // cards per frame-equivalent (16ms)
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const hoverRef = useRef(false);
  const resumeAtRef = useRef(0); // timestamp when autoplay may take over again
  const lastTsRef = useRef(0);
  const [frontIdx, setFrontIdx] = useState(0);
  /** Per-frame DOM writers registered by each card — no React state on scroll. */
  const paintersRef = useRef<Array<(() => void) | null>>([]);
  const inViewRef = useRef(true);


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

      // paint straight to the DOM — compositor-friendly, zero React work
      for (const paint of paintersRef.current) paint?.();
      const nf = mod(Math.round(posRef.current));
      setFrontIdx((p) => (p === nf ? p : nf));

      rafRef.current = requestAnimationFrame(tick);
    },
    [mod, n, takeControl],
  );

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  /**
   * Only animate while the gallery is genuinely on screen AND actually visible.
   * A cheap 400ms poll (not a scroll handler) checks the rendered opacity, so a
   * gallery that has been visually covered stops burning frames.
   */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let intersecting = false;
    const evaluate = () => {
      if (document.hidden || !intersecting) {
        inViewRef.current = false;
        if (stageRef.current) stageRef.current.style.visibility = "hidden";
        stopLoop();
        return;
      }
      let node: HTMLElement | null = el;
      let alpha = 1;
      while (node && alpha > 0.06) {
        const o = Number.parseFloat(getComputedStyle(node).opacity || "1");
        if (!Number.isNaN(o)) alpha *= o;
        node = node.parentElement;
      }
      // occlusion: while another stacked section fully covers this gallery there
      // is no reason to paint or animate it
      let occluded = false;
      if (alpha > 0.06) {
        const r = el.getBoundingClientRect();
        const cx = Math.min(Math.max(r.left + r.width / 2, 1), window.innerWidth - 1);
        const cy = Math.min(Math.max(r.top + r.height / 2, 1), window.innerHeight - 1);
        const hit = document.elementFromPoint(cx, cy);
        occluded = !!hit && !el.contains(hit) && hit !== el;
      }
      inViewRef.current = alpha > 0.06 && !occluded;
      // a fully faded-out gallery costs nothing to paint either
      const stage = stageRef.current;
      if (stage) stage.style.visibility = inViewRef.current ? "visible" : "hidden";
      if (inViewRef.current) startLoop();
      else stopLoop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        evaluate();
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    const poll = window.setInterval(evaluate, 400);
    document.addEventListener("visibilitychange", evaluate);
    return () => {
      io.disconnect();
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", evaluate);
      stopLoop();
    };
  }, [startLoop, stopLoop]);



  useEffect(() => {
    hoverRef.current = isHovered;
    if (isHovered) resumeAtRef.current = Number.POSITIVE_INFINITY;
    else resumeAtRef.current = 0; // resume autoplay immediately on leave
  }, [isHovered]);

  /** One-time viewport entrance for the flip-hint attention animation. */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  /**
   * Click-to-focus: spin the ONE continuous wheel value along the shortest
   * rotational path until the clicked card index sits at the front.
   */
  const focusCard = useCallback(
    (i: number) => {
      setFlipped(null);
      takeControl();
      const cur = posRef.current;
      let d = i - cur;
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
      velRef.current = 0;
      targetRef.current = cur + d;
    },
    [n, takeControl],
  );

  const active = frontIdx;


  // signed offset from the continuous wheel position, wrapped so the arc loops
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - posRef.current;
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
      return d;
    },
    [n],
  );


  // drag / swipe — the wheel follows the pointer 1:1, then keeps its momentum
  const drag = useRef({ down: false, startX: 0, startPos: 0, moved: 0, lastX: 0, lastTs: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    setInputMode(e.pointerType === "touch" ? "touch" : "pointer");
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

  const focusRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hoverRef.current && !focusRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);


  const activeImg = items[active]?.img;

  /** Live geometry — measured so the arc and card scale with the viewport. */
  const [geo, setGeo] = useState<Geometry>(() => computeGeometry(1280, 900));
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const next = computeGeometry(el.clientWidth || window.innerWidth, window.innerHeight);
      setGeo((prev) =>
        prev.cw === next.cw && prev.ch === next.ch && prev.visible === next.visible ? prev : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const VISIBLE = geo.visible;

  const geoRef = useRef(geo);
  geoRef.current = geo;
  const activeHoveredRef = useRef(false);
  activeHoveredRef.current = activeHovered;

  /**
   * Each card registers a painter: the rAF loop writes transform/opacity straight
   * to the element so wheel rotation never triggers a React render or a reflow.
   */
  const registerCard = useCallback(
    (i: number, el: HTMLElement | null) => {
      if (!el) {
        paintersRef.current[i] = null;
        return;
      }
      const portrait = el.querySelector<HTMLElement>("[data-mu-portrait]");
      const shade = el.querySelector<HTMLElement>("[data-mu-shade]");
      paintersRef.current[i] = () => {
        const g = geoRef.current;
        const vis = g.visible;
        let off = i - posRef.current;
        off = ((off % n) + n) % n;
        if (off > n / 2) off -= n;
        const abs = Math.abs(off);
        const hidden = abs > vis + 0.5;
        const x =
          Math.sign(off) * (1 - Math.cos((Math.min(abs, vis) * Math.PI) / 9)) * (g.cw * 0.35) +
          off * g.spread;
        const z = -abs * g.depth;
        const rotY = -off * 30;
        const front = Math.max(0, 1 - abs);
        const hoverScale = abs < 0.5 && activeHoveredRef.current ? 1.015 : 1;
        const scale = Math.max(0.52, 1 - abs * 0.2) * hoverScale;
        const s = el.style;
        s.opacity = hidden ? "0" : String(Math.max(0.16, 1 - abs * 0.3));
        s.zIndex = String(100 - Math.round(abs * 10));
        s.boxShadow = front > 0 ? `0 60px 130px -50px rgba(0,0,0,${0.95 * front})` : "none";
        s.pointerEvents = hidden ? "none" : "auto";
        s.willChange = hidden ? "auto" : "transform, opacity";
        // off-arc cards are skipped by paint/composite entirely
        s.visibility = hidden ? "hidden" : "visible";
        s.contentVisibility = hidden ? "hidden" : "visible";
        s.transform = `perspective(1900px) translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
        if (portrait) portrait.style.filter = `grayscale(${1 - 0.65 * front})`;
        if (shade) shade.style.background = `rgba(6,6,6,${Math.min(0.55, abs * 0.22)})`;
      };
      paintersRef.current[i]?.();
    },
    [n],
  );

  /** Repaint once after geometry changes so a resize lands even while paused. */
  useEffect(() => {
    for (const paint of paintersRef.current) paint?.();
  }, [geo]);





  return (
    <div
      ref={wrapperRef}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => (focusRef.current = true)}
      onBlurCapture={() => (focusRef.current = false)}
      tabIndex={0}
    >

      {/* ambient dark atmosphere behind the active card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#0b0b0b]" />
        {activeImg ? (
          <img
            src={sized(activeImg, 480)}
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
        className="relative w-full"
        style={{
          height: geo.ch + 80,
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
          const isFlipped = flipped === i;
          const brand = findBrand(item.role, item.sub);

          // elliptical arc: sideways travel eases off while depth keeps growing
          const x =
            Math.sign(off) * (1 - Math.cos((Math.min(abs, VISIBLE) * Math.PI) / 9)) * (geo.cw * 0.35) +
            off * geo.spread;
          const z = -abs * geo.depth;
          const rotY = -off * 30;
          // active card reads distinctly larger than every neighbour
          const scale = Math.max(0.52, 1 - abs * 0.2);
          const opacity = hidden ? 0 : Math.max(0.16, 1 - abs * 0.3);
          // continuous 0..1 "frontness" — drives every look-and-feel value so
          // nothing switches state as a card passes through the centre
          const front = Math.max(0, 1 - abs);
          const grayscale = 1 - 0.65 * front;
          const shade = Math.min(0.55, abs * 0.22);
          const shadow = front > 0 ? `0 60px 130px -50px rgba(0,0,0,${0.95 * front})` : "none";

          return (
            <article
              key={`${item.name}-${i}`}
              ref={(el) => registerCard(i, el)}
              onClick={() => {
                if (drag.current.moved > 6) return;
                setHasFlipped(true);
                if (Math.abs(offsetOf(i)) >= 0.5) {
                  focusCard(i);
                  return;
                }
                setFlipped((f) => (f === i ? null : i));
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "touch" && isActive) {
                  setInputMode("pointer");
                  setActiveHovered(true);
                  setSpinFlipIcon(true);
                }
              }}
              onMouseLeave={() => { setActiveHovered(false); setSpinFlipIcon(false); }}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] sm:rounded-[26px] md:rounded-[30px]"
              style={{
                width: geo.cw,
                height: geo.ch,
                zIndex: 100 - Math.round(abs * 10),
                opacity,
                boxShadow: shadow,
                pointerEvents: hidden ? "none" : "auto",
                visibility: hidden ? "hidden" : "visible",
                contentVisibility: hidden ? "hidden" : "visible",
                backgroundColor: "#0f0f0f",
                transform: `perspective(1900px) translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                backfaceVisibility: "hidden",
                contain: "paint",
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
                      setHasFlipped(true);
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
                        src={sized(item.img, 760)}
                        alt={item.name}
                        draggable={false}
                        data-mu-portrait
                        loading={i < VISIBLE + 2 ? "eager" : "lazy"}
                        decoding="async"
                        width={Math.round(geo.cw)}
                        height={Math.round(geo.ch)}
                        className="h-full w-full select-none object-cover object-[50%_22%]"
                        style={{ filter: `grayscale(${grayscale})` }}
                      />
                    ) : (


                      <Initials name={item.name} />
                    )}
                    {isActive && !isFlipped ? (
                      <div
                        className={`pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-[7px] whitespace-nowrap rounded-full border border-white/35 bg-black/80 px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 min-w-[130px] sm:text-[11px] md:bottom-5 md:px-4 md:py-2.5 md:text-[10px] md:tracking-[0.2em] ${hasEntered && !hasFlipped ? "animate-mu-flip-hint" : ""} ${activeHovered ? "border-white/60 bg-black/90 shadow-[0_10px_32px_-4px_rgba(0,0,0,0.7)]" : ""}`}
                        style={{ fontFamily: MONO }}
                        aria-hidden
                      >
                        <span>{inputMode === "touch" || isTouchViewport ? "Tap to flip" : "Click to flip"}</span>
                        <span
                          aria-hidden
                          className="inline-block"
                          style={{
                            animation: spinFlipIcon ? "mu-flip-spin-once 650ms ease-in-out 1" : "none",
                          }}
                        >
                          ↻
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* BACK — collectible trading-card face */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[24px] md:rounded-[32px]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background:
                        "radial-gradient(120% 85% at 50% 0%, #1c1c1c 0%, #131313 45%, #0d0d0d 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 60px rgba(255,255,255,0.03)",
                    }}
                    aria-hidden={!(isFlipped && isActive)}
                  >
                    {/* trading-card composition: top row / centred identity / anchored metadata */}
                    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-[clamp(0.6rem,2.5%,1.35rem)] px-[clamp(0.85rem,6%,2.25rem)] py-[clamp(0.9rem,5%,2rem)]">
                      {/* TOP ROW — category + prominent brand mark */}
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
                        <div
                          className="min-w-0 text-[8px] uppercase leading-[1.35] tracking-[0.14em] text-white/45 sm:truncate sm:text-[9px] sm:tracking-[0.22em] md:text-[10.5px]"
                          style={{ fontFamily: MONO }}
                        >
                          {category}
                        </div>
                        {brand ? (
                          <BrandLogo
                            brand={brand}
                            className="shrink-0"
                            imgClassName="h-[26px] w-auto max-w-[92px] select-none object-contain opacity-100 sm:h-[34px] sm:max-w-[110px] md:h-[clamp(38px,4vw,52px)] md:max-w-[140px]"
                          />
                        ) : null}
                      </div>

                      {/* IDENTITY + BODY — vertically centred inside the flexible row */}
                      <div className="flex min-h-0 flex-col justify-center gap-[clamp(0.55rem,2.2%,1.1rem)] overflow-y-auto">
                        <div className="flex flex-col items-start gap-[0.6rem] sm:flex-row sm:items-center sm:gap-[clamp(0.7rem,2.5%,1.15rem)]">
                          <div className="h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-900 shadow-[0_0_0_4px_rgba(255,255,255,0.03)] sm:h-[clamp(64px,9vw,104px)] sm:w-[clamp(64px,9vw,104px)] sm:shadow-[0_0_0_5px_rgba(255,255,255,0.03)]">
                            {item.img ? (
                              <img
                                src={sized(item.img, 220)}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                                className="h-full w-full select-none object-cover object-[50%_18%]"
                              />
                            ) : (
                              <Initials name={item.name} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4
                              className="text-[1.02rem] font-bold not-italic leading-[1.08] tracking-[-0.035em] text-white sm:text-[clamp(1.2rem,2.6vw,1.95rem)] sm:leading-[1.05]"
                              style={{ fontFamily: SANS_H }}
                            >
                              {item.name}
                            </h4>
                            <div
                              className="mt-[0.45em] text-[8.5px] uppercase leading-[1.5] tracking-[0.12em] text-white/60 sm:text-[9.5px] sm:tracking-[0.16em] md:text-[11px]"
                              style={{ fontFamily: MONO }}
                            >
                              {item.role}
                            </div>
                          </div>
                        </div>
                        {item.blurb ? (
                          <p className="text-[0.8rem] leading-[1.55] text-white/70 sm:text-[0.92rem] sm:leading-[1.65] md:text-[0.98rem]">
                            {item.blurb}
                          </p>
                        ) : null}
                      </div>


                      {/* METADATA STRIP — anchored to the bottom of the card */}
                      {item.sub || brand ? (
                        <div className="w-full border-t border-white/12 pt-[clamp(0.55rem,1.8%,0.9rem)]">
                          <div
                            className="text-[7.5px] uppercase tracking-[0.2em] text-white/35 sm:text-[8.5px] sm:tracking-[0.24em] md:text-[9.5px]"
                            style={{ fontFamily: MONO }}
                          >
                            {item.sub ? "Expertise" : "Affiliation"}
                          </div>
                          <div
                            className="mt-[0.4em] text-[8.5px] uppercase leading-[1.5] tracking-[0.1em] text-white/65 sm:text-[9.5px] sm:tracking-[0.14em] md:text-[10.5px]"
                            style={{ fontFamily: MONO }}
                          >
                            {item.sub ?? brand?.name}
                          </div>
                        </div>
                      ) : null}
                    </div>

                  </div>

                </div>
              </div>

              {/* depth shading — always mounted, alpha follows the wheel angle */}
              <div
                className="pointer-events-none absolute inset-0"
                data-mu-shade
                style={{ background: `rgba(6,6,6,${shade})` }}
                aria-hidden
              />



            </article>
          );
        })}

        {/* side navigation — vertically centred on the active card */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous practitioner"
          style={{ left: `max(8px, calc(50% - ${geo.cw / 2 + 96}px))` }}
          className="absolute top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[14px] text-white/70 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next practitioner"
          style={{ right: `max(8px, calc(50% - ${geo.cw / 2 + 96}px))` }}
          className="absolute top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[14px] text-white/70 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
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
