import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
} from "./common";

export const gastroQuestions: QuestionProps<any>[] = [
  {
    id: "painOrDiscomfort",
    question:
      "Have you been bothered by pain or discomfort in your upper abdomen or the pit of your stomach during the past week?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput
        {...props}
        options={[
          "Most of the time",
          "A lot of the time",
          "From time to time, ocassionally",
          "Not at all",
        ]}
      />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
];
