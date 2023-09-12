import React from "react";

export function Line({
  color,
  margin,
  className,
  vertical = false,
}: {
  color: "light" | "medium" | "heavy" | "DARK";
  margin?: "small" | "medium" | "large";
  className?: string;
  vertical?: boolean;
}) {
  const colors = {
    light: "bg-prim-100",
    medium: "bg-prim-200",
    heavy: "bg-prim-400",
    DARK: "bg-prim-900",
  };
  const marginClass = {
    small: vertical ? "mx-2" : "my-2",
    medium: vertical ? "mx-4" : "my-4",
    large: vertical ? "mx-5" : "my-5",
  };
  const createClass = `${vertical ? "w-[1px] h-full" : "h-[1px]"} ${
    color ? colors[color] : ""
  } ${margin ? marginClass[margin] : ""} ${className ? className : ""}`;

  return <hr className={createClass} />;
}
