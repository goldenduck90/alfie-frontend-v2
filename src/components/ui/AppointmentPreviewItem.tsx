import { ClockIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Button } from "./Button";
import { PlaceHolderLine } from "./PlaceHolderLine";
import moment from "moment-timezone";

export interface AppointmentPreviewItemProps {
  name?: string;
  providerTitle?: string;
  img?: string;
  icon?: React.ReactNode;
  renderDate?: { date: string; time: string };
  isLoading?: boolean;
  appointmentId?: string;
  abnormality?: string;
}

export function AppointmentPreviewItem({
  name,
  providerTitle,
  img,
  renderDate,
  isLoading,
  appointmentId,
  icon,
  abnormality,
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
            <h2 className="text-gray-900 font-medium">{name}</h2>
            <p className="text-gray-600 font-normal">{providerTitle}</p>
          </div>
        )}
        {icon ? (
          icon
        ) : (
          <div className="flex rounded-full bg-lime-100 w-10 h-10 items-center justify-center min-w-[40px]">
            <UserIcon className="h-6 w-6 text-lime-700" />
          </div>
        )}
      </div>
      {abnormality && <div className="bg-red-200"> oh snap you abnormal</div>}

      <div className="flex w-full pt-6">
        <ClockIcon
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        {isLoading ? (
          <div className="w-1/2">
            <PlaceHolderLine hasTopMargin />
          </div>
        ) : (
          <div className="flex w-full justify-between">
            <div>{renderDate?.date}</div>
            <div className="text-gray-400">
              {`${renderDate?.time} (${moment
                .tz(moment.tz.guess())
                .zoneAbbr()})`}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end border-t-[1px] rounded-b-xl -m-6 mt-4 py-4 px-4 bg-gray-50">
        <Link
          href={`/dashboard/appointments/${appointmentId}`}
          passHref
          legacyBehavior
        >
          <Button disabled={isLoading}>See details</Button>
        </Link>
      </div>
    </div>
  );
}
