export const nameToInitials = (name: String) => {
  if (!name) return "";

  const splitName = name.split(" ");
  const firstInitial = splitName[0].charAt(0);
  const lastInitial = splitName[splitName.length - 1].charAt(0);
  return `${firstInitial || ""}${lastInitial || ""}`;
};
