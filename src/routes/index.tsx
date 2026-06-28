import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsset from "@/assets/logo-2.png.asset.json";
import heroVideo from "@/assets/hero-info-video.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masters' Union — Business education, reimagined" },
      {
        name: "description",
        content:
          "Masters' Union is a new-age business school where industry leaders teach the next generation of CEOs, founders and operators.",
      },
    ],
  }),
  component: Index,
});

const NAV = ["Programs", "Faculty", "Admissions", "Campus", "About"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [showRewatch, setShowRewatch] = useState(false);

  const curtainWrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const lockYRef = useRef<number | null>(null);
  const unlockingRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: curtainWrapRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setNavVisible(self.progress > 0.6);
              const covered = self.progress >= 0.999;
              setShowRewatch(covered);
              if (covered && lockYRef.current === null && !unlockingRef.current) {
                lockYRef.current = window.scrollY;
              }
              if (!covered && lockYRef.current !== null) {
                lockYRef.current = null;
              }
            },
            onLeaveBack: () => {
              setNavVisible(false);
              setShowRewatch(false);
              lockYRef.current = null;
            },
          },
        },
      );
    });

    const isLocked = () => lockYRef.current !== null && !unlockingRef.current;

    const onScroll = () => {
      if (!isLocked()) return;
      if (window.scrollY < (lockYRef.current ?? 0)) {
        window.scrollTo(0, lockYRef.current ?? 0);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (isLocked() && e.deltaY < 0) e.preventDefault();
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isLocked()) return;
      const y = e.touches[0]?.clientY ?? 0;
      // finger moving down = scrolling up
      if (y > touchStartY) e.preventDefault();
    };
    const BLOCKED_KEYS = new Set([
      "ArrowUp",
      "PageUp",
      "Home",
    ]);
    const onKey = (e: KeyboardEvent) => {
      if (!isLocked()) return;
      if (BLOCKED_KEYS.has(e.key) || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, []);

  const rewatchVideo = () => {
    unlockingRef.current = true;
    lockYRef.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      unlockingRef.current = false;
      videoElRef.current?.play().catch(() => {});
    }, 900);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* NAV — only after video section ends */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-5 pt-5 sm:px-8 sm:pt-6 transition-all duration-500 ${
          navVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-background/20 bg-background/85 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.22)] backdrop-blur-xl md:px-3">
          <a href="/" className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-foreground/5">
            <img src={logoAsset.url} alt="Masters' Union" className="h-7 w-auto" />
          </a>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative rounded-full px-4 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {item}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply Now
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mt-3 rounded-3xl border border-background/20 bg-background/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* VIDEO SECTION — scrolls normally */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoElRef}
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h1 className="font-display text-[14vw] leading-[0.95] tracking-tight text-background drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:text-[11vw] md:text-[9vw]">
            Built by
            <br />
            <em className="italic text-background/95">operators.</em>
          </h1>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-background/70">
            Scroll to enter
          </div>
        </div>
      </section>

      {/* CURTAIN WRAPPER — pins while hero rises over the video, then unpins */}
      <div ref={curtainWrapRef} className="relative h-screen w-full overflow-hidden">
        <section
          ref={heroRef}
          id="hero"
          className="absolute inset-0 z-20 flex h-screen w-full flex-col bg-background px-5 pt-24 pb-8 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.5)] sm:px-8 sm:pt-28 sm:pb-10"
          style={{ transform: "translateY(100%)" }}
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
              <div>
                <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/55">
                  <span className="h-px w-10 bg-foreground/30" />
                  <span>About Masters&apos; Union</span>
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight">
                  Business education,
                  <br />
                  <span className="italic text-foreground/70">built in public.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-[15px] leading-[1.65] text-foreground/75 sm:text-[17px]">
                <p>
                  We don&apos;t teach from textbooks. Our students run real companies, pitch live deals, and learn from the CEOs, founders, and operators who are building India&apos;s next decade.
                </p>
                <p>
                  From a food incubator inside the campus to immersions across India and the world, every part of the program is designed around one idea: the best way to learn business is to do business.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-4 lg:mt-14">
              {[
                { value: "₹3.38 Cr", label: "Cohort revenue" },
                { value: "₹593 Cr", label: "Startup valuation" },
                { value: "500+", label: "Mentors on call" },
                { value: "40%", label: "Faculty are CEOs" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col justify-between gap-3 bg-background p-5 sm:p-7">
                  <div className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-none tracking-tight text-foreground">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bouncing rewatch button — appears once hero has taken over */}
      <button
        type="button"
        onClick={rewatchVideo}
        aria-label="Rewatch intro video"
        className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full border border-foreground/15 bg-background/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
          showRewatch ? "opacity-100 translate-y-0 pointer-events-auto animate-bounce" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
        Watch intro
      </button>
    </main>
  );
}
