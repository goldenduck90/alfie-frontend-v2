import React from "react";

export interface QuestionContainerProps {
  helper?: string;
  question?: string;
  children: React.ReactNode;
}

export function QuestionContainer(props: QuestionContainerProps) {
  return (
    <div className="flex flex-col border rounded-xl py-8 px-12 bg-white max-w-[612px] w-full relative">
      <div className="absolute w-full -top-4 flex justify-center -mx-12">
        <div className="py-1 px-2 text-primary-500 bg-primary-100 rounded-3xl">
          {props.helper}
        </div>
      </div>
      <div className="grid grid-cols-12">{props.children}</div>
    </div>
  );
}
