import DailyIframe from "@daily-co/daily-js"
import { Layout } from "@src/components/layouts/Layout"
import { useUserSession } from "@src/hooks/useUserSession"
import { useRouter } from "next/router"
import React from "react"

const Call = () => {
  const session = useUserSession()
  const { callId } = useRouter().query as { callId: string };

  React.useEffect(() => {
    //   DailyIframe.createFrame()
    const callFrame = DailyIframe.wrap(
      document.getElementById("call-frame") as any
    )
    callFrame.join({ url: `https://alfie.daily.co/${callId}` })
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