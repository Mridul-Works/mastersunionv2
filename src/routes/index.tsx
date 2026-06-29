import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsset from "@/assets/logo-2.png.asset.json";
import campusVideo from "@/assets/campusFilm.mp4.asset.json";
import heroBuilding from "@/assets/hero-building-light.jpg";
import { Play, Pause } from "lucide-react";
import TenThings from "@/components/TenThings";

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

    const onScroll = () => {
      if (unlockingRef.current) return;
      if (!lockedRef.current) {
        // Engage as soon as hero hits the top.
        if (window.scrollY >= getLockY() - 1) engage();
        return;
      }
      if (window.scrollY < lockYRef.current) {
        window.scrollTo(0, lockYRef.current);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current || unlockingRef.current) return;
      if (e.deltaY < 0) {
        e.preventDefault();
        if (window.scrollY < lockYRef.current) {
          window.scrollTo(0, lockYRef.current);
        }
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current || unlockingRef.current) return;
      const y = e.touches[0]?.clientY ?? 0;
      // finger moves down => page would scroll up => block
      if (y - touchStartY > 0) {
        e.preventDefault();
        if (window.scrollY < lockYRef.current) {
          window.scrollTo(0, lockYRef.current);
        }
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
    <main className="min-h-screen bg-[#FAF8F4]">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-5 pt-5 sm:px-8 sm:pt-6 transition-all duration-500 ${
          navVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-black/10 bg-white/90 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl md:px-3">
          <a href="/" className="flex items-center gap-2 rounded-full px-3 py-1.5">
            <img src={logoAsset.url} alt="Masters' Union" className="h-7 w-auto" />
          </a>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-full bg-[#C9A84C] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-black shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply Now
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="flex size-10 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/5 hover:text-black md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mt-3 rounded-3xl border border-black/10 bg-white/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[14px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
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
          {/* Sophisticated overlay tints (hidden when playing) */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#F1EFE7]/60 via-transparent to-[#F1EFE7]/80" />
            <div className="absolute inset-0 bg-[#A3B18A]/10 mix-blend-multiply" />
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
                    className="h-8 w-auto md:h-10"
                  />
                </div>
                <span
                  className="hidden text-[10px] uppercase tracking-[0.2em] text-[#2A312A]/60 md:block"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Gurugram Campus
                </span>
              </div>

              {/* Hero row */}
              <div className="mb-12 grid grid-cols-12 items-end gap-8 md:mb-20">
                <div className="col-span-12 md:col-span-9 lg:col-span-8">
                  <h1
                    className="text-7xl italic leading-[0.8] tracking-tighter text-[#2A312A] md:text-[110px] lg:text-[130px]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Learn by <br />
                    <span className="mt-2 block not-italic md:ml-24">Doing.</span>
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
                      <div className="absolute inset-0 rounded-full border border-[#2A312A]/10 bg-[#2A312A]/5 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110" />
                      <div className="relative flex size-14 items-center justify-center rounded-full bg-[#2A312A] shadow-lg transition-transform duration-300 group-hover:scale-90">
                        <svg
                          className="size-5 translate-x-0.5 fill-current text-[#F5F2E8]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <span
                        className="block text-xs font-semibold uppercase tracking-widest text-[#2A312A]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Play Experience
                      </span>
                      <span
                        className="mt-1 block text-[9px] uppercase tracking-widest text-[#2A312A]/60"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        02:45 Mini Film
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between border-t border-[#2A312A]/10 pt-8">
                <p
                  className="hidden max-w-[240px] text-[11px] uppercase leading-relaxed tracking-wider text-[#2A312A]/70 md:block"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  A new-age business school where industry leaders mentor the next generation.
                </p>

                <div className="mx-auto flex flex-col items-center gap-4 md:mx-0">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#2A312A]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Scroll
                  </span>
                  <div className="relative h-12 w-px overflow-hidden bg-[#2A312A]/20">
                    <div className="mu-scroll-line absolute left-0 top-0 h-1/2 w-full bg-[#2A312A]" />
                  </div>
                </div>

                <div className="hidden flex-col items-end md:flex">
                  <span
                    className="mb-1 text-[10px] font-semibold tracking-[0.1em] text-[#2A312A]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Cohort 2026
                  </span>
                  <div className="flex gap-2">
                    <span className="size-1.5 rounded-full bg-[#2A312A]" />
                    <span className="size-1.5 rounded-full bg-[#2A312A]/20" />
                    <span className="size-1.5 rounded-full bg-[#2A312A]/20" />
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
          className="relative z-10 bg-[#FAF8F4] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.12)]"
        >
          <TenThings />
        </div>
      </div>

      {/* Rewatch button */}
      <button
        type="button"
        onClick={rewatchVideo}
        aria-label="Rewatch intro video"
        className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
          showRewatch ? "opacity-100 translate-y-0 pointer-events-auto animate-bounce" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
        Watch intro
      </button>
    </main>
  );
}
