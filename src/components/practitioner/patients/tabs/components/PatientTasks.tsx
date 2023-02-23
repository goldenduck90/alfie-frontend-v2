import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { TaskItem } from "./TaskItem";
import { LoadingTaskItem } from "./LoadingTaskItem";

const getTasksQuery = gql`
  query GetAllUserTasksByUser($userId: String!) {
    getAllUserTasksByUser(userId: $userId) {
      _id
      task {
        _id
        name
        type
        daysTillDue
        interval
      }
      archived
      completed
      dueAt
      pastDue
      completedAt
      createdAt
      updatedAt
      providerEmail
    }
  }
`;

export function PatientTasks() {
  const router = useRouter();

  const { data, loading, error } = useQuery(getTasksQuery, {
    variables: {
      userId: router.query?.patientId,
    },
  });

  const renderTasks = data?.getAllUserTasksByUser.map(
    (task: any, i: number) => <TaskItem {...task} key={i} />
  );

  const renderLoadTasks = Array(8)
    .fill("")
    .map((_, i) => <LoadingTaskItem key={i} />);

  const noPatientTasks =
    !loading && data?.getAllUserTasksByUser?.length === 0 && !error;

  return (
    <div className="py-8">
      {renderTasks}
      {loading && renderLoadTasks}
      {error && <GrayBox content={error.message} />}
      {noPatientTasks && (
        <GrayBox content="There are no task to be shown here" />
      )}
    </div>
  );
}

function GrayBox({ content }: { content?: string }) {
  return (
    <div className="bg-gray-100 rounded-xl border flex justify-center items-center h-80">
      <h2 className="text-lg">{content}</h2>
    </div>
  );
}
