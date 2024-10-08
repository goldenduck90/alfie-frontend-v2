import { ClockIcon } from "@heroicons/react/outline";
import { HeartIcon, ChevronRightIcon, UserIcon } from "@heroicons/react/solid";
import { TaskType } from "@src/graphql/generated";
import React from "react";
import { ChooseTaskIcon } from "../ChooseTaskIcon";
import { PlaceHolderLine } from "./PlaceHolderLine";
import { getTimeZone, TZ_FORMAT } from "@src/utils/timezone";

export interface DashboardPreviewItemProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  icon?: TaskType;
  renderDate: { date?: string; time?: string };
  isLoading?: boolean;
  placeHolderIcon?: "user" | "heart";
  renderIcon?: React.ReactNode;
}

export const DashboardPreviewItem = React.forwardRef(
  (
    {
      title,
      onClick,
      icon,
      subtitle,
      renderDate,
      isLoading,
      placeHolderIcon = "heart",
      renderIcon,
    }: DashboardPreviewItemProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        onClick={onClick}
        className="rounded-xl border p-4 w-full my-2 bg-white hover:bg-gray-50"
      >
        <div className="flex flex-row justify-between w-full h-12">
          <div className="flex">
            {!icon && !renderIcon && (
              <div
                className={`flex mr-4 rounded-full ${
                  placeHolderIcon === "user" ? "bg-lime-100" : "bg-brand-peachy"
                } w-10 h-10 items-center justify-center min-w-[40px] ${
                  isLoading ? "animate-pulse" : ""
                }`}
              >
                {placeHolderIcon === "user" ? (
                  <UserIcon className="h-6 w-6 text-lime-700" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-brand-peachy-shade" />
                )}
              </div>
            )}

            {icon && !isLoading && (
              <span className="mr-4 mt-1">
                <ChooseTaskIcon value={icon} />
              </span>
            )}
            {renderIcon && !isLoading && renderIcon}
            {subtitle ? (
              <div className="flex flex-col">
                {isLoading ? (
                  <div className="min-w-[200px]">
                    <PlaceHolderLine amount={2} />
                  </div>
                ) : (
                  <>
                    <h2 className="self-start">{title}</h2>
                    <p className="text-gray-500 self-start">{subtitle}</p>
                  </>
                )}
              </div>
            ) : isLoading ? (
              <div className="min-w-[200px]">
                <PlaceHolderLine />
              </div>
            ) : (
              <h2 className="self-center">{title} </h2>
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
                {renderDate?.date && (
                  <p className="text-sm">{renderDate.date}</p>
                )}
                {renderDate?.time && (
                  <p className="text-gray-500 text-sm">{`${
                    renderDate.time
                  } (${getTimeZone(TZ_FORMAT.SHORT)})`}</p>
                )}
                {!renderDate?.date && !renderDate?.time && (
                  <p className="text-gray-500 text-sm">No time set</p>
                )}
              </>
            )}
          </div>
        </div>
      </button>
    );
  }
);

DashboardPreviewItem.displayName = "DashboardPreviewItem";
