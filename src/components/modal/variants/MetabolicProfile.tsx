import { ChevronLeftIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import { SliderDraggable } from "@src/components/ui/SliderRange";
import { TextField } from "@src/components/ui/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";

export function MetabolicProfileHunger({ title }: { title: string }) {
  const [step, setStep] = useState(1);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      foodEaten: "",
      hungerLevel30Mins: [0],
      hungerLevel1Hour: [0],
    },
  });

  async function onSubmit(data: any) {
    console.log("Submitted", data);
  }

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader title={title} step={step} total={2} />
      <DialogLongBody>
        {step === 1 && (
          <div className="flex flex-col gap-y-2 w-full">
            <p className="text-sm text-gray-500 mb-6">
              We want to understand how you rate your baseline hunger after
              meals. For your first meal of the day, eat a meal that&apos;s
              between 300 and 400 calories. The recommended meal is 2 eggs and a
              piece of toast. Answer the questions after 30 minutes and 2 hours
              without consuming other food.
            </p>
            <p className="font-bold text-sm mb-2">What food did you eat?</p>
            <div className="flex gap-x-3 justify-between items-center">
              <TextField
                placeholder=""
                {...register("foodEaten")}
                fullWidth
                inputSize="medium"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-y-6">
            <div>
              <p className="font-bold text-sm">
                Rate how satisfied you feel 30 minutes after eating this meal
              </p>
              <p className="text-sm text-gray-500 pb-3">
                Answer on a scale of 1-100
              </p>
              <SliderDraggable name="hungerLevel30Mins" control={control} />
            </div>
            <div>
              <p className="font-bold text-sm">
                Rate how satisfied you feel 2 hours after eating this meal
              </p>
              <p className="text-sm text-gray-500 pb-3">
                Answer on a scale of 1-100
              </p>
              <SliderDraggable name="hungerLevel1Hour" control={control} />
            </div>
          </div>
        )}
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        {step === 1 && (
          <RadixDialog.Close asChild>
            <Button buttonType="secondary">Cancel</Button>
          </RadixDialog.Close>
        )}
        {step === 2 && (
          <Button buttonType="secondary" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        )}
        <Button
          onClick={() => {
            if (step === 1) {
              setStep((s) => (s === 1 ? s + 1 : 1));
            } else {
              handleSubmit(onSubmit)();
            }
          }}
        >
          {step === 1 ? "Next" : "Complete"}
        </Button>
      </div>
    </div>
  );
}

export function MetabolicProfileActivity({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm text-gray-500 mb-6">
            You can find this data on your phone in the Health, Google Fit app,
            or similar.
          </p>
          <p className="font-bold text-sm mb-2">
            Please enter your average number of steps per day for the past week
          </p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder=""
              rightIcon={<span className="pl-2 text-gray-400">steps</span>}
              fullWidth
              inputSize="medium"
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

export function MetabolicProfileMeals({ title }: { title: string }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      calories: 0,
    },
  });

  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader title={title} step={1} total={1} />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm text-gray-500 mb-6">
            We want to understand how much you eat when you are feeling hungry
            on an empty stomach. This helps us understand your baseline consumed
            calories and affects the way we will think about your metabolism.
            For your first meal of the day, in one sitting, please eat until you
            feel 100% full.
          </p>
          <p className="font-bold text-sm mb-2">
            Please tell us the total number of calories you consumed:
          </p>
          <div className="flex gap-x-3 justify-between items-center">
            <TextField
              placeholder=""
              rightIcon={<span className="pl-2 text-gray-400">kcal</span>}
              {...register("calories")}
              fullWidth
              inputSize="medium"
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
