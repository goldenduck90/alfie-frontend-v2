import * as Progress from "@radix-ui/react-progress";
import { useState } from "react";

export function SliderRanger() {
  const [progress, setProgress] = useState(40);
  return (
    <Progress.Root
      className="relative overflow-hidden rounded-full w-full h-[10px] bg-[#E2E8F0]"
      value={66}
    >
      <Progress.Indicator
        className="bg-[#0C52E8] w-full h-full"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
      {/* <div
        className="bg-red-400 h-[20px] w-[20px] "
        style={{ transform: `translateX(-${100 - progress}%)` }}
      /> */}
    </Progress.Root>
  );
}
