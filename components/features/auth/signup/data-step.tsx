'use client';
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
import { signupSchema, SignupSchema } from '@/schemas/auth/signup.schema';
import { useRegistrationFlowStore } from '@/stores/auth/registration-flow.store';
import { AuthFlowStep } from '@/types/auth-flow';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

interface DataStepProps {
  setCurrentStep: (step: AuthFlowStep) => void;
}

const DataStep: React.FC<DataStepProps> = ({ setCurrentStep }) => {
  const setUserData = useRegistrationFlowStore((state) => state.setUserData);
  const userData = useRegistrationFlowStore((state) => state.userData);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: userData || {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = (data: SignupSchema) => {
    setUserData(data);
    setCurrentStep('role');
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

          <div className='flex justify-center'>
            <Button className='px-10'>Singup</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DataStep;
