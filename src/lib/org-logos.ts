// Company / institution logos for faculty cards.
// Resolved through Logo.dev by domain, matched on keywords found in the
// company or school string so messy roster text ("Star Bazaar (Trent · Tata)")
// still maps to a real brand.

const LOGO_TOKEN = import.meta.env['VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY'] as
  | string
  | undefined;

/** keyword (lowercase) -> logo domain. First match wins, longest keywords first. */
const DOMAINS: Record<string, string> = {
  "hero electric": "heroelectric.in",
  "v3 ventures": "v3ventures.in",
  "dr. vaidya": "drvaidyas.com",
  "arthur d. little": "adlittle.com",
  nasa: "nasa.gov",
  "standard chartered": "sc.com",
  ibm: "ibm.com",
  ndtv: "ndtv.com",
  "general motors": "gm.com",
  trent: "trentlimited.com",
  tata: "tata.com",
  "ey-parthenon": "ey.com",
  mckinsey: "mckinsey.com",
  mastercard: "mastercard.com",
  trafigura: "trafigura.com",
  "planning commission": "niti.gov.in",
  "reserve bank": "rbi.org.in",
  "morgan stanley": "morganstanley.com",
  swiggy: "swiggy.com",
  softbank: "softbank.jp",
  airtel: "airtel.in",
  reliance: "ril.com",
  natgrid: "natgrid.gov.in",
  paypal: "paypal.com",
  zomato: "zomato.com",
  tesla: "tesla.com",
  boat: "boat-lifestyle.com",
  iifl: "iifl.com",
  tesco: "tesco.com",
  "finance secretary": "finmin.nic.in",
  "masters' union": "mastersunion.org",
  "masters union": "mastersunion.org",
  // Universities
  "harvard kennedy": "hks.harvard.edu",
  harvard: "harvard.edu",
  stanford: "stanford.edu",
  wharton: "wharton.upenn.edu",
  cornell: "cornell.edu",
  "nyu stern": "stern.nyu.edu",
  nyu: "nyu.edu",
  columbia: "columbia.edu",
  usc: "usc.edu",
  imperial: "imperial.ac.uk",
  "london school of economics": "lse.ac.uk",
  purdue: "purdue.edu",
  "seattle university": "seattleu.edu",
  "brigham young": "byu.edu",
  "indian school of business": "isb.edu",
  "iim calcutta": "iimcal.ac.in",
  "iim bangalore": "iimb.ac.in",
  "mdi gurgaon": "mdi.ac.in",
  "university of hyderabad": "uohyd.ac.in",
  "asian institute of technology": "ait.ac.th",
  "iit kharagpur": "iitkgp.ac.in",
  kellogg: "kellogg.northwestern.edu",
};

const KEYS = Object.keys(DOMAINS).sort((a, b) => b.length - a.length);

export function orgLogoUrl(org?: string, size = 128): string | undefined {
  if (!org || !LOGO_TOKEN) return undefined;
  const hay = org.toLowerCase();
  const key = KEYS.find((k) => hay.includes(k));
  if (!key) return undefined;
  const params = new URLSearchParams({
    token: LOGO_TOKEN,
    size: String(size),
    format: "png",
    retina: "true",
    // Return an HTTP error instead of a generic letter monogram so the UI can
    // fall back to a typographic wordmark for brands Logo.dev doesn't have.
    fallback: "404",
  });
  return `https://img.logo.dev/${DOMAINS[key]}?${params.toString()}`;
}
