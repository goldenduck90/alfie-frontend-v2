import { useField } from "formik";
import { ChangeEventHandler, FC } from "react";
import { useCachedState } from "../../hooks/useCachedState";

export type CheckboxArgs = {
  setError: (value: string | undefined) => void;
  setCheckboxes: (strArr: string[]) => void;
  id: string;
  checked: boolean;
  checkboxes: string[];
  values: string[];
};
export interface ICheckboxGroup {
  name: string;
  items: string[];
  cache?: boolean;
  onChange?: (props: CheckboxArgs) => void;
}

export const CheckboxGroup: FC<ICheckboxGroup> = ({
  items,
  cache,
  name,
  onChange,
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name);
  const [, setCachedValue] = useCachedState(name, value || []);
  const isManualOnChange = !!onChange;

  const handleChange = (checked: boolean, id: string) => {
    let newValue = [...value] as string[];
    if (checked) {
      newValue.push(id);
      setError(undefined);
    } else {
      newValue = newValue.filter((val: string) => val !== id);
    }
    if (isManualOnChange) {
      onChange({
        setError,
        checked,
        setCheckboxes: (strArr: string[]) => {
          if (cache) {
            setCachedValue(strArr);
          }
          setValue(strArr);
        },
        id,
        checkboxes: items,
        values: newValue,
      });
    } else {
      if (cache) {
        setCachedValue(newValue);
      }
      setValue(newValue);
    }
  };

  return (
    <div>
      {items.map((item) => {
        const checked = value?.find?.((id: string) => id === item) || false;

        const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
          event
        ) => {
          handleChange(event.target.checked, item);
        };
        return (
          <div
            key={item}
            className="mb-2 flex items-center space-y-2 form-check"
          >
            <input
              id={item}
              className="appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-brand-berry checked:border-brand-berry focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-3 cursor-pointer basis-5 grow-0 shrink-0"
              type="checkbox"
              checked={checked}
              value={checked}
              onChange={onChangeHandler}
            />
            <label htmlFor={item} className="form-check-label text-gray-800">
              {item}
            </label>
          </div>
        );
      })}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
