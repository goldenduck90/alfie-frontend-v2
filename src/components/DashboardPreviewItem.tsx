import { ClockIcon } from "@heroicons/react/outline";
import { HeartIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { PlaceHolderLine } from "./PlaceHolderLine";

export interface DashboardPreviewItemProps {
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ReactNode;
  renderDate: { date: string; time: string };
  isLoading?: boolean;
}

export function DashboardPreviewItem({
  title,
  href,
  icon,
  subtitle,
  renderDate,
  isLoading,
}: DashboardPreviewItemProps) {
  const router = useRouter();
  return (
    <button
      disabled={isLoading}
      onClick={() => router.push(href || "/dashboard")}
      className="rounded-xl border p-4 w-full my-2 bg-white hover:bg-gray-50"
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex">
          <div className="flex mr-4 rounded-full bg-brand-peachy w-10 h-10 items-center justify-center min-w-[40px]">
            {isLoading ? (
              1
            ) : (
              <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
            )}
          </div>

          {!subtitle ? (
            <div className="flex flex-col">
              {isLoading ? (
                <div className="min-w-[200px]">
                  <PlaceHolderLine amount={2} />
                </div>
              ) : (
                <>
                  <h2 className="">{title} Log your Blood Pressure</h2>
                  <p className="text-gray-500">
                    {subtitle} Log your Blood Pressure
                  </p>
                </>
              )}
            </div>
          ) : isLoading ? (
            <div className="min-w-[200px]">
              <PlaceHolderLine />
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
          {isLoading ? (
            <PlaceHolderLine />
          ) : (
            <>
              <p>{renderDate?.date}May 9, 2022</p>
              <p className="text-gray-500">{renderDate?.time}8:00 - 8:45 am</p>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
