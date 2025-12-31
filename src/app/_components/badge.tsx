import clsx from "clsx";

export function Badge(props: { label: string; selected?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full bg-orange-500 px-2 py-1 text-xs text-black",
        { "opacity-80": props.selected === false },
        { "font-bold": props.selected === true },
      )}
    >
      {props.label}
    </span>
  );
}
