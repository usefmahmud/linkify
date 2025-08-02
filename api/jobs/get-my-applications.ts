import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export const getMyApplications = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const { data, error } = await supabase
    .from('applications')
    .select(
      `*,
      jobs(
        id,
        title,
        description,
        location,
        salary,
        job_level,
        job_type,
        work_type,
        created_at,
        employer_profile_id
      )`
    )
    .eq('seeker_profile_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  return { applications: data || [] };
};

export type GetMyApplicationsResponse = Awaited<
  ReturnType<typeof getMyApplications>
>;

export type ApplicationWithJob = GetMyApplicationsResponse['applications'][0];
