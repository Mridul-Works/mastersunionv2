import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MASTER_CATEGORIES,
  MEET_THE_MASTERS,
  type MasterCard,
  type MasterCategory,
} from "@/lib/meet-masters";

const MOBILE_LIMIT = 10;

const FACULTY_CARD_CATEGORIES: MasterCategory[] = [
  "Masters-in-Residence",
  "Visiting Faculty",
  "Practitioners",
];

function slugify(category: MasterCategory) {
  return `masters-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function MasterProfileCard({ master, facultyCard }: { master: MasterCard; facultyCard: boolean }) {
  return (
    <article className="meet-master-card">
      <div className="meet-master-avatar">
        <img
          src={master.image}
          alt={master.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="meet-master-info">
        <div className="meet-master-heading">
          <h3>{master.name}</h3>
          {master.linkedin ? (
            <a
              href={master.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${master.name} on LinkedIn`}
              className="meet-master-linkedin"
            >
              <Linkedin aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <p className="meet-master-designation">{master.designation}</p>
        {master.logo ? (
          <div className="meet-master-logo">
            <img src={master.logo} alt="" loading="lazy" decoding="async" />
          </div>
        ) : null}
        {facultyCard && (master.post || master.department) ? (
          <div className="meet-master-detail">
            {master.post ? <span>{master.post}</span> : null}
            {master.department ? <span>{master.department}</span> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function CategorySection({
  category,
  index,
  registerRef,
}: {
  category: MasterCategory;
  index: number;
  registerRef: (category: MasterCategory, node: HTMLElement | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cards = MEET_THE_MASTERS[category];
  const facultyCard = FACULTY_CARD_CATEGORIES.includes(category);

  return (
    <section
      id={slugify(category)}
      ref={(node) => registerRef(category, node)}
      className="meet-masters-section"
      data-category={category}
      aria-label={category}
    >
      <header className="meet-masters-section-head">
        <span className="meet-masters-section-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="meet-masters-section-title">{category}</h3>
        <span className="meet-masters-section-rule" aria-hidden="true" />
        <span className="meet-masters-section-count">{cards.length}</span>
      </header>

      <div className="meet-masters-grid">
        {cards.map((master, cardIndex) => (
          <div
            key={`${category}-${master.name}-${cardIndex}`}
            className={cardIndex >= MOBILE_LIMIT && !expanded ? "meet-master-mobile-hidden" : undefined}
          >
            <MasterProfileCard master={master} facultyCard={facultyCard} />
          </div>
        ))}
      </div>

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
  const [active, setActive] = useState<MasterCategory>(MASTER_CATEGORIES[0]);
  const sectionRefs = useRef(new Map<MasterCategory, HTMLElement>());

  const registerRef = useCallback((category: MasterCategory, node: HTMLElement | null) => {
    if (node) sectionRefs.current.set(category, node);
    else sectionRefs.current.delete(category);
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        MASTER_CATEGORIES.map((category) => [category, MEET_THE_MASTERS[category].length]),
      ) as Record<MasterCategory, number>,
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const category = visible?.target.getAttribute("data-category") as MasterCategory | null;
        if (category) setActive(category);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const goTo = (category: MasterCategory) => {
    setActive(category);
    sectionRefs.current.get(category)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="meet-masters-shell">
      <div className="meet-masters-layout">
        <aside className="meet-masters-rail">
          <div className="meet-masters-rail-inner">
            <p className="meet-masters-kicker">Guiding Minds</p>
            <h2 className="meet-masters-title">
              Meet <em>The Masters</em>
            </h2>

            <nav className="meet-masters-index" aria-label="Meet the Masters categories">
              {MASTER_CATEGORIES.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className="meet-masters-index-item"
                  data-active={category === active ? "true" : undefined}
                  aria-current={category === active ? "true" : undefined}
                  onClick={() => goTo(category)}
                >
                  <span className="meet-masters-index-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="meet-masters-index-label">{category}</span>
                  <span className="meet-masters-index-count">{counts[category]}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="meet-masters-stack">
          {MASTER_CATEGORIES.map((category, index) => (
            <CategorySection
              key={category}
              category={category}
              index={index}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
