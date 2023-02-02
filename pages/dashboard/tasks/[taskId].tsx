import { Layout } from "@src/components/layouts/Layout";
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

export default function Tasks() {
  const { taskId } = useRouter().query as { taskId: string };
  const taskResult = useQuery(userTaskQuery, {
    variables: {
      taskId,
    },
  });

  console.log({ taskId, taskResult });
  return <div>Single Task: {taskId}</div>;
}

Tasks.getLayout = (page: React.ReactNode) => (
  <Layout title="Task" subtitle="Unique task">
    {page}
  </Layout>
);

Tasks.isAuthRequired = true;
