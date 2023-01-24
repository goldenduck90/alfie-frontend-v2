import Link from "next/link";
import React from "react";

export interface NavigationItemProps {
  children: React.ReactNode;
  href: string;
}
export function NavigationItem({ children, href }: NavigationItemProps) {
  const desktopStyles = `flex text-base font-normal h-10 px-4 rounded-xl border items-center 
  justify-center text-brand-heavenly-tint-1 hover:text-white bg-brand-berry 
  hover:bg-brand-berry-shade border-brand-berry hover:border-brand-berry-shade mx-1`;

  const mobileStyles = ``;
  return (
    <Link href={href} passHref legacyBehavior>
      <button className={`md:${desktopStyles} `}>{children}</button>
    </Link>
  );
}
