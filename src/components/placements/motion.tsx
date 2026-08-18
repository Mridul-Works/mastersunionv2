import * as React from "react";

/* -------------------------------------------------------------------------- */
/*  Shared scroll-motion primitives for the Careers & Placements page.        */
/*  All effects are transform/opacity/clip-path only, IntersectionObserver    */
/*  driven, and fully disabled under prefers-reduced-motion.                  */
/* -------------------------------------------------------------------------- */

export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Fires once when the element scrolls into view. */
export function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

const EASE = "cubic-bezier(0.16, 0.84, 0.24, 1)";

type Tag = "div" | "section" | "header" | "li" | "tr" | "span" | "p";

/** Fade + subtle upward lift. The workhorse reveal. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 800,
  as = "div",
  className = "",
  style,
}: {
  children?: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: Tag;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const Comp = as as any;

  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView || reduced ? 1 : 0,
        transform: inView || reduced ? "none" : `translate3d(0,${y}px,0)`,
        transition: reduced
          ? "opacity 240ms linear"
          : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: reduced ? undefined : "transform, opacity",
      }}
    >
      {children}
    </Comp>
  );
}

/** Clip-path mask wipe + gentle scale settle for imagery. */
export function ClipReveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const closed = from === "bottom" ? "inset(28% 0% 0% 0%)" : "inset(0% 0% 0% 22%)";

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ clipPath: "inset(0)" }}>
      <div
        style={{
          clipPath: inView || reduced ? "inset(0% 0% 0% 0%)" : closed,
          transform: inView || reduced ? "scale(1)" : "scale(1.045)",
          opacity: inView || reduced ? 1 : 0.55,
          transition: reduced
            ? "opacity 240ms linear"
            : `clip-path 1100ms ${EASE} ${delay}ms, transform 1400ms ${EASE} ${delay}ms, opacity 900ms ${EASE} ${delay}ms`,
          willChange: reduced ? undefined : "clip-path, transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Very restrained parallax: element drifts a few percent slower than the page. */
export function Parallax({
  children,
  strength = 40,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
      if (visible) tick();
    });
    io.observe(el);

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1
      el.style.transform = `translate3d(0, ${(-p * strength).toFixed(2)}px, 0)`;
    };
    const tick = () => {
      if (!raf && visible) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      el.style.transform = "";
    };
  }, [reduced, strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: reduced ? undefined : "transform" }}>
      {children}
    </div>
  );
}

/* --------------------------------- count-up -------------------------------- */

const NUM_RE = /\d[\d,]*(?:\.\d+)?/;

/**
 * Animates the first numeric token inside an existing label from 0 to its
 * final value, then renders the ORIGINAL string verbatim. Prefixes, suffixes,
 * currency symbols, separators and decimals are preserved exactly.
 */
export function CountUp({
  value,
  duration = 1100,
  className = "",
  delay = 0,
}: {
  value: string;
  duration?: number;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const match = value.match(NUM_RE);
  const [text, setText] = React.useState(() => value);

  React.useEffect(() => {
    if (!match || reduced) {
      setText(value);
      return;
    }
    setText(value.replace(NUM_RE, formatLike(0, match[0])));
  }, [value, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!inView || !match || reduced) return;
    const raw = match[0];
    const target = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      setText(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const run = (t: number) => {
      if (!start) start = t + delay;
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        setText(value);
        return;
      }
      setText(value.replace(NUM_RE, formatLike(target * eased, raw)));
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, delay, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}

function formatLike(n: number, sample: string) {
  const decimals = sample.includes(".") ? sample.split(".")[1].length : 0;
  const grouped = sample.includes(",");
  const fixed = n.toFixed(decimals);
  if (!grouped) return fixed;
  const [int, dec] = fixed.split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withCommas}.${dec}` : withCommas;
}

/* ------------------------------ drawn measures ----------------------------- */

/** A bar/line that draws from 0 to its width (or height) when scrolled into view. */
export function Draw({
  children,
  axis = "x",
  delay = 0,
  duration = 900,
  className = "",
  style,
}: {
  children?: React.ReactNode;
  axis?: "x" | "y";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transformOrigin: axis === "x" ? "left center" : "center bottom",
        transform: on ? "scale(1,1)" : axis === "x" ? "scale(0,1)" : "scale(1,0)",
        opacity: on ? 1 : 0.2,
        transition: reduced
          ? "none"
          : `transform ${duration}ms ${EASE} ${delay}ms, opacity ${duration}ms ${EASE} ${delay}ms`,
        willChange: reduced ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ page progress ------------------------------ */

/** 2px editorial scroll progress hairline pinned to the top of the viewport. */
export function ScrollProgress({ color = "rgba(0,0,0,0.75)" }: { color?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p)).toFixed(4)})`;
    };
    const tick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ background: color, transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}

/** Progressively drawn vertical timeline rail tied to the section's scroll. */
export function TimelineRail({ className = "" }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.parentElement;
    if (!host) return;
    if (reduced) {
      el.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
      if (visible) tick();
    });
    io.observe(host);

    const update = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (vh * 0.72 - rect.top) / Math.max(1, rect.height);
      el.style.transform = `scaleY(${Math.min(1, Math.max(0, p)).toFixed(4)})`;
    };
    const tick = () => {
      if (!raf && visible) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`origin-top ${className}`}
      style={{ transform: "scaleY(0)", willChange: "transform" }}
    />
  );
}
