import * as RadixDialog from "@radix-ui/react-dialog";
import { Calendar } from "react-calendar";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { EaProvider, Role } from "@src/graphql/generated";
import { TimeslotButton } from "../../ui/TimeslotButton";
import { OptionInput, SelectInput } from "../../inputs/SelectInput";
import { rawTimeZones } from "@vvo/tzdb";
import { parseError } from "../../../utils/parseError";
import { ToggleSwitch } from './../../ui/ToggleSwitch';

export function RescheduleAppointment({
  title,
}: {
  title: string;
}) {
  const form = useFormik({
    initialValues: {
      _id: "",
      timezone: ""
    },
    onSubmit: async (values, { resetForm, setStatus }) => {
      console.log(values);
      try {
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
  const [timezone, setTimezone] = useState('ET')
  const [twentyFourHrChecked, set24HrChecked] = useState(false)


  const eaProvider: EaProvider = {
    email: "ea@provider.com",
    id: "1",
    name: "Provider",
    numberOfPatients: 3,
    timezone: "MT",
    type: Role.Practitioner,
  };

  const timeslot = {
    eaProvider,
    startTimeInUtc: "2023-02-21T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot2 = {
    eaProvider,
    startTimeInUtc: "2023-02-22T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot3 = {
    eaProvider,
    startTimeInUtc: "2023-02-23T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot4 = {
    eaProvider,
    startTimeInUtc: "2023-02-24T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot5 = {
    eaProvider,
    startTimeInUtc: "2023-02-25T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslots = [timeslot, timeslot2, timeslot3, timeslot4, timeslot5];

  const timeZones: OptionInput[] = rawTimeZones.map((timezone: { rawFormat: any; abbreviation: any; }) => {
    return { label: timezone.rawFormat, value: timezone.abbreviation };
  });

  return (
    <div className="w-full max-w-[560px] min-w-full">
      <FormikProvider value={form}>
      <DialogLongHeader title={title} step={step} total={2} icon={undefined} />
      <DialogLongBody>
        {step === 1 && (
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-col gap-y-2">
              <p className="font-bold text-sm text-gray-600">Choose date</p>
              <div className="">
                <Calendar />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between"><p className="font-bold text-sm text-gray-600">Choose time</p><ToggleSwitch label={'AM/PM'} labelRight={'24hr'} checked={twentyFourHrChecked} onCheckedChange={()=> set24HrChecked(!twentyFourHrChecked)}/></div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {timeslots.map((timeslot) => (
                <TimeslotButton
                  key={timeslot.startTimeInUtc}
                  timeslot={timeslot}
                  tz={timezone}
                  is24HrFormat={twentyFourHrChecked}
                />
              ))}
            </div>
            <SelectInput
              name="timezone"
              placeholder="Select a timezone..."
              options={timeZones}
              onChange={(tz)=> setTimezone(tz)}
            />
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-y-2">
            <p className="font-bold text-sm text-gray-600">
              Appointment summary
            </p>
          </div>
        )}
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        {step === 1 && (
          <RadixDialog.Close asChild>
            <Button buttonType="secondary">Cancel</Button>
          </RadixDialog.Close>
        )}
        {step === 2 && (
          <Button buttonType="secondary" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        )}
        <Button
          onClick={() => {
            if (step === 1 || step === 2) {
              setStep((s) => (s === 1 || step === 2 ? s + 1 : 1));
            } else {
              submitForm();
            }
          }}
        >
          {step === 1 || step === 2 ? "Next" : "Confirm"}
        </Button>
      </div>
      </FormikProvider>
    </div>
  );
}
