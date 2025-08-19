import { create } from "zustand";

interface MainContentState {
    isPost: boolean;
    setIsPost: (prop: boolean) => void;
    isAbout: boolean;
    toggleIsAbout: () => void;
}

export const useMainContentStore = create<MainContentState>((set) => ({
    isPost: false,
    setIsPost: (prop: boolean) => set(() => ({isPost: prop})),
    isAbout: false,
    toggleIsAbout: () => set((state) => ({ isAbout: !state.isAbout })),
}));
