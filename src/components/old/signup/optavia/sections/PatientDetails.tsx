import { NumberInput } from "@src/components/inputs/NumbeInput";
import { CheckboxGroup } from "@src/components/inputs/CheckBoxGroup";

const PatientDetails = () => {
  return (
    <div>
      <h3 className="text-xl text-brand-berry font-bold mb-4 mx-4">
        Patient Details
      </h3>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Your Height<span className="text-[red]">*</span>
            </p>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <NumberInput
                  name="feet"
                  placeholder="feet"
                  type="tel"
                  position="right"
                />
                <span className="text-primary-700 font-bold">ft.</span>
              </div>
              <div className="flex gap-2 items-center">
                <NumberInput
                  name="heightInches"
                  placeholder="inches"
                  type="tel"
                  position="right"
                />
                <span className="text-primary-700 font-bold">in.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-32">
            <p className="text-primary-700 font-bold">
              Your Weight<span className="text-[red]">*</span>
            </p>
            <div className="flex gap-2 items-center">
              <NumberInput
                name="weight"
                placeholder="pounds"
                type="tel"
                position="right"
              />
              <span className="text-primary-700 font-bold">lbs.</span>
            </div>
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
                "Lifestyle change programs  (Weight Watchers, Noom, etc.)",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails;
