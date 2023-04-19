import React, { useEffect } from "react";
import {
  Control,
  useController,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "../ui/Button";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { z, ZodError } from "zod";
import { QuestionContainer } from "./QuestionContainer";
import { Checkbox } from "../ui/Checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  ChevronLeftIcon,
  DocumentIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  QuestionnaireLayout,
  useProgressContext,
} from "../layouts/QuestionaireLayout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { TaskType } from "@src/graphql/generated";
import { createAnswersFromObject } from "@src/hooks/useTaskCompletion";

export interface QuestionComponentProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  validation?: z.ZodType<any, any>;
  name: string;
  question: string;
}

export interface SingleFormQuestionProps extends QuestionComponentProps {}

export interface MultiCheckboxQuestionProps extends QuestionComponentProps {
  options: string[];
  multiple?: boolean;
}

export interface MultiTextInputProps extends QuestionComponentProps {}

export interface RadioGroupInputProps extends QuestionComponentProps {
  options: string[];
}

export interface QuestionProps<T extends React.FC<QuestionComponentProps>> {
  id: string;
  question: string;
  helperText: string;
  validation?: z.ZodType<any, any>;
  Component: T;
}

export function SingleFormQuestion({
  name,
  question,
  control,
  validation,
}: SingleFormQuestionProps) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      validate: (v) => {
        try {
          if (!validation) return true;
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });

  return (
    <React.Fragment>
      <fieldset id={name} className="flex flex-col gap-y-3 pb-2 items-center">
        <label className="text font-bold text-center">{question}</label>
        <input
          {...field}
          className="border p-1 rounded-md border-black max-w-[300px]"
        />
      </fieldset>
      {invalid && <p>{errors?.[name]?.message as string}</p>}
    </React.Fragment>
  );
}

export function MultiCheckboxFormQuestion({
  name,
  question,
  control,
  validation,
  options,
  multiple = true,
}: MultiCheckboxQuestionProps) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: [],
    rules: {
      validate: (v) => {
        try {
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });

  return (
    <React.Fragment>
      <label className="text font-bold text-center pb-4">{question}</label>
      {options?.map((option, idx) => {
        const checked = field?.value?.includes(option);
        const handleChange = (checked: boolean) => {
          if (checked) {
            if (multiple) {
              field.onChange([...field.value, option]);
            } else {
              field.onChange([option]);
            }
          } else {
            field.onChange(field.value.filter((v: string) => v !== option));
          }
        };

        return (
          <fieldset
            key={option}
            id={option}
            className={`flex gap-3 items-center w-full`}
            onClick={() => {
              handleChange(!checked);
            }}
          >
            <div
              className={`h-[56px] flex items-center px-6 border rounded-md w-full cursor-pointer ${
                checked
                  ? "border-primary-500 bg-primary-50"
                  : "bg-gray-100 border-gray-100 "
              }`}
            >
              <Checkbox
                {...field}
                ref={(ref) => {
                  field.ref(ref);
                }}
                onChange={handleChange}
                checked={field?.value?.includes(option)}
              />
              <label
                htmlFor={`${option}-${idx}`}
                className="text-left pl-4 pointer-events-none"
              >
                {option}
              </label>
            </div>
          </fieldset>
        );
      })}
      {invalid && <p>{errors?.[name]?.message as string}</p>}
    </React.Fragment>
  );
}

export function MultipleTextInput({
  name,
  question,
  control,
  validation,
  register,
}: MultiTextInputProps) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
    rules: {
      validate: (v) => {
        try {
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });

  useEffect(() => {
    console.log("fields", fields)
    if (fields?.length === 0) {
      append(" ");

    }
  }, [fields, append]);

  return (
    <React.Fragment>
      <label className="text font-bold text-center pb-4">{question}</label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex w-full items-center gap-x-2">
            <input
              {...register(`${name}.${index}.value`)}
              // ref={field.ref}
              key={field.id}
              type="text"
              className="w-full border border-[#CBD5E1] rounded-md py-2 px-4 focus:outline-primary-400"
              name={`${name}.${index}.value`}
            />
            {index > 0 && (
              <Button buttonType="tertiary" onClick={() => remove(index)}>
                <TrashIcon className="w-6 h-6 stroke-gray-500" />
              </Button>
            )}
          </div>
        );
      })}
      <button
        className="w-full py-2 px-4 rounded-md border border-gray-400 flex items-center justify-center bg-gray-100"
        onClick={() => append(" ")}
      >
        <PlusIcon className="w-6 h-6 stroke-gray-500" />
      </button>
    </React.Fragment>
  );
}

export function RadioGroupInput({
  name,
  control,
  validation,
  options,
  question,
}: RadioGroupInputProps) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      validate: (v) => {
        try {
          if (!validation) return true;
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });
  return (
    <React.Fragment>
      <label className="text font-bold text-center pb-4">{question}</label>
      <RadioGroup.Root
        onValueChange={field.onChange}
        value={field.value}
        ref={field.ref}
        className="flex flex-col gap-y-2 w-full"
      >
        {options.map((opt) => {
          return (
            <RadioGroupItem
              id={opt}
              value={opt}
              key={opt}
              selected={field?.value === opt}
            />
          );
        })}
      </RadioGroup.Root>
    </React.Fragment>
  );
}

export function RadioGroupItem({
  value,
  id,
  selected,
}: {
  value: string;
  id: string;
  selected: boolean;
}) {
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <div
      className={`flex justify-center w-full gap-x-4 items-center py-[18px] px-[18px] rounded-md ${
        selected
          ? "border border-[#0C52E8] bg-[#F2F6FF]"
          : "border border-[#F8FAFC] bg-[#F8FAFC]"
      }`}
      onClick={() => {
        buttonRef?.current?.click();
      }}
    >
      <RadioGroup.Item
        ref={buttonRef as any}
        value={value}
        id={id}
        className={`${
          selected
            ? "bg-[#0648D4] border-[#0648D4]"
            : "bg-white border-[#CBD5E1]"
        } w-[22px] h-[20px] rounded-full border `}
      >
        <RadioGroup.Indicator
          className={`flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-white`}
        />
      </RadioGroup.Item>
      <label htmlFor={id} className="flex flex-grow w-full">
        {value}
      </label>
    </div>
  );
}

export function TextAreaInput({
  name,
  control,
  validation,
  question,
}: SingleFormQuestionProps) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules: {
      validate: (v) => {
        try {
          if (!validation) return true;
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });

  return (
    <React.Fragment>
      <fieldset id={name} className="flex flex-col gap-y-3 pb-2 items-center">
        <label className="text font-bold text-center">{question}</label>
        <textarea
          {...field}
          className="p-2 border rounded-md border-gray-300 placeholder:text-gray-300 w-full focus:outline-primary-400"
          placeholder="Enter text here..."
          rows={6}
        />
      </fieldset>
      {invalid && <p>{errors?.[name]?.message as string}</p>}
    </React.Fragment>
  );
}

export function RadioGroupNumberItem({
  value,
  id,
  selected,
}: {
  value: string;
  id: string;
  selected: boolean;
}) {
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <div
      className={`flex justify-center gap-x-4 items-center w-[40px] h-[40px] rounded-md ${
        selected
          ? "border border-[#0C52E8] bg-[#F2F6FF] text-[#0C52E8]"
          : "border border-[#CBD5E1] bg-[#F8FAFC]"
      }`}
      onClick={() => {
        buttonRef?.current?.click();
      }}
    >
      <RadioGroup.Item
        ref={buttonRef as any}
        value={value}
        id={id}
        className={``}
      >
        <label htmlFor={id} className="flex flex-grow w-full">
          {value}
        </label>
      </RadioGroup.Item>
    </div>
  );
}

export function RadioGroupNumberInput({
  name,
  control,
  validation,
  options,
  question,
}: RadioGroupInputProps) {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      validate: (v) => {
        try {
          if (!validation) return true;
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Invalid";
          }
          return false;
        }
      },
    },
  });
  return (
    <React.Fragment>
      <label className="text font-bold text-center pb-4">{question}</label>
      <RadioGroup.Root
        onValueChange={field.onChange}
        value={field.value}
        ref={field.ref}
        className="flex gap-x-2 w-full justify-evenly"
      >
        {options.map((opt) => {
          return (
            <RadioGroupNumberItem
              id={opt}
              value={opt}
              key={opt}
              selected={field?.value === opt}
            />
          );
        })}
      </RadioGroup.Root>
    </React.Fragment>
  );
}
