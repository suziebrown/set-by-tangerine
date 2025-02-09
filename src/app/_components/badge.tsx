export function Badge(props: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-orange-500 px-2 py-1 text-xs text-black">
      {props.label}
    </span>
  );
}
