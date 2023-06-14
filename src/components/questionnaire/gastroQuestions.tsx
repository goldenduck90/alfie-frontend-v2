import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
} from "./common";

const options = [
  "No discomfort at all",
  "Minor discomfort",
  "Mild discomfort",
  "Moderate discomfort",
  "Moderately severe discomfort",
  "Severe discomfort",
  "Very severe discomfort",
];

export const gastroQuestions: QuestionProps<any>[] = [
  {
    id: "painOrDiscomfort",
    question:
      "Have you been bothered by pain or discomfort in your upper abdomen or the pit of your stomach during the past week?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "heartBurn",
    question:
      "Have you been bothered by HEARTBURN during the past week? (By heartburn we mean an unpleasant stinging or burning sensation in the chest.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "acidReflux",
    question:
      "Have you been bothered by ACID REFLUX during the past week? (By acid reflux we mean the sensation of regurgitating small quantities of acid or flow of sour or bitter fluid from the stomach up the throat.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "hungerPains",
    question:
      "Have you been bothered by HUNGER PAINS in the stomach during the past week? (This hollow feeling in the stomach is associated with the need to eat between meals.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "nausea",
    question:
      "Have you been bothered by NAUSEA during the past week? (By nausea we mean a feeling or wanting to throw up or vomit.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "rumbling",
    question:
      "Have you been bothered by RUMBLING in your stomach during the past week? (Rumbling refers to vibrations or noise in the stomach.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "bloated",
    question:
      "Has your stomach felt BLOATED during the past week? (Feeling bloated refers to swelling often associated with a sensation of gas or air in the stomach.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "burping",
    question:
      "Have you been bothered by BURPING during the past week? (Burping refers to bringing up air or gas from the stomach via the mouth, often associated with easing a bloated feeling.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "gas",
    question:
      "Have you been bothered by PASSING GAS OR FLATUS during the past week? (Passing gas or flatus refers to the release of air or gas from the bowel, often associated with easing a bloated feeling.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "constipation",
    question:
      "Have you been bothered by CONSTIPATION during the past week? (Constipation refers to a reduced ability to empty the bowels.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "diarrhea",
    question:
      "Have you been bothered by DIARRHEA during the past week? (Diarrhea refers to a too frequent release of the bowels.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "looseStools",
    question:
      "Have you been bothered by LOOSE STOOLS during the pst week? (If your stools (motions) have been alternately hard and loose, this question only refers to the extent you have been bothered by the stools being loose.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "hardStools",
    question:
      "Have you been bothered by HARD STOOLS during the past week? (If your stools (motions) have been alternately hard and loose, this question only refers to the extent you have been bothered by the stools being hard.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "urgentBowel",
    question:
      "Have you been bothered by an URGENT NEED TO HAVE A BOWEL MOVEMENT during the past week? (This urgent need to go to the toilet is often associated with a feeling that you are not in full control.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
  {
    id: "completeBowels",
    question:
      "When going to the toilet during the past week, have you had the SENSATION OF NOT COMPLETELY EMPTYING THE BOWELS? (This feeling of incomplete emptying means that you still feel a need to pass more stool despite having exerted yourself to do so.)",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={options} />
    ),
    validation: z.string().min(1, "At least one option is required"),
    helperText: "Select one answer",
  },
];
