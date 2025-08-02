import { File } from 'lucide-react';
import React from 'react';

const NotFoundState = ({ message }: { message: string }) => {
  return (
    <div className='rounded-lg border bg-white p-12 text-center'>
      <div className='mx-auto max-w-md space-y-4'>
        <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
          <File className='h-12 w-12 text-gray-400' />
        </div>
        <h3 className='text-lg font-semibold'>{message ?? 'Not Found'}</h3>
      </div>
    </div>
  );
};

export default NotFoundState;
