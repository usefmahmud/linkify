import Navbar from '@/components/features/landing/navbar';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='from-muted relative flex min-h-screen items-center justify-center bg-gradient-to-t via-violet-50 to-violet-100'>
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
