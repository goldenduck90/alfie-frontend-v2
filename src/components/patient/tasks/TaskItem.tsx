import React, { useState, useMemo } from "react";
import { format, isToday, isTomorrow, formatDistance } from "date-fns";
import Link from "next/link";
import { Button } from "../../ui/Button";
import { CheckCircleIcon, HeartIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/outline";

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
}: {
  id: string;
  type: string;
  title: string;
  createdAt: Date;
  dueAt?: Date;
  pastDue?: boolean | null;
  actionText: string;
  appointmentStartTime?: string;
  meetingLocation?: string;
  providerType?: string;
}) => {
  const formattedTime = useMemo(() => {
    if (dueAt && !pastDue) {
      return `Due in ${formatDistance(new Date(dueAt), new Date())}`;
    } else if (dueAt && pastDue) {
      return `Due ${formatDistance(new Date(dueAt), new Date())} ago`;
    } else {
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
  const hasSubTasks = Math.random() >= 0.8;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-col justify-between gap-y-3 md:flex-row  md:gap-x-2 ">
        <div className="flex flex-shrink pb-6 md:w-1/2">
          <div className="flex mr-4 rounded-xl bg-brand-peachy w-10 h-10 items-center justify-center min-w-[40px]">
            <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
          </div>
          <div className="max-w-md">
            <h3 className="text-gray-900 font-bold">
              {appointmentStartTime ? `Appointment with ${title}` : title}
            </h3>
            <p className="text-gray-700">
              We need to verify your insurance and identity in order to give you
              an access to our services.
            </p>
          </div>
        </div>
        <div className="hidden md:flex">
          <ClockIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <p>5 min</p>
        </div>

        <div className="hidden md:flex">
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
        <div className="hidden md:flex">
          {hasSubTasks ? (
            <div className="text-gray-600 flex">
              <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" /> 2/4
              completed
            </div>
          ) : (
            <Link
              passHref
              legacyBehavior
              href={
                meetingLocation
                  ? `/appointments/call/${getQueryParamIdFromMeetingUrl}`
                  : `/dashboard/tasks/${id}`
              }
            >
              <Button buttonType="secondary">{actionText}</Button>
            </Link>
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
          ) : (
            <Link
              passHref
              legacyBehavior
              href={
                meetingLocation
                  ? `/appointments/call/${getQueryParamIdFromMeetingUrl}`
                  : `/dashboard/tasks/${id}`
              }
            >
              <Button buttonType="secondary">{actionText}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

function TaskItemIcon({ Icon }: { Icon: JSX.Element }) {
  return <div>{/* <Icon className="h-5 w-5" /> */}</div>;
}

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
