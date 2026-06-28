import { createFileRoute } from "@tanstack/react-router";
import { CHAPTERS_BY_ROUTE } from "@/components/chapters";
import { ChapterPage } from "@/components/ChapterPage";

const chapter = CHAPTERS_BY_ROUTE["/placements"];

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: `${chapter.tag} — Masters' Union` },
      { name: "description", content: chapter.body.slice(0, 155) },
    ],
  }),
  component: () => <ChapterPage chapter={chapter} />,
});
