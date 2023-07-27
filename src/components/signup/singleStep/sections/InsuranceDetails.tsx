import { SelectInput } from "@src/components/inputs/SelectInput";
import { InsuranceTypes, InsurancePlans } from "@src/utils/insurance";
import { Checkbox } from "../../../inputs/Checkbox";
import { useField } from "formik";

const InsuranceDetails = () => {
  const [, { value: skipInsurance }] = useField("skipInsurance");

  return (
    <div>
      <h3 className="text-xl text-brand-berry font-bold mb-4 mx-4">
        Insurance Details
      </h3>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
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
      </div>
      <div className="mx-6 my-2">
        <Checkbox name="skipInsurance" label="I don't have insurance" />
      </div>
    </div>
  );
};
export default InsuranceDetails;
