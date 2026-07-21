import { createFileRoute } from "@tanstack/react-router";
import { CHAPTERS_BY_ROUTE } from "@/components/chapters";

import DayInLifeCalendar from "@/components/DayInLifeCalendar";

const chapter = CHAPTERS_BY_ROUTE["/life-at-mu"];

export const Route = createFileRoute("/life-at-mu")({
  head: () => ({
    meta: [
      { title: `${chapter.tag} — Masters' Union` },
      { name: "description", content: chapter.body.slice(0, 155) },
    ],
  }),
  component: () => <DayInLifeCalendar />,
});


