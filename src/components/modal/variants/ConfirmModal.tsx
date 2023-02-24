import * as RadixDialog from "@radix-ui/react-dialog";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, useDialogToggle } from "../Dialog";
import { parseError } from "../../../utils/parseError";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

export function ConfirmModal({
  cancellation = false,
}: {
  cancellation?: boolean;
}) {
  const form = useFormik({
    initialValues: {
      _id: "",
    },
    onSubmit: async (values, { resetForm, setStatus }) => {
      console.log(values);
      try {
        if (cancellation) {
          // cancelAppointment();
        }
        resetForm();
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
  });
  const { submitForm, isSubmitting } = form;
  const appointmentDate = "Thursday, 13 January 2023";
  const appointmentTime = "9:30 - 10:00AM";

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <FormikProvider value={form}>
        <div className="w-full flex justify-end pr-6">
          <RadixDialog.Close className="" asChild>
            <button>
              <XIcon className="w-5 h-5" />
            </button>
          </RadixDialog.Close>
        </div>
        <div className="w-full min-w-full px-6 flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-col">
              {cancellation ? (
                <>
                  <Image
                    src={require("../../../assets/red-alert.png")}
                    alt="red cancellation alert"
                    height={40}
                    width={40}
                    className="self-center mb-4"
                  />
                  <p className="font-eudoxus text-xl text-alertRed self-center font-bold mb-1">
                    Cancel appointment
                  </p>
                  <p className="font-eudoxus text-sm text-gray-700 self-center font-medium">
                    Are you sure you want to cancel this visit?
                  </p>
                  <p className="font-eudoxus text-sm text-gray-700 self-center font-medium mb-9">
                    It cannot be undone.
                  </p>
                </>
              ) : (
                <>
                  <Image
                    src={require("../../../assets/green-checkmark.png")}
                    alt="green checkmark"
                    height={40}
                    width={40}
                    className="self-center mb-4"
                  />
                  <p className="font-eudoxus text-xl text-successGreen self-center font-bold mb-1">
                    Appointment scheduled
                  </p>
                  <p className="font-eudoxus text-sm text-gray-700 self-center font-medium mb-9">
                    Your appointment with doctor is now scheduled.
                  </p>
                </>
              )}
            </div>
            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <UserIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <h2 className="text-gray-900 font-medium">
                    {"Dr. Noah Pierre"}
                  </h2>
                  <p className="text-gray-600 font-normal">
                    {"Gastroenterology"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <CalendarIcon className="w-6 h-6 text-gray-500" />
                <div className="flex flex-col">
                  <p className="font-bold">{appointmentTime || ""}</p>
                  <p className="text-gray-500 font-medium">
                    {appointmentDate || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <ClockIcon className="w-6 h-6 text-gray-500" />
                <div className="flex flex-col">
                  <p className="font-bold">{"30 min"}</p>
                  <p className="text-gray-500 font-medium">
                    {"Online video meeting duration"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
          {cancellation && (
            <RadixDialog.Close asChild>
              <Button buttonType="secondary">Keep this visit</Button>
            </RadixDialog.Close>
          )}
          <Button
            onClick={() => {
              if (cancellation) {
                //   cancelAppointment();
              } else {
              }
            }}
            buttonType={cancellation ? "alert" : "primary"}
          >
            {cancellation ? "Cancel this visit" : "Done"}
          </Button>
        </div>
      </FormikProvider>
    </div>
  );
}
