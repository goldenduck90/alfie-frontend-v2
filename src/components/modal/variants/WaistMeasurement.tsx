import { CalculatorIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import {
  useTaskCompletion,
  createAnswersFromObject,
} from "@src/hooks/useTaskCompletion";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";

export function WaistMeasurement({
  title,
  taskId,
}: {
  title: string;
  taskId: string;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _id: taskId,
      waist: "",
    },
  });
  const setOpen = useDialogToggle();
  const [mutate] = useTaskCompletion(() => setOpen(false));

  async function onSubmit(values: any) {
    const { _id, ...rest } = values;
    const answers = createAnswersFromObject(rest);

    mutate({
      variables: {
        input: {
          _id,
          answers: answers,
        },
      },
    });
  }

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader
        title={title}
        step={1}
        total={1}
        icon={<CalculatorIcon className="w-5 h-5 stroke-inherit" />}
      />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm text-gray-500 mb-6">
            Measure your waist with a tape measure.
          </p>
          <p className="font-bold text-sm mb-2">
            What is your waist measurement?
          </p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">inches</span>}
              placeholder=""
              fullWidth
              inputSize="medium"
              {...register("waist")}
            />
          </div>
        </div>
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3 flex-col md:flex-row gap-y-6">
        <RadixDialog.Close asChild>
          <Button size="medium" buttonType="secondary">
            Cancel
          </Button>
        </RadixDialog.Close>
        <Button size="medium" onClick={handleSubmit(onSubmit)}>
          Complete
        </Button>
      </div>
    </div>
  );
}
