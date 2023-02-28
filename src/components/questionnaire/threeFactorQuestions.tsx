import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
  RadioGroupNumberInput,
} from "./common";

export const threeFactorQuestions: QuestionProps<any>[] = [
  {
    id: "alwaysEating",
    question:
      "When I smell a delicious food, I find it very difficult to keep from eating, even if I have just finished a meal.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput
        {...props}
        options={[
          "Definitely true",
          "Mostly true",
          "Mostly false",
          "Definitely false",
        ]}
      />
    ),
    helperText: "Select one answer",
  },
  {
    id: "restraint",
    question:
      "On a scale where 1 means no restraint in eating (eating whatever you want, whenever you want it) and 8 means total restraint (constantly limiting food intake and never giving in), what number would you give yourself?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupNumberInput
        {...props}
        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
      />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
];
