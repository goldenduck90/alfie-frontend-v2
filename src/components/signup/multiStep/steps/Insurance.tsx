import React, { useEffect } from "react";
import { useField } from "formik";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { InsuranceTypes, InsurancePlans } from "@src/utils/insurance";
import { Checkbox } from "@src/components/inputs/Checkbox";

export const HealthInsurance: React.FC = () => {
  const [, { value: skipInsurance }] = useField("skipInsurance");
  const [, , { setValue: setInsurancePlan }] = useField("insurancePlan");
  const [, , { setValue: setInsuranceType }] = useField("insuranceType");

  useEffect(() => {
    if (!skipInsurance) {
      setInsurancePlan("");
      setInsuranceType("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipInsurance]);

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
          <p
            className={`${
              skipInsurance ? "text-gray-500" : "text-primary-700"
            } font-bold`}
          >
            Insurance Plan
            {!skipInsurance && <span className="text-[red]">*</span>}
          </p>
          <SelectInput
            name="insurancePlan"
            placeholder="Select"
            disabled={skipInsurance}
            options={InsurancePlans}
          />
        </div>

        <div className="flex flex-col w-64">
          <p
            className={`${
              skipInsurance ? "text-gray-500" : "text-primary-700"
            } font-bold`}
          >
            Plan Type
            {!skipInsurance && <span className="text-[red]">*</span>}
          </p>
          <SelectInput
            name="insuranceType"
            placeholder="Select"
            disabled={skipInsurance}
            options={InsuranceTypes}
          />
        </div>
      </div>
      <div className="mx-2 my-2">
        <Checkbox name="skipInsurance" label="I don't have insurance" />
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
