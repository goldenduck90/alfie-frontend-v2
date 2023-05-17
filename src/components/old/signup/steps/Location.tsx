import React from "react"
import { useField } from "formik"
import { SelectInput } from "../../../inputs/SelectInput"
import { States } from "../../../../utils/states"

export const Location: React.FC = () => {
  const [, { value }] = useField("fullName")
  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Nice to meet you,{" "}
        <span className="capitalize">{value.split(" ")[0]}</span>!
        <br />
        <br />
        Alfie is currently available in select states. If we’re not available in
        yours, we will be soon!
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">Where do you live?</p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="location"
          placeholder="Select an option..."
          options={States}
        />
      </div>
    </div>
  )
}
