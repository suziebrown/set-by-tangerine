"use client";

import DownloadButton from "@components/download-button";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Crossword from "~/app/puzzle/[id]/crossword/crossword";
import Title from "../../_components/title";
import InfoBox from "./info-box";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";

// QQ Work out how to set the page title with client data

// export async function generateMetadata(): Promise<Metadata> {
//   const { query } = useRouter();
//   const puzzleQuery = api.puzzle.getById.useQuery({ id: parseInt(query.id) });

//   if (puzzleQuery.isSuccess && puzzleQuery.data) {
//     return {
//       title: puzzleQuery.data.title + " | " + defaultPageTitle,
//     };
//   } else {
//     return { title: defaultPageTitle };
//   }
// }

export default function PuzzleDetail() {
  const params = useParams<{id: string}>();
  const puzzleQuery = api.puzzle.getById.useQuery({ id: parseInt(params.id) });
  
  const [showInfo, setShowInfo] = useState(false);

  // QQ Handle loading / error state

  if (puzzleQuery.isSuccess && puzzleQuery.data) {
    return (
      <>
        <div className="space-between flex w-full items-center">
          <span className="inline-flex flex-grow items-center">
            <Title>{puzzleQuery.data.title}</Title>

            <button
              onClick={() => setShowInfo((show) => !show)}
              className="ml-2 h-5 w-5 rounded-full border border-orange-700 bg-orange-500 hover:bg-orange-600"
              aria-label={showInfo ? "Hide info" : "Show info"}
            >
              <FontAwesomeIcon className="mb-1 h-3 w-3" icon={faInfo} />
            </button>
          </span>

          {puzzleQuery.data.downloadUrl && (
            <DownloadButton url={puzzleQuery.data.downloadUrl} />
          )}
        </div>

        {showInfo && <InfoBox puzzleDetails={puzzleQuery.data} />}

        {puzzleQuery.data.crossword?.data && (
          <Crossword
            id={puzzleQuery.data.crossword.id}
            instructions={puzzleQuery.data.crossword.instructions}
            data={puzzleQuery.data.crossword.data}
          />
        )}
      </>
    );
  }
}
