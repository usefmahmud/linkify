'use client';

import React, { useState, useCallback } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  Building,
  X,
  DollarSign,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { JobSearchFilters } from '@/hooks/jobs/use-job-search-filter';

interface JobsSearchProps {
  filters: JobSearchFilters;
  updateFilters: (newFilters: Partial<Omit<JobSearchFilters, 'page'>>) => void;
}

const JobsSearch = ({ filters, updateFilters }: JobsSearchProps) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [locationInput, setLocationInput] = useState(filters.location || '');

  React.useEffect(() => {
    setSearchInput(filters.search || '');
  }, [filters.search]);

  React.useEffect(() => {
    setLocationInput(filters.location || '');
  }, [filters.location]);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateFilters({ search: value || null });
        }, 300);
      };
    })(),
    [updateFilters]
  );

  const debouncedLocation = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateFilters({ location: value || null });
        }, 300);
      };
    })(),
    [updateFilters]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
    debouncedLocation(value);
  };
  return (
    <div className='w-full space-y-6 rounded-lg border bg-white p-6 shadow-sm'>
      <div className='flex flex-col gap-4 lg:flex-row'>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Search for jobs...'
            value={searchInput}
            onChange={handleSearchChange}
            className='h-12 pl-10 text-base'
          />
        </div>

        <div className='relative lg:w-64'>
          <MapPin className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Location'
            value={locationInput}
            onChange={handleLocationChange}
            className='h-12 pl-10 text-base'
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-3'>
        <div className='relative'>
          <Select
            value={filters.jobLevel || ''}
            onValueChange={(value) =>
              updateFilters({ jobLevel: value || null })
            }
          >
            <SelectTrigger className={filters.jobLevel ? 'pr-8' : ''}>
              <Briefcase className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Job level' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='entry-level'>Entry Level</SelectItem>
              <SelectItem value='junior'>Junior</SelectItem>
              <SelectItem value='mid-level'>Mid Level</SelectItem>
              <SelectItem value='senior'>Senior</SelectItem>
            </SelectContent>
          </Select>
          {filters.jobLevel && (
            <button
              onClick={() => updateFilters({ jobLevel: null })}
              className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        <div className='relative'>
          <Select
            value={filters.jobType || ''}
            onValueChange={(value) => updateFilters({ jobType: value || null })}
          >
            <SelectTrigger className={filters.jobType ? 'pr-8' : ''}>
              <Building className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Job type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='full-time'>Full Time</SelectItem>
              <SelectItem value='part-time'>Part Time</SelectItem>
              <SelectItem value='freelance'>Freelance</SelectItem>
              <SelectItem value='contract'>Contract</SelectItem>
            </SelectContent>
          </Select>
          {filters.jobType && (
            <button
              onClick={() => updateFilters({ jobType: null })}
              className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        <div className='relative'>
          <Select
            value={filters.workType || ''}
            onValueChange={(value) =>
              updateFilters({ workType: value || null })
            }
          >
            <SelectTrigger className={filters.workType ? 'pr-8' : ''}>
              <SelectValue placeholder='Work type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='remote'>Remote</SelectItem>
              <SelectItem value='on-site'>On-site</SelectItem>
              <SelectItem value='hybrid'>Hybrid</SelectItem>
            </SelectContent>
          </Select>
          {filters.workType && (
            <button
              onClick={() => updateFilters({ workType: null })}
              className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsSearch;
