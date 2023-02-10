import {
  CalculatorIcon,
  CalendarIcon,
  ClockIcon,
  XIcon,
} from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";
import { Button } from "../../ui/Button";

export function IDVerificationModal({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[560px]">
      <div className="w-full flex justify-between items-center relative pb-3 px-6">
        <div className="flex items-center gap-x-2">
          <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit">
            <CalculatorIcon className="w-5 h-5 stroke-inherit" />
          </div>
          <span className="text-sm font-bold">{title}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-2xl text-sm">
            Step 1 out of 2
          </span>
          <RadixDialog.Close className="" asChild>
            <button>
              <XIcon className="w-5 h-5" />
            </button>
          </RadixDialog.Close>
        </div>
      </div>
      <div className="w-full py-6 bg-gray-50 border-t border-b border-gray-400 px-6 flex flex-col gap-y-2 ">
        <p className="text-sm">
          Please upload a picture of your ID card & Insurance card. Make sure
          these are clear photos without any distortion.
        </p>
        <div className="text-sm">
          <p>ID photo</p>
          <p>This must be a US governemnt issued ID or passport</p>
        </div>
        <div className="w-full py-6 border rounded-md border-dashed border-blue-600 bg-primary-50 min-h-[276px] flex justify-center items-center">
          <div className="flex flex-col gap-y-3 items-center justify-center h-full">
            <div className="p-2 rounded-full bg-blue-100 stroke-blue-500 max-w-fit">
              <CalculatorIcon className="w-5 h-5 stroke-inherit" />
            </div>
            <p className="font-bold">Upload your ID photo</p>
            <p className="text-sm text-gray-500">
              Accepted file types are: png, jpg, pdf.
            </p>
            <Button>Upload from computer</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center relative pb-3 px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button buttonType="secondary">Cancel</Button>
        </RadixDialog.Close>
        <Button>Next</Button>
      </div>
    </div>
  );
}
