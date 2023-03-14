import { Loading } from "../old/Loading";

export interface ITextInput {
  name: string;
  placeholder: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "range"
    | "datetime-local"
    | "time"
    | "tel";
  cache?: boolean;
  handleChange?: any;
  loading?: boolean;
  value?: string;
  disabled?: boolean;
}

export const UnControlledTextInput = ({
  name,
  placeholder,
  type = "text",
  handleChange,
  loading = false,
  value,
  disabled = false,
}: ITextInput) => {
  return (
    <div className="w-full">
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          disabled={disabled}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          className="font-mulish w-full px-3 py-2 focus:outline-none appearance-none rounded-sm border"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {loading && <Loading size={20} />}
        </div>
      </div>
    </div>
  );
};
