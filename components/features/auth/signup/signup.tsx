import React from 'react';
import SignupForm from './signup-form';
import Link from 'next/link';

const Signup = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-background max-w-lg rounded-md p-6 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-bold'>
          Sign Up to <b className='text-violet-800'>Linkify</b>
        </h1>

        <SignupForm />
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
