import type { ReactNode } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const SERIF = "'Fraunces', Georgia, serif";

/**
 * Serif-italic editorial accent — use for a word or short phrase inside an
 * otherwise upright sans-serif headline. Never wrap a whole heading in this.
 */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="font-light italic text-white/[0.14]" style={{ fontFamily: SERIF }}>
      {children}
    </span>
  );
}


/**
 * Shared editorial section intro.
 *
 * Section 05 / Become a Master on /faculty is the alignment source of truth:
 * centered label → centered headline (26ch) → centered paragraph (58ch),
 * with identical horizontal anchor and vertical rhythm at every breakpoint.
 *
 * Each element is marked with `reveal-up` so, when this component sits inside a
 * `.reveal-section` ancestor, it will stagger in on first viewport entry.
 * On pages without a reveal-section wrapper, the class has no effect.
 */
export function SectionIntro({
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mx-auto w-full text-center ${className}`}>
      <p
        className="reveal-up flex justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89146]"
        style={{ fontFamily: MONO, transitionDelay: "0ms" }}
      >
        <span>{index}</span>
        <span aria-hidden className="text-[#B89146]/50">
          /
        </span>
        <span>{eyebrow}</span>
      </p>

      <h2
        className="reveal-up mx-auto mt-[clamp(1.25rem,3.5vh,2.25rem)] max-w-[min(100%,26ch)] text-balance text-[clamp(1.75rem,4.4vw,3.4rem)] font-bold not-italic leading-[1.06] tracking-[-0.025em] text-white"
        style={{ fontFamily: SANS, transitionDelay: "80ms" }}
      >

        {title}
      </h2>

      {intro ? (
        <p
          className="reveal-up mx-auto mt-[clamp(1.1rem,3vh,1.75rem)] max-w-[min(100%,58ch)] text-[0.98rem] leading-[1.6] text-white/60"
          style={{ transitionDelay: "120ms" }}
        >
          {intro}
        </p>
      ) : null}

      {children ? (
        <div className="reveal-up" style={{ transitionDelay: "160ms" }}>
          {children}
        </div>
      ) : null}
    </header>
  );
}

export default SectionIntro;
