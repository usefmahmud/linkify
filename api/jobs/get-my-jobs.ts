import { createClient } from '@/utils/supabase/server';
import toast from 'react-hot-toast';

export const getMyJobs = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    toast.error('You must be logged in to post a job.');
    return;
  }

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`*, applications(count)`)
    .eq('employer_profile_id', session.user.id);

  if (error) {
    throw new Error('Failed to fetch jobs');
  }

  return jobs;
};
