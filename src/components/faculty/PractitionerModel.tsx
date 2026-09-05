import { useEffect, useRef, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";
import { orgLogoUrl } from "@/lib/org-logos";

const MONO = "var(--font-mono)";

export type PractitionerCard = {
  name: string;
  role: string;
  blurb?: string;
  img?: string;
};

export type MixGroup = {
  pct: string;
  label: string;
  note: string;
  items: PractitionerCard[];
};

function OrgMark({ company }: { company: string }) {
  const src = orgLogoUrl(company);
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span className="faculty-model-card-org" style={{ fontFamily: MONO }}>
        {company}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={company}
      loading="lazy"
      decoding="async"
      className="faculty-model-card-logo"
      onError={() => setFailed(true)}
    />
  );
}

function splitRole(role: string) {
  const i = role.indexOf(", ");
  if (i === -1) return { title: role, company: "" };
  return { title: role.slice(0, i), company: role.slice(i + 2) };
}

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

export default function PractitionerModel({
  groups,
  limit = 6,
}: {
  groups: MixGroup[];
  limit?: number;
}) {
  const [stage, setStage] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Scroll through the section to move between the three faculty groups.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = rect.height - vh * 0.55;
      if (span <= 0) return;
      const progress = Math.min(Math.max((vh * 0.45 - rect.top) / span, 0), 0.999);
      const next = Math.min(groups.length - 1, Math.floor(progress * groups.length));
      setStage((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [groups.length]);

  const active = groups[Math.min(stage, groups.length - 1)];
  const visible = (active?.items ?? []).slice(0, limit);

  return (
    <div className="faculty-model" ref={wrapRef}>
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
        {visible.map((p, index) => {
          const { title, company } = splitRole(p.role);
          return (
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
                {company ? (
                  <div className="faculty-model-card-company">
                    <OrgMark company={company} />
                  </div>
                ) : null}
              </div>
              <div className="faculty-model-card-body">
                <div className="faculty-model-card-heading">
                  <h3 className="faculty-model-card-name">{p.name}</h3>
                  <span className="faculty-model-card-index" style={{ fontFamily: MONO }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="faculty-model-card-role" style={{ fontFamily: MONO }}>
                  {title}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
