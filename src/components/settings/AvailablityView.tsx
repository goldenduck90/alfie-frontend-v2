import { gql, useQuery, useMutation } from "@apollo/client";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";
import { GrayPlaceHolderBox } from "../GrayPlaceHolderBox";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { TextField } from "../ui/TextField";
import { DateOverrideModal } from "./components/DateOverrideModal";
import { randomId } from "@src/utils/randomId";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";

dayjs.extend(timezone);
dayjs.extend(advanced);
dayjs.tz.setDefault(dayjs.tz.guess());

export type Time = {
  start: string;
  end: string;
  breaks: { start: string; end: string }[];
};

const getProviderSchedule = gql`
  query getProviderSchedule($eaProviderId: String!, $timezone: String!) {
    getProviderSchedule(eaProviderId: $eaProviderId, timezone: $timezone) {
      schedule {
        monday {
          start
          end
          breaks {
            start
            end
          }
        }
        tuesday {
          start
          end
          breaks {
            start
            end
          }
        }
        wednesday {
          start
          end
          breaks {
            start
            end
          }
        }
        thursday {
          start
          end
          breaks {
            start
            end
          }
        }
        friday {
          start
          end
          breaks {
            start
            end
          }
        }
        saturday {
          start
          end
          breaks {
            start
            end
          }
        }
        sunday {
          start
          end
          breaks {
            start
            end
          }
        }
      }
    }
  }
`;

const updateProviderSchedule = gql`
  mutation updateProviderSchedule(
    $eaProviderId: String!
    $timezone: String!
    $schedule: ScheduleInput!
  ) {
    updateProviderSchedule(
      eaProviderId: $eaProviderId
      timezone: $timezone
      schedule: $schedule
    ) {
      message
    }
  }
`;

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const day = z.object({
  isSelected: z.boolean(),
  start: z.string().nullable(),
  end: z.string().nullable(),
  breaks: z.array(
    z.object({
      start: z.string().nullable(),
      end: z.string().nullable(),
    })
  ),
});

const AvailabilityFormSchema = z.object({
  monday: day,
  tuesday: day,
  wednesday: day,
  thursday: day,
  friday: day,
  saturday: day,
  sunday: day,
});

type AvailabilityForm = z.infer<typeof AvailabilityFormSchema>;

export function AvailabilityView() {
  const { user } = useCurrentUserStore();

  const [updateAvailability, { loading: updateLoading, error: updateError }] =
    useMutation(updateProviderSchedule, {
      refetchQueries: [{ query: getProviderSchedule, variables: {
        eaProviderId: (user as any)?.eaProviderId,
        timezone: dayjs.tz.guess()
      } }],
      awaitRefetchQueries: true,
    });
  
  const { addNotification } = useNotificationStore();
  const { data, loading } = useQuery(getProviderSchedule, {
    variables: {
      eaProviderId: (user as any)?.eaProviderId,
      timezone: dayjs.tz.guess(),
    },
  });

  const formattedState: AvailabilityForm = {} as any;

  Object.entries(data?.getProviderSchedule?.schedule || {})?.forEach(
    (day: [string, unknown]) => {
      const dayName = day[0];
      const dayData: Time = day[1] as Time;

      (formattedState as any)[dayName] = {
        ...dayData,
        isSelected: dayData.start !== "00:00" && !!dayData.end,
      };
    }
  );

  const {
    control,
    register,
    setValue,
    formState: { isDirty },
    handleSubmit,
  } = useForm<AvailabilityForm>({
    defaultValues: formattedState,
    values: formattedState,
    resolver: zodResolver(AvailabilityFormSchema),
  });

  const onSubmit = async (data: AvailabilityForm) => {
    try {
      const updatedData = Object.fromEntries(
        Object.entries(data).map(([day, dayData]) => {
          const { isSelected, ...rest } = dayData;
          return [day, rest];
        })
      );      

      await updateAvailability({
        variables: {
          eaProviderId: (user as any)?.eaProviderId,
          timezone: dayjs.tz.guess(),
          schedule: updatedData,
        },
      });

      addNotification({
        id: randomId(),
        type: "success",
        description: "Your availability has been updated",
        title: "Success",
      });
    } catch (error) {
      console.log("error");
      addNotification({
        id: randomId(),
        type: "error",
        description:
          "Could not update your availability, please try again later",
        title: "Failure",
      });
    }
  };

  const weeklyHours = days.map((day, i) => {
    return (
      <DailyHours
        key={i}
        day={day}
        control={control}
        register={register}
        setValue={setValue}
        isLast={i === days.length - 1}
      />
    );
  });

  const loadingHours = days.map((day, i) => (
    <DailyHoursLoad key={i} day={day} />
  ));

  return (
    <div>
      <h3 className="pb-2 font-semibold text-xl">Availability</h3>
      <p className="pb-2">
        All times are in 24 hour format & should be entered in the current
        timezone you are in.
      </p>
      <p className="pb-2">
        You are currently in timezone:{" "}
        <b>
          {dayjs().format("z")} ({dayjs.tz.guess()})
        </b>
      </p>
      <p className="pb-6">
        <b>For Example:</b> 9:00 AM = 09:00, 5:00 PM = 17:00.
      </p>
      <div className="flex flex-col md:flex-row border border-1 rounded-lg w-full h-full">
        <div className="w-full  p-6">
          {/* md:w-2/3 */}
          <div className="flex justify-between">
            <p className="gray-900 font-bold pb-6">Set your weekly hours</p>
            <Button
              buttonType="secondary"
              disabled={!isDirty}
              onClick={handleSubmit(onSubmit)}
            >
              {updateLoading ? "Loading" : "Update"}
            </Button>
          </div>

          {data && weeklyHours}
          {loading && loadingHours}
        </div>

        {/* <OverrideView /> */}
      </div>
    </div>
  );
}

function DailyHours({
  day,
  control,
  register,
  setValue,
  isLast,
}: {
  day: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  isLast: boolean;
}) {
  const { fields, append, remove } = useFieldArray({
    name: `${day}.breaks`,
    control,
  });
  const isSelected = control?._formValues?.[day]?.isSelected;

  const handleSelection = () => {
    setValue(`${day}.isSelected`, !isSelected, { shouldDirty: true });
    setValue(`${day}.start`, isSelected ? "00:00" : "09:00", {
      shouldDirty: true,
    });
    setValue(`${day}.end`, isSelected ? "00:00" : "17:00", {
      shouldDirty: true,
    });
    setValue(`${day}.breaks`, [], { shouldDirty: true });
  };

  return (
    <div className={!isLast ? "border-b" : ""}>
      <div className="flex sm:flex-row flex-col sm:items-center justify-between py-4 gap-y-6">
        <div className="flex min-w-[120px]">
          <Checkbox onChange={handleSelection} checked={isSelected} />
          <p className="capitalize">{day}</p>
        </div>
        {isSelected ? (
          <div className="flex items-center max-w-[400px]">
            <TextField
              {...register(`${day}.start`)}
              maxLength={5}
              inputSize="medium"
            />{" "}
            <span className="px-2 text-gray-300">-</span>{" "}
            <TextField
              {...register(`${day}.end`)}
              maxLength={5}
              inputSize="medium"
            />
            <button onClick={handleSelection} className="pl-6">
              <TrashIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="flex items-center min-h-[42px] w-[400px]">
            <p className="text-gray-400">Unavailable</p>
          </div>
        )}
        <div className="flex gap-3">
          <button
            disabled={!isSelected}
            onClick={() => append({ start: "09:00", end: "17:00" })}
            className="flex flex-row items-center"
          >
            <PlusIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="capitalize text-gray-400">Add Break</p>
          </button>
        </div>
      </div>
      {fields.map((breakItem: any, index) => (
        <BreakTimes
          breakItem={breakItem}
          key={breakItem.id}
          day={day}
          index={index}
          register={register}
          remove={remove}
        />
      ))}
    </div>
  );
}

function DailyHoursLoad({ day }: { day: string }) {
  return (
    <div className="flex sm:flex-row flex-col sm:items-center justify-between py-4 gap-y-6">
      <div className="flex min-w-[120px]">
        <Checkbox disabled />
        <p className="capitalize">{day}</p>
      </div>
      <div className="flex items-center min-h-[42px] w-[400px]">
        <p className="text-gray-400">Unavailable</p>
      </div>
      <div className="flex gap-3">
        <button disabled>
          <PlusIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

const getExceptions = gql`
  query Exceptions($timezone: String!, $eaProviderId: String!) {
    getProviderSchedule(timezone: $timezone, eaProviderId: $eaProviderId) {
      exceptions {
        date
      }
    }
  }
`;

function OverrideView() {
  const { user } = useCurrentUserStore();
  const { data, loading } = useQuery(getExceptions, {
    variables: {
      timezone: dayjs.tz.guess(),
      eaProviderId: (user as any)?.eaProviderId,
    },
  });

  console.log({ data });
  const loadItems = Array(2)
    .fill("")
    .map((_, i) => <DateOverrideLoad key={i} />);

  return (
    <div className="md:w-1/3 w-full md:border-l p-6">
      {" "}
      <p className="gray-900 font-bold pb-6">Add date overrides</p>
      <DateOverrideModal trigger={<Button>Add a date override</Button>} />
      {data?.map((item: any, i: number) => (
        <DateOverride {...({} as any)} />
      ))}
      {loading && loadItems}
      {!data && (
        <GrayPlaceHolderBox
          className="h-40 mt-6"
          content="You currently have no overrides"
        />
      )}
    </div>
  );
}

function DateOverride({
  date,
  time,
  onRemove,
}: {
  date: string;
  time: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex justify-between w-full border-b items-center py-4">
      <div>
        <p>{date || "unknown"}</p>
        <p className="text-gray-400">{time || "unknown"}</p>
      </div>
      <button onClick={onRemove}>
        <TrashIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}

function DateOverrideLoad() {
  return (
    <div className="flex justify-between w-full border-b items-center py-4">
      <div className="w-1/2 items-center">
        <hr className="h-2 w-full animate-pulse bg-gray-200 mb-3 rounded-sm" />
        <hr className="h-2 w-1/2 animate-pulse bg-gray-200 rounded-sm" />
      </div>
      <button disabled>
        <TrashIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}

function BreakTimes({
  breakItem,
  day,
  remove,
  register,
  index,
}: {
  breakItem: { start: string; end: string; id: string };
  day: string;
  remove: (index: number) => void;
  register: UseFormRegister<any>;
  index: number;
}) {
  if (!breakItem?.start || !breakItem?.end) return null;

  return (
    <>
      {index === 0 && (
        <div className="flex flex-items-center pb-4">
          <p className="capitalize font-bold">Breaks</p>
        </div>
      )}
      <div className="flex justify-between pb-4">
        <div className="w-[80px]" />
        <div className="flex items-center max-w-[400px]">
          <TextField
            maxLength={5}
            {...register(`${day}.breaks.[${index}].start`)}
            inputSize="medium"
          />{" "}
          <span className="px-2 text-gray-300">-</span>{" "}
          <TextField
            maxLength={5}
            {...register(`${day}.breaks.[${index}].end`)}
            inputSize="medium"
          />
          <button onClick={() => remove(index)} className="pl-6">
            <TrashIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="w-[62px]" />
      </div>
    </>
  );
}
