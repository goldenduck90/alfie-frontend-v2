import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";

import Link from "next/link";
import React from "react";
import { TaskType, UserTask } from "../../../graphql/generated";

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
      limit: 2,
      completed: false,
    },
  });

  const filteredTasks = data?.userTasks.userTasks.filter((task: any) => {
    return (
      task.task.type === TaskType.WeightLog ||
      task.task.type === TaskType.NewPatientIntakeForm ||
      task.task.type === TaskType.IdAndInsuranceUpload
    );
  });
  const tasks =
    filteredTasks?.length > 0 ? filteredTasks : data?.userTasks?.userTasks;

  // React.useEffect(() => {
  //   if (param !== null) {
  //     result.refetch();
  //     searchParams.delete("refetch");
  //     setSearchParams(searchParams);
  //   }
  // }, [param, result, searchParams, setSearchParams]);

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
    <DashboardPreviewItem key={i} {...(item as any)} isLoading />
  ));

  const resultItems = tasks?.map((item: UserTask, i: number) => (
    <DashboardPreviewItem
      key={i}
      href={`/dashboard/tasks/${item._id}`}
      renderDate={{ date: "", time: item.dueAt }}
      title={item?.task?.name || ""}
    />
  ));

  return (
    <div className="w-full md:min-w-[49.2%]">
      <div>
        <DashboardCard
          cardHeader={
            <div className="flex justify-between pb-7">
              <h3 className="font-bold">Tasks</h3>{" "}
              <Link href="/dashboard/tasks">
                <p className="font-semibold hover:underline">View all</p>
              </Link>
            </div>
          }
        >
          {error && <div className="h-full">{error?.message}</div>}
          {loading && loadItems}
          {data?.userTasks && resultItems}
        </DashboardCard>
      </div>
    </div>
  );
};
