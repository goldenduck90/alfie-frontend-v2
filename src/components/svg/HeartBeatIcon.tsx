import * as React from "react";
import { SVGProps } from "react";

export function HeartBeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={12} fill="#E3F4FF" />
      <path
        d="M22 27c-.4 0-.8-.3-.9-.7l-3.3-9.7-1.9 3.8c-.2.4-.5.6-.9.6h-3v-2h2.4l2.7-5.4c.2-.4.6-.6 1-.6s.7.3.9.7l3.2 9.7 1.9-3.8c.2-.4.5-.6.9-.6h3v2h-2.4l-2.7 5.4c-.2.4-.5.6-.9.6Z"
        fill="#58ACE3"
      />
    </svg>
  );
}
