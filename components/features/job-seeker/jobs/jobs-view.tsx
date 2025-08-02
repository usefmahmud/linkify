'use client';

import { getJobs, GetJobsResponse } from '@/api/jobs/get-jobs';
import React, { useEffect, useState } from 'react';
import JobsSearch from './jobs-search';
import JobsList from './jobs-list';
import { useQueryStates } from 'nuqs';
import { jobSearchParamsSchema } from '@/types/job-search';
import { useJobSearchFilter } from '@/hooks/jobs/use-job-search-filter';

const JobsView = () => {
  const [jobs, setJobs] = useState<GetJobsResponse['jobs']>([]);
  const [loading, setLoading] = useState(false);

  const { filters, updateFilters, updateFiltersWithPageReset, getJobsParams } =
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

      <JobsList jobs={jobs} />
    </div>
  );
};

export default JobsView;
