import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import {
  useTaskCompletion,
  createAnwersFromObject,
} from "@src/hooks/useTaskCompletion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";

const schemaValidator = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export function ChangePasswordModal({ title }: { title: string }) {
  const { user } = useCurrentUserStore();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
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
          <div className="flex justify-between items-center">
            <p>Old password</p>
            <span
              onClick={() => setShowOld((s) => !s)}
              className=" text-brand-berry text-sm flex gap-x-1 items-center cursor-pointer"
            >
              {!showOld ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
              {!showOld ? "Show" : "Hide"}
            </span>
          </div>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="Old password"
              fullWidth
              inputSize="medium"
              type={showOld ? "text" : "password"}
              {...register("oldPassword")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:w-[400px]">
          <div className="flex justify-between items-center">
            <p>New password</p>
            <span
              onClick={() => setShowNew((s) => !s)}
              className=" text-brand-berry text-sm flex gap-x-1 items-center cursor-pointer"
            >
              {!showNew ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
              {!showNew ? "Show" : "Hide"}
            </span>
          </div>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="New password"
              fullWidth
              inputSize="medium"
              type={showNew ? "text" : "password"}
              {...register("newPassword")}
            />
          </div>
        </div>
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
