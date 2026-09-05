import type { ReactNode } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "var(--faculty-font-body, 'Work Sans', system-ui, sans-serif)";
const SERIF = "var(--faculty-font-display, 'Instrument Serif', Georgia, serif)";

/**
 * Serif-italic editorial accent — use for a word or short phrase inside an
 * otherwise upright sans-serif headline. Never wrap a whole heading in this.
 */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="faculty-heading-accent font-normal italic" style={{ fontFamily: SERIF }}>
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
        className="faculty-section-kicker flex justify-center gap-3 text-[10px] font-semibold uppercase"
        style={{ fontFamily: MONO }}
      >
        <span>{index}</span>
        <span aria-hidden className="opacity-50">
          /
        </span>
        <span>{eyebrow}</span>
      </p>

      <h2
        className="faculty-section-title mx-auto mt-[clamp(1.25rem,3.5vh,2.25rem)] max-w-[min(100%,22ch)] text-balance text-[clamp(2.5rem,5.6vw,5rem)] font-normal leading-[0.98] text-foreground"
        style={{ fontFamily: SERIF }}
      >

        {title}
      </h2>

      {intro ? (
        <p className="mx-auto mt-[clamp(1.1rem,3vh,1.75rem)] max-w-[min(100%,58ch)] text-[0.98rem] leading-[1.6] text-white/60">
          {intro}
        </p>
      ) : null}

      {children}
    </header>
  );
}

export default SectionIntro;
