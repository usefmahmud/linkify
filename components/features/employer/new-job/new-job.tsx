import React from 'react';
import NewJobForm from './new-job-form';

const NewJob = () => {
  return (
    <div className='flex flex-col items-center'>
      <header className='flex w-full justify-center py-12'>
        <h1 className='after:bg-foreground relative w-fit text-4xl font-bold after:absolute after:-bottom-4 after:left-1/2 after:h-1.5 after:w-[60%] after:-translate-x-1/2'>
          Post a New Job
        </h1>
      </header>

      <div className='flex w-full justify-center'>
        <NewJobForm />
      </div>
    </div>
  );
};

export default NewJob;
