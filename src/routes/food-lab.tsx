import { createFileRoute } from "@tanstack/react-router";
import { CHAPTERS_BY_ROUTE } from "@/components/chapters";
import { ChapterPage } from "@/components/ChapterPage";

const chapter = CHAPTERS_BY_ROUTE["/food-lab"];

export const Route = createFileRoute("/food-lab")({
  head: () => ({
    meta: [
      { title: `${chapter.tag} — Masters' Union` },
      { name: "description", content: chapter.body.slice(0, 155) },
    ],
  }),
  component: () => <ChapterPage chapter={chapter} />,
});
