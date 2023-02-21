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
import dayjs from "dayjs";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";

export const appointmentDetailQuery = gql`
  query AppointmentsQuery($eaAppointmentId: String!) {
    appointment(eaAppointmentId: $eaAppointmentId) {
      eaAppointmentId
      startTimeInUtc
      endTimeInUtc
      location
      eaProvider {
        name
        type
      }
    }
  }
`;

const cancelAppointmentMutation = gql`
  mutation CancelAppointment($eaAppointmentId: String!) {
    cancelAppointment(eaAppointmentId: $eaAppointmentId) {
      message
    }
  }
`;

function AppointmentDetails() {
  const { appointmentId } = useRouter().query as { appointmentId: string };
  const router = useRouter();

  const { data, loading, error } = useQuery(appointmentDetailQuery, {
    variables: {
      eaAppointmentId: appointmentId,
    },
  });

  const {
    eaAppointmentId,
    startTimeInUtc,
    location,
    eaProvider,
    endTimeInUtc,
  } = data?.appointment || {};
  console.log(location);
  const firstNameInitial = eaProvider?.name?.charAt(0).toUpperCase();

  return (
    <Layout
      title="Appointment Details"
      subtitle={`Online appointment scheduled with ${eaProvider?.name}.`}
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
                  <p>{eaProvider?.name}</p>
                  <p>{eaProvider?.type}</p>
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
                    <>
                      <h2>
                        {dayjs(startTimeInUtc).format("h:m a")} -{" "}
                        {dayjs(endTimeInUtc).format("h:m a")}
                      </h2>
                      <p className="text-gray-400">
                        {dayjs(startTimeInUtc).format("d, dddd MMMM YYYY")}
                      </p>
                    </>
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
                      <h2>Online Meeting</h2>
                      <p className="text-gray-400 pb-4">
                        The link will be activated 15 minutes before the
                        meeting.
                      </p>
                    </>
                  )}
                  <a href={location} target="_blank" rel="noreferrer">
                    <Button buttonType="accent" disabled={loading}>
                      Join Meeting
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
                      <h2>About the meeting</h2>
                      <p className="text-gray-400">
                        An introductory meeting with a doctor, and patient
                        medical interview in the field of gastroenterology.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 md:-m-6 p-4 md:mt-2 flex justify-end gap-2 border-t rounded-b-xl">
            <Button disabled={loading} buttonType="urgent">
              Cancel this visit
            </Button>
            <Button disabled={loading}>Reschedule</Button>
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
