import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FilterStore } from '@/types/stores';

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      isOpen: false,
      filters: {
        dateRange: [],
        selectedProject: '',
      },

      openSidebar: () => set({ isOpen: true }),
      closeSidebar: () => set({ isOpen: false }),

      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () =>
        set({
          filters: {
            dateRange: [],
            selectedProject: '',
          },
        }),
    }),
    {
      name: 'filter-store',
      partialize: (state) => ({ filters: state.filters }),
    },
  ),
);
