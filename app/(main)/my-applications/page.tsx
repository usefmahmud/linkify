import React from 'react';
import ApplicationsView from '@/components/features/job-seeker/my-applications/applications-view';

const MyApplicationsPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>My Applications</h1>
        <p className='mt-2 text-gray-600'>
          Track the status of your job applications and stay updated on your
          progress.
        </p>
      </div>

      <ApplicationsView />
    </div>
  );
};

export default MyApplicationsPage;
