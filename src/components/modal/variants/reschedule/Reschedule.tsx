import * as RadixDialog from "@radix-ui/react-dialog";
import { Calendar } from "react-calendar";
import { useFormikWizard } from "formik-wizard-form";
import { ErrorMessage, Field, Form, FormikProvider, useField } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../../Dialog";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { parseError } from "../../../../utils/parseError";
import { addDays, format } from "date-fns";
import * as Yup from "yup";
import { DateSelection } from "./steps/DateSelection";
import { TimeslotSelection } from "./steps/TimeslotSelection";
import { AppointmentSummary } from "./steps/AppointmentSummary";
import { AppointmentConfirmation } from "./steps/AppointmentConfirmation";

export const DateSelector = () => {
  const [
    ,
    { value: selectedDate },
    { setValue: setSelectedDate, setError: setSelectedDateError },
  ] = useField("selectedDate");

  return (
    <div className="flex justify-center">
      <button
        className="mr-8 p-2 border rounded-xl"
        onClick={() => setSelectedDate(addDays(selectedDate, -1))}
      >
        <ChevronLeftIcon className="h-5 w-5" id="backLabel" />
      </button>
      <p className="font-bold text-sm text-gray-600 self-center">
        {format(selectedDate, "E, MMMM do")}
      </p>
      <button
        className="ml-8 p-2 border rounded-xl"
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
      >
        <ChevronRightIcon className="h-5 w-5 md:w-6 md:h-6" id="nextLabel" />
      </button>
    </div>
  );
};

type RescheduleAppointment = {
  reschedule: boolean;
  providerType?: string;
  userEaProviderId?: null;
  eaProvider: null;
  selectedDate: Date;
  startTimeInUtc: null;
  endTimeInUtc: null;
  notes?: string;
}

export function RescheduleAppointment({
  title,
  onAppointmentConfirmed,
}: {
  title: string;
  onAppointmentConfirmed: (values: any) => void;
}) {
  const [confirmed, setConfirmed] = useState(false)
  const [errorText, setErrorText] = useState('')
  const rescheduleForm = useFormikWizard({
    initialValues: {
      reschedule: true,
      eaAppointmentId: '1',
      providerType: "",
      userEaProviderId: null,
      eaProvider: null,
      selectedDate: new Date(),
      startTimeInUtc: null,
      endTimeInUtc: null,
      eaServiceId: "1",
      notes: "",
    },
    onSubmit: async (values, { resetForm, setStatus }) => {
      console.log('<onSubmit values>\n', JSON.stringify(values))
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
          setOpen(false);
          onAppointmentConfirmed(values);
        }
        resetForm();
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: 0,
    steps: [
      {
        component: DateSelection,
        validationSchema: Yup.object().shape({
          selectedDate: Yup.string().required("Please select a day to continue."),
        }),
        beforeNext: async ({ selectedDate }, { setFieldValue }) => {
          setFieldValue("selectedDate", selectedDate);
        }
      },
      {
        component: TimeslotSelection,
        validationSchema: Yup.object().shape({
          eaProvider: Yup.object().required("Please select a provider"),
          startTimeInUtc: Yup.string()
            .nullable()
            .required("Please select a timeslot to continue"),
          endTimeInUtc: Yup.string()
            .nullable()
            .required("Please select a timeslot to continue"),
        }),
        beforeNext: async ({ eaProvider, startTimeInUtc, endTimeInUtc }, { setFieldValue }) => {
          setFieldValue("eaProvider", eaProvider);
          setFieldValue("startTimeInUtc", startTimeInUtc);
          setFieldValue("endTimeInUtc", endTimeInUtc);
        }
      },
      {
        component: AppointmentSummary,
        validationSchema: Yup.object().shape({
          notes: Yup.string().nullable(),
        }),
        beforeNext: async ({ notes }, { setFieldValue, setSubmitting, setStatus }) => {
          setFieldValue("notes", notes);
          try {
            setStatus(null);
            setSubmitting(true);
            setSubmitting(false);
            setConfirmed(true);
          } catch (err) {
            const msg = parseError(err);
            setSubmitting(false);
            setStatus({ error: msg });
          }
        },
      },
      {
        component: AppointmentConfirmation,
      },
    ],
  });
  const setOpen = useDialogToggle();

  const {
    renderComponent,
    handleNext,
    handlePrev,
    handleSubmit,
    errors,
    isPrevDisabled,
    isNextDisabled,
    isSubmitting,
    currentStepIndex,
    isLastStep,
    status
  } = rescheduleForm;

  const getErrors = () => {
    if (errors?.startTimeInUtc || errors.endTimeInUtc || errors?.selectedDate || errors?.eaProvider) {
      return (
        <span className="text-red-500 text-sm">
          <div>{(errors as any).startTimeInUtc || (errors as any).endTimeInUtc || (errors as any).selectedDate || (errors as any).eaProvider}</div>
        </span>
      )
    }
  }



  useEffect(() => {
    // TODO: uncomment once adding in fetch
    // const { setFieldValue } = rescheduleForm;
    // if (loading) return;
    // if (error) return;
    // if (!data) return;
    // const { appointment } = data;
    // if (!appointment) return;
    // if (userEaProviderId) return;
    // if (eaProvider) return;

    // setFieldValue("selectedDate", new Date(appointment.startTimeInUtc));
    // setFieldValue("endTimeInUtc", appointment.endTimeInUtc);
    //   setFieldValue("eaProvider", appointment.eaProvider);
    //   setFieldValue("userEaProviderId", appointment.eaProvider.id);
    //   setFieldValue("providerType", appointment.eaProvider.type);
    //   setFieldValue("notes", appointment.notes);
  }, [rescheduleForm]);

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <FormikProvider value={rescheduleForm}>
        <>
          <DialogLongHeader
            title={title}
            step={currentStepIndex + 1}
            total={2}
            icon={undefined}
            confirm={confirmed}
          />
          <DialogLongBody>
            {/* Reschedule steps */}
            {renderComponent()}
            {getErrors()}
          </DialogLongBody>
          <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
            {/* {errors && Object.keys(errors)?.length > 0 ? (
              Object.keys(errors).map(key => {
                let errorMessage = ''
                if ((key === 'startTimeInUtc' || key === 'endTimeInUtc')) {
                  return (<div className="text-red-500 text-sm text-center">
                    {'Please select a timeslot to continue.'}
                  </div>)
                }
                return (<div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>)
              })
            ) : null} */}
            {currentStepIndex === 0 && (
              <RadixDialog.Close asChild>
                <Button buttonType="secondary">Cancel</Button>
              </RadixDialog.Close>
            )}
            {currentStepIndex > 0 && currentStepIndex < 3 && (
              <Button
                buttonType="secondary"
                onClick={() => handlePrev()}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStepIndex === 3) {
                  handleSubmit();
                }
                handleNext();
              }}
            >
              {currentStepIndex < 2 ? "Next" : currentStepIndex === 2 ? "Confirm" : "Done"}
            </Button>
          </div>
        </>
      </FormikProvider >
    </div >
  );
}
