import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { DashboardCard } from "@src/components/DashboardCard";

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
  const result = useQuery(userTasksQuery, {
    variables: {
      limit: 20,
      completed: false,
    },
  });

  const filteredTasks = result.data?.userTasks.userTasks.filter((task: any) => {
    return (
      task.task.type === TaskType.WeightLog ||
      task.task.type === TaskType.NewPatientIntakeForm ||
      task.task.type === TaskType.IdAndInsuranceUpload
    );
  });
  // if filteredTasks is empty, then we want to show the full list of tasks
  const tasks =
    filteredTasks?.length > 0
      ? filteredTasks
      : result?.data?.userTasks?.userTasks;
  // React.useEffect(() => {
  //   if (param !== null) {
  //     result.refetch();
  //     searchParams.delete("refetch");
  //     setSearchParams(searchParams);
  //   }
  // }, [param, result, searchParams, setSearchParams]);
  // React.useEffect(() => {
  //   // If there is an error with the query, we want to log it to Sentry
  //   if (result.error) {
  //     Sentry.captureException(new Error(result.error.message), {
  //       tags: {
  //         query: "userTasksQuery",
  //         component: "DashboardTaskList",
  //       },
  //     });
  //   }
  // }, [result]);
  if (result.loading) return <> Loading</>;
  return (
    <div className="w-full md:min-w-[49.5%]">
      {result.error && <div>{result.error.message}</div>}
      {!result.error && (
        <>
          <DashboardCard
            cardHeader={
              <div className="flex justify-between">
                <h3 className="font-bold">Tasks</h3>{" "}
                <Link href="/dashboard/tasks">
                  <p className="font-semibold">View all</p>
                </Link>
              </div>
            }
            items={[1, 2]}
          />
        </>
      )}
    </div>
  );
};

// {tasks.map((userTask: UserTask, i: number) => (
//   <div className="pt-6" key={i}>
//               <TaskItem
//                 key={userTask._id}
//                 id={userTask._id}
//                 type={userTask?.task?.type || ""}
//                 title={userTask?.task?.name || ""}
//                 createdAt={userTask.createdAt}
//                 dueAt={userTask.dueAt}
//                 pastDue={userTask.pastDue}
//                 actionText="Complete"
//                 />
//             </div>
//                 ))}
