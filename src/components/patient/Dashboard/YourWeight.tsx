import { ChipIcon } from "@heroicons/react/outline";
import { CakeIcon, PencilIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { Line } from "@src/components/ui/Line";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { SliderRange } from "@src/components/ui/SliderRange";
import React from "react";
import { useForm } from "react-hook-form";

interface YourWeightProps {
  isLoading?: boolean;
}

export function YourWeight({ isLoading }: YourWeightProps) {
  const { control } = useForm({});

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] "
      cardHeader={
        <>
          <div className="flex flex-row">
            <div>
              <ChipIcon className="h-6 w-5 mr-2 mt-1" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center pb-2">
                <h2 className="text-gray-900 ">Your Weight</h2>
                <Button disabled={isLoading}>Update Weight</Button>
              </div>
              <p className="text-gray-900 text-5xl">
                {isLoading ? 0 : 165}{" "}
                <span className="text-gray-600 text-sm">lbs</span>
              </p>
            </div>
          </div>
        </>
      }
    >
      <Line color="light" marginY="large" />
      <div className="flex flex-row">
        <div>
          <CakeIcon className="h-5 w-5 mr-2 mt-[2px]" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center pb-2">
            <h2 className="text-gray-900 ">Your goal</h2>
            <PencilIcon className="h-4 w-4 text-gray-400" />
          </div>

          {isLoading ? (
            <PlaceHolderLine amount={3} />
          ) : (
            <p>
              It will take you 23 more weeks to reach your goal. You&apos;re
              smashing it, and you&apos;re on an excellent track to losing
              weight!
            </p>
          )}
          <div className="pt-8 flex flex-col w-full gap-y-2">
            <div className="flex gap-x-1">
              <p className="text-4xl">
                165.0 <span className="text-sm">lbs</span>
              </p>
            </div>
            <SliderRange defaultNumber={30} />
            <div className="w-full flex justify-between items-center text-sm text-gray-500">
              <p>11.0 lbs to reach goal</p>
              <p>4.5 lbs already lost</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
