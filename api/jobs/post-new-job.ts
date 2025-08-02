import { NewJobSchema } from '@/schemas/jobs/new-job.schema';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export const postNewJob = async (data: NewJobSchema) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    toast.error('You must be logged in to post a job.');
    return;
  }

  const { data: jobData, error } = await supabase
    .from('jobs')
    .insert({
      title: data.jobTitle,
      description: data.description,
      employer_profile_id: session.user.id,
      job_level: data.jobLevel,
      job_type: data.jobType,
      work_type: data.workType,
      location: data.jobLocation,
      salary: data.salary,
    })
    .select('id')
    .single();

  if (error || !jobData) {
    toast.error(error.message || 'Failed to post job');
    return;
  }

  toast.success('Job created successfully!');
  return jobData;
};
