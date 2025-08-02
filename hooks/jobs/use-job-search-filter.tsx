import { Enums } from '@/types/database.types';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export interface JobSearchFilters {
  page: number;
  limit: number;
  search: string | null;
  jobLevel: string | null;
  jobType: string | null;
  workType: string | null;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
}

export const useJobSearchFilter = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(10)
  );
  const [search, setSearch] = useQueryState('search', parseAsString);
  const [jobLevel, setJobLevel] = useQueryState('jobLevel', parseAsString);
  const [jobType, setJobType] = useQueryState('jobType', parseAsString);
  const [workType, setWorkType] = useQueryState('workType', parseAsString);
  const [location, setLocation] = useQueryState('location', parseAsString);
  const [salaryMin, setSalaryMin] = useQueryState('salaryMin', parseAsInteger);
  const [salaryMax, setSalaryMax] = useQueryState('salaryMax', parseAsInteger);

  // Get all filters as a single object
  const filters: JobSearchFilters = {
    page,
    limit,
    search,
    jobLevel,
    jobType,
    workType,
    location,
    salaryMin,
    salaryMax,
  };

  const updateFilters = (newFilters: Partial<JobSearchFilters>) => {
    if (newFilters.page !== undefined) setPage(newFilters.page);
    if (newFilters.limit !== undefined) setLimit(newFilters.limit);
    if (newFilters.search !== undefined) setSearch(newFilters.search);
    if (newFilters.jobLevel !== undefined) setJobLevel(newFilters.jobLevel);
    if (newFilters.jobType !== undefined) setJobType(newFilters.jobType);
    if (newFilters.workType !== undefined) setWorkType(newFilters.workType);
    if (newFilters.location !== undefined) setLocation(newFilters.location);
    if (newFilters.salaryMin !== undefined) setSalaryMin(newFilters.salaryMin);
    if (newFilters.salaryMax !== undefined) setSalaryMax(newFilters.salaryMax);
  };

  // Update filters and reset pagination
  const updateFiltersWithPageReset = (newFilters: Partial<Omit<JobSearchFilters, 'page'>>) => {
    updateFilters({ ...newFilters, page: 1 });
  };


  const getJobsParams = () => ({
    page: filters.page,
    limit: filters.limit,
    search: filters.search || undefined,
    jobLevel: filters.jobLevel as Enums<'job_level'> | undefined,
    jobType: filters.jobType as Enums<'job_type'> | undefined,
    workType: filters.workType as Enums<'work_type'> | undefined,
    location: filters.location || undefined,
    salaryRange:
      filters.salaryMin !== null || filters.salaryMax !== null
        ? {
            min: filters.salaryMin || undefined,
            max: filters.salaryMax || undefined,
          }
        : undefined,
  });



  const setters = {
    setPage,
    setLimit,
    setSearch,
    setJobLevel,
    setJobType,
    setWorkType,
    setLocation,
    setSalaryMin,
    setSalaryMax,
  };

  return {
    filters,
    updateFilters,
    updateFiltersWithPageReset,
    getJobsParams,
    
    ...setters,
  };
};