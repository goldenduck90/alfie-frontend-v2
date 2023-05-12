import React from 'react';
import Logo, { LogoColor } from '../old/Logo';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-brand-berry z-[-1]" />
      <div className="absolute left-0 w-full p-4">
        <div className="my-4 sm:my-10 h-full flex flex-col items-center">
          <Logo color={LogoColor.WHITE} />
          {title && (
            <h2 className="text-lg sm:text-2xl text-white font-bold">
              {title}
            </h2>
          )}
        </div>
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
