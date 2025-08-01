import { LoginSchema } from '@/schemas/auth/login.schema';
import { supabase } from '@/utils/supabase/supabase';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export const login = async (credentials: LoginSchema) => {
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
