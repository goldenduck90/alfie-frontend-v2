import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Navigation } from "@sentry/react/types/types";
import { Role } from "@src/graphql/generated";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useLogoutMutation } from "@src/hooks/useLogoutMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useIntercom } from "react-use-intercom";
import { Navbar } from "../navigation/NavBar";
import { NavigationItem } from "../navigation/NavigationItem";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useCurrentUserStore();
  const router = useRouter();
  // const { boot } = useIntercom();

  // useEffect(() => {
  //   boot({
  //     email: user?.email,
  //     name: user?.name,
  //   });
  // }, []);

  let navigation: any[] = [];
  const patientNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
    },
    {
      name: "Appointments",
      href: "/dashboard/appointments",
    },
    {
      name: "Chat",
      href: "/dashboard/chat",
    },
  ];

  const providerNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Appointments",
      href: "/dashboard/appointments",
    },
    {
      name: "My Patients",
      href: "/dashboard/patients",
    },
    {
      name: "Chat",
      href: "/dashboard/chat",
    },
  ];

  //? Patient Role includes Tasks, billing, and Frequently Asked Questions
  if (user?.role === Role.Patient) {
    navigation = patientNavigation;
  } else if (user?.role === Role.Practitioner) {
    navigation = providerNavigation;
  }

  return (
    <>
      <Navbar navItems={navigation} />
      <main className="flex w-full">
        {(title || subtitle) && (
          <div className="fixed w-full h-52 top-16 bg-brand-berry" />
        )}
        <div className="mx-auto px-4 md:px-8 lg:py-6 sm:py-6 md:py-6 z-10 mt-24 w-full max-w-7xl justify-center">
          {title && (
            <div className="pb-8">
              <h1 className="text-4xl font-semibold text-white">{title}</h1>
              {subtitle && (
                <h2 className="text-base font-normal text-brand-heavenly-tint-1">
                  {subtitle}
                </h2>
              )}
            </div>
          )}

          {children}
        </div>
      </main>
    </>
  );
};
