import React, { FC, RefObject } from "react"
import { useField } from "formik"
import { useCachedState } from "../../hooks/useCachedState"

export interface INumberInput {
  inputRef?: RefObject<HTMLInputElement>
  name: string
  placeholder: string
  type?: "number" | "tel"
  position?: "left" | "right"
  addonText?: string
  disabled?: boolean
  showError?: boolean
  maxLength?: number
  nextFieldRef?: RefObject<HTMLInputElement>
  cache?: boolean
}

export const NumberInput: FC<INumberInput> = ({
  inputRef,
  name,
  placeholder,
  type = "tel",
  disabled = false,
  position = "left",
  addonText = "",
  showError = true,
  maxLength = 0,
  nextFieldRef,
  cache,
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name)
  const [, setCachedValue] = useCachedState(name, value, cache)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (isNaN(val) || (`${val}`.length > maxLength && maxLength)) return
    if (cache) {
      setCachedValue(val)
    }
    setValue(val)

    if (nextFieldRef && `${val}`.length === maxLength) {
      nextFieldRef.current?.focus()
    }
  }

  return (
    <>
      <div
        className={`${
          error ? "border-red-500" : "border-gray-300"
        } flex flex-row w-full border rounded-sm`}
      >
        {position === "left" && addonText && (
          <span className="flex items-center px-3 text-gray-500 bg-gray-200">
            {addonText}
          </span>
        )}
        <input
          ref={inputRef}
          type={type}
          className="font-mulish w-full py-2 rounded-sm pl-4 pr-2 focus:outline-none appearance-none placeholder-gray-400"
          placeholder={placeholder}
          value={value}
          onFocus={(e) => {
            e.currentTarget.select()
            setError(undefined)
          }}
          onChange={onChange}
          disabled={disabled}
        />
        {position === "right" && addonText && (
          <span className="flex items-center px-3 text-gray-500 bg-gray-200 whitespace-nowrap">
            {addonText}
          </span>
        )}
      </div>
      {showError && error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </>
  )
}
