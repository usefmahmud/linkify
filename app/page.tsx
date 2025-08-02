import LandingPage from '@/components/features/landing/landing';
import { userRole } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = ((await user?.user_metadata.role) as userRole) || null;

  console.log(role);

  if (role === 'employer') {
    redirect('/my-jobs');
  }

  if (role === 'job-seeker') {
    redirect('/jobs');
  }

  return <LandingPage />;
}
