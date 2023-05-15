import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Logo, { LogoColor } from '../../Logo';
import testimonialImg from '@src/assets/testimonial.png';

export const Testimonial: React.FC = () => {
  return (
    <div className="px-8">
      <div className="flex justify-center">
        <Image
          src={testimonialImg}
          alt="Testimonial"
          width={300}
          className=" rounded-2xl overflow-hidden"
        />
      </div>
      <p className="mt-4 font-md font-medium text-lg text-secondary-500">
        At Alfie, we’ve helped hundreds of people just like you achieve their
        goals through our precision approach. We’re excited to work with you to
        help you achieve your health goals.
      </p>
    </div>
  );
};
