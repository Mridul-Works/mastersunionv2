/**
 * Maps organisation names that already appear in a faculty member's own role /
 * affiliation text to their official brand domain, so Logo.dev can serve the
 * correct official brand mark. Nothing here invents an affiliation: a logo is
 * only ever rendered when its key is literally present in the profile data.
 */
const BRAND_DOMAINS: Record<string, string> = {
  "Hero Electric": "heroelectric.in",
  "V3 Ventures": "v3ventures.in",
  "Dr. Vaidya's": "drvaidyas.com",
  "Arthur D. Little": "adlittle.com",
  NASA: "nasa.gov",
  "Standard Chartered": "sc.com",
  IBM: "ibm.com",
  NDTV: "ndtv.com",
  "General Motors": "gm.com",
  "Star Bazaar": "trentlimited.com",
  Trent: "trentlimited.com",
  "EY-Parthenon": "ey.com",
  "McKinsey & Company": "mckinsey.com",
  Mastercard: "mastercard.com",
  Trafigura: "trafigura.com",
  RBI: "rbi.org.in",
  "Morgan Stanley": "morganstanley.com",
  Swiggy: "swiggy.com",
  SoftBank: "softbank.jp",
  Airtel: "airtel.in",
  "Reliance Industries": "ril.com",
  PayPal: "paypal.com",
  Zomato: "zomato.com",
  Tesla: "tesla.com",
  Amazon: "amazon.com",
  boAt: "boat-lifestyle.com",
  IIFL: "iifl.com",
  Tesco: "tesco.com",
  Google: "google.com",
  Microsoft: "microsoft.com",
  Deloitte: "deloitte.com",
  "Goldman Sachs": "goldmansachs.com",
  Kellogg: "kellogg.northwestern.edu",
  Wharton: "wharton.upenn.edu",
  Harvard: "harvard.edu",
  Stanford: "stanford.edu",
  INSEAD: "insead.edu",
  "London Business School": "london.edu",
  Bocconi: "sdabocconi.it",
  "Imperial College": "imperial.ac.uk",
  Babson: "babson.edu",
};

export type Brand = { name: string; domain: string };

/**
 * Returns the single most relevant brand mentioned in the supplied profile
 * text (longest, i.e. most specific, match wins), or null when the profile
 * data does not name a mapped organisation.
 */
export function findBrand(...text: (string | undefined)[]): Brand | null {
  const haystack = text.filter(Boolean).join(" · ");
  if (!haystack) return null;
  let best: Brand | null = null;
  for (const [name, domain] of Object.entries(BRAND_DOMAINS)) {
    if (!haystack.toLowerCase().includes(name.toLowerCase())) continue;
    if (!best || name.length > best.name.length) best = { name, domain };
  }
  return best;
}

const LOGO_TOKEN = import.meta.env["VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY"] as string | undefined;

/** Monochrome-friendly logo URL for a brand domain, or null when unavailable. */
export function brandLogoUrl(domain: string, size = 96): string | null {
  if (!LOGO_TOKEN) return null;
  const params = new URLSearchParams({
    token: LOGO_TOKEN,
    size: String(size),
    format: "png",
    theme: "dark",
    retina: "true",
  });
  return `https://img.logo.dev/${domain}?${params.toString()}`;
}
