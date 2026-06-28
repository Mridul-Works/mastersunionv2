import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoAsset from "@/assets/logo-2.png.asset.json";
import heroVideo from "@/assets/hero-info-video.mp4.asset.json";
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
  
  const videoElRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const unlockedRef = useRef(false);

  // GSAP ScrollTrigger: once the hero's top reaches the viewport top,
  // toggle nav + rewatch and clamp scrollY so the user can't go back up
  // into the video. Scrolling DOWN through the hero stays free.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "max",
      onEnter: () => {
        setNavVisible(true);
        setShowRewatch(true);
      },
      onEnterBack: () => {
        setNavVisible(true);
        setShowRewatch(true);
      },
      onLeaveBack: () => {
        // Only the rewatch button is allowed to take us back above the hero.
        if (unlockedRef.current) {
          setNavVisible(false);
          setShowRewatch(false);
          return;
        }
        const lockY = hero.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, lockY);
      },
    });

    return () => st.kill();
  }, []);

  const rewatchVideo = () => {
    unlockedRef.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      videoElRef.current?.play().catch(() => {});
      // Re-arm: once the user scrolls hero back over video, lock re-engages.
      unlockedRef.current = false;
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#090909]">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-5 pt-5 sm:px-8 sm:pt-6 transition-all duration-500 ${
          navVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-white/10 bg-[#0f0f0f]/90 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-3">
          <a href="/" className="flex items-center gap-2 rounded-full px-3 py-1.5">
            <img src={logoAsset.url} alt="Masters' Union" className="h-7 w-auto brightness-0 invert" />
          </a>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
              className="flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mt-3 rounded-3xl border border-white/10 bg-[#0f0f0f]/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[14px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
        <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black">
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
            <h1 className="font-display text-[14vw] leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:text-[11vw] md:text-[9vw]">
              Built by
              <br />
              <em className="italic text-white/95">operators.</em>
            </h1>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/70">
              Scroll to enter
            </div>
          </div>
        </section>

        {/* The hero. Rises over the sticky video as the user scrolls. */}
        <div
          ref={heroRef}
          className="relative z-10 bg-[#090909] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          <TenThings />
        </div>
      </div>

      {/* Rewatch button */}
      <button
        type="button"
        onClick={rewatchVideo}
        aria-label="Rewatch intro video"
        className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full border border-white/15 bg-[#0f0f0f]/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
          showRewatch ? "opacity-100 translate-y-0 pointer-events-auto animate-bounce" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-4" />
        Watch intro
      </button>
    </main>
  );
}
