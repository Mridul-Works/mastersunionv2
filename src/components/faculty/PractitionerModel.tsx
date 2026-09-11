import { useEffect, useRef, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";
import { orgLogoUrl } from "@/lib/org-logos";
import { onScrollFrame, type ScrollState } from "@/lib/scroll-driver";

const MONO = "var(--font-mono)";
const SANS = "var(--font-sans)";

export type PractitionerCard = {
  name: string;
  role: string;
  blurb?: string;
  img?: string;
  /** Company / school shown as a logo at the bottom of the card. */
  org?: string;
};

export type MixGroup = {
  pct: string;
  label: string;
  note: string;
  items: PractitionerCard[];
};

function Initials({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr|Captain|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-secondary text-[1.4rem] text-foreground/35"
      style={{ fontFamily: MONO }}
    >
      {initials}
    </div>
  );
}

function OrgLogo({ org }: { org: string }) {
  const [failed, setFailed] = useState(false);
  const url = orgLogoUrl(org, 128);
  const showLogo = Boolean(url) && !failed;
  return (
    <div className="faculty-model-card-logo">
      {showLogo ? (
        <img
          src={url}
          alt={`${org} logo`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="faculty-model-card-logo-text">{org}</span>
      )}
    </div>
  );
}

function FacultyCard({ p, index }: { p: PractitionerCard; index: number }) {
  return (
    <article key={p.name} className="faculty-model-card" style={{ ["--card-index" as string]: index }}>
      <div className="faculty-model-card-photo">
        <div className="faculty-model-card-photo-frame">
          {p.img ? (
            <TouchColorImg
              src={p.img}
              alt={p.name}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="h-full w-full object-cover object-top transition duration-700"
            />
          ) : (
            <Initials name={p.name} />
          )}
        </div>
      </div>
      <div className="faculty-model-card-body">
        <div className="faculty-model-card-info">
          <div className="faculty-model-card-top">
            <h3 className="faculty-model-card-name">{p.name}</h3>
            <p className="faculty-model-card-role">{p.role}</p>
          </div>
          <div className="faculty-model-card-bottom">
            <div className="faculty-model-card-divider" aria-hidden="true" />
            {p.org ? <OrgLogo org={p.org} /> : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PractitionerModel({
  groups,
  limit = 6,
}: {
  groups: MixGroup[];
  limit?: number;
}) {
  const [stage, setStage] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ top: 0, height: 0 });

  const active = groups[Math.min(stage, groups.length - 1)];

  // Preload every group's portraits and logos so switching sections is instant.
  useEffect(() => {
    for (const g of groups) {
      for (const item of g.items.slice(0, limit)) {
        if (item.img) {
          const im = new Image();
          im.src = item.img;
        }
        const logo = item.org ? orgLogoUrl(item.org, 128) : null;
        if (logo) {
          const im = new Image();
          im.src = logo;
        }
      }
    }
  }, [groups, limit]);




  // Scroll-driven group switching while the section is pinned. Each group gets
  // one viewport of scroll travel; clicking the selector still works.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const count = groups.length;
    if (count < 2) return;

    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      metrics.current.top = rect.top + window.scrollY;
      metrics.current.height = rect.height;
    };

    const write = ({ y, vh, vw }: ScrollState) => {
      if (vw < 768) return;
      const { top, height } = metrics.current;
      const travel = height - vh;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, (y - top) / travel));
      const next = Math.min(count - 1, Math.floor(progress * count));
      setStage((prev) => (prev === next ? prev : next));
    };

    return onScrollFrame(write, measure);
  }, [groups.length]);

  // Clicking a group scrolls to that group's slice of the pinned range on
  // desktop, so scroll position and the visible group stay in agreement.
  const goToStage = (i: number) => {
    setStage(i);
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) return;
    const target = top + (travel * (i + 0.5)) / groups.length;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      className="faculty-model"
      ref={rootRef}
      style={{ ["--faculty-model-stages" as string]: groups.length }}
    >
      <div className="faculty-model-body">
        {/* LEFT COLUMN: sticky header + group selector + rail nav */}
        <div className="faculty-model-axis">
          <header className="faculty-model-header">
            <p className="faculty-model-rail-kicker" style={{ fontFamily: MONO }}>
              Academic excellence
            </p>
            <h2 className="faculty-model-title">Our Faculty Model</h2>
            <p className="faculty-model-deck">
              A deliberate composition of practitioners and academics, bridging
              rigorous thinking with real-world leadership.
            </p>
          </header>

          <nav className="faculty-model-nav" aria-label="Faculty groups">
            {groups.map((g, i) => (
              <button
                key={g.label}
                type="button"
                onClick={() => goToStage(i)}
                aria-pressed={i === stage}
                className="faculty-model-nav-row"
                data-active={i === stage ? "true" : undefined}
              >
                <span className="faculty-model-nav-pct">{g.pct}%</span>
                <span className="faculty-model-nav-content">
                  <span className="faculty-model-nav-label">{g.label}</span>
                  <span className="faculty-model-nav-note">{g.note}</span>
                </span>
              </button>
            ))}
          </nav>

        </div>

        {/* RIGHT COLUMN: static six-card grid */}
        <div className="faculty-model-rail-wrap" ref={railRef}>
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className="faculty-model-rail"
              aria-hidden={g.label !== active?.label}
              data-active={g.label === active?.label ? "true" : undefined}
            >
              {g.items.slice(0, limit).map((p, idx) => (
                <FacultyCard key={`${gi}-${p.name}`} p={p} index={idx} />
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
