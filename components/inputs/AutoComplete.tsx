/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"
import * as Sentry from "@sentry/react"
import { useField } from "formik"
import { useEffect, useState } from "react"
import { useCachedState } from "../../hooks/useCachedState"
import { Loading } from "../Loading"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const AutoComplete = (props: any) => {
  const googleReverseGeoCode = gql`
    query reverseGeoCodeAddress {
      reverseGeoCode {
        formatted_address
        geometry {
          location {
            lat
            lng
          }
        }
      }
    }
  `
  const result = useQuery(googleReverseGeoCode, {})

  const [selectedLocation, setSelectedLocation] = useState()
  const [cacheValue, setCachedValue] = useCachedState(
    props.name,
    selectedLocation,
    props.cache
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, { value, error }, { setError, setValue }] = useField(props.name)
  function setFormikValue(formFieldValue: any) {
    setValue(formFieldValue.place_id)
    setSelectedLocation(formFieldValue)
    setCachedValue(formFieldValue)
  }
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (result.error) {
      Sentry.captureException(new Error(result.error.message), {
        tags: {
          query: "googleReverseGeoCode",
          component: "AutoComplete",
        },
      })
    }
  }, [result])
  return (
    <Combobox as="div" value={cacheValue} onChange={setFormikValue}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {props.label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-royalBlue focus:outline-none focus:ring-1 focus:ring-royalBlue sm:text-sm"
          onChange={(event) => {
            if (event.target.value.length >= 3) {
              props.getLocations({
                variables: {
                  input: {
                    query: event.target.value,
                    type: "pharmacy",
                    radius: 100,
                    location: `${result?.data?.reverseGeoCode[0].geometry.location.lat},${result?.data?.reverseGeoCode[0].geometry.location.lng}`,
                  },
                },
              })
            }
          }}
          displayValue={(location: any) => location?.description}
          placeholder={props.placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {props.locations.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.locations.map((location: any) => (
              <Combobox.Option
                key={location.place_id}
                value={location}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-royalBlue text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {props.loading ? (
                        <Loading />
                      ) : (
                        <span
                          className={classNames(
                            "ml-3 truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {location.description}
                        </span>
                      )}
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-royalBlue-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
export default AutoComplete
