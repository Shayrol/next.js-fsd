import { create } from "zustand";

// Zustand store 타입 정의
interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
}

// store 생성
export const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken) =>
    set(() => ({ accessToken: newAccessToken })),
}));
