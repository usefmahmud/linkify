import { SignupSchema } from '@/schemas/auth/signup.schema';
import { userRole } from '@/types/user';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

export const signup = async (credentials: SignupSchema, role: userRole) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        role: role,
      },
    },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user?.id,
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      role: role,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  }

  toast.success(
    'Account created successfully! Please check your email to verify your account.'
  );
  return data;
};
