import * as React from "react";
import { SVGProps } from "react";

export function RulerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={12} fill="#ECFCCB" />
      <path
        d="M22 26h-1.333v-2h-1.334v2H18v-1.333h-1.333V26h-2a.666.666 0 0 1-.667-.667v-2h1.333V22H14v-1.333h2v-1.334h-2V18h1.333v-1.333H14v-2a.666.666 0 0 1 .667-.667h4a.667.667 0 0 1 .666.667v6h6a.667.667 0 0 1 .667.666v4a.666.666 0 0 1-.667.667h-2v-1.333H22V26Z"
        fill="#65A30D"
      />
    </svg>
  );
}
