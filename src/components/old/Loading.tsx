import React from "react"
import { Spinner } from "./Spinner"

export const Loading = ({ size = 64 }: { size?: number }) => (
  <div className="flex justify-center items-center">
    <Spinner size={size} scheme="dark" />
  </div>
)
