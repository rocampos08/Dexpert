export type FiltersProps = {
  filters: {
    level: string;
    category: string;
  };
  setFilters: (filterName: string, filterValue: string) => void;
  clearFilters: () => void;
};
