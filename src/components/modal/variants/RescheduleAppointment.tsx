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
import { z } from "zod";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { EaProvider, Role, Timeslot } from "@src/graphql/generated";
import { useField } from "formik";
import { addDays, format, isToday } from "date-fns";
// const bloodPressureValidation = z.object({
//   _id: z.string(),
//   systolicBp: z.number().min(80).max(200),
//   diastolicBp: z.number().min(40).max(150),
// });

const TimeslotButton = ({
  timeslot,
  tz,
}: {
  timeslot: Timeslot;
  tz: string;
}) => {
  // const [
  //   ,
  //   { value: startTimeInUtc },
  //   { setValue: setStartTimeInUtc, setError: setStartTimeError },
  // ] = useField("startTimeInUtc");
  // const [, , { setValue: setEndTimeInUtc, setError: setEndTimeError }] =
  //   useField("endTimeInUtc");
  // const [, , { setValue: setEaProvider, setError: setEaProviderError }] =
  //   useField("eaProvider");

  const onClick = () => {
    // setEaProvider(timeslot.eaProvider);
    // setStartTimeInUtc(timeslot.startTimeInUtc);
    // setEndTimeInUtc(timeslot.endTimeInUtc);
    // setStartTimeError(undefined);
    // setEndTimeError(undefined);
    // setEaProviderError(undefined);
  };

  return (
    <button
      onClick={onClick}
      // disabled={timeslot.startTimeInUtc === startTimeInUtc}
      className="bg-gray-100 disabled:text-white text-gray-600 font-eudoxus font-base py-1 md:py-2 px-4 rounded w-full mb-3 ease-in-out duration-300 text-sm md:text-md"
    >
      {format(new Date(timeslot.startTimeInUtc), "h:mm aa")} -{" "}
      {format(new Date(timeslot.endTimeInUtc), "h:mm aa")} ({tz})
    </button>
  );
};

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
    // resolver: zodResolver(bloodPressureValidation),
  });
  const [step, setStep] = useState(1)
  const setOpen = useDialogToggle();
  const [mutate] = useTaskCompletion(() => setOpen(false));

  async function onSubmit(values: any) {
    // const { _id, ...rest } = values;
    // const answers = createAnwersFromObject(rest);
    // mutate({
    //   variables: {
    //     input: {
    //       _id,
    //       answers: answers,
    //     },
    //   },
    // });
  }
  const eaProvider: EaProvider = {
  email: 'ea@provider.com',
  id: '1',
  name: 'Provider',
  numberOfPatients: 3,
  timezone: 'America/New York',
  type: Role.Practitioner,
};
  const tz= 'America/Toronto'
  const timeslot = {eaProvider,startTimeInUtc: '2023-02-21T20:25:15.656Z', endTimeInUtc: '2023-02-21T23:25:15.656Z'}
  const timeslots = [timeslot,timeslot,timeslot,timeslot,timeslot,timeslot,timeslot,timeslot,timeslot,timeslot]

  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={2} />
      <DialogLongBody>
      {step === 1 && (
          <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex flex-col gap-y-2">
          <p className="font-bold text-sm text-gray-600">
            Choose date
          </p>
          <div className="">
            <Calendar />
          </div>
        </div>
            {/* <p className="text-sm text-gray-500 mb-6">
              We want to understand how you rate your baseline hunger after
              meals. For your first meal of the day, eat a meal that&apos;s
              between 300 and 400 calories. The recommended meal is 2 eggs and a
              piece of toast. Answer the questions after 30 minutes and 2 hours
              without consuming other food.
            </p>
            <p className="font-bold text-sm mb-2">What food did you eat?</p>
            <div className="flex gap-x-3 justify-between items-center">
              <TextField
                placeholder=""
                {...register("foodEaten")}
                fullWidth
                inputSize="medium"
              />
            </div> */}
          </div>
        )}
        {step === 2 && (
        <div className="flex flex-col gap-y-2">
        <p className="font-bold text-sm text-gray-600">
          Choose time
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {timeslots.map(timeslot => <TimeslotButton
              key={'2019-10-25T08:10:00Z'}
              timeslot={timeslot}
              tz={tz}
            />)}

        </div>
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
            if (step === 1) {
              setStep((s) => (s === 1 ? s + 1 : 1));
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
