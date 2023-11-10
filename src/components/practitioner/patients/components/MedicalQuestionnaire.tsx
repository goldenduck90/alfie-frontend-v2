import { medications } from "@src/components/questionnaire/medicalQuestions";
import { TableUserObject } from "./TableUserObject";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

export function MedicalQuestionnaire({ taskData }: any) {
  const { data, error } = taskData;

  const taskWithAnswers = data?.getAllUserTasksByUser?.find(
    (patient: any) => patient.task?.type === "NEW_PATIENT_INTAKE_FORM"
  );
  const taskAnswers = taskWithAnswers?.answers;

  if (error) {
    return <GrayPlaceHolderBox content={error.message} />;
  }

  function getTaskValueBasedOnKey(key: string) {
    const answer = taskAnswers?.find(
      (answer: any) => answer.key === key
    )?.value;
    if (key === "medications" && typeof answer === "object") {
      const medicationAnswer: any = {};
      Object.keys(answer).map((mId) => {
        const medication = medications.find((m) => m.id === mId);
        if (medication) {
          medicationAnswer[medication.name] = answer[mId];
        }
      });

      return medicationAnswer;
    }

    return answer;
  }
  return (
    <TableUserObject
      user={{
        "Weight Loss Attempt": getTaskValueBasedOnKey("weightLossAttemptTime"),
        "Weight Management": getTaskValueBasedOnKey("weightManagementMethods"),
        "Conditions": getTaskValueBasedOnKey("conditions"),
        "Previous Conditions": getTaskValueBasedOnKey("previousConditions"),
        "Medications": getTaskValueBasedOnKey("medications"),
        "Surgical History": getTaskValueBasedOnKey("surgicalHistory"),
        "Use Pill Pack": getTaskValueBasedOnKey("usePillPack"),
        "Has Required Labs": getTaskValueBasedOnKey("hasRequiredLabs"),
        "Pharmacy": getTaskValueBasedOnKey("pharmacyLocation"),
      }}
    />
  );
}
