import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/outline";

interface SelectProps {
  label: string;
  placeholder?: string;
  items: { label: string | JSX.Element; value: string }[];
  helperText?: string;
  inputSize?: "small" | "medium" | "large";
}

export const Select = ({
  label,
  items,
  placeholder,
  helperText,
  inputSize = "small",
  ...additionalProps
}: SelectProps & RadixSelect.SelectProps) => {
  const size = {
    small: "h-8",
    medium: "h-10",
    large: "h-12",
  };

  const renderItems = items.map(({ label, value }, i) => (
    <RadixSelect.Item
      key={i}
      className={`px-4 flex bg-white w-full outline-none py-2 hover:bg-gray-100 cursor-pointer
      ${i + 1 !== items.length ? "border-0 border-b" : ""}

      `}
      value={value}
    >
      <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <CheckIcon className="h-5 w-5 ml-2 self-center" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  ));

  return (
    <RadixSelect.Root {...additionalProps}>
      {!!helperText && <p className="font-light">{helperText}</p>}
      <RadixSelect.Trigger
        aria-label={label}
        className={`border rounded-xl px-4 ${size[inputSize]} text-base flex justify-between items-center w-full`}
      >
        <RadixSelect.Value
          placeholder={<span className="">{placeholder}</span>}
        />
        <RadixSelect.SelectIcon>
          <ChevronDownIcon className="h-5 w-5" />
        </RadixSelect.SelectIcon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal className="rounded-xl shadow-md border z-[99] overflow-auto">
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton className="bg-orange-600" />
          <RadixSelect.Viewport>{renderItems}</RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
