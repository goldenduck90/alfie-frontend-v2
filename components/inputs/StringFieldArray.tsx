import { useField } from "formik"
import { ChangeEventHandler, FC } from "react"
import { useCachedState } from "../../hooks/useCachedState"

export interface IStringFieldArray {
  name: string
  cache?: boolean
}
export const StringFieldArray: FC<IStringFieldArray> = ({ name, cache }) => {
  const [, { value }, { setValue }] = useField(name)
  const values: string[] = value
  const [cachedValue, setCachedValue] = useCachedState(name, value, cache)

  const desiredValue: string[] = cache ? cachedValue : values

  const handleAdd = () => {
    const newValues = [...values, ""]
    if (cache) {
      setCachedValue(newValues)
    }
    setValue(newValues)
  }
  return (
    <div>
      <div>
        {desiredValue?.map((_val, i) => {
          const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            const newFieldInputs = [...desiredValue]
            newFieldInputs[i] = e.target.value
            if (cache) {
              setCachedValue(newFieldInputs)
            }
            setValue(newFieldInputs)
          }

          const handleRemove = () => {
            const newValues = desiredValue.filter((v, index) => index !== i)
            if (cache) {
              setCachedValue(newValues)
            }
            setValue(newValues)
          }
          return (
            <div key={i} className="flex flex-col mb-5">
              <div className="flex">
                <input
                  type="text"
                  onChange={handleChange}
                  value={desiredValue[i]}
                  placeholder=""
                  className={
                    "border-gray-300  font-mulish w-full px-3 py-2 focus:outline-none appearance-none  rounded-sm border"
                  }
                />
                {!!i && (
                  <button
                    onClick={handleRemove}
                    className={
                      "border-gray-300 rounded-sm border w-14 ml-1 text-xl bg-gray-200 hover:bg-gray-300"
                    }
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <button
          onClick={handleAdd}
          className={
            "border-gray-300 rounded-sm border w-12 h-12 ml-1 text-xl bg-gray-200 hover:bg-gray-300"
          }
        >
          +
        </button>
      </div>
    </div>
  )
}
