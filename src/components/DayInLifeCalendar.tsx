import { useEffect, useState } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const DISPLAY = "'Inter', system-ui, sans-serif";

type Tag = "VENTURE" | "CLASSROOM" | "CONTENT" | "FUND" | "MENTOR";

type Block = {
  id: number;
  startHour: number;
  startMinute: number;
  duration: number;
  title: string;
  tag: Tag;
  bg: string;
  fg: string;
  border?: string;
  story: string;
};

// Light editorial palette matched to the homepage: warm off-white surface,
// ink text, teal accent, restrained pastel event colours.
const ACCENT = "#006A4E"; // teal from homepage
const INK = "#111";
const SUB = "#666";
const MUTED = "#999";
const SURFACE = "#FAF7F1"; // warm cream (matches --cream vibe)
const GRID = "#FFFFFF";
const HOUR_LINE = "#E9E4DA";
const HALF_LINE = "#F1ECE1";

const BLOCKS: Block[] = [
  {
    id: 1, startHour: 7, startMinute: 30, duration: 30,
    title: "Checking Shopify numbers", tag: "VENTURE",
    bg: "#F4C641", fg: "#1A1300",
    story: "Before coffee, before anything, you check Shopify. Someone in Pune ordered three units at 2am. You check the margin. It's good. You make a mental note to increase ad spend. You make the same mental note every morning. Today you might actually do it.",
  },
  {
    id: 2, startHour: 9, startMinute: 0, duration: 90,
    title: "The lecture that isn't really a lecture", tag: "CLASSROOM",
    bg: "#111111", fg: "#FFFFFF", border: "#F4C641",
    story: "The person in front of the room was in a board meeting yesterday. He is the MD of Morgan Stanley. He does not use slides. He asks questions instead — pointed, uncomfortable, the kind that make you realise your answer made perfect sense until you said it out loud. He tells you your pricing is wrong. Your Shopify notification, buzzing in your pocket, respectfully disagrees.",
  },
  {
    id: 3, startHour: 10, startMinute: 45, duration: 15,
    title: "The KFC debate", tag: "VENTURE",
    bg: "#F4C641", fg: "#1A1300",
    story: "You and your co-founder — also your batchmate, also your hostel neighbour, also the person who ate the last of your maggi last Tuesday — walk to the KFC on campus and spend fifteen minutes arguing about ad spend. You land on a number. You both know it might be wrong. You run it anyway. This is called unit economics.",
  },
  {
    id: 4, startHour: 11, startMinute: 0, duration: 60,
    title: "The founder in the room", tag: "CLASSROOM",
    bg: "#111111", fg: "#FFFFFF", border: "#F4C641",
    story: "Guest changes. The next person in is someone you follow on Instagram. She built a D2C brand to ₹100 Cr ARR. She is 31. She is taking questions. You ask one. She answers it and then asks you a follow-up about your own venture. The room goes quiet. You answer. She nods slowly in the way that means she is either impressed or about to say something devastating. It was impressive. Probably.",
  },
  {
    id: 5, startHour: 13, startMinute: 0, duration: 30,
    title: "Pitch practice over lunch", tag: "VENTURE",
    bg: "#F4C641", fg: "#1A1300",
    story: "Twelve eating options on campus. You eat fast because your pitch deck has three slides that are still held together by optimism and a font choice you regret. Shubham runs his Seeds AI deck past three classmates. One of them will be a founder in 18 months. Nobody knows which one yet.",
  },
  {
    id: 6, startHour: 15, startMinute: 0, duration: 60,
    title: "Content shoot in the corridor", tag: "CONTENT",
    bg: "#E8F1EC", fg: "#005A42",
    story: "Two students are shooting a product unboxing. This is normal. One of them has 40,000 Instagram followers. The other is their editor, who is also their roommate, who is also taking the same elective. The tripod is campus property. The ring light is theirs. The 46M+ aggregate reach across the cohort is earned.",
  },
  {
    id: 7, startHour: 17, startMinute: 0, duration: 60,
    title: "Investment Fund portfolio review", tag: "FUND",
    bg: "#EFE7F5", fg: "#5B2E9A",
    story: "The Student Investment Fund meets. ₹5 Cr of real capital. Real decisions. Today: reviewing a SaaS company's Q3 numbers and deciding whether to hold or exit. The conversation sounds exactly like a VC meeting because it is one, just with better snacks and worse coffee.",
  },
  {
    id: 8, startHour: 19, startMinute: 30, duration: 120,
    title: "An unscheduled visitor", tag: "MENTOR",
    bg: "#FBEBD8", fg: "#8A4A0F",
    story: "Someone well known is in the building. He did not announce this. He ends up staying two hours. Three students get feedback on their ventures. One gets a contact intro. Nobody planned this. This is also a Tuesday.",
  },
  {
    id: 9, startHour: 22, startMinute: 30, duration: 30,
    title: "The thread goes live", tag: "CONTENT",
    bg: "#E8F1EC", fg: "#005A42",
    story: "One student publishes a breakdown of what they learned today — the pricing session, the fund call, the KFC argument that turned into an actual strategy. 14,000 impressions by morning. Their professor sees it and sends a voice note. It says: not bad. You go to sleep. Shopify is still open on your laptop.",
  },
];

const START_HOUR = 7;
const END_HOUR = 23;
const HOURS = END_HOUR - START_HOUR;
const HOUR_H_DESKTOP = 72;
const HOUR_H_MOBILE = 56;

const LEGEND: { tag: Tag; bg: string; fg: string }[] = [
  { tag: "VENTURE", bg: "#F4C641", fg: "#1A1300" },
  { tag: "CLASSROOM", bg: "#111111", fg: "#FFFFFF" },
  { tag: "CONTENT", bg: "#E8F1EC", fg: "#005A42" },
  { tag: "FUND", bg: "#EFE7F5", fg: "#5B2E9A" },
  { tag: "MENTOR", bg: "#FBEBD8", fg: "#8A4A0F" },
];

function fmt(h: number, m: number) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function endTime(b: Block) {
  const total = b.startHour * 60 + b.startMinute + b.duration;
  return { h: Math.floor(total / 60), m: total % 60 };
}

export default function DayInLifeCalendar() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hourH = isMobile ? HOUR_H_MOBILE : HOUR_H_DESKTOP;
  const gridH = hourH * HOURS;
  const nowTop = (14.5 - START_HOUR) * hourH;

  const openBlock = BLOCKS.find((b) => b.id === openId) ?? null;

  const handleClick = (id: number) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    if (openId !== null) {
      setOpenId(null);
      setTimeout(() => setOpenId(id), 200);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section
      className="w-full"
      style={{ background: SURFACE, color: INK, fontFamily: DISPLAY }}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        {/* Header */}
        <div
          className="text-[11px] uppercase"
          style={{ color: ACCENT, letterSpacing: "0.25em", fontFamily: MONO }}
        >
          Tuesday at Masters&apos; Union
        </div>
        <h2 className="mt-5 max-w-[22ch] text-[32px] font-medium leading-[0.98] tracking-[-0.02em] md:text-[52px]" style={{ color: INK }}>
          This is what a day looks like.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[15px] italic" style={{ color: SUB }}>
          Every day is like this. You get used to it around month three.
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-2">
          {LEGEND.map((l) => (
            <span
              key={l.tag}
              className="rounded-full px-2.5 py-1 text-[10px]"
              style={{
                background: l.bg,
                color: l.fg,
                fontFamily: MONO,
                letterSpacing: "0.18em",
                border: l.tag === "CLASSROOM" ? `1px solid #F4C641` : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {l.tag}
            </span>
          ))}
        </div>

        {/* Calendar + Panel */}
        <div className="mt-12 flex flex-col gap-5 md:flex-row">
          <div
            className="transition-all duration-300"
            style={{
              flex: openBlock && !isMobile ? "0 0 55%" : "1 1 100%",
              maxWidth: openBlock && !isMobile ? "55%" : "100%",
            }}
          >
            <div
              className="relative w-full"
              style={{
                maxHeight: isMobile ? "80vh" : "none",
                overflowY: isMobile ? "auto" : "visible",
              }}
            >
              <div className="flex" style={{ height: gridH }}>
                {/* Hour labels */}
                <div className="relative flex-none" style={{ width: 56 }}>
                  {Array.from({ length: HOURS + 1 }).map((_, i) => {
                    const h = START_HOUR + i;
                    if (h > END_HOUR) return null;
                    return (
                      <div
                        key={h}
                        className="absolute right-3 -translate-y-1/2 text-[11px]"
                        style={{
                          top: i * hourH,
                          color: MUTED,
                          fontFamily: MONO,
                        }}
                      >
                        {String(h).padStart(2, "0")}:00
                      </div>
                    );
                  })}
                </div>

                {/* Grid */}
                <div
                  className="relative flex-1"
                  style={{
                    background: GRID,
                    borderRadius: 8,
                    border: `1px solid ${HOUR_LINE}`,
                  }}
                >
                  {Array.from({ length: HOURS }).map((_, i) => (
                    <div key={`h-${i}`}>
                      <div
                        className="absolute left-0 right-0"
                        style={{
                          top: i * hourH,
                          height: 1,
                          background: HOUR_LINE,
                        }}
                      />
                      <div
                        className="absolute left-0 right-0"
                        style={{
                          top: i * hourH + hourH / 2,
                          borderTop: `1px dashed ${HALF_LINE}`,
                        }}
                      />
                    </div>
                  ))}

                  {/* Event blocks */}
                  {BLOCKS.map((b) => {
                    const top = (b.startHour - START_HOUR) * hourH + (b.startMinute / 60) * hourH;
                    const height = (b.duration / 60) * hourH;
                    const end = endTime(b);
                    const isShort = height < 30;
                    const showTag = height > 44;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleClick(b.id)}
                        title={`${fmt(b.startHour, b.startMinute)} – ${fmt(end.h, end.m)} · ${b.title}`}
                        className="group absolute overflow-hidden text-left transition-all"
                        style={{
                          top: top + 2,
                          height: height - 4,
                          left: 8,
                          right: 8,
                          background: b.bg,
                          color: b.fg,
                          borderRadius: 6,
                          borderLeft: b.border ? `3px solid ${b.border}` : undefined,
                          boxShadow: openId === b.id ? `0 0 0 1.5px ${b.fg}` : undefined,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = "brightness(1.05)";
                          e.currentTarget.style.boxShadow = `0 0 0 1.5px ${b.fg}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = "";
                          e.currentTarget.style.boxShadow =
                            openId === b.id ? `0 0 0 1.5px ${b.fg}` : "";
                        }}
                      >
                        {isShort ? (
                          <div className="flex h-full items-center gap-2 px-2">
                            <span
                              className="inline-block h-2 w-2 flex-none rounded-full"
                              style={{ background: b.fg }}
                            />
                            <span
                              className="text-[10px]"
                              style={{ fontFamily: MONO, color: b.fg }}
                            >
                              {fmt(b.startHour, b.startMinute)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col justify-between p-2">
                            <div>
                              <div
                                className="text-[10px]"
                                style={{ fontFamily: MONO, opacity: 0.75 }}
                              >
                                {fmt(b.startHour, b.startMinute)} – {fmt(end.h, end.m)}
                              </div>
                              <div className="mt-1 truncate text-[13px] font-semibold leading-tight">
                                {b.title}
                              </div>
                            </div>
                            {showTag && (
                              <div className="flex justify-end">
                                <span
                                  className="rounded-full px-2 py-0.5 text-[9px]"
                                  style={{
                                    background: "rgba(0,0,0,0.12)",
                                    color: b.fg,
                                    fontFamily: MONO,
                                    letterSpacing: "0.18em",
                                  }}
                                >
                                  {b.tag}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* NOW indicator */}
                  <div
                    className="pointer-events-none absolute left-0 right-0"
                    style={{ top: nowTop }}
                  >
                    <div className="relative">
                      <div style={{ height: 1, background: "#FF4444" }} />
                      <div
                        className="absolute -left-1 -top-[3.5px] h-2 w-2 rounded-full"
                        style={{ background: "#FF4444" }}
                      />
                      <div
                        className="absolute -top-[14px] text-[9px]"
                        style={{
                          left: -32,
                          color: "#FF4444",
                          fontFamily: MONO,
                          letterSpacing: "0.2em",
                        }}
                      >
                        NOW
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Panel (desktop) */}
          {openBlock && !isMobile && (
            <aside
              style={{
                flex: "0 0 40%",
                maxWidth: "40%",
                background: GRID,
                borderLeft: `1px solid ${HOUR_LINE}`,
                border: `1px solid ${HOUR_LINE}`,
                borderRadius: 8,
                minHeight: gridH,
                animation: "dilPanel 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <StoryPanel block={openBlock} onClose={() => setOpenId(null)} />
            </aside>
          )}
        </div>

        {/* Mobile overlay panel */}
        {openBlock && isMobile && (
          <>
            <div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.35)" }}
              onClick={() => setOpenId(null)}
            />
            <div
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto"
              style={{
                background: GRID,
                borderTop: `1px solid ${HOUR_LINE}`,
                animation: "dilPanelUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <StoryPanel block={openBlock} onClose={() => setOpenId(null)} />
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p
            className="max-w-[46ch] text-[18px] italic leading-snug md:text-[22px]"
            style={{ color: MUTED }}
          >
            Wednesday has a pitch. Thursday has a corporate one-day challenge. Friday is for recovering. Slightly.
          </p>
          <a
            href="/applications_center"
            className="text-[12px] uppercase underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{
              color: ACCENT,
              fontFamily: MONO,
              letterSpacing: "0.2em",
            }}
          >
            Apply to Masters&apos; Union →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes dilPanel {
          from { transform: translateX(24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes dilPanelUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function StoryPanel({ block, onClose }: { block: Block; onClose: () => void }) {
  const end = endTime(block);
  const legend = LEGEND.find((l) => l.tag === block.tag)!;
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between">
        <span
          className="rounded-full px-2.5 py-1 text-[10px]"
          style={{
            background: legend.bg,
            color: legend.fg,
            fontFamily: MONO,
            letterSpacing: "0.18em",
            border: block.tag === "CLASSROOM" ? "1px solid #F4C641" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {block.tag}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-[20px] leading-none transition-colors"
          style={{ color: SUB }}
        >
          ×
        </button>
      </div>
      <div
        className="mt-6 text-[12px]"
        style={{ color: SUB, fontFamily: MONO }}
      >
        {fmt(block.startHour, block.startMinute)} — {fmt(end.h, end.m)}
      </div>
      <h3 className="mt-3 text-[24px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[28px]" style={{ color: INK }}>
        {block.title}
      </h3>
      <div
        className="mt-6"
        style={{ height: 1, background: "#F4C641" }}
      />
      <p
        className="mt-6 text-[15px] leading-[1.7] md:text-[16px]"
        style={{ color: "#333" }}
      >
        {block.story}
      </p>
    </div>
  );
}
