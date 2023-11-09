import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
  TaskType,
  UserAppointmentEligibility,
  UserTask,
} from "../../../graphql/generated";
import { TaskItem } from "./TaskItem";
import { LoadingTaskItem } from "./LoadingTaskItems";
import { ToggleGroup } from "@src/components/ui/ToggleGroup";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

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

const userAppointmentTaskCompletionQuery = gql`
  query GetUserCompletedAppointmentTasksInMonth {
    userScheduleAppointmentTask {
      daysLeft
      task {
        completed
        completedAt
      }
      completedRequiredTasks
    }
  }
`;

export const TasksPage = () => {
  const [taskFilter, setTaskFilter] = React.useState<"Active" | "Completed">(
    "Active"
  );

  const { data, error, loading } = useQuery<{
    userTasks: {
      userTasks: UserTask[];
    };
  }>(userTasksQuery, {
    variables: {
      limit: 100,
      completed: taskFilter === "Completed",
    },
  });

  const { data: userEligibility } = useQuery<{
    userScheduleAppointmentTask: UserAppointmentEligibility;
  }>(userAppointmentTaskCompletionQuery);

  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "userTasksQuery",
          component: "Tasks",
        },
      });
    }
  }, [error]);

  const toggleItems = [
    {
      content: (
        <div>
          Active Tasks <span className="">12</span>
        </div>
      ),
      value: "active",
    },
    {
      content: (
        <div>
          Completed Tasks <span className="">4</span>
        </div>
      ),
      value: "completed",
    },
  ];

  const userAppointmentEligibility =
    userEligibility?.userScheduleAppointmentTask;

  const userTasks = useMemo(() => {
    if (!loading && (!error || error && error.message === "You have no tasks to complete right now. We'll notify you when you do!")) {
      const userTaskList = data?.userTasks?.userTasks || [];
      const scheduleAppointmentTaskExists = userTaskList.some(
        ({ task, completed }) => task?.type === TaskType.ScheduleAppointment && !completed
      );

      if (!scheduleAppointmentTaskExists) {
        // If "Schedule Appointment" is not in the server data, add it to the list
        return [
          {
            _id: "schedule-appointment-placeholder",
            task: {
              name: "Schedule Appointment",
              type: TaskType.ScheduleAppointment,
            },
          } as UserTask,
          ...userTaskList,
        ];
      } else {
        // Sort the tasks array to move "Schedule Appointment" to the front
        return userTaskList.slice().sort((a, b) => {
          if (a.task?.type === TaskType.ScheduleAppointment) {
            return -1; // Move "Schedule Appointment" to the front
          } else if (b.task?.type === TaskType.ScheduleAppointment) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
    // If loading or an error occurred, return an empty array or handle the error
    return [];
  }, [loading, error, data, userAppointmentEligibility]);

  const scheduleAppointmentHelperText = useMemo(() => {
    if (!userAppointmentEligibility) {
      return "";
    }
    const { daysLeft, completedRequiredTasks } = userAppointmentEligibility;
    if (!completedRequiredTasks) {
      return "Please complete all the other tasks assigned to you before you schedule an appointment with your clinician";
    } else if (daysLeft && daysLeft > 0) {
      return `You will be able to schedule this appointment in ${daysLeft} days. If you need to see a doctor urgently please message in the chat for an adhoc appointment.`;
    }
  }, [userAppointmentEligibility]);

  return (
    <div>
      {error && error.message == "You have no tasks to complete right now. We'll notify you when you do!" && userTasks.length === 0 && (
        <div className="flex flex-col bg-white p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold font-mulish">
            No tasks available
          </h2>
          <GrayPlaceHolderBox content={error.message} />
        </div>
      )}
      {userTasks.length > 0 && (
        <div className="flex flex-col bg-white p-6 rounded-lg">
          {/* <div className="flex flex-row pb-8">
            <ToggleGroup defaultValue="active" items={toggleItems} />
          </div> */}
          <h2 className="text-xl md:text-2xl font-bold font-mulish">
            {taskFilter} tasks
          </h2>
          {userTasks.map((userTask: UserTask, i: number) => {
            const validUserTask =
              userTask._id !== "schedule-appointment-placeholder";
            return (
              <div className="pt-6" key={i}>
                <TaskItem
                  key={userTask._id}
                  id={userTask._id}
                  type={(userTask?.task?.type || "") as any}
                  title={userTask?.task?.name || ""}
                  createdAt={userTask.createdAt}
                  dueAt={userTask.dueAt}
                  pastDue={userTask.pastDue}
                  actionText="Complete"
                  valid={validUserTask}
                  helperText={
                    !validUserTask ? scheduleAppointmentHelperText : ""
                  }
                />
              </div>
            );
          })}
          {loading &&
            Array(6)
              .fill("")
              .map((_, i) => (
                <div className="pt-6" key={i}>
                  <LoadingTaskItem />
                </div>
              ))}

          {/* <div className="mt-2 md:mt-4 flex flex-col md:flex-row items-center justify-center md:justify-end">
            <span className="text-gray-700 text-sm mb-1 md:text-md  font-medium md:hidden">
              1 of {data?.userTasks?.total || 1}
            </span>
          </div> */}
        </div>
      )}
    </div>
  );
};
