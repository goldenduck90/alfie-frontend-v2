import * as Yup from "yup";
import { TextInput } from "@src/components/inputs/TextInput";
import { SelectInput, OptionInput } from "@src/components/inputs/SelectInput";
import { Button } from "@src/components/ui/Button";

import { useFormik, FormikProvider } from "formik";
import { InsuranceTypes, InsurancePlans } from "@src/utils/insurance";

import { useEffect, useState } from "react";
import {
  Insurance,
  InsurancePlan,
  InsuranceType,
} from "@src/graphql/generated";

type ManualFormProps = {
  insurance?: Insurance;
  plans: InsurancePlan[];
  types: InsuranceType[];
  onSubmit: (insurance: Insurance) => Promise<void>;
};

const ManualForm = ({ insurance, plans, types }: ManualFormProps) => {
  const [planOptions, setPlanOptions] = useState<OptionInput[]>([]);
  const [typeOptions, setTypeOptions] = useState<OptionInput[]>([]);

  useEffect(() => {
    const otherPlan = plans.find((plan) => plan.value === "Other");
    const sortedPlans = plans
      .filter((plan) => plan.value !== "Other")
      .sort((a, b) => a.value.localeCompare(b.value));
    if (otherPlan) {
      sortedPlans.push(otherPlan);
    }
    setPlanOptions(
      sortedPlans.map((plan) => ({
        label: plan.name ?? "",
        value: plan.value,
      }))
    );
  }, [plans]);

  useEffect(() => {
    console.log(insurance);
  }, [insurance]);

  useEffect(() => {
    const governmentType = types.find((type) => type.type === "Government");
    const sortedTypes = types
      .filter((type) => type.type !== "Government")
      .sort((a, b) => a.type.localeCompare(b.type));
    if (governmentType) {
      sortedTypes.push(governmentType);
    }
    setTypeOptions(
      sortedTypes.map((type) => ({
        label: type.name ?? "",
        value: type.type,
      }))
    );
  }, [types]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      insurancePlan: insurance?.insuranceCompany,
      insuranceType: insurance?.groupName,
      groupId: insurance?.groupId,
      memberId: insurance?.memberId,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      insurancePlan: Yup.string().test(
        "insurancePlan",
        "Please select your insurance plan.",
        (value) => {
          return planOptions
            .map((option) => option.value)
            .includes(value ?? "");
        }
      ),
      insuranceType: Yup.string().test(
        "insuranceType",
        "Please select your insurance type.",
        (value) => {
          return typeOptions
            .map((option) => option.value)
            .includes(value ?? "");
        }
      ),
      groupId: Yup.string().required("Group ID / Number is required"),
      memberId: Yup.string().required("Member ID  is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log({ ...insurance, ...values });
      resetForm();
    },
  });

  return (
    <div className="w-full">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8 px-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col w-full">
                <p className={`"text-primary-700" font-bold`}>
                  Insurance Provider
                  <span className="text-[red]">*</span>
                </p>
                <SelectInput
                  name="insurancePlan"
                  placeholder="Select"
                  options={planOptions}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className={`"text-primary-700" font-bold`}>
                  Plan Type
                  <span className="text-[red]">*</span>
                </p>
                <SelectInput
                  name="insuranceType"
                  placeholder="Select"
                  options={typeOptions}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className={`"text-primary-700" font-bold`}>
                  Group ID / Number
                  <span className="text-[red]">*</span>
                </p>
                <TextInput
                  name="groupId"
                  placeholder="Your Group ID / Number"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full">
                <p className={`"text-primary-700" font-bold`}>
                  Member ID
                  <span className="text-[red]">*</span>
                </p>
                <TextInput
                  name="memberId"
                  placeholder="Your Member ID"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-center">
                  <Button type="submit" size="medium">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default ManualForm;
