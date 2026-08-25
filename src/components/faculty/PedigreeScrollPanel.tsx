import * as React from "react";

const MONO = "var(--font-mono)";

const STAGES = [
  { n: "01", label: "IIM" },
  { n: "02", label: "IIT" },
  { n: "03", label: "Universities" },
  { n: "04", label: "Global" },
];

const GROUPS = [
  { title: "IIM", items: "Ahmedabad · Bangalore · Calcutta" },
  { title: "IIT", items: "Bombay · Kanpur" },
  { title: "Universities", items: "Delhi University · Shiv Nadar · Christ University" },
  { title: "Global", items: "TERI · University of Bath" },
];

export default function PedigreeScrollPanel() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const meterRef = React.useRef<Array<HTMLElement | null>>([]);
  const stageRef = React.useRef<Array<HTMLElement | null>>([]);
  const headRef = React.useRef<HTMLDivElement>(null);
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

    const layoutTop = (node: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = node;
      while (n) {
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return y;
    };

    let cachedTop = layoutTop(el);
    let cachedHeight = el.offsetHeight;
    const measure = () => {
      cachedTop = layoutTop(el);
      cachedHeight = el.offsetHeight;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const span = Math.max(1, cachedHeight - vh);
      const scrolled = (window.scrollY || window.pageYOffset || 0) - cachedTop;
      const p = Math.min(1, Math.max(0, scrolled / span));

      if (p === lastP) return;
      lastP = p;

      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;

      const ease = (t: number) => t * t * (3 - 2 * t);
      const seg = (from: number, to: number) =>
        ease(Math.min(1, Math.max(0, (p - from) / (to - from))));

      // heading eases in only once the section is properly pinned
      if (headRef.current) {
        const hp = seg(0.02, 0.16);
        headRef.current.style.opacity = hp.toFixed(3);
        headRef.current.style.transform = `translate3d(0, ${((1 - hp) * 12).toFixed(2)}px, 0)`;
      }

      // four stages: HOLD / FADE crossfades, no premature reveal
      const t1 = seg(0.2, 0.32);
      const t2 = seg(0.42, 0.54);
      const t3 = seg(0.64, 0.76);
      const weights = [
        (1 - t1) * seg(0.06, 0.18),
        t1 * (1 - t2),
        t2 * (1 - t3),
        t3,
      ];
      const drifts = [-t1, 1 - t1 - t2, 1 - t2 - t3, 1 - t3];

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
          {/* LEFT — editorial copy, scrolls internally on mobile if needed */}
          <div className="relative z-10 flex min-h-0 flex-col justify-center overflow-y-auto no-scrollbar border-b border-white/10 py-6 pl-0 md:min-h-0 md:overflow-hidden md:border-b-0 md:border-r md:border-white/10 md:py-8 md:pl-8 md:pr-8 lg:py-10 lg:pl-10 lg:pr-10">
            <div className="faculty-editorial-text mx-auto">
              <div
                className="text-[clamp(9px,2.2vw,10px)] uppercase tracking-[0.28em] text-white/45 md:text-[10px]"
                style={{ fontFamily: MONO }}
              >
                Where they trained
              </div>
              <p className="mt-4 text-[clamp(1.05rem,4.4vw,1.4rem)] leading-[1.4] text-white/[0.96] md:mt-6 md:text-[clamp(1.4rem,2.2vw,1.85rem)] md:leading-[1.42]">
                Doctorates from IIM Ahmedabad, Bangalore, Calcutta, Kozhikode and Tiruchirappalli,
                IIT Bombay and Kanpur, Delhi University, Shiv Nadar, Christ University, TERI and the
                University of Bath — across finance, marketing, operations, organisational behaviour,
                economics, decision sciences and strategy.
              </p>
            </div>
          </div>

          {/* RIGHT — constellation | stages | meter */}
          <div className="relative z-10 flex h-full min-h-0 overflow-hidden">
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden p-6 md:p-8 lg:p-10">
              {/* single shared stage viewport — all stages occupy the same box */}
              <div className="relative z-10 h-full min-h-[190px] md:h-auto">
                {GROUPS.map((g, i) => (
                  <div
                    key={g.title}
                    ref={(n) => {
                      stageRef.current[i] = n;
                    }}
                    className="absolute inset-0 flex flex-col justify-center will-change-transform md:justify-start"
                    style={{ opacity: 0, visibility: "hidden" }}
                  >
                    <div
                      className="mb-6 text-[10px] uppercase tracking-[0.26em] text-white/50"
                      style={{ fontFamily: MONO }}
                    >
                      Faculty Pedigree
                    </div>
                    <div className="border-y border-white/10 py-5">
                      <div className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                        {g.title}
                      </div>
                      <div
                        className="mt-2 break-words text-[10.5px] uppercase tracking-[0.2em] text-white/60"
                        style={{ fontFamily: MONO }}
                      >
                        {g.items}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* meter — protected column */}
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
