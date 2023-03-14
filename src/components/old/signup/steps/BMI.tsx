import React, { useRef } from "react";
import { useField } from "formik";
import { NumberInput } from "../../../inputs/NumbeInput";

export const BMI = () => {
  const fullName = localStorage.getItem("fullName") || "";
  const [, { error: feetError }] = useField("heightFeet");
  const [, { error: inchError }] = useField("heightInches");
  const heightInchesRef = useRef(null);
  const weightRef = useRef(null);

  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Great work, {fullName.split(" ")[0]}! Now lets calculate your BMI, one
        of the many ways we analyze your specific metabolic profile.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">How tall are you?</p>
      </div>

      <div className="pb-2">
        <div className="flex flex-row space-x-5">
          <NumberInput
            name="heightFeet"
            placeholder="5"
            type="tel"
            maxLength={1}
            position="right"
            addonText="ft"
            showError={false}
            nextFieldRef={heightInchesRef}
          />
          <NumberInput
            inputRef={heightInchesRef}
            name="heightInches"
            placeholder="8"
            type="tel"
            maxLength={2}
            position="right"
            addonText="in"
            showError={false}
            nextFieldRef={weightRef}
          />
        </div>
        {(feetError || inchError) && (
          <span className="text-red-500 text-sm">{feetError || inchError}</span>
        )}
      </div>

      <div className="flex-flex-col mt-6 mb-5">
        <p className="font-mulish text-gray-900">How much do you weight?</p>
      </div>

      <div className="pb-2">
        <NumberInput
          inputRef={weightRef}
          name="weight"
          placeholder="250"
          type="tel"
          position="right"
          addonText="lbs"
        />
      </div>
    </div>
  );
};
