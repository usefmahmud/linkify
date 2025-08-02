import { createClient } from '@/utils/supabase/client';
import { Enums } from '@/types/database.types';

export interface GetJobByIdResponse {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  job_level: Enums<'job_level'>;
  job_type: Enums<'job_type'>;
  work_type: Enums<'work_type'>;
  created_at: string;
  updated_at: string;
  employer_profile_id: string;
  employers: {
    company_name: string | null;
  } | null;
}

export const getJobById = async (
  jobId: string
): Promise<GetJobByIdResponse | null> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(
        `
        *,
        employers (
          company_name
        )
      `
      )
      .eq('id', jobId)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getJobById:', error);
    return null;
  }
};
