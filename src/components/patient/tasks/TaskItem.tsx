import React, { useMemo } from "react";
import { format, isToday, isTomorrow, formatDistance } from "date-fns";
import Link from "next/link";
import { Button } from "../../ui/Button";
import { CheckCircleIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { TaskSelector } from "./TaskSelector";
import { TaskType } from "@src/graphql/generated";

export const TaskItem = ({
  id,
  type,
  title,
  createdAt,
  actionText,
  dueAt,
  pastDue,
  appointmentStartTime,
  meetingLocation,
  providerType,
  valid,
  helperText,
}: {
  id: string;
  type: TaskType;
  title: string;
  createdAt: Date;
  dueAt?: Date;
  pastDue?: boolean | null;
  actionText: string;
  appointmentStartTime?: string;
  meetingLocation?: string;
  providerType?: string;
  valid?: boolean;
  helperText?: string;
}) => {
  const formattedTime = useMemo(() => {
    if (dueAt && !pastDue) {
      return `Due in ${formatDistance(new Date(dueAt), new Date())}`;
    } else if (dueAt && pastDue) {
      return `Due ${formatDistance(new Date(dueAt), new Date())} ago`;
    } else if (createdAt) {
      return `Assigned ${formatDistance(new Date(createdAt), new Date())} ago`;
    }
  }, [dueAt, pastDue, createdAt]);

  const formatAppointmentStartTime = useMemo(() => {
    if (appointmentStartTime) {
      const startTime = new Date(appointmentStartTime);

      if (isToday(startTime)) {
        return `Today @ ${format(startTime, "h:mm aa")}`;
      } else if (isTomorrow(startTime)) {
        return `Tomorrow @ ${format(startTime, "h:mm aa")}`;
      }
      return format(startTime, "MM/dd/yy @ h:mm aa");
    } else {
      return "";
    }
  }, [appointmentStartTime]);

  const getQueryParamIdFromMeetingUrl = meetingLocation?.split("/").pop();
  const hasSubTasks = false; //Math.random() >= 0.8;

  const taskMeta = useMemo(() => {
    switch (type) {
      case TaskType.AdLibitum:
        return {
          duration: "Fasting prior, 10 minutes",
          subtitle: "This assesses your satiation so we can tailor your care.",
        };
      case TaskType.BpLog:
        return {
          duration: "1 minute",
          subtitle: "Blood pressure is important for us to track your health.",
        };
      case TaskType.ScheduleHealthCoachAppointment:
        return {
          duration: "1 minute",
          subtitle: "Schedule with your Health Guide to track your progress.",
        };
      case TaskType.Tefq:
        return {
          duration: "3 minutes",
          subtitle:
            "This tells us how you view food emotionally so we can tailor your care.",
        };
      case TaskType.MpFeeling:
        return {
          duration: "3 minutes",
          subtitle:
            "This tells us about your mental state so we can tailor your care.",
        };
      case TaskType.WeightLog:
        return {
          duration: "1 minute",
          subtitle: "Log your weight so we can track your progress.",
        };
      case TaskType.Gsrs:
        return {
          duration: "3 minutes",
          subtitle:
            "This tells us any gut issues you may be having before or while on medication.",
        };
      case TaskType.WaistLog:
        return {
          duration: "1 minute",
          subtitle:
            "Waist measurements are important because BMI isn’t always a good metric.",
        };
      case TaskType.MpHunger:
        return {
          duration: "5 minutes",
          subtitle: "This assesses your satiety so we can tailor your care.",
        };
      case TaskType.MpActivity:
        return {
          duration: "2 minutes",
          subtitle:
            "This assesses your basal metabolic rate so we can tailor your care.",
        };
      case TaskType.FoodLog:
        return {
          duration: "2 minutes",
          subtitle:
            "Log what you eat here every day so we can best understand your metabolism.",
        };
      case TaskType.ScheduleAppointment:
        return {
          duration: "1 minute",
          subtitle:
            "Schedule an appointment after all tasks are completed and labs are sent.",
        };
      case TaskType.NewPatientIntakeForm:
        return {
          duration: "5 minutes",
          subtitle:
            "Complete a basic medical form so that we can tailor our services to your needs.",
        };
      case TaskType.IdAndInsuranceUpload:
        return {
          duration: "2 minutes",
          subtitle: "This will help us verify who you are.",
        };
      default:
        return {
          duration: "10 minutes",
          subtitle:
            "Complete a basic medical form so that we can tailor our services to your needs.",
        };
    }
  }, [type]);

  const timeDuration = appointmentStartTime
    ? `${formatAppointmentStartTime} | ${providerType}`
    : formattedTime;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-col justify-between gap-y-3 md:flex-row  md:gap-x-2 ">
        <div className="flex flex-shrink pb-6 md:w-1/2">
          <ChooseTaskIcon value={type} />
          <div className="max-w-md">
            <h3 className="text-gray-900 font-bold">
              {appointmentStartTime ? `Appointment with ${title}` : title}
            </h3>
            <p className="text-gray-700">{taskMeta.subtitle}</p>
          </div>
        </div>
        <div className="hidden md:flex">
          {taskMeta.duration && valid ? (
            <>
              <ClockIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>{taskMeta.duration}</p>
            </>
          ) : null}
        </div>

        <div className="hidden md:flex">
          {timeDuration ? (
            <>
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>{timeDuration}</p>
            </>
          ) : null}
        </div>
        <div className="hidden md:flex">
          {hasSubTasks ? (
            <div className="text-gray-600 flex">
              <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" /> 2/4
              completed
            </div>
          ) : (
            <TaskSelector
              type={type}
              userTaskId={id}
              createdAt={createdAt}
              trigger={
                <Button
                  buttonType="primary"
                  disabled={!valid}
                  tooltipText={helperText}
                >
                  {actionText}
                </Button>
              }
            />
          )}
        </div>
      </div>
      {hasSubTasks && (
        <div className="pt-4">
          {[
            { children: "Metabolic Profile (Feeling)", isCompleted: true },
            { children: "Metabolic Profile (Hunger)", isCompleted: true },
            { children: "Metabolic Profile (Hunger)" },
            { children: "Another Profile (Pain)" },
          ].map((subTasks, i) => {
            return <SubTask key={i} {...subTasks} />;
          })}
        </div>
      )}

      <div className="md:hidden flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
        <div className="flex">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <p>
            {appointmentStartTime
              ? `${formatAppointmentStartTime} | ${providerType}`
              : formattedTime}
          </p>
        </div>
        <div>
          {hasSubTasks ? (
            <div className="flex text-gray-600">
              <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" /> 2/4
              completed
            </div>
          ) : meetingLocation ? (
            <Link
              passHref
              legacyBehavior
              href={`/appointments/call/${getQueryParamIdFromMeetingUrl}`}
            >
              <Button buttonType="secondary">{actionText}</Button>
            </Link>
          ) : (
            <TaskSelector type={type} userTaskId={id} createdAt={createdAt} />
          )}
        </div>
      </div>
    </div>
  );
};

function SubTask({
  isCompleted,
  children,
}: {
  isCompleted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between rounded-xl p-4 md:py-7 md:pr-6 md:pl-8 my-3 ${
        isCompleted
          ? "bg-green-50 border border-green-500 md:border-green-50"
          : "bg-gray-100 border border-gray-100"
      } `}
    >
      <p className="flex md:w-1/2">
        {children}{" "}
        <InformationCircleIcon className="h-5 w-5 text-gray-600 ml-2" />
      </p>
      {isCompleted ? (
        <div className="flex text-green-500 border-t-[1px] justify-end border-t-green-500 -m-4 mt-4 py-4 px-6 md:m-0 md:p-0 md:border-0">
          {" "}
          <CheckCircleIcon className="h-5 w-5 text-green-500 mt-[2px] mr-1" />{" "}
          Completed
        </div>
      ) : (
        <>
          <div className="hidden md:flex">
            <ClockIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <p>10 min</p>
          </div>
          <div className="hidden md:flex ">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <p>
              2 days left!
              {/* {appointmentStartTime
                ? `${formatAppointmentStartTime} | ${providerType}`
                : formattedTime} */}
            </p>
          </div>
          <div className="hidden md:flex">
            <Link
              passHref
              legacyBehavior
              href={
                "/appointments/call/123"
                // meetingLocation
                //   ? `/appointments/call/${getQueryParamIdFromMeetingUrl}`
                //   : `/task/${type}/${id}`
              }
            >
              <Button buttonType="secondary">Complete</Button>
            </Link>
          </div>
          <div className="md:hidden flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
            <div className="flex">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>2 days left!</p>
            </div>
            <div>
              <Link passHref legacyBehavior href={"/appointments/call/123"}>
                <Button buttonType="secondary">Complete</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
