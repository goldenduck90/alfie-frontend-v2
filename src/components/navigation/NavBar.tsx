import React from "react";
import { Role } from "@src/graphql/generated";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import { NavigationItem } from "./NavigationItem";

import dynamic from "next/dynamic";
import { MobileNav } from "./MobileNav";

const NavUser = dynamic(() => import("./NavUser"), {
  ssr: false,
});

interface NavbarProps {
  navItems: any[];
}

export function Navbar({ navItems }: NavbarProps) {
  const { user } = useCurrentUserStore();
  console.log({ user });
  const isAdmin = user?.role === Role.Admin;

  const navigationItems = navItems.map((item, i) => (
    <NavigationItem key={i} href={item.href}>
      {item.name}
    </NavigationItem>
  ));

  return (
    <>
      <div className="fixed top-0 flex flex-row w-full z-[98]">
        <div className="flex flex-col items-center bg-brand-berry w-full border-b-[1px] border-brand-berry-tint-1">
          {/* //TODO: Create Role Changing for admin  */}
          {isAdmin && (
            <div className="w-full top-0 z-[98] bg-brand-berry p-2">
              Role Changing component
            </div>
          )}
          <nav className="flex flex-row justify-between p-4 md:px-8 max-w-7xl w-full">
            <div className="flex items-center">
              <MobileNav navItems={navItems} />

              <Link href="/dashboard">
                <Image
                  src="/assets/logo-white.png"
                  height={24}
                  width={60}
                  alt="Alfie"
                />
              </Link>

              <div className="hidden md:flex md:ml-9">{navigationItems}</div>
            </div>
            <NavUser />
          </nav>
        </div>
      </div>
    </>
  );
}
