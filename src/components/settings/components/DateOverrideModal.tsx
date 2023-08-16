import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { DialogModal } from "@src/components/modal/Dialog";
import { TextField } from "@src/components/ui/TextField";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "@src/components/ui/Button";
import Calendar from "react-calendar";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { randomId } from "@src/utils/randomId";
// import { gql, useMutation } from "@apollo/client";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

type DateRange = Date | null | undefined | [Date | null, Date | null];

// const updateExceptionDate = gql`
//   mutation updateExceptions(
//     $timezone: String!
//     $eaProviderId: String!
//     $exceptions: DailyScheduleInput!
//   ) {
//     getProviderSchedule(
//       timezone: $timezone
//       eaProviderId: $eaProviderId
//       exceptions: $exceptions
//     ) {
//       exceptions {
//         date {
//           start
//           end
//           breaks {
//             start
//             end
//           }
//         }
//       }
//     }
//   }
// `;

const DateOverrideFormSchema = z.object({
  dateTitle: z.date(),
  date: z
    .union([
      z.date(),
      z.null(),
      z.undefined(),
      z.tuple([z.union([z.date(), z.null()]), z.union([z.date(), z.null()])]),
    ])
    .nullable(),
  overrides: z.array(
    z.object({
      start: z.string().min(5, "Please enter a valid time range").nullable(),
      end: z.string().min(5, "Please enter a valid time range").nullable(),
    })
  ),
});

type DateOverrideForm = z.infer<typeof DateOverrideFormSchema>;

export function DateOverrideModal({ trigger }: { trigger: React.ReactNode }) {
  // const { user } = useCurrentUserStore();
  const { addNotification } = useNotificationStore();

  // const [updateException, { loading }] = useMutation(updateExceptionDate);

  const {
    register,
    control,
    setValue,
    formState: { isDirty, isSubmitting, errors },
    setError,
    watch,
    reset,
    handleSubmit,
  } = useForm<DateOverrideForm>({
    defaultValues: {
      dateTitle: new Date(),
      date: new Date(),
      overrides: [{ start: null, end: null }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "overrides",
  });

  const onSubmit = async (data: DateOverrideForm) => {
    const getAllDatesFromRange = (range: DateRange) => {
      if (Array.isArray(range)) {
        const [start, end] = range;
        const dates = [];
        let currentDate = dayjs(start);
        const endDate = dayjs(end);
        while (currentDate <= endDate) {
          dates.push(dayjs(currentDate.toISOString()).format("YYYY-MM-DD"));
          currentDate = currentDate.add(1, "day");
        }
        return dates;
      }
    };

    const exceptions: any = {};
    getAllDatesFromRange(data.date)?.forEach((date) => {
      exceptions[date] = data.overrides[0];
    });

    console.log({ exceptions });

    try {
      // await updateException({
      //   variables: {
      //     eaProviderId: (user as any)?.eaProviderId,
      //     timezone: dayjs.tz.guess(),
      //     exceptions: JSON.stringify(exceptions),
      //   },
      // });

      addNotification({
        id: randomId(),
        type: "success",
        description: "Your availability has been updated",
        title: "Success",
      });
    } catch (error) {
      setError("root.serverError", {
        message: (error as any)?.message,
      });
      addNotification({
        id: randomId(),
        type: "error",
        description: (error as any)?.message,
        title: "Failure",
      });
    }
  };

  return (
    <DialogModal trigger={trigger} triggerAsChild>
      <div className="w-full md:max-w-[366px] whitespace-line ">
        <div className="w-full flex justify-between items-center relative pb-3 px-6">
          <p className="text-sm font-bold ">
            Select the date(s) you want to assign specific hours
          </p>

          <RadixDialog.Close className="" asChild onClick={() => reset()}>
            <button>
              <XIcon className="w-5 h-5" />
            </button>
          </RadixDialog.Close>
        </div>

        <div className=" w-full min-w-full py-6 bg-gray-50 border-t border-b border-gray-400 px-6 flex flex-col gap-y-2">
          <div className="override-calendar rounded-xl p-2 border bg-white">
            <div className="relative">
              <p className="absolute top-3 left-2 font-semibold">
                {dayjs(watch("dateTitle")).format("MMMM YYYY")}
              </p>
            </div>
            <Calendar
              allowPartialRange
              selectRange={true}
              goToRangeStartOnSelect
              returnValue={"range"}
              nextLabel={<ChevronRightIcon className="h-5 w-5" />}
              prevLabel={<ChevronLeftIcon className="h-5 w-5" />}
              onActiveStartDateChange={({ activeStartDate }) => {
                setValue("dateTitle", activeStartDate);
              }}
              onChange={(data: DateRange) => {
                if ((data as [Date, Date])[1]) {
                  setValue("date", data, { shouldDirty: true });
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-3  items-center bg-white rounded-xl border mt-3">
            <p className="self-start px-3 pt-3">
              What hours are you available?
            </p>
            <div className="flex flex-col gap-3 max-h-56 overflow-y-auto p-3">
              {fields.map((field, index) => (
                <div className="flex items-center" key={field.id}>
                  <TextField
                    placeholder="00:00"
                    maxLength={5}
                    inputSize="medium"
                    {...register(`overrides.${index}.start`)}
                  />
                  <span className="px-2 text-gray-300">-</span>{" "}
                  <TextField
                    placeholder="00:00"
                    maxLength={5}
                    inputSize="medium"
                    {...register(`overrides.${index}.end`)}
                  />
                  <div className="flex gap-2 pl-6">
                    {fields.length > 1 && (
                      <button onClick={() => remove(index)}>
                        <TrashIcon className="h-5 w-5 text-gray-400" />
                      </button>
                    )}
                    <button onClick={() => append({ start: null, end: null })}>
                      <PlusIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end  relative px-6 pt-6 gap-x-3 flex-row gap-y-6">
          <RadixDialog.Close asChild>
            <Button buttonType="secondary" onClick={() => reset()}>
              Cancel
            </Button>
          </RadixDialog.Close>
          <Button
            disabled={!isDirty || isSubmitting || !!errors?.root?.serverErrors}
            onClick={handleSubmit(onSubmit)}
          >
            Apply
          </Button>
        </div>
      </div>
    </DialogModal>
  );
}
