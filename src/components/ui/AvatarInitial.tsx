export function AvatarInitial({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const bgColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-yellow-100 text-yellow-600",
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
  ];
  const color = bgColors[index % bgColors.length];

  return (
    <div
      className={`w-8 h-8 rounded-full flex justify-center items-center ${color}`}
    >
      <p className="text-sm uppercase">{text}</p>
    </div>
  );
}
