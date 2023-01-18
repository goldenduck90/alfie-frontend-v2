import React from "react";
import { useField } from "formik";

export const IconInput = ({
  name,
  placeholder,
  type = "text",
  disabled = false,
  icon,
}: {
  name: string;
  placeholder: string;
  type?: "text" | "password" | "email" | "date" | "number" | "tel";
  disabled?: boolean;
  icon: JSX.Element;
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name);

  return (
    <>
      <div
        className={`${
          error ? "border-red-500" : "border-gray-300"
        } relative w-full border rounded-sm`}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </span>
        <input
          type={type}
          className="font-mulish w-full py-2 rounded-sm pl-10 appearance-none focus:outline-none placeholder-gray-400 bg-white text-black"
          placeholder={placeholder}
          value={value}
          onFocus={() => setError(undefined)}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};
