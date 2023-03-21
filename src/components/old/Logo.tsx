import React from "react";
import Image from 'next/image'

export const Logo = () => (
  <div className="flex flex-col items-center my-10">
    <Image src={"/assets/logo.png"} height={58} width={144} alt="Alfie" />
  </div>
);
