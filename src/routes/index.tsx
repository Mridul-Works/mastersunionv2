import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, ArrowUp, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsset from "@/assets/logo-2.png.asset.json";
import campusVideo from "@/assets/campusFilm.mp4.asset.json";
import heroBuilding from "@/assets/hero-building-light.webp";

import TenThings from "@/components/TenThings";
import HomeSections from "@/components/HomeSections";
import WidgetCarousel from "@/components/WidgetCarousel";


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

const NAV: { label: string; id: string }[] = [
  { label: "Programs", id: "programs" },
  { label: "Pedagogy", id: "pedagogy" },
  { label: "Founders", id: "founders" },
  { label: "News", id: "news" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top;
  const lenis = (window as any).__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(y, { duration: 1.2 });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [showRewatch, setShowRewatch] = useState(false);
  const [playing, setPlaying] = useState(false);

  const videoElRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroLockedRef = useRef(false);
  const lockYRef = useRef(0);
  const unlockingRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let lastY = window.scrollY;
    let touchStartY = 0;

    const getLockY = () => {
      const rect = hero.getBoundingClientRect();
      return window.scrollY + rect.top;
    };

    const pauseIntroVideo = () => {
      const v = videoElRef.current;
      if (!v) return;
      if (!v.paused) v.pause();
      setPlaying(false);
    };

    const jumpToLock = () => {
      const lockY = lockYRef.current || getLockY();
      const lenis = (window as any).__lenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(lockY, { immediate: true, force: true, lock: true });
      } else {
        window.scrollTo(0, lockY);
      }
      lastY = lockY;
    };

    const engageLock = () => {
      if (heroLockedRef.current || unlockingRef.current) return;
      heroLockedRef.current = true;
      lockYRef.current = getLockY();
      pauseIntroVideo();
      setNavVisible(true);
      setNavHidden(false);
      setShowRewatch(true);
    };

    // IntersectionObserver — fires reliably even if scroll/wheel events are
    // captured by the playing <video controls>. As soon as the hero curtain
    // reaches the top of the viewport, engage the lock and reveal the nav.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.boundingClientRect.top <= 1) {
            engageLock();
          }
        }
      },
      { threshold: [0, 0.01], rootMargin: "0px 0px -100% 0px" },
    );
    io.observe(hero);

    const onScroll = () => {
      if (unlockingRef.current) {
        lastY = window.scrollY;
        return;
      }
      const y = window.scrollY;

      // Hard invariant: the intro film may only play at the very top intro state.
      // Any scroll position beyond the intro immediately pauses it, including
      // deep homepage sections and Lenis momentum states.
      if (y > 2) pauseIntroVideo();

      if (!heroLockedRef.current) {
        if (y >= getLockY() - 1) engageLock();
        lastY = y;
        return;
      }

      const lockY = lockYRef.current || getLockY();
      if (y < lockY - 1) {
        jumpToLock();
        return;
      }

      // Once the intro is covered, keep navigation stable. The previous
      // scroll-direction hide behavior could fire during the same forceful
      // scroll that engaged the hero lock, making the nav appear missing.
      setNavHidden(false);
      lastY = y;
    };

    const blockedKeys = new Set(["ArrowUp", "PageUp", "Home"]);
    const onKey = (e: KeyboardEvent) => {
      const scrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
      if (scrollKeys.has(e.key)) pauseIntroVideo();

      if (!heroLockedRef.current || unlockingRef.current) return;
      if (blockedKeys.has(e.key) || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        jumpToLock();
      }
    };

    const onResize = () => {
      if (heroLockedRef.current) lockYRef.current = getLockY();
    };

    const onWheel = (e: WheelEvent) => {
      pauseIntroVideo();
      if (!heroLockedRef.current || unlockingRef.current) return;
      const lockY = lockYRef.current || getLockY();
      if (window.scrollY <= lockY + 2 && e.deltaY < 0) {
        e.preventDefault();
        jumpToLock();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      pauseIntroVideo();
      if (!heroLockedRef.current || unlockingRef.current) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const swipingDown = currentY > touchStartY;
      const lockY = lockYRef.current || getLockY();
      if (window.scrollY <= lockY + 2 && swipingDown) {
        e.preventDefault();
        jumpToLock();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);

      window.removeEventListener("resize", onResize);
    };
  }, []);

  const rewatchVideo = () => {
    unlockingRef.current = true;
    heroLockedRef.current = false;
    lockYRef.current = 0;
    setNavVisible(false);
    setNavHidden(false);
    setShowRewatch(false);
    videoElRef.current?.pause();
    setPlaying(false);
    const lenis = (window as any).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      unlockingRef.current = false;
      if (window.scrollY <= 8) {
        videoElRef.current?.play().catch(() => {});
      }
    }, 1500);
  };

  const playIntroVideo = () => {
    if (heroLockedRef.current || window.scrollY > 8) return;
    videoElRef.current?.play().catch(() => {});
  };



  return (
    <main className="min-h-screen bg-white pb-[100px]">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 bottom-0 z-[100] hidden px-4 pb-3 sm:px-6 sm:pb-4 transition-all duration-500 md:block ${
          navVisible
            ? navHidden
              ? "opacity-0 translate-y-6 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {menuOpen && (
          <div className="mb-3 rounded-none border border-black/10 bg-white/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    scrollToId(item.id);
                  }}
                  className="rounded-none px-4 py-3 text-[14px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
        <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-none border border-black/10 bg-white/80 px-2 py-1.5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          <a href="/" className="flex items-center gap-2 rounded-none px-2.5 py-1">
            <img src={logoAsset.url} alt="Masters' Union" className="h-5 w-auto" />
          </a>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className="rounded-none px-3 py-1.5 text-[12px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-none bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] pastel-fill"
            >
              Apply
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex size-8 items-center justify-center rounded-none text-black/60 transition-colors hover:bg-black/5 hover:text-black md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <div id="hero-curtain" className="relative">
        <section
          className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#F1EFE7] select-none"
        >


          {/* Background building image */}
          <img
            src={heroBuilding}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
          />
          {/* Dark editorial overlay tints (hidden when playing) */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#F1EFE7]/30 via-[#2A312A]/40 to-[#1A211A]/90" />
            <div className="absolute inset-0 bg-[#2A312A]/10 mix-blend-multiply" />
          </div>

          {/* Video (no autoplay / no autoload) */}
          <video
            ref={videoElRef}
            src={campusVideo.url}
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPlaying={() => {
              if (heroLockedRef.current || window.scrollY > 8) {
                videoElRef.current?.pause();
                setPlaying(false);
              } else {
                setPlaying(true);
              }
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            controls={playing}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />

          {/* Editorial overlay — Asymmetric split */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <div className="relative mx-auto flex h-full w-full max-w-[1320px] flex-col justify-between px-8 py-10 md:px-16 md:py-12">
              {/* Top branding */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <img
                    src={logoAsset.url}
                    alt="Masters' Union"
                    className="h-8 w-auto md:h-10 brightness-0 invert"
                  />
                </div>
                <span
                  className="hidden text-[10px] uppercase tracking-[0.2em] text-white/70 md:block"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Gurugram Campus
                </span>
              </div>

              {/* Hero row */}
              <div className="mb-12 grid grid-cols-12 items-end gap-8 md:mb-20">
                <div className="col-span-12 flex flex-col gap-10 md:col-span-10 lg:col-span-9">
                  <h1
                    className="-ml-[0.06em] text-7xl italic leading-[0.8] tracking-tighter text-white md:text-[110px] lg:text-[130px]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Learn by <br />
                    <span className="mt-2 block not-italic md:ml-24">Doing.</span>
                  </h1>

                  <button
                    type="button"
                    onClick={playIntroVideo}
                    aria-label="Play campus film"
                    className="group relative flex cursor-pointer items-center gap-5 focus:outline-none md:ml-24"
                  >
                    <div className="relative flex size-20 items-center justify-center">
                      {/* Outer expanding rings on hover */}
                      <div className="absolute inset-0 rounded-full border border-[#C9A84C]/20 transition-all duration-1000 ease-out group-hover:scale-150 group-hover:opacity-0" />
                      <div className="absolute inset-0 rounded-full border border-[#C9A84C]/10 transition-all duration-1000 ease-out delay-150 group-hover:scale-[1.75] group-hover:opacity-0" />

                      {/* Rotating circular text label */}
                      <div className="absolute -inset-4 mu-spin-slow transition-all duration-500 group-hover:[animation-duration:6s]">
                        <svg viewBox="0 0 100 100" className="h-full w-full opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                          <path id="muCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                          <text className="text-[6px] uppercase tracking-[0.4em] fill-[#FAF8F4]">
                            <textPath xlinkHref="#muCirclePath" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              Masters' Union Film • Campus Experience •
                            </textPath>
                          </text>
                        </svg>
                      </div>

                      {/* Main gradient button body */}
                      <div className="relative size-16 overflow-hidden rounded-full p-[2px] transition-transform duration-500 ease-out group-hover:scale-110">
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 mu-gradient-shimmer" />

                        {/* Button interior */}
                        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#1A211A]/80 backdrop-blur-xl">
                          {/* Inner gradient glow */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9A84C]/15 via-transparent to-[#1F4D3F]/25 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* Play icon */}
                          <svg
                            className="relative z-10 size-6 fill-current text-[#C9A84C] transition-all duration-500 group-hover:scale-110 group-hover:text-[#FAF8F4]"
                            viewBox="0 0 24 24"
                            style={{ transform: "translateX(2px)" }}
                          >
                            <path d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </div>
                      </div>

                      {/* Soft outer glow */}
                      <div className="absolute inset-0 rounded-full bg-[#C9A84C]/0 blur-2xl transition-all duration-700 group-hover:bg-[#C9A84C]/20" />
                    </div>

                    <div className="text-left">
                      <span
                        className="block text-[10px] font-semibold uppercase tracking-[3px] text-[#C9A84C]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Watch Now
                      </span>
                      <span
                        className="mt-1 block text-lg font-light italic text-[#FAF8F4]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        Campus Film
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between border-t border-white/10 pt-8">
                <p
                  className="hidden max-w-[280px] text-[11px] uppercase leading-relaxed tracking-wider text-white md:block"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  A new-age business school where industry leaders mentor the next generation.
                </p>

                <div className="mx-auto flex flex-col items-center gap-4 md:mx-0">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Scroll
                  </span>
                  <div className="relative h-12 w-px overflow-hidden bg-white/20">
                    <div className="mu-scroll-line absolute left-0 top-0 h-1/2 w-full bg-white" />
                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* Pause overlay button when playing */}
          {playing && (
            <button
              type="button"
              onClick={() => videoElRef.current?.pause()}
              aria-label="Pause"
              className="absolute right-6 top-6 z-10 flex size-11 items-center justify-center rounded-none border border-white/30 bg-black/40 text-white opacity-70 backdrop-blur-md transition-opacity hover:opacity-100"
            >
              <Pause className="size-4" />
            </button>
          )}
        </section>

        {/* The hero. Rises over the sticky video as the user scrolls. */}
        <div
          ref={heroRef}
          className="relative z-10 bg-white shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.12)]"
        >
          <TenThings />
          <HomeSections />

        </div>
      </div>

      {/* Rewatch button */}
      <button
        type="button"
        onClick={rewatchVideo}
        aria-label="Rewatch intro video"
        className={`fixed top-6 right-6 z-[90] flex items-center gap-2 rounded-none border border-black/10 bg-white/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
          showRewatch ? "opacity-100 translate-y-0 pointer-events-auto animate-bounce" : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
        Watch intro
      </button>
    </main>
  );
}
