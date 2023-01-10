import { useField } from "formik"

export const FileBox = ({
  name,
  placeholder,
  disabled = false,
  onChange,
}: {
  name: string
  placeholder: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [, { value, error }, { setValue }] = useField(name)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.files)
    if (onChange) onChange(e)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label
          className={`flex flex-col w-full h-36 border-4 border-dashed ${
            error && "border-red-500"
          } ${
            disabled
              ? "bg-gray-100 border-gray-300"
              : "hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="pt-1 mx-2 text-center text-sm tracking-wider font-mulish text-gray-400 group-hover:text-gray-600">
              {value ? value[0].name : placeholder}
            </p>
          </div>
          <input
            type="file"
            className="opacity-0"
            disabled={disabled}
            multiple={false}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
    </div>
  )
}
