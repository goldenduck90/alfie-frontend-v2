import React from "react";
import {
  HeartIcon,
  EmojiHappyIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid";
import { TaskType } from "@src/graphql/generated";
import {
  ForkAndKnifeIcon,
  GastroIcon,
  HeartBeatIcon,
  RulerIcon,
  ScaleIcon,
  DropIcon,
} from "./svg";

interface ChooseTaskIconProps {
  value: TaskType;
}

export function ChooseTaskIcon({ value }: ChooseTaskIconProps) {
  switch (value) {
    case TaskType.NewPatientIntakeForm:
      return <ImportedIconWrap icon={<HeartBeatIcon />} />;
    case TaskType.MpHunger:
    case TaskType.MpActivity:
      return (
        <TaskIconBase
          textColor="text-red-400"
          bgColor="bg-brand-peachy-tint-1"
          icon={HeartIcon}
        />
      );
    case TaskType.IdAndInsuranceUpload:
      return (
        <TaskIconBase
          textColor="text-brand-purple-shade"
          bgColor="bg-brand-purple-tint-2"
          icon={UserIcon}
        />
      );
    case TaskType.BpLog:
      return <ImportedIconWrap icon={<DropIcon />} />;
    case TaskType.WeightLog:
      return <ImportedIconWrap icon={<ScaleIcon />} />;
    case TaskType.WaistLog:
      return <ImportedIconWrap icon={<RulerIcon />} />;
    case TaskType.Gsrs:
    case TaskType.AdLibitum:
    case TaskType.FoodLog:
      return <ImportedIconWrap icon={<GastroIcon />} />;
    case TaskType.Tefq:
      return <ImportedIconWrap icon={<ForkAndKnifeIcon />} />;
    case TaskType.MpFeeling:
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
          icon={DotsCircleHorizontalIcon}
        />
      );
  }
}

function TaskIconBase(props: {
  textColor: string;
  bgColor: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | any;
}) {
  return (
    <div
      className={`rounded-xl flex mr-4 w-10 h-10 items-center justify-center min-w-[40px] ${props.bgColor}`}
    >
      <props.icon className={`h-6 w-6 ${props.textColor}`} />
    </div>
  );
}

function ImportedIconWrap(props: { icon: JSX.Element }) {
  return <span className="mr-4">{props.icon}</span>;
}
