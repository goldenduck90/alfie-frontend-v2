/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { gql, useQuery, useMutation } from "@apollo/client";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { Provider } from "@src/graphql/generated";
import { nameToInitials } from "@src/utils/nameToInitials";
import { GeneralInformation } from "../components/GeneralInformation";

// const GetUserById = gql`
//   query GetUser($userId: String!) {
//     getUserById(userId: $userId) {
//       _id
//       type
//       akuteId
//       eaProviderId
//       npi
//       licensedStates
//       firstName
//       lastName
//       email
//       numberOfPatients
//     }
//   }
// `;

const TabList = ["Information"];

export function IndividualProviderTabs() {
  const router = useRouter();
  // const providerId = router.query.providerId as string;
  const activeTab = (router?.query?.tab as string) || TabList[0];

  const data = {
    getUserById: {
      _id: "65090d82d333855bec868b5d",
      akuteId: "65090331380cff0008c67355",
      eaProviderId: 3,
      email: "testprovider@gallionetech.com",
      emailTokenExpiresAt: 3123314,
      firstName: "Test",
      lastName: "Provider",
      licensedStates: ["FL", "MD", "VA", "DC"],
      npi: "5123451234",
      numberOfPatients: 10,
      type: "Practitioner",
    },
  };
  // const { data, loading, error } = useQuery(GetUserById, {
  //   variables: {
  //     userId: providerId,
  //   },
  // });

  const provider: Provider = data?.getUserById;

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
            user={provider}
            // loading={loading}
          />
          <GeneralInformation provider={provider} />
          {/* <GeneralInformation provider={provider} loading={loading} /> */}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function TableInformationHeader({
  user,
}: // loading,
{
  user: Provider;
  // loading?: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <div className="flex gap-3 items-center">
        <AvatarInitial
          size="xl"
          index={0}
          text={nameToInitials(user?.firstName + " " + user?.lastName)}
        />
        {/* {loading ? (
          <div className="h-7 w-56 mt-2">
            <PlaceHolderLine hasTopMargin />
          </div>
        ) : ( */}
        <p className="font-bold text-xl">
          {user?.firstName + " " + user?.lastName}
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
      className={`p-3 border border-transparent rounded-md hover:bg-gray-100 min-w-fit ${
        active ? "text-brand-berry bg-blue-100 hover:bg-blue-100" : ""
      }`}
    >
      {children}
    </Tabs.Trigger>
  );
}
