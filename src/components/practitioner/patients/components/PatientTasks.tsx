import React from "react";
import { TaskItem } from "./TaskItem";
import { LoadingTaskItem } from "./LoadingTaskItem";
import * as Tabs from "@radix-ui/react-tabs";
import { UserTask } from "@src/graphql/generated";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

const TabList = ["Incomplete", "Complete"];

export function PatientTasks({ taskData }: any) {
  const { data, loading, error } = taskData;
  const [activeTab, setActiveTab] = React.useState(TabList[0]);

  const incompleteTasks: UserTask[] = [];
  const completeTasks: UserTask[] = [];

  data?.getAllUserTasksByUser?.forEach((item: UserTask) => {
    if (item.completed) {
      completeTasks.push(item);
    } else {
      incompleteTasks.push(item);
    }
  });

  const renderLoadTasks = Array(8)
    .fill("")
    .map((_, i) => <LoadingTaskItem key={i} />);

  const noCompleteTasks = !loading && completeTasks?.length === 0 && !error;
  const noIncompleteTasks = !loading && incompleteTasks?.length === 0 && !error;

  return (
    <div className="py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between overflow-x-auto">
          <Tabs.List className="flex gap-x-3 mb-6 ml-3">
            <Tabs.Trigger value="Incomplete">
              <SmallTabTitle active={activeTab === "Incomplete"}>
                Incomplete
              </SmallTabTitle>
            </Tabs.Trigger>
            <Tabs.Trigger value="Complete">
              <SmallTabTitle active={activeTab === "Complete"}>
                Complete{" "}
              </SmallTabTitle>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value={TabList[0]}>
          {incompleteTasks?.map((task: any, i: number) => (
            <TaskItem {...task} key={i} />
          ))}
          {loading && renderLoadTasks}
          {error && <GrayPlaceHolderBox content={error.message} />}
          {noIncompleteTasks && (
            <GrayPlaceHolderBox content="There are no task to be shown here" />
          )}
        </Tabs.Content>
        <Tabs.Content value={TabList[1]}>
          {completeTasks?.slice(0, 15)?.map((task: any, i: number) => (
            <TaskItem {...task} key={i} />
          ))}
          {loading && renderLoadTasks}
          {error && <GrayPlaceHolderBox content={error.message} />}
          {noCompleteTasks && (
            <GrayPlaceHolderBox content="There are no task to be shown here" />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function SmallTabTitle({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={`py-2 px-1 whitespace-nowrap text-sm hover:bg-gray-100 border-b-[3px] border-transparent ${
        active
          ? "text-brand-berry hover:bg-transparent  border-brand-berry "
          : ""
      }`}
    >
      {children}
    </div>
  );
}
