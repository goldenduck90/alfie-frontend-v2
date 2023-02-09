import React from "react";
import Image from "next/image";
import { Role } from "@src/graphql/generated";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ProgressBar } from "../ui/ProgressBar";
import { SliderRanger } from "../ui/SliderRange";

interface QuestionnaireLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export function QuestionnaireLayout({
  children,
  title,
}: QuestionnaireLayoutProps) {
  const { user } = useCurrentUserStore();
  const isAdmin = user?.role === Role.Admin;
  const router = useRouter();
  return (
    <div className="relative">
      <div className="fixed top-0 flex flex-row w-full z-[98]">
        <div className="flex flex-col items-center bg-brand-berry w-full border-b-[1px] border-brand-berry-tint-1">
          {isAdmin && (
            <div className="w-full top-0 z-[98] bg-brand-berry p-2">
              Role Changing component
            </div>
          )}
          <nav className="flex flex-row justify-between p-4 md:px-8 max-w-7xl w-full">
            <button
              className="p-[10px] border border-brand-berry-tint-1 hover:bg-brand-berry-tint-1 rounded-xl"
              onClick={() => router.push("/dashboard")}
            >
              <XIcon className="h-5 w-5 text-white" />
            </button>
            <div className="flex items-center">
              <Image
                src="/assets/logo-white.png"
                height={24}
                width={60}
                alt="Alfie"
              />
            </div>
            <div className="w-10" />
          </nav>
        </div>
      </div>
      <main className="flex w-full">
        {title && <div className="fixed w-full h-52 top-16 bg-brand-berry" />}
        <div className="mx-auto px-4 md:px-8 lg:py-6 sm:py-6 md:py-6 z-10 mt-24 w-full max-w-7xl justify-center">
          <div className="flex justify-center">
            {title && (
              <h1 className="pb-8 font-semibold text-white">{title}</h1>
            )}
          </div>
          <div className="mx-auto max-w-[480px] w-full flex justify-center items-center pb-8 -mt-3 gap-x-4 text-white">
            <p className="w-[20px] text-center">1</p>
            <SliderRanger current={1} max={9} />
            <p className="w-[20px] text-center">9</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
