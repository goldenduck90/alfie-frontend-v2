import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

/**
 * There is task, User task and etc. None of it makes sense as to which this fetchs from.
 * The other userTask will fail for me.
 * This succeeds with null data. Idk what that means.
 */
const userTaskQuery = gql`
  query UserTaskQuery($taskId: String!) {
    task(id: $taskId) {
      _id
      name
      highPriority
      type
    }
  }
`;

export function TaskPage() {
  const { taskId } = useRouter().query as { taskId: string };
  const taskResult = useQuery(userTaskQuery, {
    variables: {
      taskId,
    },
  });

  return <div className="border rounded-xl bg-white p-7">Task {taskId}</div>;
}
