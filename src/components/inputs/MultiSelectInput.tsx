import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { ChevronDownIcon, XIcon } from "@heroicons/react/solid";

export type OptionInput = {
  label?: string;
  value: string;
};

export interface IMultiSelectInput {
  name: string;
  placeholder?: string;
  options: OptionInput[];
  disabled?: boolean;
  cache?: boolean;
  onChange?: (value: string) => void;
}

export const MultiSelectInput: React.FC<IMultiSelectInput> = ({
  name,
  placeholder,
  options,
  disabled = false,
  cache = false,
  onChange, // TODO: extend on when needed
}) => {
  const [, { value, error }, { setValue }] = useField<string[]>(name);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const handleSelect = (selectedValue: string) => {
    if (!selectedOptions.includes(selectedValue)) {
      const updatedOptions = [...selectedOptions, selectedValue];
      setSelectedOptions(updatedOptions);
      setValue(updatedOptions);
    }
  };

  const handleRemove = (optionToRemove: string) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option !== optionToRemove
    );
    setSelectedOptions(updatedOptions);
    setValue(updatedOptions);
  };

  return (
    <div className="relative">
      <div
        className={`flex justify-between items-center mt-1 p-2 border-2 rounded-2xl ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-200 px-2 py-1 rounded-full"
            >
              {options.find((opt) => opt.value === option)?.label || option}
              <button onClick={() => handleRemove(option)} className="ml-2">
                <XIcon className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          ))}
        </div>
        <ChevronDownIcon className="w-6 h-6 text-brand-berry" />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border-2 border-gray-300 bg-white rounded-md shadow-lg">
          {options
            .filter((opt) => !selectedOptions.includes(opt.value))
            .map((option) => (
              <li
                key={option.value}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
