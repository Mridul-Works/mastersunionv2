/**
 * Live "By the numbers" figures for /faculty.
 *
 * Nothing here is hand-typed: every figure is derived from the actual faculty
 * rosters rendered on the page (industry practitioners, full-time PhD faculty,
 * visiting faculty and the universities they come from). Whenever a roster
 * entry is added or removed — including in demo/preview — the numbers move
 * with it, and the section carries a "refreshed" stamp for the current month.
 */

export type FacultyStat = { v: string; l: string };

export type FacultyRosters = {
  /** Industry practitioners currently on the teaching roster. */
  practitioners: { name: string }[];
  /** Full-time PhD faculty. */
  fullTime: { name: string }[];
  /** Visiting faculty, each carrying the university they teach at. */
  visiting: { name: string; school: string }[];
  /** Total masters on the roster (all cohorts of teachers, incl. non-listed). */
  rosterTotal?: number;
};

/** Schools that are not an external university partner for counting purposes. */
const IN_HOUSE = new Set(["masters' union", "masters union"]);

/** Distinct universities represented by the visiting faculty. */
export function universitiesRepresented(visiting: { school: string }[]): string[] {
  const seen = new Map<string, string>();
  for (const v of visiting) {
    const key = v.school.trim().toLowerCase();
    if (!key || IN_HOUSE.has(key)) continue;
    if (!seen.has(key)) seen.set(key, v.school.trim());
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

export type UniversityGroup = {
  school: string;
  faculty: { name: string; role: string; img?: string }[];
};

/**
 * Groups the visiting roster by university, live on every render — no API
 * calls, no cached payloads. In-house entries are excluded so the list only
 * reflects external partner universities.
 */
export function universityGroups(
  visiting: { name: string; role: string; school: string; img?: string }[],
): UniversityGroup[] {
  const map = new Map<string, UniversityGroup>();
  for (const v of visiting) {
    const school = v.school.trim();
    const key = school.toLowerCase();
    if (!key || IN_HOUSE.has(key)) continue;
    const group = map.get(key) ?? { school, faculty: [] };
    group.faculty.push({ name: v.name, role: v.role, img: v.img });
    map.set(key, group);
  }
  return [...map.values()]
    .map((g) => ({
      ...g,
      faculty: [...g.faculty].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => b.faculty.length - a.faculty.length || a.school.localeCompare(b.school));
}

/** Rounds down to a marketing-safe floor, e.g. 528 → "500+". */
function floorPlus(n: number): string {
  if (n < 20) return String(n);
  const step = n >= 200 ? 100 : n >= 100 ? 50 : 10;
  return `${Math.floor(n / step) * step}+`;
}

/** Month stamp shown next to the section label — recomputed on every render. */
export function statsRefreshedLabel(now: Date = new Date()): string {
  return `Refreshed ${now.toLocaleString("en-GB", { month: "short", year: "numeric" })}`;
}

export function buildFacultyStats(r: FacultyRosters): FacultyStat[] {
  const listed = r.practitioners.length + r.fullTime.length + r.visiting.length;
  const total = Math.max(r.rosterTotal ?? 0, listed);
  const schools = universitiesRepresented(r.visiting).length;
  const practitionerShare = listed ? Math.round((r.practitioners.length / listed) * 100) : 0;

  return [
    { v: floorPlus(total), l: "Masters on the roster" },
    { v: `${practitionerShare}%`, l: "Active industry practitioners" },
    { v: String(schools), l: "Universities represented" },
    { v: String(r.fullTime.length), l: "Full-time PhD faculty" },
  ];
}
