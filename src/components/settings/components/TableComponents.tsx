import { createColumnHelper } from "@tanstack/react-table";
import { ReactNode } from "react";

interface InvoiceHistory {
  date: string;
  name: string;
  status: string;
  amount: string;
  file: string;
}

export function TableViewRow({
  inputs,
}: {
  inputs: { left: ReactNode; right?: ReactNode }[];
}) {
  if (!inputs) return null;
  return (
    <div className="">
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300">
        {inputs.map(({ left, right }, index) => {
          return (
            <div
              key={index}
              className="flex md:flex-row flex-col justify-between md:items-center px-6 py-4 gap-4"
            >
              {left && left}
              {right && right}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TableEntryInline({
  leftText,
  rightText,
}: {
  leftText: string;
  rightText: string;
}) {
  return (
    <div className="flex md:flex-row flex-col gap-2">
      <p className="capitalize md:min-w-[275px] font-bold">{leftText}</p>
      <p className="text-gray-600">{rightText}</p>
    </div>
  );
}

export function TableEntryStacked({
  title,
  subtext,
}: {
  title: string;
  subtext: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="text font-bold">{title}</p>
      <p className="text-sm text-gray-600">{subtext}</p>
    </div>
  );
}

const columnHelper = createColumnHelper<InvoiceHistory>();

export const invoiceHistoryColumns = [
  columnHelper.accessor("date", {
    header: () => (
      <p className="p-2 text-gray-600 font-medium capitalize text-left">date</p>
    ),
    cell: (info) => <p className="px-2">{info.getValue()}</p>,
  }),
  columnHelper.accessor("name", {
    header: () => (
      <p className="p-2 text-gray-600 font-medium capitalize text-left">Name</p>
    ),
    cell: (info) => <p className="px-2">{info.getValue()}</p>,
  }),
  columnHelper.accessor("status", {
    header: () => (
      <p className="p-2 text-gray-600 font-medium capitalize text-left">
        status
      </p>
    ),
    cell: (info) => <p className="px-2">{info.getValue()}</p>,
  }),
  columnHelper.accessor("amount", {
    header: () => (
      <p className="p-2 text-gray-600 font-medium capitalize text-left">
        amount
      </p>
    ),
    cell: (info) => <p className="px-2">{info.getValue()}</p>,
  }),
  columnHelper.accessor("file", {
    header: () => (
      <p className="p-2 text-gray-600 font-medium capitalize text-left">file</p>
    ),
    cell: (info) => <p className="px-2">{info.getValue()}</p>,
  }),
];
