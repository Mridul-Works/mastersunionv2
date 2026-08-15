import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SageChat, type SageContext } from "./SageChat";

type Section = { id: string; label: string };

const HOME_SECTIONS: Section[] = [
  { id: "top", label: "Top" },
  { id: "programs", label: "Programs" },
  { id: "pedagogy", label: "How we teach" },
  { id: "founders", label: "Founder" },
  { id: "news", label: "Newsroom" },
];

const HOME_CONTEXT: SageContext = {
  scope: "Masters' Union",
  suggestions: [
    "What programs do you offer?",
    "How is Masters' Union different?",
    "Where is the campus?",
    "Who teaches here?",
  ],
  answers: [
    {
      match: /program|course|pgp|degree/,
      reply:
        "We run flagship programs across postgraduate (PGP in Tech & Business Mgmt), undergraduate, executive, and specialised tracks like AI, B2B and Family Business. Tap Programs on the homepage to explore each one.",
    },
    {
      match: /different|unique|why|usp/,
      reply:
        "Industry leaders — CEOs, founders, investors — teach the classroom, not visiting professors. Every course ends in a real-world capstone with a partner company.",
    },
    {
      match: /campus|location|gurugram|where/,
      reply:
        "Our campus is in Gurugram, India — a purpose-built facility with a studio, food lab, startup floor and residential wings.",
    },
    {
      match: /faculty|teach|professor|mentor/,
      reply:
        "Faculty are practising CxOs and founders from companies like Google, Meta, Zomato, Nykaa and Sequoia. See the Faculty page for the full roster.",
    },
    {
      match: /admission|apply|deadline|fee/,
      reply:
        "Applications open in rounds. Round 2 is filling now — you get a decision in ~48 hours. Reach admissions at +91 76691 86660 or admissions@mastersunion.org.",
    },
    {
      match: /placement|salary|job/,
      reply:
        "Graduates place across product, consulting, VC and founders' offices. Median CTC has been in the top decile of Indian B-schools for three consecutive cohorts.",
    },
  ],
  fallback:
    "I don't have a canned answer for that yet — try one of the suggestions, or reach admissions at +91 76691 86660.",
};

const PROGRAM_CONTEXTS: Record<string, SageContext> = {
  "pgp-tbm": {
    scope: "PGP in Tech & Business Mgmt",
    suggestions: [
      "What is the fee?",
      "What is the placement record?",
      "Who is this program for?",
      "How long is the program?",
    ],
    answers: [
      {
        match: /fee|cost|price|tuition/,
        reply:
          "The all-inclusive program fee is ₹36.5L, covering tuition, residency, mentorship and the industry capstone. Financing options are available.",
      },
      {
        match: /place|salary|job|ctc|outcome/,
        reply:
          "The last cohort saw a median CTC of ₹29 LPA with top offers north of ₹1 Cr, across product, consulting and founders'-office roles.",
      },
      {
        match: /for whom|who is|eligibility|target/,
        reply:
          "Built for high-agency graduates and early-career operators (0–3 yrs) who want to work at the intersection of technology and business — future PMs, founders, VCs.",
      },
      {
        match: /duration|how long|length|month|year/,
        reply:
          "16 months, fully residential in Gurugram, with a live industry capstone and a global immersion week.",
      },
      {
        match: /admission|apply|round|deadline/,
        reply:
          "Round 2 is filling now. Applications take ~20 minutes and you get a decision within 48 hours.",
      },
    ],
    fallback:
      "Ask about fees, placements, duration or who this program is for — or talk to admissions at +91 76691 86660.",
  },
};

function programKey(pathname: string): string | null {
  const m = pathname.match(/^\/programmes\/([\w-]+)/);
  return m ? m[1] : null;
}

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function MobileBottomBar() {
  const isMobile = useIsMobile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [sageOpen, setSageOpen] = useState(false);

  const { sections, context } = useMemo(() => {
    const pk = programKey(pathname);
    if (pk && PROGRAM_CONTEXTS[pk]) {
      return {
        sections: [
          { id: "top", label: "Top" },
          { id: "model", label: "Model" },
          { id: "outcomes", label: "Outcomes" },
          { id: "faculty", label: "Faculty" },
          { id: "admissions", label: "Admissions" },
          { id: "faq", label: "FAQ" },
        ],
        context: PROGRAM_CONTEXTS[pk],
      };
    }
    // Homepage / other pages: use homepage sections when at "/"
    return { sections: HOME_SECTIONS, context: HOME_CONTEXT };
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!isMobile) return null;

  return (
    <>
      {/* Bottom bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-[150] pb-[max(env(safe-area-inset-bottom),8px)] pt-2"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0))",
        }}
      >
        <div className="mx-auto flex max-w-[420px] items-center justify-between rounded-full border border-black/10 bg-white/95 px-1.5 py-1.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl mx-3">
          {/* Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70 hover:bg-black/5"
          >
            <Menu className="size-4" strokeWidth={1.8} />
            Menu
          </button>

          {/* SAGE */}
          <button
            type="button"
            onClick={() => setSageOpen(true)}
            aria-label="Ask SAGE"
            className="group relative -my-3 mx-1 grid size-16 shrink-0 place-items-center rounded-full transition hover:scale-105 active:scale-95"
          >
            {/* Colorful conic gradient ring */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-90 blur-[2px] animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff6a3d, #ffcf3d, #3dd68c, #3d9bff, #b46bff, #ff6a3d)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-[3px] rounded-full bg-white"
            />
            {/* Inner logo */}
            <span
              className="relative grid size-11 place-items-center rounded-full text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)]"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #ffffff33 0%, transparent 45%), linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
              }}
            >
              <Sparkles className="size-5 drop-shadow-[0_0_6px_rgba(255,207,61,0.7)]" strokeWidth={1.8} />
            </span>
            <span className="absolute -bottom-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/70">
              Ask SAGE
            </span>
          </button>


          {/* Apply */}
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("apply");
            }}
            className="flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70 hover:bg-black/5"
          >
            Apply
            <ArrowUpRight className="size-3.5" strokeWidth={2} />
          </a>
        </div>
      </nav>

      {/* Menu sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-[180]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white pb-[max(env(safe-area-inset-bottom),16px)] pt-2 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.4)]">
            <div className="mx-auto mt-1 mb-3 h-1 w-10 rounded-full bg-black/15" />
            <div className="flex items-center justify-between px-5 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
                Jump to
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-8 place-items-center rounded-full text-black/60 hover:bg-black/5"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="px-2 pb-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => scrollToId(s.id), 120);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium text-black hover:bg-black/5"
                  >
                    {s.label}
                    <ArrowUpRight className="size-4 text-black/40" strokeWidth={1.8} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SAGE */}
      <SageChat open={sageOpen} onClose={() => setSageOpen(false)} context={context} />
    </>
  );
}

export default MobileBottomBar;
