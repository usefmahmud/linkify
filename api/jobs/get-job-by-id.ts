import { createClient } from '@/utils/supabase/server';
import { Enums } from '@/types/database.types';
import toast from 'react-hot-toast';

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
  isApplied: boolean;
  status: Enums<'application_status'>;
  employers: {
    company_name: string | null;
  } | null;
}

export const getJobById = async (
  jobId: string
): Promise<GetJobByIdResponse | null> => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  const userId = session.user.id;

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(
        `
        *,
        employers (
          company_name
        ),
        applications (
          id,
          status
        )
      `
      )
      .eq('id', jobId)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    const isApplied = data.applications.length > 0;

    const { applications, ...jobData } = data;

    return {
      ...jobData,
      isApplied,
      status: applications?.[0]?.status || null,
    };
  } catch (error) {
    console.error('Error in getJobById:', error);
    return null;
  }
};
