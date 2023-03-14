import * as React from "react";
import { SVGProps } from "react";

export function ScaleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={12} fill="#FEF3C7" />
      <g clipPath="url(#a)">
        <path
          d="M24 17.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm.244-3.5A5.488 5.488 0 0 0 20 12c-1.71 0-3.234.778-4.244 2H14c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V16c0-1.103-.897-2-2-2h-1.756Zm-2.994 5a1.24 1.24 0 0 0-.34-.856l1.05-2.447a.5.5 0 0 0-.92-.394l-1.05 2.447A1.25 1.25 0 1 0 21.25 19Z"
          fill="#F59E0B"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(12 12)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
