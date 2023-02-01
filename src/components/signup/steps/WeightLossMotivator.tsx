import { useField } from "formik";
import React from "react";
import { SelectInput } from "../../inputs/SelectInput";

export const WeightLossMotivator = () => {
  const [, { value }] = useField("fullName");

  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Nice to meet you,{" "}
        <span className="capitalize">{value.split(" ")[0]}</span>!
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">
          What is your primary weight loss motivator?
        </p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="weightLossMotivator"
          placeholder="Select an option..."
          options={[
            {
              label: "I'm struggling with losing weight and keeping it off",
              value: "I'm struggling with losing weight and keeping it off",
            },
            {
              label: "I want to improve my overall health",
              value: "I want to improve my overall health",
            },
            {
              label: "I want to do a better job of being healthy for my family",
              value: "I want to do a better job of being healthy for my family",
            },
            {
              label: "I've tried other programs that just haven't worked",
              value: "I've tried other programs that just haven't worked",
            },
            {
              label:
                "My doctor told me to lose weight and I didn't know where to start",
              value:
                "My doctor told me to lose weight and I didn't know where to start",
            },
          ]}
        />
      </div>
    </div>
  );
};
