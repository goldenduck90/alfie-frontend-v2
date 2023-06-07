import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
} from "./common";

const options = [
  "Most of the time",
  "A lot of the time",
  "From time to time, occasionally",
  "Not at all",
];

const frightenedOptions = [
  "Very definitely and quite badly",
  "Yes, but not too badly",
  "A little, but it doesn't worry me",
  "Not at all",
];

const frightenedFrequencyOptions = [
  "Not at all",
  "Occasionally",
  "Quite Often",
  "Very Often",
];

const worryOptions = [
  "A great deal of the time",
  "A lot of the time",
  "From time to time, but not too often",
  "Only occasionally",
];

const easeOptions = ["Definitely", "Usually", "Not Often", "Not at all"];

const restlessOptions = [
  "Very much indeed",
  "Quite a lot",
  "Not very much",
  "Not at all",
];

const panicOptions = [
  "Very often indeed",
  "Quite often",
  "Not very often",
  "Not at all",
];

export const metabolicQuestions: QuestionProps<any>[] = [
  {
    id: "tenseLevel",
    question: 'How often do you feel tense or "impatient"?',
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "frightenedLevel",
    question:
      "I get a sort of frightened feeling as if something awful is about to happen",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={frightenedOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "worryAmount",
    question: "Worrying thoughts go through my mind",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={worryOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "easeFrequency",
    question: "Only occasionally I can sit at ease and feel relaxed",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={easeOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "frightenedFrequency",
    question:
      "I get a sort of frightened feeling like 'butterflies' in the stomach",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={frightenedFrequencyOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "restlessAmount",
    question: "I feel restless as I have to be on the move",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={restlessOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "panicFrequency",
    question: "I get sudden feelings of panic",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={panicOptions} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
];
