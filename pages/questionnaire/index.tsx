import { Layout } from "@src/components/layouts/Layout";
import { Question } from "@src/components/questionnaire/Question";

export default function Page() {
  return <Question />;
}

Page.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Questions"
    subtitle="Complete your active tasks and manage archived ones."
  >
    {page}
  </Layout>
);

Page.isAuthRequired = true;
