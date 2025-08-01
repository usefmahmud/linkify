'use client';

import React from 'react';
import DataStep from './data-step';
import Link from 'next/link';
import { useRegistrationFlowStore } from '@/stores/auth/registration-flow.store';
import RoleStep from './role-step';

const Signup = () => {
  const currentStep = useRegistrationFlowStore((state) => state.currentStep);
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-background max-w-lg rounded-md p-6 shadow-md'>
        {currentStep === 'data' && <DataStep />}
        {currentStep === 'role' && <RoleStep />}
      </div>

      <div className='flex justify-center'>
        <p className='text-sm'>
          Already have an account?
          <Link className='font-bold text-blue-900' href='/auth/login'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
