import { createFileRoute } from "@tanstack/react-router";
import SectionNav, { type SectionNavItem } from "@/components/SectionNav";
import { PgHero } from "@/components/pg-layout/PgHero";
import { PgCurriculum } from "@/components/pg-layout/PgCurriculum";
import { PgOutClass } from "@/components/pg-layout/PgOutClass";
import { PgImmersions } from "@/components/pg-layout/PgImmersions";
import { PgCareers } from "@/components/pg-layout/PgCareers";
import { PgVentures } from "@/components/pg-layout/PgVentures";
import { PgFaculty } from "@/components/pg-layout/PgFaculty";
import { PgApplication } from "@/components/pg-layout/PgApplication";
import { PgFaq } from "@/components/pg-layout/PgFaq";

const PGP_NAV: SectionNavItem[] = [
  { id: "top", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "outclass", label: "OutClass" },
  { id: "immersions", label: "Immersions" },
  { id: "career", label: "Careers" },
  { id: "entrepreneurship", label: "Ventures" },
  { id: "faculty", label: "Faculty" },
  { id: "admissions", label: "Admissions" },
  { id: "faq", label: "FAQ" },
];

const title = "PGP in Technology & Business Management — Masters' Union";
const description =
  "A 16-month postgraduate programme run on three engines: InClass fundamentals, OutClass live ventures and on-ground Immersions. ₹34.6 LPA median CTC, 200+ startups founded on campus.";

export const Route = createFileRoute("/programmes/pg/pgp-tbm")({
  codeSplitGroupings: [],
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PgpTbm,
});

function PgpTbm() {
  return (
    <div className="min-h-screen bg-background">
      <div className="page-canvas relative">
        <SectionNav items={PGP_NAV} applyHref="#admissions" />
        <main className="pb-16 md:pb-18">
          <PgHero />
          <PgCurriculum />
          <PgOutClass />
          <PgImmersions />
          <PgCareers />
          <PgVentures />
          <PgFaculty />
          <PgApplication />
          <PgFaq />
        </main>
      </div>
    </div>
  );
}
