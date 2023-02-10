import * as Yup from "yup";
import { SelectInput } from "../../../../inputs/SelectInput";
import { Question } from "../../Question";
import { FormikProps, FormikValues } from "formik";
import { parseCachedVal } from "../../helpers";

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
  localStorage.setItem("mpFeelingStep", String(currentStepIndex - 1));
  return Promise.resolve();
};
export const beforeNext: StepProps = (_values, _params, currentStepIndex) => {
  localStorage.setItem("mpFeelingStep", String(currentStepIndex + 1));
  return Promise.resolve();
};

export const tenseOptions = [
  {
    label: "Most of the time",
    value: "Most of the time",
  },
  {
    label: "A lot of the time",
    value: "A lot of the time",
  },
  {
    label: "From time to time, occasionally",
    value: "From time to time, occasionally",
  },
  {
    label: "Not at all",
    value: "Not at all",
  },
];
export const Step1 = () => {
  return (
    <Question
      aboveQuestionText="These questions, in combination with the Metabolic Profiling kit sent to you, help us determine your metabolic profile in order to understand which medications will be most effective for you. Once we get the results of your metabolic kit we’ll share a detailed report on your personal metabolic profile!"
      questionText="I feel tense or 'wound up':"
      input={
        <SelectInput
          cache
          name="tenseLevel"
          placeholder="Select an option..."
          options={tenseOptions}
        />
      }
    />
  );
};
Step1.validation = Yup.object().shape({
  tenseLevel: Yup.string().required("Please select a value"),
});

const frightenedLevelOptions = [
  {
    label: "Very definitely and quite badly",
    value: "Very definitely and quite badly",
  },
  {
    label: "Yes, but not too badly",
    value: "Yes, but not too badly",
  },
  {
    label: "A little, but it doesn't worry me",
    value: "A little, but it doesn't worry me",
  },
  {
    label: "Not at all",
    value: "Not at all",
  },
];
export const Step2 = () => {
  return (
    <Question
      questionText="I get a sort of frightened feeling as if something awful is about to happen"
      input={
        <SelectInput
          cache
          name="frightenedLevel"
          placeholder="Select an option..."
          options={frightenedLevelOptions}
        />
      }
    />
  );
};
Step2.validation = Yup.object().shape({
  frightenedLevel: Yup.string().required("Please select a value"),
});

const worryAmountOptions = [
  {
    label: "A great deal of the time",
    value: "A great deal of the time",
  },
  {
    label: "A lot of the time",
    value: "A lot of the time",
  },
  {
    label: "From time to time, but not too often",
    value: "From time to time, but not too often",
  },
  {
    label: "Only occasionally",
    value: "Only occasionally",
  },
];
export const Step3 = () => {
  return (
    <Question
      questionText="Worrying thoughts go through my mind"
      input={
        <SelectInput
          cache
          name="worryAmount"
          placeholder="Select an option..."
          options={worryAmountOptions}
        />
      }
    />
  );
};
Step3.validation = Yup.object().shape({
  worryAmount: Yup.string().required("Please select a value"),
});

const easeFrequencyOptions = [
  {
    label: "Definitely",
    value: "Definitely",
  },
  {
    label: "Usually",
    value: "Usually",
  },
  {
    label: "Not Often",
    value: "Not Often",
  },
  {
    label: "Not at all",
    value: "Not at all",
  },
];
export const Step4 = () => {
  return (
    <Question
      questionText="Only occasionally I can sit at ease and feel relaxed"
      input={
        <SelectInput
          cache
          name="easeFrequency"
          placeholder="Select an option..."
          options={easeFrequencyOptions}
        />
      }
    />
  );
};
Step4.validation = Yup.object().shape({
  easeFrequency: Yup.string().required("Please select a value"),
});

const frightenedFrequencyOptions = [
  {
    label: "Not at all",
    value: "Not at all",
  },
  {
    label: "Occasionally",
    value: "Occasionally",
  },
  {
    label: "Quite Often",
    value: "Quite Often",
  },
  {
    label: "Very Often",
    value: "Very Often",
  },
];
export const Step5 = () => {
  return (
    <Question
      questionText="I get a sort of frightened feeling like 'butterflies' in the stomach"
      input={
        <SelectInput
          cache
          name="frightenedFrequency"
          placeholder="Select an option..."
          options={frightenedFrequencyOptions}
        />
      }
    />
  );
};
Step5.validation = Yup.object().shape({
  frightenedFrequency: Yup.string().required("Please select a value"),
});

const restlessAmountOptions = [
  {
    label: "Very much indeed",
    value: "Very much indeed",
  },
  {
    label: "Quite a lot",
    value: "Quite a lot",
  },
  {
    label: "Not very much",
    value: "Not very much",
  },
  {
    label: "Not at all",
    value: "Not at all",
  },
];
export const Step6 = () => {
  return (
    <Question
      questionText="I feel restless as I have to be on the move"
      input={
        <SelectInput
          cache
          name="restlessAmount"
          placeholder="Select an option..."
          options={restlessAmountOptions}
        />
      }
    />
  );
};
Step6.validation = Yup.object().shape({
  restlessAmount: Yup.string().required("Please select a value"),
});

const panicFrequencyOptions = [
  {
    label: "Very often indeed",
    value: "Very often indeed",
  },
  {
    label: "Quite often",
    value: "Quite often",
  },
  {
    label: "Not very often",
    value: "Not very often",
  },
  {
    label: "Not at all",
    value: "Not at all",
  },
];
export const Step7 = () => {
  return (
    <Question
      questionText="I get sudden feelings of panic"
      input={
        <SelectInput
          cache
          name="panicFrequency"
          placeholder="Select an option..."
          options={panicFrequencyOptions}
        />
      }
    />
  );
};
Step7.validation = Yup.object().shape({
  panicFrequency: Yup.string().required("Please select a value"),
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
    beforePrev,
    beforeNext,
  },
];
