import React from "react"
import { SelectInput } from "../../../../components/inputs/SelectInput"

export const ProviderSelection = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl font-bold font-mulish">
          Schedule Appointment
        </h1>
        <p className="font-mulish text-gray-500 mt-4">
          We need copy to put here. What should we put here. It is a great spot
          to say something right here.
        </p>
      </div>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">
          What type of provider would you like to schedule an appointment with?
        </p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="providerType"
          placeholder="Select an option..."
          options={[
            { label: "Practitioner", value: "Practitioner" },
            { label: "Health Coach", value: "HealthCoach" },
          ]}
        />
      </div>
    </div>
  )
}
