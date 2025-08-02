'use client';

import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CircleDollarSign,
  Building2,
  ChartNoAxesColumn,
  Bookmark,
  Share,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GetJobByIdResponse } from '@/api/jobs/get-job-by-id';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

interface JobDetailsViewProps {
  job: GetJobByIdResponse;
}

const JobDetailsView = ({ job }: JobDetailsViewProps) => {
  const router = useRouter();

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

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='px-4 py-4'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='flex items-center gap-2 text-sm text-gray-600'
        >
          <ArrowLeft className='h-4 w-4' />
          See all jobs
        </Button>
      </div>

      <div className='px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <div className='rounded-lg flex flex-col items-center border bg-white shadow-xs'>
              <div className='py-8 text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='bg-primary flex h-24 w-24 items-center justify-center rounded-2xl border shadow-sm'>
                    <Building2 className='h-8 w-8 text-white' />
                  </div>
                </div>

                <div className='mx-auto max-w-2xl'>
                  <h1 className='mb-2 text-4xl font-bold text-gray-900'>
                    {job.title}
                  </h1>

                  <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                    <Calendar className='h-4 w-4' />
                    <span>{formatDate(job.created_at)}</span>
                  </div>
                </div>
              </div>

              <Separator className='data-[orientation=horizontal]:w-[60%]' />

              <div className='p-8'>
                <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
                  Job description
                </h2>
                <div className='leading-relaxed text-gray-700'>
                  {job.description}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='rounded-lg border bg-white p-6 shadow-xs'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-lg font-bold text-gray-900'>
                    Job Information
                  </span>
                </div>

                <div className='flex flex-col gap-3 text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='text-primary h-4 w-4' />
                    <span>{job.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <ChartNoAxesColumn className='text-primary h-4 w-4' />
                    {formatJobLevel(job.job_level)}
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <Clock className='text-primary h-4 w-4' />
                    {formatJobType(job.job_type)}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Building2 className='text-primary h-4 w-4' />
                    {formatWorkType(job.work_type)}
                  </div>
                  <div className='flex items-center gap-2'>
                    <CircleDollarSign className='text-primary h-4 w-4' />
                    <span>{job.salary.toLocaleString()}</span>
                  </div>
                </div>

                <Button className='w-full'>Apply now</Button>
              </div>
            </div>

            <div className='flex justify-center gap-4'>
              <Button variant='outline' size='icon'>
                <Bookmark />
              </Button>
              <Button variant='outline' size='icon'>
                <Share2 />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
