import * as RadixDialog from "@radix-ui/react-dialog";
import { Calendar } from "react-calendar";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, useDialogToggle } from "../Dialog";
import { parseError } from "../../../utils/parseError";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";
import GreenCheckmark from '../../../assets/green-checkmark.png'

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
    }
  });
  const [step, setStep] = useState(1);
  const setOpen = useDialogToggle();
  const { submitForm, isSubmitting } = form;

  const appointmentDate = 'Thursday, 13 January 2023'
  const appointmentTime = '9:30 - 10:00AM'

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <FormikProvider value={form}>
        <DialogLongBody>
          <div className="flex flex-col gap-y-2 w-full">
            <img src={require("../../../assets/green-checkmark.png")} />

            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <div className="flex rounded-full bg-lime-100 w-10 h-10 items-center justify-center min-w-[40px]">
                  <UserIcon className="h-6 w-6 text-lime-700" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-medium">{'Dr. Noah Pierre'}</h2>
                  <p className="text-gray-600 font-normal">{'Gastroenterology'}</p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <CalendarIcon className="w-6 h-6 text-gray-500" />
                <div className="flex flex-col"><p className="font-bold">{appointmentTime || ""}</p>
                  <p className="text-gray-500 font-medium">{appointmentDate || ""}</p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
              <div className="flex gap-x-4 items-start">
                <ClockIcon className="w-6 h-6 text-gray-500" />
                <div className="flex flex-col"><p className="font-bold">{"30 min"}</p><p className="text-gray-500 font-medium">{"Online video meeting duration"}</p></div>
              </div>
            </div>
          </div>
        </DialogLongBody>
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
            className={cancellation ? 'bg-red' : ''}
          >
            {cancellation ? "Cancel this visit" : "Done"}
          </Button>
        </div>
      </FormikProvider>
    </div>
  );
}
