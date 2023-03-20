import { DialogBody, DialogModal } from "@src/components/modal/Dialog";
import { BloodPressure } from "@src/components/modal/variants/BloodPressure";
import { FoodLog } from "@src/components/modal/variants/FoodLog";
import { IDVerificationModal } from "@src/components/modal/variants/IDVerification";
import {
  MetabolicProfileActivity,
  MetabolicProfileHunger,
  MetabolicProfileMeals,
} from "@src/components/modal/variants/MetabolicProfile";
import { WaistMeasurement } from "@src/components/modal/variants/WaistMeasurement";
import { WeightEntry } from "@src/components/modal/variants/WeightEntry";
import { Button } from "@src/components/ui/Button";
import { TaskType } from "@src/graphql/generated";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const TaskSelector = ({
  type,
  userTaskId,
  trigger = <Button buttonType="secondary">Complete</Button>,
  createdAt,
}: {
  type: string;
  userTaskId: string;
  trigger?: React.ReactNode;
  createdAt?: Date;
}) => {
  const router = useRouter();

  switch (type) {
    case TaskType.IdAndInsuranceUpload:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <IDVerificationModal
            taskId={userTaskId}
            title="ID & Insurance verification"
          />
        </DialogModal>
      );
    case TaskType.NewPatientIntakeForm:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <DialogBody
            title="Medical Questionnaire"
            description="Complete a basic medical form so that we can tailor our services to your needs."
            onClick={() => router.push(`/questionnaire/${userTaskId}`)}
            createdAt={createdAt}
          />
        </DialogModal>
      );
    case TaskType.BpLog:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <BloodPressure taskId={userTaskId} title="Log your Blood Pressure" />
        </DialogModal>
      );
    case TaskType.WaistLog:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <WaistMeasurement
            taskId={userTaskId}
            title="Enter your waist measurement"
          />
        </DialogModal>
      );
    case TaskType.WeightLog:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <WeightEntry taskId={userTaskId} title="Enter your weight" />
        </DialogModal>
      );
    case TaskType.MpHunger:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <MetabolicProfileHunger
            taskId={userTaskId}
            title="Metabolic Profile (Hunger)"
          />
        </DialogModal>
      );
    case TaskType.MpFeeling:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <DialogBody
            title="Metabolic Profile (Feeling) Questionnaire"
            description="These questions, in combination with the Metabolic Profiling kit sent to you, help us determine your metabolic profile in order to understand which medications will be most effective for you. Once we get the results of your metabolic kit we’ll share a detailed report on your personal metabolic profile!"
            onClick={() => router.push(`/questionnaire/${userTaskId}`)}
            createdAt={createdAt}
          />
        </DialogModal>
      );
    case TaskType.MpActivity:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <MetabolicProfileActivity
            taskId={userTaskId}
            title="Metabolic Profile (Activity)"
          />
        </DialogModal>
      );
    // case TaskType.MpBlueCapsule:
    //   return <MpBlueCapsule userTaskId={userTaskId} />;
    // case TaskType.MpBlueCapsule_2:
    //   return <MpBlueCapsulePartTwo userTaskId={userTaskId} />;
    case TaskType.ScheduleAppointment:
      return (
        <Link href={"/dashboard/appointments"} passHref legacyBehavior>
          {trigger ? trigger : <Button buttonType="secondary">Schedule</Button>}
        </Link>
      );
    case TaskType.AdLibitum:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <MetabolicProfileMeals
            taskId={userTaskId}
            title="Metabolic Profile (Ad Libitum meals)"
          />
        </DialogModal>
      );
    case TaskType.FoodLog:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <FoodLog taskId={userTaskId} />
        </DialogModal>
      );

    case TaskType.Gsrs:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <DialogBody
            title="Gastrointestinal Symptoms Rating Scale"
            createdAt={createdAt}
            description="This survey contains questions about how you have been feeling and what it has been like during the last week."
            onClick={() => router.push(`/questionnaire/${userTaskId}`)}
          />
        </DialogModal>
      );
    case TaskType.Tefq:
      return (
        <DialogModal triggerAsChild trigger={trigger}>
          <DialogBody
            title="The Three-Factor Eating Questionnaire"
            createdAt={createdAt}
            description="We would like to know your habits and behaviours regarding eating and taking meals."
            onClick={() => router.push(`/questionnaire/${userTaskId}`)}
          />
        </DialogModal>
      );
    default:
      return <div>No Action</div>;
  }
};
