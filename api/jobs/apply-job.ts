import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export const applyJob = async (jobId: string) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      status: 'pending',
      job_id: jobId,
      seeker_profile_id: session.user.id,
    })
    .select('*')
    .single();

  if (error) {
    toast.error(`Error applying for job`);
    return;
  }

  return data;
};
