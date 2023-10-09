import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";
import {
  useTaskCompletion,
  createAnswersFromObject,
} from "@src/hooks/useTaskCompletion";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { CalculatorIcon } from "@heroicons/react/outline";
import weightValidationSchema from "@src/validations/weight";

export function WeightEntry({
  title,
  taskId,
  currentWeight,
}: {
  title: string;
  taskId: string;
  currentWeight?: number;
}) {
  const validationSchema = Yup.object({
    weight: weightValidationSchema(currentWeight)
  })
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      _id: taskId,
      weight: 0,
    },
    resolver: yupResolver(validationSchema)
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
          <p className="font-bold text-sm">How much do you currently weight?</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              rightIcon={<span className="pl-2 text-gray-400">lbs</span>}
              placeholder="120"
              fullWidth
              helper={errors.weight?.message}
              hasError={!isValid}
              inputSize="medium"
              type="number"
              {...register("weight", { valueAsNumber: true })}
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
