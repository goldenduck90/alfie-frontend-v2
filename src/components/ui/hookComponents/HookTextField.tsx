import React from "react";
import { TextField } from "../TextField";
import { Control, useController } from "react-hook-form";

export function HookTextField({
  name,
  control,
  ...props
}: {
  name: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  labelHtmlFor?: string;
  helper?: string;
  inputSize?: "small" | "medium" | "large";
  hasError?: boolean;
  control: Control<any>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    field,
    fieldState: { invalid },
    formState,
  } = useController({
    name,
    control,
  });
  return (
    <div>
      <TextField {...props} {...field} />
      {invalid && (
        <span className="text-red-500 text-sm">
          {formState?.errors?.[name]?.message as string}
        </span>
      )}
    </div>
  );
}
