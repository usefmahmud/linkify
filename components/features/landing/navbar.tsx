import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-muted/20 box-shadow absolute top-6 z-50 flex w-full max-w-6xl items-center justify-between rounded-full p-2 px-3 shadow-md backdrop-blur-sm'>
      <Link
        href='/'
        className='cursor-pointer px-4 text-xl font-extrabold select-none'
      >
        Linkify
      </Link>

      <div className='flex h-full gap-4'>
        <Button
          variant='ghost'
          className='h-full rounded-full px-6 hover:bg-transparent'
        >
          <Link href='/auth/signup'>Signup</Link>
        </Button>

        <Button className='h-full rounded-full px-6'>
          <Link href='/auth/login'>Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
