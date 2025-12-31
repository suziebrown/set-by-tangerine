"use client";

import { PuzzlePreview } from "@app/browse/puzzle-preview";
import { api } from "~/trpc/react";
import Title from "@components/title";
import { Badge } from "./_components/badge";
import { type Tag } from "@prisma/client";
import { Loader } from "./_components/loader";

export default function Browse() {
  const puzzlesQuery = api.puzzle.list.useQuery();
  const tagsQuery = api.tag.list.useQuery();

  if (puzzlesQuery.isLoading || tagsQuery.isLoading) return <Loader />;

  if (puzzlesQuery.isSuccess && tagsQuery.isSuccess) {
    return (
      <>
        <Title>Browse puzzles</Title>

        <div>
          Filter by tags:
          <ul className="flex flex-wrap gap-1">
            {tagsQuery.data.map((t: Tag) => (
              <li key={t.id}>
                <button type="button">
                  <Badge label={t.label} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-wrap justify-start gap-4">
          {puzzlesQuery.data.map((p) => (
            <PuzzlePreview puzzle={p} key={p.id} />
          ))}
        </div>
      </>
    );
  }
}
