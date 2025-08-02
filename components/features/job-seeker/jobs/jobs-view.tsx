'use client';

import { getJobs, GetJobsResponse } from '@/api/jobs/get-jobs';
import React, { useEffect, useState } from 'react';
import JobsSearch from './jobs-search';
import JobsList from './jobs-list';
import { useJobSearchFilter } from '@/hooks/jobs/use-job-search-filter';

const JobsView = () => {
  const [jobs, setJobs] = useState<GetJobsResponse['jobs']>([]);
  const [loading, setLoading] = useState(true);

  const { filters, updateFiltersWithPageReset, getJobsParams } =
    useJobSearchFilter();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const params = getJobsParams();
        const jobsResponse = await getJobs(params);
        setJobs(jobsResponse.jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.jobLevel,
    filters.jobType,
    filters.workType,
    filters.location,
    filters.salaryMin,
    filters.salaryMax,
  ]);

  return (
    <div className='flex flex-col'>
      <JobsSearch
        filters={filters}
        updateFilters={updateFiltersWithPageReset}
      />

      {loading ? (
        <div className='py-12 text-center'>
          <div className='text-lg text-gray-500'>Loading...</div>
        </div>
      ) : (
        <div className='mt-12'>
          <JobsList jobs={jobs} />
        </div>
      )}
    </div>
  );
};

export default JobsView;
