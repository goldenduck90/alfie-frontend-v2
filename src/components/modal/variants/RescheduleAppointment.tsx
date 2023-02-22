import { zodResolver } from "@hookform/resolvers/zod";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import {
  useTaskCompletion,
  createAnwersFromObject,
} from "@src/hooks/useTaskCompletion";
import { Calendar } from "react-calendar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { EaProvider, Role } from "@src/graphql/generated";
import TimeslotButton from "@src/components/ui/TimeSlotButton";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { rawTimeZones } from "@vvo/tzdb";
export function RescheduleAppointment({
  title,
}: {
  title: string;
  taskId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // _id: taskId,
      // systolicBp: "",
      // diastolicBp: "",
    },
  });
  const [step, setStep] = useState(1);
  const setOpen = useDialogToggle();
  const [mutate] = useTaskCompletion(() => setOpen(false));

  async function onSubmit(values: any) {
    const { _id, ...rest } = values;
    console.log(rest);
    mutate({
      variables: {
        input: {
          _id,
          // reschedule data
        },
      },
    });
  }
  const eaProvider: EaProvider = {
    email: "ea@provider.com",
    id: "1",
    name: "Provider",
    numberOfPatients: 3,
    timezone: "MT",
    type: Role.Practitioner,
  };
  const tz = "EST";
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

  // const timeZones = rawTimeZones.map((timezone) => {
  //   return { label: timezone.rawFormat, value: timezone.abbreviation };
  // });

  return (
    <div className="w-full max-w-[560px] min-w-full">
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
            <p className="font-bold text-sm text-gray-600">Choose time</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {timeslots.map((timeslot) => (
                <TimeslotButton
                  key={timeslot.startTimeInUtc}
                  timeslot={timeslot}
                  tz={tz}
                />
              ))}
            </div>
            {/* <SelectInput
              name="timezone"
              placeholder="Select a timezone..."
              options={timeZones}
            /> */}
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
              handleSubmit(onSubmit)();
            }
          }}
        >
          {step === 1 ? "Next" : "Complete"}
        </Button>
      </div>
    </div>
  );
}
