import React, { useState } from "react";
import { HeartIcon, LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { TextInput } from "@src/components/inputs/TextInput";
import { IconInput } from "@src/components/inputs/IconInput";
import { MultiSelectInput } from "@src/components/inputs/MultiSelectInput";
import { NumberInput } from "@src/components/inputs/NumbeInput";
import { States } from "@src/utils/states";

export function InformationForm() {
  return (
    <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300 bg-white">
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">First Name</p>
        <div className="w-full md:w-[300px]">
          <TextInput
            name="firstName"
            placeholder="First Name is..."
            type="text"
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">Last Name</p>
        <div className="w-full md:w-[300px]">
          <TextInput
            name="lastName"
            placeholder="Last Name is..."
            type="text"
            className=""
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
        <p className="capitalize min-w-[275px] font-bold">Licensed States</p>
        <div className="w-full md:w-[300px]">
          <MultiSelectInput
            name="licensedStates"
            placeholder="State..."
            options={States}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 px-6 py-4">
        <p className="capitalize min-w-[275px] font-bold">NPI</p>
        <div className="w-full md:w-[300px]">
          <IconInput
            name="npi"
            placeholder="Enter a NPI..."
            type="text"
            icon={<HeartIcon className="h-5 w-5 text-brand-berry" />}
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
        <p className="capitalize min-w-[275px] font-bold">NumberOfPatients</p>
        <div className="w-full md:w-[300px]">
          <NumberInput
            name="numberOfPatients"
            placeholder="Number of patients is..."
            type="number"
            position="right"
          />
        </div>
      </div>
    </div>
  );
}
