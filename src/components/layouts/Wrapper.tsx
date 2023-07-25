import React, { useCallback } from "react";
import Image from "next/image";
import { usePartnerContext } from "@src/context/PartnerContext";

import Logo, { LogoColor } from "../Logo";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ header, children }) => {
  const { partner } = usePartnerContext();

  const renderPartnerLogo = useCallback(() => {
    if (partner?.logoUrl) {
      return (
        <>
          <span className="italic text-4xl	text-[#ABABAB]">+</span>
          <Image
            src={partner.logoUrl}
            alt="Partner Logo"
            width={200}
            height={50}
          />
        </>
      );
    }
    return null;
  }, [partner]);

  return (
    <div className="min-h-screen relative font-mulish">
      <div className="absolute top-0 left-0 w-full h-1/2 sm:h-1/3 bg-brand-berry z-[-1]" />
      <div className="absolute left-0 w-full p-4">
        <div className="my-4 sm:my-10 h-full flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-5">
            <Logo color={LogoColor.WHITE} />
            {partner && renderPartnerLogo()}
          </div>
          {header}
        </div>
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
