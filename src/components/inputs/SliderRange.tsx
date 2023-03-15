import { useField } from "formik";
import { ChangeEventHandler, FC } from "react";
import { useCachedState } from "../../hooks/useCachedState";

export interface ISliderRange {
  name: string;
  cache?: boolean;
  min?: number;
  max?: number;
}
export const SliderRange: FC<ISliderRange> = ({
  name,
  cache = false,
  min,
  max,
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name);
  const [, setCachedValue] = useCachedState(name, value, cache);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (cache) {
      setCachedValue(e.target.value);
    }
    setValue(e.target.value);
    setError(undefined);
  };

  return (
    <div className="flex flex-col">
      <input
        id="default-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onFocus={() => setError(undefined)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-brand-berry"
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
