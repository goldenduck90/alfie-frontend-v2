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

export function createAnswersFromObject(obj: Record<string, string | number>) {
  const answers: any[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      const tempValues = value
        ?.filter((v) => {
          if (typeof v === "string" && v?.length > 0) return true;
          if (
            typeof v === "object" &&
            Object.hasOwn(v, "value") &&
            v?.value?.length > 0
          )
            return true;
          return false;
        })
        .map((v) => {
          if (typeof v === "string") return v;
          return `${v?.value}`;
        });
      if (tempValues?.length === 0) continue;
      answers.push(
        createAnswerInputs({
          key,
          type: valueToAnswerType(value),
          value: tempValues as any,
        })
      );
    } else {
      if (!value) continue;
      answers.push(
        createAnswerInputs({
          key,
          type: valueToAnswerType(value),
          value: `${value}` as string,
        })
      );
    }
  }
  return answers;
}

function valueToAnswerType(value: unknown) {
  // Try convert value to number then check type
  let val = value;
  if (!Number.isNaN(Number(val))) {
    val = Number(val);
  } else if (Array.isArray(val)) {
    return AnswerType.Array;
  } else if (typeof val === "object") {
  }

  switch (typeof val) {
    case "string":
      return AnswerType.String;
    case "number":
      return AnswerType.Number;
    default:
      return AnswerType.String;
  }
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
