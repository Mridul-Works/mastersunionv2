// Auto-lookup helpers to attach imagery to ProgrammePage sections.
// Uses Vite glob imports so bundling stays tree-shaken to the JSON pointers only.

type AssetJson = { url: string; original_filename: string };

const facultyModules = import.meta.glob<AssetJson>(
  "/src/assets/faculty/**/*.png.asset.json",
  { eager: true, import: "default" },
);
const immersionModules = import.meta.glob<AssetJson>(
  "/src/assets/immersion-logos/*.asset.json",
  { eager: true, import: "default" },
);
const ventureModules = import.meta.glob<AssetJson>(
  "/src/assets/venture-logos/*.asset.json",
  { eager: true, import: "default" },
);

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?|professor/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function toEntries(mods: Record<string, AssetJson>) {
  return Object.entries(mods).map(([path, asset]) => {
    const base = path.split("/").pop()!.replace(/\.png\.asset\.json$/, "");
    return { key: normalize(base), url: asset.url, base };
  });
}

const FACULTY = toEntries(facultyModules);
const IMMERSIONS = toEntries(immersionModules);
const VENTURES = toEntries(ventureModules);

function bestMatch(list: { key: string; url: string }[], query: string) {
  const q = normalize(query);
  if (!q) return null;
  const tokens = q.split(" ").filter((t) => t.length > 2);
  let best: { url: string; score: number } | null = null;
  for (const item of list) {
    const itemTokens = item.key.split(" ").filter(Boolean);
    let score = 0;
    for (const t of tokens) {
      if (itemTokens.includes(t)) score += 2;
      else if (item.key.includes(t)) score += 1;
    }
    // Bonus if the file key is fully contained in query (short surname files)
    if (tokens.some((t) => t === item.key)) score += 3;
    if (score > 0 && (!best || score > best.score)) {
      best = { url: item.url, score };
    }
  }
  return best?.url ?? null;
}

export function findFacultyImage(name: string): string | null {
  return bestMatch(FACULTY, name);
}

export function findImmersionLogo(text: string): string | null {
  return bestMatch(IMMERSIONS, text);
}

export function findVentureLogo(startup: string): string | null {
  return bestMatch(VENTURES, startup);
}

// Fallback pool of faculty portraits for filling a carousel visually
export const FACULTY_POOL: string[] = FACULTY.map((f) => f.url);
