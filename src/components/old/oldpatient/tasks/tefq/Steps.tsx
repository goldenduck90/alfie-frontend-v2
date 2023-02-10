import { FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { NumberInput } from "../../../../inputs/NumbeInput";
import { SelectInput } from "../../../../inputs/SelectInput";
import { parseCachedVal } from "../../helpers";
import { Question } from "../../Question";

export const initialValues = {
  tenseLevel: parseCachedVal(localStorage.tenseLevel, ""),
  frightenedLevel: parseCachedVal(localStorage.frightenedLevel, ""),
  easeFrequency: parseCachedVal(localStorage.easeFrequency, ""),
  worryAmount: parseCachedVal(localStorage.worryAmount, ""),
  frightenedFrequency: parseCachedVal(localStorage.frightenedFrequency, ""),
  restlessAmount: parseCachedVal(localStorage.restlessAmount, ""),
  panicFrequency: parseCachedVal(localStorage.panicFrequency, ""),
};

type StepProps = (
  values: FormikValues,
  formikBag: FormikProps<FormikValues>,
  currentStepIndex: number
) => Promise<unknown>;

export const beforePrev: StepProps = (_value, _params, currentStepIndex) => {
  _params.setErrors({});
  localStorage.setItem("tefqSteps", String(currentStepIndex - 1));
  return Promise.resolve();
};
export const beforeNext: StepProps = (_values, _params, currentStepIndex) => {
  localStorage.setItem("tefqSteps", String(currentStepIndex + 1));
  return Promise.resolve();
};
const options = [
  {
    label: "Definitely true",
    value: "Definitely true",
  },
  {
    label: "Mostly true",
    value: "Mostly true",
  },
  {
    label: "Mostly false",
    value: "Mostly false",
  },
  {
    label: "Definitely false",
    value: "Definitely false",
  },
];

export const Step1 = () => {
  return (
    <Question
      aboveQuestionText="Please read each statement and select from the options below."
      questionText="When I smell a delicious food, I find it very difficult to keep from eating, even if I have just finished a meal."
      input={
        <SelectInput
          cache
          name="alwaysEating"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step1.validation = Yup.object().shape({
  alwaysEating: Yup.string().required("Please select a value"),
});

export const Step2 = () => {
  return (
    <Question
      questionText="I deliberately take small helpings as a means of controlling my weight."
      input={
        <SelectInput
          cache
          name="smallHelpings"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step2.validation = Yup.object().shape({
  smallHelpings: Yup.string().required("Please select a value"),
});

export const Step3 = () => {
  return (
    <Question
      questionText="When I feel anxious, I find myself eating."
      input={
        <SelectInput
          cache
          name="anxiousEating"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step3.validation = Yup.object().shape({
  anxiousEating: Yup.string().required("Please select a value"),
});

export const Step4 = () => {
  return (
    <Question
      questionText="Sometimes when I start eating, I just can't seem to stop."
      input={
        <SelectInput
          cache
          name="uncontrollableEating"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step4.validation = Yup.object().shape({
  uncontrollableEating: Yup.string().required("Please select a value"),
});

export const Step5 = () => {
  return (
    <Question
      questionText="Being with someone who is eating often makes me hungry enough to eat also."
      input={
        <SelectInput
          cache
          name="eatingWithOthers"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step5.validation = Yup.object().shape({
  eatingWithOthers: Yup.string().required("Please select a value"),
});

export const Step6 = () => {
  return (
    <Question
      questionText="When I feel blue, I often overeat."
      input={
        <SelectInput
          cache
          name="overeatingWhenBlue"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step6.validation = Yup.object().shape({
  overeatingWhenBlue: Yup.string().required("Please select a value"),
});

export const Step7 = () => {
  return (
    <Question
      questionText="When I see a real delicacy, I often get so hungry that I have to eat right away."
      input={
        <SelectInput
          cache
          name="delicacyEating"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step7.validation = Yup.object().shape({
  delicacyEating: Yup.string().required("Please select a value"),
});
export const Step8 = () => {
  return (
    <Question
      questionText="I get so hungry that my stomach often seems like a bottomless pit."
      input={
        <SelectInput
          cache
          name="bottomlessPit"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step8.validation = Yup.object().shape({
  bottomlessPit: Yup.string().required("Please select a value"),
});
export const Step9 = () => {
  return (
    <Question
      questionText="I am always hungry so it is hard for me to stop eating before I finish the food on my plate."
      input={
        <SelectInput
          cache
          name="alwaysHungry"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step9.validation = Yup.object().shape({
  alwaysHungry: Yup.string().required("Please select a value"),
});
export const Step10 = () => {
  return (
    <Question
      questionText="When I feel lonely, I console myself by eating."
      input={
        <SelectInput
          cache
          name="lonelyEating"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step10.validation = Yup.object().shape({
  lonelyEating: Yup.string().required("Please select a value"),
});
export const Step11 = () => {
  return (
    <Question
      questionText="I conciously hold back at meals in order not to gain weight."
      input={
        <SelectInput
          cache
          name="holdBack"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step11.validation = Yup.object().shape({
  holdBack: Yup.string().required("Please select a value"),
});
export const Step12 = () => {
  return (
    <Question
      questionText="I do not eat some foods because they make me fat."
      input={
        <SelectInput
          cache
          name="fatFoods"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step12.validation = Yup.object().shape({
  fatFoods: Yup.string().required("Please select a value"),
});
export const Step13 = () => {
  return (
    <Question
      questionText="I am always hungry enough to eat at any time."
      input={
        <SelectInput
          cache
          name="alwaysHungry2"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step13.validation = Yup.object().shape({
  alwaysHungry2: Yup.string().required("Please select a value"),
});
const oftenHungryOptions = [
  {
    label: "Only at meal times",
    value: "Only at meal times",
  },
  {
    label: "Sometimes between meals",
    value: "Sometimes between meals",
  },
  {
    label: "Often between meals",
    value: "Often between meals",
  },
  {
    label: "Almost always",
    value: "Almost always",
  },
];
export const Step14 = () => {
  return (
    <Question
      questionText="How often do you feel hungry?"
      input={
        <SelectInput
          cache
          name="howOftenHungry"
          placeholder="Select an option..."
          options={oftenHungryOptions}
        />
      }
    />
  );
};
Step14.validation = Yup.object().shape({
  howOftenHungry: Yup.string().required("Please select a value"),
});
export const Step15 = () => {
  return (
    <Question
      questionText="How frequently do you avoid stocking up on tempting foods?"
      input={
        <SelectInput
          cache
          name="avoidStockingUp"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  );
};
Step15.validation = Yup.object().shape({
  avoidStockingUp: Yup.string().required("Please select a value"),
});
const likelyOptions = [
  {
    label: "Unlikely",
    value: "Unlikely",
  },
  {
    label: "Slighly likely",
    value: "Slighly likely",
  },
  {
    label: "Moderately likely",
    value: "Moderately likely",
  },
  {
    label: "Very likely",
    value: "Very likely",
  },
];
export const Step16 = () => {
  return (
    <Question
      questionText="How likely are you to conciously eat less than you want"
      input={
        <SelectInput
          cache
          name="conciouslyEatLess"
          placeholder="Select an option..."
          options={likelyOptions}
        />
      }
    />
  );
};
Step16.validation = Yup.object().shape({
  conciouslyEatLess: Yup.string().required("Please select a value"),
});

const eatingBingesOptions = [
  {
    label: "Never",
    value: "Never",
  },
  {
    label: "Rarely",
    value: "Rarely",
  },
  {
    label: "Sometimes",
    value: "Sometimes",
  },
  {
    label: "At least once a week",
    value: "At least once a week",
  },
];
export const Step17 = () => {
  return (
    <Question
      questionText="Do you go on eating binges though you are not hungry?"
      input={
        <SelectInput
          cache
          name="eatingBinges"
          placeholder="Select an option..."
          options={eatingBingesOptions}
        />
      }
    />
  );
};
Step17.validation = Yup.object().shape({
  eatingBinges: Yup.string().required("Please select a value"),
});

export const Step18 = () => {
  return (
    <Question
      questionText="On a scale of 1 to 8, where 1 means no restraint in eating (eating whatever you want, whenever you want it) and 8 means total restraint (constantly limiting food intake and never giving in), what number would you give yourself?"
      input={
        <NumberInput cache name="restraint" placeholder="Select an option..." />
      }
    />
  );
};
Step18.validation = Yup.object().shape({
  // max value is 8 lowest value is 1
  restraint: Yup.number()
    .min(1, "Must be at least 1")
    .max(8, "Must be at most 8")
    .required("Please select a value"),
});

export const list = [
  {
    component: Step1,
    validationSchema: Step1.validation,
    beforeNext,
  },
  {
    component: Step2,
    validationSchema: Step2.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step3,
    validationSchema: Step3.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step4,
    validationSchema: Step4.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step5,
    validationSchema: Step5.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step6,
    validationSchema: Step6.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step7,
    validationSchema: Step7.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step8,
    validationSchema: Step8.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step9,
    validationSchema: Step9.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step10,
    validationSchema: Step10.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step11,
    validationSchema: Step11.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step12,
    validationSchema: Step12.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step13,
    validationSchema: Step13.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step14,
    validationSchema: Step14.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step15,
    validationSchema: Step15.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step16,
    validationSchema: Step16.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step17,
    validationSchema: Step17.validation,
    beforePrev,
    beforeNext,
  },
  {
    component: Step18,
    validationSchema: Step18.validation,
    beforePrev,
    beforeNext,
  },
];
