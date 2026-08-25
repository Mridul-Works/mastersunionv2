import { useCallback, useEffect, useRef, useState } from "react";

const MONO = "var(--font-mono)";
const SERIF = "var(--font-serif)";

export type Testimonial = { q: string; a: string; r: string };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Stars({ size = 10, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-label="5 out of 5"
      className={`inline-flex items-center gap-[2px] text-[#B89146] ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

function Avatar({ name, size }: { name: string; size: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 ${size}`}
      style={{ fontFamily: MONO }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

const OFFSETS_BY_COUNT: Record<number, number[]> = {
  1: [-1, 0, 1],
  3: [-1, 0, 1],
  5: [-2, -1, 0, 1, 2],
};

export default function StudentTestimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(5);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setVisible(w < 700 ? 1 : w < 1100 ? 3 : 5);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const total = items.length;
  const move = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!inView) return;
      if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0;
    let live = false;
    const onStart = (e: TouchEvent) => {
      live = true;
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (!live) return;
      live = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      move(dx < 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [move]);

  const current = items[active];
  const offsets = OFFSETS_BY_COUNT[visible] ?? OFFSETS_BY_COUNT[5];

  return (
    <div>
      {/* Rail — breaks out of the content container */}
      <div
        ref={wrapRef}
        className="relative left-1/2 mt-[clamp(1.5rem,4vh,2.75rem)] w-screen -translate-x-1/2 overflow-hidden"
      >
        <div className="relative mx-auto flex h-[clamp(190px,26vh,230px)] max-w-[1800px] items-center justify-center">
          {offsets.map((off) => {
            const idx = (active + off + total * 4) % total;
            const t = items[idx];
            const dist = Math.abs(off);
            const isActive = off === 0;
            const step = visible === 1 ? 82 : visible === 3 ? 104 : 102;
            const opacity = isActive ? 1 : dist === 1 ? (visible === 1 ? 0.3 : 0.45) : 0.16;
            const scale = isActive ? 1 : dist === 1 ? 0.92 : 0.84;
            return (
              <button
                key={`${off}-${idx}`}
                type="button"
                onClick={() => (isActive ? undefined : move(off > 0 ? 1 : -1))}
                aria-label={`Show testimonial from ${t.a}`}
                className="absolute w-[min(86vw,320px)] cursor-pointer text-left transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${off * step}%) scale(${scale})`,
                  opacity,
                  zIndex: 10 - dist,
                  filter: dist > 1 ? "blur(1px)" : undefined,
                }}
              >
                <div
                  className={`border p-[clamp(0.9rem,2vh,1.2rem)] transition-colors duration-500 ${
                    isActive
                      ? "border-white/20 bg-white/[0.07] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Stars size={isActive ? 11 : 10} />
                    <span
                      className={`text-[10px] tracking-[0.16em] ${isActive ? "text-white/70" : "text-white/45"}`}
                      style={{ fontFamily: MONO }}
                    >
                      5.0
                    </span>
                  </div>
                  <p
                    className={`mt-3 line-clamp-3 leading-[1.55] ${
                      isActive ? "text-[0.95rem] text-white/85" : "text-[0.86rem] text-white/60"
                    }`}
                  >
                    &ldquo;{t.q}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
                    <Avatar name={t.a} size="size-8 text-[11px]" />
                    <span className="min-w-0">
                      <span className={`block truncate text-[0.9rem] ${isActive ? "text-white" : "text-white/70"}`}>
                        {t.a}
                      </span>
                      <span
                        className="block truncate text-[9.5px] uppercase tracking-[0.16em] text-white/45"
                        style={{ fontFamily: MONO }}
                      >
                        {t.r}
                      </span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[18vw] bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[18vw] bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-[clamp(0.75rem,2vh,1.25rem)] flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous testimonial"
          className="grid size-9 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
        >
          ←
        </button>
        <span className="text-[10px] tracking-[0.22em] text-white/40" style={{ fontFamily: MONO }}>
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next testimonial"
          className="grid size-9 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
        >
          →
        </button>
      </div>

      {/* Hairline */}
      <div className="mt-[clamp(1.25rem,3vh,2rem)] h-px w-full bg-white/10" />

      {/* Hero quote */}
      <figure key={active} className="mt-[clamp(1.5rem,4vh,2.5rem)] animate-fade-in">
        <blockquote
          className="max-w-[min(100%,30ch)] text-[clamp(1.5rem,3.4vw,2.9rem)] font-medium italic leading-[1.14] tracking-[-0.01em] text-white/[0.14] transition-colors duration-500 hover:text-[#f5f1e8]/85 md:max-w-[min(100%,42ch)]"
          style={{ fontFamily: SERIF }}
        >
          &ldquo;{current.q}&rdquo;
        </blockquote>
        <figcaption className="mt-[clamp(1.25rem,3vh,2rem)] grid gap-4 border-t border-white/10 pt-[clamp(0.9rem,2vh,1.25rem)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <span className="text-[10px] uppercase tracking-[0.26em] text-white/40" style={{ fontFamily: MONO }}>
            Masters&apos; Union · Student voices
          </span>
          <span className="flex min-w-0 items-center gap-3 sm:justify-end">
            <Avatar name={current.a} size="size-10 text-[12px]" />
            <span className="min-w-0">
              <span className="block truncate text-[0.95rem] text-white">{current.a}</span>
              <span
                className="block truncate text-[10px] uppercase tracking-[0.16em] text-white/50"
                style={{ fontFamily: MONO }}
              >
                {current.r}
              </span>
            </span>
            <Stars size={10} className="ml-1 shrink-0" />
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
