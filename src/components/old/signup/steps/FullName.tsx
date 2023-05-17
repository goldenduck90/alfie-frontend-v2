import React from "react";
import { TextInput } from "../../../inputs/TextInput";

export const FullName: React.FC = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        At Alfie, your treatment is personalized to target the underlying causes
        of obesity, rather than giving you generic advice.
      </p>

      <div className="flex-flex-col mb-3">
        <p className="text-primary-700 font-bold">What is your full name?</p>
      </div>

      <div className="pb-2">
        <TextInput
          name="fullName"
          placeholder="My full name is (First Last)..."
          type="text"
        />
      </div>
    </div>
  );
};
