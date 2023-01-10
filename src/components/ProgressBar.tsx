import React from "react"

export const ProgressBar = ({ progress = 0 }: { progress: number }) => (
  <div
    className="h-3 bg-indigo-800 transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
)
