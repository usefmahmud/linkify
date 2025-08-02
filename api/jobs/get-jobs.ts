import { Enums } from '@/types/database.types';
import { createClient } from '@/utils/supabase/client';

interface getJobsParams {
  page?: number;
  limit?: number;
  search?: string;
  jobLevel?: Enums<'job_level'>;
  jobType?: Enums<'job_type'>;
  workType?: Enums<'work_type'>;
  location?: string;
  salaryRange?: {
    min?: number;
    max?: number;
  };
}

export interface GetJobsResponse {
  jobs: Array<{
    id: string;
    title: string;
    description?: string;
    location: string;
    salary?: number;
    job_level: Enums<'job_level'>;
    job_type: Enums<'job_type'>;
    work_type: Enums<'work_type'>;
    created_at: string;
    updated_at: string;
    employer_id: string;
    employers: {
      company_name: string;
    } | null;
  }> | [];
  page: number;
  limit: number;
  total: number;
}

export const getJobs = async (
  params: getJobsParams
): Promise<GetJobsResponse> => {
  const supabase = await createClient();

  const {
    page = 1,
    limit = 10,
    search = '',
    jobLevel,
    jobType,
    workType,
    location,
    salaryRange,
  } = params;

  const query = supabase
    .from('jobs')
    .select(`*, employers( company_name )`)
    .range((page - 1) * limit, page * limit - 1)
    .ilike('title', `%${search}%`);

  if (jobLevel) {
    query.eq('job_level', jobLevel);
  }
  if (jobType) {
    query.eq('job_type', jobType);
  }
  if (workType) {
    query.eq('work_type', workType);
  }
  if (location) {
    query.ilike('location', `%${location}%`);
  }
  if (salaryRange?.min !== undefined) {
    query.gte('salary', salaryRange.min);
  }
  if (salaryRange?.max !== undefined) {
    query.lte('salary', salaryRange.max);
  }

  const { data: jobs, error } = await query;

  if (error) {
    throw new Error('Failed to fetch jobs');
  }

  return {
    jobs: jobs as GetJobsResponse['jobs'] || [],
    page,
    limit,
    total: jobs.length, // This should ideally be the total count from a separate query
  };
};
