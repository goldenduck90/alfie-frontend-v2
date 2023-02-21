import { client } from "@src/graphql";
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
    onCompleted: async () => {
      try {
        await client.refetchQueries({
          include: "active",
        });
      } catch (error) {
        console.log("Failed to refresh", { error });
      }
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

export function createAnwersFromObject(obj: Record<string, string>) {
  const answers: any[] = [];
  for (const [key, value] of Object.entries(obj)) {
    answers.push(
      createAnswerInputs({
        key,
        type: AnswerType.String,
        value: `${value}` as string,
      })
    );
  }
  return answers;
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
