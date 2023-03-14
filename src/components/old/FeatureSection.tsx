import React from "react"

export const FeatureSection = ({
  icon,
  title,
  description,
  asterisk = false,
}: {
  icon?: React.ReactElement
  title: string
  description: string
  asterisk?: boolean
}) => (
  <div className="flex flex-col mb-6 md:mb-8">
    <div className="flex flex-row items-center mb-4">
      {icon}
      <h4 className="font-mulish text-md md:text-lg text-indigo-800 font-bold">
        {title}
        {asterisk && <span className="ml-1">*</span>}
      </h4>
    </div>
    <p className="font-mulish text-md">{description}</p>
  </div>
)
