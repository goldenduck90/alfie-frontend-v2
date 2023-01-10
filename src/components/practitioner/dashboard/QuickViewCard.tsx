import { CalendarIcon } from "@heroicons/react/solid"
import { UsersIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export const QuickViewCard = ({
  totalPatients,
  totalAppointments,
}: {
  totalPatients: number
  totalAppointments: number
}) => {
  const stats = [
    {
      id: 1,
      name: "Patients",
      stat: totalPatients,
      icon: UsersIcon,
      link: "/patients",
    },
    {
      id: 2,
      name: "Upcoming Appointments",
      stat: totalAppointments,
      icon: CalendarIcon,
      link: "/appointments",
    },
  ]
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-royalBlue p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    to={item.link}
                    className="font-medium text-royalBlue hover:text-royalBlue"
                  >
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
