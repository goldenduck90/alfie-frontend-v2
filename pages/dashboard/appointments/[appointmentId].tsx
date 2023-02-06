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

const appointmentDetailsQuery = gql`
  query AppointmentDetailsQuery($appointmentId: String!) {
    appointment(id: $appointmentId) {
      _id
      type
      title
      createdAt
      dueAt
      pastDue
      actionText
      appointmentStartTime
      meetingLocation
      providerType
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
  const appointmentDetailsResult = useQuery(appointmentDetailsQuery, {
    variables: {
      appointmentId,
    },
  });

  console.log({ appointmentDetailsResult });
  return (
    <div className="flex flex-col md:flex-row md:gap-6 bg-white md:bg-transparent border md:border-none p-4 md:p-0 rounded-xl">
      <div className=" md:p-6 w-full max-w-3xl rounded-xl md:border bg-white ">
        <h2 className="font-semibold text-gray-900 pb-6">
          Appointment Details
        </h2>
        <div className="flex flex-col pb-4 md:flex-row md:p-6 items-center md:[align-items:normal]">
          <div className="border-b md:border-r md:border-b-0 flex flex-col items-center max-w-[232px] pb-4 md:pb-0">
            <div className="bg-brand-peachy h-28 w-28 rounded-full mx-[60px] " />
            <p>noah pierre</p>
            <p>Gastroenterology</p>
            <div className="flex gap-2 pt-3">
              <IconButton icon={ChatIcon} iconColor="primary-500" />
              <IconButton icon={CalendarIcon} iconColor="primary-500" />
              <IconButton icon={LocationMarkerIcon} iconColor="primary-500" />
            </div>
          </div>
          <div className="pt-4 md:pt-0">
            {[1, 1, 1, 1].map(() => (
              <div className="flex pb-6 md:pl-6">
                <div>
                  <ClockIcon className="w-6 h-6 mr-2 mt-[3px]" />
                </div>
                <div>
                  <h2>8:00 - 8:30 AM</h2>
                  <p className="text-gray-400">Saturday, 29 January 2023</p>
                  <p className="text-gray-400">
                    An introductory meeting with a doctor, and patient medical
                    interview in the field of gastroenterology.
                  </p>
                </div>
              </div>
            ))}
          </div>
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
  );
}

AppointmentDetails.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Appointment Details"
    subtitle="Online appointment scheduled with {name}."
    hasBackButton={true}
  >
    {page}
  </Layout>
);

AppointmentDetails.isAuthRequired = true;

export default AppointmentDetails;
