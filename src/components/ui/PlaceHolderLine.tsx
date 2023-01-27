import React from "react";

export function PlaceHolderLine({ amount = 1 }: { amount?: number }) {
  const lines = Array(amount)
    .fill("")
    .map((_) => (
      <hr
        className={`h-[9px] w-full animate-pulse bg-gray-200 my-[9px] rounded-sm`}
      />
    ));
  return <>{lines}</>;
}
