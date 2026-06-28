import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
      { property: "og:title", content: "Masters' Union — Business education, reimagined" },
      {
        property: "og:description",
        content: "A new-age business school built and taught by industry leaders.",
      },
    ],
  }),
  component: Index,
});

const NAV = ["Programs", "Faculty", "Admissions", "Campus", "About"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phase 1 — pin the hero, shrink curtain into card, fade headline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        headlineRef.current,
        { opacity: 0, y: -60, filter: "blur(8px)", ease: "power2.in", duration: 0.4 },
        0,
      );
      tl.to(
        curtainRef.current,
        {
          top: "1rem",
          left: "1rem",
          right: "1rem",
          bottom: "auto",
          height: "calc(100vh - 2rem)",
          borderRadius: "28px",
          ease: "power3.inOut",
          duration: 1,
        },
        0.1,
      );

      // Phase 2 — About rises as curtain and pins as new hero
      gsap.fromTo(
        aboutRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        },
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);



  return (
    <main className="min-h-screen bg-background">
      {/* PIN WRAPPER — curtain reveal */}
      <div ref={wrapRef} className="relative h-screen w-full overflow-hidden">
        {/* Curtain / video stage — starts full-bleed, shrinks into hero card */}
        <div
          ref={curtainRef}
          className="absolute inset-0 z-[5] overflow-hidden bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
          style={{ borderRadius: 0 }}
        >
          {/* Video placeholder */}
          <video
            src={heroVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Deep shadow vignettes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

          {/* Hero section content (visible once curtain settles) */}
          <div ref={heroRef} className="absolute inset-0">
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-10 px-5 pt-5 sm:px-8 sm:pt-6">
              <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-background/20 bg-background/75 px-2 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-3">
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
                <div className="mt-3 rounded-3xl border border-background/20 bg-background/90 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl md:hidden">
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

            {/* Left info strip (hero card state) */}
            <div className="absolute bottom-10 left-6 z-10 max-w-[280px] text-background sm:left-10">
              <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-background/80">
                <span className="size-1.5 rounded-full bg-background/80" />
                India&rsquo;s new-age B-school
              </div>
              <p className="font-display text-2xl leading-tight sm:text-3xl">
                Business education,
                <br />
                taught by the people
                <br />
                who built business.
              </p>
            </div>
          </div>

          {/* Full-screen headline (visible before scroll) */}
          <div
            ref={headlineRef}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
          >
            <h1 className="font-display text-[14vw] leading-[0.95] tracking-tight text-background drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:text-[11vw] md:text-[9vw]">
              Built by
              <br />
              <em className="italic text-background/95">operators.</em>
            </h1>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-background/70">
              Scroll ↓
            </div>
          </div>
        </div>
      </div>


      {/* About curtain — rises over the hero on scroll and becomes the new hero */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-30 min-h-screen bg-background px-5 py-24 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.5)] sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
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
            <div className="flex flex-col gap-6 text-[15px] leading-[1.7] text-foreground/75 sm:text-[17px]">
              <p>
                We don&apos;t teach from textbooks. Our students run real companies, pitch live deals, and learn from the CEOs, founders, and operators who are building India&apos;s next decade.
              </p>
              <p>
                From a food incubator inside the campus to immersions across India and the world, every part of the program is designed around one idea: the best way to learn business is to do business.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-4">
            {[
              { value: "₹3.38 Cr", label: "Cohort revenue" },
              { value: "₹593 Cr", label: "Startup valuation" },
              { value: "500+", label: "Mentors on call" },
              { value: "40%", label: "Faculty are CEOs" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between gap-4 bg-background p-6 sm:p-8"
              >
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
    </main>
  );
}


