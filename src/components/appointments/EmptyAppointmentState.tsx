/* This example requires Tailwind CSS v2.0+ */
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PlusIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

export const EmptyAppointmentState = () => {
  return (
    <div className="text-center">
      <FontAwesomeIcon className="h-8" icon={faCalendarDays} />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No Appointments
      </h3>
      <p className="mt-1 text-sm text-gray-500">Schedule an appointment...</p>
      <div className="mt-6">
        <Link
          to="/appointments/create"
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Appointment
        </Link>
      </div>
    </div>
  )
}
