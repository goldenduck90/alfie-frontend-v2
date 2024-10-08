import { CalculatorIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { AnswerType, TaskType } from "@src/graphql/generated";
import {
  createAnswersFromObject,
  useTaskCompletion,
} from "@src/hooks/useTaskCompletion";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";

export function FoodLog({ taskId }: { taskId: string }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _id: taskId,
      breakfast: "",
      lunch: "",
      dinner: "",
    },
  });

  const setOpen = useDialogToggle();

  const [mutate] = useTaskCompletion(() => setOpen(false));

  function onSubmit(data: any) {
    const { _id, ...rest } = data;
    const answers = createAnswersFromObject(rest);
    mutate({
      variables: {
        input: {
          _id,
          answers,
        },
      },
    });
  }

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader
        title={"Food Log"}
        step={1}
        total={1}
        icon={<CalculatorIcon className="w-5 h-5 stroke-inherit" />}
      />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="font-bold text-sm mb-2">What did you eat today?</p>
          <div className="flex flex-col gap-3 justify-between items-center">
            <TextField
              placeholder="Breakfast"
              fullWidth
              inputSize="medium"
              {...register("breakfast")}
            />
            <TextField
              placeholder="Lunch"
              fullWidth
              inputSize="medium"
              {...register("lunch")}
            />
            <TextField
              placeholder="Dinner"
              fullWidth
              inputSize="medium"
              {...register("dinner")}
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
