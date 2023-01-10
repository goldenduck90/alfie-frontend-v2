import React from "react"
import { Spinner } from "./Spinner"

export const Button = ({
  title,
  fullWidth = false,
  onPress,
  loading = false,
  disabled = false,
  buttonLeft,
  buttonRight,
  spinnerSize = 6,
  spinnerMr = 0,
  spinnerMl = 0,
  bold = false,
  customClass = "",
}: {
  title: string
  scheme?: "primary" | "secondary" | "no-border"
  fullWidth?: boolean
  onPress: () => void
  buttonLeft?: React.ReactNode
  buttonRight?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  spinnerSize?: number
  spinnerMr?: number
  spinnerMl?: number
  bold?: boolean
  customClass?: string
}) => (
  <button
    className={`
      bg-royalBlue 
      hover:bg-indigo-700 
      ${!loading && disabled && "disabled:bg-gray-200"}
      text-white 
      py-2.5 
      px-4 
      ${fullWidth && "w-full"}
      rounded-sm
      font-mulish
      flex
      flex-row
      ${bold && "font-bold"}
      items-center
      justify-center
      mt-4
      ${customClass}
    `}
    onClick={onPress}
    disabled={disabled}
  >
    {!loading && buttonLeft}
    {loading && !buttonRight && (
      <Spinner
        size={spinnerSize}
        scheme="light"
        mr={spinnerMr}
        ml={spinnerMl}
      />
    )}
    {title}
    {!loading && buttonRight}
    {loading && buttonRight && (
      <Spinner
        size={spinnerSize}
        scheme="light"
        mr={spinnerMr}
        ml={spinnerMl}
      />
    )}
  </button>
)
