import { CalculatorIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import React, { useState, useRef } from "react";
import { Button } from "../../ui/Button";
import { DialogLongHeader } from "../Dialog";

export function IDVerificationModal({ title }: { title: string }) {
  const [step, setStep] = useState(1);
  const fileInput = useRef<HTMLInputElement>();

  return (
    <div className="w-full md:max-w-[560px]">
      <DialogLongHeader title={title} step={step} total={2} />
      <div className="w-full py-6 bg-gray-50 border-t border-b border-gray-400 px-6 flex flex-col gap-y-2 ">
        <p className="text-sm">
          Please upload a picture of your ID card & Insurance card. Make sure
          these are clear photos without any distortion.
        </p>
        <div className="text-sm">
          {step === 1 ? (
            <React.Fragment>
              <p className="font-bold">ID photo</p>
              <p>This must be a US governemnt issued ID or passport</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="font-bold">Insurance Card</p>
              <p>If you don't have insurance you can skip this.</p>
            </React.Fragment>
          )}
        </div>
        <div className="relative w-full py-6 border rounded-md border-dashed border-blue-600 bg-primary-50 min-h-[276px] flex justify-center items-center">
          <input
            ref={fileInput as any}
            type="file"
            className="absolute inset-0 opacity-0"
            onChange={(e) => {
              const droppedFile = e.target?.files?.[0];
              if (
                droppedFile &&
                ["image/png", "image/jpeg", "application/pdf"].includes(
                  droppedFile.type
                )
              ) {
                console.log("Valid File!");
                console.log({ file: droppedFile });
              }
            }}
            accept="image/png, image/jpeg, application/pdf"
          />
          <div className="flex flex-col gap-y-3 items-center justify-center h-full">
            <div className="p-2 rounded-full bg-blue-100 stroke-blue-500 max-w-fit">
              <CalculatorIcon className="w-5 h-5 stroke-inherit" />
            </div>
            <p className="font-bold">
              {step === 1
                ? "Upload your ID photo"
                : "Upload your Insurance Card photo"}
            </p>
            <p className="text-sm text-gray-500">
              Accepted file types are: png, jpg, pdf.
            </p>
            <Button>Upload from computer</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        {step === 1 && (
          <RadixDialog.Close asChild>
            <Button buttonType="secondary">Cancel</Button>
          </RadixDialog.Close>
        )}
        {step === 2 && (
          <Button onClick={() => setStep(1)} buttonType="secondary">
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        )}
        <Button onClick={() => setStep((s) => (s === 1 ? s + 1 : 1))}>
          {step === 1 ? "Next" : "Complete"}
        </Button>
      </div>
    </div>
  );
}
