import React from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { TextInput } from "@src/components/inputs/TextInput";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { Button } from "@src/components/ui/Button";
import { Loading } from "../Loading";
import {
  Insurance,
  InsuranceType,
} from "@src/graphql/generated";

type ManualFormProps = {
  insuranceId: string;
  type: InsuranceType;
  memberId: string;
  groupId: string;
  insurances: Insurance[];
  onSubmit: ({
    insuranceId,
    type,
    groupId,
    memberId,
  }: {
    insuranceId: string;
    type: InsuranceType;
    groupId: string;
    memberId: string;
  }) => Promise<boolean>;
};

const ManualForm = ({ insurances, insuranceId, type, groupId, memberId, onSubmit }: ManualFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      insuranceId,
      type,
      groupId,
      memberId,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      insuranceId: Yup.string().test(
        "insuranceId",
        "Please select your insurance plan.",
        (value) => {
          return insurances
            .map((i) => i._id)
            .includes(value || "");
        }
      ),
      type: Yup.string().test(
        "type",
        "Please select your insurance type.",
        (value) => {
          if (!value) return false;

          const isValueInEnum = Object.values(InsuranceType).includes(value as InsuranceType);
          return isValueInEnum;
        }
      ),
      groupId: Yup.string().required("Group ID / Number is required"),
      memberId: Yup.string().required("Member ID  is required"),
    }),
    onSubmit: async ({ insuranceId, type, groupId, memberId }, { resetForm }) => {
      const result = await onSubmit({
        insuranceId,
        type,
        memberId,
        groupId,
      });

      if (result) {
        resetForm();
      }
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
                  name="insuranceId"
                  placeholder="Select Plan"
                  options={insurances.map((i) => ({
                    value: i._id,
                    label: i.name,
                    selected: formik.values.insuranceId === i._id,
                  }))}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className={`"text-primary-700" font-bold`}>
                  Plan Type
                  <span className="text-[red]">*</span>
                </p>
                <SelectInput
                  name="type"
                  placeholder="Select Type"
                  options={Object.values(InsuranceType).map((t) => ({
                    value: t,
                    label: t,
                    selected: formik.values.type === t,
                  }))}
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
                    {formik.isSubmitting ? <Loading size={20} /> : "Submit"}
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
