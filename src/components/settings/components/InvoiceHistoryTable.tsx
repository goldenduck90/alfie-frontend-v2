import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { invoiceHistoryColumns } from "./TableComponents";

const tempData = [
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
];

export function InvoiceHistoryTable() {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: tempData,
    columns: invoiceHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="divide-y divide-gray-300  table-fixed w-auto rounded-md overflow-hidden min-w-full">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50 py-2">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="min-w-max whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {getRowModel().rows.map((row) => (
          <tr key={row.id} className="">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-left py-2">
                <div className="min-w-max whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
