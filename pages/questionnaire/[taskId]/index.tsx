import { QuestionnaireLayout } from "@src/components/layouts/QuestionaireLayout";
import { Question } from "@src/components/questionnaire/Question";

export default function Page() {
  return <Question />;
}

// Page.getLayout = (page: React.ReactNode) => (
//   <QuestionnaireLayout title="Medical Questionnaire">
//     {page}
//   </QuestionnaireLayout>
// );

Page.isAuthRequired = true;
