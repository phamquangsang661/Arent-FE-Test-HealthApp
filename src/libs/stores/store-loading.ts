import { create } from "zustand";
type UseStoreLoading = {
  isLoading: boolean;
  messageLoading: string;
  startLoading: (value?: OnOpenLoading) => void;
  stopLoading: () => void;
};

type OnOpenLoading = {
  message?: string;
};

export const useStoreLoading = create<UseStoreLoading>((set, get) => ({
  isLoading: false,
  messageLoading: "",
  startLoading: ({ message }: OnOpenLoading = { message: "Loading..." }) =>
    set((state) => {
      return {
        ...state,
        isLoading: true,
        messageLoading: message,
      };
    }),
  stopLoading: () =>
    set((state) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
}));
