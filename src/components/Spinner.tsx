import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export const Spinner = ({
  size = 24,
  scheme = "light",
  ml = 0,
  mr = 0,
}: {
  size?: number
  scheme?: "dark" | "light"
  mr?: number
  ml?: number
}) => (
  <FontAwesomeIcon
    icon={faSpinner}
    className={`animate-spin ${
      scheme === "dark" ? "text-indigo-800" : "text-white"
    } mr-${mr} ml-${ml}`}
    style={{
      height: size,
      width: size,
    }}
  />
)
