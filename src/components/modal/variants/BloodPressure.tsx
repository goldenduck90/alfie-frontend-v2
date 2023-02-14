import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function BloodPressure({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <p className="text-sm text-gray-600 mb-6">
          If you haven&apos;t taken a recent blood pressure reading, please
          visit your local pharmacy which may have a blood pressure machine
          available free to use or order a blood pressure machine online.
        </p>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold text-sm">
            What was your latest blood pressure reading?
          </p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">mmHg</span>}
              placeholder="120"
            />
            <span>{`/`}</span>
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">mmHg</span>}
              placeholder="80"
            />
          </div>
        </div>
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button buttonType="secondary">Cancel</Button>
        </RadixDialog.Close>
        <Button>Complete</Button>
      </div>
    </div>
  );
}
