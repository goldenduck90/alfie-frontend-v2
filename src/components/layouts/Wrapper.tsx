import React from "react"

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center md:justify-center mx-3 md:mx-5 mb-10">
      {children}
    </div>
  )
}
