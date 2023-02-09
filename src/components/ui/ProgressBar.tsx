import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";

interface ProgressBarProps {
  progress: number;
  length: number;
}

export function ProgressBar({ progress, length }: ProgressBarProps) {
  return (
    <RadixProgress.Root
      className="relative overflow-hidden bg-white"
      value={progress}
    >
      <RadixProgress.Indicator
        className=""
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </RadixProgress.Root>
  );
}
