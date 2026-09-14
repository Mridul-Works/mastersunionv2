import { useEffect, useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MASTER_CATEGORIES,
  MEET_THE_MASTERS,
  type MasterCard,
  type MasterCategory,
} from "@/lib/meet-masters";

const MOBILE_LIMIT = 10;

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

export default function MeetMastersGallery() {
  const [active, setActive] = useState<MasterCategory>(MASTER_CATEGORIES[0]);
  const [expanded, setExpanded] = useState(false);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const cards = MEET_THE_MASTERS[active];
  const facultyCard = active === "Masters-in-Residence" || active === "Visiting Faculty" || active === "Practitioners";

  useEffect(() => {
    const savedCategory = window.sessionStorage.getItem("newMastersActiveTab");
    if (MASTER_CATEGORIES.includes(savedCategory as MasterCategory)) {
      setActive(savedCategory as MasterCategory);
    }
  }, []);

  useEffect(() => {
    setExpanded(false);
    activeTabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <div className="meet-masters-shell">
      <p className="meet-masters-kicker">Academic Excellence</p>
      <h2 className="meet-masters-title">
        Meet <em>The Masters</em>
      </h2>

      <div className="meet-masters-tabs-wrap">
        <div className="meet-masters-tabs" role="tablist" aria-label="Meet the Masters categories">
          {MASTER_CATEGORIES.map((category) => (
            <Button
              key={category}
              ref={category === active ? activeTabRef : undefined}
              type="button"
              variant="ghost"
              role="tab"
              aria-selected={category === active}
              className="meet-masters-tab"
              data-active={category === active ? "true" : undefined}
              onClick={() => {
                window.sessionStorage.setItem("newMastersActiveTab", category);
                setActive(category);
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="meet-masters-grid" role="tabpanel" aria-label={active} key={active}>
        {cards.map((master, index) => (
          <div
            key={`${active}-${master.name}-${index}`}
            className={index >= MOBILE_LIMIT && !expanded ? "meet-master-mobile-hidden" : undefined}
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
    </div>
  );
}
