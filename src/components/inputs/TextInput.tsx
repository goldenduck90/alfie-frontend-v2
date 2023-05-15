import { useField } from 'formik';
import { ChangeEventHandler, FC } from 'react';
import { useCachedState } from '../../hooks/useCachedState';
import { Loading } from '../old/Loading';

export interface ITextInput {
  name: string;
  placeholder: string;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'range'
    | 'datetime-local'
    | 'tel';
  disabled?: boolean;
  cache?: boolean;
  callbackForValue?: (value: string) => void;
  loading?: boolean;
}
export const TextInput: FC<ITextInput> = ({
  name,
  placeholder,
  type = 'text',
  disabled = false,
  cache = false,
  callbackForValue,
  loading = false,
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name);
  const [, setCachedValue] = useCachedState(name, value, cache);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (cache) {
      setCachedValue(e.target.value);
    }
    if (callbackForValue) {
      callbackForValue(e.target.value);
    }
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          disabled={disabled}
          type={type}
          onFocus={() => setError(undefined)}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className={`${
            error ? 'border-red-500' : 'border-gray-300'
          }  w-full px-3 py-1  appearance-none rounded-2xl border-2`}
        />
        <div className="pointer-events-none absolute in set-y-0 right-0 flex items-center pr-3">
          {loading && <Loading size={20} />}
        </div>
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
