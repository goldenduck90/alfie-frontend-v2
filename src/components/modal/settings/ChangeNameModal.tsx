import { zodResolver } from "@hookform/resolvers/zod";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import {
  useTaskCompletion,
  createAnwersFromObject,
} from "@src/hooks/useTaskCompletion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";

const changeNameSchema = z.object({
  fullname: z.string().min(1, "Name cannot be empty"),
});

export function ChangeNameModal({ title }: { title: string }) {
  const { user } = useCurrentUserStore();

  console.log({ user });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user?.name || "",
    },
    resolver: zodResolver(changeNameSchema),
  });

  const setOpen = useDialogToggle();

  async function onSubmit(values: any) {}

  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-[400px]">
          <p>Full name</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="Enter your full name"
              fullWidth
              inputSize="medium"
              {...register("fullname")}
            />
          </div>
        </div>
        {errors?.fullname && (
          <p className="text-sm text-red-600">{errors?.fullname?.message}</p>
        )}
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button buttonType="secondary">Cancel</Button>
        </RadixDialog.Close>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </div>
    </div>
  );
}
