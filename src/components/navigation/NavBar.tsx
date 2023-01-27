import { MenuAlt2Icon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { NavigationItem } from "./NavigationItem";
import dynamic from "next/dynamic";

const NavUser = dynamic(() => import("./NavUser"), {
  ssr: false,
});

interface NavbarProps {
  navItems: any[];
}

export function Navbar({ navItems }: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navigationItems = navItems.map((item, i) => (
    <NavigationItem key={i} href={item.href}>
      {item.name}
    </NavigationItem>
  ));

  return (
    <div className="fixed top-0 flex flex-row w-full z-[98]">
      <div className="flex flex-col items-center bg-brand-berry w-full border-b-[1px] border-brand-berry-tint-1">
        <nav className="flex flex-row justify-between p-4 md:px-8 max-w-7xl w-full">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 mr-2"
              onClick={() => setMenuOpen(true)}
            >
              <MenuAlt2Icon className="h-4 w-4 text-white" />
            </button>

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
  );
}
