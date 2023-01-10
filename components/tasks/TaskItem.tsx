import { useMemo } from "react"
import { format, isToday, isTomorrow, formatDistance } from "date-fns"
import { Link } from "react-router-dom"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid"

export const TaskItem = ({
  id,
  type,
  title,
  createdAt,
  actionText,
  dueAt,
  pastDue,
  appointmentStartTime,
  meetingLocation,
  providerType,
}: {
  id: string
  type: string
  title: string
  createdAt: Date
  dueAt?: Date
  pastDue?: boolean | null
  actionText: string
  appointmentStartTime?: string
  meetingLocation?: string
  providerType?: string
}) => {
  const formattedTime = useMemo(() => {
    if (dueAt && !pastDue) {
      return `Due in ${formatDistance(new Date(dueAt), new Date())}`
    } else if (dueAt && pastDue) {
      return `Due ${formatDistance(new Date(dueAt), new Date())} ago`
    } else {
      return `Assigned ${formatDistance(new Date(createdAt), new Date())} ago`
    }
  }, [dueAt, pastDue, createdAt])

  const formatAppointmentStartTime = useMemo(() => {
    if (appointmentStartTime) {
      const startTime = new Date(appointmentStartTime)

      if (isToday(startTime)) {
        return `Today @ ${format(startTime, "h:mm aa")}`
      } else if (isTomorrow(startTime)) {
        return `Tomorrow @ ${format(startTime, "h:mm aa")}`
      }
      return format(startTime, "MM/dd/yy @ h:mm aa")
    } else {
      return ""
    }
  }, [appointmentStartTime])
  const getQueryParamIdFromMeetingUrl = meetingLocation?.split("/").pop()
  return (
    <Link
      to={
        meetingLocation
          ? `/appointments/call/${getQueryParamIdFromMeetingUrl}`
          : `/task/${type}/${id}`
      }
    >
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <li key={id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="truncate font-medium text-indigo-600">
                        {appointmentStartTime
                          ? `Appointment with ${title}`
                          : title}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          {appointmentStartTime
                            ? `${formatAppointmentStartTime} | ${providerType}`
                            : formattedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex -space-x-1 overflow-hidden">
                      {actionText}
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Link>
  )
}
