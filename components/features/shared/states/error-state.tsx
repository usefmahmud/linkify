import { TriangleAlert } from 'lucide-react';
import React from 'react';

const ErrorState = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className='rounded-lg border border-red-200 bg-red-50 p-6 text-center'>
      <div className='mx-auto max-w-md space-y-4'>
        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
          <TriangleAlert className='text-destructive h-6 w-6' />
        </div>
        <h3 className='text-destructive text-lg font-semibold'>
          {errorMessage ?? 'Error Happend'}
        </h3>
      </div>
    </div>
  );
};

export default ErrorState;
