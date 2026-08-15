import { useCallback, useRef } from "react";

const ACTIVE_CLASS = "touch-color-active";
const GALLERY_ATTR = "data-touch-gallery";

export function useTouchColor() {
  const ref = useRef<HTMLImageElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    // Only respond to touch/stylus pointers so mouse hover stays untouched.
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;

    const el = e.currentTarget;
    const gallery = el.closest(`[${GALLERY_ATTR}]`);

    // Deactivate any previously colored image in this gallery so the color
    // "moves" to the newly tapped image.
    if (gallery) {
      gallery.querySelectorAll<HTMLElement>("[data-touch-color]").forEach((img) => {
        img.classList.remove(ACTIVE_CLASS);
      });
    }

    el.classList.add(ACTIVE_CLASS);
  }, []);

  return {
    ref,
    onPointerDown,
    "data-touch-color": "",
  };
}
