import LandingPage from '@/components/features/landing/landing';
import { Button } from '@/components/ui/button';
import { userRole } from '@/types/user';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = ((await user?.user_metadata.role) as userRole) || null;

  if (role === 'employer') {
    return <>Employer</>;
  }

  if (role === 'job-seeker') {
    return <>Job Seeker</>;
  }

  return <LandingPage />;
}
