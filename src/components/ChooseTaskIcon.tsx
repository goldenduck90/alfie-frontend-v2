import React from "react";
import { HeartIcon, EmojiHappyIcon, UserIcon } from "@heroicons/react/solid";

interface ChooseTaskIconProps {
  value:
    | "med"
    | "heart"
    | "user"
    | "drop"
    | "scale"
    | "measure"
    | "gastro"
    | "food"
    | "feeling";
}

export function ChooseTaskIcon({ value }: ChooseTaskIconProps) {
  switch (value) {
    case "med":
      return (
        <TaskIconBase
          textColor="text-brand-heavenly-shade"
          bgColor="bg-brand-heavenly-tint-1"
          icon={HeartIcon}
        />
      );
    case "heart":
      return (
        <TaskIconBase
          textColor="text-red-400"
          bgColor="bg-brand-peachy-tint-1"
          icon={HeartIcon}
          //? this is the only one that actually needs the heart icon
        />
      );
    case "user":
      return (
        <TaskIconBase
          textColor="text-brand-purple-shade"
          bgColor="bg-brand-purple-tint-2"
          icon={UserIcon}
        />
      );
    case "drop":
      return (
        <TaskIconBase
          textColor="text-red-400"
          bgColor="bg-red-50"
          icon={HeartIcon}
        />
      );
    case "scale":
      return (
        <TaskIconBase
          textColor="text-amber-500"
          bgColor="bg-amber-100"
          icon={HeartIcon}
        />
      );
    case "measure":
      return (
        <TaskIconBase
          textColor="text-lime-600"
          bgColor="bg-lime-100"
          icon={HeartIcon}
        />
      );
    case "gastro":
      return (
        <TaskIconBase
          textColor="text-red-700"
          bgColor="bg-red-50"
          icon={HeartIcon}
        />
      );
    case "food":
      return (
        <TaskIconBase
          textColor="text-orange-500"
          bgColor="bg-orange-100"
          icon={HeartIcon}
        />
      );
    case "feeling":
      return (
        <TaskIconBase
          textColor="text-sky-700"
          bgColor="bg-sky-100"
          icon={EmojiHappyIcon}
        />
      );

    default:
      return (
        <TaskIconBase
          textColor="text-red-400"
          bgColor="bg-brand-peachy-tint-1"
          icon={HeartIcon}
        />
      );
  }
}

function TaskIconBase(props: {
  textColor: string;
  bgColor: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div
      className={`rounded-xl flex mr-4 w-10 h-10 items-center justify-center min-w-[40px] ${props.bgColor}`}
    >
      <props.icon className={`h-6 w-6 ${props.textColor}`} />
    </div>
  );
}
