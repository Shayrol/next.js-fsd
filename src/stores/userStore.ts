import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string | null;
  createdAt: Date;
  point: number;
}

interface UserStore {
  user: User | null;
  setUser: (loginUer: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (loginUser) => set(() => ({ user: loginUser })),
}));
