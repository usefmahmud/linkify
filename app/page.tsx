import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-black'>Welcome To Linkify</h1>
        <div className='flex'>
          <Button size='lg' className='px-10' asChild>
            <Link href='/auth/signup'>Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
