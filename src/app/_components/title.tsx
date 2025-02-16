export default function Title(props: { children: React.ReactNode }) {
  return <h1 className="flex-grow text-2xl font-semibold h-fit">{props.children}</h1>;
}
