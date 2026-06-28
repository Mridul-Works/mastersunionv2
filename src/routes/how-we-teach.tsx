import { createFileRoute } from "@tanstack/react-router";
import { CHAPTERS_BY_ROUTE } from "@/components/chapters";
import { ChapterPage } from "@/components/ChapterPage";

const chapter = CHAPTERS_BY_ROUTE["/how-we-teach"];

export const Route = createFileRoute("/how-we-teach")({
  head: () => ({
    meta: [
      { title: `${chapter.tag} — Masters' Union` },
      { name: "description", content: chapter.body.slice(0, 155) },
    ],
  }),
  component: () => <ChapterPage chapter={chapter} />,
});
