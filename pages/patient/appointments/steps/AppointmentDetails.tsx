/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { useField } from "formik";
import React from "react";
import { TextArea } from "../../../../src/components/inputs/TextArea";
import { roleToText } from "../../../../src/utils/roleToText";

export const AppointmentDetails = () => {
  const tz =
    new Date()
      .toLocaleString("en", { timeZoneName: "short" })
      .split(" ")
      .pop() || "UTC";
  const [, { value: eaProvider }] = useField("eaProvider");
  const [, { value: providerType }] = useField("providerType");
  const [, { value: startTimeInUtc }] = useField("startTimeInUtc");
  const [, { value: endTimeInUtc }] = useField("endTimeInUtc");
  const provider = roleToText(providerType);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl font-bold font-mulish">
          Confirm Appointment
        </h1>
        <p className="font-mulish text-gray-500 mt-4">
          Please review the details below and add any additional information you
          would like your {provider.toLowerCase()} to know about.
        </p>
      </div>

      <div className="flex flex-col mb-5">
        <h3 className="font-bold text-md font-mulish text-gray-900">
          Appointment Details
        </h3>
      </div>

      <div className="pb-2 flex flex-row">
        <h4 className="font-mulish text-indigo-800 font-bold">
          {provider} Name:{" "}
        </h4>
        <p className="font-mulish text-gray-900 ml-4">{eaProvider.name}</p>
      </div>

      <div className="pb-2 flex flex-row">
        <h4 className="font-mulish text-indigo-800 font-bold">Date: </h4>
        <p className="font-mulish text-gray-900 ml-4">
          {format(new Date(startTimeInUtc), "EEEE, MMMM do")}
        </p>
      </div>

      <div className="pb-2 flex flex-row">
        <h4 className="font-mulish text-indigo-800 font-bold">Start Time: </h4>
        <p className="font-mulish text-gray-900 ml-4">
          {format(new Date(startTimeInUtc), "h:mm aa")} ({tz})
        </p>
      </div>

      <div className="pb-2 flex flex-row">
        <h4 className="font-mulish text-indigo-800 font-bold">End Time: </h4>
        <p className="font-mulish text-gray-900 ml-4">
          {format(new Date(endTimeInUtc), "h:mm aa")} ({tz})
        </p>
      </div>

      <div className="flex flex-col mt-5">
        <h3 className="font-bold text-md font-mulish text-gray-900">
          Additional Notes
        </h3>
        <p className="text-sm font-mulish text-gray-500 mt-2">
          Provide any additional information you would like your{" "}
          {provider.toLowerCase()} to know prior the the appointment
        </p>
        <div className="mt-4">
          <TextArea
            name="notes"
            placeholder="Enter any additional information here..."
            rows={5}
          />
        </div>
      </div>
    </div>
  );
};
