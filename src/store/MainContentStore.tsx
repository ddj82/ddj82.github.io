import { create } from "zustand";

interface MainContentState {
    isPost: boolean;
    toggleIsPost: () => void;
    isAbout: boolean;
    toggleIsAbout: () => void;
}

export const useMainContentStore = create<MainContentState>((set) => ({
    isPost: false,
    toggleIsPost: () => set((state) => ({ isPost: !state.isPost })),
    isAbout: false,
    toggleIsAbout: () => set((state) => ({ isAbout: !state.isAbout })),
}));
