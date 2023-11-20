import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { differenceInYears } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";

import { TableUserObject } from "./TableUserObject";
import { InformationForm } from "./InformationForm";
import { Gender, ModifyPatientMutation, ModifyPatientMutationVariables, PatientModifyInput, Role, User } from "@src/graphql/generated";
import { Button } from "@src/components/ui/Button";

import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { convertInchesToFeetInches } from "@src/utils/height";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { wait } from "@src/utils/wait";
import { Router, useRouter } from "next/router";
import { useCheckRole } from "@src/hooks/useCheckRole";
import { useUserStateContext } from "@src/context/SessionContext";

const modifyPatientMutation = gql`
  mutation ModifyPatient($input: PatientModifyInput!) {
    internalPatientModify(input: $input)
  }
`;

export function GeneralInformation({
  patient,
  patientLoading,
  refetchPatient,
}: {
  patient: User;
  patientLoading?: boolean;
  refetchPatient: () => Promise<any>
}) {
  const router = useRouter();
  const session = useUserStateContext();
  const user = session[0]?.user;

  const { addNotification } = useNotificationStore();
  const [editPatient, { loading }] = useMutation<ModifyPatientMutation, ModifyPatientMutationVariables>(modifyPatientMutation);

  const defaultInput: PatientModifyInput = {
    name: patient?.name || "",
    dateOfBirth: patient?.dateOfBirth || new Date().toLocaleDateString(),
    email: patient?.email || "",
    phone: patient?.phone || "",
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
    gender: patient?.gender || Gender.Male,
    providerId: patient?.provider?._id,
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
    "Provider": `${patient?.provider?.firstName} ${patient?.provider?.lastName}`,
    "Address": `${patient?.address?.line1 || ""}, ${(patient?.address?.line2 && ",") || ""
      } ${patient?.address?.city}, ${patient?.address?.state}, ${patient?.address?.postalCode
      }`,
    "Gender": `${patient?.gender === Gender.Male ? "Male" : "Female"}`,
    "Height": convertInchesToFeetInches(patient?.heightInInches),
    "Weight": `${patient?.weights?.[patient.weights.length - 1]?.value}lbs`,
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
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      ),
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
    providerId: Yup.string().required("Please select a provider."),
  });

  const patientForm = useFormik({
    initialValues: defaultInput,
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: patientInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      // console.log(values);
      const resp = await editPatient({
        variables: {
          input: values
        }
      })

      if (resp.errors) {
        addNotification({
          description: "An error occured updating patient!",
          id: "update-patient-info-failure",
          type: "error",
          title: "Error",
        })
        return
      }

      console.log("REFETCHING PATIENT")
      await wait(2000);
      await refetchPatient();
      setSubmitting(false);
      setIsEdit(false);
      resetForm();
      addNotification({
        description: "Patient information successfully updated.",
        id: "update-patient-info-success",
        type: "success",
        title: "Success",
      });
      if (user?.role === Role.Practitioner && values.providerId !== defaultInput.providerId) {
        router.replace("/dashboard/patients?reload=true")
      }
    },
  });

  const { isSubmitting, submitForm, dirty, resetForm } = patientForm;

  return (
    <FormikProvider value={patientForm}>
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
        {isEdit && !patientLoading && patientForm.values.address ? (
          <InformationForm
            addressValues={patientForm.values.address}
            currentProviderId={patient?.provider?._id || ""}
          />
        ) : (
          <TableUserObject user={patientTable} loading={patientLoading} />
        )}
      </div>
    </FormikProvider>
  );
}
