import * as Yup from "yup";
import { TextInput } from "@src/components/inputs/TextInput";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { Button } from "@src/components/ui/Button";

import { useFormik, FormikProvider } from "formik";
import { InsuranceTypes, InsurancePlans } from "@src/utils/insurance";

const ManualForm = () => {
  const formik = useFormik({
    initialValues: {
      insurancePlan: "",
      insuranceType: "",
      groupId: "",
      memberId: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      insurancePlan: Yup.string().required(
        "Please select your insurance plan."
      ),
      insuranceType: Yup.string().required(
        "Please select your insurance type."
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
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
                  options={InsurancePlans}
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
                  options={InsuranceTypes}
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
