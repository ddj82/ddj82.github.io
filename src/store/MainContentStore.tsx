import { create } from "zustand";

interface MainContentState {
    isPost: boolean;
    setIsPost: (prop: boolean) => void;
    isAbout: boolean;
    setIsAbout: (prop: boolean) => void;
    // toggleIsAbout: () => void;
}

export const useMainContentStore = create<MainContentState>((set) => ({
    isPost: false,
    setIsPost: (prop: boolean) => set(() => ({isPost: prop})),
    isAbout: false,
    setIsAbout: (prop: boolean) => set(() => ({isAbout: prop})),
    // toggleIsAbout: () => set((state) => ({ isAbout: !state.isAbout })),
}));
