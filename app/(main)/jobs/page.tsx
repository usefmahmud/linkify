import JobsView from '@/components/features/job-seeker/jobs/jobs-view';
import React, { Suspense } from 'react';

const JobsPage = () => {
  return (
    <Suspense>
      <JobsView />
    </Suspense>
  );
};

export default JobsPage;
