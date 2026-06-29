import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import "locomotive-scroll/dist/locomotive-scroll.css";

type LocoInstance = any;

const LocoContext = createContext<{ scroll: LocoInstance | null }>({ scroll: null });

export const useLocoScroll = () => useContext(LocoContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<LocoInstance | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    let instance: LocoInstance | null = null;
    let cancelled = false;

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (cancelled || !containerRef.current) return;
      instance = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: 0.08,
        multiplier: 0.9,
        smartphone: { smooth: true },
        tablet: { smooth: true, breakpoint: 0 },
      });
      // Expose for other modules (GSAP ScrollTrigger proxy).
      (window as any).__loco = instance;
      window.dispatchEvent(new CustomEvent("loco:ready", { detail: instance }));
      setScroll(instance);

      // Refresh after fonts / images settle.
      setTimeout(() => instance?.update?.(), 600);
      setTimeout(() => instance?.update?.(), 1500);
    })();

    return () => {
      cancelled = true;
      try {
        instance?.destroy?.();
      } catch {}
      (window as any).__loco = null;
      setScroll(null);
    };
  }, [pathname]);

  return (
    <LocoContext.Provider value={{ scroll }}>
      <div ref={containerRef} data-scroll-container className="min-h-screen">
        {children}
      </div>
    </LocoContext.Provider>
  );
}
