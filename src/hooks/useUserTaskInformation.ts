import { useCurrentUserStore } from "./useCurrentUser";
import { TaskType } from "./../graphql/generated";
import { gql, useQuery } from "@apollo/client";

const GetUserClassifications = gql`
  query getUser($userId: String!) {
    getUserById(userId: $userId) {      
      classifications {
        classification
        calculatedPercentile
        percentile
        displayPercentile
        date
      }
    }
  }
`;

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
      answers {
        key
        value
        type
      }
    }
  }
`;
export function useUserTaskInformation() {
  const { user } = useCurrentUserStore();
  console.log(user, "user");
  const taskData = useQuery(getTasksQuery, {
    variables: {
      userId: user?._id,
    },
  });
  const userClassificationData = useQuery(GetUserClassifications, {
    variables: {
      userId: user?._id,
    },
  });
  const classificationData = userClassificationData?.data?.getUserById?.classifications
  const chartInformation: {
    [key in TaskType]: {
      value: any;
      date: number;
      systolic?: any;
      diastolic?: any;
    }[];
  } = {} as any;

  taskData?.data?.getAllUserTasksByUser?.forEach((item: any) => {
    if (!chartInformation[item?.task?.type as TaskType]) {
      chartInformation[item?.task?.type as TaskType] = [];
    }
    if (item?.task?.type === TaskType.BpLog && item.completed > 0) {
      chartInformation[item?.task?.type as TaskType].push({
        date: new Date(item.completedAt).getTime(),
        systolic: item?.answers[0]?.value,
        diastolic: item?.answers[1]?.value,
        value: item?.answers[0]?.value,
      });
    } else {
      if (item?.answers?.[0]?.value && item.completed > 0) {
        chartInformation[item?.task?.type as TaskType].push({
          date: new Date(item.completedAt).getTime(),
          value: item?.answers[0]?.value,
        });
      }
    }
  });

  return {
    chartInformation,
    classificationData,
    taskData,
  };
}
