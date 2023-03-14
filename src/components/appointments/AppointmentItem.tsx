import React, { useMemo } from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { Role } from "../../graphql/generated";
import { roleToText } from "../../utils/roleToText";

import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

const cancelAppointmentMutation = gql`
  mutation CancelAppointment($eaAppointmentId: String!) {
    cancelAppointment(eaAppointmentId: $eaAppointmentId) {
      message
    }
  }
`;

export const AppointmentItem = ({
  id,
  providerName,
  providerType,
  startTimeInUtc,
  meetLink,
  actions = false,
}: {
  id: string;
  providerName: string;
  providerType: Role;
  startTimeInUtc: string;
  meetLink: string;
  actions?: boolean;
}) => {
  const [cancelAppointment] = useMutation(cancelAppointmentMutation);

  const onClickCancel = async () => {
    const answer = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (answer) {
      const { data } = await cancelAppointment({
        variables: {
          eaAppointmentId: id,
        },
      });

      if (data.cancelAppointment.message) {
        window.alert(data.cancelAppointment.message);
        window.location.reload();
      }
    }
  };

  const formattedTime = useMemo(() => {
    const startTime = new Date(startTimeInUtc);

    if (isToday(startTime)) {
      return `Today @ ${format(startTime, "h:mm aa")}`;
    } else if (isTomorrow(startTime)) {
      return `Tomorrow @ ${format(startTime, "h:mm aa")}`;
    }

    return format(startTime, "MM/dd/yy @ h:mm aa");
  }, [startTimeInUtc]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full bg-white rounded-md px-4 py-3 my-4">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h4 className="text-indigo-800 text-lg md:text-xl font-bold font-mulish text-center md:text-left">
            Appointment with {providerName}
          </h4>
        </div>
        <div className="flex flex-row justify-center md:justify-start">
          <span className="text-gray-700 text-sm md:text-md text-center md:text-left">
            {formattedTime}
          </span>
          <span className="text-gray-700 text-sm md:text-md text-center md:text-left px-2">
            |
          </span>
          <span className="text-gray-700 text-sm md:text-md text-center md:text-left">
            {roleToText(providerType)}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-4 md:mt-0 md:ml-10 space-x-2">
        <a
          className="flex items-center justify-center px-8 text-md md:text-lg py-2 md:py-2.5 bg-indigo-800 rounded-md text-white font-mulish font-bold hover:bg-indigo-700"
          href={meetLink}
        >
          Join visit
        </a>
        {actions && (
          <>
            <Link
              href={`/appointments/${id}`}
              className="flex items-center justify-center px-3 text-md md:text-lg py-2 md:py-2.5 bg-indigo-800 rounded-md text-white font-mulish font-bold hover:bg-indigo-700"
            >
              <PencilIcon className="w-7 h-7 text-white" />
            </Link>
            <button
              onClick={onClickCancel}
              className="flex items-center justify-center px-3 text-md md:text-lg py-2 md:py-2.5 bg-indigo-800 rounded-md text-white font-mulish font-bold hover:bg-indigo-700"
            >
              <XIcon className="w-7 h-7 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
