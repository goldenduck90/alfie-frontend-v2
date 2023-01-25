import { UserIcon } from "@heroicons/react/outline";
import { Button } from "@src/components/Button2";

import { DashboardCard } from "@src/components/DashboardCard";
import React from "react";

export function BeforeAndAfter() {
  return (
    <DashboardCard cardHeader={""} className="w-full">
      <div className="flex flex-row">
        <div>
          <UserIcon className="h-5 w-5 mr-2 mt-[2px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center pb-2">
            <h2 className="text-gray-900 font-bold">Before and after</h2>
          </div>
          <p className="text-gray-700">
            Add photos of yourself and keep record of your progress.
          </p>
          <div className="pt-4">
            <Button buttonType="secondary">Upload photo</Button>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
