export function TabTitle({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-md whitespace-nowrap ${
        active ? "text-brand-berry bg-blue-100" : ""
      }`}
    >
      {children}
    </div>
  );
}
