import { create } from "zustand";

interface State {
  currentStatus: string;
}

interface Action {
  updateCurrentStatus: (newStatus: string) => void;
}

export const useAssessmentOrder = create<State & Action>((set) => ({
  currentStatus: "",
  updateCurrentStatus: (newStatus: string) =>
    set({
      currentStatus: newStatus,
    }),
}));
