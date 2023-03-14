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
  return (
    <TableUserObject
      user={{
        "Weight Loss Attempt": taskAnswers?.[0]?.value,
        "Weight Management": taskAnswers?.[1]?.value,
        Conditions: taskAnswers?.[2]?.value,
        "Previous Conditions": taskAnswers?.[3]?.value,
        Medications: taskAnswers?.[4]?.value,
        "Surgical History": taskAnswers?.[5]?.value,
        "Use Pill Pack": taskAnswers?.[6]?.value,
        "Has Required Labs": taskAnswers?.[7]?.value === "true" ? "Yes" : "No",
        Pharmacy: taskAnswers?.[8]?.value,
      }}
    />
  );
}
