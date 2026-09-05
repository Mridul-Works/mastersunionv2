import { useEffect, useRef, useState } from "react";
import { TouchColorImg } from "@/components/TouchColorImg";

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
  initial = 8,
}: {
  groups: MixGroup[];
  initial?: number;
}) {
  const [stage, setStage] = useState(0);
  const [expanded, setExpanded] = useState(false);
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

  useEffect(() => setExpanded(false), [stage]);

  const active = groups[Math.min(stage, groups.length - 1)];
  const items = active?.items ?? [];
  const visible = expanded ? items : items.slice(0, initial);

  return (
    <div className="faculty-model" ref={wrapRef}>
      {/* LEFT — the mix rail */}
      <aside className="faculty-model-rail">
        <p className="faculty-model-rail-kicker" style={{ fontFamily: MONO }}>
          The Faculty Model
        </p>
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
                <div className="faculty-model-mix-figure">
                  <span className="faculty-model-mix-pct">{m.pct}</span>
                  <span className="faculty-model-mix-unit" style={{ fontFamily: MONO }}>
                    %
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
      </aside>

      {/* RIGHT — horizontal cards for the active group */}
      <div className="faculty-model-cards" key={active?.label}>
        {visible.map((p) => {
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
              </div>
              <div className="faculty-model-card-body">
                <h3 className="faculty-model-card-name">{p.name}</h3>
                <p className="faculty-model-card-role" style={{ fontFamily: MONO }}>
                  {title}
                </p>
                {company ? (
                  <p className="faculty-model-card-company" style={{ fontFamily: MONO }}>
                    {company}
                  </p>
                ) : null}
                {p.blurb ? <p className="faculty-model-card-blurb">{p.blurb}</p> : null}
              </div>
            </article>
          );
        })}

        {items.length > initial ? (
          <div className="faculty-model-more">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="faculty-model-more-btn"
              style={{ fontFamily: MONO }}
            >
              {expanded ? "Show fewer" : `View all ${items.length} — ${active.label}`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
