import { create } from "zustand";

export interface State {
  steps: number;
  increment: (num: number) => void;
}

export const useStepsStore = create<State>((set) => ({
  steps: 1,
  increment: (num: number) => set((state) => ({ steps: state.steps + num })),
}));
