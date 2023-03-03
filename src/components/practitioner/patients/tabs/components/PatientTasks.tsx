import React from "react";
import { TaskItem } from "./TaskItem";
import { LoadingTaskItem } from "./LoadingTaskItem";

export function PatientTasks({ taskData }: any) {
  const { data, loading, error } = taskData;

  const renderTasks = data?.getAllUserTasksByUser
    .map((task: any, i: number) => <TaskItem {...task} key={i} />)
    .sort((a: { completed: boolean }) => (a.completed ? 1 : -1));

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

export function GrayBox({ content }: { content?: string }) {
  return (
    <div className="bg-gray-100 rounded-xl border flex justify-center items-center h-80">
      <h2 className="text-lg">{content}</h2>
    </div>
  );
}
