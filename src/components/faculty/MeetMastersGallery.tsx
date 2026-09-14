import { useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MASTER_CATEGORIES,
  MEET_THE_MASTERS,
  type MasterCard,
  type MasterCategory,
} from "@/lib/meet-masters";

const MOBILE_LIMIT = 10;

const SECTION_META: Record<
  MasterCategory,
  { number: string; layout: "featured" | "compact-4" | "compact-5" | "horizontal" | "compact-4-wide" }
> = {
  "Board of Governors": { number: "01", layout: "featured" },
  "Masters-in-Residence": { number: "02", layout: "compact-4" },
  "Visiting Faculty": { number: "03", layout: "compact-5" },
  CXOs: { number: "04", layout: "horizontal" },
  Practitioners: { number: "05", layout: "compact-4-wide" },
};

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="meet-masters-section-header">
      <span className="meet-masters-section-number">{number}</span>
      <h3 className="meet-masters-section-title">{title}</h3>
      <div className="meet-masters-section-rule" />
    </div>
  );
}

function MasterLogo({ master }: { master: MasterCard }) {
  if (!master.logo) return null;
  return (
    <div className="meet-master-logo">
      <img src={master.logo} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

function MasterLinkedIn({ master }: { master: MasterCard }) {
  if (!master.linkedin) return null;
  return (
    <a
      href={master.linkedin}
      target="_blank"
      rel="noreferrer"
      aria-label={`${master.name} on LinkedIn`}
      className="meet-master-linkedin"
    >
      <Linkedin aria-hidden="true" />
    </a>
  );
}

function FeaturedCard({ master }: { master: MasterCard }) {
  return (
    <article className="meet-master-card meet-master-card--featured">
      <div className="meet-master-avatar">
        <img src={master.image} alt={master.name} loading="lazy" decoding="async" />
      </div>
      <div className="meet-master-info meet-master-info--featured">
        <div className="meet-master-heading meet-master-heading--featured">
          <h3>{master.name}</h3>
          <MasterLinkedIn master={master} />
        </div>
        <p className="meet-master-designation">{master.designation}</p>
        <MasterLogo master={master} />
      </div>
    </article>
  );
}

function CompactCard({
  master,
  facultyCard,
}: {
  master: MasterCard;
  facultyCard: boolean;
}) {
  return (
    <article className="meet-master-card meet-master-card--compact">
      <div className="meet-master-avatar">
        <img src={master.image} alt={master.name} loading="lazy" decoding="async" />
      </div>
      <div className="meet-master-info meet-master-info--compact">
        <div className="meet-master-heading">
          <h3>{master.name}</h3>
          <MasterLinkedIn master={master} />
        </div>
        <p className="meet-master-designation">{master.designation}</p>
        {facultyCard && (master.post || master.department) ? (
          <div className="meet-master-detail">
            {master.post ? <span>{master.post}</span> : null}
            {master.department ? <span>{master.department}</span> : null}
          </div>
        ) : null}
        <MasterLogo master={master} />
      </div>
    </article>
  );
}

function HorizontalCard({ master }: { master: MasterCard }) {
  return (
    <article className="meet-master-card meet-master-card--horizontal">
      <div className="meet-master-avatar">
        <img src={master.image} alt={master.name} loading="lazy" decoding="async" />
      </div>
      <div className="meet-master-info meet-master-info--horizontal">
        <div className="meet-master-heading">
          <h3>{master.name}</h3>
          <MasterLinkedIn master={master} />
        </div>
        <p className="meet-master-designation">{master.designation}</p>
        <MasterLogo master={master} />
      </div>
    </article>
  );
}

function CategorySection({ category }: { category: MasterCategory }) {
  const [expanded, setExpanded] = useState(false);
  const meta = SECTION_META[category];
  const cards = MEET_THE_MASTERS[category];
  const facultyCard =
    category === "Masters-in-Residence" ||
    category === "Visiting Faculty" ||
    category === "Practitioners";

  const visibleCards =
    cards.length > MOBILE_LIMIT && !expanded
      ? cards.slice(0, MOBILE_LIMIT)
      : cards;

  return (
    <section className="meet-masters-section">
      <SectionHeader number={meta.number} title={category} />

      {meta.layout === "featured" ? (
        <div className="meet-masters-featured-grid">
          {visibleCards.map((master, index) => (
            <FeaturedCard key={`${category}-${master.name}-${index}`} master={master} />
          ))}
        </div>
      ) : null}

      {meta.layout === "compact-4" ? (
        <div className="meet-masters-compact-grid meet-masters-compact-grid--4">
          {visibleCards.map((master, index) => (
            <CompactCard
              key={`${category}-${master.name}-${index}`}
              master={master}
              facultyCard={facultyCard}
            />
          ))}
        </div>
      ) : null}

      {meta.layout === "compact-5" ? (
        <div className="meet-masters-compact-grid meet-masters-compact-grid--5">
          {visibleCards.map((master, index) => (
            <CompactCard
              key={`${category}-${master.name}-${index}`}
              master={master}
              facultyCard={facultyCard}
            />
          ))}
        </div>
      ) : null}

      {meta.layout === "horizontal" ? (
        <div className="meet-masters-horizontal-grid">
          {visibleCards.map((master, index) => (
            <HorizontalCard key={`${category}-${master.name}-${index}`} master={master} />
          ))}
        </div>
      ) : null}

      {meta.layout === "compact-4-wide" ? (
        <div className="meet-masters-compact-grid meet-masters-compact-grid--4 meet-masters-compact-grid--text">
          {visibleCards.map((master, index) => (
            <CompactCard
              key={`${category}-${master.name}-${index}`}
              master={master}
              facultyCard={facultyCard}
            />
          ))}
        </div>
      ) : null}

      {cards.length > MOBILE_LIMIT ? (
        <Button
          type="button"
          variant="outline"
          className="meet-masters-show-more"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show Less" : `Show More (${cards.length - MOBILE_LIMIT})`}
        </Button>
      ) : null}
    </section>
  );
}

export default function MeetMastersGallery() {
  return (
    <div className="meet-masters-shell">
      <header className="meet-masters-header">
        <div>
          <p className="meet-masters-kicker">Guiding Minds</p>
          <h2 className="meet-masters-title">
            Meet <em>The Masters</em>
          </h2>
        </div>
        <p className="meet-masters-lead">
          A collective of global visionaries, industry leaders, and academic pioneers
          shaping the future of business education.
        </p>
      </header>

      <div className="meet-masters-sections">
        {MASTER_CATEGORIES.map((category) => (
          <CategorySection key={category} category={category} />
        ))}
      </div>
    </div>
  );
}
