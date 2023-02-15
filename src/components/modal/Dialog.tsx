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
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div className="w-full md:max-w-[420px]">
      <div className="w-full flex relative px-6">
        <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit mx-auto mb-4">
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
        <GrayBox />
        <div className="py-4 flex items-center justify-center">
          <Button onClick={onClick} size="medium">
            Start the questionnaire
          </Button>
        </div>
        <p className="text-center text-sm text-gray-700">
          By taking this survey you accept our{" "}
          <span className="text-primary-500 cursor-pointer">
            Terms & Conditions.
          </span>
        </p>
      </div>
    </div>
  );
}

export function DialogModal({
  trigger,
  triggerAsChild,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  triggerAsChild?: boolean;
}) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild={triggerAsChild}>
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 z-[99]" />
        <RadixDialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] max-w-fit max-h-1/2 shadow-md py-6 rounded-md gap-y-3 z-[100] flex flex-col">
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
    <RadixDialog.Title className="text-center font-bold whitespace-nowrap">
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
    <RadixDialog.Description className="text-center text-[#475569] text-sm mb-6">
      {children}
    </RadixDialog.Description>
  );
};

function GrayBox() {
  return (
    <div className="w-full py-4 px-2 rounded-md flex gap-x-4 items-center justify-center bg-gray-100 text-sm whitespace-nowrap">
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

export function DialogLongHeader({
  title,
  step,
  total,
}: {
  title: string;
  step: number;
  total: number;
}) {
  return (
    <div className="w-full flex justify-between items-center relative pb-3 px-6 whitespace-nowrap">
      <div className="flex items-center gap-x-2">
        <div className="p-2 rounded-md bg-orange-100 stroke-orange-500 max-w-fit">
          <CalculatorIcon className="w-5 h-5 stroke-inherit" />
        </div>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-2xl text-sm">
          {`Step ${step} out of ${total}`}
        </span>
        <RadixDialog.Close className="" asChild>
          <button>
            <XIcon className="w-5 h-5" />
          </button>
        </RadixDialog.Close>
      </div>
    </div>
  );
}

export function DialogLongBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-w-full py-6 bg-gray-50 border-t border-b border-gray-400 px-6 flex flex-col gap-y-2">
      {children}
    </div>
  );
}
