import { FormikProps, FormikValues } from "formik"
import * as Yup from "yup"
import { SelectInput } from "../../../../components/inputs/SelectInput"
import { parseCachedVal } from "../../helpers"
import { Question } from "../../Question"

export const initialValues = {
  painOrDiscomfort: parseCachedVal(localStorage.painOrDiscomfort, ""),
  heartburn: parseCachedVal(localStorage.heartburn, ""),
  acidReflux: parseCachedVal(localStorage.acidReflux, ""),
  hungerPains: parseCachedVal(localStorage.hungerPains, ""),
  nausea: parseCachedVal(localStorage.nausea, ""),
  bloated: parseCachedVal(localStorage.bloated, ""),
  burping: parseCachedVal(localStorage.burping, ""),
  constipation: parseCachedVal(localStorage.constipation, ""),
  diarrhea: parseCachedVal(localStorage.diarrhea, ""),
  looseStools: parseCachedVal(localStorage.looseStools, ""),
  gas: parseCachedVal(localStorage.gas, ""),
  hardStools: parseCachedVal(localStorage.hardStools, ""),
  urgentBowel: parseCachedVal(localStorage.urgentBowel, ""),
  completeBowels: parseCachedVal(localStorage.completeBowels, ""),
}

type StepProps = (
  values: FormikValues,
  formikBag: FormikProps<FormikValues>,
  currentStepIndex: number
) => Promise<unknown>

export const beforePrev: StepProps = (_value, _params, currentStepIndex) => {
  _params.setErrors({})
  localStorage.setItem("gsrsStep", String(currentStepIndex - 1))
  return Promise.resolve()
}
export const beforeNext: StepProps = (_values, _params, currentStepIndex) => {
  localStorage.setItem("gsrsStrep", String(currentStepIndex + 1))
  return Promise.resolve()
}
const options = [
  {
    label: "No discomfort at all",
    value: "No discomfort at all",
  },
  {
    label: "Minor discomfort",
    value: "Minor discomfort",
  },
  {
    label: "Mild discomfort",
    value: "Mild discomfort",
  },
  {
    label: "Moderate discomfort",
    value: "Moderate discomfort",
  },
  {
    label: "Moderately severe discomfort",
    value: "Moderately severe discomfort",
  },
  {
    label: "Severe discomfort",
    value: "Severe discomfort",
  },
  {
    label: "Very severe discomfort",
    value: "Very severe discomfort",
  },
]

export const Step1 = () => {
  return (
    <Question
      aboveQuestionText="This survey contains questions about how you have been feeling and what it has been like during the last week."
      questionText="Have you been bothered by PAIN OR DISCOMFORT IN YOUR UPPER ABDOMEN OR THE PIT OF YOUR STOMACH during the past week?"
      input={
        <SelectInput
          cache
          name="painOrDiscomfort"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step1.validation = Yup.object().shape({
  painOrDiscomfort: Yup.string().required("Please select a value"),
})

export const Step2 = () => {
  return (
    <Question
      questionText="Have you been bothered by HEARTBURN during the past week? (By heartburn we mean an unpleasant stinging or burning sensation in the chest.)"
      input={
        <SelectInput
          cache
          name="heartBurn"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step2.validation = Yup.object().shape({
  heartBurn: Yup.string().required("Please select a value"),
})

export const Step3 = () => {
  return (
    <Question
      questionText="Have you been bothered by ACID REFLUX during the past week? (By acid reflux we mean the sensation of regurgitating small quantities of acid or flow of sour or bitter fluid from the stomach up the throat.)"
      input={
        <SelectInput
          cache
          name="acidReflux"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step3.validation = Yup.object().shape({
  acidReflux: Yup.string().required("Please select a value"),
})

export const Step4 = () => {
  return (
    <Question
      questionText="Have you been bothered by HUNGER PAINS in the stomach during the past week? (This hollow feeling in the stomach is associated with the need to eat between meals.)"
      input={
        <SelectInput
          cache
          name="hungerPains"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step4.validation = Yup.object().shape({
  hungerPains: Yup.string().required("Please select a value"),
})

export const Step5 = () => {
  return (
    <Question
      questionText="Have you been bothered by NAUSEA during the past week? (By nausea we mean a feeling or wanting to throw up or vomit.)"
      input={
        <SelectInput
          cache
          name="nausea"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step5.validation = Yup.object().shape({
  nausea: Yup.string().required("Please select a value"),
})

export const Step6 = () => {
  return (
    <Question
      questionText="Have you been bothered by RUMBLING in your stomach during the past week? (Rumbling refers to vibrations or noise in the stomach.)"
      input={
        <SelectInput
          cache
          name="rumbling"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step6.validation = Yup.object().shape({
  rumbling: Yup.string().required("Please select a value"),
})

export const Step7 = () => {
  return (
    <Question
      questionText="Has your stomach felt BLOATED during the past week? (Feeling bloated refers to swelling often associated with a sensation of gas or air in the stomach.)"
      input={
        <SelectInput
          cache
          name="bloated"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step7.validation = Yup.object().shape({
  bloated: Yup.string().required("Please select a value"),
})
export const Step8 = () => {
  return (
    <Question
      questionText="Have you been bothered by BURPING during the past week? (Burping refers to bringing up air or gas from the stomach via the mouth, often associated with easing a bloated feeling.)"
      input={
        <SelectInput
          cache
          name="burping"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step8.validation = Yup.object().shape({
  burping: Yup.string().required("Please select a value"),
})
export const Step9 = () => {
  return (
    <Question
      questionText="Have you been bothered by PASSING GAS OR FLATUS during the past week? (Passing gas or flatus refers to the release of air or gas from the bowel, often associated with easing a bloated feeling.)"
      input={
        <SelectInput
          cache
          name="gas"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step9.validation = Yup.object().shape({
  gas: Yup.string().required("Please select a value"),
})
export const Step10 = () => {
  return (
    <Question
      questionText="Have you been bothered by CONSTIPATION during the past week? (Constipation refers to a reduced ability to empty the bowels.)"
      input={
        <SelectInput
          cache
          name="constipation"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step10.validation = Yup.object().shape({
  constipation: Yup.string().required("Please select a value"),
})
export const Step11 = () => {
  return (
    <Question
      questionText="Have you been bothered by DIRRHEA during the past week? (Diarrhea refers to a too frequent release of the bowels.)"
      input={
        <SelectInput
          cache
          name="diarrhea"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step11.validation = Yup.object().shape({
  diarrhea: Yup.string().required("Please select a value"),
})
export const Step12 = () => {
  return (
    <Question
      questionText="Have you been bothered by LOOSE STOOLS during the pst week? (If your stools (motions) have been alterately hard and loose, this question only refers to the extent you have been bothered by the stools being loose.)"
      input={
        <SelectInput
          cache
          name="looseStools"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step12.validation = Yup.object().shape({
  looseStools: Yup.string().required("Please select a value"),
})
export const Step13 = () => {
  return (
    <Question
      questionText="Have you been bothered by HARD STOOLS during the past week? (If your stools (motions) have been alterately hard and loose, this question only refers to the extent you have been bothered by the stools being hard.)"
      input={
        <SelectInput
          cache
          name="hardStools"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step13.validation = Yup.object().shape({
  hardStools: Yup.string().required("Please select a value"),
})
export const Step14 = () => {
  return (
    <Question
      questionText="Have you been bothered by an URGENT NEED TO HAVE A BOWEL MOVEMENT during the past week? (This urgent need to go to the toilet is often associated with a feeling that you are not in full control.)"
      input={
        <SelectInput
          cache
          name="urgentBowel"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step14.validation = Yup.object().shape({
  urgentBowel: Yup.string().required("Please select a value"),
})
export const Step15 = () => {
  return (
    <Question
      questionText="When going to the toilet during the past week, have you had the SENSATION OF NOT COMPLETELY EMPTYING THE BOWELS? (This feeling of incomplete emptying means that you still feel a need to pass more stool despite having exerted yourself to do so.)"
      input={
        <SelectInput
          cache
          name="completeBowels"
          placeholder="Select an option..."
          options={options}
        />
      }
    />
  )
}
Step15.validation = Yup.object().shape({
  completeBowels: Yup.string().required("Please select a value"),
})
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
]
