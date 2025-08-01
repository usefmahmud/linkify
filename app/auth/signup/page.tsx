import LoadingState from '@/components/custom/loading-state';
import Signup from '@/components/features/auth/signup/signup';
import React, { Suspense } from 'react';

const AuthSignupPage = () => {
  return (
    <Suspense fallback={<LoadingState />}>
      <Signup />
    </Suspense>
  );
};

export default AuthSignupPage;
