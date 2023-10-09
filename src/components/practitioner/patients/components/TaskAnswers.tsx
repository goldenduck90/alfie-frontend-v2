import React from "react";

import { DialogModal } from "@src/components/modal/Dialog";
import { Button } from "@src/components/ui/Button";
import { AnswerType, Task, UserAnswer } from "@src/graphql/generated";
import { medications } from "@src/components/questionnaire/medicalQuestions";

function camelCaseToWords(input: string): string {
  const result: string[] = input.match(/[A-Za-z]+|\d+/g) || [];
  const lastResult = result.join(" ").replace(/([A-Z])/g, " $1");

  return lastResult.charAt(0).toUpperCase() + lastResult.slice(1);
}

export const TaskAnswers = ({
  task,
  trigger = <Button buttonType="primary">View Answers</Button>,
  answers,
}: {
  task: Task;
  trigger?: React.ReactNode;
  answers: UserAnswer[];
}) => {
  return answers.length > 0 ? (
    <DialogModal triggerAsChild trigger={trigger}>
      <DialogModal.Title showClose>{task.name}</DialogModal.Title>
      <div className="text-[#475569] text-sm px-2">
        {answers.map((answer) =>
          answer.value ? (
            <div
              key={answer.key}
              className="flex flex-col md:flex-row gap-x-4 px-6 py-4"
            >
              <p className="capitalize min-w-[275px] font-bold">
                {camelCaseToWords(answer.key)}
              </p>
              {answer.type === AnswerType.Object ? (
                <div className="text-gray-600">
                  {Object.keys(answer.value).map((subKey) => (
                    <p key={subKey} className="text-gray-600">
                      <strong>
                        {medications.find((m) => m.id === subKey)?.name}:
                      </strong>{" "}
                      {Array.isArray(answer.value[subKey])
                        ? answer.value[subKey]?.join(", ")
                        : answer.value[subKey]?.toString()}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">{answer.value}</div>
              )}
            </div>
          ) : null
        )}
      </div>
    </DialogModal>
  ) : null;
};
