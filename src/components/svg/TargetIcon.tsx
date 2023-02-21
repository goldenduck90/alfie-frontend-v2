import * as React from "react";
import { SVGProps } from "react";

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={23}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.75 4.25v-3M19.25 11.75h3M11.75 19.25v3M4.25 11.75h-3M11.75 14.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="#475569"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 22.25c5.799 0 10.5-4.701 10.5-10.5s-4.701-10.5-10.5-10.5-10.5 4.701-10.5 10.5 4.701 10.5 10.5 10.5Z"
        stroke="#475569"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
