import DailyIframe from "@daily-co/daily-js"
import * as Sentry from "@sentry/react"
import { Layout } from "@src/components/layouts/Layout"
import { useUserSession } from "@src/hooks/useUserSession"
import { useRouter } from "next/router"
import React from "react"
import { gql, useMutation } from "@apollo/client";

const updateAppointmentAttendedMutation = gql`
  mutation UpdateAppointmentAttended($eaAppointmentId: String!) {
    updateAppointmentAttended(eaAppointmentId: $eaAppointmentId) {
      message
    }
  }
`;

const Call = () => {
  const session = useUserSession()
  const { callId, appointmentId } = useRouter().query as { callId: string, appointmentId: string };
  const [updateAppointmentAttended] = useMutation(updateAppointmentAttendedMutation);

  React.useEffect(() => {
    //   DailyIframe.createFrame()
    const callFrame = DailyIframe.wrap(
      document.getElementById("call-frame") as any
    )
    callFrame.join({ url: `https://alfie.daily.co/${callId}` })
      .then(async (participants) => {
        try {
          await updateAppointmentAttended({
            variables: {
              eaAppointmentId: appointmentId
            }
          })
        } catch (error) {
          const errorLog = `Error marking patient as attended for appointment ${appointmentId}.`
          console.log(errorLog)
          Sentry.captureEvent({
            exception: error as any,
            message: errorLog,
            level: "error",
            contexts: { data: { participants } },
          })
        }
      })
    callFrame.setUserName(String(session[0]?.user?.name))
  }, [callId, session])

  return (
    <Layout
      title="Video Call"
      hasBackButton={true}
    >
      <iframe
        allow="camera;microphone"
        id="call-frame"
        className="w-full h-208"
      />
    </Layout>
  )
}

Call.isAuthRequired = true;

export default Call;
