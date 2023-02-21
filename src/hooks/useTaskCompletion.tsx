import { gql, useMutation } from "@apollo/client";
import { randomId } from "@src/utils/randomId";
import { useNotificationStore } from "./useNotificationStore";

const completeUserTaskMutation = gql`
  mutation CompleteTask($input: CompleteUserTaskInput!) {
    completeUserTask(input: $input) {
      completed
    }
  }
`;

export function useTaskCompletion() {
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
    },
  });
}
