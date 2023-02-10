import { QuestionnaireLayout } from "@src/components/layouts/QuestionaireLayout";
import {
  DialogBody,
  DialogModal,
  DialogVersion2,
} from "@src/components/modal/Dialog";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-3 bg-white shadow-md border rounded-md py-3">
      <DialogModal text="Medical Questionnaire">
        <DialogBody
          title="Medical Questionnaire"
          description="Complete a basic medical form so that we can tailor our services to your needs."
        />
      </DialogModal>
      <DialogModal text="Metabolic Profile">
        <DialogBody
          title="Metabolic Profile (Feeling) Questionnaire"
          description="These questions, in combination with the Metabolic Profiling kit sent to you, help us determine your metabolic profile in order to understand which medications will be most effective for you. Once we get the results of your metabolic kit we’ll share a detailed report on your personal metabolic profile!"
        />
      </DialogModal>
      <DialogModal text="Gastrointestinal Symptoms Rating Scale">
        <DialogBody
          title="Gastrointestinal Symptoms Rating Scale"
          description="This survey contains questions about how you have been feeling and what it has been like during the last week."
        />
      </DialogModal>
      <DialogModal text="The Three-Factor Eating Questionnaire">
        <DialogBody
          title="The Three-Factor Eating Questionnaire"
          description="We would like to know your habits and behaviours regarding eating and taking meals."
        />
      </DialogModal>
      <DialogModal text="ID & Insurance verification">
        <DialogVersion2 />
      </DialogModal>
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => (
  <QuestionnaireLayout title="Medical Questionnaire">
    {page}
  </QuestionnaireLayout>
);

Page.isAuthRequired = true;
