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
import { useProgressContext } from "../layouts/QuestionaireLayout";
interface QuestionComponentProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  validation?: z.ZodType<any, any>;
  name: string;
  question: string;
}

interface SingleFormQuestionProps extends QuestionComponentProps {}

interface MultiCheckboxQuestionProps extends QuestionComponentProps {
  options: string[];
  multiple?: boolean;
}

interface MultiTextInputProps extends QuestionComponentProps {}

interface RadioGroupInputProps extends QuestionComponentProps {
  options: string[];
}

interface QuestionProps<T extends React.FC<QuestionComponentProps>> {
  id: string;
  question: string;
  helperText: string;
  validation?: z.ZodType<any, any>;
  Component: T;
}

const conditions = [
  "High blood pressure",
  "Pre-diabetes",
  "Joint pain",
  "Fatty Liver disease",
  "Prostate disease",
  "Migraines",
  "Arthritis",
  "Cancer",
  "High Cholesterol",
  "Type II Diabetes",
  "Sleep apnea",
  "Back pain",
  "Never pain",
  "PCOS (polycystic ovary syndrome)",
  "None of the above",
];

const medicalQuestions: QuestionProps<any>[] = [
  {
    id: "q1",
    question: "How long have you been trying to lose weight?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput
        {...props}
        options={[
          "My whole life",
          "Several years",
          "6-12 Months",
          "Less than 6 Months",
        ]}
      />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "q2",
    question:
      "Have you tried any of the following weight management methods in the past?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        multiple={true}
        options={[
          "Calorie Counting / Restriction Diets",
          "Meal Replacements",
          "Intermittent fasting",
          "Personal Trainer",
          "Weight loss program (e.g. Noom, Weight Watchers)",
          "Weight loss surgery",
          "None of the above",
        ]}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
    helperText: "Select all that apply",
  },
  {
    id: "q3",
    question: "Do you have any of the following conditions?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        multiple={true}
        options={conditions}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
    helperText: "Select all that apply",
  },
  {
    id: "q4",
    question: "Do you have any of the following conditions?",
    Component: (props: RadioGroupInputProps) => {
      return (
        <React.Fragment>
          <RadioGroupInput {...props} options={["Yes", "No"]} />
          <div className="w-full">
            <p className="text text-sm font-bold py-2 text-center">
              Please provide more details on your past surgical procedures
            </p>
            <textarea
              className="p-2 border rounded-md border-gray-300 placeholder:text-gray-300 w-full"
              placeholder="Enter text here..."
              rows={6}
            />
          </div>
        </React.Fragment>
      );
    },
    validation: z.string().min(1, "Required"),
    helperText: "Select one answer",
  },
  {
    id: "q6",
    question: "Please list any medication allergies you are aware of:",
    Component: MultipleTextInput,
    helperText: "Type your answer",
  },
  {
    id: "q7",
    question: "",
    Component: FinalSubmitMetabolic,
    helperText: "Information",
  },
];

// const metabolicQuestions: QuestionProps<any>[] = [
//   {
//     id: "q1",
//     question: 'How often do you feel tense or "impatient"?',
//     Component: (props: MultiCheckboxQuestionProps) => (
//       <MultiCheckboxFormQuestion
//         {...props}
//         multiple={false}
//         options={[
//           "Most of the time",
//           "A lot of the time",
//           "From time to time",
//           "Not at all",
//         ]}
//       />
//     ),
//     validation: z.string().array().nonempty("At least one option is required"),
//   },
// ];

// const gastroQuestions: QuestionProps<any>[] = [
//   {
//     id: "q1",
//     question:
//       "Have you been bothered by pain or discomfort in your upper abdomen or the pit of your stomach during the past week?",
//     Component: (props: MultiCheckboxQuestionProps) => (
//       <MultiCheckboxFormQuestion
//         {...props}
//         multiple={false}
//         options={[
//           "Most of the time",
//           "A lot of the time",
//           "From time to time, ocassionally",
//           "Not at all",
//         ]}
//       />
//     ),
//     validation: z.string().array().nonempty("At least one option is required"),
//   },
// ];

function createPersistedFormState(formName: string) {
  return create<any>(
    persist(
      (set) => ({
        formState: {},
        setFormState: (formState: any) =>
          set((state: any) => ({
            ...state,
            formState: { ...state.formState, ...formState },
          })),
      }),
      {
        name: formName,
      }
    )
  );
}
/**
 * Goal is to in the future only provide questions and type then the form works out of the box.
 * Will need individual custom final submits
 * Still requires final result mapping to API call
 *
 */
export function Question() {
  return (
    <div className="relative flex flex-col gap-y-3 items-center w-full">
      <Questionnaire allQuestions={medicalQuestions} formName="medical" />
    </div>
  );
}

function Questionnaire({
  allQuestions,
  formName,
}: {
  allQuestions: QuestionProps<any>[];
  formName: string;
}) {
  const store = useProgressContext();
  const { setMax, current, setCurrent } = useStore(store, (state: any) => ({
    setMax: state.setMax,
    setCurrent: state.setCurrent,
    current: state.current,
  }));

  useEffect(() => {
    setMax(allQuestions.length);
  }, [allQuestions, setMax, setCurrent]);

  const onSubmit = createPersistedFormState(formName)((state: any) => ({
    setFormState: state.setFormState,
  }));

  const { handleSubmit, control, trigger, register } = useForm({
    defaultValues: getStoredForm(formName),
    reValidateMode: "onBlur",
  });

  const question = allQuestions?.[current];
  const Component = question?.Component;
  const endQuestion = current + 1 === allQuestions?.length;

  return (
    <QuestionContainer helper={question?.helperText}>
      <div className="col-span-1 flex justify-center items-center">
        {current > 0 && !endQuestion && (
          <button
            className="p-1 border rounded-md border-gray-400 w-[40px] h-[40px] flex items-center justify-center"
            onClick={() => setCurrent(current - 1)}
          >
            <ChevronLeftIcon className="stroke-gray-400 w-8 h-8" />
          </button>
        )}
      </div>
      <div className="col-span-10">
        <div className="flex flex-col items-center w-full gap-y-3">
          {!!Component && (
            <Component
              control={control}
              key={question?.id}
              name={question.id}
              register={register}
              question={question.question}
              validation={question.validation}
            />
          )}
          <div className="pt-3" />
          <Button
            size="large"
            onClick={async () => {
              if (!question?.id) return;
              /**
               * Trigger validation step by step within form
               *
               */
              if (!endQuestion) {
                try {
                  const valid = await trigger(question?.id);
                  if (!!valid) {
                    handleSubmit((value) => {
                      onSubmit.setFormState(value);
                      setCurrent(
                        current >= allQuestions.length - 1 ? 0 : current + 1
                      );
                    })();
                  }
                } catch (error) {
                  /**
                   * This should never happen
                   */
                  console.log("Zod", { error });
                }
              } else {
                handleSubmit((value) => {
                  console.log("Form Values", {
                    form: value,
                  });
                  localStorage.removeItem(formName);
                  setCurrent(0);
                })();
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="col-span-1" />
    </QuestionContainer>
  );
}

function getStoredForm(formName: string) {
  const storage = localStorage.getItem(formName);
  try {
    const parsed = JSON.parse(storage || "{}");
    return parsed?.state?.formState || {};
  } catch (error) {
    return {};
  }
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
            return message || "Invaid";
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
            return message || "Invaid";
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

function MultipleTextInput({
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
            return message || "Invaid";
          }
          return false;
        }
      },
    },
  });

  useEffect(() => {
    if (fields?.length === 0) {
      append("");
    }
  }, [fields, append]);

  return (
    <React.Fragment>
      <label className="text font-bold text-center pb-4">{question}</label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex w-full items-center gap-x-2">
            <input
              key={field.id}
              type="text"
              className="w-full border border-[#CBD5E1] rounded-md py-2 px-4"
              {...register(`${name}.${index}.value`)}
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
        onClick={() => append("")}
      >
        <PlusIcon className="w-6 h-6 stroke-gray-500" />
      </button>
    </React.Fragment>
  );
}

function RadioGroupInput({
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
            return message || "Invaid";
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

function RadioGroupItem({
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

const requiredDocNames = [
  "TSH",
  "Hb1Ac",
  "Lipid Panel",
  "Comprehensive Metabolic Panel",
];

function FinalSubmitMetabolic() {
  return (
    <div className="">
      <p className="text font-bold text-center">
        In order to properly determine the right medication for you, we need the
        following labs:
      </p>
      <div className="flex flex-col px-2 mt-6">
        {requiredDocNames.map((name) => {
          return (
            <div
              key={name}
              className=" bg-gray-100 py-4 px-2 flex gap-x-2 items-center text-gray-500 first:rounded-t-md last:rounded-b-md"
            >
              <DocumentIcon className="w-6 h-6 stroke-gray-500" />
              {name}
            </div>
          );
        })}
      </div>
      <p className="py-6 px-2 ">
        Use this link to schedule an appointment for routine lab work at
        Labcorp: https://www.labcorp.com/labs-and-appointments Routine labs
        should be covered by your insurance.
      </p>
      <div className="px-2 ">
        <Checkbox label="I have already had the required labs done" />
      </div>
    </div>
  );
}
