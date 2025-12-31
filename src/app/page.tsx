import { PuzzlePreview } from "@app/browse/puzzle-preview";
import { api } from "~/trpc/server";
import Title from "@components/title";
import { Badge } from "./_components/badge";
import { type Tag } from "@prisma/client";

export default async function Browse() {
  const puzzles = await api.puzzle.list();
  const tags = await api.tag.list();

  return (
    <>
      <Title>Browse puzzles</Title>

      <div>
        Filter by tags:
        <ul className="flex flex-wrap gap-1">
          {tags.map((t: Tag) => (
            <li key={t.id}>
              <Badge label={t.label} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full flex-wrap justify-start gap-4">
        {puzzles.map((p) => (
          <PuzzlePreview puzzle={p} key={p.id} />
        ))}
      </div>
    </>
  );
}
