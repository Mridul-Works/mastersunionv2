import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Compass, Layers, Sparkles } from "lucide-react";
import { ClipReveal, FadeLift, ScrollWords } from "@/components/cinematic/primitives";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&w=1920&q=80";

const SHOWCASE = [
  {
    id: "atelier",
    index: "01",
    eyebrow: "Atelier",
    title: "Built in the quiet hours",
    body: "Every surface is drawn, discarded, and drawn again. What survives is the version that needed no explanation.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80",
    icon: Layers,
  },
  {
    id: "material",
    index: "02",
    eyebrow: "Material",
    title: "Light as the first material",
    body: "Before colour, before type, we study how light lands. The rest of the composition simply agrees with it.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    icon: Sparkles,
  },
  {
    id: "horizon",
    index: "03",
    eyebrow: "Horizon",
    title: "Distance, made legible",
    body: "Scale is a narrative device. We hold the far edge in frame so the near detail has something to answer to.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    icon: Compass,
  },
];

export const Route = createFileRoute("/cinematic")({
  head: () => ({
    meta: [
      { title: "Cinematic — A Scroll-Led Editorial Experience" },
      {
        name: "description",
        content:
          "A dark, ultra-premium cinematic landing experience: inertial scrolling, word-by-word text reveals and clip-path image wipes.",
      },
      { property: "og:title", content: "Cinematic — A Scroll-Led Editorial Experience" },
      {
        property: "og:description",
        content:
          "Slow text fades, editorial image reveals and progressive section transitions in a minimalist dark aesthetic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: CinematicPage,
});

function CinematicPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white antialiased">
      {/* Pinned ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-18vh] h-[70vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.16),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20vh] right-[-10vw] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,6,23,0.85)_100%)]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Narrative />
        <Showcase />
        <Finale />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between px-6 pb-16 pt-28 sm:px-10 lg:px-16">
      <FadeLift>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
          Chapter one · after dark
        </span>
      </FadeLift>

      <div className="mx-auto grid w-full max-w-[1440px] items-end gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2.9rem,8vw,7rem)] font-light leading-[0.94] tracking-[-0.03em]">
            <ScrollWords text="Silence, rendered" className="block text-white" dim={0.18} />
            <ScrollWords
              text="in slow motion"
              className="block italic text-white/70"
              dim={0.12}
            />
          </h1>

          <FadeLift delay={220}>
            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-white/50">
              A scroll-led study in restraint — inertial motion, light that arrives late,
              and typography given room to breathe.
            </p>
          </FadeLift>

          <FadeLift delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#narrative"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-white/85"
              >
                Begin the descent
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/35 hover:text-white"
              >
                The work <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </FadeLift>
        </div>

        <ClipReveal
          src={HERO_IMAGE}
          alt="Low-light architectural study of a concrete stair"
          ratio="4 / 5"
          direction="up"
          className="w-full"
        />
      </div>

      <FadeLift delay={520} className="mt-14">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/35">
          <ArrowDown className="size-3.5 animate-bounce" />
          Scroll
          <span className="h-px w-16 bg-white/15 sm:w-32" />
        </div>
      </FadeLift>
    </section>
  );
}

function Narrative() {
  return (
    <section
      id="narrative"
      className="relative flex min-h-screen items-center px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <FadeLift>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
            02 — Narrative
          </p>
        </FadeLift>

        <ScrollWords
          className="mt-10 font-display text-[clamp(1.5rem,3.4vw,2.9rem)] font-light leading-[1.28] tracking-[-0.02em] text-white"
          text="We do not design for the first glance. We design for the second one — the moment after the surprise has passed and only proportion, weight and silence remain. Every reveal here is tied to your own pace: the words brighten as you read them, the images open only once you have arrived, and nothing rushes to be understood."
          dim={0.12}
        />

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            { k: "01", t: "Inertial", d: "Lenis-driven scroll with weighted easing." },
            { k: "02", t: "Progressive", d: "Sections resolve only as they are earned." },
            { k: "03", t: "Restrained", d: "One accent, one gesture, nothing spare." },
          ].map((c, i) => (
            <FadeLift key={c.k} delay={i * 140}>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">{c.k}</p>
                <h3 className="mt-3 text-lg font-light tracking-tight text-white">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{c.d}</p>
              </div>
            </FadeLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1440px]">
        <FadeLift>
          <header className="grid grid-cols-[minmax(0,1fr)] gap-3 border-b border-white/10 pb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
              03 — Showcase
            </p>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
              Three studies in light
            </h2>
          </header>
        </FadeLift>

        <div className="mt-16 flex flex-col gap-24 lg:gap-36">
          {SHOWCASE.map((item, i) => {
            const Icon = item.icon;
            const flip = i % 2 === 1;
            return (
              <article
                key={item.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <ClipReveal
                  src={item.image}
                  alt={item.title}
                  ratio="16 / 11"
                  direction={flip ? "right" : "left"}
                  className={flip ? "lg:order-2" : ""}
                />

                <FadeLift delay={140} className={flip ? "lg:order-1" : ""}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/70">
                        <Icon className="size-4" strokeWidth={1.5} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                        {item.index} · {item.eyebrow}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>

                    <ScrollWords
                      className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white"
                      text={item.body}
                      dim={0.16}
                    />

                    <a
                      href="#finale"
                      className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
                    >
                      Open study <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </FadeLift>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section
      id="finale"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32 text-center sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-slate-950" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.10),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[900px]">
        <FadeLift>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
            04 — Invitation
          </p>
        </FadeLift>

        <ScrollWords
          className="mx-auto mt-8 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-white"
          text="Let's make something that holds its silence."
          dim={0.1}
        />

        <FadeLift delay={280}>
          <p className="mx-auto mt-7 max-w-[48ch] text-[15px] leading-relaxed text-white/45">
            Bring the brief. We'll bring the patience — and the light.
          </p>
        </FadeLift>

        <FadeLift delay={420}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-white/85"
            >
              Start a conversation
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/35 hover:text-white"
            >
              Revisit the work
            </a>
          </div>
        </FadeLift>
      </div>
    </section>
  );
}
