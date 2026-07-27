import { createFileRoute } from "@tanstack/react-router";
import ProgrammePage, { type ProgrammeData } from "@/components/ProgrammePage";

const data: ProgrammeData = {
  name: "PG Programme in Sports Management & Gaming",
  shortName: "SMG",
  tagline:
    "A 16-month PGP built for India's booming sports, gaming, and esports economy — league ops, athlete branding, streaming, and IP monetisation, taught by operators.",
  duration: "16-month Full-Time PGP",
  mode: "On-Campus, Gurugram",
  commencement: "Aug '26",
  intro:
    "India's sports and gaming economy is scaling from IPL to Kabaddi, from mobile esports to fantasy platforms. This programme trains you to run leagues, build athlete brands, launch gaming IP, and monetise fan economies.",
  whyNow: [
    "Sports and gaming in India now attract billions of dollars in media rights, sponsorship, and consumer spend — but the leadership pipeline is thin. This PGP fills that gap.",
    "The curriculum is co-designed with league operators, athlete agencies, gaming studios, and OTT sports platforms — every term ships work that a real franchise, league, or gaming IP would actually use.",
  ],
  edge: [
    {
      title: "Live challenges with real leagues, teams, and studios",
      body: "Every out-class project is scoped by a real franchise, agency, or gaming studio — you build, pitch, and hand off actual go-to-market work.",
    },
    {
      title: "Cruyff Institute immersion",
      body: "A structured global immersion at the Cruyff Institute — sports management fundamentals from where the industry was invented.",
    },
    {
      title: "Athlete & IP branding studio",
      body: "Build brand, content, and monetisation playbooks for real athletes and gaming personalities — with distribution partners lined up.",
    },
    {
      title: "Esports & streaming lab",
      body: "Run the operations of a live esports tournament and streaming production — from talent to broadcast to sponsorship activation.",
    },
  ],
  terms: [
    {
      n: 1,
      title: "Business Foundations & the Sports Economy",
      summary:
        "Understand how sports leagues, teams, and gaming studios actually make money — media rights, sponsorship, ticketing, and merch.",
      outcomes: ["MEDIA RIGHTS", "SPONSORSHIP MODELS", "LEAGUE ECONOMICS", "BUSINESS BASICS"],
      courses: [
        "Reading financial statements & unit economics",
        "The global sports & gaming economy",
        "Revenue models: media, sponsorship, ticketing, merch",
        "Storytelling for sports brands",
      ],
      challenge: {
        name: "Sports Dropshipping Challenge",
        description:
          "Launch a sports-fan D2C brand — merch, apparel, or accessories — and hit ₹5-10L in real GMV inside six weeks.",
      },
    },
    {
      n: 2,
      title: "League Operations & Team Management",
      summary:
        "Run a league end-to-end — schedules, venues, officiating, player contracts, and salary caps.",
      outcomes: ["LEAGUE OPS", "SALARY CAPS", "PLAYER CONTRACTS", "VENUE MGMT"],
      courses: [
        "League design: draft, calendar, revenue share",
        "Team management & scouting operations",
        "Player contracts, agents, and salary caps",
        "Venue, matchday, and fan experience ops",
      ],
      challenge: {
        name: "League Operator Simulation",
        description:
          "Run a full season of a simulated league — draft, schedule, budget, and negotiate — against real market constraints from partner franchises.",
      },
    },
    {
      n: 3,
      title: "Athlete Branding & Talent Management",
      summary:
        "Build the brand, content, and commercial engine behind modern athletes and gaming personalities.",
      outcomes: ["ATHLETE BRANDS", "CONTENT STRATEGY", "ENDORSEMENTS", "CREATOR ECONOMY"],
      courses: [
        "Athlete brand strategy & positioning",
        "Content, social, and creator playbooks",
        "Endorsement deals & IP licensing",
        "PR, crisis, and reputation management",
      ],
      challenge: {
        name: "Athlete Brand Build",
        description:
          "Take a real athlete or gaming creator and build a 12-month brand and monetisation plan — with content calendar, deal pipeline, and revenue targets.",
      },
    },
    {
      n: 4,
      title: "Gaming, Esports & Fantasy Platforms",
      summary:
        "Understand how gaming studios, esports tournaments, and fantasy platforms build IP and monetise attention.",
      outcomes: ["ESPORTS OPS", "GAMING IP", "FANTASY PLATFORMS", "CREATOR MONETISATION"],
      courses: [
        "The Indian gaming & esports landscape",
        "Building and monetising gaming IP",
        "Fantasy platforms: mechanics, regulation, retention",
        "Esports tournament operations & broadcast",
      ],
      challenge: {
        name: "Sports Streaming Challenge",
        description:
          "Produce and stream a live esports or sports event — build the broadcast, land the sponsors, and hit real viewership targets.",
      },
    },
    {
      n: 5,
      title: "Sports Marketing & Sponsorship",
      summary:
        "Design, pitch, and activate sponsorship deals that actually move brand and league KPIs.",
      outcomes: ["SPONSORSHIP DEALS", "ACTIVATION", "BRAND-LEAGUE FIT", "MEASUREMENT"],
      courses: [
        "Sponsorship strategy & valuation",
        "Activation design across on-ground, digital, and content",
        "Sports PR & influencer partnerships",
        "Measurement: brand lift, ROI, and attribution",
      ],
      challenge: {
        name: "Sponsorship Pitch War Room",
        description:
          "Pitch a real sponsorship package to a real brand — from valuation to creative activation to measurement — with commercial follow-through.",
      },
    },
    {
      n: 6,
      title: "Sports Analytics & Performance",
      summary:
        "Use data to make on-field, front-office, and fan-experience decisions.",
      outcomes: ["PERFORMANCE ANALYTICS", "SCOUTING MODELS", "FAN ANALYTICS", "PRICING"],
      courses: [
        "Performance analytics & sports science basics",
        "Scouting & recruitment analytics",
        "Fan analytics, CRM, and pricing",
        "Sports betting integrity & regulation",
      ],
      challenge: {
        name: "Analytics Consulting Sprint",
        description:
          "Deliver a data-backed recommendation to a real franchise — scouting, pricing, or fan retention — and defend it to the leadership team.",
      },
    },
    {
      n: 7,
      title: "Immersion & Industry Internship",
      summary:
        "Deep immersion at the Cruyff Institute followed by an industry internship inside a league, agency, or gaming studio.",
      outcomes: ["CRUYFF IMMERSION", "INDUSTRY INTERNSHIP", "OPERATOR EXPOSURE", "NETWORK"],
      courses: [
        "Cruyff Institute — sports management masterclass",
        "Global sports business case studies",
        "Sports & gaming policy and regulation",
        "Deal-making & negotiation for sports execs",
      ],
      challenge: {
        name: "Industry Immersion Internship",
        description:
          "Sit inside a real league, franchise, agency, or gaming studio and own a live workstream — from ops to marketing to talent.",
      },
    },
    {
      n: 8,
      title: "Ventures, Careers & Capstone",
      summary:
        "Convert the internship into a placement — or into an investor-ready sports/gaming venture.",
      outcomes: ["CAPSTONE", "VENTURE PITCH", "PLACEMENT PREP", "PORTFOLIO"],
      courses: [
        "Building sports & gaming ventures",
        "Pitching to sports-focused investors",
        "Case interviews for league, agency, and studio roles",
        "Personal brand & network for the sports industry",
      ],
      challenge: {
        name: "Career Acceleration & Venture Sprint",
        description:
          "Ship your capstone — either a placement-ready portfolio or an investor-ready venture in sports, gaming, or the creator economy.",
      },
    },
  ],
  faculty: [
    { name: "Manoj Kohli", role: "Former CEO", org: "Airtel" },
    { name: "Rohit Kapoor", role: "CEO", org: "Swiggy" },
    { name: "Elkana Ezekiel", role: "Former CMO", org: "Samsung" },
    { name: "Malthi Satish", role: "Former Director of PM", org: "PayPal" },
    { name: "Rajesh Madhavan", role: "Advisor", org: "AlphaBeta" },
    { name: "Dr Edward W Rogers", role: "Former Chief Knowledge Officer", org: "NASA" },
    { name: "Dr Daniel GVD Vliet", role: "Executive Director", org: "Cornell" },
    { name: "Ujjyaini Mitra", role: "Former Chief Data Officer", org: "Zee" },
    { name: "Vaibhav Gupta", role: "Sr. Product Manager", org: "MakeMyTrip" },
    { name: "Siddarth Padmanabhan", role: "Former Partner Manager", org: "Meta" },
    { name: "Vineeta Tikekar", role: "Former Head of Marketing", org: "Standard Chartered" },
    { name: "Monica Jasuja", role: "Head of Emerging Partnerships", org: "Mastercard" },
  ],
  immersions: [
    "Cruyff Institute (Netherlands / Spain) — sports management masterclass",
    "Global sports HQ tours — league operations, broadcast, and sponsorship",
    "Esports tournament immersion — production, talent, and monetisation",
    "Optional summer school at Babson or SDA Bocconi",
  ],
  jobRoles: [
    "League Operations Manager",
    "Team / Franchise Manager",
    "Athlete Brand Manager",
    "Sports Marketing Lead",
    "Sponsorship & Partnerships",
    "Gaming / Esports Producer",
    "Fantasy Platform PM",
    "Sports Analytics Lead",
    "Sports Media & Broadcast",
    "Sports Venture Founder",
  ],
};

export const Route = createFileRoute("/programmes/pg/sports-management-and-gaming")({
  head: () => ({
    meta: [
      { title: "PGP in Sports Management & Gaming — Masters' Union" },
      {
        name: "description",
        content:
          "A 16-month PGP for India's sports, gaming, and esports economy — league ops, athlete branding, streaming, and IP monetisation. Aug '26 batch.",
      },
      { property: "og:title", content: "PGP in Sports Management & Gaming — Masters' Union" },
      {
        property: "og:description",
        content:
          "Run leagues, build athlete brands, and launch gaming IP with Cruyff Institute immersion and live industry challenges.",
      },
    ],
  }),
  component: () => <ProgrammePage data={data} />,
});
