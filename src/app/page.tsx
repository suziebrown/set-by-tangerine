"use client";

import { PuzzlePreview } from "@app/browse/puzzle-preview";
import { api } from "~/trpc/react";
import Title from "@components/title";
import { Badge } from "./_components/badge";
import { type Tag } from "@prisma/client";
import { Loader } from "./_components/loader";
import { useEffect, useState } from "react";
import { type PuzzleWithTags } from "prisma/types";

type TagSelection = Tag & {
  isSelected: boolean;
};

export default function Browse() {
  const [tagsSelection, setTagsSelection] = useState<Map<number, TagSelection>>(
    new Map(),
  );
  const [filteredPuzzles, setFilteredPuzzles] = useState<PuzzleWithTags[]>([]);

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

  useEffect(() => {
    if (!tagsQuery.data || !puzzlesQuery.data) {
      return;
    }

    const selectedTagIds = [...tagsSelection.values()]
      .filter((t) => t.isSelected)
      .map((t) => t.id);

    if (selectedTagIds.length === 0) {
      setFilteredPuzzles(puzzlesQuery.data);
      return;
    }

    const filteredResults = puzzlesQuery.data.filter((p: PuzzleWithTags) =>
      selectedTagIds.every((tagId: number) =>
        p.tags.map((t) => t.id).includes(tagId),
      ),
    );

    setFilteredPuzzles(filteredResults);
  }, [tagsSelection, tagsQuery.data, puzzlesQuery.data]);

  const toggleTagSelection: (tagId: number) => void = (tagId: number) => {
    const currentTag = tagsSelection.get(tagId);
    if (!currentTag) return;

    const newTagsSelection = new Map(tagsSelection);

    newTagsSelection.set(tagId, {
      ...currentTag,
      isSelected: !currentTag.isSelected,
    });

    setTagsSelection(newTagsSelection);
  };

  if (puzzlesQuery.isLoading || tagsQuery.isLoading) return <Loader />;

  if (puzzlesQuery.isSuccess && tagsQuery.isSuccess) {
    return (
      <>
        <Title>Browse puzzles</Title>

        <div className="mb-4">
          Filter by tags
          <ul className="flex flex-wrap gap-1">
            {[...tagsSelection.values()].map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  aria-pressed={t.isSelected}
                  onClick={() => toggleTagSelection(t.id)}
                >
                  <Badge label={t.label} selected={t.isSelected} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-wrap justify-start gap-4">
          {filteredPuzzles.map((p) => (
            <PuzzlePreview puzzle={p} key={p.id} />
          ))}
        </div>
      </>
    );
  }
}
