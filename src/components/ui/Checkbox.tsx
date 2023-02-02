import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@heroicons/react/solid";

interface CheckboxProps {
  label: string | JSX.Element;
  checked: boolean;
  onCheckedChange: () => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <div className="flex">
      <RadixCheckbox.Root
        {...props}
        className={`border-primary-600 border rounded-md h-6 w-6 ring-2 ring-transparent transition-all focus:ring-blue-500 ${
          props.checked ? "bg-primary-500" : ""
        }`}
      >
        <RadixCheckbox.Indicator className={`bg-primary-500`}>
          <CheckIcon className="h-5 w-5 ml-[1px] text-white" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="pl-[10px]">{label}</label>
    </div>
  );
}
