import { zodResolver } from "@hookform/resolvers/zod";
import * as RadixDialog from "@radix-ui/react-dialog";
import { TextField } from "@src/components/ui/TextField";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import {
  useTaskCompletion,
  createAnswersFromObject,
} from "@src/hooks/useTaskCompletion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader, useDialogToggle } from "../Dialog";

const changeAddressSchema = z.object({
  streetAddress: z.string().min(1, "Street address cannot be empty"),
  streetAddress2: z.string().optional(),
  zipCode: z.string().min(1, "Zip Code cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  state: z.string().min(1, "State cannot be empty"),
});

export function ChangeAddressModal({ title }: { title: string }) {
  const { user } = useCurrentUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress: user?.address?.line1 || "",
      streetAddress2: user?.address?.line2 || "",
      zipCode: user?.address?.postalCode || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
    },
    resolver: zodResolver(changeAddressSchema),
  });

  const setOpen = useDialogToggle();

  async function onSubmit(values: any) {}

  return (
    <div className="w-full max-w-[560px] min-w-full">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 md:w-[400px]">
          <p>Street Address *</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="123 Main St"
              fullWidth
              inputSize="medium"
              {...register("streetAddress")}
            />
          </div>
          <p>Street Address 2</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="Apt 1"
              fullWidth
              inputSize="medium"
              {...register("streetAddress2")}
            />
          </div>
          <p>Zip Code *</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="10451"
              fullWidth
              inputSize="medium"
              {...register("zipCode")}
            />
          </div>
          <p>City *</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="Manhattan"
              fullWidth
              inputSize="medium"
              {...register("city")}
            />
          </div>
          <p>State *</p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder="New York"
              fullWidth
              inputSize="medium"
              {...register("state")}
            />
          </div>
        </div>
        {errors?.streetAddress && (
          <p className="text-sm text-red-600">
            {errors?.streetAddress?.message}
          </p>
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
