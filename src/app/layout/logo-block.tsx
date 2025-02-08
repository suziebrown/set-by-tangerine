export default function LogoBlock(props: { letter: string }) {
    return (
        <div className="w-8 h-8 bg-orange-500 text-black flex justify-center pt-1 font-bold hover:animate-wiggle">{props.letter}</div>
    )
}