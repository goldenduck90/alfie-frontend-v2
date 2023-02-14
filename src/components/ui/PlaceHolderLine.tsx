import React from "react";

export function PlaceHolderLine({
  amount = 1,
  hasTopMargin,
}: {
  amount?: number;
  hasTopMargin?: boolean;
}) {
  const lines = Array(amount)
    .fill("")
    .map((_, i) => (
      <hr
        className={`h-2 w-full animate-pulse bg-gray-200 mb-3 rounded-sm ${
          hasTopMargin ? "mt-1" : ""
        }`}
        key={i}
      />
    ));
  return <>{lines}</>;
}
