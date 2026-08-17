import * as React from "react";

/** Progress of an element travelling through the viewport, rAF-throttled. */
function useElementProgress<T extends HTMLElement>(
  start = 0.85,
  end = 0.25,
) {
  const ref = React.useRef<T | null>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;

    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element top sits at `start` of the viewport,
      // 1 when the element bottom has risen to `end`.
      const total = rect.height + vh * (start - end);
      const passed = vh * start - rect.top;
      const next = Math.min(1, Math.max(0, passed / Math.max(1, total)));
      if (Math.abs(next - last) < 0.002) return;
      last = next;
      setP(next);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [start, end]);

  return { ref, p };
}

/** Fires once the element enters the viewport. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = React.useRef<T | null>(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/**
 * Split-text reveal: each word lights from muted to white as the block
 * travels through the viewport.
 */
export function ScrollWords({
  text,
  className = "",
  dim = 0.14,
}: {
  text: string;
  className?: string;
  dim?: number;
}) {
  const { ref, p } = useElementProgress<HTMLParagraphElement>(0.82, 0.4);
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  return (
    <p ref={ref} className={className} style={{ willChange: "contents" }}>
      {words.map((w, i) => {
        // staggered window per word
        const startAt = i / words.length;
        const local = Math.min(1, Math.max(0, (p - startAt * 0.85) / 0.14));
        const opacity = dim + (1 - dim) * local;
        return (
          <span
            key={`${w}-${i}`}
            style={{
              opacity,
              transform: `translateY(${(1 - local) * 0.14}em)`,
              display: "inline-block",
              transition: "opacity 120ms linear, transform 220ms ease-out",
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </p>
  );
}

/** Editorial clip-path wipe + gentle scale settle. */
export function ClipReveal({
  src,
  alt,
  className = "",
  ratio = "4 / 5",
  direction = "up",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.18);
  const hidden =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : direction === "down"
        ? "inset(0% 0% 100% 0%)"
        : direction === "left"
          ? "inset(0% 0% 0% 100%)"
          : "inset(0% 100% 0% 0%)";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl bg-white/5 ${className}`}
      style={{ aspectRatio: ratio, contain: "paint" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{
          clipPath: seen ? "inset(0% 0% 0% 0%)" : hidden,
          transform: seen ? "scale(1)" : "scale(1.12)",
          filter: seen ? "saturate(1)" : "saturate(0.4)",
          transition: `clip-path 1400ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 1600ms ease ${delay}ms`,
          willChange: "clip-path, transform",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
    </div>
  );
}

/** Fade + lift on enter, with optional stagger. */
export function FadeLift({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 1100ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1100ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export { useElementProgress, useInView };
