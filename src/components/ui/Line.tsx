import React from "react";

export function Line({
  color,
  marginY,
}: {
  color: "light" | "medium" | "heavy" | "DARK";
  marginY?: "small" | "medium" | "large";
}) {
  const colors = {
    light: "bg-prim-100",
    medium: "bg-prim-200",
    heavy: "bg-prim-400",
    DARK: "bg-prim-900",
  };
  const margin = {
    small: "my-2",
    medium: "my-4",
    large: "my-5",
  };
  const className = `h-[1px] ${color ? colors[color] : ""} ${
    marginY ? margin[marginY] : ""
  }`;

  return <hr className={className} />;
}
