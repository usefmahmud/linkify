'use client';
import { signup } from '@/api/auth/signup';
import PasswordInput from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signupSchema, SignupSchema } from '@/schemas/auth/signup.schema';

import { userRole } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { BriefcaseBusiness, Building2, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const searchParams = useSearchParams();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [selectedRole, setSelectedRole] = useState<userRole>(() => {
    const role = searchParams.get('role');
    return role === 'employer' || role === 'job-seeker' ? role : 'job-seeker';
  });

  const handleFormSubmit = async (data: SignupSchema) => {
    const user = await signup(data, selectedRole);
    console.log(user);
  };

  return (
    <div>
      <h1 className='mb-8 text-center text-2xl font-bold'>
        Sign Up to <b className='text-violet-800'>Linkify</b>
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className='flex flex-col gap-6'
        >
          <div className='flex items-start gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-start gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-4'>
            <div
              className={cn(
                'flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-6 text-gray-500 transition-colors duration-100',
                selectedRole === 'job-seeker' && 'border-black text-black'
              )}
              onClick={() => setSelectedRole('job-seeker')}
              role='button'
            >
              <BriefcaseBusiness className='size-8' />
              <p className='font-bold'>Job Seeker</p>
            </div>

            <div
              className={cn(
                'flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-6 text-gray-500 transition-colors duration-100',
                selectedRole === 'employer' && 'border-black text-black'
              )}
              onClick={() => setSelectedRole('employer')}
              role='button'
            >
              <Building2 className='size-8' />
              <p className='font-bold'>Employer</p>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button className='px-10' disabled={form.formState.isSubmitting}>
              Signup
              {form.formState.isSubmitting && (
                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
