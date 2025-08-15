export interface FilterStore {
  isOpen: boolean;
  filters: {
    dateRange: Date[];
    selectedProject: string;
  };
  openSidebar: () => void;
  closeSidebar: () => void;
  updateFilter: (key: keyof FilterStore['filters'], value: any) => void;
  resetFilters: () => void;
}
