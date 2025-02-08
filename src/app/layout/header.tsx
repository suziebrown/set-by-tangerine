import LogoBlock from "./logo-block";

export default function Header() {
  return (
    <div className="h-xl flex justify-items-start bg-black p-2 text-white">
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        <LogoBlock letter="T" />
        <LogoBlock letter="A" />
        <LogoBlock letter="N" />
        <LogoBlock letter="G" />
        <LogoBlock letter="E" />
        <LogoBlock letter="R" />
        <LogoBlock letter="I" />
        <LogoBlock letter="N" />
        <LogoBlock letter="E" />
      </div>

      <i className="mb-1 ml-4 mt-auto text-orange-500">Set by Tangerine</i>
    </div>
  );
}
