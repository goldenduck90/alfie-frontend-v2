import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { differenceInYears } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";

import { TableUserObject } from "./TableUserObject";
import { InformationForm } from "./InformationForm";
import { User } from "@src/graphql/generated";
import { PatientUpdateInput } from "@src/graphql/generated";
import { Button } from "@src/components/ui/Button";

import { useNotificationStore } from "@src/hooks/useNotificationStore";

export function GeneralInformation({
  patient,
  patientLoading,
}: {
  patient: User;
  patientLoading?: boolean;
}) {
  const { addNotification } = useNotificationStore();

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
            <Image
              height={200}
              width={400}
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

  const patientInfoSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Please enter full name.")
      .required("Please enter full name.")
      .matches(
        /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/,
        "Please enter a valid full name. ie. John Smith"
      ),
    dateOfBirth: Yup.date()
      .required("Please enter a date of birth.")
      .test("dateOfBirth", "It must be at least 18 years old.", (value) => {
        return differenceInYears(new Date(), new Date(value || "")) >= 18;
      }),
    email: Yup.string()
      .required("Please enter an email address.")
      .email("Please enter a valid email address."),
    phone: Yup.string()
      .required("Please enter a phone number.")
      .test("phone", "Please enter a valid phone number.", (value) => {
        return isValidPhoneNumber(value ?? "", "US");
      }),
    gender: Yup.string().required("Please select an option."),
    address: Yup.object().shape({
      line1: Yup.string().required("Please enter an address."),
      city: Yup.string().required("Please enter a city."),
      state: Yup.string().required("Please enter a state."),
      postalCode: Yup.string().required("Please enter a zip code."),
    }),

    heightInInches: Yup.number()
      .required("Please enter a height.")
      .min(48, "Please enter a valid height.")
      .max(107, "Please enter a valid height."),
    weightInLbs: Yup.number()
      .required("Please provide a weight.")
      .min(80, "The weight must be greater than or equal to 80.")
      .max(800, "The weight must be less than or equal to 800."),
  });

  const patientForm = useFormik({
    initialValues: defaultInput,
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: patientInfoSchema,
    onSubmit: async (values) => {
      // console.log(values);

      setIsEdit(false);
      addNotification({
        description: "Patient information successfully updated.",
        id: "update-patient-info-success",
        type: "success",
        title: "Success",
      });
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
