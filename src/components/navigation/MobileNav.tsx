import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import * as RadixDialog from "@radix-ui/react-dialog";

import { MenuAlt2Icon, XIcon } from "@heroicons/react/solid";

export function MobileNav({ navItems }: { navItems: any[] }) {
  const { user } = useCurrentUserStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const firstNameInitial = user?.name?.charAt(0).toUpperCase();
  const mobileNavigationItems = navItems.map((item, i) => {
    const currentRoute = router.pathname === item.href;

    return (
      <button
        key={i}
        onClick={async () => {
          await router.push(item.href);
          setMenuOpen(false);
        }}
        className={`flex  ${
          currentRoute ? "bg-brand-indigo text-white" : "text-gray-600"
        } rounded-xl py-3 px-5 my-2`}
      >
        {item.name}
      </button>
    );
  });
  return (
    <RadixDialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <RadixDialog.Overlay />
      <RadixDialog.Trigger>
        <button className="md:hidden p-2 mr-2">
          <MenuAlt2Icon className="h-4 w-4 text-white" />
        </button>
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Content className="md:hidden fixed h-screen w-screen bg-white z-[99] top-0 right-0 p-6">
          <button onClick={() => setMenuOpen(false)}>
            <XIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex rounded-xl pt-8 pb-4">
            <div className="relative">
              <div className="absolute h-4 w-4 bg-green-500 border-[3px] border-white rounded-full bottom-0 right-0" />
              {true ? (
                <div className="flex items-center justify-center h-12 w-12 bg-brand-peachy-tint-1 rounded-full text-gray-700 font-semibold text-xl">
                  {firstNameInitial}{" "}
                </div>
              ) : (
                <Image height={64} width={64} src={""} alt="User Photo" />
              )}
            </div>
          </div>

          <p className="font-bold text-base text-gray-900">{user?.name}</p>
          <p className="text-gray-700">{user?.email}</p>
          <div className="flex flex-col pt-8">{mobileNavigationItems}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
