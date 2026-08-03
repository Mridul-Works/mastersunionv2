import { useEffect, useRef, useState } from "react";

type Entry = {
  time: string;
  meridiem: string;
  title: string;
  body: string;
};

const ENTRIES: Entry[] = [
  {
    time: "07:30",
    meridiem: "AM",
    title: "Checking Shopify numbers",
    body: "Before coffee, before anything, you check Shopify. Someone in Pune ordered three units at 2am. You check the margin. It's good. You make a mental note to increase ad spend. You make the same mental note every morning. Today you might actually do it.",
  },
  {
    time: "09:00",
    meridiem: "AM",
    title: "The lecture that isn't really a lecture",
    body: "The person in front of the room was in a board meeting yesterday. He is the MD of Morgan Stanley. He does not use slides. He asks questions instead — pointed, uncomfortable, the kind that make you realise your answer made perfect sense until you said it out loud. He tells you your pricing is wrong. Your Shopify notification, buzzing in your pocket, respectfully disagrees.",
  },
  {
    time: "10:45",
    meridiem: "AM",
    title: "The KFC debate",
    body: "You and your co-founder — also your batchmate, also your hostel neighbour, also the person who ate the last of your maggi last Tuesday — walk to the KFC on campus and spend fifteen minutes arguing about ad spend. You land on a number. You both know it might be wrong. You run it anyway. This is called unit economics.",
  },
  {
    time: "11:00",
    meridiem: "AM",
    title: "The founder in the room",
    body: "The next person in is someone you follow on Instagram. She built a D2C brand to ₹100 Cr ARR. She is 31. She is taking questions. You ask one. She answers and then asks you a follow-up about your own venture. The room goes quiet. She nods slowly in the way that means she is either impressed or about to say something devastating. It was impressive. Probably.",
  },
  {
    time: "1:00",
    meridiem: "PM",
    title: "Lunch, briefly",
    body: "Twelve eating options on campus. You eat fast because your pitch deck has three slides still held together by optimism and a font choice you regret.",
  },
  {
    time: "3:00",
    meridiem: "PM",
    title: "Content shoot in the corridor",
    body: "Two students are shooting a product unboxing. This is normal. One has 40,000 Instagram followers. The other is their editor, roommate, and co-elective partner. The tripod is campus property. The ring light is theirs. The 46M+ aggregate reach across the cohort is earned.",
  },
  {
    time: "5:00",
    meridiem: "PM",
    title: "Investment Fund portfolio review",
    body: "The Student Investment Fund meets. ₹5 Cr of real capital. Real decisions. Today: reviewing a SaaS company's Q3 numbers, deciding whether to hold or exit. The conversation sounds exactly like a VC meeting because it is one, just with better snacks and worse coffee.",
  },
  {
    time: "7:30",
    meridiem: "PM",
    title: "An unscheduled visitor",
    body: "Someone well known is in the building. He did not announce this. He ends up staying two hours. Three students get feedback on their ventures. One gets a contact intro. Nobody planned this. This is also a Tuesday.",
  },
  {
    time: "10:30",
    meridiem: "PM",
    title: "The thread goes live",
    body: "One student publishes a breakdown of what they learned today. 14,000 impressions by morning. Their professor sends a voice note. It says: not bad. You go to sleep. Shopify is still open on your laptop.",
  },
];

function TimelineItem({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[110px_1fr] gap-6 md:grid-cols-[160px_1fr] md:gap-12 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {/* Time column */}
      <div className="pt-1 text-right">
        <div className="font-serif text-2xl md:text-3xl text-ink leading-none tracking-tight">
          {entry.time}
        </div>
        <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {entry.meridiem}
        </div>
      </div>

      {/* Rail + dot */}
      <div className="relative pb-9 md:pb-12">
        <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-px bg-border" />
        <div className="absolute -left-[27px] md:-left-[51px] top-2 h-3 w-3 rounded-full bg-[var(--teal)] ring-4 ring-background" />

        <div className="max-w-2xl">
          <div className="mb-3 text-[10px] md:text-xs uppercase tracking-[0.28em] text-[var(--teal)]">
            {String(index + 1).padStart(2, "0")} · Moment
          </div>
          <h3 className="font-serif text-2xl md:text-4xl leading-[1.15] tracking-tight text-ink">
            {entry.title}
          </h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/75">
            {entry.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DayInLifeCalendar() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 md:px-10 pt-14 pb-10 md:pt-18 md:pb-14">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[var(--teal)]">
            Life at Masters' Union
          </div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink">
            This is what a<br />
            <span className="font-serif-italic">Tuesday</span> looks like.
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-foreground/70">
            Every day is like this. You get used to it around month three.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        <div className="pl-8 md:pl-16">
          {ENTRIES.map((e, i) => (
            <TimelineItem key={i} entry={e} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border bg-cream/40">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
          <p className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight text-ink max-w-3xl">
            Wednesday has a pitch.<br />
            Thursday has a corporate one-day challenge.<br />
            Friday is for recovering. <span className="font-serif-italic">Slightly.</span>
          </p>

          <div className="mt-8">
            <a
              href="https://mastersunion.org/apply"
              className="group inline-flex items-center gap-4 rounded-full bg-ink px-8 py-4 text-sm md:text-base uppercase tracking-[0.2em] text-background transition-all hover:bg-[var(--teal)]"
            >
              Apply to Masters' Union
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
