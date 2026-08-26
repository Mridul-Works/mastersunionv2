import * as React from "react";
import { onScrollFrame, onViewportResize } from "@/lib/scroll-driver";


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
  // the compositor hint is only useful while the reveal is running; leaving it on
  // dozens of nodes forever keeps as many permanent layers alive (costly on wide screens)
  const [settled, setSettled] = React.useState(false);
  React.useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setTimeout(() => setSettled(true), delay + duration + 60);
    return () => window.clearTimeout(t);
  }, [inView, reduced, delay, duration]);

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
        willChange: reduced || settled ? undefined : "transform, opacity",
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
    let visible = false;
    let applied = 0;
    let docCenter = 0;
    let last = NaN;

    // geometry is measured once (and on resize / size change), never per frame
    const measure = () => {
      const rect = el.getBoundingClientRect();
      docCenter = rect.top + window.scrollY - applied + rect.height / 2;
    };

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
    });
    io.observe(el);

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const offResize = onViewportResize(measure);

    const off = onScrollFrame(({ y, vh }) => {
      if (!visible) return;
      const p = (docCenter - y - vh / 2) / vh; // -1..1
      const next = Number((-p * strength).toFixed(2));
      if (next === last) return;
      last = next;
      applied = next;
      el.style.transform = `translate3d(0, ${next}px, 0)`;
    });

    return () => {
      io.disconnect();
      ro.disconnect();
      offResize();
      off();
      el.style.transform = "";
    };
  }, [reduced, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: reduced ? undefined : "transform",
        transform: reduced ? undefined : "translate3d(0,0,0)",
        backfaceVisibility: reduced ? undefined : "hidden",
      }}
    >
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
    // scrollHeight is a layout read — cache it and refresh only when the document resizes
    let max = 1;
    let last = NaN;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    const offResize = onViewportResize(measure);
    const off = onScrollFrame(({ y }) => {
      const p = Math.min(1, Math.max(0, y / max));
      const next = Number(p.toFixed(4));
      if (next === last) return;
      last = next;
      el.style.transform = `scaleX(${next})`;
    });
    return () => {
      ro.disconnect();
      offResize();
      off();
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
    let visible = false;
    let docTop = 0;
    let height = 1;
    let last = NaN;

    const measure = () => {
      const rect = host.getBoundingClientRect();
      docTop = rect.top + window.scrollY;
      height = Math.max(1, rect.height);
    };

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? false;
    });
    io.observe(host);

    const ro = new ResizeObserver(measure);
    ro.observe(host);
    const offResize = onViewportResize(measure);

    const off = onScrollFrame(({ y, vh }) => {
      if (!visible) return;
      const p = (vh * 0.72 - (docTop - y)) / height;
      const next = Number(Math.min(1, Math.max(0, p)).toFixed(4));
      if (next === last) return;
      last = next;
      el.style.transform = `scaleY(${next})`;
    });

    return () => {
      io.disconnect();
      ro.disconnect();
      offResize();
      off();
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
