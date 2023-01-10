import React from "react"

export const IconButton = ({
  onClick,
  disabled = false,
  children,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
