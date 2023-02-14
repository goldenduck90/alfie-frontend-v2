import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function WeightEntry({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="font-bold text-sm">How much do you currently weigh?</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">lbs</span>}
              placeholder="120"
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
