import React, { useMemo } from "react";
import { CalendarIcon, LockClosedIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { AddressInput, GetAllProvidersQuery, GetAllProvidersQueryVariables } from "@src/graphql/generated";
import { AddressForm } from "@src/components/ui/AddressForm";
import { TextInput } from "@src/components/inputs/TextInput";
import { DateInput } from "@src/components/inputs/DateInput";
import { IconInput } from "@src/components/inputs/IconInput";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { NumberInput } from "@src/components/inputs/NumbeInput";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

export const getAllProvider = gql`
  query GetAllProviders($state: String) {
    allProviders(state: $state) {
      providers {
        _id
        firstName
        lastName
      }
    }
  }
`

export function InformationForm({
  addressValues,
  currentProviderId,
}: {
  addressValues: AddressInput;
  currentProviderId: string;
}) {
  const { data, loading } = useQuery<GetAllProvidersQuery, GetAllProvidersQueryVariables>(getAllProvider, {
    variables: {
      state: addressValues.state,
    },
  });

  const providers = useMemo(() => {
    if (loading || !data) return []

    return data?.allProviders.providers.map((p) => ({
      label: `${p.firstName} ${p.lastName}`,
      value: p._id,
      selected: p._id.toString() === currentProviderId,
    }))
  }, [data, loading, currentProviderId])

  return (
    <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300 bg-white">
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Full Name</p>
        <div className="w-full md:w-[300px]">
          <TextInput
            name="name"
            placeholder="Full Name is..."
            type="text"
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Date of Birth</p>
        <div className="w-full md:w-[300px] [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper]:md:w-[300px]">
          <DateInput
            name="dateOfBirth"
            placeholder="MM/DD/YYYY"
            icon={<CalendarIcon className="h-5 w-5 text-brand-berry" />}
            maxDate={new Date()}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Email Address</p>
        <div className="w-full md:w-[300px]">
          <IconInput
            name="email"
            placeholder="Email address is..."
            type="email"
            icon={<MailIcon className="h-5 w-5 text-brand-berry" />}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Password</p>
        <div className="w-full md:w-[300px]">
          <IconInput
            name="password"
            placeholder="Enter a password..."
            type="password"
            icon={<LockClosedIcon className="h-5 w-5 text-brand-berry" />}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Phone Number</p>
        <div className="w-full md:w-[300px]">
          <IconInput
            name="phone"
            placeholder="Phone number is..."
            type="tel"
            icon={<PhoneIcon className="h-5 w-5 text-brand-berry" />}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Provider</p>
        <div className="w-full md:w-[300px]">
          <SelectInput
            name="providerId"
            placeholder="Select a provider..."
            options={providers}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Gender</p>
        <div className="w-full md:w-[300px]">
          <SelectInput
            name="gender"
            placeholder="Select an option..."
            options={[
              {
                label: "Male",
                value: "Male",
              },
              {
                label: "Female",
                value: "Female",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Address</p>
        <div className="w-full md:w-[300px]">
          <AddressForm formName="address" values={addressValues} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Height In Inches</p>
        <div className="w-full md:w-[300px]">
          <NumberInput
            name="heightInInches"
            placeholder="Height in inches is..."
            type="tel"
            maxLength={3}
            position="right"
            showError={true}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Weight</p>
        <div className="w-full md:w-[300px]">
          <NumberInput
            name="weightInLbs"
            placeholder="Weight is..."
            type="tel"
            position="right"
          />
        </div>
      </div>
    </div>
  );
}
