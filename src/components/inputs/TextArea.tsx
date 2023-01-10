import { useField } from "formik"
import { FC } from "react"

export interface ITextInput {
  name: string
  placeholder?: string
  disabled?: boolean
  cache?: boolean
  rows?: number
}
export const TextArea: FC<ITextInput> = ({
  name,
  placeholder = "Enter text here...",
  disabled = false,
  rows = 5,
}) => {
  const [, { value, error }, { setValue, setError }] = useField(name)

  return (
    <div className="flex flex-col">
      <textarea
        rows={rows}
        disabled={disabled}
        onFocus={() => setError(undefined)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`${
          error ? "border-red-500" : "border-gray-300"
        } font-mulish w-full px-3 py-2 focus:outline-none appearance-none rounded-sm border`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}
