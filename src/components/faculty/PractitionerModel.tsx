import { useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";
import { orgLogoUrl } from "@/lib/org-logos";

const MONO = "var(--font-mono)";

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
    .replace(/^(Dr|Captain|Mr|Mrs|Ms)\.?\s+/i, "")
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
  return (
    <div className="faculty-model-card-logo">
      {url && !failed && (
        <img
          src={url}
          alt={`${org} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <span className="faculty-model-card-logo-text">{org}</span>
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
        <ul className="faculty-model-mix">
          {groups.map((m, i) => (
            <li key={m.label}>
              <button
                type="button"
                onClick={() => setStage(i)}
                aria-pressed={i === stage}
                className="faculty-model-mix-row w-full text-left"
                data-active={i === stage ? "true" : undefined}
              >
                <div className="faculty-model-mix-topline">
                  <span className="faculty-model-mix-short" style={{ fontFamily: MONO }}>
                    {i === 0 ? "Industry" : i === 1 ? "Full-time" : "Visiting"}
                  </span>
                  <span className="faculty-model-mix-figure">
                    <span className="faculty-model-mix-pct">{m.pct}</span>
                    <span className="faculty-model-mix-unit" style={{ fontFamily: MONO }}>
                      %
                    </span>
                  </span>
                </div>
                <div className="faculty-model-mix-body">
                  <p className="faculty-model-mix-label">{m.label}</p>
                  <p className="faculty-model-mix-note">{m.note}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </header>

      <div className="faculty-model-cards" key={active?.label} aria-live="polite">
        {visible.map((p) => (
            <article key={p.name} className="faculty-model-card">
              <div className="faculty-model-card-photo">
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
          ))}
      </div>
    </div>
  );
}
