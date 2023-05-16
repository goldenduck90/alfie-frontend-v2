import React, { useState } from 'react';
import { useFormikContext, useField } from 'formik';
import * as RadioGroup from '@radix-ui/react-radio-group';

const options = [
  'Employer provided / Commercial (Aetna, United, BCBS, etc.)',
  'Kaiser Permanente',
  'Medicare or Medicare Advantage',
  'Medicaid',
  'None',
  'Don’t know / unsure',
];

export const HealthInsurance: React.FC = () => {
  const [, { error: insuranceError }] = useField('healthInsurance');
  const healthInsurance = localStorage.getItem('healthInsurance') || '';
  const { setFieldValue } = useFormikContext();

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
        <RadioGroup.Root
          className="flex flex-col gap-2"
          defaultValue={healthInsurance}
          onValueChange={(val) => setFieldValue('healthInsurance', val)}
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <RadioGroup.Item
                className="relative w-[18px] h-[18px] min-w-[18px] bg-white border border-[#CBD5E1] rounded-full cursor-pointer"
                value={option}
                id={`health-insurance-option-${index}`}
              >
                <RadioGroup.Indicator className="absolute bg-primary-700 w-[8px] h-[8px] rounded-full top-[4px] left-[4px]" />
              </RadioGroup.Item>
              <label
                className="pl-[16px] text-[16px] text-secondary-500 cursor-pointer select-none"
                htmlFor={`health-insurance-option-${index}`}
              >
                {option}
              </label>
            </div>
          ))}
        </RadioGroup.Root>
        {insuranceError && (
          <span className="text-red-500 text-sm">{insuranceError}</span>
        )}
      </div>
    </div>
  );
};
