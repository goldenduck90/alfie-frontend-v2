/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { Provider } from "@src/graphql/generated";
import { nameToInitials } from "@src/utils/nameToInitials";
import { GeneralInformation } from "../components/GeneralInformation";
import { ApolloQueryResult } from "@apollo/client";

const TabList = ["Information"];

export type InfoProvider = Pick<Provider, "_id" | "firstName" | "lastName" | "email" | "npi" | "licensedStates" | "numberOfPatients" | "type" | "akuteId">

export function IndividualProviderTabs({
  provider,
  refetch,
}: {
  provider?: InfoProvider
  refetch: () => Promise<ApolloQueryResult<any>>
}) {
  const router = useRouter();
  const activeTab = TabList[0];

  return (
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white md:bg-gray-50 shadow-md rounded-md px-4 md:px-8 py-4">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => {
          router.replace(
            `/dashboard/providers/${router.query.providerId}?tab=${value}`,
            undefined,
            { shallow: true }
          );
        }}
      >
        <div className="flex items-center justify-between overflow-x-auto">
          <Tabs.List className="flex  gap-x-3">
            {TabList.map((tab, i) => (
              <TabTitle value={tab} key={i} active={activeTab === tab}>
                {tab}
              </TabTitle>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={TabList[0]} className="mt-6">
          <TableInformationHeader
            provider={provider}
          />
          {provider && (
            <GeneralInformation
              provider={provider}
              refetchProvider={refetch}
            />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function TableInformationHeader({
  provider,
}: {
  provider?: InfoProvider;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <div className="flex gap-3 items-center">
        <AvatarInitial
          size="xl"
          index={0}
          text={nameToInitials(provider?.firstName + " " + provider?.lastName)}
        />
        {/* {loading ? (
          <div className="h-7 w-56 mt-2">
            <PlaceHolderLine hasTopMargin />
          </div>
        ) : ( */}
        <p className="font-bold text-xl">
          {provider?.firstName + " " + provider?.lastName}
        </p>
        {/* )} */}
      </div>
    </div>
  );
}

function TabTitle({
  value,
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
  value: string;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className={`p-3 border border-transparent rounded-md hover:bg-gray-100 min-w-fit ${active ? "text-brand-berry bg-blue-100 hover:bg-blue-100" : ""
        }`}
    >
      {children}
    </Tabs.Trigger>
  );
}
