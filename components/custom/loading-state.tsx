import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingState = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader2 className='h-10 w-10 animate-spin text-blue-500' />
    </div>
  );
};

export default LoadingState;
