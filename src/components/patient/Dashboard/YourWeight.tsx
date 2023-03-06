import React from "react";
import { useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

import { PencilIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { Line } from "@src/components/ui/Line";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { SliderRange } from "@src/components/ui/SliderRange";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { DialogModal } from "@src/components/modal/Dialog";
import { WeightEntry } from "@src/components/modal/variants/WeightEntry";
import { ScaleTwoIcon, TargetIcon } from "@src/components/svg";

export function YourWeight() {
  const { user } = useCurrentUserStore();
  const { control } = useForm({});

  const currentWeight = user?.weights[user?.weights.length - 1]?.value;
  const firstWeight = user?.weights[0]?.value;

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] "
      cardHeader={
        <>
          <div className="flex flex-row">
            <span className="mr-2 mt-1">
              <ScaleTwoIcon />
            </span>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center pb-2">
                <h2 className="text-gray-900 ">Your Weight</h2>
                <DialogModal
                  triggerAsChild
                  trigger={<Button>Update Weight</Button>}
                >
                  <WeightEntry title="Enter your weight" taskId="" />
                </DialogModal>
              </div>
              <p className="text-gray-900 text-5xl">
                {currentWeight}
                <span className="text-gray-600 text-sm">lbs</span>
              </p>
            </div>
          </div>
        </>
      }
    >
      {user?.weightGoal && (
        <>
          <Line color="light" marginY="large" />
          <div className="flex flex-row">
            <span className="mr-2 mt-[2px]">
              <TargetIcon />
            </span>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center pb-2">
                <h2 className="text-gray-900 ">Your goal</h2>
                <PencilIcon className="h-4 w-4 text-gray-400" />
              </div>

              <p>
                It will take you 23 more weeks to reach your goal. You&apos;re
                smashing it, and you&apos;re on an excellent track to losing
                weight!
              </p>

              <div className="pt-8 flex flex-col w-full gap-y-2">
                <div className="flex gap-x-1">
                  <p className="text-4xl">
                    {currentWeight} <span className="text-sm">lbs</span>
                  </p>
                </div>
                {currentWeight && user.weightGoal && firstWeight && (
                  <SliderRange
                    defaultNumber={
                      ((currentWeight - firstWeight) /
                        (user?.weightGoal - firstWeight)) *
                      100
                    }
                  />
                )}
                <div className="w-full flex justify-between items-center text-sm text-gray-500">
                  {currentWeight && firstWeight && (
                    <>
                      <p>{user.weightGoal}lbs to reach goal</p>
                      <p>{firstWeight - currentWeight} lbs already lost</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardCard>
  );
}
