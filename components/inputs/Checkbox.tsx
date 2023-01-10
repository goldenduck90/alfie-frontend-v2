import React from "react"
import { useField } from "formik"

export const Checkbox = ({
  name,
  label,
  disabled = false,
}: {
  name: string
  label: string
  disabled?: boolean
}) => {
  const [, { value }, { setValue, setError }] = useField(name)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
    setError(undefined)
  }
  return (
    <div className="flex flex-row items-center space-y-1 form-check">
      <input
        className="appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-indigo-800 checked:border-indigo-800 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-3 cursor-pointer"
        type="checkbox"
        value={value}
        checked={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <label className="font-mulish form-check-label text-gray-800">
        {label}
      </label>
    </div>
  )
}
