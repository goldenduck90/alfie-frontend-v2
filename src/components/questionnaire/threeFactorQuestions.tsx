import { z } from "zod";
import {
  QuestionProps,
  MultiCheckboxQuestionProps,
  RadioGroupInput,
  RadioGroupNumberInput,
} from "./common";

const commonOptions = [
  "Definitely true",
  "Mostly true",
  "Mostly false",
  "Definitely false",
];

const oftenHungryOptions = [
  "Only at meal times",
  "Sometimes between meals",
  "Often between meals",
  "Almost always",
];

const likelyOptions = [
  "Unlikely",
  "Slightly likely",
  "Moderately likely",
  "Very likely",
];

const bingeEatOptions = [
  "Never",
  "Rarely",
  "Sometimes",
  "At least once a week",
];

export const threeFactorQuestions: QuestionProps<any>[] = [
  {
    id: "alwaysEating",
    question:
      "When I smell a delicious food, I find it very difficult to keep from eating, even if I have just finished a meal.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "smallHelpings",
    question:
      "I deliberately take small helpings as a means of controlling my weight.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "anxiousEating",
    question: "When I feel anxious, I find myself eating.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "uncontrollableEating",
    question: "Sometimes when I start eating, I just can't seem to stop.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "eatingWithOthers",
    question:
      "Being with someone who is eating often makes me hungry enough to eat also.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "overeatingWhenBlue",
    question: "When I feel blue, I often overeat.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "delicacyEating",
    question:
      "When I see a real delicacy, I often get so hungry that I have to eat right away.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "bottomlessPit",
    question:
      "I get so hungry that my stomach often seems like a bottomless pit.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  //
  {
    id: "alwaysHungry",
    question:
      "I am always hungry so it is hard for me to stop eating before I finish the food on my plate.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "lonelyEating",
    question: "When I feel lonely, I console myself by eating.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "holdBack",
    question: "I conciously hold back at meals in order not to gain weight.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  //
  {
    id: "fatFoods",
    question: "I do not eat some foods because they make me fat.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "alwaysHungry2",
    question: "I am always hungry enough to eat at any time.",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "howOftenHungry",
    question: "How often do you feel hungry?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={oftenHungryOptions} />
    ),
    helperText: "Select one answer",
  },
  //
  {
    id: "avoidStockingUp",
    question: "How frequently do you avoid stocking up on tempting foods?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={commonOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "conciouslyEatLess",
    question: "How likely are you to conciously eat less than you want",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={likelyOptions} />
    ),
    helperText: "Select one answer",
  },
  {
    id: "eatingBinges",
    question: "Do you go on eating binges though you are not hungry?",
    Component: (props: MultiCheckboxQuestionProps) => (
      <RadioGroupInput {...props} options={bingeEatOptions} />
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
