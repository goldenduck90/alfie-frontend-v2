import React, { useState } from "react";
import { useField } from "formik";
import { Control, useController } from "react-hook-form";

export const Checkbox = ({
  name,
  label,
  disabled = false,
}: {
  name: string;
  label: string;
  disabled?: boolean;
}) => {
  const [, { value }, { setValue, setError }] = useField(name);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
    setError(undefined);
  };
  return (
    <div className="flex flex-row items-center space-y-1 form-check">
      <input
        className="appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-brand-berry checked:border-brand-berry focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-3 cursor-pointer"
        type="checkbox"
        value={value}
        checked={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <label className="form-check-label text-gray-800">{label}</label>
    </div>
  );
};

export function CheckboxHook({
  name,
  label,
  disabled = false,

  control,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  control: Control<any>;
}) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-row items-center space-y-1 form-check">
      <input
        {...field}
        className="appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-brand-berry checked:border-brand-berry focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-3 cursor-pointer"
        type="checkbox"
        disabled={disabled}
      />
      <label className="form-check-label text-gray-800">{label}</label>
    </div>
  );
}
