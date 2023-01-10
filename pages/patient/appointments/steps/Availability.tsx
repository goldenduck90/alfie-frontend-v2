import { ApolloError, gql, useQuery } from "@apollo/client"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid"
import * as Sentry from "@sentry/react"
import { addDays, format, isToday } from "date-fns"
import { useField } from "formik"
import { useEffect } from "react"
import { IconButton } from "../../../../components/IconButton"
import { Spinner } from "../../../../components/Spinner"
import { Role, Timeslot } from "../../../../graphql/generated"
import { roleToText } from "../../../../utils/roleToText"
const allTimeslotsQuery = gql`
  query AllTimeslots($input: AllTimeslotsInput!) {
    allTimeslots(input: $input) {
      selectedDateInUtc
      total
      eaService {
        id
        name
        durationInMins
        description
      }
      timeslots {
        startTimeInUtc
        endTimeInUtc
        eaProvider {
          id
          name
        }
      }
    }
  }
`

const providerTimeslotsQuery = gql`
  query ProviderTimeslots($input: ProviderTimeslotsInput!) {
    providerTimeslots(input: $input) {
      selectedDateInUtc
      total
      eaService {
        id
        name
        durationInMins
        description
      }
      timeslots {
        startTimeInUtc
        endTimeInUtc
        eaProvider {
          id
          name
        }
      }
    }
  }
`

const TimeslotButton = ({
  timeslot,
  tz,
}: {
  timeslot: Timeslot
  tz: string
}) => {
  const [
    ,
    { value: startTimeInUtc },
    { setValue: setStartTimeInUtc, setError: setStartTimeError },
  ] = useField("startTimeInUtc")
  const [, , { setValue: setEndTimeInUtc, setError: setEndTimeError }] =
    useField("endTimeInUtc")
  const [, , { setValue: setEaProvider, setError: setEaProviderError }] =
    useField("eaProvider")

  const onClick = () => {
    setEaProvider(timeslot.eaProvider)
    setStartTimeInUtc(timeslot.startTimeInUtc)
    setEndTimeInUtc(timeslot.endTimeInUtc)
    setStartTimeError(undefined)
    setEndTimeError(undefined)
    setEaProviderError(undefined)
  }

  return (
    <button
      onClick={onClick}
      disabled={timeslot.startTimeInUtc === startTimeInUtc}
      className="bg-white hover:bg-indigo-800 hover:text-white disabled:bg-indigo-800 disabled:text-white text-indigo-800 font-mulish font-bold py-1 md:py-2 px-4 border-2 border-indigo-800 rounded w-full mb-3 ease-in-out duration-300 text-sm md:text-md"
    >
      {format(new Date(timeslot.startTimeInUtc), "h:mm aa")} -{" "}
      {format(new Date(timeslot.endTimeInUtc), "h:mm aa")} ({tz})
    </button>
  )
}

const Scheduler = ({
  timeslots,
  tz,
  loading = false,
  error,
  total = 0,
  providerType,
  selectedDate,
  setSelectedDate,
  first = false,
}: {
  timeslots: Timeslot[]
  tz: string
  total?: number
  loading?: boolean
  error?: ApolloError
  providerType: Role
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  first?: boolean
}) => {
  const provider = roleToText(providerType)
  const [, { error: startTimeError }] = useField("startTimeInUtc")
  const [, { error: endTimeError }] = useField("endTimeInUtc")
  const [, { value: reschedule }] = useField("reschedule")

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl font-bold font-mulish">
          {reschedule ? "Reschedule" : "Schedule"} Appointment
        </h1>
        <p className="font-mulish text-gray-500 mt-4">
          Please select a date &amp; time that you would like to{" "}
          {reschedule ? "reschedule" : "schedule"} your{" "}
          {first ? "first meeting" : "follow up"} with your{" "}
          {provider.toLowerCase()}.
        </p>
      </div>

      {startTimeError || endTimeError ? (
        <div className="flex flex-col items-center mb-4">
          <span className="text-red-500 text-md text-center">
            {startTimeError || endTimeError}
          </span>
        </div>
      ) : null}

      <div className="flex flex-row justify-between border-b pb-4 border-gray-300">
        <IconButton
          onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          disabled={isToday(selectedDate)}
        >
          <ArrowLeftIcon
            className={`w-5 h-5 md:w-6 md:h-6 ${
              isToday(selectedDate) ? "text-gray-300" : "text-indigo-800"
            }`}
          />
        </IconButton>

        <h3 className="text-gray-800 font-mulish font-bold text-sm md:text-lg">
          {format(selectedDate, "E, MMMM do")} {total ? `(${total})` : null}
        </h3>

        <IconButton onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
          <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6 text-indigo-800" />
        </IconButton>
      </div>
      {loading ? (
        <div className="mt-6 flex flex-col items-center justify-center">
          <Spinner scheme="dark" size={42} />
        </div>
      ) : error ? (
        <div className="py-4 px-4 border bg-red-100 border-red-700 rounded mt-6">
          <p className="font-mulish text-red-700 text-center">
            {error.message}
          </p>
        </div>
      ) : timeslots.length === 0 ? (
        <div className="py-4 px-4 border bg-yellow-50 border-yellow-700 rounded mt-6">
          <p className="font-mulish text-yellow-700 text-center">
            No timeslots available for the selected date. Please select another
            date.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-between mt-6 h-64 md:h-96 overflow-y-scroll scroll-auto">
          {timeslots.map((timeslot: Timeslot) => (
            <TimeslotButton
              key={timeslot.startTimeInUtc}
              timeslot={timeslot}
              tz={tz}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const AllProviders = () => {
  const timezone =
    new Date()
      .toLocaleString("en", { timeZoneName: "short" })
      .split(" ")
      .pop() || "UTC"
  const [, { value: providerType }] = useField("providerType")
  const [, { value: selectedDate }, { setValue }] = useField("selectedDate")

  const { data, loading, error } = useQuery(allTimeslotsQuery, {
    variables: {
      input: {
        providerType,
        selectedDate,
        eaServiceId: "1",
      },
    },
  })
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "AllTimeslots",
          component: "AllProviders",
        },
      })
    }
  }, [error])

  return (
    <Scheduler
      timeslots={data?.allTimeslots?.timeslots}
      selectedDate={selectedDate}
      setSelectedDate={setValue}
      tz={timezone}
      loading={loading}
      total={data?.allTimeslots?.total}
      error={error}
      providerType={providerType}
      first
    />
  )
}

const SpecificProvider = () => {
  const timezone =
    new Date()
      .toLocaleString("en", { timeZoneName: "short" })
      .split(" ")
      .pop() || "UTC"
  const [, { value: providerType }] = useField("providerType")
  const [, { value: userEaProviderId }] = useField("userEaProviderId")
  const [, { value: selectedDate }, { setValue }] = useField("selectedDate")

  const { data, loading, error } = useQuery(providerTimeslotsQuery, {
    variables: {
      input: {
        eaProviderId: userEaProviderId,
        selectedDate,
        eaServiceId: "1",
      },
    },
  })
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "ProviderTimeslots",
          component: "SpecificProvider",
        },
      })
    }
  }, [error])
  return (
    <Scheduler
      timeslots={data?.providerTimeslots?.timeslots}
      selectedDate={selectedDate}
      setSelectedDate={setValue}
      tz={timezone}
      loading={loading}
      total={data?.providerTimeslots?.total}
      error={error}
      providerType={providerType}
    />
  )
}

export const AvailabilityWrapper = () => {
  const [, { value }] = useField("userEaProviderId")
  const [, { value: providerType }] = useField("providerType")

  if (!providerType) return null // if reschedule, wait until we get this data from api and add to form

  console.log(value)
  if (value) {
    return <SpecificProvider />
  }

  return <AllProviders />
}
