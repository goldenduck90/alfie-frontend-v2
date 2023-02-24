import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

interface ToggleSwitchProps {
  label: string | JSX.Element;
  checked: boolean;
  onCheckedChange: () => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  labelRight?: string | JSX.Element;
  required?: boolean;
  name?: string;
  value?: string;
}

export const ToggleSwitch = ({
  label,
  labelRight,
  checked,
  ...props
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center">
      <label className="pr-2 text-xs md:text-sm font-eudoxus">{label}</label>
      <RadixSwitch.Root
        {...props}
        className={`unset relative h-7 w-12 focus:shadow-prim-900 ring-transparent ring-2 focus:ring-blue-500 ${
          checked
            ? "bg-primary-500 border-primary-500"
            : "bg-gray-300 border-gray-300"
        }  rounded-full border-2 `}
      >
        <RadixSwitch.SwitchThumb
          className={`h-6 w-6 block border-[1px] bg-white rounded-full transition-all ${
            checked ? "translate-x-5 " : "translate-x-0"
          }`}
        />
      </RadixSwitch.Root>
      {labelRight && (
        <label className="pl-2 text-xs md:text-sm font-eudoxus">
          {labelRight}
        </label>
      )}
    </div>
  );
};
