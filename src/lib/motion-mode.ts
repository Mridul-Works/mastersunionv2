import { useEffect, useState } from "react";

/**
 * Global motion quality preference.
 *
 * - `full` — cinematic parallax: cursor mask reveal, Lenis smooth scroll,
 *   3D perspective gallery, scroll-linked recede.
 * - `lite` — transform-only: plain translate/scale/opacity, native scroll,
 *   no per-frame mask painting, no autoplay drift.
 *
 * The resolved mode is mirrored on `<html data-motion="...">` so CSS can react,
 * persisted in localStorage, and broadcast via a `motion-mode` window event so
 * every consumer stays in sync without a provider.
 */
export type MotionMode = "full" | "lite";

const KEY = "mu:motion-mode";
const EVENT = "motion-mode";

/** Heuristic low-end detection: reduced motion, few cores, little RAM, data saver. */
export function detectLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData) return true;
    if (nav.connection?.effectiveType && /(^|\W)(2g|slow-2g|3g)$/.test(nav.connection.effectiveType))
      return true;
    const mem = nav.deviceMemory;
    if (typeof mem === "number" && mem > 0 && mem <= 4) return true;
    const cores = nav.hardwareConcurrency;
    if (typeof cores === "number" && cores > 0 && cores <= 4) return true;
    // Small coarse-pointer screens: phones do the worst with layered 3D.
    if (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768) return true;
  } catch {}
  return false;
}

function apply(mode: MotionMode) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.motion = mode;
  }
}

/** Resolve the mode: explicit user choice wins, otherwise auto-detect. */
export function resolveMotionMode(): MotionMode {
  if (typeof window === "undefined") return "full";
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "full" || stored === "lite") return stored;
  } catch {}
  return detectLowEndDevice() ? "lite" : "full";
}

export function setMotionMode(mode: MotionMode) {
  try {
    window.localStorage.setItem(KEY, mode);
  } catch {}
  apply(mode);
  window.dispatchEvent(new CustomEvent<MotionMode>(EVENT, { detail: mode }));
}

/**
 * Subscribe to the resolved motion mode.
 * SSR-safe: renders `full` on the server, then settles after hydration.
 */
export function useMotionMode() {
  const [mode, setMode] = useState<MotionMode>("full");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = resolveMotionMode();
    apply(initial);
    setMode(initial);
    setReady(true);
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<MotionMode>).detail;
      if (next === "full" || next === "lite") setMode(next);
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  return { mode, isLite: mode === "lite", ready, setMode: setMotionMode };
}
