import Image from "next/image";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { DropdownMenu } from "../ui/DropdownMenu";
import { Line } from "../ui/Line";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@src/hooks/useLogoutMutation";
import Link from "next/link";
import { Role } from "@src/graphql/generated";

export default function NavUser() {
  const { user } = useCurrentUserStore();
  const logout = useLogoutMutation();
  const firstNameInitial = user?.name?.charAt(0).toUpperCase();
  const router = useRouter();

  let routeItems: {
    label: string;
    onClick: () => Promise<boolean>;
  }[] = [];

  const routeTo = (path: string) => () => router.push(path);
  // TODO: Add back when ready
  const patientItems = [
    {
      label: "Account details",
      onClick: routeTo("/settings/account-details"),
    },
    {
      label: "Plan & billing",
      onClick: routeTo("/settings/plan-&-billing"),
    },
    // {
    //   label: "Notifications",
    //   onClick: routeTo("/settings/notifications"),
    // },
  ];

  const providerItems = [
    {
      label: "Account details",
      onClick: routeTo("/settings/account-details"),
    },
    {
      label: "Availability",
      onClick: routeTo("/settings/availability"),
    },
    // {
    //   label: "Notifications",
    //   onClick: routeTo("/settings/notifications"),
    // },
  ];

  if (user?.role === Role.Patient) {
    routeItems = patientItems;
  } else if (user?.role === Role.Practitioner) {
    routeItems = providerItems;
  } else if (user?.role === Role.Admin || user?.role === Role.HealthCoach) {
    routeItems = providerItems;
  }

  const renderUserItems = routeItems?.map((item, i) => (
    <DropdownItem {...item} key={i} />
  ));

  return (
    <>
      <div className="flex items-center">
        {/*
        <Link href="/settings/notifications" passHref legacyBehavior>
          <button className="relative p-1 hover:bg-brand-berry-shade rounded-xl mr-2 lg:mr-6">
             //TODO: this needs to check if there are any new notifications?
            {true && (
              <div className="absolute h-[15px] w-[15px] bg-red-500 border-[3px] border-brand-berry rounded-full top-1 right-1" />
            )}
            <BellIcon className="h-6 w-6 text-brand-heavenly-tint-1 m-1" />
          </button>
        </Link>
            */}
        <DropdownMenu
          trigger={
            <div className="flex rounded-xl hover:bg-brand-berry-shade p-1">
              <div className="relative">
                <div className="absolute h-[12px] w-[12px] bg-green-500 border-[3px] border-brand-berry hover:border-brand-berry-shade rounded-full bottom-0 right-0" />
                {true ? (
                  <div className="flex items-center justify-center h-8 w-8 bg-brand-peachy-tint-1 rounded-full text-gray-700 font-semibold text-xl">
                    {firstNameInitial}{" "}
                  </div>
                ) : (
                  <Image height={32} width={32} src={""} alt="User Photo" />
                )}
              </div>
              <div className="hidden lg:flex items-center self-center pl-4 text-brand-heavenly-tint-1">
                <p>{user?.name}</p>
                <ChevronDownIcon className="h-5 w-5 mx-2" />
              </div>
            </div>
          }
        >
          <>
            <div className="flex pb-5 w-80">
              <div className="relative mt-">
                <div className="absolute h-[12px] w-[12px] bg-green-500 border-[2px] border-white rounded-full bottom-0 left-6" />
                {true ? (
                  <div className="flex items-center justify-center h-10 w-10 bg-brand-peachy-tint-1 rounded-full text-gray-700 font-semibold text-xl">
                    {firstNameInitial}{" "}
                  </div>
                ) : (
                  <Image height={40} width={40} src={""} alt="User Photo" />
                )}
              </div>
              <div className="pl-4 text-sm">
                <h2 className="font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Line color="light" />

            <div className="flex flex-col w-full items-start">
              {renderUserItems}
            </div>
            <Line color="light" margin="small" />
            <DropdownItem label="Logout" onClick={() => logout.mutate()} />
          </>
        </DropdownMenu>
      </div>
    </>
  );
}

function DropdownItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Item
      className="w-[314px] text-gray-800 text-sm my-[1px] cursor-pointer -ml-[14px] text-left py-2 pl-4 bg-white hover:bg-gray-50 rounded-lg"
      onClick={onClick}
    >
      {label}
    </Item>
  );
}
