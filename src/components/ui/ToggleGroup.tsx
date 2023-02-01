import React from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

interface ToggleGroupProps {
  items: ToggleItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
}

interface ToggleItem {
  content: React.ReactNode;
  value: string;
  ariaLabel?: string;
}

export function ToggleGroup({
  items,
  defaultValue,
  onChange,
  value,
}: ToggleGroupProps) {
  const renderItems = items.map((items, i) => (
    <RadixToggleGroup.Item
      className={`
      px-3 py-[10px] data-[state=on]:bg-primary-50 data-[state=on]:hover:bg-primary-50  
      data-[state=on]:text-primary-600 hover:bg-gray-50 text-gray-600`}
      value={items.value}
      aria-label={items.ariaLabel}
      key={i}
    >
      {items.content}
    </RadixToggleGroup.Item>
  ));
  return (
    <RadixToggleGroup.Root
      type="single"
      defaultValue={defaultValue}
      onValueChange={onChange}
      value={value}
      aria-label="Text alignment"
      className="flex flex-row gap-2"
    >
      {renderItems}
    </RadixToggleGroup.Root>
  );
}
