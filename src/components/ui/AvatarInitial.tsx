export function AvatarInitial({
  text,
  index,
  size = "md",
}: {
  text: string;
  index: number;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const bgColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-yellow-100 text-yellow-600",
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
  ];
  const avatarSize = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
    xl: "w-16 h-16 text-2xl font-semibold",
  };
  const color = bgColors[index % bgColors.length];

  console.log(text);
  const nameInitials = text;

  return (
    <div
      className={`${avatarSize[size]} rounded-full flex justify-center items-center ${color}`}
    >
      <p className="uppercase">{nameInitials}</p>
    </div>
  );
}
