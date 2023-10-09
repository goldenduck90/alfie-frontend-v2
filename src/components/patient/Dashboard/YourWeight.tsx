import React from "react";
import { gql, useQuery } from "@apollo/client";

import { PencilIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { Line } from "@src/components/ui/Line";
import { SliderRange } from "@src/components/ui/SliderRange";
import { DialogModal } from "@src/components/modal/Dialog";
import { WeightEntry } from "@src/components/modal/variants/WeightEntry";
import { ScaleTwoIcon, TargetIcon } from "@src/components/svg";
import { TaskType, User } from "@src/graphql/generated";

const userTasksQuery = gql`
  query UserTasksQuery($limit: Float, $offset: Float, $completed: Boolean) {
    userTasks(
      input: { limit: $limit, offset: $offset, completed: $completed }
    ) {
      total
      userTasks {
        _id
        task {
          _id
          name
          type
          highPriority
        }
        dueAt
        pastDue
        createdAt
      }
    }
  }
`;

export function YourWeight({ user }: { user: User }) {
  const currentWeight = user?.weights[user?.weights.length - 1]?.value;
  const firstWeight = user?.weights[0]?.value;

  const { data, loading, error } = useQuery(userTasksQuery, {
    variables: {
      completed: false,
    },
  });

  const getWeightTaskId = () => {
    const weightTask = data?.userTasks?.userTasks?.find((task: any) => {
      return task?.task?.type === TaskType.WeightLog;
    });
    return weightTask?._id;
  };

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] "
      cardHeader={
        <>
          <div className="flex flex-row">
            <span className="mr-2 mt-1">
              <ScaleTwoIcon />
            </span>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center pb-2">
                <h2 className="text-gray-900 ">Your Weight</h2>
                {data && !error && (
                  <DialogModal
                    triggerAsChild
                    trigger={
                      //? if there is a weight task, show the button
                      getWeightTaskId() && <Button>Update Weight</Button>
                    }
                  >
                    <WeightEntry
                      title="Enter your weight"
                      taskId={getWeightTaskId()}
                      currentWeight={currentWeight}
                    />
                  </DialogModal>
                )}
                {loading && <Button disabled>Update Weight</Button>}
              </div>
              <p className="text-gray-900 text-5xl">
                {currentWeight}
                <span className="text-gray-600 text-sm">lbs</span>
              </p>
            </div>
          </div>
        </>
      }
    ></DashboardCard>
  );
}
