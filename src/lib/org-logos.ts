// Company / institution logos for faculty cards.
// Resolved through Logo.dev by domain, matched on keywords found in the
// company or school string so messy roster text ("Star Bazaar (Trent · Tata)")
// still maps to a real brand.

// Official marks used by Masters' Union on its own faculty page.
import heroElectric from "@/assets/faculty/orgs/heroElectric.webp";
import drVaidyas from "@/assets/faculty/orgs/vaidhyaLogo.webp";
import morganStanley from "@/assets/faculty/orgs/stanley.webp";
import softbankLogo from "@/assets/faculty/orgs/softbank.webp";
import relianceLogo from "@/assets/faculty/orgs/reliance.webp";
import swiggyLogo from "@/assets/faculty/orgs/swiggy.webp";
import iimLogo from "@/assets/faculty/orgs/IIM.webp";
import iimA from "@/assets/faculty/orgs/IIMAhmedabad.webp";
import iimB from "@/assets/faculty/orgs/IIMBanglore.webp";
import iimC from "@/assets/faculty/orgs/IIMCalcuta.webp";
import harvardLogo from "@/assets/faculty/orgs/harvard.webp";
import cornellLogo from "@/assets/faculty/orgs/cornell.webp";
import columbiaLogo from "@/assets/faculty/orgs/columbia.webp";
import mitLogo from "@/assets/faculty/orgs/MIT.webp";
import nyuShanghaiLogo from "@/assets/faculty/orgs/shangai.webp";
import imperialLogo from "@/assets/faculty/orgs/imperial.webp";

const LOGO_TOKEN = import.meta.env['VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY'] as
  | string
  | undefined;

/** keyword (lowercase) -> bundled logo asset, taken from the official Masters'
 *  Union faculty page. Checked before the Logo.dev domain lookup. */
const STATIC_LOGOS: Record<string, string> = {
  "hero electric": heroElectric,
  "dr. vaidya": drVaidyas,
  "morgan stanley": morganStanley,
  softbank: softbankLogo,
  reliance: relianceLogo,
  swiggy: swiggyLogo,
  "iim calcutta": iimC,
  "iim bangalore": iimB,
  "iim ahmedabad": iimA,
  iim: iimLogo,
  "harvard kennedy": harvardLogo,
  harvard: harvardLogo,
  cornell: cornellLogo,
  columbia: columbiaLogo,
  mit: mitLogo,
  "nyu stern": nyuShanghaiLogo,
  nyu: nyuShanghaiLogo,
  imperial: imperialLogo,
};

/** keyword (lowercase) -> logo domain. First match wins, longest keywords first. */
const DOMAINS: Record<string, string> = {
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

const STATIC_KEYS = Object.keys(STATIC_LOGOS).sort((a, b) => b.length - a.length);

export function orgLogoUrl(org?: string, size = 128): string | undefined {
  if (!org) return undefined;
  const hay = org.toLowerCase();
  const staticKey = STATIC_KEYS.find((k) => hay.includes(k));
  if (staticKey) return STATIC_LOGOS[staticKey];
  if (!LOGO_TOKEN) return undefined;
  const key = KEYS.find((k) => hay.includes(k));
  if (!key) return undefined;
  const params = new URLSearchParams({
    token: LOGO_TOKEN,
    size: String(size),
    format: "png",
    retina: "true",
    // Logos render on near-black cards, so request the dark-theme variant.
    theme: "dark",
    // Return an HTTP error instead of a generic letter monogram so the UI can
    // fall back to a typographic wordmark for brands Logo.dev doesn't have.
    fallback: "404",
  });
  return `https://img.logo.dev/${DOMAINS[key]}?${params.toString()}`;
}
