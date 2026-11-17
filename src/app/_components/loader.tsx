export function Loader() {
  return (
    <div data-testid="loader" className="m-auto my-40 flex gap-2">
      <span className="sr-only">Loading...</span>
      <span className="h-6 w-6 animate-wiggle bg-orange-500"></span>
      <span className="h-6 w-6 animate-wiggle bg-orange-500"></span>
      <span className="h-6 w-6 animate-wiggle bg-orange-500"></span>
    </div>
  );
}
