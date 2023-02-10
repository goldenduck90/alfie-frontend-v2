import React from "react";

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

export const IconButton = (props: IconButtonProps) => {
  const color = props.iconColor ? "text-" + props.iconColor : "";
  const borderColor = props.iconColor ? "border-" + props.iconColor : "";
  return (
    <button
      className={`border p-2 rounded-xl hover:bg-gray-100 ${borderColor}`}
      onClick={props.onClick}
      {...props}
    >
      <props.icon className={`h-5 w-5 ${color}`} />
    </button>
  );
};
