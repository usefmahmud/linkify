'use client';

import { login } from '@/api/auth/login';
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
import { loginSchema, LoginSchema } from '@/schemas/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (credentials: LoginSchema) => {
    const user = await login(credentials);
  };

  return (
    <div className='flex w-full max-w-lg flex-col gap-4'>
      <div className='bg-background rounded-md p-6 shadow-md'>
        <h1 className='mb-8 text-center text-2xl font-bold'>
          Login to <b className='text-violet-800'>Linkify</b>
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-6'
          >
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

            <div className='flex justify-center'>
              <Button className='px-10'>Login</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className='flex justify-center'>
        <p className='space-x-2 text-sm'>
          Don't Have an Account?
          <Link className='ml-1 font-bold text-blue-900' href='/auth/signup'>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
