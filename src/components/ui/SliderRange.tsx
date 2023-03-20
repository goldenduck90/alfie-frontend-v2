import { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { Control, useController, useForm } from "react-hook-form";
import * as Progress from "@radix-ui/react-progress";

export function SliderProgressBar({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  return (
    <Progress.Root
      className="relative overflow-hidden rounded-full w-full h-[10px] bg-[#E2E8F0]"
      value={100}
    >
      <Progress.Indicator
        className="bg-[#58ACE3] w-full h-full rounded-r-md"
        style={{
          transform: `translateX(-${
            100 - Math.max(0, Math.min(100, (current / max) * 100))
          }%)`,
        }}
      />
    </Progress.Root>
  );
}

export function SliderRange({ defaultNumber }: { defaultNumber: number }) {
  const { control } = useForm({});

  const defValue = () => {
    if (defaultNumber > 100) {
      return 100;
    } else if (defaultNumber < 0) {
      return 0;
    } else {
      return defaultNumber;
    }
  };

  const { field } = useController({
    name: "weight",
    control,
    defaultValue: [defValue()],
  });

  return (
    <div className="w-full">
      <RadixSlider.Root
        max={100}
        min={0}
        disabled
        step={1}
        value={field.value}
        onValueChange={field.onChange}
        className="relative flex items-center w-full h-[8px]"
      >
        <RadixSlider.Track className="bg-[#E2E8F0] relative flex-grow rounded-full h-[8px]">
          <RadixSlider.Range className="absolute h-full rounded-2xl bg-primary-500" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="block box-content relative w-[8px] h-[8px] bg-white border-[2px] shadow-md rounded-full border-primary-500"></RadixSlider.Thumb>
      </RadixSlider.Root>
    </div>
  );
}

export function SliderDraggable({
  name,
  control,
}: {
  name: string;
  control: Control<any>;
}) {
  const { field } = useController({
    name,
    control,
    defaultValue: [0],
  });
  const [showValue, setShowValue] = useState(false);

  return (
    <div>
      <RadixSlider.Root
        max={100}
        step={1}
        value={field.value}
        onValueChange={(value) => {
          setShowValue(true);
          field.onChange(value);
        }}
        onValueCommit={() => {
          setShowValue(false);
        }}
        className="relative flex items-center w-full h-[20px]"
      >
        <RadixSlider.Track className="bg-[#E2E8F0] relative flex-grow rounded-full h-[8px]">
          <RadixSlider.Range className="absolute h-full rounded-full bg-brand-berry" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="block cursor-pointer relative w-[26px] h-[26px] bg-white border shadow-md rounded-md border-gray-500">
          <div className="flex items-center justify-center w-full h-full text-xs -mt-[1px] text-gray-500">
            |||
          </div>
          {showValue && (
            <div className="absolute -top-2 left-0 right-0 -translate-y-[100%] -translate-x-[45%]">
              <div className="bg-black text-white py-1 px-3 rounded-md flex items-center justify-center text-sm w-[44px]">
                <p>{field.value?.[0]}</p>
              </div>
            </div>
          )}
        </RadixSlider.Thumb>
      </RadixSlider.Root>
      <div className="flex items-center justify-between text-xs text-gray-600 pt-2">
        <p>{`1 (not satisfied at all)`}</p>
        <p>{`100 (very satisfied)`}</p>
      </div>
    </div>
  );
}
