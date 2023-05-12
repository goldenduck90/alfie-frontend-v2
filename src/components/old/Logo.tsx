import React from 'react';
import Image from 'next/image';

export enum LogoColor {
  DEFAULT = 'blue',
  WHITE = 'white',
  BLUE = 'blue',
}

const LOGOS = {
  default: '/assets/logo.png',
  blue: '/assets/logo.png',
  white: '/assets/logo-white.png',
};

type Props = {
  color?: LogoColor;
};

const Logo: React.FC<Props> = ({ color = LogoColor.DEFAULT }) => {
  return (
    <div className="flex flex-col items-center my-4">
      <Image src={LOGOS[color]} height={58} width={144} alt="Alfie" />
    </div>
  );
};

export default Logo;
