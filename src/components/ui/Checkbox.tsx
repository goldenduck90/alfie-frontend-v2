import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@heroicons/react/solid";

export interface CheckboxProps {
  label?: string | JSX.Element;
  checked?: boolean;
  onChange?: (param: any) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export const Checkbox = React.forwardRef(
  ({ label, name, ...props }: CheckboxProps, ref: React.ForwardedRef<any>) => {
    return (
      <div className="flex">
        <RadixCheckbox.Root
          onCheckedChange={props.onChange}
          {...props}
          name={name}
          id={name}
          ref={ref}
          className={` border rounded-md h-6 w-6 ring-2 ring-transparent transition-all focus:ring-blue-500 ${
            props.checked
              ? "bg-primary-500 border-primary-600"
              : "border-gray-400"
          }`}
        >
          <RadixCheckbox.Indicator className={`bg-primary-500`}>
            <CheckIcon className="h-5 w-5 ml-[1px] text-white" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <label className="pl-[10px]" htmlFor={name}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
