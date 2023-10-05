import React from "react";
import { Layout } from "@src/components/layouts/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  ClockIcon,
  DocumentTextIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { Line } from "@src/components/ui/Line";
import { IconButton } from "@src/components/IconButton";
import { CalendarIcon, ChatIcon } from "@heroicons/react/outline";
import { Button } from "@src/components/ui/Button";
import Image from "next/image";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { useUserStateContext } from "@src/context/SessionContext";
import { ScheduleAppointment } from "@src/components/modal/variants/schedule/Schedule";
import { DialogModal } from "@src/components/modal/Dialog";
import { CancelConfirmation } from "@src/components/modal/variants/schedule/CancelConfirmation";
import { getTimeZone, TZ_FORMAT } from "@src/utils/timezone";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.tz.setDefault(dayjs.tz.guess());

export const appointmentDetailQuery = gql`
  query AppointmentsQuery($input: GetAppointmentInput!) {
    appointment(input: $input) {
      eaAppointmentId
      start
      end
      location
      notes
      eaProvider {
        id
        name
        type
        email
      }
      eaCustomer {
        id
        name
        email
      }
      userId
    }
  }
`;

function AppointmentDetails() {
  const { appointmentId } = useRouter().query as { appointmentId: string };
  const router = useRouter();
  const session = useUserStateContext();

  const { data, loading, error, refetch } = useQuery(appointmentDetailQuery, {
    variables: {
      input: {
        eaAppointmentId: appointmentId,
        timezone: dayjs.tz.guess(),
      },
    },
  });

  const {
    eaAppointmentId,
    start,
    end,
    location,
    notes,
    eaProvider,
    eaCustomer,
    userId,
  } = data?.appointment || {};

  const isProvider = session[0]?.user?.role !== "Patient";
  const firstNameInitial = isProvider
    ? eaCustomer?.name?.charAt(0).toUpperCase()
    : eaProvider?.name?.charAt(0).toUpperCase();
  const startDate = dayjs(start);
  const hasStarted = dayjs().isAfter(startDate);

  return (
    <Layout
      title="Appointment Details"
      subtitle={
        loading
          ? "Loading Details..."
          : `Online appointment scheduled with ${
              isProvider ? eaCustomer?.name : eaProvider?.name
            }.`
      }
      hasBackButton={true}
    >
      <div className="flex flex-col md:flex-row md:gap-6 bg-white md:bg-transparent border md:border-none p-4 md:p-0 rounded-xl">
        <div className=" md:p-6 w-full max-w-3xl rounded-xl md:border bg-white ">
          <h2 className="font-semibold text-gray-900 pb-7">
            Appointment Details
          </h2>
          <div className="flex flex-col pb-4 md:flex-row  items-center md:[align-items:normal]">
            <div className="border-b md:border-r md:border-b-0 flex flex-col items-center max-w-[232px] w-full pb-4 md:pb-0">
              <div className="relative">
                {
                  //TODO: Provider picture
                  true ? (
                    <div className="relative flex items-center justify-center h-28 w-28 bg-brand-peachy-tint-1 rounded-full text-gray-700 font-semibold text-4xl mx-[60px]">
                      {firstNameInitial}
                      <div className="absolute h-5 w-5 bg-green-500 border-[3px] border-white rounded-full bottom-0 right-4" />
                    </div>
                  ) : (
                    <Image height={64} width={64} src={""} alt="User Photo" />
                  )
                }
              </div>
              {loading ? (
                <div className="w-20">
                  <PlaceHolderLine amount={2} hasTopMargin />
                </div>
              ) : (
                <>
                  <p>{isProvider ? eaCustomer?.name : eaProvider?.name}</p>
                  <p>{isProvider ? "Patient" : eaProvider?.type}</p>
                </>
              )}
              <div className="flex gap-2 pt-3">
                <IconButton
                  onClick={() => router.push("/dashboard/chat")}
                  icon={ChatIcon}
                  iconColor="primary-500"
                />
                <IconButton
                  onClick={() => router.push("/dashboard")}
                  icon={CalendarIcon}
                  iconColor="primary-500"
                />
                <IconButton
                  onClick={() => router.push("/dashboard")}
                  icon={LocationMarkerIcon}
                  iconColor="primary-500"
                />
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="flex pb-6 md:pl-6">
                <div>
                  <ClockIcon className="w-6 h-6 mr-2 " />
                </div>
                <div>
                  {loading ? (
                    <div className="w-40">
                      <PlaceHolderLine amount={2} hasTopMargin />
                    </div>
                  ) : (
                    <h2>
                      {startDate.isToday()
                        ? `Today @ ${startDate.format("h:mm A")}`
                        : startDate.isTomorrow()
                        ? `Tomorrow @ ${startDate.format("h:mm A")}`
                        : startDate.format("MM-DD-YYYY @ h:mm A")}{" "}
                      - {dayjs(end).format("h:mm A")}{" "}
                      {`(${getTimeZone(TZ_FORMAT.SHORT)})`}
                    </h2>
                  )}
                  {loading ? (
                    <PlaceHolderLine />
                  ) : (
                    <p className="text-gray-400">
                      An introductory meeting with a doctor, and patient medical
                    </p>
                  )}
                </div>
              </div>
              <div className="flex pb-6 md:pl-6">
                <div>
                  <LocationMarkerIcon className="w-6 h-6 mr-2 " />
                </div>
                <div>
                  {loading ? (
                    <div className="w-40">
                      <PlaceHolderLine amount={2} hasTopMargin />
                    </div>
                  ) : (
                    <>
                      <h2>Online Appointment</h2>
                      <p className="text-gray-400 pb-4">
                        The link will be activated 15 minutes before the
                        appointment.
                      </p>
                    </>
                  )}
                  <a
                    href={location + "?appointmentId=" + eaAppointmentId}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      buttonType="accent"
                      onClick={() => {
                        window.open(
                          location + "?appointmentId=" + eaAppointmentId,
                          "_blank"
                        );
                      }}
                      disabled={loading}
                    >
                      Join Video Call
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex pb-6 md:pl-6">
                <div>
                  <DocumentTextIcon className="w-6 h-6 mr-2 " />
                </div>
                <div>
                  {loading ? (
                    <div className="w-40">
                      <PlaceHolderLine amount={2} hasTopMargin />
                    </div>
                  ) : (
                    <>
                      <h2>Notes</h2>
                      <p className="text-gray-400">
                        {notes || "No notes for this appointment."}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 md:-m-6 p-4 md:mt-2 flex justify-end gap-2 border-t rounded-b-xl">
            <DialogModal
              triggerAsChild
              trigger={
                <Button
                  disabled={loading || hasStarted}
                  buttonType="urgent"
                  onClick={() => {}}
                >
                  Cancel this visit
                </Button>
              }
            >
              <CancelConfirmation
                eaAppointmentId={eaAppointmentId}
                eaProvider={eaProvider}
                eaCustomer={eaCustomer}
                start={start}
                end={end}
              />
            </DialogModal>
            <DialogModal
              triggerAsChild
              trigger={
                <Button disabled={loading || hasStarted} onClick={() => {}}>
                  Reschedule
                </Button>
              }
            >
              <ScheduleAppointment
                eaAppointmentId={eaAppointmentId}
                start={start}
                end={end}
                notes={notes}
                userId={isProvider ? userId : undefined}
                eaCustomerName={eaCustomer?.name}
                healthCoach={String(eaProvider?.id) === "118"}
                onComplete={() => {
                  refetch();
                }}
              />
            </DialogModal>
          </div>
        </div>
        <div>
          <div className="p-6 md:min-w-[360px] rounded-xl md:border bg-white ">
            <Line color="medium" className="pb-7 md:hidden" />
            <h2 className="font-semibold text-gray-900 pb-6">Documentation</h2>
            <div className="flex flex-col items-center bg-gray-100 py-10">
              <DocumentTextIcon className="h-8 w-8" />
              <p className="text-gray-600 pt-5 max-w-[200px] text-center">
                You don&apos;t have any <br /> documentation attached.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

AppointmentDetails.isAuthRequired = true;

export default AppointmentDetails;
