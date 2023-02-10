import { FC } from "react"
import { addBaseClass } from "./baseClasses"

export interface ITITLE
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  foo?: string // TODO: talk about themes
}
export const Title: FC<ITITLE> = ({ children, ...rest }) => {
  const className = `${addBaseClass("mb-5 mt-2 font-md font-bold text-lg")}`
  return (
    <p className={className} {...rest}>
      {children}
    </p>
  )
}
