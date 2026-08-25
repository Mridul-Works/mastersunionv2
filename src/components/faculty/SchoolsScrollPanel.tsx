import * as React from "react";

const MONO = "var(--font-mono)";

const STAGES = [
  { n: "01", label: "Kellogg" },
  { n: "02", label: "Harvard" },
  { n: "03", label: "Signal" },
];

export default function SchoolsScrollPanel() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const stageRef = React.useRef<Array<HTMLElement | null>>([]);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    let lastP = Number.NaN;
    // Scroll work is skipped entirely while the section is far outside the
    // viewport (its mapped progress is clamped there anyway), so the pinned
    // sections above/below don't pay for this handler.
    let active = true;

    /** layout offset of the section in the document — unaffected by sticky/pinning */
    const layoutTop = (node: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = node;
      while (n) {
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return y;
    };

    // Cached so the per-frame path never walks the offsetParent chain (each walk
    // forces layout and is the main cost during fast scroll).
    let cachedTop = layoutTop(el);
    let cachedHeight = el.offsetHeight;
    const measure = () => {
      cachedTop = layoutTop(el);
      cachedHeight = el.offsetHeight;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // Internal timeline starts EXACTLY when the section top hits the
      // viewport top and ends when its bottom does.
      const span = Math.max(1, cachedHeight - vh);
      const scrolled = (window.scrollY || window.pageYOffset || 0) - cachedTop;
      const p = Math.min(1, Math.max(0, scrolled / span));

      // skip all DOM writes when the mapped progress hasn't changed
      if (p === lastP) return;
      lastP = p;

      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;


      const ease = (t: number) => t * t * (3 - 2 * t);
      // HOLD 0-22 | FADE 22-40 | HOLD 40-60 | FADE 60-78 | HOLD 78-100
      const seg = (from: number, to: number) => ease(Math.min(1, Math.max(0, (p - from) / (to - from))));
      const t1 = seg(0.22, 0.4);
      const t2 = seg(0.6, 0.78);
      const weights = [1 - t1, t1 * (1 - t2), t2];
      const drifts = [-t1, 1 - t1 - t2, 1 - t2];

      const active = weights.indexOf(Math.max(...weights));
      meterRef.current.forEach((node, i) => {
        if (!node) return;
        const val = String(i === active);
        if (node.dataset["active"] !== val) node.dataset["active"] = val;
      });

      stageRef.current.forEach((node, i) => {
        if (!node) return;
        const o = Math.min(1, Math.max(0, weights[i]));
        node.style.opacity = o.toFixed(3);
        node.style.visibility = o < 0.01 ? "hidden" : "visible";
        node.style.transform = `translate3d(0, ${(drifts[i] * 14).toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // Section height changes (stacked reveals, image loads, font swap) refresh
    // the cached geometry instead of re-measuring every frame.
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        // settle once on both enter and leave so the visual state is always
        // correct at the boundary
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);


  return (
    <div
      ref={sectionRef}
      className="relative mt-[clamp(0.75rem,1.8vh,1.25rem)]"
      style={{ height: "380vh" }}
    >
      <div
        className="sticky top-[var(--top-nav-reserve,0px)] h-[var(--panel-h)] overflow-hidden md:top-0 md:h-[calc(100svh-var(--nav-reserve,0px))]"
        style={
          {
            "--panel-h":
              "calc(100dvh - var(--top-nav-reserve, 0px) - var(--nav-reserve, 0px) - env(safe-area-inset-bottom, 0px) - 12px)",
          } as React.CSSProperties
        }
      >
          <div className="grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_clamp(180px,26svh,280px)] border border-white/10 bg-white/[0.04] md:h-full md:min-h-0 md:grid-cols-[minmax(0,68%)_minmax(0,32%)] md:grid-rows-1">
          {/* LEFT — editorial story, scrolls internally on mobile if needed */}
          <div className="relative z-10 flex min-h-0 flex-col justify-center overflow-y-auto no-scrollbar border-b border-white/10 py-6 pl-0 md:min-h-0 md:overflow-hidden md:border-b-0 md:border-r md:border-white/10 md:py-8 md:pl-8 md:pr-8 lg:py-10 lg:pl-10 lg:pr-10">


            <div className="faculty-editorial-text mx-auto">
              <div
                className="text-[clamp(9px,2.2vw,10px)] uppercase tracking-[0.28em] text-white/45 md:text-[10px]"
                style={{ fontFamily: MONO }}
              >
                Who visits, and why
              </div>

              <p className="mt-4 text-[clamp(1rem,4.6vw,1.35rem)] leading-[1.4] text-white/[0.96] md:mt-6 md:text-[clamp(1.35rem,2.1vw,1.8rem)] md:leading-[1.4]">
                <span className="font-medium text-white">Kellogg School of Management</span> — led by
                Professor Mohanbir Sawhney, one of the world&apos;s foremost authorities on technology
                strategy and marketing innovation — has brought students to Masters&apos; Union for two
                consecutive years.
              </p>

              <p className="mt-[clamp(0.9rem,2.8vw,1.25rem)] text-[clamp(0.95rem,3.8vw,1.15rem)] leading-[1.5] text-white/70 md:mt-[clamp(1.25rem,3.5vh,2.25rem)] md:text-[clamp(1.05rem,1.5vw,1.3rem)] md:leading-[1.55]">
                <span className="font-medium text-white/95">Harvard Business School India</span>{" "}
                immersion students have visited campus.
              </p>

              <div className="mt-[clamp(0.9rem,2.8vw,1.25rem)] md:mt-[clamp(1.25rem,3.5vh,2.25rem)]">
                <div className="rounded-[clamp(10px,1.8vw,18px)] border border-white/[0.08] bg-black/25 p-[clamp(0.75rem,2.2vw,1.15rem)] backdrop-blur-md md:p-[clamp(0.9rem,1.6vw,1.35rem)]"
                  style={{ transform: "translateZ(0)", contain: "paint" }}>
                  <div className="border-l border-white/15 pl-4 md:pl-7">
                    <p className="text-[clamp(1.05rem,4.4vw,1.35rem)] font-medium leading-[1.34] tracking-[-0.01em] text-white md:text-[clamp(1.3rem,2vw,1.7rem)] md:leading-[1.34]">
                      When schools like these come here to learn, something is working.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — scroll-revealed data panel: NETWORK | GAP | METER */}
          <div className="relative z-10 flex h-full min-h-0 overflow-hidden">
            {/* network area — 82% of the panel, network can never cross this box */}
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden p-6 md:p-8 lg:p-10">
              

              {/* single shared stage viewport — one active state at a time */}
              <div className="relative z-10 h-full min-h-[190px] md:h-auto">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    ref={(n) => {
                      stageRef.current[i] = n;
                    }}
                    className="absolute inset-0 flex flex-col justify-center will-change-transform md:justify-start"
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                  >

                    {i === 0 && (
                      <>
                        <div
                          className="mb-6 text-[10px] uppercase tracking-[0.26em] text-white/50"
                          style={{ fontFamily: MONO }}
                        >
                          Schools That Come Here
                        </div>
                        <div className="border-y border-white/10 py-5">
                          <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                            Kellogg
                          </div>
                          <div
                            className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                            style={{ fontFamily: MONO }}
                          >
                            School of Management
                          </div>
                        </div>
                      </>
                    )}

                    {i === 1 && (
                      <div className="border-y border-white/10 py-5">
                        <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                          Harvard
                        </div>
                        <div
                          className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                          style={{ fontFamily: MONO }}
                        >
                          Business School India
                        </div>
                      </div>
                    )}

                    {i === 2 && (
                      <div className="border-y border-white/10 py-5">
                        <div className="text-[clamp(2.6rem,4.4vw,3.6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                          02
                        </div>
                        <div
                          className="mt-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60"
                          style={{ fontFamily: MONO }}
                        >
                          consecutive years
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* meter — dedicated protected column, never overlapped by the network */}
            <div className="relative z-20 flex w-[54px] shrink-0 flex-col justify-between py-8 pl-2 pr-4 md:w-[60px] md:pr-5">
              <div className="pointer-events-none absolute bottom-8 left-[8px] top-8 w-px bg-white/10">
                <div
                  ref={barRef}
                  className="h-full w-full origin-top bg-white/45"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              {STAGES.map((s, i) => (
                <div
                  key={s.n}
                  ref={(n) => {
                    meterRef.current[i] = n;
                  }}
                  data-active={i === 0 ? "true" : "false"}
                  className="relative flex items-center gap-1.5 transition-opacity duration-500 data-[active=false]:opacity-35 data-[active=true]:opacity-100"
                >
                  <span className="h-px w-2 shrink-0 bg-white/60" aria-hidden />
                  <span
                    className="whitespace-nowrap text-[9px] tracking-[0.1em] text-white/80"
                    style={{ fontFamily: MONO }}
                  >
                    {s.n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

