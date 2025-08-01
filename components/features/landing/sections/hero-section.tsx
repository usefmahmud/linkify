'use client';

import BlurText from '@/components/custom/BlurText/BlurText';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../navbar';

const HeroSection = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleBlurAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <section className='from-muted relative flex min-h-screen items-center justify-center bg-gradient-to-t via-violet-50 to-violet-100'>
      <Navbar />
      <div className='flex flex-col items-center gap-6'>
        <div className='text-center'>
          <BlurText
            text='Discover Your Next Career Move'
            className='mb-4 flex max-w-[650px] justify-center text-center text-7xl leading-tight font-extrabold'
            onAnimationComplete={handleBlurAnimationComplete}
          />
          <p
            className={`text-lg transition-all duration-700 ease-out ${
              animationComplete
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Unlock Your Potential: Find the Perfect Tech Role at Our Jobs
            Platform
          </p>
        </div>

        <div
          className={`flex gap-4 transition-all delay-300 duration-700 ease-out ${
            animationComplete
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <Button size='lg' className='px-10 text-lg' asChild>
            <Link href='/auth/signup?role=job-seeker'>Job Seeker</Link>
          </Button>

          <Button
            variant='outline'
            size='lg'
            className='bg-transparent px-10 text-lg hover:bg-transparent'
            asChild
          >
            <Link href='/auth/signup?role=employer'>Employer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
