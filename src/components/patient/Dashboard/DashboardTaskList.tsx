import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";

import Link from "next/link";
import React from "react";
import { TaskType, UserTask } from "../../../graphql/generated";
import { TaskSelector } from "../tasks/TaskSelector";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";
dayjs.extend(calendar);

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

export const DashboardTaskList = () => {
  const { data, loading, error } = useQuery(userTasksQuery, {
    variables: {
      completed: false,
    },
  });

  const filteredTasks = data?.userTasks?.userTasks.filter((task: any) => {
    return (
      task?.task?.type === TaskType.WeightLog ||
      task?.task?.type === TaskType.NewPatientIntakeForm ||
      task?.task?.type === TaskType.IdAndInsuranceUpload
    );
  });
  const tasks =
    filteredTasks?.length > 0 ? filteredTasks : data?.userTasks?.userTasks;

  React.useEffect(() => {
    //? If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "userTasksQuery",
          component: "DashboardTaskList",
        },
      });
    }
  }, [error]);

  const loadItems = [0, 1]?.map((item, i) => (
    <DashboardPreviewItem key={`task-load-${i}`} {...(item as any)} isLoading />
  ));

  const resultItems = tasks
    // only show the first 2 tasks
    ?.slice(0, 1)
    .map((item: UserTask, i: number) => (
      <TaskSelector
        type={item?.task?.type as TaskType}
        userTaskId={item._id}
        key={`task-${i}`}
        trigger={
          <DashboardPreviewItem
            renderDate={{ date: "", time: dayjs().calendar(dayjs(item.dueAt)) }}
            title={item?.task?.name || ""}
            icon={item?.task?.type}
          />
        }
      />
    ));

  return (
    <DashboardCard
      className="w-full md:min-w-[49.2%]"
      cardHeader={
        <div className="flex justify-between pb-7">
          <h3 className="font-bold">Tasks</h3>{" "}
          <Link href="/dashboard/tasks">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      {error && <GrayPlaceHolderBox content={error?.message} />}
      {loading && loadItems}
      {tasks?.length > 0 && resultItems}
      {data?.userTasks.length === 0 && (
        <GrayPlaceHolderBox content="You have no tasks to complete right now. We'll notify you when you do!" />
      )}
    </DashboardCard>
  );
};
