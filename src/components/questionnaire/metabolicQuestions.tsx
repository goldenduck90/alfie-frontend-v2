import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
} from "./common";

export const metabolicQuestions: QuestionProps<any>[] = [
  {
    id: "easeFrequency",
    question: 'How often do you feel tense or "impatient"?',
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
