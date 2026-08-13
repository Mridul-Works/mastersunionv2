import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps ONLY the hero (label, headline, description, image, scroll indicator
 * and the "By the Numbers" glass card). As the hero leaves the viewport it
 * softens and drifts away. It owns no other section.
 */
export default function HeroFadeOut({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.99]);

  return (
    <div ref={ref} className="relative isolate bg-[#0a0a0a]">
      <motion.div
        style={
          reduce
            ? undefined
            : { opacity, y, scale, transformOrigin: "50% 0%", willChange: "transform, opacity" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
