'use client';

import React from 'react';
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
  return (
    <div className='w-full space-y-6 rounded-lg border bg-white p-6 shadow-sm'>
      <div className='flex flex-col gap-4 lg:flex-row'>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Search for jobs...'
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value || null })}
            className='h-12 pl-10 text-base'
          />
        </div>

        <div className='relative lg:w-64'>
          <MapPin className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Location'
            value={filters.location || ''}
            onChange={(e) =>
              updateFilters({ location: e.target.value || null })
            }
            className='h-12 pl-10 text-base'
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-3'>
        <Select
          value={filters.jobLevel || 'all'}
          onValueChange={(value) =>
            updateFilters({ jobLevel: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className='w-[140px]'>
            <Briefcase className='mr-2 h-4 w-4' />
            <SelectValue placeholder='Job level' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Levels</SelectItem>
            <SelectItem value='entry-level'>Entry Level</SelectItem>
            <SelectItem value='junior'>Junior</SelectItem>
            <SelectItem value='mid-level'>Mid Level</SelectItem>
            <SelectItem value='senior'>Senior</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.jobType || 'all'}
          onValueChange={(value) =>
            updateFilters({ jobType: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className='w-[130px]'>
            <Building className='mr-2 h-4 w-4' />
            <SelectValue placeholder='Job type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='full-time'>Full Time</SelectItem>
            <SelectItem value='part-time'>Part Time</SelectItem>
            <SelectItem value='freelance'>Freelance</SelectItem>
            <SelectItem value='contract'>Contract</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.workType || 'all'}
          onValueChange={(value) =>
            updateFilters({ workType: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className='w-[120px]'>
            <SelectValue placeholder='Work type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Work Types</SelectItem>
            <SelectItem value='remote'>Remote</SelectItem>
            <SelectItem value='on-site'>On-site</SelectItem>
            <SelectItem value='hybrid'>Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobsSearch;
