import React from "react";
import { Checkbox, CheckboxProps } from "../Checkbox";
import { Control, useController } from "react-hook-form";

interface HookCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
}

export function HookCheckbox({ name, ...props }: HookCheckboxProps) {
  return <Checkbox {...props} />;
}
