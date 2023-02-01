import { AnswerType, UserAnswer } from "../../graphql/generated"
import { isValid } from "date-fns"

export const parseCachedVal = <T>(cachedVal: string, defaultVal: T): T => {
  let val = defaultVal
  try {
    if (cachedVal) {
      val = JSON.parse(cachedVal)
    }
  } catch (e) {
    console.error("Cache error", e)
  }
  return val
}

export const getAnswerType = (value: string | string[] | number) => {
  console.log(value, "value")
  let type: AnswerType = AnswerType.String
  switch (true) {
    case typeof value === "boolean":
      type = AnswerType.Boolean
      break
    case Array.isArray(value):
      type = AnswerType.Array
      break
    case isValid(new Date(value as unknown as string)):
      type = AnswerType.Date
      break
    case typeof value === "number":
      type = AnswerType.Number
      break
    default:
      break
  }
  return type
}

export const convertFormValuesIntoAnswers = (
  values: Record<string, string | string[] | number>
) => {
  const filteredValues = Object.keys(values).filter(
    (v) => !!`${values[v]}`.length
  )
  return filteredValues.map((valueKey) => {
    let value = values[valueKey as keyof typeof values]
    const answerType = getAnswerType(value)
    if (Array.isArray(value)) {
      value = value.join(",")
    } else if (typeof value !== "string") {
      value = `${value}`
    }
    const answer: UserAnswer = { key: valueKey, value, type: answerType }
    return answer
  })
}

export const clearFormCache = (values = {}) => {
  Object.keys(values).forEach((key) => {
    delete localStorage[key]
  })
}
