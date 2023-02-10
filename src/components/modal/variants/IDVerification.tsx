import {
  CalculatorIcon,
  CalendarIcon,
  ClockIcon,
  XIcon,
} from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function IDVerificationModal({ title }: { title: string }) {
  return (
    <div className="w-full md:max-w-[560px]">
      <DialogLongHeader title={title} step={1} total={2} />
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
