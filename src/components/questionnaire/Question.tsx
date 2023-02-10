import React, { useEffect, useState } from "react";
import {
  Control,
  useController,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "../ui/Button";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z, ZodError } from "zod";
import { QuestionContainer } from "./QuestionContainer";
import { HookCheckbox } from "../ui/hookComponents/HookCheckBox";
import { Checkbox } from "../ui/Checkbox";

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

interface QuestionProps<T extends React.FC<QuestionComponentProps>> {
  id: string;
  question: string;
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
      <MultiCheckboxFormQuestion
        {...props}
        multiple={false}
        options={[
          "My whole life",
          "Several years",
          "6-12 Months",
          "Less than 6 Months",
        ]}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
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
  },
  {
    id: "q4",
    question: "Do you have any of the following conditions?",
    Component: SingleFormQuestion,
    validation: z.string().min(1, "Required"),
  },
  {
    id: "q6",
    question: "Please list any medication allergies you are aware of:",
    Component: MultipleTextInput,
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
      <Questionnaire
        allQuestions={medicalQuestions}
        formName="medical"
        helper="Select one answer"
      />
    </div>
  );
}

function Questionnaire({
  allQuestions,
  formName,
  helper,
}: {
  allQuestions: QuestionProps<any>[];
  formName: string;
  helper?: string;
}) {
  const [step, setStep] = useState(0);
  const onSubmit = createPersistedFormState(formName)((state: any) => ({
    setFormState: state.setFormState,
  }));
  const { handleSubmit, control, trigger, register } = useForm({
    defaultValues: getStoredForm(formName),
    reValidateMode: "onBlur",
  });

  const question = allQuestions?.[step];
  const Component = question?.Component;
  const endQuestion = step + 1 === allQuestions?.length;

  return (
    <QuestionContainer helper={helper}>
      <div className="col-span-1 flex justify-center items-center">
        {step > 0 && (
          <Button onClick={() => setStep((s) => s - 1)}>{`<`}</Button>
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
              try {
                const valid = await trigger(question?.id);
                if (!!valid) {
                  handleSubmit((value) => {
                    onSubmit.setFormState(value);
                    setStep((s) => (s >= allQuestions.length - 1 ? 0 : s + 1));
                  })();
                }
              } catch (error) {
                /**
                 * This should never happen
                 */
                console.log("Zod", { error });
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
        <label className="text-lg font-bold text-center">{question}</label>
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
  const inputRef = React.useRef<HTMLInputElement[]>([]);

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
      <label className="text-lg font-bold text-center pb-4">{question}</label>
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
              className={`h-[56px] flex items-center px-6 border rounded-sm w-full cursor-pointer ${
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
      <label className="text-lg font-bold text-center pb-4">{question}</label>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex w-full items-center gap-x-2">
            <input
              key={field.id}
              type="text"
              className="w-full border border-[#CBD5E1] rounded-md py-2 px-4"
              {...register(`${name}.${index}.value`)}
            />
            {index > 0 && <Button onClick={() => remove(index)}>Delete</Button>}
          </div>
        );
      })}
      <Button onClick={() => append("")}>Add</Button>
    </React.Fragment>
  );
}
