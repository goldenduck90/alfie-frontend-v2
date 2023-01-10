import { Dispatch, useEffect, useState } from "react"

export type LocatStorageValue =
  | Record<string, unknown>
  | string
  | number
  | null
  | undefined
  | []

export const getInitialValue = <T>(
  when: boolean,
  storageKey: string,
  fallbackState: T
) => {
  let initialValues
  if (when) {
    try {
      initialValues = localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey) as string)
        : fallbackState
    } catch (e) {
      initialValues = fallbackState
      console.error(e)
    }
  }
  return initialValues
}

export const useCachedState = <T>(
  storageKey: string,
  fallbackState: T,
  when = true
): [T, Dispatch<T>] => {
  const initialValues = getInitialValue(when, storageKey, fallbackState)

  const [value, setValue] = useState(initialValues)
  useEffect(() => {
    if (when) {
      const desiredValue =
        typeof value === "string" && !value.length ? "" : JSON.stringify(value)
      localStorage.setItem(storageKey, desiredValue)
    }
  }, [value, storageKey, when])

  return [value, setValue]
}
