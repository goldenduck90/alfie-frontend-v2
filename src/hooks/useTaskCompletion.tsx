import { gql, useMutation } from "@apollo/client";
import { AnswerType } from "@src/graphql/generated";
import { randomId } from "@src/utils/randomId";
import { useNotificationStore } from "./useNotificationStore";

const completeUserTaskMutation = gql`
  mutation CompleteTask($input: CompleteUserTaskInput!) {
    completeUserTask(input: $input) {
      completed
    }
  }
`;

export function useTaskCompletion(onCompleted?: () => void) {
  const { addNotification } = useNotificationStore();
  return useMutation(completeUserTaskMutation, {
    onError: () => {
      addNotification({
        title: "Error",
        description:
          "There was an error completing the task. Please try again later.",
        type: "error",
        id: randomId(),
      });
    },
    onCompleted: () => {
      addNotification({
        title: "Success",
        description: "Task Completed",
        type: "success",
        id: randomId(),
      });
      onCompleted?.();
    },
  });
}

export function createAnswerInputs({
  key,
  type,
  value,
}: {
  key: string;
  type: AnswerType;
  value: string;
}) {
  return {
    key,
    type,
    value,
  };
}

/**
 * CompleteUserTaskInput {
 *  _id: string
 *   answers: [{
 *      key: string
 *      type: string
 *      value: string
 *   }]
 * }
 *
 */
