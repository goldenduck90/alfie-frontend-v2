import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import React from "react";
import { TaskType, UserTask } from "../../graphql/generated";
import { Button } from "../Button2";
import { SeeAll } from "../SeeAll";
import { TaskItem } from "./TaskItem";

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
  console.log(result);
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
  if (result.loading) return <> Loadingadaadada</>;
  return (
    <div className="lg:w-full w-full pb-10">
      {result.error && <div>{result.error.message}</div>}
      {!result.error && (
        <>
          <div className="flex space-x-2">
            <Button buttonType="secondary">Test</Button>
            <Button buttonType="accent">Test</Button>
          </div>
          {tasks.map((userTask: UserTask, i: number) => (
            <div className="pt-6" key={i}>
              <TaskItem
                key={userTask._id}
                id={userTask._id}
                type={userTask?.task?.type || ""}
                title={userTask?.task?.name || ""}
                createdAt={userTask.createdAt}
                dueAt={userTask.dueAt}
                pastDue={userTask.pastDue}
                actionText="Complete"
              />
            </div>
          ))}
          <div className="mt-2 md:mt-4 flex flex-col md:flex-row items-center justify-center md:justify-end">
            <span className="text-gray-700 text-sm mb-1 md:text-md font-mulish font-medium md:hidden">
              1 of {result.data.userTasks.total}
            </span>
            <SeeAll path="/tasks" name="tasks" />
          </div>
        </>
      )}
    </div>
  );
};
