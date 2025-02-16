import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function DownloadButton(props: { url: string }) {
  return (
    <a
      download
      target="_blank"
      rel="noopener noreferrer"
      href={process.env.NEXT_PUBLIC_PRINT_BLOB_PREFIX + props.url}
      className="flex w-fit gap-2 rounded border border-orange-700 bg-orange-500 p-2 text-black hover:bg-orange-600"
    >
      <FontAwesomeIcon className="w-4" icon={faDownload} />
      Print version
    </a>
  );
}
