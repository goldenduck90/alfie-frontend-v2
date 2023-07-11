import * as RadixDialog from "@radix-ui/react-dialog";
import { useFormikWizard } from "formik-wizard-form";
import { FormikProvider, useField } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/Button";
import {
  DialogLongBody,
  DialogLongHeader,
  useDialogToggle,
} from "../../Dialog";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import * as Yup from "yup";
import { TimeslotSelection } from "./steps/TimeslotSelection";
import { AppointmentSummary } from "./steps/AppointmentSummary";
import { AppointmentConfirmation } from "./steps/AppointmentConfirmation";
import { useUserStateContext } from "@src/context/SessionContext";
import * as Sentry from "@sentry/react";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { gql, useMutation, useQuery } from "@apollo/client";
import { client } from "@src/graphql";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { randomId } from "@src/utils/randomId";
import { Role } from "@src/graphql/generated";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.tz.setDefault(dayjs.tz.guess());

const getRoleQuery = gql`
  query getRole {
    getRole {
      role
    }
  }
`;

const updateAppointmentMutation = gql`
  mutation UpdateAppointmentMutation($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      eaAppointmentId
    }
  }
`;

const createAppointmentMutation = gql`
  mutation CreateAppointmentMutation($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      eaAppointmentId
    }
  }
`;

export const DateSelector = () => {
  const [, { value: selectedDate }, { setValue: setSelectedDate }] =
    useField("selectedDate");

  return (
    <div className="flex justify-center">
      <button
        className="mr-8 p-2 border rounded-xl"
        disabled={dayjs(selectedDate).isSame(dayjs(), "date")}
        onClick={() => setSelectedDate(dayjs(selectedDate).subtract(1, "day"))}
      >
        <ChevronLeftIcon className="h-5 w-5" id="backLabel" />
      </button>
      <p className="font-bold text-sm text-gray-600 self-center">
        {dayjs(selectedDate).format("MMMM DD, YYYY")}
      </p>
      <button
        className="ml-8 p-2 border rounded-xl"
        disabled={dayjs(selectedDate).isAfter(
          dayjs().add(1, "month").subtract(1, "day")
        )}
        onClick={() => setSelectedDate(dayjs(selectedDate).add(1, "day"))}
      >
        <ChevronRightIcon className="h-5 w-5 md:w-6 md:h-6" id="nextLabel" />
      </button>
    </div>
  );
};

export function ScheduleAppointment({
  eaAppointmentId,
  userId,
  start,
  end,
  notes,
  userTaskId,
  onComplete,
  eaCustomerName,
  healthCoach = false,
}: {
  eaAppointmentId?: string;
  userId?: string;
  start?: string;
  end?: string;
  notes?: string;
  userTaskId?: string;
  onComplete?: () => void;
  eaCustomerName?: string;
  healthCoach?: boolean;
}) {
  const result = useQuery(getRoleQuery);
  const isProvider =
    result.data?.getRole?.role === Role.Practitioner ||
    result.data?.getRole?.role === Role.CareCoordinator ||
    result.data?.getRole?.role === Role.Doctor ||
    result.data?.getRole?.role === Role.HealthCoach;

  const isHealthCoach = result.data?.getRole?.role === Role.HealthCoach || healthCoach;

  const [update] = useMutation(updateAppointmentMutation);
  const [create] = useMutation(createAppointmentMutation);
  const { addNotification } = useNotificationStore();

  const [confirmed, setConfirmed] = useState(false);
  const scheduleForm = useFormikWizard({
    initialValues: {
      reschedule: true,
      eaAppointmentId,
      selectedDate: start
        ? dayjs(
          `${dayjs(start).format("YYYY-MM-DD")} ${dayjs().format("H:mm")}`
        )
        : dayjs(),
      start: start,
      end: end,
      notes: notes || "",
      eaProvider: undefined,
      eaCustomer: undefined,
      userId,
      eaCustomerName,
      healthCoach: isHealthCoach,
    },
    onSubmit: async (values) => {
      try {
        if (values.eaAppointmentId) {
          const { data } = await update({
            variables: {
              input: {
                eaAppointmentId: values.eaAppointmentId,
                start: dayjs(values.start).format("YYYY-MM-DD H:mm"),
                end: dayjs(values.end).format("YYYY-MM-DD H:mm"),
                timezone: dayjs.tz.guess(),
                ...(values.notes && {
                  notes: values.notes,
                }),
                bypassNotice: isProvider ? true : false,
              },
            },
          });

          addNotification({
            type: "success",
            description: "Successfully Updated Appointment!",
            id: randomId(),
            title: "Appointment Updated",
          });

          console.log(data);
        } else {
          const { data } = await create({
            variables: {
              input: {
                ...(isProvider && {
                  userId: values.userId,
                }),
                ...(isHealthCoach && {
                  healthCoach: true,
                }),
                start: dayjs(values.start).format("YYYY-MM-DD H:mm"),
                end: dayjs(values.end).format("YYYY-MM-DD H:mm"),
                timezone: dayjs.tz.guess(),
                notes: values.notes,
                bypassNotice: isProvider ? true : false,
                ...(userTaskId && {
                  userTaskId,
                }),
              },
            },
          });

          addNotification({
            type: "success",
            description: "Successfully Scheduled Appointment!",
            id: randomId(),
            title: "Appointment Scheduled",
          });

          console.log(data);
        }

        await client.clearStore();

        if (onComplete) {
          onComplete();
        }

        setConfirmed(true);
      } catch (e) {
        console.log("Errors occured updating/creating appointment.", e);
        alert(
          "An error occured updating/creating your appointment. Please contact support."
        );

        Sentry.captureException(e, {
          tags: {
            mutation: "createAppointment/updateAppointment",
            component: "Appointment Scheduler",
          },
        });
      }
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: 0,
    steps: [
      {
        component: TimeslotSelection,
        validationSchema: Yup.object().shape({
          start: Yup.string().required("Please select a timeslot to continue"),
          end: Yup.string().required("Please select a timeslot to continue"),
        }),
      },
      {
        component: AppointmentSummary,
        validationSchema: Yup.object().shape({
          notes: Yup.string().nullable(),
        }),
        beforeNext: async (_, { submitForm }) => {
          await submitForm();
        },
      },
      {
        component: AppointmentConfirmation,
      },
    ],
  });

  useEffect(() => {
    if (result.loading) return
    if (!result.data) return
    if (scheduleForm.values.healthCoach) return

    const isHealthCoach = result.data?.getRole?.role === Role.HealthCoach || healthCoach;
    scheduleForm.setFieldValue("healthCoach", isHealthCoach);
  }, [healthCoach, result.data, result.loading, scheduleForm])

  const setOpen = useDialogToggle();

  const {
    values,
    renderComponent,
    handleNext,
    handlePrev,
    errors,
    currentStepIndex,
    isSubmitting,
    resetForm,
  } = scheduleForm;

  const getErrors = () => {
    if (
      errors?.start ||
      errors.end ||
      errors?.selectedDate ||
      errors?.eaProvider
    ) {
      return (
        <span className="text-red-500 text-sm">
          <div>
            {(errors as any).startTimeInUtc ||
              (errors as any).endTimeInUtc ||
              (errors as any).selectedDate ||
              (errors as any).eaProvider}
          </div>
        </span>
      );
    }
  };

  return (
    <div className="w-full max-w-[480px] min-w-full overflow-y-auto">
      <FormikProvider value={scheduleForm}>
        <>
          <DialogLongHeader
            title={
              values.eaAppointmentId
                ? "Reschedule Appointment"
                : "Schedule Appointment"
            }
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
            {currentStepIndex === 0 && (
              <RadixDialog.Close asChild>
                <Button buttonType="secondary">Cancel</Button>
              </RadixDialog.Close>
            )}
            {currentStepIndex === 1 && (
              <Button buttonType="secondary" onClick={() => handlePrev()}>
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
            )}
            <Button
              type="button"
              onClick={async () => {
                if (currentStepIndex === 2) {
                  setOpen(false);
                  resetForm();
                } else {
                  handleNext();
                }
              }}
              disabled={isSubmitting}
            >
              {currentStepIndex === 0
                ? "Next"
                : currentStepIndex === 1
                  ? "Confirm"
                  : "Done"}
            </Button>
          </div>
        </>
      </FormikProvider>
    </div>
  );
}
