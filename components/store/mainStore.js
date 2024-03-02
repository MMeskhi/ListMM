import { create } from "zustand";

const mainStore = create((set) => ({
  reload: false,
  toggleReload: () => set((state) => ({ reload: !state.reload })),
}));

export default mainStore;
