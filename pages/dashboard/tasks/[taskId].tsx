import { Layout } from "@src/components/layouts/Layout";
import { TaskPage } from "@src/components/patient/task/TaskPage";

function Task() {
  return <TaskPage />;
}

Task.getLayout = (page: React.ReactNode) => (
  <Layout title="Task" subtitle="Unique task" hasBackButton={true}>
    {page}
  </Layout>
);

Task.isAuthRequired = true;

export default Task;
