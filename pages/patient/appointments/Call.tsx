/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router"
import DailyIframe from "@daily-co/daily-js"
import React from "react"
import { ApplicationLayout } from "../../../components/layouts/ApplicationLayout"
import { useAuth } from "../../../hooks/useAuth"
import { PractitionerApplicationLayout } from "../../../components/layouts/PractitionerApplicationLayout"

export const Call = () => {
  const user = useAuth()
  const { id } = useParams()
  React.useEffect(() => {
    //   DailyIframe.createFrame()
    const callFrame = DailyIframe.wrap(
      document.getElementById("call-frame") as any
    )
    callFrame.join({ url: `https://alfie.daily.co/${id}` })
    callFrame.setUserName(String(user?.user?.name))
  }, [id, user])

  return (
    <>
      {user?.user?.role === "Doctor" || user?.user?.role === "Practitioner" ? (
        <PractitionerApplicationLayout title="Call">
          <iframe
            allow="camera;microphone"
            id="call-frame"
            className="w-full h-208"
          />
        </PractitionerApplicationLayout>
      ) : (
        <ApplicationLayout title="Call">
          <iframe
            allow="camera;microphone"
            id="call-frame"
            className="w-full h-208"
          />
        </ApplicationLayout>
      )}
    </>
  )
}
