import { create } from "zustand";

export interface INotification {
  title: string;
  description: string;
  type: "success" | "error" | "info";
  id: string;
}

interface NotificationActions {
  addNotification: (notification: INotification) => void;
  removeNotification: (id: string) => void;
}

interface INotificationStoreType {
  notifications: INotification[];
}

export const useNotificationStore = create<
  INotificationStoreType & NotificationActions
>((set) => ({
  notifications: [],
  addNotification: (notification: INotification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
