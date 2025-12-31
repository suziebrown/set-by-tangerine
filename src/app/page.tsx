"use client";

import { PuzzlePreview } from "@app/browse/puzzle-preview";
import { api } from "~/trpc/react";
import Title from "@components/title";
import { Badge } from "./_components/badge";
import { type Tag } from "@prisma/client";
import { Loader } from "./_components/loader";
import { useEffect, useState } from "react";

type TagSelection = Tag & {
  isSelected: boolean;
};

export default function Browse() {
  const [tagsSelection, setTagsSelection] = useState<Map<number, TagSelection>>(
    new Map(),
  );

  const puzzlesQuery = api.puzzle.list.useQuery();
  const tagsQuery = api.tag.list.useQuery();

  useEffect(() => {
    if (!tagsQuery.data) return;

    return setTagsSelection(
      tagsQuery.data.reduce(
        (acc, t: Tag) => acc.set(t.id, { ...t, isSelected: false }),
        new Map(),
      ),
    );
  }, [tagsQuery.data]);

  const toggleTagSelection: (tagId: number) => void = (tagId: number) => {
    const currentTag = tagsSelection.get(tagId);
    if (!currentTag) return;

    tagsSelection.set(tagId, {
      ...currentTag,
      isSelected: !currentTag.isSelected,
    });

    setTagsSelection(tagsSelection);
  };

  if (puzzlesQuery.isLoading || tagsQuery.isLoading) return <Loader />;

  if (puzzlesQuery.isSuccess && tagsQuery.isSuccess) {
    return (
      <>
        <Title>Browse puzzles</Title>

        <div>
          Filter by tags:
          <ul className="flex flex-wrap gap-1">
            {[...tagsSelection.values()].map((t) => (
              <li key={t.id}>
                <button type="button" onClick={() => toggleTagSelection(t.id)}>
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
