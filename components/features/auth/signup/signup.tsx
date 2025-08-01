'use client';

import React from 'react';
import DataStep from './data-step';
import Link from 'next/link';
import RoleStep from './role-step';
import { useQueryState, parseAsStringLiteral } from 'nuqs';
import { AuthFlowSteps } from '@/types/auth-flow';

const Signup = () => {
  const [currentStep, setCurrentStep] = useQueryState(
    'step',
    parseAsStringLiteral(AuthFlowSteps).withDefault('data').withOptions({
      history: 'push',
    })
  );

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-background max-w-lg rounded-md p-6 shadow-md'>
        {currentStep === 'data' && <DataStep setCurrentStep={setCurrentStep} />}
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
