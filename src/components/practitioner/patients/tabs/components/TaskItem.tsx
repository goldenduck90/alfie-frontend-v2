import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { Task, TaskType } from "@src/graphql/generated";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

export const TaskItem = ({
  task,
  completed,
  createdAt,
  dueAt,
  _id,
  type,
  completedAt,
}: {
  task: Task;
  _id: string;
  type: TaskType;
  createdAt: Date;
  dueAt: Date;
  completed?: boolean;
  completedAt?: Date;
}) => {
  const formattedDueAt = completedAt
    ? dayjs(completedAt).format("ll")
    : dayjs(dueAt).format("ll");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-4">
      <div className="flex flex-col justify-between gap-y-3 md:flex-row  md:gap-x-2 ">
        <div className="flex flex-shrink md:w-4/5">
          <ChooseTaskIcon value={task.type} />
          <div className="w-full">
            <h3 className="text-gray-900 font-bold">{task.name}</h3>
            <p className="text-gray-700 pt-2">
              Complete a basic medical form so that we can tailor our services
              to your needs.
            </p>
            <div className="hidden md:flex flex-row pt-3">
              <div className="flex items-center pr-8 text-gray-500">
                <ClockIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <p>10 min</p>
              </div>
              <div className="flex items-center text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <p>{formattedDueAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex">
          {completed ? (
            <div className="text-green-500 flex">
              <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
              Completed
            </div>
          ) : (
            <div className="text-red-500 flex">
              <XCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
              Not Completed
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
        <div className="flex items-center text-gray-500">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <p>{formattedDueAt}</p>
        </div>
        {completed ? (
          <div className="text-green-500 flex">
            <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
            Completed
          </div>
        ) : (
          <div className="text-red-500 flex">
            <XCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
            Not Completed
          </div>
        )}
      </div>
    </div>
  );
};
