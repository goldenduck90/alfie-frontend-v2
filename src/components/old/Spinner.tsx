import { CubeTransparentIcon } from "@heroicons/react/outline";
import React from "react";

export const Spinner = ({
  size = 24,
  scheme = "light",
  ml = 0,
  mr = 0,
}: {
  size?: number;
  scheme?: "dark" | "light";
  mr?: number;
  ml?: number;
}) => (
  <CubeTransparentIcon
    className={`animate-spin ${
      scheme === "dark" ? "text-indigo-800" : "text-white"
    } mr-${mr} ml-${ml} h-10 w-10`}
    style={{
      height: size,
      width: size,
    }}
  />
);
