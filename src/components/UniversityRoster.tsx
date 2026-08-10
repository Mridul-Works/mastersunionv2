import { useMemo, useState } from "react";
import { universityGroups, type UniversityGroup } from "@/lib/faculty-stats";

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF = "'Fraunces', Georgia, serif";

type Entry = { name: string; role: string; school: string; img?: string };

/**
 * Universities represented, derived live from the visiting roster on every
 * render — no network calls, no cached API payloads. Each university name is
 * clickable and expands into the faculty who teach here from that school,
 * computed from the same in-page data so it is instant on any connection.
 */
export default function UniversityRoster({ visiting }: { visiting: Entry[] }) {
  const groups: UniversityGroup[] = useMemo(() => universityGroups(visiting), [visiting]);
  const [active, setActive] = useState<string | null>(null);
  const current = groups.find((g) => g.school === active) ?? null;

  if (!groups.length) {
    return (
      <p className="text-[0.9rem] text-black/55">
        No partner universities are currently listed on the visiting roster.
      </p>
    );
  }

  return (
    <div>
      <div
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-black/50"
        style={{ fontFamily: MONO }}
      >
        <span>Universities represented</span>
        <span className="text-black/35">
          {groups.length} schools · {visiting.length} faculty · live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-3 md:grid-cols-4">
        {groups.map((g) => {
          const isActive = g.school === active;
          return (
            <button
              key={g.school}
              type="button"
              aria-expanded={isActive}
              onClick={() => setActive(isActive ? null : g.school)}
              className={`flex h-16 items-center justify-between gap-3 px-4 text-left transition-colors ${
                isActive ? "bg-black text-white" : "bg-white text-black/85 hover:bg-neutral-50"
              }`}
            >
              <span className="truncate text-[0.92rem] italic leading-tight" style={{ fontFamily: SERIF }}>
                {g.school}
              </span>
              <span
                className={`shrink-0 text-[10px] tracking-[0.16em] ${isActive ? "text-white/60" : "text-black/45"}`}
                style={{ fontFamily: MONO }}
              >
                {String(g.faculty.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {current ? (
        <div className="mt-5 border border-black/12 bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[1.15rem] italic leading-tight text-black" style={{ fontFamily: SERIF }}>
              {current.school}
            </h3>
            <span
              className="text-[10px] uppercase tracking-[0.2em] text-black/45"
              style={{ fontFamily: MONO }}
            >
              {current.faculty.length} on the roster
            </span>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {current.faculty.map((f) => (
              <li key={f.name} className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/10 bg-neutral-100">
                  {f.img ? (
                    <img
                      src={f.img}
                      alt=""
                      width={88}
                      height={88}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[0.9rem] text-black">{f.name}</div>
                  <div className="truncate text-[11px] leading-snug text-black/55">{f.role}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-[0.85rem] text-black/45">
          Select a university to see the faculty who teach here from that school.
        </p>
      )}
    </div>
  );
}
