import React from "react";
import { Wrapper, PARTNERS } from "@src/components/layouts/Wrapper";

const PreCheckout = () => {
  return (
    <Wrapper
      partner={PARTNERS.optavia}
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">
          {"Achieve Lasting Results with the Power of Alfie and OPTAVIA"}
        </h2>
      }
    >
      <h2>Optavia signup form</h2>
    </Wrapper>
  );
};

export default PreCheckout;
