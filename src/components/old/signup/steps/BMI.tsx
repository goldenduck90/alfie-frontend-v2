import React, { useRef } from 'react';
import { useField } from 'formik';
import { NumberInput } from '../../../inputs/NumbeInput';

export const BMI = () => {
  const fullName = localStorage.getItem('fullName') || '';
  const [, { error: feetError }] = useField('heightFeet');
  const [, { error: inchError }] = useField('heightInches');
  const heightInchesRef = useRef(null);
  const weightRef = useRef(null);

  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Let’s calculate your BMI.
        <br />
        <br />
        BMI is one of the many metrics that we use to determine which treatment
        option is right for you.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">How tall are you?</p>
      </div>

      <div className="pb-2">
        <div className="flex flex-row space-x-5">
          <div className="flex w-full items-center gap-2 max-w-[10rem]">
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
          <div className="flex w-full items-center gap-2 max-w-[10rem]">
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
          <span className="text-red-500 text-sm">{feetError || inchError}</span>
        )}
      </div>

      <div className="flex-flex-col mt-6 mb-5">
        <p className="text-primary-700 font-bold">How much do you weight?</p>
      </div>

      <div className="pb-2">
        <div className="flex w-full items-center gap-2 max-w-[10rem]">
          <NumberInput
            inputRef={weightRef}
            name="weight"
            placeholder="250"
            type="tel"
            position="right"
          />
          <span className="text-primary-700 font-bold">lbs.</span>
        </div>
      </div>
    </div>
  );
};
