import { CheckCircleIcon } from "@heroicons/react/outline";

import { ToggleSwitch } from "@src/components/ui/ToggleSwitch";
import { Button } from "@src/components/ui/Button";

const planPoints = [
  "4 free appointments with our specialist per month access to ",
  "access to medical data history",
  "chat with our experts",
  "individual program",
  "personal dashboard",
];

export function PlanCard() {
  return (
    <div className="border border-gray-300 rounded-md flex-grow shadow">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <p>Basic Plan</p>
          <div>
            <p>US $120.00</p>
          </div>
        </div>
        <p className="py-2 md:whitespace-pre">
          If you want to upgrade your plan, please click the button below.
        </p>
        <p className="">Your current plan includes:</p>
        <div className="flex flex-col gap-y-2 mb-6">
          {planPoints.map((point, index) => {
            return (
              <p
                className="text-sm flex items-center gap-x-2 text-gray-600"
                key={point}
              >
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                {point}
              </p>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Enable auto renew</p>
            <p>
              After your subscription ends on 5 February 2024, this plan will
              continue automatically.
            </p>
          </div>
          <div>
            <ToggleSwitch
              label=""
              checked={true}
              onCheckedChange={() => {}}
              name="phone"
            />
          </div>
        </div>
      </div>
      <div className="w-full border-t border-gray-200 px-4 flex items-center justify-end py-4 gap-x-3">
        <Button buttonType="urgent">Cancel plan</Button>
        <Button>Change plan</Button>
      </div>
    </div>
  );
}
