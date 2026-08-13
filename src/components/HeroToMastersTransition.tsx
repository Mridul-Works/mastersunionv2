import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Establishes a clean boundary between the faculty hero (headline + image +
 * "By the Numbers" glass card) and the following "Built by Scholars" section.
 *
 * The hero softens and drifts away as it leaves the viewport, a dark→light
 * gradient band carries the eye across the seam, and the next section reveals
 * upward. Content of both sections is untouched.
 */
export default function HeroToMastersTransition({
  hero,
  next,
}: {
  hero: ReactNode;
  next: ReactNode;
}) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <>
      {/* HERO block — ends after the statistics card */}
      <div ref={heroRef} className="relative bg-[#0a0a0a]">
        <motion.div
          style={
            reduce
              ? undefined
              : { opacity, y, scale, filter, transformOrigin: "50% 0%", willChange: "transform, opacity, filter" }
          }
        >
          {hero}
        </motion.div>
      </div>

      {/* Seam — dark to light, keeps the two sections from ever colliding */}
      <div
        aria-hidden
        className="relative h-[clamp(56px,9vh,120px)] w-full bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-white"
      >
        <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[min(1280px,88vw)] bg-black/10" />
      </div>

      {/* NEXT SECTION — its own background, spacing and upward reveal */}
      <motion.div
        className="relative bg-white"
        initial={reduce ? undefined : { opacity: 0, y: 44 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {next}
      </motion.div>
    </>
  );
}
