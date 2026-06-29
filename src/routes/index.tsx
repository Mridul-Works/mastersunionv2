import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, ArrowUp, Play, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsset from "@/assets/logo-2.png.asset.json";
import campusVideo from "@/assets/campusFilm.mp4.asset.json";
import heroBuilding from "@/assets/hero-building-light.jpg";
import TenThings from "@/components/TenThings";
import HomeSections from "@/components/HomeSections";


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
  const [navHidden, setNavHidden] = useState(false);
  const [showRewatch, setShowRewatch] = useState(false);
  const [playing, setPlaying] = useState(false);

  const videoElRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const lockYRef = useRef(0);
  const unlockingRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const getLockY = () => hero.getBoundingClientRect().top + window.scrollY;

    const engage = () => {
      lockYRef.current = getLockY();
      lockedRef.current = true;
      setNavVisible(true);
      setShowRewatch(true);
    };

    const disengage = () => {
      lockedRef.current = false;
      setNavVisible(false);
      setShowRewatch(false);
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      if (unlockingRef.current) return;
      const y = window.scrollY;
      if (!lockedRef.current) {
        // Engage as soon as hero hits the top.
        if (y >= getLockY() - 1) engage();
        lastY = y;
        return;
      }
      if (y < lockYRef.current) {
        window.scrollTo(0, lockYRef.current);
      }
      // Auto-hide on scroll down, show on scroll up
      const delta = y - lastY;
      if (delta > 6 && y > lockYRef.current + 40) setNavHidden(true);
      else if (delta < -4) setNavHidden(false);
      lastY = y;
    };

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current || unlockingRef.current) return;
      // Only block upward scroll when we'd cross the lock boundary.
      if (e.deltaY < 0 && window.scrollY + e.deltaY < lockYRef.current) {
        e.preventDefault();
        window.scrollTo(0, lockYRef.current);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current || unlockingRef.current) return;
      const y = e.touches[0]?.clientY ?? 0;
      const dy = y - touchStartY;
      // finger moves down => page would scroll up. Only block at boundary.
      if (dy > 0 && window.scrollY - dy < lockYRef.current) {
        e.preventDefault();
        window.scrollTo(0, lockYRef.current);
      }
    };

    const blockedKeys = new Set(["ArrowUp", "PageUp", "Home"]);
    const onKey = (e: KeyboardEvent) => {
      if (!lockedRef.current || unlockingRef.current) return;
      if (blockedKeys.has(e.key) || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", () => {
      if (lockedRef.current) lockYRef.current = getLockY();
    });

    // Initial check (e.g. page reload mid-scroll).
    onScroll();

    (window as any).__muDisengage = disengage;

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const rewatchVideo = () => {
    unlockingRef.current = true;
    lockedRef.current = false;
    setNavVisible(false);
    setShowRewatch(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      videoElRef.current?.play().catch(() => {});
      unlockingRef.current = false;
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F9] font-['Inter']">
      {/* NAV — Swiss pill */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-4 pt-3 sm:px-6 sm:pt-4 transition-all duration-500 ${
          navVisible
            ? navHidden
              ? "opacity-0 -translate-y-6 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between border border-[#111111] bg-white px-3 py-2">
          <a href="/" className="flex items-center gap-2 px-2">
            <img src={logoAsset.url} alt="Masters' Union" className="h-5 w-auto" />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-2 font-['Geist'] text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111]/70 transition-colors hover:text-[#FF4D00]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-[#FF4D00] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111111]"
            >
              Apply
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex size-9 items-center justify-center border-l border-[#111111] text-[#111111] md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mt-2 border border-[#111111] bg-white p-2 md:hidden">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 font-['Geist'] text-[12px] font-medium uppercase tracking-[0.18em] text-[#111111]/70 transition-colors hover:bg-[#111111] hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>


      {/* Curtain wrapper: video is sticky at top while the hero (TenThings)
          naturally scrolls up over it. No JS scroll-locking — page scrolls
          freely both ways. */}
      <div className="relative">
        <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#F1EFE7] select-none">
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

          {/* Video (no autoplay) */}
          <video
            ref={videoElRef}
            src={campusVideo.url}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            controls={playing}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />

          {/* Editorial overlay — Asymmetric split */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <div className="relative mx-auto flex h-full w-full max-w-[1320px] flex-col justify-between px-6 py-10 md:px-12 md:py-12">
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
                  className="hidden font-['Geist'] text-[10px] uppercase tracking-[0.22em] text-white/70 md:block"
                >
                  Gurugram Campus
                </span>
              </div>

              {/* Hero row */}
              <div className="mb-12 grid grid-cols-12 items-end gap-8 md:mb-20">
                <div className="col-span-12 md:col-span-9 lg:col-span-8">
                  <h1
                    className="font-['Inter'] text-7xl font-extrabold uppercase leading-[0.85] tracking-tighter text-white md:text-[120px] lg:text-[140px]"
                  >
                    Learn by <br />
                    <span className="mt-2 block md:ml-24">Doing.</span>
                  </h1>
                </div>

                <div className="col-span-12 flex md:col-span-3 md:justify-end lg:col-span-4">
                  <button
                    type="button"
                    onClick={() => videoElRef.current?.play().catch(() => {})}
                    aria-label="Play campus film"
                    className="group flex cursor-pointer flex-col items-center gap-4 focus:outline-none md:items-end"
                  >
                    <div className="relative flex size-24 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110" />
                      <div
                        className="relative flex size-14 items-center justify-center rounded-full bg-[#FF4D00] shadow-lg transition-transform duration-300 group-hover:scale-90"
                      >
                        <svg
                          className="size-5 fill-current text-white translate-x-0.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <span
                        className="block font-['Geist'] text-[11px] font-bold uppercase tracking-[0.22em] text-white"
                      >
                        Play Experience
                      </span>
                      <span
                        className="mt-1 block font-['Geist'] text-[9px] uppercase tracking-[0.22em] text-white/60"
                      >
                        02:45 Mini Film
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between border-t border-white/15 pt-8">
                <p
                  className="hidden max-w-[320px] font-['Geist'] text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white md:block"
                >
                  A new-age business school where industry leaders mentor the next generation.
                </p>

                <div className="mx-auto flex flex-col items-center gap-4 md:mx-0">
                  <span
                    className="font-['Geist'] text-[9px] font-bold uppercase tracking-[0.3em] text-white"
                  >
                    Scroll
                  </span>
                  <div className="relative h-12 w-px overflow-hidden bg-white/20">
                    <div className="mu-scroll-line absolute left-0 top-0 h-1/2 w-full bg-[#FF4D00]" />
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
              className="absolute right-6 top-6 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-70 backdrop-blur-md transition-opacity hover:opacity-100"
            >
              <Pause className="size-4" />
            </button>
          )}
        </section>

        {/* The hero. Rises over the sticky video as the user scrolls. */}
        <div
          ref={heroRef}
          className="relative z-10 bg-[#F9F9F9] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.18)]"
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
        className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 border border-[#111111] bg-white px-4 py-3 font-['Geist'] text-[10px] font-bold uppercase tracking-[0.22em] text-[#111111] transition-all duration-500 hover:bg-[#FF4D00] hover:text-white ${
          showRewatch ? "opacity-100 translate-y-0 pointer-events-auto animate-bounce" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
        Watch intro
      </button>
    </main>
  );
}
