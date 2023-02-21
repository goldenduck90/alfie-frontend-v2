import { HeartIcon, ClockIcon, CalendarIcon } from "@heroicons/react/outline";
import { Button } from "@src/components/ui/Button";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";

import React from "react";

export function LoadingTaskItem() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-col justify-between gap-y-3 md:flex-row  md:gap-x-2 w-full">
        <div className="flex flex-shrink pb-6 md:w-1/2">
          <div className="flex mr-4 rounded-xl bg-brand-peachy w-10 h-10 items-center justify-center min-w-[40px]">
            <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
          </div>
          <div className="w-full max-w-md">
            <div className="w-1/2">
              <PlaceHolderLine />
            </div>
            <div className="w-3/4">
              <PlaceHolderLine amount={2} />
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-[70px]">
          <ClockIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <PlaceHolderLine hasTopMargin />
        </div>

        <div className="hidden md:flex md:w-40">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="w-full">
            <PlaceHolderLine hasTopMargin />
          </div>
        </div>

        <div className="hidden md:flex">
          <Button disabled buttonType="secondary">
            Complete
          </Button>
        </div>
      </div>

      <div className="md:hidden flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
        <div className="flex w-full">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="w-1/2">
            <PlaceHolderLine />
          </div>
        </div>
        <div>
          <Button disabled buttonType="secondary">
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
