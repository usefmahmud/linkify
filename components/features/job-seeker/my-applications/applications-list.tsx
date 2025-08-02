import React from 'react';
import { ApplicationWithJob } from '@/api/jobs/get-my-applications';
import ApplicationCard from './application-card';
import { Skeleton } from '@/components/ui/skeleton';
import ApplicationsSkeleton from './applications-skeleton';
import NotFoundState from '../../shared/states/not-found-state';

interface ApplicationsListProps {
  applications: ApplicationWithJob[];
  loading: boolean;
}

const ApplicationsList = ({ applications, loading }: ApplicationsListProps) => {
  if (loading) {
    return <ApplicationsSkeleton />;
  }

  if (applications.length === 0) {
    return <NotFoundState message='No applications found' />;
  }

  return (
    <div className='flex flex-col gap-6'>
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationsList;
