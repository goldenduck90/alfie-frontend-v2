import { create } from "zustand";
import type { User } from "../graphql/generated";

interface CurrentUserStoreType {
  user: User | null | undefined;
  setUser: (user: User) => void;
  clear: () => void;
}

export const useCurrentUserStore = create<CurrentUserStoreType>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clear: () => set({ user: null }),
}));
