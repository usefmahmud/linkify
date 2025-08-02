import { GetJobsResponse } from '@/api/jobs/get-jobs';
import React from 'react';

interface JobsListProps {
  jobs: GetJobsResponse['jobs'];
}

const JobsList = ({ jobs }: JobsListProps) => {
  return (
    <ul>
      {jobs.map((job) => {
        return <li key={job.id}>{job.title}</li>;
      })}
    </ul>
  );
};

export default JobsList;
