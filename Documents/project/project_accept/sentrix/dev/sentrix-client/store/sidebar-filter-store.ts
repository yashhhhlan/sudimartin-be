import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  project: string;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setProject: (project: string) => void;
}

export const useSidebarFilterStore = create<FilterState>((set) => ({
  startDate: null,
  endDate: null,
  project: '',
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setProject: (project) => set({ project }),
}));
