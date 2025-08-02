import { getMyJobs } from '@/api/jobs/get-my-jobs';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

const MyJobs = async () => {
  const jobs = await getMyJobs();

  if (!jobs) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {jobs.map((job) => {
          return <li>{job.title}</li>;
        })}
      </div>
    </Suspense>
  );
};

export default MyJobs;
