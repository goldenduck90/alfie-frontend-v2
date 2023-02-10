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
    <React.Fragment>
      <div className="w-full flex relative">
        <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit mx-auto">
          <CalculatorIcon className="w-5 h-5 stroke-inherit" />
        </div>
        <RadixDialog.Close className="absolute right-0 inset-y " asChild>
          <button>
            <XIcon className="w-5 h-5" />
          </button>
        </RadixDialog.Close>
      </div>
      <DialogModal.Title>{title}</DialogModal.Title>
      <DialogModal.Description>{description}</DialogModal.Description>
      <Graybox />
      <div className="py-4 flex items-center justify-center">
        <Button size="medium">Start the questionnaire</Button>
      </div>
      <p className="text-center text-sm text-gray-700">
        By taking this survey you accept our Terms & Conditions.
      </p>
    </React.Fragment>
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
        <RadixDialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
        <RadixDialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full max-w-[420px] max-h-1/2 shadow-md py-6 px-6 rounded-md flex flex-col gap-y-3">
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
