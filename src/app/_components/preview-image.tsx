export function PreviewImage(props: { src: string | null; alt: string }) {
  return (
    <div className="mt-4 h-[150px] w-full overflow-hidden rounded">
      {props.src && (
        <img
          src={process.env.NEXT_PUBLIC_IMAGES_BLOB_PREFIX + props.src}
          alt={`Preview of ${props.alt}`}
          className="scale-125"
        />
      )}

      {!props.src && <div className="bg-gray-500"></div>}
    </div>
  );
}
