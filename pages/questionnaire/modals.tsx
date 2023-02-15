import { QuestionnaireLayout } from "@src/components/layouts/QuestionaireLayout";
import { DialogBody, DialogModal } from "@src/components/modal/Dialog";
import { BloodPressure } from "@src/components/modal/variants/BloodPressure";
import { IDVerificationModal } from "@src/components/modal/variants/IDVerification";
import {
  MetabolicProfileActivity,
  MetabolicProfileHunger,
  MetabolicProfileMeals,
} from "@src/components/modal/variants/MetabolicProfile";
import { WaistMeasurement } from "@src/components/modal/variants/WaistMeasurement";
import { WeightEntry } from "@src/components/modal/variants/WeightEntry";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-3 bg-white border rounded-md py-3">
      <DialogModal trigger="Medical Questionnaire">
        <DialogBody
          title="Medical Questionnaire"
          description="Complete a basic medical form so that we can tailor our services to your needs."
        />
      </DialogModal>
      <DialogModal trigger="Metabolic Profile">
        <DialogBody
          title="Metabolic Profile (Feeling) Questionnaire"
          description="These questions, in combination with the Metabolic Profiling kit sent to you, help us determine your metabolic profile in order to understand which medications will be most effective for you. Once we get the results of your metabolic kit we’ll share a detailed report on your personal metabolic profile!"
        />
      </DialogModal>
      <DialogModal trigger="Gastrointestinal Symptoms Rating Scale">
        <DialogBody
          title="Gastrointestinal Symptoms Rating Scale"
          description="This survey contains questions about how you have been feeling and what it has been like during the last week."
        />
      </DialogModal>
      <DialogModal trigger="The Three-Factor Eating Questionnaire">
        <DialogBody
          title="The Three-Factor Eating Questionnaire"
          description="We would like to know your habits and behaviours regarding eating and taking meals."
        />
      </DialogModal>
      <DialogModal trigger="ID & Insurance verification">
        <IDVerificationModal title="ID & Insurance verification" />
      </DialogModal>
      <DialogModal trigger="Log your Blood Pressure">
        <BloodPressure title="Log your Blood Pressure" />
      </DialogModal>
      <DialogModal trigger="Enter your weight">
        <WeightEntry title="Enter your weight" />
      </DialogModal>
      <DialogModal trigger="Enter your waist measurement">
        <WaistMeasurement title="Enter your waist measurement" />
      </DialogModal>
      <DialogModal trigger="Metabolic Profile (Hunger)">
        <MetabolicProfileHunger title="Metabolic Profile (Hunger)" />
      </DialogModal>
      <DialogModal trigger="Metabolic Profile (Activity)">
        <MetabolicProfileActivity title="Metabolic Profile (Activity)" />
      </DialogModal>
      <DialogModal trigger="Metabolic Profile (Ad Libitum meals)">
        <MetabolicProfileMeals title="Metabolic Profile (Ad Libitum meals)" />
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
