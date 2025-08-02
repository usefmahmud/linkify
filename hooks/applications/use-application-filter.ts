import { useState, useMemo } from 'react';
import { Database } from '@/types/database.types';

export type ApplicationStatus =
  Database['public']['Enums']['application_status'];

export interface ApplicationFilters {
  status: ApplicationStatus | 'all';
}

export const useApplicationFilter = () => {
  const [filters, setFilters] = useState<ApplicationFilters>({
    status: 'all',
  });

  const updateFilters = (newFilters: Partial<ApplicationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};
