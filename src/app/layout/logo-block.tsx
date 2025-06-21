export default function LogoBlock(props: { letter: string }) {
  return (
    <div className="flex h-8 w-8 justify-center bg-orange-500 pt-1 font-bold text-black hover:animate-wiggle">
      {props.letter}
    </div>
  );
}
