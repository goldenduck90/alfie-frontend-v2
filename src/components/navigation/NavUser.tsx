import Image from "next/image";
import React from "react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/outline";

interface NavUserProps {
  imageSrc?: string;
}

export function NavUser({ imageSrc }: NavUserProps) {
  const { user } = useCurrentUserStore();
  const initial = user?.name?.charAt(0).toUpperCase();
  return (
    <div className="flex items-center">
      <button className="relative p-1 hover:bg-brand-berry-shade rounded-xl mr-2 lg:mr-6">
        <div className="absolute h-[15px] w-[15px] bg-red-500 border-[3px] border-brand-berry rounded-full top-1 right-1" />
        <BellIcon className="h-6 w-6 text-brand-heavenly-tint-1 m-1" />
      </button>
      <button className="flex rounded-xl hover:bg-brand-berry-shade p-1">
        <div className="relative">
          <div className="absolute h-[12px] w-[12px] bg-green-500 border-[3px] border-brand-berry hover:border-brand-berry-shade rounded-full bottom-0 right-0" />
          {!imageSrc ? (
            <div className="flex items-center justify-center h-8 w-8 bg-brand-peachy-tint-1 rounded-full text-gray-700 font-semibold text-xl">
              {initial}{" "}
            </div>
          ) : (
            <Image height={32} width={32} src={imageSrc} alt="User Photo" />
          )}
        </div>
        <div className="hidden lg:flex items-center self-center px-4 text-brand-heavenly-tint-1">
          <p>{user?.name}</p>
          <ChevronDownIcon className="h-5 w-5 mx-2" />
        </div>
      </button>
    </div>
  );
}
