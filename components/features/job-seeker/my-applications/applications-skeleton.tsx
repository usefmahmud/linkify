import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ApplicationsSkeleton = () => {
  return (
    <div className='space-y-4'>
      {[...Array(3)].map((_, index) => (
        <div key={index} className='rounded-lg border bg-white p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-start justify-between'>
              <Skeleton className='h-6 w-64' />
              <Skeleton className='h-6 w-20' />
            </div>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-28' />
            </div>
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-16' />
            </div>
            <Skeleton className='h-12 w-full' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsSkeleton;
