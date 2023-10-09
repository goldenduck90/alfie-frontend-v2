import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  labelHtmlFor?: string;
  helper?: string;
  inputSize?: "small" | "medium" | "large";
  hasError?: boolean;
  fullWidth?: boolean;
}

export const TextField = React.forwardRef(
  (
    {
      id,
      name,
      type,
      placeholder,
      disabled,
      title,
      label,
      inputSize = "small",
      leftIcon,
      rightIcon,
      onChange,
      onBlur,
      value,
      helper,
      hasError,
      labelHtmlFor,
      fullWidth,
      ...inputProps
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const size = {
      small: "h-8",
      medium: "h-10",
      large: "h-12",
    };

    return (
      <div className={fullWidth ? `w-full` : ""}>
        {label && <label htmlFor={labelHtmlFor}>{label}</label>}
        <div
          className={`flex ring-2 ring-transparent focus-within:ring-primary-500 
          items-center border rounded-xl hover:border-gray-300 text-base font-normal
          ${hasError ? "border-red-500" : ""}`}
        >
          {leftIcon && <div className="pl-3 pr-1">{leftIcon}</div>}
          <input
            value={value}
            id={id}
            name={name}
            aria-label={title || label}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            data-testid="text-field-input"
            className={`px-4 ${size[inputSize]} w-full last:rounded-r-2xl first:rounded-l-2xl outline-none`}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
          {rightIcon && <div className="pr-3 pl-1">{rightIcon}</div>}
        </div>
        {helper && <div className={`text-sm mt-1 ${hasError && "text-red-600"}`}>{helper}</div>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
