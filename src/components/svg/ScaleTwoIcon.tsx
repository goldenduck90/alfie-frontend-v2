import * as React from "react";
import { SVGProps } from "react";

export function ScaleTwoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#a)"
        stroke="#475569"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.75.75H2.25a1.5 1.5 0 0 0-1.5 1.5v19.5a1.5 1.5 0 0 0 1.5 1.5h19.5a1.5 1.5 0 0 0 1.5-1.5V2.25a1.5 1.5 0 0 0-1.5-1.5Z" />
        <path d="M20.212 12.75a8.25 8.25 0 0 0-16.425 0h16.425ZM11.25 12.75l3-4.5" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
