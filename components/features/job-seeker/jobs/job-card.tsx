import React from 'react';
import { MapPin, Briefcase, Building2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GetJobsResponse } from '@/api/jobs/get-jobs';

interface JobCardProps {
  job: GetJobsResponse['jobs'][0];
}

const JobCard = ({ job }: JobCardProps) => {
  const formatJobLevel = (level: string) => {
    return level
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatJobType = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatWorkType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };


  return (
    <div className='w-full max-w-6xl cursor-pointer overflow-hidden rounded-lg border bg-white p-6  transition-shadow hover:shadow-md'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start space-x-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white'>
            <Building2 />
          </div>

          <div className='flex flex-1 flex-col gap-2'>
            <div>
              <div className='text-sm font-medium text-secondary-foreground'>
                {job.employers?.company_name || 'Company Name'}
              </div>

              <h3 className='line-clamp-1 text-lg font-semibold '>
                {job.title}
              </h3>
            </div>

            <div className='flex flex-wrap items-center gap-4 text-sm text-accent-foreground'>
              <div className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' />
                <span>{job.location}</span>
              </div>

              <div className='flex items-center gap-1'>
                <Briefcase className='h-4 w-4' />
                <span>{formatJobLevel(job.job_level)}</span>
              </div>

              <div className='flex items-center gap-1'>
                <Building2 className='h-4 w-4' />
                <span>{formatJobType(job.job_type)}</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary' className='text-xs'>
                {formatWorkType(job.work_type)}
              </Badge>

              <Badge variant='outline' className='text-xs'>
                {formatJobLevel(job.job_level)}
              </Badge>

              {job.salary && (
                <Badge variant='outline' className='text-xs'>
                  ${job.salary.toLocaleString()}
                </Badge>
              )}
            </div>

            {job.description && (
              <p className='mt-2 line-clamp-2 text-sm text-accent-foreground'>
                {job.description}
              </p>
            )}
          </div>
        </div>

        <div className='flex-shrink-0'>
          <Bookmark className='h-5 w-5 text-gray-400 hover:text-gray-600' />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
