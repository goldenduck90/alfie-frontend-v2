import * as RadixDialog from "@radix-ui/react-dialog";
import {
  Calendar,
} from "react-calendar";
import { FormikProvider, useField, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { TimeslotButton } from "../../ui/TimeslotButton";
import { OptionInput, SelectInput } from "../../inputs/SelectInput";
import { rawTimeZones } from "@vvo/tzdb";
import { parseError } from "../../../utils/parseError";
import { ToggleSwitch } from "./../../ui/ToggleSwitch";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";
import { TextArea } from "../../inputs/TextArea";
import { useTaskCompletion } from "../../../hooks/useTaskCompletion";
import { format } from "date-fns";
import { EaProvider, Role } from "@src/graphql/generated";
import * as Yup from "yup";

export const FormCalendar = () => {
  const [
    , ,
    { setValue: setSelectedDate, setError: setSelectedDateError },
  ] = useField("selectedDate");


  const onDateSelected = (date: any) => {
    setSelectedDate(date);
  };
  return (<Calendar onChange={(date: any) => onDateSelected(date)} />)
}

export function RescheduleAppointment({
  title,
  onAppointmentConfirmed,
}: {
  title: string;
  onAppointmentConfirmed: () => void;
}) {
  const rescheduleForm = useFormik({
    initialValues: {
      reschedule: true,
      // eaAppointmentId: id,
      providerType: "",
      userEaProviderId: null,
      eaProvider: null,
      selectedDate: new Date(),
      startTimeInUtc: null,
      endTimeInUtc: null,
      // eaServiceId: "1",
      notes: "",
    },
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        // TODO: uncomment once serverside is ready
        // mutate({
        //   variables: {
        //     input: {
        //       reschedule: true,
        //       eaAppointmentId: id,
        //       providerType: "",
        //       userEaProviderId: null,
        //       eaProvider: null,
        //       selectedDate: new Date(),
        //       startTimeInUtc: null,
        //       endTimeInUtc: null,
        //       eaServiceId: "1",
        //       notes: "",
        //     },
        //   },
        // });
        if (onAppointmentConfirmed) {
          setOpen(false)
          onAppointmentConfirmed()
        }
        resetForm();
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
    validationSchema: Yup.object().shape({
      eaProvider: Yup.object().required("Please select a provider."),
      selectedDate: Yup.string()
        .nullable()
        .required("Please select a date to continue."),
      startTimeInUtc: Yup.string()
        .nullable()
        .required("Please select a timeslot to continue."),
      endTimeInUtc: Yup.string()
        .nullable()
        .required("Please select a timeslot to continue."),
      notes: Yup.string().nullable(),
    }),
  });

  const [step, setStep] = useState(1);
  const setOpen = useDialogToggle();
  // const [mutate] = useTaskCompletion(() => setOpen(false));
  const { submitForm, isSubmitting } = rescheduleForm;
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [twentyFourHrChecked, set24HrChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eaProvider, setEaProvider] = useState({
    email: "",
    id: "",
    name: "",
    numberOfPatients: 0,
    timezone: "",
    type: "",
  } as unknown as EaProvider);

  // TODO: remove; test data
  const testEaProvider: EaProvider = {
    email: "npierre@provider.com",
    id: "1",
    name: "Noah Pierre",
    numberOfPatients: 0,
    timezone: "MT",
    type: Role.Doctor,
  };
  const timeslot = {
    eaProvider: testEaProvider,
    startTimeInUtc: "2023-02-21T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot2 = {
    eaProvider: testEaProvider,
    startTimeInUtc: "2023-02-22T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot3 = {
    eaProvider: testEaProvider,
    startTimeInUtc: "2023-02-23T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot4 = {
    eaProvider: testEaProvider,
    startTimeInUtc: "2023-02-24T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };
  const timeslot5 = {
    eaProvider: testEaProvider,
    startTimeInUtc: "2023-02-25T20:25:15.656Z",
    endTimeInUtc: "2023-02-21T23:25:15.656Z",
  };

  const timeslots = [timeslot, timeslot2, timeslot3, timeslot4, timeslot5];

  const timeZones: OptionInput[] = rawTimeZones.map(
    (timezone: { rawFormat: any; abbreviation: any }) => {
      return { label: timezone.rawFormat, value: timezone.abbreviation };
    }
  );

  useEffect(() => {
    const { eaProvider, selectedDate } = rescheduleForm.values;
    console.log(eaProvider)
    if (eaProvider) {
      setEaProvider(eaProvider)
    }
    if (selectedDate) {
      setSelectedDate(selectedDate)
    }
  }, [rescheduleForm]);

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <FormikProvider value={rescheduleForm}>
        <DialogLongHeader
          title={title}
          step={step}
          total={2}
          icon={undefined}
        />
        <DialogLongBody>
          {step === 1 && (
            <div className="flex flex-col gap-y-2 w-full">
              <div className="flex flex-col gap-y-2">
                <p className="font-bold text-sm text-gray-600">Choose date</p>
                <FormCalendar />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <p className="font-bold text-sm text-gray-600">Choose time</p>
                <ToggleSwitch
                  label={"AM/PM"}
                  labelRight={"24hr"}
                  checked={twentyFourHrChecked}
                  onCheckedChange={() => set24HrChecked(!twentyFourHrChecked)}
                />
              </div>
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
              <p className="font-bold text-sm text-gray-600">Timezone</p>
              <SelectInput
                name="timezone"
                placeholder="Select a timezone..."
                options={timeZones}
                onChange={(tz) => setTimezone(tz)}
              />
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-y-2">
              <p className="font-bold text-sm text-gray-600">
                Appointment summary
              </p>
              <div className="flex flex-row my-2 gap-4 w-full">
                <div className="flex rounded-full bg-lime-100 w-10 h-10 items-center justify-center min-w-[40px]">
                  <UserIcon className="h-6 w-6 text-lime-700" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-medium">{eaProvider.name}</h2>
                  <p className="text-gray-600 font-normal">{String(eaProvider.type)}</p>
                </div>
              </div>
              <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
                <div className="flex gap-x-4 items-start">
                  <CalendarIcon className="w-6 h-6 text-gray-500" />
                  <div className="flex flex-col">
                    <p className="font-bold">{twentyFourHrChecked ? format(new Date(timeslot.startTimeInUtc), "HH:mm") : format(new Date(timeslot.startTimeInUtc), "h:mm aa")} -{" "}
                      {twentyFourHrChecked ? format(new Date(timeslot.endTimeInUtc), "HH:mm") : format(new Date(timeslot.endTimeInUtc), "h:mm aa")}</p>
                    <p className="text-gray-500 font-medium">
                      {selectedDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
                <div className="flex gap-x-4 items-start">
                  <ClockIcon className="w-6 h-6 text-gray-500" />
                  <div className="flex flex-col">
                    {/* TODO: Add duration */}
                    <p className="font-bold">{"30 min"}</p>
                    <p className="text-gray-500 font-medium">
                      {"Online video meeting duration"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-flex-col mb-5">
                <div className="font-eudoxus font-bold text-gray-900 text-sm mb-3 mt-4">
                  Please share anything that will help the doctor prepare for
                  the meeting
                </div>
                <div className="pb-2">
                  <TextArea cache name="notes" />
                </div>
              </div>
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
            <Button
              buttonType="secondary"
              onClick={() => setStep((s) => s - 1)}
            >
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
