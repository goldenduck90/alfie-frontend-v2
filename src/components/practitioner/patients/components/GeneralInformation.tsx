import React, { useState } from "react";
import dayjs from "dayjs";
import { FormikProvider, useFormik } from "formik";

import { TableUserObject } from "./TableUserObject";
import { InformationForm } from "./InformationForm";
import { User } from "@src/graphql/generated";
import { PatientUpdateInput } from "@src/graphql/generated";
import { Button } from "@src/components/ui/Button";

export function GeneralInformation({
  patient,
  patientLoading,
}: {
  patient: User;
  patientLoading?: boolean;
}) {
  const defaultInput: PatientUpdateInput = {
    name: patient?.name || "",
    dateOfBirth: patient?.dateOfBirth || new Date().toLocaleDateString(),
    email: patient?.email || "",
    phone: patient?.phone.substring(2) || "",
    address: {
      city: patient?.address.city || "",
      line1: patient?.address.line1 || "",
      line2: patient?.address.line2 || "",
      postalCode: patient?.address.postalCode || "",
      state: patient?.address.state || "",
    },
    heightInInches: patient?.heightInInches || 0,
    weightInLbs: patient?.weights?.[patient.weights.length - 1]?.value || 0,
    patientId: patient?._id || "",
    gender: patient?.gender || "Male",
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const patientImages =
    patient?.files?.filter(
      ({ signedUrl, contentType }) => signedUrl && contentType.includes("image")
    ) ?? [];

  const patientTable = {
    "Full Name": patient?.name,
    "Date of Birth": dayjs(patient?.dateOfBirth, { utc: true }).format(
      "MM/DD/YYYY"
    ),
    "Email Address": patient?.email,
    "Phone Number": patient?.phone,
    "Address": `${patient?.address?.line1 || ""}, ${
      (patient?.address?.line2 && ",") || ""
    } ${patient?.address?.city}, ${patient?.address?.state}, ${
      patient?.address?.postalCode
    }`,
    "Height In Inches": patient?.heightInInches,
    "Weight": patient?.weights?.[patient.weights.length - 1]?.value,
    "Attachments":
      patientImages.length > 0 ? (
        <div
          style={{ display: "flex", gap: 10, overflowY: "auto", padding: 6 }}
        >
          {patientImages.map(({ signedUrl, key }, idx) => (
            <img
              key={idx}
              src={signedUrl}
              alt={key}
              title={key}
              style={{ objectFit: "contain", maxHeight: 200 }}
            />
          ))}
        </div>
      ) : (
        "No Attachments"
      ),
    "Payment Method": patient?.stripeSubscriptionId
      ? "Cash Pay"
      : "Insurance Pay",
    "Signup Partner": patient?.signupPartner?.title ?? "N/A",
  };

  const patientForm = useFormik({
    initialValues: defaultInput,
    enableReinitialize: true,

    onSubmit: async (values) => {
      // console.log(values);
      setIsEdit(false);
    },
  });

  const { isSubmitting, submitForm } = patientForm;

  return (
    <FormikProvider value={patientForm}>
      <div className="mt-4">
        <div className="flex justify-end">
          {isEdit ? (
            <div className="flex gap-3">
              <Button
                buttonType={"primary"}
                onClick={submitForm}
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                buttonType={"secondary"}
                onClick={() => {
                  setIsEdit(false);
                  patientForm.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          )}
        </div>
        {isEdit && !patientLoading ? (
          <InformationForm addressValues={patientForm.values.address} />
        ) : (
          <TableUserObject user={patientTable} loading={patientLoading} />
        )}
      </div>
    </FormikProvider>
  );
}
