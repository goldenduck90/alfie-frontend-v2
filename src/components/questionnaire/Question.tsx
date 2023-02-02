import React, { useEffect, useState } from "react";
import {
  Control,
  SubmitHandler,
  useController,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { Button } from "../ui/Button";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
interface QuestionProps {
  id: string;
  question: string;
}

const metabolicQuestions: QuestionProps[] = [
  {
    id: "q1",
    question: "How long have you been trying to lose weight?",
  },
  {
    id: "q2",
    question:
      "Have you tried any of the following weight management methods in the past?",
  },
  {
    id: "q3",
    question: "Do you have any of the following conditions?",
  },
  {
    id: "q4",
    question: "Please list any medication allergies you are aware of:",
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
  const [step, setStep] = useState(0);
  const onSubmit = createPersistedFormState("questionnaire")((state: any) => ({
    setFormState: state.setFormState,
  }));
  const { handleSubmit, control, trigger, setError } = useForm({
    defaultValues: getStoredForm("questionnaire"),
    reValidateMode: "onBlur",
  });

  const allQuestions: QuestionProps[] = metabolicQuestions;
  const question = allQuestions?.[step];
  const endQuestion = step + 1 === allQuestions?.length;

  return (
    <div className="bg-white border rounded-md p-4 flex gap-x-2">
      {step > 0 && <Button onClick={() => setStep((s) => s - 1)}>Back</Button>}
      <div className="">
        {!!question && (
          <SingleFormQuestion
            control={control}
            key={question?.id}
            name={question.id}
            question={question.question}
            validation={z.string().min(1, "Required")}
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

export function SingleFormQuestion<T extends string>({
  name,
  question,
  control,
  validation,
}: {
  name: T;
  question: string;
  control: Control<any>;
  validation?: any;
}) {
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
          validation?.parse?.(v);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            const message = error?.issues?.[0]?.message;
            return message || "Required";
          }
          return false;
        }
      },
    },
  });

  return (
    <React.Fragment>
      <fieldset id={name} className="flex flex-col gap-y-3 pb-2">
        <label>{question}</label>
        <input
          {...field}
          className="border p-1 rounded-md border-black max-w-[300px]"
        />
      </fieldset>
      {invalid && <p>{errors?.[name]?.message as string}</p>}
    </React.Fragment>
  );
}
