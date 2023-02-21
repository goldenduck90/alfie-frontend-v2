import * as React from "react";
import { SVGProps } from "react";

export function GastroIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={12} fill="#FEF2F2" />
      <path
        d="M13 27.778V23.11c0-.648.227-1.199.68-1.653a2.25 2.25 0 0 1 1.653-.68h1.556c.648 0 1.199-.227 1.653-.68a2.25 2.25 0 0 0 .68-1.653.754.754 0 0 0-.223-.555.754.754 0 0 0-.555-.223c-.427 0-.793-.153-1.098-.458a1.496 1.496 0 0 1-.457-1.098v-3.889h4.667v1.556c1.516 0 2.803.528 3.859 1.584C26.472 16.42 27 17.706 27 19.222V20c0 1.517-.528 2.803-1.585 3.86-1.056 1.056-2.343 1.585-3.86 1.585h-3.11a.75.75 0 0 0-.554.224.75.75 0 0 0-.224.553v1.556H13Z"
        fill="#B91C1C"
      />
    </svg>
  );
}
