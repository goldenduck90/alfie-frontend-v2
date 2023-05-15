import React from 'react';
import { SelectInput } from '../../../inputs/SelectInput';

export const BiologicalSex = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Metabolic health and genetics go hand in hand. Understanding your sex at
        birth helps us know which treatment plans may be right for you.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">
          What was your assigned sex at birth?
        </p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="biologicalSex"
          placeholder="Select an option..."
          options={[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ]}
        />
      </div>
      <p className="text-gray-500 font-semibold text-sm mt-8">
        Your data’s security is our top priority. This information is passed
        securely to the provider and is needed for them to provide care and is
        never shared outside of Alfie Health.
      </p>
    </div>
  );
};
