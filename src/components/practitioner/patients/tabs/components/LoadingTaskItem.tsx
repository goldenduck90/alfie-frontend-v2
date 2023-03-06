import { CheckCircleIcon } from "@heroicons/react/solid";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { TaskType } from "@src/graphql/generated";

import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";

export function LoadingTaskItem() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-4 animate-pulse h-[142px]">
      <div className="flex flex-col justify-between gap-y-3 md:flex-row  md:gap-x-2 ">
        <div className="flex flex-shrink md:w-4/5">
          <ChooseTaskIcon value={TaskType.NewPatientIntakeForm} />
          <div className="w-4/5">
            <div className="w-1/4">
              <PlaceHolderLine hasTopMargin />
            </div>
            <PlaceHolderLine />

            <div className="hidden md:flex flex-row pt-3">
              <div className="flex items-center pr-8">
                <ClockIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-14">
                  <PlaceHolderLine hasTopMargin />
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-14">
                  <PlaceHolderLine hasTopMargin />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex">
          <div className="text-gray-500 flex">
            <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
            <div className="w-24">
              <PlaceHolderLine hasTopMargin />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
        <div className="flex items-center">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="w-14">
            <PlaceHolderLine hasTopMargin />
          </div>
        </div>

        <div className="text-gray-500 flex">
          <CheckCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
          <div className="w-14">
            <PlaceHolderLine hasTopMargin />
          </div>
        </div>
      </div>
    </div>
  );
}
