import * as Progress from "@radix-ui/react-progress";
import { useState } from "react";

export function SliderRanger({
  max = 9,
  current = 1,
}: {
  max: number;
  current: number;
}) {
  const [progress, setProgress] = useState(40);
  return (
    <Progress.Root
      className="relative overflow-hidden rounded-full w-full h-[10px] bg-[#E2E8F0]"
      value={100}
    >
      <Progress.Indicator
        className="bg-[#58ACE3] w-full h-full"
        style={{
          transform: `translateX(-${
            100 - Math.max(0, Math.min(100, (current / max) * 100))
          }%)`,
        }}
      />
      {/* <div
        className="bg-red-400 h-[20px] w-[20px] "
        style={{ transform: `translateX(-${100 - progress}%)` }}
      /> */}
    </Progress.Root>
  );
}
