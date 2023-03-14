import * as React from "react";
import { SVGProps } from "react";

export function ForkAndKnifeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={12} fill="#FFEDD5" />
      <path
        d="M26.4 20.8v5.6a1.6 1.6 0 0 1-3.2 0v-4h-1.6v-8A2.4 2.4 0 0 1 24 12h2.4v8.8ZM15.2 20a1.6 1.6 0 0 1-1.6-1.6v-5.6a.8.8 0 1 1 1.6 0V16h.8v-3.2a.8.8 0 1 1 1.6 0V16h.8v-3.2a.8.8 0 1 1 1.6 0v5.6a1.6 1.6 0 0 1-1.6 1.6v6.4a1.6 1.6 0 0 1-3.2 0V20Z"
        fill="#F97316"
      />
    </svg>
  );
}
