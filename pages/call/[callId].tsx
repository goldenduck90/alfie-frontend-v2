import React from "react";
import * as Sentry from "@sentry/react";
import DailyIframe from "@daily-co/daily-js";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { Layout } from "@src/components/layouts/Layout";
import { useUserSession } from "@src/hooks/useUserSession";

const updateAppointmentAttendedMutation = gql`
  mutation UpdateAppointmentAttended($eaAppointmentId: String!) {
    updateAppointmentAttended(eaAppointmentId: $eaAppointmentId) {
      message
    }
  }
`;

const Call = () => {
  const session = useUserSession();
  const userName = String(session[0]?.user?.name);
  const { callId, appointmentId } = useRouter().query as {
    callId: string;
    appointmentId: string;
  };
  const [updateAppointmentAttended] = useMutation(
    updateAppointmentAttendedMutation
  );

  React.useEffect(() => {
    console.log(
      `Daily call: joining call ${callId}, appointment ${appointmentId} with username ${userName}`
    );
    const callFrame = DailyIframe.wrap(
      document.getElementById("call-frame") as any
    );
    callFrame.on("joined-meeting", async (event) => {
      console.log("Post-daily call join, reporting event.");

      Sentry.captureMessage("Daily call joined.", {
        contexts: {
          Information: {
            appointmentId,
            callId,
            userName,
            participants: event?.participants ?? "Unknown",
          },
        },
      });

      try {
        await updateAppointmentAttended({
          variables: {
            eaAppointmentId: appointmentId,
          },
        });
      } catch (error) {
        const errorLog = `Error marking patient/provider as attended for appointment ${appointmentId}.`;
        console.log(errorLog);
        Sentry.captureException(error, {
          contexts: {
            Information: { userName, message: errorLog },
          },
        });
      }
    });

    callFrame.join({ url: `https://alfie.daily.co/${callId}` });

    callFrame.setUserName(userName);
  }, [callId, userName, appointmentId, updateAppointmentAttended]);

  return (
    <Layout title="Video Call" hasBackButton={true}>
      <iframe
        allow="camera;microphone;screen-wake-lock"
        id="call-frame"
        className="w-full h-208"
      />
    </Layout>
  );
};

Call.isAuthRequired = true;

export default Call;
