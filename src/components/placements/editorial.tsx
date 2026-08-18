import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ------------------------------- primitives ------------------------------- */

/** Editorial micro-label: tiny uppercase, letter-spaced, with an optional red dot. */
export function Label({
  children,
  dot = true,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[10px] uppercase tracking-[0.32em]",
        tone === "dark" ? "text-white/50" : "text-black/45",
        className,
      )}
      style={{ fontFamily: MONO }}
    >
      {dot ? <span aria-hidden className="size-[5px] shrink-0 bg-[#C8102E]" /> : null}
      <span>{children}</span>
    </p>
  );
}

/** Fade + lift on entry. Respects prefers-reduced-motion via CSS transition only. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/** Counts a numeric value upward once in view. Non-numeric prefixes/suffixes preserved. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.4);
  const [text, setText] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    if (!visible || done.current) return;
    const match = value.match(/-?[\d.,]+/);
    if (!match) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    done.current = true;

    const raw = match[0];
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const target = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;
    const grouped = raw.includes(",");
    const start = performance.now();
    const dur = 900;
    let raf = 0;

    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      return grouped ? Number(s).toLocaleString("en-US") : s;
    };

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(value.replace(raw, fmt(target * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setText(value.replace(raw, fmt(0)));
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/** Text-forward editorial CTA — no pills, no shadows. */
export function TextCta({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 border-b pb-1.5 text-[11px] uppercase tracking-[0.24em] transition-colors",
        tone === "dark"
          ? "border-white/25 text-white hover:border-white"
          : "border-black/25 text-black hover:border-[#C8102E]",
        className,
      )}
      style={{ fontFamily: MONO }}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/** Section shell: consistent gutters + max measure, optional tonal surface. */
export function Chapter({
  id,
  children,
  surface = "paper",
  className,
}: {
  id?: string;
  children: React.ReactNode;
  surface?: "paper" | "white" | "ink";
  className?: string;
}) {
  const bg =
    surface === "ink" ? "bg-[#0B0B0C] text-white" : surface === "white" ? "bg-white" : "bg-[#F7F7F5]";
  return (
    <section id={id} className={cn("scroll-mt-24", bg, className)}>
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}

/** Big editorial headline. */
export function Headline({
  children,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "text-balance font-semibold leading-[0.98] tracking-[-0.03em]",
        "text-[clamp(2.25rem,4.6vw,4.5rem)]",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function Rule({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full", tone === "dark" ? "bg-white/12" : "bg-black/12", className)}
    />
  );
}
