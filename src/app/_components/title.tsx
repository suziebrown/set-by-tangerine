export default function Title(props: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold tracking-tight">{props.children}</h1>
  );
}
