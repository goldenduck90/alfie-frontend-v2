import React from "react";
import { Role } from "@src/graphql/generated";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useIntercom } from "react-use-intercom";
import { Navbar } from "../navigation/NavBar";
import { BackButton } from "../ui/BackButton";
import { ChevronLeftIcon } from "@heroicons/react/outline";
interface LayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
  hasBackButton?: boolean;
  backRef?: string;
}

export const Layout = ({
  children,
  title,
  subtitle,
  hasBackButton,
  backRef,
}: LayoutProps) => {
  const { user } = useCurrentUserStore();
  const isAdmin = user?.role === Role.Admin || user?.role === Role.HealthCoach;
  const { boot } = useIntercom();

  React.useEffect(() => {
    boot({
      email: user?.email,
      name: user?.name,
    });
  }, [boot, user?.email, user?.name]);

  let navigation: { name: string; href: string }[] = [];
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
    {
      name: "Health Metrics",
      href: "/dashboard/health-metrics",
    }
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
  } else if (isAdmin) {
    navigation = providerNavigation;
  }

  return (
    <div className="relative">
      <Navbar navItems={navigation} />
      <main className="flex w-full">
        {(title || subtitle) && (
          <div className="fixed w-full h-52 top-16 bg-brand-berry" />
        )}
        <div className="mx-auto px-4 md:px-8 lg:py-6 sm:py-6 md:py-6 z-10 mt-24 w-full max-w-7xl justify-center">
          <div className="flex">
            {hasBackButton && (
              <div className="pr-6 pt-1">
                <BackButton href={backRef} />
              </div>
            )}
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
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};
