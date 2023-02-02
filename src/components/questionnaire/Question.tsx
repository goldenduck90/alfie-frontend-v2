import React, { useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z, ZodError } from "zod";

interface QuestionComponentProps {
  control: Control<any>;
  validation?: z.ZodType<any, any>;
  name: string;
  question: string;
}

interface SingleFormQuestionProps extends QuestionComponentProps {}

interface MultiCheckboxQuestionProps extends QuestionComponentProps {
  options: string[];
  multiple?: boolean;
}

interface QuestionProps<T extends React.FC<QuestionComponentProps>> {
  id: string;
  question: string;
  validation?: z.ZodType<any, any>;
  Component: T;
}

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
    Component: SingleFormQuestion,
    validation: z.string().min(1, "Required"),
  },
  {
    id: "q3",
    question: "Do you have any of the following conditions?",
    Component: SingleFormQuestion,
    validation: z.string().min(1, "Required"),
  },
  {
    id: "q4",
    question: "Please list any medication allergies you are aware of:",
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        options={[
          "Penicillin",
          "Aspirin",
          "Ibuprofen",
          "Other",
          "None of the Above",
        ]}
      />
    ),
  },
];

const metabolicQuestions: QuestionProps<any>[] = [
  {
    id: "q1",
    question: 'How often do you feel tense or "impatient"?',
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        multiple={false}
        options={[
          "Most of the time",
          "A lot of the time",
          "From time to time",
          "Not at all",
        ]}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
  },
];

const gastroQuestions: QuestionProps<any>[] = [
  {
    id: "q1",
    question:
      "Have you been bothered by pain or discomfort in your upper abdomen or the pit of your stomach during the past week?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <MultiCheckboxFormQuestion
        {...props}
        multiple={false}
        options={[
          "Most of the time",
          "A lot of the time",
          "From time to time, ocassionally",
          "Not at all",
        ]}
      />
    ),
    validation: z.string().array().nonempty("At least one option is required"),
  },
];

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

export function Question() {
  return (
    <div className="flex flex-col gap-y-3">
      <Questionnaire allQuestions={medicalQuestions} formName="medical" />
      <Questionnaire allQuestions={metabolicQuestions} formName="metabolic" />
      <Questionnaire allQuestions={gastroQuestions} formName="gastro" />
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
  const [step, setStep] = useState(0);
  const onSubmit = createPersistedFormState(formName)((state: any) => ({
    setFormState: state.setFormState,
  }));
  const { handleSubmit, control, trigger } = useForm({
    defaultValues: getStoredForm(formName),
    reValidateMode: "onBlur",
  });

  const question = allQuestions?.[step];
  const Component = question?.Component;
  const endQuestion = step + 1 === allQuestions?.length;

  return (
    <div className="bg-white border rounded-md p-4 flex gap-x-2 items-center">
      {step > 0 && <Button onClick={() => setStep((s) => s - 1)}>Back</Button>}
      <div className="flex flex-col items-center w-full gap-y-3">
        {!!Component && (
          <Component
            control={control}
            key={question?.id}
            name={question.id}
            question={question.question}
            validation={question.validation}
          />
        )}
        {endQuestion && <p>Finished</p>}
        <Button
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
      <label className="text-lg font-bold text-center">{question}</label>
      {options?.map((option) => (
        <fieldset
          key={option}
          id={option}
          className="flex gap-x-3 gap-y-3 pb-2 items-center"
        >
          <label className="text-left">{option}</label>
          <input
            {...field}
            onChange={(e) => {
              if (e.target.checked) {
                if (multiple) {
                  field.onChange([...field.value, option]);
                } else {
                  field.onChange([option]);
                }
              } else {
                field.onChange(field.value.filter((v: string) => v !== option));
              }
            }}
            checked={field?.value?.includes(option)}
            className="border p-1 rounded-md border-black max-w-[300px]"
            type="checkbox"
          />
        </fieldset>
      ))}
      {invalid && <p>{errors?.[name]?.message as string}</p>}
    </React.Fragment>
  );
}
