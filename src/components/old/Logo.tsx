import React from "react"
import Image from "next/image"

export enum LogoColor {
  DEFAULT = "blue",
  WHITE = "white",
  BLUE = "blue",
}

const LOGOS = {
  default: "/assets/logo.png",
  blue: "/assets/logo.png",
  white: "/assets/logo-white.png",
}

type Props = {
  color?: LogoColor
  width?: number
  height?: number
}

const Logo: React.FC<Props> = ({ color, width, height }) => {
  const _color = color ?? LogoColor.DEFAULT
  const _width = width ?? 144
  const _height = height ?? 58

  return (
    <div className="flex flex-col items-center my-4">
      <Image src={LOGOS[_color]} height={_height} width={_width} alt="Alfie" />
    </div>
  )
}

export default Logo
