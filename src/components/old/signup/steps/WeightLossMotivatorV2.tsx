import React from "react";
import { CheckboxGroup } from "@src/components/inputs/CheckBoxGroup";

export const WeightLossMotivatorV2: React.FC = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Our care team’s goal is to meet you where you are in your journey and
        provide 1 on 1 personalized support to help you achieve your goals.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">
          What are your weight management goals? (select all that apply)
        </p>
      </div>

      <div className="pb-2">
        <CheckboxGroup
          name="weightLossMotivatorV2"
          items={[
            "Lose weight and keep it off for good.",
            "Improve my overall health.",
            "Do a better job of being healthy for my family and others.",
            "Find a program that actually works for me.",
          ]}
        />
      </div>
    </div>
  );
};
