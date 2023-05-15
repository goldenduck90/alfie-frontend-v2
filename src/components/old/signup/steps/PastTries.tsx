import React from 'react';
import { CheckboxGroup } from '@src/components/inputs/CheckBoxGroup';

export const PastTries: React.FC = () => {
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Losing weight is hard. Understanding what you’ve tried before helps us
        know what may have worked and what didn’t for you.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">
          Which of the following have you tried? (select all that apply)
        </p>
      </div>

      <div className="pb-2">
        <CheckboxGroup
          name="pastTries"
          items={[
            'Calorie counting or calorie restricting',
            'Using a diet (keto, intermittent fasting, etc.)',
            'Meal replacements (e.g. Huel)',
            'Lifestyle change programs  (Weight Watchers, Noom, etc.)',
          ]}
        />
      </div>
    </div>
  );
};
