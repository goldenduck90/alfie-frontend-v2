import { DocumentIcon } from "@heroicons/react/outline";
import { Checkbox } from "../ui/Checkbox";
import React from "react";
import { Control, useController } from "react-hook-form";
import { z } from "zod";
import {
  MultiCheckboxFormQuestion,
  MultiCheckboxQuestionProps,
  MultipleTextInput,
  QuestionProps,
  RadioGroupInput,
  RadioGroupInputProps,
  TextAreaInput,
} from "./common";

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

export const medicalQuestions: QuestionProps<any>[] = [
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
    id: "weightManagementMethods",
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
    id: "conditions",
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
    id: "previousConditions",
    question: "Do you have any of the following conditions?",
    Component: (props: RadioGroupInputProps) => {
      return (
        <React.Fragment>
          <RadioGroupInput
            {...props}
            name={`q4.select`}
            options={["Yes", "No"]}
          />
          <div className="w-full">
            <TextAreaInput
              {...props}
              validation={undefined}
              question=""
              name={`q4.text`}
            />
          </div>
        </React.Fragment>
      );
    },
    validation: z.string().min(1, "Required"),
    helperText: "Select one answer",
  },
  {
    id: "allergies",
    question: "Please list any medication allergies you are aware of:",
    Component: MultipleTextInput,
    helperText: "Type your answer",
  },
  {
    id: "q7",
    question: "",
    Component: MultipleTextInput,
    helperText: "Information",
  },
  {
    id: "q7",
    question: "Identifying Information:    ",
    Component: FinalSubmitMetabolic,
    helperText: "Information",
  },
];

const requiredDocNames = [
  "TSH",
  "Hb1Ac",
  "Lipid Panel",
  "Comprehensive Metabolic Panel",
];

function FinalSubmitMetabolic({ control }: { control: Control<any> }) {
  const { field } = useController({
    name: "requiredLabs",
    defaultValue: false,
    control,
  });

  return (
    <div className="mx-auto max-w-[500px]">
      <p className="text font-bold text-center">
        In order to properly determine the right medication for you, we need the
        following labs:
      </p>
      <div className="flex flex-col px-2 mt-6">
        {requiredDocNames.map((name) => {
          return (
            <div
              key={name}
              className=" bg-gray-100 py-4 px-2 flex gap-x-2 items-center text-gray-700 first:rounded-t-md last:rounded-b-md"
            >
              <DocumentIcon className="w-6 h-6 stroke-gray-500" />
              {name}
            </div>
          );
        })}
      </div>
      <div></div>
      <p className="py-6 px-2">
        Use this link to schedule an appointment for routine lab work at
        Labcorp:
        <span>
          <a
            href={`https://www.labcorp.com/labs-and-appointment`}
            className="text-blue-500"
          >
            {` https://www.labcorp.com/labs-and-appointment `}
          </a>
        </span>
        Routine labs should be covered by your insurance.
      </p>
      <div className="px-2 ">
        <Checkbox
          {...field}
          ref={field.ref}
          checked={field?.value}
          label="I have already had the required labs done"
        />
      </div>
    </div>
  );
}
