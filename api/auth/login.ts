import { LoginSchema } from '@/schemas/auth/login.schema';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export const login = async (credentials: LoginSchema) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data.user) {
    toast.success('Login successful!');
    redirect('/');
  }

  return data;
};
