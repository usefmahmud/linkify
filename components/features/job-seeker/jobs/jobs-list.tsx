import { GetJobsResponse } from '@/api/jobs/get-jobs';
import React from 'react';
import JobCard from './job-card';

interface JobsListProps {
  jobs: GetJobsResponse['jobs'];
}

const JobsList = ({ jobs }: JobsListProps) => {
  if (jobs.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='text-lg text-gray-500'>No jobs found</div>
        <p className='mt-2 text-sm text-gray-400'>
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4 '>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;
