export default function Title(props: { children: React.ReactNode }) {
  return <h1 className="h-fit text-2xl font-semibold">{props.children}</h1>;
}
