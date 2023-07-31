import { gql, useMutation } from "@apollo/client";
import { BellIcon, MailIcon } from "@heroicons/react/outline";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { randomId } from "@src/utils/randomId";
import { useState } from "react";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { TableViewRow, TableEntryStacked } from "./components/TableComponents";
import { ToggleSwitchRow } from "./components/ToggleSwitchRow";

interface NotificationState {
  [key: string]: { push: boolean; email: boolean };
}

const initialState: NotificationState = {
  chat: {
    push: true,
    email: true,
  },
  subscriptionExpiring: {
    push: true,
    email: true,
  },
  newTask: {
    push: true,
    email: true,
  },
  overdueTask: {
    push: true,
    email: true,
  },
  invoice: {
    push: true,
    email: true,
  },
  appointmentChanged: {
    push: true,
    email: true,
  },
};

// const getNotificationSettings = gql`
//   query NotificationSettings {
//     notificationSettings {
//       chat {
//         push
//         email
//       }
//       subscriptionExpiring {
//         push
//         email
//       }
//       newTask {
//         push
//         email
//       }
//       overdueTask {
//         push
//         email
//       }
//       invoice {
//         push
//         email
//       }
//       appointmentChanged {
//         push
//         email
//       }
//     }
//   }
// `;

const updateNotificationMutation = gql`
  mutation NotificationUpdate($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

export function useNotificationState() {
  const { addNotification } = useNotificationStore();

  //Todo: this all needs to change to a mutation
  //? needs optimistic response or it will look slow af
  const [updateNotifications] = useMutation(updateNotificationMutation, {
    optimisticResponse: {},
    onError: (error) => {
      addNotification({
        title: "Failure",
        description:
          "Could not update notification settings, please try again later.",
        type: "error",
        id: randomId(),
      });
    },
  });

  // const { data, loading } = useQuery(getNotificationSettings, {});

  // const [state, setState] = useState(
  //   data?.notificationSettings || initialState
  // );
  const [state, setState] = useState(initialState);
  const setNotificationState = ({
    notificationType,
    key,
    value,
  }: {
    notificationType: string;
    key: "push" | "email";
    value: boolean;
  }) => {
    console.log({ notificationType, key, value });
    setState((prevState: NotificationState) => ({
      ...prevState,
      [notificationType]: {
        ...prevState[notificationType],
        [key]: value,
      },
    }));
  };

  return { state, setNotificationState };
}

type NotificationViewItem = {
  title: string;
  subtext: string;
  rightNode?: React.ReactNode;
};

const topItems: NotificationViewItem[] = [
  {
    title: "Someone messages me",
    subtext:
      "When someone sends you a message in chat, we will send you a notification.",
    rightNode: <ToggleSwitchRow notificationValue={"chat"} />,
  },
  {
    title: "My subscription is about to expire",
    subtext:
      "We will send you a notification one week before your subscription expires.",
    rightNode: <ToggleSwitchRow notificationValue={"subscriptionExpiring"} />,
  },
  {
    title: "I have a new task assigned",
    subtext:
      "When someone from the Alfie team adds a task for you to complete, we will notify you.",
    rightNode: <ToggleSwitchRow notificationValue={"newTask"} />,
  },
  {
    title: "I have an overdue task",
    subtext: "If one of your tasks will be overdue we will let you know.",
    rightNode: <ToggleSwitchRow notificationValue={"overdueTask"} />,
  },
  {
    title: "I receive a new invoice",
    subtext: "We will notify you when a new invoice is issued.",
    rightNode: <ToggleSwitchRow notificationValue={"invoice"} />,
  },
  {
    title: "My scheduled appointments change",
    subtext:
      "If any changes related to your appointment would appear, we'll let you know via notification.",
    rightNode: <ToggleSwitchRow notificationValue={"appointmentChanged"} />,
  },
];

const weeklyNewsLetter: NotificationViewItem[] = [
  {
    title: "Education",
    subtext:
      "Increase your knowledge about a healthy lifestyle and implement new habits on a daily basis.",
    rightNode: (
      <div className="flex flex-row justify-between">
        <div className="flex text-gray-500 items-center md:hidden gap-1">
          <MailIcon className="w-5 h-5 mr-3" />
          <p>Email</p>
        </div>
        <ToggleSwitch
          label=""
          checked={true}
          onCheckedChange={() => { }}
          name="phone"
        />
      </div>
    ),
  },
  {
    title: "Alfie Insider",
    subtext:
      "Stay up to date with all news, changes and new services from Alfie.",
    rightNode: (
      <div className="flex flex-row justify-between">
        <div className="flex md:hidden text-gray-500 items-center gap-1">
          <MailIcon className="w-5 h-5 mr-3" />
          <p>Email</p>
        </div>
        <ToggleSwitch
          label=""
          checked={true}
          onCheckedChange={() => { }}
          name="phone"
        />
      </div>
    ),
  },
];

export function NotificationsView() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <div className="hidden md:flex text-gray-500 px-6 gap-4">
          <div className="flex items-center gap-1">
            <BellIcon className="w-5 h-5" />
            <p>Push</p>
          </div>
          <div className="flex items-center gap-1">
            <MailIcon className="w-5 h-5" />
            <p>Email</p>
          </div>
        </div>
      </div>
      <TableViewRow
        inputs={topItems.map((item) => ({
          left: <TableEntryStacked title={item.title} subtext={item.subtext} />,
          right: item.rightNode,
        }))}
      />

      <div className="mt-6">
        <h1 className="text-lg font-semibold">Weekly newsletter</h1>
        <TableViewRow
          inputs={weeklyNewsLetter.map((item) => ({
            left: (
              <TableEntryStacked title={item.title} subtext={item.subtext} />
            ),
            right: item.rightNode,
          }))}
        />
      </div>
    </div>
  );
}
