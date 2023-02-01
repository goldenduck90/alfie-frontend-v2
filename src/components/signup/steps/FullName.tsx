import React from "react";
import { TextInput } from "../../inputs/TextInput";

export const FullName = () => {
  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Let&apos;s answer a few questions to see how much you can lose with
        Alfie.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">What is your full name?</p>
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
