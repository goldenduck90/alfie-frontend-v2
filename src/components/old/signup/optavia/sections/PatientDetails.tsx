import { useRef } from "react";
import { useField } from "formik";
import { NumberInput } from "@src/components/inputs/NumbeInput";
import { CheckboxGroup } from "@src/components/inputs/CheckBoxGroup";

const PatientDetails = () => {
  const [, { error: feetError }] = useField("heightFeet");
  const [, { error: inchError }] = useField("heightInches");
  const [, { error: weightError }] = useField("weight");
  const heightInchesRef = useRef(null);
  const weightRef = useRef(null);

  return (
    <div>
      <h3 className="text-xl text-brand-berry font-bold mb-4 mx-4">
        Patient Details
      </h3>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Your Height<span className="text-[red]">*</span>
            </p>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <NumberInput
                  name="heightFeet"
                  placeholder="5"
                  type="tel"
                  maxLength={1}
                  position="right"
                  showError={false}
                  nextFieldRef={heightInchesRef}
                />
                <span className="text-primary-700 font-bold">ft.</span>
              </div>
              <div className="flex gap-2 items-center">
                <NumberInput
                  inputRef={heightInchesRef}
                  name="heightInches"
                  placeholder="8"
                  type="tel"
                  maxLength={2}
                  position="right"
                  showError={false}
                  nextFieldRef={weightRef}
                />
                <span className="text-primary-700 font-bold">in.</span>
              </div>
            </div>
            {(feetError || inchError) && (
              <span className="text-red-500 text-sm">
                {feetError || inchError}
              </span>
            )}
          </div>
          <div className="flex flex-col w-32">
            <p className="text-primary-700 font-bold">
              Your Weight<span className="text-[red]">*</span>
            </p>
            <div className="flex gap-2 items-center">
              <NumberInput
                inputRef={weightRef}
                name="weight"
                placeholder="250"
                type="tel"
                position="right"
                showError={false}
              />
              <span className="text-primary-700 font-bold">lbs.</span>
            </div>
            {weightError && (
              <span className="text-red-500 text-sm">{weightError}</span>
            )}
          </div>
        </div>
        <div className="flex gap-16 w-full">
          <div className="flex flex-col">
            <p className="text-primary-700 font-bold mb-2">
              Which of the following have you tried? (select all that apply)
              <span className="text-[red]">*</span>
            </p>
            <CheckboxGroup
              name="pastTries"
              items={[
                "Calorie counting or calorie restricting",
                "Using a diet (keto, intermittent fasting, etc.)",
                "Meal replacements (e.g. Huel)",
                "Lifestyle change programs  (Optavia)",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails;
