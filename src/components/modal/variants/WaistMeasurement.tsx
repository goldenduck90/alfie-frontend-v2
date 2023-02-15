import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function WaistMeasurement({ title }: { title: string }) {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      waist: ""
    }
  })

  async function onSubmit(data: any){
    console.log("Submitted", data)
  }

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm text-gray-500">
            Measure your waist with a tape measure.
          </p>
          <p className="font-bold text-sm">What is your waist measurement?</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">inches</span>}
              placeholder=""
              {...register("waist")}
            />
          </div>
        </div>
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button buttonType="secondary">Cancel</Button>
        </RadixDialog.Close>
        <Button onClick={handleSubmit(onSubmit)}>Complete</Button>
      </div>
    </div>
  );
}
