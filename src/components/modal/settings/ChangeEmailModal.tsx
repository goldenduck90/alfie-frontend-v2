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

const schemaValidator = z.object({
  email: z.string().min(1, "Email cannot be empty"),
});

export function ChangeEmailModal({ title }: { title: string }) {
  const { user } = useCurrentUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
    },
    resolver: zodResolver(schemaValidator),
  });

  const setOpen = useDialogToggle();

  async function onSubmit(values: any) {}

  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 md:w-[400px]">
          <p>Email address</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="Enter your email"
              fullWidth
              inputSize="medium"
              {...register("email")}
            />
          </div>
        </div>
        {errors?.email && (
          <p className="text-sm text-red-600">{errors?.email?.message}</p>
        )}
        <p className="text-sm text-gray-500">
          You’ll need to confirm the change by clicking on the link which we’ll
          send you to your inbox. Please check your SPAM folder as well.
        </p>
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
