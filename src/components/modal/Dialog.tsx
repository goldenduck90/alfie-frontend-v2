import {
  CalculatorIcon,
  CalendarIcon,
  ClockIcon,
  XIcon,
} from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";
import { Button } from "../ui/Button";

export function DialogBody({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full max-w-[420px]">
      <div className="w-full flex relative px-6">
        <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit mx-auto">
          <CalculatorIcon className="w-5 h-5 stroke-inherit" />
        </div>
        <RadixDialog.Close className="absolute right-6 inset-y " asChild>
          <button>
            <XIcon className="w-5 h-5" />
          </button>
        </RadixDialog.Close>
      </div>
      <div className="w-full flex flex-col gap-y-3 px-6">
        <DialogModal.Title>{title}</DialogModal.Title>
        <DialogModal.Description>{description}</DialogModal.Description>
        <Graybox />
        <div className="py-4 flex items-center justify-center">
          <Button size="medium">Start the questionnaire</Button>
        </div>
        <p className="text-center text-sm text-gray-700">
          By taking this survey you accept our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}

export function DialogModal({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger className="text-black text-lg">
        {text}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 z-[99]" />
        <RadixDialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] max-w-fit max-h-1/2 shadow-md py-6 rounded-md flex flex-col gap-y-3 z-[100]">
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

DialogModal.Title = function Title({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RadixDialog.Title className="text-center font-bold">
      {children}
    </RadixDialog.Title>
  );
};
DialogModal.Description = function Description({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RadixDialog.Description className="text-center text-[#475569] text-sm">
      {children}
    </RadixDialog.Description>
  );
};

function Graybox() {
  return (
    <div className="w-full py-4 px-2 rounded-md flex gap-x-4 items-center justify-center bg-gray-100 text-sm">
      <div className="flex gap-x-1 items-center">
        <ClockIcon className="w-6 h-6" />
        <p>15 minutes</p>
      </div>
      <div className="flex gap-x-1 items-center">
        <CalendarIcon className="w-6 h-6" />
        <p>Assigned 3 days ago</p>
      </div>
    </div>
  );
}

export function DialogVersion2() {
  return (
    <div className="w-full max-w-[560px]">
      <div className="w-full flex justify-between items-center relative pb-3 px-6">
        <div className="flex items-center gap-x-2">
          <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit">
            <CalculatorIcon className="w-5 h-5 stroke-inherit" />
          </div>
          <span className="text-sm font-bold">{`ID & Insurance Verification`}</span>
        </div>
        <RadixDialog.Close className="" asChild>
          <button>
            <XIcon className="w-5 h-5" />
          </button>
        </RadixDialog.Close>
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
              Accepted file types are: png,jpg,pdf.
            </p>
            <Button>Upload from computer</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center relative pb-3 px-6 pt-6 gap-x-3">
        <Button>Cancel</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
}

DialogModal.Expanded = DialogVersion2;
