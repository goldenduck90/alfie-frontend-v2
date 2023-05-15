import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { RadioGroupInput } from '@src/components/questionnaire/common';

export const HealthInsurance: React.FC = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Alfie Health doctor visits and medications that you may be prescribed
        are covered by many health insurance plans.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">
          Please select your health insurance
        </p>
      </div>

      <div className="pb-2">
        {/**
         <RadioGroupInput
          name="healthInsurance"
          options={[
            'My whole life',
            'Several years',
            '6-12 Months',
            'Less than 6 Months',
            `I've never tried to lose weigth before`,
          ]}
        />
         */}
      </div>
    </div>
  );
};
