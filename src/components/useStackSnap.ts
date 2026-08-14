import * as React from "react";

/**
 * Discrete, one-gesture-at-a-time scroll controller for the stacked panels.
 *
 * The DOM/layout of the stack is untouched — this only replaces free-form
 * scrolling with animated jumps between pre-computed "rest" positions:
 *  - every viewport step inside a panel's own content overflow (long galleries)
 *  - the position where the next panel has fully covered the current one
 *
 * One intentional wheel/touch/key gesture = at most one transition. Scroll
 * momentum during and shortly after a transition is swallowed, and reversing
 * direction simply targets the previous rest position.
 */
export function useStackSnap(containerRef: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const root = containerRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = () => (window as any).__lenis ?? null;

    /* ---------- rest positions ---------- */
    let stops: number[] = [];

    const measure = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const raw: number[] = [];
      const panels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-stack-panel]"),
      );
      panels.forEach((p) => {
        const top = p.getBoundingClientRect().top + scrollY;
        const overflow = Number(p.dataset["overflow"] ?? 0);
        const cover = Number(p.dataset["cover"] ?? 0);
        const isLast = p.dataset["last"] === "true";
        const steps = Math.max(1, Math.ceil(overflow / Math.max(1, vh * 0.9)));
        for (let k = 0; k <= steps; k++) {
          raw.push(top + Math.min(overflow, (overflow / steps) * k));
        }
        if (!isLast) raw.push(top + overflow + cover);
      });
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      stops = Array.from(new Set(raw.map((v) => Math.round(Math.min(max, Math.max(0, v))))))
        .sort((a, b) => a - b)
        .filter((v, i, arr) => i === 0 || v - arr[i - 1]! > 24);
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    window.addEventListener("resize", measure);

    /* ---------- animation ---------- */
    let animating = false;
    let raf = 0;
    let lockUntil = 0;
    let target = 0;

    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateTo = (to: number) => {
      const from = window.scrollY || window.pageYOffset || 0;
      const dist = to - from;
      if (Math.abs(dist) < 2) return;
      target = to;
      animating = true;
      lenis()?.stop?.();
      const dur = Math.min(1100, Math.max(560, Math.abs(dist) * 0.55));
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        window.scrollTo(0, from + dist * easeInOut(t));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          raf = 0;
          animating = false;
          // swallow trailing momentum from the same gesture
          lockUntil = performance.now() + 260;
        }
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };

    const go = (dir: 1 | -1) => {
      if (animating || performance.now() < lockUntil) return;
      if (!stops.length) measure();
      const y = window.scrollY || window.pageYOffset || 0;
      const ref = animating ? target : y;
      let next: number | undefined;
      if (dir === 1) next = stops.find((s) => s > ref + 8);
      else next = [...stops].reverse().find((s) => s < ref - 8);
      if (next === undefined) return;
      animateTo(next);
    };

    /* ---------- gestures ---------- */
    const inRange = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (!stops.length) return false;
      return y >= stops[0]! - 4 && y <= stops[stops.length - 1]! + 4;
    };

    let wheelAcc = 0;
    let wheelReset = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (!inRange() && !animating) return;
      e.preventDefault();
      if (animating || performance.now() < lockUntil) return;
      wheelAcc += e.deltaY;
      window.clearTimeout(wheelReset);
      wheelReset = window.setTimeout(() => {
        wheelAcc = 0;
      }, 140);
      if (Math.abs(wheelAcc) > 14) {
        const dir: 1 | -1 = wheelAcc > 0 ? 1 : -1;
        wheelAcc = 0;
        go(dir);
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!inRange() && !animating) return;
      e.preventDefault();
      if (animating || performance.now() < lockUntil) return;
      const y = e.touches[0]?.clientY ?? 0;
      const d = touchY - y;
      if (Math.abs(d) > 42) {
        touchY = y;
        go(d > 0 ? 1 : -1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (!inRange()) return;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      }
    };

    lenis()?.stop?.();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(wheelReset);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      lenis()?.start?.();
    };
  }, [containerRef]);
}

export default useStackSnap;
