import Link from "next/link";
import LogoBlock from "./logo-block";

export default function Header() {
  return (
    <div className="h-xl flex justify-items-start bg-black p-2 text-white">
      <Link href="/" className="grid grid-cols-3 grid-rows-3 gap-1">
        <LogoBlock letter="T" />
        <LogoBlock letter="A" />
        <LogoBlock letter="N" />
        <LogoBlock letter="G" />
        <LogoBlock letter="E" />
        <LogoBlock letter="R" />
        <LogoBlock letter="I" />
        <LogoBlock letter="N" />
        <LogoBlock letter="E" />
      </Link>

      <Link href="/" className="mb-1 ml-4 mt-auto italic text-orange-500">
        Set by Tangerine
      </Link>
    </div>
  );
}
