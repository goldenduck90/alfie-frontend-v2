import { FC } from "react"

export interface IQuestion {
  header?: string | JSX.Element
  title?: string | JSX.Element
  aboveQuestionText?: string | JSX.Element
  questionText?: string | JSX.Element
  input: JSX.Element
}
export const Question: FC<IQuestion> = ({
  header,
  aboveQuestionText,
  questionText,
  input,
  title,
}) => {
  return (
    <div>
      {title && (
        <h1 className="text-xl md:text-2xl font-bold font-mulish text-center mb-12">
          {title}
        </h1>
      )}
      {header && (
        <div className="mb-5 mt-2 font-md font-mulish font-bold text-lg text-indigo-800 text-left">
          {header}
        </div>
      )}
      {aboveQuestionText && (
        <div className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
          {aboveQuestionText}
        </div>
      )}

      <div className="flex-flex-col mb-5">
        <div className="font-mulish text-gray-900">{questionText}</div>
      </div>

      <div className="pb-2">{input}</div>
    </div>
  )
}
