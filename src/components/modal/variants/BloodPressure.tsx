import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function BloodPressure({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <p className="text-sm text-gray-600">
          If you haven't taken a recent blood pressure reading, please visit
          your local pharmacy which may have a blood pressure machine available
          free to use or order a blood pressure machine online.
        </p>
        <div>
          <p className="font-bold text-sm">
            What was your latest blood pressure reading?
          </p>
        </div>
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative pb-3 px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button buttonType="secondary">Cancel</Button>
        </RadixDialog.Close>
        <Button>Next</Button>
      </div>
    </div>
  );
}
