'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  getMyApplications,
  ApplicationWithJob,
} from '@/api/applications/get-my-applications';
import { useApplicationFilter } from '@/hooks/applications/use-application-filter';
import ApplicationsFilter from './applications-filter';
import ApplicationsList from './applications-list';
import ErrorState from '../../shared/states/error-state';

const ApplicationsView = () => {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filters, updateFilters } = useApplicationFilter();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMyApplications();
        setApplications(response.applications);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch applications'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      if (filters.status === 'all') return true;
      return application.status === filters.status;
    });
  }, [applications, filters.status]);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(
      (app) => app.status === 'pending'
    ).length;
    const accepted = applications.filter(
      (app) => app.status === 'accepted'
    ).length;
    const rejected = applications.filter(
      (app) => app.status === 'rejected'
    ).length;

    return { total, pending, accepted, rejected };
  }, [applications]);

  if (error) {
    return <ErrorState errorMessage={error} />;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <div className='rounded-lg border bg-white p-4 text-center'>
          <div className='text-2xl font-bold text-gray-900'>{stats.total}</div>
          <div className='text-sm text-gray-600'>Total</div>
        </div>
        <div className='rounded-lg border bg-white p-4 text-center'>
          <div className='text-2xl font-bold text-yellow-600'>
            {stats.pending}
          </div>
          <div className='text-sm text-gray-600'>Pending</div>
        </div>
        <div className='rounded-lg border bg-white p-4 text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {stats.accepted}
          </div>
          <div className='text-sm text-gray-600'>Accepted</div>
        </div>
        <div className='rounded-lg border bg-white p-4 text-center'>
          <div className='text-2xl font-bold text-red-600'>
            {stats.rejected}
          </div>
          <div className='text-sm text-gray-600'>Rejected</div>
        </div>
      </div>

      <ApplicationsFilter filters={filters} updateFilters={updateFilters} />

      <ApplicationsList applications={filteredApplications} loading={loading} />

      {!loading && (
        <div className='text-center text-sm text-gray-600'>
          Showing {filteredApplications.length} of {applications.length}{' '}
          applications
        </div>
      )}
    </div>
  );
};

export default ApplicationsView;
