import { TableUserObject } from "../tabs/IndividualPatientTabs";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

export function MedicalQuestionnaire({ taskData }: any) {
  const { data, error } = taskData;

  const taskWithAnswers = data?.getAllUserTasksByUser?.find(
    (patient: any) => patient.task.type === "NEW_PATIENT_INTAKE_FORM"
  );
  const taskAnswers = taskWithAnswers?.answers;

  if (error) {
    return <GrayPlaceHolderBox content={error.message} />;
  }
  console.log(taskAnswers, "taskAnswers")
  function getTaskValueBasedOnKey(key: string) {
    return taskAnswers?.find((answer: any) => answer.key === key)?.value;
  }
  return (
    <TableUserObject
      user={{
        "Weight Loss Attempt": getTaskValueBasedOnKey("weightLossAttemptTime"),
        "Weight Management": getTaskValueBasedOnKey("weightManagementMethods"),
        Conditions: getTaskValueBasedOnKey("conditions"),
        "Previous Conditions": getTaskValueBasedOnKey("previousConditions"),
        Medications: getTaskValueBasedOnKey("medications"),
        "Surgical History": getTaskValueBasedOnKey("surgicalHistory"),
        "Use Pill Pack": getTaskValueBasedOnKey("usePillPack"),
        "Has Required Labs": getTaskValueBasedOnKey("hasRequiredLabs"),
        Pharmacy: getTaskValueBasedOnKey("pharmacyLocation"),
      }}
    />
  );
}
