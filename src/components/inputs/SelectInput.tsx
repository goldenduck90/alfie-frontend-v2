import { ChangeEventHandler, FC, useEffect, useRef } from "react";
import { useField } from "formik";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useCachedState } from "../../hooks/useCachedState";

export type OptionInput = {
  label?: string;
  value: string;
  selected?: boolean;
};
export interface ISelectInput {
  name: string;
  placeholder?: string;
  options: OptionInput[];
  disabled?: boolean;
  cache?: boolean;
  onChange?: (value: string) => void;
}

export const SelectInput: FC<ISelectInput> = ({
  name,
  placeholder,
  options,
  disabled = false,
  cache = false,
  onChange, // TODO: extend on when needed
}) => {
  const [, { value, error }, { setError, setValue }] = useField(name);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [, setCachedValue] = useCachedState(name, value, cache);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectVal = e.target.value.length ? e.target.value : "";
    if (cache) {
      setCachedValue(selectVal);
    }
    setValue(selectVal);
    onChange?.(selectVal);
  };
  return (
    <>
      <div
        className={`flex flex-row mt-1 w-full rounded-2xl border-2 overflow-hidden ${error ? "border-red-500" : "border-gray-300"
          }`}
      >
        <select
          ref={selectRef}
          disabled={disabled}
          value={value}
          onFocus={() => setError(undefined)}
          onChange={handleChange}
          className="appearance-none w-full py-1 rounded-lg pl-3 focus:outline-none placeholder-gray-400 bg-white"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="flex items-center px-2 text-brand-berry"
          onClick={() => selectRef.current?.focus()}
        >
          <ChevronDownIcon className="w-6 h-6 text-brand-berry" />
        </button>
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </>
  );
};



export const SelectInputNonFormik = ({
  placeholder,
  options,
  value,
  disabled = false,
  onChange,
}: {
  placeholder?: string
  options: OptionInput[]
  value?: any
  disabled?: boolean
  onChange: (val: any) => void
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <>
      <div
        className={`flex flex-row mt-1 w-full rounded-2xl border-2 overflow-hidden border-gray-300`}
      >
        <select
          ref={selectRef}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full py-1 rounded-lg pl-3 focus:outline-none placeholder-gray-400 bg-white"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="flex items-center px-2 text-brand-berry"
          onClick={() => selectRef.current?.focus()}
        >
          <ChevronDownIcon className="w-6 h-6 text-brand-berry" />
        </button>
      </div>
    </>
  );
};
