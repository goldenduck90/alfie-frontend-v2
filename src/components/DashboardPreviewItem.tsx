import { ClockIcon } from "@heroicons/react/outline";
import { HeartIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

export interface DashboardPreviewItemProps {
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ReactNode;
  renderDate: { date: string; time: string };
}

export function DashboardPreviewItem({
  title,
  href,
  icon,
  subtitle,
  renderDate,
}: DashboardPreviewItemProps) {
  return (
    <Link href={href || "/dashboard"}>
      <button className="rounded-xl border p-4 w-full my-2">
        <div className="flex flex-row justify-between w-full">
          <div className="flex">
            <div className="flex mr-4 rounded-full bg-brand-peachy w-10 h-10 items-center justify-center min-w-[40px]">
              <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
            </div>
            {subtitle ? (
              <div className="flex flex-col">
                <h2 className="">{title} Log your Blood Pressure</h2>
                <p className="text-gray-500">
                  {subtitle} Log your Blood Pressure
                </p>
              </div>
            ) : (
              <h2 className="self-center">{title} Log your Blood Pressure</h2>
            )}
          </div>
          <ChevronRightIcon className="h-5 w-5 self-center " />
        </div>

        <div className="flex flex-row py-3 px-4 mt-3 bg-gray-100 border border-gray-100 rounded-md items-center">
          <ClockIcon className="h-4 w-4 mr-4" />{" "}
          <div className="flex justify-between w-full">
            <p>{renderDate?.date}May 9, 2022</p>
            <p className="text-gray-500">{renderDate?.time}8:00 - 8:45 am</p>
          </div>
        </div>
      </button>
    </Link>
  );
}
