import React, { useState } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { TableUserObject } from "./TableUserObject";
import { InformationForm } from "./InformationForm";
import { Provider } from "@src/graphql/generated";
import { ProviderUpdateInput } from "@src/graphql/generated";
import { Button } from "@src/components/ui/Button";

import { useNotificationStore } from "@src/hooks/useNotificationStore";

export function GeneralInformation({
  provider,
  loading,
}: {
  provider: Provider;
  loading?: boolean;
}) {
  const { addNotification } = useNotificationStore();

  const defaultInput: ProviderUpdateInput = {
    firstName: provider?.firstName || "",
    lastName: provider?.lastName || "",
    email: provider?.email || "",
    npi: provider?.npi || "",
    numberOfPatients: provider?.numberOfPatients || 0,
    licensedStates: provider?.licensedStates || [],
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const providerTable = {
    "Full Name": provider?.firstName + " " + provider?.lastName,
    "Email Address": provider?.email,
    "Licensed States": provider?.licensedStates.join(", "),
    "NPI": provider?.npi,
    "Number of Patients": provider?.numberOfPatients,
  };

  const providerInfoSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, "Please enter first name.")
      .required("Please enter first name.")
      .matches(
        /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/,
        "Please enter a valid first name. ie. John"
      ),
    lastName: Yup.string()
      .min(4, "Please enter last name.")
      .required("Please enter last name.")
      .matches(
        /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/,
        "Please enter a valid last name. ie. John Smith"
      ),
    licensedStates: Yup.array()
      .of(
        Yup.string().required("State is required")
        // You can include more string validations here if needed
      )
      .required("Please provide licensed states.")
      .min(1, "At least one licensed state is required."),
    // You can include more array validations here if needed
    email: Yup.string()
      .required("Please enter an email address.")
      .email("Please enter a valid email address."),
    npi: Yup.string()
      .required("Please enter a NPI.")
      .matches(/^\d{10}$/, "Please enter a valid NPI."),
    numberOfPatients: Yup.number()
      .required("Please provide a number of providers.")
      .min(0, "The weight must be greater than or equal to 0."),
  });

  const providerForm = useFormik({
    initialValues: defaultInput,
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: providerInfoSchema,
    onSubmit: async (values) => {
      // console.log(values);

      setIsEdit(false);
      addNotification({
        description: "Provider information successfully updated.",
        id: "update-provider-info-success",
        type: "success",
        title: "Success",
      });
    },
  });

  const { isSubmitting, submitForm, dirty, resetForm } = providerForm;

  return (
    <FormikProvider value={providerForm}>
      <div className="mt-4">
        <div className="flex justify-end">
          {isEdit ? (
            <div className="flex gap-3">
              <Button
                buttonType={"primary"}
                onClick={submitForm}
                disabled={isSubmitting || !dirty} // Disable if submitting or no changes
              >
                Save
              </Button>
              <Button
                buttonType={"secondary"}
                onClick={() => {
                  setIsEdit(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          )}
        </div>
        {isEdit && !loading ? (
          <InformationForm
            licensedStates={providerForm.values.licensedStates}
          />
        ) : (
          <TableUserObject user={providerTable} loading={loading} />
        )}
      </div>
    </FormikProvider>
  );
}
