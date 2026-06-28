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
        <section className="video-aurora sticky top-0 z-0 flex h-[92vh] w-full items-center justify-center overflow-hidden px-4 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8">
          {/* Floating super-colorful aurora blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-blob left-[-10%] top-[-10%] h-[55vw] w-[55vw] bg-fuchsia-500 [animation-delay:0s]" />
            <div className="aurora-blob right-[-15%] top-[-5%] h-[45vw] w-[45vw] bg-cyan-400 [animation-delay:-2s]" />
            <div className="aurora-blob bottom-[-10%] left-[10%] h-[50vw] w-[50vw] bg-lime-400 [animation-delay:-4s]" />
            <div className="aurora-blob bottom-[-5%] right-[5%] h-[40vw] w-[40vw] bg-amber-400 [animation-delay:-6s]" />
            <div className="aurora-blob left-[25%] top-[30%] h-[35vw] w-[35vw] bg-violet-500 [animation-delay:-8s]" />
            <div className="aurora-blob right-[20%] top-[40%] h-[30vw] w-[30vw] bg-rose-500 [animation-delay:-10s]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }} />
          </div>

          <div className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-black shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] transition-all duration-700 hover:shadow-[0_48px_96px_-20px_rgba(0,0,0,0.35)]">
            {/* Background building image */}
            <img
              src={heroBuilding}
              alt=""
              aria-hidden
              className={`absolute inset-0 h-full w-full scale-105 object-cover transition-all duration-1000 ${playing ? "opacity-0" : "opacity-100"}`}
            />
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

            {/* Cinematic overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-black/10 backdrop-grayscale-[0.2]" />

            {/* Decorative inner frame */}
            <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] border border-white/5 sm:inset-6" />

            {/* Top branding */}
            <div
              className={`absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 sm:p-10 transition-opacity duration-500 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={logoAsset.url}
                  alt="Masters' Union"
                  className="h-8 w-auto opacity-50 brightness-0 invert sm:h-10"
                />
                <div className="hidden h-6 w-px bg-white/20 sm:block" />
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:block">
                  Masters' Union
                </span>
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-md sm:px-4">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                  Play Intro
                </span>
              </div>
            </div>

            {/* Center play button */}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <button
                type="button"
                onClick={() => {
                  videoElRef.current?.play().catch(() => {});
                }}
                aria-label="Play campus film"
                className="group relative"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative flex size-24 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white group-hover:bg-white sm:size-28">
                  <Play className="size-8 translate-x-0.5 fill-white text-white transition-colors duration-500 group-hover:fill-[#1a1c1a] group-hover:text-[#1a1c1a] sm:size-10" />
                </div>
              </button>
            </div>

            {/* Bottom content */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 sm:p-10 transition-opacity duration-500 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <div className="flex flex-col gap-3">
                <h1 className="font-[family-name:var(--font-serif)] text-4xl italic leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-6xl md:text-7xl">
                  Learn by Doing
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-[#C9A84C] sm:w-8" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    Industry-led Business Education
                  </span>
                </div>
              </div>
              <div className="hidden flex-col items-end gap-1 opacity-60 md:flex">
                <span className="text-[10px] font-medium tracking-tight text-white/70">MU_CAMPUS_001</span>
                <span className="text-[10px] font-medium tracking-tight text-white/70">4K_HDR</span>
              </div>
            </div>

            {/* Pause overlay button when playing */}
            {playing && (
              <button
                type="button"
                onClick={() => videoElRef.current?.pause()}
                aria-label="Pause"
                className="absolute right-6 top-6 z-20 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-70 backdrop-blur-md transition-opacity hover:opacity-100"
              >
                <Pause className="size-4" />
              </button>
            )}
          </div>
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
