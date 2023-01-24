// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import * as Sentry from "@sentry/react";
import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface IMeeting {
  eaAppointmentId: string;
  notes: string;
  endTimeInUtc: string;
  startTimeInUtc: string;
  location: string;
  eaCustomer: {
    name: string;
  };
}
export const CalendarView = () => {
  const [value, onChange] = useState(new Date());
  const userData = localStorage.getItem("user");
  const [user, setUser] = useState<any>(userData && JSON.parse(userData));
  const u = userData && JSON.parse(userData);

  const getAllProviderPatientsQuery = gql`
    query getProviderAppointments($eaProviderId: String!) {
      providerAppointments(eaProviderId: $eaProviderId) {
        eaAppointmentId
        notes
        startTimeInUtc
        location
        endTimeInUtc
        eaAppointmentId
        eaCustomer {
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(getAllProviderPatientsQuery, {
    variables: { eaProviderId: user?.eaProviderId },
  });
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "getProviderAppointments",
          component: "CalendarView",
        },
      });
    }
  }, [error]);
  const meetings: IMeeting[] = data?.providerAppointments || [];
  const meetingListBySelectedDate = meetings.filter(
    (meeting) =>
      new Date(meeting.startTimeInUtc).toDateString() ===
      new Date(value).toDateString()
  );
  const meetingsToShow: IMeeting[] = meetingListBySelectedDate || [];
  return (
    <div className="flex flex-row">
      <div>
        <Calendar
          tileClassName="col-span-1 flex justify-center py-4 px-4 border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-300"
          onChange={onChange}
          value={value}
          tileContent={({ activeStartDate, date, view }) =>
            // If a date in the month view has meetings, show a dot the meetings are found in the meetings array
            view === "month" &&
            meetings.filter(
              (meeting) =>
                new Date(meeting.startTimeInUtc).toDateString() ===
                new Date(date).toDateString()
            ).length > 0 ? (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            ) : null
          }
        />
      </div>
      <div>
        <section className="md:mt-0 md:pl-14">
          <h2 className="font-semibold text-gray-900">
            Schedule for{" "}
            <time dateTime="2022-01-21">{value.toDateString()}</time>
          </h2>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
            {meetingsToShow.length === 0 && (
              <div>
                {" "}
                <p>No meetings scheduled for this day</p>
              </div>
            )}
            {meetingsToShow.map((meeting: IMeeting, i) => (
              // Get the path of the meeting.location link and use that in the Link to="" prop
              <Link key={i} href={`/call/${meeting.location.split("/").pop()}`}>
                <li
                  key={meeting.eaAppointmentId}
                  className="group flex items-center mt-2 space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-300 bg-gray-200 hover:bg-royalBlue hover:text-white text-royalBlue"
                >
                  <div className="flex-auto">
                    <p className="">{meeting.eaCustomer.name}</p>
                    <p className="mt-0.5">
                      {/* Conver meeting.startTimeInUtC to datetime */}
                      <time dateTime={meeting.startTimeInUtc}>
                        {new Date(meeting.startTimeInUtc).toLocaleTimeString()}
                      </time>{" "}
                      -{" "}
                      <time dateTime={meeting.endTimeInUtc}>
                        {/* Format date to be HH:MM */}
                        {new Date(meeting.endTimeInUtc).toLocaleTimeString()}
                      </time>
                    </p>
                  </div>
                  <Menu
                    as="div"
                    className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
                  >
                    <div>
                      <Menu.Button className="-m-2 flex items-center rounded-full p-1.5">
                        <span className="sr-only">Open options</span>
                        <DotsHorizontalIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Cancel
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              </Link>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default CalendarView;
