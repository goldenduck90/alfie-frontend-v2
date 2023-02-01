import { ClockIcon } from "@heroicons/react/outline";
import {
  HeartIcon,
  ChevronRightIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import { Button } from "./Button";
import { PlaceHolderLine } from "./PlaceHolderLine";

export interface AppointmentPreviewItemProps {
  title?: string;
  subtitle?: string;
  img?: string;
  icon?: React.ReactNode;
  renderDate?: { date: string; time: string };
  isLoading?: boolean;
}

export function AppointmentPreviewItem({
  title,
  subtitle,
  img,
  renderDate,
  isLoading,
}: AppointmentPreviewItemProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-row justify-between gap-2 w-full">
        {isLoading ? (
          <div className="flex flex-col flex-shrink pb-6 w-3/5">
            <PlaceHolderLine amount={2} />
          </div>
        ) : (
          <div>
            <h2 className="text-gray-900 font-medium">Noah Pierre</h2>
            <p className="text-gray-600 font-normal">Gastroenterology</p>
          </div>
        )}
        <div className="flex rounded-full bg-brand-peachy w-10 h-10 items-center justify-center min-w-[40px]">
          <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
        </div>
      </div>

      <div className="flex flex-row border-t-[1px] rounded-b-xl justify-between -m-4 mt-4 py-4 px-6 bg-gray-50">
        <div className="flex w-full">
          <ClockIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="w-1/2">
            <PlaceHolderLine />
          </div>
        </div>
        <div>
          <Button disabled buttonType="primary">
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
