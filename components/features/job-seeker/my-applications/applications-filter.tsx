'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  ApplicationFilters,
  ApplicationStatus,
} from '@/hooks/applications/use-application-filter';

interface ApplicationsFilterProps {
  filters: ApplicationFilters;
  updateFilters: (newFilters: Partial<ApplicationFilters>) => void;
}

const ApplicationsFilter = ({
  filters,
  updateFilters,
}: ApplicationsFilterProps) => {
  const handleStatusChange = (value: string) => {
    updateFilters({
      status: value as ApplicationStatus | 'all',
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'all':
        return 'All Applications';
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <div className='w-full space-y-4 rounded-lg border bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-2'>
        <Filter className='h-5 w-5 text-gray-600' />
        <h2 className='text-lg font-semibold text-gray-900'>
          Filter Applications
        </h2>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
        <div className='flex-1 space-y-2'>
          <Label
            htmlFor='status-filter'
            className='text-sm font-medium text-gray-700'
          >
            Application Status
          </Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id='status-filter' className='h-10'>
              <SelectValue placeholder='Select status'>
                {getStatusLabel(filters.status)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Applications</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='accepted'>Accepted</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsFilter;
