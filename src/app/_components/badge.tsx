import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export function Badge(props: { label: string; selected?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full bg-orange-500 px-2 py-1 align-baseline text-xs text-black",
        { "opacity-70": props.selected === false },
      )}
    >
      {props.label}
      {props.selected && (
        <FontAwesomeIcon className="ml-1 h-4 w-4" icon={faClose} />
      )}
    </span>
  );
}
