import { useEffect, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";
import { orgLogoUrl } from "@/lib/org-logos";

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

export default function PractitionerModel({
  groups,
  limit = 6,
}: {
  groups: MixGroup[];
  limit?: number;
}) {
  const [stage, setStage] = useState(0);

  const active = groups[Math.min(stage, groups.length - 1)];
  const visible = (active?.items ?? []).slice(0, limit);

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

  return (
    <div className="faculty-model">
      <header className="faculty-model-header">
        <div className="faculty-model-heading">
          <p className="faculty-model-rail-kicker" style={{ fontFamily: MONO }}>
            Academic excellence
          </p>
          <h2 className="faculty-model-title">Our Faculty Model</h2>
          <p className="faculty-model-deck">
            A deliberate composition of practitioners and academics, bridging
            rigorous thinking with real-world leadership.
          </p>
        </div>
      </header>

      <div className="faculty-model-body">
        <nav className="faculty-model-nav" aria-label="Faculty groups">
          <div className="faculty-model-nav-line" aria-hidden="true" />
          {groups.map((g, i) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setStage(i)}
              aria-pressed={i === stage}
              className="faculty-model-nav-row"
              data-active={i === stage ? "true" : undefined}
            >
              <span className="faculty-model-nav-pct">{g.pct}%</span>
              <span className="faculty-model-nav-label">{g.label}</span>
              <span className="faculty-model-nav-note">{g.note}</span>
            </button>
          ))}
        </nav>

        <div
          className="faculty-model-cards"
          key={active?.label}
          aria-live="polite"
        >
          {visible.map((p, idx) => {
            const offset = idx === 1 || idx === 4;
            return (
              <article
                key={p.name}
                className={`faculty-model-card${offset ? " faculty-model-card--offset" : ""}`}
              >
                <div className="faculty-model-card-photo">
                  <div className="faculty-model-card-photo-shadow" aria-hidden="true" />
                  <div className="faculty-model-card-photo-gradient" aria-hidden="true" />
                  {p.img ? (
                    <TouchColorImg
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition duration-700"
                    />
                  ) : (
                    <Initials name={p.name} />
                  )}
                </div>
                <div className="faculty-model-card-body">
                  <h3 className="faculty-model-card-name">{p.name}</h3>
                  <p className="faculty-model-card-role">{p.role}</p>
                  {p.org ? <OrgLogo org={p.org} /> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
