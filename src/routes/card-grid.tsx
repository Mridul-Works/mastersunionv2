import { createFileRoute } from "@tanstack/react-router";
import ResponsiveCardGrid, { type GridCard } from "@/components/ResponsiveCardGrid";

const CARDS: GridCard[] = [
  {
    id: "strategy",
    eyebrow: "Masterclass",
    title: "Strategic HR Management",
    description:
      "How high-growth companies design compensation, hiring loops and performance systems that actually scale.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/16062025/v1/Frame1321317813.webp",
  },
  {
    id: "decisions",
    eyebrow: "Masterclass",
    title: "Master the Art of Decision Making",
    description: "Frameworks for making irreversible calls with incomplete information.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/16062025/v1/oneImg.webp",
  },
  {
    id: "transformation",
    eyebrow: "Masterclass",
    title: "Business Transformation",
    description:
      "Turnaround playbooks from operators who have rebuilt P&Ls under real pressure, across multiple markets and business cycles.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/12082025/v1/v3.webp",
  },
  {
    id: "family",
    eyebrow: "Master session",
    title: "Family Business Management",
    description: "Succession, governance and professionalising a legacy business.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/17062025/v1/rajivgupta.webp",
  },
  {
    id: "ma",
    eyebrow: "Masterclass",
    title: "Mergers and Acquisitions",
    description:
      "Deal structuring, diligence and the integration work that decides whether a merger creates value.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/12082025/v1/v1.webp",
  },
  {
    id: "social",
    eyebrow: "Masterclass",
    title: "Social Entrepreneurship",
    description: "Building ventures where impact and unit economics have to work together.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/12082025/v1/v2.webp",
  },
  {
    id: "fintech",
    eyebrow: "Masterclass",
    title: "Tech in Finance",
    description: "Payments rails, risk models and where financial infrastructure is heading next.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/19092025/v1/MonicaMasterclass.webp",
  },
  {
    id: "comms",
    eyebrow: "Masterclass",
    title: "The Art of Communication",
    description:
      "Narrative, clarity and presence — the skills that carry every other skill into the room.",
    actionLabel: "Watch session",
    href: "/campus-radio",
    image: "https://images.mastersunion.link/uploads/19092025/v1/NidhiMasterclass.webp",
  },
];

function Page() {
  return (
    <main className="min-h-[100svh] w-full bg-[#F5F3EE]">
      <ResponsiveCardGrid
        title="Masterclass library"
        subtitle="Sessions led by practitioners and scholars — one column on mobile, two on tablet, three on laptop, four on desktop."
        cards={CARDS}
      />
    </main>
  );
}

export const Route = createFileRoute("/card-grid")({
  head: () => ({
    meta: [
      { title: "Masterclass Library — Masters' Union" },
      {
        name: "description",
        content:
          "Browse Masters' Union masterclasses and master sessions in a responsive card library, led by industry practitioners and scholars.",
      },
      { property: "og:title", content: "Masterclass Library — Masters' Union" },
      {
        property: "og:description",
        content: "Sessions led by industry practitioners and scholars at Masters' Union.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
