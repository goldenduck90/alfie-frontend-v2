export function GrayPlaceHolderBox({
  content,
  className,
}: {
  content?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-100 rounded-xl border flex justify-center items-center h-80 px-6 text-center ${
        className ? className : ""
      }`}
    >
      <h2 className="text-lg">{content}</h2>
    </div>
  );
}
