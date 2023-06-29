import React from "react";
import { useFormikContext, useField } from "formik";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { InsuranceTypes, InsurancePlans } from "@src/utils/insurance";

const options = [
  "Employer provided / Commercial (Aetna, United, BCBS, etc.)",
  "Kaiser Permanente",
  "Medicare or Medicare Advantage",
  "Medicaid",
  "None",
  "Don’t know / unsure",
];

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

      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-64">
          <p className="text-primary-700 font-bold">
            Insurance Plan<span className="text-[red]">*</span>
          </p>
          <SelectInput
            name="insurancePlan"
            placeholder="Select"
            options={InsurancePlans}
          />
        </div>

        <div className="flex flex-col w-64">
          <p className="text-primary-700 font-bold">
            Plan Type<span className="text-[red]">*</span>
          </p>
          <SelectInput
            name="insuranceType"
            placeholder="Select"
            options={InsuranceTypes}
          />
        </div>
      </div>

      <div className="pb-2">
        <p className="text-gray-500 font-semibold text-sm mt-8">
          Your data’s security is our top priority. This information is passed
          securely to the provider and is needed for them to provide care and is
          never shared outside of Alfie Health.
        </p>
      </div>
    </div>
  );
};
