import { useEffect, useState } from "react";

export type NavMode = "touch" | "pointer";

/**
 * Decides which navigation system should be visible.
 *
 * "touch"   → phones / tablets (touch as the primary input) → bottom navigation
 * "pointer" → desktops & laptops, INCLUDING touchscreen PCs → top floating nav
 *
 * Detection combines input capabilities with viewport information instead of
 * relying on width alone:
 *  - primary input is coarse and the device cannot hover  → touch device
 *  - a fine pointer (mouse / trackpad) exists              → PC, even with a touchscreen
 *  - very large viewports are always treated as PCs
 */
const COARSE = "(pointer: coarse)";
const NO_HOVER = "(hover: none)";
const ANY_FINE = "(any-pointer: fine)";
const ANY_HOVER = "(any-hover: hover)";
/** Above this logical width we assume a PC/laptop panel, not a tablet. */
const TABLET_MAX_WIDTH = 1279;

function detect(): NavMode {
  if (typeof window === "undefined" || !window.matchMedia) return "pointer";

  const coarsePrimary = window.matchMedia(COARSE).matches;
  const noHover = window.matchMedia(NO_HOVER).matches;
  const hasFinePointer = window.matchMedia(ANY_FINE).matches;
  const canHover = window.matchMedia(ANY_HOVER).matches;
  const hasTouch =
    (navigator.maxTouchPoints ?? 0) > 0 || "ontouchstart" in window;

  const shortSide = Math.min(window.innerWidth, window.innerHeight);
  const longSide = Math.max(window.innerWidth, window.innerHeight);

  // Touchscreen laptop / PC: touch exists, but a mouse or trackpad is also
  // present (fine pointer / hover capability) → keep desktop navigation.
  if (hasFinePointer || canHover) return "pointer";

  // Touch-first device (phone / tablet) without any pointing device.
  const touchFirst = hasTouch && (coarsePrimary || noHover);
  if (!touchFirst) return "pointer";

  // Guard against oversized touch panels (kiosks / large touch monitors).
  if (longSide > 1600 && shortSide > TABLET_MAX_WIDTH) return "pointer";

  return "touch";
}

export function useNavMode(): NavMode {
  const [mode, setMode] = useState<NavMode>("pointer");

  useEffect(() => {
    const update = () => {
      const next = detect();
      setMode(next);
      document.documentElement.dataset["navMode"] = next;
    };

    update();

    const queries = [COARSE, NO_HOVER, ANY_FINE, ANY_HOVER].map((q) =>
      window.matchMedia(q),
    );
    queries.forEach((q) => q.addEventListener("change", update));
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      queries.forEach((q) => q.removeEventListener("change", update));
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return mode;
}

export function useIsTouchNav() {
  return useNavMode() === "touch";
}
