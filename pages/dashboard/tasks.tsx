import { TasksPage } from "@src/components/tasks/TasksPage";
import { Layout } from "../../src/components/layouts/Layout";

export default function Tasks() {
  return <TasksPage />;
}

Tasks.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Tasks "
    subtitle="Complete your active tasks and manage archived ones."
  >
    {page}
  </Layout>
);

Tasks.isAuthRequired = true;
