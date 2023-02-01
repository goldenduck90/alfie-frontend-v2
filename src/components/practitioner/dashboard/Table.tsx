import React from "react"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from 'next/link'
export type PatientAddress = {
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
}
export type PatientWeights = {
  value: number
  date: string
}
export type Patient = {
  _id: string
  name: string
  phone: string
  gender: string
  email: string
  dateOfBirth: string
  heightInInches: number
  meetingUrl: string | null
  view: string
  status: string
  address: PatientAddress
  weights: PatientWeights[]
}

const columnHelper = createColumnHelper<Patient>()

export const Table = ({
  patientData,
  loading,
}: {
  patientData: Patient[]
  loading: boolean
}) => {
  const [data, setData] = React.useState(patientData || [])
  const [currentPage, setCurrentPage] = React.useState(1)
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.gender, {
      id: "Gender",
      cell: (info) => info.getValue(),
      header: () => <span>Gender</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dateOfBirth", {
      header: () => "Date of Birth",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    // columnHelper.accessor("meetingUrl", {
    //   header: "Meeting Room URL",
    //   footer: (info) => info.column.id,
    // }),
    // Need a column for an action button

    columnHelper.accessor("status", {
      header: "Status",
      footer: (info) => info.column.id,
      cell: (info) => (
        <span
          className={`
          inline-flex items-center rounded-full  px-3 py-0.5 text-sm font-medium text-white
          ${info.getValue() === "Scheduled" ? "bg-royalBlue" : "bg-red-500"}
        `}
        >
          {info.getValue()}
        </span>
        // <span
        //   className={`${
        //     info.getValue() === "Visit Scheduled"
        //       ? "text-green-500"
        //       : "text-red-500"
        //   }`}
        // >
        //   {info.getValue()}
        // </span>
      ),
    }),
    columnHelper.accessor("view", {
      header: "Patient Details",
      footer: (info) => info.column.id,
      cell: (info) => (
        <Link
          className="text-royalBlue hover:text-royalBlueDark"
          href={`/patients?id=${info.row.original._id}`}
        >
          View
        </Link>
      ),
    }),
  ]
  // Paginate the table
  const filterFunction: any = (row: any, columnId: any, value: any) => {
    if (columnId === "name") {
      return row.name.toLowerCase().includes(value.toLowerCase())
    }
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: filterFunction,
  })
  console.log(table.getFilteredRowModel())
  React.useEffect(() => {
    if (patientData) {
      setData(patientData || [])
    }
  }, [data, patientData])

  return (
    <div className="pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
        </div>
      </div>
      {/* Search the table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 table-fixed">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          scope="col"
                          className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900"
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map((row) => (
                    // Give each row and it's cell an inline loader
                    <tr
                      key={row.id}
                      className={`${loading ? "animate-pulse" : ""}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          key={cell.id}
                        >
                          {/* If the meetingUrl value is not null put a button there to go to meeting */}

                          {cell.column.id === "meetingUrl" &&
                          cell.getValue() !== null ? (
                            <Link
                              className="text-royalBlue hover:text-royalBlueDark"
                              href={String(cell.getValue())}
                            >
                              Go to Meeting
                            </Link>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}

                          {/* {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )} */}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination buttons */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 relative 2 border text-sm font-medium rounded-md text-gray-700 bg-white mt-6">
        <div className="flex-1 flex justify-between">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-red hover:bg-gray-50"
            onClick={() => {
              table.previousPage()
              setCurrentPage(currentPage - 1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          {/* Current page displayed here */}
          <div className="relative inline-flex items-center px-4 py-2  text-sm font-medium  text-gray-700 bg-white">
            <strong className="pr-1">Page</strong>
            <strong>
              {currentPage} of {table.getPageCount()}
            </strong>
          </div>

          <button
            type="button"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-red hover:bg-gray-50"
            onClick={() => {
              table.nextPage()
              setCurrentPage(currentPage + 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
