import React, { useCallback } from "react";
import Image from "next/image";

import Logo, { LogoColor } from "../old/Logo";
import optaviaLogo from "@src/assets/optavia-logo.png";

export enum PARTNERS {
  optavia = "optavia",
}

type Props = {
  partner?: PARTNERS;
  header?: React.ReactNode;
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ partner, header, children }) => {
  const renderPartnerLogo = useCallback(() => {
    switch (partner) {
      case PARTNERS.optavia:
        return (
          <>
            <span className="italic text-4xl	text-[#ABABAB]">+</span>
            <Image src={optaviaLogo} alt="Optavia Logo" width={200} />
          </>
        );
      default:
        return null;
    }
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
